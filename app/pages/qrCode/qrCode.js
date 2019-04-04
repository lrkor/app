const app = getApp()

Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...'
    })
    console.log(options);
    let url = decodeURIComponent(options.url);
    this.setData({url});
  },
})
