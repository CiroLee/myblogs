import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import utils from '@/utils/utils';
import routerConfigs from '@/configs/router.config.js';
import style from './index.module.less';
const { getMenus } = utils;

export default withRouter(props => {
    //匹配路由
    const matchPath = (path,style)=>{
        let pathname = props.location.pathname;
        return path === pathname ? style : ''
    }
    
    return (
        <div className={`${style.navigation} ${props.className}`} >
            {getMenus(routerConfigs).map(item=>(
                <Link key={item.path} to={item.path} className={matchPath(item.path,style.match)}>{item.name}</Link>
            ))}
        </div>
    );
});