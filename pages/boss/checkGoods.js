// pages/boss/checkProject.js
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
    currentTab: 1,
    artificial: Array(),//人工
    quota: Array(),     //施工定额
    goods: Array(),     
    build: Array(),     //建筑辅料
    soft: Array(),      //家居软装
    material: Array(),  //装修主材
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    //let id = options.id;
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/boss/getProjectGoods";
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
        let goods = Array();
        goods[0] = Array();
        goods[1] = Array();
        goods[2] = Array();
        goods[3] = Array();
        goods[4] = Array();
        for(let i = 0; i < res.length; i++){
          let on = false;
          let j = 0;
          if (res[i].type == "人工") j = 0;
          if (res[i].type == "施工定额") j = 1;
          if (res[i].type == "建筑辅料") j = 2;
          if (res[i].type == "家居软装") j = 3;
          if (res[i].type == "装修主材") j = 4;

          if(goods[j].length){
            for (let key in goods[j]) {
              if (goods[j][key].title == res[i].position) {
                goods[j][key].data[goods[j][key].data.length] = res[i];
                on = true;
              }
            }
            if (!on) {
              let len = goods[j].length;
              goods[j][len] = {};
              goods[j][len].title = res[i].position;
              goods[j][len].data = Array();
              goods[j][len].data[0] = res[i];
            }
          }
          else {
            goods[j][0] = {};
            goods[j][0].title = res[i].position;
            goods[j][0].data = Array();
            goods[j][0].data[0] = res[i];
          }
        }

        that.setData({
          artificial: goods[0],
          quota: goods[1],
          build: goods[2],
          soft: goods[3],
          material: goods[4],
          winWidth: winWidth,
          winHeight: winHeight - 40,
        })
        wx.hideLoading()
      })
    wx.setNavigationBarTitle({
      title: '产品详情'
    })
    console.log(this.data.currentTab)
  },
  checkmap: function () {
    let that = this
    wx.openLocation({
      latitude: that.data.info.latitude,
      longitude: that.data.info.longitude,
      success: function (res) {

      }
    })
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
})