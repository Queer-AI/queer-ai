import React from 'react';
import { content } from './style.scss';

export const Content = ({ align, children, className, inline, ...props }) => (
  <div className={`${content} ${className || ''} ${inline ? 'has-inline' : 'block'}`} {...props}>
    <div className={`${inline ? 'inline' : 'block'} ${align}`}>
      {children}
    </div>
  </div>
);
