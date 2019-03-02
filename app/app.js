let timer;
App({
  onLaunch() {
    this.timing();
    //console.log('onLaunch:', options);
    // 检测并获取小程序更新 api 说明：https://developers.weixin.qq.com/miniprogram/dev/api/getUpdateManager.html
    if (wx.canIUse('getUpdateManager')) { // 基础库 1.9.90 开始支持，低版本需做兼容处理
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (result) {
        if (result.hasUpdate) { // 有新版本
          updateManager.onUpdateReady(function () { // 新的版本已经下载好
            wx.showModal({
              title: '更新提示',
              content: '新版本已经下载好，请重启应用。',
              success: function (result) {
                if (result.confirm) { // 点击确定，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function () { // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            });
          });
        }
      });
    }
    else { // 有更新肯定要用户使用新版本，对不支持的低版本客户端提示
      wx.showModal({
        title: '温馨提示',
        content: '当前微信版本过低，无法使用该应用，请升级到最新微信版本后重试。'
      });
    }
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
    version:'0.0.10',
    token:'',
    systemCode:'',
    openid: '',
    downUrl:'https://wechatapplet.zhinengjianshe.com/',
    iv: '',
    userName: '',
    userId: '',
    encryptedData: '',
    unionId: '',
    sessionKey: '',
    adminUserViewId: "",
    userInfo: {},
    BaseURL: "https://wechat.zhinengjianshe.com/wechatService/",
    tokenUrl: "https://wechat.zhinengjianshe.com/wechatService/weChat/toProject?token="
  }
})