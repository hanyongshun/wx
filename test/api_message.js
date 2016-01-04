var request = require('request');
var url = 'http://127.0.0.1:3000/api/template';
var formData ={
	"template_id":"OrQrUVuz_F3jHv0QS3dEH8-TEWd-ytTuFIZX-ctXHMc",
    "url":"https://m.zhugelicai.com/",
    "topcolor":"#FF0000",
    "data" : {
    	'first':{"value":'你好，请注意业务系统报警内容',"color" : "#173177"},
    	'keyword1':{"value":'用户子系统',"color" : "#173177"},
    	'keyword2':{"value":'2014年8月8日 18:36',"color" : "#173177"},
    	'keyword3':{"value":'高',"color" : "#173177"},
    	'remark' : {"value":'新用户创建失败',"color" : "#173177"}
    },
    "touser" : 'odaS-w7wUibc73683rET5dHmwAUU'
}
//odaS-w7wUibc73683rET5dHmwAUU 张少华
//odaS-w48AKWcElK1N__b9Sag6Juo 尹平辉
	
request.post({url:url,form:formData}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
  }
})