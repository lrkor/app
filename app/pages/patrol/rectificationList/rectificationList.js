const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    list: [],
    page: 1,
    notSelf: '',
    orgId: '',
    obj: {},
    obj1: {},
    isLoading: true
  },
  onLoad: function (options) {
    let orgId = options.orgId;
    wx.setNavigationBarTitle({
      title: '整改记录'
    });
    if (app.globalData.userInfo.unitType != 3) {
      this.setData({
        notSelf: 1
      });
    }

    let data = {
      orgId: orgId,
      notSelf: this.data.notSelf,
      page: 1,
      size: 10
    }

    this.setData({
      orgId: orgId,
      obj: data
    });

    this.drawList(data);
  },

  onShow() {
    if (JSON.stringify(app.globalData.rectificationFiltrate) != '{}') {
      let orgId = this.data.orgId;
      let data = app.globalData.rectificationFiltrate;
      data.orgId = orgId;
      data.notSelf = this.data.notSelf;
      data.page = 1;
      data.size = 10;
      this.setData({
        page: 1,
        obj1: data
      });
      this.drawList(data);
      app.globalData.rectificationFiltrate = {};
    }
  },

  filtrate() {
    wx.navigateTo({
      url: '../filtrate/filtrate?type=2',
    })
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../rectificationDetail/rectificationDetail?id=' + id,
    })
  },

  //获取整改列表
  getList(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
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
          item.isOverTime = item.dateline > new Date().getTime() ? false : true;
          item.createDate = util.formatTime(new Date(item.dateline), 'yyyy-mm-dd');
          item.createTime = util.formatTime(new Date(item.dateline), 'hh:mm');
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

    // wx.stopPullDownRefresh();
  },

  onReachBottom() {
    let isLoading = this.data.isLoading;
    let page = this.data.page;
    let obj1 = this.data.obj1;
    let obj = this.data.obj;
    let data = {};
    if (isLoading) {
      wx.showLoading({
        title: '加载中',
      });
      page = page + 1;
      if (JSON.stringify(obj1) != '{}') {
        obj1.page = page;
        data = obj1;
      } else if (JSON.stringify(obj) != '{}') {
        obj.page = page;
        data = obj;
      } else {
        data = {
          orgId: this.data.orgId,
          notSelf: this.data.notSelf,
          page: page,
          size: 10,
        }
      }
      this.drawList(data, 1);
    }
  }
})
