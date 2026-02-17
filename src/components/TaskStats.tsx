import { useTasks } from "../hooks/useTasks";
import { CheckCircle2, ListTodo, Clock } from "lucide-react";

export default function TaskStats() {
  const { tasks } = useTasks();
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <ListTodo size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Total
          </span>
        </div>
        <p className="text-2xl font-black text-slate-800">{tasks.length}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-600 mb-1">
          <CheckCircle2 size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Done
          </span>
        </div>
        <p className="text-2xl font-black text-slate-800">{completed}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600 mb-1">
          <Clock size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Pending
          </span>
        </div>
        <p className="text-2xl font-black text-slate-800">{pending}</p>
      </div>
    </div>
  );
}
