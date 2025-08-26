interface BanorteLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function BanorteLogo({ className = "", width = 120, height = 32 }: BanorteLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ width, height }}>
      {/* Símbolo simple */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: height,
          height: height,
          backgroundColor: '#C41E3A',
          minWidth: height
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: height * 0.4,
            height: height * 0.4
          }}
        />
      </div>

      {/* Texto BANORTE */}
      <span
        className="font-bold tracking-wider"
        style={{
          color: '#C41E3A',
          fontSize: height * 0.5,
          lineHeight: 1,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        BANORTE
      </span>
    </div>
  );
}
