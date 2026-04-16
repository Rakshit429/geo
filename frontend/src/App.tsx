import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import CsmipTool from "./pages/tools/CsmipTool";
import SlopeStabilityTool from "./pages/tools/SlopeStabilityTool";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import AuthGuard from "./components/layout/AuthGuard";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Root: Landing if logged out, Redirect to Dashboard if logged in */}
      <Route path="/" element={
        <>
          <SignedOut><Landing /></SignedOut>
          <SignedIn><Navigate to="/dashboard" replace /></SignedIn>
        </>
      } />

      {/* Onboarding */}
      <Route
        path="/onboarding"
        element={
          <SignedIn>
            <Onboarding />
          </SignedIn>
        }
      />

      {/* Dashboard Page */}
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <AuthGuard>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </AuthGuard>
          </SignedIn>
        }
      />

      {/* Profile Page */}
      <Route
        path="/profile"
        element={
          <SignedIn>
            <AuthGuard>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </AuthGuard>
          </SignedIn>
        }
      />

      {/* CSMIP Tool (Main Area) */}
      <Route
        path="/tools/csmip"
        element={
          <SignedIn>
            <AuthGuard>
              <DashboardLayout>
                <CsmipTool />
              </DashboardLayout>
            </AuthGuard>
          </SignedIn>
        }
      />

      {/* Slope Stability Tool */}
      <Route
        path="/tools/slope-stability"
        element={
          <SignedIn>
            <AuthGuard>
              <DashboardLayout>
                <SlopeStabilityTool />
              </DashboardLayout>
            </AuthGuard>
          </SignedIn>
        }
      />
    </Routes>
  );
}

export default App;