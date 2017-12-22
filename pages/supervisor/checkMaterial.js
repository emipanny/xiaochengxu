
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    info: null,
    purchase: Array(),
  },

  onLoad: function (options) {
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/supervisor/checkMaterial";
    api.request(url, { id })
      .then( res => {
        let { material, purchase } = res;
        material.time = util.formatUnixToDT(material.time);
        this.setData({
          id: id,
          info: material,
          purchase: purchase,
        })
      })
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})