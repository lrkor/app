const app = getApp()

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res);
        var systemName = res.data.systemName
        var systemCode = res.data.systemCode
        that.setData({
          url: options.url + '?openId=' + app.globalData.openid + '&userId=1&systemCode=' + systemCode
        });
      }
    })
  }
})
