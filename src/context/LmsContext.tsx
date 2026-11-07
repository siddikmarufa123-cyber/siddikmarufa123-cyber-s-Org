import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  User,
  Order,
  Coupon,
  PaymentGatewaySettings,
  SecuritySettings,
  SiteSettings,
  StudentReview,
  UserRole,
  UserStatus,
  OrderStatus,
  PaymentMethod,
  CourseModule,
  CourseLesson
} from '../types/lms';
import {
  INITIAL_COURSES,
  INITIAL_USERS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_GATEWAY_SETTINGS,
  INITIAL_SECURITY_SETTINGS,
  INITIAL_SITE_SETTINGS,
  INITIAL_REVIEWS
} from '../data/initialData';

export type AppView = 'public' | 'admin' | 'student-portal' | 'course-details';
export type AdminTab = 'dashboard' | 'courses' | 'students' | 'orders' | 'coupons' | 'site-settings' | 'security';
export type StudentTab = 'my-courses' | 'learning-player' | 'certificates' | 'support';
export type PolicyModalType = 'terms' | 'privacy' | 'refund' | 'contact';

interface LmsContextType {
  // State
  courses: Course[];
  users: User[];
  currentUser: User;
  orders: Order[];
  coupons: Coupon[];
  gatewaySettings: PaymentGatewaySettings;
  securitySettings: SecuritySettings;
  siteSettings: SiteSettings;
  reviews: StudentReview[];
  
  // Navigation & View
  view: AppView;
  selectedCourseId: string | null;
  adminTab: AdminTab;
  studentTab: StudentTab;
  checkoutCourse: Course | null;
  policyModal: PolicyModalType | null;
  searchQuery: string;
  categoryFilter: string;
  toastMessage: string | null;

  // View switchers
  setView: (view: AppView, courseId?: string) => void;
  setAdminTab: (tab: AdminTab) => void;
  setStudentTab: (tab: StudentTab) => void;
  switchUserRole: (role: UserRole) => void;
  openCheckout: (course: Course) => void;
  closeCheckout: () => void;
  setPolicyModal: (modal: PolicyModalType | null) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (cat: string) => void;
  showToast: (msg: string) => void;

  // Course management
  addCourse: (course: Omit<Course, 'id' | 'enrolledCount' | 'rating' | 'reviewsCount'>) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  toggleCourseStatus: (courseId: string) => void;
  addModuleToCourse: (courseId: string, title: string) => void;
  addLessonToModule: (courseId: string, moduleId: string, lesson: Omit<CourseLesson, 'id'>) => void;
  deleteLessonFromModule: (courseId: string, moduleId: string, lessonId: string) => void;

  // Student & User Management
  manualEnrollStudent: (userId: string, courseId: string) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  addNewStudent: (name: string, email: string, phone: string) => User;

