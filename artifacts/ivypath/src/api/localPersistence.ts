export const LocalPersistenceService = {
  save: (key: string, data: any) => {
    localStorage.setItem(`ivypath_${key}`, JSON.stringify(data));
  },
  load: <T>(key: string): T | null => {
    const data = localStorage.getItem(`ivypath_${key}`);
    return data ? JSON.parse(data) : null;
  },
  clear: () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith('ivypath_'))
      .forEach(key => localStorage.removeItem(key));
  },
  exportData: () => {
    const data: Record<string, any> = {};
    Object.keys(localStorage)
      .filter(key => key.startsWith('ivypath_'))
      .forEach(key => {
        const cleanKey = key.replace('ivypath_', '');
        data[cleanKey] = JSON.parse(localStorage.getItem(key) || 'null');
      });
    return JSON.stringify(data, null, 2);
  },
  importData: (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(`ivypath_${key}`, JSON.stringify(value));
      });
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }
};
