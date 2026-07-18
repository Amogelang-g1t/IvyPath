export interface MentorResponse {
  text: string;
  type: 'encouragement' | 'strategic' | 'warning' | 'resource';
}

const DEFAULT_RESPONSES: MentorResponse[] = [
  {
    text: "Your 'spike' — the one thing you do better than 99% of people — is what separates Ivy applicants from admits. Identify it now and build everything around it. Admissions officers should be able to describe you in one sentence.",
    type: 'strategic'
  },
  {
    text: "Elite universities are not looking for well-rounded students; they are building well-rounded classes. Be the best in your specific domain. Depth beats breadth every time.",
    type: 'strategic'
  },
  {
    text: "Start building your digital footprint today. A personal website, a GitHub, a published article, or a community project that shows up in a Google search of your name is incredibly powerful.",
    type: 'strategic'
  },
  {
    text: "Authenticity is your biggest advantage. Admissions readers read thousands of essays — they can instantly spot a fabricated passion. Write about what genuinely excites you at 11pm on a Friday.",
    type: 'encouragement'
  },
  {
    text: "Quantify your impact wherever possible. 'Led a community project' is weak. 'Organised a food drive that collected 2,400 meals for 300 families in Soweto' is compelling. Numbers create credibility.",
    type: 'strategic'
  },
  {
    text: "South African context is a strength, not a disadvantage. Your unique perspective — navigating a complex, diverse society — is something Harvard or Oxford genuinely values. Don't erase your context; amplify it.",
    type: 'encouragement'
  },
  {
    text: "Build relationships with your teachers now. Your letters of recommendation carry enormous weight. A teacher who knows you as a thinker — not just a student — can write a transformative letter.",
    type: 'strategic'
  },
  {
    text: "Intellectual curiosity beyond the classroom matters. Read books outside your syllabus, attend public lectures, follow researchers on X/Twitter. Reference these in your essays to show genuine passion.",
    type: 'strategic'
  },
  {
    text: "Application season is not the time to start building your profile — it's the time to tell the story of what you've already built. The real work happens in Grades 10 and 11.",
    type: 'warning'
  },
  {
    text: "The 'Why This College' essay is often your weakest link. Generic praise kills applications. Research specific professors, labs, clubs and programmes — then explain how they connect to your exact goals.",
    type: 'strategic'
  },
  {
    text: "Consider applying to a range of schools: 2-3 reach schools, 3-4 match schools, and 2-3 safety schools. UCT, Wits, and Stellenbosch are excellent and affordable options that should anchor your list.",
    type: 'resource'
  },
  {
    text: "Your activities list is a narrative, not a résumé. Order it by significance to your spike, not by prestige. The admissions committee should see a through-line — a student with a clear mission.",
    type: 'strategic'
  },
  {
    text: "Sleep, exercise and mental health are strategic, not optional. Burnout in Grade 12 can cost you everything you worked for. Build sustainable habits now.",
    type: 'encouragement'
  },
  {
    text: "Talk to current students and alumni at your target universities. LinkedIn and university Facebook groups are gold mines. Real insider knowledge helps you write better essays and ask smarter interview questions.",
    type: 'resource'
  },
  {
    text: "The supplemental essays are where applications are won or lost. Give them as much time as your personal statement. Each one should reveal a new dimension of who you are — never repeat the same story.",
    type: 'strategic'
  },
];

