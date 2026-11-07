/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LmsProvider, useLms } from './context/LmsContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';
import { HeroSection } from './components/public/HeroSection';
import { CourseCatalog } from './components/public/CourseCatalog';
import { ValueProps } from './components/public/ValueProps';
import { Testimonials } from './components/public/Testimonials';
import { CourseDetailsView } from './components/public/CourseDetailsView';
import { AdminLayout } from './components/admin/AdminLayout';
import { StudentPortal } from './components/student/StudentPortal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PolicyModals } from './components/modals/PolicyModals';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { view, selectedCourseId, checkoutCourse, closeCheckout, toastMessage } = useLms();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 font-bangla flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Routing */}
      {view === 'admin' ? (
        <AdminLayout />
      ) : (
        <>
          <Header />

          <main className="flex-1">
            {view === 'public' && (
              <>
                <HeroSection />
                <CourseCatalog />
                <ValueProps />
                <Testimonials />
              </>
            )}

            {view === 'course-details' && (
              <CourseDetailsView courseId={selectedCourseId || 'course-1'} />
            )}

            {view === 'student-portal' && (
              <StudentPortal />
            )}
          </main>

          <Footer />
          <WhatsAppWidget />
        </>
      )}

      {/* Checkout Modal */}
      {checkoutCourse && (
        <CheckoutModal course={checkoutCourse} onClose={closeCheckout} />
      )}

      {/* Policy and Legal Modals */}
      <PolicyModals />
    </div>
  );
};

export default function App() {
  return (
    <LmsProvider>
      <AppContent />
    </LmsProvider>
  );
}
