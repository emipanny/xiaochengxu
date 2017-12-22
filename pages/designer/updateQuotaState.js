
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
    api.request("https://xcx.envisioneer.cn/designer/checkQuota", { id })
      .then( res => {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time);
        res.designer_start = util.formatUnixToDT(res.designer_start);
        if (res.designer_start_finish) res.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        res.designer_end = util.formatUnixToDT(res.designer_end);
        if (res.designer_end_finish) res.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
        this.setData({
          id: id,
          info: res
        })
      })
  },
  startState: function () {
    let { id, info } = this.data;
    api.request("https://xcx.envisioneer.cn/designer/updateQuotaStartState", { id }).
      then( res => {
        info.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        this.setData({
          info: info
        })
      })
  },
  endState: function () {
    let { id, info } = this.data;
    api.request("https://xcx.envisioneer.cn/designer/updateQuotaEndState", { id }).
      then( res => {
        info.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
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