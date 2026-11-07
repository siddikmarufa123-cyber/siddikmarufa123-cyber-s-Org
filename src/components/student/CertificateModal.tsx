import React from 'react';
import { X, Award, Printer, Copy, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { Course, User } from '../../types/lms';
import { useLms } from '../../context/LmsContext';

interface CertificateModalProps {
  course: Course;
  user: User;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ course, user, onClose }) => {
  const { showToast } = useLms();

  const certId = `PCB-CERT-${course.id.toUpperCase()}-${user.id.toUpperCase().slice(-4)}`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const link = `https://procoderbd.com/verify/${certId}`;
    navigator.clipboard?.writeText(link);
    showToast(`ভেরিফিকেশন লিংক কপি করা হয়েছে: ${link}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 font-bangla text-sm">
              ভেরিফায়েড ডিজিটাল সার্টিফিকেট
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-300 rounded-lg transition-colors font-bangla flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>লিংক কপি করুন</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors font-bangla flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / ডাউনলোড</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-slate-100/60 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl aspect-[1.414/1] rounded-xl shadow-xl border-8 border-slate-900 p-8 sm:p-12 relative flex flex-col justify-between text-center select-none overflow-hidden">
            {/* Corner Decorative Borders */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-500" />

            {/* Certificate Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  ProCoder<span className="text-indigo-600">BD</span>
                </span>
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate-400">
                Enterprise Certificate of Completion
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3 py-4">
              <p className="text-xs text-slate-500 font-bangla">এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,</p>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-bangla text-indigo-950 underline decoration-indigo-200 underline-offset-8">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-bangla max-w-xl mx-auto pt-2 leading-relaxed">
                সফলতার সাথে সকল মডিউল, প্র্যাকটিক্যাল ল্যাব অ্যাসাইনমেন্ট এবং কুইজ মূল্যায়ন ১০০% সম্পন্ন করেছেন:
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-bangla max-w-lg mx-auto">
                "{course.title}"
              </h2>
            </div>

            {/* Signatures & Verification Row */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-xs">
              {/* Instructor Signature */}
              <div className="space-y-1">
                <div className="font-serif italic text-lg text-slate-800">
                  {course.instructor.name}
                </div>
                <div className="w-32 h-0.5 bg-slate-300 mx-auto" />
                <div className="font-bold text-[11px] text-slate-700 font-bangla">
                  {course.instructor.name}
                </div>
                <div className="text-[10px] text-slate-400 font-bangla">প্রধান কোর্স ইন্সট্রাক্টর</div>
              </div>

              {/* Verified Seal Badge */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border-2 border-amber-500 text-amber-700 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                  VERIFIED CREDENTIAL
                </span>
              </div>

              {/* Academic Director & Cert ID */}
              <div className="space-y-1">
                <div className="font-serif italic text-lg text-slate-800">
                  Marufa Siddika
                </div>
                <div className="w-32 h-0.5 bg-slate-300 mx-auto" />
                <div className="font-bold text-[11px] text-slate-700 font-bangla">
                  মারুফা সিদ্দিকা
                </div>
                <div className="text-[10px] text-slate-400 font-bangla">ডিরেক্টর, ProCoder BD</div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-100">
              <span>Issue Date: {issueDate}</span>
              <span>Verification ID: {certId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
