const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    describe:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容',
    demand:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
    inspectBO:{},
    issue:{},
    rectification:{},
    inspectRectifyFlowList:[],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '流程日志'
    });
    let id = options.id;
    let that = this;
    this.getFlow(id).then(res=>{
      res.data.data.inspectBO.createTime = util.formatTime(new Date(res.data.data.inspectBO.createTime), 'mm-dd hh:mm');
      if(res.data.data.inspectBO){
        that.setData({
          inspectBO:res.data.data.inspectBO,
        });
      }
      if(res.data.data){
        res.data.data.createTime = util.formatTime(new Date(res.data.data.createTime), 'mm-dd hh:mm');
        that.setData({
          issue:res.data.data,
        });
      }
      if(res.data.data.inspectRectifyFlowList&&res.data.data.inspectRectifyFlowList.length>0){
        let arr = res.data.data.inspectRectifyFlowList;
        for(let item of arr){
          item.createTime = util.formatTime(new Date(item.createTime), 'mm-dd hh:mm');
        }
        that.setData({
          inspectRectifyFlowList:arr
        });
      }
    });
  },

  // 获取流程日志
  getFlow(id){
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/getFlow';
    return wxRequest.getRequest(url, { id:id }, app.globalData.sid);
  },
})
