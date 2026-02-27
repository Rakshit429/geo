import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import CsmipTool from "./pages/tools/CsmipTool";
import Onboarding from "./pages/Onboarding"; 
import AuthGuard from "./components/layout/AuthGuard";

function App() {
  return (
    <Routes>
      {/* Root: Landing if logged out, Redirect to Tool if logged in */}
      <Route path="/" element={
        <>
            <SignedOut><Landing /></SignedOut>
            <SignedIn><Navigate to="/tools/csmip" replace /></SignedIn>
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

      {/* Redirect old dashboard link to tool */}
      <Route path="/dashboard" element={<Navigate to="/tools/csmip" replace />} />

      {/* Profile Page */}
      <Route
        path="/profile"
        element={
          <SignedIn>
            <AuthGuard>
              <Profile />
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
              <CsmipTool />
            </AuthGuard>
          </SignedIn>
        }
      />
    </Routes>
  );
}

export default App;