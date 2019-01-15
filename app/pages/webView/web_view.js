const app = getApp()

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...' 
    })
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        var systemName = res.data.systemName
        var systemCode = res.data.systemCode
        that.setData({
          url: 'http://wechat-dev.zhinengjianshe.com/wechatService/weChat/menu' + '?token=' + app.globalData.token
        });
      }
    })
  }
})
