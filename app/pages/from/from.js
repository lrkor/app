//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },

  onLoad: function () {
  },

  submitInfo: function (e) {
    console.log('GG 敌方军团已同意投降 4票赞成 0票反对')
    console.log(e.detail.formId);
    },
})