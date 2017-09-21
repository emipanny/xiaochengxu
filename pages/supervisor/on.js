// pages/project/on.js
const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    onList: Array(),
    endList: Array(),
    willList: Array(),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.currentTab) {
      that.setData({
        currentTab: options.currentTab
      })
    }
    let url = "https://xcx.envisioneer.cn/supervisor/getProjectsList";
    let data = { by: that.data.currentTab };
    let winWidth = 0;
    let winHeight = 0;
    let now = Date.parse(new Date()) / 1000;
    api.getSystemInfo()
      .then(function (res) {
        winWidth = res.windowWidth;
        winHeight = res.windowHeight;
        return api.request(url, data)
      })
      .then(function (res) {
        res.onList.forEach(function (item) {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
        });
        res.endList.forEach(function (item) {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime < now) {
            item.endTime = util.formatUnixToDate(item.endTime - 86400);
          }
        });
        res.willList.forEach(function (item) {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.startTime - item.endTime) / 86400) ;
          }
        });
        that.setData({
          onList: res.onList,
          endList: res.endList,
          willList: res.willList,
          winWidth: winWidth,
          winHeight: winHeight - 40,
        })
      });
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
  showAct: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.name;
    api.navigateTo('./checkProject?id=' + id);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})