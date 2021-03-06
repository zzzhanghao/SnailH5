module.exports = app => {
  const {router, $controller, $middleware} = app;

  // 登录注册认证
	router.post('/snail/auth/login', $controller.auth.login);
	router.post('/snail/auth/regist', $controller.auth.register);

  // 用户
	router.get('/snail/user/info', $middleware.auth, $controller.user.getUserInfo)
  router.post('/snail/user/update/name', $middleware.auth, $controller.user.updateUserName);
	router.post('/snail/user/update/pass', $middleware.auth, $controller.user.updateUserPass);
	router.post('/snail/user/update/avatar', $middleware.auth, $controller.user.updateUserAvatar);
	router.get('/snail/user/getUserList', $middleware.auth, $controller.user.getUserList);
	// 页面
	router.get('/snail/page/getMyPages', $middleware.auth, $controller.page.myPages);  //前端对应我的作品
	router.post('/snail/page/create', $middleware.auth, $controller.page.create);      //新建页面
	router.post('/snail/page/update', $middleware.auth, $controller.page.updatePage);  //更新页面
	router.post('/snail/page/delete', $middleware.auth, $controller.page.deletePage);  //删除自己新建的页面
	router.post('/snail/page/copy', $middleware.auth, $controller.page.copyPage);      //复制
	router.post('/snail/page/setPublish', $middleware.auth, $controller.page.publish); //更多->发布
	router.post('/snail/page/setTemplate', $middleware.auth, $controller.page.setTemplate); //更多 --》 设置为我的模板
	router.get('/snail/page/detail', $middleware.auth, $controller.page.pageDetail);   //
  // 页面渲染
  router.get('/snail/view/:_id', $controller.page.view);
  	// 页面协作
	router.get('/snail/page/getCooperationList', $middleware.auth, $controller.cooperation.getCooperationUserListByPageId);
	router.post('/snail/page/addCooperation', $middleware.auth, $controller.cooperation.addCooperationUser);
	router.post('/snail/page/delCooperation', $middleware.auth, $controller.cooperation.removeCooperationUser);

  // 我的模板
  router.get('/snail/page/getMyTemplates', $middleware.auth, $controller.page.getMyTemplates);
  // // 模板市场
  router.get('/snail/page/getPublishTemplates', $middleware.auth, $controller.page.getPublishTemplates);

  // // html2canvas 跨域接口配置
  router.get('/snail/html2canvas/corsproxy', $controller.htmlToCanvas.corsproxy);
	// psd上传相关
	router.post('/snail/psd/upload', $middleware.auth, $controller.psd.psdPpload);
	// 我的图片库
	router.get('/snail/imageLib/myImages', $middleware.auth, $controller.image.getMyImages);
	router.post('/snail/imageLib/upload', $middleware.auth, $controller.image.uploadImage);


  return router;
}