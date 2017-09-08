
let app = getApp();
exports.getUserInfo = () => new Promise((resolve, reject) => {
  wx.login({
    success: (res) => {
      //console.log(JSON.stringify(res.code));
      if (res.code) {
        let { code } = res;
        wx.getUserInfo({
          withCredentials: true,
          success: (res) => {
            let { encryptedData, iv, userInfo } = res;
            resolve({ code, encryptedData, iv, userInfo });
          },
          fail: reject
        })
      }
    },
    fail: reject
  })
})
exports.request = (url, data, option) => new Promise((resolve, reject) => {
  let sessionID = wx.getStorageSync('sessionID')
  wx.request({
    url: url,
    header: { sessionID },
    data: data,
    success: function (res) {
      if(res.statusCode == 200){
        if (res.data == 11001) {
          wx.setStorageSync('errorMsg', { errcode: 11001, errmsg: "参数错误" });
          wx.navigateTo({
            url: '../index/error'
          })
          reject();
        }
        else if (res.data == 11002) {
          wx.setStorageSync('errorMsg', { errcode: 11002, errmsg: "未知错误" });
          wx.navigateTo({
            url: '../index/error'
          })
          reject();
        }
        else if (res.data == 11003) {
          wx.setStorageSync('errorMsg', { errcode: 11003, errmsg: "登陆状态错误" });
          wx.redirectTo({
            url: '../index/index'
          })
          reject();
        }
        else resolve(res.data)
      }
      else {
        wx.setStorageSync('errorMsg', { errcode: 11001, errmsg: "网络错误" });
        wx.navigateTo({
          url: '../index/error'
        })
        reject();
      }
    },
    fail: function (res) {
      reject(res.data)
    }
  })
})
exports.checkLocation = () => new Promise((resolve, reject) => {

  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userLocation']) {
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            resolve();
          },
          fail() { //发现未授权，弹出警告，指引用户授权
            wx.showModal({
              title: '警告',
              content: '若不授权位置，将无法使用小程序的功能；点击授权按钮，则可重新获得授权并使用。',
              cancelText: "不授权",
              confirmText: "授权",
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      res.authSetting = {
                        "scope.userLocation": true
                      }
                      resolve();
                    }
                  })
                }
              }
            })

          }

        })
      }
      else {
        resolve();
      }
    }
  });
})
exports.getSystemInfo = () => new Promise((resolve, reject) => {
  wx.getSystemInfo({
    success: function (res) {
      resolve(res);
    },
    fail:function(err){
      reject();
    }

  });
})

exports.navigateTo = (url) => {
  console.log(app.globalData.isNavigateTo);
  if (!app.globalData.isNavigateTo) {
    app.globalData.isNavigateTo = true;
    wx.navigateTo({
      url: url
    })
    setTimeout(function () {
      app.globalData.isNavigateTo = false;
    }, 1000)
  }
}
exports.navigateBack = (url) => {
 
  console.log(app.globalData.isNavigateTo);
  if (!app.globalData.isNavigateTo) {
    app.globalData.isNavigateTo = true;
    wx.navigateBack({
      delta: 2
    })
    setTimeout(function () {
      app.globalData.isNavigateTo = false;
    }, 1000)
  }
}
exports.redirectTo = (url) => {
  console.log(app.globalData.isNavigateTo);
  if (!app.globalData.isNavigateTo) {
    app.globalData.isNavigateTo = true;
    wx.redirectTo({
      url: url
    })
    setTimeout(function () {
      app.globalData.isNavigateTo = false;
    }, 1000)
  }
}
exports.getLocation = () => new Promise((resolve, reject) => {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      resolve(res);
    },
    fail: function (err){
      reject();
    }
  })
})
exports.GetDistance = (lat1, lng1, lat2, lng2) =>{
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  //s = Math.round(s * 10000) / 10000; //输出为公里
  s = Math.round(s * 1000) ; //输出为米
  //s=s.toFixed(4);
  return s;
} 
function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}