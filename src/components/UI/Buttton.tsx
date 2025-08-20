import React from 'react';
import '../../styles.css';

type ButtonColor = 'blue' | 'red';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
}

interface FileUploadButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: ButtonColor;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  color = 'blue',
  children,
  className = '',
  ...props 
}) => (
  <button className={`jare-button ${color} ${className}`} {...props}>
    {children}
  </button>
);

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ 
  color = 'blue',
  children,
  className = '',
  ...props 
}) => (
  <label className={`jare-button ${color} ${className}`}>
    {children}
    <input type="file" className="jare-file-input" {...props} />
  </label>
);