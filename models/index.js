var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/wikistack'); //Create connection to db
var generateUrlTitle = function(str){
	if(str){
		var regExp = /\s/g;
		str = str.replace(regExp, "_");
		str = str.replace(/\W/g, "");
		return str;
	} else {
    // Generates random 5 letter string
    	return Math.random().toString(36).substring(2, 7);
  	}
}

var Page = db.define('page', {
	title: {type: Sequelize.STRING, allowNull : false, defaultVaule:"Defualt Title"},
	urlTitle:{type: Sequelize.STRING,allowNull:false, defaultVaule:"www"},
	content: {type: Sequelize.TEXT, allowNull:false, defaultVaule:" "},
	status: {type: Sequelize.ENUM('open', 'closed')},
	date: {type: Sequelize.DATE, defaultVaule: Sequelize.NOW}
},{ 
	getterMethods : {
	route: function() {return '/wiki/' + page.urlTitle}

	},
	hooks: {
			beforeValidate: function(page, options){
				console.log(generateUrlTitle(page.title));
				page.urlTitle = generateUrlTitle(page.title)},
	}
});

var User = db.define('user', {
	name: {type: Sequelize.STRING, allowNull: false, defaultVaule:"name"},
	email: {type: Sequelize.STRING, allowNull: false, isEmail: true, defaultVaule: "email"}
});


// var generateUrlTitle = function(str){
// 	if(str){
// 		var regExp = /\s/g;
// 		str = str.replace(regExp, "_");
// 		str = str.replace(/\W/g, "");
// 		return str;
// 	} else {
//     // Generates random 5 letter string
//     	return Math.random().toString(36).substring(2, 7);
//   	}
// }

module.exports = {
	Page: Page,
	User: User,
	db: db
};