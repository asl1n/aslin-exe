import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      richColors
      expand={false}
      duration={3000}
      toastOptions={{
        style: {
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
        className: "my-toast-class",
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
