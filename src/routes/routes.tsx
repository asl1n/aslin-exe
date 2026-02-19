import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import App from "../App";
import { AuthGuard, GuestGuard } from "../components/Guards";

const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../components/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const TutorialApp = lazy(() => import("../pages/Tutorial"));
const TaskManager = lazy(() => import("../pages/TaskManager"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export const router = createHashRouter([
  // Login
  {
    element: <GuestGuard />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <GuestGuard />,
    children: [{ path: "/register", element: <Register /> }],
  },
  // admin
  {
    element: <AuthGuard allowedRole="admin" />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
  // tutorial
  {
    element: <AuthGuard allowedRole="tutorial" />,
    children: [
      {
        path: "/tutorial",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TutorialApp />
          </Suspense>
        ),
      },
    ],
  },
  // App 3
  {
    element: <AuthGuard allowedRole="task" />,
    children: [
      {
        path: "/task",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TaskManager />
          </Suspense>
        ),
      },
    ],
  },
]);
