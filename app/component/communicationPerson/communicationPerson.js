var util = require('../../utils/util.js') //引入微信自带的日期格式化
const app = getApp()
const wxRequest = require('../../utils/wxRequest.js');
Component({
  properties:{
    unitList1:Object,
    unitList2:Object
  },
  methods: {
    makePhone(e){
      console.log(e)
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone // 仅为示例，并非真实的电话号码
      })
    }
  }
})