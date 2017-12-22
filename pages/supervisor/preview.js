
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    stage: Array(),     //阶段
  },

  onLoad: function (options) {
    let id = options.id;
    this.init(id);
    wx.setNavigationBarTitle({
      title: '项目预览'
    })
  },
  init: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    let url = "https://xcx.envisioneer.cn/supervisor/getPreview";
    let data = { id };
    api.request(url, data)
      .then( res => {
        let rejson = res.stage;
        let stage = Array();
        for (let i = 0; i < rejson.length; i++) {
          if (rejson[i].quota.length) {
            let len = stage.length;
            let { quota, material } = rejson[i];
            stage[len] = {};
            stage[len].id = rejson[i].id;
            stage[len].title = rejson[i].title;
            stage[len].date = Array();
            let start = rejson[i].start_time;
            let end = rejson[i].end_time;
            let time = 0;
            while (time < end - 86400) {
              let h = stage[len].date.length;
              time = start + 86400 * h;
              stage[len].date[h] = {};
              stage[len].date[h].time = time;
              stage[len].date[h].date = util.formatUnixToDate((time));
              stage[len].date[h].quota = Array();
              stage[len].date[h].material = Array();
              for (let j = 0; j < quota.length; j++) {
                let { start_time, end_time } = quota[j];
                if (start_time <= time && time + 86400 <= end_time) {
                  let quota_len = stage[len].date[h].quota.length;
                  stage[len].date[h].quota[quota_len] = {};
                  stage[len].date[h].quota[quota_len].title = quota[j].title;
                  stage[len].date[h].quota[quota_len].id = quota[j].id;
                  stage[len].date[h].quota[quota_len].num = quota[j].num;
                  stage[len].date[h].quota[quota_len].unit = quota[j].unit;
                  stage[len].date[h].quota[quota_len].start_time = quota[j].start_time;
                  stage[len].date[h].quota[quota_len].end_time = quota[j].end_time;
                  stage[len].date[h].quota[quota_len].time = start_time + "-" + end_time + "-" + time;
                  stage[len].date[h].quota[quota_len].dayNum = ((time - start_time) / 86400) + 1;
                  stage[len].date[h].quota[quota_len].dayAll = (end_time - start_time) / 86400;
                }
              }
              for (let j = 0; j < material.length; j++) {
                let rTime = material[j].time;
                if (time <= rTime && rTime < time + 86400) {
                  let material_len = stage[len].date[h].material.length;
                  stage[len].date[h].material[material_len] = {};
                  stage[len].date[h].material[material_len].id = material[j].id;
                  stage[len].date[h].material[material_len].title = material[j].title;
                  stage[len].date[h].material[material_len].num = material[j].num;
                  stage[len].date[h].material[material_len].unit = material[j].unit;
                  stage[len].date[h].material[material_len].time = util.formatUnixToTime(material[j].time);
                }
              }
            }
          }
        }
        this.setData({
          stage: stage,
          id: id
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