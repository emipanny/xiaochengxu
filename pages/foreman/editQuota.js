// pages/foreman/checkQuota.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    info: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    api.request("https://xcx.envisioneer.cn/foreman/checkQuotaEdit", { id })
      .then(function(res){
        console.log(res);
        if(res == 22001){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '正在进行中的项目不能直接更改，请到进度管理里提交更改',
          })
        }
        else {
          return api.request("https://xcx.envisioneer.cn/foreman/checkQuota", { id })
        }
      })
      .then(function (res) {
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time - 86400);
        res.supervisor_start = util.formatUnixToDT(res.supervisor_start);
        res.supervisor_end = util.formatUnixToDT(res.supervisor_end);
        res.designer_start = util.formatUnixToDT(res.designer_start);
        res.designer_end = util.formatUnixToDT(res.designer_end);
        that.setData({
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
  send: function () {
    let id = this.data.id;
    api.request("https://xcx.envisioneer.cn/foreman/EditQuota", { id })
      .then(function(res){
        
      })

  },
})