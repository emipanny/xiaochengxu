
const util = require('../../utils/util');
const api = require('../../utils/api');
const comment = require('../../utils/comment');
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
    this.data.currentTab = options.currentTab;
    this.init();
    wx.setNavigationBarTitle({
      title: '留言板'
    })
  },
  onShow: function () {
    this.init();
  },
  init: function () {
    let { currentTab } = this.data; 
    let url = "https://xcx.envisioneer.cn/boss/getTalkList";
    let data = { by: this.data.currentTab };
    let now = Date.parse(new Date()) / 1000;
    api.request(url, data)
      .then(res => {
        res.onList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
            item.count = item.count || 0;
            item.compare = comment.compareMessageCount(item.id, item.count);
          }
        });
        res.endList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          item.endTime = util.formatDate(new Date(item.endTime * 1000));
          item.count = item.count || 0;
          item.compare = comment.compareMessageCount(item.id, item.count);
        });
        res.willList.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
            item.count = item.count || 0;
            item.compare = comment.compareMessageCount(item.id, item.count);
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
  showAct: function (e) {
    let id = e.currentTarget.dataset.name;
    api.navigateTo('./talk?id=' + id);

  },

})