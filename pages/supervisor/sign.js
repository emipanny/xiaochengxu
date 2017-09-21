// pages/project/on.js
const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onList: Array(),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    let url = "https://xcx.envisioneer.cn/supervisor/getProjectsListOn";
    let now = Date.parse(new Date()) / 1000;
    api.request(url, {})
      .then(function (res) {
        res.forEach(function (item) {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
          item.sign.forEach(function (sign) {
            sign.time = util.formatUnixToTime(sign.time)
          })
        });
        console.log(res)
        that.setData({
          onList: res,
        })
      });
    wx.setNavigationBarTitle({
      title: '签到'
    })
  },
  showAct: function (e) {
    wx.showLoading({ mask: true });
    let that = this;
    let id = e.currentTarget.dataset.name;
    let position;
    api.checkLocation()
      .then(function () {
        return api.getLocation()
      })
      .then(function (res) {
        let { latitude, longitude } = res;
        return api.request("https://xcx.envisioneer.cn/supervisor/sign", { id, latitude, longitude });
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
          let list = that.data.onList;
          list.forEach(function (item) {
            if (item.id == id) {
              let len = item.sign.length;
              item.sign[len] = {};
              item.sign[len].time = util.formatUnixToTime(res.time);
            }
          });
          console.log(list);
          that.setData({
            onList: list,
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