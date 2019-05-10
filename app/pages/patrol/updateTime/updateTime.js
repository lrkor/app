const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js'); //引入微信自带的日期格式化
const app = getApp();
Page({
  data: {
    show: false,
    currentDate:'',
    minDate:new Date().getTime(),
    time:'请选择时间',
    rectifyId:'',
    content:'',
    newDateline:'',
    clicked:true,
    color:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '调整期限'
    });
    this.setData({
      rectifyId:options.rectifyId,
      currentDate:parseInt(options.dateline),
      newDateline:parseInt(options.dateline)
    });
  },

  showPopup(){
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onConfirmTime(event) {
    this.setData({
      newDateline:event.detail,
      time: util.formatTime(new Date(event.detail), 'yyyy-mm-dd hh:mm'),
      color:'color_333'
    });
    this.setData({ show: false });
  },

  onChange(event){
    this.setData({
      content:event.detail
    })
  },

  // 提交
  sub(){
    let {rectifyId,newDateline,content} = this.data;
    let json = {rectifyId,newDateline,content}
    this.setData({clicked:false})
    this.updateDateline(json).then(res=>{
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    })
  },

  // 调整期限
  updateDateline(data){
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectifyFlow/updateDateline';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  }
})
