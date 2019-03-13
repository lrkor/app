const app = getApp()
Page({
  data: {
    state:0,
    result:0
  },
  onLoad: function (options) {
    let id = options.id;
    console.log(id);
  },

  // 编辑
  goEdit(){
    wx.navigateTo({
      url: '../editCheck/editCheck'
    })
  },

  // 分享
  onShareAppMessage(res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '检查详情',
      path: '/pages/patrol/checkDetail/checkDetail'
    }
  }

})
