const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: 0,
    list: [
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: true,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 0,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: true,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 1,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: false,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 2,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: false,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 0,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: true,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 0,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
      {
        id: 1,
        number: 'XT-NT1_20190001',
        isSend: true,
        check_type: '临边防护',
        type: '项目部自查',
        describe: '防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results: 0,
        createPeople: '张三',
        createDate: '2019-03-07',
        createTime: '11:04',
      },
    ]
  },
  onLoad: function (options) {
    let type = options.type;
    let that = this;
    // type ==0 待我整改  type ==1 待我审批 type ==2 单位待办
    this.setData({
      type: type
    });
    if (type == 0) {
      that.getDwzg().then(res => {
        console.log(res);
      })

      wx.setNavigationBarTitle({
        title: '待我整改'
      })
    } else if (type == 1) {
      wx.setNavigationBarTitle({
        title: '待我审批'
      });

      that.getDwsp().then(res => {
        console.log(res);
      })
    } else {
      wx.setNavigationBarTitle({
        title: '单位待办'
      });

      that.getDwdb().then(res => {
        console.log(res);
      })
    }

  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../rectificationDetail/rectificationDetail?id=' + id,
    })
  },

  // 获取待我整改
  getDwzg() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { status: 1, rectifyUserId: app.globalData.userId };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取待我审批
  getDwsp() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { toAudit: 1, handlerId: app.globalData.userId };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取单位待办
  getDwdb() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { orgId: app.globalData.userInfo.orgId, notFinish: 1 };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },


  onPullDownRefresh() {
    // wx.showNavigationBarLoading();
    // wx.stopPullDownRefresh();
  },

  onReachBottom() {
    // wx.showLoading({
    //   title: '玩命加载中',
    // })

    // 隐藏加载框
    //  wx.hideLoading();
  }
})
