import React, { useState } from 'react';
import {
  TicketPercent,
  Plus,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
  Copy,
  Clock,
  X,
  Percent,
  DollarSign
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Coupon } from '../../types/lms';

export const CouponManagement: React.FC = () => {
  const { coupons, addCoupon, toggleCouponActive, deleteCoupon, showToast } = useLms();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [minPurchase, setMinPurchase] = useState('2000');
  const [maxUses, setMaxUses] = useState('300');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue) || 0,
      minPurchase: Number(minPurchase) || 0,
      maxUses: Number(maxUses) || 100,
      expiryDate,
      isActive: true
    });

    setCode('');
    setShowCreateModal(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`কুপন কোড কপি করা হয়েছে: ${text}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
            কুপন ও ডিসকাউন্ট ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bangla">
            ক্যাম্পেইন প্রোমো কোড তৈরি, পার্সেন্টেজ বা ফ্ল্যাট ছাড় নির্ধারণ ও ইউসেজ লিমিট ট্র্যাকিং
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start sm:self-auto font-bangla"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কুপন কোড তৈরি করুন</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3.5 px-4 font-bangla">প্রোমো কোড</th>
                <th className="py-3.5 px-4 font-bangla">ছাড়ের ধরণ ও পরিমাণ</th>
                <th className="py-3.5 px-4 font-bangla">ন্যূনতম কেনাকাটা</th>
                <th className="py-3.5 px-4 text-center font-bangla">ব্যবহারের সংখ্যা / লিমিট</th>
                <th className="py-3.5 px-4 font-bangla">মেয়াদ উত্তীর্ণের তারিখ</th>
                <th className="py-3.5 px-4 text-center font-bangla">স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right font-bangla">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map(coupon => {
                const isExpired = new Date(coupon.expiryDate) < new Date();
                const usagePercent = Math.min(100, Math.round((coupon.usedCount / coupon.maxUses) * 100));

                return (
                  <tr key={coupon.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60 tracking-wider">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(coupon.code)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                          title="কপি করুন"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Discount Value */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 font-bangla text-xs flex items-center gap-1">
                        {coupon.discountType === 'percentage' ? (
                          <>
                            <Percent className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{coupon.discountValue}% ছাড়</span>
                          </>
                        ) : (
                          <>
                            <span className="text-emerald-600 font-bold">৳</span>
                            <span>{coupon.discountValue} ফ্ল্যাট ছাড়</span>
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-bangla">
                        {coupon.discountType === 'percentage' ? 'পার্সেন্টেজ ডিসকাউন্ট' : 'ফিক্সড অ্যামাউন্ট ডিসকাউন্ট'}
                      </div>
                    </td>

                    {/* Min Purchase */}
                    <td className="py-3.5 px-4 font-mono-numbers text-slate-700 font-medium">
                      ৳{coupon.minPurchase.toLocaleString('en-IN')}
                    </td>

                    {/* Usage Progress */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-mono-numbers text-xs font-semibold text-slate-800">
                        {coupon.usedCount} / {coupon.maxUses}
                      </div>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 mx-auto mt-1 overflow-hidden">
                        <div
                          style={{ width: `${usagePercent}%` }}
                          className={`h-full rounded-full ${
                            usagePercent > 80 ? 'bg-amber-500' : 'bg-indigo-600'
                          }`}
                        />
                      </div>
                    </td>

                    {/* Expiry Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className={`font-mono text-xs flex items-center gap-1 ${isExpired ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{coupon.expiryDate}</span>
                      </div>
                      {isExpired && <span className="text-[10px] text-rose-500 font-bangla">মেয়াদোত্তীর্ণ</span>}
                    </td>

                    {/* Active toggle */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleCouponActive(coupon.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors font-bangla ${
                          coupon.isActive && !isExpired
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            coupon.isActive && !isExpired ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        <span>{coupon.isActive && !isExpired ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি "${coupon.code}" কুপনটি ডিলিট করতে চান?`)) {
                            deleteCoupon(coupon.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <TicketPercent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-bangla text-base">
                    নতুন কুপন কোড তৈরি
                  </h3>
                  <p className="text-xs text-slate-500 font-bangla">মার্কেটিং ক্যাম্পেইনের জন্য ছাড় নির্ধারণ করুন</p>
                </div>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  প্রোমো কোড (যেমন: EID2026, SUMMER500) *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="PROMOCODE"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-bangla">ছাড়ের ধরণ</label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                  >
                    <option value="percentage">পার্সেন্টেজ (%)</option>
                    <option value="flat">নির্দিষ্ট টাকা (৳ BDT)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                    ছাড়ের পরিমাণ *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      value={discountValue}
                      onChange={e => setDiscountValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-slate-400 font-bold">
                      {discountType === 'percentage' ? '%' : '৳'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                    ন্যূনতম কেনাকাটা (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={minPurchase}
                    onChange={e => setMinPurchase(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                    সর্বোচ্চ ইউসেজ লিমিট
                  </label>
                  <input
                    type="number"
                    value={maxUses}
                    onChange={e => setMaxUses(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">
                  মেয়াদ শেষ হওয়ার তারিখ *
                </label>
                <input
                  type="date"
                  required
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bangla"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm font-bangla"
                >
                  কুপন তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
