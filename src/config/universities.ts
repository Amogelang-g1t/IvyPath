export interface UniversityTheme {
  name: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export const UNIVERSITY_THEMES: Record<string, UniversityTheme> = {
  harvard: {
    name: 'Harvard University',
    primaryColor: '#A51C30', // Crimson
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  yale: {
    name: 'Yale University',
    primaryColor: '#00356B', // Yale Blue
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  princeton: {
    name: 'Princeton University',
    primaryColor: '#FFD54F', // Orange/Yellow
    accentColor: '#1a1a1a',
    textColor: '#1a1a1a',
  },
  columbia: {
    name: 'Columbia University',
    primaryColor: '#B9BCEC', // Columbia Blue
    accentColor: '#ffffff',
    textColor: '#000000',
  },
  penn: {
    name: 'University of Pennsylvania',
    primaryColor: '#ED233D', // Red
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  brown: {
    name: 'Brown University',
    primaryColor: '#B63F3D', // Brown/Red
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  dartmouth: {
    name: 'Dartmouth College',
    primaryColor: '#00693E', // Green
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  cornell: {
    name: 'Cornell University',
    primaryColor: '#B2003A', // Carnelian
    accentColor: '#ffffff',
    textColor: '#fdfdfd',
  },
  default: {
    name: 'General Academic',
    primaryColor: '#6366f1', // Indigo
    accentColor: '#ffffff',
    textColor: '#ffffff',
  }
};
