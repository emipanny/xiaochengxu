
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    info: null,
    users: Array(),
  },

  onLoad: function (options) {
    let id = options.id;
    let url = "https://xcx.envisioneer.cn/boss/checkMaterial";
    api.request(url, { id })
      .then(res => {
        let { material, users } = res;
        material.time = util.formatUnixToDT(material.time);
        if (material.arrive) material.arrive = util.formatUnixToDT(material.arrive);
        this.setData({
          id: id,
          info: material,
          users: users,
        })
      })
  },

})