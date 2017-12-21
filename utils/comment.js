
let app = getApp();
exports.saveMessageCount = (id, count) => {
  try {
    let message = wx.getStorageSync('MessageCount')
    if (message) {
      let isHave = false;
      for (let i = 0; i < message.length; i++) {
        if (message[i].id == id) {
          message[i].count = count;
          isHave = true;
          break;
        }
      }
      if(!isHave){
        let len = message.length;
        message[len] = {id, count};
      }
      wx.setStorage({
        key: "MessageCount",
        data: message
      })
    }
    else {
      wx.setStorage({
        key: "MessageCount",
        data: Array()
      })
    }
  } catch (e) {
    console.log(e)
  }
}
exports.compareMessageCount = (id, count) => {
  try {
    let message = wx.getStorageSync("MessageCount");
    let compare = 0;
    if (message) {
      let isHave = false;
      for (let i = 0; i < message.length; i++) {
        if (message[i].id == id) {
          compare = count - message[i].count;
          if(compare < 0) compare = 0;
          isHave = true;
          break;
        }
      }
      if (!isHave) {
        compare = count;
      }
    }
    else {
      compare = count;
    }
    return compare;
  } catch (e) {
    console.log(e)
  }
}
exports.allMessageCount = () => {
  try {
    let message = wx.getStorageSync("MessageCount");
    let all = 0;
    if (message) {
      let isHave = false;
      message.forEach( (item) => {
        all += item.count || 0;
      })
    }
    return all;
  } catch (e) {
    console.log(e)
  }
}