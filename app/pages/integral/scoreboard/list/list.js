Page({
  data:{
    arr:[1,2,3],
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '项目部'
    });
  },
  goScoreList(e){
    // e.currentTarget.dataset.orgid
    let id = 1;
    wx.navigateTo({
      url: '../scoreList/scoreList?id=' +id,
    })
  }
})