// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    info:null,
    goods:null,
    user: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/boss/getProjectInfo";
    let data = { id };
    let winWidth = 0;
    let winHeight = 0;
    api.getSystemInfo()
      .then(function (res) {
        winWidth = res.windowWidth;
        winHeight = res.windowHeight;
        return api.request(url, data)
      })
      .then(function(res){
        res.info.startTime = util.formatDate(new Date(res.info.startTime * 1000));
        that.setData({
          id: id,
          info: res.info,
          goods: res.goods,
          user: res.user,
          winWidth: winWidth,
          winHeight: winHeight - 40,
        })
      })
  },
  checkmap: function () {
    let that = this
    wx.openLocation({
      latitude: that.data.info.latitude,
      longitude: that.data.info.longitude,
      success:function(res){

      }
    })
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
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
    let that = this;
    let id = e.currentTarget.dataset.id;
    let url = "https://xcx.envisioneer.cn/boss/confirm";
    let user = this.data.user;
    api.request(url,{id})
      .then(function(res){
        for(let key in user){
          if(user[key].id == id){
            user[key].state = 1;
            break;
          }
        }
        that.setData({
          user: user
        })
      })
  },
  delUser: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let url = "https://xcx.envisioneer.cn/boss/delUser";
    let user = this.data.user;
    let list = Array();
    api.request(url, { id })
      .then(function (res) {
        for (let key in user) {
          if (user[key].id != id) {
            let len = list.length;
            list[len] = user[key];
          }
        }
        that.setData({
          user: list
        })
      })
  }
})