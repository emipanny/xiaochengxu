var api = require('../../utils/api');
var comment = require('../../utils/comment');
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
    newMessage: 0,
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
  goTalk: function () {
    wx.navigateTo({
      url: './talkList'
    })
  },
  goHelp: function () {
    wx.navigateTo({
      url: '../index/help'
    })
  },
  onLoad: function () {
    app.getUserInfo( (userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
    wx.setNavigationBarTitle({
      title: '项目管理'
    })
  },
  onShow: function () {
    api.request("https://xcx.envisioneer.cn/foreman/getHome", {})
      .then(res => {
        let saveCount = comment.allMessageCount();
        let all = 0;
        let newMessage = 0;
        res.on.forEach(item => {
          all += item.count || 0;
        })
        res.end.forEach(item => {
          all += item.count || 0;
        })
        res.will.forEach(item => {
          all += item.count || 0;
        })
        all - saveCount > 0 ? newMessage = all - saveCount : newMessage = 0;
        this.setData({
          countEnd: res.end.length,
          countOn: res.on.length,
          countWill: res.will.length,
          newMessage: newMessage
        })
      })
  }
})
