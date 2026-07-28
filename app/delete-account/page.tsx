'use client';

import React, { useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

/**
 * GOOGLE PLAY COMPLIANT ACCOUNT DELETION PAGE
 * URL: https://www.fishingdiaries.com/delete-account
 */

const DeleteAccountPage = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // SINKRONKAN NAMA INI DENGAN GOOGLE PLAY CONSOLE ANDA:
  const APP_NAME = "The Anglers Diary"; // Atau "Fishinity Pro" (sesuaikan dengan Play Store Listing)
  const DEVELOPER_NAME = "Kieran Moore"; // Ganti dengan nama Developer Account di Play Console

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');
      const appId = process.env.NEXT_PUBLIC_APP_ID || 'fishing-diary-web';

      if (!firebaseConfig.apiKey) {
        throw new Error("Configuration not ready. Please contact support.");
      }

      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const db = getFirestore(app);

      // Authenticate anonymously
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      if (!user) {
        throw new Error("Failed to authenticate session.");
      }

      // Save to Firestore
      const collectionPath = collection(db, 'artifacts', appId, 'public', 'data', 'deletion_requests');
      
      await addDoc(collectionPath, {
        email: email.trim(),
        reason: reason.trim(),
        requestedAt: serverTimestamp(),
        status: 'pending',
        uid: user.uid,
        appName: APP_NAME,
        platform: 'web_request'
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("An error occurred while sending your request. You can also email us directly at thefishingdiaryapp@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans text-gray-900">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-2">Request Received</h1>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Your account deletion request for <strong>{APP_NAME}</strong> has been submitted. 
            All associated data will be removed within 7-14 business days.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition active:scale-95"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        
        {/* APP & DEVELOPER IDENTIFICATION (MANDATORY FOR GOOGLE PLAY REVIEWS) */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img 
              src="/play_store_512.png" 
              alt={APP_NAME} 
              className="w-20 h-20 rounded-2xl shadow-md rotate-3 object-cover"
              onError={(e) => {
                // Fallback jika gambar gagal dimuat agar tidak merusak tampilan
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-2">
            Developer: {DEVELOPER_NAME}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {APP_NAME}
          </h1>
          <p className="text-gray-500 text-sm">
            Account & Associated Data Deletion Request Page
          </p>
        </div>

        {/* STEPS TO REQUEST DELETION (EXPLICITLY REQUIRED BY GOOGLE) */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span> How to Request Account Deletion
          </h2>
          <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside leading-relaxed">
            <li>Fill out the request form below with your registered email address.</li>
            <li>Click <strong>"Submit Deletion Request"</strong> to send your request directly to our team.</li>
            <li>Alternatively, send an email to <a href="mailto:thefishingdiaryapp@gmail.com" className="text-blue-600 underline font-medium">thefishingdiaryapp@gmail.com</a> with the subject <em>"Account Deletion Request"</em>.</li>
            <li>Our support team will process and confirm your request within 7-14 business days.</li>
          </ol>
        </div>

        {/* DATA RETENTION & DELETION DISCLOSURE (REQUIRED BY GOOGLE) */}
        <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🔒</span> Data Deletion & Retention Policy
          </h2>
          <div className="space-y-4 text-sm text-blue-50 leading-relaxed">
            <div>
              <p className="font-semibold text-white mb-1">Data That Will Be Permanently Deleted:</p>
              <p>• User profile info (Email, Name, Avatar, Preferences)</p>
              <p>• All created fishing catch logs and location coordinates</p>
              <p>• All uploaded catch photos and personal notes</p>
            </div>
            <div className="pt-2 border-t border-blue-500/50">
              <p className="font-semibold text-white mb-1">Data Retained (If applicable):</p>
              <p>• Anonymized transaction or billing records may be retained for up to 90 days strictly for legal and financial audit compliance.</p>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Submit Online Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registered Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                required
                placeholder="Enter your registered account email"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Deletion (Optional)
              </label>
              <textarea 
                placeholder="Why do you wish to delete your account?"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition h-28 text-sm"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Deletion Request'}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-gray-400 text-xs leading-relaxed">
          <p>© {new Date().getFullYear()} {APP_NAME} by {DEVELOPER_NAME}. All rights reserved.</p>
          <p className="mt-2">Contact Support: <a href="mailto:thefishingdiaryapp@gmail.com" className="underline">thefishingdiaryapp@gmail.com</a></p>
        </div>

      </div>
    </div>
  );
};

export default DeleteAccountPage;