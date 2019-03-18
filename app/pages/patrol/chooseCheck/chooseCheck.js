const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查项选择'
    })

    let that = this;

    this.getJcx().then(res => {
      that.setData({ unitList: res.data.rows })
    })
  },

  checkList(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../chooseCheckItem/chooseCheckItem?id=' + id,
    })
  },

  // 获取检查项
  getJcx() {
    let url = app.globalData.sgmsUrl + '/api/v1/patrolClassify/firstLevel/query';
    let data = {
      mapParams: {
        type: 1
      }
    };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },
})
