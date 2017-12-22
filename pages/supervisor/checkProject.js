
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    winWidth: app.globalData.winWidth,
    winHeight: app.globalData.winHeight - 40,
    // tab切换  
    currentTab: 0,
    info: null,
    goods: null
  },

  onLoad: function (options) {
    this.data.id = options.id;
  },
  onShow: function () {
    let id = that.data.id;
    let url = "https://xcx.envisioneer.cn/supervisor/getProjectInfo";
    let data = { id };
   api.request(url, data)
      .then( res => {
        res.info.startTime = util.formatDate(new Date(res.info.startTime * 1000));
        this.setData({
          id: id,
          info: res.info,
          goods: res.goods,
        })
      })

  },
  checkmap: function () {
    wx.openLocation({
      latitude: Number(this.data.info.latitude),
      longitude: Number(this.data.info.longitude),
      success: res => {
      }
    })
  },
  bindChange: function (e) {
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  check: function () {
    let id = this.data.id;
    api.navigateTo("./preview?id=" + id)
  }
})