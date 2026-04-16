import React, { Component } from 'react';
import { Form, Button, Col, Row, Tabs, Tab } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import SlopeFigure from "./SlopeFigure";

class Tab_SoilProperties extends Component {

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    handlePropertyChange = (e) => {
        const { name, value } = e.target;
        this.props.onLayerPropertyChange(this.props.layerIndex, name, value);
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

        const { layerIndex, inputValues } = this.props;
        const { D, H, beta, P, Hw, HwPrime, soilLayers } = inputValues;
        const layer = soilLayers[layerIndex];
        const layerNum = layerIndex + 1;
        const activeKey = `Layer_${layerNum}`;

        const colors = ['#E2C792', '#D8BA84', '#CEAD76', '#C4A068', '#BA935A', '#B0864C', '#A6793E', '#9C6C30', '#925F22', '#885214'];
        const layerColor = colors[layerIndex % colors.length];

        const isLastLayer = layerIndex === soilLayers.length - 1;

        // Reusable distribution input block
        const DistributionInput = ({ paramName, paramLabel, unit, typeValue, constValue, meanValue, covValue }) => (
            <div style={{
                background: '#f8fafc',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #e2e8f0',
                marginBottom: '16px'
            }}>
                <Form.Group as={Row} controlId={`${paramName}_type`} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '12px' }}>
                    <Col sm={{ span: 4, offset: 0 }}>
                        <Form.Label style={{ fontWeight: 700, color: '#1e40af', fontSize: '14px' }}>
                            {paramLabel}
                        </Form.Label>
                    </Col>
                    <Col sm={{ span: 5, offset: 0 }}>
                        <Form.Control
                            as="select"
                            name={`${paramName}_type`}
                            value={typeValue}
                            onChange={this.handlePropertyChange}
                            style={{
                                borderRadius: '8px',
                                border: '1.5px solid #cbd5e1',
                                fontWeight: 500
                            }}
                        >
                            <option value="constant">Constant</option>
                            <option value="normal">Normal Distribution</option>
                            <option value="exponential">Exponential Distribution</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                {typeValue === 'constant' ? (
                    <Form.Group as={Row} controlId={`${paramName}_value`} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Col sm={{ span: 4, offset: 0 }}>
                            <CustomTooltip title={`Constant value of ${paramLabel}`} placement="right">
                                <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                    Value {unit && <span style={{ color: '#64748b', fontWeight: 400 }}>({unit})</span>}
                                </Form.Label>
                            </CustomTooltip>
                        </Col>
                        <Col sm={{ span: 4, offset: 0 }}>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name={`${paramName}_value`}
                                value={constValue}
                                required
                                onChange={this.handlePropertyChange}
                                style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                            />
                        </Col>
                    </Form.Group>
                ) : (
                    <>
                        <Form.Group as={Row} controlId={`${paramName}_mean`} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '10px' }}>
                            <Col sm={{ span: 4, offset: 0 }}>
                                <CustomTooltip title={`Mean value of ${paramLabel} distribution`} placement="right">
                                    <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                        Mean (μ) {unit && <span style={{ color: '#64748b', fontWeight: 400 }}>({unit})</span>}
                                    </Form.Label>
                                </CustomTooltip>
                            </Col>
                            <Col sm={{ span: 4, offset: 0 }}>
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    name={`${paramName}_mean`}
                                    value={meanValue}
                                    required
                                    onChange={this.handlePropertyChange}
                                    style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId={`${paramName}_cov`} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Col sm={{ span: 4, offset: 0 }}>
                                <CustomTooltip title={`Coefficient of variation = σ/μ`} placement="right">
                                    <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                        COV <span style={{ color: '#64748b', fontWeight: 400 }}>(σ/μ)</span>
                                    </Form.Label>
                                </CustomTooltip>
                            </Col>
                            <Col sm={{ span: 4, offset: 0 }}>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    name={`${paramName}_cov`}
                                    value={covValue}
                                    required
                                    onChange={this.handlePropertyChange}
                                    style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                />
                            </Col>
                        </Form.Group>
                    </>
                )}
            </div>
        );

        return (
            <Tabs id="SlopeStability_Tabs" activeKey={activeKey} transition={false}
                onSelect={(key) => { const s = this.props.tabKeyToStep(key); this.props.goToStep(s); }}>
                <Tab eventKey="Geometry" title="Slope Geometry" />
                <Tab eventKey="SoilLayers" title="Soil Layers" />
                {soilLayers.map((_, idx) => {
                    const key = `Layer_${idx + 1}`;
                    if (key === activeKey) {
                        return (
                            <Tab key={key} eventKey={key} title={`Layer ${idx + 1}`}>
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
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    marginBottom: '20px',
                                                    borderBottom: '2px solid #dbeafe',
                                                    paddingBottom: '10px'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '16px',
                                                        height: '16px',
                                                        borderRadius: '4px',
                                                        background: layerColor,
                                                        border: '1px solid rgba(0,0,0,0.15)'
                                                    }}></span>
                                                    <h6 style={{
                                                        color: '#1e40af',
                                                        fontWeight: 700,
                                                        fontSize: '14px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        margin: 0
                                                    }}>
                                                        Soil Layer {layerNum} Properties
                                                    </h6>
                                                </div>

                                                {/* Thickness */}
                                                <Form.Group as={Row} controlId="inputThickness" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '20px' }}>
                                                    <Col sm={{ span: 4, offset: 0 }}>
                                                        <CustomTooltip title="Thickness of this soil layer" placement="right">
                                                            <Form.Label style={{ fontWeight: 600, color: '#334155' }}>
                                                                Thickness (m)
                                                            </Form.Label>
                                                        </CustomTooltip>
                                                    </Col>
                                                    <Col sm={{ span: 4, offset: 0 }}>
                                                        <Form.Control
                                                            type="number"
                                                            step="0.1"
                                                            min="0.1"
                                                            name="thickness"
                                                            value={layer.thickness}
                                                            required
                                                            onChange={this.handlePropertyChange}
                                                            style={{ borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                {/* Cohesion c */}
                                                <DistributionInput
                                                    paramName="c"
                                                    paramLabel="Cohesion (c)"
                                                    unit="kPa"
                                                    typeValue={layer.c_type}
                                                    constValue={layer.c_value}
                                                    meanValue={layer.c_mean}
                                                    covValue={layer.c_cov}
                                                />

                                                {/* Friction angle Φ */}
                                                <DistributionInput
                                                    paramName="phi"
                                                    paramLabel="Friction Angle (Φ)"
                                                    unit="°"
                                                    typeValue={layer.phi_type}
                                                    constValue={layer.phi_value}
                                                    meanValue={layer.phi_mean}
                                                    covValue={layer.phi_cov}
                                                />
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
                                    <Button variant={isLastLayer ? "success" : "primary"} type="Submit" style={{
                                        borderRadius: '8px',
                                        padding: '8px 32px',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        ...(isLastLayer ? { background: '#059669', border: 'none', boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.4)' } : {})
                                    }}>
                                        {isLastLayer ? 'Proceed to Analysis →' : 'Next Layer →'}
                                    </Button>
                                </Form>
                            </Tab>
                        );
                    }
                    return <Tab key={key} eventKey={key} title={`Layer ${idx + 1}`} />;
                })}
                <Tab eventKey="Analysis" title="Analysis" />
                <Tab eventKey="Results" title="Results" />
            </Tabs>
        );
    }
}

export default Tab_SoilProperties;
