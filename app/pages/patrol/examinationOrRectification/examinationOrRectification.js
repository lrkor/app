const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    type: 0,
    list: [],
    page: 1,
    isLoading: true,
    over:false
  },
  onLoad: function (options) {
    let type = options.type;
    let that = this;
    // type ==0 待我整改  type ==1 待我审批 type ==2 单位待办
    this.setData({
      type: type
    });
    if (type == 0) {
      that.getDwzg(1).then(res => {
        that.drawList(res.data.rows);
      })

      wx.setNavigationBarTitle({
        title: '待我整改'
      });
    } else if (type == 1) {
      wx.setNavigationBarTitle({
        title: '待我审批'
      });

      that.getDwsp(1).then(res => {
        that.drawList(res.data.rows);
      })
    } else {
      wx.setNavigationBarTitle({
        title: '单位待办'
      });

      that.getDwdb(1).then(res => {
        that.drawList(res.data.rows);
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
  getDwzg(page) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { status: 1, rectifyUserId: app.globalData.userId, size: 10, page: page };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取待我审批
  getDwsp(page) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { toAudit: 1, handlerId: app.globalData.userId, size: 10, page: page };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取单位待办
  getDwdb(page) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    let data = { orgId: app.globalData.userInfo.orgId, notFinish: 1, size: 10, page: page };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 渲染数据
  drawList(data, isLoading) {
    let list = data;
    let that = this;
    let listArr = this.data.list;
    // 格式化时间,类型
    if (list.length != 0) {
      for (let item of list) {
        item.isOverTime = item.dateline > new Date().getTime() ? false : true;
        item.createDate = util.formatTime(new Date(item.dateline), 'yyyy-mm-dd');
        item.createTime = util.formatTime(new Date(item.dateline), 'hh:mm');
      }
    }else{
      that.setData({
        over: true
      });
    }
    if (list.length < 10) {
      that.setData({
        isLoading: false
      });
    }
    if (isLoading) {
      that.setData({
        list: [...listArr, ...list]
      });
    } else {
      that.setData({
        list: list
      });
    }
  },


  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    let type = this.data.type;
    let that = this;
    this.setData({
      page: 1,
      isLoading: true
    });
    if (type == 0) {
      that.getDwzg(1).then(res => {
        that.drawList(res.data.rows);
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      })
    } else if (type == 1) {
      that.getDwsp(1).then(res => {
        that.drawList(res.data.rows);
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      })
    } else {
      that.getDwdb(1).then(res => {
        that.drawList(res.data.rows);
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      })
    }
  },

  onReachBottom() {
    let isLoading = this.data.isLoading;
    let type = this.data.type;
    let page = this.data.page;
    let that = this;
    if (isLoading) {
      wx.showLoading({
        title: '加载中',
      });

      page = page + 1;
      if (type == 0) {
        that.getDwzg(page).then(res => {
          that.drawList(res.data.rows,1);
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        })
      } else if (type == 1) {
        that.getDwsp(page).then(res => {
          that.drawList(res.data.rows,1);
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        })
      } else {
        that.getDwdb(page).then(res => {
          that.drawList(res.data.rows,1);
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        })
      }
    }
    // wx.showLoading({
    //   title: '玩命加载中',
    // })

    // 隐藏加载框
    //  wx.hideLoading();
  }
})
