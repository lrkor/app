const app = getApp()
Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...'
    })
    var url = options.url;
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        var systemName = res.data.systemName
        var systemCode = res.data.systemCode
        that.setData({
          // url: url + '?token=' + app.globalData.token
          url: url 
        });
      }
    })
  },
  onShareAppMessage(options) {
    return {
      title: '检查详情',
      path: '/pages/webView/web_view?url='+options.webViewUrl,
      success: function(res) {
        console.log(res);
      }
    }
  }
})
