import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import Icon from '@/components/Icon';
import Toast from '@/components/SimpleToast';
import QRCodeModal from '@/components/QRCodeModal'
import style from './index.module.less';
export default props => {
    const [show,setShow] = useState(false);
    const copyUrl = ()=>{
        copy(window.location.href);
        Toast.success('复制链接成功！');
    }
    return (
        <div className={style['footer-wrapper']}>
            <Icon type='wechat' className={style.icon} onClick={()=>{setShow(true)}} />
            <Icon type='chain' className={style.icon} onClick={copyUrl} />
            <a href="https://github.com/CiroLee" target='_blank' rel="noopener noreferrer" >
                <Icon type='github-square' className={style.icon} />
            </a>
            <QRCodeModal show={show} value={window.location.href} onClose={()=>{setShow(false)}} />
        </div>
    );
}