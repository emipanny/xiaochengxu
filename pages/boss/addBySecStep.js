const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  data: {
    text: "",
    type_id: 0,
    header: {
      first_class: "#35b3ca",
      first_text_class: "#35b3ca",
      second_class: "#35b3ca",
      second_text_class: "#35b3ca",
    },
  },

  onLoad: function (options) {
  
  },
  getqrcode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        if (!res.result){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '扫描二维码发生错误',
            success:  (res) => {
            }
          })
        }
        else {
          let url = res.result;
          api.request(url,{})
            .then( (res) => {
              console.log(res);
              if(res.qrcode) {
                this.setData({
                  text: res.qrcode,
                  type_id: res.type_id
                })
              }
            })
        }
        
      }
    })

  },
  nextStep: function () {
    let qrcode = this.data.text;
    let {type_id} = this.data;
    if (!qrcode) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您还未扫描二维码获取项目ID',
        success:  (res) => {
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
          success:  (res) => {
          }
        })
      }
      else {
        let url = "https://xcx.envisioneer.cn/boss/createProject";
        date = util.formatDateUnix(date);
        let data = { title, schedule, amount, name, address, latitude, longitude, detailed_address, content, date, qrcode, distance, type_id};
        api.request(url, data)
          .then( (res) => {
            wx.redirectTo({
              url: './addByThiStep?projectID='+res.id
            })
          })
      }

    }
  }

})