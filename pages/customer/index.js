const util = require('../../utils/util');
const api = require('../../utils/api');
var comment = require('../../utils/comment');
var app = getApp();

Page({
  data: {
    userInfo: {},
    list: null,
    now: Date.now() / 1000 | 0,
  },
  onLoad: function () {
    app.getUserInfo( (userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
    wx.setNavigationBarTitle({
      title: '项目管理'
    })
  },
  onShow: function(){
    api.request("https://xcx.envisioneer.cn/customer/getHome", {})
      .then( (res) => {
        let {now} = this.data;
        res.list.forEach( (item) => {
          item.startTime = util.formatUnixToDate(item.startTime);
          if (item.endTime > now) {
            item.isEnd = false;
            item.endTime = parseInt((item.endTime - now) / 86400) + 1;
          }
          else item.isEnd = true;
          item.count = item.count || 0;
          item.compare = comment.compareMessageCount(item.id, item.count);
        });
        this.setData({
          list: res.list,
        })
      })
  },
  showAct: function(e){
    let id = e.currentTarget.dataset.id;
    let time = this.data.now;
    time = util.formatUnixToDUnix(time);
    api.navigateTo("./check?id=" + id + "&time=" + time);
  },
  showTalk: function (e) {
    let id = e.currentTarget.dataset.id;
    let time = this.data.now;
    time = util.formatUnixToDUnix(time);
    api.navigateTo("./talk?id=" + id );
  }
})
