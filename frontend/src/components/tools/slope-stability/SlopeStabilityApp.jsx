import React, { Component } from 'react';
import Tab_Geometry from "./Tab_Geometry";
import Tab_SoilLayers from "./Tab_SoilLayers";
import Tab_SoilProperties from "./Tab_SoilProperties";
import Tab_Analysis from "./Tab_Analysis";
import Tab_Results from "./Tab_Results";

class SlopeStabilityApp extends Component {

    constructor(props) {
        super(props);

        // Default soil layer template
        const defaultLayer = {
            thickness: 2,
            c_type: 'constant',      // 'constant' | 'normal' | 'exponential'
            c_value: 10,             // used when c_type === 'constant'
            c_mean: 10,             // used for distributions
            c_cov: 0.3,            // coefficient of variation
            phi_type: 'constant',   // 'constant' | 'normal' | 'exponential'
            phi_value: 30,          // used when phi_type === 'constant'
            phi_mean: 30,           // used for distributions
            phi_cov: 0.2            // coefficient of variation
        };

        this.state = {
            step: 1,

            // Slope Geometry
            D: 2,          // depth below step (m)
            H: 5,          // height of step (m)
            beta: 60,      // slope angle (degrees)
            P: 10,         // surcharge pressure (kPa)
            Ht: 0,         // height of tension crack (m)
            Hw: 1,         // water level, right side (m)
            HwPrime: 3,    // water level, left side (m)

            // Soil Layers
            numLayers: 2,
            soilLayers: [
                { ...defaultLayer, thickness: 3, c_value: 15, phi_value: 25 },
                { ...defaultLayer, thickness: 4, c_value: 8, phi_value: 35 }
            ],

            // Analysis
            numRealizations: 1000,
            targetFoS: 1.0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // Navigate steps
    nextStep = () => {
        this.setState(prev => ({ step: prev.step + 1 }));
    }

    prevStep = () => {
        this.setState(prev => ({ step: prev.step - 1 }));
    }

    goToStep = (stepNum) => {
        this.setState({ step: stepNum });
    }

    // Map a tab key to its step number
    tabKeyToStep = (key) => {
        if (key === 'Geometry') return 1;
        if (key === 'SoilLayers') return 2;
        if (key === 'Analysis') return this.state.soilLayers.length + 3;
        if (key === 'Results') return this.state.soilLayers.length + 4;
        // Layer_N
        const match = key.match(/^Layer_(\d+)$/);
        if (match) return 2 + parseInt(match[1]);
        return 1;
    }

    // Handle geometry input changes
    handleChange = (event) => {
        const { name, value } = event.target;
        const numericFields = ['D', 'H', 'beta', 'P', 'Ht', 'Hw', 'HwPrime', 'numRealizations', 'targetFoS'];

        if (numericFields.includes(name)) {
            const numValue = parseFloat(value) || 0;
            const updates = { [name]: numValue };

            // When H decreases below current water levels, cap the water levels to new H
            if (name === 'H') {
                if (this.state.Hw > numValue) updates.Hw = numValue;
                if (this.state.HwPrime > numValue) updates.HwPrime = numValue;
            }

            this.setState(updates);
        } else {
            this.setState({ [name]: value });
        }
    }

    // Handle soil layer count change
    handleLayerCountChange = (count) => {
        const { H, D } = this.state;
        const totalDepth = (parseFloat(H) || 5) + (parseFloat(D) || 2);
        const autoThickness = Math.round((totalDepth / count) * 10) / 10; // (H+D)/n, rounded to 1 decimal

        const defaultLayer = {
            thickness: autoThickness,
            c_type: 'constant',
            c_value: 10,
            c_mean: 10,
            c_cov: 0.3,
            phi_type: 'constant',
            phi_value: 30,
            phi_mean: 30,
            phi_cov: 0.2
        };

        // Rebuild all layers with auto-calculated thickness
        const newLayers = [];
        for (let i = 0; i < count; i++) {
            if (i < this.state.soilLayers.length) {
                // Keep existing layer's properties but update thickness
                newLayers.push({ ...this.state.soilLayers[i], thickness: autoThickness });
            } else {
                newLayers.push({ ...defaultLayer });
            }
        }

        this.setState({
            numLayers: count,
            soilLayers: newLayers
        });
    }

    // Handle individual layer property change
    handleLayerPropertyChange = (layerIndex, propertyName, value) => {
        const newLayers = [...this.state.soilLayers];
        const layer = { ...newLayers[layerIndex] };

        // Parse numeric values
        const numericProps = ['thickness', 'c_value', 'c_mean', 'c_cov', 'phi_value', 'phi_mean', 'phi_cov'];
        if (numericProps.includes(propertyName)) {
            layer[propertyName] = parseFloat(value) || 0;
        } else {
            layer[propertyName] = value;
        }

        newLayers[layerIndex] = layer;
        this.setState({ soilLayers: newLayers });
    }

    render() {
        const { step, D, H, beta, P, Ht, Hw, HwPrime, numLayers, soilLayers, numRealizations, targetFoS } = this.state;
        const inputValues = { D, H, beta, P, Ht, Hw, HwPrime, numLayers, soilLayers, numRealizations, targetFoS };

        // Step 1: Geometry
        if (step === 1) {
            return (
                <Tab_Geometry
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    inputValues={inputValues}
                    goToStep={this.goToStep}
                    tabKeyToStep={this.tabKeyToStep}
                    currentStep={step}
                />
            );
        }

        // Step 2: Soil Layer count
        if (step === 2) {
            return (
                <Tab_SoilLayers
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    onLayerCountChange={this.handleLayerCountChange}
                    inputValues={inputValues}
                    goToStep={this.goToStep}
                    tabKeyToStep={this.tabKeyToStep}
                    currentStep={step}
                />
            );
        }

        // Steps 3..N+2: Individual soil layer properties
        const layerIndex = step - 3;
        if (layerIndex >= 0 && layerIndex < soilLayers.length) {
            return (
                <Tab_SoilProperties
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    layerIndex={layerIndex}
                    onLayerPropertyChange={this.handleLayerPropertyChange}
                    inputValues={inputValues}
                    goToStep={this.goToStep}
                    tabKeyToStep={this.tabKeyToStep}
                    currentStep={step}
                />
            );
        }

        // Step N+3: Analysis input
        if (step === soilLayers.length + 3) {
            return (
                <Tab_Analysis
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    inputValues={inputValues}
                    goToStep={this.goToStep}
                    tabKeyToStep={this.tabKeyToStep}
                    currentStep={step}
                />
            );
        }

        // Step N+4: Results Phase
        if (step === soilLayers.length + 4) {
            return (
                <Tab_Results
                    prevStep={this.prevStep}
                    inputValues={inputValues}
                    goToStep={this.goToStep}
                    tabKeyToStep={this.tabKeyToStep}
                    currentStep={step}
                />
            );
        }

        // Fallback — shouldn't reach here in input-only phase
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#64748b'
            }}>
                <h5>Process Completed.</h5>
                <button
                    onClick={() => this.setState({ step: 1 })}
                    style={{
                        background: '#1B4F8A',
                        color: 'white',
                        border: 'none',
                        padding: '10px 28px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '12px'
                    }}
                >
                    ← Back to Start
                </button>
            </div>
        );
    }
}

export default SlopeStabilityApp;
