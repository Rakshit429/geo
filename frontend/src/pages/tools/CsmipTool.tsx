import React from "react";
import { useAuth } from "@clerk/clerk-react";
// @ts-ignore
import Application from "../../components/tools/csmip/0_Application";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import CSMIP_Illustration from "../../assets/CSMIP_Illustration.png";
import ToolLayout from "../../components/layout/ToolLayout";
import { BookOpen, FileText, Info } from "lucide-react";

const defaultTheme = createTheme();

const csmipSidebarItems = [
    {
        id: "docs",
        label: "Documentation",
        icon: <BookOpen className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">📖 CSMIP Tool</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    The CSMIP Site Response Analysis tool uses the <strong>pyStrata</strong> python package (Kottke, 2019) to conduct equivalent-linear and linear site response calculations.
                </p>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Overview</h4>
                    <img src={CSMIP_Illustration} alt="CSMIP Illustration" className="w-full rounded-lg border border-gray-200 shadow-sm" />
                    <p className="text-xs text-gray-400 mt-1 text-center">Double convolution methodology workflow</p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Workflow</h4>
                    <ol className="text-sm text-gray-600 space-y-1.5 list-decimal pl-4">
                        <li>Define the <strong>Reference Site Profile</strong> — soil layers and properties at the recording station.</li>
                        <li>Define the <strong>Target Site Profile</strong> — your project site's soil layering.</li>
                        <li>Select a <strong>Ground Motion</strong> record from the CSMIP database.</li>
                        <li>Configure <strong>Analysis Parameters</strong> — damping model, frequency range, etc.</li>
                        <li>Run analysis and view <strong>Results</strong> — transfer functions, response spectra, and time histories.</li>
                    </ol>
                </div>
            </div>
        ),
    },
    {
        id: "references",
        label: "References",
        icon: <FileText className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">📄 References</h3>
                <ul className="text-sm text-gray-600 space-y-3">
                    <li className="border-l-2 border-blue-300 pl-3">
                        Pretell R., Sinha S.K., Ziotopoulou K., and Watson-Lamprey J.A. (2021). <em>Broadening the utilization of CSMIP data: Double convolution methodology towards developing input motions for site response and nonlinear deformation analyses.</em> In Proceedings of SMIP 2021 Seminar, California Geological Survey.
                        <a target="_blank" href="https://www.conservation.ca.gov/cgs/Documents/Program-SMIP/Seminar/SMIP21-P1-Paper-by-Ziotopoulou-a11y.pdf" className="text-blue-600 hover:underline ml-1 text-xs">[pdf]</a>
                    </li>
                    <li className="border-l-2 border-blue-300 pl-3">
                        Pretell R., Ziotopoulou K., and Abrahamson N. (2019). <em>Methodology for the development of input motions for nonlinear deformation analyses.</em> In Proceedings of 7<sup>th</sup> ICEGE, Rome, Italy.
                        <a target="_blank" href="https://www.issmge.org/uploads/publications/59/104/ch507.pdf" className="text-blue-600 hover:underline ml-1 text-xs">[pdf]</a>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: "about",
        label: "About",
        icon: <Info className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">ℹ️ About</h3>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Acknowledgements</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This webtool uses the pyStrata python package (Kottke, 2019) to conduct site response calculations. We thank Dr. Albert R. Kottke for his support with pyStrata during the development of this project.
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2">
                        The development of this webtool was funded under agreement No. 1020-007 between UC Davis and the Department of Conservation for the California Strong Motion Instrumentation Program (CSMIP) Data Interpretation Project. Any opinions, findings, conclusions, or recommendations expressed herein are those of the authors and do not necessarily represent the views of this organization.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We appreciate hearing from users, please send us an email and let us know about your applications and experiences:
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• <span className="text-blue-600">skssinha</span> at ucdavis.edu</li>
                        <li>• <span className="text-blue-600">rpretell</span> at ucdavis.edu</li>
                        <li>• <span className="text-blue-600">kziotopoulou</span> at ucdavis.edu</li>
                    </ul>
                </div>
            </div>
        ),
    },
];

export default function CsmipTool() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <div>Unauthorized</div>;

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToolLayout sidebarItems={csmipSidebarItems}>
                <div>
                    <Application />
                </div>
            </ToolLayout>
        </ThemeProvider>
    );
}
