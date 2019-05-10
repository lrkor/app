const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    psersonResult: [],
    psersonList: [],
    rows: [],
    clicked:true
  },
  onLoad: function (options) {
    let type = options.type;
    this.setData({ type });
    this.drawList(type);
  },

  onChange(event) {
    this.setData({
      psersonResult: event.detail
    });
  },

  toggle(event) {
    const { id } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${id}`);
    checkbox.toggle();
  },
  noop() {},

  reset() {
    this.setData({
      psersonResult: []
    });
  },

  checkAll() {
    let { psersonList } = this.data;
    let psersonResult = [];
    for (let item of psersonList) {
      psersonResult.push(item.id);
    }
    this.setData({ psersonResult });
  },

  addPerson(){
    const that = this;
    let {type,psersonResult} = this.data;
    this.setData({clicked:false})
    this.update(type,psersonResult).then(res=>{
      wx.navigateBack({
        delta: 1,
      })
    })
  },

  // 查询机构用户
  queryIsSelectedUser(type) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/queryIsSelectedUser';
    return wxRequest.postRequest(url, { type: type, orgId: app.globalData.userInfo.orgId }, app.globalData.sid);
  },

  drawList(type) {
    const that = this;
    this.queryIsSelectedUser(type).then(res => {
      let rows = res.data.rows;
      let psersonResult = [];
      let psersonList = [];
      for (let item of rows) {
        if (item.selected == '1') {
          psersonResult.push(item.id);
        }
        if (item.postName != null && item.postName != '') {
          let obj = {
            name: item.fullName + '（' + item.postName + '）',
            id: item.id
          }
          psersonList.push(obj)
        } else {
          let obj = {
            name: item.fullName,
            id: item.id
          }
          psersonList.push(obj)
        }
      }
      that.setData({ psersonList ,psersonResult});
    })
  },

  update(type,userIdList) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/update';
    return wxRequest.postRequest(url, { type, userIdList,orgId: app.globalData.userInfo.orgId }, app.globalData.sid);
  }
})
