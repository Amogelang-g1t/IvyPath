export interface PathwayTask {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Extracurricular' | 'Testing' | 'Strategic' | 'High-Impact';
  gradeLevel: string;
  term: string;
  points: number;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  impactLevel: 'local' | 'national' | 'global';
  proofImage?: string; // Base64 encoded image
}

export interface PathwayPlan {
  tasks: PathwayTask[];
  overallStrategy: string;
  focusAreas: string[];
  recommendations: string[];
}

export const PathwayEngine = {
  generatePlan: (profile: any): PathwayPlan => {
    const tasks: PathwayTask[] = [];
    const { current_grade, dream_college, gpa, hasTakenStandardizedTest, major, extracurriculars } = profile;

    // --- 1. STRATEGIC OVERVIEW ---
    let overallStrategy = "Building a competitive profile through academic excellence and targeted leadership.";
    const focusAreas = ['GPA Maintenance', 'Core Competencies'];
    const recommendations: string[] = [];

    // --- 2. THE "HIGH-IMPACT" PLAYS (The Ivy Secret Sauce) ---
    const highImpactPlays = [
      {
        title: 'Secure a Competitive Summer Program',
        description: 'Apply to programs like SSP (Summer Science Program) or Governor\'s Schools. These are "gold stars" on Ivy applications.',
        category: 'High-Impact' as const, priority: 'high' as const, impactLevel: 'national' as const
      },
      {
        title: 'Publish Original Research',
        description: 'Partner with a local university professor or use platforms like Polygence to publish a paper in your field of interest.',
        category: 'High-Impact' as const, priority: 'medium' as const, impactLevel: 'global' as const
      },
      {
        title: 'Found a Niche Organization',
        description: 'Don\'t just join a club; create an organization that solves a real problem in your community. Focus on measurable impact.',
        category: 'High-Impact' as const, priority: 'high' as const, impactLevel: 'national' as const
      },
    ];

    // Grade-specific High Impact Mapping
    if (current_grade === 'grade_10') {
      recommendations.push("Focus on identifying your 'Spike'—the one thing you are world-class at.");
      tasks.push({
        ...highImpactPlays[0],
        id: 'hi-1', gradeLevel: 'grade_10', term: 'term_4', points: 200, status: 'pending', impactLevel: 'national'
      });
    } else if (current_grade === 'grade_11') {
      recommendations.push("This is the la-year to execute your 'Big Move'. Research and leadership must peak now.");
      tasks.push({
        ...highImpactPlays[1],
        id: 'hi-2', gradeLevel: 'grade_11', term: 'term_4', points: 300, status: 'pending', impactLevel: 'global'
      });
    }

    // --- 3. ACADEMIC & TEST GAP ANALYSIS ---
    if (current_grade === 'grade_11' && !hasTakenStandardizedTest) {
      tasks.push({
        id: 't-test-urgent',
        title: 'Sprinting to SAT/ACT Target',
        description: 'Your profile is missing a standardized benchmark. You need a top-tier score to validate your GPA.',
        category: 'Testing', gradeLevel: 'grade_11', term: 'term_1', points: 150, status: 'pending', priority: 'high', impactLevel: 'local'
      });
    }

    // --- 4. MAJOR-SPECIFIC STRATEGY ---
    if (major && (major.toLowerCase().includes('cs') || major.toLowerCase().includes('comp'))) {
      overallStrategy = "Engineering an Elite STEM Profile: Focus on Technical Depth and Open Source Contribution.";
      tasks.push({
        id: 'major-1',
        title: 'Build a Complex Technical Project',
        description: 'Create a software tool that solves a real-world problem. Deploy it and get actual users.',
        category: 'Extracurricular', gradeLevel: current_grade, term: 'term_1', points: 100, status: 'pending', priority: 'medium', impactLevel: 'global'
      });
    } else if (major && (major.toLowerCase().includes('econ') || major.toLowerCase().includes('bus'))) {
      overallStrategy = "Developing a Quantitative & Leadership Profile: Focus on Market Analysis and Venture Impact.";
      tasks.push({
        id: 'major-2',
        title: 'Start a Micro-Enterprise',
        description: 'Launch a small business or non-profit that demonstrates financial literacy and management.',
        category: 'Extracurricular', gradeLevel: current_grade, term: 'term_1', points: 100, status: 'pending', priority: 'medium', impactLevel: 'national'
      });
    }

    // --- 5. GRADE-BASED FOUNDATIONS ---
    if (current_grade === 'grade_10') {
      tasks.push({
        id: 'g10-1', title: 'Maintain GPA Excellence', description: 'Target 90%+ average. Consistency now prevents stress later.',
        category: 'Academic', gradeLevel: 'grade_10', term: 'term_1', points: 100, status: 'pending', priority: 'high', impactLevel: 'local'
      });
    } else if (current_grade === 'grade_11') {
      tasks.push({
        id: 'g11-1', title: 'Deepen Leadership Role', description: 'Move from "Member" to "Founder/President". Focus on measurable output.',
        category: 'Extracurricular', gradeLevel: 'grade_11', term: 'term_1', points: 150, status: 'pending', priority: 'high', impactLevel: 'national'
      });
    } else if (current_grade === 'grade_12') {
      overallStrategy = "The Final Narrative: Synthesizing your achievements into a compelling 'Why Me?' story.";
      tasks.push({
        id: 'g12-1', title: 'The Personal Statement Draft', description: 'Avoid the "resume list". Tell a story of intellectual growth.',
        category: 'Strategic', gradeLevel: 'grade_12', term: 'term_1', points: 200, status: 'pending', priority: 'high', impactLevel: 'local'
      });
    }

    return {
      tasks,
      overallStrategy,
      focusAreas: ['Academic Rigor', 'Quantifiable Impact', 'Intellectual Vitality'],
      recommendations
    };
  }
};
