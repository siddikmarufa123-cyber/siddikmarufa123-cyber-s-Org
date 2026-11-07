import React from 'react';
import { Star, Quote, CheckCircle2, Building2 } from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const Testimonials: React.FC = () => {
  const { reviews } = useLms();

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-indigo-600 tracking-wider font-bangla uppercase mb-1">
            শিক্ষার্থীদের অভিজ্ঞতা ও মতামত
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-bangla">
            যাঁরা ProCoder BD থেকে শিখে সফল হয়েছেন
          </h2>
          <p className="text-sm text-slate-500 font-bangla mt-2">
            হাজারো শিক্ষার্থীর চাকরি পাওয়া এবং ফ্রিল্যান্সিংয়ে সাফল্যের বাস্তব অনুপ্রেরণা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-800 font-mono">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs text-slate-700 font-bangla leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* Course badge */}
                <div className="text-[11px] font-semibold text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-lg font-bangla border border-indigo-100/60 truncate">
                  কোর্স: {review.courseTitle}
                </div>
              </div>

              {/* Student info */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={review.studentAvatar}
                    alt={review.studentName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-900 text-xs font-bangla flex items-center gap-1">
                    <span>{review.studentName}</span>
                    <span title="যাচাইকৃত শিক্ষার্থী">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-bangla truncate">
                    {review.studentRole}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring Partners Logo Banner */}
        <div className="mt-14 pt-10 border-t border-slate-200 text-center">
          <p className="text-xs font-bold text-slate-400 font-bangla tracking-wide uppercase mb-6">
            আমাদের প্রাক্তন শিক্ষার্থীরা যেসকল খ্যাতনামা প্রতিষ্ঠানে কর্মরত:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 font-bold font-sans text-sm tracking-tight opacity-75">
            <span className="hover:text-slate-800 transition-colors">Brain Station 23</span>
            <span className="hover:text-slate-800 transition-colors">Chaldal</span>
            <span className="hover:text-slate-800 transition-colors">Shohoz</span>
            <span className="hover:text-slate-800 transition-colors">Optimizely</span>
            <span className="hover:text-slate-800 transition-colors">Pathao</span>
            <span className="hover:text-slate-800 transition-colors">Upwork Top-Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
};
