const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const UserModel = sequelize.define('user',{
	id:{
		type:Sequelize.BIGINT,
		primaryKey:true,
		allowNull:false,
		autoIncrement:true
	},
	email:{
		type:Sequelize.STRING(64),
		unique:true,
		allowNull:false
	},
	pwd:{
		type:Sequelize.STRING(255),
		allowNull:false
	},
	nickname:{
		type:Sequelize.STRING(64),
		unique:true,
		allowNull:false
	},
	/*0保密，1男，2女*/
	sex:{
		type:Sequelize.ENUM(0,1,2),
		defaultValue: 0,
		allowNull:false
	},
	recipient:{
		type:Sequelize.STRING(64),
		allowNull:true
	},
	address:{
		type:Sequelize.STRING(500),
		allowNull:true
	},
	phone:{
		type:Sequelize.STRING(64),
		allowNull:true
	},
	headimg:{
		type:Sequelize.STRING(500),
		allowNull:false,
		defaultValue: 'https://ss0.baidu.com/6LVYsjip0QIZ8Aqbn9fN2DC/timg?pa&quality=100&size=b640_10000&sec=1552005578&di=d8f9f176cdde44b3267d03331232c353&ref=http%3A%2F%2Fzhuanzhuan%2Eganji%2Ecom%2Fdetail%2F896243897851805707z%2Eshtml&src=http%3A%2F%2Fimg%2E58cdn%2Ecom%2Ecn%2Fzhuanzhuan%2F58PCtemplate%2Fcommon%2Fzhuanzhuan%5Flogo%2Epng',
	},
	updatetime:{
		type:Sequelize.DATE,
		allowNull:false
	},
	createtime:{
		type:Sequelize.DATE,
		allowNull:false
	},
},{
	timestamps:false,
});

module.exports = UserModel;