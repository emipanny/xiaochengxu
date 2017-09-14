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
        res.date = util.formatUnixToDate(res.time);
        res.time = util.formatUnixToTime(res.time);
        that.setData({
          id: id,
          info: res,
        })
      })
  },

  date: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.date = date;
    this.setData({
      info: info,
    })
  },
  time: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.time = date;
    this.setData({
      info: info,
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  send: function () {
    let { id, info } = this.data;
    let that = this;
    api.request("https://xcx.envisioneer.cn/foreman/editMaterial", { id, info })
      .then(function (res) {
        if (res == 22001) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '正在进行中的项目不能直接更改，请到进度管理里提交更改',
          })
        }
        else {
          that.back();
        }
      })
  },
})