var api = require('../../utils/api')
const app = getApp();
Page({

  data: {

    id: 0,
    winWidth: app.globalData.winWidth,
    winHeight: app.globalData.winHeight - 40,
    currentTab: 0,
    left: 0
  },

  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '帮助中心'
    })
  },
  bindChange: function (e) {
    this.moveDiv(e.detail.current)
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.moveDiv(e.detail.current)
    }
  },
  moveDiv: function (tab) {
    let left = 0, winWidth = this.data.winWidth;
    if (tab == 0) left = 0;
    if (tab == 1) left = 0;
    if (tab == 2) left = winWidth * 2 / 5;
    if (tab == 3) left = 2 * winWidth * 2 / 5;
    if (tab == 4) left = 3 * winWidth * 2 / 5;
    console.log(left);
    this.setData({
      left: left,
      currentTab: tab
    })

  }
})