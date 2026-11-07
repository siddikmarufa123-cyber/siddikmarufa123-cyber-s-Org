import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  CreditCard,
  PlusCircle,
  TicketPercent,
  Bell,
  UserCheck,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const AdminDashboard: React.FC = () => {
  const { courses, users, orders, coupons, setAdminTab, setView, updateOrderStatus } = useLms();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('month');

  // Completed orders only for valid revenue
  const completedOrders = orders.filter(o => o.status === 'completed');
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalStudents = users.filter(u => u.role === 'student' && u.status === 'active').length;
  const totalCourses = courses.length;
  const averageOrderValue = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;

  // Timeframe based revenue calculation
  const multiplier = timeRange === 'today' ? 0.15 : timeRange === 'week' ? 0.45 : timeRange === 'month' ? 0.85 : 1;
  const displayRevenue = Math.round(totalRevenue * multiplier);
  const displaySalesCount = Math.max(1, Math.round(completedOrders.length * multiplier));

  // Top courses by enrollment
  const sortedCourses = [...courses].sort((a, b) => b.enrolledCount - a.enrolledCount);
  const maxEnrollment = Math.max(...sortedCourses.map(c => c.enrolledCount), 1);

  // Revenue chart mock points (7 days)
  const chartDays = [
    { day: 'শনি', amount: 8400, label: '৳8,400' },
    { day: 'রবি', amount: 12600, label: '৳12,600' },
    { day: 'সোম', amount: 7500, label: '৳7,500' },
    { day: 'মঙ্গল', amount: 18900, label: '৳18,900' },
    { day: 'বুধ', amount: 14200, label: '৳14,200' },
    { day: 'বৃহঃ', amount: 21500, label: '৳21,500' },
    { day: 'শুক্র', amount: 28000, label: '৳28,000' }
  ];
  const maxDayAmount = Math.max(...chartDays.map(d => d.amount));

  return (
    <div className="space-y-8">
      {/* Top Header & Time Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
            ড্যাশবোর্ড ও বিজনেস অ্যানালিটিক্স
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bangla">
            প্ল্যাটফর্মের রিয়েল-টাইম সেলস, শিক্ষার্থী অ্যাক্টিভিটি এবং কোর্স স্ট্যাটিস্টিক্স এক নজরে
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg border border-slate-300/60 self-start md:self-auto">
          {(['today', 'week', 'month', 'all'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                timeRange === range
                  ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === 'today' ? 'আজ' : range === 'week' ? 'এই সপ্তাহ' : range === 'month' ? 'এই মাস' : 'সব সময়'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 font-bangla">মোট রেভিনিউ</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-slate-400">৳</span>
            <span className="text-2xl font-bold text-slate-900 font-mono-numbers tracking-tight">
              {displayRevenue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-medium font-bangla">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+১৮.৪% গত মাসের তুলনায় বৃদ্ধি</span>
          </div>
        </div>

        {/* Metric 2: Active Students */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 font-bangla">অ্যাক্টিভ শিক্ষার্থী</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 font-mono-numbers tracking-tight">
              {totalStudents.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 ml-1 font-bangla">জন রেজিস্টার্ড</span>
          </div>
          <div className="mt-2 text-xs text-indigo-600 flex items-center gap-1 font-medium font-bangla">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>৯৫% সক্রিয় লার্নিং রেশিও</span>
          </div>
        </div>

        {/* Metric 3: Total Sales */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 font-bangla">কোর্স বিক্রি সংখ্যা</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 font-mono-numbers tracking-tight">
              {displaySalesCount}
            </span>
            <span className="text-xs text-slate-400 ml-1 font-bangla">টি অর্ডার সম্পন্ন</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-bangla">
            <span>কুপন ব্যবহারে ছাড়: ১২% অর্ডার</span>
          </div>
        </div>

        {/* Metric 4: Average Order Value */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 font-bangla">অ্যাভারেজ অর্ডার ভ্যালু (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-slate-400">৳</span>
            <span className="text-2xl font-bold text-slate-900 font-mono-numbers tracking-tight">
              {averageOrderValue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-bangla">
            <span>পেমেন্ট মাধ্যম: bKash (৬২%), Nagad (২৮%)</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar (শর্টকাট অ্যাকশন বাটন) */}
      <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
            <PlusCircle className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-indigo-950 font-bangla">কুইক অ্যাকশন হাব:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAdminTab('courses')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>নতুন কোর্স যুক্ত করুন</span>
          </button>
          <button
            onClick={() => setAdminTab('coupons')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <TicketPercent className="w-3.5 h-3.5 text-amber-600" />
            <span>নতুন ডিসকাউন্ট কুপন তৈরি</span>
          </button>
          <button
            onClick={() => setAdminTab('students')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ম্যানুয়াল শিক্ষার্থী এনরোল</span>
          </button>
          <button
            onClick={() => setAdminTab('site-settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            <span>জরুরি নোটিশ / ঘোষণা দিন</span>
          </button>
        </div>
      </div>

      {/* 2-Column Analytics: Revenue Chart & Course Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): 7-Day Revenue Trend Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-bangla">
                  রেভিনিউ ট্রেন্ড ও সেলস অ্যানালাইসিস
                </h3>
                <p className="text-xs text-slate-500 font-bangla">গত ৭ দিনের দৈনিক বিক্রির পারফরম্যান্স গ্রাফ</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 font-bangla">সপ্তাহের মোট আয়</div>
                <div className="text-lg font-bold text-slate-900 font-mono-numbers">৳১,০২,৮০০</div>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="mt-8 pt-4 pb-2">
              <div className="h-44 flex items-end gap-3 sm:gap-6 justify-between px-2">
                {chartDays.map((item, idx) => {
                  const heightPercent = Math.round((item.amount / maxDayAmount) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono-numbers font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 whitespace-nowrap">
                        {item.label}
                      </div>
                      <div className="w-full max-w-[36px] bg-slate-100 rounded-t-md h-full flex items-end overflow-hidden">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            idx === chartDays.length - 1
                              ? 'bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-sm'
                              : 'bg-indigo-300 group-hover:bg-indigo-500'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-bangla font-medium text-slate-600">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bangla">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block" />
              দৈনিক কোর্স বিক্রির পরিমাণ
            </span>
            <span>সর্বোচ্চ বিক্রি: শুক্রবার (৳২৮,০০০)</span>
          </div>
        </div>

        {/* Right Column (1 Col): Top Enrolled Courses Leaderboard */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-bangla">
                টপ এনরোল্ড কোর্সসমূহ
              </h3>
              <button
                onClick={() => setAdminTab('courses')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium font-bangla flex items-center gap-0.5"
              >
                সবগুলো <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-4">
              {sortedCourses.slice(0, 4).map((course, idx) => {
                const percentage = Math.round((course.enrolledCount / maxEnrollment) * 100);
                return (
                  <div key={course.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <span className="font-mono text-slate-400 font-semibold">{idx + 1}.</span>
                        <span className="font-semibold text-slate-800 truncate" title={course.title}>
                          {course.title}
                        </span>
                      </div>
                      <span className="font-mono-numbers text-indigo-600 font-bold shrink-0">
                        {course.enrolledCount} জন
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full ${
                          idx === 0
                            ? 'bg-emerald-500'
                            : idx === 1
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200/60 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-800 font-bangla">
                <span className="font-semibold">মার্কেট ট্রেন্ড:</span> ওয়েব ডেভেলপমেন্ট ও এআই কোর্সে গত ৭ দিনে রেকর্ড সংখ্যক ভর্তি হয়েছে।
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders / Transactions Table with Pending Notice */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-bangla">
                সাম্প্রতিক লেনদেন ও পেমেন্ট হিস্ট্রি
              </h3>
              {pendingOrders.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded font-bangla">
                  {pendingOrders.length} টি ভেরিফিকেশন পেন্ডিং
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-bangla">
              বিকাশ, নগদ বা কার্ডের মাধ্যমে হওয়া সাম্প্রতিক কোর্স এনরোলমেন্ট রিপোর্ট
            </p>
          </div>
          <button
            onClick={() => setAdminTab('orders')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold font-bangla flex items-center gap-1 self-start sm:self-auto"
          >
            সম্পূর্ণ লেনদেন তালিকা দেখুন <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-4 font-bangla">অর্ডার নাম্বার</th>
                <th className="py-3 px-4 font-bangla">শিক্ষার্থী</th>
                <th className="py-3 px-4 font-bangla">কোর্স</th>
                <th className="py-3 px-4 font-bangla">পেমেন্ট মেথড ও TrxID</th>
                <th className="py-3 px-4 text-right font-bangla">মূল্য</th>
                <th className="py-3 px-4 text-center font-bangla">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right font-bangla">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 font-bangla">{order.studentName}</div>
                    <div className="text-slate-500 font-mono text-[11px]">{order.studentPhone}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate font-medium text-slate-800">
                    {order.courseTitle}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 uppercase font-semibold text-slate-700">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        order.paymentMethod === 'bkash'
                          ? 'bg-pink-100 text-pink-700'
                          : order.paymentMethod === 'nagad'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.paymentMethod}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px]">{order.trxId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono-numbers font-bold text-slate-900 whitespace-nowrap">
                    ৳{order.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium font-bangla ${
                      order.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : order.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {order.status === 'completed' ? 'সফল' : order.status === 'pending' ? 'পেন্ডিং' : 'বাতিল'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors font-bangla"
                      >
                        অনুমোদন দিন
                      </button>
                    ) : (
                      <button
                        onClick={() => setView('course-details', order.courseId)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold font-bangla"
                      >
                        বিস্তারিত
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
