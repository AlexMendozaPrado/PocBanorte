interface BanorteLogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'red' | 'white';
}

export default function BanorteLogo({ className = "", width = 120, height = 32, variant = 'red' }: BanorteLogoProps) {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ width, height }}>
      {/* Símbolo simple */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: height,
          height: height,
          backgroundColor: isWhite ? 'rgba(255, 255, 255, 0.2)' : '#EB0029',
          minWidth: height,
          border: isWhite ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: height * 0.4,
            height: height * 0.4,
            backgroundColor: isWhite ? '#FFFFFF' : '#FFFFFF'
          }}
        />
      </div>

      {/* Texto BANORTE */}
      <span
        className="font-bold tracking-wider"
        style={{
          color: isWhite ? '#FFFFFF' : '#EB0029',
          fontSize: height * 0.5,
          lineHeight: 1,
          fontFamily: 'Arial, sans-serif',
          textShadow: isWhite ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        BANORTE
      </span>
    </div>
  );
}
