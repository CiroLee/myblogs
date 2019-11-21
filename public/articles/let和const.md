## let和const命令   

### 1. let命令    

#### 1.1 基本用法    

Let用于生命变量，用法类似于var。<u>但是所声明的变量只在let命令的**代码块**内有效。   

**面试题**  for循环计数，以下代码最后输出为10：

```javascript
var a = [];
for(var = 0; i < 10; i++){
  a[i] = function(){
    console.log(i);
  }
}

a[6]();    //10
```

  **因为**，上面的代码中，使用var生命了变量i，在<u>全局范围内有效</u>，所以全局只有一个变量i，每次循环，变量i的值都会发生变化，而循环内，被赋给数组a的函数内部的console.log(i)中的i指向全局i，即所有数组a的成员中的指向的都是同一个i，导致运行时输出的是最后一轮的值，也就是10。

使用let,声明的变量仅在**块级作用域**内有效，最终输出6：

```javascript
var a = [];
for(let = 0; i < 10; i++){
  a[i] = function(){
    console.log(i);
  }
}

a[6]();    //6
```

**这是因为**，变量是使用let声明的，当前的i只在本轮循环中有效。所有每一次循环的i其实都是一个新的变量。Ps：虽然每次循环i都是新的变量，但是Javascript引擎会记住上一轮循环的值，初始化本轮的变量时，就在上一轮的基础上进行计算。

note：手写面试题常常会出这道题，结果估计都知道(即使没做过，也听说过呀~~)，但是面试面试时，往往会深究一下这道题的原理，也就是块级作用域了，把上边的话记住就可以啦。

#### 1.2 不存在变量提升   

var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。

*note：简单阐述一下什么是变量的声明*：

```javascript
/**
  *变量的使用过程：变量声明==>变量赋值==>变量调用
*/
//方式1 声明和赋值不分离
var a = 123;
alert(a);
//方式2 声明和赋值分开
var a;
a = 123;
alert(a);
```

let命令纠正了这一现象，规定，let声明的变量一定要在声明后使用，否则会报错。

**面试题** 报什么错误？😅...

```javascript
console.log(a);  //报错ReferenceError
let a = 123;
```

#### 1.3 暂时性死区   

ES6规定，如果区块中存在let和const命令，那么这个区块对这些命令声明的变量从一开始就形成封闭的作用域，**只要在声明之前使用这些变量，就会报错**。    

**总之，在代码块内，使用let或const命令声明变量之前，该变量都是不可用的。语法上称之为“暂时性死区”**。     

#### 1.4 不允许重复声明   

let不允许在**相同的作用域**内重复声明同一个变量，var命令没有此限制；

```javascript
function f(){
  let a = 1;
  var = 2;
}  //报错

function f(){
  let a = 1;
  let a = 2;
}  //报错

function f(arg){
  let arg;  //报错
}

function f(arg){
  {
    let arg;  //不报错
  }
}
```

### 2. const命令     

#### 2.1 基本用法    

const声明一个只读的常量。一旦声明，常量的值就不能改变。也就是说，const一旦声明了常量，就必须立即初始化，不能留到以后赋值，否则会报**语法错误**。    

```javascript
const a;
//Uncaught SyntaxError: Missing initializer in const declaration
```

#### 2.2 const的本质     

**面试题**  cons定义的对象属性是否可以改变？     

这涉及到const命令的本质。const实际上保证的并不是变量的值不可改动，而是**变量指向的那个内存地址不可改动**。对于简单类型数据(number,boolean,string)而言，值就保存在变量指向的内存地址中，因此等同于常量，所以const定义的简单类型数据是不可改变的。但是，对于复合数据(主要指对象和数组)，变量指向的内存地址保存的只是一个指针，const只能保证这个指针是固定的，至于指向的数据结构是否可变，是不能控制的，因此，const定义的对象属性是可以改变的。

```javascript
const PI = 3.14;
PI = 1;  //Uncaught TypeError: Assignment to constant variable

const obj = {a:1,b:'abc'};
obj.a = 2;
obj;   //{a:2,b:'abc'}

const obj2 = {a:1,b:'abc'};
obj2 = {};   //Uncaught TypeError: Assignment to constant variable
```

*ps：彻底冻结对象和属性的方法：*   

```javascript
function constantize(obj){
  Object.freeze(obj);
  Object.keys(obj).forEach((key,index)=>{
    if(typeof obj[key] === 'object'){
      constantize(obj[key]);
    }
  });
}
```

### 3 顶层对象的属性   

顶层对象在浏览器环境中指的是windows对象，在Node环境中指的是global对象，在ES5中，顶层对象属性和全局对象属性是等价的。

```javascript
window.a = 1;
a;

a = 2;
window.a;  // 2
```

这样设计的缺点：  

- 编译时无法提示变量未声明的错误，只有在运行时才能知道，因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的；
- 容易造成误创造不必要的全局变量；
- 顶层对象的属性可以随意读写，不利于模块化编程；

ES6为了改变这一点，做出亮点规定：   

1. 为了保持兼容性，var命令和function命令声明的全局变量仍然是顶层对象的属性；
2. let命令、const命令和class命令声明的全局变量不属于顶层对象的属性；

```javascript
var a = 1;
window.a; //1

let b = 2;
window.b;  //undefined
```

