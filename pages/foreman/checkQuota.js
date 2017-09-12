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
    let url = "https://xcx.envisioneer.cn/foreman/checkQuota";
    api.request(url,{id})
      .then(function (res) {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time - 86400);
        res.supervisor_start_date = util.formatUnixToDate(res.supervisor_start);
        res.supervisor_start_time = util.formatUnixToTime(res.supervisor_start);
        res.supervisor_end_date = util.formatUnixToDate(res.supervisor_end);
        res.supervisor_end_time = util.formatUnixToTime(res.supervisor_end);
        res.designer_start_date = util.formatUnixToDate(res.designer_start);
        res.designer_start_time = util.formatUnixToTime(res.designer_start);
        res.designer_end_date = util.formatUnixToDate(res.designer_end);
        res.designer_end_time = util.formatUnixToTime(res.designer_end);
        that.setData({
          id: id,
          info: res,
        })
      })
  },
  start_time: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.start_time = date;
    this.setData({
      info: info,
    })
  },
  end_time: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.end_time = date;
    this.setData({
      info: info,
    })
  },
  supervisor_start_date: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.supervisor_start_date = date;
    this.setData({
      info: info,
    })
  },
  supervisor_start_time: function (e) {
    let time = e.detail.value;
    let { info } = this.data;
    info.supervisor_start_time = time;
    this.setData({
      info: info,
    })
  },
  supervisor_end_date: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.supervisor_end_date = date;
    this.setData({
      info: info,
    })
  },
  supervisor_end_time: function (e) {
    let time = e.detail.value;
    let { info } = this.data;
    info.supervisor_end_time = time;
    this.setData({
      info: info,
    })
  },
  designer_start_date: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.designer_start_date = date;
    this.setData({
      info: info,
    })
  },
  designer_start_time: function (e) {
    let time = e.detail.value;
    let { info } = this.data;
    info.designer_start_time = time;
    this.setData({
      info: info,
    })
  },
  designer_end_date: function (e) {
    let date = e.detail.value;
    let { info } = this.data;
    info.designer_end_date = date;
    this.setData({
      info: info,
    })
  },
  designer_end_time: function (e) {
    let time = e.detail.value;
    let { info } = this.data;
    info.designer_end_time = time;
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
    let {id, info} = this.data;
    let that = this;
    api.request("https://xcx.envisioneer.cn/foreman/EditQuota", { id, info})
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