const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    value: '',
    content: '',
    isGetLocation: 0,
    locationVal: '',
    imageList: [],
    natureVal: '',
    itemShow: false,
    itemVal: '',
    itemColumns: [],
    itemArr: [],
    state: '4',
    id: '',
    fileIds: [],

    clicked:true
  },
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    this.setData({
      id: id
    });
    wx.setNavigationBarTitle({
      title: '整改回复'
    });

    this.getShrList().then(res => {
      let arr = [];
      if (res.data.rows && res.data.rows.length > 0) {
        for (let item of res.data.rows) {
          arr.push(item.fullName)
        }
      }
      that.setData({
        itemColumns: arr,
        itemArr: res.data.rows
      });


    })
  },

  chooseImage() {
    const that = this;
    let fileArr = [];
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      count: 8,
      success(res) {
        let tempFilePaths = res.tempFilePaths
        //上传照片
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.sgmsUrl + '/api/v1/common/uploadFile?folderName=consulting', //仅为示例，非真实的接口地址
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
      }
    })
  },

  changeContent(e) {
    this.setData({
      content: e.detail
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

  changeNatureVal(e) {
    this.setData({
      natureVal: e.detail
    })
  },

  onClose() {
    this.setData({ itemShow: false });
  },


  itemOnConfirm(event) {
    this.setData({
      itemShow: false,
      itemVal: event.detail.value
    });
  },

  onCancel() {
    this.setData({ itemShow: false });
  },

  selectItem() {
    this.setData({ itemShow: true });
  },


  // 提交新增
  submit() {
    let itemVal = this.data.itemVal;
    let itemArr = this.data.itemArr;
    let toHandlerId = '';
    for (let item of itemArr) {
      if (item.fullName == itemVal) {
        toHandlerId = item.userId
      }
    }
    let data = {
      content: this.data.content,
      rectifyId: this.data.id,
      fileIds: this.data.fileIds,
      type: '1',
      laterMeasures: this.data.natureVal,
      toHandlerId: toHandlerId,
    }
    if(toHandlerId==''){
      Toast.fail('请选择审核人');
    }else{
      this.setData({
        clicked:false
      });
      this.addReply(data).then(res => {
        wx.navigateBack({
          delta: 2
        })
      })
    }
  },

  // 获取审核人列表
  getShrList() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/query';
    return wxRequest.postRequest(url, { type: 2, orgId: app.globalData.userInfo.orgId }, app.globalData.sid);
  },

  // 提交整改
  addReply(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectifyFlow/add';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取orgId父id
  getFatherId() {
    let url = app.globalData.sgmsUrl + '/api/v1/org/get';
    return wxRequest.postRequest(url, { id: app.globalData.userInfo.orgId }, app.globalData.sid);
  },
})
