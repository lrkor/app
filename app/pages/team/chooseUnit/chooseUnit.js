const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: []
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '单位选择'
    });
    this.getSid(app.globalData.openid).then(res => {
      app.globalData.sid = res.data.data;
      that.getUnit().then(res => {
        that.setData({
          unitList: res.data.rows
        });
      })
    });

  },

  // 跳转列表页
  educationList(e) {
    let { orgid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../educationList/educationList?orgId=' + orgid,
    })
  },

  // 获取单位列表
  getUnit() {
    let url = app.globalData.sgmsUrl + '/api/v1/userManageRange/getManageConstructionUnit';
    let data = {};
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取sid
  getSid(openid) {
    let url = app.globalData.sgmsUrl + '/api/v1/token';
    let data = { miniOpenId: openid };
    return wxRequest.getRequest(url, data);
  },
})
