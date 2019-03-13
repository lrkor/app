const app = getApp()
Page({
  data: {
    state:3,
    result:2
  },
  onLoad: function (options) {
  
  },

  // 编辑
  

  // 分享
  onShareAppMessage(res) {
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
