import React from 'react';
import { Desktop, Mobile } from '@/components/MediaQuery';
import PCHeader from './PCHeader';
import MobileHeader from './MobileHeader';
import Footer from '@/components/Footer';
import style from './index.module.less';
export default props => {
    return (
        <div>
            <Desktop>
                <PCHeader />
            </Desktop>
            <Mobile>
                <MobileHeader />
            </Mobile>
            <div className={style.content}>{props.children}</div>
            <Footer />
        </div>
    );
}