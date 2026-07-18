import { SCHOLARSHIP_DATABASE, Scholarship } from '../data/scholarships';
import { LocalPersistenceService } from './localPersistence';

export type { Scholarship };

export const ScholarshipService = {
  /** Seeds localStorage with the built-in database on first load */
  seedIfEmpty() {
    const existing = LocalPersistenceService.load<Scholarship[]>('scholarships');
    if (!existing || existing.length === 0) {
      LocalPersistenceService.save('scholarships', SCHOLARSHIP_DATABASE);
    }
  },

  /** Returns all scholarships from localStorage (seeded from built-in DB) */
  getAll(): Scholarship[] {
    this.seedIfEmpty();
    return LocalPersistenceService.load<Scholarship[]>('scholarships') || SCHOLARSHIP_DATABASE;
  },

  /** Refreshes cache from built-in database (called on online sync) */
  async syncScholarships(): Promise<Scholarship[]> {
    LocalPersistenceService.save('scholarships', SCHOLARSHIP_DATABASE);
    return SCHOLARSHIP_DATABASE;
  },

  filter(
    scholarships: Scholarship[],
    opts: { search?: string; category?: string; degree?: string }
  ): Scholarship[] {
    let results = scholarships;
    if (opts.category && opts.category !== 'all') {
      // SA Bursaries pill maps to both 'sa-bursary' and 'sa-merit'
      if (opts.category === 'sa-bursaries') {
        results = results.filter(s => s.category === 'sa-bursary' || s.category === 'sa-merit');
      } else {
        results = results.filter(s => s.category === opts.category);
      }
    }
    if (opts.degree && opts.degree !== 'all') {
      results = results.filter(
        s => s.targetDegree === opts.degree || s.targetDegree === 'both'
      );
    }
    if (opts.search) {
      const q = opts.search.toLowerCase();
      results = results.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.provider.toLowerCase().includes(q) ||
          s.criteria.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.fieldFocus.some(f => f.toLowerCase().includes(q))
      );
    }
    return results;
  },
};
