const app = getApp()
Page({
  data: {
    myRectification: 1,
    myExamination: 1,
    unitTodo: 1,
    momentum: 1,
  },
  onLoad: function (options) {

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
  }

})
