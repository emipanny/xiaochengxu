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
    users: null,
    date: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options;
    let that = this;
    api.request("https://xcx.envisioneer.cn/foreman/checkMaterial", { id })
      .then(function (res) {
        let { material, users} = res;
        let time = material.time;
        material.time = util.formatUnixToTime(time);
        if (material.arrive) material.arrive = util.formatUnixToDT(material.arrive);
        that.setData({
          id: id,
          info: material,
          users: users,
          date: util.formatUnixToDate(time)
        })
        console.log(that.data)
      })
  },
  send: function () {
    let { id, info } = this.data;
    if (info.arrive) {
      api.request("https://xcx.envisioneer.cn/foreman/updateMaterialState", { id , arrive:info.arrive}).
        then(function (res) {
          if (res == 1) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未填写材料送达时间，请填写后再提交',
      })
    }

  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  timeChange: function (e) {
    let time = e.detail.value;
    let { info, date} = this.data; 
    info.arrive = date + " " + time;
    this.setData({
      info: info,
    })
  },
})