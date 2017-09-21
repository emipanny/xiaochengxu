// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projects: Array(),     //阶段
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.init()
  },
  init: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let now = Date.now() / 1000 | 0;
    let nowDay = util.formatUnixToDate(now);
    let nowTime = util.formatDateUnix(nowDay);
    let url = "https://xcx.envisioneer.cn/foreman/getToday";
    api.request(url)
      .then(function (res) {
        console.log(res);
        let {projects} = res;
        for(let i = 0; i < projects.length; i++){
          let {quota} = projects[i];
          for(let j = 0; j < quota.length; j++){
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
          let { material } = projects[i];
          for (let j = 0; j < material.length; j++) {
            let time = util.formatUnixToTime(material[j].time);
            projects[i].material[j].into = time;
          }
        }
        that.setData({
          projects: projects,
        })
        wx.hideLoading();
      })
    wx.setNavigationBarTitle({
      title: '今天待办事项'
    })

  },
  call: function(e){
    let {phone} = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  updateQuotaState: function (e) {
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./updateQuotaState?id=" + id);

  },
  updateMaterialState: function (e) {
    let { id } = e.currentTarget.dataset;
    api.navigateTo("./updateMaterialState?id=" + id);

  }
})