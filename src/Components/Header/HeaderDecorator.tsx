import React from 'react';

const HeaderDecorator: React.FC<{className: string}> = ({className}) => {
    return (
      <svg className={className} viewBox="0 0 1300 257" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 66H1300V257C1300 257 910.291 172.701 657 172C398.288 171.283 0 257 0 257V66Z" fill="#D03B3B"/>
      <path d="M0 0H1300V229C1300 229 1110.53 159.275 984.5 132.5C853.512 104.672 777.91 92.4917 644 92C505.823 91.4926 427.232 101.837 292.5 132.5C175.215 159.193 0 229 0 229V0Z" fill="#049345"/>
      <path d="M59.8955 171.554L75.3385 207.786L102.242 179.021L87.9625 176.503L107.539 148.984L93.2588 146.466L112.835 118.947L91.6614 115.214L70.488 111.481L79.4715 144.035L65.1918 141.517L74.1752 174.072L59.8955 171.554Z" fill="#047902" stroke="#F3FFF9"/>
      <path d="M277.595 95.031L238.496 90.289L249.956 127.971L259.276 116.863L273.32 147.576L282.64 136.468L296.684 167.181L310.504 150.711L324.324 134.241L291.639 125.744L300.96 114.636L268.275 106.139L277.595 95.031Z" fill="#047902" stroke="#F3FFF9"/>
      <g filter="url(#filter0_d)">
      <path d="M1024.04 127.971L1035.5 90.289L996.405 95.031L1005.73 106.139L973.041 114.636L982.361 125.744L949.676 134.241L963.496 150.711L977.316 167.181L991.36 136.468L1000.68 147.576L1014.72 116.863L1024.04 127.971Z" fill="#047902"/>
      <path d="M1024.04 127.971L1035.5 90.289L996.405 95.031L1005.73 106.139L973.041 114.636L982.361 125.744L949.676 134.241L963.496 150.711L977.316 167.181L991.36 136.468L1000.68 147.576L1014.72 116.863L1024.04 127.971Z" stroke="#F3FFF9"/>
      </g>
      <path d="M1188.76 179.021L1215.66 207.786L1231.1 171.554L1216.82 174.072L1225.81 141.517L1211.53 144.035L1220.51 111.481L1199.34 115.214L1178.16 118.947L1197.74 146.466L1183.46 148.984L1203.04 176.503L1188.76 179.021Z" fill="#047902" stroke="#F3FFF9"/>
      <path d="M671 50L649.5 17L628 50L642.5 50L628 80.5H642.5L628 111L649.5 111H671L656.5 80.5L671 80.5L656.5 50L671 50Z" fill="#047902" stroke="#F3FFF9"/>
      <defs>
      <filter id="filter0_d" x="944.7" y="72.5236" width="109.919" height="103.685" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
      </defs>
      </svg>
    )
}

export default HeaderDecorator;