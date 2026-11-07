import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  RotateCcw,
  Sliders,
  Save,
  Key,
  ShieldCheck,
  AlertTriangle,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import { Order, OrderStatus, PaymentMethod, PaymentGatewaySettings } from '../../types/lms';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus, processRefund, gatewaySettings, updateGatewaySettings } = useLms();

  const [activeTab, setActiveTab] = useState<'transactions' | 'gateways'>('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | PaymentMethod>('all');

  // Refund Modal state
  const [refundOrder, setRefundOrder] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState('শিক্ষার্থীর ৭ দিনের নো-কোয়েশ্চন রিফান্ড পলিসি অনুযায়ী আবেদন');

  // Local Gateway settings state
  const [gateways, setGateways] = useState<PaymentGatewaySettings>(gatewaySettings);

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.studentPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || o.paymentMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalCollected = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const refundedCount = orders.filter(o => o.status === 'refunded').length;

  const handleSaveGateways = (e: React.FormEvent) => {
    e.preventDefault();
    updateGatewaySettings(gateways);
  };

  const handleConfirmRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundOrder) return;
    processRefund(refundOrder.id, refundReason);
    setRefundOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-bangla">
            অর্ডার, লেনদেন ও পেমেন্ট গেটওয়ে
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bangla">
            বিকাশ, নগদ, রকেট ও কার্ড লেনদেনের অডিট এবং পেমেন্ট গেটওয়ে এপিআই কনফিগারেশন
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg border border-slate-300 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all font-bangla ${
              activeTab === 'transactions'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ট্রানজেকশন হিস্ট্রি ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all font-bangla ${
              activeTab === 'gateways'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            পেমেন্ট গেটওয়ে সেটিংস (API Keys)
          </button>
        </div>
      </div>

      {activeTab === 'transactions' ? (
        <>
          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold font-bangla">মোট সংগৃহীত পেমেন্ট</span>
              <div className="mt-1 text-xl font-bold text-slate-900 font-mono-numbers">
                ৳{totalCollected.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium font-bangla mt-0.5">
                সফল অর্ডার: {orders.filter(o => o.status === 'completed').length} টি
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold font-bangla">পেন্ডিং ভেরিফিকেশন</span>
              <div className="mt-1 text-xl font-bold text-amber-600 font-mono-numbers">
                {pendingCount} টি
              </div>
              <div className="text-[11px] text-slate-500 font-bangla mt-0.5">
                ম্যানুয়াল বিকাশ/নগদ TrxID অনুমোদন প্রয়োজন
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold font-bangla">রিফান্ড সংখ্যা</span>
              <div className="mt-1 text-xl font-bold text-slate-700 font-mono-numbers">
                {refundedCount} টি
              </div>
              <div className="text-[11px] text-slate-500 font-bangla mt-0.5">
                ৭ দিনের রিটার্ন গ্যারান্টি পলিসি
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="TrxID, অর্ডার নম্বর বা ফোন দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-bangla shrink-0">স্ট্যাটাস:</span>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                >
                  <option value="all">সব স্ট্যাটাস</option>
                  <option value="completed">সফল (Completed)</option>
                  <option value="pending">পেন্ডিং (Pending)</option>
                  <option value="refunded">রিফান্ডেড (Refunded)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-bangla shrink-0">পদ্ধতি:</span>
                <select
                  value={methodFilter}
                  onChange={e => setMethodFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                >
                  <option value="all">সব গেটওয়ে</option>
                  <option value="bkash">bKash (বিকাশ)</option>
                  <option value="nagad">Nagad (নগদ)</option>
                  <option value="rocket">Rocket (রকেট)</option>
                  <option value="card">Card (কার্ড)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-3.5 px-4 font-bangla">অর্ডার ও তারিখ</th>
                    <th className="py-3.5 px-4 font-bangla">শিক্ষার্থী তথ্য</th>
                    <th className="py-3.5 px-4 font-bangla">কোর্স শিরোনাম</th>
                    <th className="py-3.5 px-4 font-bangla">পেমেন্ট মেথড ও TrxID</th>
                    <th className="py-3.5 px-4 text-right font-bangla">পরিশোধিত মূল্য</th>
                    <th className="py-3.5 px-4 text-center font-bangla">স্ট্যাটাস</th>
                    <th className="py-3.5 px-4 text-right font-bangla">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-slate-800">{order.orderNumber}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{order.date}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 font-bangla">{order.studentName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{order.studentPhone}</div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate font-medium text-slate-800">
                        {order.courseTitle}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.paymentMethod === 'bkash'
                                ? 'bg-pink-100 text-pink-700'
                                : order.paymentMethod === 'nagad'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {order.paymentMethod}
                          </span>
                          <span className="font-mono text-slate-700 font-semibold text-[11px]">
                            {order.trxId}
                          </span>
                        </div>
                        {order.couponCode && (
                          <div className="text-[10px] text-emerald-600 font-mono mt-0.5">
                            কুপন: {order.couponCode} (-৳{order.discountAmount})
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono-numbers font-bold text-slate-900 text-sm">
                        ৳{order.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold font-bangla ${
                            order.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : order.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {order.status === 'completed' ? 'সফল' : order.status === 'pending' ? 'পেন্ডিং' : 'রিফান্ডেড'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors font-bangla flex items-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                          )}

                          {order.status === 'completed' && (
                            <button
                              onClick={() => setRefundOrder(order)}
                              className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded border border-slate-200 transition-colors font-bangla"
                            >
                              রিফান্ড প্রসেস
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Payment Gateways Config View */
        <form onSubmit={handleSaveGateways} className="space-y-6">
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 font-bangla leading-relaxed">
              <span className="font-bold">সিকিউর গেটওয়ে ব্যাকএন্ড কনফিগারেশন:</span> আপনার bKash Merchant Account, Nagad Direct ও SSLCommerz এর API Key ও Secret এখানে সেট করুন। স্যান্ডবক্স মোড চালু রাখলে কোনো প্রকৃত টাকা চার্জ না হয়ে টেস্ট ট্রানজেকশন সিমুলেশন চলবে।
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* bKash Gateway */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
                    bK
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-bangla">bKash Merchant API</h3>
                    <p className="text-[11px] text-slate-400">Tokenized Checkout v1.2</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateways.bkash.enabled}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        bkash: { ...gateways.bkash, enabled: e.target.checked }
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-bangla">মার্চেন্ট নাম্বার</label>
                  <input
                    type="text"
                    value={gateways.bkash.merchantNumber}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        bkash: { ...gateways.bkash, merchantNumber: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">App Key</label>
                  <input
                    type="text"
                    value={gateways.bkash.appKey}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        bkash: { ...gateways.bkash, appKey: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">App Secret</label>
                  <input
                    type="password"
                    value={gateways.bkash.appSecret}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        bkash: { ...gateways.bkash, appSecret: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Nagad Gateway */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    NG
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-bangla">Nagad Direct Gateway</h3>
                    <p className="text-[11px] text-slate-400">PostPay PG API</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateways.nagad.enabled}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        nagad: { ...gateways.nagad, enabled: e.target.checked }
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Merchant ID</label>
                  <input
                    type="text"
                    value={gateways.nagad.merchantId}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        nagad: { ...gateways.nagad, merchantId: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Public Key</label>
                  <input
                    type="text"
                    value={gateways.nagad.publicKey}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        nagad: { ...gateways.nagad, publicKey: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Private Key</label>
                  <input
                    type="password"
                    value={gateways.nagad.privateKey}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        nagad: { ...gateways.nagad, privateKey: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* SSLCommerz (Card / NetBanking) */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    SSL
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-bangla">SSLCommerz (Visa / Mastercard)</h3>
                    <p className="text-[11px] text-slate-400">Card & Mobile Banking</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateways.sslcommerz.enabled}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        sslcommerz: { ...gateways.sslcommerz, enabled: e.target.checked }
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Store ID</label>
                  <input
                    type="text"
                    value={gateways.sslcommerz.storeId}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        sslcommerz: { ...gateways.sslcommerz, storeId: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Store Password</label>
                  <input
                    type="password"
                    value={gateways.sslcommerz.storePasswd}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        sslcommerz: { ...gateways.sslcommerz, storePasswd: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Rocket & Upay */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    RK
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-bangla">Dutch-Bangla Rocket & Upay</h3>
                    <p className="text-[11px] text-slate-400">Biller ID / Merchant Code</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateways.rocket.enabled}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        rocket: { ...gateways.rocket, enabled: e.target.checked }
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 font-mono">Merchant Biller ID</label>
                  <input
                    type="text"
                    value={gateways.rocket.merchantBillerId}
                    onChange={e =>
                      setGateways({
                        ...gateways,
                        rocket: { ...gateways.rocket, merchantBillerId: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs font-bangla flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>পেমেন্ট গেটওয়ে সেটিংস সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* Refund Modal */}
      {refundOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-bangla text-base">
                    রিফান্ড প্রসেস ও কোর্স এক্সেস বাতিল
                  </h3>
                  <p className="text-xs text-slate-500 font-bangla">অর্ডার: {refundOrder.orderNumber}</p>
                </div>
              </div>
              <button onClick={() => setRefundOrder(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRefund} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1 font-mono text-[11px]">
                <div>শিক্ষার্থী: <span className="font-bold">{refundOrder.studentName}</span></div>
                <div>কোর্স: <span className="font-bold">{refundOrder.courseTitle}</span></div>
                <div>রিফান্ড অ্যামাউন্ট: <span className="font-bold text-rose-600">৳{refundOrder.amount}</span></div>
                <div>গেটওয়ে ও TrxID: {refundOrder.paymentMethod.toUpperCase()} ({refundOrder.trxId})</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-bangla">রিফান্ডের কারণ *</label>
                <textarea
                  rows={3}
                  required
                  value={refundReason}
                  onChange={e => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla text-xs"
                />
              </div>

              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-[11px] font-bangla">
                সতর্কতা: রিফান্ড নিশ্চিত করলে শিক্ষার্থীর অ্যাকাউন্ট থেকে তাৎক্ষণিকভাবে এই কোর্সের অ্যাক্সেস বাতিল হয়ে যাবে।
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRefundOrder(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bangla"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-sm font-bangla"
                >
                  রিফান্ড নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
