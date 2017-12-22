
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    info: null
  
  },
  onLoad: function () {
    api.request("https://xcx.envisioneer.cn/purchase/getUser")
      .then( res => {
        this.setData({
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
  },
  changePhone: function (e) {
    let { info } = this.data;
    info.phone = e.detail.value;
    this.setData({
      info: info,
    })
  },
  send: function(){
    let {realname, phone} = this.data.info; 
    let data = { realname, phone };
    if ( realname   && phone ){
      api.request("https://xcx.envisioneer.cn/purchase/updateUser",{realname, phone})
        .then( res => {
          if (res.success == 1){
            this.setData({
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