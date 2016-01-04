var express = require("express");
var app = express();
var request = require('request');
var config = require("./wxconfig");
var bodyParser = require('body-parser');
var connect = require("connect");
var fs = require('fs');
var redis   = require('redis');
var redis_cli  = redis.createClient(config.redis.port, config.redis.host);
if(config.redis.pwd)
	redis_cli.auth(config.redis.pwd);
var bunyan= require('bunyan');
var log=bunyan.createLogger({name:'myapp'});

var WechatAPI = require('wechat-api');
function refreshToken(){
	global.api = new WechatAPI(config.appid, config.appsecret,
		function(callback){
			console.log("read token from redis")
			redis_cli.get("zgfinance_token",function(err, result){
				if (err) {return callback(err);}
				callback(null,JSON.parse(result));
			})
		},
		function(token, callback){
			var tokenStr = JSON.stringify(token);
			console.log("saving token:" + tokenStr);
			//设置测试的redis中的token值，防止交叉刷token
			if(config.test.url){
				var data = {token:token};
				request.post({url:config.test.url,form:data}, function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					    console.log(body) 
					  }
					})
			}
			redis_cli.set("zgfinance_token",tokenStr,callback);
		});
}
/*从代码上看，真正的refresh是发生在lib内部实现的，而不是需要手工进行的，所以通过一个url进行刷新的可能性不是很大*/
refreshToken();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.query());
//app.use('/assets', connect.static(__dirname + '/assets', { maxAge: 86400000 }));
//app.use(connect.cookieParser());
//app.use(connect.session({secret: 'zhugelicaiweixin', cookie: {maxAge: 60000}}));




/**
 * 1. 存储token到redis里面
 * 2. 记录日志
 * 3. 提供web界面管理
 * 4. 接收api的时候，只接收过滤条件的请求，否则不接受
 * 5. 当发现token不对的时候，迅速报警，并更新token
 * 6. 可以界面更新对client的key
 * 7. 
 */
app.use('/wechat', require("./controller/wechat").reply);
app.use('/api', require("./controller/api").wechat);
//app.use('/admin', require("./controller/admin"));

app.use('/', function (req, res) {
	res.writeHead(200);
	res.end('hello node weixin api');
});
app.use(function (err, req, res) {
	  console.log(err.message);
	  console.log(err.stack);
	  res.statusCode = err.status || 500;
	  res.end(err.message);
});
app.listen(3030,function(){
	console.log("wechat api app started")
})