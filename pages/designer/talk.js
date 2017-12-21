// pages/foreman/talk.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const comment = require('../../utils/comment');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    content: Array(),
    aid: null,
    type_id: null,
    height: app.globalData.winHeight - 40,
    value: null,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.init();
    wx.setNavigationBarTitle({
      title: '留言板'
    })
  },
  onShow: function () {
    this.init();
  },
  init: function () {
    let id = this.data.id;
    let url = "https://xcx.envisioneer.cn/designer/getTalks";
    let data = { id: id };
    api.request(url, data)
      .then( (res) => {
        res.content.forEach( (item) => {
          item.created_at = util.formatUnixToDT(item.created_at);
        });

        comment.saveMessageCount(id, res.content.length);
        this.setData({
          content: res.content,
          aid: res.id,
          type_id: res.type_id,
          scrollTop: 0
        })

        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      })

    wx.setNavigationBarTitle({
      title: '留言板'
    })
  },
  showImg: function (e) {
    let img = e.currentTarget.dataset.url;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  sendMessage: function () {
    let {id, type_id} = this.data;
    api.navigateTo("./talkSend?id=" + id + "&type_id=" + type_id)
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.init();
  },

})