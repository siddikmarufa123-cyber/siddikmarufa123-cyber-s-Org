import React, { useState } from 'react';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Course } from '../../types/lms';

export const CourseCatalog: React.FC = () => {
  const { courses, setView, openCheckout } = useLms();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Show only live courses on public page unless empty
  const liveCourses = courses.filter(c => c.isLive);

  const filteredCourses = liveCourses.filter(course => {
    const matchesCat = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'সকল কোর্স' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'ai-ml', label: 'AI & Data Science' },
    { id: 'mobile-app', label: 'Mobile App (Flutter)' },
    { id: 'cyber-security', label: 'Cyber Security' }
  ];

  return (
    <section id="courses-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-indigo-600 tracking-wider font-bangla uppercase mb-1">
              এক্সক্লুসিভ কোর্স ক্যাটালগ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-bangla">
              ক্যারিয়ার গড়ার সেরা ইন্ডাস্ট্রি-ফোকাসড কোর্সসমূহ
            </h2>
            <p className="text-sm text-slate-500 font-bangla mt-1">
              প্রতিটি কোর্সের সাথে থাকছে লাইফটাইম অ্যাক্সেস, ১-অন-১ লাইভ মেন্টর সাপোর্ট এবং ভেরিফায়েড সার্টিফিকেট
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="কোর্স বা স্কিল খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla shadow-2xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all font-bangla ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {course.badge && (
                    <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md font-bangla shadow-xs">
                      {course.badge}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                    {course.duration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bangla">
                    <span className="font-semibold text-indigo-600 uppercase tracking-wide text-[11px] font-sans">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1 font-mono-numbers">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-800">{course.rating}</span>
                      <span className="text-slate-400">({course.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3
                    onClick={() => setView('course-details', course.id)}
                    className="font-bold text-slate-900 text-base font-bangla group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {course.title}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-slate-500 font-bangla line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  {/* Instructor row */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-slate-800 font-bangla truncate max-w-[120px]">
                        {course.instructor.name}
                      </span>
                    </div>
                    <div className="text-slate-400 font-mono-numbers text-[11px] flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.enrolledCount} জন</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bangla">কোর্স ফি</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-slate-900 font-mono-numbers">
                      ৳{course.discountPrice.toLocaleString('en-IN')}
                    </span>
                    {course.regularPrice > course.discountPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono-numbers">
                        ৳{course.regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView('course-details', course.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors font-bangla"
                  >
                    সিলেবাস
                  </button>
                  <button
                    onClick={() => openCheckout(course)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors font-bangla"
                  >
                    ভর্তি হোন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 font-bangla">কোনো কোর্স পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-400 font-bangla">অনুগ্রহ করে অন্য কোনো ক্যাটাগরি বা কিওয়ার্ড দিয়ে অনুসন্ধান করুন</p>
          </div>
        )}
      </div>
    </section>
  );
};
