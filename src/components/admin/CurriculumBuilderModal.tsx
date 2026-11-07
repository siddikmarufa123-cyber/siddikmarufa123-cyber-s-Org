import React, { useState } from 'react';
import { X, Plus, Trash2, Video, FileText, HelpCircle, Eye, Sparkles } from 'lucide-react';
import { Course, CourseModule, CourseLesson } from '../../types/lms';
import { useLms } from '../../context/LmsContext';

interface CurriculumBuilderModalProps {
  course: Course;
  onClose: () => void;
}

export const CurriculumBuilderModal: React.FC<CurriculumBuilderModalProps> = ({ course, onClose }) => {
  const { addModuleToCourse, addLessonToModule, deleteLessonFromModule } = useLms();

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules[0]?.id || '');
  
  // New lesson form
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('১৫:০০ মিনিট');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [lessonType, setLessonType] = useState<CourseLesson['type']>('video');

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    addModuleToCourse(course.id, newModuleTitle.trim());
    setNewModuleTitle('');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !activeModuleId) return;

    addLessonToModule(course.id, activeModuleId, {
      title: lessonTitle.trim(),
      duration: lessonDuration,
      videoUrl: lessonVideoUrl,
      isFreePreview,
      type: lessonType,
      resources: [
        { id: `res-${Date.now()}`, name: `${lessonTitle}_Notes.pdf`, type: 'pdf', url: '#', size: '1.8 MB' }
      ]
    });

    setLessonTitle('');
  };

  const currentModule = course.modules.find(m => m.id === activeModuleId) || course.modules[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono">
                LMS Curriculum Builder
              </span>
              <h2 className="text-base font-bold text-slate-900 font-bangla">
                কারিকুলাম ও মডিউল নির্মাতা
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-bangla mt-0.5">
              কোর্স: <span className="font-semibold text-slate-800">{course.title}</span> ({course.modules.length} মডিউল, {course.totalLectures} ক্লাস)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left modules column + Right lessons & form */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left Column: Modules List & Add Module */}
          <div className="w-full md:w-72 bg-slate-50/70 p-4 flex flex-col overflow-y-auto shrink-0">
            <h3 className="text-xs font-bold text-slate-700 mb-3 font-bangla flex items-center justify-between">
              <span>মডিউলসমূহ</span>
              <span className="text-[11px] font-mono text-slate-400">{course.modules.length} টি</span>
            </h3>

            {/* Modules list */}
            <div className="space-y-2 flex-1">
              {course.modules.map(mod => {
                const isSelected = mod.id === activeModuleId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-white border-indigo-400 shadow-sm text-indigo-950 font-semibold ring-1 ring-indigo-400/20'
                        : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="truncate font-bangla">{mod.title}</div>
                    <div className="mt-1 text-[11px] text-slate-400 font-bangla flex items-center gap-2">
                      <span>{mod.lessons.length} টি ক্লাস</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add New Module Input */}
            <form onSubmit={handleCreateModule} className="mt-4 pt-3 border-t border-slate-200">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 font-bangla">
                নতুন মডিউল যুক্ত করুন
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  value={newModuleTitle}
                  onChange={e => setNewModuleTitle(e.target.value)}
                  placeholder="যেমন: মডিউল ৪: ডিপ্লয়মেন্ট..."
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Lessons of Active Module */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-bangla">
                    {currentModule?.title || 'মডিউল সিলেক্ট করুন'}
                  </h4>
                  <p className="text-xs text-slate-500 font-bangla">
                    এই মডিউলে থাকা ভিডিও ক্লাস, কুইজ ও লেকচার নোটস
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono-numbers">
                  {currentModule?.lessons.length || 0} টি লেকচার
                </span>
              </div>

              {/* Lessons Table / List */}
              <div className="mt-4 space-y-2">
                {currentModule?.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        {lesson.type === 'video' ? (
                          <Video className="w-3.5 h-3.5" />
                        ) : lesson.type === 'quiz' ? (
                          <HelpCircle className="w-3.5 h-3.5" />
                        ) : (
                          <FileText className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 font-bangla flex items-center gap-2">
                          <span>{lesson.title}</span>
                          {lesson.isFreePreview && (
                            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bangla">
                              ফ্রি প্রিভিউ
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {lesson.duration} · {lesson.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteLessonFromModule(course.id, currentModule.id, lesson.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Delete lesson"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {(!currentModule || currentModule.lessons.length === 0) && (
                  <div className="text-center py-8 text-xs text-slate-400 font-bangla">
                    এই মডিউলে এখনও কোনো ক্লাস যোগ করা হয়নি। নিচে ফর্মটি পূরণ করে ক্লাস যোগ করুন।
                  </div>
                )}
              </div>
            </div>

            {/* Add Lesson Form */}
            {currentModule && (
              <form onSubmit={handleCreateLesson} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 font-bangla flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>নতুন ক্লাস / লেকচার যুক্ত করুন</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 font-bangla">
                      ক্লাসের শিরোনাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={lessonTitle}
                      onChange={e => setLessonTitle(e.target.value)}
                      placeholder="যেমন: ৩.১ সার্ভার অ্যাকশন মাস্টারক্লাস"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 font-bangla">
                      ক্লাস ডিউরেশন
                    </label>
                    <input
                      type="text"
                      value={lessonDuration}
                      onChange={e => setLessonDuration(e.target.value)}
                      placeholder="যেমন: ২৫:৩০ মিনিট"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1 font-bangla">
                      ভিডিও স্ট্রিমিং URL (Bunny.net, Vimeo বা MP4)
                    </label>
                    <input
                      type="text"
                      value={lessonVideoUrl}
                      onChange={e => setLessonVideoUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 font-bangla">
                      ক্লাসের ধরণ
                    </label>
                    <select
                      value={lessonType}
                      onChange={e => setLessonType(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="video">ভিডিও ক্লাস (Video)</option>
                      <option value="quiz">কুইজ পরীক্ষা (Quiz)</option>
                      <option value="pdf">লেকচার নোটস (PDF)</option>
                      <option value="code">সোর্স কোড / প্রজেক্ট (Code)</option>
                    </select>
                  </div>

                  <div className="flex items-center self-end pb-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFreePreview}
                        onChange={e => setIsFreePreview(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-slate-700 font-bangla">
                        ফ্রি প্রিভিউ হিসেবে ওপেন রাখুন (Unenrolled দেখতে পারবে)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors font-bangla flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ক্লাসটি সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-bangla">
            সকল পরিবর্তন সাথে সাথে ডাটাবেস ও স্টুডেন্ট পোর্টালে কার্যকর হবে
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors font-bangla"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
