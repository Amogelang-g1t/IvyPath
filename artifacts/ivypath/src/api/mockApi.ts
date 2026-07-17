export const mockApi = {
  getUserProfile: async () => {
    return {
      id: 'user_123',
      current_grade: 'grade_11',
      current_gpa: 92,
      competitiveness_score: 65,
      streak_days: 12,
      onboarding_complete: true,
      dream_college: 'harvard',
    };
  },
  getTasks: async () => {
    return [
      { id: '1', title: 'Draft Common App Essay', status: 'in_progress', category: 'Essay', grade_level: 'grade_12', points: 50 },
      { id: '2', title: 'Research Harvard Financial Aid', status: 'completed', category: 'Finance', grade_level: 'grade_12', points: 30 },
      { id: '3', title: 'Complete SAT Practice Test 4', status: 'pending', category: 'Test Prep', grade_level: 'grade_11', points: 40 },
    ];
  },
  getActivities: async () => {
    return [
      { id: 'a1', name: 'Student Council President', impact: 'High' },
      { id: 'a2', name: 'Regional Math Olympiad', impact: 'Medium' },
    ];
  },
  getEssays: async () => {
    return [
      { id: 'e1', title: 'Personal Statement', status: 'reviewed', score: 85 },
      { id: 'e2', title: 'Why Harvard?', status: 'draft', score: null },
    ];
  }
};
