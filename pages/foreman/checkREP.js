// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    stage: Array(),     //阶段
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
  },
  onShow: function () {
    let id = this.data.id;
    this.init(id);
  },
  init: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let url = "https://xcx.envisioneer.cn/foreman/checkREP";
    let data = { id };
    api.request(url, data)
      .then(function (res) {
        let stage = res.stage;
        stage.forEach(function (item) {
          item.start_time = util.formatUnixToDate(item.start_time);
          item.end_time = util.formatUnixToDate(item.end_time);
          item.quota.forEach(function (list) {
            list.diff = (list.num - list.consumption).toFixed(2);
          })
        });
        that.setData({
          stage: res.stage
        })
        wx.hideLoading()
      })
    wx.setNavigationBarTitle({
      title: '项目预览'
    })

  },
  act: function (e) {
    let that = this
    let { data, stage } = e.currentTarget.dataset;
    let { material, build, soft } = that.data;
    let material2, build2, soft2;
    for (let key in material) {
      if (stage == material[key].title) {
        app.globalData.tempmaterial = material[key].data;
        break;
      }
    }
    for (let key in build) {
      if (stage == build[key].title) {
        app.globalData.tempbuild = build[key].data;
        break;
      }
    }
    for (let key in soft) {
      if (stage == soft[key].title) {
        app.globalData.tempsoft = soft[key].data;
        break;
      }
    }
    app.globalData.tempdata = data;
    api.navigateTo("./edit?id=" + that.data.id);


  },
  order: function (order, stage) { },
  editCancl: function () {
    this.setData({
      editShow: false,
      edit: {
        order: 0,
        material: null,
        startTime: null,
        endTime: null,
        user: null
      }
    })

  },
  materialShow: function () {
    this.setData({
      edit: {
        materialShow: true,
      }
    })
  },
  noAct: function () {
    wx.showModal({
      title: '提示',
      content: '您已经提交过该项，如果需要修改，请到查看项目里修改',
      showCancel: false,
    })
  },
  checkQuota: function (e) {
    let that = this
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./checkQuota?id=" + id);
  },
  checkMaterial: function (e) {
    let that = this
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./checkMaterial?id=" + id);
  },
})