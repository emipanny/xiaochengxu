
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    info: null,
    users: null,
    date: "",
  },

  onLoad: function (options) {
    let { id } = options;
    api.request("https://xcx.envisioneer.cn/foreman/checkMaterial", { id })
      .then( res => {
        let { material, users} = res;
        let time = material.time;
        material.time = util.formatUnixToTime(time);
        if (material.arrive) material.arrive = util.formatUnixToDT(material.arrive);
        this.setData({
          id: id,
          info: material,
          users: users,
          date: util.formatUnixToDate(time)
        })
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