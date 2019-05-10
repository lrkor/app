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
    inputValue: '',
    size: '10',
    isLoading:'1',
    isRefresh:'2'
  },


  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    let that = this;
    that.queryNoticeList()
  },

  //获取公告列表
  queryNoticeList(isLoading) {
    let that = this;
    let url = app.globalData.sgmsUrl+  '/api/v1/notice/query';
    let data = { mapParams: { title: that.data.inputValue }, page: that.data.page, size: that.data.size };
    return wxRequest.postRequest(url, data).then(res => {
      that.drawList(res,isLoading)
      wx.hideLoading();
    })
  },

  //渲染数据
  drawList(res,isLoading) {
    var that = this;
    let isload = false;
    if (res.data.rows != null && res.data.rows.length < 10) {
      isload = false
    } else {
      isload = true;
    }
    let ListArr = [];
    if (isLoading == '1' ) {
    //   // 隐藏加载框
      ListArr = [...that.data.logs, ...res.data.rows];
    } else {
      ListArr = res.data.rows;
    }
    // 格式化时间
    for (let item of ListArr) {
      item.createdTime = util.formatTime(new Date(item.createdTime), 'yyyy-mm-dd');
    }
    that.setData({
      logs: ListArr,
      isload: isload
    });
  },

  //上拉加载
  onReachBottom() {
    let isload = this.data.isload;
    let isLoading = this.data.isLoading;
    if (isload) {
      // 显示加载图标
      wx.showLoading({
        title: '数据加载中'
      });
      let page1 = this.data.page + 1;
      this.setData({
        page: page1
      });
      this.queryNoticeList(isLoading);
    }

  },

    //下拉刷新
    onPullDownRefresh:function(){ 
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
        this.queryNoticeList();
      }
      wx.stopPullDownRefresh()
    },
  
  //跳转详情页
  goDetaile(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  //搜索框文本内容显示
  inputBind(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //搜索
  Search() {
    let that = this;
    that.queryNoticeList()
    let isLoading=that.data.isLoading
    let url = app.globalData.sgmsUrl+  '/api/v1/notice/query';
    let data = { mapParams: { title: that.data.inputValue }, page: 0, size: 0 };
    return wxRequest.postRequest(url, data).then(res => {
      that.drawList(res,isLoading)
      wx.hideLoading();
    })
  }
})
