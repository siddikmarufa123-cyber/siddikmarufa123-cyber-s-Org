import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  TicketPercent,
  Settings,
  ShieldCheck,
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useLms, AdminTab } from '../../context/LmsContext';

export const AdminSidebar: React.FC = () => {
  const { adminTab, setAdminTab, setView, courses, orders, users, resetAllData } = useLms();

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    {
      id: 'dashboard',
      label: 'ড্যাশবোর্ড ও অ্যানালিটিক্স',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'courses',
      label: 'কোর্স ম্যানেজমেন্ট',
      icon: <BookOpen className="w-5 h-5" />,
      badge: courses.length
    },
    {
      id: 'students',
      label: 'স্টুডেন্ট ও ইউজার',
      icon: <Users className="w-5 h-5" />,
      badge: users.length
    },
    {
      id: 'orders',
      label: 'অর্ডার ও পেমেন্ট',
      icon: <CreditCard className="w-5 h-5" />,
      badge: orders.filter(o => o.status === 'pending').length ? '১ পেন্ডিং' : undefined
    },
    {
      id: 'coupons',
      label: 'কুপন ও ডিসকাউন্ট',
      icon: <TicketPercent className="w-5 h-5" />
    },
    {
      id: 'site-settings',
      label: 'সাইট ও কন্টেন্ট সেটিংস',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'security',
      label: 'সিকিউরিটি ও পাইরেসি',
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white tracking-tight flex items-center gap-1.5 text-base">
              ProCoder <span className="text-indigo-400">Admin</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">v2.4 · Management</div>
          </div>
        </div>
      </div>

      {/* Revenue Mini-HUD */}
      <div className="mx-4 my-4 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
        <div className="text-xs text-slate-400 font-bangla mb-1">মোট আর্নিং (Verified)</div>
        <div className="text-xl font-bold text-white font-mono-numbers tracking-tight flex items-baseline gap-1">
          <span className="text-indigo-400 font-sans text-sm font-semibold">৳</span>
          {totalRevenue.toLocaleString('en-IN')}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
          <span>মোট সেলস: {orders.filter(o => o.status === 'completed').length} টি</span>
          <span className="text-emerald-400 font-mono-numbers">100% Active</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1.5 text-[11px] font-semibold text-slate-400 tracking-wider font-bangla">
          কোর মডিউলসমূহ
        </div>
        {navItems.map(item => {
          const isActive = adminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAdminTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono-numbers ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : typeof item.badge === 'string'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setView('public')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700/50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>পাবলিক ওয়েবসাইট দেখুন</span>
        </button>
        <button
          onClick={resetAllData}
          title="Reset database to initial mock state"
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>ডিফল্ট ডাটা রিস্টোর</span>
        </button>
      </div>
    </aside>
  );
};
