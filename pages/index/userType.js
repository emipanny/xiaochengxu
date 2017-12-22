var api = require('../../utils/api')
const app = getApp();
Page({

  data: {
    source: null
  },

  onLoad: function (options) {
    if (options.url != "null") {
      this.data.source = options.url
    }
    wx.setNavigationBarTitle({
      title: '选择身份'
    })
  },
  chooseType: function(event){
    let type_id = event.currentTarget.dataset.userType;
    let userTypeText = "";
    if (type_id == 1) userTypeText = "项目经理"
    if (type_id == 2) userTypeText = "工长"
    if (type_id == 3) userTypeText = "监理"
    if (type_id == 4) userTypeText = "设计"
    if (type_id == 5) userTypeText = "业主"
    if (type_id == 6) userTypeText = "材料员"
    wx.showModal({
      title: '警告',
      content: '身份更改后将不能更改！您确定要选择“' + userTypeText +'”吗？',
      cancelText: "取消",
      confirmText: "确定",
      success:  res => {
        if (res.confirm) {
          api.request("https://xcx.envisioneer.cn/sendUserType", { type_id})
            .then( res => {
              if (type_id == 0)
                wx.navigateTo({
                  url: '../index/userType'
                })
              else if (app.globalData.moveback) {
                let str = app.globalData.moveback;
                app.globalData.moveback = null;
                api.redirectTo(str);
              }
              else if (type_id == 1)
                wx.navigateTo({
                  url: '../boss/index'
                })
              else if (type_id == 2)
                wx.navigateTo({
                  url: '../foreman/index'
                })
              else if (type_id == 3)
                wx.navigateTo({
                  url: '../supervisor/index'
                })
              else if (type_id == 4)
                wx.navigateTo({
                  url: '../designer/index'
                })
              else if (type_id == 5)
                wx.navigateTo({
                  url: '../customer/index'
                })
              else if (type_id == 6)
                wx.navigateTo({
                  url: '../purchase/index'
                })

            });
        }
      }
    })
  }
})