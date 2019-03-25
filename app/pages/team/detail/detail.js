const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    id:'',
    type: '',
    videoSrc:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    imageList:['../../../images/bid.png','../../../images/bid.png','../../../images/bid.png','../../../images/bid.png',
    '../../../images/bid.png','../../../images/bid.png','../../../images/bid.png','../../../images/bid.png'],
  },
  onLoad: function (options) {
    // this.setData({id:options.id});
    wx.setNavigationBarTitle({
      title: '单位选择'
    });
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },


  // 分享
  onShareAppMessage(res) {
    let id = this.data.id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '检查详情',
      path: '/pages/team/detail/detail?id=' + id
    }
  }
})
