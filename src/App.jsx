import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Pizza as PizzaIcon,
  Utensils,
  IceCream,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ArrowRight,
  Menu as MenuIcon,
  X,
  ChevronRight,
  Flame,
  Star,
  MessageCircle,
  Award,
  Sun,
  QrCode,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

import chapattiImg from './assets/Soft Brown Roti.jpg';
// --- Theme Styles ---
const styles = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
    
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.9) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  
  .spicy-gradient {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  }

  .glass-dark {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .menu-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-card:hover {
    transform: translateY(-8px);
    border-color: #ef4444;
  }

  .custom-scrollbar {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #ef4444 transparent;
    -webkit-overflow-scrolling: touch;
  }

  .custom-scrollbar::-webkit-scrollbar {
    height: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #ef4444, #f97316);
    border-radius: 10px;
  }
`;

const WHATSAPP_NUMBER = '256753271472';

// --- Data Updated from Handwritten Notes ---
const MENU_DATA = {
  breakfast: [
    {
      name: 'Katogo (Offals)',
      price: '4,000 UGX',
      desc: 'Traditional morning energy',
      hot: true,
    },
    {
      name: 'Katogo (Beef)',
      price: '4,000 UGX',
      desc: 'Hearty local breakfast',
      hot: true,
    },
    {
      name: 'Special Chapatti',
      price: '1,000 UGX',
      desc: 'Freshly pan-fried',
      hot: false,
    },
    {
      name: 'Kikomando',
      price: 'From 1,000 UGX',
      desc: 'Chapatti mixed with beans',
      hot: false,
    },
    {
      name: 'Rolex (Eggs & Chap)',
      price: '2,000 UGX',
      desc: 'The Masaka classic',
      hot: true,
    },
    {
      name: 'Samosas (Beef)',
      price: '1,000 UGX',
      desc: 'Crispy beef pastry',
      hot: false,
    },
    {
      name: 'Samosas (Peas)',
      price: '500 UGX',
      desc: 'Tasty veggie snack',
      hot: false,
    },
    {
      name: 'Black Tea',
      price: '500 UGX',
      desc: 'Hot and refreshing',
      hot: true,
    },
  ],
  fastFood: [
    {
      name: 'Chips & Liver',
      price: '10,000 UGX',
      desc: 'Savory liver with golden chips',
      hot: true,
    },
    {
      name: 'Chips & Chicken',
      price: '8,000 UGX',
      desc: 'The ultimate combo',
      hot: true,
    },
    {
      name: 'Chips Plain',
      price: '3,000 UGX',
      desc: 'Crispy golden fries',
      hot: false,
    },
    {
      name: 'Sausages (Pair)',
      price: '1,000 UGX',
      desc: 'Grilled to perfection',
      hot: true,
    },
    {
      name: 'Muchomo (Roasted Goat)',
      price: '20,000 UGX',
      desc: "Masaka's finest roasted meat",
      hot: true,
    },
    {
      name: 'Kebab',
      price: '2,000 UGX',
      desc: 'Spiced grilled meat skewer',
      hot: true,
    },
  ],
  lunch: [
    {
      name: 'All Food & Chicken',
      price: '8,000 UGX',
      desc: 'Complete meal with local chicken',
      hot: true,
    },
    {
      name: 'All Food & Fish',
      price: '7,000 UGX',
      desc: 'Hearty fish and local sides',
      hot: true,
    },
    {
      name: 'All Food & Beef (2 Pcs)',
      price: '7,000 UGX',
      desc: 'Double the beef flavor',
      hot: true,
    },
    {
      name: 'All Food & Beef (1 Pc)',
      price: '5,000 UGX',
      desc: 'Standard beef portion',
      hot: false,
    },
    {
      name: 'All Food & Groundnuts',
      price: '4,000 UGX',
      desc: 'Traditional G-nut sauce',
      hot: false,
    },
    {
      name: 'All Food & Peas',
      price: '4,000 UGX',
      desc: 'Deliciously seasoned peas',
      hot: false,
    },
    {
      name: 'Brown Rice & Beans',
      price: '4,000 UGX',
      desc: 'Healthy fiber-rich option',
      hot: false,
    },
    {
      name: 'White Rice & Beans',
      price: '3,000 UGX',
      desc: 'Simple and satisfying',
      hot: false,
    },
  ],
  drinks: [
    {
      name: 'Juice (Cocktail)',
      price: '3,000 UGX',
      desc: 'Premium mix',
      hot: false,
    },
    {
      name: 'Juice (Medium)',
      price: '2,000 UGX',
      desc: 'Freshly squeezed',
      hot: false,
    },
    {
      name: 'Juice (Glass)',
      price: '1,000 UGX',
      desc: 'Daily refresh',
      hot: false,
    },
    {
      name: 'Minute Maid',
      price: '2,500 UGX',
      desc: 'Bottled fruit goodness',
      hot: false,
    },
    {
      name: 'Sting Energy',
      price: '2,000 UGX',
      desc: 'Stay active',
      hot: false,
    },
    {
      name: 'Soda (All Brands)',
      price: '1,000 UGX',
      desc: 'Chilled refreshment',
      hot: false,
    },
    {
      name: 'Spiced Milk Tea',
      price: '1,500 UGX',
      desc: 'Aromatic blend',
      hot: true,
    },
  ],
  iceCream: [
    { name: 'Waffle Cones', price: '3,000 UGX', hot: false },
    { name: 'Big Tin', price: '5,000 UGX', hot: false },
    { name: 'Medium Tin', price: '2,000 UGX', hot: false },
    { name: 'Small Tin / Cone', price: '1,000 UGX', hot: false },
    { name: 'Only Waffle Cone', price: '1,500 UGX', hot: false },
    {
      name: 'Flavors',
      price: 'Strawb, Van, Blueb, Choc, Coco, Orange',
      isNote: true,
    },
  ],
  coffee: [
    {
      name: 'Affogato',
      price: '5,000 UGX',
      desc: 'Ice cream & Espresso blend',
      hot: false,
    },
    {
      name: 'Flat White',
      price: '4,500 UGX',
      desc: 'Smooth velvety finish',
      hot: false,
    },
    {
      name: 'Iced Latte',
      price: '4,500 UGX',
      desc: 'Chilled perfection',
      hot: false,
    },
    { name: 'Cappuccino', price: '4,000 UGX', hot: false },
    { name: 'Americano / Espresso', price: '3,000 UGX', hot: false },
    { name: 'Black Coffee', price: '2,000 UGX', hot: false },
  ],
};

const CATEGORIES = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    icon: <Sun size={20} />,
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'fastFood',
    label: 'Fast Food',
    icon: <Zap size={20} />,
    image:
      'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'lunch',
    label: 'Lunch & Supper',
    icon: <Utensils size={20} />,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'drinks',
    label: 'Beverages',
    icon: <Coffee size={20} />,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'iceCream',
    label: 'Ice Cream',
    icon: <IceCream size={20} />,
    image:
      'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'coffee',
    label: 'Coffee Bar',
    icon: <Flame size={20} />,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
  },
];

const GALLERY = [
  {
    title: 'Signature Muchomo',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Gourmet Ice Cream',
    img: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Iced Coffee Bar',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400',
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'home';
  });

  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    const baseUrl = window.location.href.split('?')[0];
    const newUrl = tab === 'home' ? baseUrl : `${baseUrl}?tab=${tab}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection onExplore={() => handleTabChange('menu')} />;
      case 'menu':
        return (
          <MenuSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        );
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-red-500 selection:text-white overflow-x-hidden">
      <style>{styles}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleTabChange('home')}
          >
            <div className="w-10 h-10 spicy-gradient rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="font-black text-xl">DH</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold tracking-tighter leading-none">
                DUNAMIS
              </h1>
              <p className="text-[10px] text-red-500 font-bold tracking-[0.2em]">
                HOTPLATE
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'menu', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleTabChange(item)}
                className={`capitalize font-medium text-sm transition-colors ${
                  activeTab === item
                    ? 'text-red-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}

            <div className="flex items-center gap-3 border-l border-white/10 pl-8">
              <button
                onClick={() => setShowQRModal(true)}
                className="p-2 bg-slate-800 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Share Menu QR Code"
              >
                <QrCode size={18} />
              </button>
              <button
                onClick={() => handleTabChange('contact')}
                className="px-5 py-2 spicy-gradient rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Order Now
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2 bg-slate-800 rounded-full text-slate-300"
            >
              <QrCode size={18} />
            </button>
            <button
              className="text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] glass-dark flex flex-col items-center justify-center gap-8 text-2xl font-bold animate-pop-in">
          {['home', 'menu', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleTabChange(item)}
              className="capitalize"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center"
          >
            <X />
          </button>
        </div>
      )}

      {showQRModal && <QRCodeModal onClose={() => setShowQRModal(false)} />}

      <main className="transition-all duration-500">{renderContent()}</main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 spicy-gradient rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">DH</span>
              </div>
              <span className="font-bold">DUNAMIS HOTPLATE</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Good Food, Fair Prices. Proudly serving Masaka.
            </p>
            <button
              onClick={() => setShowQRModal(true)}
              className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 font-bold"
            >
              <QrCode size={16} /> Digital Menu QR
            </button>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-red-500 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:text-red-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:text-red-500"
              >
                <Facebook size={20} />
              </a>
              <a
                href="tel:0753271472"
                className="p-2 bg-slate-800 rounded-lg hover:text-red-500"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
          <div className="text-slate-500 text-sm space-y-2">
            <p>&copy; 2026 Dunamis Hotplate.</p>
            <p className="flex items-center justify-center md:justify-start gap-1">
              <MapPin size={14} /> Kasijjagirwa-Kigamba Road, Masaka
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const QRCodeModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.href.split('?')[0];
  const menuDeepLink = `${baseUrl}?tab=menu`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    menuDeepLink
  )}&color=0f172a&bgcolor=ffffff`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(menuDeepLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 max-w-sm w-full relative animate-pop-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X size={16} />
        </button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 spicy-gradient rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
            <QrCode size={24} />
          </div>
          <h3 className="text-2xl font-black uppercase mb-2">
            Scan for <span className="text-red-500">Menu</span>
          </h3>
          <p className="text-sm text-slate-400">
            Scan to view our digital menu directly on your phone.
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl mx-auto w-fit shadow-inner mb-6">
          <img
            src={qrImageUrl}
            alt="Menu QR"
            className="w-[200px] h-[200px] rounded-lg"
          />
        </div>
        <div className="bg-slate-950 rounded-xl p-3 flex items-center gap-3 border border-slate-800">
          <div className="truncate flex-1 text-xs text-slate-400 font-mono pl-2">
            {menuDeepLink}
          </div>
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded-lg ${
              copied
                ? 'bg-green-500/20 text-green-500'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ onExplore }) => (
  <div className="space-y-20 pb-20">
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12 z-10">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-6">
            <Star size={14} fill="currentColor" />{' '}
            <span>BIG PORTIONS • GREAT TASTE</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            GOOD <br />
            <span className="text-transparent bg-clip-text spicy-gradient">
              FOOD
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
            Delicious meals at cheap & affordable prices. Pass by today on
            Kasijjagirwa-Kigamba Road.
          </p>
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-2xl spicy-gradient text-white font-bold flex items-center justify-center gap-2 group transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            View Full Menu{' '}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="relative animate-slide-up [animation-delay:200ms]">
          <div className="aspect-square relative">
            <img
              src={chapattiImg}
              alt="Local Chapatti"
              className="w-full h-full object-cover rounded-[40px] shadow-2xl rotate-3"
            />
            <div className="absolute -bottom-6 -left-6 glass-dark p-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce">
              <p className="text-red-500 font-bold text-xl leading-none">1k</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                Fresh Chapatti
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const MenuSection = ({ activeCategory, setActiveCategory }) => {
  const currentCategoryData = CATEGORIES.find((c) => c.id === activeCategory);
  const handleOrderItem = (itemName) => {
    const text = `Hello Dunamis Hotplate! I would like to order ${itemName}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
            Our <span className="text-red-500">Menu</span>
          </h2>
          <p className="text-slate-500">
            Craving good food? Check our updated affordable prices below!
          </p>
        </div>
        <div className="w-full md:w-auto overflow-hidden">
          <div className="custom-scrollbar pb-4 flex gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'spicy-gradient text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                {cat.icon}
                <span className="font-bold text-sm">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="hidden lg:block animate-slide-up">
          <div className="sticky top-32 rounded-[2rem] overflow-hidden aspect-[3/4] border border-white/10">
            <img
              src={currentCategoryData?.image}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 flex items-end p-8">
              <div>
                <h3 className="text-2xl font-black uppercase text-white">
                  {currentCategoryData?.label}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 animate-slide-up">
          {MENU_DATA[activeCategory]?.map((item, idx) => (
            <div
              key={idx}
              className={`menu-card glass-dark p-6 rounded-[2rem] flex flex-col justify-between ${
                item.isNote ? 'border-dashed opacity-80' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-white flex items-center gap-2">
                    {item.name}
                    {item.hot && (
                      <Flame
                        size={16}
                        className="text-red-500"
                        fill="currentColor"
                      />
                    )}
                  </h3>
                  {item.price && (
                    <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-xs font-black">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.desc && (
                  <p className="text-sm text-slate-500">{item.desc}</p>
                )}
              </div>
              {!item.isNote && (
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] text-slate-600 uppercase font-bold">
                    Order on WhatsApp
                  </span>
                  <button
                    onClick={() => handleOrderItem(item.name)}
                    className="text-red-500 p-2 bg-red-500/10 rounded-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
    <div className="glass-dark rounded-[3rem] p-10 md:p-16 border border-white/10 relative overflow-hidden animate-slide-up">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
          Let's <span className="text-red-500">Eat</span>
        </h2>
        <p className="text-slate-400">
          Kasijjagirwa-Kigamba Road, Opposite Equator University
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-red-500">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                Call Us
              </p>
              <p className="text-xl font-bold">0753 271 472</p>
              <p className="text-sm text-slate-400">0701 767 939</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-red-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                Find Us
              </p>
              <p className="text-xl font-bold">Masaka City</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 text-center">
          <h4 className="font-bold mb-8">Fast Response</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-green-600 text-white font-black text-sm tracking-widest"
          >
            <MessageCircle size={20} /> CHAT NOW
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default App;
