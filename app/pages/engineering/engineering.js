//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '推荐'
      },
      {
        text: '时事资讯'
      },
      {
        text: '安全资料'
      },
      {
        text: '法规标准'
      },
      {
        text: '案列分析'
      },
      {
        text: '纠纷'
      },
      {
        text: '青葱'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    infosArray: [
      {
        id: 1,
        title: '应急管理部三定方案（厅字【2018】60号）你还USD还是大科技收到货看撒娇地方还是进口的粉红色',
        viewNum: '浏览93',
        date: '2018-10-19',
        type: '推荐',
        type1: '3'
      },
      {
        id: 2,
        title: '东盟拟明年同美国开战海上军演，计划本月与中举行军演sssssssssssssssssssssssssssssssss',
        viewNum: '浏览913',
        date: '2018-10-19',
        type: '推荐',
        type1: '1'
      },
      {
        id: 3,
        title: '上海塞科室“5.12”其他爆炸较大事故调查报告按时发顺丰大沙发沙发沙发上啊撒大声地啊实打实大师大师大发送到发顺丰阿达速度啊实打实大声道阿魏酸',
        viewNum: '浏览13',
        date: '2018-10-03',
        type: '时事资讯',
        type1: '2'
      },
      {
        id: 4,
        title: '啊啊啊大大安防撒烦得很',
        viewNum: '浏览93',
        date: '2018-10-19',
        type: '时事资讯',
        type1: '3'
      }
    ]
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  //跳转详情页
  goDetaile(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.target.dataset.id
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // wx.hideNavigationBarLoading() //在标题栏中显示加载

    // wx.startPullDownRefresh({
    //   success:function(){
    //     wx.stopPullDownRefresh();                       //停止下拉刷新
    //   }
    // })
  },
})