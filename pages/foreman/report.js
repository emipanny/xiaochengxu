// pages/boss/checkProject.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    stage: Array(),     //阶段
    quota: Array(),     //阶段定额
    build: Array(),     //建筑辅料
    soft: Array(),      //家居软装
    material: Array(),  //装修主材
    winWidth: 0,
    winHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
  },
  onShow: function () {
    let id = this.data.id;
    this.init(id);
  },
  init: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let build, soft, material, list;
    app.globalData.url = "../foreman/report?id=" + id;
    let url = "https://xcx.envisioneer.cn/foreman/getProjectStage";
    let data = { id };
    let winWidth = 0, winHeight = 0;
    api.getSystemInfo()
      .then(function (res) {
        winWidth = res.windowWidth;
        winHeight = res.windowHeight;
        return api.request(url, data)
      })
      .then(function (res) {
        let { stage, goods, quota, mate } = res;

        let data = Array();
        let num = 0;
        //定义四个数组，分别存储定额辅料软装主材
        for (let j = 0; j < 4; j++) {
          data[j] = Array();
          for (let o = 0; o < stage.length; o++) {
            data[j][o] = {};
            data[j][o].id = stage[o].id;
            data[j][o].title = stage[o].title;
            data[j][o].data = Array();
          }
        }
        for (let i = 0; i < goods.length; i++) {
          if (goods[i].type != "人工") { }
          let key;
          if (goods[i].type == "施工定额") key = 0;
          else if (goods[i].type == "建筑辅料") key = 1;
          else if (goods[i].type == "家居软装") key = 2;
          else if (goods[i].type == "装修主材") key = 3;
          if (key > -1) {
            //产品分配到4个数组中的一个，并根据阶段存储，重复的项数量合并
            for (let n = 0; n < data[key].length; n++) {
              if (goods[i].part == data[key][n].title) {
                let isHave = false;
                let isSave = false;
                let len = data[key][n].data.length;
                for (let k in data[key][n].data) {
                  if (goods[i].goodsNo == data[key][n].data[k].goodsNo) {
                    isHave = true;
                  }
                }
                //判断是否已经提交保存，定额保存后提示标记，非定额不保存改goods
                if (key == 0) {
                  for (let q in quota) {
                    if (goods[i].goodsNo == quota[q].goodsNo) {
                      isSave = true;
                      var neworder = quota[q].order_number;
                      break;
                    }
                  }
                }
                else if (key == 1 || key == 2 || key == 3) {
                  for (let q in mate) {
                    if (goods[i].goodsNo == mate[q].goodsNo) {
                      isSave = true;
                      break;
                    }
                  }
                }
                if (!isHave) {
                  if(isSave){
                    if (key == 0) {
                      data[key][n].data[len] = goods[i];
                      data[key][n].data[len].order = neworder;
                      data[key][n].data[len].isSave = true;
                    }
                  }
                  else if(!isSave){
                    data[key][n].data[len] = goods[i];
                    data[key][n].data[len].order = len + 1;
                  }
                }
                else {
                  let tot = Number(data[key][n].data[k].num) + Number(goods[i].num);
                  data[key][n].data[k].num = tot.toFixed(2);
                }
              }
            }
          }
        }
        for (let i = 0; i < data[0].length; i++){
          let arr = data[0][i].data;
          arr.sort(util.compare("order"));
        }
        let isOver = false;
        for(let i = 0; i < data[0].length; i++){
          for(let j = 0; j < data[0][i].data.length; j++){
            if (data[0][i].data[j].isSave){
              isOver = true;
            }
            if(!data[0][i].data[j].isSave) {
              isOver = false;
              break;
            }
          }
        }
        if (isOver) {
          api.request("https://xcx.envisioneer.cn/foreman/changeProjectState",{id})
            .then(function(res){
              if(res == 1){
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '该项目已经编辑完成，点击确定返回项目信息',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
            })
        }
        else {
          that.setData({
            id: id,
            stage: data[0],
            build: data[1],
            soft: data[2],
            material: data[3],
            winWidth: winWidth,
            winHeight: winHeight,
          })
          wx.hideLoading()
        }

      })
    wx.setNavigationBarTitle({
      title: '产品详情'
    })

  },
  act: function (e) {
    let that = this
    let {data,stage} = e.currentTarget.dataset;
    let { material, build, soft } = that.data;
    let material2, build2, soft2;
    for (let key in material) {
      if (stage == material[key].title) {
        app.globalData.tempmaterial = material[key].data;
        break;
      }
    }
    for (let key in build) {
      if (stage == build[key].title) {
        app.globalData.tempbuild = build[key].data;
        break;
      }
    }
    for (let key in soft) {
      if (stage == soft[key].title) {
        app.globalData.tempsoft = soft[key].data;
        break;
      }
    }
    app.globalData.tempdata = data;
    console.log(111);
    api.navigateTo("./edit?id=" + that.data.id);


  },
  order: function (order, stage) {},
  editCancl: function () {
    this.setData({
      editShow: false,
      edit: {
        order: 0,
        material: null,
        startTime: null,
        endTime: null,
        user: null
      }
    })

  },
  materialShow: function () {
    this.setData({
      edit: {
        materialShow: true,
      }
    })
  },
  noAct: function(){
    wx.showModal({
      title: '提示',
      content: '您已经提交过该项，如果需要修改，请到查看项目里修改',
      showCancel: false,
    })
  }
})