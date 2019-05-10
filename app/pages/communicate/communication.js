const app = getApp()
const wxRequest = require('../../utils/wxRequest.js');
Page({
  data: {
    unitList1: [],
    unitList2: []
  },
  onLoad: function (options) {
    let that = this;
    let parentId = options.parentId;
    this.getSid(app.globalData.openid).then(res=>{
      app.globalData.sid = res.data.data;
      that.getAddress(parentId).then(res => {
          that.setData({
            unitList1: res.data.data.addressListCatalogList,
            unitList2: res.data.data.addressList
          })
      })
    });
  },

  onSearch(e) {
    console.log(e.detail);
    let that = this;
    this.queryPerson(e.detail).then(res=>{
      that.setData({
        unitList1:[],
        unitList2: res.data.rows
      })
    });
  },

  // 查人
  // 获取通讯通
  queryPerson(contactName) {
    let url = app.globalData.sgmsUrl + '/api/v1/addressList/query';
    let data = { mapParams:{contactName}};
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取通讯通
  getAddress(parentId) {
    let url = app.globalData.sgmsUrl +'/api/v1/addressList/queryByParentId';
    let data = { parentId };
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取sid
  getSid(openid) {
    let url = app.globalData.sgmsUrl + '/api/v1/token';
    let data = { miniOpenId: openid };
    return wxRequest.getRequest(url, data);
  },

})