
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    winWidth: app.globalData.winWidth,
    winHeight: app.globalData.winHeight - 40,
    // tab切换  
    currentTab: 0,
    info:null,
    goods:null,
    user: null
  },

  onLoad: function (options) {
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/boss/getProjectInfo";
    let data = { id };
    api.request(url, data)
      .then( res => {
        res.info.startTime = util.formatDate(new Date(res.info.startTime * 1000));
        this.setData({
          id: id,
          info: res.info,
          goods: res.goods,
          user: res.user,
        })
      })
  },
  checkmap: function () {
    wx.openLocation({
      latitude: this.data.info.latitude,
      longitude: this.data.info.longitude,
      success: (res) => {

      }
    })
  },
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  checkgoods: function(){
    let id = this.data.id;
    api.navigateTo("./checkGoods?id="+id)

  },
  allot: function () {
    let id = this.data.id;
    api.navigateTo("../index/allot?id=" + id)
  },
  passUser: function (e) {
    let id = e.currentTarget.dataset.id;
    let url = "https://xcx.envisioneer.cn/boss/confirm";
    let user = this.data.user;
    api.request(url,{id})
      .then( (res) =>{
        for(let key in user){
          if(user[key].id == id){
            user[key].state = 1;
            break;
          }
        }
        this.setData({
          user: user
        })
      })
  },
  delUser: function (e) {
    let id = e.currentTarget.dataset.id;
    let url = "https://xcx.envisioneer.cn/boss/delUser";
    let user = this.data.user;
    let list = Array();
    api.request(url, { id })
      .then( (res) => {
        for (let key in user) {
          if (user[key].id != id) {
            let len = list.length;
            list[len] = user[key];
          }
        }
        this.setData({
          user: list
        })
      })
  }
})