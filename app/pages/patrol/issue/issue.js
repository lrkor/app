var util = require('../../../utils/util.js') //引入微信自带的日期格式化
const app = getApp();
Page({
  data: {
    requirements: '',

    time: '',
    dutyPerson: '张三',
    level: '高级',
    cause: '驱蚊器翁群',

    // 选择类型
    type: '',

    dutyPersonArr: ['张三', '张三', '张三', '张三'],
    levelArr: ['一级', '一级', '一级', '一级'],
    causeArr: ['原因', '原因', '原因', '原因'],

    isTime: false,
    show: false,
    showTime: false,
    columns: [],

    currentDate: new Date().getTime(),

    number:0
  },
  onLoad: function (options) {
    let number = options.number;
    this.setData({
      number:number
    });
    wx.setNavigationBarTitle({
      title: '下发整改'
    })

    // 获取当前时间
    this.setData({
      time: util.formatTime(new Date(), 'yyyy-mm-dd hh:mm')
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
      } else {
        this.setData({
          columns: causeArr,
          type: 'cause'
        });
      }
    }

  },

  onConfirm(event) {
    this.setData({ show: false });
    let type = this.data.type;

    const { picker, value, index } = event.detail;
    console.log(value);
    if (type == 'dutyPerson') {
      this.setData({
        dutyPerson: value,
      });
    } else if (type == 'level') {
      this.setData({
        level: value,
      });
    } else {
      this.setData({
        cause: value,
      });
    }
  },
  onConfirmTime(event) {
    this.setData({
      showTime: false,
      time: util.formatTime(new Date(event.detail), 'yyyy-mm-dd hh:mm')
    });
  },

  onCancel() {
    this.setData({ show: false });
  },

  onClose() {
    console.log(111);
    this.setData({ show: false, showTime:false});
  },

  add(){
    let number = this.data.number;
    if(number==1){
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.navigateBack({
        delta: 2
      })
    }
  
  }
})
