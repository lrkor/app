//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '张三',
    engineeringName: '五峰山接线工程',
    orgName: '南通一标',
  },
  onLoad: function (options) {
    var that = this;
    that.setDate({
      mername: options.mername
    })
    wx.setNavigationBarTitle({
      title: that.data.mername,
    })
  }
})
