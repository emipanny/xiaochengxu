//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
		userInfo: {},
		countEnd: 0,
		countOn: 0,
		countWill: 0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  goProgress: function () {
    wx.navigateTo({
      url: '../progress/progress'
    })
  },
  goAddProject: function () {
    wx.navigateTo({
      url: '../project/add'
    })
  },
  goHelp: function () {
    wx.navigateTo({
      url: '../help/index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
		
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.setNavigationBarTitle({
      title: '帮助手册'
    })
    that.setData({
      countEnd: 5,
      countOn: 6,
      countWill: 7,
		})
  }
})
