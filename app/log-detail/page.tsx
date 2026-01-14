'use client';

import React, { useEffect, useState } from 'react';

/**
 * PANDUAN PENEMPATAN DI NEXT.JS 14+ (App Router):
 * * 1. Struktur Folder: app/log-detail/page.tsx
 * 2. File Konfigurasi (Wajib): public/.well-known/assetlinks.json
 * 3. URL yang akan ditangani: https://fishingdiaries.com/log-detail?id=xxx
 */

const AppRedirectContent = () => {
  const [status, setStatus] = useState<string>("Checking the application...");
  const [logId, setLogId] = useState<string | null>(null);
  
  // Konfigurasi Aplikasi Anda (Sesuaikan dengan AndroidManifest)
  const APP_CONFIG = {
    domain: "fishingdiaries.com", 
    packageName: "com.fishinitypro.fishingdiaryapp",
    scheme: "https"
  };

  const playStoreUrl = `https://play.google.com/store/apps/details?id=${APP_CONFIG.packageName}`;

  useEffect(() => {
    // Menggunakan window.location.search untuk mengambil parameter 'id'
    // Ini menghindari dependensi pada 'next/navigation' yang bermasalah di lingkungan ini
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setLogId(id);

    // Deteksi apakah pengguna menggunakan Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (!isAndroid) {
      setStatus("Please open this link on your Android device to see details in the app.");
      return;
    }
    
    const appLink = id 
      ? `${APP_CONFIG.scheme}://${APP_CONFIG.domain}/log-detail?id=${id}`
      : `${APP_CONFIG.scheme}://${APP_CONFIG.domain}/log-detail`;

    const start = Date.now();
    
    // 1. Coba buka aplikasi secara otomatis
    window.location.href = appLink;

    // 2. Deteksi kegagalan (Fallback ke Play Store)
    const timer = setTimeout(() => {
      const end = Date.now();
      if (end - start < 2500) {
        setStatus("App not detected. Redirecting to Play Store...");
        window.location.href = playStoreUrl;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [playStoreUrl, APP_CONFIG.domain, APP_CONFIG.scheme]);

  const handleManualOpen = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const appLink = id 
      ? `${APP_CONFIG.scheme}://${APP_CONFIG.domain}/log-detail?id=${id}`
      : `${APP_CONFIG.scheme}://${APP_CONFIG.domain}/log-detail`;
    window.location.href = appLink;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full transition-all">
        <div className="mb-10 flex justify-center">
          <img 
            src="logo.png" 
            alt="App Logo" 
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-3xl shadow-2xl rotate-3"
          />
        </div>
        
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Fishinity Pro</h1>
        <p className="text-gray-500 mb-8 leading-relaxed text-sm">{status}</p>
        
        <div className="space-y-4">
          <button 
            onClick={handleManualOpen}
            className="block w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md active:scale-95 outline-none"
          >
            Open in Applications
          </button>
          
          <a 
            href={playStoreUrl}
            className="block w-full py-4 px-6 bg-gray-100 border border-transparent text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition active:scale-95"
          >
            Instal from Play Store
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
          <p>Note ID: {logId || 'Tidak ditemukan'}</p>
          <p className="mt-1 font-medium">Android version 6.0+</p>
        </div>
      </div>
    </div>
  );
};

export default AppRedirectContent;