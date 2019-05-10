const app = getApp();
const wxRequest = require('../../../../utils/wxRequest.js');
Page({
  data: {
    unitList: []
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '积分榜'
    });
    this.getUnit().then(res => {
      that.setData({
        unitList: res.data.rows
      });
    })
  },

  goCondition(e) {
    let {orgid,tendername} = e.currentTarget.dataset;
    console.log(orgid);
    console.log(tendername);
    wx.navigateTo({
      url: '../chooseCondition/chooseCondition?orgId=' + orgid + '&tenderName=' + tendername,
    })
  },

  checkList(e) {
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
