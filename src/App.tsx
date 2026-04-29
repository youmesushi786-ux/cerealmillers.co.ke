import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const COLORS = {
  navy: '#002147',
  navyDark: '#001529',
  navyDeep: '#000d1a',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  goldDark: '#A07830',
  orange: '#E8722A',
  orangeLight: '#F59B5E',
  white: '#FFFFFF',
};

// ── Slide 4 uses the local farmer image saved in /public/farmer.jpg ──
const SLIDE4_URL = '/farmer.jpg';

const BG_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000', caption: "Kenya's Golden Grain Fields", sub: 'Feeding 35 Million Daily' },
  { url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=2000', caption: 'Farm to Mill Excellence', sub: 'Direct Farmer Connections' },
  { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000', caption: 'Grain Harvest Season', sub: 'Supporting Local Farmers' },
  { url: SLIDE4_URL, caption: 'Women Powering the Grain Harvest', sub: 'Maize & Wheat Farming Communities' },
  { url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=2000', caption: 'IT & Innovation Hub', sub: 'Tech-Powered Grain Sector' },
];

const Icons = {
  ChevronRight: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="9 18 15 12 9 6"/></svg>),
  ArrowUpRight: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>),
  ArrowRight: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  CheckCircle: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  Shield: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  Scale: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 9l9-7 9 7"/><path d="M3 15h18"/><path d="M3 9h18"/></svg>),
  LineChart: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
  Mail: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  Linkedin: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>),
  MapPin: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Menu: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
  X: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  MessageSquare: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
  Video: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>),
  Cpu: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>),
  Database: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>),
  Zap: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  Globe: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Award: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>),
  TrendingUp: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
  Star: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Sprout: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M7 20h10"/><path d="M10 20c5.5-2.5 4-6 4-6"/><path d="M12 20V8"/><path d="M12 8a4 4 0 0 1 4-4c0 4-2 6-4 6"/><path d="M12 8a4 4 0 0 0-4-4c0 4 2 6 4 6"/></svg>),
  Users: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  Handshake: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>),
  Wheat: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M11 3a4 4 0 0 1 4 4"/><path d="M13 3a4 4 0 0 0-4 4"/><path d="M12 7v14"/><path d="M8 11a4 4 0 0 1 4-4"/><path d="M16 11a4 4 0 0 0-4-4"/><path d="M8 15a4 4 0 0 1 4-4"/><path d="M16 15a4 4 0 0 0-4-4"/></svg>),
  Factory: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>),
};

