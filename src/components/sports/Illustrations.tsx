import React from 'react';

interface SvgProps {
  className?: string;
}

/**
 * Cross-section diagram of a table tennis paddle showing blade layers,
 * sponge, rubber surface, handle, and dimension labels.
 */
export function PaddleAnatomy({ className }: SvgProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Paddle anatomy cross-section diagram"
    >
      {/* Handle - flared grip */}
      <path
        d="M170 220 L160 340 Q160 360 180 360 L210 360 Q230 360 230 340 L220 220"
        fill="var(--ifm-color-primary)"
        opacity="0.25"
        stroke="var(--ifm-color-content)"
        strokeWidth="1.5"
      />
      {/* Wood grain lines on handle */}
      <line x1="175" y1="240" x2="170" y2="340" stroke="var(--ifm-color-content)" strokeWidth="0.5" opacity="0.2" />
      <line x1="185" y1="230" x2="180" y2="345" stroke="var(--ifm-color-content)" strokeWidth="0.5" opacity="0.2" />
      <line x1="195" y1="225" x2="195" y2="350" stroke="var(--ifm-color-content)" strokeWidth="0.5" opacity="0.15" />
      <line x1="205" y1="230" x2="210" y2="345" stroke="var(--ifm-color-content)" strokeWidth="0.5" opacity="0.2" />
      <line x1="215" y1="240" x2="220" y2="340" stroke="var(--ifm-color-content)" strokeWidth="0.5" opacity="0.2" />

      {/* Handle label */}
      <line x1="240" y1="300" x2="270" y2="300" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <text x="275" y="304" fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" opacity="0.8">Handle (Flared)</text>

      {/* Blade - ellipse shape with cross-section view */}
      {/* Outer blade shape */}
      <ellipse cx="195" cy="125" rx="120" ry="100" fill="none" stroke="var(--ifm-color-content)" strokeWidth="1.5" />

      {/* Blade wood layers (7-ply visible in cross-section strip) */}
      {/* Layer 1 - outer ply */}
      <rect x="90" y="110" width="210" height="5" rx="2" fill="#d4a574" stroke="var(--ifm-color-content)" strokeWidth="0.5" />
      {/* Layer 2 - glue */}
      <rect x="90" y="115" width="210" height="2" rx="1" fill="#c4956a" stroke="var(--ifm-color-content)" strokeWidth="0.3" />
      {/* Layer 3 - inner ply */}
      <rect x="90" y="117" width="210" height="5" rx="2" fill="#e0b88a" stroke="var(--ifm-color-content)" strokeWidth="0.5" />
      {/* Layer 4 - core */}
      <rect x="90" y="122" width="210" height="6" rx="2" fill="#c8a06a" stroke="var(--ifm-color-content)" strokeWidth="0.5" />
      {/* Layer 5 - inner ply */}
      <rect x="90" y="128" width="210" height="5" rx="2" fill="#e0b88a" stroke="var(--ifm-color-content)" strokeWidth="0.5" />
      {/* Layer 6 - glue */}
      <rect x="90" y="133" width="210" height="2" rx="1" fill="#c4956a" stroke="var(--ifm-color-content)" strokeWidth="0.3" />
      {/* Layer 7 - outer ply */}
      <rect x="90" y="135" width="210" height="5" rx="2" fill="#d4a574" stroke="var(--ifm-color-content)" strokeWidth="0.5" />

      {/* Wood grain texture lines */}
      {[112, 119, 124, 130, 137].map((y, i) => (
        <g key={i} opacity="0.15">
          <path d={`M95 ${y} Q150 ${y - 1} 200 ${y + 1} Q250 ${y - 0.5} 295 ${y}`} stroke="var(--ifm-color-content)" strokeWidth="0.5" fill="none" />
        </g>
      ))}

      {/* Blade label with bracket */}
      <line x1="310" y1="110" x2="330" y2="110" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <line x1="310" y1="140" x2="330" y2="140" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <line x1="330" y1="110" x2="330" y2="140" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <line x1="330" y1="125" x2="345" y2="125" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <text x="350" y="129" fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" opacity="0.8">Blade (7-ply)</text>

      {/* Sponge layer - top side */}
      <path
        d="M90 105 Q195 60 300 105 L300 110 Q195 65 90 110 Z"
        fill="#ff9800"
        opacity="0.5"
        stroke="var(--ifm-color-content)"
        strokeWidth="0.8"
      />
      {/* Sponge texture dots */}
      {[110, 130, 150, 170, 190, 210, 230, 250, 270, 290].map((x, i) => (
        <circle key={i} cx={x} cy={107 - Math.sin((x - 90) / 210 * Math.PI) * 20} r="0.8" fill="var(--ifm-color-content)" opacity="0.15" />
      ))}

      {/* Sponge label */}
      <line x1="320" y1="95" x2="345" y2="95" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <text x="350" y="99" fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" opacity="0.8">Sponge</text>

      {/* Rubber surface - top side with pimple texture */}
      <path
        d="M95 98 Q195 50 295 98 L300 105 Q195 57 90 105 Z"
        fill="var(--ifm-color-primary)"
        opacity="0.4"
        stroke="var(--ifm-color-content)"
        strokeWidth="0.8"
      />
      {/* Pimple texture hints on rubber */}
      {[120, 140, 160, 180, 200, 220, 240, 260, 280].map((x, i) => {
        const yBase = 100 - Math.sin((x - 95) / 200 * Math.PI) * 22;
        return (
          <g key={i}>
            <line x1={x} y1={yBase} x2={x} y2={yBase - 3} stroke="var(--ifm-color-content)" strokeWidth="0.6" opacity="0.25" />
            <circle cx={x} cy={yBase - 3.5} r="1" fill="var(--ifm-color-content)" opacity="0.2" />
          </g>
        );
      })}

      {/* Rubber label */}
      <line x1="310" y1="75" x2="345" y2="75" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.6" />
      <text x="350" y="79" fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" opacity="0.8">Rubber</text>

      {/* Sponge layer - bottom side */}
      <path
        d="M90 140 Q195 185 300 140 L300 135 Q195 180 90 135 Z"
        fill="#ff9800"
        opacity="0.5"
        stroke="var(--ifm-color-content)"
        strokeWidth="0.8"
      />

      {/* Rubber surface - bottom side */}
      <path
        d="M95 147 Q195 195 295 147 L300 140 Q195 188 90 140 Z"
        fill="var(--ifm-color-primary)"
        opacity="0.3"
        stroke="var(--ifm-color-content)"
        strokeWidth="0.8"
      />

      {/* Dimension arrow - total thickness */}
      <line x1="60" y1="70" x2="60" y2="155" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <polygon points="60,70 57,77 63,77" fill="var(--ifm-color-content)" opacity="0.5" />
      <polygon points="60,155 57,148 63,148" fill="var(--ifm-color-content)" opacity="0.5" />
      <line x1="55" y1="70" x2="65" y2="70" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="155" x2="65" y2="155" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <text x="30" y="116" fill="var(--ifm-color-content)" fontSize="9" fontWeight="600" opacity="0.6" textAnchor="middle">~25mm</text>

      {/* Dimension arrow - blade width */}
      <line x1="90" y1="190" x2="300" y2="190" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <polygon points="90,190 97,187 97,193" fill="var(--ifm-color-content)" opacity="0.5" />
      <polygon points="300,190 293,187 293,193" fill="var(--ifm-color-content)" opacity="0.5" />
      <line x1="90" y1="185" x2="90" y2="195" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <line x1="300" y1="185" x2="300" y2="195" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <text x="195" y="207" fill="var(--ifm-color-content)" fontSize="9" fontWeight="600" opacity="0.6" textAnchor="middle">~150mm</text>
    </svg>
  );
}

