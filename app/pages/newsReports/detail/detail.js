// pages/details/details.js
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
var WxParse = require('../../../wxParse/wxParse.js');
const wxRequest = require('../../../utils/wxRequest.js');

const app = getApp();

Page({
  data: {
    fileList: [],
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
          fileList: res.data.data.files,
          date: util.formatTime(new Date(res.data.data.createdTime), 'yyyy-mm-dd'),
          creatorName:  res.data.data.creatorName,
          tenderName:res.data.data.unitName,
          border:true
        });
        return { id: res.data.data.id, visitTimes: res.data.data.visitTimes + 1 }
      }).then(res => {
        that.updata(res.id, res.visitTimes);
      })
  },

  // 获取详情
  getDetails(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/notice/get';
    let data = { id: id };
    return wxRequest.getRequest(url, data);
  },

  downloadFile: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        wx.saveFile({
          tempFilePath: filePath,
          success(res) {
            // const savedFilePath = res.savedFilePath
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  },


  //预览插件
  openFile: function (e) {
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
          fileType: type,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '不支持打开此类文件',
              showCancel:false,
              success:function(res){
                  if(res.cancel){
                  }else if(res.confirm){
                   
                  }
              }
            });
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
          
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  },
})