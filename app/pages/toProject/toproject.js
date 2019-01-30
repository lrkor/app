const app = getApp()

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    let url = options.url;
    let index = url.indexOf('loginTo');
    let url1 = url.substring(0,index+7);
    let str = url.substring(index+8,url.length);
    let url2 = url1 + '?userName=' +str;
    wx.setNavigationBarTitle({
      title: '加载中...' 
    });
    this.setData({
      url: url2
    });
  },
})
