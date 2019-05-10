const app = getApp();
const wxRequest = require('../../../../utils/wxRequest.js');
Page({
  data: {
    unitList: []
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '单位选择'
    });
    this.getUnit().then(res => {
      that.setData({
        unitList: res.data.rows
      });
    })
  },

  checkList(e) {
    app.globalData.orgId = e.currentTarget.dataset.orgid;
    app.globalData.tenderName = e.currentTarget.dataset.tendername;
    console.log(app.globalData.orgId,app.globalData.tenderName)
    wx.navigateTo({
      url: '../list/list?orgId=' + e.currentTarget.dataset.orgid,
    })
  },

  // 获取单位列表
  getUnit() {
    let url = app.globalData.sgmsUrl + '/api/v1/userManageRange/getManageConstructionUnit';
    let data = {};
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

})