/**
 * Side-by-side comparison of three rubber types:
 * Inverted, Short Pimples, Long Pimples.
 */
export function RubberTypes({ className }: SvgProps): JSX.Element {
  const baseY = 120;
  const spongeH = 25;
  const rubberH = 8;

  return (
    <svg
      className={className}
      viewBox="0 0 540 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Comparison of three table tennis rubber types"
    >
      {/* --- Inverted / 反胶 --- */}
      <g transform="translate(20, 0)">
        {/* Sponge */}
        <rect x="0" y={baseY} width="140" height={spongeH} rx="2" fill="#ff9800" opacity="0.45" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {/* Sponge texture */}
        {[15, 30, 45, 60, 75, 90, 105, 120].map((x, i) => (
          <circle key={i} cx={x} cy={baseY + spongeH / 2} r="2" fill="var(--ifm-color-content)" opacity="0.08" />
        ))}
        {/* Rubber sheet (pimples facing inward = toward sponge) */}
        <rect x="0" y={baseY - rubberH} width="140" height={rubberH} rx="1" fill="var(--ifm-color-primary)" opacity="0.5" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {/* Smooth top surface line */}
        <line x1="0" y1={baseY - rubberH} x2="140" y2={baseY - rubberH} stroke="var(--ifm-color-content)" strokeWidth="1.5" />
        {/* Pimples facing inward (between rubber and sponge) */}
        {[10, 22, 34, 46, 58, 70, 82, 94, 106, 118, 130].map((x, i) => (
          <rect key={i} x={x} y={baseY - 2} width="4" height="5" rx="1" fill="var(--ifm-color-primary)" opacity="0.35" stroke="var(--ifm-color-content)" strokeWidth="0.4" />
        ))}
        {/* Arrow showing pimple direction */}
        <line x1="155" y1={baseY - 5} x2="155" y2={baseY + 8} stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.5" />
        <polygon points="155,108 152,102 158,102" fill="var(--ifm-color-content)" opacity="0.5" />
        <text x="160" y={baseY + 4} fill="var(--ifm-color-content)" fontSize="8" opacity="0.5">pimples in</text>

        {/* Label */}
        <text x="70" y={baseY + spongeH + 25} fill="var(--ifm-color-content)" fontSize="12" fontWeight="700" textAnchor="middle" opacity="0.85">Inverted</text>
        <text x="70" y={baseY + spongeH + 40} fill="var(--ifm-color-content)" fontSize="10" textAnchor="middle" opacity="0.55">反胶 (fan jiao)</text>
        <text x="70" y={baseY - rubberH - 12} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.5">Smooth surface</text>

        {/* Sponge label */}
        <text x="70" y={baseY + spongeH / 2 + 3} fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.5">Sponge</text>
      </g>

      {/* --- Short Pimples / 正胶 --- */}
      <g transform="translate(200, 0)">
        {/* Sponge */}
        <rect x="0" y={baseY} width="140" height={spongeH} rx="2" fill="#ff9800" opacity="0.45" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {[15, 30, 45, 60, 75, 90, 105, 120].map((x, i) => (
          <circle key={i} cx={x} cy={baseY + spongeH / 2} r="2" fill="var(--ifm-color-content)" opacity="0.08" />
        ))}
        {/* Rubber base sheet */}
        <rect x="0" y={baseY - rubberH} width="140" height={rubberH} rx="1" fill="var(--ifm-color-primary)" opacity="0.5" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {/* Short pimples facing outward */}
        {[8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128].map((x, i) => (
          <rect key={i} x={x} y={baseY - rubberH - 10} width="5" height="10" rx="1.5" fill="var(--ifm-color-primary)" opacity="0.45" stroke="var(--ifm-color-content)" strokeWidth="0.6" />
        ))}

        {/* Label */}
        <text x="70" y={baseY + spongeH + 25} fill="var(--ifm-color-content)" fontSize="12" fontWeight="700" textAnchor="middle" opacity="0.85">Short Pimples</text>
        <text x="70" y={baseY + spongeH + 40} fill="var(--ifm-color-content)" fontSize="10" textAnchor="middle" opacity="0.55">正胶 (zheng jiao)</text>
        <text x="70" y={baseY - rubberH - 20} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.5">Short pimples out</text>

        <text x="70" y={baseY + spongeH / 2 + 3} fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.5">Sponge</text>
      </g>

      {/* --- Long Pimples / 长胶 --- */}
      <g transform="translate(380, 0)">
        {/* Sponge */}
        <rect x="0" y={baseY} width="140" height={spongeH} rx="2" fill="#ff9800" opacity="0.45" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {[15, 30, 45, 60, 75, 90, 105, 120].map((x, i) => (
          <circle key={i} cx={x} cy={baseY + spongeH / 2} r="2" fill="var(--ifm-color-content)" opacity="0.08" />
        ))}
        {/* Rubber base sheet */}
        <rect x="0" y={baseY - rubberH} width="140" height={rubberH} rx="1" fill="var(--ifm-color-primary)" opacity="0.5" stroke="var(--ifm-color-content)" strokeWidth="1" />
        {/* Long thin pimples facing outward */}
        {[8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128].map((x, i) => (
          <rect key={i} x={x + 1} y={baseY - rubberH - 22} width="3" height="22" rx="1" fill="var(--ifm-color-primary)" opacity="0.4" stroke="var(--ifm-color-content)" strokeWidth="0.5" />
        ))}
        {/* Slight bend on long pimples to show flexibility */}
        {[8, 32, 56, 80, 104, 128].map((x, i) => (
          <path key={i} d={`M${x + 2.5} ${baseY - rubberH - 22} Q${x + 4} ${baseY - rubberH - 25} ${x + 3} ${baseY - rubberH - 28}`} stroke="var(--ifm-color-content)" strokeWidth="0.4" opacity="0.3" fill="none" />
        ))}

        {/* Label */}
        <text x="70" y={baseY + spongeH + 25} fill="var(--ifm-color-content)" fontSize="12" fontWeight="700" textAnchor="middle" opacity="0.85">Long Pimples</text>
        <text x="70" y={baseY + spongeH + 40} fill="var(--ifm-color-content)" fontSize="10" textAnchor="middle" opacity="0.55">长胶 (chang jiao)</text>
        <text x="70" y={baseY - rubberH - 35} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.5">Tall, thin pimples out</text>

        <text x="70" y={baseY + spongeH / 2 + 3} fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.5">Sponge</text>
      </g>
    </svg>
  );
}

