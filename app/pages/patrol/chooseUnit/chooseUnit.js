const app = getApp()
Page({
  data: {
    type:'',
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
    let type = options.type;
    this.setData({
      type:type
    });
    wx.setNavigationBarTitle({
      title: '单位选择'
    })
  },

  checkList(e){
    let id = e.currentTarget.dataset.id;
    let type = this.data.type;
    if(type==1){
      wx.navigateTo({
        url: '../checkList/checkList?id=' + id,
      })
    }else{
      console.log('整改记录')
    }
    
  }

})
