//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShow: false,
    engineeringName: '五峰山接线工程',
    orgName: '南通一标',
    //用户个人信息
    userInfo: {
      avatarUrl: "../../images/personal/1.png",//用户头像
      nickName: "张三",//用户昵称
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
    that.setDate({
      mername: options.mername
    })
    wx.setNavigationBarTitle({
      title: that.data.mername
    })
  },
  showToast: function (e) {
    var that = this
    that.setData({
      isShow: true,
      text: e
    })
    setTimeout(function () {
      that.setData({
        isShow: false
      })
    }, 1000)
  },
  goToWebView(e) {
    this.showToast('正在建设中')
  }
      
})

