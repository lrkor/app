//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },

  onLoad: function () {
  },

  submitInfo: function (e) {
    console.log(e.detail.formId);
    let data = {
      "touser": "oADc75GHzV_1QGCpr9ukUPYGoEKc",
      "template_id": "QjZWR5cb1XZMuzy4t4pQXrQCA8GUcUnbglWe2GWub1I",
      "page": "index",
      "form_id": e.detail.formId,
      "data": {
        "keyword1": {
          "value": "飞飞飞"
        },
        "keyword2": {
          "value": "飞搏智慧"
        },
        "keyword3": {
          "value": "上班打卡"
        },
        "keyword4": {
          "value": "2019-03-13 11:38"
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    }

    wx.request({
      method: "POST",
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=19_ejKkcCHrWYpebssLMtV1lMiTMJ0As8PN9P1U1cavqKxoUdn_KdN5pyBdt4-BUf3M---jE3d9kSV4bHLlfiU1gig4f0nHCsGQ1kXzrcIpQs7hkx1SDJQUCDvnJM2nguONxAJTrd5FdGCc3egMBPEaAIAJXM',
      data: data,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res);
      }
    });
  },
})