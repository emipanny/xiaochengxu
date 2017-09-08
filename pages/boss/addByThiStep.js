// pages/boss/addByThiStep.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectID:0,
    header: {
      first_class: "#35b3ca",
      first_text_class: "#35b3ca",
      second_class: "#35b3ca",
      second_text_class: "#35b3ca",
      third_class: "#35b3ca",
      third_text_class: "#35b3ca",
    },
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.data.projectID = options.projectID
  },
  allot: function () {
    let that = this 
    wx.removeStorageSync('createProject'); 
    console.log(that.data.projectID)
    wx.redirectTo({
      url: '../index/allot?id=' + that.data.projectID
    })
  }

})