//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //用户个人信息
    avatarUrl: "../../images/personal/1.png",
    userInfo: {
      userName: "",
      systemName: "",
      tenderName: ""
    }
  },
  onLoad: function(options) {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.avatarUrl = res.userInfo.avatarUrl;
        wx.getStorage({
          key: 'userInfo',
          success(res) {
            that.data.userInfo = res.data;
            console.log(that.data.userInfo, 999);
            var avatarUrl = 'userInfo.avatarUrl';
            var userName = 'userInfo.userName';
            var systemName = 'userInfo.systemName';
            var tenderName = 'userInfo.tenderName';

            that.setData({
              [avatarUrl]: that.avatarUrl,
              [userName]: that.data.userInfo.userName,
              [systemName]: that.data.userInfo.systemName,
              [tenderName]: that.data.userInfo.tenderName,
            })
          }
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  goToWebView(e) {
    wx.showToast({
      title: '正在建设中',
      image: '../../images/success.png',
      duration: 2000
    })
  }

})