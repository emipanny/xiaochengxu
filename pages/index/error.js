// pages/index/error.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorCode: 0,
    errorMsg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.setNavigationBarTitle({
      title: '发生错误'
    })
    var msg = wx.getStorageSync('errorMsg');
    console.log(msg.errcode);
    that.setData({
      errorCode: msg.errcode,
      errorMsg: msg.errmsg
    })
  
  }

})