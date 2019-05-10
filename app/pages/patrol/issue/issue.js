const util = require('../../../utils/util.js'); //引入微信自带的日期格式化
const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    requirements: '',

    time: '',
    dateline: new Date().getTime(),
    dutyPerson: '',
    level: '',
    cause: '',

    // 选择类型
    type: '',

    dutyPersonArr: [],
    dutyPersonList: [],

    levelArr: ['一般', '较大', '重大'],
    causeArr: [],
    causeList: [],


    isTime: false,
    show: false,
    showTime: false,
    causeShow: false,
    columns: [],

    currentDate: new Date().getTime(),
    minDate:new Date().getTime(),

    number: 0,
    businessId: '',
    causeResult: [],

    clicked:true
  },
  onLoad: function (options) {
    let number = options.number;
    let that = this;
    this.setData({
      number: number,
      businessId: options.id,
    });
    wx.setNavigationBarTitle({
      title: '下发整改'
    });

    this.getReason().then(res => {
      let arr = [];
      for (let item of res.data.rows) {
        arr.push(item.name)
      }
      that.setData({
        causeArr: arr,
        causeList: res.data.rows
      });
    });

    this.getperson().then(res => {
      let arr = [];
      for (let item of res.data.rows) {
        arr.push(item.fullName)
      }
      that.setData({
        dutyPersonArr: arr,
        dutyPersonList: res.data.rows
      });
    })

    // 获取当前时间
    this.setData({
      time: util.formatTime(new Date(), 'yyyy-mm-dd hh:mm')
    });
  },

  onChange(event) {
    this.setData({
      causeResult: event.detail
    });
  },

  toggle(event) {
    const id = event.currentTarget.dataset.id;
    const checkbox = this.selectComponent(`.checkboxes-${id}`);
    checkbox.toggle();
  },

  noop(){},

  // 确认选择
  proBtn() {
    let causeResult = this.data.causeResult;
    this.setData({
      cause: causeResult.join(','),
      causeShow: false
    });
  },

  select(e) {
    let data = this.data;
    let type = e.currentTarget.dataset.type;

    //获取选择值
    let dutyPersonArr = data.dutyPersonArr;
    let levelArr = data.levelArr;
    let causeArr = data.causeArr;

    if (type == 'time') {
      this.setData({ showTime: true });
    } else if (type == 'cause') {
      this.setData({
        columns: causeArr,
        causeShow: true,
        type: 'cause'
      });
    } else {
      this.setData({ show: true });
      if (type == 'dutyPerson') {
        this.setData({
          columns: dutyPersonArr,
          type: 'dutyPerson'
        });
      } else if (type == 'level') {
        this.setData({
          columns: levelArr,
          type: 'level'
        });
      }
    }
  },

  onConfirm(event) {
    this.setData({ show: false });
    let type = this.data.type;
    let cause = this.data.cause;

    const { picker, value, index } = event.detail;
    if (type == 'dutyPerson') {
      this.setData({
        dutyPerson: value,
      });
    } else if (type == 'level') {
      this.setData({
        level: value,
      });
    } else {
      if (cause == '') {
        cause = value;
      } else {
        cause = cause + ',' + value;
      }
      this.setData({
        cause: cause
      });
    }
  },
  onConfirmTime(event) {
    this.setData({
      showTime: false,
      time: util.formatTime(new Date(event.detail), 'yyyy-mm-dd hh:mm'),
      dateline: event.detail
    });
  },

  onCancel() {
    this.setData({ show: false });
  },

  onClose() {
    this.setData({ show: false, showTime: false, causeShow: false });
  },

  changeContent(e) {
    this.setData({
      requirements: e.detail
    });
  },

  add() {
    let data = this.data;
    let number = data.number;
    let level = data.level;
    let dutyPerson = data.dutyPerson;
    let dutyPersonList = data.dutyPersonList;
    let dateline = data.dateline;
    let businessId = data.businessId;
    let rectifyUserId = '';
    let analysisIds = [];
    let causeList = data.causeList;
    let causeResult = data.causeResult;

    for (let item of dutyPersonList) {
      if (item.fullName == dutyPerson) {
        rectifyUserId = item.userId;
      }
    }

    for (let i = 0; i < causeResult.length; i++) {
      for (let item of causeList) {
        if (item.name == causeResult[i]) {
          analysisIds.push(item.id);
        }
      }
    }
    level = level == '一般' ? 1 : level == '较大' ? 2 : 3;

    let data1 = {
      content: data.requirements,
      level: level,
      rectifyUserId: rectifyUserId,
      handlerId: rectifyUserId,
      dateline: dateline,
      businessId: businessId,
      businessType: '1',
      analysisIds: analysisIds
    }
    if (data1.content == '' || data1.level == '' || !data1.rectifyUserId || data1.analysisIds == []) {
      Toast.fail('请输入内容');
    } else {
      this.setData({clicked:false});
      this.addRectification(data1).then(res => {
        if (number == 1) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.navigateBack({
            delta: 2
          })
        }
      });
    }
  },

  // 下发整改
  addRectification(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/add';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取原因分析
  getReason() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectReasonAnalysis/query';
    return wxRequest.postRequest(url, {}, app.globalData.sid);
  },

  // 获取整改责任人
  getperson() {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/query';
    return wxRequest.postRequest(url, { type: 1, orgId: app.globalData.orgId }, app.globalData.sid);
  },
})
