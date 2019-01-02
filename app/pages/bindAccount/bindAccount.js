// pages/bindAccount.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTxt: false,
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '绑定账号',
    })
  },

  listenerUsernameInput: function(e) {
    this.data.username = e.detail.value;
  },
  /** 监听密码输入 */
  listenerPasswordInput: function(e) {
    this.data.password = e.detail.value;
  },

  loginAction: function() {
    var userName = this.data.username;
    var passwords = this.data.password;
    var that = this;
    if (userName === "") {
      wx.showToast({
        title: '账号不能为空！',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (passwords === "") {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'success',
        duration: 2000
      })
      return;
    }

    var urlStr = app.globalData.BaseURL + 'api/v1/userBind/bind'
    wx.request({
      method: "POST",
      url: urlStr,
      data: {
        openId: app.globalData.openid,
        loginName: userName,
        pwd: passwords
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: function(res) {
        if (res.data.code != '200') {
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
          return false;
        }

        var userInfo = res.data.data
        // 将token存储到本地
        wx.setStorageSync('userInfo', userInfo)

        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail: function() {
        wx.showToast({
          title: '登录失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})