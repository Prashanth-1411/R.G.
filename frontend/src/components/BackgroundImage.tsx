import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  hoverScale?: boolean;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt = '',
  className = '',
  overlayClassName = 'bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent',
  children,
  hoverScale = true,
}) => (
  <div className={`relative overflow-hidden ${className}`} role="img" aria-label={alt}>
    <div
      className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out ${hoverScale ? 'group-hover:scale-110' : ''}`}
      style={{ backgroundImage: `url(${src})` }}
    />
    {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    {children}
  </div>
);

interface BackgroundCardProps {
  imageSrc: string;
  title: string;
  description?: string;
  imageHeight?: string;
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundCard: React.FC<BackgroundCardProps> = ({
  imageSrc,
  title,
  description,
  imageHeight = 'h-56',
  children,
  className = '',
}) => (
  <motion.div className={`group premium-card overflow-hidden ${className}`}>
    <BackgroundImage
      src={imageSrc}
      alt={title}
      className={imageHeight}
      overlayClassName="bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"
    >
      {children}
    </BackgroundImage>
    {(title || description) && (
      <div className="p-5">
        {title && (
          <h4 className="font-bold text-navy-800 text-base font-display group-hover:text-brand-600 transition-colors">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-xs text-navy-400 mt-1 leading-normal">{description}</p>
        )}
      </div>
    )}
  </motion.div>
);
