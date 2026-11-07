import React from 'react';
import { X, ShieldCheck, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const PolicyModals: React.FC = () => {
  const { policyModal, setPolicyModal, siteSettings } = useLms();

  if (!policyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              {policyModal === 'refund' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ) : policyModal === 'contact' ? (
                <Phone className="w-4 h-4 text-indigo-600" />
              ) : (
                <FileText className="w-4 h-4 text-indigo-600" />
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 font-bangla">
              {policyModal === 'refund'
                ? '৭ দিনের শতভাগ মানি-ব্যাক রিফান্ড পলিসি'
                : policyModal === 'terms'
                ? 'প্ল্যাটফর্ম ব্যবহারের শর্তাবলী (Terms & Conditions)'
                : policyModal === 'privacy'
                ? 'ব্যবহারকারী গোপনীয়তা নীতি (Privacy Policy)'
                : 'যোগাযোগ ও সাপোর্ট হেল্পডেস্ক'}
            </h3>
          </div>
          <button
            onClick={() => setPolicyModal(null)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto text-xs text-slate-700 font-bangla space-y-4 leading-relaxed">
          {policyModal === 'refund' && (
            <>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <h4 className="font-bold text-sm mb-1">আমাদের প্রতিশ্রুতি: নো-কোয়েশ্চন রিফান্ড গ্যারান্টি</h4>
                <p>
                  ProCoder BD-এর যেকোনো পেইড কোর্সে ভর্তি হওয়ার পর ৭ দিনের মধ্যে আপনি যদি কোর্সের কন্টেন্ট নিয়ে সন্তুষ্ট না হন, কোনো প্রশ্ন ছাড়াই আপনি আপনার পরিশোধকৃত সম্পূর্ণ অর্থ রিফান্ড পেতে পারেন।
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 text-sm">রিফান্ড আবেদনের নিয়মাবলী:</h5>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>কোর্স কেনার তারিখ থেকে ৭ (সাত) ক্যালেন্ডার দিনের মধ্যে লিখিত আবেদন করতে হবে।</li>
                  <li>কোর্সের ২০% এর কম কন্টেন্ট দেখা থাকলে তাৎক্ষণিক স্বয়ংক্রিয় রিফান্ড প্রসেস করা হবে।</li>
                  <li>শিক্ষার্থী যে bKash, Nagad বা কার্ড দিয়ে ফি পরিশোধ করেছেন, ৩ কর্মদিবসের মধ্যে একই অ্যাকাউন্টে টাকা রিফান্ড ফেরত চলে যাবে।</li>
                  <li>রিফান্ড অনুমোদিত হওয়ার সাথে সাথে শিক্ষার্থীর অ্যাকাউন্ট থেকে উক্ত কোর্সের অ্যাক্সেস স্বয়ংক্রিয়ভাবে বাতিল করা হবে।</li>
                </ul>
              </div>

              <div className="pt-2 text-slate-500">
                যেকোনো রিফান্ড অনুসন্ধানের জন্য ইমেল করুন: <strong className="text-slate-800 font-mono">{siteSettings.supportEmail}</strong>
              </div>
            </>
          )}

          {policyModal === 'terms' && (
            <>
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900">১. অ্যাকাউন্ট ও কন্টেন্ট কপিরাইট</h4>
                <p>
                  ProCoder BD-এর সকল ভিডিও লেকচার, সোর্স কোড ও শিক্ষা উপকরণ আন্তর্জাতিক কপিরাইট আইনের অধীনে সংরক্ষিত। কোনো প্রকার পাইরেসি, স্ক্রিন রেকর্ডিং বা অন্যের সাথে অ্যাকাউন্ট শেয়ারিং আইনত দণ্ডনীয়।
                </p>

                <h4 className="font-bold text-sm text-slate-900">২. ডিভাইস লিমিটেশন</h4>
                <p>
                  প্রতিটি শিক্ষার্থী সর্বোচ্চ ২টি বৈধ ব্যক্তিগত ডিভাইসে (যেমন পিসি এবং স্মার্টফোন) ক্লাস দেখতে পারবেন। একসাথে একাধিক ডিভাইসে ক্লাস চালানো নিষিদ্ধ।
                </p>

                <h4 className="font-bold text-sm text-slate-900">৩. সার্টিফিকেট বৈধতা</h4>
                <p>
                  প্রতিটি কোর্স ১০০% সম্পূর্ণ করার পর এবং নির্ধারিত কুইজ পরীক্ষায় উত্তীর্ণ হলেই কেবলমাত্র ভেরিফায়েড ডিজিটাল সার্টিফিকেট ইস্যু করা হবে যা কিউআর কোডের মাধ্যমে যেকোনো আন্তর্জাতিক কোম্পানি থেকে যাচাই করা সম্ভব।
                </p>
              </div>
            </>
          )}

          {policyModal === 'privacy' && (
            <>
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900">গোপনীয়তা সুরক্ষা পলিসি</h4>
                <p>
                  আপনার নাম, মোবাইল নম্বর এবং ইমেইল ঠিকানা সম্পূর্ণ এনক্রিপ্টেড ডাটাবেসে সুরক্ষিত থাকে। আমরা কখনই কোনো তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রয় বা শেয়ার করি না।
                </p>
                <p>
                  পেমেন্ট গেটওয়ে (bKash/Nagad/SSLCommerz) সরাসরি বাংলাদেশ ব্যাংক অনুমোদিত এনক্রিপ্টেড পিআইআই সার্ভারে পরিচালিত হয়, ফলে আপনার কোনো পিন বা ওটিপি আমাদের সার্ভারে সংরক্ষিত হয় না।
                </p>
              </div>
            </>
          )}

          {policyModal === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-600" />
                    <span>হেল্পলাইন ও কল</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-800">{siteSettings.supportPhone}</div>
                  <div className="text-[11px] text-slate-500 mt-1">সকাল ৯টা থেকে রাত ১০টা পর্যন্ত</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>ইমেল সাপোর্ট</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-800">{siteSettings.supportEmail}</div>
                  <div className="text-[11px] text-slate-500 mt-1">যেকোনো সময় ইমেল করুন</div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <div className="font-bold text-indigo-950 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>ক্যাম্পাস ও অফিস ঠিকানা</span>
                </div>
                <div className="text-indigo-900">
                  লেভেল ৪, রূপায়ন সেন্টার, ধানমন্ডি ২৭, ঢাকা-১২০৯, বাংলাদেশ।
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setPolicyModal(null)}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold font-bangla hover:bg-slate-800 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
