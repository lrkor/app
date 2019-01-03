// pages/accountDeregulation/accountDeregulation.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userName: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: "账号解绑",
    })
    wx.getUserInfo({
      success: function (res) {
        wx.getStorage({
          key: 'userInfo',
          success(res) {
            that.data.userInfo = res.data;
            var userName = 'userInfo.userName';
            that.setData({
              [userName]: that.data.userInfo.userName,
            })
          }
        })
      }
    })
  },
  userBind(e) {
    wx.request({
      method: "GET",
      url: app.globalData.BaseURL + 'api/v1/userBind/unBind',
      data: {
        openId: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: function (res) {
        if (res.data.code != '200') {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        wx.clearStorageSync();
        wx.reLaunch({
          url: '/pages/bindAccount/bindAccount',
        })
      },
    })
  }

})