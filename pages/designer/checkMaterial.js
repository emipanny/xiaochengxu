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
    purchase: Array(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/designer/checkMaterial";
    api.request(url, { id })
      .then(function (res) {
        console.log(res);
        let { material, purchase } = res;
        material.time = util.formatUnixToDT(material.time);
        that.setData({
          id: id,
          info: material,
          purchase: purchase,
        })
      })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})