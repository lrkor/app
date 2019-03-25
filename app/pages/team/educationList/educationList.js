const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    list: [
      {
        number: '桥面板_201910010505',
        teamName: '一班',
        groupLeader: '张三',
        createName: '王五',
        createTime: '2019-02-12 12:32',
      },
      {
        number: '桥面板_201910010505',
        teamName: '一班',
        groupLeader: '张三',
        createName: '王五',
        createTime: '2019-02-12 12:32',
      },
      {
        number: '桥面板_201910010505',
        teamName: '一班',
        groupLeader: '张三',
        createName: '王五',
        createTime: '2019-02-12 12:32',
      },
      {
        number: '桥面板_201910010505',
        teamName: '一班',
        groupLeader: '张三',
        createName: '王五',
        createTime: '2019-02-12 12:32',
      },
    ],
    page: 1,
    orgId: '',
    startTime: '开始日期',
    endTime: '结束日期',
    show: false,
    isLoading: true,
    showTime: false,
    currentDate: new Date().getTime(),
    type:'1'
  },
  onLoad: function (options) {
    let orgId = options.orgId;
    wx.setNavigationBarTitle({
      title: '班组教育记录'
    });
  },

  onClose() {
    this.setData({ show: false });
  },

  filtrate() {
    this.setData({ show: true });
  },

  reset() {
    this.setData({ startTime: '开始日期' ,endTime: '结束日期'});
  },

  // 确认搜索
  confirm() {
    this.setData({ show: true });
  },

  onConfirmTime(event){
    let type = this.data.type;
    let val = util.formatTime(new Date(event.detail),'yyyy-mm-dd');
    if(type==1){
      this.setData({ startTime: val });
    }else{
      this.setData({ endTime: val });
    }
    this.setData({ showTime: false });
  },

  onClose(){
    this.setData({ showTime: false });
  },

  seletTime(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      showTime: true,
      type:type
    });
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  //获取教育列表
  getList(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectify/query';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 渲染数据
  drawList(data, isLoading) {
    let that = this;
    let listArr = this.data.list;
    this.getList(data).then(res => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      let list = res.data.rows
      // 格式化时间,类型
      if (list.length != 0) {
        for (let item of list) {
          item.isOverTime = item.dateline > new Date().getTime() ? false : true;
          item.createDate = util.formatTime(new Date(item.dateline), 'yyyy-mm-dd');
          item.createTime = util.formatTime(new Date(item.dateline), 'hh:mm');
        }
      }
      if (list.length < 10) {
        that.setData({
          isLoading: false
        });
      }
      if (isLoading) {
        that.setData({
          list: [...listArr, ...list]
        });
      } else {
        that.setData({
          list: list
        });
      }
    });
  },

  onPullDownRefresh() {
    // wx.showNavigationBarLoading();
    // let data = {
    //   orgId: this.data.orgId,
    //   notSelf: this.data.notSelf,
    //   page: 1,
    //   size: 10,
    // }
    // this.setData({
    //   page: 1,
    //   isLoading: true
    // });
    // this.drawList(data);

    // wx.stopPullDownRefresh();
  },

  onReachBottom() {
    //   let isLoading = this.data.isLoading;
    //   let page = this.data.page;
    //   let obj1 = this.data.obj1;
    //   let obj = this.data.obj;
    //   let data = {};
    //   if (isLoading) {
    //     wx.showLoading({
    //       title: '加载中',
    //     });
    //     page = page + 1;
    //     if (JSON.stringify(obj1) != '{}') {
    //       obj1.page = page;
    //       data = obj1;
    //     } else if (JSON.stringify(obj) != '{}') {
    //       obj.page = page;
    //       data = obj;
    //     } else {
    //       data = {
    //         orgId: this.data.orgId,
    //         notSelf: this.data.notSelf,
    //         page: page,
    //         size: 10,
    //       }
    //     }
    //     this.drawList(data, 1);
    //   }
  }
})