const MEMBER_LOGOS = [
  { name: "Afraha Flour Mills", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/1.-Afraha-Flour-Mills-Limited.png" },
  { name: "Alicia Bakers", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/2.-Alicia-Bakers-and-Confectioners-Limited.png" },
  { name: "Bajaber Industries", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/4.-Bajaber-Industries-Limited.png" },
  { name: "Bakex Millers", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/5.-Bakex-Millers-Limited.png" },
  { name: "Baraka Kenya", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/6.-Baraka-Kenya-Limited.png" },
  { name: "Capwell Industries", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/11.-Capwell-Industries-Limited.png" },
  { name: "Dola Group", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/14-3147.-Dola-Group.png" },
  { name: "Grain Industries", url: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/18.-Grain-Industries-Limited.png" },
];

const SECRETARIAT = [
  {
    name: "Paloma Fernandes",
    role: "Chief Executive Officer",
    image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/06/11-Paloma-Fernandes-1024x1024-200x200.jpg",
    bio: "Paloma Fernandes has worked with the Cereal Millers Association for the past 15 years as Chief Executive Officer. Her main area of responsibility is stakeholder engagement with Government bodies and NGOs for various issues pertaining to food security, food safety, food taxes, tariff barriers within the region, providing recommendations and feedback on bills related to basic food items, as well as meeting with relevant ministers in Government. She has been very active in programs focusing on reducing aflatoxin in the food chain including application of agri-innovations such as agri-biotechnology and fortification in the food industry. She is passionate about food safety and works with the CMA to provide safe and affordable food to consumers.",
    shortBio: "15 years leading CMA's strategic vision. Expert in stakeholder engagement with Government bodies & NGOs on food security, food safety, food taxes & tariff barriers. Board member of ASNET, NFSCC, AVCD & former Director of the National Biosafety Authority.",
    committees: ["ASNET — Executive Board Member", "AVCD — Steering Committee", "NFSCC — Member", "ICSC — Member", "National Biosafety Authority — Former Director"],
    email: "p.fernandes@cerealmillers.co.ke",
    linkedin: "#"
  },
  {
    name: "Stephen Ogallo",
    role: "Operations Manager",
    image: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/Steven-Ogallo-1024x1024-200x200.jpg",
    bio: "Stephen Ogallo has worked at the Cereal Millers Association since 2015 in the capacity of Operations Manager. His main responsibilities include ensuring a smooth running of day-to-day activities of the association, reviewing and implementing internal and external policies and strategies, participating in government-related initiatives, legislative reviews, and liaising with key stakeholders such as farmer groups, government agencies, and regulators.",
    shortBio: "Managing Kenya's Wheat Programme since 2015. Specialist in logistics, supply chain integrity, and farmer-miller coordination. Former Intrahealth International professional with deep expertise in procurement, finance & business administration.",
    committees: ["Kenya Wheat Programme — Programme Lead", "Government Initiatives — Participant", "Legislative Reviews — Contributor", "Farmer & Regulator Liaison"],
    email: "s.ogallo@cerealmillers.co.ke",
    linkedin: "#"
  },
];

const CONSULTANTS = {
  title: "Executive Consultants & Subject Matter Experts",
  description: "The Executive Team works with a group of consultants and subject matter experts in the day-to-day running of the association.",
  consultants: ["Finance", "IT", "Data Analytics", "Public Relations & Communication", "Legal", "Policy", "Taxation"],
  experts: ["Research", "Capacity Building", "Market Surveillance", "Monitoring & Evaluation", "Proficiency Testing"],
};

const BOARD = [
  { name: "Beju Shah", role: "Chairman", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/06/2-Beju-Shah-2-1024x1024-200x200.jpg" },
  { name: "Abdulgani Pasta", role: "Vice Chairman", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/Abdulgani-Pasta-1024x1024-200x200.jpg" },
  { name: "Suad Abubaker", role: "Secretary", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/06/7-Suad-Abubaker-1-1024x1024-200x200.jpg" },
  { name: "Vikesh Shah", role: "Treasurer", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/Vikesh-Shah-1024x1024-200x200.jpg" },
];

const CHAPTER_CHAIRS = [
  { name: "Sharuq Sokwala", role: "Southern Chair", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/06/8-Sharuq-Sokwala-1-1024x1024-200x200.jpg" },
  { name: "Hiten Shah", role: "Central Chair", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/Hiten-Shah.jpg" },
  { name: "James Nyutu", role: "Nairobi Chair", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/James-Nyutu.jpg" },
];

const ADVISORY = [
  { name: "Bimal Shah", role: "Advisory Council", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/03/Bimal-Shah-250x250.jpeg" },
  { name: "Salim Bajaber", role: "Advisory Council", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/03/Salim-Bajaber-250x250.png" },
  { name: "Sunil Shah", role: "Advisory Council", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/03/Sunil-Shah-946x1024-250x250.jpeg" },
];

const ADVERTISERS = [
  { name: "NCBA Bank", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2025/09/NCBA.png", url: "https://www.ncbagroup.com", desc: "Official Banking Partner" },
  { name: "Pakmaya", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2025/07/Pakmaya_Logo-1536x884.png", url: "https://www.pakmaya.com/en", desc: "Premium Yeast Solutions" },
  { name: "Transtrailers", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2024/08/TransTrailers-CMA-Member-AdvertisingSB.jpg.jpg", url: "https://www.transtrailers.com", desc: "Logistics & Transport" },
  { name: "Kifaru Steel", image: "https://www.cerealmillers.co.ke/wp-content/uploads/2022/06/A1-Kifaru-Steel-200x200.png", url: "https://www.kifarusteel.co.ke", desc: "Industrial Steel Solutions" },
];

const STATS = [
  { value: "60+", label: "Elite Members", sub: "Industry Leaders", icon: "Award" },
  { value: "35M+", label: "Daily Consumers", sub: "Wheat Industry", icon: "Globe" },
  { value: "85%", label: "Wheat Capacity", sub: "Market Authority", icon: "TrendingUp" },
  { value: "25", label: "Years of Excellence", sub: "Silver Jubilee", icon: "Star" },
];

const IMPACT_STATS = [
  { value: "60+", label: "Members", icon: "Users", color: COLORS.orange },
  { value: "2000+", label: "Maize Farmers", icon: "Wheat", color: COLORS.gold },
  { value: "1500+", label: "Wheat Farmers", icon: "Sprout", color: COLORS.orange },
];

const SERVICES = [
  { id: 'connect', title: 'Trader & Manufacturer Nexus', tagline: 'Bridging Commerce & Industry', description: "CMA is the premier connector between Kenya's grain traders and manufacturers. We facilitate roundtables, bilateral meetings, resolve industry disputes, and drive shared solutions — creating a unified industrial voice since 1999.", features: ['Trader-Manufacturer Roundtables', 'Dispute Resolution', 'Industry Forums', 'Policy Representation'], icon: 'Handshake', color: COLORS.orange },
  { id: 'safety', title: 'Quality & Food Safety', tagline: 'Zero Contamination Standard', description: "Self-regulation in the fight against aflatoxins through AFLAZERO technology, eliminating 98% of contamination across member facilities. HACCP vetting, lab certification, and rigorous quality monitoring protect Kenya's food supply.", features: ['HACCP Vetting', 'Aflatoxin Monitoring', 'Lab Certification', 'Quality Audits'], icon: 'Shield', color: COLORS.gold },
  { id: 'policy', title: 'Policy & Advocacy', tagline: 'Market Liberalization Drive', description: "Lobbying against imbalanced regulations and advocating for liberalized markets and duty-free yellow maize, actively shaping Kenya's grain policy landscape. We represent 60+ members in government, parliament, and regional bodies.", features: ['Government Lobbying', 'Trade Policy', 'Market Liberalization', 'Regulatory Watch'], icon: 'Scale', color: COLORS.orange },
  { id: 'data', title: 'Market Intelligence', tagline: 'Data-Driven Decisions', description: "Our Online Wheat Programme and KPLC Power Outage trackers ensure data integrity for millers and government agencies. Real-time analytics, supply forecasts, and price tracking empower members to make confident decisions.", features: ['Online Wheat Programme', 'Price Tracking', 'Power Outage Analytics', 'Supply Forecasts'], icon: 'LineChart', color: COLORS.gold },
];

const TECH_PROGRAMS = [
  { icon: 'Video', label: 'Chargeable Zoom Summits', desc: 'Premium virtual strategy sessions connecting tech companies with CMA member executives.', color: '#2D8CFF', tag: 'Virtual' },
  { icon: 'MessageSquare', label: 'WhatsApp Pulse Campaigns', desc: 'Direct broadcast campaigns reaching 60+ member companies instantly.', color: COLORS.orange, tag: 'Broadcast' },
  { icon: 'Cpu', label: 'IT Head Connects', desc: "Exclusive C-suite technology introductions across Kenya's milling industry.", color: COLORS.gold, tag: 'Executive' },
  { icon: 'Database', label: 'Proprietary Market Intel', desc: "Access CMA's exclusive grain sector data and industry analytics.", color: '#FF6B6B', tag: 'Analytics' },
];

const AGRO_PILLARS = [
  { icon: 'Sprout', title: 'Direct Farmer Connects', desc: 'CMA bridges grain farmers and millers — organising direct meet-ups, farm visits, and sourcing partnerships that eliminate middlemen and stabilise supply chains.', stat: '10,000+', statLabel: 'Farmers Connected' },
  { icon: 'Wheat', title: 'Grain Sourcing Programs', desc: 'Structured programs connecting smallholder farmers to certified millers, ensuring fair pricing, consistent quality standards, and reliable offtake agreements across Kenya.', stat: '85%', statLabel: 'Local Sourcing Rate' },
  { icon: 'Factory', title: 'Farm-to-Mill Technology', desc: "Supporting agri-tech startups through CMA's Catalyst Program — enabling traceability, IoT sensors, drone monitoring, and digital payment systems across the grain value chain.", stat: '12+', statLabel: 'AgriTech Partners' },
];

const EVENTS_PHYSICAL = [
  { title: 'Annual National Convention', date: 'Q2 2025', location: 'Nairobi, Kenya', type: 'Annual Summit', desc: 'The flagship gathering of all 60+ CMA members, board, and government stakeholders.' },
  { title: 'Factory Vetting & Inspection Visits', date: 'Monthly', location: 'Nationwide', type: 'Inspection', desc: 'Rigorous on-site quality audits ensuring all member facilities meet CMA standards.' },
  { title: 'Industry Trade Expo', date: 'Q3 2025', location: 'KICC, Nairobi', type: 'Exhibition', desc: "Kenya's premier grain industry trade fair showcasing innovation and partnerships." },
  { title: 'Farmer-Miller Linkage Forum', date: 'Quarterly', location: 'Regional Chapters', type: 'AgroForum', desc: 'Direct connect events between certified farmers and CMA miller members.' },
];

const EVENTS_ONLINE = [
  { title: 'Zoom Strategy Boardroom', date: 'Bi-weekly', location: 'Virtual Platform', type: 'Premium Meet', desc: 'Chargeable executive-level virtual sessions for tech partners and member leadership.' },
  { title: 'WhatsApp Sector Pulse', date: 'Weekly', location: 'Digital Broadcast', type: 'Broadcast', desc: 'Real-time industry updates and intelligence pushed to all 60+ member companies.' },
  { title: 'IT Innovation Summit', date: 'Q4 2025', location: 'Virtual Event', type: 'Tech Summit', desc: 'Connecting agri-tech and fintech companies with CMA member IT heads.' },
  { title: 'Policy Webinar Series', date: 'Monthly', location: 'Virtual', type: 'Webinar', desc: 'Deep-dive regulatory updates with government officials and trade policy experts.' },
];

interface NavigationProps { scrollY: number; currentSlide: number; setCurrentSlide: React.Dispatch<React.SetStateAction<number>>; }
interface HeroSectionProps { currentSlide: number; setCurrentSlide: React.Dispatch<React.SetStateAction<number>>; }
interface ImpactStatItemProps { stat: { value: string; label: string; icon: string; color: string }; index: number; isInView: boolean; }
interface StatCardProps { value: string; label: string; sub: string; icon: string; delay?: number; }

function useScrollY(): number {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

function useCountUp(target: number, duration = 2000, start = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─────────────────────────────────────────────────────────────────────────────
// CINEMATIC BACKGROUND — Slide 4 mobile fix: center the woman in the photo
// ─────────────────────────────────────────────────────────────────────────────
function CinematicBg({ currentSlide }: { currentSlide: number }) {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden" aria-hidden="true">
      {BG_IMAGES.map((img, i) => (
        <motion.div key={i} className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === i ? 1 : 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}>

          {i === 3 ? (
            // ── Slide 4: special mobile/desktop handling ──
            <>
              {/* Mobile: shift up to show the woman clearly */}
              <motion.img
                src={img.url}
                alt=""
                className="w-full h-full object-cover block md:hidden"
                style={{
                  objectPosition: '50% 20%',
                  filter: 'saturate(1.25) contrast(1.06) brightness(0.88)',
                }}
                animate={currentSlide === i ? { scale: [1, 1.04] } : { scale: 1 }}
                transition={{ duration: 9, ease: 'easeInOut' }}
              />
              {/* Desktop: original positioning */}
              <motion.img
                src={img.url}
                alt=""
                className="w-full h-full object-cover hidden md:block"
                style={{
                  objectPosition: 'center 30%',
                  filter: 'saturate(1.25) contrast(1.06) brightness(0.88)',
                }}
                animate={currentSlide === i ? { scale: [1, 1.04] } : { scale: 1 }}
                transition={{ duration: 9, ease: 'easeInOut' }}
              />
            </>
          ) : (
            // ── All other slides ──
            <motion.img
              src={img.url}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
              animate={currentSlide === i ? { scale: [1, 1.04] } : { scale: 1 }}
              transition={{ duration: 9, ease: 'easeInOut' }}
            />
          )}

          {/* Standard cinematic overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(0,13,26,0.52) 0%, rgba(0,21,41,0.36) 50%, rgba(0,13,26,0.60) 100%)'
          }} />

          {/* Slide-4 warm green tint */}
          {i === 3 && (
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(160deg, rgba(34,85,34,0.10) 0%, rgba(201,168,76,0.07) 60%, rgba(0,13,26,0.15) 100%)',
            }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface Particle { id: number; x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; color: string; }

function ParticleField({ count = 40 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const colors = [COLORS.gold, COLORS.goldLight, '#ffffff', COLORS.orange];
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.4, speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25, opacity: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    const handleMouse = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    canvas.addEventListener('mousemove', handleMouse);
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        const dx = mouseRef.current.x - p.x, dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.speedX -= (dx / dist) * 0.02; p.speedY -= (dy / dist) * 0.02; }
        p.x += p.speedX; p.y += p.speedY; p.speedX *= 0.99; p.speedY *= 0.99;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.fill();
      });
      ctx.globalAlpha = 1;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i], b = particlesRef.current[j];
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) { ctx.beginPath(); ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - dist / 90)})`; ctx.lineWidth = 0.4; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', handleMouse); };
  }, [count]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: 'transparent' }} />;
}

function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  useEffect(() => {
    const lerp = (s: number, e: number, t: number) => s + (e - s) * t;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      animRef.current = requestAnimationFrame(animate);
    };
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e: MouseEvent) => { const t = e.target as HTMLElement; if (t.closest('button,a,[data-cursor]')) { setIsHovering(true); const el = t.closest('[data-cursor]') as HTMLElement; setCursorText(el?.dataset?.cursor || ''); } };
    const onOut = () => { setIsHovering(false); setCursorText(''); };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    animRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut); cancelAnimationFrame(animRef.current); };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-all duration-200"
        style={{ background: isHovering ? COLORS.orange : 'transparent', border: `2px solid ${isHovering ? COLORS.orange : COLORS.gold}`, opacity: 0.9 }}>
        {cursorText && <span className="text-[6px] font-black uppercase text-white tracking-wider">{cursorText}</span>}
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]" style={{ background: COLORS.gold }} />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left" style={{ scaleX, background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold}, ${COLORS.goldLight})` }} />;
}

function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.215, 0.61, 0.355, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionWrapper({ children, id, className = '', tint = 'navy' }: { children: React.ReactNode; id?: string; className?: string; tint?: 'navy' | 'dark' | 'transparent'; }) {
  const bg = tint === 'navy' ? 'rgba(0,33,71,0.55)' : tint === 'dark' ? 'rgba(0,13,26,0.62)' : 'transparent';
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: bg }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.gold}30, ${COLORS.orange}30, transparent)` }} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function Marquee({ items, speed = 40, reverse = false }: { items: typeof MEMBER_LOGOS; speed?: number; reverse?: boolean }) {
  return (
    <div className="overflow-hidden relative select-none">
      <div className="flex gap-5 items-center"
        style={{ animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`, width: 'max-content' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i}
            className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 rounded-2xl flex items-center justify-center p-4 border transition-all duration-500"
            style={{ background: '#FFFFFF', borderColor: 'rgba(201,168,76,0.4)', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
            <img src={item.url} alt={item.name} loading="lazy"
              className="w-full h-full object-contain transition duration-500"
              onError={(e) => { const t = e.target as HTMLImageElement; t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=002147&color=C9A84C&size=160&bold=true`; }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, sub, icon, delay = 0 }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const count = useCountUp(numericValue, 2000, isInView);
  const IconComp = (Icons as any)[icon];
  return (
    <motion.div ref={ref} className="relative group"
      initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}>
      <div className="relative rounded-[2rem] p-5 md:p-8 border hover:border-[rgba(232,114,42,0.5)] transition-all duration-700 overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-2"
        style={{ background: 'rgba(0,13,26,0.6)', borderColor: 'rgba(201,168,76,0.2)', backdropFilter: 'blur(20px)' }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 rounded-[2rem]"
          style={{ background: 'linear-gradient(135deg, rgba(232,114,42,0.1), rgba(201,168,76,0.1))' }} />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10" style={{ color: 'rgba(201,168,76,0.25)' }}>
          {IconComp && <IconComp />}
        </div>
        <div className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-2 md:mb-3 relative z-10 tracking-tight">{count}{suffix}</div>
        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] mb-1 relative z-10" style={{ color: COLORS.orange }}>{label}</div>
        <div className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase tracking-widest relative z-10">{sub}</div>
        <div className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-700 group-hover:w-full w-0"
          style={{ background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold})` }} />
      </div>
    </motion.div>
  );
}

function ImpactStatItem({ stat, index, isInView }: ImpactStatItemProps) {
  const numericValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
  const suffix = stat.value.replace(/[0-9]/g, '');
  const count = useCountUp(numericValue, 2000, isInView);
  const IconComp = (Icons as any)[stat.icon];
  return (
    <motion.div className="flex flex-col items-center text-center group"
      initial={{ opacity: 0, scale: 0.7 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.215, 0.61, 0.355, 1] }}>
      <motion.div className="w-8 h-8 md:w-14 md:h-14 mb-3 md:mb-6" style={{ color: stat.color }}
        animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + index, repeat: Infinity, ease: 'easeInOut' }}>
        {IconComp && <IconComp />}
      </motion.div>
      <motion.div className="relative w-28 h-28 md:w-48 md:h-48 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,33,71,0.75)', border: `3px solid ${stat.color}`, boxShadow: `0 0 40px ${stat.color}30, inset 0 0 40px ${stat.color}10` }}
        whileHover={{ scale: 1.08, boxShadow: `0 0 60px ${stat.color}50` }}>
        <div className="text-center px-2">
          <div className="text-xl md:text-4xl font-serif font-bold text-white">{count}{suffix}</div>
          <div className="text-[8px] md:text-[11px] font-black uppercase tracking-wider mt-1 leading-tight" style={{ color: stat.color }}>{stat.label}</div>
        </div>
        <motion.div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${stat.color}30` }}
          animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      </motion.div>
    </motion.div>
  );
}

function Navigation({ scrollY, currentSlide, setCurrentSlide }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = scrollY > 60;
  const navLinks = [
    { href: '#about', label: 'Heritage' },
    { href: '#nexus', label: 'Operations' },
    { href: '#agritech', label: 'AgriTech' },
    { href: '#tech', label: 'Tech Programs' },
    { href: '#leadership', label: 'Leadership' },
    { href: '#contact', label: 'Contact' },
  ];
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);
  return (
    <>
      <motion.nav className="fixed top-0 w-full z-[100]"
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        role="navigation" aria-label="Main Navigation">
        <div className="mx-3 md:mx-8 mt-3 rounded-2xl px-4 md:px-8 py-2.5 flex justify-between items-center transition-all duration-500"
          style={{
            background: '#FFFFFF',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,33,71,0.12)',
            boxShadow: isScrolled ? '0 8px 40px rgba(0,33,71,0.18), 0 2px 8px rgba(0,0,0,0.08)' : '0 4px 24px rgba(0,33,71,0.12), 0 1px 4px rgba(0,0,0,0.06)',
          }}>
          <motion.a href="#hero" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400 }} aria-label="CMA Home" className="flex-shrink-0">
            <img src="/logo.png" alt="Cereal Millers Association Kenya" className="h-10 md:h-12 w-auto object-contain" style={{ maxWidth: '145px' }}
              onError={(e) => { const t = e.target as HTMLImageElement; t.src = 'https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/CMA@25-Logo.png'; }} />
          </motion.a>
          <div className="hidden xl:flex gap-6 items-center">
            {navLinks.map((link, i) => (
              <motion.a key={link.href} href={link.href}
                className="relative text-[10px] font-black uppercase tracking-[0.18em] transition-colors duration-300 group"
                style={{ color: COLORS.navy }}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07 }}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full" style={{ background: COLORS.orange }} />
              </motion.a>
            ))}
            <motion.a href="mailto:itadmin@cerealmillers.co.ke?subject=Membership Application — CMA Kenya"
              className="px-5 py-2.5 rounded-full font-black text-[9px] tracking-widest uppercase text-white whitespace-nowrap transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #002147, #003a7a)', boxShadow: '0 4px 16px rgba(0,33,71,0.30)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 28px rgba(0,33,71,0.45)' }} whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 }}>
              Become a Member
            </motion.a>
            <motion.a href="#contact"
              className="px-5 py-2.5 rounded-full font-black text-[9px] tracking-widest uppercase text-white whitespace-nowrap transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 4px 16px rgba(232,114,42,0.35)` }}
              whileHover={{ scale: 1.05, boxShadow: `0 8px 28px rgba(232,114,42,0.55)` }} whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.73 }}>
              Contact Us
            </motion.a>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'} aria-expanded={isMenuOpen}
            className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full border flex-shrink-0 transition-colors duration-300"
            style={{ borderColor: 'rgba(0,33,71,0.18)', color: COLORS.navy, background: 'rgba(0,33,71,0.04)' }}>
            <div className="w-5 h-5">{isMenuOpen ? <Icons.X /> : <Icons.Menu />}</div>
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-[120] flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 backdrop-blur-md" style={{ background: 'rgba(0,13,26,0.55)' }} onClick={() => setIsMenuOpen(false)} />
            <motion.div className="relative ml-auto w-full max-w-xs h-full p-7 flex flex-col overflow-y-auto"
              style={{ background: '#FFFFFF', borderLeft: '1px solid rgba(0,33,71,0.10)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <img src="/logo.png" alt="CMA" className="h-10 w-auto object-contain" style={{ maxWidth: '120px' }}
                    onError={(e) => { const t = e.target as HTMLImageElement; t.src = 'https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/CMA@25-Logo.png'; }} />
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu"
                    className="w-9 h-9 flex-shrink-0 rounded-full border flex items-center justify-center"
                    style={{ borderColor: 'rgba(0,33,71,0.15)', color: COLORS.navy }}>
                    <Icons.X />
                  </button>
                </div>
                <nav className="flex flex-col gap-0 mb-6">
                  {navLinks.map((link, i) => (
                    <motion.a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-serif italic py-3.5 border-b flex items-center justify-between group transition-colors duration-300 hover:pl-2"
                      style={{ borderColor: 'rgba(0,33,71,0.07)', color: COLORS.navy }}
                      initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
                      {link.label}
                      <div className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" style={{ color: COLORS.orange }}><Icons.ChevronRight /></div>
                    </motion.a>
                  ))}
                </nav>
                <motion.a href="mailto:itadmin@cerealmillers.co.ke?subject=Membership Application — CMA Kenya"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-white text-center mb-3"
                  style={{ background: 'linear-gradient(135deg, #002147, #003a7a)', boxShadow: '0 4px 20px rgba(0,33,71,0.3)' }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} whileTap={{ scale: 0.97 }}>
                  Become a Member
                </motion.a>
                <motion.a href="#contact" onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-white text-center"
                  style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 4px 20px rgba(232,114,42,0.35)` }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }} whileTap={{ scale: 0.97 }}>
                  Contact Us
                </motion.a>
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,33,71,0.07)' }}>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: COLORS.orange }}>Secretariat</p>
                  <p className="text-[10px] break-all font-medium" style={{ color: COLORS.navy }}>itadmin@cerealmillers.co.ke</p>
                  <p className="text-[10px] mt-1 font-medium" style={{ color: `${COLORS.navy}70` }}>Park Suites, Westlands, Nairobi</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection({ currentSlide, setCurrentSlide }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  useEffect(() => {
    const timer = setInterval(() => { setCurrentSlide((prev: number) => (prev + 1) % BG_IMAGES.length); }, 7000);
    return () => clearInterval(timer);
  }, [setCurrentSlide]);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 z-[1]"><ParticleField count={40} /></div>
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs><pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke={COLORS.gold} strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>
      <motion.div className="relative z-[5] text-center w-full px-5 max-w-5xl mx-auto pt-28 md:pt-24 pb-32" style={{ y, opacity }}>
        <motion.div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 px-4 md:px-6 py-2.5 md:py-3 rounded-full border mx-auto"
          style={{ borderColor: `${COLORS.orange}50`, background: `${COLORS.orange}15`, backdropFilter: 'blur(12px)', maxWidth: '100%' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}>
          <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.orange }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.45em] text-center leading-tight" style={{ color: COLORS.orange }}>
            Silver Jubilee • Est. 1999 • Kenya
          </span>
        </motion.div>
        <h1 className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-serif leading-none mb-5 md:mb-6 tracking-tight text-white">
          {['Redefining', 'The', 'Sector.'].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              <motion.span className="inline-block"
                style={word === 'Sector.' ? { backgroundImage: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold}, ${COLORS.goldLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : {}}
                initial={{ y: '100%', rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.3 + wi * 0.15, ease: [0.215, 0.61, 0.355, 1] }}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="max-w-xl md:max-w-2xl mx-auto text-white/80 text-sm md:text-lg lg:text-xl font-light leading-relaxed mb-8 md:mb-10 italic px-2"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          Celebrating 25 Years of Industrial Excellence. Connecting traders, manufacturers, farmers & tech innovators.
          Feeding <span className="font-semibold" style={{ color: COLORS.orange }}>35 Million Kenyans</span> daily.
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          {['Reliable', 'Responsible', 'Resilient'].map((word, i) => (
            <motion.div key={word} className="flex items-center gap-1.5 md:gap-2"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.15 }}>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ background: COLORS.orange }} />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]" style={{ color: `${COLORS.orange}90` }}>{word}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-2"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}>
          <motion.a href="mailto:itadmin@cerealmillers.co.ke?subject=Membership Application — CMA Kenya"
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] text-white flex items-center justify-center gap-2 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 20px 40px rgba(232,114,42,0.35)` }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Become a Member <div className="w-4 h-4 flex-shrink-0"><Icons.ArrowUpRight /></div>
          </motion.a>
          <motion.a href="#about"
            className="w-full sm:w-auto border border-white/25 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center transition-all duration-500"
            style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.07)' }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(232,114,42,0.5)' }} whileTap={{ scale: 0.97 }}>
            Explore Heritage
          </motion.a>
        </motion.div>
        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.8 }}>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-1" style={{ color: COLORS.orange }}>{BG_IMAGES[currentSlide].caption}</p>
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest">{BG_IMAGES[currentSlide].sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-5 z-[5]">
        <div className="flex gap-2">
          {BG_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-500 rounded-full"
              style={{ width: currentSlide === i ? 20 : 5, height: 5, background: currentSlide === i ? COLORS.orange : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-white/30">Scroll to Explore</span>
        <motion.div className="w-5 h-8 md:w-6 md:h-10 rounded-full border border-white/20 flex items-start justify-center pt-1.5 md:pt-2"
          animate={{ borderColor: ['rgba(255,255,255,0.2)', `${COLORS.orange}80`, 'rgba(255,255,255,0.2)'] }} transition={{ duration: 2, repeat: Infinity }}>
          <motion.div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full" style={{ background: COLORS.orange }}
            animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </div>
    </section>
  );
}

function ImpactStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <SectionWrapper tint="transparent">
      <div className="relative py-16 md:py-24 overflow-hidden" ref={ref}>
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=2000"
            alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.32) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6">
          <RevealText delay={0.1}>
            <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] mb-10 md:mb-12"
              style={{ color: COLORS.orange, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
              Our Reach • CMA Impact at Scale
            </p>
          </RevealText>
          <div className="grid grid-cols-3 gap-3 md:gap-10">
            {IMPACT_STATS.map((stat, i) => (<ImpactStatItem key={i} stat={stat} index={i} isInView={isInView} />))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function StatsSection() {
  return (
    <SectionWrapper tint="navy">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <RevealText delay={0.1}>
            <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] mb-10 md:mb-14" style={{ color: COLORS.orange }}>
              Impact at Scale • CMA Silver Jubilee
            </p>
          </RevealText>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {STATS.map((stat, i) => (<StatCard key={i} {...stat} delay={i * 0.12} />))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function MembersSection() {
  return (
    <SectionWrapper id="about" tint="navy">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6 mb-10 md:mb-14">
          <RevealText>
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4 text-center" style={{ color: COLORS.orange }}>Our Member Collective</h2>
          </RevealText>
          <RevealText delay={0.15}>
            <h3 className="text-center text-3xl md:text-5xl lg:text-6xl font-serif italic text-white">60+ Elite Members</h3>
          </RevealText>
          <RevealText delay={0.25}>
            <p className="text-center text-white/50 mt-4 md:mt-5 max-w-2xl mx-auto font-light text-base md:text-lg italic px-2">
              Kenya's most distinguished millers, traders and manufacturers united under one industrial vision — feeding the nation and shaping policy since 1999.
            </p>
          </RevealText>
          <RevealText delay={0.35}>
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { icon: 'Handshake', title: 'Traders & Manufacturers', desc: "CMA bridges Kenya's grain traders and manufacturers — facilitating bilateral meets, resolving disputes, and creating a unified industry voice." },
                { icon: 'Sprout', title: 'Farmer Partnerships', desc: 'Direct linkages between certified grain farmers and CMA miller members — eliminating middlemen, stabilising supply, and ensuring fair pricing.' },
                { icon: 'Globe', title: 'Policy Leadership', desc: "Representing 60+ members in government, parliament, and regional trade bodies — shaping Kenya's grain sector regulations." },
              ].map((item, i) => {
                const IconComp = (Icons as any)[item.icon];
                return (
                  <motion.div key={i} className="rounded-3xl p-6 md:p-7 border group transition-all duration-500"
                    style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }} whileHover={{ y: -4, borderColor: `${COLORS.orange}50` }}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center p-2.5 md:p-3 mb-4 md:mb-5"
                      style={{ background: `${COLORS.orange}18`, color: COLORS.orange }}>
                      {IconComp && <IconComp />}
                    </div>
                    <h4 className="font-bold text-white text-base md:text-lg mb-2 md:mb-3">{item.title}</h4>
                    <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </RevealText>
        </div>
        <div className="space-y-4 md:space-y-5">
          <Marquee items={MEMBER_LOGOS} speed={38} />
          <Marquee items={[...MEMBER_LOGOS].reverse()} speed={48} reverse />
        </div>
      </div>
    </SectionWrapper>
  );
}

function NexusSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = SERVICES[activeTab];
  return (
    <SectionWrapper id="nexus" tint="dark">
      <div className="py-20 md:py-32 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
            <div>
              <RevealText><h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: COLORS.orange }}>Core Operations</h2></RevealText>
              <div className="overflow-hidden">
                <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white"
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}>
                  The Industrial Nexus.
                </motion.h3>
              </div>
            </div>
            <RevealText delay={0.3} className="max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-loose italic">
                Bridging traders & manufacturers. Supporting tech companies. Connecting farmers. Policy advocacy since 1999.
              </p>
            </RevealText>
          </div>
          <div className="flex gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {SERVICES.map((svc, i) => (
              <motion.button key={svc.id} onClick={() => setActiveTab(i)}
                className="relative px-4 md:px-8 py-2.5 md:py-4 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 overflow-hidden flex-shrink-0"
                style={activeTab === i ? { color: '#fff', boxShadow: `0 10px 30px rgba(232,114,42,0.3)` } : { color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}
                whileTap={{ scale: 0.97 }}>
                {activeTab === i && (
                  <motion.div className="absolute inset-0 rounded-full" layoutId="activeServiceTab"
                    style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10 whitespace-nowrap">{svc.title}</span>
              </motion.button>
            ))}
          </div>
          <div className="grid lg:grid-cols-12 gap-5 md:gap-8">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  className="rounded-[2rem] md:rounded-[3rem] p-7 md:p-12 lg:p-14 relative overflow-hidden min-h-[380px] md:min-h-[460px] flex flex-col justify-between"
                  style={{ background: 'rgba(0,20,45,0.75)', border: `1px solid rgba(232,114,42,0.2)`, backdropFilter: 'blur(20px)' }}>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div className="absolute -top-20 -right-20 w-60 h-60 md:w-72 md:h-72 rounded-full opacity-15"
                      style={{ background: `radial-gradient(circle, ${COLORS.orange}, transparent)` }}
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity }} />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-5 md:mb-6 border"
                      style={{ background: `${COLORS.orange}18`, borderColor: `${COLORS.orange}40` }}>
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: COLORS.orange }}>{activeService.tagline}</span>
                    </div>
                    <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white mb-4 md:mb-5">{activeService.title}</h4>
                    <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed italic">{activeService.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-3 relative z-10 mt-6 md:mt-8">
                    {activeService.features.map((feat, j) => (
                      <motion.div key={feat} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}
                        className="flex items-center gap-2 md:gap-3 border p-2.5 md:p-4 rounded-xl md:rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                        <div className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" style={{ color: COLORS.orange }}><Icons.CheckCircle /></div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-white/60">{feat}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3 md:gap-4">
              {SERVICES.map((svc, i) => (
                <motion.button key={svc.id} onClick={() => setActiveTab(i)}
                  className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-left transition-all duration-500 border relative overflow-hidden"
                  style={activeTab === i ? { background: 'rgba(232,114,42,0.15)', borderColor: `${COLORS.orange}60`, boxShadow: `0 10px 30px rgba(232,114,42,0.15)` } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(201,168,76,0.12)' }}
                  whileHover={{ x: activeTab === i ? 0 : 4 }} whileTap={{ scale: 0.98 }}>
                  {activeTab === i && (
                    <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" layoutId="nexusIndicator"
                      style={{ background: `linear-gradient(to bottom, ${COLORS.orange}, ${COLORS.gold})` }} />
                  )}
                  <div className="flex items-center justify-between pl-2 md:pl-3">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1.5" style={{ color: activeTab === i ? COLORS.orange : 'rgba(255,255,255,0.3)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h5 className={`font-bold text-sm md:text-lg leading-tight ${activeTab === i ? 'text-white' : 'text-white/40'}`}>{svc.title}</h5>
                      <p className="text-[9px] uppercase tracking-wider mt-1" style={{ color: activeTab === i ? `${COLORS.orange}80` : 'rgba(255,255,255,0.25)' }}>{svc.tagline}</p>
                    </div>
                    <div className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: COLORS.orange, opacity: activeTab === i ? 1 : 0 }}><Icons.ChevronRight /></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function AgroTechSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <SectionWrapper id="agritech" tint="navy">
      <div className="py-20 md:py-32 px-5 md:px-6" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <motion.span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-4" style={{ color: COLORS.orange }}
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              Farmer-to-Market Connect
            </motion.span>
            <div className="overflow-hidden">
              <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white"
                initial={{ y: '100%' }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}>
                AgroTech at the{' '}
                <span style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Core.</span>
              </motion.h3>
            </div>
            <motion.p className="text-white/50 text-sm md:text-lg font-light leading-relaxed italic mt-5 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
              CMA directly connects Kenya's grain farmers with millers and manufacturers — eliminating inefficiencies, supporting fair trade, and driving agricultural technology adoption.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
            {AGRO_PILLARS.map((pillar, i) => {
              const IconComp = (Icons as any)[pillar.icon];
              return (
                <motion.div key={i} className="group relative rounded-[2rem] p-7 md:p-10 border overflow-hidden transition-all duration-700"
                  style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}
                  initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                  whileHover={{ y: -5, borderColor: `${COLORS.orange}50`, boxShadow: `0 20px 50px rgba(232,114,42,0.12)` }}>
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-[2rem]"
                    style={{ background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold})` }} />
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center p-3 md:p-3.5 mb-5 md:mb-6"
                    style={{ background: `${COLORS.orange}18`, color: COLORS.orange }}>
                    {IconComp && <IconComp />}
                  </div>
                  <h4 className="font-bold text-white text-lg md:text-xl mb-2 md:mb-3">{pillar.title}</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6 md:mb-8">{pillar.desc}</p>
                  <div className="flex items-end gap-2 md:gap-3">
                    <div className="text-3xl md:text-4xl font-serif text-white">{pillar.stat}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: COLORS.orange }}>{pillar.statLabel}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-700 group-hover:w-full w-0"
                    style={{ background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold})` }} />
                </motion.div>
              );
            })}
          </div>
          <motion.div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            style={{ background: 'rgba(0,13,26,0.6)', border: `1px solid rgba(232,114,42,0.25)`, backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.6 }}>
            <div className="absolute inset-0 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000"
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity" alt="" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,33,71,0.88), rgba(0,33,71,0.45))' }} />
            </div>
            <div className="relative z-10 p-7 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-4" style={{ color: COLORS.orange }}>AgriTech Catalyst Program</span>
                <h4 className="text-2xl md:text-4xl font-serif italic text-white mb-4 md:mb-5">Supporting Tech Companies in the Grain Sector</h4>
                <p className="text-white/50 font-light leading-relaxed italic mb-7 md:mb-8 text-sm md:text-base">
                  CMA opens doors for agri-tech startups and technology companies to access Kenya's grain industry ecosystem through structured introductions, summit sponsorships, and direct member engagements.
                </p>
                <motion.a href="#tech"
                  className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black uppercase text-[10px] tracking-widest text-white shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 20px 40px rgba(232,114,42,0.3)` }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  View Tech Programs <div className="w-4 h-4"><Icons.ArrowRight /></div>
                </motion.a>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[{ val: '10K+', label: 'Farmers Linked' }, { val: '60+', label: 'Miller Members' }, { val: '12+', label: 'AgriTech Partners' }, { val: '98%', label: 'Aflatoxin Reduction' }].map((item, i) => (
                  <div key={i} className="rounded-xl md:rounded-2xl p-4 md:p-5 border hover:border-[rgba(232,114,42,0.4)] transition-all duration-500"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-2xl md:text-3xl font-serif mb-1 md:mb-2" style={{ color: COLORS.orange }}>{item.val}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TechSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <SectionWrapper id="tech" tint="dark">
      <div className="py-20 md:py-32 px-5 md:px-6" ref={ref}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-7 md:mb-8"
                  style={{ borderColor: `${COLORS.orange}40`, background: `${COLORS.orange}12` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.orange }} />
                  <span className="text-[9px] font-black uppercase tracking-[0.5em]" style={{ color: COLORS.orange }}>AgriTech Catalyst Program</span>
                </div>
              </motion.div>
              <div className="overflow-hidden mb-5 md:mb-6">
                <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic leading-tight text-white"
                  initial={{ y: '100%' }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}>
                  The Agri-Tech{' '}
                  <span style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Catalyst.</span>
                </motion.h3>
              </div>
              <motion.p className="text-white/50 text-sm md:text-lg font-light leading-relaxed italic mb-8 md:mb-10"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
                CMA connects technology companies directly into Kenya's grain industry ecosystem through{' '}
                <span style={{ color: COLORS.orange }} className="font-semibold">Chargeable Zoom Summits</span>,{' '}
                <span style={{ color: COLORS.gold }} className="font-semibold">WhatsApp Broadcast Campaigns</span>, and{' '}
                <span style={{ color: COLORS.orange }} className="font-semibold">IT Head Connects</span>.
              </motion.p>
              <motion.div className="space-y-3 md:space-y-4 mb-8 md:mb-10"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.55 }}>
                {['Access to 60+ grain industry decision-makers', 'Chargeable virtual summits with CMA executives', 'WhatsApp broadcast to entire member base', 'IT Head introductions and product demos', 'Proprietary market data and analytics'].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.orange }}><Icons.CheckCircle /></div>
                    <span className="text-white/60 text-sm">{point}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }}>
                <motion.a href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-[10px] uppercase tracking-widest text-white shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 20px 40px rgba(232,114,42,0.3)` }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  Partner for Growth <div className="w-4 h-4"><Icons.Zap /></div>
                </motion.a>
                <motion.a href="#events"
                  className="border border-white/20 text-white px-8 md:px-9 py-3.5 md:py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:border-[rgba(232,114,42,0.4)] transition-all duration-500 inline-flex items-center justify-center"
                  style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.04)' }}
                  whileHover={{ scale: 1.03 }}>
                  View Events
                </motion.a>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {TECH_PROGRAMS.map((card, i) => {
                const IconComp = (Icons as any)[card.icon];
                return (
                  <motion.div key={i}
                    className="group relative aspect-square border rounded-[2rem] flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-7 overflow-hidden cursor-pointer"
                    style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
                    initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -4 : 4 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
                    whileHover={{ scale: 1.05, borderColor: card.color }}>
                    <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-[2rem]" style={{ background: card.color }} />
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 px-1.5 md:px-2 py-1 rounded-full text-[6px] md:text-[7px] font-black uppercase tracking-wider"
                      style={{ background: `${card.color}20`, color: card.color, border: `1px solid ${card.color}40` }}>
                      {card.tag}
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center p-2.5 md:p-3"
                      style={{ background: `${card.color}20`, color: card.color }}>
                      {IconComp && <IconComp />}
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white mb-1 md:mb-2">{card.label}</p>
                      <p className="text-[8px] md:text-[9px] text-white/40 font-medium leading-relaxed hidden md:block">{card.desc}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function EventsSection() {
  const [eventMode, setEventMode] = useState<'physical' | 'online'>('physical');
  const events = eventMode === 'physical' ? EVENTS_PHYSICAL : EVENTS_ONLINE;
  const PHYSICAL_IMG = 'https://www.cerealmillers.co.ke/wp-content/uploads/2024/06/CMA-AGM-2023-Group-1536x657.jpg';
  const VIRTUAL_IMG = 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&q=80&w=1200';
  return (
    <SectionWrapper id="events" tint="navy">
      <div className="py-20 md:py-32 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6 md:gap-8">
            <div>
              <RevealText><h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: COLORS.orange }}>Hybrid Networking</h2></RevealText>
              <div className="overflow-hidden">
                <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white"
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                  Engagement Hub.
                </motion.h3>
              </div>
            </div>
            <RevealText delay={0.3}>
              <div className="relative flex p-1.5 rounded-full border w-full sm:w-auto"
                style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(201,168,76,0.2)' }}>
                {(['physical', 'online'] as const).map(mode => (
                  <button key={mode} onClick={() => setEventMode(mode)}
                    className="relative z-10 flex-1 sm:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-300 text-center"
                    style={{ color: eventMode === mode ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                    {eventMode === mode && (
                      <motion.div layoutId="eventModeToggle" className="absolute inset-0 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})` }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{mode === 'physical' ? '🏢 Physical' : '💻 Virtual'}</span>
                  </button>
                ))}
              </div>
            </RevealText>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="lg:col-span-7 space-y-3 md:space-y-4">
              <AnimatePresence mode="wait">
                <motion.div key={eventMode} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }} className="space-y-3 md:space-y-4">
                  {events.map((event, i) => (
                    <motion.div key={event.title}
                      className="group flex items-start gap-4 md:gap-5 rounded-2xl md:rounded-3xl p-5 md:p-8 border transition-all duration-700 cursor-pointer"
                      style={{ background: 'rgba(0,13,26,0.45)', borderColor: 'rgba(201,168,76,0.12)', backdropFilter: 'blur(12px)' }}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5, borderColor: `${COLORS.orange}50`, background: 'rgba(232,114,42,0.1)' }}>
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-base md:text-xl font-serif italic flex-shrink-0 border"
                        style={{ background: `${COLORS.orange}15`, borderColor: `${COLORS.orange}30`, color: COLORS.orange }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block mb-1.5"
                          style={{ background: `${COLORS.orange}12`, color: COLORS.orange, borderColor: `${COLORS.orange}30` }}>
                          {event.type}
                        </span>
                        <h5 className="font-bold text-sm md:text-lg text-white mb-1">{event.title}</h5>
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">{event.date} • {event.location}</p>
                        <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed">{event.desc}</p>
                      </div>
                      <div className="w-6 h-6 md:w-7 md:h-7 text-white/20 group-hover:text-[#E8722A] transition-all duration-500 flex-shrink-0 mt-1">
                        <Icons.ArrowRight />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <motion.button className="w-full py-4 md:py-5 rounded-2xl border-2 border-dashed font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500"
                style={{ borderColor: `${COLORS.orange}35`, color: COLORS.orange }}
                whileHover={{ scale: 1.01, borderColor: COLORS.orange, background: `${COLORS.orange}08` }}>
                View Full Events Calendar <div className="w-4 h-4"><Icons.ArrowRight /></div>
              </motion.button>
            </div>
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div key={eventMode}
                  className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl w-full"
                  style={{ aspectRatio: eventMode === 'physical' ? '16 / 9' : '4 / 5' }}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }}>
                  <img src={eventMode === 'physical' ? PHYSICAL_IMG : VIRTUAL_IMG}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    alt={eventMode === 'physical' ? 'CMA AGM 2023' : 'Virtual Zoom IT Meeting'} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,33,71,0.92) 0%, rgba(0,33,71,0.2) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                      style={{ background: `${COLORS.orange}25`, border: `1px solid ${COLORS.orange}50` }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.orange }} />
                      <p className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: COLORS.orange }}>
                        {eventMode === 'physical' ? 'CMA AGM 2023' : 'Live Virtual Hub'}
                      </p>
                    </div>
                    <h4 className="text-xl md:text-2xl font-serif italic text-white leading-snug">
                      {eventMode === 'physical' ? 'National Conventions & Industry Meets' : 'Zoom IT Boardroom Strategy Sessions'}
                    </h4>
                    <p className="text-white/40 text-xs mt-1.5 font-light">
                      {eventMode === 'physical' ? 'Bringing together 60+ industry leaders annually' : 'Connecting tech companies with grain sector executives'}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PartnersSection() {
  return (
    <SectionWrapper id="advertisers" tint="dark">
      <div className="py-20 md:py-32 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <RevealText><h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: COLORS.orange }}>Strategic Alliances</h2></RevealText>
            <div className="overflow-hidden">
              <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white"
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                Growth Partners.
              </motion.h3>
            </div>
            <RevealText delay={0.3}>
              <p className="text-white/40 mt-4 max-w-xl mx-auto font-light text-base md:text-lg italic">Industry-leading brands that power Kenya's grain sector ecosystem.</p>
            </RevealText>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ADVERTISERS.map((brand, i) => (
              <motion.div key={i}
                className="group relative aspect-square rounded-[2rem] p-6 md:p-10 border flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -8, borderColor: `${COLORS.orange}60`, boxShadow: `0 25px 50px rgba(232,114,42,0.15)` }}
                onClick={() => window.open(brand.url, '_blank', 'noopener noreferrer')}
                role="link" aria-label={`Visit ${brand.name}`} tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && window.open(brand.url, '_blank', 'noopener noreferrer')}>
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `linear-gradient(135deg, ${COLORS.orange}08, ${COLORS.gold}08)` }} />
                <img src={brand.image} alt={brand.name} loading="lazy"
                  className="w-full h-2/3 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-700 relative z-10"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=002147&color=C9A84C&size=200`; }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-full group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center text-center"
                  style={{ background: 'linear-gradient(to top, rgba(0,33,71,0.95), transparent)' }}>
                  <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: COLORS.orange }}>{brand.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <RevealText delay={0.5} className="text-center mt-8 md:mt-10">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
              Interested in partnering with CMA?{' '}
              <a href="#contact" className="underline underline-offset-4 hover:text-[#E8C97A] transition-colors duration-300" style={{ color: COLORS.orange }}>
                Contact our partnerships team →
              </a>
            </p>
          </RevealText>
        </div>
      </div>
    </SectionWrapper>
  );
}

function LeadershipSection() {
  const [hoveredBoard, setHoveredBoard] = useState<number | null>(null);
  const [expandedExec, setExpandedExec] = useState<number | null>(null);
  return (
    <SectionWrapper id="leadership" tint="navy">
      <div className="py-20 md:py-32 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
            <RevealText><h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: COLORS.orange }}>Executive Leadership</h2></RevealText>
            <div className="overflow-hidden">
              <motion.h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white"
                initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1 }}>
                The Authority.
              </motion.h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-10 md:mb-14">
            {SECRETARIAT.map((exec, i) => (
              <motion.div key={i} className="group rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border transition-all duration-700"
                style={{ background: 'rgba(0,13,26,0.5)', borderColor: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.2 }} whileHover={{ borderColor: `${COLORS.orange}50` }}>
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 p-6 md:p-8">
                  <div className="relative flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 self-start" style={{ borderColor: `${COLORS.orange}40` }}>
                    <img src={exec.image} alt={exec.name} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(exec.name)}&background=002147&color=C9A84C&size=200`; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-2xl md:text-3xl font-serif italic text-white mb-1">{exec.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>{exec.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={exec.linkedin} aria-label={`${exec.name} LinkedIn`}
                          className="w-9 h-9 rounded-full border flex items-center justify-center text-white/40 hover:text-white p-2 transition-all duration-300"
                          style={{ borderColor: 'rgba(255,255,255,0.1)' }}><Icons.Linkedin /></a>
                        <a href={`mailto:${exec.email}`} aria-label={`Email ${exec.name}`}
                          className="w-9 h-9 rounded-full border flex items-center justify-center text-white/40 hover:text-white p-2 transition-all duration-300"
                          style={{ borderColor: 'rgba(255,255,255,0.1)' }}><Icons.Mail /></a>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-4">{exec.shortBio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exec.committees.map((c, ci) => (
                        <span key={ci} className="text-[8px] font-black uppercase tracking-wider px-3 py-1 rounded-full border"
                          style={{ background: `${COLORS.orange}10`, borderColor: `${COLORS.orange}30`, color: `${COLORS.orange}cc` }}>{c}</span>
                      ))}
                    </div>
                    <button onClick={() => setExpandedExec(expandedExec === i ? null : i)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300"
                      style={{ color: COLORS.orange }}>
                      {expandedExec === i ? 'Read Less' : 'Read Full Profile'}
                      <motion.div className="w-4 h-4" animate={{ rotate: expandedExec === i ? 90 : 0 }} transition={{ duration: 0.3 }}><Icons.ChevronRight /></motion.div>
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedExec === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }} className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-7 md:pb-8 pt-0" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                        <div className="pt-5 md:pt-6">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: COLORS.orange }}>Full Profile</p>
                          <p className="text-white/65 text-sm md:text-base font-light leading-relaxed">{exec.bio}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div className="rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border mb-16 md:mb-20"
            style={{ background: 'rgba(0,13,26,0.45)', borderColor: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] mb-2" style={{ color: COLORS.orange }}>{CONSULTANTS.title}</p>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-6">{CONSULTANTS.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest mb-3 text-white/40">Consultants</p>
                <div className="flex flex-wrap gap-2">
                  {CONSULTANTS.consultants.map((c, i) => (
                    <span key={i} className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border"
                      style={{ background: `${COLORS.gold}10`, borderColor: `${COLORS.gold}30`, color: `${COLORS.gold}cc` }}>{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest mb-3 text-white/40">Subject Matter Experts</p>
                <div className="flex flex-wrap gap-2">
                  {CONSULTANTS.experts.map((e, i) => (
                    <span key={i} className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border"
                      style={{ background: `${COLORS.orange}10`, borderColor: `${COLORS.orange}30`, color: `${COLORS.orange}cc` }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mb-16 md:mb-20">
            <RevealText className="text-center mb-10 md:mb-12">
              <h4 className="text-2xl md:text-4xl font-serif italic text-white">The Governing Board</h4>
              <div className="w-16 md:w-20 h-1 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold})` }} />
            </RevealText>
            <div className="grid grid-cols-4 gap-3 md:gap-6">
              {BOARD.map((member, i) => (
                <motion.div key={i} className="group text-center"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  onHoverStart={() => setHoveredBoard(i)} onHoverEnd={() => setHoveredBoard(null)}>
                  <div className="relative inline-block mb-2 md:mb-3">
                    <motion.div className="absolute inset-0 rounded-full" style={{ border: `2px solid ${COLORS.orange}`, padding: 3 }}
                      animate={hoveredBoard === i ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, ease: 'linear', repeat: hoveredBoard === i ? Infinity : 0 }} />
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
                      <img src={member.image} alt={member.name} loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=002147&color=C9A84C&size=200`; }} />
                    </div>
                    <motion.div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white/20" style={{ background: COLORS.orange }}
                      animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                  </div>
                  <h5 className="font-bold text-xs md:text-base text-white group-hover:text-[#E8C97A] transition-colors duration-300 leading-tight">{member.name}</h5>
                  <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest mt-1" style={{ color: `${COLORS.orange}80` }}>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            {[{ title: 'Chapter Chairs', members: CHAPTER_CHAIRS }, { title: 'Advisory Council', members: ADVISORY }].map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, x: gi === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="flex items-center gap-4 mb-7 md:mb-8">
                  <h5 className="text-xl md:text-3xl font-serif italic text-white whitespace-nowrap">{group.title}</h5>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${COLORS.orange}40, transparent)` }} />
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-5">
                  {group.members.map((member, mi) => (
                    <motion.div key={mi} className="text-center group cursor-default"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: mi * 0.1 }} whileHover={{ y: -4 }}>
                      <div className="relative inline-block mb-2">
                        <img src={member.image} alt={member.name} loading="lazy"
                          className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover mx-auto grayscale group-hover:grayscale-0 transition-all duration-700 border shadow-lg"
                          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=002147&color=C9A84C&size=100`; }} />
                      </div>
                      <p className="font-bold text-[9px] md:text-[11px] uppercase text-white leading-tight group-hover:text-[#E8C97A] transition-colors duration-300">{member.name}</p>
                      <p className="text-[8px] text-white/30 mt-0.5 uppercase tracking-widest leading-tight">{member.role}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function MemberCTASection() {
  return (
    <SectionWrapper tint="dark">
      <div className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText>
            <span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-5" style={{ color: COLORS.orange }}>Vanguard Recruitment</span>
          </RevealText>
          <div className="overflow-hidden mb-5 md:mb-6">
            <motion.h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white"
              initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              Join the Collective.
            </motion.h3>
          </div>
          <RevealText delay={0.3}>
            <p className="text-white/50 text-base md:text-lg font-light italic mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-2">
              "Providing safe, affordable and nutritious food in sufficient quantity to our consumers." — CMA Mission
            </p>
          </RevealText>
          <RevealText delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
              <motion.a href="mailto:itadmin@cerealmillers.co.ke?subject=Membership Application — CMA Kenya"
                className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[11px] tracking-widest text-white shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})`, boxShadow: `0 25px 50px rgba(232,114,42,0.4)` }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <div className="w-5 h-5 flex-shrink-0"><Icons.Mail /></div>
                Become a Member
              </motion.a>
              <motion.a href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[11px] tracking-widest text-white border border-white/20"
                style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,13,26,0.4)' }}
                whileHover={{ scale: 1.03, borderColor: `${COLORS.orange}50` }} whileTap={{ scale: 0.97 }}>
                Contact Secretariat
              </motion.a>
            </div>
          </RevealText>
          <RevealText delay={0.6} className="mt-6 md:mt-8">
            <p className="text-[9px] text-white/25 uppercase tracking-widest font-black">
              Enquiries:{' '}
              <a href="mailto:itadmin@cerealmillers.co.ke" className="underline underline-offset-4 hover:text-[#E8722A] transition-colors duration-300" style={{ color: `${COLORS.orange}70` }}>
                itadmin@cerealmillers.co.ke
              </a>
            </p>
          </RevealText>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', subject: 'General Inquiry' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false); setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', company: '', message: '', subject: 'General Inquiry' }); }, 5000);
  };
  return (
    <SectionWrapper id="contact" tint="navy">
      <div className="py-20 md:py-32 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <RevealText><h2 className="text-[9px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: COLORS.orange }}>Get In Touch</h2></RevealText>
              <div className="overflow-hidden mb-6 md:mb-7">
                <motion.h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white"
                  initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                  Global Liaison<br />Office.
                </motion.h3>
              </div>
              <RevealText delay={0.2}>
                <p className="text-white/50 text-sm md:text-lg font-light italic mb-10 md:mb-12 leading-relaxed">
                  Our Secretariat operates from the heart of Westlands, Nairobi — the nexus of Kenya's grain industry.
                </p>
              </RevealText>
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: 'MapPin', label: 'Physical Hub', value: 'Park Suites Building, PH 5\nParklands Road, Westlands, Nairobi', action: () => window.open('https://www.google.com/maps/search/Park+Suites+Parklands+Nairobi', '_blank', 'noopener noreferrer'), actionLabel: 'Open in Maps' },
                  { icon: 'Mail', label: 'Strategic Inbox', value: 'itadmin@cerealmillers.co.ke', action: () => { window.location.href = 'mailto:itadmin@cerealmillers.co.ke'; }, actionLabel: 'Send Email' },
                  { icon: 'Globe', label: 'Web Presence', value: 'www.cerealmillers.co.ke', action: () => window.open('https://www.cerealmillers.co.ke', '_blank', 'noopener noreferrer'), actionLabel: 'Visit Website' },
                ].map((item, i) => {
                  const IconComp = (Icons as any)[item.icon];
                  return (
                    <RevealText key={i} delay={0.1 + i * 0.15}>
                      <button onClick={item.action} className="flex items-start gap-4 md:gap-5 group w-full text-left" aria-label={item.actionLabel}>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center p-3 md:p-3.5 flex-shrink-0 border transition-all duration-500 group-hover:border-[rgba(232,114,42,0.6)]"
                          style={{ background: `${COLORS.orange}12`, borderColor: `${COLORS.orange}25`, color: COLORS.orange }}>
                          {IconComp && <IconComp />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">{item.label}</p>
                          <p className="font-bold text-white text-sm md:text-lg leading-relaxed whitespace-pre-line break-words">{item.value}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest mt-1.5 flex items-center gap-1" style={{ color: COLORS.orange }}>
                            {item.actionLabel} <span className="w-3 h-3 inline-block"><Icons.ArrowRight /></span>
                          </p>
                        </div>
                      </button>
                    </RevealText>
                  );
                })}
              </div>
              <RevealText delay={0.6} className="mt-8 md:mt-10">
                <div className="flex gap-3 md:gap-4">
                  {[{ icon: 'Linkedin', href: '#', label: 'LinkedIn' }, { icon: 'Mail', href: 'mailto:itadmin@cerealmillers.co.ke', label: 'Email' }, { icon: 'Globe', href: 'https://www.cerealmillers.co.ke', label: 'Website' }].map((social, i) => {
                    const IconComp = (Icons as any)[social.icon];
                    return (
                      <motion.a key={i} href={social.href} target={social.icon !== 'Mail' ? '_blank' : undefined}
                        rel="noopener noreferrer" aria-label={social.label}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center p-2.5 md:p-3 transition-all duration-500"
                        style={{ borderColor: `${COLORS.orange}30`, color: COLORS.orange }}
                        whileHover={{ scale: 1.15, rotate: 10, borderColor: COLORS.orange, background: `${COLORS.orange}15` }}
                        whileTap={{ scale: 0.9 }}>
                        {IconComp && <IconComp />}
                      </motion.a>
                    );
                  })}
                </div>
              </RevealText>
            </div>
            <RevealText delay={0.3}>
              <div className="rounded-[2rem] md:rounded-[3rem] p-7 md:p-12 relative overflow-hidden border"
                style={{ background: 'rgba(0,13,26,0.55)', borderColor: 'rgba(201,168,76,0.2)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 rounded-bl-[3rem] opacity-10"
                  style={{ background: `linear-gradient(135deg, ${COLORS.orange}, transparent)` }} />
                <h4 className="text-xl md:text-3xl font-serif italic text-white mb-2">Send a Message</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-7 md:mb-8">We respond within 24 hours</p>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" className="text-center py-12 md:py-16"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} role="alert">
                      <motion.div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 p-4 md:p-5"
                        style={{ background: `${COLORS.orange}15`, color: COLORS.orange }}
                        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                        <Icons.CheckCircle />
                      </motion.div>
                      <h5 className="text-xl md:text-2xl font-serif italic text-white mb-3">Message Sent!</h5>
                      <p className="text-white/40 font-light text-sm">Our team will be in touch shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-4 md:space-y-5" initial={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label htmlFor="contact-name" className="text-[9px] font-black uppercase tracking-widest text-white/30 block mb-2">Full Name *</label>
                          <input id="contact-name" type="text" required value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm focus:outline-none transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.15)', color: '#fff' }}
                            placeholder="John Doe" />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="text-[9px] font-black uppercase tracking-widest text-white/30 block mb-2">Email *</label>
                          <input id="contact-email" type="email" required value={formData.email}
                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm focus:outline-none transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.15)', color: '#fff' }}
                            placeholder="you@company.com" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="text-[9px] font-black uppercase tracking-widest text-white/30 block mb-2">Company</label>
                        <input id="contact-company" type="text" value={formData.company}
                          onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                          className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm focus:outline-none transition-all duration-300"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.15)', color: '#fff' }}
                          placeholder="Your company name" />
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="text-[9px] font-black uppercase tracking-widest text-white/30 block mb-2">Subject</label>
                        <select id="contact-subject" value={formData.subject}
                          onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                          className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm focus:outline-none transition-all duration-300 appearance-none"
                          style={{ background: 'rgba(0,20,45,0.9)', border: '1px solid rgba(201,168,76,0.15)', color: '#fff' }}>
                          <option>General Inquiry</option>
                          <option>Membership Application</option>
                          <option>Partnership Proposal</option>
                          <option>Policy Advocacy</option>
                          <option>AgriTech Catalyst Program</option>
                          <option>Zoom Summit Booking</option>
                          <option>WhatsApp Campaign</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="text-[9px] font-black uppercase tracking-widest text-white/30 block mb-2">Message *</label>
                        <textarea id="contact-message" required rows={4} value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm focus:outline-none transition-all duration-300 resize-none"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.15)', color: '#fff' }}
                          placeholder="Tell us about your inquiry..." />
                      </div>
                      <motion.button type="submit" disabled={isSubmitting}
                        className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest relative overflow-hidden text-white"
                        style={{ background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.gold})` }}
                        whileHover={{ scale: 1.02, boxShadow: `0 20px 40px rgba(232,114,42,0.4)` }} whileTap={{ scale: 0.98 }}>
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.span key="loading" className="flex items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <motion.div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span key="send" className="flex items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              Send Message <div className="w-4 h-4"><Icons.ArrowRight /></div>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealText>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function Footer() {
  const footerLinks: Record<string, { label: string; href: string }[]> = {
    'Association': [{ label: 'Heritage & Story', href: '#about' }, { label: 'Our Mission', href: '#about' }, { label: 'Governance', href: '#leadership' }, { label: 'Annual Reports', href: '#' }],
    'Programs': [{ label: 'Quality & Food Safety', href: '#nexus' }, { label: 'Policy Advocacy', href: '#nexus' }, { label: 'Market Intelligence', href: '#nexus' }, { label: 'Capacity Building', href: '#nexus' }],
    'Tech & AgroTech': [{ label: 'Zoom Summits', href: '#tech' }, { label: 'WhatsApp Campaigns', href: '#tech' }, { label: 'IT Head Connects', href: '#tech' }, { label: 'Farmer Linkages', href: '#agritech' }],
    'Membership': [{ label: 'Become a Member', href: 'mailto:itadmin@cerealmillers.co.ke?subject=Membership Application' }, { label: 'Member Benefits', href: '#' }, { label: 'Member Directory', href: '#about' }, { label: 'Contact Secretariat', href: '#contact' }],
  };
  return (
    <SectionWrapper tint="dark">
      <footer className="pt-16 md:pt-24 pb-8 md:pb-12 px-5 md:px-6 relative" role="contentinfo">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.orange}40, ${COLORS.gold}40, transparent)` }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-16 pb-12 md:pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="inline-block rounded-xl px-3 py-2 mb-5 md:mb-7" style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
                <img src="/logo.png" alt="CMA 25 Years" className="h-10 md:h-12 w-auto object-contain" style={{ maxWidth: '140px' }} loading="lazy"
                  onError={(e) => { const t = e.target as HTMLImageElement; t.src = 'https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/CMA@25-Logo.png'; }} />
              </div>
              <p className="text-white/40 font-light leading-relaxed text-sm italic max-w-xs mb-6 md:mb-8">
                Cereal Millers Association Kenya — 25 years of industrial excellence, food security, and sector advocacy across East Africa.
              </p>
              <div className="flex gap-3">
                {[{ icon: 'Linkedin', href: '#', label: 'LinkedIn' }, { icon: 'Mail', href: 'mailto:itadmin@cerealmillers.co.ke', label: 'Email' }, { icon: 'Globe', href: 'https://www.cerealmillers.co.ke', label: 'Website' }].map((social, i) => {
                  const IconComp = (Icons as any)[social.icon];
                  return (
                    <motion.a key={i} href={social.href} target={social.icon !== 'Mail' ? '_blank' : undefined} rel="noopener noreferrer" aria-label={social.label}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center text-white/30 hover:text-white p-2 md:p-2.5 transition-all duration-500"
                      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                      whileHover={{ scale: 1.15, borderColor: `${COLORS.orange}60`, color: COLORS.orange }}>
                      {IconComp && <IconComp />}
                    </motion.a>
                  );
                })}
              </div>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h6 className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 md:mb-5" style={{ color: COLORS.orange }}>{category}</h6>
                <ul className="space-y-2.5 md:space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="text-white/30 hover:text-white transition-colors duration-300 text-xs md:text-sm font-medium flex items-center gap-2 group">
                        <span className="w-0 group-hover:w-3 h-px transition-all duration-300 overflow-hidden flex-shrink-0" style={{ background: COLORS.orange }} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-5">
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
              {['Reliable', 'Responsible', 'Resilient'].map((word, i) => (
                <React.Fragment key={word}>
                  {i > 0 && <span style={{ color: `${COLORS.orange}40` }}>•</span>}
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: `${COLORS.orange}60` }}>{word}</span>
                </React.Fragment>
              ))}
            </div>
            <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-center">
              © 2025 Cereal Millers Association Kenya • Silver Jubilee • All Rights Reserved
            </p>
            <div className="flex gap-4 md:gap-5">
              {['Privacy', 'Terms', 'Cookies'].map(item => (
                <a key={item} href="#" className="text-[8px] text-white/20 hover:text-white/60 uppercase tracking-widest font-black transition-colors duration-300">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </SectionWrapper>
  );
}

function LoadingScreen() {
  return (
    <motion.div className="fixed inset-0 z-[999] flex flex-col items-center justify-center" style={{ background: COLORS.navy }}
      exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }} role="status" aria-label="Loading">
      <motion.div className="rounded-2xl px-6 py-4 mb-10 md:mb-12" style={{ background: '#FFFFFF', boxShadow: '0 4px 32px rgba(0,0,0,0.25)' }}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <img src="/logo.png" alt="CMA" className="h-16 md:h-20 w-auto object-contain" style={{ maxWidth: '200px' }}
          onError={(e) => { const t = e.target as HTMLImageElement; t.src = 'https://www.cerealmillers.co.ke/wp-content/uploads/2026/04/CMA@25-Logo.png'; }} />
      </motion.div>
      <div className="w-48 md:w-64 h-1 rounded-full overflow-hidden mb-4 md:mb-5" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold}, ${COLORS.goldLight})` }}
          initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.8, ease: [0.215, 0.61, 0.355, 1] }} />
      </div>
      <motion.p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Loading CMA Silver Jubilee...
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const scrollY = useScrollY();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 2300); return () => clearTimeout(timer); }, []);
  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      <CinematicBg currentSlide={currentSlide} />
      <div className="font-sans overflow-x-hidden" style={{ color: COLORS.white, cursor: 'none' }}>
        <ScrollProgress />
        <MagneticCursor />
        <Navigation scrollY={scrollY} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <main id="main-content">
          <HeroSection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
          <ImpactStatsSection />
          <StatsSection />
          <MembersSection />
          <NexusSection />
          <AgroTechSection />
          <TechSection />
          <EventsSection />
          <PartnersSection />
          <LeadershipSection />
          <MemberCTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --gold: #C9A84C; --gold-light: #E8C97A; --gold-dark: #A07830; --orange: #E8722A; --orange-light: #F59B5E; --navy: #002147; --navy-dark: #001529; --navy-deep: #000d1a; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .font-serif { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--navy-deep); }
        ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--gold); }
        ::selection { background: var(--orange); color: #fff; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes marqueeReverse { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
        section { scroll-margin-top: 80px; }
        input, textarea, select { outline: none; }
        input:focus, textarea:focus, select:focus { box-shadow: 0 0 0 2px rgba(232,114,42,0.3); border-color: rgba(232,114,42,0.5) !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        button { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        h1, h2, h3, h4, h5 { letter-spacing: -0.02em; }
        img { transition: opacity 0.3s ease; max-width: 100%; }
        @media (hover: none), (max-width: 768px) { body { cursor: auto !important; } }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        * { word-break: break-word; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}
