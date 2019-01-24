const app = getApp();
Page({
  data: {
    url: '',
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '项目看板' 
    })
    let url = app.globalData.tokenUrl;
    this.setData({
      url: url 
    });
  },
})
