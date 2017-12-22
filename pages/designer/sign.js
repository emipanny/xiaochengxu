
const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  data: {
    onList: Array(),

  },

  onLoad: function () {
    let url = "https://xcx.envisioneer.cn/designer/getProjectsListOn";
    let now = Date.parse(new Date()) / 1000;
    api.request(url, {})
      .then( res => {
        res.forEach( item => {
          item.startTime = util.formatDate(new Date(item.startTime * 1000));
          if (item.endTime > now) {
            item.endTime = parseInt((item.endTime - now) / 86400);
          }
          item.sign.forEach( sign => {
            sign.time = util.formatUnixToTime(sign.time)
          })
        });
        this.setData({
          onList: res,
        })
      });
    wx.setNavigationBarTitle({
      title: '签到'
    })
  },
  showAct: function (e) {
    wx.showLoading({ mask: true });
    let id = e.currentTarget.dataset.name;
    let position;
    api.checkLocation()
      .then( () => {
        return api.getLocation()
      })
      .then( res => {
        let { latitude, longitude } = res;
        return api.request("https://xcx.envisioneer.cn/designer/sign", { id, latitude, longitude });
      })
      .then( res => {
        if (res.errcode) {
          wx.hideLoading();
          wx.showModal({
            title: '签到失败',
            content: '请检查是否开启了定位，或者您不在需要打卡的区域',
            showCancel: false,
          })
        }
        else {
          let list = this.data.onList;
          list.forEach( item => {
            if (item.id == id) {
              let len = item.sign.length;
              item.sign[len] = {};
              item.sign[len].time = util.formatUnixToTime(res.time);
            }
          });
          that.setData({
            onList: list,
          });
          wx.hideLoading();
          wx.showModal({
            title: '签到成功',
            showCancel: false,
          })
        }
      })
  },
})