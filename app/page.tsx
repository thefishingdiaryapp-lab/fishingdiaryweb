"use client"
import React, { useState, useEffect } from 'react';
import {
  Anchor,
  MapPin,
  CloudRain,
  BookOpen,
  Download,
  ChevronRight,
  Menu,
  X,
  Camera,
  Fish,
} from 'lucide-react';

const AppleIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 384 512">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-19-81.6-18.6-38.2.5-81.9 21.2-106.3 62-42.5 70.8-10.9 173.5 29.5 233 19.8 28.9 44 61.2 76.2 60 30.7-1.1 42-19.1 79.2-19.1s47.7 19.1 79.8 18.5c33.3-.6 54.4-29.4 74.3-58 23-33.1 32.5-65.1 33-66.8-.7-.3-63.7-24.5-64-97.4zM224 88c25.6-31.9 22.1-60.7 21.3-68.5-23.2 1.4-51.2 15.1-67.6 34.6-15 17.6-27.9 46.2-24.1 74.3 26.2 2 51.5-12.1 70.4-40.4z" />
  </svg>
);

// Custom SVG for Play Store
const PlayStoreIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Detailed Catch Logs",
      desc: "Record fish species, weight, length, and capture high-quality photos of your prized strikes.",
      icon: <Camera className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Secret Spot Mapping",
      desc: "Save precise GPS coordinates of your favorite spots and choose to share them with the community.",
      icon: <MapPin className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Weather & Tide Forecasts",
      desc: "Monitor wind speeds, barometric pressure, and real-time tide schedules for optimal success.",
      icon: <CloudRain className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            </div> */}
            <img
              src="play_store_512.png"
              alt="App Logo"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-3xl shadow-2xl rotate-3"
            />
            <span className="text-xl font-bold tracking-tight text-slate-800">FishDiary</span>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                Capture Every <span className="text-blue-600">Strike</span>, Cherish the Moment.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Organize your fishing trips effortlessly. Save your best spots, and share your catches with others of fellow anglers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* App Store Button */}
                <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 group">
                  <AppleIcon />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase font-medium opacity-70">Download on the</span>
                    <span className="text-lg font-bold">App Store</span>
                  </div>
                </button>

                {/* Play Store Button */}
                <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 group">
                  <PlayStoreIcon />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase font-medium opacity-70">Get it on</span>
                    <span className="text-lg font-bold">Google Play</span>
                  </div>
                </button>
              </div>

            </div>

            <div className="lg:w-1/2 relative">
              {/* Phone Mockup Representation */}
              <div className="relative mx-auto w-[280px] lg:w-[320px] aspect-[9/19] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl z-20" />
                <img
                  src="ss_welcome.png"
                  alt="Welcome Screen"
                  className="w-full h-full object-cover"
                // onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000"; }}
                />
              </div>
              {/* Secondary Floating Asset */}
              <div className="absolute -bottom-10 -right-4 lg:-right-10 w-[200px] lg:w-[240px] aspect-[9/19] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden hidden sm:block transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <img
                  src="ms_home.png"
                  alt="Home Dashboard"
                  className="w-full h-full object-cover"
                // onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000"; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p className="mb-8">©{thisYear} Fishing Diary.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="https://www.fishinitypro.com/privacy.htm" target='_blank' className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="https://www.fishinitypro.com/terms.htm" target='_blank' className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="https://www.fishinitypro.com/contact.htm" target='_blank' className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;