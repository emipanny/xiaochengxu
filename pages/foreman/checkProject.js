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
    goods:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    console.log(options.id)
  },
  onShow: function () {
    let that = this
    let id = that.data.id;
    let url = "https://xcx.envisioneer.cn/foreman/getProjectInfo";
    let data = { id };
    let winWidth = 0;
    let winHeight = 0;
    api.getSystemInfo()
      .then(function (res) {
        winWidth = res.windowWidth;
        winHeight = res.windowHeight;
        return api.request(url, data)
      })
      .then(function (res) {
        res.info.startTime = util.formatDate(new Date(res.info.startTime * 1000));
        that.setData({
          id: id,
          info: res.info,
          goods: res.goods,
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
  checkREP: function () {
    let id = this.data.id;
    api.navigateTo("./checkREP?id=" + id)

  },
  allot: function () {
    let id = this.data.id;
    api.navigateTo("../index/foremanallot?id=" + id)
  },
  report: function () {
    let id = this.data.id;
    api.navigateTo("./report?id=" + id)
  },
  check: function () {
    let id = this.data.id;
    api.navigateTo("./preview?id=" + id)
  }
})