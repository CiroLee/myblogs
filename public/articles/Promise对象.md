## Promise对象     

### 1 Promise的含义    

Promise是一种异步编程的解决方案。     

简单说，Promise就是一个容器，里面存放的是未来才会结束的事件(通常是一个异步操作)的结果。     

语法上，Promise是一个*对象*，从它可以获取异步操作的信息。     

#### 1.1 Promise对象的特点    

1. 对象的状态不受外界影响。Promise对象有三种状态：**Pending（进行中）**,**Fulfilled(已成功)**和**Rejected(已失败)**。只有异步操作的结果可以决定当前是那一种状态，其他任何操作都无法改变这个状态。        
2. 一旦状态改变就不会再变，任何时候都可以得到这个结果。Promise对象的状态只有两种可能：从Pending变为Fulfilled和从Pending变为Rejected。    

#### 1.2 Promise的缺点    

1. 无法取消Promise。一旦新建就会立即执行，无法中途取消。    
2. 如果不设置毁掉函数，Promise内部抛出的错误不会反应到外部。     
3. 当处于Pending状态时，无法得知目前进展到哪一个阶段。

### 2 基本用法    

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。        

```javascript 
var promise = new Promise(function(resolve,reject){
  //...code 
  if(/*异步成功*/){
     resolve(value)
  } else {
     reject(error)
  }
});
```

Promise构造函数接受一个函数作为参数，它接受连个参数resolve和reject。    

**resolve**函数的作用是，将Promise对象的状态从“未完成”变为“成功”(Pending==>Resolved)，在异步操作成功时调用，并将异步操作的结果作为参数传递出去；    

**reject**函数的作用是，将Promise对象的状态从“未完成”变为“失败”(Pending==>Rejected)，在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。    

#### 2.1 Promise新建之后就会立即执行     

```javascript
let promise = new Promise(function(resolve,reject){
  console.log('Promise');
  resolve();
});
promise.then(function(){
  console.log('Resolved');
});
console.log('Hi');

//Promise
//Hi
//Resolved
```

ps：涉及到的面试题：**事件循环机制**    

#### 2.2 resolve和reject函数携带的参数会被传递给回调函数。    

reject函数的参数通常是Error对象的实例，表示抛出错误。resolve函数的参数除了正常值外，还可以是评一个Promise对象。    

```javascript
var p1 = new Promise(function(resolve,reject){
  //...
});
var p2 = new Promise(function(resolve,reject){
  //...
  resolve(p1);
});
```

这时候，p1的状态就会传递p2。即p1的状态决定了p2的状态。如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是Resolved或Rejected，那么p2的回调函数将会立即执行。    

#### 2.3 调用resolve或reject并不会总结Promise的参数函数的执行。    

```javascript
new Promise((resolve,reject)=>{
  resolve(1);
  console.log(2);
}).then(r=>{
  console.log(r)
});

//2
//1
```

*小技巧*：一般来讲，调用resolve或者reject后，Promise的任务就结束了，后续的方法应该放在then方法里，而不是应该直接写在resolve和reject的后边，因此，最好在它们前面加上return；    

```javascript
new Promise((resolve,reject)=>{
  return resolve(1);
  //后面的语句不会执行
  console.log(2)
})
```

### 3 Promise.prototype.then()     

then方法可以接收两个函数参数，第一个函数参数是Resolved状态的回调函数，第二个参数(可选)是Rejected状态的回调函数。then方法会返回一个**新的Promise实例**，因此可以采用链式写法。    

```javascript
getJSON(xxx).then(function(json){
  return json.post
}).then(function(post){
  //...
})
```

### 4 Promise.prototype.catch()    

Promise.prototype.catch方法是.then(null,rejection)的别名，用于指定发生错误时的回调函数。     

then方法指定的回调函数如果在运行中抛出错误，也会被catch方法捕获。     

```javascript
var promise = new Promise(function(resolve,reject){
  throw new Error('test');
})
promise.catch(function(error)=>{
  console.log(error)
});

//Error:test
```

Promise对象的错误具有 “冒泡” 性质，会一直向后传递，直到被捕获为止。也就是说，错误时会被下一个catch语句捕获。       

