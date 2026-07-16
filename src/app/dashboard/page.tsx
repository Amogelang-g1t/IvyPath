"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, FileText, Trophy, GraduationCap, DollarSign, Mic, ArrowRight, Sparkles, Quote, ChevronRight, Upload, X } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
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
      const t = LocalPersistenceService.load("tasks") || [];

      setProfile(p);
      setTasks(t);
      setIsLoading(false);
    }
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
    { icon: Target, label: "My Tasks", color: "from-blue-500 to-blue-600", href: "/roadmap" },
    { icon: FileText, label: "Essays", color: "from-amber-500 to-orange-500", href: "/essays" },
    { icon: Trophy, label: "Activities", color: "from-purple-500 to-pink-500", href: "/activities" },
    { icon: GraduationCap, label: "Mentor", color: "from-primary to-indigo-600", href: "/mentor" },
    { icon: DollarSign, label: "Scholarships", color: "from-green-500 to-emerald-500", href: "/scholarships" },
    { icon: Mic, label: "Interview Prep", color: "from-indigo-500 to-violet-500", href: "/interview" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Command Center</h1>
          <p className="text-stone-500 font-medium">Welcome back. Your path to the Ivy League is active.</p>
        </div>
        <div className="flex items-center gap-3 neu-flat p-2 pr-4 shadow-inner">
          <div className="w-8 h-8 rounded-full bg-primary shadow-sm" />
          <span className="font-bold text-stone-700 text-sm">{profile?.schoolName || "Student"}</span>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset your profile? All data will be lost.")) {
                LocalPersistenceService.clear();
                window.location.href = "/";
              }
            }}
            className="ml-2 p-1 text-stone-400 hover:text-red-500 transition-colors"
            title="Reset Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="neu-flat bg-stone-900 text-white border-0 shadow-xl overflow-hidden">
        <div className="p-6 flex items-start gap-4">
          <Quote className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg italic mb-2">&ldquo;{randomQuote.quote}&rdquo;</p>
            <p className="text-white/60 text-sm">&mdash; {randomQuote.author}</p>
          </div>
        </div>
      </div>

      <StatsOverview profile={profile} tasks={tasks} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Your Personalized Pathway
          </h2>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Grade {profile?.current_grade?.replace("_", " ")}</span>
        </div>
        <JourneyTrack tasks={tasks} />
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-stone-800">Strategic Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="neu-flat group hover:scale-105 transition-all cursor-pointer p-4 block">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-stone-800 group-hover:text-primary transition-colors">
                  {action.label}
                </p>
                <div className="flex justify-end mt-2">
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="neu-flat p-6 space-y-4">
              <h3 className="font-black text-stone-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Data Backup
              </h3>
              <p className="text-sm text-stone-500">Export your profile and tasks to a secure JSON file for safekeeping.</p>
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
                className="w-full py-3 rounded-xl neu-button text-stone-700 font-bold hover:text-primary transition-all"
              >
                Export Data
              </button>
            </div>

            <div className="neu-flat p-6 space-y-4">
              <h3 className="font-black text-stone-800 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Restore Profile
              </h3>
              <p className="text-sm text-stone-500">Import a previously exported backup to restore your progress.</p>
              <label className="w-full py-3 rounded-xl neu-button text-stone-700 font-bold hover:text-primary transition-all text-center block cursor-pointer">
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
          <h2 className="text-xl font-black text-stone-800">Readiness</h2>
          <CompetitivenessGauge
            score={profile?.competitiveness_score || 25}
            academicScore={profile?.current_gpa || 0}
            extracurricularScore={tasks.filter(t => t.status === "completed").length * 10}
            essayScore={0}
            testScore={0}
          />
        </div>
      </div>
    </div>
  );
}