//engineering.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
const app = getApp();
Page({
  data: {
    id: '1',
    page: 1,
    userInfo: {},
    hasUserInfo: false,
    isload: true,
    navData: [
      {
        id: '1',
        name: '推荐'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    infosArray: [],
    categoryId: '',
    isSlid: true
  },
  //事件处理函数
  onLoad: function () {
    let that = this;
    this.queryHeaderList();
    that.getRecommend('0', '0');
    wx.setNavigationBarTitle({
      title: '工程圈'
    })
  },

  //导航栏切换
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    let page1 = 1;
    // 获取导航栏id
    var id = event.currentTarget.dataset.id;
    this.setData({
      id: id,
      page: page1,
      isload: true
    })

    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  //滑动切换
  switchTab(event) {
    // 回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    var that = this;
    var cur = event.detail.current;

    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      isload: true,
      infosArray: [],
      page:1
    });

    var query = wx.createSelectorQuery();
    //选择id
    query.select('.active').boundingClientRect(function (rect) {
      let id = rect.dataset.id;
      that.setData({
        id:id
      })
      console.log(id);
      if (id == '1') {
        that.getRecommend('0', '0');
      } else {
        that.getOtherList(id, '0', '0');
      }
    }).exec();

  },

  //跳转详情页
  goDetaile(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let id = this.data.id;
    let page1 = 1;
    this.setData({
      page: page1,
      infosArray: []
    });
    if (this.data.id == '1') {
      this.getRecommend('1', '1');
    } else {
      this.getOtherList(id, '1', '1');
    }
  },

  //上拉加载
  onReachBottom() {
    let isload = this.data.isload;
    let id = this.data.id;
    if (isload) {
      // 显示加载图标
      wx.showLoading({
        title: '加载中'
      });
      let page1 = this.data.page + 1;
      this.setData({
        page: page1
      });
      if (id == '1') {
        this.getRecommend('1', '1');
      } else {
        this.getOtherList(id, '1', '1');
      }
    }

  },

  // 获取导航栏列表
  queryHeaderList() {
    var that = this;
    wx.request({
      url: 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/articleCategory/query',
      // url: 'http://192.168.1.40:8080/applet_web_war_exploded/api/articleCategory/query',
      method: 'POST',
      dataType: 'json',
      data: { status: '1' },
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
  getRecommend(isRefresh, isLoading) {
    var that = this;
    wx.request({
      url: 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/query',
      // url: 'http://192.168.1.40:8080/applet_web_war_exploded/api/article/query',
      method: 'POST',
      dataType: 'json',
      data: { isRecommend: '1', page: that.data.page, size: 10, isRelease: '1' },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (isRefresh == '1') {
          wx.hideNavigationBarLoading() //在标题栏中隐藏加载
          wx.stopPullDownRefresh();                       //停止下拉刷新
        }
        if (isLoading == '1') {
          // 隐藏加载框
          wx.hideLoading();
        }

        if (res.data.data != null && res.data.data.length < 10) {
          var isload = false;
        } else {
          var isload = true;
        }

        let RecommendArr = [...that.data.infosArray, ...res.data.data];

        // 格式化时间
        for (let item of RecommendArr) {
          item.createTime = util.formatTime(new Date(item.createTime), 'mm-dd');
        }
        that.setData({
          infosArray: RecommendArr,
          isload: isload
        });
      }
    })
  },

  // 获取其他列表
  getOtherList(id, isRefresh, isLoading) {
    var that = this;
    wx.request({
      url: 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/query',
      // url: 'http://192.168.1.40:8080/applet_web_war_exploded/api/article/query',

      data: { categoryId: id, page: that.data.page, size: 10, isRelease: '1' },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (isRefresh == '1') {
          wx.hideNavigationBarLoading() //在标题栏中隐藏加载
          wx.stopPullDownRefresh();                       //停止下拉刷新
        }

        if (isLoading == '1') {
          // 隐藏加载框
          wx.hideLoading();
        }

        if (res.data.data != null && res.data.data.length < 10) {
          var isload = false;
        } else {
          var isload = true;
        }

        let RecommendArr = [...that.data.infosArray, ...res.data.data];

        // 格式化时间
        for (let item of RecommendArr) {
          item.createTime = util.formatTime(new Date(item.createTime), 'mm-dd');
        }
        that.setData({
          infosArray: RecommendArr,
          isload: isload
        });
      }
    })
  }
})