export interface Essay {
  id: string;
  title: string;
  content: string;
  prompt: string;
  status: 'draft' | 'reviewed' | 'final';
  score: number;
}

export const EssayEngine = {
  analyzeContent: (content: string) => {
    const ivyKeywords = ['leadership', 'initiative', 'impact', 'research', 'curiosity', 'community', 'challenge', 'growth', 'passion', 'innovation'];
    const words = content.toLowerCase().split(/\s+/);

    const foundKeywords = ivyKeywords.filter(keyword => words.includes(keyword));
    const score = Math.min(100, (foundKeywords.length * 15) + (words.length > 200 ? 20 : 0));

    return {
      score,
      foundKeywords,
      missingKeywords: ivyKeywords.filter(k => !foundKeywords.includes(k)),
      wordCount: words.length,
    };
  },

  getPrompts: () => [
    { id: 'ps', title: 'Personal Statement', desc: 'The core narrative of your life and identity.' },
    { id: 'why', title: 'Why Us?', desc: 'Specific reasons why this college is your perfect match.' },
    { id: 'activity', title: 'Extracurricular Deep-Dive', desc: 'A detailed look at your most significant impact.' },
    { id: 'challenge', title: 'Overcoming Adversity', desc: 'How you handled a significant challenge in your life.' },
  ]
};
