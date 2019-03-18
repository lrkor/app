const app = getApp()
Page({
  data: {
    state:0,
    status:0,
    person:'张三',
    des:'现场描述：描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容',
    imgList:['../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png','../../../images/patrol/rectification/1.png'],
    time:'2019-12-31 12:00',
    isOverdue:0,
    releaseTime:'2019-12-31 12:00',
    releasePerson:'张萨安',
    checkItem:'临边防护',
    headPerson:'李四',
    level:'一般',
    isMore:false,
    rectificationPerson:'李四',
    rectificationTime:'2020-12-31 12:00',
    list:[
      {
        result:'不通过',
        opinion:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
        status:0,
        time:'03-04 11:02'
      },
      {
        result:'通过',
        opinion:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
        status:1,
        time:'03-04 11:02'
      },
      {
        result:'不通过',
        opinion:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
        status:0,
        time:'03-04 11:02'
      },
      {
        result:'通过',
        opinion:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
        status:1,
        time:'03-04 11:02'
      },
      {
        result:'通过',
        opinion:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
        status:0,
        time:'03-04 11:02'
      },
    ],
  },
  onLoad: function (options) {
    console.log(options.id)
    wx.setNavigationBarTitle({
      title: '整改详情'
    })
  },

  isMore() {
    let isMore = this.data.isMore;
    if(isMore){
      this.setData({
        isMore:!isMore
      })
    }
  },
  goIssue(){
    wx.navigateTo({
      url: '../reply/reply',
    })
  },
  goApproval(){
    wx.navigateTo({
      url: '../approval/approval',
    })
  },
  goProcess(){
    wx.navigateTo({
      url: '../process/process',
    })
  }
})
