// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    material: Array(),
    time: 0,
  },
  onLoad: function (option) {
    let time;
    if (option.time) time = option.time;
    else time = util.formatUnixToDUnix(Date.parse(new Date()) / 1000);
    
    this.init(time);
  },
  init: function (time) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let url = "https://xcx.envisioneer.cn/purchase/getHome";
    api.request(url, { time })
      .then(function (res) {
        console.log(time);
        console.log(res);
        let { material } = res;
        material.forEach(function (item) {
          item.time = util.formatUnixToTime(item.time);
          item.arrive = util.formatUnixToTime(item.arrive);
        });
        that.setData({
          time: time,
          material: material,
        })
        wx.hideLoading();
      })
    wx.setNavigationBarTitle({
      title: util.formatUnixToDate(time)
    })

  },
  prev: function () {
    let {time} = this.data;
    time = time - 86400;
    api.redirectTo("./on?time=" + time);
  },
  next: function () {
    let {time} = this.data;
    time = Number(time) + 86400;
    api.redirectTo("./on?time=" + time);
  },
  dateChange: function (e) {
    let {time} = this.data;
    let date = e.detail.value;
    time = util.formatDateUnix(date);
    api.redirectTo("./on?time=" + time);
  },
  arrive: function (e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您已经送到该地点并打卡吗',
      success: function (res) {
        if (res.confirm) {
          that.sign(id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  sign: function (id) {
    wx.showLoading({ mask: true });
    let that = this;
    let position;
    api.checkLocation()
      .then(function () {
        return api.getLocation()
      })
      .then(function (res) {
        let { latitude, longitude } = res;
        return api.request("https://xcx.envisioneer.cn/purchase/sign", { id, latitude, longitude });
      })
      .then(function (res) {
        if (res.errcode) {
          wx.hideLoading();
          wx.showModal({
            title: '签到失败',
            content: '请检查是否开启了定位，或者您不在需要打卡的区域',
            showCancel: false,
          })
        }
        else {
          let list = that.data.material;
          list.forEach(function (item) {
            if (item.id == id) {
              item.state = 1;
              item.arrive = util.formatUnixToTime(res.arrive);
            }
          });
          that.setData({
            material: list,
          });
          wx.hideLoading();
          wx.showModal({
            title: '签到成功',
            showCancel: false,
          })
        }
      })

  },
})