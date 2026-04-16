import React, { Component } from 'react';
import { Form, Button, Col, Row, Tabs, Tab } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import SlopeFigure from "./SlopeFigure";

class Tab_Geometry extends Component {

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
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

        const { D, H, beta, P, Ht, Hw, HwPrime, soilLayers } = this.props.inputValues;

        return (
            <Tabs id="SlopeStability_Tabs" activeKey="Geometry" transition={false}
                onSelect={(key) => { const s = this.props.tabKeyToStep(key); this.props.goToStep(s); }}>
                <Tab eventKey="Geometry" title="Slope Geometry">
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
                                        Slope Geometry Parameters
                                    </h6>

                                    <Form.Group as={Row} controlId="inputD" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Depth below the step function (from lower platform to base)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    D — Depth (m)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                name="D"
                                                value={D}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="inputH" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Height of the step (vertical rise from lower to upper platform)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    H — Height (m)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                name="H"
                                                value={H}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="inputBeta" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Angle of the slope face (90° = vertical step, smaller = inclined)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    β — Slope Angle (°)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="1"
                                                min="10"
                                                max="90"
                                                name="beta"
                                                value={beta}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="inputP" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Surcharge pressure applied on top of the upper platform" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    q — Surcharge (kPa)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                name="P"
                                                value={P}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="inputHt" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Height/Depth of the tension crack at the crest" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    H<sub>t</sub> — Tension Crack (m)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max={H}
                                                name="Ht"
                                                value={Ht}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <hr style={{ margin: '16px 0', borderColor: '#e2e8f0' }} />

                                    <h6 style={{
                                        color: '#2563eb',
                                        fontWeight: 700,
                                        marginBottom: '16px',
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Water Table
                                    </h6>

                                    <Form.Group as={Row} controlId="inputHw" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Height of water level from the lower platform (toe)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    H<sub>w</sub> — Water Level Right (m)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max={H}
                                                name="Hw"
                                                value={Hw}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="inputHwPrime" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                                        <Col sm={{ span: 6, offset: 0 }}>
                                            <CustomTooltip title="Height of water level from the lower platform (toe)" placement="right">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    H<sub>w</sub>' — Water Level Left (m)
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={{ span: 4, offset: 0 }}>
                                            <Form.Control
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max={H}
                                                name="HwPrime"
                                                value={HwPrime}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                            </Col>

                            <Col xs={6}>
                                <SlopeFigure
                                    D={D}
                                    H={H}
                                    beta={beta}
                                    P={P}
                                    Ht={Ht}
                                    Hw={Hw}
                                    HwPrime={HwPrime}
                                    soilLayers={soilLayers}
                                />
                            </Col>
                        </Row>

                        <p></p>
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

                <Tab eventKey="SoilLayers" title="Soil Layers" />
                {this.props.inputValues.soilLayers.map((_, idx) => (
                    <Tab key={`layer-tab-${idx}`} eventKey={`Layer_${idx + 1}`} title={`Layer ${idx + 1}`} />
                ))}
                <Tab eventKey="Analysis" title="Analysis" />
                <Tab eventKey="Results" title="Results" />
            </Tabs>
        );
    }
}

export default Tab_Geometry;
