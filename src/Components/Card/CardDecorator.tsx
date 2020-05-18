import React from 'react';

const CardDecorator: React.FC<{className: string}> = ({className}) => {
    return (
        <svg width="78" height="85" viewBox="0 0 78 85" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_c)">
                <rect width="26.2674" height="61.5042" rx="13.1337" transform="matrix(0.692158 0.721746 -0.692158 0.721746 51.7091 0)" fill="#6015BE"/>
                <rect width="26.2674" height="46.7688" rx="13.1337" transform="matrix(0.692158 0.721746 -0.692158 0.721746 59.8187 31.5162)" fill="#6015BE"/>
            </g>
            <defs>
                <filter id="filter0_c" x="0.463623" y="1.55273" width="72.2112" height="81.1243" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dx="-10"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

export default CardDecorator;