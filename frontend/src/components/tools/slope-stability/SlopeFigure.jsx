import React, { Component } from 'react';

class SlopeFigure extends Component {
    render() {
        const { D, H, beta, P, Ht, Hw, HwPrime, soilLayers, mode } = this.props;

        // SVG dimensions
        const svgW = 520;
        const svgH = 350;
        const pad = 20;

        // Geometry calculation
        const totalH = parseFloat(H) || 5;
        const depth = parseFloat(D) || 2;
        const angle = parseFloat(beta) || 90;
        const pressure = parseFloat(P) || 10;
        const waterRight = parseFloat(Hw) || 0;
        const waterLeft = parseFloat(HwPrime) || 0;
        const tensionCrack = parseFloat(Ht) || 0;

        // Scale everything to fit nicely
        // Use exact total height to fix the visual top and bottom
        // This makes the figure larger and only varies the right-side platform based on D
        const maxDim = totalH + depth > 0 ? totalH + depth : 1;
        const scale = (svgH - 2 * pad - 60) / maxDim;

        // Key Y positions (SVG y-axis is inverted)
        const baseY = svgH - pad - 20;                  // bottom of everything
        const lowerPlatformY = baseY - depth * scale;    // top of lower platform (= base of step)
        const upperPlatformY = lowerPlatformY - totalH * scale; // top of upper platform

        // X positions
        const leftEdge = pad + 30;
        const rightEdge = svgW - pad - 30;
        const midW = (svgW) / 2;

        // Slope offset based on angle
        const slopeRun = angle >= 90 ? 0 : (totalH * scale) / Math.tan((angle * Math.PI) / 180);
        const slopeTopX = midW - slopeRun;

        // Color palette for soil layers
        const layerColors = [
            '#E2C792', '#D8BA84', '#CEAD76', '#C4A068', '#BA935A',
            '#B0864C', '#A6793E', '#9C6C30', '#925F22', '#885214'
        ];

        const layerPatterns = [
            'Sand', 'Clay', 'Silt', 'Gravel', 'Rock',
            'Layer 6', 'Layer 7', 'Layer 8', 'Layer 9', 'Layer 10'
        ];

        // Compute total soil thickness for scaling layers
        const numLayers = soilLayers ? soilLayers.length : 0;
        let totalSoilThickness = 0;
        if (numLayers > 0) {
            soilLayers.forEach(l => { totalSoilThickness += parseFloat(l.thickness) || 2; });
        }

        // Build soil layer rects inside the slope body
        const renderSoilLayers = () => {
            if (numLayers === 0) return null;
            const layers = [];
            let cumY = upperPlatformY;
            const availableH = (baseY - upperPlatformY);

            for (let i = 0; i < numLayers; i++) {
                const t = parseFloat(soilLayers[i].thickness) || 2;
                const layerH = (t / totalSoilThickness) * availableH;
                const color = layerColors[i % layerColors.length];

                layers.push(
                    <g key={`layer-${i}`}>
                        <rect
                            x={leftEdge}
                            y={cumY}
                            width={rightEdge - leftEdge}
                            height={layerH}
                            fill={color}
                            fillOpacity={0.4}
                            stroke={color}
                            strokeWidth={1}
                            strokeDasharray="4,2"
                            clipPath="url(#slopeClip)"
                        />
                        <text
                            x={leftEdge + 10}
                            y={cumY + layerH / 2 + 4}
                            textAnchor="start"
                            fontSize="10"
                            fill="#555"
                            fontWeight="500"
                        >
                            Layer {i + 1}
                        </text>
                    </g>
                );
                cumY += layerH;
            }
            return layers;
        };

        // Arrow head marker definition
        const arrowId = 'arrowHead';
        const arrowIdBlue = 'arrowHeadBlue';
        const arrowIdRed = 'arrowHeadRed';

        return (
            <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#475569',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                    }}>
                        Slope Cross-Section
                    </span>
                </div>
                <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    width="100%"
                    height="100%"
                    style={{ maxHeight: '800px' }}
                >
                    <defs>
                        {/* Arrow markers */}
                        <marker id={arrowId} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#334155" />
                        </marker>
                        <marker id="arrowHeadReverse" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                            <polygon points="8 0, 0 3, 8 6" fill="#334155" />
                        </marker>
                        <marker id={arrowIdBlue} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
                        </marker>
                        <marker id="arrowHeadBlueReverse" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                            <polygon points="8 0, 0 3, 8 6" fill="#2563eb" />
                        </marker>
                        <marker id={arrowIdRed} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
                        </marker>
                        <marker id="arrowHeadRedReverse" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                            <polygon points="8 0, 0 3, 8 6" fill="#dc2626" />
                        </marker>

                        {/* Hatch pattern for soil */}
                        <pattern id="soilHatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                            <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" strokeWidth="0.5" />
                        </pattern>

                        {/* Water pattern */}
                        <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="20" height="6">
                            <path d="M0 3 Q5 0 10 3 Q15 6 20 3" fill="none" stroke="#93c5fd" strokeWidth="0.8" />
                        </pattern>

                        <clipPath id="slopeClip">
                            <polygon
                                points={`
                                    ${leftEdge},${upperPlatformY}
                                    ${slopeTopX},${upperPlatformY}
                                    ${midW},${lowerPlatformY}
                                    ${rightEdge},${lowerPlatformY}
                                    ${rightEdge},${baseY}
                                    ${leftEdge},${baseY}
                                `}
                            />
                        </clipPath>
                    </defs>

                    {/* ===== SOIL BODY ===== */}
                    {/* Main slope polygon */}
                    <polygon
                        points={`
                            ${leftEdge},${upperPlatformY}
                            ${slopeTopX},${upperPlatformY}
                            ${midW},${lowerPlatformY}
                            ${rightEdge},${lowerPlatformY}
                            ${rightEdge},${baseY}
                            ${leftEdge},${baseY}
                        `}
                        fill="#e8dcc8"
                        stroke="#8b7355"
                        strokeWidth="2"
                    />

                    {/* Hatch overlay */}
                    <polygon
                        points={`
                            ${leftEdge},${upperPlatformY}
                            ${slopeTopX},${upperPlatformY}
                            ${midW},${lowerPlatformY}
                            ${rightEdge},${lowerPlatformY}
                            ${rightEdge},${baseY}
                            ${leftEdge},${baseY}
                        `}
                        fill="url(#soilHatch)"
                        stroke="none"
                        opacity="0.3"
                    />

                    {/* Soil layers */}
                    {renderSoilLayers()}

                    {/* Upper platform surface highlight */}
                    <line
                        x1={leftEdge} y1={upperPlatformY}
                        x2={slopeTopX} y2={upperPlatformY}
                        stroke="#6b5b45"
                        strokeWidth="2.5"
                    />

                    {/* Slope face */}
                    <line
                        x1={slopeTopX} y1={upperPlatformY}
                        x2={midW} y2={lowerPlatformY}
                        stroke="#6b5b45"
                        strokeWidth="2.5"
                    />

                    {/* Lower platform surface */}
                    <line
                        x1={midW} y1={lowerPlatformY}
                        x2={rightEdge} y2={lowerPlatformY}
                        stroke="#6b5b45"
                        strokeWidth="2.5"
                    />

                    {/* ===== TENSION CRACK ===== */}
                    {tensionCrack > 0 && (() => {
                        const crackDepth = tensionCrack * scale;
                        const crackX = slopeTopX - 30; // some distance from crest
                        return (
                            <g>
                                <line 
                                    x1={crackX} y1={upperPlatformY} 
                                    x2={crackX} y2={upperPlatformY + crackDepth}
                                    stroke="#475569" strokeWidth="2.5"
                                />
                                <text x={crackX} y={upperPlatformY - 5} fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
                                    Ht={tensionCrack}m
                                </text>
                            </g>
                        );
                    })()}

                    {/* ===== SLIP CIRCLES (RESULTS MODE) ===== */}
                    {mode === 'results' && (() => {
                        // Coordinates for slip arcs
                        const startX1 = slopeTopX - 80;
                        const endX1 = midW + 50;
                        const startX2 = slopeTopX - 50;
                        const endX2 = midW + 30;
                        const startX3 = slopeTopX - 20;
                        const endX3 = midW + 10;
                        
                        return (
                            <g>
                                {/* Target FoS Curve (Green) */}
                                <path 
                                    d={`M ${startX1} ${upperPlatformY} Q ${startX1 + 40} ${lowerPlatformY + 70} ${endX1} ${lowerPlatformY}`}
                                    fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3"
                                />
                                <text x={endX1 + 5} y={lowerPlatformY + 15} fontSize="11" fill="#10b981" fontWeight="bold">
                                    Target FoS
                                </text>
                                
                                {/* Avg FoS Curve (Blue) */}
                                <path 
                                    d={`M ${startX2} ${upperPlatformY} Q ${startX2 + 40} ${lowerPlatformY + 50} ${endX2} ${lowerPlatformY}`}
                                    fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3"
                                />
                                <text x={endX2 + 5} y={lowerPlatformY} fontSize="11" fill="#3b82f6" fontWeight="bold">
                                    Avg FoS
                                </text>

                                {/* Min FoS Curve (Red) */}
                                <path 
                                    d={`M ${startX3} ${upperPlatformY} Q ${startX3 + 40} ${lowerPlatformY + 30} ${endX3} ${lowerPlatformY}`}
                                    fill="none" stroke="#ef4444" strokeWidth="3"
                                />
                                <text x={endX3 + 5} y={lowerPlatformY - 15} fontSize="11" fill="#ef4444" fontWeight="bold">
                                    Min FoS
                                </text>
                            </g>
                        );
                    })()}

                    {/* ===== DIMENSION: H (Height) ===== */}
                    {(() => {
                        const distH = lowerPlatformY - upperPlatformY;
                        const midY = (upperPlatformY + lowerPlatformY) / 2;
                        const isSmall = distH < 65;
                        return (
                            <g>
                                <line
                                    x1={leftEdge - 20} y1={upperPlatformY}
                                    x2={leftEdge - 20} y2={lowerPlatformY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                    markerStart="url(#arrowHeadReverse)"
                                    markerEnd={`url(#${arrowId})`}
                                />
                                {isSmall ? (
                                    <g>
                                        <rect
                                            x={leftEdge - 15} y={midY - 10}
                                            width="50" height="20" rx="3"
                                            fill="white" stroke="#cbd5e1" strokeWidth="0.5"
                                        />
                                        <text
                                            x={leftEdge + 10}
                                            y={midY + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            fill="#1e40af"
                                        >
                                            H={totalH}m
                                        </text>
                                    </g>
                                ) : (
                                    <g transform={`rotate(-90, ${leftEdge - 20}, ${midY})`}>
                                        <rect
                                            x={leftEdge - 20 - 30} y={midY - 10}
                                            width="60" height="20" rx="3"
                                            fill="white" stroke="#cbd5e1" strokeWidth="0.5"
                                        />
                                        <text
                                            x={leftEdge - 20}
                                            y={midY + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            fill="#1e40af"
                                        >
                                            H={totalH}m
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })()}

                    {/* ===== DIMENSION: D (Depth) ===== */}
                    {(() => {
                        const distD = baseY - lowerPlatformY;
                        const midY = (lowerPlatformY + baseY) / 2;
                        const isSmall = distD < 65;
                        return (
                            <g>
                                <line
                                    x1={rightEdge + 20} y1={lowerPlatformY}
                                    x2={rightEdge + 20} y2={baseY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                    markerStart="url(#arrowHeadReverse)"
                                    markerEnd={`url(#${arrowId})`}
                                />
                                {isSmall ? (
                                    <g>
                                        <rect
                                            x={rightEdge - 35} y={midY - 10}
                                            width="50" height="20" rx="3"
                                            fill="white" stroke="#cbd5e1" strokeWidth="0.5"
                                        />
                                        <text
                                            x={rightEdge - 10}
                                            y={midY + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            fill="#1e40af"
                                        >
                                            D={depth}m
                                        </text>
                                    </g>
                                ) : (
                                    <g transform={`rotate(-90, ${rightEdge + 20}, ${midY})`}>
                                        <rect
                                            x={rightEdge + 20 - 30} y={midY - 10}
                                            width="60" height="20" rx="3"
                                            fill="white" stroke="#cbd5e1" strokeWidth="0.5"
                                        />
                                        <text
                                            x={rightEdge + 20}
                                            y={midY + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            fill="#1e40af"
                                        >
                                            D={depth}m
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })()}

                    {/* ===== ANGLE: β ===== */}
                    {(() => {
                        // Draw angle arc at the slope toe
                        const arcRadius = 25;
                        const startAngle = 0; // horizontal
                        const endAngle = angle >= 90 ? 90 : angle;
                        const endRad = (endAngle * Math.PI) / 180;

                        const arcStartX = midW - arcRadius;
                        const arcStartY = lowerPlatformY;
                        const arcEndX = midW - arcRadius * Math.cos(endRad);
                        const arcEndY = lowerPlatformY - arcRadius * Math.sin(endRad);

                        const largeArc = endAngle > 180 ? 1 : 0;

                        return (
                            <g>
                                <path
                                    d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${arcEndX} ${arcEndY}`}
                                    fill="none"
                                    stroke="#dc2626"
                                    strokeWidth="1.5"
                                    strokeDasharray="3,2"
                                />
                                <text
                                    x={midW - arcRadius - 5}
                                    y={lowerPlatformY - 10}
                                    textAnchor="end"
                                    fontSize="12"
                                    fontWeight="700"
                                    fill="#dc2626"
                                >
                                    β={angle}°
                                </text>
                            </g>
                        );
                    })()}

                    {/* ===== PRESSURE: P (on top surface) ===== */}
                    {(() => {
                        const arrowCount = 5;
                        const arrowLen = 22;
                        const spacing = (slopeTopX - leftEdge) / (arrowCount + 1);
                        const arrows = [];

                        for (let i = 1; i <= arrowCount; i++) {
                            const x = leftEdge + spacing * i;
                            arrows.push(
                                <line
                                    key={`p-${i}`}
                                    x1={x} y1={upperPlatformY - arrowLen}
                                    x2={x} y2={upperPlatformY - 3}
                                    stroke="#dc2626"
                                    strokeWidth="1.5"
                                    markerEnd={`url(#${arrowIdRed})`}
                                />
                            );
                        }

                        return (
                            <g>
                                {/* Pressure line on top */}
                                <line
                                    x1={leftEdge + spacing} y1={upperPlatformY - arrowLen}
                                    x2={leftEdge + spacing * arrowCount} y2={upperPlatformY - arrowLen}
                                    stroke="#dc2626"
                                    strokeWidth="1"
                                />
                                {arrows}
                                {/* P label */}
                                <rect
                                    x={(leftEdge + slopeTopX) / 2 - 22}
                                    y={upperPlatformY - arrowLen - 20}
                                    width="44" height="18" rx="3"
                                    fill="#fef2f2" stroke="#fca5a5" strokeWidth="0.5"
                                />
                                <text
                                    x={(leftEdge + slopeTopX) / 2}
                                    y={upperPlatformY - arrowLen - 7}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fontWeight="700"
                                    fill="#dc2626"
                                >
                                    P={pressure}
                                </text>
                            </g>
                        );
                    })()}

                    {/* ===== WATER LEVEL: Hw (right side) ===== */}
                    {waterRight >= 0 && (() => {
                        // Hw is now measured from the right side ground surface (lowerPlatformY)
                        const waterY = lowerPlatformY - (waterRight / maxDim) * (svgH - 2 * pad - 60);
                        const clampedWaterY = Math.max(waterY, upperPlatformY);

                        return (
                            <g>
                                {/* Water fill */}
                                <rect
                                    x={midW}
                                    y={clampedWaterY}
                                    width={rightEdge - midW}
                                    height={baseY - clampedWaterY}
                                    fill="#dbeafe"
                                    fillOpacity="0.4"
                                />
                                <rect
                                    x={midW}
                                    y={clampedWaterY}
                                    width={rightEdge - midW}
                                    height={baseY - clampedWaterY}
                                    fill="url(#waterPattern)"
                                    fillOpacity="0.6"
                                />
                                {/* Water level line */}
                                <line
                                    x1={midW} y1={clampedWaterY}
                                    x2={rightEdge} y2={clampedWaterY}
                                    stroke="#2563eb"
                                    strokeWidth="1.5"
                                    strokeDasharray="6,3"
                                />
                                {/* Hw arrow */}
                                {waterRight > 0 && (
                                    <>
                                        <line
                                            x1={rightEdge - 35} y1={lowerPlatformY}
                                            x2={rightEdge - 35} y2={clampedWaterY}
                                            stroke="#2563eb"
                                            strokeWidth="1.5"
                                            markerStart="url(#arrowHeadBlueReverse)"
                                            markerEnd={`url(#${arrowIdBlue})`}
                                        />
                                        <rect
                                            x={rightEdge - 65}
                                            y={(lowerPlatformY + clampedWaterY) / 2 - 10}
                                            width="28" height="18" rx="3"
                                            fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.5"
                                        />
                                        <text
                                            x={rightEdge - 51}
                                            y={(lowerPlatformY + clampedWaterY) / 2 + 3}
                                            textAnchor="middle"
                                            fontSize="10"
                                            fontWeight="700"
                                            fill="#2563eb"
                                        >
                                            Hw
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })()}

                    {/* ===== WATER LEVEL: Hw' (left side) ===== */}
                    {waterLeft >= 0 && (() => {
                        // Hw' is now measured from the lower platform, same as Hw
                        const waterY = lowerPlatformY - (waterLeft / maxDim) * (svgH - 2 * pad - 60);
                        const clampedWaterY = Math.max(waterY, pad);

                        return (
                            <g>
                                {/* Water fill */}
                                <rect
                                    x={leftEdge}
                                    y={clampedWaterY}
                                    width={slopeTopX - leftEdge}
                                    height={baseY - clampedWaterY}
                                    fill="#dbeafe"
                                    fillOpacity="0.3"
                                />
                                <rect
                                    x={leftEdge}
                                    y={clampedWaterY}
                                    width={slopeTopX - leftEdge}
                                    height={baseY - clampedWaterY}
                                    fill="url(#waterPattern)"
                                    fillOpacity="0.5"
                                />
                                {/* Water level line */}
                                <line
                                    x1={leftEdge} y1={clampedWaterY}
                                    x2={slopeTopX} y2={clampedWaterY}
                                    stroke="#2563eb"
                                    strokeWidth="1.5"
                                    strokeDasharray="6,3"
                                />
                                {/* Hw' arrow */}
                                {waterLeft > 0 && (
                                    <>
                                        <line
                                            x1={leftEdge + 35} y1={lowerPlatformY}
                                            x2={leftEdge + 35} y2={clampedWaterY}
                                            stroke="#2563eb"
                                            strokeWidth="1.5"
                                            markerStart="url(#arrowHeadBlueReverse)"
                                            markerEnd={`url(#${arrowIdBlue})`}
                                        />
                                        <rect
                                            x={leftEdge + 38}
                                            y={(lowerPlatformY + clampedWaterY) / 2 - 10}
                                            width="32" height="18" rx="3"
                                            fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.5"
                                        />
                                        <text
                                            x={leftEdge + 54}
                                            y={(lowerPlatformY + clampedWaterY) / 2 + 3}
                                            textAnchor="middle"
                                            fontSize="10"
                                            fontWeight="700"
                                            fill="#2563eb"
                                        >
                                            Hw'
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })()}

                    {/* ===== BASE LINE ===== */}
                    <line
                        x1={leftEdge - 25} y1={baseY}
                        x2={rightEdge + 25} y2={baseY}
                        stroke="#475569"
                        strokeWidth="2"
                    />
                    {/* Base hatch marks */}
                    {Array.from({ length: 18 }).map((_, i) => {
                        const x = leftEdge - 20 + i * ((rightEdge - leftEdge + 40) / 17);
                        return (
                            <line
                                key={`hatch-${i}`}
                                x1={x} y1={baseY}
                                x2={x - 6} y2={baseY + 8}
                                stroke="#475569"
                                strokeWidth="1"
                            />
                        );
                    })}
                </svg>
            </div>
        );
    }
}

export default SlopeFigure;
