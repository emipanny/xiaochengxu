// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    api.request("https://xcx.envisioneer.cn/purchase/getUser")
      .then(function(res){
        console.log(res);
        that.setData({
          info: res
        })
      })
  },
  changeName: function (e) {
    let { info } = this.data;
    info.realname = e.detail.value;
    this.setData({
      info: info,
    })
    console.log(this.data)
  },
  changePhone: function (e) {
    let { info } = this.data;
    info.phone = e.detail.value;
    this.setData({
      info: info,
    })
  },
  send: function(){
    let that = this;
    let {realname, phone} = this.data.info; 
    let data = { realname, phone };
    if ( realname   && phone ){
      api.request("https://xcx.envisioneer.cn/purchase/updateUser",{realname, phone})
        .then(function(res){
          if (res.success == 1){
            that.setData({
              info: data,
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          }

        })
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您还有未填写的内容',
      })
    }
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

})