export default function DashboardPage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === 'ar';

  const stats = [
    {
      label: isAr ? 'مشاريع نشطة' : 'Active Projects',
      value: '0',
      icon: '📁',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: isAr ? 'مهام معلقة' : 'Pending Tasks',
      value: '0',
      icon: '⏳',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      label: isAr ? 'مهام مكتملة' : 'Done Tasks',
      value: '0',
      icon: '✅',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      label: isAr ? 'أعضاء الفريق' : 'Team Members',
      value: '0',
      icon: '👥',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 p-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <span className="font-semibold">
              {isAr ? 'مدير المشاريع' : 'AI PM'}
            </span>
          </div>
          {[
            { icon: '🏠', label: isAr ? 'لوحة التحكم' : 'Dashboard', href: `/${params.locale}/dashboard`, active: true },
            { icon: '📁', label: isAr ? 'المشاريع' : 'Projects', href: `/${params.locale}/projects`, active: false },
            { icon: '✅', label: isAr ? 'المهام' : 'Tasks', href: `/${params.locale}/tasks`, active: false },
            { icon: '👥', label: isAr ? 'الفريق' : 'Team', href: `/${params.locale}/team`, active: false },
            { icon: '⚙️', label: isAr ? 'الإعدادات' : 'Settings', href: `/${params.locale}/settings`, active: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
          <div className="mt-auto pt-4 border-t border-gray-800">
            <a
              href={`/${params.locale === 'ar' ? 'en' : 'ar'}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition"
            >
              <span>🌐</span>
              <span>{isAr ? 'English' : 'عربي'}</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              {isAr ? 'لوحة التحكم' : 'Dashboard'}
            </h1>
            <p className="text-gray-400 mt-1">
              {isAr ? 'مرحباً بك في منصة إدارة المشاريع' : 'Welcome to AI Project Manager'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4"
              >
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center text-xl mb-3`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">
                {isAr ? 'أحدث المشاريع' : 'Recent Projects'}
              </h2>
              <a
                href={`/${params.locale}/projects`}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {isAr ? 'عرض الكل' : 'View all'}
              </a>
            </div>
            <div className="text-center py-10 text-gray-500">
              <div className="text-4xl mb-3">📁</div>
              <p>{isAr ? 'لا توجد مشاريع بعد' : 'No projects yet'}</p>
              <a
                href={`/${params.locale}/projects`}
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition"
              >
                {isAr ? 'أنشئ مشروعاً' : 'Create Project'}
              </a>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">
                {isAr ? 'أحدث المهام' : 'Recent Tasks'}
              </h2>
              <a
                href={`/${params.locale}/tasks`}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {isAr ? 'عرض الكل' : 'View all'}
              </a>
            </div>
            <div className="text-center py-10 text-gray-500">
              <div className="text-4xl mb-3">✅</div>
              <p>{isAr ? 'لا توجد مهام بعد' : 'No tasks yet'}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
