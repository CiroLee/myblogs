import React, { useState,useEffect } from 'react';
import Icon from '@/components/Icon';
import style from './index.module.less';
export default props => {
    const { current = 1,total = 0,size=5 } = props;
    const [paginations,setPaginations] = useState({
        current:current,  //当前页
        total:total,   //总页数
        size:size,     //每页显示size条
        dot:0
    });
    useEffect(()=>{
        setPaginations(preState=>({
            ...preState,
            current,
            total
        }));
    },[current,total]);
    //创建页码数组 
    const createPaginationItems = (size,dot) => {
        size = Math.ceil(paginations.total / size);
        let arr = [];
        for(let i = 0; i < size;i++){
            arr.push(i+1+dot);
        };
        return arr;
    }
    //分页change
    const handleOnchange = value => {
        setPaginations(preState=>({
            ...preState,
            current:value
        }));
        if(props.onChange){
            props.onChange(value)
        }
    }
    //上一页,下一页
    const handlePrevOrNext = type => {
        let current = paginations.current;
        if(type < 0 && paginations.current > 0){
            --current;
            setPaginations(preState=>({
                ...preState,
                dot:preState.current % preState.size === 1 ? preState.dot - paginations.size : preState.dot,
                current:current
            }))
        }
        if(type > 0 && paginations.dot < Math.abs(paginations.total - paginations.size)){
            ++current;
            setPaginations(preState=>({
                ...preState,
                dot:current % preState.size ===1 ? preState.dot + paginations.size : preState.dot ,
                current:current
            }));
        };
        props.onChange(current)
    }
    return (
       paginations.total > size ?    //小于一页时，不显示分页
        <div className={style['pagination-wrapper']}>
            <button 
                className={style.prev} 
                onClick={()=>{handlePrevOrNext(-1)}} 
                disabled={paginations.current <= 1}
                style={{cursor:paginations.current > 1 ? 'pointer':'not-allowed'}}
            >
            <Icon type='angle-left' />
            </button>
            <div className={style['pagination-items']}>
                {createPaginationItems(paginations.size,paginations.dot).map((item,index)=>(
                    <span 
                        className={`style['page-item'] ${item === paginations.current ? style.active:''}`} 
                        key={index}
                        onClick={()=>{handleOnchange(item)}}
                    >
                    {item}
                    </span>
                ))}
            </div>
            <button 
                className={style.next} 
                onClick={()=>{handlePrevOrNext(+1)}}
                disabled={paginations.current >= paginations.total}
                style={{cursor:paginations.current < paginations.total ? 'pointer':'not-allowed'}}
            >
                <Icon type='angle-right' />
            </button>
        </div>
        :null
    );
}