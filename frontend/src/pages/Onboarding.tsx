import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Onboarding() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        profession: "",
        organization: "", // This is "Company / College"
        country: "India", // Default
        address: ""
    });

    // Pre-fill data from Clerk
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                full_name: user.fullName || "",
                email: user.primaryEmailAddress?.emailAddress || "",
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send data to backend to create/update the user record in Postgres
            await updateProfile(formData);
            // Redirect to the tools area
            navigate("/tools/csmip"); 
        } catch (error) {
            console.error("Onboarding failed", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-primary">Complete Your Profile</CardTitle>
                    <CardDescription>
                        Welcome to Smart Geotechnics Lab. Please provide your details to access the tools.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Full Name (Read Only from Clerk usually, but editable here) */}
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input id="full_name" value={formData.full_name} onChange={handleChange} required />
                        </div>

                        {/* Profession */}
                        <div className="space-y-2">
                            <Label htmlFor="profession">Profession</Label>
                            <Input 
                                id="profession" 
                                placeholder="e.g. Geotechnical Engineer, Research Scholar" 
                                value={formData.profession} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* Company / College */}
                        <div className="space-y-2">
                            <Label htmlFor="organization">Company / College</Label>
                            <Input 
                                id="organization" 
                                placeholder="e.g. IIT Delhi, L&T Construction" 
                                value={formData.organization} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* Phone Number (Unverified) */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                id="phone" 
                                type="tel"
                                placeholder="+91 98765 43210" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* Country (Hidden or optional UI, defaults to India) */}
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" value={formData.country} onChange={handleChange} />
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={loading}>
                            {loading ? "Saving..." : "Complete Registration"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}