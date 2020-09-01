import React from 'react';

import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={ styles.h + ' main-header' }>
            <div className={ styles.hLogo }>
                Airi Note
            </div>

            <div>
                <button>Login</button>
            </div>
        </header>
    )
}

export default Header;