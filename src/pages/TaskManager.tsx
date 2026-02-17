import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, LayoutDashboard } from "lucide-react";
import { TaskProvider } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";

export default function TaskManager() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    toast.success("Logout Successful!");
    navigate("/login", { replace: true });
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        {/* Sticky Header */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 mb-8">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 p-1.5 rounded-lg">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                TaskManager{" "}
                <span className="text-blue-600 font-black">V19</span>
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6">
          {/* Stats Bar */}
          <TaskStats />

          <div className="grid gap-8">
            <section>
              <TaskForm />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold text-slate-800">
                  Your Workspace
                </h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase">
                  Drag to reorder
                </span>
              </div>
              <TaskList />
            </section>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
