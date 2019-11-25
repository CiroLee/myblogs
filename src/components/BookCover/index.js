import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.less';
const BookCover = props => {
    const { title, abstract, bookId, type='default'} = props;
    return (
        <Link to={`/books/${bookId}`} className={style['bookcover-wrapper']}>
            <div className={`${style['cover-img']} ${style[type]}`}>
                <span>{title}</span>
            </div>
            <div className={style.main}>
                <p className={style.title}>{title}</p>
                <p className={style.abstract}>{abstract}</p>
            </div>
        </Link>
    );
}

export default BookCover;