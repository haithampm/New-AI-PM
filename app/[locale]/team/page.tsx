'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Member = { id: string; name: string; email: string; role: string; };

export default function TeamPage() {
  const { locale } = useParams() as { locale: string };
  const isAr = locale === 'ar';
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'member' });
  const [editId, setEditId] = useState<string | null>(null);
  const t = {
    title: isAr ? 'الفريق' : 'Team', addMember: isAr ? 'إضافة عضو' : 'Add Member',
    name: isAr ? 'الاسم' : 'Name', email: isAr ? 'البريد' : 'Email', role: isAr ? 'الدور' : 'Role',
    member: isAr ? 'عضو' : 'Member', admin: isAr ? 'مدير' : 'Admin', developer: isAr ? 'مطور' : 'Developer',
    save: isAr ? 'حفظ' : 'Save', cancel: isAr ? 'إلغاء' : 'Cancel', edit: isAr ? 'تعديل' : 'Edit', delete: isAr ? 'حذف' : 'Delete',
    noMembers: isAr ? 'لا يوجد أعضاء بعد' : 'No team members yet',
    dashboard: isAr ? 'لوحة التحكم' : 'Dashboard', projects: isAr ? 'المشاريع' : 'Projects',
    tasks: isAr ? 'المهام' : 'Tasks', settings: isAr ? 'الإعدادات' : 'Settings',
    appName: isAr ? 'مدير المشاريع' : 'AI Project Manager',
  };
  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/team'); setMembers(await r.json()); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) await fetch(`/api/team/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    else await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', email: '', role: 'member' }); setEditId(null); setShowForm(false); fetch_();
  };
  const roleColor: Record<string,string> = { admin:'bg-purple-500/20 text-purple-400', developer:'bg-blue-500/20 text-blue-400', member:'bg-gray-500/20 text-gray-400' };
  const roleLabel: Record<string,string> = { admin:t.admin, developer:t.developer, member:t.member };
  return (
    <div className="flex min-h-screen bg-gray-950 text-white" dir={isAr ? 'rtl' : 'ltr'}>
      <aside className="w-56 bg-gray-900 border-e border-gray-800 flex flex-col p-4 gap-2 fixed h-full">
        <div className="flex items-center gap-2 mb-6"><span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold">AI</span><span className="font-semibold text-sm">{t.appName}</span></div>
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">🏠 {t.dashboard}</Link>
        <Link href={`/${locale}/projects`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">📁 {t.projects}</Link>
        <Link href={`/${locale}/tasks`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">✅ {t.tasks}</Link>
        <Link href={`/${locale}/team`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm">👥 {t.title}</Link>
        <Link href={`/${locale}/settings`} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm">⚙️ {t.settings}</Link>
      </aside>
      <main className="flex-1 ms-56 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name:'', email:'', role:'member' }); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">+ {t.addMember}</button>
        </div>
        {showForm && (
          <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm text-gray-400 mb-1">{t.name}</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">{t.email}</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">{t.role}</label><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"><option value="member">{t.member}</option><option value="developer">{t.developer}</option><option value="admin">{t.admin}</option></select></div>
            </div>
            <div className="flex gap-3 mt-4"><button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">{t.save}</button><button type="button" onClick={()=>setShowForm(false)} className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">{t.cancel}</button></div>
          </form>
        )}
        {loading ? <div className="text-gray-400 text-center py-16">...</div>
        : members.length===0 ? <div className="text-gray-500 text-center py-16">{t.noMembers}</div>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{members.map(m=>(
          <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{m.name.charAt(0).toUpperCase()}</div>
              <div><p className="font-semibold">{m.name}</p><p className="text-gray-400 text-xs">{m.email}</p></div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${roleColor[m.role]}`}>{roleLabel[m.role] || m.role}</span>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>{setForm({name:m.name,email:m.email,role:m.role});setEditId(m.id);setShowForm(true);}} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg">{t.edit}</button>
              <button onClick={async()=>{await fetch(`/api/team/${m.id}`,{method:'DELETE'});fetch_();}} className="text-xs bg-red-900/40 text-red-400 px-3 py-1.5 rounded-lg">{t.delete}</button>
            </div>
          </div>
        ))}</div>}
      </main>
    </div>
  );
}