```javascript
getJSON(xxx.json).then(function(post){
  return getJSON(post.commentURL);
}).then(function(comments){
  //...
}).catch(function(error){
  //处理前面3个Promise产生的错误
})
```

 **小技巧**：一般来讲，不要在then方法中定义Rejected状态的回调函数(then的第二个参数)，而是总是使用catch方法。       

```javascript
//bad
promise.then(function(data){
  //success
},function(error){
  //error
});

//good
promise.then(function(data){
  //success
}).catch(function(error){
  //error
})
```

第二种写法可以捕获前面then方法执行中的错误，也更接近同步(try/catch)方法。

需要注意的是，catch方法返回的还是Promise对象，因此后面还可以接着调用then方法。    

### 5 Promise.all()     

Promise.all方法用于将多个Promise实例包装成一个新的Promise实例。      

```javascript
var p = Promise.all([p1,p2,p3])
```

Promise.all方法接收一个数组(具有Iterator接口的数据)，数组元素都是Promise对象的实例，如果不是，就会先调用Promise.resolve方法将参数转换为Promise实例，再进一步处理。       

p的状态有p1,p2,p3决定，分为两种情况：    

1. 只有p1，p2，p3的状态都编程Fulfilled，p的状态才会变成Fulfilled，此时p1，p2，p3的返回值组成一个数组，传递给p的回调函数。     
2. 只要p1，p2，p3中有一个Rejected，p的状态就变成Rejected，此时**第一个被Rejected的实例**的返回值会传递给p的回调函数。    

如果作为参数的Promise实例自身定义了catch方法，那么他被rejected时并不会触发Promise.all()的catch方法。      

```javascript
const p1 = new Promise((resolve,reject)=>{
  resolve('hello');
})
.then(result=>result)
.catch(e=>e);

const p2 = new Promise((resolve,reject)=>{
  throw new Error('报错了');
})
.then(result=>result)
.catch(e=>e)

Promise.all([p1,p2])
.then(result=>{console.log(result)})
.catch(e=>{console.log(e)});

//['hello',Error:报错了]
```

### 6. Promise.trace()    

Promise.trace方法的参数与Promise.all方法一样。    

```javascript
var p = Promise.trace([p1,p2,p3])
```

不同的是，只要p1，p2，p3中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值就传递给p的回调函数。       

下边的例子，如果指定时间内没有获得结果，就会将Promise的状态变为Rejected，否则变为Resolveed。    

```javascript
const p = Promise.reace([
  fetch('/resource-that-my-take-a-while'),
  setTImeout(()=>reject(new Error('request timeout')),5000)
]);
```

### 7. Promise.resolve()    

Promise.resolve方法的作用之一就是将现有的对象转换为Promise对象。      

#### 7.1 参数是一个Promise     

如果参数是一个Promise实例，那么Promise.resolve将不做任何修改，原封不动返回这个实例。    

#### 7.2 参数是一个thenable对象    

thenable对象指的是具有then方法的对象，如：    

```javascript
let thenable = {
  then:function(resolve,reject){
    resolve(42)
  }
}

let p1 = Promise.resolve(thenable);
p.then(function(value){
  console.log(value) //42
})
```

  Promise.resolve方法会将这个对象转换为Promise对象，然后**立即执行**thenable对象的then方法。

#### 7.3 参数不是具有then方法的对象或根本不是对象    

Promise.resolve方法会返回一个新的Promise对象，状态为Resolved。    

```javascript
var p = Promise.resolve('hello');
p.then(function(s)=>{
    console.log(s)  
});
//hello
```

#### 7.4 不带任何参数，会返回一个Resolve的状态的Promise对象               

### 8.Promise.reject()    

Promise.reject()方法会返回一个新的Promise实例，状态为Rejected。         

**注意：** Promise.reject()方法的参数会原封不动地作为reject的理由变成后续方法的参数。    

### 9. 一个例子        

加载图片：将图片的加载写成一个Promise，一旦加载完成，Promise的状态就会发生变化。     

```javascript
const preLoadImage = function(path){
  return new Promise(function(resolve,reject){
    var image = new Image();
    image.onload = resolve;
    image.error = reject;
    image.src = path;
  });
}
```



  

