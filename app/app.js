let timer;
App({
  onLaunch(){
    this.timing();
  },

  // 定时获取token
  timing(){
    let that = this;
     timer = setInterval(function(){
      that.getToken();
    },600000);
  },

  getToken(){
    let data = { token: this.globalData.token};
    var that = this;
    wx.request({
      method: "GET",
      url: that.globalData.BaseURL + 'api/v1/token/refresh',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded" 
        },
      success: function (res) {
        that.globalData.token = res.data.data.accessToken
      }
    });
  },

  globalData: {
    openid:'',
    iv:'',
    userName:'',
    userId:'',
    encryptedData:'',
    unionId:'',
    sessionKey:'',
    adminUserViewId:"",
    token:"",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
    tokenUrl:"http://wechat-dev.zhinengjianshe.com/wechatService/weChat/toProject?token="
  }
})