

const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  data: {
    id : null,
    type_id : null,
    choose: 0,
    currentTab: 0,
    img: null
  
  },

  onLoad: function (options) {
    let {id ,type_id} = options;
    this.setData({
      id : id,
      type_id : type_id
    });
    wx.setNavigationBarTitle({
      title: '发表留言'
    })
  },
  bindPickerChange: function (e){
    this.setData({
      choose: e.detail.value
    })
  },


  send: function (e) {
    let that = this;
    let { id, user, choose, currentTab} = that.data;
    let formId = e.detail.formId;
    let value = e.detail.value.mes;
    if (currentTab == 0) {
      if (value) {
        wx.showLoading({
          mask: true,
          title: '上传中。。。',
        })
        let url = "https://xcx.envisioneer.cn/designer/sendTalkText";
        let data = { value, id, formId };
        api.request(url, data)
        .then(function (res) {
          if (res == 1) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    }
    else if (currentTab == 1) {
      let url = "https://xcx.envisioneer.cn/designer/sendTalkImg";
      let that = this;
      let { id, img } = that.data;
      if (img) {
        wx.showLoading({
          mask: true,
          title: '上传中。。。',
        })
        api.uploadFile(url, { id, img })
        .then(function (res) {
          if (res.success == "1") {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    }
  },
  upImg: function () {
    let that = this;
    api.chooseImage()
      .then(function (res) {
        that.setData({
          img: res
        })
      })
  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})