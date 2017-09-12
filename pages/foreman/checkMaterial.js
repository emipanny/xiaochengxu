// pages/foreman/checkQuota.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    info: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/foreman/checkMaterial";
    api.request(url, { id })
      .then(function (res) {
        res.time = util.formatUnixToDT(res.time);
        that.setData({
          id: id,
          info: res,
        })
      })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  send: function () {
    let id = that.data.id;
    api.navigateTo("./edit?id=" + id);
  },
})