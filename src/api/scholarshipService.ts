export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  criteria: string;
  link: string;
  category: 'merit' | 'need' | 'specialty';
}

export const ScholarshipService = {
  // Mock external source - in a real app, this would be a GitHub Raw JSON or a free API
  EXTERNAL_SOURCE: 'https://api.jsonbin.io/v3/b/650000000000000000000000', // Placeholder

  async fetchFreshData(): Promise<Scholarship[]> {
    try {
      // Simulating a network request
      await new Promise(res => setTimeout(res, 1000));

      // In a real implementation, you'd use fetch(this.EXTERNAL_SOURCE)
      // For this PoC, we return a curated list that simulates an API response
      return [
        { id: 's1', name: 'The Gates Scholarship', amount: '$100k', deadline: 'Sept 15', criteria: 'High academic achievement + leadership', link: 'https://gatesscholarship.org', category: 'merit' },
        { id: 's2', name: 'QuestBridge National College Match', amount: 'Full Ride', deadline: 'Sept 26', criteria: 'High-achieving, low-income students', link: 'https://questbridge.org', category: 'need' },
        { id: 's3', name: 'Coca-Cola Scholars Program', amount: '$20k', deadline: 'Oct 31', criteria: 'Leadership and service', link: 'https://cocalacolasholars.org', category: 'merit' },
        { id: 's4', name: 'Jack Kent Cooke Young Scholars', amount: 'Full Tuition', deadline: 'Nov 1', criteria: 'Exceptional academic record', link: 'https://jkcf.org', category: 'merit' },
      ];
    } catch (e) {
      console.error("Sync failed", e);
      return [];
    }
  },

  async syncScholarships() {
    if (!navigator.onLine) return null;

    const freshData = await this.fetchFreshData();
    if (freshData.length > 0) {
      localStorage.setItem('ivypath_scholarships', JSON.stringify(freshData));
      return freshData;
    }
    return null;
  }
};
