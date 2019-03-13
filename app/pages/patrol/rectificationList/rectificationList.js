const app = getApp()
Page({
  data: {
    type:0,
    list:[
      {
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
    let type = options.type;
    // type ==0 待我整改  type ==1 待我审批
    this.setData({
      type:type
    });
    if(type==0){
      wx.setNavigationBarTitle({
        title: '待我整改'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '待我审批'
      })
    }
   
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
