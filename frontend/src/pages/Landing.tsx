import Header from "../components/layout/Header";

export default function Landing() {
    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans">
            <Header />

            <main>
                {/* HERO SECTION */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white py-24 sm:py-32 flex justify-center">
                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.03]"></div>

                    <div className="container relative z-10 max-w-7xl px-6 lg:px-8 text-center sm:text-left mx-auto">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <p className="text-sm font-semibold uppercase tracking-widest text-accent-light mb-4">
                                IITD Geomechanics Lab
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-primary-dark mb-6 leading-tight">
                                Professional Tools for Site Response & Ground Motion Analysis
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                                Trusted computational tools for researchers, engineers, and geotechnical professionals. Built at IIT Delhi for the global engineering community.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                                <button className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200">
                                    Request Access &rarr;
                                </button>
                                <a href="#tools" className="text-base font-semibold leading-6 text-primary hover:text-primary-dark px-4 py-3">
                                    View Tools &darr;
                                </a>
                            </div>

                            <div className="mt-10 flex items-center justify-center sm:justify-start gap-4 text-sm text-text-muted">
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-success"></div> 1,000+ researchers</span>
                                <span>&middot;</span>
                                <span>Free access</span>
                                <span>&middot;</span>
                                <span>Verified accuracy</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TOOLS SECTION */}
                <section id="tools" className="py-20 sm:py-24 bg-white flex justify-center">
                    <div className="container max-w-7xl px-6 lg:px-8 mx-auto">
                        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-primary-dark">Available Computation Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            <div className="group rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="h-12 w-12 rounded-lg bg-primary-100 text-primary flex items-center justify-center text-2xl mb-6">
                                    🔬
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-primary-dark">CSMIP</h3>
                                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                    Advanced Site Response Analysis using authentic ground motion records perfectly calibrated for precision.
                                </p>
                                <a href="#" className="font-medium text-primary inline-flex items-center gap-1 group-hover:text-accent transition-colors">
                                    Learn More <span>&rarr;</span>
                                </a>
                            </div>

                            <div className="rounded-xl border border-border bg-gray-50/50 p-6 sm:p-8 opacity-75">
                                <div className="h-12 w-12 rounded-lg border-2 border-dashed border-border text-text-muted flex items-center justify-center text-2xl mb-6">
                                    🔧
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-text-muted">Ground Motion Tool</h3>
                                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                                    Generate structural response spectrums and acceleration charts.
                                </p>
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                                    Coming Soon
                                </span>
                            </div>

                            <div className="rounded-xl border border-border bg-gray-50/50 p-6 sm:p-8 opacity-75">
                                <div className="h-12 w-12 rounded-lg border-2 border-dashed border-border text-text-muted flex items-center justify-center text-2xl mb-6">
                                    ⚡
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-text-muted">Seismic Hazard</h3>
                                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                                    Automated PSHA calculation models tailored for regional mappings.
                                </p>
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                                    Coming Soon
                                </span>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border bg-white py-10 mt-auto flex justify-center">
                <div className="container max-w-7xl px-6 lg:px-8 text-center text-sm text-text-muted mx-auto">
                    &copy; {new Date().getFullYear()} Prof. Sumeet Kumar Sinha &middot; IIT Delhi &middot; Geomechanics Project
                </div>
            </footer>
        </div>
    );
}
