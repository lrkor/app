const wxRequest = require('../../../utils/wxRequest.js');
const app = getApp();
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    show: false,
    columns: [],
    personArr:[],
    fullName:'请选择处理人',
    content:'',
    rectifyId:'',
    clicked:true,
    color:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '转派'
    });
    this.setData({
      rectifyId:options.rectifyId,
    })
    const that = this;
    this.getPeople().then(res=>{
      let rows = res.data.rows;
      let columns = [];
      let personArr = [];
      for(let item of rows){
        columns.push(item.fullName);
        let json = {
          fullName:item.fullName,
          id:item.userId
        }
        personArr.push(json);
      }
      that.setData({columns,personArr});
    });
  },

  showPopup(){
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(value);
    this.setData({
      fullName:value,
      show:false,
      color:'color_333'
    });
  },

  onChange(event){
    this.setData({
      content:event.detail
    })
  },

  // 提交
  sub(){
    let {content,rectifyId,fullName,personArr} = this.data;
    let toHandlerId = '';
    for(let item of personArr){
      if(item.fullName == fullName ){
        toHandlerId = item.id
      }
    }
    if(toHandlerId==''){
      Toast.fail('请选择整改人');
      return;
    }else{
      let json = { toHandlerId,content,rectifyId};
      this.setData({clicked:false})
      this.transfer(json).then(res=>{
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
      })
    }
  },

  // 转派
  transfer(data){
    let url = app.globalData.sgmsUrl + '/api/v1/inspectRectifyFlow/transfer';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },

  // 获取处理人
  getPeople(){
    let url = app.globalData.sgmsUrl + '/api/v1/inspectResponsiblePerson/query';
    return wxRequest.postRequest(url, { type: '3', orgId: app.globalData.userInfo.orgId }, app.globalData.sid);
  }
})
