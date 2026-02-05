# Deploying Explorian Safaris Website to Vercel (Free Hosting)

## Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Start Deploying"
3. Sign up with your **GitHub account** (recommended - makes deployment easier)
4. Authorize Vercel to access your GitHub repositories

## Step 2: Import Your GitHub Repository

1. After signing in, click **"Add New..."** → **"Project"**
2. Find your repository: **Kabeer2105/Explorian-Safari**
3. Click **"Import"**
4. Configure the project:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `explorian-safari-website` (IMPORTANT!)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

## Step 3: Configure Environment Variables

Before deploying, you MUST add these environment variables in Vercel:

Click **"Environment Variables"** section and add each of these:

### Required Variables:

```
DATABASE_URL
mysql://explorians_explorians:YOUR_ACTUAL_PASSWORD@localhost:3306/explorians_safari
```
⚠️ Replace `YOUR_ACTUAL_PASSWORD` with your actual database password

```
EMAIL_HOST
mail.exploriansafaris.com
```

```
EMAIL_PORT
465
```

```
EMAIL_SECURE
true
```

```
EMAIL_USER
info@exploriansafaris.com
```

```
EMAIL_PASSWORD
YOUR_ACTUAL_EMAIL_PASSWORD
```
⚠️ Use the actual email password

```
EMAIL_FROM
info@exploriansafaris.com
```

```
PESAPAL_CONSUMER_KEY
ngW+UEcnDhltUc5fxPfrCD987xMh3Lx8
```

```
PESAPAL_CONSUMER_SECRET
q27RChYs5UkypdcNYKzuUw460Dg=
```

```
PESAPAL_CALLBACK_URL
https://YOUR_VERCEL_URL/api/payment/callback
```
⚠️ Update this AFTER first deployment with your actual Vercel URL

```
PESAPAL_ENV
sandbox
```

```
NEXTAUTH_SECRET
```
Generate a random secret: Run `openssl rand -base64 32` in terminal or use [generate-secret.vercel.app](https://generate-secret.vercel.app/)

```
NEXTAUTH_URL
https://YOUR_VERCEL_URL
```
⚠️ Update this AFTER first deployment

```
NEXT_PUBLIC_SITE_URL
https://YOUR_VERCEL_URL
```
⚠️ Update this AFTER first deployment

```
NEXT_PUBLIC_WHATSAPP_NUMBER
+255719245540
```

### Optional Variables (can add later):

```
TRIPADVISOR_LISTING_URL
(empty for now)
```

```
SAFARIBOOKINGS_PROFILE_URL
(empty for now)
```

```
NEXT_PUBLIC_GA_ID
(empty for now - add when you have Google Analytics)
```

```
CLOUDINARY_CLOUD_NAME
(empty for now - add when you set up Cloudinary)
```

```
CLOUDINARY_API_KEY
(empty for now)
```

```
CLOUDINARY_API_SECRET
(empty for now)
```

## Step 4: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Vercel will:
   - Clone your repository
   - Install dependencies
   - Build your Next.js app
   - Deploy to their global CDN
3. Wait 2-5 minutes for deployment to complete

## Step 5: Update URLs After First Deployment

1. Once deployed, Vercel will give you a URL like: `explorian-safari-xxxxxx.vercel.app`
2. Copy this URL
3. Go to **Settings** → **Environment Variables** in Vercel
4. Update these three variables with your actual Vercel URL:
   - `PESAPAL_CALLBACK_URL`: `https://explorian-safari-xxxxxx.vercel.app/api/payment/callback`
   - `NEXTAUTH_URL`: `https://explorian-safari-xxxxxx.vercel.app`
   - `NEXT_PUBLIC_SITE_URL`: `https://explorian-safari-xxxxxx.vercel.app`
5. Click **"Redeploy"** to apply the changes

## Step 6: Test Your Website

1. Visit your Vercel URL
2. Test these features:
   - ✅ Home page loads
   - ✅ Language switcher works
   - ✅ Package pages load
   - ✅ Contact form submission
   - ✅ Quote request form
   - ✅ Booking flow (test with a date > 7 days from now)
   - ✅ Payment simulation
   - ✅ Admin login at `/admin-login`

## Step 7: Database Connection (IMPORTANT!)

⚠️ **NOTE:** Vercel's free tier can't directly connect to your cPanel MySQL database if it's not publicly accessible.

### Options:

**Option A: Use PlanetScale (Recommended - Free Tier)**
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection string
4. Update `DATABASE_URL` in Vercel environment variables
5. Run Prisma migrations: `npx prisma db push`

**Option B: Make cPanel MySQL Accessible**
1. Log into cPanel
2. Go to **Remote MySQL**
3. Add Vercel's IP addresses (or allow `%` for all - less secure)
4. Update `DATABASE_URL` with your public IP/domain

**Option C: Use Vercel Postgres (Paid)**
1. Vercel offers managed PostgreSQL
2. But it requires a paid plan

## Step 8: Set Up Custom Domain (Optional)

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain: `exploriansafaris.com`
4. Follow Vercel's instructions to update DNS records
5. SSL certificate will be automatically provisioned

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Package dependencies

### Database Connection Errors
- Ensure `DATABASE_URL` is correct
- Check if database is accessible from Vercel's servers
- Consider using PlanetScale instead

### Email Not Sending
- Verify all email environment variables are set
- Check email logs in admin dashboard (once deployed)
- Some hosting providers block outbound SMTP on port 465

### Payment Not Working
- Ensure `PESAPAL_CALLBACK_URL` uses your actual Vercel URL
- Check that callback URL is accessible
- Test in sandbox mode first

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- Push to `master` branch → Deploys to production
- Push to other branches → Creates preview deployments

## Free Tier Limits

Vercel free tier includes:
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth per month
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ❌ No custom server (Next.js API routes work fine)
- ❌ Limited build minutes (6000 minutes/month)

## Support

If you need help:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
3. Contact me for deployment assistance

## Next Steps After Deployment

1. ✅ Share the Vercel URL with your client
2. ✅ Create first admin user: Visit `/api/admin/seed`
3. ✅ Login to admin dashboard: `/admin-login`
4. ✅ Add real safari packages
5. ✅ Upload real photos to gallery
6. ✅ Test booking and payment flow
7. ✅ Set up Google Analytics (optional)
8. ✅ Configure custom domain
9. ✅ Switch Pesapal from sandbox to production (when ready)

---

**Your Site Is Ready!** 🎉

Share this URL with your client: `https://your-vercel-url.vercel.app`
