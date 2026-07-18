export interface UserRegistration {
  userId: string;
  grade: string;
  dreamCollege: string;
  registrationDate: string;
}

const LOCAL_KEY = 'ivypath_registered_users';

export const RegistrationService = {
  /** Records a user registration locally and optionally syncs to a backend. */
  async recordUser(user: UserRegistration) {
    // 1. Always persist locally so the owner can see usage stats
    try {
      const existing: UserRegistration[] = JSON.parse(
        localStorage.getItem(LOCAL_KEY) || '[]'
      );
      // Avoid duplicates by userId
      if (!existing.find((u) => u.userId === user.userId)) {
        existing.push(user);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
      }
    } catch {}

    // 2. Attempt to ping the API server analytics endpoint (fails silently offline)
    try {
      if (navigator.onLine) {
        await fetch('/api/analytics/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
          signal: AbortSignal.timeout(5000),
        });
      }
    } catch {
      // Offline or server down — local record is sufficient
    }

    return { success: true };
  },

  /** Returns all locally-tracked registrations (for the admin stats view). */
  getLocalRegistrations(): UserRegistration[] {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    } catch {
      return [];
    }
  },
};
