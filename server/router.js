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
	router.get('/quark/page/getMyPages', $middleware.auth, $controller.page.myPages);
	router.post('/quark/page/create', $middleware.auth, $controller.page.create);
	router.post('/quark/page/update', $middleware.auth, $controller.page.updatePage);
	router.post('/quark/page/delete', $middleware.auth, $controller.page.deletePage);
	router.post('/quark/page/copy', $middleware.auth, $controller.page.copyPage);
	router.post('/quark/page/setPublish', $middleware.auth, $controller.page.publish);
	router.post('/quark/page/setTemplate', $middleware.auth, $controller.page.setTemplate);
	router.get('/quark/page/detail', $middleware.auth, $controller.page.pageDetail);



  return router;
}