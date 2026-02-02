import { prisma } from '@/lib/prisma';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany({
    orderBy: { key: 'asc' },
  });

  return <SettingsClient initialSettings={settings} />;
}
