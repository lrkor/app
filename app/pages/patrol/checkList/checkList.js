const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
Page({
  data: {
    id: '',
    page: 1,
    size: 10,
    list: [],
    obj:{}
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查记录'
    });
    let id = options.id;
    let data = {
      id: id,
      page: 1,
      size: 10,
    }
    this.setData({
      id: id,
      obj:data
    });
    this.drawList(data);
  },

  onShow() {
    if(app.globalData.checkFiltrate.startDate){
      let id = this.data.id;
      let data = app.globalData.checkFiltrate;
      data.id = id;
      data.page = 1;
      data.size = 10;
      this.setData({
        page:1,
        obj:data
      });
      this.drawList(data);
      app.globalData.checkFiltrate = {};
    }
  },

  onSearch(event) {
    let fullName = event.detail;
    let that = this;
    let id = this.data.id;
    let data = {
      id: id,
      page: 1,
      size: 10,
      fullName:fullName
    }
    this.setData({
      page: 1,
      obj:data
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
  drawList(data){
    let that = this;
    this.getList(data).then(res => {
      let list = res.data.rows
      // 格式化时间,类型
      if(list.length!=0){
        for (let item of list) {
          item.createDate = util.formatTime(new Date(item.createTime), 'yyyy-mm-dd');
          item.createTime = util.formatTime(new Date(item.createTime), 'hh:mm');
        }
      }
      that.setData({
        list: list
      });
    });
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
