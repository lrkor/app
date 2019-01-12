const app = getApp()

Page({
  data: {
    url:app.globalData.BaseURL + 'weChat/openMessage'
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...' 
    })
  },
  onUnload(){
    console.log(app.globalData);
  }

  //
})
