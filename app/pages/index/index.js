//index.js
//获取应用实例
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
const wxRequest = require('../../utils/wxRequest.js')
const app = getApp()

Page({
  data: {
    systemName: '',
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
      [{
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
      // {
      //   url: '../../images/index/small/yjfk.png',
      //   text: '意见反馈',
      //   status: 2
      // },
      {
        url: '../../images/index/small/lxkf.png',
        hrefUrl: 'https://mp.weixin.qq.com/',
        text: '联系客服',
        status: 5
      }
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
      url: app.globalData.BaseURL + 'weChat/liftingMonitoring/list',
      imgUrl: '../../images/index/application/qzjc.png',
      text: '起重监测',
      status: 1
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/tzgg.png',
      text: '通知公告',
      status: 2
    },

    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/xwbd.png',
      text: '新闻报道',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/txl.png',
      text: '通讯录',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/spjk.png',
      text: '视频监控',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/rcxc.png',
      text: '日常巡查',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/djc.png',
      text: '大检查',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/bzjy.png',
      text: '班组教育',
      status: 2
    },
    {
      url: 'https://mp.weixin.qq.com/',
      imgUrl: '../../images/index/application/aqrj.png',
      text: '安全日记',
      status: 2
    }
    ]
  },

  // tab切换
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  onLoad: function () {
    this.login();
    wx.setNavigationBarTitle({
      title: '智慧工程云平台'
    })
  },

  getSetting: function (sessionKey) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if(res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success:function(res){
                if(res.cancel){
                  console.info("授权失败返回数据");
                }else if(res.confirm){
                  wx.openSetting({
                    success:function(data){
                      console.log(data);
                    }
                  })
                }
            }
          });
        }
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang:'zh_CN',
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
        if (res.code) {
          // 发起网络请求  appid  secret
          wx.request({
            url: app.globalData.BaseURL +'api/v1/miniApp/session/get',
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
          wx.setStorageSync('userInfo', res.data.data);
          app.globalData.userInfo = res.data.data;
          app.globalData.userId = res.data.data.userId;
          app.globalData.userName = res.data.data.userName;
          that.getToken(res.data.data.userName);
          that.getweather();
          that.getSystemName();
          if(!res.data.data.mpOpenId){
            wx.showModal({
              title: '是否获取消息推送',
              content: '公众号消息推送需要授权',
              success:function(res){
                  if(res.cancel){
                    console.info("授权失败返回数据");
                  }else if(res.confirm){
                    wx.navigateTo({
                      url: '../pushMessage/pushMessage'
                    })
                  }
              }
            });
          }
        } else {
          wx.reLaunch({
            url: '/pages/bindAccount/bindAccount'
          })
        }

          
      }
    });
  },

  getToken(userName){
    let data = { userName: userName, unionId: app.globalData.unionId};
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
    var fail = function (data) {};
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
    var status = e.target.dataset.status;
    var url = e.target.dataset.url + '?openId=' + app.globalData.openId + '&userId=1&systemCode=' + this.data.systemCode;
    if (status == 1) {
      wx.navigateTo({
        url: '../webView/web_view?url=' + url,
      })
    } else if (status == 2) {
      wx.showToast({
        title: '正在建设中',
        image: '../../images/success.png',
        duration: 2000
      })
    } else if (status == 3) {
      wx.scanCode({
        success(res) {
          console.log(res);
        }
      })
    } else if (status == 4) {
      wx.navigateTo({
        url: '../accountDeregulation/accountDeregulation'
      })
    } else if (status == 5) {

    }
  },
})