
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  data: {
    id: 0,
    info: null,
    editShow: true,
    material: Array(),
    materialShow: false,
    materialSure: Array(),
    materialChoose: Array(),
    build: Array(),
    buildShow: false,
    buildSure: Array(),
    buildChoose: Array(),
    soft: Array(),
    softShow: false,
    softSure: Array(),
    softChoose: Array(),
    startDate: null,
    endDate: null,
    user: null,
    userShow: false,
    userChoose: Array(),
    userSign: {
      classname:null,
      goodsNo:null
    },
    winHeight: app.globalData.winHeight,
  },

  onLoad: function (e) {
    let that = this;
    let data = app.globalData.tempdata;
    let material = app.globalData.tempmaterial;
    let build = app.globalData.tempbuild;
    let soft = app.globalData.tempsoft;
    app.globalData.tempdata = null;
    app.globalData.tempmaterial = null;
    app.globalData.tempbuild = null;
    app.globalData.tempsoft = null;
    let id = e.id;

    api.request("https://xcx.envisioneer.cn/foreman/getUsers",{id})
      .then( res => {
        this.setData({
          info: data,
          material: material,
          build: build,
          soft: soft,
          user: res.users,
          id: id
        })
      })
    wx.setNavigationBarTitle({
      title: '定额报备'
    })
  
  },
  orderChange: function (e) {
    let info = this.data.info;
    info.order = e.detail.value;
    this.setData({
      info: info
    })

  },
  materialShow: function () {
    if (this.data.material.length){
      this.setData({
        materialShow: true,
        editShow: false
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '该定额下没有可选择的装修主材',
        showCancel: false,
      })
    }

  },
  buildShow: function () {
    if (this.data.build.length) {
      this.setData({
        buildShow: true,
        editShow: false
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '该定额下没有可选择的建筑辅料',
        showCancel: false,
      })
    }
  },
  softShow: function () {
    if (this.data.soft.length) {
      this.setData({
        softShow: true,
        editShow: false
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '该定额下没有可选择的家居软装',
        showCancel: false,
      })
    }
  },
  editCancl: function () {
    this.setData({
      editShow: true,
      materialShow: false,
      buildShow: false,
      softShow: false,
      userShow: false,
    })

  },
  back: function(){
    api.navigateBack();
  },
  materialcheckboxChange: function (e) {
    this.data.materialChoose = e.detail.value;
  },
  buildcheckboxChange: function (e) {
    this.data.buildChoose = e.detail.value;
  },
  softcheckboxChange: function (e) {
    this.data.softChoose = e.detail.value;
  },
  materialSure: function () {
    let { materialChoose, material } = this.data;
    let materialSure = Array();
    for (let i = 0; i < materialChoose.length; i++) {
      for (let j = 0; j < material.length; j++) {
        if (material[j].goodsNo == materialChoose[i]) {
          materialSure[materialSure.length] = material[j];
        }
      }
    }
    this.setData({
      materialSure: materialSure,
      editShow: true,
      materialShow: false,
      buildShow: false,
      softShow: false,
    })
  },
  buildSure: function () {
    let { buildChoose, build } = this.data;
    let buildSure = Array();
    for (let i = 0; i < buildChoose.length; i++) {
      for (let j = 0; j < build.length; j++) {
        if (build[j].goodsNo == buildChoose[i]) {
          buildSure[buildSure.length] = build[j];
        }
      }
    }
    this.setData({
      buildSure: buildSure,
      editShow: true,
      materialShow: false,
      buildShow: false,
      softShow: false,
    })
  },
  softSure: function () {
    let { softChoose, soft } = this.data;
    let softSure = Array();
    for (let i = 0; i < softChoose.length; i++) {
      for (let j = 0; j < soft.length; j++) {
        if (soft[j].goodsNo == softChoose[i]) {
          softSure[softSure.length] = soft[j];
        }
      }
    }
    this.setData({
      softSure: softSure,
      editShow: true,
      materialShow: false,
      buildShow: false,
      softShow: false,
    })
  },
  materialbindDateChange: function(e){
    let goodsNo = e.currentTarget.dataset.id;
    let date = e.detail.value;
    let { materialSure } = this.data;
    for (let key in materialSure) {
      if (materialSure[key].goodsNo == goodsNo) {
        materialSure[key].date = date;
        break;
      }
    }
    this.setData({
      materialSure: materialSure,
    })
  },
  materialbindTimeChange: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let time = e.detail.value;
    let { materialSure } = this.data;
    for (let key in materialSure) {
      if (materialSure[key].goodsNo == goodsNo) {
        materialSure[key].time = time;
        break;
      }
    }
    this.setData({
      materialSure: materialSure,
    })
  },

  buildbindDateChange: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let date = e.detail.value;
    let { buildSure } = this.data;
    for (let key in buildSure) {
      if (buildSure[key].goodsNo == goodsNo) {
        buildSure[key].date = date;
        break;
      }
    }
    this.setData({
      buildSure: buildSure,
    })
  },
  buildbindTimeChange: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let time = e.detail.value;
    let { buildSure } = this.data;
    for (let key in buildSure) {
      if (buildSure[key].goodsNo == goodsNo) {
        buildSure[key].time = time;
        break;
      }
    }
    this.setData({
      buildSure: buildSure,
    })
  },

  softbindDateChange: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let date = e.detail.value;
    let { softSure } = this.data;
    for (let key in softSure) {
      if (softSure[key].goodsNo == goodsNo) {
        softSure[key].date = date;
        break;
      }
    }
    this.setData({
      softSure: softSure,
    })
  },
  softbindTimeChange: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let time = e.detail.value;
    let { softSure } = this.data;
    for (let key in softSure) {
      if (softSure[key].goodsNo == goodsNo) {
        softSure[key].time = time;
        break;
      }
    }
    this.setData({
      softSure: softSure,
    })
  },
  startDate: function (e) {
    let date = e.detail.value;
    this.setData({
      startDate: date,
    })
  },
  endDate: function (e) {
    let date = e.detail.value;
    this.setData({
      endDate: date,
    })
  },
  designer_start_date: function (e) {
    let date = e.detail.value;
    this.setData({
      designer_start_date: date,
    })
  },
  designer_start_time: function (e) {
    let time = e.detail.value;
    this.setData({
      designer_start_time: time,
    })
  },
  designer_end_date: function (e) {
    let date = e.detail.value;
    this.setData({
      designer_end_date: date,
    })
  },
  designer_end_time: function (e) {
    let time = e.detail.value;
    this.setData({
      designer_end_time: time,
    })
  },
  supervisor_start_date: function (e) {
    let date = e.detail.value;
    this.setData({
      supervisor_start_date: date,
    })
  },
  supervisor_start_time: function (e) {
    let time = e.detail.value;
    this.setData({
      supervisor_start_time: time,
    })
  },
  supervisor_end_date: function (e) {
    let date = e.detail.value;
    this.setData({
      supervisor_end_date: date,
    })
  },
  supervisor_end_time: function (e) {
    let time = e.detail.value;
    this.setData({
      supervisor_end_time: time,
    })
  },
  editUser: function (e) {
    let user = this.data.user;
    this.setData({
      userShow: true,
      editShow: false,
      user: user,
      userSign: {
        classname: e.currentTarget.dataset.classname,
        goodsNo: e.currentTarget.dataset.id
      }
    })
  },
  usercheckboxChange: function (e) {
    this.data.userChoose = e.detail.value;

  },
  userSure: function (e) {
    let goodsNo = e.currentTarget.dataset.id;
    let classname = e.currentTarget.dataset.classname + "Sure";
    let data = this.data[classname];
    let temp = this.data.userChoose;
    let user = this.data.user;
    let usersure = Array();
    for (let i = 0; i < temp.length; i++){
      for(let j = 0; j < user.length; j++){
        if(Number(temp[i]) == Number(user[j].id)){
          usersure[usersure.length] = user[j];
        }
      }
    }
    for (let key in data) {
      if (data[key].goodsNo == goodsNo) {
        data[key].user = usersure;
        break;
      }
    }
    if (classname == "buildSure") {
      this.setData({
        buildSure: data,
        userShow: false,
        editShow: true,
      })
    }
    if (classname == "materialSure") {
      this.setData({
        materialSure: data,
        userShow: false,
        editShow: true,
      })
    }
    if (classname == "softSure") {
      this.setData({
        softSure: data,
        userShow: false,
        editShow: true,
      })
    }
    console.log(data);
  },
  send: function (){
    let quota = this.data.info;
    let material = this.data.materialSure;
    let build = this.data.buildSure;
    let soft = this.data.softSure;
    let { id, startDate, endDate, supervisor_start_date, supervisor_end_date, supervisor_start_time, supervisor_end_time, designer_start_date, designer_end_date, designer_start_time, designer_end_time } = this.data; 
    let url = "https://xcx.envisioneer.cn/foreman/save";
    let start_time = util.formatDateUnix(startDate);
    let end_time = util.formatDateUnix(endDate);
    let supervisor_start = util.formatTimeUnix(supervisor_start_date + " " + supervisor_start_time);
    let supervisor_end = util.formatTimeUnix(supervisor_end_date + " " + supervisor_end_time);
    let designer_start = util.formatTimeUnix(designer_start_date + " " + designer_start_time);
    let designer_end = util.formatTimeUnix(designer_end_date + " " + designer_end_time);
    let data = { id, quota, material, build, soft, start_time, end_time, supervisor_start, supervisor_end, designer_start, designer_end};

    let errMsg = "";
    if (!start_time) errMsg = "未选择开工日期";
    if (!end_time) errMsg = "未选择结束日期";
    if (!supervisor_start) errMsg = "未选择监理交底时间";
    if (!supervisor_end) errMsg = "未选择监理验收时间";
    if (!designer_start) errMsg = "未选择设计交底时间";
    if (!designer_end) errMsg = "未选择设计验收时间";
    for (let i = 0; i < material.length; i++) {
      if (!material[i].date || !material[i].time) {
        errMsg = "您还有未选择入场时期或者入场时间的项目";
        break;
      }
    }
    for (let i = 0; i < build.length; i++) {
      if (!build[i].date || !build[i].time) {
        errMsg = "您还有未选择入场时期或者入场时间的项目";
        break;
      }
    }
    for (let i = 0; i < soft.length; i++) {
      if (!soft[i].date || !soft[i].time) {
        errMsg = "您还有未选择入场时期或者入场时间的项目";
        break;
      }
    }
    if(errMsg){
      wx.showModal({
        title: '提示',
        content: errMsg,
        showCancel: false,
      })
      return;
    }
    
    api.request(url, data)
      .then( res => {
        if(res == 1){
          wx.navigateBack({
            delta: 1
          })
        }
      })
  }

})