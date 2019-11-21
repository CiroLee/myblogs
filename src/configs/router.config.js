import Home from '../pages/Home';
import Categories from '../pages/Categories';
import About from '../pages/About';
export default [
    {
        path:'/',
        name:'首页',
        icon:'home',
        menu:true,
        exact:true,
        component:Home
    },
    {
        path:'/categories',
        name:'归档',
        icon:'file-text',
        menu:true,
        exact:true,
        component:Categories
    },
    {
        path:'/about',
        name:'关于',
        icon:'user-circle-o',
        menu:true,
        exact:true,
        component:About
    }
];