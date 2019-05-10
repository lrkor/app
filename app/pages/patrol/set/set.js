const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查设置'
    });
  },
  goPersonSet(e){
    // type 1 为整改人 ，2为审核人 3转派责任人 4调整期限
      let {type} = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../personSet/personSet?type=' + type,
      })
  },
})
