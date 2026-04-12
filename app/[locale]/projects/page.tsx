'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const { locale } = useParams() as { locale: string };
  const isAr = locale === 'ar';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', status: 'active' });
  const [editId, setEditId] = useState<string | null>(null);

  const t = {
    title: isAr ? 'المشاريع' : 'Projects',
    newProject: isAr ? 'مشروع جديد' : 'New Project',
    name: isAr ? 'الاسم' : 'Name',
    description: isAr ? 'الوصف' : 'Description',
    status: isAr ? 'الحالة' : 'Status',
    active: isAr ? 'نشط' : 'Active',
    completed: isAr ? 'مكتمل' : 'Completed',
    paused: isAr ? 'متوقف' : 'Paused',
    save: isAr ? 'حفظ' : 'Save',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    edit: isAr ? 'تعديل' : 'Edit',
    delete: isAr ? 'حذف' : 'Delete',
    noProjects: isAr ? 'لا توجد مشاريع بعد' : 'No projects yet',
    dashboard: isAr ? 'لوحة التحكم' : 'Dashboard',
    tasks: isAr ? 'المهام' : 'Tasks',
    team: isAr ? 'الفريق' : 'Team',
    settings: isAr ? 'الإعدادات' : 'Settings',
    appName: isAr ? 'مدير المشاريع' : 'AI Project Manager',
  };

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/projects/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', description: '', status: 'active' });
    setEditId(null);
    setShowForm(false);
    fetchProjects();
  };

  const handleEdit = (p: Project) => {
    setForm({ name: p.name, description: p.description, status: p.status });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const statusColor: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400',
    completed: 'bg-blue-500/20 text-blue-400',
    paused: 'bg-yellow-500/20 text-yellow-400',
  };

  const statusLabel: Record<string, string> = {
    active: t.active,
    completed: t.completed,
    paused: t.paused,
  };

  return (
    <div className={`flex min-h-screen bg-gray-950 text-white ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-e border-gray-800 flex flex-col p-4 gap-2 fixed h-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold">AI</span>
          <span className="font-semibold text-sm">{t.appName}</span>
        </div>
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">
          🏠 {t.dashboard}
        </Link>
        <Link href={`/${locale}/projects`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">
          📁 {t.title}
        </Link>
        <Link href={`/${locale}/tasks`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">
          ✅ {t.tasks}
        </Link>
        <Link href={`/${locale}/team`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">
          👥 {t.team}
        </Link>
        <Link href={`/${locale}/settings`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">
          ⚙️ {t.settings}
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 ms-56 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', description: '', status: 'active' }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + {t.newProject}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">{t.name}</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">{t.status}</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="active">{t.active}</option>
                  <option value="completed">{t.completed}</option>
                  <option value="paused">{t.paused}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">{t.description}</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">{t.save}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">{t.cancel}</button>
            </div>
          </form>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="text-gray-400 text-center py-16">{isAr ? 'جاري التحميل...' : 'Loading...'}</div>
        ) : projects.length === 0 ? (
          <div className="text-gray-500 text-center py-16">{t.noProjects}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-base">{p.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor[p.status] || statusColor.active}`}>{statusLabel[p.status] || p.status}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg">{t.edit}</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-400 px-3 py-1.5 rounded-lg">{t.delete}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
