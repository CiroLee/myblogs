import React, { useState, useEffect } from 'react';
import Tag from '@/components/Tag';
import ArticleItem from '@/components/ArticleItem';
import { connect } from 'react-redux';
import utils from '@/utils/utils';
import style from './index.module.less';
const { flatten } = utils;

const mapStateToProps = state => {
    return { articlelist: state.article.list}
}
const Categories = props => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{
        if(!props.articlelist.length){
            props.dispatch({type:'article/articleList'});
        }
    });
    //get tags 
    const getTags = articlelist => {
        let tags = [];
        articlelist.forEach(item=>{
            if(Array.isArray(item.categories)){
                tags.push(item.categories);
            }
        });
        tags = [...new Set(flatten(tags))]; //去重
        return tags;
    }

    //tag点击事件
    const handleTagOnClick = tag => {
        let articles = props.articlelist.filter(item=>item.categories.includes(tag));
        setArticles(articles)
    }

    return (
        <div className={`global-wrapper`}>
            <div className={style['tag-wrapper']}>
                {getTags(props.articlelist).map(item=>(
                    <Tag key={item} value={item} size='middle' hover={true} onClick={()=>{handleTagOnClick(item)}} />
                ))}
            </div>
            <div className={style['articles-list']}>
                {articles.map(item=>(
                    <ArticleItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Categories);

