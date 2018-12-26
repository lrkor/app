//index.js
//获取应用实例
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
const app = getApp()

Page({
    data: {
        weather: '',//天气
        weatherImg: '',//天气图片
        temperature: '',//温度
        windSpeed: '',//风速
        currentTab: 0, //预设当前项的值
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        // indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        // circular:true
        smallImgUrl: [
            [{
                url: '../../images/index/small/1.png',
                text: '扫一扫'
            },
            {
                url: '../../images/index/small/2.png',
                text: '考勤管理'
            },
            {
                url: '../../images/index/small/3.png',
                text: '任务管理'
            },
            {
                url: '../../images/index/small/4.png',
                text: '会议通知'
            }],
            [{
                url: '../../images/index/small/1.png',
                text: '扫一扫'
            },
            {
                url: '../../images/index/small/2.png',
                text: '考勤管理'
            },
            {
                url: '../../images/index/small/3.png',
                text: '任务管理'
            },
            {
                url: '../../images/index/small/4.png',
                text: '会议通知'
            }]
        ],
        applicationList: [
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/1.png',
                text: '通知公告',

            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/2.png',
                text: '信息报道'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/3.png',
                text: '通讯录'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/4.png',
                text: '视频监控'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/5.png',
                text: '环境监测'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/6.png',
                text: '日常巡查'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/7.png',
                text: '安全大检查'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/8.png',
                text: '指数排行'
            },
            {
                url: 'https://mp.weixin.qq.com/',
                imgUrl: '../../images/index/application/9.png',
                text: '班组管理'
            }
        ],
        PinYin: {
          中雨:'zhongyu',
          白天扬沙:'baitianyangsha',
          白天有风:'baitianyoufeng',
          暴雪:'baoxue',
          暴雨:'baoyu',
          冰雹:'bingbao',
          大雪:'daxue',
          大雨:'dayu',
          多云:'duoyun',
          多云转晴:'duoyunzhuanqing',
          多云转阴:'duoyunzhuanyin',
          风:'feng',
          雷雨:'leiyu',
          雷阵雨:'leizhenyu',
          晴天:'qingtian',
          晴转多云:'qingzhuanduoyun',
          沙尘暴:'shachengbao',
          太阳升起:'taiyangshengqi',
          太阳下落:'taiyangxiala',
          小雪:'xiaoxue',
          小雨:'xiaoyu',
          夜间多云:'yejianduoyun',
          夜间有雪:'yejianyouxue',
          夜间有雨:'yejianyouyu',
          夜间阵雨:'yejianzhenyu',
          夜晚:'yewan',
          阴天:'yintian',
          雨夹雪:'yujiaxue',
          阵雨:'zhenyu',
          中雪:'zhongxue',
          有雾:'youwu',
        }
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
            var weatherData = data.currentWeather[0];
            let temperature = weatherData.date;
            let strStartIndex = temperature.indexOf('：');
            let strEndIndex = temperature.indexOf('℃');
            temperature = temperature.substring(strStartIndex + 1, strEndIndex) + '°';
            that.setData({
                weatherImg: '../../images/weather/' + that.data.PinYin[weatherData.weatherDesc] + '.png',
                weather: weatherData.weatherDesc,
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
        wx.navigateTo({
            url: '../webView/web_view?url=' + e.target.dataset.url
        })
    },
})
