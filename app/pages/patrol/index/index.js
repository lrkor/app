const wxRequest = require('../../../utils/wxRequest.js');
const app = getApp();
const sgmsUrl = app.globalData.sgmsUrl;
Page({
  data: {
    myRectification: 0,
    myExamination: 0,
    unitTodo: 0,
    momentum: 0,
    isShow:true,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '安全检查'
    });
    let that = this;
    this.getSid(app.globalData.openid).then(res => {
      app.globalData.sid = res.data.data;
      that.statisticsToDo().then(res => {
        if(!toRectify){
          that.setData({
            isShow:false
          });
        }
        that.setData({
          myRectification: res.data.data.toRectify,
          myExamination: res.data.data.toAudit,
          unitTodo: res.data.data.orgToDo,
          momentum: res.data.data.orgToAddRectify,
        });
      });
    })
  },

  goUnit(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../chooseUnit/chooseUnit?type=' + type,
    })
  },
  goTodo(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../examinationOrRectification/examinationOrRectification?type=' + type,
    })
  },

  goChooseCheckList() {
    wx.navigateTo({
      url: '../chooseCheckList/chooseCheckList',
    })
  },

  // 获取sid
  getSid(openid) {
    let url = sgmsUrl + '/api/v1/token';
    let data = { miniOpenId: openid };
    return wxRequest.getRequest(url, data);
  },

  //统计待办
  statisticsToDo() {
    let url = sgmsUrl + '/api/v1/inspect/statisticsToDo';
    let data = { miniOpenId: app.globalData.openid };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  }
})
