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
    noRead: 0,
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
  goTalk: function () {
    wx.navigateTo({
      url: './talkList'
    })
  },
  goProgress: function () {
    wx.navigateTo({
      url: './progress'
    })
  },
  goAddProject: function () {
    wx.navigateTo({
      url: './add'
    })
  },
  goHelp: function () {
    wx.navigateTo({
      url: '../index/help'
    })
  },
  onLoad: function () {
    app.getUserInfo((userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
    wx.setNavigationBarTitle({
      title: 'BIM钉项目经理版'
    })
  },
  onShow: function () {
    api.request("https://xcx.envisioneer.cn/boss/getHome", {})
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
          newMessage: newMessage,
          noRead: res.noRead
        })
      })
  }
})
