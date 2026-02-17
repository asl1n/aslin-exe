import { useEffect, useRef, useState, type ReactElement } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

function App(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout Successful!");
    navigate("/login", { replace: true });
  };

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-4 text-2xl font-bold border-b border-slate-800">
          AK-ReactApp <span className="text-blue-400">v19</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={linkStyles}>
            Dashboard
          </NavLink>

          <NavLink to="/users" className={linkStyles}>
            Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        <div className="relative" ref={menuRef}>
          <header className="h-16 bg-white border-b flex items-center justify-end px-8 sticky top-0 z-10">
            <div
              className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              AK
            </div>
          </header>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Account
                </p>
                <p className="text-sm font-bold text-slate-700">Current User</p>
              </div>

              <hr className="my-1 border-slate-50" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <main className="p-8">
          {/* The Router Outlet */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
