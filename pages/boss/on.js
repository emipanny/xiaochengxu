
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    winWidth: app.globalData.winWidth,
    winHeight: app.globalData.winHeight - 40,
    // tab切换  
    currentTab: 0,
    onList: Array(),
    endList: Array(),
    willList: Array(),

  },

  onLoad: function (options) {
    if (options.currentTab){
      this.setData({
        currentTab: options.currentTab
      })
    }
    let url = "https://xcx.envisioneer.cn/boss/getProjectsList";
    let data = { by: this.data.currentTab };
    let now = Date.parse(new Date()) / 1000;
    api.request(url, data)
      .then( res => {
        res.onList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
        });
        res.endList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
        });
        res.willList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
        });
        this.setData({
          onList: res.onList,
          endList: res.endList,
          willList: res.willList,
        })
      });
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
  showAct: function(e){
    let id = e.currentTarget.dataset.name;
    api.navigateTo('./checkProject?id=' + id);
  },

})