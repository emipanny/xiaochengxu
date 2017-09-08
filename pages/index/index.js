var api = require('../../utils/api')
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
		userInfo: {},
    option: null
  },
  login: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        //判断用户信息是否授权
        if (!res['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.checkUser();
            },
            fail() { //发现未授权，弹出警告，指引用户授权
              wx.showModal({
                title: '警告',
                content: '若不授权登陆，将无法使用小程序的功能；点击授权按钮，则可重新获得授权并使用。',
                cancelText: "不授权",
                confirmText: "授权",
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {
                        console.log(res);
                        res.authSetting = {
                          "scope.userInfo": true
                        }
                        //授权成功后跳转
                        wx.redirectTo({
                          url: '../index/index'
                        })
                      }
                    })
                  }
                }
              })

            }
            
          })
        }
      }
    })
  },
  onLoad: function (option) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo){
      that.setData({
        userInfo: userInfo
      })
    })
    if (option.url) that.data.option = option.url
    wx.setNavigationBarTitle({
      title: '确认登陆'
    })
  },
  checkUser: function () {
    var that = this

    api.getUserInfo()
      .then((res) => {
        that.setData({
          userInfo: res.userInfo,
        })
        wx.request({
          url: 'https://xcx.envisioneer.cn/onLogin',
          data: {
            code: res.code,
            encryptedData: res.encryptedData,
            iv: res.iv,
          },
          success: function (res) {
            if (res.data.errcode) {
              wx.setStorageSync('errorMsg', res.data)
              api.redirectTo('../pages/index/error');
            }
            else {
              if (res.data.type_id == 0)
                api.redirectTo('../index/userType');
              else if (app.globalData.moveback) {
                console.log(app.globalData.moveback);
                let str = app.globalData.moveback;
                app.globalData.moveback = null;
                api.redirectTo(str);
              }
              else if (res.data.type_id == 1)
                api.redirectTo("../boss/index");
              else if (res.data.type_id == 2)
                api.redirectTo("../foreman/index");
              else if (res.data.type_id == 3)
                api.redirectTo("../supervisor/index");
              else if (res.data.type_id == 4)
                api.redirectTo("../designer/index");
              else if (res.data.type_id == 5)
                api.redirectTo("../customer/index");
              else if (res.data.type_id == 6)
                api.redirectTo("../purchase/index");
              wx.setStorageSync('sessionID', res.data.sessionID);

            }
          },
          fail: function (res) {
            console.log("fail",res.data);
          }
        })
      });
  }
})
