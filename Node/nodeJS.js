/****************************        Event          ****************************/
// EventEmitter是一个类
// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {};

// const myEmitter = new MyEmitter();

// // 如果在用箭头式传入this则为空，不会绑定EventEmitter的实例
// myEmitter.on('event' , () => {
// 	console.log('an event occurred');
// });

// // myEmitter.once()  //则只能emit一次，后面的执行emit则没有用

// // 'event'也可以换成newListener，其会插入listener in front
// myEmitter.once('newListener',function(event,listener){
// 	if (event === 'event') {
// 		myEmitter.on('event',() => {
// 			console.log('B');
// 		});
// 	}
// });

// myEmitter.on('event' , function(a,b) {
// 	a++;
// 	b++;
// 	console.log(a,b,this);
// })

// // 只要调用一次emit就会触发事件
// myEmitter.emit('event','a','b');   //上面的两个都执行了
// myEmitter.emit('event',0,0);

// listenerCount
// console.log(EventEmitter.listenerCount(myEmitter, 'event'));



/****************************         Buffer          ****************************/
//Buffer也是一个类，它类似于一个整型的数组，在其创建时就确定了大小
const buf1 = Buffer.alloc(10);
console.log(buf1);
const buf2 = Buffer.alloc(10, 1);
console.log(buf2);
const buf4 = Buffer.from([1, 2, 12]);      //这里的都是十六进制的数12表示的是0c
console.log(buf4);
const buf5 = Buffer.from('test');          //字符的话是用16进制的ASCII码来记录缓存
console.log(buf5);
// const buf = Buffer.from('hello world','ascii');
// console.log(buf.toString('hex'));
// console.log(buf.toString('base64'));
//内容较多，在后续的实战项目中边做边看

/****************************         Stream          ****************************/
