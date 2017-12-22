//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    let winWidth = 0, winHeight = 0;
    wx.getSystemInfo({
      success:  res => {
        this.globalData.winWidth = res.windowWidth;
        this.globalData.winHeight = res.windowHeight;
      }
    })
  },

  getUserInfo: function(cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          this.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(this.globalData.userInfo, res.encryptedData, res.iv)
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
