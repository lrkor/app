var util = require('../../../utils/util.js') //引入微信自带的日期格式化
const app = getApp()
Page({
  data: {
    show: false,
    startTime: '开始时间',
    endTime: '结束时间',
    currentDate: new Date().getTime(),
    isStart: 1,

    // 检查结果
    isQualified: false,
    isWarning: false,
    isRectification: false,

    // 状态
    isSend: false,
    onSend: false,

    // 整改状态
    dzg: false,
    dsp: false,
    ybh: false,

    // 是否逾期
    wyq: false,
    yq: false,

    type: ''
  },
  onLoad: function (options) {
    let type = options.type;
    this.setData({
      type: type
    });
    wx.setNavigationBarTitle({
      title: '筛选'
    })
  },
  startTime() {
    this.setData({
      show: true,
      isStart: 1
    });
  },

  endTime() {
    this.setData({
      show: true,
      isStart: 2
    });
  },
  onClose() {
    this.setData({ show: false });
  },

  confirm(event) {
    let isStart = this.data.isStart;
    this.setData({ show: false });
    let time = util.formatTime(new Date(event.detail), 'yyyy-mm-dd');
    if (isStart == 1) {
      this.setData({
        startTime: time,
        currentDate: new Date().getTime()
      });
    } else {
      this.setData({
        endTime: time,
        currentDate: new Date().getTime()
      });
    }
  },

  // 检查筛选
  checkedResults(e) {
    let result = e.currentTarget.dataset.results;
    // 获取各个状态值
    let isQualified = this.data.isQualified;
    let isWarning = this.data.isWarning;
    let isRectification = this.data.isRectification;
    console.log(isRectification);

    if (result == 'isQualified') {
      this.setData({
        isQualified: !isQualified
      })
    } else if (result == 'isWarning') {
      this.setData({
        isWarning: !isWarning
      })
    } else {
      if (isRectification) {
        this.setData({
          isSend: false,
          onSend: false,
        })
      }
      this.setData({
        isRectification: !isRectification
      })
    }
  },

  checkedState(e) {
    let isSend = this.data.isSend;
    let onSend = this.data.onSend;
    let isRectification = this.data.isRectification;
    if (isRectification) {
      let state = e.currentTarget.dataset.state;
      if (state == 'isSend') {
        this.setData({
          isSend: !isSend
        })
      } else {
        this.setData({
          onSend: !onSend
        })
      }
    }
  },

  // 整改筛选筛选
  rectificationResults(e) {
    let result = e.currentTarget.dataset.results;
    // 获取各个状态值
    let dzg = this.data.dzg;
    let dsp = this.data.dsp;
    let ybh = this.data.ybh;

    if (result == 'dzg') {
      this.setData({
        dzg: !dzg
      })
    } else if (result == 'dsp') {
      this.setData({
        dsp: !dsp
      })
    } else {
      this.setData({
        ybh: !ybh
      })
    }
  },

  rectificationState(e) {
    let state = e.currentTarget.dataset.state;
    let wyq = this.data.wyq;
    let yq = this.data.yq;
    if (state == 'wyq') {
      this.setData({
        wyq: !wyq
      });
    } else {
      this.setData({
        yq: !yq
      });
    }
  },

  reset() {
    this.setData({
      startTime: '开始时间',
      endTime: '结束时间',
      isQualified: false,
      isWarning: false,
      isRectification: false,
      isSend: false,
      onSend: false,
      dzg: false,
      dsp: false,
      ybh: false,
      wyq: false,
      yq: false,
    });
  },

  determine() {
    let that = this;
    let type = that.data.type;
    let startDate =  that.data.startTime;
    let endDate = that.data.endTime;
    if(startDate=='开始时间'){
      startDate = '';
    }
    if(endDate=='结束时间'){
      endDate = '';
    }
    if (type == 1) {
      // 检查结果 
      let isQualified = that.data.isQualified;
      let isWarning = that.data.isWarning;
      let isRectification = that.data.isRectification;
      let resultList = [];




      if (isQualified) {
        resultList.push(1);
      }
      if (isWarning) {
        resultList.push(2);
      }
      if (isRectification) {
        resultList.push(3);
      }

      // 是否下发整改
      let isSend = that.data.isSend;
      let onSend = that.data.onSend;
      let isNotify = '0';

      let json = {};
      if (isSend && onSend) {
        json = {
          startDate: startDate,
          endDate: endDate,
          resultList: resultList
        }
      } else {
        if(isSend){
          isNotify = '0'
        }
        if(onSend){
          isNotify = '1'
        }
        json = {
          startDate: startDate,
          endDate: endDate,
          resultList: resultList,
          isNotify:isNotify
        }
      }
      app.globalData.checkFiltrate = json;
    } else {
      // 整改筛选
      let data = this.data;
      let dzg = data.dzg;
      let dsp = data.dsp;
      let ybh = data.ybh;
      let statusList = [];

      //是否逾期
      let wyq =  data.wyq;
      let yq =  data.yq;
      let outDateline = '';
      let inDateline = '';

      if(dzg){
        statusList.push(1);
      }
      if(dsp){
        statusList.push(2,3,4);
      }
      if(ybh){
        statusList.push(5);
      }

      if(wyq){
        inDateline = 1;
      }
      if(yq){
        outDateline = 1;
      }


      let json = {
        startDate: startDate,
        endDate: endDate,
        statusList:statusList,
        outDateline:outDateline,
        inDateline:inDateline
      }
      app.globalData.rectificationFiltrate = json;
    }
    wx.navigateBack({
      delta: 1
    })
  }
})
