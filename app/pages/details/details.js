// pages/details/details.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
var WxParse = require('../../wxParse/wxParse.js');
const wxRequest = require('../../utils/wxRequest.js')

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
    var that = this;
    // this.getDetails(id);
    this.getDetails(id)
      .then(res => {
        let article = res.data.data.content;
        let typeName = res.data.data.categoryName;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          title: res.data.data.title,
          date: util.formatTime(new Date(res.data.data.createTime), 'yyyy-mm-dd'),
          typeName: typeName
        });
        return {id: res.data.data.id, visitTimes: res.data.data.visitTimes + 1}
      }).then(res=>{
        that.updata(res.id,res.visitTimes);
      })
  },

  // 获取详情
  getDetails(id) {
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/get';
    let data = { id: id };
    return wxRequest.getRequest(url, data);
  },

  updata(id, visitTimes) {
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/updateStatus';
    let data = { id: id, visitTimes: visitTimes };
    return wxRequest.postRequest(url, data);
  }
})