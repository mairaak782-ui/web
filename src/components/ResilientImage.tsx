import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-slate-900',
  loading = 'eager',
  priority = false,
  fallbackTitle = 'Houston Insulation Service',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasError(false);
    // If the browser already has the image cached in memory, mark loaded immediately to prevent any flash
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <>
          {!isLoaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse"
            />
          )}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : loading}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-opacity duration-200 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200"
        >
          <div className="w-12 h-12 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center justify-center mb-3 text-orange-400">
            <Layers className="w-6 h-6" aria-hidden="true" />
          </div>
          <p className="font-editorial text-sm font-medium text-white max-w-xs">{fallbackTitle}</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">{alt}</p>
        </div>
      )}
    </div>
  );
};
