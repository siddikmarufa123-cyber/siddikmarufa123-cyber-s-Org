import React, { useState } from 'react';
import { Sparkles, Play, ShieldCheck, ArrowRight, Award, Users, CheckCircle2 } from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const HeroSection: React.FC = () => {
  const { siteSettings, setView, courses } = useLms();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const featuredCourse = courses[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white py-12 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-800 text-xs font-semibold font-bangla">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>বাংলাদেশের শীর্ষস্থানীয় প্র্যাকটিক্যাল লার্নিং প্ল্যাটফর্ম</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-bangla leading-[1.2] text-balance">
              {siteSettings.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-bangla leading-relaxed max-w-2xl">
              {siteSettings.heroSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-bangla">
              <button
                onClick={() => {
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>কোর্সগুলো দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowVideoModal(true)}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs transition-colors flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>প্ল্যাটফর্ম ওভারভিউ ভিডিও</span>
              </button>
            </div>

            {/* Trust highlights strip */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 font-bangla text-xs">
              <div className="space-y-0.5">
                <div className="font-extrabold text-xl text-slate-900 font-mono-numbers">১৪,৫০০+</div>
                <div className="text-slate-500 font-medium">সক্রিয় শিক্ষার্থী</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-xl text-indigo-600 font-mono-numbers">৯৪%</div>
                <div className="text-slate-500 font-medium">প্লেসমেন্ট ও ক্যারিয়ার সাফল্য</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-xl text-emerald-600 font-mono-numbers">৪.৯ ★</div>
                <div className="text-slate-500 font-medium">স্টুডেন্ট সন্তুষ্টি রেটিং</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 group bg-slate-900">
              <img
                src="/src/assets/images/hero_lms_banner_1794058817220.jpg"
                alt="ProCoder BD Learning Classroom"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-600/90 w-fit font-bangla mb-2 shadow-xs">
                  ইন্ডাস্ট্রি স্ট্যান্ডার্ড সিলেবাস
                </span>
                <h3 className="font-bold text-lg text-white font-bangla leading-snug">
                  থিওরি নয়, সরাসরি রিয়েল-ওয়ার্ল্ড সফটওয়্যার ডেভেলপমেন্ট
                </h3>
                <p className="text-xs text-slate-300 font-bangla mt-1">
                  বাংলা ভাষায় সম্পূর্ণ প্রজেক্ট বেইসড লার্নিং ও ক্যারিয়ার মেন্টরশিপ
                </p>
              </div>

              {/* Play floating trigger */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 hover:bg-white text-indigo-600 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 focus:outline-none"
                title="Play overview video"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-slate-950 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-white font-bangla text-xs">
              <span>ProCoder BD কোর্স ওভারভিউ ও লার্নিং পোর্টাল ডেমো</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
              >
                বন্ধ করুন ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video
                src={featuredCourse?.promoVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
