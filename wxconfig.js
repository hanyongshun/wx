var config = {}
config.appsecret = '';
config.appid= '',
config.encodingAESKey = '';
config.redis = {};
config.redis.host = 'localhost';
config.redis.port = 6379;
//生产密码：Log~123456
config.redis.pwd = 'Log~123456';
config.test = {};
//注意：测试机url可以不配置，如果配置成生产url,则会同步生产redis的token值
config.test.url = "http://120.26.117.124:3030/api/setToken"
module.exports = config;