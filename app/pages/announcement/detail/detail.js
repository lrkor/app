// pages/details/details.js
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
var WxParse = require('../../../wxParse/wxParse.js');
const wxRequest = require('../../../utils/wxRequest.js');

const app = getApp();

Page({
  data: {
    downUrl: 'https://wechatapplet.zhinengjianshe.com/',
    title: '',
    creatorName: '',
    date: '',
    content: '',
    visitTimes: '',
    tenderName:'',
    border:false
  },
  //事件处理函数
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.setNavigationBarTitle({
      title: '详情'
    })
    let id = options.id;
    var that = this;
    this.getDetails(id)
      .then(res => {
        console.log(res)
        wx.hideLoading();
        let article = res.data.data.content;
        let creatorName = res.data.data.categoryName;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          title: res.data.data.title,
          date: util.formatTime(new Date(res.data.data.createdTime), 'yyyy-mm-dd'),
          creatorName: res.data.data.creatorName,
          tenderName:res.data.data.orgBean.tenderName,
          border:true
        });
        return { id: res.data.data.id, visitTimes: res.data.data.visitTimes + 1 }
      }).then(res => {
        that.updata(res.id, res.visitTimes);
      })
  },

  // 获取详情
  getDetails(id) {
    let url = app.globalData.sgmsUrl+ '/api/v1/news/get';
    let data = { id: id };
    return wxRequest.getRequest(url, data);
  },

  updata(id, visitTimes) {
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/updateStatus';
    let data = { id: id, visitTimes: visitTimes };
    return wxRequest.postRequest(url, data);
  },
})