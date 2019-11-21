import { getArticleList } from '@/service/article';

export default {
    state:{
        list:[]
    },
    reducers:{
        save(state,payload){
            return {...state,...payload}
        }
    },
    effects:{
        async articleList(payload,state){
            let result = await getArticleList();
            this.save({list:result.data})
        }
    }
}