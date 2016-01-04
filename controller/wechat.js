var fs = require('fs');
var path = require('path');
var wechat = require('wechat');
var ejs = require('ejs');
var VIEW_DIR = path.join(__dirname, '..', 'views');
var config = require('../wxconfig');
var logger = null;//require("../logger");
//var oauth = new wechat.OAuth(config.appid, config.appsecret);

var List = require('wechat').List;
List.add('view', [
  ['没有找到相关API。输入模块名，方法名，事件名等都能获取到相关内容。\n回复{a}可以查看近期的NodeParty活动', function (info, req, res) {
    res.nowait('暂无活动');
  }]
]);

/*
var callbackTpl = ejs.compile(fs.readFileSync(path.join(VIEW_DIR, 'callback.html'), 'utf-8'));

exports.callback = function (req, res) {
  res.writeHead(200);
  oauth.getAccessToken(req.query.code, function (err, result) {
    res.end(callbackTpl(req.query));
  });
};
*/
exports.reply = wechat({
	 token: 'zhugejinrong',
	  appid: 'wxe96824a93bb80cb2',
	  encodingAESKey: 'LNVKHBk92gfaI5yhotH4ikp5GiKNXO8p1pJhwFNNs0R'
	}, wechat.text(function (message, req, res,next) {
  // message为内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
	
	var input = (message.Content || '').trim();
	if (input === 'login') {
		res.reply([{
			title: '登陆页面',
			description: '去登陆',
			picurl: config.domain + '/assets/qrcode.jpg',
			url: config.domain + '/login'
		}]);
		return;
	}
	if (input === '大王') {
	  return res.reply("不要叫我大王，要叫我女王大人啊……");
	}
	if (input.length < 2) {
		return res.reply('内容太少，请多输入一点:)');
	}
	//logger.log(content);
	res.reply("内容不错，加油");
}).image(function (message, req, res) {
	logger.log(message);
	//图片可以上传，接收，保存下来，并将记录存在数据库里面
	
	res.reply('还没想好图片怎么处理啦。');
}).location(function (message, req, res) {
	//地理位置可以记录下来
	logger.log(message);
	res.reply('想和我约会吗，不要的啦。');
}).voice(function (message, req, res) {
	//声音可以作为基本文件保存下来
	logger.log(message);
	res.reply('还不知道你说的是什么。');
}).link(function (message, req, res) {
	//链接可以接收，打开，还不知道改如何处理的
	logger.log(message);
	res.reply('点连接进来的是吧！');
}).event(function (message, req, res) {
	logger.log(message);
	//根据事件分类进行处理
	if (message.Event === 'subscribe') {
    // 用户添加时候的消息
		res.reply('谢谢添加诸葛金融账号公共帐号:)');
	} else if (message.Event === 'unsubscribe') {
		res.reply('Bye!');
	} else {
		res.reply(message.Event + ' 暂未支持! Coming soon!' );
	}
}));
