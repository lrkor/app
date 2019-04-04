const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    type: '',
    list: [
      {name:'11',id:1},
      {name:'22',id:2},
      {name:'33',id:3},
      {name:'44',id:4},
      {name:'55',id:5},
    ]
  },
  onLoad: function (options) {
    let type = options.type;
    this.setData({
      type: type
    });
    wx.setNavigationBarTitle({
      title: '人员设置'
    });
  },

  goAddPerson(){
    let {type} = this.data;
    wx.navigateTo({
      url: '../choosePerson/choosePerson?type=' + type,
    })
  },
  onClose(event) {
    console.log(event);
    const {id} = event.currentTarget.dataset
    const { position, instance } = event.detail;
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          console.log(id);
          instance.close();
        });
        break;
    }
  }
})
