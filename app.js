'use strict'

const Koa = require('koa');
const sha1 = require('sha1');

const config = {
  wechat: {
    appID: 'wx060752fbe80ef267',
    appSecret: '5ebeb497b9b7713b12322221d70eeccf ',
    token: '552f3076112eb1de16e8184f'
  }
}

const app = new Koa();

app.use(function *(next){
  console.log(this.query);
  
  const token = config.wechat.token;
  let signature = this.query.signature;
  let nonce = this.query.nonce;
  let timestamp = this.timestamp;
  let echostr = this.query.echostr;
  let str = [token, timestamp, nonce].sort().join('');
  
  let sha = sha1(str);
  
  if(sha === signature){
    this.body = echostr + '';
  }else{
    this.body = "wrong";
  }
});

app.listen(3001);
console.log('listening: 3001');