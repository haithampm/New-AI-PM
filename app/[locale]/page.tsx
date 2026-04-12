export default function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === 'ar';

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
            AI
          </div>
          <span className="font-semibold text-lg">
            {isAr ? 'مدير المشاريع الذكي' : 'AI Project Manager'}
          </span>
        </div>
        <nav className="flex gap-4 text-sm text-gray-400">
          <a href="/ar" className="hover:text-white">عربي</a>
          <a href="/en" className="hover:text-white">English</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {isAr
            ? 'منصة إدارة المشاريع بالذكاء الاصطناعي'
            : 'AI-Powered Project Management'}
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          {isAr
            ? 'أدر مشاريعك بكفاءة باستخدام تقنيات الذكاء الاصطناعي'
            : 'Manage your projects efficiently with AI technology'}
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          {isAr ? 'ابدأ الآن' : 'Get Started'}
        </a>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { label: isAr ? 'مشروع نشط' : 'Active Projects', value: '0' },
          { label: isAr ? 'مهمة مكتملة' : 'Tasks Done', value: '0' },
          { label: isAr ? 'أعضاء الفريق' : 'Team Members', value: '0' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
