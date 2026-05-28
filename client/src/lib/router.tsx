import { Outlet, Route, Routes } from "react-router";

import { authStore } from "@/store/auth";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { DashbaoardPage } from "@/pages/dashboard";
import { LeadsPage } from "@/pages/leads";
import { HomePage } from "@/pages/home";

export const MainRouter = () => {
  const { token } = authStore();

  return (
    <main className="mb-auto container flex-grow mx-auto px-2 py-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {token ? (
          <>
            <Route path="/dashboard" element={<DashbaoardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
      </Routes>
      <Outlet />
    </main>
  );
};
