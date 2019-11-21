import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/Icon';
import Tag from '@/components/Tag';
import style from './index.module.less';
export default props => {
    return (
        <Link to={`/article/${props.url}`} className={style['item-wrapper']}>
            <div className={style.header}>
                <div className={style['header-item']}>
                    <Icon type='clock-o' style={{marginRight:4}} />
                    {props.publish_date}
                </div>
                <div className={style['header-item']} style={{marginLeft:4}}>
                    {props.categories.map((item,index)=>(
                        <Tag key={index} value={item} />
                    ))}
                </div>
            </div>
            <div className={style['item-info']}>
                <div className={style['info-left']}>
                    <div className={style.title}>{props.title}</div>
                    <div className={style.abstract}>{props.abstract}</div>
                </div>
            </div>
            <div className={style['item-footer']}>
                <span>阅读全文</span>
                <Icon type='angle-down' style={{marginLeft:4}} />
            </div>
        </Link>
    );
}