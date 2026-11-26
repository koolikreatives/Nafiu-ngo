import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { DashboardDataProvider } from "./context/DashboardDataContext";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "./components/dashboard/ToastContainer";
import LandingPage from "./Pages/Landingpage";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";

import MemberLayout from "./Pages/member/MemberLayout";
import MemberOverview from "./Pages/member/MemberOverview";
import MemberDuesPayment from "./Pages/member/MemberDuesPayment";
import MemberDonate from "./Pages/member/MemberDonate";
import MemberDonationHistory from "./Pages/member/MemberDonationHistory";
import MemberProfile from "./Pages/member/MemberProfile";

import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminPlaceholderPage from "./Pages/admin/AdminPlaceholderPage";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DashboardDataProvider>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* MEMBER PORTAL */}
            <Route path="/dashboard" element={<MemberLayout />}>
              <Route index element={<MemberOverview />} />
              <Route path="dues" element={<MemberDuesPayment />} />
              <Route path="donate" element={<MemberDonate />} />
              <Route path="history" element={<MemberDonationHistory />} />
              <Route path="profile" element={<MemberProfile />} />
            </Route>

            {/* ADMIN WORKSPACE */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route
                path="members"
                element={
                  <AdminPlaceholderPage
                    eyebrow="DIRECTORY"
                    title="Members"
                    description="View and manage registered community members and dues status."
                  />
                }
              />
              <Route
                path="donations"
                element={
                  <AdminPlaceholderPage
                    eyebrow="TRANSACTIONS"
                    title="Donations"
                    description="Review, verify, and track donations across all community campaigns."
                  />
                }
              />
              <Route
                path="campaigns"
                element={
                  <AdminPlaceholderPage
                    eyebrow="FUNDRAISING"
                    title="Campaigns"
                    description="Manage active campaigns, targets, and funding milestones."
                  />
                }
              />
              <Route
                path="reports"
                element={
                  <AdminPlaceholderPage
                    eyebrow="ANALYTICS"
                    title="Reports"
                    description="Generate financial summaries and community impact reports."
                  />
                }
              />
              <Route
                path="settings"
                element={
                  <AdminPlaceholderPage
                    eyebrow="WORKSPACE"
                    title="Settings"
                    description="Configure organization settings, roles, and notification preferences."
                  />
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </DashboardDataProvider>
    </AuthProvider>
    </ToastProvider>
  );
}
