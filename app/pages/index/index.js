//index.js
//获取应用实例
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
const app = getApp();
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    systemName: '',
    showView: true,
    systemCode: '',
    weatherImg: '', //天气图片
    temperature: '', //温度
    windSpeed: '', //风速
    currentTab: 0, //预设当前项的值
    imgUrls: [
      '../../images/index/banner.png',
      '../../images/index/banner1.png'
    ],
    // indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // circular:true
    smallImgUrl: [
      [
        {
          url: '../../images/index/small/sys.png',
          hrefUrl: 'https://mp.weixin.qq.com/',
          text: '扫一扫',
          status: 3
        },
        {
          url: '../../images/index/small/kqdk.png',
          hrefUrl: app.globalData.BaseURL + 'weChat/time/card/list',
          text: '考勤打卡',
          status: 1
        },
        {
          url: '../../images/index/small/rwgl.png',
          hrefUrl: app.globalData.BaseURL + 'weChat/task/list',
          text: '任务管理',
          status: 1
        },
        {
          url: '../../images/index/small/hytz.png',
          hrefUrl: app.globalData.BaseURL + 'weChat/meetingNotice/list',
          text: '会议通知',
          status: 1
        }
      ],
      [{
        url: '../../images/index/small/zhjb.png',
        hrefUrl: '/pages/accountDeregulation/accountDeregulation',
        text: '账号解绑',
        status: 4
      },
      {
        url: '../../images/index/small/lxkf.png',
        hrefUrl: 'https://mp.weixin.qq.com/',
        text: '联系客服',
        status: 5
      }
        // {
        //   url: '../../images/index/small/yjfk.png',
        //   text: '意见反馈',
        //   status: 2
        // },

      ]
    ],
    applicationList: [{
      url: app.globalData.BaseURL + 'weChat/score/todayRank',
      imgUrl: '../../images/index/application/phb.png',
      text: '排行榜',
      status: 1
    },
    {
      url: app.globalData.BaseURL + 'weChat/time/card/list',
      imgUrl: '../../images/index/application/kqgl.png',
      text: '考勤管理',
      status: 1
    },
    {
      url: app.globalData.BaseURL + 'weChat/weatherStation/monitor',
      imgUrl: '../../images/index/application/hjjc.png',
      text: '环境监测',
      status: 1
    },
    {
      url: app.globalData.BaseURL + 'weChat/liftDevice/list',
      imgUrl: '../../images/index/application/qzjc.png',
      text: '起重监测',
      status: 1
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/tzgg.png',
      text: '通知公告',
      status: 1
    },

    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/xwbd.png',
      text: '新闻报道',
      status: 1
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/txl.png',
      text: '通讯录',
      status: 1
    },
    {
      // url: 'https://wechatapplet.zhinengjianshe.com/miniWeb/unit',
      // url: 'http://192.168.1.40:8083/miniWeb/unit',
      url: 'http://192.168.1.40:8083/video/detail',
      imgUrl: '../../images/index/application/spjk1.png',
      text: '视频监控',
      status: 1
    },
    {
      url: 'http://192.168.1.40:8080/',
      imgUrl: '../../images/index/application/rcxc.png',
      text: '安全检查',
      status: 1
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/djc.png',
      text: '班组积分',
      status: 1
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/bzjy.png',
      text: '班组教育',
      status: 1
    }
    ]
  },

  // tab切换
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  // onShow: function () {
  //   var that = this;
  //   //监测蓝牙状态的改变
  //   wx.onBluetoothAdapterStateChange(function (res) {
  //     console.log(res);
  //     if (res.available) {//如果用户打开蓝牙，开始搜索IBeacon
  //       searchBeacon();
  //     }
  //   })
  //   //搜索beacons
  //   searchBeacon();
  //   //搜索函数
  //   function searchBeacon() {
  //     //检测蓝牙状态
  //     wx.openBluetoothAdapter({
  //       success: function (res) {//蓝牙状态：打开
  //         wx.startBeaconDiscovery({//开始搜索附近的iBeacon设备
  //           uuids: ['E2C56DB5-DFFB-48D2-B060-D0F5A7189012'],//参数uuid
  //           success: function (res) {
  //             wx.onBeaconUpdate(function (res) {//监听 iBeacon 设备的更新事件  
  //               //封装请求数据 
  //               console.log(res)
  //             });
  //           },
  //           fail: function (res) {
  //             //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
  //             stopSearchBeacom();
  //           }
  //         })
  //       },
  //       fail: function (res) {//蓝牙状态：关闭
  //         wx.showToast({ title: "请打开蓝牙", icon: "none", duration: 2000 })
  //       }
  //     })
  //   }
  //   //关闭成功后开启搜索
  //   function stopSearchBeacom() {
  //     wx.stopBeaconDiscovery({
  //       success: function () {
  //         searchBeacon();
  //       }
  //     })
  //   }
  // },

  onLoad: function () {
    this.setData({
      showView: app.globalData.isguidance
    });
    this.login();
    wx.setNavigationBarTitle({
      title: '智慧工程云平台'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    setTimeout(function(){
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    },500)
  },

  getSetting: function (sessionKey) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("授权失败返回数据");
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    console.log(data);
                  }
                })
              }
            }
          });
        }
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res) {
              let encryptedData = res.encryptedData
              let iv = res.iv
              app.globalData.iv = iv;
              app.globalData.encryptedData = encryptedData;
              wx.request({
                url: app.globalData.BaseURL + 'api/v1/miniApp/decodeUserInfo',
                method: 'POST',
                header: {
                  "Content-Type": "application/json"
                },
                data: {
                  sessionKey: sessionKey,
                  iv: iv,
                  encryptedData: encryptedData
                },
                success: function (result) {
                  app.globalData.openid = result.data.data.openId;
                  app.globalData.unionId = result.data.data.unionId;
                  //获取用户信息
                  that.queryUserInfo();
                }
              })

            }
          });
        } else {
          wx.reLaunch({
            url: '/pages/bindAccount/bindAccount'
          })
        }
      }
    })
  },

  // 登录
  login: function () {
    var that = this;
    wx.login({
      success: res => {
        // 获取用户openId
        console.log(res);
        if (res.code) {
          // 发起网络请求  appid  secret
          wx.request({
            url: app.globalData.BaseURL + 'api/v1/miniApp/session/get',
            method: 'GET',
            data: {
              jsCode: res.code
            },
            success: function (result) {
              if (result.data.data) {
                app.globalData.sessionKey = result.data.data.session_key;
                that.getSetting(result.data.data.session_key);
              } else {
                wx.showToast({
                  title: '登陆失败！',
                  duration: 2000
                })
                return false;
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  //获取用户信息接口
  queryUserInfo: function () {
    var that = this;
    wx.request({
      method: "GET",
      url: app.globalData.BaseURL + 'api/v1/userBind/getAppBindInfo',
      data: {
        openId: app.globalData.openid,
        appType: '2',
        unionId: app.globalData.unionId
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          return false;
        }

        if (res.data.data != null) {
          if (res.data.data.subscribe == '1' && res.data.data.mpOpenId) {
            app.globalData.subscribe = true;
          }
          wx.setStorageSync('userInfo', res.data.data);
          app.globalData.userInfo = res.data.data;
          app.globalData.userId = res.data.data.userId;
          app.globalData.userName = res.data.data.userName;
          app.globalData.systemCode = res.data.data.systemCode;
          app.globalData.sgmsUrl = res.data.data.serviceUrl;
          let domain = res.data.data.serviceUrl.match(/http[s]?:\/\/(.*?)([:\/]|$)/);
          app.globalData.sgmeImgUrl = domain[0];
          that.getToken(res.data.data.userName);
          that.getweather();
          that.getSystemName();
          // if(!res.data.data.mpOpenId){
          //   wx.showModal({
          //     title: '是否获取消息推送',
          //     content: '公众号消息推送需要授权',
          //     success:function(res){
          //         if(res.cancel){
          //           console.info("授权失败返回数据");
          //         }else if(res.confirm){
          //           wx.navigateTo({
          //             url: '../pushMessage/pushMessage'
          //           })
          //         }
          //     }
          //   });
          // }
        } else {
          wx.reLaunch({
            url: '/pages/bindAccount/bindAccount'
          })
        }


      }
    });
  },

  getToken(userName) {
    let data = { userName: userName, credentials: app.globalData.unionId };
    wx.request({
      method: "POST",
      url: app.globalData.BaseURL + 'api/v1/token',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        app.globalData.token = res.data.data.accessToken
      }
    });
  },



  //获取天气
  getweather: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'wONQmGOLjZfXLbPXzAphdq5tgkKdTkCC'
    });
    var fail = function (data) { };
    var success = function (data) {
      var weatherData = data.originalData.results[0].weather_data[0];
      let temperature = weatherData.date;
      let strStartIndex = temperature.indexOf('：');
      let strEndIndex = temperature.indexOf('℃');
      temperature = temperature.substring(strStartIndex + 1, strEndIndex) + '°';
      that.setData({
        weatherImg: weatherData.dayPictureUrl,
        temperature: temperature,
        windSpeed: weatherData.wind
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  //获取项目位置
  getSystemName: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        var systemName = res.data.systemName
        var systemCode = res.data.systemCode
        that.setData({
          systemName: systemName,
          systemCode: systemCode,
        })
      }
    })
  },

  // 页面跳转事件
  goToWebView(e) {
    let status = e.currentTarget.dataset.status;
    let text = e.currentTarget.dataset.text;
    let url = e.currentTarget.dataset.url + '?openId=' + app.globalData.openId + '&userId=1&systemCode=' + this.data.systemCode;
    if (status == 1) {
      if (text == '安全检查') {
        wx.navigateTo({
          url: '../patrol/index/index',
        })
      } else if (text == '班组教育') {
        wx.navigateTo({
          url: '../team/chooseUnit/chooseUnit',
        })
      } else if (text == '新闻报道') {
        wx.navigateTo({
          url: '../announcement/list/list',
        })
      } else if (text == '通知公告') {
        wx.navigateTo({
          url: '../newsReports/list/list',
        })
      }
      else if (text == '视频监控') {
        wx.navigateTo({
          url: '../video/unitList/unitList?url=' + url,
        })
      }
      else if (text == '通讯录') {
        wx.navigateTo({
          url: '../communicate/communication?parentId=-1',
        })
      }else if(text == '班组积分'){
        wx.navigateTo({
          url: '../integral/index/index',
        })
      }else {
        wx.navigateTo({
          url: '../webView/web_view?url=' + url,
        })
      }
    } else if (status == 2) {
      wx.showToast({
        title: '正在建设中',
        image: '../../images/success.png',
        duration: 2000
      })
    } else if (status == 3) {
      wx.scanCode({
        success(res) {
          let url = res.result;
          if (url.indexOf('http') != -1) {
            url = url.substring(4);
            url = encodeURIComponent('https' + url);
            wx.navigateTo({
              url: '../qrCode/qrCode?url=' + url
            })
          } else {
            Dialog.alert({
              message: '请扫描正确的人机二维码'
            }).then(() => { });
          }
        }
      })
    } else if (status == 4) {
      wx.navigateTo({
        url: '../accountDeregulation/accountDeregulation'
      })
    } else if (status == 5) {

    }
  },

  close: function () {
    let that = this;
    that.setData({
      showView: true
    })
  },

  // 判断是否获取用户地理位置
  // isGetLocation(){
  //   let that = this;
  //   wx.getSetting({
  //     success: (res) => {
  //       console.log(JSON.stringify(res))
  //       // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
  //       // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
  //       // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
  //       if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
  //         wx.showModal({
  //           title: '请求授权当前位置',
  //           content: '需要获取您的地理位置，请确认授权',
  //           success: function (res) {
  //             if (res.cancel) {
  //               wx.showToast({
  //                 title: '拒绝授权',
  //                 icon: 'none',
  //                 duration: 1000
  //               })
  //             } else if (res.confirm) {
  //               wx.openSetting({
  //                 success: function (dataAu) {
  //                   if (dataAu.authSetting["scope.userLocation"] == true) {
  //                     wx.showToast({
  //                       title: '授权成功',
  //                       icon: 'success',
  //                       duration: 1000
  //                     })
  //                     //再次授权，调用wx.getLocation的API
  //                     that.getLocation();
  //                   } else {
  //                     wx.showToast({
  //                       title: '授权失败',
  //                       icon: 'none',
  //                       duration: 1000
  //                     })
  //                   }
  //                 }
  //               })
  //             }
  //           }
  //         })
  //       } else if (res.authSetting['scope.userLocation'] == undefined) {
  //         //调用wx.getLocation的API
  //         that.getLocation();
  //       }
  //       else {
  //         //调用wx.getLocation的API
  //         that.getLocation();
  //       }
  //     }
  //   })
  // },

  // 获取用户位置
  // getLocation(){
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success(res) {
  //       const latitude = res.latitude
  //       const longitude = res.longitude
  //       console.log(latitude,longitude);
  //     }
  //   })
  // }
})