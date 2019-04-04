const wxRequest = require('../../../utils/wxRequest.js');
const app = getApp();
const sgmsUrl = app.globalData.sgmsUrl;
Page({
  data: {
    myRectification: 0,
    myExamination: 0,
    unitTodo: 0,
    momentum: 0,
    isShow:false,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '安全检查'
    });
    let that = this;
    // this.getSid(app.globalData.openid).then(res => {
    //   app.globalData.sid = res.data.data;
    //   that.statisticsToDo().then(res => {
    //     if(res.data.data.toRectify){
    //       that.setData({
    //         isShow:true
    //       });
    //     }
    //     that.setData({
    //       myRectification: res.data.data.toRectify?res.data.data.toRectify:0,
    //       myExamination: res.data.data.toAudit,
    //       unitTodo: res.data.data.orgToDo,
    //       momentum: res.data.data.orgToAddRectify
    //     });
    //   });
    // })
  },
  onShow(){
    let that = this;
    this.getSid(app.globalData.openid).then(res => {
      app.globalData.sid = res.data.data;
      that.statisticsToDo().then(res => {
        if(!res.data.data.toRectify){
          that.setData({
            isShow:false
          });
        }
        that.setData({
          myRectification: res.data.data.toRectify?res.data.data.toRectify:0,
          myExamination: res.data.data.toAudit,
          unitTodo: res.data.data.orgToDo,
          momentum: res.data.data.orgToAddRectify
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
  goSet(){
    wx.navigateTo({
      url: '../set/set',
    })
  },

  RewardPunishments(){
    wx.showToast({
      title: '正在建设中',
      image: '../../../images/success.png',
      duration: 2000
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
