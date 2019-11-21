import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Icon from '@/components/Icon';
import utils from '@/utils/utils';
import routerConfigs from '@/configs/router.config.js';
import style from './index.module.less';
const { getMenus } = utils;

export default withRouter(props => {
  const [showMenu,setShowMenu] = useState(false);
  //匹配路由
    const matchPath = (path,style)=>{
      let pathname = props.location.pathname;
      return path === pathname ? style : ''
    }

    const toggleMenu = ()=>{
      setShowMenu(!showMenu);
    }

    return (
      <div>
        <header className={style['mobile-header']}>
          <Icon type="navicon" className={style.menu} onClick={toggleMenu} />
        </header>
        <div className={style['menulist-wrapper']}>
        <CSSTransition in={showMenu} unmountOnExit classNames='mobile-list-group' timeout={300}>
            <div className={style.menulist}>
              {getMenus(routerConfigs).map(item=>(
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={matchPath(item.path,style.match)} 
                  onClick={()=>{setShowMenu(false)}}
                  >
                    <Icon type={item.icon} configs='fa-fw' />
                    <div>{item.name}</div>
                </Link>
              ))}
            </div>
          </CSSTransition>
        </div>
      </div>
    );
});