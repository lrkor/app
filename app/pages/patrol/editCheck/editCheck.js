const app = getApp()
const wxRequest = require('../../../utils/wxRequest.js');
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
Page({
  data: {
    id: '',
    content: '',
    value: '',
    isGetLocation: 0,
    locationVal: '',
    imageList: [],

    natureShow: false,
    natureVal: '',
    natureColumns: [],
    natureArr: [],
    itemShow: false,
    itemVal: '',
    itemObj: {},
    state: '4',

    // 经纬度
    gpsLng: '',
    gpsLat: '',

    // 图片数组
    fileIds: [],
  },
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    wx.setNavigationBarTitle({
      title: '编辑检查'
    });

    this.setData({
      id: id
    });

    this.getJcxs().then(res => {
      let arr = res.data.rows;
      let natureColumns = [];


      for (let item of arr) {
        natureColumns.push(item.name);
      }

      that.setData({
        natureArr: arr,
        natureColumns: natureColumns
      });
    })

    this.getDetail({ id: id }).then(res => {
      let imgArr = [];
      for (let item of res.data.data.fileList) {
        imgArr.push(app.globalData.sgmeImgUrl + item.filePath)
      }
      let nature = res.data.data.nature;
      that.getJcxs().then(res => {
        for (let item of res.data.rows) {
          if (item.value == nature) {
            that.setData({
              natureVal: item.name,
            })
          }
        }
      });
      let json = {
        name: res.data.data.patrolClassifyPO.name
      };
      let fileArr = [];
      for(let item of res.data.data.fileList){
        fileArr.push(item.id)
      }
      that.setData({
        obj: res.data.data,
        imageList: imgArr,
        fileIds:fileArr,
        content: res.data.data.content,
        itemObj: json,
        state: res.data.data.result
      });
    });
  },

  onShow() {
    this.isGetLocation();
    if (app.globalData.checkItem.name) {
      this.setData({
        itemObj: app.globalData.checkItem
      })
      app.globalData.checkItem = {};
    }
  },

  chooseImage() {
    const that = this;
    let fileArr = [];
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      count: 8,
      success(res) {
        let tempFilePaths = res.tempFilePaths
        //上传照片
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.sgmsUrl + '/api/v1/common/uploadFile?folderName=consulting', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              let data = JSON.parse(res.data);
              fileArr.push(data.data);
            }
          })
        }
        that.setData({
          imageList: res.tempFilePaths,
          fileIds: fileArr
        })
      }
    })
  },

  // 图片预览
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  onClose() {
    this.setData({ natureShow: false, itemShow: false });
  },

  natureOnConfirm(event) {
    console.log(event.detail.value);
    this.setData({
      natureShow: false,
      natureVal: event.detail.value
    });
  },

  onCancel() {
    this.setData({ natureShow: false, itemShow: false });
  },

  selectNature() {
    this.setData({ natureShow: true });
  },

  selectItem() {
    wx.navigateTo({
      url: '../chooseCheck/chooseCheck'
    })
  },

  // 切换状态
  switchState(e) {
    let state = e.currentTarget.dataset.state;
    this.setData({
      state: state
    });
  },

  // 获取检查形式
  getJcxs() {
    let url = app.globalData.sgmsUrl + '/api/v1/codeDict/systemSettingCodeDictList';
    let data = { typeName: '检查形式' };
    return wxRequest.getRequest(url, data, app.globalData.sid);
  },

  // 提交编辑
  editCheck() {
    let state = this.data.state;
    let content = this.data.content;
    let natureVal = this.data.natureVal;
    let natureArr = this.data.natureArr;
    let itemObj = this.data.itemObj;
    let id = this.data.id;


    let nature = '';

    for (let item of natureArr) {
      if (item.name == natureVal) {
        nature = item.value;
      }
    }
    console.log(this.data.fileIds);

    let data = {
      id: id,
      content: content,
      checkClassifyId: itemObj.id,
      fileIds: this.data.fileIds,
      orgId: app.globalData.orgId,
      result: state,
      gpsLng: this.data.gpsLng,
      gpsLat: this.data.gpsLat,
      nature: nature
    }

    this.edit(data).then(res => {
      let id = res.data.data.id;
      if (state == 3) {
        wx.redirectTo({
          url: '../issue/issue?number=1'
        })
      } else {
        wx.redirectTo({
          url: '../checkDetail/checkDetail?id=' + id
        })
      }
    })
  },

  changeContent(e) {
    this.setData({
      content: e.detail
    })
  },

  edit(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/update';
    return wxRequest.postRequest(url, data, app.globalData.sid);
  },


  // 获取详情
  getDetail(data) {
    let url = app.globalData.sgmsUrl + '/api/v1/inspect/get';
    return wxRequest.getRequest(url, data, app.globalData.sid);
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
          gpsLng: longitude,
          gpsLat: latitude
        });
      },
      fail(res) {
        that.setData({
          locationVal: '获取失败，点击重新获取',
        });
      }
    })
  }
})
