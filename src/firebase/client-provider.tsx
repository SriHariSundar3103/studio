'use client';

import { ReactNode } from 'react';
import { initializeFirebase, FirebaseProvider } from '.';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const { firebaseApp, auth, firestore } = initializeFirebase();

  if (!firebaseApp || !auth || !firestore) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
