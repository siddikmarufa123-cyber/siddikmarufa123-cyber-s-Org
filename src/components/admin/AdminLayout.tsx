import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { CourseManagement } from './CourseManagement';
import { StudentManagement } from './StudentManagement';
import { OrderManagement } from './OrderManagement';
import { CouponManagement } from './CouponManagement';
import { SiteSettings } from './SiteSettings';
import { SecuritySettings } from './SecuritySettings';
import { useLms } from '../../context/LmsContext';
import { Bell, ShieldCheck, User } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminTab, currentUser, setView } = useLms();

  return (
    <div className="flex min-h-screen bg-slate-100/70 text-slate-800">
      {/* Sidebar (Full Navigation) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-w-0">
        {/* Admin Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono">
              Admin Console
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-600 font-bangla capitalize">
              {adminTab === 'dashboard'
                ? 'ড্যাশবোর্ড ও মেট্রিক্স'
                : adminTab === 'courses'
                ? 'কোর্স ম্যানেজমেন্ট'
                : adminTab === 'students'
                ? 'স্টুডেন্ট ও ইউজার'
                : adminTab === 'orders'
                ? 'অর্ডার ও লেনদেন'
                : adminTab === 'coupons'
                ? 'কুপন ও ডিসকাউন্ট'
                : adminTab === 'site-settings'
                ? 'সাইট সেটিংস'
                : 'সিকিউরিটি ও পাইরেসি'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('public')}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 font-bangla transition-colors"
            >
              ওয়েবসাইট ভিউ ↗
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                {currentUser.name.slice(0, 1)}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-slate-900 font-bangla">{currentUser.name}</div>
                <div className="text-[10px] text-indigo-600 font-semibold font-mono">SUPER ADMIN</div>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport for Selected Admin Tab */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'courses' && <CourseManagement />}
          {adminTab === 'students' && <StudentManagement />}
          {adminTab === 'orders' && <OrderManagement />}
          {adminTab === 'coupons' && <CouponManagement />}
          {adminTab === 'site-settings' && <SiteSettings />}
          {adminTab === 'security' && <SecuritySettings />}
        </main>
      </div>
    </div>
  );
};
