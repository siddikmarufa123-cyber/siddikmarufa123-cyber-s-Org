import React, { useState } from 'react';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Shield,
  BookOpen,
  Plus,
  X,
  CheckCircle,
  Phone,
  Mail,
  Smartphone
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { User, UserRole, UserStatus } from '../../types/lms';

export const StudentManagement: React.FC = () => {
  const {
    users,
    courses,
    manualEnrollStudent,
    updateUserStatus,
    updateUserRole,
    addNewStudent
  } = useLms();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');

  // Manual Enroll modal state
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  // Add new user modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleManualEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedCourseId) return;
    manualEnrollStudent(selectedStudentId, selectedCourseId);
    setShowEnrollModal(false);
    setSelectedStudentId('');
    setSelectedCourseId('');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    addNewStudent(newName.trim(), newEmail.trim(), newPhone.trim() || '+8801700000000');
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setShowAddUserModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
            স্টুডেন্ট ও ইউজার ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bangla">
            রেজিস্টার্ড শিক্ষার্থী তালিকা, রোল অ্যাসাইন, ম্যানুয়াল কোর্স এক্সেস ও একাউন্ট সিকিউরিটি
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowEnrollModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors font-bangla"
          >
            <UserCheck className="w-4 h-4" />
            <span>ম্যানুয়াল এনরোলমেন্ট দিন</span>
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors font-bangla"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ইউজার</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-bangla shrink-0">রোল:</span>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
            >
              <option value="all">সকল রোল ({users.length})</option>
              <option value="student">শিক্ষার্থী (Student)</option>
              <option value="instructor">ইন্সট্রাক্টর (Instructor)</option>
              <option value="admin">অ্যাডমিন (Admin)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-bangla shrink-0">স্ট্যাটাস:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="active">Active (সক্রিয়)</option>
              <option value="suspended">Suspended (স্থগিত)</option>
              <option value="blocked">Blocked (ব্লকড)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3.5 px-4 font-bangla">ইউজার প্রোফাইল</th>
                <th className="py-3.5 px-4 font-bangla">যোগাযোগ (ইমেল ও ফোন)</th>
                <th className="py-3.5 px-4 font-bangla">রোল ও অধিকার</th>
                <th className="py-3.5 px-4 font-bangla">কেনা কোর্সসমূহ</th>
                <th className="py-3.5 px-4 text-center font-bangla">ডিভাইস সীমা</th>
                <th className="py-3.5 px-4 text-center font-bangla">একাউন্ট স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right font-bangla">ম্যানেজমেন্ট অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(user => {
                const enrolledCourses = courses.filter(c => user.enrolledCourseIds.includes(c.id));
                return (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* User Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 uppercase text-xs">
                          {user.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 font-bangla">{user.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Joined {user.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-mono text-[11px] flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{user.phone}</span>
                      </div>
                    </td>

                    {/* Role selector */}
                    <td className="py-3.5 px-4">
                      <select
                        value={user.role}
                        onChange={e => updateUserRole(user.id, e.target.value as UserRole)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded border focus:outline-none ${
                          user.role === 'admin'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : user.role === 'instructor'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Enrolled Courses */}
                    <td className="py-3.5 px-4">
                      {enrolledCourses.length > 0 ? (
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 font-mono-numbers">
                            {enrolledCourses.length} টি কোর্স:
                          </span>
                          <div className="text-[11px] text-slate-500 max-w-xs truncate font-bangla">
                            {enrolledCourses.map(c => c.title).join(', ')}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-bangla">কোনো কোর্স নেই</span>
                      )}
                    </td>

                    {/* Device count */}
                    <td className="py-3.5 px-4 text-center font-mono text-[11px]">
                      <span className="font-semibold text-slate-800">{user.activeDevices}</span>
                      <span className="text-slate-400"> / {user.deviceLimit}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium font-bangla ${
                          user.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : user.status === 'suspended'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {user.status === 'active' ? 'সক্রিয়' : user.status === 'suspended' ? 'স্থগিত' : 'ব্লকড'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {user.status === 'active' ? (
                          <button
                            onClick={() => updateUserStatus(user.id, 'suspended')}
                            className="px-2 py-1 text-[11px] font-medium text-amber-700 hover:bg-amber-50 rounded border border-amber-200 transition-colors font-bangla"
                            title="সাসপেন্ড করুন"
                          >
                            সাসপেন্ড
                          </button>
                        ) : (
                          <button
                            onClick={() => updateUserStatus(user.id, 'active')}
                            className="px-2 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50 rounded border border-emerald-200 transition-colors font-bangla"
                            title="সক্রিয় করুন"
                          >
                            আনব্লক
                          </button>
                        )}

                        {user.status !== 'blocked' && (
                          <button
                            onClick={() => updateUserStatus(user.id, 'blocked')}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="স্থায়ী ব্লক"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-bangla text-base">
                    ম্যানুয়াল কোর্স এনরোলমেন্ট
                  </h3>
                  <p className="text-xs text-slate-500 font-bangla">
                    অফলাইন পেমেন্ট বা স্পেশাল এক্সেসের জন্য স্টুডেন্টকে কোর্স অ্যাসাইন করুন
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualEnroll} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  শিক্ষার্থী সিলেক্ট করুন *
                </label>
                <select
                  required
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">-- একজন শিক্ষার্থী বেছে নিন --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email} - {u.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  কোন কোর্সে এনরোল করবেন? *
                </label>
                <select
                  required
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">-- কোর্স বেছে নিন --</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} (৳{c.discountPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] font-bangla">
                নোট: ম্যানুয়াল এনরোলমেন্টের সাথে সাথে একটি অডিট অর্ডার রেকর্ড তৈরি হবে এবং শিক্ষার্থীর অ্যাকাউন্টে কোর্সটি লাইভ আনলক হয়ে যাবে।
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bangla"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm font-bangla flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>এনরোল নিশ্চিত করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 font-bangla text-base">
                নতুন শিক্ষার্থী যোগ করুন
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">নাম *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="যেমন: সাকিব আল হাসান"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">ইমেল এড্রেস *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="shakib@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">ফোন নম্বর (bKash/WhatsApp)</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bangla"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm font-bangla"
                >
                  ইউজার তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
