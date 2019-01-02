App({
  onLaunch: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 获取用户openId
        if (res.code) {
          // 发起网络请求  appid  secret
          wx.request({
            url: that.globalData.codeUrl,
            data: {
              js_code: res.code
            },
            success: function(result) {
              if (result.data.openid) {
                that.globalData.openid = result.data.openid;
              } else {
                wx.showToast({
                  title: '登陆失败！',
                  duration: 2000
                })
                return false;
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        // wx.navigateTo({
        //   url: '/pages/login/login',
        // })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    openid: "",
    adminUserViewId: "",
    token: "",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
    codeUrl: "https://api.weixin.qq.com/sns/jscode2session?appid=wx55f0a1078776fa82&secret=d637bdb0dbb1751995be8352eb46ef91&grant_type=authorization_code",
  }
})