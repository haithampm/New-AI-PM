import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Project Manager',
  description: 'منصة إدارة المشاريع بالذكاء الاصطناعي',
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const isRTL = params.locale === 'ar';
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} lang={params.locale}>
      {children}
    </div>
  );
}
