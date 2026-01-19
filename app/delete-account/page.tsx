'use client';

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

/**
 * PLACEMENT GUIDE:
 * 1. Folder Structure: app/delete-account/page.tsx
 * 2. Google Play Console URL: https://fishingdiaries.com/delete-account
 */

// Firebase Configuration (Uses system environment variables)
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');
const appId = process.env.NEXT_PUBLIC_APP_ID || 'fishing-diary-web';

const DeleteAccountPage = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  // Initialize Firebase
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      
      const initAuth = async () => {
        // Following Rule 3: Auth before query
        await signInAnonymously(auth);
      };
      
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase init error:", err);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!user) {
      setError("Failed to process request. Please refresh the page.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const db = getFirestore();
      // Following Rule 1: Allowed Path
      const collectionPath = collection(db, 'artifacts', appId, 'public', 'data', 'deletion_requests');
      
      await addDoc(collectionPath, {
        email: email,
        reason: reason,
        requestedAt: serverTimestamp(),
        status: 'pending',
        uid: user.uid
      });

      setIsSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again later or contact support@fishingdiaries.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted</h1>
          <p className="text-gray-600 mb-6">
            The <strong>Fishinity Pro</strong> team has received your account deletion request. 
            This process usually takes 7-14 business days. We will send a confirmation email once the process is complete.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 px-6 bg-gray-900 text-white font-bold rounded-xl transition hover:bg-black"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Fishinity Pro" className="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-md rotate-3" />
          <h1 className="text-3xl font-extrabold text-gray-900">Account & Data Deletion</h1>
          <p className="text-gray-500 mt-2">Official request for Fishinity Pro (Fishing Diary) app users</p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          {/* Info Section */}
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">ℹ️</span> Important Information
            </h2>
            <ul className="space-y-3 text-blue-50 text-sm">
              <li>• <strong>Deleted Data:</strong> User profile, fishing logs, catch photos, and associated location data.</li>
              <li>• <strong>Retained Data:</strong> We may retain financial transaction data (if any) for legal compliance for the period specified by law.</li>
              <li>• <strong>Impact:</strong> Once the account is deleted, you cannot recover any data previously created.</li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Account Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter the email registered in the app"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Deletion (Optional)</label>
                <textarea 
                  placeholder="Let us know why you are leaving..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-32"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Submit Account Deletion Request'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Fishinity Pro Developer Team.</p>
          <p className="mt-2">Support Contact: thefishingdiaryapp@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;