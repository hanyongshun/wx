var wechat = require("express")();
var config = require("../wxconfig");
var redis   = require('redis');
var api = global.api;
var bunyan= require('bunyan');
var log=bunyan.createLogger({name:'api'});
wechat.post("/template",function(req,res){
	var data = req.body;
	console.log(JSON.stringify(data));
	//res.end("send");
	api.sendTemplate(data.touser, data.template_id, data.url, data.data, function (err, result, resinner) {
        if (err) {
        	log.error(err)
        	res.end("fail");
        } else {
        	log.info(result)
        	res.end("ok");
        }
      });
})
//设置其他网络的redis token
wechat.post("/setToken", function(req, res) {
	var data = req.body;
	if (data.token) {
		var redis_cli = redis
				.createClient(config.redis.port, config.redis.host);
		if (config.redis.pwd)
			redis_cli.auth(config.redis.pwd);
		var tokenStr = JSON.stringify(data.token);
		redis_cli.set("zgfinance_token", tokenStr, function(err, result) {
			if (err) {
				log.error(err)
				res.end("fail");
			} else {
				log.info(result)
				res.end("ok");
			}
		});
	}
})
exports.wechat = wechat;