/**
 * Top-down view of a table tennis table with dimensions,
 * net, center line, service areas, and dimension arrows.
 */
export function TableDimensions({ className }: SvgProps): JSX.Element {
  // Table proportions: 274cm x 152.5cm. We'll use a scale.
  const tw = 370; // table width in SVG
  const th = 206; // table height in SVG
  const ox = 70;  // offset x
  const oy = 50;  // offset y

  return (
    <svg
      className={className}
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Table tennis table dimensions diagram"
    >
      {/* Table surface */}
      <rect x={ox} y={oy} width={tw} height={th} rx="3"
        fill="var(--ifm-color-primary)" opacity="0.12"
        stroke="var(--ifm-color-content)" strokeWidth="2"
      />

      {/* Table surface lines - outer boundary (white line) */}
      <rect x={ox + 4} y={oy + 4} width={tw - 8} height={th - 8} rx="1"
        fill="none"
        stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.3"
      />

      {/* Net line (center horizontal) */}
      <line x1={ox} y1={oy + th / 2} x2={ox + tw} y2={oy + th / 2}
        stroke="var(--ifm-color-content)" strokeWidth="2.5" opacity="0.7"
      />
      {/* Net posts */}
      <rect x={ox - 8} y={oy + th / 2 - 3} width="8" height="6" rx="1" fill="var(--ifm-color-content)" opacity="0.5" />
      <rect x={ox + tw} y={oy + th / 2 - 3} width="8" height="6" rx="1" fill="var(--ifm-color-content)" opacity="0.5" />

      {/* Center line for doubles (vertical) */}
      <line x1={ox + tw / 2} y1={oy + 4} x2={ox + tw / 2} y2={oy + th - 4}
        stroke="var(--ifm-color-content)" strokeWidth="1" strokeDasharray="6,4" opacity="0.35"
      />

      {/* Service areas - shaded quadrants */}
      {/* Top-left service area */}
      <rect x={ox + 4} y={oy + 4} width={tw / 2 - 4} height={th / 2 - 4}
        fill="var(--ifm-color-primary)" opacity="0.06"
      />
      {/* Bottom-right service area */}
      <rect x={ox + tw / 2} y={oy + th / 2} width={tw / 2 - 4} height={th / 2 - 4}
        fill="var(--ifm-color-primary)" opacity="0.06"
      />

      {/* Dimension arrows - width (top) */}
      <line x1={ox} y1={oy - 20} x2={ox + tw} y2={oy - 20}
        stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.5"
      />
      <polygon points={`${ox},${oy - 20} ${ox + 7},${oy - 23} ${ox + 7},${oy - 17}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <polygon points={`${ox + tw},${oy - 20} ${ox + tw - 7},${oy - 23} ${ox + tw - 7},${oy - 17}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <line x1={ox} y1={oy - 25} x2={ox} y2={oy - 15} stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <line x1={ox + tw} y1={oy - 25} x2={ox + tw} y2={oy - 15} stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <text x={ox + tw / 2} y={oy - 27} fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.7">274 cm</text>

      {/* Dimension arrows - height (left) */}
      <line x1={ox - 25} y1={oy} x2={ox - 25} y2={oy + th}
        stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.5"
      />
      <polygon points={`${ox - 25},${oy} ${ox - 28},${oy + 7} ${ox - 22},${oy + 7}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <polygon points={`${ox - 25},${oy + th} ${ox - 28},${oy + th - 7} ${ox - 22},${oy + th - 7}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <line x1={ox - 30} y1={oy} x2={ox - 20} y2={oy} stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <line x1={ox - 30} y1={oy + th} x2={ox - 20} y2={oy + th} stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.5" />
      <text x={ox - 35} y={oy + th / 2 + 4} fill="var(--ifm-color-content)" fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.7" transform={`rotate(-90, ${ox - 35}, ${oy + th / 2 + 4})`}>152.5 cm</text>

      {/* Net height indicator (right side) */}
      <line x1={ox + tw + 20} y1={oy + th / 2 - 12} x2={ox + tw + 20} y2={oy + th / 2 + 12}
        stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.5"
      />
      <polygon points={`${ox + tw + 20},${oy + th / 2 - 12} ${ox + tw + 17},${oy + th / 2 - 5} ${ox + tw + 23},${oy + th / 2 - 5}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <polygon points={`${ox + tw + 20},${oy + th / 2 + 12} ${ox + tw + 17},${oy + th / 2 + 5} ${ox + tw + 23},${oy + th / 2 + 5}`} fill="var(--ifm-color-content)" opacity="0.5" />
      <text x={ox + tw + 30} y={oy + th / 2 + 4} fill="var(--ifm-color-content)" fontSize="10" fontWeight="600" opacity="0.6">Net: 15.25 cm</text>

      {/* Labels */}
      <text x={ox + tw / 2} y={oy + th / 2 - 8} fill="var(--ifm-color-content)" fontSize="10" textAnchor="middle" opacity="0.4">NET</text>

      {/* "Service area" label in top-right quadrant */}
      <text x={ox + tw * 3 / 4} y={oy + th / 4 + 4} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.35">Service Area</text>
      <text x={ox + tw / 4} y={oy + th * 3 / 4 + 4} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.35">Service Area</text>

      {/* Center line label */}
      <text x={ox + tw / 2} y={oy + th + 20} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.4">Center line (doubles)</text>

      {/* Half table dimension */}
      <line x1={ox + tw / 2} y1={oy + th + 30} x2={ox + tw} y2={oy + th + 30}
        stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,3"
      />
      <text x={ox + tw * 3 / 4} y={oy + th + 44} fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.4">137 cm (half)</text>
    </svg>
  );
}

/**
 * Side-view diagram of forehand drive technique showing
 * player silhouette, paddle positions, and ball trajectory.
 */
export function ForehandDrive({ className }: SvgProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Forehand drive technique diagram"
    >
      {/* Table edge reference */}
      <line x1="180" y1="230" x2="400" y2="230" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" />
      <text x="290" y="248" fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.35">Table</text>

      {/* Net */}
      <line x1="290" y1="205" x2="290" y2="230" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.5" />
      <text x="290" y="200" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.4">Net</text>

      {/* Player silhouette - simplified side view, slight forward lean */}
      <g transform="translate(100, 50)">
        {/* Head */}
        <circle cx="30" cy="20" r="14" fill="var(--ifm-color-content)" opacity="0.15" stroke="var(--ifm-color-content)" strokeWidth="1.5" />
        {/* Body - slight forward lean */}
        <path d="M30 34 L35 90 Q36 100 30 105 L20 105 Q14 100 18 90 L25 55" fill="var(--ifm-color-content)" opacity="0.12" stroke="var(--ifm-color-content)" strokeWidth="1.5" />
        {/* Right arm (paddle arm) - ready position going to contact */}
        <path d="M35 50 L60 70 L75 60" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        {/* Paddle at ready position */}
        <ellipse cx="80" cy="57" rx="8" ry="12" fill="var(--ifm-color-primary)" opacity="0.3" stroke="var(--ifm-color-content)" strokeWidth="1" transform="rotate(-20, 80, 57)" />
        {/* Left arm */}
        <path d="M22 50 L5 65 L10 75" stroke="var(--ifm-color-content)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        {/* Legs */}
        <path d="M25 105 L15 145 L8 170" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        <path d="M30 105 L40 145 L48 170" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        {/* Feet */}
        <ellipse cx="5" cy="172" rx="8" ry="3" fill="var(--ifm-color-content)" opacity="0.2" />
        <ellipse cx="50" cy="172" rx="8" ry="3" fill="var(--ifm-color-content)" opacity="0.2" />
      </g>

      {/* Swing direction arrow */}
      <path d="M175 115 Q200 105 210 125 Q220 145 230 140" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" strokeDasharray="5,3" />
      <polygon points="230,140 222,138 226,145" fill="var(--ifm-color-primary)" />
      <text x="220" y="100" fill="var(--ifm-color-primary)" fontSize="9" fontWeight="600" opacity="0.7">Swing path</text>

      {/* Contact point marker */}
      <circle cx="235" cy="140" r="5" fill="var(--ifm-color-primary)" opacity="0.3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" />
      <text x="242" y="155" fill="var(--ifm-color-content)" fontSize="9" fontWeight="600" opacity="0.7">Contact point</text>

      {/* Ball trajectory - flat arc over net */}
      <path d="M235 140 Q290 100 370 170" stroke="var(--ifm-color-content)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" fill="none" />
      {/* Ball at a few positions */}
      <circle cx="235" cy="140" r="4" fill="var(--ifm-color-content)" opacity="0.4" />
      <circle cx="265" cy="118" r="3.5" fill="var(--ifm-color-content)" opacity="0.25" />
      <circle cx="310" cy="115" r="3" fill="var(--ifm-color-content)" opacity="0.2" />
      <circle cx="370" cy="170" r="4" fill="var(--ifm-color-content)" opacity="0.35" />

      {/* Labels */}
      <text x="120" y="25" fill="var(--ifm-color-content)" fontSize="9" opacity="0.5">Ready position</text>
      <line x1="130" y1="28" x2="130" y2="45" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.4" />

      <text x="350" y="155" fill="var(--ifm-color-content)" fontSize="9" opacity="0.5">Follow through</text>
    </svg>
  );
}

/**
 * Forehand loop technique with upward swing, topspin arrows,
 * and curved ball trajectory.
 */
export function ForehandLoop({ className }: SvgProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Forehand loop technique diagram"
    >
      {/* Table edge */}
      <line x1="180" y1="230" x2="400" y2="230" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" />
      <text x="290" y="248" fill="var(--ifm-color-content)" fontSize="9" textAnchor="middle" opacity="0.35">Table</text>

      {/* Net */}
      <line x1="290" y1="205" x2="290" y2="230" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.5" />

      {/* Player silhouette */}
      <g transform="translate(90, 50)">
        {/* Head */}
        <circle cx="30" cy="20" r="14" fill="var(--ifm-color-content)" opacity="0.15" stroke="var(--ifm-color-content)" strokeWidth="1.5" />
        {/* Body */}
        <path d="M30 34 L35 90 Q36 100 30 105 L20 105 Q14 100 18 90 L25 55" fill="var(--ifm-color-content)" opacity="0.12" stroke="var(--ifm-color-content)" strokeWidth="1.5" />
        {/* Paddle arm - more upward position for loop */}
        <path d="M35 50 L55 55 L72 38" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        {/* Paddle angled more upward */}
        <ellipse cx="76" cy="32" rx="8" ry="12" fill="var(--ifm-color-primary)" opacity="0.3" stroke="var(--ifm-color-content)" strokeWidth="1" transform="rotate(-40, 76, 32)" />
        {/* Left arm */}
        <path d="M22 50 L5 65 L10 75" stroke="var(--ifm-color-content)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        {/* Legs - lower stance */}
        <path d="M25 105 L12 148 L5 172" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        <path d="M30 105 L42 148 L50 172" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        <ellipse cx="2" cy="174" rx="8" ry="3" fill="var(--ifm-color-content)" opacity="0.2" />
        <ellipse cx="52" cy="174" rx="8" ry="3" fill="var(--ifm-color-content)" opacity="0.2" />
      </g>

      {/* Upward swing path - more vertical than forehand drive */}
      <path d="M168 150 Q178 120 175 95 Q172 75 170 82" stroke="var(--ifm-color-primary)" strokeWidth="2.5" fill="none" strokeDasharray="5,3" />
      <polygon points="170,82 165,90 174,89" fill="var(--ifm-color-primary)" />
      <text x="145" y="168" fill="var(--ifm-color-primary)" fontSize="9" fontWeight="600" opacity="0.7">Upward</text>
      <text x="145" y="179" fill="var(--ifm-color-primary)" fontSize="9" fontWeight="600" opacity="0.7">brush</text>

      {/* Contact point with brushing emphasis */}
      <circle cx="172" cy="93" r="6" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeDasharray="2,2" />
      <text x="185" y="90" fill="var(--ifm-color-content)" fontSize="9" fontWeight="600" opacity="0.7">Brush contact</text>

      {/* Ball with topspin rotation arrows */}
      <circle cx="220" cy="60" r="8" fill="var(--ifm-color-content)" opacity="0.3" stroke="var(--ifm-color-content)" strokeWidth="1" />
      {/* Topspin rotation arrow on ball */}
      <path d="M214 55 Q220 50 226 55" stroke="var(--ifm-color-primary)" strokeWidth="1.5" fill="none" />
      <polygon points="226,55 223,51 224,58" fill="var(--ifm-color-primary)" />
      <path d="M226 65 Q220 70 214 65" stroke="var(--ifm-color-primary)" strokeWidth="1.5" fill="none" />
      <polygon points="214,65 217,69 216,62" fill="var(--ifm-color-primary)" />
      <text x="220" y="45" fill="var(--ifm-color-primary)" fontSize="8" fontWeight="600" textAnchor="middle" opacity="0.6">Topspin</text>

      {/* Ball trajectory - higher arc with curve down due to topspin */}
      <path d="M172 93 Q230 15 340 120 Q360 160 380 200" stroke="var(--ifm-color-content)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.45" fill="none" />
      {/* Ghost balls along trajectory */}
      <circle cx="200" cy="50" r="3" fill="var(--ifm-color-content)" opacity="0.15" />
      <circle cx="260" cy="35" r="3" fill="var(--ifm-color-content)" opacity="0.12" />
      <circle cx="320" cy="80" r="3" fill="var(--ifm-color-content)" opacity="0.12" />
      <circle cx="360" cy="155" r="3.5" fill="var(--ifm-color-content)" opacity="0.2" />

      {/* Arc height label */}
      <text x="310" y="25" fill="var(--ifm-color-content)" fontSize="9" opacity="0.4">Higher arc with topspin dip</text>
      <path d="M310 28 Q310 60 325 75" stroke="var(--ifm-color-content)" strokeWidth="0.8" opacity="0.3" fill="none" />
    </svg>
  );
}

/**
 * Overhead view of serve motion showing ball toss,
 * paddle path, ball trajectory, landing zones, and spin indicators.
 */
export function ServeMotion({ className }: SvgProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Table tennis serve motion diagram"
    >
      {/* Table - top down, player at bottom */}
      <rect x="100" y="20" width="220" height="200" rx="3"
        fill="var(--ifm-color-primary)" opacity="0.1"
        stroke="var(--ifm-color-content)" strokeWidth="1.5"
      />
      {/* Net */}
      <line x1="100" y1="120" x2="320" y2="120" stroke="var(--ifm-color-content)" strokeWidth="2" opacity="0.5" />
      <text x="330" y="124" fill="var(--ifm-color-content)" fontSize="8" opacity="0.4">Net</text>

      {/* Center line */}
      <line x1="210" y1="20" x2="210" y2="220" stroke="var(--ifm-color-content)" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.25" />

      {/* Server position (bottom of table) */}
      <circle cx="210" cy="260" r="10" fill="var(--ifm-color-content)" opacity="0.15" stroke="var(--ifm-color-content)" strokeWidth="1.5" />
      <text x="210" y="264" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" fontWeight="600" opacity="0.5">P</text>
      <text x="210" y="285" fill="var(--ifm-color-content)" fontSize="10" textAnchor="middle" fontWeight="600" opacity="0.6">Server</text>

      {/* Ball toss - vertical arrow up from hand */}
      <line x1="195" y1="255" x2="195" y2="225" stroke="var(--ifm-color-primary)" strokeWidth="2" />
      <polygon points="195,225 192,232 198,232" fill="var(--ifm-color-primary)" />
      <text x="175" y="240" fill="var(--ifm-color-primary)" fontSize="9" fontWeight="600" opacity="0.7" textAnchor="end">Ball toss</text>
      <text x="175" y="250" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5" textAnchor="end">(min 16cm)</text>

      {/* Paddle swing path - arc from right side */}
      <path d="M230 260 Q245 245 235 230 Q225 218 215 220" stroke="var(--ifm-color-content)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" fill="none" />
      <polygon points="215,220 222,218 220,225" fill="var(--ifm-color-content)" opacity="0.4" />
      <text x="255" y="250" fill="var(--ifm-color-content)" fontSize="8" opacity="0.5">Swing path</text>

      {/* Ball trajectory - from serve contact to landing on server's side then over net */}
      {/* First bounce on server's side */}
      <circle cx="200" cy="190" r="4" fill="var(--ifm-color-primary)" opacity="0.35" />
      <text x="200" y="205" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.5">1st bounce</text>

      {/* Trajectory line from contact to first bounce */}
      <path d="M210 220 Q205 200 200 190" stroke="var(--ifm-color-primary)" strokeWidth="1.5" opacity="0.5" fill="none" />

      {/* Trajectory over net to opponent's side - multiple possible landing zones */}
      {/* Short serve */}
      <path d="M200 190 Q200 150 185 100" stroke="var(--ifm-color-primary)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.4" fill="none" />
      <circle cx="185" cy="100" r="5" fill="var(--ifm-color-primary)" opacity="0.15" stroke="var(--ifm-color-primary)" strokeWidth="1" strokeDasharray="2,2" />
      <text x="160" y="95" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5" textAnchor="end">Short</text>

      {/* Long serve */}
      <path d="M200 190 Q210 130 230 45" stroke="var(--ifm-color-primary)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.4" fill="none" />
      <circle cx="230" cy="45" r="5" fill="var(--ifm-color-primary)" opacity="0.15" stroke="var(--ifm-color-primary)" strokeWidth="1" strokeDasharray="2,2" />
      <text x="255" y="48" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5">Long</text>

      {/* Wide serve */}
      <path d="M200 190 Q180 140 140 70" stroke="var(--ifm-color-primary)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.4" fill="none" />
      <circle cx="140" cy="70" r="5" fill="var(--ifm-color-primary)" opacity="0.15" stroke="var(--ifm-color-primary)" strokeWidth="1" strokeDasharray="2,2" />
      <text x="120" y="65" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5" textAnchor="end">Wide</text>

      {/* Spin direction indicators on ball at contact */}
      <g transform="translate(60, 215)">
        <text x="0" y="0" fill="var(--ifm-color-content)" fontSize="9" fontWeight="600" opacity="0.6">Spin types:</text>
        {/* Backspin */}
        <circle cx="15" cy="18" r="7" fill="none" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.4" />
        <path d="M10 14 Q15 11 20 14" stroke="var(--ifm-color-primary)" strokeWidth="1.2" fill="none" />
        <polygon points="10,14 13,12 11,17" fill="var(--ifm-color-primary)" opacity="0.7" />
        <text x="28" y="22" fill="var(--ifm-color-content)" fontSize="8" opacity="0.5">Backspin</text>

        {/* Topspin */}
        <circle cx="15" cy="40" r="7" fill="none" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.4" />
        <path d="M10 36 Q15 33 20 36" stroke="var(--ifm-color-primary)" strokeWidth="1.2" fill="none" />
        <polygon points="20,36 17,34 19,39" fill="var(--ifm-color-primary)" opacity="0.7" />
        <text x="28" y="44" fill="var(--ifm-color-content)" fontSize="8" opacity="0.5">Topspin</text>

        {/* Sidespin */}
        <circle cx="15" cy="62" r="7" fill="none" stroke="var(--ifm-color-content)" strokeWidth="1" opacity="0.4" />
        <path d="M12 56 Q9 62 12 68" stroke="var(--ifm-color-primary)" strokeWidth="1.2" fill="none" />
        <polygon points="12,68 10,64 15,66" fill="var(--ifm-color-primary)" opacity="0.7" />
        <text x="28" y="66" fill="var(--ifm-color-content)" fontSize="8" opacity="0.5">Sidespin</text>
      </g>
    </svg>
  );
}

/**
 * Top-down view of basic footwork patterns:
 * side shuffle and crossover step.
 */
export function FootworkDiagram({ className }: SvgProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Table tennis footwork movement patterns"
    >
      {/* Table edge reference */}
      <rect x="60" y="10" width="300" height="15" rx="2"
        fill="var(--ifm-color-primary)" opacity="0.1"
        stroke="var(--ifm-color-content)" strokeWidth="1.5"
      />
      <text x="210" y="21" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" fontWeight="600" opacity="0.4">TABLE EDGE</text>

      {/* --- Side Shuffle Pattern (left section) --- */}
      <text x="130" y="52" fill="var(--ifm-color-content)" fontSize="12" fontWeight="700" textAnchor="middle" opacity="0.8">Side Shuffle</text>

      {/* Player home position - feet markers */}
      <g transform="translate(110, 110)">
        {/* Left foot */}
        <ellipse cx="0" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.25" stroke="var(--ifm-color-content)" strokeWidth="1.2" transform="rotate(-5)" />
        <text x="0" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.5">L</text>
        {/* Right foot */}
        <ellipse cx="35" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.25" stroke="var(--ifm-color-content)" strokeWidth="1.2" transform="rotate(5, 35, 0)" />
        <text x="35" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.5">R</text>
      </g>

      {/* Left movement arrows */}
      <path d="M105 95 Q70 95 50 100" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" />
      <polygon points="50,100 58,96 56,104" fill="var(--ifm-color-primary)" />

      <path d="M145 95 Q115 95 95 100" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" strokeDasharray="4,3" />
      <polygon points="95,100 103,96 101,104" fill="var(--ifm-color-primary)" opacity="0.6" />

      {/* Right movement arrows */}
      <path d="M155 95 Q190 95 210 100" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" />
      <polygon points="210,100 202,96 204,104" fill="var(--ifm-color-primary)" />

      <path d="M115 95 Q145 95 165 100" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" strokeDasharray="4,3" />
      <polygon points="165,100 157,96 159,104" fill="var(--ifm-color-primary)" opacity="0.6" />

      {/* Labels for side shuffle */}
      <text x="55" y="80" fill="var(--ifm-color-primary)" fontSize="8" fontWeight="600" opacity="0.6" textAnchor="middle">Lead foot</text>
      <text x="55" y="90" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.4" textAnchor="middle">moves first</text>
      <text x="205" y="80" fill="var(--ifm-color-primary)" fontSize="8" fontWeight="600" opacity="0.6" textAnchor="middle">Lead foot</text>
      <text x="205" y="90" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.4" textAnchor="middle">moves first</text>

      {/* Ghost positions left */}
      <ellipse cx="50" cy="115" rx="9" ry="14" fill="var(--ifm-color-primary)" opacity="0.08" stroke="var(--ifm-color-content)" strokeWidth="0.8" strokeDasharray="2,2" />
      <ellipse cx="85" cy="115" rx="9" ry="14" fill="var(--ifm-color-primary)" opacity="0.08" stroke="var(--ifm-color-content)" strokeWidth="0.8" strokeDasharray="2,2" />

      {/* Ghost positions right */}
      <ellipse cx="175" cy="115" rx="9" ry="14" fill="var(--ifm-color-primary)" opacity="0.08" stroke="var(--ifm-color-content)" strokeWidth="0.8" strokeDasharray="2,2" />
      <ellipse cx="210" cy="115" rx="9" ry="14" fill="var(--ifm-color-primary)" opacity="0.08" stroke="var(--ifm-color-content)" strokeWidth="0.8" strokeDasharray="2,2" />

      {/* Description */}
      <text x="130" y="155" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.45">Maintain shoulder-width stance</text>
      <text x="130" y="167" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.45">Feet never cross</text>

      {/* --- Crossover Step Pattern (right section) --- */}
      <text x="330" y="52" fill="var(--ifm-color-content)" fontSize="12" fontWeight="700" textAnchor="middle" opacity="0.8">Crossover Step</text>

      {/* Starting position */}
      <g transform="translate(310, 80)">
        <ellipse cx="0" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.25" stroke="var(--ifm-color-content)" strokeWidth="1.2" transform="rotate(-5)" />
        <text x="0" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.5">L</text>
        <ellipse cx="35" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.25" stroke="var(--ifm-color-content)" strokeWidth="1.2" transform="rotate(5, 35, 0)" />
        <text x="35" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.5">R</text>
      </g>
      <text x="330" y="65" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.4">Start</text>

      {/* Step 1: Right foot crosses over left */}
      <path d="M345 85 Q330 115 300 130" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" />
      <polygon points="300,130 308,128 304,135" fill="var(--ifm-color-primary)" />
      <text x="360" y="115" fill="var(--ifm-color-primary)" fontSize="8" fontWeight="600" opacity="0.6">Step 1:</text>
      <text x="360" y="126" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5">R crosses</text>
      <text x="360" y="137" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.5">over L</text>

      {/* Ghost right foot after crossover */}
      <ellipse cx="295" cy="135" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.1" stroke="var(--ifm-color-primary)" strokeWidth="1" strokeDasharray="2,2" transform="rotate(10, 295, 135)" />
      <text x="295" y="138" fill="var(--ifm-color-primary)" fontSize="7" textAnchor="middle" opacity="0.4">R</text>

      {/* Step 2: Left foot follows */}
      <path d="M310 85 Q295 120 280 165" stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none" strokeDasharray="4,3" />
      <polygon points="280,165 284,157 276,159" fill="var(--ifm-color-primary)" opacity="0.6" />
      <text x="265" y="150" fill="var(--ifm-color-primary)" fontSize="8" fontWeight="600" opacity="0.5" textAnchor="end">Step 2:</text>
      <text x="265" y="161" fill="var(--ifm-color-primary)" fontSize="8" opacity="0.4" textAnchor="end">L follows</text>

      {/* Final position */}
      <g transform="translate(265, 185)">
        <ellipse cx="0" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.12" stroke="var(--ifm-color-content)" strokeWidth="1" strokeDasharray="3,2" transform="rotate(-5)" />
        <text x="0" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.35">L</text>
        <ellipse cx="35" cy="0" rx="10" ry="16" fill="var(--ifm-color-primary)" opacity="0.12" stroke="var(--ifm-color-content)" strokeWidth="1" strokeDasharray="3,2" transform="rotate(5, 35, 0)" />
        <text x="35" y="3" fill="var(--ifm-color-content)" fontSize="7" textAnchor="middle" opacity="0.35">R</text>
      </g>
      <text x="285" y="215" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.4">End position</text>

      {/* Description */}
      <text x="330" y="245" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.45">For covering large distances</text>
      <text x="330" y="257" fill="var(--ifm-color-content)" fontSize="8" textAnchor="middle" opacity="0.45">quickly (e.g. forehand pivot)</text>
    </svg>
  );
}
