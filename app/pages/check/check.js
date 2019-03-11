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
    console.log(url);
    this.setData({
      url: url
    });
  },
  onShareAppMessage(options) {
    let that = this;
    let url = '/pages/check/check?url=' + options.webViewUrl;
    console.log(url);
    return {
      title: '检查详情',
      path: url,
      success: function (res) {
        console.log(res);
        that.setData({
          url: url
        });
      }
    }
  }
})
