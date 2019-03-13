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

    if (result == 'isQualified') {
      this.setData({
        isQualified: !isQualified
      })
    } else if (result == 'isWarning') {
      this.setData({
        isWarning: !isWarning
      })
    } else {
      this.setData({
        isRectification: !isRectification
      })
    }
    if (isRectification) {
      this.setData({
        isSend: false,
        onSend: false,
      })
    }
  },

  checkedState(e) {
    let isSend = this.data.isSend;
    let onSend = this.data.onSend;
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
    if (type == 1) {
      let json = {
        startTime: that.data.startTime,
        endTime: that.data.endTime,
      }
      app.globalData.checkFiltrate = json;
    } else {
      let json = {
        startTime: that.data.startTime,
        endTime: that.data.endTime,
      }
      app.globalData.rectificationFiltrate = json;
    }
    wx.navigateBack({
      delta: 1
    })
  }
})
