const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    list: [],
    page: 1,
    orgId: '',
    startTime: '开始日期',
    endTime: '结束日期',
    show: false,
    isLoading: true,
    showTime: false,
    currentDate: new Date().getTime(),
    type: '1',
    orgId: '',
    obj: {},
    over:false,
    btnShow:false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    console.log(app.globalData.userInfo.unitType);
    if(app.globalData.userInfo.unitType=='3'){
      this.setData({btnShow:true});
    }

    let orgId = options.orgId;
    wx.setNavigationBarTitle({
      title: '班组教育记录'
    });
    this.setData({ orgId });
    let data = {
      page: this.data.page,
      size: 10,
      mapParams: {
        orgId,
      }
    }
    this.setData({ obj: data })
    this.drawList(data);
  },

  onClose() {
    this.setData({ show: false });
  },

  onSearch(event) {
    let fullName = event.detail;
    let orgId = this.data.orgId;
    let data = {
      page: 1,
      size: 10,
      mapParams: {
        orgId,
        teamName: fullName
      }
    }
    this.setData({
      obj: data,
      page: 1
    });
    this.drawList(data);
  },

  filtrate() {
    this.setData({ show: true });
  },

  reset() {
    this.setData({ startTime: '开始日期', endTime: '结束日期' });
  },

  goAddCheck() {
    let { orgId } = this.data;
    wx.navigateTo({
      url: '../add/add?orgId=' + orgId,
    })
  },

  // 确认搜索
  confirm() {
    let { startTime, endTime, orgId } = this.data;
    if (startTime == '开始日期') {
      startTime = '';
    }
    if (endTime == '结束日期') {
      endTime = '';
    }
    let data = {
      page: 1,
      size: 10,
      mapParams: {
        orgId,
        startTime,
        endTime
      }
    }
    this.drawList(data);
    this.setData({ show: false, page: 1, obj: data });
  },

  onConfirmTime(event) {
    let type = this.data.type;
    let val = util.formatTime(new Date(event.detail), 'yyyy-mm-dd');
    if (type == 1) {
      this.setData({ startTime: val });
    } else {
      this.setData({ endTime: val });
    }
    this.setData({ showTime: false });
  },

  onClose() {
    this.setData({ showTime: false ,show:false});
  },

  seletTime(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      showTime: true,
      type: type
    });
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  //获取教育列表
  getList(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/safeActivity/teamTraining/query';
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
          item.createTime = util.formatTime(new Date(item.createdTime), 'yyyy-mm-dd hh:mm');
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
    });
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    let orgId = this.data.orgId;
    let data = {
      page: 1,
      size: 10,
      mapParams: {
        orgId
      }
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
    let obj = this.data.obj;
    let data = {};
    if (isLoading) {
      wx.showLoading({
        title: '加载中',
      });
      page = page + 1;
      obj.page = page;
      this.setData({ page })
      data = obj;
      this.drawList(data, 1);
    }
  }
})
