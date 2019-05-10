const app = getApp()
const wxRequest = require('../../utils/wxRequest.js');
Component({
  properties: {
    unitList1: Object,
    unitList2: Object
  },
  methods: {
    goNext(e) {
      wx.navigateTo({
        url: '../communicate/communication?parentId=' + e.currentTarget.dataset.parentid
      })
    },
    makePhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone // 仅为示例，并非真实的电话号码
      })
    },

    
  }
})