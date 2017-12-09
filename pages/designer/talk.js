// pages/foreman/talk.js
const util = require('../../utils/util');
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    content: Array(),
    aid: null,
    height: 50,
    value: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.init();
  },
  init: function () {
    let that = this;
    let id = that.data.id;
    let url = "https://xcx.envisioneer.cn/designer/getTalks";
    let data = { id: id };
    api.request(url, data)
      .then(function (res) {
        res.content.forEach(function (item) {
          item.created_at = util.formatUnixToDT(item.created_at);
        });

        that.setData({
          content: res.content,
          aid: res.id,
        })

        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      })

    wx.setNavigationBarTitle({
      title: '留言板'
    })
  },
  changeLine: function (e) {
    let line = e.detail.lineCount;
    this.setData({
      height: 28 * line + 20
    })

  },
  changeInput: function (e) {
    let value = e.detail.value;
    this.data.value = value;
  },
  send: function () {
    let that = this;
    let { value, id } = that.data;
    if (value) {
      let url = "https://xcx.envisioneer.cn/designer/sendTalkText";
      let data = { value, id };
      api.request(url, data)
        .then(function (res) {
          if (res == 1) {
            that.setData({
              value: null
            })
            that.init();
          }
        })
    }

  },
  upImg: function () {
    let url = "https://xcx.envisioneer.cn/designer/sendTalkImg";
    let that = this;
    let { id } = that.data;
    api.chooseImage(url, { id })
      .then(function (res) {
        if (res.statusCode == 200) {
          that.init();
        }
      })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.init();
  },
  showImg: function (e) {
    let img = e.currentTarget.dataset.url;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  }

})