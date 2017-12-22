
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    info: null,
    editShow: true,
    userShow: false,
    purchase: Array(),
    users: Array(),
    usersChoose: Array(),
    winHeight: app.globalData.winHeight,
  },

  onLoad: function (options) {
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/foreman/checkMaterial";
    api.request(url, { id })
      .then( res => {
        let { material, purchase, users} = res;
        material.date = util.formatUnixToDate(material.time);
        material.time = util.formatUnixToTime(material.time);
        let data = Array();
        for (let i = 0; i < purchase.length; i++){
          data[data.length] = purchase[i].uid;
        }
        this.setData({
          id: id,
          info: material,
          users: users,
          usersChoose: data,
          purchase: data,
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
  editUser: function (e) {
    let users = this.data.users;
    this.setData({
      userShow: true,
      editShow: false,
      users: users
    })
  },
  editCancl: function (e) {
    let purchase = this.data.purchase;
    this.setData({
      userShow: false,
      editShow: true,
      usersChoose: purchase
    })
  },
  usercheckboxChange: function (e) {
    this.data.usersChoose = e.detail.value;
  },
  userSure: function (e) {
    let usersChoose = this.data.usersChoose;
    this.setData({
      userShow: false,
      editShow: true,
      purchase: usersChoose
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  send: function () {
    let { id, info, purchase} = this.data;
    api.request("https://xcx.envisioneer.cn/foreman/editMaterial", { id, info, purchase})
      .then( res => {
        if (res == 22001) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '正在进行中的项目不能直接更改，请到进度管理里提交更改',
          })
        }
        else {
          this.back();
        }
      })
  },
})