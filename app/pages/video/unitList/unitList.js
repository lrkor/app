const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    type: '',
    unitList: [],
    unitList1: [],
    unitList2: [],
    unitList3: [],
    url: ''
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      url: options.url
    })

    // console.log(options)
    wx.setNavigationBarTitle({
      title: '单位选择'
    });
    this.getSid(app.globalData.openid).then(res => {
      // console.log(res)
      app.globalData.sid = res.data.data;
      that.getType().then(res => {
        // console.log(res)
        let xmb = []
        let zjb = []
        let zhb = []
        for (let item of res.data.rows) {
          if (item.type == 3) {
            xmb.push(item)
          } else if (item.type == 2) {
            zjb.push(item)
          } else {
            zhb.push(item)
          }
        }
        that.setData({
          unitList1: xmb,
          unitList2: zjb,
          unitList3: zhb,
        })
      })
    });

  },

  // 跳转列表页
  educationList(e) {
    // console.log(e)
    let { orgid, url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../videoList/videoList?orgId=' + orgid + '&url=' + url,
    })
  },

  //获取类型、单位列表
  getType() {
    let url = app.globalData.sgmsUrl + '/sys/api/org/getOrgList';
    let data = {};
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 获取sid
  getSid(openid) {
    let url = app.globalData.sgmsUrl + '/api/v1/token';
    let data = { miniOpenId: openid };
    return wxRequest.getRequest(url, data);
  },
})
