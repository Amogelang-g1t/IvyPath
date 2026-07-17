export interface UserRegistration {
  userId: string;
  grade: string;
  dreamCollege: string;
  registrationDate: string;
}

export const RegistrationService = {
  // This is the "Digital Handshake" URL.
  // When you set up Supabase, you will replace this with your actual project URL.
  SUPABASE_URL: 'https://your-project-id.supabase.co',
  SUPABASE_KEY: 'your-public-anon-key',

  async recordUser(user: UserRegistration) {
    console.log('Initiating Digital Handshake...', user);

    // If the keys aren't set up yet, we just log to console so the app doesn't crash.
    if (this.SUPABASE_URL === 'https://your-project-id.supabase.co') {
      console.log('⚠️ Registration Service is in "Local Mode". No network call made.');
      return { success: true, mode: 'local' };
    }

    try {
      const response = await fetch(`${this.SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'apikey': this.SUPABASE_KEY,
          'Authorization': `Bearer ${this.SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(user)
      });

      return { success: response.ok, mode: 'cloud' };
    } catch (error) {
      console.error('Handshake failed:', error);
      return { success: false, mode: 'error' };
    }
  }
};
