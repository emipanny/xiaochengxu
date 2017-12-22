var api = require('../../utils/api');
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    countEnd: 0,
    countOn: 0,
    countWill: 0,
  },
  goPerson: function () {
    wx.navigateTo({
      url: './person'
    })
  },
})
