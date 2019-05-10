Page({
  data:{

  },
  onLoad(options){
    let {orgId,tenderName} = options;
    wx.setNavigationBarTitle({
      title: tenderName
    });
  },
  goTeam(e){
    wx.navigateTo({
      url: '../chooseTeam/chooseTeam?orgId=' + e.currentTarget.dataset.orgid,
    })
  },
  goList(e){
    wx.navigateTo({
      url: '../list/list?orgId=' + e.currentTarget.dataset.orgid,
    })
  }
})