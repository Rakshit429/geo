import React, { Component } from 'react';
import { Form, Button, Col, Row, Tabs, Tab } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";

class Tab_Analysis extends Component {

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

        const { numRealizations, targetFoS } = this.props.inputValues;

        return (
            <Tabs id="SlopeStability_Tabs" activeKey="Analysis" transition={false}
                onSelect={(key) => { const s = this.props.tabKeyToStep(key); this.props.goToStep(s); }}>
                <Tab eventKey="Geometry" title="Slope Geometry" />
                <Tab eventKey="SoilLayers" title="Soil Layers" />
                {this.props.inputValues.soilLayers.map((_, idx) => (
                    <Tab key={`layer-tab-${idx}`} eventKey={`Layer_${idx + 1}`} title={`Layer ${idx + 1}`} />
                ))}
                
                <Tab eventKey="Analysis" title="Analysis">
                    <p></p>
                    <Form onSubmit={this.saveAndContinue} validated>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={6}>
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '10px',
                                    padding: '28px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}>
                                    <h5 style={{
                                        color: '#1e40af',
                                        fontWeight: 700,
                                        marginBottom: '6px',
                                        fontSize: '18px'
                                    }}>
                                        Analysis Configuration
                                    </h5>
                                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                                        Configure parameters for the Monte Carlo probabilistic simulation.
                                    </p>

                                    <Form.Group as={Row} controlId="numRealizations" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '20px' }}>
                                        <Col sm={7}>
                                            <CustomTooltip title="Number of iterations for the Monte Carlo analysis. Higher values yield more accurate probability distributions but take longer to compute." placement="top">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    Number of Realizations
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={5}>
                                            <Form.Control
                                                type="number"
                                                step="100"
                                                min="100"
                                                max="100000"
                                                name="numRealizations"
                                                value={numRealizations}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="targetFoS" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '24px' }}>
                                        <Col sm={7}>
                                            <CustomTooltip title="The required minimum Factor of Safety for the slope design." placement="top">
                                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                    Target Factor of Safety
                                                </Form.Label>
                                            </CustomTooltip>
                                        </Col>
                                        <Col sm={5}>
                                            <Form.Control
                                                type="number"
                                                step="0.05"
                                                min="0.1"
                                                name="targetFoS"
                                                value={targetFoS}
                                                required
                                                onChange={this.props.handleChange}
                                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                                        <Button variant="light" onClick={this.back} style={{
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            padding: '10px 24px',
                                            color: '#475569'
                                        }}>
                                            ← Back
                                        </Button>
                                        
                                        <Button variant="success" type="Submit" style={{
                                            borderRadius: '8px',
                                            padding: '10px 32px',
                                            fontWeight: 600,
                                            letterSpacing: '0.5px',
                                            background: '#059669',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.4)'
                                        }}>
                                            Run Analysis ▶
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Tab>
                <Tab eventKey="Results" title="Results" />
            </Tabs>
        );
    }
}

export default Tab_Analysis;
