import React from 'react';

export const HeartbeatBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        className="absolute bottom-0 left-0 w-full h-32 sm:h-48 opacity-[0.06]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          className="heartbeat-line"
          d="M0,100 L80,100 L100,100 L120,100 L140,100 L160,100 L180,100 L200,100 L220,100 L240,100 L260,100 L270,100 L280,100 L290,100 L300,100 L310,100 L320,100 L325,80 L330,60 L335,50 L340,60 L345,80 L350,100 L360,100 L370,100 L380,100 L390,100 L400,100 L420,100 L440,100 L460,100 L480,100 L500,100 L520,100 L540,100 L560,100 L580,100 L590,100 L600,100 L610,100 L620,100 L630,100 L640,100 L650,100 L660,100 L670,100 L675,80 L680,60 L685,50 L690,60 L695,80 L700,100 L710,100 L720,100 L730,100 L740,100 L750,100 L760,100 L780,100 L800,100 L820,100 L840,100 L860,100 L880,100 L900,100 L920,100 L940,100 L960,100 L980,100 L1000,100 L1020,100 L1040,100 L1060,100 L1080,100 L1100,100 L1120,100 L1140,100 L1160,100 L1180,100 L1200,100"
          fill="none"
          stroke="#0F4CFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 opacity-[0.04]"
        viewBox="0 0 300 300"
      >
        <circle cx="150" cy="150" r="140" fill="none" stroke="#0F4CFF" strokeWidth="1" />
        <circle cx="150" cy="150" r="110" fill="none" stroke="#0F4CFF" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="80" fill="none" stroke="#0F4CFF" strokeWidth="0.3" />
        <path
          d="M90,150 L110,150 L120,150 L130,150 L140,150 L145,130 L148,115 L150,108 L152,115 L155,130 L160,150 L170,150 L180,150 L190,150 L210,150"
          fill="none"
          stroke="#0F4CFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heartbeat-line"
        />
      </svg>
    </div>
  );
};
