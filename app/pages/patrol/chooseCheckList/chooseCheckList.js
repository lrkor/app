const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js') //引入微信自带的日期格式化
Page({
  data: {
    list: [],
    isLoading: true,
    page: 1
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查记录'
    });

    this.drawList(1);
    console.log(app.globalData.userInfo.orgId);
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../checkDetail/checkDetail?id=' + id,
    })
  },

  // 获取待下发整改（单位）
  getDxfzg(page) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/query';
    let data = { isNotify: '0', deleted: 1, inspectOrgId: app.globalData.userInfo.orgId, page: page, size: 10 };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 渲染数据
  drawList(page, isLoading) {
    let that = this;
    let listArr = this.data.list;
    this.getDxfzg(page).then(res => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      let list = res.data.rows
      // 格式化时间,类型
      if (list.length != 0) {
        for (let item of list) {
          item.createDate = util.formatTime(new Date(item.createTime), 'yyyy-mm-dd');
          item.createTime = util.formatTime(new Date(item.createTime), 'hh:mm');
        }
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
    });
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.setData({
      page: 1,
      isLoading: true
    });
    this.drawList(1);
  },

  onReachBottom() {
    let isLoading = this.data.isLoading;
    let page = this.data.page;
    if (isLoading) {
      wx.showLoading({
        title: '加载中',
      });
      page = page + 1;
      this.drawList(page, 1);
    }
  }
})
