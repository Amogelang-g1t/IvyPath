export interface MentorResponse {
  text: string;
  type: 'encouragement' | 'strategic' | 'warning' | 'resource';
}

export const MentorEngine = {
  getAdvice: (userQuestion: string, profile: any): MentorResponse => {
    const q = userQuestion.toLowerCase();
    const { current_grade, dream_college, gpa } = profile;

    // 1. Dream College Specifics
    if (q.includes('harvard') || q.includes('dream college')) {
      return {
        text: `Focusing on ${dream_college.toUpperCase()} requires more than just grades. They look for "intellectual vitality." Don't just join clubs; start something that solves a real problem in your community.`,
        type: 'strategic'
      };
    }

    // 2. Grade-based Advice
    if (q.includes('grade') || q.includes('what to do')) {
      if (current_grade === 'grade_10') {
        return {
          text: "In 10th grade, your goal is Exploration. Try three different types of activities: one academic, one creative, and one community-focused. Find your 'spike'.",
          type: 'strategic'
        };
      }
      if (current_grade === 'grade_11') {
        return {
          text: "Grade 11 is your 'Impact Year'. Move from being a member to being a leader. If you're in a club, lead a project. If you're an athlete, captain the team.",
          type: 'strategic'
        };
      }
      if (current_grade === 'grade_12') {
        return {
          text: "Now is the time for Narrative. Your essays should connect the dots of everything you've done. Focus on the 'Why' more than the 'What'.",
          type: 'strategic'
        };
      }
    }

    // 3. Academic/GPA Advice
    if (q.includes('gpa') || q.includes('average') || q.includes('grades')) {
      if (parseFloat(gpa || '0') < 90) {
        return {
          text: "Your current average is a bit below the Ivy threshold. Prioritize a 'Grade Recovery' plan. Focus on the subjects you can pull up quickly to show an upward trend.",
          type: 'warning'
        };
      }
      return {
        text: "Your academics are strong. Now, focus on 'Sustained Excellence'. Don't let your grades dip while you focus on extracurriculars.",
        type: 'encouragement'
      };
    }

    // Default fallback
    return {
      text: "That's an interesting question. Based on your profile, I suggest focusing on expanding your unique 'spike'—the one thing you are better at than 99% of people.",
      type: 'encouragement'
    };
  }
};
