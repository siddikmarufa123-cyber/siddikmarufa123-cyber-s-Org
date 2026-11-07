import React from 'react';
import {
  Infinity as InfinityIcon,
  Users2,
  Headphones,
  Award,
  GitBranch,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ValueProps: React.FC = () => {
  const features = [
    {
      icon: <InfinityIcon className="w-5 h-5 text-indigo-600" />,
      title: 'লাইফটাইম কোর্স এক্সেস',
      desc: 'একবার এনরোল করলে যে কোনো সময়, যে কোনো ডিভাইস থেকে কোর্স ভিডিও ও সকল ভবিষ্যৎ আপডেট লাইফটাইম দেখতে পারবেন।'
    },
    {
      icon: <Users2 className="w-5 h-5 text-indigo-600" />,
      title: 'টপ-টায়ার ইন্ডাস্ট্রি মেন্টর',
      desc: 'চাইল্ডাল, গ্র্যাব, ব্রেইন স্টেশন এবং সিলিকন ভ্যালি রিমোট কোম্পানিতে কর্মরত অভিজ্ঞ ইঞ্জিনিয়ারদের সরাসরি নিবিড় দিকনির্দেশনা।'
    },
    {
      icon: <Headphones className="w-5 h-5 text-indigo-600" />,
      title: '১-অন-১ লাইভ প্রবলেম সলভিং',
      desc: 'কোডিং করতে গিয়ে কোনো এরর বা বাগ-এ আটকে গেলে ডেডিকেটেড ডিসকর্ড ও গুগল মিটে মেন্টরের তাৎক্ষণিক সমাধান সহায়তা।'
    },
    {
      icon: <GitBranch className="w-5 h-5 text-indigo-600" />,
      title: 'প্রোডাকশন-লেভেল প্রজেক্ট',
      desc: 'শুধুমাত্র ছোট ডেমো নয়, বরং গিটহাবে স্টার পাওয়ার মতো সম্পূর্ণ ফুলস্ট্যাক ও এন্ড-টু-এন্ড রিয়েল-লাইফ সফটওয়্যার ডেভেলপমেন্ট।'
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      title: 'ভেরিফায়েড ডিজিটাল সার্টিফিকেট',
      desc: 'কোর্স ও কুইজ সফলভাবে শেষ করার পর ইউনিক কিউআর কোডসহ আন্তর্জাতিকভাবে যাচাইযোগ্য অথেনটিক সার্টিফিকেট।'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: '৭ দিনের নো-কোয়েশ্চন রিফান্ড',
      desc: 'আমাদের কন্টেন্ট আপনার প্রত্যাশা পূরণ না করলে কোনো প্রশ্ন ছাড়াই সম্পূর্ণ কোর্স ফি ফেরত পাওয়ার শতভাগ নিশ্চয়তা।'
    }
  ];

  return (
    <section id="values-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-indigo-600 tracking-wider font-bangla uppercase mb-1">
            কেন ProCoder BD অন্যদের চেয়ে আলাদা
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-bangla">
            আপনার ক্যারিয়ার গড়ার প্রতিটি ধাপে আমাদের প্রতিশ্রুতি
          </h2>
          <p className="text-sm text-slate-500 font-bangla mt-2">
            আমরা শুধু কোর্স বিক্রি করি না, বরং আপনাকে একজন সফল আত্মবিশ্বাসী সফটওয়্যার ডেভেলপার হিসেবে গড়ে তুলি
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base font-bangla mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 font-bangla leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
