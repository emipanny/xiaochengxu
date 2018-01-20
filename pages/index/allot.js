const util = require('../../utils/util');
const api = require('../../utils/api');

const app = getApp();
Page({

  data: {
    id: 0,
    title: "",
    userType:0
  },

  onLoad: function (options) {
    let id = options.id;
    let data = {id};
    let url = "https://xcx.envisioneer.cn/getProject";
    api.request(url, data)
      .then( res => {
        this.setData({
          id: id,
          title: res.title,
          userType: res.type_id,
        })
      })
  
  },
  back: function(){
    let userType = wx.getStorageSync('userType');
    api.reLaunch("../" + userType + "/index");

  },
  showImg: function (e) {
    let img = e.currentTarget.dataset.url;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

})