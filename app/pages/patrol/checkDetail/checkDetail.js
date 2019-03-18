const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
Page({
  data: {
    state: 3,
    obj: {},
    createdTime: '',
    nature: '',
    imageList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查详情'
    });

    let id = options.id;
    let that = this;
    this.getDetail({ id: id }).then(res => {
      let imgArr = [];
      for (let item of res.data.data.fileList) {
        imgArr.push(app.globalData.sgmeImgUrl + item.filePath)
      }
      that.setData({
        obj: res.data.data,
        createdTime: util.formatTime(new Date(res.data.data.createTime), 'yyyy-mm-dd hh:mm'),
        imageList: imgArr
      });
      let nature = res.data.data.nature;
      that.getJcxs().then(res => {
        for (let item of res.data.rows) {
          if (item.value == nature) {
            that.setData({
              nature: item.name,
            })
          }
        }
      })
    })
  },

  // 编辑
  goEdit() {
    let id = this.data.obj.id;
    wx.navigateTo({
      url: '../editCheck/editCheck?id=' + id
    })
  },

  // 下发整改
  goIssue() {
    wx.navigateTo({
      url: '../issue/issue?number=2'
    })
  },

  // 获取详情
  getDetail(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/get';
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取检查形式数据字典
  getJcxs() {
    let url = app.globalData.sgmsUrl + '/api/v1/codeDict/systemSettingCodeDictList';
    return wxRequest.getRequest(url, { typeName: '检查形式' }, app.globalData.sid);
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    console.log(current);
    console.log(this.data.imageList);
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  // 分享
  onShareAppMessage(res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '检查详情',
      path: '/pages/patrol/checkDetail/checkDetail'
    }
  }

})
