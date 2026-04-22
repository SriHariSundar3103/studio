# Watchshop Firestore Permissions Fix - TODO

## Plan Overview
Fix permission denied error on public `/products` list query when unauthenticated (auth: null).

### Steps:
- [x] **Step 1**: Review `src/firebase/index.ts` (initializeFirebase implementation) ✓ - Confirmed: App Hosting auto-init, no auth logic. Need non-blocking anonymous login.
- [x] **Step 2**: Implement anonymous auth ✓ - Removed stray duplicate useState lines causing parse error.
- [ ] **Step 3**: Update `src/context/product-context.tsx` for better loading/empty states.
- [ ] **Step 4**: Test: `npm run dev` incognito - expect products/images load after anonymous auth (~1s).
- [x] **Step 5**: Rules ready - run `firebase deploy --only firestore:rules` to sync /images permissions.
- [ ] **Step 6**: Verify admin-only writes still protected.
- [ ] **Complete**: Remove TODO.md.

Current progress: Steps 1 complete. Implementing Step 2: Adding anonymous auth trigger in src/firebase/provider.tsx using useEffect on user===null after loading. Code edit next.

