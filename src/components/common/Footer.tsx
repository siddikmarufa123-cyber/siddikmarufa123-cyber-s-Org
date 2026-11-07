import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const Footer: React.FC = () => {
  const { setPolicyModal, setView, siteSettings } = useLms();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                ProCoder<span className="text-indigo-400">BD</span>
              </span>
            </div>
            <p className="text-slate-400 font-bangla leading-relaxed">
              বাংলাদেশের আইটি ইন্ডাস্ট্রি ও গ্লোবাল রিমোট জবের জন্য প্র্যাকটিক্যাল কোডিং ও সফটওয়্যার ইঞ্জিনিয়ারিং শেখার প্রিমিয়াম লার্নিং প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-2 text-slate-300 font-bangla text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>৭ দিনের শর্তহীন মানি-ব্যাক গ্যারান্টি</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-bangla">
            <h4 className="text-sm font-bold text-white tracking-wide">কুইক লিংকস</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setView('public');
                    setTimeout(() => {
                      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  সকল কোর্স ব্রাউজ করুন
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('student-portal')}
                  className="hover:text-white transition-colors"
                >
                  স্টুডেন্ট লার্নিং ড্যাশবোর্ড
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('admin')}
                  className="hover:text-white transition-colors"
                >
                  অ্যাডমিন ব্যাকএন্ড প্যানেল
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setView('public');
                    setTimeout(() => {
                      document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  সফলতার গল্প ও রিভিউ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3 font-bangla">
            <h4 className="text-sm font-bold text-white tracking-wide">আইনি ও সহায়িকা</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setPolicyModal('refund')}
                  className="hover:text-white transition-colors text-left"
                >
                  রিফান্ড ও রিটার্ন পলিসি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  ব্যবহারের শর্তাবলী (Terms & Conditions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  গোপনীয়তা নীতি (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  সাপোর্ট ও যোগাযোগ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Payment Brands */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide font-bangla">যোগাযোগ ও হেল্পডেস্ক</h4>
            <div className="space-y-2 text-slate-400 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{siteSettings.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{siteSettings.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2 font-bangla">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>লেভেল ৪, রূপায়ন সেন্টার, ধানমন্ডি ২৭, ঢাকা</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-300 font-bangla mb-1.5">
                অনুমোদিত পেমেন্ট পার্টনার:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-bold font-sans text-[10px]">
                <span className="px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">bKash</span>
                <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">Nagad</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Rocket</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Visa / Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-bangla">
          <div>
            © {new Date().getFullYear()} ProCoder BD. সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>বাংলাদেশে ডেভেলপমেন্ট ও সফটওয়্যার ক্যারিয়ার বিনির্মাণে বিশ্বস্ত সঙ্গী</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
