import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkProfile = async () => {
            if (!isLoaded) return;
            
            if (!user) {
                // Not logged in, Clerk handles this usually, but safe to have
                navigate("/"); 
                return;
            }

            try {
                // Check our Postgres DB
                const profile = await getProfile();
                
                // If profile exists but is missing critical fields (Profession/Org)
                if (!profile.profession || !profile.organization) {
                    navigate("/onboarding");
                }
                // If 404, api.ts usually throws error, caught below
            } catch (error: any) {
                // If 404 (User doesn't exist in our DB), send to Onboarding
                navigate("/onboarding");
            } finally {
                setIsChecking(false);
            }
        };

        checkProfile();
    }, [user, isLoaded, navigate]);

    if (!isLoaded || isChecking) {
        return <div className="flex h-screen items-center justify-center">Checking profile...</div>;
    }

    return <>{children}</>;
}