//engineering.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    navData: [
      {
        id: '1',
        name: '推荐'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    infosArray: []
  },
  //事件处理函数
  onLoad: function () {
    this.queryHeaderList();
    this.getRecommend();

  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;

    // 获取导航栏id
    var id = event.currentTarget.dataset.id;

    if (id == '1') {

    }else{
      this.getRecommend(id);
    }


    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;

    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })

    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  //跳转详情页
  goDetaile(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // wx.hideNavigationBarLoading() //在标题栏中显示加载

    // wx.startPullDownRefresh({
    //   success:function(){
    //     wx.stopPullDownRefresh();                       //停止下拉刷新
    //   }
    // })
  },

  // 获取导航栏列表
  queryHeaderList() {
    var that = this;
    wx.request({
      url: 'http://192.168.1.40:8081/applet/api/articleCategory/query',
      method: 'POST',
      dataType: 'json',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let headerArr = res.data.data;
        let newNavData = [...that.data.navData, ...headerArr];
        that.setData({
          navData: newNavData
        });
      }
    })
  },

  // 获取推荐列表
  getRecommend() {
    var that = this;
    wx.request({
      url: 'http://192.168.1.40:8081/applet/api/article/query',
      method: 'POST',
      dataType: 'json',
      data: {isRecommend:'1',page:'1',size:10},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let RecommendArr = res.data.data;

        // 格式化时间
        for (let item of RecommendArr) {
          item.createTime = util.formatDate(new Date(item.createTime));
        }
        that.setData({
          infosArray: RecommendArr
        });
      }
    })
  },

  // 获取其他列表
  getOtherlisr(id) {
    var that = this;
    wx.request({
      url: 'http://192.168.1.40:8081/applet/api/article/query',
      data: { id: id, page: '1', size: '10' },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let RecommendArr = res.data.data;

        // 格式化时间
        for (let item of RecommendArr) {
          item.createTime = util.formatDate(new Date(item.createTime));
        }
        that.setData({
          infosArray: RecommendArr
        });
      }
    })
  }
})