export const MentorEngine = {
  getAdvice: (userQuestion: string, profile: any): MentorResponse => {
    const q = userQuestion.toLowerCase();
    const { current_grade, dream_college, gpa } = profile || {};

    // ESSAY / PERSONAL STATEMENT
    if (
      q.includes('essay') ||
      q.includes('personal statement') ||
      q.includes('write') ||
      q.includes('draft') ||
      q.includes('common app') ||
      q.includes('topic') ||
      q.includes('hook') ||
      q.includes('opening')
    ) {
      return {
        text: "Hook admissions readers in sentence one — open with a vivid scene, not a summary. Show, don't tell: instead of 'I am passionate about robotics,' put the reader in the moment you first dismantled a motor at midnight. Keep your personal statement to 650 words, every one of which earns its place. Authenticity matters more than impressive vocabulary — write in the voice you actually use.",
        type: 'strategic'
      };
    }

    // WHY THIS SCHOOL
    if (
      q.includes('why harvard') ||
      q.includes('why yale') ||
      q.includes('why princeton') ||
      q.includes('why stanford') ||
      q.includes('why oxford') ||
      q.includes('why cambridge') ||
      q.includes('why mit') ||
      q.includes('why uct') ||
      q.includes('why wits') ||
      q.includes('why school') ||
      q.includes('why college') ||
      q.includes('specific school essay')
    ) {
      return {
        text: "The 'Why This School' essay must be hyper-specific — generic praise will kill your application. Research three things: a professor whose work connects directly to yours, a course or programme unique to that school, and a student club or initiative you would contribute to. Then explain how each ties back to your specific goals. Avoid phrases like 'world-class faculty' or 'diverse community' — every school claims those.",
        type: 'strategic'
      };
    }

    // INTERVIEW PREP
    if (
      q.includes('interview') ||
      q.includes('practice') ||
      q.includes('nervous') ||
      q.includes('prepare') ||
      q.includes('mock')
    ) {
      return {
        text: "Use the STAR method (Situation, Task, Action, Result) to answer behavioural questions. The top 5 questions to master: (1) Tell me about yourself — have a 90-second narrative ready; (2) Why this university — link their resources to your goals; (3) Describe a challenge you overcame — use STAR; (4) What's your biggest weakness — show self-awareness and growth; (5) Do you have questions for me — always have three ready. For virtual interviews: look into the camera (not the screen), use a neutral background, and do a tech check the night before.",
        type: 'strategic'
      };
    }

    // GPA / MARKS / ACADEMIC
    if (
      q.includes('gpa') ||
      q.includes('average') ||
      q.includes('marks') ||
      q.includes('matric') ||
      q.includes('academic') ||
      q.includes('grades')
    ) {
      const numericGpa = parseFloat(gpa || '0');
      if (numericGpa > 0 && numericGpa < 80) {
        return {
          text: "Your current average needs attention. Build a 'Grade Recovery' plan: identify the two or three subjects where a focused push can yield the biggest improvement and work on those first. Admissions officers love an upward trend — a strong Grade 11 and 12 can offset a weaker Grade 10. Note: South African matric percentages don't convert 1:1 to US GPAs — 80%+ typically maps to a 3.7+ GPA on a 4.0 scale.",
          type: 'warning'
        };
      }
      return {
        text: "Strong academics open doors — now make sure they don't close others. Don't let your grades slip while chasing extracurriculars. Ivy League schools want sustained excellence, not a peak followed by a dip. An 85%+ matric aggregate with distinction in relevant subjects is a solid foundation; pair it with a strong SAT/ACT to reinforce it for US schools.",
        type: 'encouragement'
      };
    }

    // SAT / ACT / TEST PREP
    if (
      q.includes('sat') ||
      q.includes('act') ||
      q.includes('test score') ||
      q.includes('standardized') ||
      (q.includes('test') && q.includes('score'))
    ) {
      return {
        text: "In South Africa, register for the SAT or ACT at Pearson VUE test centres (Johannesburg, Cape Town, Durban). Target scores by school tier: Ivy League / MIT / Stanford aim for SAT 1500+ or ACT 34+; strong US universities aim for SAT 1350+ or ACT 30+. Use Khan Academy (free, official SAT prep) and the ACT official guide. Many schools are now test-optional, but a strong score still helps — especially for scholarships.",
        type: 'resource'
      };
    }

    // SCHOLARSHIP / BURSARY / FUNDING
    if (
      q.includes('scholarship') ||
      q.includes('bursary') ||
      q.includes('nsfas') ||
      q.includes('funding') ||
      q.includes('financial') ||
      q.includes('money') ||
      q.includes('cost')
    ) {
      return {
        text: "For South African universities: NSFAS covers tuition + accommodation for qualifying students at public universities. Allan Gray Orbis Foundation offers full funding for entrepreneurial students. For US universities: apply for financial aid via CSS Profile — Harvard, Yale and Princeton meet 100% of demonstrated need, often cheaper than SA private universities for low-income families. For UK: Rhodes Scholarship (Oxford, postgrad), Chevening Scholarship (UK masters), and the Gates Cambridge Scholarship are highly prestigious and cover full costs.",
        type: 'resource'
      };
    }

    // EXTRACURRICULAR / ACTIVITIES / SPIKE
    if (
      q.includes('extracurricular') ||
      q.includes('activities') ||
      q.includes('club') ||
      q.includes('sport') ||
      q.includes('spike') ||
      q.includes('leadership')
    ) {
      return {
        text: "Quality beats quantity — 3 deep commitments outshine 10 shallow ones. The 'spike' theory: find one domain where you can be elite, then build a constellation of activities that support it. Always move from member → leader → founder. Quantify impact with numbers: 'Grew debate club from 8 to 45 members, winning 3 provincial championships.' Leadership means creating change others can see, not just holding a title.",
        type: 'strategic'
      };
    }

    // GRADE 10
    if (
      q.includes('grade 10') ||
      q.includes('tenth grade') ||
      q.includes('form 4') ||
      q.includes('10th grade')
    ) {
      return {
        text: "Grade 10 is your Exploration Phase — use it well. Try three different types of activities: one academic (e.g., maths olympiad, science fair), one creative (writing, music, coding), and one community-focused (tutoring, NGO volunteering). Don't worry about being the best yet — you're looking for what makes you lose track of time. The activity that keeps pulling you back at 10pm is probably your spike.",
        type: 'strategic'
      };
    }

    // GRADE 11
    if (
      q.includes('grade 11') ||
      q.includes('eleventh grade') ||
      q.includes('form 5') ||
      q.includes('11th grade')
    ) {
      return {
        text: "Grade 11 is your Impact Year — the most important year for your application. Move from member to leader in your primary activity: organise an event, launch a project, mentor juniors, or start something new. Admissions committees will scrutinise your Grade 11 results closely (they're often the most recent full-year results available). Aim to build one major achievement this year that anchors your entire application narrative.",
        type: 'strategic'
      };
    }

    // GRADE 12 / MATRIC / FINAL YEAR
    if (
      q.includes('grade 12') ||
      (q.includes('matric') && (q.includes('applying') || q.includes('final') || q.includes('12th'))) ||
      q.includes('twelfth grade') ||
      q.includes('final year') ||
      (q.includes('applying') && q.includes('this year'))
    ) {
      return {
        text: "Grade 12 is your Narrative Phase — connect the dots. Your essays should show how everything you've done leads logically to your future goals. Follow this timeline: June–July: finalise your college list and start essays; August–September: SA university applications close (UCT, Wits, Stellenbosch); October 15: Early Decision/Early Action opens for US schools; November 1: most EA/ED deadlines; January 1: Regular Decision deadlines. Don't let applications crowd out your matric results — both matter.",
        type: 'strategic'
      };
    }

    // LETTERS OF RECOMMENDATION
    if (
      q.includes('recommendation') ||
      q.includes('reference') ||
      q.includes('letter of rec') ||
      (q.includes('letter') && q.includes('teacher'))
    ) {
      return {
        text: "Ask teachers who know you as a thinker, not just a grade-earner — the teacher who saw you struggle and grow writes a better letter than the one who gave you 95% effortlessly. Ask at least 6 weeks before the deadline. Provide each recommender with a 'brag sheet': your activities list, key achievements, the specific schools you're applying to, and a short note on what you hope they can highlight. Follow up with a thank-you note after submission.",
        type: 'strategic'
      };
    }

    // DEADLINE / TIMELINE
    if (
      q.includes('deadline') ||
      q.includes('timeline') ||
      q.includes('when to apply') ||
      q.includes('application date') ||
      (q.includes('when') && q.includes('apply'))
    ) {
      return {
        text: "Key application dates to lock in: SA universities (UCT, Wits, Stellenbosch, UP) close August–September of your matric year — apply early for bursary consideration. US universities: Early Decision / Early Action — October 15 for some schools, November 1 for most; Regular Decision — January 1 (most Ivies). UK universities: UCAS deadline is January 15 (October 15 for Oxford/Cambridge). Start essays in June–July, finalise your list by August, and never submit at 11:59pm — servers crash.",
        type: 'resource'
      };
    }

    // DREAM COLLEGE SPECIFICS (catch-all for specific schools)
    if (
      q.includes('harvard') ||
      q.includes('yale') ||
      q.includes('princeton') ||
      q.includes('stanford') ||
      q.includes('mit') ||
      q.includes('oxford') ||
      q.includes('cambridge') ||
      q.includes('dream college')
    ) {
      const college = dream_college ? dream_college.toUpperCase() : 'your dream school';
      return {
        text: `Getting into ${college} requires more than top grades — they seek 'intellectual vitality': students who pursue ideas because they're compelled to, not because it looks good. Research their specific programmes, professors and student organisations. In your essays, show exactly how ${college}'s unique resources connect to what you've already been doing and where you want to go. Acceptance rates are low, but students who are genuinely passionate about a specific fit get in.`,
        type: 'strategic'
      };
    }

    // GRADE-BASED ADVICE (generic grade mentions)
    if (q.includes('grade') || q.includes('what should i do')) {
      if (current_grade === 'grade_10') {
        return {
          text: "In Grade 10, your goal is Exploration. Try three different types of activities: one academic, one creative, and one community-focused. Find your 'spike' — the activity that makes you lose track of time. Don't over-optimise yet; this is the year to discover what genuinely drives you.",
          type: 'strategic'
        };
      }
      if (current_grade === 'grade_11') {
        return {
          text: "Grade 11 is your Impact Year. Move from being a member to being a leader. If you're in a club, lead a project. If you're an athlete, captain the team. Build something measurable this year — admissions readers will ask 'what changed because this student was here?'",
          type: 'strategic'
        };
      }
      if (current_grade === 'grade_12') {
        return {
          text: "Now is the time for Narrative. Your essays should connect the dots of everything you've done. Focus on the 'Why' more than the 'What.' Follow the application timeline carefully — SA university deadlines hit before US and UK ones.",
          type: 'strategic'
        };
      }
    }

    // DEFAULT — rotate through varied strategic responses
    const index = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
    return DEFAULT_RESPONSES[index];
  }
};
