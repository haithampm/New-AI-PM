'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Stats = { projects: number; tasks: number; team: number; completedTasks: number; activeTasks: number; };

export default function DashboardPage() {
  const { locale } = useParams() as { locale: string };
  const isAr = locale === 'ar';
  const [stats, setStats] = useState<Stats>({ projects: 0, tasks: 0, team: 0, completedTasks: 0, activeTasks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const t = {
    appName: isAr ? 'مدير المشاريع' : 'AI Project Manager',
    dashboard: isAr ? 'لوحة التحكم' : 'Dashboard',
    projects: isAr ? 'المشاريع' : 'Projects',
    tasks: isAr ? 'المهام' : 'Tasks',
    team: isAr ? 'الفريق' : 'Team',
    settings: isAr ? 'الإعدادات' : 'Settings',
    welcome: isAr ? 'مرحباً بك في لوحة التحكم' : 'Welcome to your Dashboard',
    subtitle: isAr ? 'نظرة شاملة على مشاريعك ومهامك' : 'A complete overview of your projects and tasks',
    totalProjects: isAr ? 'إجمالي المشاريع' : 'Total Projects',
    totalTasks: isAr ? 'إجمالي المهام' : 'Total Tasks',
    teamMembers: isAr ? 'أعضاء الفريق' : 'Team Members',
    completedTasks: isAr ? 'مهام منجزة' : 'Completed Tasks',
    activeTasks: isAr ? 'مهام نشطة' : 'Active Tasks',
    quickActions: isAr ? 'إجراءات سريعة' : 'Quick Actions',
    newProject: isAr ? 'مشروع جديد' : 'New Project',
    newTask: isAr ? 'مهمة جديدة' : 'New Task',
    addMember: isAr ? 'إضافة عضو' : 'Add Member',
    viewAll: isAr ? 'عرض الكل' : 'View All',
  };

  const statCards = [
    { label: t.totalProjects, value: stats.projects, icon: '📁', color: 'from-blue-600 to-blue-700', link: `/${locale}/projects` },
    { label: t.totalTasks, value: stats.tasks, icon: '✅', color: 'from-green-600 to-green-700', link: `/${locale}/tasks` },
    { label: t.teamMembers, value: stats.team, icon: '👥', color: 'from-purple-600 to-purple-700', link: `/${locale}/team` },
    { label: t.completedTasks, value: stats.completedTasks, icon: '🏆', color: 'from-yellow-600 to-yellow-700', link: `/${locale}/tasks` },
    { label: t.activeTasks, value: stats.activeTasks, icon: '⚡', color: 'from-orange-600 to-orange-700', link: `/${locale}/tasks` },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-white" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-e border-gray-800 flex flex-col p-4 gap-2 fixed h-full z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm">AI</span>
          <span className="font-semibold text-sm">{t.appName}</span>
        </div>
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">🏠 {t.dashboard}</Link>
        <Link href={`/${locale}/projects`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">📁 {t.projects}</Link>
        <Link href={`/${locale}/tasks`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">✅ {t.tasks}</Link>
        <Link href={`/${locale}/team`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">👥 {t.team}</Link>
        <Link href={`/${locale}/settings`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">⚙️ {t.settings}</Link>
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex gap-2">
            <Link href="/ar/dashboard" className={`flex-1 text-center py-1.5 rounded text-xs ${locale==='ar' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>AR</Link>
            <Link href="/en/dashboard" className={`flex-1 text-center py-1.5 rounded text-xs ${locale==='en' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>EN</Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ms-56 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{t.welcome}</h1>
          <p className="text-gray-400 text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card, i) => (
            <Link key={i} href={card.link} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition group">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-lg mb-3`}>{card.icon}</div>
              <div className="text-2xl font-bold mb-1">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-800 rounded animate-pulse"></span> : card.value}
              </div>
              <div className="text-gray-400 text-xs">{card.label}</div>
            </Link>
          ))}
        </div>

                {/* Progress Overview */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-base mb-4">📊 {isAr ? 'نظرة عامة على التقدم' : 'Progress Overview'}</h2>
          <div className="space-y-4">
            {/* Tasks Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{isAr ? 'تقدم المهام' : 'Tasks Progress'}</span>
                <span className="text-gray-400">{stats.tasks > 0 ? Math.round((stats.completedTasks / stats.tasks) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all" style={{ width: `${stats.tasks > 0 ? (stats.completedTasks / stats.tasks) * 100 : 0}%` }}></div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>✅ {stats.completedTasks} {isAr ? 'منجز' : 'done'}</span>
                <span>⚡ {stats.activeTasks} {isAr ? 'نشط' : 'active'}</span>
                <span>⏸️ {stats.tasks - stats.completedTasks - stats.activeTasks} {isAr ? 'معلق' : 'pending'}</span>
              </div>
            </div>
            {/* Projects Stats */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-800">
              <div>
                <div className="text-2xl font-bold text-blue-400">{stats.projects}</div>
                <div className="text-xs text-gray-500">{isAr ? 'مشروع' : 'Projects'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{stats.tasks}</div>
                <div className="text-xs text-gray-500">{isAr ? 'مهمة' : 'Tasks'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{stats.team}</div>
                <div className="text-xs text-gray-500">{isAr ? 'عضو' : 'Members'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-base mb-4">⚡ {t.quickActions}</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/projects`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + {t.newProject}
            </Link>
            <Link href={`/${locale}/tasks`} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + {t.newTask}
            </Link>
            <Link href={`/${locale}/team`} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + {t.addMember}
            </Link>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href={`/${locale}/projects`} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition group">
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-semibold text-sm mb-1">{t.projects}</h3>
            <p className="text-gray-500 text-xs">{stats.projects} {isAr ? 'مشروع' : 'project(s)'}</p>
          </Link>
          <Link href={`/${locale}/tasks`} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-500/50 transition group">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-semibold text-sm mb-1">{t.tasks}</h3>
            <p className="text-gray-500 text-xs">{stats.tasks} {isAr ? 'مهمة' : 'task(s)'}</p>
          </Link>
          <Link href={`/${locale}/team`} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-purple-500/50 transition group">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-sm mb-1">{t.team}</h3>
            <p className="text-gray-500 text-xs">{stats.team} {isAr ? 'عضو' : 'member(s)'}</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
