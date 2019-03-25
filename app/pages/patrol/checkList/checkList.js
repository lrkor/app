const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    orgId: '',
    page: 1,
    list: [],
    obj: {},
    obj1: {},
    notSelf: '',
    btnShow: false,
    isLoading: true
  },
  onLoad(options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '检查记录'
    });

    // 获取权限
    this.hasPermission().then(res => {
      that.setData({
        btnShow: res.data.data
      });
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

  onShow() {
    if (JSON.stringify(app.globalData.checkFiltrate) != '{}') {
      let orgId = this.data.orgId;
      let data = app.globalData.checkFiltrate;
      data.orgId = orgId;
      data.notSelf = this.data.notSelf;
      data.page = 1;
      data.size = 10;
      this.setData({
        page: 1,
        obj1: data,
        isLoading: true
      });
      this.drawList(data);
      app.globalData.checkFiltrate = {};
    }
  },

  onSearch(event) {
    let fullName = event.detail;
    let orgId = this.data.orgId;
    let data = {
      orgId: orgId,
      notSelf: this.data.notSelf,
      page: 1,
      size: 10,
      fullName: fullName
    }
    this.setData({
      page: 1,
      obj: data
    })
    this.drawList(data);
  },

  filtrate() {
    wx.navigateTo({
      url: '../filtrate/filtrate?type=1',
    })
  },

  goAddCheck() {
    wx.navigateTo({
      url: '../addCheck/addCheck',
    })
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../checkDetail/checkDetail?id=' + id,
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

  // 获取按钮权限
  hasPermission() {
    let url = app.globalData.sgmsUrl + '/sys/api/permission/hasPermission';
    return wxRequest.getRequest(url, { code: 'inspect:add' }, app.globalData.sid);
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
