import React, { useState } from 'react';
import {
  ShieldAlert,
  Smartphone,
  Video,
  Lock,
  Eye,
  Save,
  CheckCircle2,
  AlertOctagon,
  Copy
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { SecuritySettings as SecuritySettingsType } from '../../types/lms';

export const SecuritySettings: React.FC = () => {
  const { securitySettings, updateSecuritySettings, currentUser } = useLms();
  const [formData, setFormData] = useState<SecuritySettingsType>(securitySettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSecuritySettings(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
          সিকিউরিটি, ডিআরএম (DRM) ও ভিডিও পাইরেসি প্রটেকশন
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-bangla">
          কোর্স ভিডিও পাইরেসি রোধ, ডাইনামিক ওয়াটারমার্ক এবং স্টুডেন্ট ডিভাইস লগইন কন্ট্রোল
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Dynamic Watermarking Section */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 font-bangla text-sm">
                  ডাইনামিক ওয়াটারমার্কিং (Anti-Screen Recording)
                </h3>
                <p className="text-[11px] text-slate-500 font-bangla">
                  ভিডিও প্লেয়ারের ওপর শিক্ষার্থীর ইমেইল ও ফোন নম্বর অ্যানিমেটেডভাবে ভাসবে যাতে কেউ স্ক্রিন রেকর্ড করলে তার পরিচয় প্রকাশ পায়
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dynamicWatermark}
                onChange={e => setFormData({ ...formData, dynamicWatermark: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ml-2 text-xs font-semibold text-slate-700 font-bangla">
                {formData.dynamicWatermark ? 'সক্রিয়' : 'বন্ধ'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                ওয়াটারমার্কের ধরণ
              </label>
              <select
                value={formData.watermarkContent}
                onChange={e => setFormData({ ...formData, watermarkContent: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
              >
                <option value="student_info">শিক্ষার্থীর ইমেইল ও ফোন নম্বর (সর্বোচ্চ নিরাপত্তা)</option>
                <option value="custom">কাস্টম অর্গানাইজেশন টেক্সট</option>
              </select>
            </div>

            {formData.watermarkContent === 'custom' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  কাস্টম ওয়াটারমার্ক টেক্সট
                </label>
                <input
                  type="text"
                  value={formData.customWatermarkText}
                  onChange={e => setFormData({ ...formData, customWatermarkText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                />
              </div>
            )}
          </div>

          {/* Watermark Preview Simulator */}
          <div className="p-4 bg-slate-900 rounded-xl relative overflow-hidden border border-slate-800 text-center py-10">
            <div className="text-slate-500 text-xs font-mono mb-2">[Video Player Canvas Preview]</div>
            <div className="text-slate-300 text-sm font-semibold font-bangla">
              লেকচার ৩.১: Next.js Server Actions Deep Dive
            </div>

            {formData.dynamicWatermark && (
              <div className="absolute top-4 right-6 bg-slate-800/80 backdrop-blur-xs text-slate-400 border border-slate-700/60 px-3 py-1 rounded text-[11px] font-mono select-none pointer-events-none animate-pulse">
                {formData.watermarkContent === 'student_info'
                  ? `${currentUser.email} · ${currentUser.phone}`
                  : formData.customWatermarkText}
              </div>
            )}
          </div>
        </div>

        {/* Device Limit Section */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-sm">
                ডিভাইস সীমাবদ্ধতা ও মাল্টি-লগইন প্রোটেকশন (Device Limit)
              </h3>
              <p className="text-[11px] text-slate-500 font-bangla">
                একজন শিক্ষার্থী একই সাথে সর্বোচ্চ কয়টি ডিভাইসে লগইন করে ভিডিও দেখতে পারবে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                সর্বোচ্চ সক্রিয় ডিভাইস সংখ্যা
              </label>
              <select
                value={formData.maxDevicesPerUser}
                onChange={e => setFormData({ ...formData, maxDevicesPerUser: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
              >
                <option value={1}>১টি ডিভাইস (সর্বোচ্চ কড়াকড়ি - শুধুমাত্র ১টি পিসি বা ফোন)</option>
                <option value={2}>২টি ডিভাইস (স্ট্যান্ডার্ড - ল্যাপটপ + মোবাইল)</option>
                <option value={3}>৩টি ডিভাইস (ল্যাপটপ + মোবাইল + ট্যাব)</option>
              </select>
            </div>

            <div className="flex items-center self-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preventConcurrentPlayback}
                  onChange={e => setFormData({ ...formData, preventConcurrentPlayback: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-700 font-bangla">
                  একই সময়ে একাধিক ডিভাইসে একসাথে ভিডিও চলা ব্লক করুন
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Video Provider & DRM Architecture */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-sm">
                ভিডিও স্ট্রিমিং ও এনক্রিপশন প্রোভাইডার
              </h3>
              <p className="text-[11px] text-slate-500 font-bangla">
                ডিরেক্ট ডাউনলোড প্রটেকশন ও ড্রিমপ্লেয়ার এনক্রিপ্টেড স্ট্রিমিং
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'bunny',
                name: 'Bunny.net Stream',
                desc: 'Tokenized DRM, dynamic watermark & Global Edge CDN (Recommended)'
              },
              {
                id: 'vimeo',
                name: 'Vimeo OTT Enterprise',
                desc: 'Domain restricted player with privacy embed controls'
              },
              {
                id: 'encrypted_hls',
                name: 'Custom Encrypted HLS',
                desc: 'AES-128 Segmented encryption with key rotation'
              }
            ].map(provider => (
              <label
                key={provider.id}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.videoProvider === provider.id
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{provider.name}</span>
                    <input
                      type="radio"
                      name="provider"
                      checked={formData.videoProvider === provider.id}
                      onChange={() => setFormData({ ...formData, videoProvider: provider.id as any })}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal font-bangla">
                    {provider.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs font-bangla flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>সিকিউরিটি ও পাইরেসি কনফিগারেশন সেভ করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
