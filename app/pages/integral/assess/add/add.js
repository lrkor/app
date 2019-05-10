const app = getApp();
const wxRequest = require('../../../../utils/wxRequest.js');
Page({
  data:{
    orgId:'',
    tenderName:'',
    name:'',

    teamVal:'请选择班组',
    peopleVal:'请选择责任人',
    assessVal:'请选择考核方式',

    teamShow:false,
    peopleShow:false,
    assessShow:false,

    teamColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    peopleColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    assessColumns: ['个人考核','连带考核'],

    
  },
  
  onLoad(options){

    wx.setNavigationBarTitle({
      title: options.name
    });
    this.setData({
      tenderName:app.globalData.tenderName,
      name:options.name
    });
  },

  teamCheck(){
    this.setData({
      teamShow:true
    });
  },

  peopleCheck(){
    this.setData({
      peopleShow:true
    });
  },

  assessCheck(){
    this.setData({
      assessShow:true
    });
  },

  onClose(){
    this.setData({
      teamShow:false,
      peopleShow:false,
      assessShow:false
    });
  },

  teamOnConfirm(event){
    const { picker, value, index } = event.detail;
    this.setData({
      teamShow:false,
      teamVal:value
    });
  },

  peopleOnConfirm(event){
    const { picker, value, index } = event.detail;
    this.setData({
      peopleShow:false,
      peopleVal:value
    });
  },

  assessOnConfirm(event){
    const { picker, value, index } = event.detail;
    this.setData({
      assessVal:value,
      assessShow:false
    });
  },

  goScoreDetail(){
    wx.navigateTo({
      url: '../scoreDetail/scoreDetail',
    })
  },

  goPenalize(){
    wx.navigateTo({
      url: '../penalize/penalize',
    })
  },

  determine(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
})