const app = getApp()
Page({
  data: {
    myRectification: 1,
    myExamination: 1,
    unitTodo: 1,
    momentum: 1,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '安全检查'
    })
  },

  goUnit(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../chooseUnit/chooseUnit?type=' + type,
    })
  },
  goTodo(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../examinationOrRectification/examinationOrRectification?type=' + type,
    })
  },

  goChooseCheckList(){
    wx.navigateTo({
      url: '../chooseCheckList/chooseCheckList',
    })
  }

})
