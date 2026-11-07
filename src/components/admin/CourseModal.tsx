import React, { useState } from 'react';
import { X, Image as ImageIcon, Video, Tag, Check, DollarSign } from 'lucide-react';
import { Course } from '../../types/lms';
import { useLms } from '../../context/LmsContext';

interface CourseModalProps {
  course?: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const { addCourse, updateCourse, currentUser } = useLms();

  const isEditing = !!course;

  const [title, setTitle] = useState(course?.title || '');
  const [subtitle, setSubtitle] = useState(course?.subtitle || '');
  const [category, setCategory] = useState<Course['category']>(course?.category || 'web-dev');
  const [level, setLevel] = useState<Course['level']>(course?.level || 'Intermediate');
  const [thumbnail, setThumbnail] = useState(course?.thumbnail || '/src/assets/images/course_fullstack_mern_1794058819471.jpg');
  const [promoVideoUrl, setPromoVideoUrl] = useState(course?.promoVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [regularPrice, setRegularPrice] = useState(course?.regularPrice?.toString() || '7000');
  const [discountPrice, setDiscountPrice] = useState(course?.discountPrice?.toString() || '3500');
  const [duration, setDuration] = useState(course?.duration || '৪০+ ঘণ্টা');
  const [isLive, setIsLive] = useState(course ? course.isLive : true);
  const [badge, setBadge] = useState(course?.badge || 'নতুন কোর্স');
  const [shortDesc, setShortDesc] = useState(course?.shortDesc || '');
  const [fullDesc, setFullDesc] = useState(course?.fullDesc || '');
  const [outcomesText, setOutcomesText] = useState(course?.learningOutcomes?.join('\n') || 'প্র্যাকটিক্যাল প্রজেক্ট ভিত্তিক হ্যান্ডস-অন লার্নিং\nইন্ডাস্ট্রি স্ট্যান্ডার্ড বেস্ট প্র্যাকটিস ও আর্কিটেকচার\nরেজুমে ও ইন্টারভিউ প্রিপারেশন গাইডলাইন');
  const [requirementsText, setRequirementsText] = useState(course?.requirements?.join('\n') || 'কম্পিউটার বা ল্যাপটপ এবং ইন্টারনেট সংযোগ\nনিয়মিত প্র্যাকটিস করার মানসিকতা');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const outcomes = outcomesText.split('\n').map(s => s.trim()).filter(Boolean);
    const requirements = requirementsText.split('\n').map(s => s.trim()).filter(Boolean);

    if (isEditing && course) {
      updateCourse({
        ...course,
        title,
        subtitle,
        category,
        level,
        thumbnail,
        promoVideoUrl,
        regularPrice: Number(regularPrice) || 0,
        discountPrice: Number(discountPrice) || 0,
        duration,
        isLive,
        badge,
        shortDesc,
        fullDesc,
        learningOutcomes: outcomes,
        requirements
      });
    } else {
      addCourse({
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title,
        subtitle,
        category,
        level,
        thumbnail,
        promoVideoUrl,
        duration,
        totalLectures: 1,
        language: 'বাংলা (Bangla)',
        regularPrice: Number(regularPrice) || 0,
        discountPrice: Number(discountPrice) || 0,
        isLive,
        badge,
        instructor: {
          id: 'inst-tanvir',
          name: currentUser.role === 'instructor' ? currentUser.name : 'তানভীর আহমেদ',
          title: 'Senior Principal Software Engineer',
          bio: '১০+ বছরের ইন্ডাস্ট্রি অভিজ্ঞতা সমৃদ্ধ মেন্টর।',
          avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
          rating: 4.9,
          studentsCount: 5000,
          experience: '১০+ বছর',
          company: 'ProCoder Global'
        },
        shortDesc: shortDesc || 'এই কোর্সে আপনি আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং প্র্যাকটিস শিখবেন।',
        fullDesc: fullDesc || 'সম্পূর্ণ স্ক্র্যাচ থেকে ইন্ডাস্ট্রিয়াল আর্কিটেকচার শেখার কমপ্লিট সিলেবাস।',
        learningOutcomes: outcomes,
        requirements,
        targetAudience: ['শিক্ষার্থী ও ডেভেলপার'],
        modules: [
          {
            id: `mod-${Date.now()}`,
            title: 'মডিউল ১: ওরিয়েন্টেশন ও ফাউন্ডেশন',
            order: 1,
            lessons: [
              {
                id: `les-${Date.now()}`,
                title: '১.১ কোর্স পরিচিতি ও রোডম্যাপ',
                duration: '১৫:০০ মিনিট',
                videoUrl: promoVideoUrl,
                isFreePreview: true,
                type: 'video'
              }
            ]
          }
        ]
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-bangla">
              {isEditing ? 'কোর্স তথ্য এডিট করুন' : 'নতুন কোর্স তৈরি করুন (Course Creator)'}
            </h2>
            <p className="text-xs text-slate-500 font-bangla">
              কোর্সের শিরোনাম, প্রাইসিং, থাম্বনেইল ও লার্নিং আউটকাম কনফিগার করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                কোর্সের নাম / টাইটেল *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="যেমন: Full Stack Next.js 15 & MERN Engineering"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                সাবটাইটেল / সংক্ষিপ্ত ক্যাচলাইন
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="যেমন: রিয়েল-লাইফ প্রজেক্ট ও আধুনিক আর্কিটেকচার দিয়ে ইন্ডাস্ট্রি-রেডি হওয়ার গাইডলাইন"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          {/* Category, Level, Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">ক্যাটাগরি</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="web-dev">Web Development</option>
                <option value="ai-ml">AI & Data Science</option>
                <option value="mobile-app">Mobile App (Flutter)</option>
                <option value="cyber-security">Cyber Security</option>
                <option value="career">Freelancing & Career</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">কোর্স লেভেল</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="All Levels">All Levels (সবাই)</option>
                <option value="Beginner">Beginner (বিগিনার)</option>
                <option value="Intermediate">Intermediate (মিড-লেভেল)</option>
                <option value="Advanced">Advanced (অ্যাডভান্সড)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">ব্যাজ / ট্যাগ</label>
              <input
                type="text"
                value={badge}
                onChange={e => setBadge(e.target.value)}
                placeholder="যেমন: সেরা বিক্রিত, নতুন ব্যাচ"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                রেগুলার মূল্য (৳ BDT)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={regularPrice}
                  onChange={e => setRegularPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono-numbers font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                ডিসকাউন্ট অফার মূল্য (৳ BDT) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-indigo-600 font-bold">৳</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={discountPrice}
                  onChange={e => setDiscountPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono-numbers font-bold text-indigo-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">কোর্সের মোট সময়</label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="যেমন: ৪৫+ ঘণ্টা"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Media Links: Thumbnail & Promo Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                থাম্বনেইল ব্যানার পাথ / URL
              </label>
              <input
                type="text"
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                প্রোমো ওভারভিউ ভিডিও URL (MP4 / Stream)
              </label>
              <input
                type="text"
                value={promoVideoUrl}
                onChange={e => setPromoVideoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Publishing Status Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div>
              <div className="font-semibold text-slate-900 font-bangla">পাবলিশিং কন্ট্রোল</div>
              <div className="text-slate-500 font-bangla">কোর্সটি সরাসরি ওয়েবসাইটে লাইভ দেখতে চাইলে সক্রিয় রাখুন</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isLive}
                onChange={e => setIsLive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ml-2 text-xs font-semibold text-slate-700 font-bangla">
                {isLive ? 'লাইভ (Public)' : 'ড্রাফট (Draft)'}
              </span>
            </label>
          </div>

          {/* Outcomes & Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                লার্নিং আউটকামসমূহ (প্রতি লাইনে ১টি)
              </label>
              <textarea
                rows={4}
                value={outcomesText}
                onChange={e => setOutcomesText(e.target.value)}
                placeholder="Next.js 15 Server Components মাস্টারি..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla leading-relaxed"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                প্রয়োজনীয় রিকোয়ারমেন্টস (প্রতি লাইনে ১টি)
              </label>
              <textarea
                rows={4}
                value={requirementsText}
                onChange={e => setRequirementsText(e.target.value)}
                placeholder="জাভাস্ক্রিপ্টের মৌলিক জ্ঞান..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla leading-relaxed"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-bangla"
            >
              বাতিল করুন
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors font-bangla flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'আপডেট সেভ করুন' : 'কোর্স তৈরি সম্পন্ন করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
