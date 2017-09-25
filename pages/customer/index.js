const util = require('../../utils/util');
const api = require('../../utils/api');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    list: null,
    now: Date.now() / 1000 | 0,
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    let info;
    app.getUserInfo(function (userInfo) {
      //更新数据
      info = userInfo;
    })
    wx.setNavigationBarTitle({
      title: '项目管理'
    })
    api.request("https://xcx.envisioneer.cn/customer/getHome", {})
      .then(function (res) {
        let {now} = that.data;
        res.list.forEach(function (item) {
          item.startTime = util.formatUnixToDate(item.startTime);
          if (item.endTime > now) {
            item.isEnd = false;
            item.endTime = parseInt((item.endTime - now) / 86400) + 1;
          }
          else item.isEnd = true;
        });
        that.setData({
          userInfo: info,
          list: res.list,
        })
      })
  },
  showAct: function(e){
    let id = e.currentTarget.dataset.id;
    let time = this.data.now;
    time = util.formatUnixToDUnix(time);
    api.navigateTo("./check?id=" + id + "&time=" + time);
  }
})
