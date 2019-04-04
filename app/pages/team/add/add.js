const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    type: '',
    imageList: [],
    unitList: [],
    src: '',
    show: false,
    teamShow: false,
    personVal: '选择人员',
    teamVal: '选择班组',
    personValColor: true,
    teamValColor: true,
    psersonResult: [],
    teamColumns: [],
    teamArr: [],
    psersonList: [],
    permissionsObj: {},
    orgId: '',
    workTeamLeader: '',
    name: '',
    imageIds: [],
    videoFileId: '',
    teamId: '',
    attendeeIdList: [],
    checked:true
  },
  onLoad: function (options) {
    let that = this;
    let { orgId } = options;
    wx.setNavigationBarTitle({
      title: '新增班组教育'
    });

    // 获取权限
    this.getByOrg(orgId).then(res => {
      let permissionsObj = {};
      permissionsObj.photoIsOn = res.data.data.photoIsOn;
      permissionsObj.photoIsMust = res.data.data.photoIsMust;
      permissionsObj.videoIsOn = res.data.data.videoIsOn;
      permissionsObj.videoIsMust = res.data.data.videoIsMust;
      that.setData({ permissionsObj, orgId });
    });

    // 获取班组信息
    this.getTeam(orgId).then(res => {
      let data = res.data.rows;
      let teamColumns = [];
      let teamArr = [];
      if (data && data.length > 0) {
        for (let item of data) {
          teamColumns.push(item.workTeamName);
          teamArr.push({ id: item.id, workTeamName: item.workTeamName, workTeamLeader: item.workTeamLeader });
        }
        that.setData({ teamColumns, teamArr });
      }
    });
  },

  selectPerson() {
    let { teamVal, teamId, orgId } = this.data;
    let id = '';
    let that = this;
    if (teamVal == '选择班组') {
      Dialog.alert({
        message: '请先选择班组'
      }).then(() => { });
    } else {
      this.getPerson(orgId, teamId).then(res => {
        let { rows } = res.data;
        let psersonList = [];
        if (rows && rows.length > 0) {
          for (let item of rows) {
            psersonList.push({ id: item.id, name: item.fullName + '(' + item.code + ')' });
          }
          that.setData({ psersonList });
        }
      });
      this.setData({ show: true });
    }
  },

  onChange(event) {
    this.setData({
      psersonResult: event.detail
    });
  },

  toggle(event) {
    const { id } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${id}`);
    checkbox.toggle();
  },

  reset() {
    this.setData({
      psersonResult: []
    });
  },

  checkAll() {
    let { psersonList } = this.data;
    let psersonResult = [];
    for (let item of psersonList) {
      psersonResult.push(item.name);
    }
    this.setData({ psersonResult });
  },

  determine() {
    let { psersonResult, psersonList } = this.data;
    let attendeeIdList = [];
    if (psersonResult.length > 0) {
      for (let i = 0; i < psersonResult.length; i++) {
        for (let item of psersonList) {
          if (psersonResult[i] == item.name) {
            attendeeIdList.push(item.id);
          }
        }
      }
    }
    this.setData({
      attendeeIdList,
      show: false,
      personVal: psersonResult.join(';')
    });
    if (psersonResult.length > 0) {
      this.setData({
        personValColor: false,
      });
    }
  },

  onClose() {
    this.setData({
      show: false,
      teamShow: false
    });
  },

  selectTeam() {
    this.setData({
      teamShow: true,
    });
  },

  onConfirm(event) {
    const { picker, value, index } = event.detail;
    let { teamArr } = this.data;
    let workTeamLeader = '';
    let teamId = '';
    let timeStr = util.formatTime(new Date(new Date().getTime()), 'yyyy-mm-dd hh:mm');
    timeStr = timeStr.replace(/[^0-9]/ig, "");
    for (let item of teamArr) {
      if (value == item.workTeamName) {
        workTeamLeader = item.workTeamLeader;
        teamId = item.id;
      }
    }
    this.setData({
      teamId,
      workTeamLeader,
      name: value + '_' + timeStr,
      teamShow: false,
      teamVal: value,
      teamValColor: false,
      psersonResult:[],
      psersonList:[],
      personVal: '选择人员',
      personValColor:true
    });
  },

  // 新增教育
  add() {
    let { permissionsObj, name, imageIds, videoFileId, teamId, attendeeIdList } = this.data;
    if (permissionsObj.photoIsMust == 1) {
      if (imageIds.length == 0) {
        Dialog.alert({
          message: '请上传图片'
        }).then(() => { });
        return;
      }
    }
    if (permissionsObj.videoIsMust == 1) {
      if (videoFileId == '') {
        Dialog.alert({
          message: '请上传视频'
        }).then(() => { });
        return;
      }
    }
    if (name == '' || teamId == '' || attendeeIdList.length == 0) {
      Dialog.alert({
        message: '请填写信息'
      }).then(() => { });
    } else {
      this.setData({checked:false});
      this.addEducation({ attendeeIdList, name, videoFileId, teamId, imageIds }).then(res => {
        wx.redirectTo({
          url: '../detail/detail?id=' + res.data.data.id,
        })
      });
    }
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
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
          imageIds: fileArr
        })
      }
    })
  },

  chooseVideo() {
    const that = this;
    let videoFileId = '';
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        // 上传视频
        wx.uploadFile({
          url: app.globalData.sgmsUrl + '/api/v1/common/uploadFile?folderName=consulting', //仅为示例，非真实的接口地址
          filePath: res.tempFilePath,
          name: 'file',
          success: function (res) {
            let data = JSON.parse(res.data);
            videoFileId = data.data;
            that.setData({ videoFileId })
          }
        })
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  // 获取机构班组培训配置
  getByOrg(orgId) {
    let url = app.globalData.sgmsUrl + '/api/v1/orgTeamActivity/getByOrg';
    let data = { orgId };
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取班组信息
  getTeam(orgId) {
    let url = app.globalData.sgmsUrl + '/api/v1/workTeam/query';
    let data = { mapParams: { orgId } };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取选人信息
  getPerson(orgId, team) {
    let url = app.globalData.sgmsUrl + '/api/v1/staff/query';
    let data = { mapParams: { orgId, team } };
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 新增
  addEducation(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/safeActivity/teamTraining/add';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

})
