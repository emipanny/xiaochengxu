
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    projects: Array(),     //阶段
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '今天待办事项'
    })
  },
  onShow: function () {
    this.init()
  },
  init: function () {
    wx.showLoading({
      title: '加载中',
    })
    let now = Date.now() / 1000 | 0;
    let nowDay = util.formatUnixToDate(now);
    let nowTime = util.formatDateUnix(nowDay);
    let url = "https://xcx.envisioneer.cn/supervisor/getToday";
    api.request(url)
      .then( res => {
        let { projects } = res;
        for (let i = 0; i < projects.length; i++) {
          let { quota } = projects[i];
          for (let j = 0; j < quota.length; j++) {
            let all = (Number(quota[j].end_time) - Number(quota[j].start_time)) / 86400;
            let num = Math.ceil((now - Number(quota[j].start_time)) / 86400);
            projects[i].quota[j].all = all;
            projects[i].quota[j].now = num;
            if (quota[j].supervisor_start >= nowTime && quota[j].supervisor_start < nowTime + 86400) {
              projects[i].quota[j].supervisor_nowStart = util.formatUnixToTime(projects[i].quota[j].supervisor_start);
            }
            if (quota[j].supervisor_end >= nowTime && quota[j].supervisor_end < nowTime + 86400) {
              projects[i].quota[j].supervisor_nowEnd = util.formatUnixToTime(projects[i].quota[j].supervisor_end);
            }
            if (quota[j].designer_start >= nowTime && quota[j].designer_start < nowTime + 86400) {
              projects[i].quota[j].designer_nowStart = util.formatUnixToTime(projects[i].quota[j].designer_start);
            }
            if (quota[j].designer_end >= nowTime && quota[j].designer_end < nowTime + 86400) {
              projects[i].quota[j].designer_nowEnd = util.formatUnixToTime(projects[i].quota[j].designer_end);
            }
          }
        }
        this.setData({
          projects: projects,
        })
        wx.hideLoading();
      })

  },
  call: function (e) {
    let { phone } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  updateQuotaState: function (e) {
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./updateQuotaState?id=" + id);

  },
})