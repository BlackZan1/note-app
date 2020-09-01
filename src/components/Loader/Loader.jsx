import React from 'react';
import { Spin } from 'antd';

const styles = {
    bigLoader: {
        position: 'absolute', 
        top: '0', 
        left: '0', 
        right: '0', 
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export const BigLoader = () => {
    return (
        <div style={ styles.bigLoader }>
            <Spin size={'large'} />
        </div>
    )
}