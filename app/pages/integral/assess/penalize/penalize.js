Page({
  data: {
    arr:[1,2,3],
    activeNames: ['1']
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  }
  
})