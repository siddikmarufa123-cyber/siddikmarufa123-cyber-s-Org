export type UserRole = 'admin' | 'instructor' | 'student';
export type UserStatus = 'active' | 'suspended' | 'blocked';
export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'upay' | 'card';
export type OrderStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type LessonType = 'video' | 'pdf' | 'code' | 'quiz';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonResource {
  id: string;
  name: string;
  type: 'pdf' | 'zip' | 'link';
  url: string;
  size?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview: boolean;
  type: LessonType;
  resources?: LessonResource[];
  quiz?: QuizQuestion[];
  notes?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  experience: string;
  company: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'web-dev' | 'ai-ml' | 'mobile-app' | 'cyber-security' | 'career';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  thumbnail: string;
  promoVideoUrl: string;
  instructor: Instructor;
  duration: string;
  totalLectures: number;
  language: string;
  regularPrice: number; // in BDT ৳
  discountPrice: number; // in BDT ৳
  isLive: boolean; // Published or Draft
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  shortDesc: string;
  fullDesc: string;
  learningOutcomes: string[];
  requirements: string[];
  targetAudience: string[];
  modules: CourseModule[];
  badge?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  enrolledCourseIds: string[];
  completedLessonIds: Record<string, string[]>; // courseId -> lessonIds[]
  status: UserStatus;
  joinedDate: string;
  lastLogin: string;
  deviceLimit: number;
  activeDevices: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  amount: number;
  originalAmount: number;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  trxId: string;
  status: OrderStatus;
  date: string;
  refundReason?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number; // 20% or 500 BDT
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface PaymentGatewaySettings {
  bkash: {
    enabled: boolean;
    merchantNumber: string;
    appKey: string;
    appSecret: string;
    sandboxMode: boolean;
  };
  nagad: {
    enabled: boolean;
    merchantId: string;
    publicKey: string;
    privateKey: string;
    sandboxMode: boolean;
  };
  rocket: {
    enabled: boolean;
    merchantBillerId: string;
    sandboxMode: boolean;
  };
  sslcommerz: {
    enabled: boolean;
    storeId: string;
    storePasswd: string;
    sandboxMode: boolean;
  };
  stripe: {
    enabled: boolean;
    publishableKey: string;
    secretKey: string;
    testMode: boolean;
  };
}

export interface SecuritySettings {
  dynamicWatermark: boolean;
  watermarkContent: 'student_info' | 'custom';
  customWatermarkText: string;
  maxDevicesPerUser: number;
  blockScreenRecordingNotice: boolean;
  videoProvider: 'bunny' | 'vimeo' | 'encrypted_hls';
  preventConcurrentPlayback: boolean;
}

export interface SiteSettings {
  noticeBanner: {
    enabled: boolean;
    message: string;
    badge: string;
    linkText: string;
    linkUrl: string;
    type: 'promo' | 'urgent' | 'announcement';
  };
  heroHeadline: string;
  heroSubheadline: string;
  supportPhone: string;
  supportWhatsapp: string;
  supportEmail: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    facebookPixelId: string;
    googleAnalyticsId: string;
  };
}

export interface StudentReview {
  id: string;
  studentName: string;
  studentRole: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  courseTitle: string;
  date: string;
  verified: boolean;
}
