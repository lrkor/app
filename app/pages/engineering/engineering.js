//engineering.js
var util = require('../../utils/util.js') //引入微信自带的日期格式化
const wxRequest = require('../../utils/wxRequest.js')
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
    currentIdnex:0,
    currentTab: 0,
    navScrollLeft: 0,
    infosArray: [],
    categoryId: '',
    isTouch:true
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    let that = this;
    this.queryHeaderList().then(res => {
      let headerArr = res.data.data;
      let newNavData = [...that.data.navData, ...headerArr];
      that.setData({
        navData: newNavData
      });
    });
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
    // console.log(event.detail);
    // console.log(this.data.currentTab);
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

    this.setData({
      currentIdnex: cur,
      isload: true,
      infosArray: [],
      page: 1
    });
    this.eady();

    var query = wx.createSelectorQuery();
    //选择id
    query.select('.active').boundingClientRect(function (rect) {
      let id = rect.dataset.id;
      console.log(id);
      that.setData({
        id: id
      })
      wx.showLoading({
        title: '数据加载中',
      })
      if (id == '1') {
        that.getRecommend('0', '0');
      } else {
        that.getOtherList(id, '0', '0');
      }
    }).exec();

  },

  //获取节点宽度 把之前的相加起来 等于滚动条距离left的距离
  //重点设置在这里 设置滚动条的距离 
  eady() {
    var self = this;
    //获取导航的初始位置
    const query = wx.createSelectorQuery()
    query.selectAll('.nav-item').boundingClientRect();
    query.exec(function (res) {
      //遍历你当前的tab栏 之前的所有dom节点的宽 相加设置为滚动条滚去的scrollLeft 就搞定了
      var num = 0;
      for (var i = 0; i < self.data.currentIdnex; i++) {
        num += res[0][i].width
      }
      self.setData({
        navScrollLeft: Math.ceil(num)
      })
    })
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
        title: '数据加载中'
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
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/articleCategory/query';
    let data = { status: '1' };
    return wxRequest.postRequest(url, data);
  },

  // 获取推荐列表
  getRecommend(isRefresh, isLoading) {
    var that = this;
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/query';
    let data = { isRecommend: '1', page: that.data.page, size: 10, isRelease: '1' };
    that.recommend(url, data).then(res => {
      that.drawList(res, isRefresh, isLoading);
      wx.hideLoading();
    });
  },

  // 推荐列表接口
  recommend(url, data) {
    return wxRequest.postRequest(url, data);
  },

  // 获取其他列表
  getOtherList(id, isRefresh, isLoading) {
    var that = this;
    let url = 'https://wechatapplet.zhinengjianshe.com/wechatApplet/api/article/query';
    let data = { categoryId: id, page: that.data.page, size: 10, isRelease: '1' };
    that.otherList(url, data).then(res => {
      that.drawList(res, isRefresh, isLoading);
      wx.hideLoading();
    })
  },

  // 其他列表接口
  otherList(url, data) {
    return wxRequest.postRequest(url, data);
  },

  //渲染数据
  drawList(res, isRefresh, isLoading) {
    var that = this;
    if (isRefresh == '1') {
      wx.hideNavigationBarLoading() //在标题栏中隐藏加载
      wx.stopPullDownRefresh();                       //停止下拉刷新
    }
   
    let isload = false;
    if (res.data.data != null && res.data.data.length < 10) {
      isload = false
    } else {
      isload = true;
    }

    let RecommendArr = [];
    if (isLoading == '1') {
      // 隐藏加载框
      wx.hideLoading();

      RecommendArr = [...that.data.infosArray, ...res.data.data];
    }else{
      RecommendArr =res.data.data
    }

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