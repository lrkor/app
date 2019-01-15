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
    // let data = { userId: this.globalData.userId, client_id: this.globalData.appId, client_secret:this.globalData.appSecret,grant_type:'client_credentials'};
    // wx.request({
    //   method: "POST",
    //   url: this.globalData.BaseURL + 'oauth2/token',
    //   data: data,
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded" 
    //     },
    //   success: function (res) {
    //     this.globalData.token = res.data.access_token
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