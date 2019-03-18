const app = getApp()
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({
  data: {
    value: '',
    radio: '1',
    isGetLocation: 0,
    locationVal: '',
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    natureShow: false,
    natureVal: '',
    natureColumns: ['措施', '措施', '措施', '措施', '措施'],

    itemShow:false,
    itemVal: '',
    itemColumns: ['审核人', '审核人', '审核人', '审核人', '审核人'],
    state:'4',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '审批'
    })
  },

  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: 8,
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },

  onClose() {
    this.setData({ natureShow: false ,itemShow: false});
  },

  natureOnConfirm(event) {
    console.log(event.detail.value);
    this.setData({
      natureShow: false,
      natureVal: event.detail.value
    });
  },

  itemOnConfirm(event){
    this.setData({
      itemShow: false,
      itemVal: event.detail.value
    });
  },

  onCancel() {
    this.setData({ natureShow: false ,itemShow: false});
  },

  selectNature() {
    this.setData({ natureShow: true });
  },

  selectItem(){
    this.setData({ itemShow: true });
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  // 提交新增
  submit(){
    wx.navigateBack({
      delta: 2
    })
  },
})
