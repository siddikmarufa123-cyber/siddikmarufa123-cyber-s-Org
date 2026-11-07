import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Layers,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Course } from '../../types/lms';
import { CourseModal } from './CourseModal';
import { CurriculumBuilderModal } from './CurriculumBuilderModal';

export const CourseManagement: React.FC = () => {
  const { courses, deleteCourse, toggleCourseStatus, setView } = useLms();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modals state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [curriculumCourse, setCurriculumCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
            কোর্স ম্যানেজমেন্ট ও এলএমএস বিল্ডার
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bangla">
            নতুন কোর্স তৈরি, মূল্য ও অফার নির্ধারণ, মডিউল/লেকচার সাজানো এবং পাবলিশিং কন্ট্রোল
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto font-bangla"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কোর্স তৈরি করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-bangla shrink-0">ক্যাটাগরি:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla w-full sm:w-auto"
          >
            <option value="all">সকল ক্যাটাগরি ({courses.length})</option>
            <option value="web-dev">Web Development</option>
            <option value="ai-ml">AI & Data Science</option>
            <option value="mobile-app">Mobile App</option>
            <option value="cyber-security">Cyber Security</option>
          </select>
        </div>
      </div>

      {/* Course List Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3.5 px-4 font-bangla">কোর্স ও বিবরণ</th>
                <th className="py-3.5 px-4 font-bangla">ক্যাটাগরি ও লেভেল</th>
                <th className="py-3.5 px-4 text-right font-bangla">রেগুলার / ডিসকাউন্ট মূল্য</th>
                <th className="py-3.5 px-4 text-center font-bangla">এনরোল্ড শিক্ষার্থী</th>
                <th className="py-3.5 px-4 text-center font-bangla">পাবলিশ স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right font-bangla">অ্যাকশন ও সিলেবাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Course Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="max-w-xs">
                        <div className="font-bold text-slate-900 truncate font-bangla text-xs">
                          {course.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-bangla truncate">
                          মেন্টর: {course.instructor.name} · {course.modules.length} টি মডিউল
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category & Level */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] uppercase">
                      {course.category}
                    </span>
                    <div className="text-slate-400 text-[10px] mt-0.5">{course.level}</div>
                  </td>

                  {/* Pricing */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="font-bold text-slate-900 font-mono-numbers text-sm">
                      ৳{course.discountPrice.toLocaleString('en-IN')}
                    </div>
                    {course.regularPrice > course.discountPrice && (
                      <div className="text-[11px] text-slate-400 line-through font-mono-numbers">
                        ৳{course.regularPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  {/* Enrollment Count */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="font-mono-numbers font-bold text-slate-800">
                      {course.enrolledCount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bangla">ভর্তি হয়েছেন</div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => toggleCourseStatus(course.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors font-bangla ${
                        course.isLive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${course.isLive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{course.isLive ? 'লাইভ' : 'ড্রাফট'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Manage Curriculum */}
                      <button
                        onClick={() => setCurriculumCourse(course)}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-xs transition-colors font-bangla flex items-center gap-1"
                        title="কারিকুলাম ও মডিউল সাজান"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>সিলেবাস</span>
                      </button>

                      {/* Edit Details */}
                      <button
                        onClick={() => setEditingCourse(course)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="কোর্স এডিট করুন"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* View on Frontend */}
                      <button
                        onClick={() => setView('course-details', course.id)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="পাবলিক পেজ দেখুন"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি "${course.title}" কোর্সটি মুছে ফেলতে চান?`)) {
                            deleteCourse(course.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs font-bangla">
            কোনো কোর্স খুঁজে পাওয়া যায়নি।
          </div>
        )}
      </div>

      {/* Course Modal (Create or Edit) */}
      {(isCreatingNew || editingCourse) && (
        <CourseModal
          course={editingCourse}
          onClose={() => {
            setIsCreatingNew(false);
            setEditingCourse(null);
          }}
        />
      )}

      {/* Curriculum & Module Builder Modal */}
      {curriculumCourse && (
        <CurriculumBuilderModal
          course={curriculumCourse}
          onClose={() => setCurriculumCourse(null)}
        />
      )}
    </div>
  );
};
