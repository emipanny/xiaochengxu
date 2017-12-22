const util = require('../../utils/util');
const api = require('../../utils/api');

const app = getApp();
Page({

  data: {
    id: 0,
    title: "",
    userType:0
  },

  onLoad: function (options) {
    let id = options.id;
    let data = {id};
    let url = "https://xcx.envisioneer.cn/getProject";
    app.globalData.moveback = "../index/allot?id="+id;
    api.request(url, data)
      .then( res => {
        this.setData({
          id: id,
          title: res.title,
          userType: res.type_id,
        })
      })
  
  },
  getPerson: function(e){
    
  },
  addProject: function(){
    let id = this.data.id;
    let url = "https://xcx.envisioneer.cn/addProject"
    let data = {id};
    api.request(url, data)
      .then( res => {
        if(res == 1){
          wx.showModal({
            title: '添加成功',
            content: '请等待项目经理审核',
            confirmText: "确定",
            success:  res => {
              if (res.confirm) {
                let url;
                if (this.data.userType == 1)
                  api.redirectTo("../boss/index");
                else if (this.data.userType == 2)
                  api.redirectTo("../foreman/index");
                else if (this.data.userType == 3)
                  api.redirectTo("../supervisor/index");
                else if (this.data.userType == 4)
                  api.redirectTo("../designer/index");
                else if (this.data.userType == 5)
                  api.redirectTo("../customer/index");
                else if (this.data.userType == 6)
                  api.redirectTo("../purchase/index");
              }
            }
          })
        }
      })
  }

})