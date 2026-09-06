export type Language = 'en' | 'ka' | 'hi';

export interface Translations {
  catalog: string;
  aiWant: string;
  myBookings: string;
  providerHub: string;
  admin: string;
  addService: string;
  offerService: string;
  searchPlaceholder: string;
  bangaloreHeader: string;
  heroTitle: string;
  heroSubtitle: string;
  selectCategory: string;
  allServices: string;
  startingFrom: string;
  bookNow: string;
  totalPayable: string;
  confirmBooking: string;
  payWithUPI: string;
  whatsappDispatch: string;
  downloadInvoice: string;
  writeReview: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    catalog: '100+ Catalog',
    aiWant: 'AI Want Assistant',
    myBookings: 'My Bookings',
    providerHub: 'Provider Hub',
    admin: 'Analytics',
    addService: '+ Add Service',
    offerService: 'Offer a Service',
    searchPlaceholder: 'Search plumber, electrician, gym trainer, security guard in ₹...',
    bangaloreHeader: 'ServeX Bangalore: 100+ On-Demand Services in Indian Rupees (₹)',
    heroTitle: 'Find & Hire Any Service in Bangalore',
    heroSubtitle: 'Carpentry, Plumbing, Electrician, Personal Gym Trainer, Security Guards, Software Developers & Market Suppliers in ₹',
    selectCategory: 'Select Category',
    allServices: 'All Services',
    startingFrom: 'Starting from',
    bookNow: 'Book Now',
    totalPayable: 'Total Payable Amount',
    confirmBooking: 'Confirm Service Booking',
    payWithUPI: 'Pay via UPI (GPay / PhonePe / Paytm)',
    whatsappDispatch: 'Send Order to Provider via WhatsApp',
    downloadInvoice: 'Download GST Invoice',
    writeReview: 'Write Review',
  },
  ka: {
    catalog: '100+ ಸೇವೆಗಳು',
    aiWant: 'AI ವಾಂಟ್ ಅಸಿಸ್ಟೆಂಟ್',
    myBookings: 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    providerHub: 'ಸೇವಾದಾರರ ತಾಣ',
    admin: 'ವಿಶ್ಲೇಷಣೆ',
    addService: '+ ಸೇವೆ ಸೇರಿಸಿ',
    offerService: 'ಸೇವೆ ನೀಡಿ',
    searchPlaceholder: 'ಪ್ಲಂಬರ್, ಎಲೆಕ್ಟ್ರೀಷಿಯನ್, ಜಿಮ್ ತರಬೇತುದಾರ, ಭದ್ರತಾ ಸಿಬ್ಬಂದಿ ಹುಡುಕಿ (₹)...',
    bangaloreHeader: 'ಸರ್ವ್‌ಎಕ್ಸ್ ಬೆಂಗಳೂರು: ಭಾರತೀಯ ರೂಪಾಯಿಗಳಲ್ಲಿ (₹) 100+ ಸೇವೆಗಳು',
    heroTitle: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಯಾವುದೇ ಸೇವೆಯನ್ನು ಹುಡುಕಿ ಮತ್ತು ಕಾಯ್ದಿರಿಸಿ',
    heroSubtitle: 'ಕಾರ್ಪೆಂಟರ್, ಪ್ಲಂಬಿಂಗ್, ಎಲೆಕ್ಟ್ರೀಷಿಯನ್, ಜಿಮ್ ಟ್ರೈನರ್, ಸೆಕ್ಯುರಿಟಿ ಗಾರ್ಡ್ ಮತ್ತು ತಂತ್ರಾಂಶ ಅಭಿವೃದ್ಧಿಪಡಿಸುವವರು',
    selectCategory: 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ',
    allServices: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
    startingFrom: 'ಆರಂಭಿಕ ಬೆಲೆ',
    bookNow: 'ಈಗ ಬುಕ್ ಮಾಡಿ',
    totalPayable: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    confirmBooking: 'ಸೇವಾ ಬುಕಿಂಗ್ ಖಚಿತಪಡಿಸಿ',
    payWithUPI: 'UPI ಮೂಲಕ ಪಾವತಿಸಿ (GPay / PhonePe / Paytm)',
    whatsappDispatch: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಸೇವಾದಾರರಿಗೆ ಕಳುಹಿಸಿ',
    downloadInvoice: 'GST ಇನ್‌ವಾಯ್ಸ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    writeReview: 'ವಿಮರ್ಶೆ ಬರೆಯಿರಿ',
  },
  hi: {
    catalog: '100+ सेवाएं',
    aiWant: 'AI वांट असिस्टेंट',
    myBookings: 'मेरी बुकिंग्स',
    providerHub: 'सेवा प्रदाता केंद्र',
    admin: 'विश्लेषण',
    addService: '+ नई सेवा जोड़ें',
    offerService: 'सेवा प्रदान करें',
    searchPlaceholder: 'प्लंबर, इलेक्ट्रिशियन, जिम ट्रेनर, सुरक्षा गार्ड खोजें (₹)...',
    bangaloreHeader: 'सर्वएक्स बेंगलुरु: भारतीय रुपये (₹) में 100+ ऑन-डिमांड सेवाएं',
    heroTitle: 'बेंगलुरु में कोई भी सेवा खोजें और बुक करें',
    heroSubtitle: 'बढ़ई, प्लंबर, इलेक्ट्रिशियन, जिम ट्रेनर, सुरक्षा गार्ड, सॉफ्टवेयर डेवलपर और थोक आपूर्तिकर्ता',
    selectCategory: 'श्रेणी चुनें',
    allServices: 'सभी सेवाएं',
    startingFrom: 'शुरुआती कीमत',
    bookNow: 'अभी बुक करें',
    totalPayable: 'कुल देय राशि',
    confirmBooking: 'सेवा बुकिंग की पुष्टि करें',
    payWithUPI: 'UPI द्वारा भुगतान करें (GPay / PhonePe / Paytm)',
    whatsappDispatch: 'व्हाट्सएप द्वारा प्रदाता को भेजें',
    downloadInvoice: 'GST चालान डाउनलोड करें',
    writeReview: 'समीक्षा लिखें',
  },
};
