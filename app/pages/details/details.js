// pages/details/details.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
    title: '',
    typeName: '',
    date: '',
    content: ''
  },
  //事件处理函数
  onLoad: function (options) {
    this.getDetails(options.id);
  },

  // 获取详情
  getDetails(id) {
    var that = this;
    wx.request({
      url: 'http://192.168.1.40:8081/applet/api/article/get',
      data: { id: id },
      method: 'GET',
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        let article = res.data.data.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          title: res.data.data.title,
          date: util.formatDate(new Date(res.data.data.createTime))
        });
      }
    })
  }
})