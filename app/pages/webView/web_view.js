const app = getApp()

Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...'
    })
    let url = options.url;
    console.log(options);;
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          url: url + '?token=' + app.globalData.token + '&systemCode=' + app.globalData.systemCode + '&userId=' + app.globalData.userId
        });
      }
    })
  },
})
