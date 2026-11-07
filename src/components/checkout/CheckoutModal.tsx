import React, { useState } from 'react';
import {
  X,
  CreditCard,
  TicketPercent,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Course, PaymentMethod } from '../../types/lms';

interface CheckoutModalProps {
  course: Course;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ course, onClose }) => {
  const { validateCoupon, completePayment, currentUser, setView, showToast } = useLms();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; message: string } | null>(null);
  const [couponError, setCouponError] = useState('');
  
  // Simulation details
  const [phone, setPhone] = useState(currentUser.phone || '01700000000');
  const [trxIdInput, setTrxIdInput] = useState(`BKH${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const originalDiscountPrice = course.discountPrice;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalPayable = Math.max(0, originalDiscountPrice - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = validateCoupon(couponCode, originalDiscountPrice);
    if (res.valid) {
      setAppliedCoupon({
        code: couponCode.trim().toUpperCase(),
        discount: res.discount,
        message: res.message
      });
      showToast(res.message);
    } else {
      setCouponError(res.message);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate gateway callback & instant automated course unlock
    setTimeout(() => {
      try {
        const order = completePayment(
          course.id,
          paymentMethod,
          trxIdInput,
          appliedCoupon?.code
        );
        setIsProcessing(false);
        setCompletedOrder(order);
      } catch (err) {
        setIsProcessing(false);
        showToast('পেমেন্টে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-bangla text-base">
                নিরাপদ চেকআউট ও পেমেন্ট (Secure Checkout)
              </h3>
              <p className="text-xs text-slate-500 font-bangla">
                বিকাশ, নগদ, রকেট বা কার্ডে তাৎক্ষণিক অটোমেটিক কোর্স আনলক
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-bangla">
                অভিনন্দন! আপনার পেমেন্ট সফল হয়েছে
              </h2>
              <p className="text-xs text-slate-500 font-bangla">
                অর্ডার নম্বর: <strong className="font-mono text-slate-800">{completedOrder.orderNumber}</strong> · TrxID: <strong className="font-mono text-slate-800">{completedOrder.trxId}</strong>
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl max-w-md mx-auto text-xs text-emerald-900 font-bangla space-y-1 text-left">
              <div className="font-bold">কোর্স তাৎক্ষণিক আনলক করা হয়েছে:</div>
              <div className="text-slate-700">{course.title}</div>
              <div className="text-[11px] text-emerald-700 pt-1">
                আপনার স্টুডেন্ট ড্যাশবোর্ড থেকে এখনই সকল ভিডিও ক্লাস, রিসোর্স ও কুইজ দেখতে পারেন।
              </div>
            </div>

            <div className="pt-3 flex justify-center gap-3 font-bangla">
              <button
                onClick={() => {
                  onClose();
                  setView('student-portal', course.id);
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>সরাসরি ক্লাসে প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* Course Summary Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 font-bangla text-xs line-clamp-1">
                    {course.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 font-bangla">
                    মেন্টর: {course.instructor.name} · লাইফটাইম এক্সেস
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-base font-extrabold text-slate-900 font-mono-numbers">
                  ৳{course.discountPrice.toLocaleString('en-IN')}
                </div>
                {course.regularPrice > course.discountPrice && (
                  <div className="text-[11px] text-slate-400 line-through font-mono-numbers">
                    ৳{course.regularPrice.toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            </div>

            {/* Promo Coupon Application */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 font-bangla flex items-center gap-1.5">
                  <TicketPercent className="w-4 h-4 text-indigo-600" />
                  <span>ডিসকাউন্ট কুপন কোড ব্যবহার করুন</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  (চেষ্টা করুন: EID2026 বা PROCODER500)
                </span>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="যেমন: EID2026"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold tracking-wider uppercase text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors font-bangla"
                >
                  কুপন প্রয়োগ
                </button>
              </form>

              {appliedCoupon && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bangla flex items-center justify-between">
                  <span>{appliedCoupon.message} (-৳{appliedCoupon.discount})</span>
                  <button
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponCode('');
                    }}
                    className="text-emerald-700 font-bold underline"
                  >
                    মুছে ফেলুন
                  </button>
                </div>
              )}

              {couponError && (
                <div className="text-[11px] text-rose-600 font-bangla">
                  {couponError}
                </div>
              )}
            </div>

            {/* Local Payment Gateway Selection */}
            <div className="space-y-3">
              <label className="block font-semibold text-slate-800 font-bangla">
                পেমেন্ট মাধ্যম বেছে নিন *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('bkash');
                    setTrxIdInput(`BKH${Math.floor(1000000 + Math.random() * 9000000)}`);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-600 bg-pink-50/60 ring-2 ring-pink-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-pink-600 text-sm">bKash</div>
                  <div className="text-[10px] text-slate-500 font-bangla mt-0.5">বিকাশ গেটওয়ে</div>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('nagad');
                    setTrxIdInput(`NGD${Math.floor(1000000 + Math.random() * 9000000)}`);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-orange-600 bg-orange-50/60 ring-2 ring-orange-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-orange-600 text-sm">Nagad</div>
                  <div className="text-[10px] text-slate-500 font-bangla mt-0.5">নগদ পে</div>
                </button>

                {/* Rocket */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('rocket');
                    setTrxIdInput(`RKT${Math.floor(1000000 + Math.random() * 9000000)}`);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'rocket'
                      ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-purple-600 text-sm">Rocket</div>
                  <div className="text-[10px] text-slate-500 font-bangla mt-0.5">ডাচ-বাংলা রকেট</div>
                </button>

                {/* Visa / Card */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('card');
                    setTrxIdInput(`CARD${Math.floor(1000000 + Math.random() * 9000000)}`);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-blue-600 text-sm">Cards</div>
                  <div className="text-[10px] text-slate-500 font-bangla mt-0.5">ভিসা / মাস্টারকার্ড</div>
                </button>
              </div>
            </div>

            {/* Gateway Interactive Simulator Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 font-bangla">
                  অটোমেটেড গেটওয়ে সিমুলেশন (Instant Checkout)
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LIVE SIMULATION READY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1 font-bangla">
                    অ্যাকাউন্ট মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1 font-bangla">
                    অটো-জেনারেটেড TrxID
                  </label>
                  <input
                    type="text"
                    value={trxIdInput}
                    onChange={e => setTrxIdInput(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono uppercase font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Final Bill Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-500 font-bangla">
                <span>কোর্স মূল ফি:</span>
                <span className="font-mono-numbers">৳{course.discountPrice.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bangla font-semibold">
                  <span>কুপন ডিসকাউন্ট ({appliedCoupon.code}):</span>
                  <span className="font-mono-numbers">-৳{appliedCoupon.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 font-bangla pt-1 border-t border-slate-200">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="font-mono-numbers text-base text-indigo-700">
                  ৳{finalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/30 transition-all font-bangla flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>পেমেন্ট প্রসেস হচ্ছে ও কোর্স আনলক হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>৳{finalPayable.toLocaleString('en-IN')} পরিশোধ করুন ও কোর্স আনলক করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 font-bangla text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SSL 256-Bit ব্যাংক-গ্রেড এনক্রিপ্টেড পেমেন্ট ও ৭ দিনের মানি-ব্যাক গ্যারান্টি</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
