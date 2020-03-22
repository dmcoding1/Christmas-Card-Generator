import React from 'react';
import './Header.scss';
import HeaderDecorator from './HeaderDecorator';
import HeaderSeparator from './HeaderSeparator';

const Header: React.FC = () => {
    return (
        <header className="header">
            <HeaderDecorator className="header__decorator"/>
            <h1 className="header__title">Christmas Cards Generator</h1>
            <p className="header__subtitle">let them know it's Christmas Time</p>
            <HeaderSeparator className="header__separator"/>
        </header>
    )
};

export default Header;