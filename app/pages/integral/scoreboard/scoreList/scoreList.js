const app = getApp();
const wxRequest = require('../../../../utils/wxRequest.js');
const util = require('../../../../utils/util.js');
Page({
  data: {
    orgId: '',
    orgName: '',
    page: 1,
    list: [],
    notSelf: '',
    btnShow: false,
    isLoading: true,
    over: false,
    active: 0,
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.setNavigationBarTitle({
      title: '考核记录'
    });

    if (app.globalData.userInfo.unitType != 3) {
      this.setData({
        notSelf: 1
      });
    }

    let orgId = options.orgId;
    let data = {
      orgId: orgId,
      notSelf: this.data.notSelf,
      page: 1,
      size: 10,
    }
    this.setData({
      orgId: orgId,
    });
    this.drawList(data);
  },

  onChange(event) {
    console.log(event.detail.index);
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  // 获取检查列表
  getList(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/query';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 渲染数据
  drawList(data, isLoading) {
    let that = this;
    let listArr = this.data.list;
    this.getList(data).then(res => {
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
      } else {
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
          list
        });
      }
    });
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    let data = {
      orgId: this.data.orgId,
      notSelf: this.data.notSelf,
      page: 1,
      size: 10,
    }
    this.setData({
      page: 1,
      isLoading: true
    });
    this.drawList(data);
  },

  onReachBottom() {
    let isLoading = this.data.isLoading;
    let page = this.data.page;
    let data = {};
    if (isLoading) {
      wx.showLoading({
        title: '加载中',
      });
      page = page + 1;
      data = {
        orgId: this.data.orgId,
        notSelf: this.data.notSelf,
        page: page,
        size: 10,
      }
      this.drawList(data, 1);
    }
  }
})
