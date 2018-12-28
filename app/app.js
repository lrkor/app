App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 获取用户openId
        // if (res.code) {
        //   // 发起网络请求  appid  secret
        //   wx.request({
        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2e698d2b0d51ec5b&secret=11111&js_code=JSCODE&grant_type=authorization_code',
        //     data: {
        //       code: res.code
        //     },
        //     success: function(result) {
        //       if (result.data.errcode != '200') {
        //         wx.showToast({
        //           title: '登陆失败',
        //           duration: 2000
        //         })
        //         return false;
        //       }
        //       this.globalData.openId = result.data.openId
        //     }
        //   })
        // } else {
        //   console.log('登录失败！' + res.errMsg)
        // }
        wx.navigateTo({
          url: '/pages/login/login',
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    openId: "oBqrSwzzFWtcDD6SjgV13F2OhPkc",
    adminUserViewId: "",
    token: "",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
  }
})