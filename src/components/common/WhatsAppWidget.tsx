import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react';
import { useLms } from '../../context/LmsContext';

export const WhatsAppWidget: React.FC = () => {
  const { siteSettings, showToast } = useLms();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Simulate instant response or WhatsApp redirect
    showToast(`মেসেজ পাঠানো হয়েছে! একজন মেন্টর শীঘ্রই হোয়াটসঅ্যাপে যোগাযোগ করবেন।`);
    setChatMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 group"
          title="সরাসরি কথা বলুন"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold font-bangla pr-1">
            লাইভ হেল্পলাইন / চ্যাট
          </span>
        </button>
      )}

      {/* Chat Popover Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                💬
              </div>
              <div>
                <h4 className="font-bold text-sm font-bangla">ProCoder BD সাপোর্ট টিম</h4>
                <div className="text-[11px] text-emerald-100 font-bangla flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  <span>অনলাইন · সাধারণত ৫ মিনিটে উত্তর দেয়</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs max-h-72 overflow-y-auto">
            <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-xs text-slate-800 font-bangla leading-relaxed">
              আসসালামু আলাইকুম! ProCoder BD-তে আপনাকে স্বাগতম।
              <br /><br />
              কোর্স এনরোলমেন্ট, পেমেন্ট সংক্রান্ত বা কোর্স কারিকুলাম বিষয়ে যেকোনো সহায়তার জন্য মেসেজ লিখুন অথবা সরাসরি কল দিন।
            </div>

            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bangla flex items-center justify-between">
              <span>জরুরি কল: <strong className="font-mono">{siteSettings.supportPhone}</strong></span>
              <a
                href={`tel:${siteSettings.supportPhone}`}
                className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-semibold"
              >
                কল করুন
              </a>
            </div>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              required
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="আপনার প্রশ্ন বা ফোন নম্বর লিখুন..."
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bangla"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
