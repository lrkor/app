const app = getApp();
const wxRequest = require('../../../utils/wxRequest.js');
Page({
  data: {
    psersonResult: [],
    psersonList:[
      {
        name:'1',
        id:1,
      },
      {
        name:'2',
        id:2,
      },
      {
        name:'3',
        id:3,
      },
      {
        name:'4',
        id:4,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
      {
        name:'5',
        id:5,
      },
    ]
  },
  onLoad: function (options) {
    let type = options.type;
    let that = this;
    this.setData({
      type: type
    });
  },

  onChange(event) {
    this.setData({
      psersonResult: event.detail
    });
  },

  toggle(event) {
    const { id } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${id}`);
    checkbox.toggle();
  },

  reset() {
    this.setData({
      psersonResult: []
    });
  },

  checkAll() {
    let { psersonList } = this.data;
    let psersonResult = [];
    for (let item of psersonList) {
      psersonResult.push(item.name);
    }
    this.setData({ psersonResult });
  },

})
