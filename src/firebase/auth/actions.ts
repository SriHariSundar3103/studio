'use client';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, type Firestore } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { initializeFirebase } from '@/firebase';

const ADMIN_EMAILS = ['sri352006@gmail.com'];

async function getOrCreateUserProfile(db: Firestore, user: User): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  } else {
    const role = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'user';
    const newUserProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: role,
    };
    await setDoc(userRef, { ...newUserProfile, createdAt: serverTimestamp() });
    return newUserProfile;
  }
}

export async function signInWithGoogle(): Promise<{ user: User, profile: UserProfile } | null> {
  const { auth, firestore } = initializeFirebase();
  if (!auth || !firestore) {
    throw new Error("Firebase not initialized");
  }
  
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const profile = await getOrCreateUserProfile(firestore, user);
    return { user, profile };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
}

export async function signOut() {
  const { auth } = initializeFirebase();
  if (!auth) {
    throw new Error("Firebase not initialized");
  }
  await firebaseSignOut(auth);
}
