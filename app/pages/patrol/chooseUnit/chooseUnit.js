const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: []
  },
  onLoad: function (options) {
    let type = options.type;
    let that = this;
    this.setData({
      type: type
    });
    wx.setNavigationBarTitle({
      title: '单位选择'
    });

    this.getUnit().then(res=>{
      that.setData({
        unitList:res.data.rows
      });
    })
  },

  checkList(e) {
    let id = e.currentTarget.dataset.id;
    app.globalData.orgId = e.currentTarget.dataset.orgId;
    let type = this.data.type;
    if (type == 1) {
      wx.navigateTo({
        url: '../checkList/checkList?id=' + id,
      })
    } else {
      wx.navigateTo({
        url: '../rectificationList/rectificationList?id=' + id,
      })
    }

  },

  // 获取单位列表
  getUnit() {
    let url = app.globalData.sgmsUrl + '/api/v1/userManageRange/getManageConstructionUnit';
    let data = {};
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

})
