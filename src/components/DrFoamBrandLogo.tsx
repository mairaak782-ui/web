import React, { useState } from 'react';
import { IMAGES } from '../data/siteContent';

interface DrFoamBrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
  className?: string;
  badgeClassName?: string;
}

export const DrFoamBrandLogo: React.FC<DrFoamBrandLogoProps> = ({
  size = 'md',
  showText = true,
  lightText = true,
  className = '',
  badgeClassName = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: {
      badge: 'w-8 h-8 min-w-8',
      img: 'w-7 h-7',
      title: 'text-sm font-bold',
      sub: 'text-[9px]',
      ltd: 'text-[8px] px-1 py-0',
    },
    md: {
      badge: 'w-11 h-11 min-w-11 sm:w-12 sm:h-12 sm:min-w-12',
      img: 'w-10 h-10 sm:w-11 sm:h-11',
      title: 'text-base sm:text-lg font-bold',
      sub: 'text-[11px]',
      ltd: 'text-[9px] px-1.5 py-0.2',
    },
    lg: {
      badge: 'w-14 h-14 min-w-14 sm:w-16 sm:h-16 sm:min-w-16',
      img: 'w-13 h-13 sm:w-15 sm:h-15',
      title: 'text-xl sm:text-2xl font-bold',
      sub: 'text-xs',
      ltd: 'text-[10px] px-2 py-0.5',
    },
    xl: {
      badge: 'w-20 h-20 min-w-20 sm:w-24 sm:h-24 sm:min-w-24',
      img: 'w-19 h-19 sm:w-23 sm:h-23',
      title: 'text-2xl sm:text-3xl font-extrabold',
      sub: 'text-sm',
      ltd: 'text-xs px-2.5 py-0.5',
    },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* CIRCULAR PROFILE PIC LOGO BADGE */}
      <div
        className={`relative rounded-full bg-white p-0.5 shadow-md ring-2 ring-emerald-500/40 flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 ${sizeClasses.badge} ${badgeClassName}`}
      >
        {!imgError ? (
          <img
            src={IMAGES.logo}
            alt="Dr Foam Insulation Ltd. Official Logo"
            className={`rounded-full object-cover ${sizeClasses.img}`}
            onError={() => setImgError(true)}
            decoding="async"
          />
        ) : (
          /* SVG Fallback if image load fails */
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#16a34a" strokeWidth="2" />
              {/* Green Cross */}
              <rect x="20" y="38" width="24" height="8" rx="2" fill="#16a34a" />
              <rect x="28" y="30" width="8" height="24" rx="2" fill="#16a34a" />
              {/* Hose loop */}
              <path
                d="M 28 54 C 28 65, 40 68, 48 60 C 56 52, 48 40, 48 40"
                stroke="#16a34a"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Text */}
              <text
                x="48"
                y="46"
                fontFamily="system-ui, sans-serif"
                fontWeight="900"
                fontSize="16"
                fill="#0f172a"
              >
                DR FOAM
              </text>
              <text
                x="48"
                y="58"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
                fontSize="7"
                fill="#64748b"
              >
                Insulation Services
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* TYPOGRAPHY BRAND TEXT */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`${sizeClasses.title} tracking-tight leading-none ${
                lightText ? 'text-white' : 'text-slate-900'
              }`}
            >
              Dr Foam{' '}
              <span className="text-emerald-400 font-extrabold">
                Insulation
              </span>
            </span>
            <span
              className={`${sizeClasses.ltd} font-mono font-bold rounded ${
                lightText
                  ? 'text-emerald-300 bg-emerald-950/90 border border-emerald-800'
                  : 'text-emerald-800 bg-emerald-100 border border-emerald-300'
              }`}
            >
              LTD.
            </span>
          </div>
          <span
            className={`${sizeClasses.sub} mt-1 font-medium tracking-wide ${
              lightText ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Residential &amp; Commercial · Barrie to North Bay, ON
          </span>
        </div>
      )}
    </div>
  );
};
