let timer;
App({
  onLaunch(){
    this.getToken();
  },

  // 定时获取token
  timing(){
    let that = this;
     timer = setInterval(function(){
      // that.getToken()
    },7200000);
  },

  getToken(){
    // let data = { userId: userId, client_id: app.globalData.appId, client_secret:app.globalData.appSecret,grant_type:'client_credentials'};
    // wx.request({
    //   method: "POST",
    //   url: app.globalData.BaseURL + 'oauth2/token',
    //   data: data,
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded" 
    //     },
    //   success: function (res) {
    //     app.globalData.token = res.data.access_token
    //   }
    // });
  },

  globalData: {
    openid:'',
    iv:'',
    appId:'111',
    userId:'',
    appSecret:'2222',
    encryptedData:'',
    unionId:'',
    sessionKey:'',
    adminUserViewId:"",
    token:"",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
  }

})