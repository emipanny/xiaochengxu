// pages/foreman/updateQuotaState.js
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
    let { id } = options;
    let that = this;
    api.request("https://xcx.envisioneer.cn/designer/checkQuota", { id })
      .then(function (res) {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time);
        res.designer_start = util.formatUnixToDT(res.designer_start);
        if (res.designer_start_finish) res.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        res.designer_end = util.formatUnixToDT(res.designer_end);
        if (res.designer_end_finish) res.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
        that.setData({
          id: id,
          info: res
        })
      })
  },
  startState: function () {
    let { id, info } = this.data;
    let that = this;
    api.request("https://xcx.envisioneer.cn/designer/updateQuotaStartState", { id }).
      then(function (res) {
        info.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        that.setData({
          info: info
        })
      })
  },
  endState: function () {
    let { id, info } = this.data;
    let that = this;
    api.request("https://xcx.envisioneer.cn/designer/updateQuotaEndState", { id }).
      then(function (res) {
        console.log(res);
        info.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
        that.setData({
          info: info
        })
      })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  }

})