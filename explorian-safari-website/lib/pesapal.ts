// Pesapal Payment Gateway Integration (v3 API)
// https://developer.pesapal.com/

interface PesapalConfig {
  consumerKey: string;
  consumerSecret: string;
  callbackUrl: string;
  env: 'sandbox' | 'production';
}

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  callbackUrl: string;
  cancellationUrl?: string;
  notificationId?: string;
  billingAddress: {
    emailAddress: string;
    phoneNumber: string;
    countryCode?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}

class PesapalService {
  private config: PesapalConfig;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: PesapalConfig) {
    this.config = config;
    this.baseUrl =
      config.env === 'production'
        ? 'https://pay.pesapal.com/v3'
        : 'https://cybqa.pesapal.com/pesapalv3';
  }

  // Get OAuth2 access token
  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/Auth/RequestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          consumer_key: this.config.consumerKey,
          consumer_secret: this.config.consumerSecret,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.token;
      // Token expires in 5 minutes according to Pesapal docs
      this.tokenExpiry = new Date(Date.now() + 4.5 * 60 * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Pesapal access token:', error);
      throw new Error('Failed to authenticate with Pesapal');
    }
  }

  // Register IPN (Instant Payment Notification) URL
  async registerIPN(ipnUrl: string, notificationType: string = 'GET'): Promise<string> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}/api/URLSetup/RegisterIPN`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: ipnUrl,
          ipn_notification_type: notificationType,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to register IPN: ${response.statusText}`);
      }

      const data = await response.json();
      return data.ipn_id;
    } catch (error) {
      console.error('Error registering IPN:', error);
      throw error;
    }
  }

  // Submit order and get payment URL
  async submitOrder(payment: PaymentRequest): Promise<{
    orderTrackingId: string;
    merchantReference: string;
    redirectUrl: string;
  }> {
    try {
      const token = await this.getAccessToken();
      const merchantReference = `EXP-${Date.now()}`;

      const response = await fetch(`${this.baseUrl}/api/Transactions/SubmitOrderRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: merchantReference,
          currency: payment.currency,
          amount: payment.amount,
          description: payment.description,
          callback_url: payment.callbackUrl,
          cancellation_url: payment.cancellationUrl || payment.callbackUrl,
          notification_id: payment.notificationId,
          billing_address: payment.billingAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to submit order: ${response.statusText} - ${errorData}`);
      }

      const data = await response.json();

      return {
        orderTrackingId: data.order_tracking_id,
        merchantReference: data.merchant_reference,
        redirectUrl: data.redirect_url,
      };
    } catch (error) {
      console.error('Error submitting Pesapal order:', error);
      throw error;
    }
  }

  // Get transaction status
  async getTransactionStatus(orderTrackingId: string): Promise<{
    paymentMethod: string;
    amount: number;
    currency: string;
    status: string;
    paymentStatusDescription: string;
    paymentAccount: string;
    confirmationCode: string;
  }> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get transaction status: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }
}

// Initialize Pesapal service
let pesapalService: PesapalService | null = null;

export function initPesapal(): PesapalService {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
  const callbackUrl = process.env.PESAPAL_CALLBACK_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/callback`;
  const env = (process.env.PESAPAL_ENV as 'sandbox' | 'production') || 'sandbox';

  if (!consumerKey || !consumerSecret) {
    console.warn('Pesapal credentials not configured. Using simulated payment mode.');
    // Return a mock service for development
    return createMockPesapalService();
  }

  if (!pesapalService) {
    pesapalService = new PesapalService({
      consumerKey,
      consumerSecret,
      callbackUrl,
      env,
    });
  }

  return pesapalService;
}

// Mock Pesapal service for development/testing
function createMockPesapalService(): PesapalService {
  return {
    async registerIPN(ipnUrl: string) {
      console.log('[MOCK] Registering IPN:', ipnUrl);
      return 'mock-ipn-id';
    },
    async submitOrder(payment: PaymentRequest) {
      console.log('[MOCK] Submitting order:', payment);
      const merchantReference = `EXP-MOCK-${Date.now()}`;
      return {
        orderTrackingId: `mock-tracking-${Date.now()}`,
        merchantReference,
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/simulate?ref=${merchantReference}&amount=${payment.amount}`,
      };
    },
    async getTransactionStatus(orderTrackingId: string) {
      console.log('[MOCK] Getting transaction status:', orderTrackingId);
      return {
        paymentMethod: 'Card',
        amount: 100,
        currency: 'USD',
        status: 'COMPLETED',
        paymentStatusDescription: 'Payment completed successfully',
        paymentAccount: '****1234',
        confirmationCode: 'MOCK123456',
      };
    },
  } as any;
}

export default initPesapal;
