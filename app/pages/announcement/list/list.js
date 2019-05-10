
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
const app = getApp()
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    id: '1',
    page: 1,
    orgId: '',
    categoryId: '',
    isload: true,
    logs: [],
    imgSrc: ''
  },
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    let that = this;
    that.queryNewsList()
  },

  //获取新闻列表
  queryNewsList(id, isRefresh, isLoading) {
    let RecommendArr = [];
    let that = this;
    let url = app.globalData.sgmsUrl + '/api/v1/news/query';
    let data = { mapParams: {}, page: that.data.page, size: '10' };
    return wxRequest.postRequest(url, data).then(res => {
      that.drawList(res, isRefresh, isLoading)
      wx.hideLoading();
    })
  },

  //渲染数据
  drawList(res, isRefresh, isLoading) {
    var that = this;
    if (isRefresh == '1') {
      wx.hideNavigationBarLoading() //在标题栏中隐藏加载
      wx.stopPullDownRefresh();                       //停止下拉刷新
    }

    let isload = false;
    if (res.data.rows != null && res.data.rows.length < 10) {
      isload = false
    } else {
      isload = true;
    }
    let ListArr = [];
    if (isLoading == '1') {
      // 隐藏加载框
      wx.hideLoading();
      ListArr = [...that.data.infosArray, ...res.data.data];
    } else {
      ListArr = res.data.rows;
    }
    // 格式化时间
    for (let item of ListArr) {
      item.createdTime = util.formatTime(new Date(item.createdTime), 'yyyy-mm-dd');
    }
    that.setData({
      logs: ListArr,
      isload: isload,
      imgSrc: app.globalData.sgmeImgUrl  + ListArr[0].imageBean.filePath
    });
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
      this.queryNewsList();
    }

  },

  //跳转详情页
  goDetaile(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  // onPullDownRefresh() {
  //   wx.startPullDownRefresh()
  // }
})
