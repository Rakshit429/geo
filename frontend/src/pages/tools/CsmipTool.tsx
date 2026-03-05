import React from "react";
import { useAuth } from "@clerk/clerk-react";
// @ts-ignore
import Application from "../../components/tools/csmip/0_Application";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import CSMIP_Illustration from "../../assets/CSMIP_Illustration.png";

const defaultTheme = createTheme();

export default function CsmipTool() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <div>Unauthorized</div>;

    // Notice we wrap the whole thing in a container layout to mimic original CSMIP App.js
    // but use a flex layout to put the image on the side as requested.
    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="mb-4">
                <h2 className="text-xl font-bold uppercase mb-2">GENERATE INPUT GROUND MOTIONS FOR NUMERICAL ANALYSES</h2>
                <div className="text-sm text-gray-700 mb-4">A web application for the development of input ground motions for the numerical evaluation of structures in engineering practice</div>
                <hr className="mb-6" />
            </div>

            <div>
                <Application />
            </div>

            <br />
            <br />

            <div className="w-full">
                <img src={CSMIP_Illustration} alt="CSMIP Illustration" className="w-[80%] max-w-4xl mx-auto h-auto mb-8 border border-gray-100 rounded" />
            </div>

            <br />
            <br />
            <hr className="mb-6" />

            <div className="text-sm text-gray-800">
                <h5 className="font-bold text-lg mb-2">Acknowledgements</h5>
                <p className="mb-4">
                    This webtool uses the pyStrata python package (Kottke, 2019) to conduct site response calculations. We thank Dr. Albert R. Kottke for his support with pyStrata during the development of this project.
                </p>
                <p className="mb-6">
                    The development of this webtool was funded under agreement No. 1020-007 between UC Davis and the Department of Conservation for the California Strong Motion Instrumentation Program (CSMIP) Data Interpretation Project “Broadening the Utilization of CSMIP Data: Double Convolution Methodology Towards Developing Input Motions for Site Response and Nonlinear Deformation Analyses.” Any opinions, findings, conclusions, or recommendations expressed herein are those of the authors and do not necessarily represent the views of this organization.
                </p>

                <h5 className="font-bold text-lg mb-2">Contact</h5>
                <p className="mb-6">
                    We appreciate hearing from users, so please do send us an email (skssinha at ucdavis.edu, rpretell at ucdavis.edu, or kziotopoulou at ucdavis.edu) and let us know about your applications and experiences. Interested readers are referred to the below publications for details about the background and applications.
                </p>

                <h5 className="font-bold text-lg mb-2">References</h5>
                <ul className="list-outside list-disc pl-6 space-y-2">
                    <li>Pretell R., Sinha S.K., Ziotopoulou K., and Watson-Lamprey J.A. (2021). <i>Broadening the utilization of CSMIP data: Double convolution methodology towards developing input motions for site response and nonlinear deformation analyses.</i> In Proceedings of SMIP 2021 Seminar on Utilization of Strong-Motion Data (SMIP21), California Geological Survey. (<a target="_blank" href="https://www.conservation.ca.gov/cgs/Documents/Program-SMIP/Seminar/SMIP21-P1-Paper-by-Ziotopoulou-a11y.pdf" className="text-blue-600 hover:underline">pdf</a>)</li>
                    <li>Pretell R., Ziotopoulou K., and Abrahamson N. (2019). <i>Methodology for the development of input motions for nonlinear deformation analyses</i>. In Proceedings of 7<sup>th</sup> International Conference on Earthquake Geotechnical Engineering (ICEGE), Rome, Italy. (<a target="_blank" href="https://www.issmge.org/uploads/publications/59/104/ch507.pdf" className="text-blue-600 hover:underline">pdf</a>)</li>
                </ul>
            </div>
        </ThemeProvider>
    );
}
