import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  const date = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <h3>© Christmas Cards Generator {date}</h3>
    </footer>
  )
};

export default Footer;