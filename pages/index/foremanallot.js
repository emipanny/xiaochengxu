const util = require('../../utils/util');
const api = require('../../utils/api');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: "",
    userType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = "30";
    let data = { id };
    let url = "https://xcx.envisioneer.cn/getProject";
    app.globalData.moveback = "../index/foremanallot?id=" + id;
    api.request(url, data)
      .then(function (res) {
        console.log(res);
        that.setData({
          id: id,
          title: res.title,
          userType: res.type_id,
        })
      })

  },
  getPerson: function (e) {

  },
  addProject: function () {
    let that = this;
    let id = this.data.id;
    let url = "https://xcx.envisioneer.cn/purchase/addProject"
    let data = { id };
    api.request(url, data)
      .then(function (res) {
        if (res == 1) {
          wx.showModal({
            title: '添加成功',
            confirmText: "确定",
          })
        }
      })
  }

})