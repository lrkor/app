const wxRequest = require('../../utils/wxRequest.js');
const app = getApp();
Page({
  data: {
    longitude: '',
    latitude: '',
    scale: '10',
    markers: [],
    projectList: []
  },
  onLoad: function (options) {
    let that = this;
    this.getSys().then(res => {
      if (res.data.rows) {
        if (res.data.rows.length > 0) {
          let rows = res.data.rows;
          let markers = [];
          let projectList = [];
          for (let i = 0; i < rows.length; i++) {
            let markersData = {
              title: rows[i].aliasName,
              id: i,
              latitude: rows[i].latBd09,
              longitude: rows[i].lngBd09,
              width: 30,
              height: 30
            }
            markers[i] = markersData;

            let projectData = {
              userName:rows[i].userName,
              serviceUrl: rows[i].serviceUrl,
              id: i,
              aliasName: rows[i].aliasName,
              name: rows[i].name,
              latitude: rows[i].latBd09,
              longitude: rows[i].lngBd09,
            }
            projectList[i] = projectData;
          }
          that.setData({
            markers: markers,
            projectList: projectList
          });
        } else {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log(res);
              const latitude = res.latitude;
              const longitude = res.longitude;
              let data = {
                title: '当前位置',
                id: 0,
                latitude: latitude,
                longitude: longitude,
                width: 30,
                height: 30
              }
              let markers = [data];
              that.setData({
                markers: markers
              });
            }
          })
        }
      }
    });
  },

  //获取项目
  getSys() {
    let url = app.globalData.BaseURL + '/api/v1/project/projectBoard';
    let data = { code: app.globalData.systemCode };
    return wxRequest.postRequest(url, data);
  },

  // 选择位置
  selectedClick: function (e) {
    let longitude = e.currentTarget.dataset.longitude;
    let latitude = e.currentTarget.dataset.latitude;
    this.setData({
      longitude: longitude,
      latitude: latitude,
      scale: '10'
    });
  },

  toProject(e) {
    let url = e.currentTarget.dataset.serviceurl + '/weChat/loginTo/' + e.currentTarget.dataset.username;
    wx.navigateTo({
      url: '../toProject/toproject?url=' + url,
    })
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
