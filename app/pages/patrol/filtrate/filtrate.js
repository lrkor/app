var util = require('../../../utils/util.js') //引入微信自带的日期格式化
const app = getApp()
Page({
  data: {
    show: false,
    startTime: '开始时间',
    endTime: '结束时间',
    currentDate: new Date().getTime(),
    isStart: 1,
    results: '5',
    state: '5',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '筛选'
    })
  },
  startTime() {
    this.setData({
      show: true,
      isStart: 1
    });
  },

  endTime() {
    this.setData({
      show: true,
      isStart: 2
    });
  },
  onClose() {
    this.setData({ show: false });
  },

  confirm(event) {
    let isStart = this.data.isStart;
    this.setData({ show: false });
    let time = util.formatTime(new Date(event.detail), 'yyyy-mm-dd');
    if (isStart == 1) {
      this.setData({
        startTime: time,
        currentDate: new Date().getTime()
      });
    } else {
      this.setData({
        endTime: time,
        currentDate: new Date().getTime()
      });
    }
  },

  checkedResults(e) {
    let results = e.currentTarget.dataset.results;
    this.setData({
      results: results
    })
  },

  checkedState(e) {
    let state = e.currentTarget.dataset.state;
    this.setData({
      state: state
    })
  },
  reset() {
    this.setData({
      startTime: '开始时间',
      endTime: '结束时间',
      results: '5',
      state: '5',
    });
  },

  determine() {
    let that = this;
    let json = {
      startTime: that.data.startTime,
      endTime: that.data.endTime,
      results: that.data.results,
      state: that.data.state,
    }
    app.globalData.checkFiltrate = json;
    wx.navigateBack({
      delta: 1
    })
  }
})
