module.exports = app => ({

  /**
	 * 获取我的页面列表
	 * @returns {Promise<*>}
	 */
	async getMyPages(pageMode, type) {
		const {ctx, $model} = app;
		let userData = ctx.userData
		let query = { pageMode: pageMode, isTemplate: {$ne: true}};
		if(type === 'my'){
			query.author = userData._id
      //我的作品 或者是我参与的作品
		}else if(type === 'cooperation'){
			query.members = {$elemMatch: {$in: userData._id}}
		}
		return await $model.page.find(query).select('_id title coverImage isPublish').exec();
	},
	/**
	 * 获取我的页面数量
	 * @returns {Promise<void>}
	 */
	async getMyPagesCount(pageMode){
		const {ctx, $model} = app;
		let userData = ctx.userData
		let query = {author: userData._id, pageMode: pageMode, is_delete: {$ne: true}, isTemplate: {$ne: true}};
		return await $model.page.count(query);
	},
  
	/**
	 * 获取我的协作页面数量
	 * @returns {Promise<void>}
	 */
	async getCooperationPagesCount(pageMode){
		const {ctx, $model} = app;
		let userData = ctx.userData
		let query = {members: {$elemMatch: {$in: userData._id}}, pageMode: pageMode, is_delete: {$ne: true}, isTemplate: {$ne: true}};
		return await $model.page.count(query);
	},

  	/**	
	 * 创建页面
	 * @param pageData
	 * @returns {Promise<*>}
	 */
	async create(pageData){
		const {ctx, $model} = app;
		let userData = ctx.userData
		return await $model.page.create({
			...pageData,
			author: userData._id,
		})
	},


  	/**
	 * 更新修改页面
	 * @param pageData
	 * @returns {Promise<*>}
	 */
	async update(pageData){
		const {$model} = app;
		return await $model.page.findOneAndUpdate({_id: pageData._id}, { $set: pageData }, {
			runValidators: true
		})
	},
  	/**
	 * 彻底删除文档
	 * @param id
	 * @returns {Promise<boolean>}
	 */
	async deletePage(id) {
		const { $model } = app;
		return await $model.page.remove({_id: id});
	},
  	/**
	 * 获取页面详情
	 * @param id
	 * @returns {Promise<*>}
	 */
	async getPageDetail(id){
		const { $model } = app;
		return await $model.page.findById(id).exec()
	},
  	/**
	 * 发布页面
	 * @param id
	 * @returns {Promise<*>}
	 */
	async setPublish(id){
		const { $model } = app;
		return await $model.page.findByIdAndUpdate({_id:id}, {$set: {isPublish: true}})
	},
  	/**
	 * 获取页面详情
	 * @param id
	 * @returns {Promise<*>}
	 */
	async getPageDetail(id){
		const { $model } = app;
		return await $model.page.findById(id).exec()
	},
})