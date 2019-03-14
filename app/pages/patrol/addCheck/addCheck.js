const app = getApp()
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({
  data: {
    value: '',
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
    natureColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],

    itemShow:false,
    itemVal: '',
    itemColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    state:'4',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增检查'
    })
  },

  onShow() {
    this.isGetLocation();
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

  // 切换状态
  switchState(e){
    let state = e.currentTarget.dataset.state;
    this.setData({
      state:state
    });
  },

  // 提交新增
  addCheck(){
    let state = this.data.state;
    if(state==2){
      wx.redirectTo({
        url: '../issue/issue',
      })
    }else{
      wx.redirectTo({
        url: '../checkDetail/checkDetail',
      })
    }
  },


  // 判断是否获取用户地理位置
  isGetLocation() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                that.setData({
                  locationVal: '获取失败，点击重新获取',
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                    } else {
                      that.setData({
                        locationVal: '获取失败，点击重新获取',
                      });
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          that.getLocation();
        }
        else {
          //调用wx.getLocation的API
          that.getLocation();
        }
      }
    })
  },

  // 获取用户位置
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude);
        that.setData({
          isGetLocation: 1,
          locationVal: '获取成功',
        });
      },
      fail(res){
        that.setData({
          locationVal: '获取失败，点击重新获取',
        });
      }
    })
  }
})
