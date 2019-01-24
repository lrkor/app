const app = getApp();

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...' 
    });
    this.setData({
      url: app.globalData.BaseURL + 'weChat/openMessage'
    });
  },
  onUnload(){
  }

  //
})
