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
    let url = options.url;
    let id = options.id;
    let serverUrl = options.serverUrl
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          url: url + '?serverUrl=' + serverUrl + '&id=' + id 
        });
      }
    })
  },
})
