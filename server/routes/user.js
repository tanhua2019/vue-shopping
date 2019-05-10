const router = require('koa-router')();
const user = require('../controllers/user');

//注册
router.post('/api/user/signup', user.signup);

//登录
router.post('/api/user/login', user.login);

//获得用户基本信息
router.get('/api/user/data', user.getData);

//更改用户资料
router.post('/api/user/updateUserData', user.updateUserData);

//更改用户密码
router.post('/api/user/updatePwd', user.updatePwd);

module.exports = router
