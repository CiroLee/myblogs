import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import style from "./index.module.less";
import "./style.less";
export default props => {
    const { visible,onClose=null } = props;
    useEffect(()=>{
      if(visible){
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = null;
      }
    });
  return (
    <CSSTransition in={visible} unmountOnExit classNames='drawer-group' timeout={500}>
      <div className={style["drawer-mask"]} onClick={onClose}>
        <div className={style.sider}>{props.sider}</div>
      </div>
    </CSSTransition>
  );
};
