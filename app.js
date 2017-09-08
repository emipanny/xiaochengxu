//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    let winWidth = 0, winHeight = 0;
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.winWidth = res.windowWidth;
        that.globalData.winHeight = res.windowHeight;

      }
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo, res.encryptedData, res.iv)
        }
      })
    }
  },
  onHide: function (e) {
  },
  onShow: function () {
  },
  globalData: {
    userInfo: null,
    isNavigateTo: false,
    moveback: null,
    winWidth: 0,
    winHeight: 0
  }
})
