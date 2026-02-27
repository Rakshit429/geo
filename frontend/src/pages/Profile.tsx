import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@clerk/clerk-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getProfile, updateProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, ShieldAlert } from "lucide-react";

// Helper for the Clerk Modal
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Ensure you have dialog component or use standard HTML if not

export default function Profile() {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        profession: "",
        organization: "",
        country: "",
        address: ""
    });

    // 1. Fetch Profile Data from Python Backend on Mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getProfile();
                setFormData({
                    full_name: data.full_name || user?.fullName || "",
                    email: data.email || user?.primaryEmailAddress?.emailAddress || "",
                    phone: data.phone || "",
                    profession: data.profession || "",
                    organization: data.organization || "",
                    country: data.country || "",
                    address: data.address || ""
                });
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await updateProfile(formData);
            setMessage({ type: 'success', text: "Profile updated successfully!" });
            
            // Optional: Sync name back to Clerk if needed, but usually local DB is enough for the app
            if (user && formData.full_name !== user.fullName) {
                await user.update({
                    firstName: formData.full_name.split(" ")[0],
                    lastName: formData.full_name.split(" ").slice(1).join(" ")
                });
            }

        } catch (error) {
            setMessage({ type: 'error', text: "Failed to update profile. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-8 pb-10">
                
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-dark">My Profile</h1>
                        <p className="text-muted-foreground mt-1 text-lg">Manage your personal and professional details.</p>
                    </div>
                </div>

                {/* MAIN EDIT FORM */}
                <Card className="shadow-md">
                    <CardHeader className="border-b bg-gray-50/50 pb-4">
                        <CardTitle className="text-xl">Professional Information</CardTitle>
                        <CardDescription>This information is used for your analysis reports.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Success/Error Message */}
                            {message && (
                                <div className={`p-4 rounded-md flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name" className="text-base">Full Name</Label>
                                    <Input id="full_name" value={formData.full_name} onChange={handleChange} className="h-11 text-base" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base">Email Address</Label>
                                    <Input id="email" value={formData.email} disabled className="h-11 text-base bg-gray-100 cursor-not-allowed" />
                                    <p className="text-xs text-muted-foreground">Managed via Login Provider</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-base">Phone Number</Label>
                                    <Input id="phone" value={formData.phone} onChange={handleChange} className="h-11 text-base" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-base">Country</Label>
                                    <Input id="country" value={formData.country} onChange={handleChange} className="h-11 text-base" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="profession" className="text-base">Profession / Job Title</Label>
                                <Input id="profession" value={formData.profession} onChange={handleChange} className="h-11 text-base" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organization" className="text-base">Company / University Name</Label>
                                <Input id="organization" value={formData.organization} onChange={handleChange} className="h-11 text-base" />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={saving} size="lg" className="text-base px-8">
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* ACCOUNT SECURITY SECTION */}
                <Card className="border-red-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-700">Account Security</CardTitle>
                        <CardDescription>Manage your password and sign-in methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Password updates and email verification are handled securely by our authentication partner.
                        </div>
                        
                        {/* 
                           We use a Dialog here to show Clerk's UserProfile 
                           so it doesn't clutter the main page 
                        */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-gray-300">
                                    Manage Login Details
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[80vh] overflow-hidden p-0">
                                <UserProfile 
                                    appearance={{
                                        elements: {
                                            rootBox: "w-full h-full",
                                            card: "w-full h-full shadow-none rounded-none border-0",
                                            navbar: "hidden", // Hide sidebar to focus on security
                                            headerTitle: "hidden",
                                            headerSubtitle: "hidden",
                                        }
                                    }} 
                                />
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>

            </div>
        </DashboardLayout>
    );
}