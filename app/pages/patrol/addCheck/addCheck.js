const app = getApp()
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({
  data: {
    value: '',
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    projectShow: false,
    projectVal:'请选择工程部位',
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增检查'
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
    this.setData({ projectShow: false });
  },

  onConfirm(event) {
    console.log(event.detail.value);
    this.setData({ 
      projectShow: false,
      projectVal:event.detail.value
    });
  },

  onCancel() {
    this.setData({ projectShow: false });
  },

  selectProject(){
    console.log(111);
    this.setData({ projectShow: true });
  }
})
