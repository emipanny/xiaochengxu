var api = require('../../utils/api')
var app = getApp()
Page({
  data: {
		userInfo: {},
    option: null
  },
  login: function () {
    
    wx.getSetting({
      success: res => {
        //判断用户信息是否授权
        if (!res['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              this.checkUser();
            },
            fail() { //发现未授权，弹出警告，指引用户授权
              wx.showModal({
                title: '警告',
                content: '若不授权登陆，将无法使用小程序的功能；点击授权按钮，则可重新获得授权并使用。',
                cancelText: "不授权",
                confirmText: "授权",
                success:  res => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: res => {
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo( userInfo =>{
      this.setData({
        userInfo: userInfo
      })
    })
    if (option.url) this.data.option = option.url
    wx.setNavigationBarTitle({
      title: 'BIM钉项目经理版'
    })
  },
  checkUser: function () {
    api.getUserInfo()
      .then( res => {
        this.setData({
          userInfo: res.userInfo,
        })
        wx.request({
          url: 'https://xcx.envisioneer.cn/onLogin',
          data: {
            code: res.code,
            encryptedData: res.encryptedData,
            iv: res.iv,
            type_id: 1
          },
          success: res => {
            if (res.data.errcode) {
              wx.setStorageSync('errorMsg', res.data)
              api.redirectTo('../pages/index/error');
            }
            else {
              if (app.globalData.moveback) {
                let str = app.globalData.moveback;
                app.globalData.moveback = null;
                api.redirectTo(str);
              }
              else {
                wx.setStorage({
                  key: "userType",
                  data: "boss"
                })
                api.redirectTo("../boss/index");

              }
              wx.setStorageSync('sessionID', res.data.sessionID);

            }
          },
          fail:  res => {
            console.log("fail",res.data);
          }
        })
      });
  }
})
