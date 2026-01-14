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
  Wind
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Fish size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">FishDiary</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#community" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Community</a>
            <a href="#download" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">Download App</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                <Anchor size={16} /> #1 Fishing App in Indonesia
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                Capture Every <span className="text-blue-600">Strike</span>, Cherish the Moment.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Organize your fishing trips effortlessly. Track weather conditions, save your best spots, and share your catches with thousands of fellow anglers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                  <Download size={20} />
                  App Store
                </button>
                <button className="flex items-center justify-center gap-3 bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-md">
                  Explore Features
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-medium">Join 12,000+ Active Anglers</p>
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
              
              {/* Status Badge */}
              <div className="absolute top-20 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Wind size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Today's Weather</p>
                    <p className="text-sm font-bold text-slate-800">Partly Cloudy, 28°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Built by Anglers, <br/>For Anglers</h2>
            <p className="text-slate-600">Forget soggy notebooks. Everything you need is in the palm of your hand, from trip planning to post-catch analysis.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-black mb-2">50K+</p>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Catch Logs</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black mb-2">2K+</p>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Mapped Spots</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black mb-2">4.9</p>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">App Rating</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black mb-2">12K</p>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Active Anglers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
               {/* Pattern overlay */}
               <div className="grid grid-cols-6 gap-4 p-8">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-blue-400" />
                  ))}
               </div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="lg:max-w-xl space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready for Your Next Trip?</h2>
                <p className="text-slate-400 text-lg">Download Fishing Diary now and start documenting your fishing adventures like a pro.</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">Google Play</button>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">App Store</button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <img 
                    src="logo.png" 
                    alt="App Logo" 
                    className="w-32 h-32 lg:w-48 lg:h-48 rounded-3xl shadow-2xl rotate-3"
                    // onError={(e) => { e.target.src = "https://via.placeholder.com/200"; }}
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Fish size={18} />
            </div>
            <span className="text-lg font-bold text-slate-800">FishDiary</span>
          </div>
          <p className="mb-8">© 2024 Fishing Diary. Built with ❤️ for the global angler community.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;