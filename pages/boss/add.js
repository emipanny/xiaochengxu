const util = require('../../utils/util'); 
const api = require('../../utils/api');
// pages/boss/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatDate(new Date),
    title: "",
    schedule: "",
    amount: 0,
    name:"",
    address: "",
    latitude: 0,
    longitude: 0,
    distance: 0,
    detailed_address: "",
    content: "",
    header: {
      first_class: "#35b3ca",
      first_text_class: "#35b3ca",
    },
  },
  inputchange:function(e){
    let key = e.target.id;
    if (key == "title") this.data.title = e.detail.value;
    if (key == "schedule") this.data.schedule = e.detail.value;
    if (key == "amount") this.data.amount = e.detail.value;
    if (key == "address") this.data.address = e.detail.value;
    if (key == "content") this.data.content = e.detail.value;
    if (key == "distance") this.data.distance = e.detail.value;
    if (key == "detailed_address") this.data.detailed_address = e.detail.value;

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '创建项目'
    })
  },
  nextStep: function () {
    let that = this;
    let { title, schedule, amount, name, address, latitude, longitude, detailed_address, content, date, distance } = that.data;
    console.log(that.data);
    if (!title || !schedule || !amount || !name || !address || !latitude || !longitude || !detailed_address || !date || !distance){

      console.log(title);
      console.log(schedule);
      console.log(amount);
      console.log(name);
      console.log(address);
      console.log(latitude);
      console.log(longitude);
      console.log(detailed_address);
      console.log(date);
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您还有项目没有填写',
        success: function (res) {
        }
      })
    }
    else {
      let createProject = { title, schedule, amount, name, address, latitude, longitude, detailed_address, content, date, distance };
      wx.setStorageSync('createProject', createProject);
      wx.navigateTo({
        url: './addBySecStep'
      })

    }
  },
  getPosition: function (e) {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    api.checkLocation()
      .then(function () {
        wx.chooseLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            console.log(res)
            that.setData({
              name: res.name,
              address: res.address,
              latitude: res.latitude,
              longitude: res.longitude,
            })
          },
          fail: function (res) {
            console.log("222", res);
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '您未选择地址，请重新选择地址',
              success: function (res) {
              }
            })
          },
          complete: function(){
            wx.hideLoading()
          }

        })
      })
  }

})