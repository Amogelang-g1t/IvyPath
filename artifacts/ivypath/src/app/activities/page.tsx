import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Award, Tag } from "lucide-react";
import { LocalPersistenceService } from "@/api/localPersistence";
import { useAppStore } from "../../store/useAppStore";

interface Activity {
  id: string;
  name: string;
  role: string;
  description: string;
  impact: "low" | "medium" | "high" | "exceptional";
  category: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    role: "",
    description: "",
    impact: "medium",
    category: "Leadership",
  });

  useEffect(() => {
    const saved = LocalPersistenceService.load<Activity[]>("activities");
    if (saved) setActivities(saved);
  }, []);

  const addActivity = () => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
    } as Activity;
    const updated = [...activities, activity];
    setActivities(updated);
    LocalPersistenceService.save("activities", updated);
    setIsAdding(false);
    setNewActivity({ name: "", role: "", description: "", impact: "medium", category: "Leadership" });
  };

  const deleteActivity = (id: string) => {
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    LocalPersistenceService.save("activities", updated);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Extracurricular Profile</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Defining your "Spike"—the unique value you bring to campus.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </button>
      </header>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 space-y-6 max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center mb-4 border-b border-[var(--ivy-border)] pb-4">
            <h3 className="font-semibold text-[0.75rem] uppercase tracking-[0.08em]">New Activity</h3>
            <button onClick={() => setIsAdding(false)} className="text-[var(--ivy-text-muted)] hover:text-[var(--ivy-danger)] transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Organization/Project</label>
              <input
                type="text"
                value={newActivity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                className="input-field"
                placeholder="e.g. Robotics Club"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Your Role</label>
              <input
                type="text"
                value={newActivity.role}
                onChange={(e) => setNewActivity({ ...newActivity, role: e.target.value })}
                className="input-field"
                placeholder="e.g. Founder & President"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Description of Impact</label>
            <textarea
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              className="input-field h-32 resize-none"
              placeholder='Quantify your achievements (e.g. "Increased membership by 50% and raised $2k")...'
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Impact Level</label>
              <select
                value={newActivity.impact}
                onChange={(e) => setNewActivity({ ...newActivity, impact: e.target.value })}
                className="input-field appearance-none bg-[var(--ivy-bg-elevated)]"
              >
                <option value="low">Local / Low</option>
                <option value="medium">Regional / Medium</option>
                <option value="high">National / High</option>
                <option value="exceptional">International / Exceptional</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Category</label>
              <select
                value={newActivity.category}
                onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                className="input-field appearance-none bg-[var(--ivy-bg-elevated)]"
              >
                <option value="Leadership">Leadership</option>
                <option value="Academic">Academic Research</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Athletics">Athletics</option>
                <option value="Community">Community Service</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--ivy-border)]">
            <button
              onClick={addActivity}
              className="btn-primary"
            >
              Add to Profile
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-2 text-center py-20 glass-card space-y-4">
            <Award className="w-12 h-12 text-[var(--ivy-text-muted)] mx-auto" />
            <p className="text-[var(--ivy-text-secondary)] font-medium">Your profile is a blank slate. Start adding your achievements!</p>
          </div>
        ) : (
          activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 space-y-4 group relative"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black">{activity.name}</h3>
                  <p className="text-[var(--ivy-accent)] font-bold text-sm">{activity.role}</p>
                </div>
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="p-2 rounded-lg text-[var(--ivy-text-muted)] hover:text-[var(--ivy-danger)] hover:bg-[rgba(248,113,113,0.1)] transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-[var(--ivy-text-secondary)] leading-relaxed italic">&ldquo;{activity.description}&rdquo;</p>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--ivy-border)]">
                <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">
                  <Tag className="w-3 h-3" /> {activity.category}
                </div>
                <div
                  className={`px-3 py-1 rounded-[24px] text-[0.75rem] font-bold uppercase border tracking-tighter ${
                    activity.impact === "exceptional" ? "border-[var(--ivy-accent)] text-[var(--ivy-accent)] bg-[var(--ivy-accent-glow)]" : "border-[var(--ivy-border-strong)] text-[var(--ivy-text-secondary)]"
                  }`}
                >
                  {activity.impact} Impact
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}