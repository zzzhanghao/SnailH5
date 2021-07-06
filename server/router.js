module.exports = app => {
  const {router, $controller} = app;

  // 登录注册认证
	router.post('/snail/auth/login', $controller.auth.login);
	router.post('/snail/auth/regist', $controller.auth.register);



  return router;
}