import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, FileText, Trophy, GraduationCap, DollarSign, Mic, ArrowRight, Sparkles, Quote, ChevronRight, Upload, X } from "lucide-react";
import { Link } from "wouter";
import { LocalPersistenceService } from "../../api/localPersistence";
import StatsOverview from "../../components/dashboard/StatsOverview";
import JourneyTrack from "../../components/dashboard/JourneyTrack";
import CompetitivenessGauge from "../../components/dashboard/CompetitivenessGauge";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      const p = LocalPersistenceService.load("profile");
      const t: any[] = LocalPersistenceService.load<any[]>("tasks") || [];

      setProfile(p);
      setTasks(t);
      setIsLoading(false);
    }
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[var(--ivy-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const motivationalQuotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "Excellence is not a destination but a continuous journey.", author: "Brian Tracy" },
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const quickActions = [
    { icon: Target, label: "My Tasks", color: "text-[#38BDF8]", href: "/roadmap" },
    { icon: FileText, label: "Essays", color: "text-[#38BDF8]", href: "/essays" },
    { icon: Trophy, label: "Activities", color: "text-[#38BDF8]", href: "/activities" },
    { icon: GraduationCap, label: "Mentor", color: "text-[#38BDF8]", href: "/mentor" },
    { icon: DollarSign, label: "Scholarships", color: "text-[#38BDF8]", href: "/scholarships" },
    { icon: Mic, label: "Interview Prep", color: "text-[#38BDF8]", href: "/interview" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Command Center</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Welcome back. Your path to the Ivy League is active.</p>
        </div>
        <div className="flex items-center gap-3 glass-panel p-2 pr-4 shadow-inner">
          <div className="w-8 h-8 rounded-full bg-[var(--ivy-accent)] shadow-sm" />
          <span className="font-bold text-sm">{profile?.schoolName || "Student"}</span>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset your profile? All data will be lost.")) {
                LocalPersistenceService.clear();
                window.location.href = "/";
              }
            }}
            className="ml-2 p-1 text-[var(--ivy-text-muted)] hover:text-[var(--ivy-danger)] transition-colors"
            title="Reset Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="p-6 flex items-start gap-4">
          <Quote className="w-8 h-8 text-[var(--ivy-accent)] flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg italic mb-2">&ldquo;{randomQuote.quote}&rdquo;</p>
            <p className="text-[var(--ivy-text-secondary)] text-sm">&mdash; {randomQuote.author}</p>
          </div>
        </div>
      </div>

      <StatsOverview profile={profile} tasks={tasks} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--ivy-accent)]" />
            Your Personalized Pathway
          </h2>
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--ivy-text-muted)]">Grade {profile?.current_grade?.replace("_", " ")}</span>
        </div>
        <JourneyTrack tasks={tasks} gender={profile?.gender} />
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black">Strategic Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="glass-card group hover:-translate-y-[2px] hover:border-[var(--ivy-border-strong)] transition-all cursor-pointer p-4 block">
                <div className={`w-12 h-12 rounded-xl bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] flex items-center justify-center mb-3 shadow-lg`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <p className="font-bold text-[var(--ivy-text-primary)] transition-colors">
                  {action.label}
                </p>
                <div className="flex justify-end mt-2">
                  <ChevronRight className="w-4 h-4 text-[var(--ivy-text-muted)] group-hover:translate-x-1 group-hover:text-[var(--ivy-accent)] transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-black flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--ivy-accent)]" />
                Data Backup
              </h3>
              <p className="text-sm text-[var(--ivy-text-secondary)]">Export your profile and tasks to a secure JSON file for safekeeping.</p>
              <button
                onClick={() => {
                  const data = LocalPersistenceService.exportData();
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `ivypath_backup_${new Date().toISOString().split("T")[0]}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full btn-ghost"
              >
                Export Data
              </button>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="font-black flex items-center gap-2">
                <Upload className="w-5 h-5 text-[var(--ivy-accent)]" />
                Restore Profile
              </h3>
              <p className="text-sm text-[var(--ivy-text-secondary)]">Import a previously exported backup to restore your progress.</p>
              <label className="w-full btn-ghost text-center block cursor-pointer">
                Import JSON
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      if (LocalPersistenceService.importData(content)) {
                         alert("Profile restored successfully! Reloading...");
                         window.location.reload();
                      } else {
                         alert("Invalid backup file.");
                      }
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black">Readiness</h2>
          <CompetitivenessGauge
            score={profile?.competitiveness_score || 25}
            academicScore={profile?.current_gpa || 0}
            extracurricularScore={tasks.filter((t: any) => t.status === "completed").length * 10}
            essayScore={0}
            testScore={0}
          />
        </div>
      </div>
    </div>
  );
}