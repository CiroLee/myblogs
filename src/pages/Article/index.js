import React,{ useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import Code from '@/components/Code';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/Footer';
import { getArticle } from '@/service/article';
import style from './index.module.less';
export default props => {
    const [content,setContent] = useState(null);
    useEffect(()=>{
        let url = decodeURIComponent(props.match.params.url);
        renderArticle(url)
    },[]);
    //渲染文章
    const renderArticle = url=>{
        getArticle(url).then(resp=>{
            setContent(resp)
        })
    }

    //返回
    const goBack = ()=>{
        props.history.goBack();
    }
    
    return (
      <div>
        <div className={`${style["article-wrapper"]} global-wrapper`}>
          <div className={style.goback} onClick={goBack}>
            <Icon type="long-arrow-left" style={{ fontSize: 22 }} />
          </div>
          <div className={style["article-markdown"]}>
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{
                code: Code
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
}