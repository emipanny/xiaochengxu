
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({
  data: {
    id: 0,
    info: null,
  },

  onLoad: function (options) {
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/supervisor/checkQuota";
    api.request(url, { id })
      .then( res => {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time - 86400);
        res.supervisor_start = util.formatUnixToDT(res.supervisor_start);
        if (res.supervisor_start_finish) res.supervisor_start_finish = util.formatUnixToDT(res.supervisor_start_finish);
        res.supervisor_end = util.formatUnixToDT(res.supervisor_end);
        if (res.supervisor_end_finish) res.supervisor_end_finish = util.formatUnixToDT(res.supervisor_end_finish);
        res.designer_start = util.formatUnixToDT(res.designer_start);
        if (res.designer_start_finish) res.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        res.designer_end = util.formatUnixToDT(res.designer_end);
        if (res.designer_end_finish) res.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
        this.setData({
          id: id,
          info: res,
        })
      })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})