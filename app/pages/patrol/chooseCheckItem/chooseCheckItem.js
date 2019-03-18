const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    radio: '',
    unitList: []
  },
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    wx.setNavigationBarTitle({
      title: '检查项选择'
    });

    this.getJcxej({
      mapParams: {
        id: id
      }
    }).then(res => {
      that.setData({
        unitList:res.data.rows
      })
      console.log(res.data.rows);
    })
  },

  onClick(e) {
    app.globalData.checkItem = {
      name: e.currentTarget.dataset.title,
      id: e.currentTarget.dataset.name,
    };
    this.setData({
      radio: e.currentTarget.dataset.name
    });
    console.log(app.globalData.checkItem);
    wx.navigateBack({
      delta: 2
    })
  },

  // 获取检查项二级
  getJcxej(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/patrolClassify/secondLevel/query';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },
})
