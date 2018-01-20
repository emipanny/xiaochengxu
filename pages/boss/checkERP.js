
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    stage: Array(),     //阶段
  },

  onLoad: function (options) {
    this.data.id = options.id;
    wx.setNavigationBarTitle({
      title: '项目预览'
    })
  },
  onShow: function () {
    let id = this.data.id;
    this.init(id);
  },
  init: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    let url = "https://xcx.envisioneer.cn/boss/checkERP";
    let data = { id };
    api.request(url, data)
      .then(res => {
        let {stage} = res;
        stage.forEach(item => {
          item.quota.forEach(list => {
            list.state == 1 ? list.diff = (list.num - list.consumption).toFixed(2) : list.diff = "--";
            list.start_time = util.formatUnixToDate(list.start_time);
            list.end_time = util.formatUnixToDate(list.end_time - 86400);
          })
        });
        this.setData({
          stage: res.stage
        })
        wx.hideLoading()
      })
  },
  act: function (e) {
    let { data, stage } = e.currentTarget.dataset;
    let { material, build, soft } = this.data;
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
    api.navigateTo("./edit?id=" + this.data.id);


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
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./checkQuota?id=" + id);
  },
  checkMaterial: function (e) {
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./checkMaterial?id=" + id);
  },
})