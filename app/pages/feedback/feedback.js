const app = getApp()
const wxRequest = require('../../utils/wxRequest.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    num: '200',
    content: '',
    imageList: [],

    // 图片数组
    fileIds: [],
    clicked: true,
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈'
    })
  },

  //改变剩余字数
  changeContent(e) {
    this.setData({
      content: e.detail.value,
      num: 200 - e.detail.value.length
    })
  },

  chooseImage() {
    const that = this;
    const content = that.data.content;
    let fileArr = [];
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      count: 9,
      success(res) {
        let tempFilePaths = res.tempFilePaths
        //上传照片
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.sgmsUrl + '/api/v1/common/uploadFile?folderName=consulting',
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              let data = JSON.parse(res.data);
              fileArr.push(data.data);
            }
          })
        }
        that.setData({
          imageList: res.tempFilePaths,
          fileIds: fileArr
        })
        console.log(that.data.fileIds)
      }
    })
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  //提交
  submission() {
    const that = this;
    const content = that.data.content;
    let url = app.globalData.sgmsUrl + '/api/v1/feedBack/add';
    if (!content) {
      Toast('请填写内容！');
    } else {
      let data = {
        "content": content,
        "creatorId": app.globalData.userInfo.userId,
        "creatorName": app.globalData.userInfo.userName,
        "fileIdList": that.data.fileIds,
        "orgId": app.globalData.userInfo.orgId,
        "projectName": app.globalData.userInfo.systemName,
        "sysCode": app.globalData.userInfo.systemCode,
        "tenderCode": app.globalData.userInfo.tenderCode,
        "tenderName": app.globalData.userInfo.tenderName
      };
      this.setData({clicked:false})
      return wxRequest.postRequest(url, data, app.globalData.sid).then(res => {
        if (res.data.code == 200 && res.data.success) {
          Toast('提交成功！');
          setTimeout(function () {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }, 3000)
        }
      })
    }

  },
})

