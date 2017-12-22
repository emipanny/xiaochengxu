
Page({

  data: {
    errorCode: 0,
    errorMsg: "",
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发生错误'
    })
    var msg = wx.getStorageSync('errorMsg');
    this.setData({
      errorCode: msg.errcode,
      errorMsg: msg.errmsg
    })
  }
})