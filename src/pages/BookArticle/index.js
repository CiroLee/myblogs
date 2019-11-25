import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import Code from '@/components/Code';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { Desktop , Mobile } from '@/components/MediaQuery';
import { getArticle } from '@/service/article';
import Catalog from '@/components/Catalog';
import Drawer from '@/components/Drawer';
import style from './index.module.less';

const mapStateToProps = state => {
    return { articlelist:state.article.list}
}

const BookArticle = props => {
    const [content,setContent] = useState(null);
    const [drawerVisible,setDrawerVisible] = useState(false)
    useEffect(()=>{
        if(!props.articlelist.length){
            props.dispatch({type:'article/articleList'});
        }
        renderArticle();
    });
    //渲染文章
    const renderArticle = ()=>{
        let url = props.location.search.split('=')[1];
        if(url === undefined && getBookList(props.match.params.id)[0]){
          url = getBookList(props.match.params.id)[0];
          url = decodeURIComponent(url.url);
        }
        if(url){
            getArticle(url).then(resp=>{
                setContent(resp)
            })
        }
    }
    //根据路由参数获取booklist,渲染目录
    const getBookList = id => {
        let articlelist = props.articlelist;
        return articlelist.filter(item=>item.books.id === id).sort((a,b)=>a.books.index - b.books.index);
    }
    
    return (
      <div className={style["bookarticle-wrapper"]}>
        <Desktop>
          <div className={style["pc-catalog-wrapper"]}>
            <Catalog
              source={getBookList(props.match.params.id)}
              className={style.catalog}
            />
          </div>
        </Desktop>
        <div className={style.content}>
          <div className={style.goback}>
            <Link to="/books">
              <Icon
                type="long-arrow-left"
                style={{ fontSize: 22, cuscor: "pointer" }}
              />
            </Link>
            <Mobile>
              <Icon type="bars" style={{ fontSize: 22 }} onClick={()=>{setDrawerVisible(true)}} />
            </Mobile>
          </div>
          {content && (
            <div className={style.article}>
              <ReactMarkdown
                source={content}
                escapeHtml={false}
                renderers={{
                  code: Code
                }}
              />
            </div>
          )}
        </div>
        <Mobile>
          <Drawer
            visible={drawerVisible}
            onClose={()=>{setDrawerVisible(false)}}
            sider={
              <Catalog source={getBookList(props.match.params.id)} className={style['mobile-catalog']} />
            }
          />
        </Mobile>
        <Footer />
      </div>
    );
}

export default connect(mapStateToProps)(BookArticle);