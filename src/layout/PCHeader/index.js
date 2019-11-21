import React from 'react';
import Navigation from '@/components/Navigation';
import style from './index.module.less'
export default props => {
    return (
        <header className={style['pc-header']}>
            <Navigation className={style['nav-wrapper']} />
        </header>
    );
}