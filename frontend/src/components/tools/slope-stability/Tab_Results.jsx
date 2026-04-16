import React, { Component } from 'react';
import { Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell, ReferenceLine,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import SlopeFigure from "./SlopeFigure";

class Tab_Results extends Component {
    render() {
        const { inputValues } = this.props;

        // Dummy Data for Histogram (Probability Density of FoS)
        const fosHistData = [
            { bin: "0.65", count: 2 },
            { bin: "0.75", count: 10 },
            { bin: "0.85", count: 45 },
            { bin: "0.95", count: 150 }, // Failure threshold ~ 1.0
            { bin: "1.05", count: 280 },
            { bin: "1.15", count: 220 },
            { bin: "1.25", count: 160 },
            { bin: "1.35", count: 80 },
            { bin: "1.45", count: 35 },
            { bin: "1.55", count: 18 }
        ];

        // Dummy Data for CDF
        const cdfData = [
            { fos: 0.65, prob: 0 },
            { fos: 0.75, prob: 0.01 },
            { fos: 0.85, prob: 0.05 },
            { fos: 0.95, prob: 0.15 },
            { fos: 1.05, prob: 0.35 },
            { fos: 1.15, prob: 0.65 },
            { fos: 1.25, prob: 0.85 },
            { fos: 1.35, prob: 0.95 },
            { fos: 1.45, prob: 0.98 },
            { fos: 1.55, prob: 1.00 }
        ];

        // Dummy Data for Parameter Realizations (Layer 1 c)
        const layerHistData = [
            { bin: "8", count: 20 },
            { bin: "9", count: 120 },
            { bin: "10", count: 700 }, // Mean
            { bin: "11", count: 140 },
            { bin: "12", count: 20 }
        ];

        // Styling for summary cards
        const cardStyle = {
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            textAlign: 'center',
            padding: '16px 8px',
            background: 'white'
        };

        const valStyle = { fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' };
        const labelStyle = { fontSize: '13px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' };

        return (
            <Tabs id="SlopeStability_Tabs" activeKey="Results" transition={false}
                onSelect={(key) => { const s = this.props.tabKeyToStep(key); this.props.goToStep(s); }}>
                <Tab eventKey="Geometry" title="Slope Geometry" />
                <Tab eventKey="SoilLayers" title="Soil Layers" />
                {this.props.inputValues.soilLayers.map((_, idx) => (
                    <Tab key={`layer-tab-${idx}`} eventKey={`Layer_${idx + 1}`} title={`Layer ${idx + 1}`} />
                ))}
                <Tab eventKey="Analysis" title="Analysis" />
                <Tab eventKey="Results" title="Results">
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h4 style={{ color: '#0f172a', fontWeight: '700', margin: 0 }}>Probabilistic Analysis Results</h4>
                    <Button variant="outline-secondary" onClick={this.props.prevStep} style={{ borderRadius: '8px', fontWeight: '600' }}>
                        ← Back to Inputs
                    </Button>
                </div>

                {/* Summary Metrics Banner */}
                <Row className="mb-4">
                    <Col><Card style={cardStyle}><div style={valStyle}>1.12</div><div style={labelStyle}>Mean FoS</div></Card></Col>
                    <Col><Card style={cardStyle}><div style={{...valStyle, color: '#ef4444'}}>0.72</div><div style={labelStyle}>Min FoS</div></Card></Col>
                    <Col><Card style={cardStyle}><div style={{...valStyle, color: '#10b981'}}>{inputValues.targetFoS}</div><div style={labelStyle}>Target FoS</div></Card></Col>
                    <Col><Card style={cardStyle}><div style={valStyle}>20.7%</div><div style={labelStyle}>$P_f$ (@ FoS = 1)</div></Card></Col>
                    <Col><Card style={cardStyle}><div style={valStyle}>20.7%</div><div style={labelStyle}>$P_f$ (@ Target FoS)</div></Card></Col>
                </Row>

                <Row>
                    {/* Top Left: FoS Histogram */}
                    <Col xs={12} lg={6} className="mb-4">
                        <Card style={{ padding: '20px', borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <h6 style={{ color: '#334155', fontWeight: '600', marginBottom: '20px' }}>FoS Distribution (Histogram)</h6>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={fosHistData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barCategoryGap={1}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="bin" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                        <ReferenceLine x="1.05" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Failure < 1', fill: '#ef4444', fontSize: '12px' }} />
                                        <Bar dataKey="count">
                                            {
                                                fosHistData.map((entry, index) => {
                                                    const val = parseFloat(entry.bin);
                                                    return <Cell key={`cell-${index}`} fill={val <= 1.0 ? '#fca5a5' : '#3b82f6'} />;
                                                })
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </Col>

                    {/* Top Right: Slope with Slip Circles */}
                    <Col xs={12} lg={6} className="mb-4">
                        <Card style={{ padding: '20px', borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '100%' }}>
                            <h6 style={{ color: '#334155', fontWeight: '600', marginBottom: '20px' }}>Critical Slip Surfaces</h6>
                            <SlopeFigure
                                {...inputValues}
                                mode="results"
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    {/* Bottom Left: CDF line chart */}
                    <Col xs={12} lg={6} className="mb-4">
                        <Card style={{ padding: '20px', borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <h6 style={{ color: '#334155', fontWeight: '600', marginBottom: '20px' }}>Cumulative Probability of Failure (CDF)</h6>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={cdfData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="fos" tick={{ fontSize: 12, fill: '#64748b' }} />
                                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
                                        <RechartsTooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Probability"]} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                        <ReferenceLine x={1.0} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'FoS = 1', fill: '#ef4444', fontSize: '12px' }} />
                                        <Line type="monotone" dataKey="prob" stroke="#f59e0b" strokeWidth={3} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </Col>

                    {/* Bottom Right: Parameter Distributions */}
                    <Col xs={12} lg={6} className="mb-4">
                        <Card style={{ padding: '20px', borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <h6 style={{ color: '#334155', fontWeight: '600', marginBottom: '20px' }}>Realized Parameters: Layer 1 Cohesion (c)</h6>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={layerHistData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="bin" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
                </Tab>
            </Tabs>
        );
    }
}

export default Tab_Results;
