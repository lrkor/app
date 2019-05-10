const wxRequest = require('../../../utils/wxRequest.js');
const app = getApp();
Page({
  data:{

  },

  onLoad(){
    wx.setNavigationBarTitle({
      title: '积分考核'
    });
    this.getSid(app.globalData.openid).then(res=>{
      app.globalData.sid = res.data.data;
    })
  },
  goAssess(){
    wx.navigateTo({
      url: '../assess/chooseUnit/chooseUnit',
    })
  },
  goScoreboard(){
    wx.navigateTo({
      url: '../scoreboard/chooseUnit/chooseUnit',
    })
  },

  // 获取sid
  getSid(openid) {
    let url = app.globalData.sgmsUrl + '/api/v1/token';
    let data = { miniOpenId: openid };
    return wxRequest.getRequest(url, data);
  },
})