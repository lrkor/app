// pages/details/details.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
var WxParse = require('../../wxParse/wxParse.js');
const regeneratorRuntime = require('../../utils/runtime.js');

const app = getApp();

Page({
  data: {
    title: '',
    typeName: '',
    date: '',
    content: '',
    visitTimes: ''
  },
  //事件处理函数
  onLoad: function (options) {
    let id = options.id;
    this.getDetails(id);
  
  },

  // 获取详情
  async getDetails(id) {
    var that = this;
    return wx.request({
      url: 'http://192.168.1.40:8081/applet/api/article/get',
      data: { id: id },
      method: 'GET',
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        let article = res.data.data.content;
        let typeName = res.data.data.categoryName;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          title: res.data.data.title,
          date: util.formatTime(new Date(res.data.data.createTime),'yyyy-mm-dd'),
          typeName:typeName
        });
        that.updata(res.data.data.id, res.data.data.visitTimes + 1);
      }
    })
  },

  updata(id, visitTimes) {
      wx.request({
        url: 'http://192.168.1.40:8081/applet/api/article/updateStatus',
        method: 'POST',
        dataType: 'json',
        data: { id: id, visitTimes: visitTimes },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
        }
      })
  }
})