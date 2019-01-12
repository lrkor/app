App({
  // onLoad: function() {
  //   wx.request({
  //     method: "GET",
  //     url: app.globalData.BaseURL + 'api/v1/userBind/getAppBindInfo',
  //     data: {
  //       openId: app.globalData.openid,
  //       appType:'2',
  //       unionId: app.globalData.unionId
  //     },
  //     header: {
  //       "Content-Type": "application/json;charset=UTF-8"
  //     },
  //     success: function (res) {
  //       if (res.data.code != 200) {
  //         wx.showToast({
  //           title: res.data.message,
  //           icon: 'none',
  //           duration: 2000
  //         })
  //         return false;
  //       }
  //       if (res.data && res.data.rows && res.data.rows.length == 1) {
  //         wx.switchTab({
  //           url: '/pages/index/index',
  //         })
  //         app.globalData.userInfo = res.data.rows[0];
  //       } else {
  //         wx.reLaunch({
  //           url: '/pages/bindAccount/bindAccount'
  //         })
  //       }
  //     }
  //   });
  // },
  globalData: {
    openid: "",
    unionId:'',
    sessionKey:'',
    adminUserViewId: "",
    token: "",
    userInfo: {},
    BaseURL: "http://wechat-dev.zhinengjianshe.com/wechatService/",
  }
})