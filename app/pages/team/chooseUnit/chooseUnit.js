const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: [
      {
        id:'21341',
        tenderName:'南通一标',
        orgId:'afsdwafgkjhgsadg',
      },
      {
        id:'21341',
        tenderName:'南通一标',
        orgId:'afsdwafgkjhgsadg',
      },
      {
        id:'21341',
        tenderName:'南通一标',
        orgId:'afsdwafgkjhgsadg',
      },
      {
        id:'21341',
        tenderName:'南通一标',
        orgId:'afsdwafgkjhgsadg',
      },
    ]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '单位选择'
    });
  },

  // 跳转列表页
  educationList(){
    wx.navigateTo({
      url: '../educationList/educationList',
    })
  },
})
