const app = getApp()
Page({
  data: {
    unitList:[
      {
        name:'南通一标',
        id:32,
      },
      {
        name:'南通二标',
        id:12,
      },
      {
        name:'南通三标',
        id:534,
      },
      {
        name:'南通四标',
        id:456,
      },
      {
        name:'南通五标',
        id:67,
      },
    ]
  },
  onLoad: function (options) {
  
  },

  checkList(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../checkList/checkList?id=' + id,
    })
  }

})
