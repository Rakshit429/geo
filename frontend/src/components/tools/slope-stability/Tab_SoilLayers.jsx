import React, { Component } from 'react';
import { Form, Button, Col, Row, Tabs, Tab } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import SlopeFigure from "./SlopeFigure";

class Tab_SoilLayers extends Component {

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    handleLayerCount = (e) => {
        const count = parseInt(e.target.value) || 0;
        const clampedCount = Math.max(1, Math.min(10, count));
        this.props.onLayerCountChange(clampedCount);
    };

    render() {

        const styles = {
            tooltip: {
                borderRadius: "18px",
                boxShadow: "0 20px 80px 0",
                backgroundColor: "green"
            }
        };

        const CustomTooltip = withStyles(styles)(Tooltip);

        const { D, H, beta, P, Hw, HwPrime, soilLayers, numLayers } = this.props.inputValues;

        return (
            <Tabs id="SlopeStability_Tabs" activeKey="SoilLayers" transition={false}
                onSelect={(key) => { const s = this.props.tabKeyToStep(key); this.props.goToStep(s); }}>
                <Tab eventKey="Geometry" title="Slope Geometry" />
                <Tab eventKey="SoilLayers" title="Soil Layers">
                    <p></p>
                    <Form onSubmit={this.saveAndContinue} validated>
                        <Row>
                            <Col xs={6}>
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '10px',
                                    padding: '24px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                                }}>
                                    <h6 style={{
                                        color: '#1e40af',
                                        fontWeight: 700,
                                        marginBottom: '20px',
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        borderBottom: '2px solid #dbeafe',
                                        paddingBottom: '8px'
                                    }}>
                                        Soil Layer Configuration
                                    </h6>

                                    <Form.Group as={Row} controlId="inputNumLayers" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '16px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Number of distinct soil layers to define (1–10)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155', fontSize: '15px' }}>
                                                    Number of Soil Layers
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 3, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                max="10"
                                                name="numLayers"
                                                value={numLayers}
                                                required
                                                onChange={this.handleLayerCount}
                                                style={{
                                                    borderRadius: '8px',
                                                    border: '1.5px solid #cbd5e1',
                                                    fontSize: '16px',
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    {/* Depth info banner */}
                                    {(() => {
                                        const totalAvailable = (parseFloat(H) || 0) + (parseFloat(D) || 0);
                                        const totalThickness = soilLayers.reduce((sum, l) => sum + (parseFloat(l.thickness) || 0), 0);
                                        const isMatch = Math.abs(totalThickness - totalAvailable) < 0.05;
                                        return (
                                            <div style={{
                                                background: isMatch ? '#f0fdf4' : '#fef2f2',
                                                border: `1px solid ${isMatch ? '#bbf7d0' : '#fecaca'}`,
                                                borderRadius: '8px',
                                                padding: '10px 14px',
                                                marginBottom: '16px',
                                                fontSize: '13px',
                                                color: isMatch ? '#166534' : '#991b1b',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <span><strong>Available depth (H + D):</strong> {totalAvailable.toFixed(1)}m</span>
                                                <span><strong>Total layers:</strong> {totalThickness.toFixed(1)}m</span>
                                                {!isMatch && <span style={{ fontWeight: 700 }}>⚠ Mismatch</span>}
                                                {isMatch && <span style={{ fontWeight: 700 }}>✓ Match</span>}
                                            </div>
                                        );
                                    })()}

                                    {/* Layer preview table */}
                                    {soilLayers.length > 0 && (
                                        <div style={{ marginTop: '20px' }}>
                                            <h6 style={{
                                                color: '#475569',
                                                fontWeight: 600,
                                                marginBottom: '12px',
                                                fontSize: '13px'
                                            }}>
                                                Layer Summary
                                            </h6>
                                            <div style={{
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                overflow: 'hidden'
                                            }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                                    <thead>
                                                        <tr style={{ background: '#f8fafc' }}>
                                                            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>Layer</th>
                                                            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>Thickness (m)</th>
                                                            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>c (kPa)</th>
                                                            <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>Φ (°)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {soilLayers.map((layer, idx) => {
                                                            const colors = ['#E2C792', '#D8BA84', '#CEAD76', '#C4A068', '#BA935A', '#B0864C', '#A6793E', '#9C6C30', '#925F22', '#885214'];
                                                            return (
                                                                <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                                                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                                                                        <span style={{
                                                                            display: 'inline-block',
                                                                            width: '12px',
                                                                            height: '12px',
                                                                            borderRadius: '3px',
                                                                            background: colors[idx % colors.length],
                                                                            marginRight: '8px',
                                                                            verticalAlign: 'middle'
                                                                        }}></span>
                                                                        Layer {idx + 1}
                                                                    </td>
                                                                    <td style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>{layer.thickness}m</td>
                                                                    <td style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>
                                                                        {layer.c_type === 'constant' ? `${layer.c_value}` : `${layer.c_type} (μ=${layer.c_mean})`}
                                                                    </td>
                                                                    <td style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>
                                                                        {layer.phi_type === 'constant' ? `${layer.phi_value}°` : `${layer.phi_type} (μ=${layer.phi_mean}°)`}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Col>

                            <Col xs={6}>
                                <SlopeFigure
                                    D={D}
                                    H={H}
                                    beta={beta}
                                    P={P}
                                    Hw={Hw}
                                    HwPrime={HwPrime}
                                    soilLayers={soilLayers}
                                />
                            </Col>
                        </Row>

                        <p></p>
                        <Button variant="secondary" onClick={this.back} style={{
                            borderRadius: '8px',
                            padding: '8px 24px',
                            fontWeight: 600,
                            marginRight: '8px'
                        }}>
                            ← Back
                        </Button>{' '}
                        <Button variant="primary" type="Submit" style={{
                            borderRadius: '8px',
                            padding: '8px 32px',
                            fontWeight: 600,
                            letterSpacing: '0.5px'
                        }}>
                            Next →
                        </Button>
                    </Form>
                </Tab>

                {soilLayers.map((_, idx) => (
                    <Tab key={`layer-tab-${idx}`} eventKey={`Layer_${idx + 1}`} title={`Layer ${idx + 1}`} />
                ))}
                <Tab eventKey="Analysis" title="Analysis" />
                <Tab eventKey="Results" title="Results" />
            </Tabs>
        );
    }
}

export default Tab_SoilLayers;
