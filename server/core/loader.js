const path = require('path')
const fs = require('fs')
const Router = require('koa-router');
const schedule = require("node-schedule");
const mongoose = require('mongoose')

//自动扫指定目录下面的文件并且加载
function scanFilesByFolder(dir, cb) {
	//获取到绝对目录地址
	let _folder = path.resolve(__dirname, dir);
	if(!getFileStat(_folder)){
		return;
	}
	try {
		const files = fs.readdirSync(_folder);
		files.forEach((file) => {
			//具体文件名
			let filename = file.replace('.js', '');
			//require 引入
			let oFileCnt = require(_folder + '/' + filename);
			//执行cb ，其实是主要执行 oFileCnt拿到返回的东西  ，并且传入 filename
			cb && cb(filename, oFileCnt);
		})

	} catch (error) {
		console.log('文件自动加载失败...', error);
	}
}

// 检测文件夹是否存在
/**
 * @param {string} path 路径
 */
function getFileStat(path) {
	try {
		fs.statSync(path);
		return true;
	} catch (err) {
		return false;
	}
}


// 配置信息
const initConfig = function(){
	let config = {};
	scanFilesByFolder('../config',(filename, content)=>{
		config = {...config, ...content};
	});
	return config;
};

// 初始化路由
const initRouter = function(app){
	const router = new Router();
	require('../router.js')({...app, router});
	return router;
}
// 初始化控制器
const initController = function(app){
	let controllers = {};
	scanFilesByFolder('../controller',(filename, controller)=>{
		controllers[filename] = controller(app);
	})
	return controllers;
}

//初始化model
function initModel(app){
	// 链接数据库, 配置数据库链接
	if(app.$config.mongodb){
		mongoose.set('useNewUrlParser', true)
		mongoose.set('useFindAndModify', false);
		mongoose.set('useUnifiedTopology', true);
		mongoose.connect(app.$config.mongodb.url, app.$config.mongodb.options);
		// app上扩展两个属性
		app.$mongoose = mongoose;
		app.$db = mongoose.connection
	}
	// 初始化model文件夹
	let model = {};
	scanFilesByFolder('../models',(filename, modelConfig)=>{
		model[filename] = modelConfig({...app, mongoose});

	});
	return model;
}
//初始化service
function initService(app){
	let services = {};
	scanFilesByFolder('../service',(filename, service)=>{
		services[filename] = service(app);
	})
	return services;
}
// 初始化扩展
function initExtend(app) {
	scanFilesByFolder('../extend',(filename, extendFn)=>{
		app['$' + filename] = Object.assign(app['$' + filename] || {}, extendFn(app))
	})
}


module.exports = {	
	initConfig,
	initRouter,
	initController,
	initModel,
	initExtend,
	initService,

}
