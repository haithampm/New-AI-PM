'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Task = { id: string; title: string; description: string; status: string; priority: string; };

export default function TasksPage() {
  const { locale } = useParams() as { locale: string };
  const isAr = locale === 'ar';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', status: 'todo', priority: 'medium' });
  const [editId, setEditId] = useState<string | null>(null);
  const t = {
    title: isAr ? 'المهام' : 'Tasks', newTask: isAr ? 'مهمة جديدة' : 'New Task',
    taskTitle: isAr ? 'العنوان' : 'Title', description: isAr ? 'الوصف' : 'Description',
    status: isAr ? 'الحالة' : 'Status', priority: isAr ? 'الأولوية' : 'Priority',
    todo: isAr ? 'للتنفيذ' : 'To Do', inprogress: isAr ? 'قيد التنفيذ' : 'In Progress', done: isAr ? 'منجز' : 'Done',
    low: isAr ? 'منخفض' : 'Low', medium: isAr ? 'متوسط' : 'Medium', high: isAr ? 'عالي' : 'High',
    save: isAr ? 'حفظ' : 'Save', cancel: isAr ? 'إلغاء' : 'Cancel', edit: isAr ? 'تعديل' : 'Edit', delete: isAr ? 'حذف' : 'Delete',
    noTasks: isAr ? 'لا توجد مهام بعد' : 'No tasks yet',
    dashboard: isAr ? 'لوحة التحكم' : 'Dashboard', projects: isAr ? 'المشاريع' : 'Projects',
    team: isAr ? 'الفريق' : 'Team', settings: isAr ? 'الإعدادات' : 'Settings',
    appName: isAr ? 'مدير المشاريع' : 'AI Project Manager',
  };
  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/tasks'); setTasks(await r.json()); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) await fetch(`/api/tasks/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    else await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ title: '', description: '', status: 'todo', priority: 'medium' }); setEditId(null); setShowForm(false); fetch_();
  };
  const sColor: Record<string,string> = { todo:'bg-gray-500/20 text-gray-400', inprogress:'bg-blue-500/20 text-blue-400', done:'bg-green-500/20 text-green-400' };
  const pColor: Record<string,string> = { low:'bg-gray-500/20 text-gray-400', medium:'bg-yellow-500/20 text-yellow-400', high:'bg-red-500/20 text-red-400' };
  const sLabel: Record<string,string> = { todo:t.todo, inprogress:t.inprogress, done:t.done };
  const pLabel: Record<string,string> = { low:t.low, medium:t.medium, high:t.high };
  return (
    <div className={`flex min-h-screen bg-gray-950 text-white`} dir={isAr ? 'rtl' : 'ltr'}>
      <aside className="w-56 bg-gray-900 border-e border-gray-800 flex flex-col p-4 gap-2 fixed h-full">
        <div className="flex items-center gap-2 mb-6"><span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold">AI</span><span className="font-semibold text-sm">{t.appName}</span></div>
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">🏠 {t.dashboard}</Link>
        <Link href={`/${locale}/projects`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">📁 {t.projects}</Link>
        <Link href={`/${locale}/tasks`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">✅ {t.title}</Link>
        <Link href={`/${locale}/team`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">👥 {t.team}</Link>
        <Link href={`/${locale}/settings`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">⚙️ {t.settings}</Link>
      </aside>
      <main className="flex-1 ms-56 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ title:'', description:'', status:'todo', priority:'medium' }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">+ {t.newTask}</button>
        </div>
        {showForm && (
          <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm text-gray-400 mb-1">{t.taskTitle}</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">{t.status}</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"><option value="todo">{t.todo}</option><option value="inprogress">{t.inprogress}</option><option value="done">{t.done}</option></select></div>
              <div><label className="block text-sm text-gray-400 mb-1">{t.priority}</label><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"><option value="low">{t.low}</option><option value="medium">{t.medium}</option><option value="high">{t.high}</option></select></div>
              <div><label className="block text-sm text-gray-400 mb-1">{t.description}</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" /></div>
            </div>
            <div className="flex gap-3 mt-4"><button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">{t.save}</button><button type="button" onClick={()=>setShowForm(false)} className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">{t.cancel}</button></div>
          </form>
        )}
        {loading ? <div className="text-gray-400 text-center py-16">...</div>
        : tasks.length===0 ? <div className="text-gray-500 text-center py-16">{t.noTasks}</div>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{tasks.map(task=>(
          <div key={task.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2"><h3 className="font-semibold flex-1">{task.title}</h3><span className={`text-xs px-2 py-1 rounded-full ms-2 ${pColor[task.priority]}`}>{pLabel[task.priority]}</span></div>
            <span className={`text-xs px-2 py-1 rounded-full inline-block mb-3 ${sColor[task.status]}`}>{sLabel[task.status]}</span>
            <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            <div className="flex gap-2">
              <button onClick={()=>{setForm({title:task.title,description:task.description,status:task.status,priority:task.priority});setEditId(task.id);setShowForm(true);}} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg">{t.edit}</button>
              <button onClick={async()=>{await fetch(`/api/tasks/${task.id}`,{method:'DELETE'});fetch_();}} className="text-xs bg-red-900/40 text-red-400 px-3 py-1.5 rounded-lg">{t.delete}</button>
            </div>
          </div>
        ))}</div>}
      </main>
    </div>
  );
}
