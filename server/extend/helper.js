const  fs = require('fs')
const path = require('path')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

module.exports = app => ({

  /**
	 * 返回客户端的内容
	 * @param status // 接口是否成功
	 * @param body // 返回数据
	 * @param msg // 返回信息提示
	 * @param code // 返回状态码
	 */

  returnBody (status = true, body = {}, msg = 'success', code = 200) {
		let {ctx} = app;
		ctx.status = code;
		ctx.body = {
			status: status,
			body: body,
			msg,
			code: code
		  }
	},
  //生成token ,date传入用户信息
  async createToken(data){
    let {$config} = app;
    return await jwt.sign(data, $config.jwt.secret, {expiresIn: 30* 24 * 60 * 60 + 's'});
  },

  
  	// 加密 ，使用的是这个库里面的加密算法
	async createPassword(password) {
		let {$config} = app;
		const hmac = crypto.createHash("sha256", $config.crypto.secret);
		hmac.update(password.toString());
		return hmac.digest("hex");
	},
  // 验证token
	async checkToken(token) {
		let {$config} = app;
		return await jwt.verify(token, $config.jwt.secret)
	},
  // 验证密码
	async checkPassword(password, hash_password) {
		// 先对需要验证的密码进行加密
		password = await this.createPassword(password);
		return password === hash_password;
	},


})