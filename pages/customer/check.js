// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quota: Array(),
    material: Array(),
    project: null,
    id: 0,
    time: 0,
    projectStart: "",
    projectEnd: "",
    date: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let {id, time} = option;
    this.init(id, time);
  },
  init: function (id, time) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let url = "https://xcx.envisioneer.cn/customer/check";
    api.request(url, { id, time })
      .then(function (res) {
        let { project, quota, material} = res;
        for (let j = 0; j < quota.length; j++) {
          let all = (Number(quota[j].end_time) - Number(quota[j].start_time)) / 86400;
          let num = Math.ceil((time - Number(quota[j].start_time)) / 86400) + 1;
          quota[j].all = all;
          quota[j].now = num;
          if (quota[j].supervisor_start >= time && quota[j].supervisor_start < time + 86400) {
            quota[j].supervisor_nowStart = util.formatUnixToTime(quota[j].supervisor_start);
          }
          if (quota[j].supervisor_end >= time && quota[j].supervisor_end < time + 86400) {
            quota[j].supervisor_nowEnd = util.formatUnixToTime(quota[j].supervisor_end);
          }
          if (quota[j].designer_start >= time && quota[j].designer_start < time + 86400) {
            quota[j].designer_nowStart = util.formatUnixToTime(quota[j].designer_start);
          }
          if (quota[j].designer_end >= time && quota[j].designer_end < time + 86400) {
            quota[j].designer_nowEnd = util.formatUnixToTime(quota[j].designer_end);
          }
        }
        for (let j = 0; j < material.length; j++) {
          let timeA = util.formatUnixToTime(material[j].time);
          material[j].into = timeA;
        }
        that.setData({
          id: id,
          time: time,
          quota: quota,
          material: material,
          date: util.formatUnixToDate(time),
          project: project[0],
          projectStart: util.formatUnixToDate(project[0].startTime),
          projectEnd: util.formatUnixToDate(project[0].endTime),
        })
        wx.hideLoading();
      })
    wx.setNavigationBarTitle({
      title: util.formatUnixToDate(time)
    })

  },
  prev: function () {
    let {id, time, project} = this.data;
    time = time - 86400;
    if(time < project.startTime){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '该日期项目还未开始',
      })
    }
    else api.redirectTo("./check?id=" + id + "&time=" + time);
  },
  next: function () {
    let { id, time, project } = this.data;
    time = Number(time) + 86400;
    if (time > project.endTime) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '该日期项目已结束',
      })
    }
    else api.redirectTo("./check?id=" + id + "&time=" + time);
  },
  dateChange: function (e) {
    let { id, time, project } = this.data;
    let date = e.detail.value;
    time = util.formatDateUnix(date);
    if (time > Number(project.endTime) || time < Number(project.startTime)) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '超出项目日期',
      })
    }
    else api.redirectTo("./check?id=" + id + "&time=" + time);
  },
})