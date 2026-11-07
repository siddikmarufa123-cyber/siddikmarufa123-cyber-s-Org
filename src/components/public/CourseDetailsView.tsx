import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  FileText,
  Lock,
  ShieldCheck,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';

interface CourseDetailsViewProps {
  courseId: string;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({ courseId }) => {
  const { courses, setView, openCheckout } = useLms();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'mod-3': true
  });
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  const course = courses.find(c => c.id === courseId) || courses[0];

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back navigation */}
        <button
          onClick={() => setView('public')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors font-bangla"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল কোর্সে ফিরে যান</span>
        </button>

        {/* 2-Column Layout: Left Details + Right Sticky Pricing & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Course Overview, Syllabus, Outcomes, Instructor */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded font-sans uppercase">
                  {course.category}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-bangla">{course.level}</span>
                {course.badge && (
                  <>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bangla">
                      {course.badge}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-bangla leading-tight">
                {course.title}
              </h1>

              <p className="text-sm text-slate-600 font-bangla leading-relaxed">
                {course.subtitle}
              </p>

              {/* Stats pill strip */}
              <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-500 font-bangla">
                <div className="flex items-center gap-1 font-mono-numbers">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">{course.rating}</span>
                  <span>({course.reviewsCount} টি রিভিউ)</span>
                </div>
                <div className="flex items-center gap-1 font-mono-numbers">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-slate-900">{course.enrolledCount} জন</span>
                  <span>শিক্ষার্থী ভর্তি হয়েছেন</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>মোট সময়: {course.duration}</span>
                </div>
              </div>
            </div>

            {/* Learning Outcomes Checklist */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-bangla">
                এই কোর্স শেষে আপনি যা যা শিখবেন (Learning Outcomes)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-bangla leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum / Syllabus Accordion */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-bangla">
                    ডিটেইলড কোর্স কারিকুলাম ও সিলেবাস
                  </h2>
                  <p className="text-xs text-slate-500 font-bangla mt-0.5">
                    {course.modules.length} টি মডিউল · {course.totalLectures} টি লেকচার ক্লাস
                  </p>
                </div>
              </div>

              {/* Accordion List */}
              <div className="space-y-3 pt-2">
                {course.modules.map(module => {
                  const isExpanded = !!expandedModules[module.id];
                  return (
                    <div
                      key={module.id}
                      className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
                    >
                      {/* Module Header Bar */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between text-left text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-slate-900 font-bangla text-sm">
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 font-mono-numbers">
                          <span>{module.lessons.length} টি ক্লাস</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Lessons List inside Module */}
                      {isExpanded && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {module.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              className="p-3.5 px-4 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                  {lesson.type === 'video' ? (
                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                  ) : (
                                    <FileText className="w-3 h-3" />
                                  )}
                                </div>
                                <span className="font-medium text-slate-800 font-bangla">
                                  {lesson.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isFreePreview ? (
                                  <button
                                    onClick={() => setPreviewVideoUrl(lesson.videoUrl)}
                                    className="px-2 py-0.5 rounded text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-bangla transition-colors"
                                  >
                                    ফ্রি প্রিভিউ
                                  </button>
                                ) : (
                                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                                    <Lock className="w-3 h-3" />
                                    <span>লকড</span>
                                  </span>
                                )}
                                <span className="font-mono text-slate-400 text-[11px]">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Audience & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm font-bangla">
                  কাদের জন্য এই কোর্স?
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 font-bangla">
                  {course.targetAudience.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm font-bangla">
                  কোর্সের পূর্বশর্ত (Requirements)
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 font-bangla">
                  {course.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructor Bio Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base font-bangla">
                কোর্স মেন্টর পরিচিতি
              </h3>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 shadow-sm">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base font-bangla">
                        {course.instructor.name}
                      </h4>
                      <div className="text-xs text-indigo-600 font-semibold font-bangla">
                        {course.instructor.title} · {course.instructor.company}
                      </div>
                    </div>
                    <div className="text-xs font-mono-numbers text-slate-500 font-semibold">
                      অভিজ্ঞতা: {course.instructor.experience}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-bangla leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Promotional Video & Checkout Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden p-6 space-y-5">
              {/* Promotional Video preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-sm group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                />
                <button
                  onClick={() => setPreviewVideoUrl(course.promoVideoUrl)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bangla px-2 py-0.5 rounded">
                  প্রোমো ভিডিও ওভারভিউ
                </div>
              </div>

              {/* Price Row */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono-numbers">
                    ৳{course.discountPrice.toLocaleString('en-IN')}
                  </span>
                  {course.regularPrice > course.discountPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono-numbers">
                      ৳{course.regularPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bangla">
                    ৫০% ছাড় চলছে
                  </span>
                </div>
                <div className="text-[11px] text-amber-700 font-bangla font-semibold">
                  ⏳ অফারটি আর মাত্র সীমিত সময়ের জন্য কার্যকর
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={() => openCheckout(course)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/30 transition-all font-bangla hover:-translate-y-0.5"
              >
                এখনই ভর্তি হোন (Enroll Now)
              </button>

              {/* Guarantee list */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600 font-bangla">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>৭ দিনের নো-কোয়েশ্চন মানি-ব্যাক গ্যারান্টি</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>ভেরিফায়েড ডিজিটাল সার্টিফিকেট</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>লাইফটাইম কোর্স ও ক্লাস আপডেট এক্সেস</span>
                </div>
              </div>

              {/* Supported payment icons */}
              <div className="pt-2 text-center">
                <div className="text-[10px] text-slate-400 font-bangla mb-1">
                  বিকাশ, নগদ, রকেট ও কার্ডে তাৎক্ষণিক অটোমেটেড পেমেন্ট
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <span>bKash</span>
                  <span>·</span>
                  <span>Nagad</span>
                  <span>·</span>
                  <span>Rocket</span>
                  <span>·</span>
                  <span>Cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Preview Video Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-slate-950 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-white font-bangla text-xs">
              <span>ফ্রি ভিডিও প্রিভিউ ক্লাস</span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                বন্ধ করুন ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video
                src={previewVideoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
