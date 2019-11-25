import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import style from './index.module.less';
const Catalog = props => {
    const { className,source=[] } = props;
    const toggleActiveItem = url => {
       let _url = props.history.location.search.split('=')[1];
       return url === decodeURIComponent(_url) ? style['item-active']:null
    }

    return (
        <div className={`${style['catalog-wrapper']} ${className}`}>
            {
                source.map(item=>(
                    <Link key={item.id} to={`${props.location.pathname}?url=${item.url}`} className={`${style['catalog-item']} ${toggleActiveItem(item.url)}`}>
                        <span className={style['item-number']}>{item.books.index}</span>
                        <span className={style['item-name']}>{item.title}</span>
                    </Link>
                ))
            }
        </div>
    );
}

export default withRouter(Catalog);