// pages/foreman/updateQuotaState.js
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
    let {id} = options;
    let that = this;
    api.request("https://xcx.envisioneer.cn/foreman/checkQuota",{id})
      .then(function (res) {
        console.log(res);
        res.start_time = util.formatUnixToDate(res.start_time);
        res.end_time = util.formatUnixToDate(res.end_time);
        res.supervisor_start = util.formatUnixToDT(res.supervisor_start);
        if (res.supervisor_start_finish) res.supervisor_start_finish = util.formatUnixToDT(res.supervisor_start_finish);
        res.supervisor_end = util.formatUnixToDT(res.supervisor_end);
        if (res.supervisor_end_finish) res.supervisor_end_finish = util.formatUnixToDT(res.supervisor_end_finish);
        res.designer_start = util.formatUnixToDT(res.designer_start);
        if (res.designer_start_finish) res.designer_start_finish = util.formatUnixToDT(res.designer_start_finish);
        res.designer_end = util.formatUnixToDT(res.designer_end);
        if (res.designer_end_finish) res.designer_end_finish = util.formatUnixToDT(res.designer_end_finish);
        that.setData({
          id: id,
          info: res
        })
      })
  },
  send: function(){
    let {id, info} = this.data;
    if (info.supervisor_start_finish && info.supervisor_end_finish && info.designer_start_finish && info.designer_end_finish ){
      api.request("https://xcx.envisioneer.cn/foreman/updateQuotaState", {id}).
        then(function(res){
          if(res == 1){
            wx.navigateBack({
              delta: 1
            })
          }
        })
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '还有未完成的工作，请等待完成后再更改状态',
      })
    }

  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  }

})