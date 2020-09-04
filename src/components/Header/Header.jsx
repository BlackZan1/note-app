import React, { Fragment, useState } from 'react';
import { Button } from 'antd';

import Login from '../Modal/Login';
import Signup from '../Modal/Signup';

import styles from './Header.module.css';

const Header = ({ setUserData }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const toggleMode = (type) => {
        if(type === 'login') {
            setIsLogin(true);
            setIsSignup(false);
        }
        else if(type === 'signup') {
            setIsLogin(false);
            setIsSignup(true);
        }
        else {
            setIsLogin(false);
            setIsSignup(false);
        }
    }

    return <Fragment>
        <header className={ styles.h + ' main-header' }>
            <div className={ styles.hLogo }>
                Airi Note
            </div>

            <div className={ styles.hAuth }>
                <Button onClick={() => toggleMode('login')}>Login</Button>

                <Button onClick={() => toggleMode('signup')}>Signup</Button>
            </div>
        </header>

        <Login setUserData={setUserData} toggleMode={toggleMode} isVisible={isLogin} />

        <Signup setUserData={setUserData} toggleMode={toggleMode} isVisible={isSignup} />
    </Fragment>
}

export default Header;