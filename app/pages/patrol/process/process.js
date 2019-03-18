const app = getApp()
Page({
  data: {
    describe:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容',
    demand:'意见内容意见内容意见内容意见内容意见内容意见内容意见内容意见内容。',
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
        status:1,
        time:'03-04 11:02'
      },
    ],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '流程日志'
    })
  },
})
