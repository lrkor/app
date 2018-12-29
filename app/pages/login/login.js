const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //获取用户信息
              that.queryUsreInfo();
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      that.queryUsreInfo();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    wx.request({
      method: "POST",
      url: app.globalData.BaseURL + 'api/v1/userBind/query',
      data: {
        openId: app.globalData.openId
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: function(res) {
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        if (res.data && res.data.rows && res.data.rows.length > 0) {
          wx.switchTab({
            url: '/pages/index/index',
          })
          app.globalData.userInfo = res.data.rows[0];
        } else {
          wx.navigateTo({
            url: '/pages/bindAccount/bindAccount'
          })
        }
      }
    });
  },

})