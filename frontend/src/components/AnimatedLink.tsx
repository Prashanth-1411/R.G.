import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useAnimatedNavigation } from './NavigationContext';

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, onClick, children, ...props }) => {
  const { navigateWithAnimation } = useAnimatedNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigateWithAnimation(to as string);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
