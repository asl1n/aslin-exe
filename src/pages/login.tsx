import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import Modal from "../components/Modal";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // For Creds display and use
  const appCreds = [
    {
      name: "Task Manager",
      user: "task",
      pass: "task",
      app: "task",
      path: "/task",
      welcome: "Welcome to Task Manager",
    },
    {
      name: "Admin Panel",
      user: "admin",
      pass: "admin",
      app: "admin",
      path: "/",
      welcome: "Welcome to AK-ReactApp",
    },
    {
      name: "Tutorial App (Coming Soon)",
      user: "soon",
      pass: "soon",
      app: "tutorial",
      path: "/tutorial",
      welcome: "Welcome to Tutorial",
    },
  ];

  const [isCredsModalOpen, setIsCredsModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find the account that matches the input
    const matchedAccount = appCreds.find(
      (acc) => acc.user === username && acc.pass === password,
    );

    if (matchedAccount) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("appView", matchedAccount.app);
      toast.success("Access Granted", {
        description: matchedAccount.welcome,
      });
      navigate(matchedAccount.path, { replace: true });
    } else {
      toast.error("Access Denied", { description: "Incorrect credentials." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Login
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to manage your workspace
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Username
            </label>
            <input
              type="text"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCredsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 py-2 rounded-xl hover:bg-blue-100 transition-all cursor-pointer border border-blue-100 mb-2"
          >
            <KeyRound size={14} />
            View Demo Credentials
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-bold transition-all"
            >
              Sign Up
            </Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all shadow-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      <div className="absolute bottom-6 text-center text-sm text-slate-500 font-medium">
        Developed by{" "}
        <a
          href="https://asl1n.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transition-all font-bold"
        >
          Aslin Karmacharya{" "}
        </a>{" "}
      </div>
      <Modal
        isOpen={isCredsModalOpen}
        onClose={() => setIsCredsModalOpen(false)}
        onConfirm={() => setIsCredsModalOpen(false)}
        title="App Credentials"
        message="Use these Credentials to explore around:"
        confirmText="Got it!"
      >
        <div className="mt-4 space-y-2">
          {appCreds.map((acc) => (
            <div
              key={acc.app}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">
                  {acc.name}
                </p>
                <p className="text-sm font-bold text-slate-800">{acc.user}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">
                  Password
                </p>
                <code className="text-sm font-mono font-bold text-blue-600">
                  {acc.pass}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
