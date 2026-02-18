import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, LayoutDashboard, Gamepad2 } from "lucide-react";
import { TaskProvider } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";
import { useState } from "react";
import Modal from "../components/Modal";

export default function TaskManager() {
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("appView");
    toast.success("Logout Successful!");
    navigate("/login", { replace: true });
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        {/* Sticky Header */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 mb-8">
          <div className="max-w-[85%] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-slate-900 p-1.5 rounded-lg">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                TaskManager{" "}
                <span className="text-blue-600 font-black">V19</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Fun Zone Button */}
              <a
                href="https://asl1n.github.io/arrow-game/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                <Gamepad2 size={18} />
                Fun Zone
              </a>

              {/* Logout Button */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-[85%] mx-auto px-6">
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

        <Modal
          isOpen={isLogoutModalOpen}
          title="Log Out?"
          message="Are you sure you want to end your session?"
          onConfirm={handleLogout}
          onClose={() => setIsLogoutModalOpen(false)}
          confirmText="Logout"
          isDestructive={true}
        />
      </div>
    </TaskProvider>
  );
}
