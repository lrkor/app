const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    content: '',
    value: '',
    radio: '1',
    isGetLocation: 0,
    locationVal: '',
    imageList: [],
    natureShow: false,
    natureVal: '',
    natureColumns: [],
    natureArr: [],

    itemShow: false,
    itemVal: '',
    itemColumns: [],
    itemArr: [],

    flowShow: false,
    flowVal: '',
    flowColumns: [],
    flowArr: [],

    state: '4',
    fileIds: [],
    id: '',
    isProblem: false,
    isPass: '1',
    status: '',

    fatherOrgId: '',
    shrShow: true,


    clicked: true,

    // list: ['a', 'b', 'c'],
    // result: []
  },
  onLoad: function (options) {
    let id = options.id;
    let status = options.status;
    let orgId = options.orgId;
    let type = options.type;
    type = parseInt(type) + 1;
    if (type > parseInt(status)) {
      this.setData({
        flowColumns: ['继续审核', '下一环节审核']
      });
    } else {
      this.setData({
        flowColumns: ['继续审核', '审核结束']
      });
    }
    if (status == 2) {
      this.setData({
        isProblem: true
      });
      this.getProblem(orgId).then(res => {
        let arr = [];
        if (res.data.rows && res.data.rows.length > 0) {
          for (let item of res.data.rows) {
            arr.push(item.name)
          }
        }
        that.setData({
          natureColumns: arr,
          natureArr: res.data.rows
        });
      });
    }

    let that = this;
    this.setData({
      id: id,
      status: status
    });
    wx.setNavigationBarTitle({
      title: '审批'
    });

    this.getFatherId().then(res => {
      that.setData({
        fatherOrgId: res.data.data.parentId,
      });

    })
  },

  changeContent(e) {
    this.setData({
      content: e.detail
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

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  // onChange(event) {
  //   this.setData({
  //     result: event.detail
  //   });
  // },

  // toggle(event) {
  //   const id = event.currentTarget.dataset.id;
  //   const checkbox = this.selectComponent(`.checkboxes-${id}`);
  //   checkbox.toggle();
  // },

  // // 确认选择
  // proBtn(){
  //   let result = this.data.result;
  //   this.setData({
  //     natureVal: result.join(','),
  //     natureShow:false
  //   });
  //   console.log(this.data.natureVal)
  // },

  onClose() {
    this.setData({ natureShow: false, itemShow: false, flowShow: false });
  },

  natureOnConfirm(event) {
    this.setData({
      natureShow: false,
      natureVal: event.detail.value
    });
  },

  itemOnConfirm(event) {
    this.setData({
      itemShow: false,
      itemVal: event.detail.value
    });

  },
  flowOnConfirm(event) {
    let that = this;
    this.setData({
      flowShow: false,
      flowVal: event.detail.value
    });
    if (event.detail.value == '继续审核') {
      this.getShrList(app.globalData.userInfo.orgId).then(res => {
        let arr = [];
        if (res.data.rows && res.data.rows.length > 0) {
          for (let item of res.data.rows) {
            arr.push(item.fullName)
          }
        }
        that.setData({
          itemColumns: arr,
          itemArr: res.data.rows,
          itemVal: '',
          shrShow: true
        });
      });
    } else if (event.detail.value == '下一环节审核') {
      this.getShrList(that.data.fatherOrgId).then(res => {
        let arr = [];
        if (res.data.rows && res.data.rows.length > 0) {
          for (let item of res.data.rows) {
            arr.push(item.fullName)
          }
        }
        that.setData({
          itemColumns: arr,
          itemArr: res.data.rows,
          itemVal: '',
          shrShow: true
        });
      });
    } else {
      that.setData({
        shrShow: false
      });
    }
  },

  selectNature() {
    this.setData({ natureShow: true });
  },

  selectItem() {
    this.setData({ itemShow: true });
  },
  selectFlow() {
    this.setData({ flowShow: true });
  },

  radioChange(e) {
    this.setData({
      isPass: e.detail.value
    })
  },

  // 提交新增
  submit() {
    let departId = '';
    let natureVal = this.data.natureVal;
    let natureArr = this.data.natureArr;
    let toHandlerId = '';
    let itemVal = this.data.itemVal;
    let itemArr = this.data.itemArr;
    for (let item of natureArr) {
      if (item.name == natureVal) {
        departId = item.id;
      }
    }

    for (let item of itemArr) {
      if (item.fullName == itemVal) {
        toHandlerId = item.userId;
      }
    }
    let data = {
      content: this.data.content,
      isPass: this.data.isPass,
      departId: departId,
      rectifyId: this.data.id,
      type: this.data.status,
      fileIds: this.data.fileIds,
      toHandlerId: toHandlerId
    }
    if (this.data.flowVal != '审核结束') {
      if (toHandlerId == '') {
        Toast.fail('请选择审批人');
        return;
      }
    }
    this.setData({
      clicked: false
    });
    this.addaudit(data).then(res => {
      wx.navigateBack({
        delta: 2
      })
    });
  },

  // 获取审核人列表
  getShrList(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/query';
    return wxRequest.postRequest(url, { type: 2, orgId: id }, app.globalData.sid);
  },

  // 获取orgId父id
  getFatherId() {
    let url = app.globalData.sgmsUrl + '/api/v1/org/get';
    return wxRequest.getRequest(url, { id: app.globalData.userInfo.orgId }, app.globalData.sid);
  },

  // 获取问题归属
  getProblem(orgId) {
    let url = app.globalData.sgmsUrl + '/api/v1/codeDict/queryDepartment';
    return wxRequest.postRequest(url, { codeObject: '2', typeCode: '02', orgId: orgId }, app.globalData.sid);
  },

  // 新增审批
  addaudit(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectifyFlow/add';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  }
})
