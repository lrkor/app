const app = getApp()

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    let url = options.url;
    wx.setNavigationBarTitle({
      title: '加载中...' 
    });
    this.setData({
      url: url
    });
  },
})
