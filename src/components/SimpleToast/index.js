import React from 'react';
import reactDOM from 'react-dom';
import Icon from '@/components/Icon';
import style from './index.module.less';

const Status = {
    default:{
        type:'info',
        color:'#177fda'
    },
    success:{
        type:'check',
        color:'#5ddc36'
    },
    warning:{
        type:'warning',
        color:'#f5a623'
    },
    error:{
        type:'close',
        color:'#ff0000'
    }
}
//显示的toast组件
const Notice =  props => {
    const { type } = props;
    const getStatus = status => {
        return Status[status] ? Status[status] :Status.default
    }

    return (
        <div className={style['toast-wrapper']}>
            <Icon type={getStatus(type).type} style={{color:getStatus(type).color}} />
            <span>{props.value}</span>
        </div>
    );
}


class Toast {
    constructor(){
        this.dom = null;
    }
    _create(type,value,delay=2000){
        if(this.dom) return false;

        let div = document.createElement('div');
        document.body.appendChild(div);
        this.dom = div;
        reactDOM.render(<Notice type={type} value={value} />,div);
        setTimeout(() => {
            reactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            this.dom = null;
        }, delay + 500);
    }
    info(value,delay=3000){
        this._create('info',value,delay)
    }
    warning(value,delay=3000){
        this._create('warning',value,delay)
    }
    success(value,delay=3000){
        this._create('success',value,delay)
    }
    error(value,delay=3000){
        this._create('error',value,delay)
    }
}

export default new Toast();