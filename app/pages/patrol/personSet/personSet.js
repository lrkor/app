const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: []
  },
  onLoad: function (options) {
    let type = options.type;
    this.setData({
      type: type
    });
    wx.setNavigationBarTitle({
      title: '人员设置'
    });
  },

  goAddPerson(){
    let {type} = this.data;
    wx.navigateTo({
      url: '../choosePerson/choosePerson?type=' + type,
    })
  }
})
