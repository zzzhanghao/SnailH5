/**
 * 封装koa mvc基础架构初始化工作
 */
 const path = require('path')
 const Koa = require('koa');
 const {initConfig} = require('./loader')
 class Application{
   constructor(){
     this.$app = new Koa();
     // 初始化config
		 this.$config = initConfig(this);
     // 将ctx注入到app上,做一个挂载
     this.$app.use(async (ctx, next) => {
       this.ctx = ctx;
       await next()
     })
     
   }
 
   // 启动服务
   start(port){
     this.$app.listen(port, ()=>{
       console.log('server is starting........!');
     });
   }
 }
 
 module.exports = Application;
 