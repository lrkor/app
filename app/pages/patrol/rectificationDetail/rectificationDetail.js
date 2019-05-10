const util = require('../../../utils/util.js'); //引入微信自带的日期格式化
const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    state: 0,
    obj: {},
    person: '',
    imgList: [],
    imgList1: [],
    time: '',
    dateline:'',
    isOverdue: true,
    releaseTime: '',
    releasePerson: '',
    checkItem: '临边防护',
    headPerson: '',
    level: '一般',
    isMore: true,
    rectificationPerson: '',
    rectificationTime: '',
    list: [],
    id: '',
    zgnr: false,
    zgnrObj: '',
    flowArr: [],

    audit: false,
    rectify: false,
    transfer:false,
    updateDateline:false,

    show:false,

    actions: [
      {
        name:'流转日志'
      },
      {
        name: '分享',
        openType: 'share'
      }
    ],
  },
  onLoad: function (options) {
    let id = options.id;
    wx.setNavigationBarTitle({
      title: '整改详情'
    });
    this.setData({
      id: id
    });
    
  },

  onShow(){
    let {id} = this.data;
    let that = this;
    this.getDetail(id).then(res => {
      let imgArr = [];
      let imgArr1 = [];
      let flowArr = [];
      if (res.data.data.inspectBO.fileList && res.data.data.inspectBO.fileList.length > 0) {
        for (let item of res.data.data.inspectBO.fileList) {
          imgArr.push(app.globalData.sgmeImgUrl + item.filePath)
        }
      }


      let [zgnr, rectificationTime, zgnrObj] = [false, '', {}];
      if (res.data.data.inspectRectifyFlowList && res.data.data.inspectRectifyFlowList.length > 0) {
        zgnr = true;
        rectificationTime = util.formatTime(new Date(res.data.data.inspectRectifyFlowList[0].createTime), 'yyyy-mm-dd hh:mm');
        zgnrObj = res.data.data.inspectRectifyFlowList[0];


        if (res.data.data.inspectRectifyFlowList[0].fileList && res.data.data.inspectRectifyFlowList[0].fileList.length > 0) {
          for (let item of res.data.data.inspectRectifyFlowList[0].fileList) {
            imgArr1.push(app.globalData.sgmeImgUrl + item.filePath)
          }
        };
        if (res.data.data.xmbAuditList && res.data.data.xmbAuditList.length > 0) {
          for (let item of res.data.data.xmbAuditList) {
            item.createTime = util.formatTime(new Date(item.createTime), 'yyyy-mm-dd hh:mm')
          }
        }

        if (res.data.data.jlAuditList && res.data.data.jlAuditList.length > 0) {
          for (let item of res.data.data.jlAuditList) {
            item.createTime = util.formatTime(new Date(item.createTime), 'yyyy-mm-dd hh:mm')
          }
        }

        if (res.data.data.zhbAuditList && res.data.data.zhbAuditList.length > 0) {
          for (let item of res.data.data.zhbAuditList) {
            item.createTime = util.formatTime(new Date(item.createTime), 'yyyy-mm-dd hh:mm')
          }
        }


        flowArr = [
          {
            name: '项目部审批',
            list: res.data.data.xmbAuditList
          },
          {
            name: '监理审批',
            list: res.data.data.jlAuditList
          },
          {
            name: '指挥部审批',
            list: res.data.data.zhbAuditList
          },
        ]
      }
      that.setData({
        obj: res.data.data,
        imgList: imgArr,
        imgList1: imgArr1,
        time: util.formatTime(new Date(res.data.data.dateline), 'yyyy-mm-dd hh:mm'),
        dateline: res.data.data.dateline,
        isOverdue: res.data.data.dateline > new Date().getTime() ? false : true,
        releaseTime: util.formatTime(new Date(res.data.data.inspectBO.createTime), 'yyyy-mm-dd hh:mm'),
        zgnr: zgnr,
        rectificationTime: rectificationTime,
        zgnrObj: zgnrObj,
        flowArr: flowArr
      });
    });

    // 获取整改详情权限按钮
    this.queryPermissionButton(id).then(res => {
      let data1 = res.data.data;
      let num = 0;
      Object.keys(data1).map((key,item)=>{
        if(data1[key]){
          num++;
        }
      })
      if(num>2){
        that.setData({
          state:'1',
          audit: data1.audit,
          rectify: data1.rectify,
          transfer: data1.transfer,
          updateDateline: data1.updateDateline
        });
      }else{
        that.setData({
          audit: data1.audit,
          rectify: data1.rectify,
          transfer: data1.transfer,
          updateDateline: data1.updateDateline
        });
      }
    });
  },

  isMore() {
    let isMore = this.data.isMore;
    if (isMore) {
      this.setData({
        isMore: !isMore
      })
    }
  },

  goMoreBtn() {
    this.setData({
      show: true
    });
  },

  onSelect(event) {
    let id = this.data.id;
    console.log(event.detail);
    if(event.detail.name=='流转日志'){
      wx.navigateTo({
        url: '../process/process?id=' + id,
      })
    }
  },

  onClose(){
    this.setData({show:false});
  },

  // 跳转期限
  goUpdateTime(){
    let {id,dateline} = this.data;
    wx.navigateTo({
      url: '../updateTime/updateTime?rectifyId=' + id + '&dateline=' + dateline,
    })
  },

  // 转派
  goRedeploy(){
    let {id} = this.data;
    wx.navigateTo({
      url: '../redeploy/redeploy?rectifyId=' + id,
    })
  },

  goIssue() {
    let id = this.data.id;
    wx.navigateTo({
      url: '../reply/reply?id=' + id,
    })
  },
  goApproval() {
    let id = this.data.id;
    let obj = this.data.obj;
    wx.navigateTo({
      url: '../approval/approval?id=' + id + '&status=' + obj.status + '&orgId=' + obj.inspectBO.orgId + '&type=' + obj.type,
    })
  },
  goProcess() {
    let id = this.data.id;
    wx.navigateTo({
      url: '../process/process?id=' + id,
    })
  },

  // 获取详情
  getDetail(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/get';
    return wxRequest.getRequest(url, { id: id }, app.globalData.sid);
  },

  // 获取整改详情权限按钮
  queryPermissionButton(id) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/queryPermissionButton';
    return wxRequest.getRequest(url, { id: id }, app.globalData.sid);
  },

  // 分享
  onShareAppMessage(res) {
    let id = this.data.id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '整改详情',
      path: '/pages/patrol/rectificationDetail/rectificationDetail?id=' + id
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
  // 图片预览
  previewImage1(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imgList
    })
  },
  previewImage1(e) {
    console.log(this.data.imageList1)
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imgList1
    })
  },
})
