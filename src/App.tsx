import type { ReactElement } from "react";
import { Outlet, NavLink } from "react-router-dom";

function App(): ReactElement {
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          AccSwift <span className="text-blue-400">v20</span>
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
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-700">
            Management Console
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">v20.0.1</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* The Router Outlet */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
