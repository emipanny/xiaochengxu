var api = require('../../utils/api');
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
  goProjects: function () {
    wx.navigateTo({
      url: './on'
    })
  },
  goToday: function () {
    wx.navigateTo({
      url: './today'
    })
  },
  goProgress: function () {
    wx.navigateTo({
      url: './progress'
    })
  },
  goSign: function () {
    wx.navigateTo({
      url: './sign'
    })
  },
  goHelp: function () {
    wx.navigateTo({
      url: '../index/help'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    let info;
    app.getUserInfo(function (userInfo) {
      //更新数据
      info = userInfo;
    })
    wx.setNavigationBarTitle({
      title: '项目管理'
    })
    api.request("https://xcx.envisioneer.cn/designer/getHome", {})
      .then(function (res) {
        console.log(res);
        that.setData({
          userInfo: info,
          countEnd: res.endNum,
          countOn: res.onNum,
          countWill: res.willNum,
        })
      })
  }
})
