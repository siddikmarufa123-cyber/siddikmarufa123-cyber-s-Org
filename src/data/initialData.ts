import { Course, User, Order, Coupon, PaymentGatewaySettings, SecuritySettings, SiteSettings, StudentReview } from '../types/lms';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'fullstack-mern-nextjs',
    title: 'Full Stack MERN & Next.js 15 Web Engineering',
    subtitle: 'রিয়েল-লাইফ প্রজেক্ট ও আধুনিক আর্কিটেকচার দিয়ে ইন্ডাস্ট্রি-রেডি ফুলস্ট্যাক ইঞ্জিনিয়ার হওয়ার কমপ্লিট গাইডলাইন',
    category: 'web-dev',
    level: 'Intermediate',
    thumbnail: '/src/assets/images/course_fullstack_mern_1794058819471.jpg',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '৪৫+ ঘণ্টা',
    totalLectures: 68,
    language: 'বাংলা (Bangla) + English Tech Terms',
    regularPrice: 8500,
    discountPrice: 4200,
    isLive: true,
    enrolledCount: 1840,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'সেরা বিক্রিত',
    instructor: {
      id: 'inst-1',
      name: 'তানভীর আহমেদ',
      title: 'Principal Software Architect',
      bio: '১০+ বছরের সফটওয়্যার আর্কিটেকচার অভিজ্ঞতা। প্রাক্তন চাইল্ডাল ও গ্র্যাব ইঞ্জিনিয়ার। বর্তমানে রিমোট সিলিকন ভ্যালি স্টার্টআপের টেক লিড।',
      avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
      rating: 4.9,
      studentsCount: 6500,
      experience: '১০+ বছর',
      company: 'TechFlow Global'
    },
    shortDesc: 'রিঅ্যাক্ট ১৯, নেক্সট.জেএস ১৫ অ্যাপ রাউটার, টাইপস্ক্রিপ্ট, নোড.জেএস, মঙ্গোডিবি ও ডকার দিয়ে স্কেলেবল ফুলস্ট্যাক অ্যাপ নির্মাণ শিখুন।',
    fullDesc: 'এই কোর্সে আপনি শুধুমাত্র সিনট্যাক্স শিখবেন না, বরং কীভাবে বড় স্কেলের প্রোডাকশন রেডি ওয়েব অ্যাপ্লিকেশন আর্কিটেক্ট ও ডিপ্লয় করতে হয় তা স্ক্র্যাচ থেকে হাতেকলমে শিখবেন। প্রতিটি মডিউলে রয়েছে লাইভ কোডিং, অ্যাসাইনমেন্ট এবং কোড রিভিউ।',
    learningOutcomes: [
      'Next.js 15 Server Components, Server Actions ও Parallel Routes এর মাস্টার ক্লাস্টার',
      'TypeScript দিয়ে টাইপ-সেফ ফুলস্ট্যাক আর্কিটেকচার ও Clean Code প্র্যাকটিস',
      'MongoDB Aggregation Pipeline ও Redis Caching এর মাধ্যমে হাই পারফরম্যান্স কুয়েরি',
      'bKash ও SSLCommerz পেমেন্ট গেটওয়ে দিয়ে কমপ্লিট ই-কমার্স চেকআউট তৈরি',
      'Docker কন্টেইনারাইজেশন, CI/CD Pipeline ও AWS / Vercel-এ প্রোডাকশন ডিপ্লয়মেন্ট'
    ],
    requirements: [
      'HTML, CSS এবং জাভাস্ক্রিপ্টের মৌলিক জ্ঞান (ES6+)',
      'একটি ল্যাপটপ বা ডেস্কটপ এবং ইন্টারনেট সংযোগ',
      'প্রতিদিন অন্তত ১-২ ঘণ্টা অনুশীলনের আগ্রহ ও ডেডিকেশন'
    ],
    targetAudience: [
      'জুনিয়র ওয়েব ডেভেলপার যারা সিনিয়র লেভেলে নিজেদের আপগ্রেড করতে চান',
      'কম্পিউটার সায়েন্সের শিক্ষার্থী ও সেলফ-টট প্রোগ্রামার',
      'রিমোট জব ও হাই-ভ্যালু ফ্রিল্যান্সিংয়ে আগ্রহী ডেভেলপার'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'মডিউল ১: Modern React 19 & TypeScript Core Mastery',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            title: '১.১ কোর্স ওরিয়েন্টেশন ও ইন্ডাস্ট্রি স্ট্যান্ডার্ড রোডম্যাপ',
            duration: '১৫:২০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            type: 'video',
            resources: [
              { id: 'res-1', name: 'Roadmap_2026.pdf', type: 'pdf', url: '#', size: '2.4 MB' },
              { id: 'res-2', name: 'Starter-Kit-Repo.zip', type: 'zip', url: '#', size: '15.8 MB' }
            ],
            notes: 'এই ক্লাসে আমরা আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মাইন্ডসেট ও রোডম্যাপ বিশ্লেষণ করেছি।'
          },
          {
            id: 'les-1-2',
            title: '১.২ React 19 Compiler, Actions & Use Hook Deep Dive',
            duration: '২৮:৪৫ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: true,
            type: 'video',
            resources: [
              { id: 'res-3', name: 'React19_Cheatsheet.pdf', type: 'pdf', url: '#', size: '1.2 MB' }
            ]
          },
          {
            id: 'les-1-3',
            title: '১.৩ কুইজ: React 19 ও TypeScript Fundamentals',
            duration: '১০ মিনিট',
            videoUrl: '',
            isFreePreview: false,
            type: 'quiz',
            quiz: [
              {
                id: 'q1',
                question: 'React 19-এ নতুন use() হুক মূলত কোন কাজে ব্যবহৃত হয়?',
                options: [
                  'শুধুমাত্র স্টেট ডিক্লেয়ার করার জন্য',
                  'Promise বা Context রিজলভ করার জন্য যা কন্ডিশনাল ব্লকেও ডাকা যায়',
                  'কম্পোনেন্ট রি-রেন্ডার থামানোর জন্য',
                  'ক্লাস কম্পোনেন্ট তৈরি করার জন্য'
                ],
                correctIndex: 1,
                explanation: 'use() হুক Promise বা Context সরাসরি রিড করতে পারে এবং এটি কন্ডিশনাল কোড ও লুপের মধ্যেও ব্যবহার করা যায়।'
              },
              {
                id: 'q2',
                question: 'Next.js 15 Server Actions এর মূল সুবিধা কী?',
                options: [
                  'ক্লাইন্ট-সাইড বাটন ক্লিক ছাড়া কাজ করে না',
                  'আলাদা করে API রুট তৈরি না করেই সরাসরি সার্ভার-সাইড ফাংশন এক্সিকিউট করা যায়',
                  'CSS এর সাইজ ছোট করে',
                  'ডাটাবেস ছাড়াই ডাটা সংরক্ষণ করে'
                ],
                correctIndex: 1,
                explanation: 'Server Actions ফ্রন্টএন্ড থেকে সরাসরি সিকিউর সার্ভার ফাংশন কল করতে দেয়।'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'মডিউল ২: Next.js 15 App Router & Server Architecture',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            title: '২.১ Server Components বনাম Client Components আর্কিটেকচার',
            duration: '৩২:১০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: false,
            type: 'video',
            resources: [
              { id: 'res-4', name: 'Architecture_Diagram.pdf', type: 'pdf', url: '#', size: '3.1 MB' }
            ]
          },
          {
            id: 'les-2-2',
            title: '২.২ Next.js Server Actions ও Zod দিয়ে সিকিউর ডাটা ভ্যালিডেশন',
            duration: '৩৫:১৫ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: false,
            type: 'video'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'মডিউল ৩: পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (bKash, Nagad & SSLCommerz)',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            title: '৩.১ bKash Tokenized Checkout API ইন্টিগ্রেশন ও কলব্যাক হ্যান্ডলিং',
            duration: '৪২:০০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            isFreePreview: false,
            type: 'video'
          },
          {
            id: 'les-3-2',
            title: '৩.২ অটোমেটেড আইপিনে (IPN) ট্রানজেকশন ভেরিফিকেশন ও কোর্স আনলক',
            duration: '২৭:৩০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            isFreePreview: false,
            type: 'video'
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'python-ai-data-science',
    title: 'Python for Artificial Intelligence & Deep Learning',
    subtitle: 'মেশিন লার্নিং, এলএলএম (LLM), ল্যাংচেইন ও জেনারেটিভ এআই দিয়ে নেক্সট-জেন অ্যাপস ডেভেলপমেন্ট',
    category: 'ai-ml',
    level: 'All Levels',
    thumbnail: '/src/assets/images/course_python_ai_1794058818334.jpg',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '৩৮+ ঘণ্টা',
    totalLectures: 54,
    language: 'বাংলা (Bangla)',
    regularPrice: 7500,
    discountPrice: 3800,
    isLive: true,
    enrolledCount: 1220,
    rating: 4.85,
    reviewsCount: 198,
    badge: 'জনপ্রিয় কোর্স',
    instructor: {
      id: 'inst-2',
      name: 'ড. ফাহিম হাসান',
      title: 'Senior AI Research Scientist',
      bio: 'বুয়েট সিএসই থেকে গ্র্যাজুয়েট ও পিএইচডি রিসার্চার। ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং ও কম্পিউটার ভিশন নিয়ে আন্তর্জাতিক জার্নালে ১৫+ রিসার্চ পেপার প্রকাশিত।',
      avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
      rating: 4.9,
      studentsCount: 4200,
      experience: '৮+ বছর',
      company: 'Neural Labs BD'
    },
    shortDesc: 'Python, PyTorch, Hugging Face, Gemini API এবং RAG আর্কিটেকচার দিয়ে ইন্টেলিজেন্ট এআই সল্যুশন তৈরি করুন।',
    fullDesc: 'মেশিন লার্নিংয়ের ম্যাথমেটিক্যাল ফাউন্ডেশন থেকে শুরু করে আধুনিক জেনারেটিভ এআই ও মাল্টিমোডাল মডেল ইন্টিগ্রেশন শিখুন। এই কোর্সে থাকছে প্র্যাকটিক্যাল প্রজেক্ট যেমন বাংলা ভয়েস টু টেক্সট, কাস্টম আরএজি (RAG) নলেজ বেইস ও এআই এজেন্ট।',
    learningOutcomes: [
      'Python Data Science Stack: NumPy, Pandas, Matplotlib ও Scikit-Learn',
      'Deep Learning ও PyTorch দিয়ে Neural Network ট্রেইনিং ও অপটিমাইজেশন',
      'Hugging Face Transformers ও ওপেন সোর্স মডেল ফাইন-টিউনিং',
      'Gemini API ও LangChain দিয়ে প্রোডাকশন গ্রেড RAG সিস্টেম বিল্ড করা',
      'FastAPI ও Docker দিয়ে এআই মডেলকে স্কেলেবল API হিসেবে লাইভ করা'
    ],
    requirements: [
      'প্রোগ্রামিংয়ের যে কোনো ভাষার বেসিক ধারণা',
      'হাইস্কুল লেভেলের অ্যালজেব্রা ও ক্যালকুলাসের সাধারণ ধারণা',
      'নিয়মিত অ্যাসাইনমেন্ট সাবমিট করার মনোভাব'
    ],
    targetAudience: [
      'ডেটা সায়েন্স ও এআই ক্যারিয়ারে প্রবেশ করতে আগ্রহী সবাই',
      'সফটওয়্যার ডেভেলপার যারা নিজেদের অ্যাপে এআই ফিচার যোগ করতে চান',
      'রিসার্চার ও বিশ্ববিদ্যালয়ের শিক্ষার্থী'
    ],
    modules: [
      {
        id: 'mod-2-1',
        title: 'মডিউল ১: পাইথন ফর ডেটা সায়েন্স ও ম্যাথমেটিক্স',
        order: 1,
        lessons: [
          {
            id: 'les-ai-1',
            title: '১.১ এআই ইকোসিস্টেম ও পাইথন এনভায়রনমেন্ট সেটআপ',
            duration: '২০:১০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            type: 'video'
          },
          {
            id: 'les-ai-2',
            title: '১.২ NumPy ও ভেক্টরাইজড ক্যালকুলেশন হ্যান্ডস-অন',
            duration: '৩১:০০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: false,
            type: 'video'
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'flutter-mobile-app-development',
    title: 'Cross-Platform Mobile App Development with Flutter & Bloc',
    subtitle: 'অ্যান্ড্রয়েড ও আইওএস (iOS) এর জন্য হাই-পারফরম্যান্স মোবাইল অ্যাপ্লিকেশন নির্মাণ',
    category: 'mobile-app',
    level: 'All Levels',
    thumbnail: '/src/assets/images/course_flutter_app_1794058818932.jpg',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    duration: '৪২+ ঘণ্টা',
    totalLectures: 60,
    language: 'বাংলা (Bangla)',
    regularPrice: 7000,
    discountPrice: 3500,
    isLive: true,
    enrolledCount: 960,
    rating: 4.8,
    reviewsCount: 145,
    badge: 'হট কোর্স',
    instructor: {
      id: 'inst-3',
      name: 'মাহবুবুর রহমান',
      title: 'Lead Mobile Architect',
      bio: 'ফ্লাটার ও নেটিভ অ্যান্ড্রয়েড স্পেশালিস্ট। গুগল প্লে-স্টোর ও অ্যাপ স্টোরে ৫০+ হাই-রেটেড অ্যাপ পাবলিশ করার বাস্তব অভিজ্ঞতা।',
      avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
      rating: 4.8,
      studentsCount: 3800,
      experience: '৭+ বছর',
      company: 'AppPulse Inc.'
    },
    shortDesc: 'Dart 3, Flutter, Bloc State Management, Clean Architecture ও REST API দিয়ে প্রোডাকশন মোবাইল অ্যাপ তৈরি করুন।',
    fullDesc: 'একটি মাত্র কোডবেইজ দিয়ে আকর্ষণীয় ইউআই এবং দ্রুত গতির অ্যান্ড্রয়েড ও আইওএস অ্যাপ তৈরি করুন। ড্রয়ার, বটম শিট, অ্যানিমেশন, অফলাইন লোকাল ক্যাশিং ও পুশ নোটিফিকেশন সবকিছুই কভার করা হয়েছে।',
    learningOutcomes: [
      'Flutter Widgets, Responsive Layouts ও Custom Paint মাস্টারি',
      'Bloc ও Cubit স্টেট ম্যানেজমেন্ট দিয়ে ক্লিন আর্কিটেকচার ইমপ্লিমেন্টেশন',
      'Retrofit, Dio ও REST API দিয়ে ফুল ব্যাকএন্ড ইন্টিগ্রেশন',
      'লোকাল স্টোরেজ (Hive / SQLite) ও অফলাইন ফার্স্ট ইউজার এক্সপেরিয়েন্স',
      'গুগল প্লে কনসোল ও অ্যাপল অ্যাপ স্টোরে সফলভাবে সাবমিশন গাইড'
    ],
    requirements: [
      'বেসিক প্রোগ্রামিং লজিক (C / C++ / Java / JS)',
      'কমপক্ষে ৮ জিবি র‍্যাম সমৃদ্ধ কম্পিউটার'
    ],
    targetAudience: [
      'মোবাইল অ্যাপ ডেভেলপমেন্টকে পেশা হিসেবে নিতে চাওয়া তরুণরা',
      'স্টার্টআপ ফাউন্ডার যারা কম খরচে ক্রস-প্ল্যাটফর্ম অ্যাপ বানাতে চান'
    ],
    modules: [
      {
        id: 'mod-3-1',
        title: 'মডিউল ১: Dart 3 ও Flutter আর্কিটেকচার বেসিক্স',
        order: 1,
        lessons: [
          {
            id: 'les-fl-1',
            title: '১.১ ফ্লাটার ফ্রেমওয়ার্ক কিভাবে কাজ করে?',
            duration: '১৮:১৫ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: true,
            type: 'video'
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'cyber-security-ethical-hacking',
    title: 'Mastering Cyber Security & Practical Ethical Hacking',
    subtitle: 'নেটওয়ার্ক পেনিট্রেশন টেস্টিং, বাগ বাউন্টি হান্টিং ও ডিফেন্সিভ সিকিউরিটির বাস্তব গাইড',
    category: 'cyber-security',
    level: 'Intermediate',
    thumbnail: '/src/assets/images/hero_lms_banner_1794058817220.jpg',
    promoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    duration: '৩৬+ ঘণ্টা',
    totalLectures: 50,
    language: 'বাংলা (Bangla)',
    regularPrice: 9000,
    discountPrice: 4500,
    isLive: true,
    enrolledCount: 810,
    rating: 4.92,
    reviewsCount: 168,
    badge: 'ডিমান্ডিং স্কিল',
    instructor: {
      id: 'inst-4',
      name: 'আরাফাত হোসেন',
      title: 'Certified Cyber Security Consultant (CEH, OSCP)',
      bio: 'ব্যাংকিং ও এন্টারপ্রাইজ সিকিউরিটি অডিটর। হ্যাকারওয়ান ও বাগক্রাউডে টপ রেকার এথিক্যাল হ্যাকার।',
      avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
      rating: 4.9,
      studentsCount: 2900,
      experience: '৯+ বছর',
      company: 'CyberShield Bangladesh'
    },
    shortDesc: 'Kali Linux, Wireshark, Burp Suite ও OWASP Top 10 দিয়ে ওয়েব ও নেটওয়ার্কের ত্রুটি শনাক্ত ও সমাধান করুন।',
    fullDesc: 'আন্তর্জাতিক সিকিউরিটি মানদণ্ডে তৈরি এই কোর্সে আপনি ল্যাব এনভায়রনমেন্টে বিভিন্ন বাস্তব সিস্টেমে পেনিট্রেশন টেস্টিং করবেন এবং বাগ বাউন্টি প্ল্যাটফর্ম থেকে বাউন্টি উপার্জনের কৌশল শিখবেন।',
    learningOutcomes: [
      'Kali Linux টুলস ও অ্যাডভান্সড ব্যাশ স্ক্রিপ্টিং',
      'OWASP Top 10 সিকিউরিটি রিস্ক (SQLi, XSS, CSRF, SSRF)',
      'Burp Suite প্রফেশনাল ব্যবহারের নিবিড় কৌশল',
      'অটোমেটেড ও ম্যানুয়াল বাগ বাউন্টি রিকন (Recon) টেকনিক',
      'প্রফেশনাল সিকিউরিটি অডিট রিপোর্ট তৈরি ও ডিসক্লোজার পলিসি'
    ],
    requirements: [
      'কম্পিউটার নেটওয়ার্কিং (IP, DNS, Port, HTTP/HTTPS) এর মৌলিক ধারণা',
      'ভার্চুয়াল মেশিন (VMware/VirtualBox) চালানোর মতো পিসি কনফিগারেশন'
    ],
    targetAudience: [
      'সাইবার সিকিউরিটি প্রফেশনাল ও এথিক্যাল হ্যাকার হতে ইচ্ছুক যে কেউ',
      'আইটি অ্যাডমিনিস্ট্রেটর ও ওয়েব ডেভেলপার'
    ],
    modules: [
      {
        id: 'mod-4-1',
        title: 'মডিউল ১: ল্যাব সেটআপ ও নেটওয়ার্ক ফান্ডামেন্টালস',
        order: 1,
        lessons: [
          {
            id: 'les-cs-1',
            title: '১.১ ভার্চুয়াল ল্যাব সেটআপ ও কালি লিনাক্স ইন্সটলেশন',
            duration: '২৫:৪০ মিনিট',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            type: 'video'
          }
        ]
      }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'মারুফা সিদ্দিকা (Super Admin)',
    email: 'siddikmarufa123@gmail.com',
    phone: '+8801711223344',
    role: 'admin',
    avatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
    enrolledCourseIds: ['course-1', 'course-2', 'course-3', 'course-4'],
    completedLessonIds: {
      'course-1': ['les-1-1', 'les-1-2', 'les-1-3', 'les-2-1', 'les-2-2', 'les-3-1', 'les-3-2']
    },
    status: 'active',
    joinedDate: '2025-01-10',
    lastLogin: 'আজ সকাল ১০:২০',
    deviceLimit: 2,
    activeDevices: 1,
    notes: 'প্ল্যাটফর্মের প্রধান অ্যাডমিনিস্ট্রেটর'
  },
  {
    id: 'user-student-1',
    name: 'রাকিবুল হাসান',
    email: 'rakibul.cse@gmail.com',
    phone: '+8801822334455',
    role: 'student',
    enrolledCourseIds: ['course-1', 'course-2'],
    completedLessonIds: {
      'course-1': ['les-1-1', 'les-1-2']
    },
    status: 'active',
    joinedDate: '2025-02-14',
    lastLogin: 'গতকাল রাত ১১:১৫',
    deviceLimit: 2,
    activeDevices: 1,
    notes: 'মেধাবী ছাত্র, ঢাকা বিশ্ববিদ্যালয়ের সিএসই'
  },
  {
    id: 'user-student-2',
    name: 'ফারজানা ইয়াসমিন',
    email: 'farzana.y@yahoo.com',
    phone: '+8801933445566',
    role: 'student',
    enrolledCourseIds: ['course-1'],
    completedLessonIds: {
      'course-1': ['les-1-1', 'les-1-2', 'les-1-3']
    },
    status: 'active',
    joinedDate: '2025-03-01',
    lastLogin: '৩ দিন আগে',
    deviceLimit: 2,
    activeDevices: 1,
    notes: 'ফ্রন্টএন্ড ডেভেলপমেন্টে আগ্রহী'
  },
  {
    id: 'user-student-3',
    name: 'শামীম ওসমান রাজু',
    email: 'raju.developer@gmail.com',
    phone: '+8801644556677',
    role: 'student',
    enrolledCourseIds: ['course-3'],
    completedLessonIds: {},
    status: 'active',
    joinedDate: '2025-03-12',
    lastLogin: 'আজ দুপুর ১২:০০',
    deviceLimit: 2,
    activeDevices: 2,
    notes: 'মোবাইল অ্যাপ ব্যাচ ৪'
  },
  {
    id: 'user-student-4',
    name: 'আলমগীর কবির (স্প্যাম সতর্কবার্তা)',
    email: 'spammer_temp@tempmail.org',
    phone: '+8801555667788',
    role: 'student',
    enrolledCourseIds: [],
    completedLessonIds: {},
    status: 'suspended',
    joinedDate: '2025-03-15',
    lastLogin: '৫ দিন আগে',
    deviceLimit: 1,
    activeDevices: 0,
    notes: 'একাধিক ফেইক ট্রানজেকশন রিকোয়েস্ট পাঠানোর কারণে সাসপেন্ডেড'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'PCB-2026-9841',
    studentId: 'user-student-1',
    studentName: 'রাকিবুল হাসান',
    studentEmail: 'rakibul.cse@gmail.com',
    studentPhone: '+8801822334455',
    courseId: 'course-1',
    courseTitle: 'Full Stack MERN & Next.js 15 Web Engineering',
    courseThumbnail: '/src/assets/images/course_fullstack_mern_1794058819471.jpg',
    amount: 3360,
    originalAmount: 4200,
    discountAmount: 840,
    couponCode: 'EID2026',
    paymentMethod: 'bkash',
    trxId: 'BKH98X7102',
    status: 'completed',
    date: '2025-02-14 14:32'
  },
  {
    id: 'ord-102',
    orderNumber: 'PCB-2026-9842',
    studentId: 'user-student-2',
    studentName: 'ফারজানা ইয়াসমিন',
    studentEmail: 'farzana.y@yahoo.com',
    studentPhone: '+8801933445566',
    courseId: 'course-1',
    courseTitle: 'Full Stack MERN & Next.js 15 Web Engineering',
    courseThumbnail: '/src/assets/images/course_fullstack_mern_1794058819471.jpg',
    amount: 3700,
    originalAmount: 4200,
    discountAmount: 500,
    couponCode: 'PROCODER500',
    paymentMethod: 'nagad',
    trxId: 'NGD5449018',
    status: 'completed',
    date: '2025-03-01 09:15'
  },
  {
    id: 'ord-103',
    orderNumber: 'PCB-2026-9843',
    studentId: 'user-student-3',
    studentName: 'শামীম ওসমান রাজু',
    studentEmail: 'raju.developer@gmail.com',
    studentPhone: '+8801644556677',
    courseId: 'course-3',
    courseTitle: 'Cross-Platform Mobile App Development with Flutter & Bloc',
    courseThumbnail: '/src/assets/images/course_flutter_app_1794058818932.jpg',
    amount: 3500,
    originalAmount: 3500,
    discountAmount: 0,
    paymentMethod: 'bkash',
    trxId: 'BKH2099341',
    status: 'completed',
    date: '2025-03-12 18:40'
  },
  {
    id: 'ord-104',
    orderNumber: 'PCB-2026-9844',
    studentId: 'user-student-1',
    studentName: 'রাকিবুল হাসান',
    studentEmail: 'rakibul.cse@gmail.com',
    studentPhone: '+8801822334455',
    courseId: 'course-2',
    courseTitle: 'Python for Artificial Intelligence & Deep Learning',
    courseThumbnail: '/src/assets/images/course_python_ai_1794058818334.jpg',
    amount: 3800,
    originalAmount: 3800,
    discountAmount: 0,
    paymentMethod: 'rocket',
    trxId: 'RKT8843921',
    status: 'completed',
    date: '2025-03-14 20:11'
  },
  {
    id: 'ord-105',
    orderNumber: 'PCB-2026-9845',
    studentId: 'user-guest-temp',
    studentName: 'জাকির হোসেন',
    studentEmail: 'zakir.tech@gmail.com',
    studentPhone: '+8801799887766',
    courseId: 'course-4',
    courseTitle: 'Mastering Cyber Security & Practical Ethical Hacking',
    courseThumbnail: '/src/assets/images/hero_lms_banner_1794058817220.jpg',
    amount: 4500,
    originalAmount: 4500,
    discountAmount: 0,
    paymentMethod: 'bkash',
    trxId: 'BKH7712390',
    status: 'pending',
    date: '2025-03-16 11:05'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'EID2026',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 3000,
    maxUses: 500,
    usedCount: 142,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    id: 'cpn-2',
    code: 'PROCODER500',
    discountType: 'flat',
    discountValue: 500,
    minPurchase: 2500,
    maxUses: 300,
    usedCount: 98,
    expiryDate: '2026-11-30',
    isActive: true
  },
  {
    id: 'cpn-3',
    code: 'LAUNCH15',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 2000,
    maxUses: 200,
    usedCount: 65,
    expiryDate: '2026-10-15',
    isActive: true
  }
];

export const INITIAL_GATEWAY_SETTINGS: PaymentGatewaySettings = {
  bkash: {
    enabled: true,
    merchantNumber: '01711000000',
    appKey: 'bkash_app_key_live_9921',
    appSecret: '************************',
    sandboxMode: false
  },
  nagad: {
    enabled: true,
    merchantId: 'NGD_MERCHANT_7718',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
    privateKey: '************************',
    sandboxMode: false
  },
  rocket: {
    enabled: true,
    merchantBillerId: 'RKT_BILLER_334',
    sandboxMode: false
  },
  sslcommerz: {
    enabled: true,
    storeId: 'procoderbd_live',
    storePasswd: '************************',
    sandboxMode: false
  },
  stripe: {
    enabled: false,
    publishableKey: 'pk_live_51Pxxxxxxxxxxxxxxxxx',
    secretKey: '************************',
    testMode: true
  }
};

export const INITIAL_SECURITY_SETTINGS: SecuritySettings = {
  dynamicWatermark: true,
  watermarkContent: 'student_info',
  customWatermarkText: 'ProCoder BD Protected Content',
  maxDevicesPerUser: 2,
  blockScreenRecordingNotice: true,
  videoProvider: 'bunny',
  preventConcurrentPlayback: true
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  noticeBanner: {
    enabled: true,
    message: '🎉 নতুন ব্যাচ এনরোলমেন্ট শুরু হয়েছে! কুপন কোড EID2026 ব্যবহারে অতিরিক্ত ২০% ফ্ল্যাট ছাড়!',
    badge: 'অফার অ্যালার্ট',
    linkText: 'কোর্সগুলো দেখুন',
    linkUrl: '#courses',
    type: 'promo'
  },
  heroHeadline: 'প্র্যাকটিক্যাল প্রজেক্টে কোডিং শিখে ক্যারিয়ার গড়ুন গ্লোবাল মার্কেটে',
  heroSubheadline: 'ইন্ডাস্ট্রি লিডার ও প্র্যাকটিসিং সিনিয়র সফটওয়্যার ইঞ্জিনিয়ারদের তত্ত্বাবধানে বাংলা ভাষায় প্রিমিয়াম টেক এডুকেশন। লাইফটাইম অ্যাক্সেস ও ক্যারিয়ার সাপোর্ট।',
  supportPhone: '+880 1800 000000',
  supportWhatsapp: '+880 1711 000000',
  supportEmail: 'support@procoderbd.com',
  seo: {
    metaTitle: 'ProCoder BD - Bangladesh Premier Tech Learning Platform',
    metaDescription: 'Learn Next.js, Python AI, Flutter and Cyber Security with top mentors in Bangladesh.',
    facebookPixelId: 'FB-PIXEL-994821',
    googleAnalyticsId: 'G-74892109'
  }
};

export const INITIAL_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    studentName: 'মেহরাব হোসেন',
    studentRole: 'Frontend Engineer @ Brain Station 23',
    studentAvatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
    rating: 5,
    comment: 'তানভীর ভাইয়ের MERN ও Next.js কোর্সের প্রজেক্টগুলো সরাসরি ইন্টারভিউতে তুলে ধরেছি। কোর্স শেষ করার ১ মাসের মাথায় ব্রেইন স্টেশনে অফার লেটার পেয়েছি। অসাধারণ কোর্স!',
    courseTitle: 'Full Stack MERN & Next.js 15 Web Engineering',
    date: '১ সপ্তাহ আগে',
    verified: true
  },
  {
    id: 'rev-2',
    studentName: 'সুমাইয়া তাসনিম',
    studentRole: 'AI & Data Specialist @ Freelance',
    studentAvatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
    rating: 5,
    comment: 'বাংলায় এত সমৃদ্ধ Python ও RAG আর্কিটেকচার কোর্স এর আগে কোথাও পাইনি। ড. ফাহিম স্যারের প্রতিটি লেকচার ক্রিস্টাল ক্লিয়ার। অলরেডি আপওয়ার্কে ৩টি ক্লায়েন্ট প্রজেক্ট ডেলিভার করেছি।',
    courseTitle: 'Python for Artificial Intelligence & Deep Learning',
    date: '২ সপ্তাহ আগে',
    verified: true
  },
  {
    id: 'rev-3',
    studentName: 'তাহমিদ আহমেদ',
    studentRole: 'Junior Mobile App Developer @ Shohoz',
    studentAvatar: '/src/assets/images/mentor_lead_instructor_1794058818208.jpg',
    rating: 5,
    comment: 'Flutter এর Bloc স্টেট ম্যানেজমেন্ট আগে বুঝতামই না। এই কোর্সের ই-কমার্স ও রাইড শেয়ারিং প্রজেক্ট করার পর সম্পূর্ণ আত্মবিশ্বাস ফিরে পেয়েছি।',
    courseTitle: 'Cross-Platform Mobile App Development with Flutter & Bloc',
    date: '৩ সপ্তাহ আগে',
    verified: true
  }
];
