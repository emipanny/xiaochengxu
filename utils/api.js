
let app = getApp();
exports.getUserInfo = () => new Promise((resolve, reject) => {
  wx.login({
    success: res => {
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
    success: res => {
      if(res.statusCode == 200){
        if (res.data == 11001) {
          wx.setStorageSync('errorMsg', { errcode: 11001, errmsg: "参数错误" });
          wx.navigateTo({
            url: '../index/error'
          })
          reject;
        }
        else if (res.data == 11002) {
          wx.setStorageSync('errorMsg', { errcode: 11002, errmsg: "未知错误" });
          wx.navigateTo({
            url: '../index/error'
          })
          reject;
        }
        else if (res.data == 11003) {
          wx.setStorageSync('errorMsg', { errcode: 11003, errmsg: "登陆状态错误" });
          wx.redirectTo({
            url: '../index/index'
          })
          reject;
        }
        else resolve(res.data)
      }
      else {
        wx.setStorageSync('errorMsg', { errcode: 11001, errmsg: "网络错误" });
        wx.navigateTo({
          url: '../index/error'
        })
        reject;
      }
    },
    fail:  res => {
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
              success:  res => {
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
exports.chooseImage = () => new Promise((resolve, reject) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success:  res =>{
      let file = res.tempFilePaths[0];
      resolve(file)
    },
    fail: (res) => {
      reject;
    }
  })
})
exports.uploadFile = (url, data) => new Promise((resolve, reject) => {
  wx.showLoading({
    title: '上传中...',
  })
  let { id, img } = data;
  //判断图片格式
  let rename = img.split(".");
  let len = rename.length - 1;
  if (rename[len] != "jpg" && rename[len] != "jpeg" && rename[len] != "png" && rename[len] != "bmp" && rename[len] != "gif") {
    wx.hideLoading();
    wx.setStorageSync('errorMsg', { errcode: 11005, errmsg: "图片格式不正确，请上传jpg,bmp,png,gif格式的图片！" });
    wx.navigateTo({
      url: '../index/error'
    })
  }
  else{
    //上传图片
    let sessionID = wx.getStorageSync('sessionID');
    wx.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      filePath: img,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data',
        sessionID
      },
      formData: { id },
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          let mess = JSON.parse(res.data);
          if (mess.error) {
            wx.setStorageSync('errorMsg', { errcode: 11005, errmsg: "图片格式不正确或上传错误！" });
            wx.navigateTo({
              url: '../index/error'
            })
          }
          else {
            resolve(mess);
          }
        }
        else {
          wx.setStorageSync('errorMsg', { errcode: 11005, errmsg: "上传失败" });
          wx.navigateTo({
            url: '../index/error'
          })
        }
      }
    })
  }
})
exports.getSystemInfo = () => new Promise((resolve, reject) => {
  wx.getSystemInfo({
    success:  res => {
      resolve(res);
    },
    fail: err => {
      reject();
    }

  });
})

exports.navigateTo = (url) => {
  if (!app.globalData.isNavigateTo) {
    app.globalData.isNavigateTo = true;
    wx.navigateTo({
      url: url
    })
    setTimeout( () => {
      app.globalData.isNavigateTo = false;
    }, 1000)
  }
}
exports.navigateBack = (url) => {
 
  if (!app.globalData.isNavigateTo) {
    app.globalData.isNavigateTo = true;
    wx.navigateBack({
      delta: 2
    })
    setTimeout( () => {
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
    setTimeout( () => {
      app.globalData.isNavigateTo = false;
    }, 1000)
  }
}
exports.getLocation = () => new Promise((resolve, reject) => {
  wx.getLocation({
    type: 'wgs84',
    success:  res => {
      resolve(res);
    },
    fail:  err => {
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