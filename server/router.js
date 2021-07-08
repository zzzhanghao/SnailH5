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




  return router;
}