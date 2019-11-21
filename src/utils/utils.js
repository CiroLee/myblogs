const utils = {
    getMenus:function(configs){
        return configs.filter(item=>item.menu)
    },
    //节流
    throttle:function(fn,delay=300){
        let last,  //上次执行的时间
            timer; //定时器
        
        return function(){
            let _this = this;
            let args = arguments;
            let now = +new Date();  //现在的时间
            if(last && now < last + delay){  //当前距离上次执行的时间小于设置的时间间隔
                clearTimeout(timer);  //清除定时器
                timer = setTimeout(function(){  //delay时间后执行函数
                    last = now;
                    fn.apply(_this,args)
                },delay);
            }
            else {  //当前距离上次执行的时间大于等于设置的时间，直接执行函数
                last = now;
                fn.apply(_this,args)
            }
        }
    },
    //防抖
    debounce:function(fn,delay=300){
        let timer;
        return function(){
            let _this = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(_this,args)
            },delay);
        }
    },
    //扁平数组
    flatten:function(array){
        while(array.some(item=>Array.isArray(item))){
            array = [].concat(...array)
        }
        return array;
    }
};

export default utils;