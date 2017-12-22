
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({
  data: {
    id: 0,
    info: null,
  },

  onLoad: function (options) {
    let { id } = options;
    api.request("https://xcx.envisioneer.cn/supervisor/checkQuota", { id })
      .then( res => {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time);
        res.supervisor_start = util.formatUnixToDT(res.supervisor_start);
        if (res.supervisor_start_finish) res.supervisor_start_finish = util.formatUnixToDT(res.supervisor_start_finish);
        res.supervisor_end = util.formatUnixToDT(res.supervisor_end);
        if (res.supervisor_end_finish) res.supervisor_end_finish = util.formatUnixToDT(res.supervisor_end_finish);
        this.setData({
          id: id,
          info: res
        })
      })
  },
  startState: function () {
    let { id, info } = this.data;
    api.request("https://xcx.envisioneer.cn/supervisor/updateQuotaStartState", { id }).
      then( res => {
        info.supervisor_start_finish = util.formatUnixToDT(res.supervisor_start_finish);
        this.setData({
          info: info
        })
      })
  },
  endState: function () {
    let { id, info } = this.data;
    api.request("https://xcx.envisioneer.cn/supervisor/updateQuotaEndState", { id }).
      then( res => {
        info.supervisor_end_finish = util.formatUnixToDT(res.supervisor_end_finish);
        this.setData({
          info: info
        })
      })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  }

})