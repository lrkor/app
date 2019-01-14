let timer;
App({
  onLaunch(){
    this.getToken();
  },

  // 定时获取token
  timing(){
    let that = this;
     timer = setInterval(function(){
      that.getToken.then(res=>{
        app.globalData.token = res.data.data.token;
      })
    },1000)
  },

  getToken(){
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/get';
    let data = { id: id };
    return wxRequest.getRequest(url, data);
  },

  globalData: {
    openid:'',
    iv:'',
    encryptedData:'',
    unionId:'',
    sessionKey:'',
    adminUserViewId:"",
    token:"",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
  }

})