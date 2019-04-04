const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
var util = require('../../../utils/util.js'); //引入微信自带的日期格式化
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    state: 3,
    obj: {},
    createdTime: '',
    nature: '',
    imageList: [],
    id: '',
    show: false,
    actions: [
      {
        name: '整改详情'
      },
      {
        name: '分享',
        openType: 'share'
      }
    ],
    moreFore: false,
    addRectify: false,
    rectifyDetail: false,
    updateOrDelete: false,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '检查详情'
    });

    let id = options.id;

    this.setData({
      id: id
    });

    let that = this;
    this.getDetail({ id: id }).then(res => {
      let imgArr = [];
      app.globalData.orgId = res.data.data.orgId;
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
    });



    //获取权限
    this.queryPermissionButton(id).then(res => {
      console.log(res.data.data);
      if (res.data.data.addRectify && res.data.data.rectifyDetail && res.data.data.updateOrDelete) {
        this.setData({
          moreFore: true
        });
      } else {
        this.setData({
          addRectify: res.data.data.addRectify,
          rectifyDetail: res.data.data.rectifyDetail,
          updateOrDelete: res.data.data.updateOrDelete
        });
      }
    });
  },
  goRectifyDetail() {
    // 获取整改详情id
    let {id} = this.data;
    this.getRectificationDetailId(id).then(res => {
      wx.navigateTo({
        url: '../rectificationDetail/rectificationDetail?id=' + res.data.data.id
      })
    });

  },

  goMoreBtn() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
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
    let id = this.data.id;
    wx.navigateTo({
      url: '../issue/issue?number=2&id=' + id
    })
  },

  // 获取详情
  getDetail(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/get';
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取整改详情id
  getRectificationDetailId(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/getByInspect';
    return wxRequest.getRequest(url, { inspectId: id }, app.globalData.sid);
  },

  // 删除
  showDelete() {
    let id = this.data.id;
    let that = this;
    Dialog.confirm({
      message: '确认删除吗？'
    }).then(() => {
      // on confirm
      console.log(1);
      that.delete(id).then(res => {
        wx.navigateBack({
          delta: 1
        })
      });
    }).catch(() => {
      // on cancel
      console.log(2)
    });
  },
  delete(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/delete';
    return wxRequest.postRequest(url, [id], app.globalData.sid);
  },


  // 获取检查形式数据字典
  getJcxs() {
    let url = app.globalData.sgmsUrl + '/api/v1/codeDict/systemSettingCodeDictList';
    return wxRequest.getRequest(url, { typeName: '检查形式' }, app.globalData.sid);
  },

  // 获取检查按钮权限
  queryPermissionButton(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/queryPermissionButton';
    return wxRequest.getRequest(url, { id: id }, app.globalData.sid);
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
    let id = this.data.id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '检查详情',
      path: '/pages/patrol/checkDetail/checkDetail?id=' + id
    }
  }

})
