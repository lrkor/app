const app = getApp();

Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...' 
    });
    console.log(app.globalData.token);
    this.setData({
      url: app.globalData.BaseURL + 'weChat/openMessage?token=' + app.globalData.token 
    });
  },
  onUnload(){
    console.log(app.globalData);
  }

  //
})
