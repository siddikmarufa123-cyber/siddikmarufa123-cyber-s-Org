import React, { useState } from 'react';
import {
  Bell,
  Globe,
  Save,
  Megaphone,
  Share2,
  PhoneCall,
  Search,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { SiteSettings as SiteSettingsType } from '../../types/lms';

export const SiteSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useLms();
  const [formData, setFormData] = useState<SiteSettingsType>(siteSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
          সাইট, নোটিশ বোর্ড ও এসইও (SEO) সেটিংস
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-bangla">
          ওয়েবসাইটের ঘোষণা ব্যানার, হোমপেজ টেক্সট, সাপোর্ট হটলাইন এবং মেটা এসইও কনফিগারেশন
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Notice & Announcement Bar */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 font-bangla text-sm">
                  টপ অ্যানাউন্সমেন্ট ও নোটিশ বার (Notice Banner)
                </h3>
                <p className="text-[11px] text-slate-500 font-bangla">
                  ওয়েবসাইটের সর্বউপরে শিক্ষার্থীদের জন্য স্পেশাল অফার বা জরুরি বিজ্ঞপ্তি প্রদর্শন
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.noticeBanner.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    noticeBanner: { ...formData.noticeBanner, enabled: e.target.checked }
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-2 text-xs font-semibold text-slate-700 font-bangla">
                {formData.noticeBanner.enabled ? 'সক্রিয়' : 'বন্ধ'}
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                নোটিশ টেক্সট মেসেজ *
              </label>
              <input
                type="text"
                required
                value={formData.noticeBanner.message}
                onChange={e =>
                  setFormData({
                    ...formData,
                    noticeBanner: { ...formData.noticeBanner, message: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  ব্যাজ টেক্সট
                </label>
                <input
                  type="text"
                  value={formData.noticeBanner.badge}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      noticeBanner: { ...formData.noticeBanner, badge: e.target.value }
                    })
                  }
                  placeholder="অফার অ্যালার্ট"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  অ্যাকশন বাটন টেক্সট
                </label>
                <input
                  type="text"
                  value={formData.noticeBanner.linkText}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      noticeBanner: { ...formData.noticeBanner, linkText: e.target.value }
                    })
                  }
                  placeholder="কোর্সগুলো দেখুন"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  বিজ্ঞপ্তির ধরণ (স্টাইলিং)
                </label>
                <select
                  value={formData.noticeBanner.type}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      noticeBanner: { ...formData.noticeBanner, type: e.target.value as any }
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                >
                  <option value="promo">প্রমোশনাল অফার (Indigo/Purple)</option>
                  <option value="urgent">জরুরি নোটিশ (Amber/Red)</option>
                  <option value="announcement">সাধারণ ঘোষণা (Teal/Emerald)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section & Headline Content */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-sm">
                হোমপেজ হিরো সেকশন কনটেন্ট
              </h3>
              <p className="text-[11px] text-slate-500 font-bangla">
                ল্যান্ডিং পেজের প্রধান হেডলাইন এবং সাবহেডলাইন পরিবর্তন করুন
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                প্রধান হেডলাইন (Hero Headline)
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={e => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                সাবহেডলাইন / বিবরণ
              </label>
              <textarea
                rows={2}
                value={formData.heroSubheadline}
                onChange={e => setFormData({ ...formData, heroSubheadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* SEO & Tracking Pixels */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-sm">
                সার্চ ইঞ্জিন অপটিমাইজেশন (SEO) ও ট্র্যাকিং পিক্সেল
              </h3>
              <p className="text-[11px] text-slate-500 font-bangla">
                গুগল সার্চ র‍্যাংকিং মেটা ট্যাগ, ফেসবুক পিক্সেল ও গুগল অ্যানালিটিক্স
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-mono">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaTitle: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-mono">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={formData.seo.facebookPixelId}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, facebookPixelId: e.target.value }
                    })
                  }
                  placeholder="FB-PIXEL-XXXXXX"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-mono">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.seo.metaDescription}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaDescription: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-mono">
                  Google Analytics 4 ID (GA4)
                </label>
                <input
                  type="text"
                  value={formData.seo.googleAnalyticsId}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, googleAnalyticsId: e.target.value }
                    })
                  }
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Support Hotlines */}
        <div className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-sm">
                যোগাযোগ ও সাপোর্ট হটলাইন
              </h3>
              <p className="text-[11px] text-slate-500 font-bangla">
                ফুটার ও ফ্লোটিং চ্যাটবটে প্রদর্শিত ফোন ও হোয়াটসঅ্যাপ নম্বর
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">সাপোর্ট ফোন</label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={e => setFormData({ ...formData, supportPhone: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">WhatsApp সাপোর্ট নম্বর</label>
              <input
                type="text"
                value={formData.supportWhatsapp}
                onChange={e => setFormData({ ...formData, supportWhatsapp: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 font-bangla">সাপোর্ট ইমেল</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={e => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs font-bangla flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>সকল সাইট সেটিংস সেভ করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
