const app = getApp();
Page({
  data: {
    url: '',
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '项目看板' 
    })
    let url = app.globalData.tokenUrl + app.globalData.token;
    this.setData({
      url: url 
    });
  },
})
