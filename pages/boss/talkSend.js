

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
    let { id, user, choose, currentTab} = this.data;
    let formId = e.detail.formId;
    let value = e.detail.value.mes;
    if (currentTab == 0) {
      if (value) {
        wx.showLoading({
          mask: true,
          title: '上传中。。。',
        })
        let url = "https://xcx.envisioneer.cn/boss/sendTalkText";
        let data = { value, id, formId };
        api.request(url, data)
        .then( (res) => {
          if (res == 1) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    }
    else if (currentTab == 1) {
      let url = "https://xcx.envisioneer.cn/boss/sendTalkImg";
      let { id, img } = this.data;
      if (img) {
        api.uploadFile(url, { id, img })
        .then( (res) => {
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
    api.chooseImage()
      .then( (res) =>{
        this.setData({
          img: res
        })
      })
  },
  swichNav: function (e) {


    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})