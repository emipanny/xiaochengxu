const util = require('../../utils/util');
const api = require('../../utils/api');

const app = getApp();
Page({

  data: {
    id: 0,
    title: "",
    userType: 0
  },

  onLoad: function (options) {
    let id = options.id;
    let data = { id };
    let url = "https://xcx.envisioneer.cn/getProject";
    app.globalData.moveback = "../index/foremanallot?id=" + id;
    api.request(url, data)
      .then( res => {
        this.setData({
          id: id,
          title: res.title,
          userType: res.type_id,
        })
      })

  },
  getPerson: function (e) {

  },
  addProject: function () {
    let id = this.data.id;
    let url = "https://xcx.envisioneer.cn/purchase/addProject"
    let data = { id };
    api.request(url, data)
      .then( res => {
        if (res == 1) {
          wx.showModal({
            title: '添加成功',
            confirmText: "确定",
          })
        }
      })
  }

})