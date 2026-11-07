import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  CheckCircle,
  Circle,
  FileText,
  Download,
  HelpCircle,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Course, CourseLesson, CourseModule } from '../../types/lms';
import { QuizModule } from './QuizModule';
import { CertificateModal } from './CertificateModal';

interface CoursePlayerProps {
  courseId: string;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ courseId }) => {
  const {
    courses,
    currentUser,
    markLessonComplete,
    isLessonComplete,
    getCourseProgress,
    securitySettings,
    setView
  } = useLms();

  const course = courses.find(c => c.id === courseId) || courses[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active module and lesson selection
  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules[0]?.id || '');
  const [activeLessonId, setActiveLessonId] = useState<string>(course.modules[0]?.lessons[0]?.id || '');
  
  // Player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoQuality, setVideoQuality] = useState<string>('1080p Full HD');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'quiz' | 'support'>('overview');
  
  // Certificate modal
  const [showCertModal, setShowCertModal] = useState(false);

  // Watermark coordinates animation state
  const [watermarkPos, setWatermarkPos] = useState({ top: 15, left: 20 });

  useEffect(() => {
    // If watermark enabled, subtly shift position every 6 seconds to prevent video scraping
    const interval = setInterval(() => {
      setWatermarkPos({
        top: Math.floor(10 + Math.random() * 70),
        left: Math.floor(10 + Math.random() * 70)
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Find active lesson object
  let activeLesson: CourseLesson | undefined;
  for (const mod of course.modules) {
    const found = mod.lessons.find(l => l.id === activeLessonId);
    if (found) {
      activeLesson = found;
      break;
    }
  }

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const currentLessonCompleted = activeLesson ? isLessonComplete(course.id, activeLesson.id) : false;
  const progressPercent = getCourseProgress(course.id);

  // Next / Previous Lesson Handler
  const allLessons: { module: CourseModule; lesson: CourseLesson }[] = [];
  course.modules.forEach(m => {
    m.lessons.forEach(l => {
      allLessons.push({ module: m, lesson: l });
    });
  });

  const currentIndex = allLessons.findIndex(item => item.lesson.id === activeLessonId);

  const goToNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setActiveModuleId(next.module.id);
      setActiveLessonId(next.lesson.id);
      setIsPlaying(false);
    }
  };

  const goToPrevLesson = () => {
    if (currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      setActiveModuleId(prev.module.id);
      setActiveLessonId(prev.lesson.id);
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col">
      {/* Top Header in Player */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('student-portal')}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors font-bangla text-xs flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <h2 className="text-xs sm:text-sm font-bold text-white font-bangla truncate max-w-md">
            {course.title}
          </h2>
        </div>

        {/* Progress Tracker bar & Certificate Unlock */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className={`h-full rounded-full transition-all duration-300 ${
                  progressPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-300">
              {progressPercent}% সম্পূর্ণ
            </span>
          </div>

          {progressPercent === 100 ? (
            <button
              onClick={() => setShowCertModal(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all font-bangla flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>সার্টিফিকেট দেখুন</span>
            </button>
          ) : (
            <button
              onClick={() => {
                // Quick mark all completed to preview certificate immediately
                allLessons.forEach(item => {
                  if (!isLessonComplete(course.id, item.lesson.id)) {
                    markLessonComplete(course.id, item.lesson.id);
                  }
                });
              }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-bangla transition-colors"
              title="টেস্ট করার জন্য সব ক্লাস সম্পন্ন মার্ক করুন"
            >
              সব ক্লাস সম্পন্ন করুন (100%)
            </button>
          )}
        </div>
      </div>

      {/* Main Learning Room Layout: Left Player + Right Curriculum Accordion */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column (8 or 9 cols): Video Viewport + Tabs */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-slate-950 overflow-y-auto">
          {/* Secured Video Player Frame */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden select-none group">
            {activeLesson?.videoUrl ? (
              <video
                ref={videoRef}
                src={activeLesson.videoUrl}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  if (activeLesson) markLessonComplete(course.id, activeLesson.id);
                }}
              />
            ) : (
              <div className="p-8 text-center space-y-2">
                <HelpCircle className="w-12 h-12 text-indigo-400 mx-auto" />
                <h3 className="text-base font-bold font-bangla text-white">{activeLesson?.title}</h3>
                <p className="text-xs text-slate-400 font-bangla">এই লেকচারে কুইজ বা রিসোর্স দেওয়া হয়েছে। নিচের ট্যাবগুলো দেখুন।</p>
              </div>
            )}

            {/* Anti-Piracy Dynamic Floating Watermark (DRM Simulator) */}
            {securitySettings.dynamicWatermark && (
              <div
                style={{
                  top: `${watermarkPos.top}%`,
                  left: `${watermarkPos.left}%`,
                  transition: 'all 3s ease-in-out'
                }}
                className="absolute pointer-events-none select-none z-20 text-[10px] sm:text-xs font-mono text-white/30 font-semibold px-2.5 py-1 rounded bg-black/20 backdrop-blur-2xs"
              >
                {securitySettings.watermarkContent === 'student_info'
                  ? `${currentUser.email} · ${currentUser.phone}`
                  : securitySettings.customWatermarkText}
              </div>
            )}

            {/* Floating Video Overlay Controls on Hover */}
            {activeLesson?.videoUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between pointer-events-none">
                {/* Top Title */}
                <div className="text-xs font-medium text-slate-300 font-bangla">
                  {activeLesson.title}
                </div>

                {/* Bottom Bar Controls */}
                <div className="flex items-center justify-between text-white pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <span className="text-xs font-mono text-slate-300">
                      {activeLesson.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 relative">
                    {/* Quality badge */}
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {videoQuality}
                    </span>

                    {/* Speed switcher */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="px-2 py-1 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 rounded transition-colors"
                      >
                        {playbackSpeed}x
                      </button>

                      {showSpeedMenu && (
                        <div className="absolute bottom-8 right-0 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-30 font-mono text-xs w-20">
                          {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                            <button
                              key={speed}
                              onClick={() => handleSpeedChange(speed)}
                              className={`w-full text-center py-1 hover:bg-slate-800 transition-colors ${
                                playbackSpeed === speed ? 'text-indigo-400 font-bold' : 'text-slate-300'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Action Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-base font-bold text-white font-bangla">
                {activeLesson?.title || 'ক্লাস সিলেক্ট করুন'}
              </h1>
              <p className="text-xs text-slate-400 font-bangla mt-0.5">
                মডিউল: {course.modules.find(m => m.id === activeModuleId)?.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {activeLesson && (
                <button
                  onClick={() => markLessonComplete(course.id, activeLesson.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors font-bangla flex items-center gap-1.5 ${
                    currentLessonCompleted
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{currentLessonCompleted ? 'ক্লাস সম্পন্ন হয়েছে' : 'সম্পন্ন মার্ক করুন'}</span>
                </button>
              )}

              <button
                onClick={goToPrevLesson}
                disabled={currentIndex <= 0}
                className="p-2 text-slate-400 hover:text-white disabled:opacity-30 bg-slate-800 rounded-lg transition-colors"
                title="পূর্ববর্তী লেকচার"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={goToNextLesson}
                disabled={currentIndex >= allLessons.length - 1}
                className="p-2 text-slate-400 hover:text-white disabled:opacity-30 bg-slate-800 rounded-lg transition-colors"
                title="পরবর্তী লেকচার"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Tabs: Overview, Resources, Quiz, Support */}
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-bangla ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ওভারভিউ ও নোটস
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-bangla ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                রিসোর্স ও সোর্স কোড ডাউনলোড ({activeLesson?.resources?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-bangla ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                কুইজ পরীক্ষা
              </button>

              <button
                onClick={() => setActiveTab('support')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-bangla ${
                  activeTab === 'support'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                মেন্টর প্রশ্নোত্তর ফোরাম
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs font-bangla text-slate-300 leading-relaxed max-w-3xl">
                <p>
                  {activeLesson?.notes || 'এই ক্লাসে আমরা প্র্যাকটিক্যাল কোড আর্কিটেকচার নিয়ে আলোচনা করেছি। লেকচারটি সম্পূর্ণ দেখে অ্যাসাইনমেন্ট শেষ করুন।'}
                </p>
                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-white text-sm">ইনস্ট্রাক্টরের বিশেষ নির্দেশনা:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>ভিডিও দেখার সাথে সাথে নিজের কোড এডিটরে প্র্যাকটিস করুন।</li>
                    <li>রিসোর্স ট্যাব থেকে আজকের ক্লাসের প্রজেক্ট রিপোজিটোরি ডাউনলোড করে নিন।</li>
                    <li>কোনো সমস্যা হলে ফোরাম ট্যাবে প্রশ্ন করুন।</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3 max-w-xl">
                {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                  activeLesson.resources.map(res => (
                    <div
                      key={res.id}
                      className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white font-mono">{res.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {res.size || '2.4 MB'} · {res.type.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`ডাউনলোড শুরু হয়েছে: ${res.name}`)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-bangla text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ডাউনলোড</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 text-xs font-bangla">
                    এই ক্লাসের সাথে কোনো অতিরিক্ত ডাউনলোড ফাইল সংযুক্ত নেই।
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="max-w-2xl">
                {activeLesson?.quiz && activeLesson.quiz.length > 0 ? (
                  <QuizModule
                    questions={activeLesson.quiz}
                    onComplete={() => {
                      if (activeLesson) markLessonComplete(course.id, activeLesson.id);
                    }}
                  />
                ) : (
                  <div className="p-8 text-center bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs text-slate-400 font-bangla">
                    এই ক্লাসে কোনো কুইজ নেই। পরবর্তী ক্লাসে যান।
                  </div>
                )}
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-4 max-w-2xl text-xs font-bangla">
                <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">ডেডিকেটেড ডিসকর্ড কমিউনিটি</h4>
                    <p className="text-slate-400 mt-0.5">২৪/৭ সহপাঠী ও মেন্টরদের সাথে সরাসরি ডিসকাশন ও কোড সলভিং</p>
                  </div>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shrink-0 flex items-center gap-1"
                  >
                    <span>কমিউনিটিতে যোগ দিন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">মেন্টরের কাছে প্রশ্ন করুন:</h4>
                  <textarea
                    rows={3}
                    placeholder="আপনার প্রশ্ন বা এরর লগটি বিস্তারিত লিখুন..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla text-xs"
                  />
                  <button
                    onClick={() => alert('আপনার প্রশ্ন মেন্টর প্যানেলে জমা দেওয়া হয়েছে!')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs"
                  >
                    প্রশ্ন সাবমিট করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 or 3 cols): Curriculum Syllabus Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-950/70">
            <h3 className="font-bold text-white font-bangla text-sm">কোর্স কারিকুলাম</h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {course.modules.length} Modules · {course.totalLectures} Lessons
            </div>
          </div>

          <div className="flex-1 divide-y divide-slate-800/60 overflow-y-auto">
            {course.modules.map(module => (
              <div key={module.id} className="p-3 space-y-2">
                <div className="font-bold text-xs text-slate-300 font-bangla px-1">
                  {module.title}
                </div>

                <div className="space-y-1">
                  {module.lessons.map(lesson => {
                    const isSelected = lesson.id === activeLessonId;
                    const isDone = isLessonComplete(course.id, lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveModuleId(module.id);
                          setActiveLessonId(lesson.id);
                          setIsPlaying(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span className="truncate font-bangla">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <CertificateModal
          course={course}
          user={currentUser}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
};
