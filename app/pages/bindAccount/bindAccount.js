// pages/bindAccount.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    showTxt: false,
    username: "",
    password: "",
    avatarUrl:'',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '绑定账号',
    })
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                avatarUrl:res.userInfo.avatarUrl,
                nickName:res.userInfo.nickName
              })
              //获取用户信息
              that.queryUserInfo();
            }
          });
          wx.getUserInfo({
            success: function(res) {
              that.avatarUrl = res.userInfo.avatarUrl;
            
            }
          })
        } else {
          that.showDialogBtn();
        }
      }
    })
  },

  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function() {},

  hideModal: function() {
    this.setData({
      showModal: false
    });
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      that.queryUserInfo();
      that.hideModal();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '我真的好为难啊',
        content: '没有你的授权信息，我们怎么愉快的为你服务？快来授权吧',
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
  queryUserInfo: function() {
    console.log(app.globalData.openid,'bbbbbbbbbbb');
    var that = this;
    wx.request({
      method: "GET",
      url: app.globalData.BaseURL + 'api/v1/userBind/getAppBindInfo',
      data: {
        openId: app.globalData.openid,
        appType:'2',
        unionId: app.globalData.unionId
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
        if (res.data.data!=null) {
          wx.setStorageSync('userInfo', res.data.data)
          app.globalData.userInfo = res.data.data;
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    });
  },

  listenerUsernameInput: function(e) {
    //存值
    this.setData({
      username: e.detail.value
    })
  },

  /** 监听密码输入 */
  listenerPasswordInput: function(e) {
    //存值
    this.setData({
      password: e.detail.value
    })
  },


  // 非聚焦函数：解决魅族不识别bindinput
  bindKeyBlurUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  bindKeyBlurPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
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

    var urlStr = app.globalData.BaseURL + 'api/v1/userBind/bindMini'
    wx.request({
      method: "POST",
      url: urlStr,
      data: {
        unionId:app.globalData.unionId,
        miniOpenId: app.globalData.openid,
        loginName: userName,
        userPwd: passwords,
        headImgUrl:that.data.avatarUrl,
        nickName:that.data.nickName
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
          url: '/pages/index/index',
          success: function(e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
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