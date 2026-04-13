'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SettingsPage() {
  const { locale } = useParams() as { locale: string };
  const isAr = locale === 'ar';
  const [lang, setLang] = useState(locale);
  const [saved, setSaved] = useState(false);

  const t = {
    title: isAr ? 'الإعدادات' : 'Settings',
    language: isAr ? 'اللغة' : 'Language',
    arabic: isAr ? 'العربية' : 'Arabic',
    english: isAr ? 'الإنجليزية' : 'English',
    appearance: isAr ? 'المظهر' : 'Appearance',
    darkMode: isAr ? 'الوضع الليلي' : 'Dark Mode',
    darkModeDesc: isAr ? 'مفعّل دائماً' : 'Always enabled',
    about: isAr ? 'حول التطبيق' : 'About',
    version: isAr ? 'الإصدار' : 'Version',
    builtWith: isAr ? 'مبني باستخدام' : 'Built with',
    save: isAr ? 'حفظ التغييرات' : 'Save Changes',
    savedMsg: isAr ? 'تم الحفظ بنجاح!' : 'Saved successfully!',
    dashboard: isAr ? 'لوحة التحكم' : 'Dashboard',
    projects: isAr ? 'المشاريع' : 'Projects',
    tasks: isAr ? 'المهام' : 'Tasks',
    team: isAr ? 'الفريق' : 'Team',
    appName: isAr ? 'مدير المشاريع' : 'AI Project Manager',
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    if (lang !== locale) {
      window.location.href = `/${lang}/settings`;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white" dir={isAr ? 'rtl' : 'ltr'}>
      <aside className="w-56 bg-gray-900 border-e border-gray-800 flex flex-col p-4 gap-2 fixed h-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold">AI</span>
          <span className="font-semibold text-sm">{t.appName}</span>
        </div>
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">🏠 {t.dashboard}</Link>
        <Link href={`/${locale}/projects`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">📁 {t.projects}</Link>
        <Link href={`/${locale}/tasks`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">✅ {t.tasks}</Link>
        <Link href={`/${locale}/team`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">👥 {t.team}</Link>
        <Link href={`/${locale}/settings`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">⚙️ {t.title}</Link>
      </aside>

      <main className="flex-1 ms-56 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-8">{t.title}</h1>

        {saved && (
          <div className="mb-6 bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-3 rounded-lg text-sm">
            ✓ {t.savedMsg}
          </div>
        )}

        {/* Language */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
          <h2 className="font-semibold text-base mb-4">🌍 {t.language}</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setLang('ar')}
              className={`flex-1 py-3 rounded-lg text-sm font-medium border transition ${
                lang === 'ar' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              🇸🇦 {t.arabic}
            </button>
            <button
              onClick={() => setLang('en')}
              className={`flex-1 py-3 rounded-lg text-sm font-medium border transition ${
                lang === 'en' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              🇬🇧 {t.english}
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
          <h2 className="font-semibold text-base mb-4">🎨 {t.appearance}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t.darkMode}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.darkModeDesc}</p>
            </div>
            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-default">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-base mb-4">ℹ️ {t.about}</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t.version}</span>
              <span className="text-white font-medium">1.1.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t.builtWith}</span>
              <span className="text-white font-medium">Next.js 15 + Prisma + Neon</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">URL</span>
              <span className="text-blue-400 text-xs">new-ai-pm.vercel.app</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          {t.save}
        </button>
      </main>
    </div>
  );
}
