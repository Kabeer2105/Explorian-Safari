import { prisma } from '@/lib/prisma';
import FAQClient from './FAQClient';

export default async function FAQPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });

  return <FAQClient initialFaqs={faqs} />;
}
