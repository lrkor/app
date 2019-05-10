const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    type: '',
    list: []
  },
  onLoad: function (options) {
    let type = options.type;
    this.setData({ type });
    wx.setNavigationBarTitle({
      title: '人员设置'
    });
  },

  onShow() {
    let { type } = this.data;
    this.drawList(type);
  },

  goAddPerson() {
    let { type } = this.data;
    wx.navigateTo({
      url: '../choosePerson/choosePerson?type=' + type,
    })
  },
  onClose(event) {
    const { id } = event.currentTarget.dataset;
    const { type } = this.data;
    const { position, instance } = event.detail;
    const that = this;
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          this.deletePerson(id).then(res => {
            that.drawList(type);
          });
          instance.close();
        }).catch(() => {
          instance.close();
        });
        break;
    }
  },

  // 获取列表
  getList(type) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/query';
    return wxRequest.postRequest(url, { type: type, orgId: app.globalData.userInfo.orgId }, app.globalData.sid);
  },

  drawList(type) {
    const that = this;
    this.getList(type).then(res => {
      let list = [];
      for (let item of res.data.rows) {
        if (item.postName != null && item.postName != '') {
          let obj = {
            name: item.fullName + '（' + item.postName + '）',
            id: item.id
          }
          list.push(obj)
        } else {
          let obj = {
            name: item.fullName,
            id: item.id
          }
          list.push(obj)
        }
      }
      that.setData({ list });
    })
  },

  // 删除整改责任人
  deletePerson(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/delete';
    return wxRequest.postRequest(url, [id], app.globalData.sid);
  },
})
