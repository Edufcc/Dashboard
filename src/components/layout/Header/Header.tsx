import React from 'react';

import style from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <h1>Dashboard do meu site pessoal</h1>
            </div>
        </header>
    );
};

export default Header;