  // Orders & Payment
  completePayment: (courseId: string, method: PaymentMethod, trxId: string, couponCode?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  processRefund: (orderId: string, reason: string) => void;
  updateGatewaySettings: (settings: PaymentGatewaySettings) => void;

  // Coupons
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  toggleCouponActive: (couponId: string) => void;
  deleteCoupon: (couponId: string) => void;
  validateCoupon: (code: string, coursePrice: number) => { valid: boolean; discount: number; message: string };

  // Site & Security Settings
  updateSiteSettings: (settings: SiteSettings) => void;
  updateSecuritySettings: (settings: SecuritySettings) => void;

  // Student Learning Progress
  markLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonComplete: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  resetAllData: () => void;
}

const LmsContext = createContext<LmsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COURSES: 'procoder_courses_v2',
  USERS: 'procoder_users_v2',
  CURRENT_USER_ID: 'procoder_current_user_id_v2',
  ORDERS: 'procoder_orders_v2',
  COUPONS: 'procoder_coupons_v2',
  GATEWAYS: 'procoder_gateways_v2',
  SECURITY: 'procoder_security_v2',
  SITE: 'procoder_site_v2',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const LmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => loadStorage(STORAGE_KEYS.COURSES, INITIAL_COURSES));
  const [users, setUsers] = useState<User[]>(() => loadStorage(STORAGE_KEYS.USERS, INITIAL_USERS));
  const [currentUserId, setCurrentUserId] = useState<string>(() => loadStorage(STORAGE_KEYS.CURRENT_USER_ID, 'user-admin'));
  const [orders, setOrders] = useState<Order[]>(() => loadStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => loadStorage(STORAGE_KEYS.COUPONS, INITIAL_COUPONS));
  const [gatewaySettings, setGatewaySettings] = useState<PaymentGatewaySettings>(() => loadStorage(STORAGE_KEYS.GATEWAYS, INITIAL_GATEWAY_SETTINGS));
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(() => loadStorage(STORAGE_KEYS.SECURITY, INITIAL_SECURITY_SETTINGS));
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => loadStorage(STORAGE_KEYS.SITE, INITIAL_SITE_SETTINGS));
  const [reviews] = useState<StudentReview[]>(INITIAL_REVIEWS);

  // App Navigation View
  const [view, setViewInternal] = useState<AppView>('public');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-1');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [studentTab, setStudentTab] = useState<StudentTab>('my-courses');
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [policyModal, setPolicyModal] = useState<PolicyModalType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => { saveStorage(STORAGE_KEYS.COURSES, courses); }, [courses]);
  useEffect(() => { saveStorage(STORAGE_KEYS.USERS, users); }, [users]);
  useEffect(() => { saveStorage(STORAGE_KEYS.CURRENT_USER_ID, currentUserId); }, [currentUserId]);
  useEffect(() => { saveStorage(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { saveStorage(STORAGE_KEYS.COUPONS, coupons); }, [coupons]);
  useEffect(() => { saveStorage(STORAGE_KEYS.GATEWAYS, gatewaySettings); }, [gatewaySettings]);
  useEffect(() => { saveStorage(STORAGE_KEYS.SECURITY, securitySettings); }, [securitySettings]);
  useEffect(() => { saveStorage(STORAGE_KEYS.SITE, siteSettings); }, [siteSettings]);

  // Current user helper
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const setView = (newView: AppView, courseId?: string) => {
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    setViewInternal(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUserRole = (role: UserRole) => {
    let target = users.find(u => u.role === role);
    if (!target) {
      // Find or switch role of current user
      target = {
        ...currentUser,
        id: `user-${role}-test`,
        role: role,
        name: role === 'admin' ? 'মারুফা সিদ্দিকা (Admin)' : role === 'instructor' ? 'তানভীর আহমেদ (Instructor)' : 'রাকিবুল হাসান (Student)'
      };
      setUsers(prev => [...prev, target!]);
    }
    setCurrentUserId(target.id);
    if (role === 'admin') {
      setViewInternal('admin');
    } else if (role === 'student') {
      setViewInternal('student-portal');
    } else {
      setViewInternal('public');
    }
    showToast(`রোল পরিবর্তন করা হয়েছে: ${role === 'admin' ? 'অ্যাডমিন প্যানেল' : role === 'instructor' ? 'ইন্সট্রাক্টর ভিউ' : 'স্টুডেন্ট পোর্টাল'}`);
  };

  const openCheckout = (course: Course) => {
    setCheckoutCourse(course);
  };

  const closeCheckout = () => {
    setCheckoutCourse(null);
  };

  // Course mutations
  const addCourse = (newCourseData: Omit<Course, 'id' | 'enrolledCount' | 'rating' | 'reviewsCount'>) => {
    const newCourse: Course = {
      ...newCourseData,
      id: `course-${Date.now()}`,
      enrolledCount: 0,
      rating: 5.0,
      reviewsCount: 0
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast('নতুন কোর্স সফলভাবে যুক্ত করা হয়েছে!');
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    showToast('কোর্স তথ্য আপডেট সম্পন্ন হয়েছে!');
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast('কোর্স মুছে ফেলা হয়েছে');
  };

  const toggleCourseStatus = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const nextStatus = !c.isLive;
        showToast(nextStatus ? 'কোর্সটি পাবলিশ করা হয়েছে' : 'কোর্স ড্রাফট করা হয়েছে');
        return { ...c, isLive: nextStatus };
      }
      return c;
    }));
  };

  const addModuleToCourse = (courseId: string, title: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const newModule: CourseModule = {
        id: `mod-${Date.now()}`,
        title,
        order: (c.modules?.length || 0) + 1,
        lessons: []
      };
      return {
        ...c,
        modules: [...(c.modules || []), newModule]
      };
    }));
    showToast('নতুন মডিউল তৈরি হয়েছে');
  };

  const addLessonToModule = (courseId: string, moduleId: string, lessonData: Omit<CourseLesson, 'id'>) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        totalLectures: c.totalLectures + 1,
        modules: c.modules.map(m => {
          if (m.id !== moduleId) return m;
          const newLesson: CourseLesson = {
            ...lessonData,
            id: `les-${Date.now()}`
          };
          return {
            ...m,
            lessons: [...m.lessons, newLesson]
          };
        })
      };
    }));
    showToast('নতুন ক্লাস যুক্ত হয়েছে');
  };

  const deleteLessonFromModule = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        totalLectures: Math.max(0, c.totalLectures - 1),
        modules: c.modules.map(m => {
          if (m.id !== moduleId) return m;
          return {
            ...m,
            lessons: m.lessons.filter(l => l.id !== lessonId)
          };
        })
      };
    }));
    showToast('ক্লাস মুছে ফেলা হয়েছে');
  };

  // Student & User Management
  const manualEnrollStudent = (userId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        if (u.enrolledCourseIds.includes(courseId)) {
          showToast('শিক্ষার্থী ইতিমধ্যে এই কোর্সে এনরোল্ড আছেন');
          return u;
        }
        return {
          ...u,
          enrolledCourseIds: [...u.enrolledCourseIds, courseId]
        };
      }
      return u;
    }));

    // Increment course enrolled count
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c));

    // Create an order record for admin accounting
    const targetUser = users.find(u => u.id === userId);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: userId,
      studentName: targetUser?.name || 'Manual Student',
      studentEmail: targetUser?.email || 'manual@procoderbd.com',
      studentPhone: targetUser?.phone || '+8801700000000',
      courseId: course.id,
      courseTitle: course.title,
      courseThumbnail: course.thumbnail,
      amount: course.discountPrice,
      originalAmount: course.regularPrice,
      discountAmount: course.regularPrice - course.discountPrice,
      paymentMethod: 'bkash',
      trxId: `ADMIN-ENROLL-${Date.now().toString().slice(-6)}`,
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setOrders(prev => [newOrder, ...prev]);

    showToast(`ম্যানুয়াল এনরোলমেন্ট সফল: ${targetUser?.name || 'Student'}`);
  };

  const updateUserStatus = (userId: string, status: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    showToast(`ব্যবহারকারীর স্ট্যাটাস আপডেট: ${status}`);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    showToast(`রোল পরিবর্তিত হয়েছে: ${role}`);
  };

  const addNewStudent = (name: string, email: string, phone: string): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'student',
      enrolledCourseIds: [],
      completedLessonIds: {},
      status: 'active',
      joinedDate: new Date().toISOString().slice(0, 10),
      lastLogin: 'এখনই',
      deviceLimit: 2,
      activeDevices: 1
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  // Orders & Payment
  const completePayment = (courseId: string, method: PaymentMethod, trxId: string, couponCode?: string): Order => {
    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');

    let finalAmount = course.discountPrice;
    let discountAmount = course.regularPrice - course.discountPrice;

    if (couponCode) {
      const { valid, discount } = validateCoupon(couponCode, course.discountPrice);
      if (valid) {
        finalAmount = Math.max(0, course.discountPrice - discount);
        discountAmount += discount;
        // Increment coupon count
        setCoupons(prev => prev.map(cpn => cpn.code === couponCode ? { ...cpn, usedCount: cpn.usedCount + 1 } : cpn));
      }
    }

    const orderNumber = `PCB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone,
      courseId: course.id,
      courseTitle: course.title,
      courseThumbnail: course.thumbnail,
      amount: finalAmount,
      originalAmount: course.regularPrice,
      discountAmount,
      couponCode,
      paymentMethod: method,
      trxId: trxId.trim().toUpperCase(),
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setOrders(prev => [newOrder, ...prev]);

    // Unlock course for user immediately (Automated Instant Unlock)
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const alreadyHas = u.enrolledCourseIds.includes(courseId);
        return {
          ...u,
          enrolledCourseIds: alreadyHas ? u.enrolledCourseIds : [...u.enrolledCourseIds, courseId]
        };
      }
      return u;
    }));

    // Update course enrolled count
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c));

    showToast(`পেমেন্ট সফল! কোর্সটি অবিলম্বে আপনার লার্নিং পোর্টালে আনলক হয়েছে। TrxID: ${newOrder.trxId}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // If order was pending and now approved/completed, ensure course unlocked
        if (status === 'completed' && o.status !== 'completed') {
          setUsers(uList => uList.map(u => {
            if (u.id === o.studentId && !u.enrolledCourseIds.includes(o.courseId)) {
              return { ...u, enrolledCourseIds: [...u.enrolledCourseIds, o.courseId] };
            }
            return u;
          }));
        }
        return { ...o, status };
      }
      return o;
    }));
    showToast(`অর্ডার স্ট্যাটাস আপডেট করা হয়েছে: ${status}`);
  };

  const processRefund = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // Revoke student course access on refund
        setUsers(uList => uList.map(u => {
          if (u.id === o.studentId) {
            return {
              ...u,
              enrolledCourseIds: u.enrolledCourseIds.filter(cid => cid !== o.courseId)
            };
          }
          return u;
        }));
        return {
          ...o,
          status: 'refunded',
          refundReason: reason
        };
      }
      return o;
    }));
    showToast('রিফান্ড সফলভাবে সম্পন্ন হয়েছে ও অ্যাক্সেস বাতিল করা হয়েছে');
  };

  const updateGatewaySettings = (settings: PaymentGatewaySettings) => {
    setGatewaySettings(settings);
    showToast('পেমেন্ট গেটওয়ে কনফিগারেশন সংরক্ষিত হয়েছে');
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cpn-${Date.now()}`,
      usedCount: 0
    };
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`নতুন কুপন তৈরি হয়েছে: ${couponData.code}`);
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, isActive: !c.isActive } : c));
    showToast('কুপনের সক্রিয়তা পরিবর্তন করা হয়েছে');
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
    showToast('কুপন মুছে ফেলা হয়েছে');
  };

  const validateCoupon = (code: string, coursePrice: number): { valid: boolean; discount: number; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { valid: false, discount: 0, message: 'অকার্যকর কুপন কোড' };
    }
    if (!found.isActive) {
      return { valid: false, discount: 0, message: 'এই কুপনটি বর্তমানে নিষ্ক্রিয় রয়েছে' };
    }
    if (new Date(found.expiryDate) < new Date()) {
      return { valid: false, discount: 0, message: 'এই কুপনের মেয়াদ শেষ হয়ে গেছে' };
    }
    if (found.usedCount >= found.maxUses) {
      return { valid: false, discount: 0, message: 'কুপন ব্যবহারের সর্বোচ্চ লিমিট শেষ' };
    }
    if (coursePrice < found.minPurchase) {
      return { valid: false, discount: 0, message: `ন্যূনতম ৳${found.minPurchase} টাকার কোর্সে এই কুপন প্রযোজ্য` };
    }

    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = Math.round((coursePrice * found.discountValue) / 100);
    } else {
      discount = found.discountValue;
    }

    return {
      valid: true,
      discount,
      message: `কুপন অ্যাপ্লাইড! ৳${discount} ছাড় পেয়েছেন`
    };
  };

  // Site & Security
  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    showToast('সাইট সেটিংস সফলভাবে আপডেট হয়েছে');
  };

  const updateSecuritySettings = (settings: SecuritySettings) => {
    setSecuritySettings(settings);
    showToast('সিকিউরিটি ও পাইরেসি প্রটেকশন সেটিংস সংরক্ষিত');
  };

  // Student Learning Progress
  const markLessonComplete = (courseId: string, lessonId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const userCompleted = u.completedLessonIds || {};
        const courseCompleted = userCompleted[courseId] || [];
        const already = courseCompleted.includes(lessonId);
        const updatedCourseCompleted = already 
          ? courseCompleted.filter(id => id !== lessonId)
          : [...courseCompleted, lessonId];
        
        return {
          ...u,
          completedLessonIds: {
            ...userCompleted,
            [courseId]: updatedCourseCompleted
          }
        };
      }
      return u;
    }));
  };

  const isLessonComplete = (courseId: string, lessonId: string): boolean => {
    const list = currentUser.completedLessonIds?.[courseId] || [];
    return list.includes(lessonId);
  };

  const getCourseProgress = (courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;

    let totalLessonsCount = 0;
    course.modules.forEach(m => {
      totalLessonsCount += m.lessons.length;
    });

    if (totalLessonsCount === 0) return 0;

    const completed = currentUser.completedLessonIds?.[courseId]?.length || 0;
    const pct = Math.round((completed / totalLessonsCount) * 100);
    return Math.min(100, pct);
  };

  const resetAllData = () => {
    localStorage.clear();
    setCourses(INITIAL_COURSES);
    setUsers(INITIAL_USERS);
    setCurrentUserId('user-admin');
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setGatewaySettings(INITIAL_GATEWAY_SETTINGS);
    setSecuritySettings(INITIAL_SECURITY_SETTINGS);
    setSiteSettings(INITIAL_SITE_SETTINGS);
    showToast('সব ডাটা ডিফল্ট অবস্থায় রিস্টোর করা হয়েছে');
  };

  return (
    <LmsContext.Provider
      value={{
        courses,
        users,
        currentUser,
        orders,
        coupons,
        gatewaySettings,
        securitySettings,
        siteSettings,
        reviews,
        view,
        selectedCourseId,
        adminTab,
        studentTab,
        checkoutCourse,
        policyModal,
        searchQuery,
        categoryFilter,
        toastMessage,
        setView,
        setAdminTab,
        setStudentTab,
        switchUserRole,
        openCheckout,
        closeCheckout,
        setPolicyModal,
        setSearchQuery,
        setCategoryFilter,
        showToast,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleCourseStatus,
        addModuleToCourse,
        addLessonToModule,
        deleteLessonFromModule,
        manualEnrollStudent,
        updateUserStatus,
        updateUserRole,
        addNewStudent,
        completePayment,
        updateOrderStatus,
        processRefund,
        updateGatewaySettings,
        addCoupon,
        toggleCouponActive,
        deleteCoupon,
        validateCoupon,
        updateSiteSettings,
        updateSecuritySettings,
        markLessonComplete,
        isLessonComplete,
        getCourseProgress,
        resetAllData
      }}
    >
      {children}
    </LmsContext.Provider>
  );
};

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) {
    throw new Error('useLms must be used within a LmsProvider');
  }
  return context;
};
