import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ArticleItem from '@/components/ArticleItem';
import Pagination from '@/components/Pagination';
import style from './index.module.less';

const mapStateToProps = state =>{
    return {articlelist:state.article.list}
}

const Home = props => {
    const [current,setCurrent] = useState(1);
    useEffect(()=>{
        if(props.articlelist.length === 0 ){
            props.dispatch({type:'article/articleList'});
        }
    });
    
    //分页点击事件
    const handleOnChange = value => {
        setCurrent(value)
    }
    //渲染文章，截取size=5条, 实际上这部分是后端做的
    const renderArticleList = (current=1,size=5) => {
        let start = (current - 1) * size,
            end = current > 1 ? current + size : current + size - 1;
        let list = props.articlelist.slice(start,end);

        return list;
    }
    return (
        <div className={`global-wrapper ${style['home-wrapper']}`}>
            {renderArticleList(current).map(item=>(
                <ArticleItem key={item.id} {...item} />
            ))}
            <div className={style.pagination}>
                <Pagination onChange={handleOnChange} current={1} total={props.articlelist.length} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Home);