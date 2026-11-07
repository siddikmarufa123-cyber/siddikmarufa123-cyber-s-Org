import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  ShieldAlert,
  ChevronDown,
  User as UserIcon,
  Search,
  ShoppingCart
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { UserRole } from '../../types/lms';

export const Header: React.FC = () => {
  const {
    view,
    setView,
    currentUser,
    switchUserRole,
    setPolicyModal,
    searchQuery,
    setSearchQuery,
    siteSettings
  } = useLms();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Promotional / Urgent Notice Banner (if enabled in Admin) */}
      {siteSettings.noticeBanner.enabled && (
        <div
          className={`px-4 py-2 text-xs font-bangla transition-colors border-b ${
            siteSettings.noticeBanner.type === 'urgent'
              ? 'bg-rose-600 text-white border-rose-700'
              : siteSettings.noticeBanner.type === 'announcement'
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white border-indigo-800'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              {siteSettings.noticeBanner.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 uppercase tracking-wide">
                  {siteSettings.noticeBanner.badge}
                </span>
              )}
              <span className="truncate">{siteSettings.noticeBanner.message}</span>
            </div>
            {siteSettings.noticeBanner.linkText && (
              <button
                onClick={() => {
                  setView('public');
                  setTimeout(() => {
                    document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="shrink-0 text-white underline underline-offset-2 hover:text-white/80 font-bold transition-colors"
              >
                {siteSettings.noticeBanner.linkText} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Header (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element, no pills) */}
          <button
            onClick={() => setView('public')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-xl text-slate-900 tracking-tight whitespace-nowrap">
              ProCoder<span className="text-indigo-600">BD</span>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                setView('public');
                setTimeout(() => {
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 font-bangla"
            >
              কোর্সসমূহ
            </button>

            <button
              onClick={() => {
                setView('public');
                setTimeout(() => {
                  document.getElementById('values-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 font-bangla"
            >
              কেন ProCoder BD
            </button>

            <button
              onClick={() => {
                setView('public');
                setTimeout(() => {
                  document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 font-bangla"
            >
              সফলতার গল্প
            </button>

            <button
              onClick={() => setPolicyModal('refund')}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 font-bangla text-slate-600"
            >
              রিফান্ড পলিসি
            </button>
          </nav>

          {/* Zone 3: Primary Action & Interactive Role Switcher Hub */}
          <div className="flex items-center gap-3 shrink-0">
            {/* View Switching Direct Buttons */}
            {view === 'admin' ? (
              <button
                onClick={() => setView('public')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-bangla whitespace-nowrap shrink-0"
              >
                পাবলিক ভিউ
              </button>
            ) : (
              <button
                onClick={() => setView('admin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors font-bangla whitespace-nowrap shrink-0"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                <span>অ্যাডমিন প্যানেল</span>
              </button>
            )}

            {/* Student Learning Portal Button */}
            <button
              onClick={() => setView('student-portal')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all font-bangla whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                view === 'student-portal'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>লার্নিং পোর্টাল</span>
            </button>

            {/* Quick Profile / Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors text-xs font-medium text-slate-800"
                title="Switch active role / user"
              >
                <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs uppercase">
                  {currentUser.name.slice(0, 1)}
                </div>
                <span className="hidden md:inline font-bangla font-semibold truncate max-w-[100px]">
                  {currentUser.role === 'admin' ? 'অ্যাডমিন' : currentUser.role === 'instructor' ? 'ইন্সট্রাক্টর' : 'শিক্ষার্থী'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-bangla">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900 truncate">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                  </div>

                  <div className="py-1">
                    <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
                      রোল পরিবর্তন করুন (Test Switcher)
                    </div>
                    {(['admin', 'student', 'instructor'] as UserRole[]).map(r => (
                      <button
                        key={r}
                        onClick={() => {
                          switchUserRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          currentUser.role === r ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span className="capitalize">
                          {r === 'admin' ? 'অ্যাডমিন (Admin)' : r === 'instructor' ? 'ইন্সট্রাক্টর (Instructor)' : 'শিক্ষার্থী (Student)'}
                        </span>
                        {currentUser.role === r && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setView('public');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      পাবলিক হোমপেজে যান
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
