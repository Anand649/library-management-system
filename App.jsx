// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider }   from "./context/AuthContext";
import { ToastProvider }  from "./context/ToastContext";
import { ProtectedRoute, NotFound } from "./components/ProtectedRoute";
import Layout             from "./components/Layout";

import AuthPage           from "./pages/AuthPage";
import MemberDashboard    from "./pages/MemberDashboard";
import BrowseBooks        from "./pages/BrowseBooks";
import ProfilePage        from "./pages/ProfilePage";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import AdminDashboard     from "./pages/AdminDashboard";

// ── Wrap a page in Layout ─────────────────────────────────────────────────────
const Page = ({ component: Component }) => (
  <Layout><Component /></Layout>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public */}
            <Route path="/login"  element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/"       element={<Navigate to="/login" replace />} />

            {/* Member routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["member"]}>
                <Page component={MemberDashboard} />
              </ProtectedRoute>
            }/>
            <Route path="/browse" element={
              <ProtectedRoute allowedRoles={["member"]}>
                <Page component={BrowseBooks} />
              </ProtectedRoute>
            }/>
            <Route path="/my-books" element={
              <ProtectedRoute allowedRoles={["member"]}>
                <Page component={MemberDashboard} />
              </ProtectedRoute>
            }/>
            <Route path="/history" element={
              <ProtectedRoute allowedRoles={["member"]}>
                <Page component={MemberDashboard} />
              </ProtectedRoute>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={["member","librarian","admin"]}>
                <Page component={ProfilePage} />
              </ProtectedRoute>
            }/>

            {/* Librarian routes */}
            <Route path="/librarian" element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <Page component={LibrarianDashboard} />
              </ProtectedRoute>
            }/>
            <Route path="/librarian/*" element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <Page component={LibrarianDashboard} />
              </ProtectedRoute>
            }/>

            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Page component={AdminDashboard} />
              </ProtectedRoute>
            }/>
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Page component={AdminDashboard} />
              </ProtectedRoute>
            }/>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
