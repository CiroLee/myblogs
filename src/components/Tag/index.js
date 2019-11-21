import React from 'react';
import style from './index.module.less';

export default props => {
    return (
        <div        
          className={`${style['tag-wrapper']} ${style[props.size]}`}
          style={{pointerEvents:props.hover ? 'auto':'none'}} 
          onClick={props.onClick} 
        >
          {props.value}
        </div>
    )
}
