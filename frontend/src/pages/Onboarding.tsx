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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send data to backend to create/update the user record in Postgres
            await updateProfile(formData);
            // Redirect to the dashboard
            navigate("/dashboard");
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

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setFormData({ ...formData, phone: val });
                                }}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                title="Please enter exactly 10 digits"
                                required
                            />
                            {formData.phone.length > 0 && formData.phone.length < 10 && (
                                <p className="text-xs text-red-500">{10 - formData.phone.length} more digit{10 - formData.phone.length !== 1 ? 's' : ''} needed</p>
                            )}
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="">Select a country</option>
                                <option value="India">India</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="South Korea">South Korea</option>
                                <option value="Singapore">Singapore</option>
                                <option value="UAE">UAE</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Norway">Norway</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Russia">Russia</option>
                                <option value="Israel">Israel</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Peru">Peru</option>
                                <option value="Other">Other</option>
                            </select>
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