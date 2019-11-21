import http from '@/utils/http';

//获取文章列表
export const getArticleList = data => http({
    url:'api/article_list.json',
    method:'get',
    data:data
});

//获取文章
export const getArticle = url => http({
    url:`articles/${url}`,
    method:'get'
});