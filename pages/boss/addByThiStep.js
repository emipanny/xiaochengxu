
Page({

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

  onLoad: function (options) {
    this.data.projectID = options.projectID
  },
  allot: function () {
    wx.removeStorageSync('createProject'); 
    console.log(this.data.projectID)
    wx.redirectTo({
      url: '../index/allot?id=' + this.data.projectID
    })
  }

})