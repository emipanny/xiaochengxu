const util = require('../../utils/util');
const api = require('../../utils/api');
// pages/boss/addBySecStep.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "",
    header: {
      first_class: "#35b3ca",
      first_text_class: "#35b3ca",
      second_class: "#35b3ca",
      second_text_class: "#35b3ca",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getqrcode: function () {
    let that = this;
    wx.scanCode({
      success: (res) => {
        if (!res.result){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '扫描二维码发生错误',
            success: function (res) {
            }
          })
        }
        else {
          let url = res.result;
          api.request(url,{})
            .then(function(res){
              if(res.qrcode) {
                that.setData({
                  text: res.qrcode
                })
              }
            })
        }
        
      }
    })

  },
  nextStep: function () {
    let that = this;
    let qrcode = that.data.text;
    if (!qrcode) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您还未扫描二维码获取项目ID',
        success: function (res) {
        }
      })
    }
    else {
      let info = wx.getStorageSync('createProject');
      let { title, schedule, amount, name, address, latitude, longitude, detailed_address, content, date, distance } = info;
      if (!title || !schedule || !amount || !name || !address || !latitude || !longitude || !detailed_address || !date || !distance) {
        
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '您还有项目没有填写,请返回填写',
          success: function (res) {
          }
        })
      }
      else {
        let url = "https://xcx.envisioneer.cn/boss/createProject";
        date = util.formatDateUnix(date);
        let data = { title, schedule, amount, name, address, latitude, longitude, detailed_address, content, date, qrcode, distance};
        api.request(url, data)
          .then(function (res) {
            wx.redirectTo({
              url: './addByThiStep?projectID='+res.id
            })
          })
      }

    }
  }

})