import React,{ useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import * as models from './models';
import Layout from './layout';
import Article from './pages/Article';
import BookArticle from './pages/BookArticle';
import Icon from './components/Icon';
import routerConfigs from '@/configs/router.config.js';
import utils from '@/utils/utils';
const { throttle } = utils;

const store = init({ models })

//获取路由
function getRoutes(routes){
    return routes.map(item=>(
        <Route key={item.path} path={item.path} exact={item.exact} component={item.component} />
    ))
}
const BasicRoute = () => {
  const [showRollUp,setShowRollUp] = useState(false)
  useEffect(()=>{
    document.addEventListener('scroll',throttle(toggleRollUp),false)
  },[]);
  
  //toggle rollup button
  const toggleRollUp = ()=>{
    let scrollToTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollToTop > 500){
      setShowRollUp(true);
    } else {
      setShowRollUp(false)
    }
  }
  //返回顶部函数
  const backToTop = () => {
    document.documentElement.scrollTop-=80;
    if(document.documentElement.scrollTop  > 0){
      window.requestAnimationFrame(backToTop);
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/article/:url" exact={true} component={Article} />
          <Route path='/books/:id' exact={true} component={BookArticle} />
          <Layout>{getRoutes(routerConfigs)}</Layout>
        </Switch>
        {
          showRollUp && <div className='rollup' onClick={()=>{backToTop()}}><Icon type='arrow-up' /></div>
        }
      </Router>
    </Provider>
  );
}

export default BasicRoute;