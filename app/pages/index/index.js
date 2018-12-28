//index.js
//获取应用实例
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
const app = getApp()

Page({
    data: {
        isShow: false,
        weatherImg: '',//天气图片
        temperature: '',//温度
        windSpeed: '',//风速
        currentTab: 0, //预设当前项的值
        imgUrls: [
          '../../images/index/banner.png',
          '../../images/index/banner.png'
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
              hrefUrl: 'http://wechat.zhinengjianshe.com/wechatService/weChat/time/card/list?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1',
              text: '考勤打卡',
              status: 1
            },
            {
              url: '../../images/index/small/rwgl.png',
              hrefUrl: 'http://wechat.zhinengjianshe.com/wechatService/weChat/task/list?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1&userName=1',
              text: '任务管理',
              status: 1
            },
            {
              url: '../../images/index/small/hytz.png',
              hrefUrl: 'http://wechat.zhinengjianshe.com/wechatService/weChat/meetingNotice/list?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1&systemCode=fbzhsgms',
              text: '会议通知',
              status: 1
            }],
            [{
              url: '../../images/index/small/zhjb.png',
              hrefUrl: '/pages/accountDeregulation/accountDeregulation',
              text: '账号解绑',
              status: 4
            },
            {
              url: '../../images/index/small/yjfk.png',
              text: '意见反馈',
              status: 2
            },
            {
              url: '../../images/index/small/lxkf.png',
              hrefUrl: 'https://mp.weixin.qq.com/',
              text: '联系客服',
              status: 2
            }]
        ],
        applicationList: [
            {
            url: 'http://wechat.zhinengjianshe.com/wechatService/weChat/score/rank?rankType=1&recordDate=20181227&type=1',
              imgUrl: '../../images/index/application/phb.png',
              text: '排行榜',
              status: 1
            },
            {
              url: 'http://wechat.zhinengjianshe.com/wechatService/weChat/time/card/list?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1&systemCode=fbzhsgms',
              imgUrl: '../../images/index/application/kqgl.png',
              text: '考勤管理',
              status: 1
            },
            {
              url: 'http://wechat.zhinengjianshe.com/wechatService/weChat/weatherStation/monitor?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1&systemCode=fbzhsgms',
              imgUrl: '../../images/index/application/hjjc.png',
              text: '环境监测',
              status: 1
            },
            {
              url: 'http://wechat.zhinengjianshe.com/wechatService/weChat/liftingMonitoring/list?openId=oBqrSwzzFWtcDD6SjgV13F2OhPkc&userId=1&systemCode=fbzhsgms',
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

    showToast: function(e) {
      var that = this
      that.setData({
        isShow: true,
        text: e
      })
      setTimeout(function() {
        that.setData({
          isShow: false
        })
      }, 1000)
    },

    // tab切换
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
    },


    onLoad: function () {
        this.getweather();
    },

    //获取天气
    getweather: function () {
        var that = this;
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
            ak: 'MlYLII7NQDCSox6r4rGorSf2qU8zv8C4'
        });
        var fail = function (data) {
        };
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

    // 页面跳转事件
    goToWebView(e) {
      var status = e.target.dataset.status;
      if (status == 1) {
        wx.navigateTo({
          url: '../webView/web_view?url=' + e.target.dataset.url,
        })
      } else if (status == 2) {
        this.showToast('正在建设中')
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
      }
    },
})
