const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    id: '',
    type: '',
    name: '',
    workTeamName: '',
    workTeamLeader: '',
    attendeeNameList: [],
    createdTime: '',
    creatorName: '',
    videoSrc: '',
    imageList: [],
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    let { id } = options;
    let that = this;
    this.setData({ id: options.id });
    wx.setNavigationBarTitle({
      title: '班组教育详情'
    });

    this.getDetail(id).then(res => {
      wx.hideLoading();
      let data = res.data.data;
      let imageList = [];
      if (data.imageFiles && data.imageFiles.length > 0) {
        for (let item of data.imageFiles) {
          imageList.push(app.globalData.sgmeImgUrl + item.filePath)
        }
      }
      let { creatorName, createdTime, attendeeNameList, name } = data;
      let { workTeamLeader, workTeamName } = data.workTeam;
      let videoSrc = '';
      if (data.videoFile) {
        videoSrc = app.globalData.sgmeImgUrl + data.videoFile.filePath
      }
      that.setData({
        videoSrc,
        imageList,
        creatorName,
        attendeeNameList,
        workTeamLeader,
        workTeamName,
        name,
        createdTime: util.formatTime(new Date(createdTime), 'yyyy-mm-dd hh:mm'),
      })
    });
  },

  // 获取详情
  getDetail(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/safeActivity/teamTraining/get';
    return wxRequest.getRequest(url, { id }, app.globalData.sid);
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
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
      title: '班组教育详情详情',
      path: '/pages/team/detail/detail?id=' + id
    }
  }
})
