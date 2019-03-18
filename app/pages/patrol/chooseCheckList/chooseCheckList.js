const app = getApp()
Page({
  data: {
    list:[
      {
        id:1,
        number:'XT-NT1_20190001',
        isSend:true,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:0,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
      {
        id:23,
        number:'XT-NT1_20190001',
        isSend:true,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:1,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
      {
        id:535,
        number:'XT-NT1_20190001',
        isSend:false,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:2,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
      {
        id:324,
        number:'XT-NT1_20190001',
        isSend:false,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:0,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
      {
        id:123,
        number:'XT-NT1_20190001',
        isSend:true,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:0,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
      {
        id:44,
        number:'XT-NT1_20190001',
        isSend:true,
        check_type:'临边防护',
        type:'项目部自查',
        describe:'防护防护防护防护不够安全需要防护防防护防护防护防护不够安全需要防护防',
        results:0,
        createPeople:'张三',
        createDate:'2019-03-07',
        createTime:'11:04',
      },
    ]
  },
  onLoad: function (options) {
    let id = options.id;
    wx.setNavigationBarTitle({
      title: '检查记录'
    })
  },

  goDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../checkDetail/checkDetail?id=' + id,
    })
  },

  onPullDownRefresh(){
    // wx.showNavigationBarLoading();
    // wx.stopPullDownRefresh();
  },
  
  onReachBottom(){
    // wx.showLoading({
    //   title: '玩命加载中',
    // })

     // 隐藏加载框
    //  wx.hideLoading();
  }
})
