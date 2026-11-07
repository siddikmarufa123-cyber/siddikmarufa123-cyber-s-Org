import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { CoursePlayer } from './CoursePlayer';
import { CertificateModal } from './CertificateModal';

export const StudentPortal: React.FC = () => {
  const {
    courses,
    currentUser,
    getCourseProgress,
    setView,
    selectedCourseId,
    setPolicyModal
  } = useLms();

  const [activeCourseIdForPlayer, setActiveCourseIdForPlayer] = useState<string | null>(null);
  const [certCourse, setCertCourse] = useState<any | null>(null);

  // If a course is actively being played
  if (activeCourseIdForPlayer) {
    return <CoursePlayer courseId={activeCourseIdForPlayer} />;
  }

  // Filter enrolled courses for current user
  const enrolledCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bangla border border-indigo-400/30">
                স্টুডেন্ট লার্নিং ড্যাশবোর্ড
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentUser.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-bangla">
              স্বাগতম, {currentUser.name}! 🎓
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-bangla max-w-xl">
              আপনার কেনা কোর্সগুলোর লেকচার দেখুন, কোডিং প্রজেক্ট শেষ করুন এবং ভেরিফায়েড সার্টিফিকেট অর্জন করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setView('public');
                setTimeout(() => {
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold font-bangla transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>নতুন কোর্স ব্রাউজ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Enrolled Courses Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-bangla">
                আমার এনরোল্ড কোর্সসমূহ ({enrolledCourses.length})
              </h2>
              <p className="text-xs text-slate-500 font-bangla">
                আপনার সক্রিয় কোর্সসমূহ এবং প্রোগ্রেস ট্র্যাকিং
              </p>
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => {
                const progress = getCourseProgress(course.id);
                const isCompleted = progress === 100;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      {/* Thumbnail with Progress Overlay */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {course.category.toUpperCase()}
                        </div>
                        {isCompleted && (
                          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded font-bangla shadow-xs flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>১০০% সম্পন্ন</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-slate-900 text-sm font-bangla leading-snug line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="text-xs text-slate-500 font-bangla">
                          ইন্সট্রাক্টর: {course.instructor.name} · {course.totalLectures} টি লেকচার
                        </div>

                        {/* Progress Bar */}
                        <div className="pt-2 space-y-1">
                          <div className="flex justify-between text-xs text-slate-600 font-mono-numbers">
                            <span className="font-bangla">কোর্স প্রোগ্রেস:</span>
                            <span className="font-bold text-indigo-700">{progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              style={{ width: `${progress}%` }}
                              className={`h-full rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-5 pt-0 flex items-center gap-2 font-bangla">
                      <button
                        onClick={() => setActiveCourseIdForPlayer(course.id)}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>ক্লাস শুরু করুন</span>
                      </button>

                      {isCompleted && (
                        <button
                          onClick={() => setCertCourse(course)}
                          className="px-3 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                          title="সার্টিফিকেট দেখুন"
                        >
                          <Award className="w-4 h-4" />
                          <span>সার্টিফিকেট</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base font-bangla">
                  আপনি এখনও কোনো কোর্সে ভর্তি হননি
                </h3>
                <p className="text-xs text-slate-500 font-bangla">
                  আমাদের জনপ্রিয় কোর্সগুলো থেকে আপনার পছন্দের স্কিল সিলেক্ট করুন এবং শেখা শুরু করুন।
                </p>
              </div>
              <button
                onClick={() => setView('public')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-bangla shadow-xs transition-colors"
              >
                কোর্স ক্যাটালগ দেখুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {certCourse && (
        <CertificateModal
          course={certCourse}
          user={currentUser}
          onClose={() => setCertCourse(null)}
        />
      )}
    </div>
  );
};
