const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');

Page({
  data: {
    url: '',
    activeNames: [0],
    videoList: [],
    cameraIcon: '../../../images/camera.png',
    picUrl: [],
    border: true
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '视频列表'
    })

    // console.log(options);
    let url = options.url;
    let imgUrl = []
    let orgId = options.orgId;
    let listUrl = app.globalData.sgmsUrl + '/api/v1/videoConfig/query';
    let data = { orgId: orgId }
    wxRequest.postRequest(listUrl, data).then(res => {
      if (res.data.rows == 0) {
        that.setData({
          border: false
        })
      }
      for (let items of res.data.rows) {
        for (let item of items.subVideoConfigList) {
          item.picUrl = app.globalData.sgmeImgUrl + item.picUrl
          imgUrl.push(item.picUrl)
          if (item.status == 1) {
            item.name = item.name + '（在线）'
          } else {
            item.name = item + '（离线）'
          }
        }
      }
      that.setData({
        videoList: res.data.rows,
        picUrl: imgUrl,
      })
    })
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          url: url
        });
      }
    })
  },

  //跳转到视频监控
  toDetail(e) {
    let that = this;
    that.videoDetail(e)
  },

  videoDetail(e) {
    // console.log(e)
    let that = this;
    let id = e.currentTarget.dataset.id;
    let serverUrl = app.globalData.sgmsUrl;
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../videoWeb/videoWeb?url=' + url + '&serverUrl=' + serverUrl + '&id=' + id
    })
  }
})
