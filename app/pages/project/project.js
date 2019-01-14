Page({
  data: {
    url: 'https://wechat.zhinengjianshe.com/wechatService/weChat/toProject?token=',
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/images/bid.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/images/bid.png'
    }], 
    goodsArray: [
      {
        id: 1,
        title: '锡锡通高速锡通高速锡通高速锡通高速锡通高速通高速',
        desc: '锡通过锡通过江通道公路接线工程锡通过江通道公路接线工程锡通过江通道公路接线工程江通道公路接线工程'
      },
      {
        id: 2,
        title: '锡通高速',
        desc: '锡通过江通道公路接线工程'
      },
      {
        id: 3,
        title: '锡通高速',
        desc: '锡通过江通道公路接线工程'
      },
    ]
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '项目看板' 
    })
    let url = this.data.url + app.globalData.token;
    this.setData({
      url: url
    });
  },

  onLoad(){
   
    // this.setData({
    //   url: options.url
    // });
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
    this.goodsList = this.selectComponent("#goodsList")
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})
