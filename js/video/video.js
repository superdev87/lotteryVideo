var pubmethod = {},
  path = window.location.href,
  lotCode;
var finishData;
$(function () {
  pubmethod.init(),
    $("#zixunHref").on("click", function () {
      $(this).attr("href", "index.html" + config.ym());
    }),
    $("#touzhuHref").on("click", function () {
      $(this).attr("href", "touzhu_index.html" + config.ym());
    }),
    $("#videoHref").on("click", function () {
      $(this).attr("href", "video_index.html" + config.ym());
    }),
    $("#kaiholeHref").on("click", function () {
      $(this).attr("href", "kaihole_index.html" + config.ym());
    });
}),
  (pubmethod.init = function () {
    if (
      -1 != path.indexOf("video_index") ||
      (void 0 != path.split("?")[1] && "" != path.split("?")[1])
    ) {
      lotCode = path.split("?")[1];
      var e = pubmethod.tools.type(lotCode);
      void 0 != e && pubmethod.doAjax("", lotCode, e, !0);
    } else alert("外链代码有误，请重新获取代码！");
  }),
  (pubmethod.tools = {
    type: function (e) {
      for (
        var t = [
            ["cqnc", "10009"],
            ["xgc", "10048", "10051"],
            ["egxy", "10046", "10074", "10081"],
            ["sum3", "11108", "11107", "11141"],
            ["ms88kj4", "11111", "11112"],
            ["gxklsf", "10038"],
            ["jisuft", "10035", "10057", "10058"],
            ["jisuft1", "11105", "11131"],
            ["twbg", "10047"],
            ["fcsd", "10041", "10043"],
            ["bjkl8", "10013", "10014", "10054", "10073", "10080", "10082"],
            ["klsf", "10005", "10011", "10034", "10053", "10078", "10083"],
            ["pk10", "10001", "10012", "10079"],
            ["qgc", "10039", "10040", "10042", "10044", "10045"],
            [
              "ssc",
              "10002",
              "10003",
              "10004",
              "10010",
              "10036",
              "10050",
              "10059",
              "10060",
              "10064",
              "10065",
              "10066",
              "10070",
              "10071",
              "10072",
              "10075",
              "10077",
            ],
            ["blockssc", "1001", "1002"],
            [
              "kuai3",
              "10007",
              "10026",
              "10027",
              "10028",
              "10029",
              "10030",
              "10031",
              "10032",
              "10033",
              "10052",
              "10061",
              "10062",
              "10063",
              "10076",
            ],
            [
              "shiyi5",
              "10006",
              "10008",
              "10015",
              "10016",
              "10017",
              "10018",
              "10019",
              "10020",
              "10021",
              "10022",
              "10023",
              "10024",
              "10025",
              "10055",
              "10084",
            ],
          ],
          o = 0,
          r = t.length;
        o < r;
        o++
      )
        for (var s = 0, i = t[o].length; s < i; s++)
          if (e == t[o][s]) return t[o][0];
    },
    action: {
      pk10: "pks/getLotteryPksInfo.do",
      cqnc: "klsf/getLotteryInfo.do",
      ssc: "CQShiCai/getBaseCQShiCai.do",
      klsf: "klsf/getLotteryInfo.do",
      jsk3: "lotteryJSFastThree/getBaseJSFastThree.do",
      shiyi5: "ElevenFive/getElevenFiveInfo.do",
      bjkl8: "LuckTwenty/getBaseLuckTewnty.do",
      twbg: "LuckTwenty/getBaseLuckTewnty.do",
      egxy: "LuckTwenty/getPcLucky28.do",
      gxklsf: "gxklsf/getLotteryInfo.do",
      kuai3: "lotteryJSFastThree/getBaseJSFastThree.do",
      fcsd: "QuanGuoCai/getLotteryInfo1.do",
      jisuft: "pks/getLotteryPksInfo.do",
      jisuft1: "https://act.fsaad334546gfa.com/game/results?gameType=",
      xgc: "",
      sum3: "https://act.fsaad334546gfa.com/game/results?gameType=",
      ms88kj4: "",
      blockssc: "latestWithAnalysis",
    },
    pageView: function (e) {
      return {
        cqnc: "video/cqnc/index.html",
        egxy: "video/pcEgg_video/index.html",
        sum3: "video/pcEgg_video/index.html",
        gxklsf: "video/gxklsf_video/index.html",
        fcsd: "video/fc3DVideo/index.html",
        bjkl8: "video/bjkl8Video/index.html",
        twbg: "video/twbgVideo/twbg_index.html",
        klsf: "video/GDklsf/index.html",
        pk10: "video/PK10/video.html",
        qgc: "video/PK10/video.html",
        ssc: "video/SSC/index.html",
        blockssc: "video/SSC/index.html",
        kuai3: "video/kuai3_video/Kuai3.html",
        shiyi5: "video/11x5_video/index.html",
        jisuft: "video/jisuft_video/index.html",
        jisuft1: "video/PK10/index.html",
        xgc: "video/SixColor_animate/index.html",
      }[e];
    },
    random: function () {
      return new Date().getTime();
    },
    ifObj: function (e) {
      var t = null;
      return (
        "object" != typeof e
          ? (t = JSON.parse(e))
          : ((t = JSON.stringify(e)), (t = JSON.parse(t))),
        t
      );
    },
    cutTime: function (e, t) {
      var o = e.replace("-", "/"),
        t = t.replace("-", "/");
      return (
        (o = o.replace("-", "/")),
        (t = t.replace("-", "/")),
        (new Date(o) - new Date(t)) / 1e3
      );
    },
  }),
  (pubmethod.repeatAjax = function (e, t) {
    setTimeout(function () {
      e(t);
    }, config.startTime);
  }),
  (pubmethod.doAjax = function (e, lotCode, type, r) {
    var url = pubmethod.tools.action[type];
    if(type == 'sum3' || type =='jisuft1')
      url += String(lotCode).substring(3);
    if(type == 'ms88kj4') {
      if(lotCode == '11111') // jianada28
        url = 'https://api.168kj1.com/api/getCurData?lottype=jianada28';
      else
        url = 'http://api.168kj1.com/api/getCurData?lottype=taiwan28';
    }
    var s = {
      url: url,
      issue: e,
      lotCode: lotCode,
      flag: r,
      type: type,
      succM: function (e, lotCode) {
        pubmethod.creatHeadD[type](e, lotCode);
      },
    };
    pubmethod.ajaxM(s);
  }),
  (pubmethod.ajaxM = function (e) {
    if("1001" === e.lotCode || "1002" === e.lotCode) {
      $.ajax({
          url: config.publicUrl_blockChain + "" + e.url,
          type: "GET",
          async: !0,
          data: { code: "1001" === e.lotCode ? "ether" : "tron" },
          timeout: "6000",
          success: function (t) {
            try {
              e.succM(t, e);
            } catch (t) {
              pubmethod.repeatAjax(pubmethod.ajaxM, e);
            }
          },
          error: function (t) {
            pubmethod.repeatAjax(pubmethod.ajaxM, e);
          },
        })
    } else if("sum3" === e.type || "jisuft1" === e.type || 'ms88kj4' === e.type) {
      $.ajax({
        url:  e.url,
        type: "GET",
        async: !0,
        timeout: "6000",
        success: function (t) {
          try {
            e.succM(t, e);
          } catch (t) {
            pubmethod.repeatAjax(pubmethod.ajaxM, e);
          }
        },
        error: function (t) {
          pubmethod.repeatAjax(pubmethod.ajaxM, e);
        },
      })
    } else {
      $.ajax({
        url: config.publicUrl + "" + e.url,
        type: "GET",
        async: !0,
        data: {
          issue: void 0 == e.issue ? "" : e.issue,
          lotCode: e.lotCode,
          datestr: "",
        },
        timeout: "6000",
        success: function (t) {
          try {
            e.succM(t, e);
          } catch (t) {
            pubmethod.repeatAjax(pubmethod.ajaxM, e);
          }
        },
        error: function (t) {
          pubmethod.repeatAjax(pubmethod.ajaxM, e);
        },
      });
    }
  }),
  (pubmethod.creatHeadD = {
    pk10: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = "",
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? (i += s[u].substr(1, 1) + ",")
            : (i += s[u] + ",");
        if (
          ((r = r < 0 ? 1 : r),
          showcurrentresult(i),
          $("#currentdrawid").text(o.drawCount),
          $("#nextdrawid").text(o.preDrawIssue),
          $("#stat1_1").text(o.sumFS),
          $("#stat1_2").text("0" == o.sumBigSamll ? "大" : "小"),
          $("#stat1_3").text("0" == o.sumSingleDouble ? "单" : "双"),
          $("#stat2_1").text("0" == o.firstDT ? "龙" : "虎"),
          $("#stat2_2").text("0" == o.secondDT ? "龙" : "虎"),
          $("#stat2_3").text("0" == o.thirdDT ? "龙" : "虎"),
          $("#stat2_4").text("0" == o.fourthDT ? "龙" : "虎"),
          $("#stat2_5").text("0" == o.fifthDT ? "龙" : "虎"),
          t.flag)
        )
          $("#hlogo")
            .find("img")
            .attr("src", "images/logo/logo-" + t.lotCode + ".png"),
            $(".statuslogo").css({
              background:
                "url(images/logo/logo-" + t.lotCode + ".png)no-repeat",
            }),
            startcountdown(r, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            finishgame(i);
          }, "1000"),
            setTimeout(function () {
              startcountdown(r - 11, t);
            }, "10000");
        }
      }
    },
    egxy: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        (o = o.result.data), console.log(o);
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1) ? i.push(s[u].substr(1, 1)) : i.push(s[u]);
        r = r < 0 ? 1 : r;
        var l = {
          nextIssue: o.drawIssue,
          drawTime: o.drawTime,
          serverTime: o.serverTime,
          numArr: i,
          preDrawTime: o.preDrawTime,
        };
        if (t.flag) pcEgg.startVid(l, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            pcEgg.stopVid(l, t);
          }, "1000");
        }
      }
    },
    sum3: function(resData, t) {
      var data = resData['body'][0];
      var numArr = data['result'].split(',').slice(0, 3).map(value => parseInt(value, 10));
      var l = {
        nextIssue: parseInt(data['termId']) + 1,
        drawTime: moment(data['closeTime']).add("1", "minutes").format("YYYY-MM-DD HH:mm:ss"),
        numArr: numArr,
        serverTime: moment(data['timestamp']).add(String(Math.floor(resData['timestamp'] / 1000) % 60), "seconds").format("YYYY-MM-DD HH:mm:ss"),
        preDrawTime: data['timestamp'],
      }
      r = pubmethod.tools.cutTime(l.drawTime, l.serverTime);
      r = r < 0 ? 1 : r;
      // alert(JSON.stringify(l));
      if (t.flag) pcEgg.startVid(l, t);
      else {
        if (!t.flag && r <= 1) throw new Error("error");
        setTimeout(function () {
          pcEgg.stopVid(l, t);
        }, "1000");
      }
    },
    ms88kj4: function(resData, t) {
      var data = resData['result']['data'];
      var numArr = data['preDrawCode'].split(',').slice(0, 3).map(value => parseInt(value, 10));
      var l = {
        nextIssue: data['drawIssue'],
        drawTime: data['drawTime'],
        numArr: numArr,
        serverTime: data['serverTime'],
        preDrawTime: data['preDrawTime'],
      }
      r = pubmethod.tools.cutTime(l.drawTime, l.serverTime);
      r = r < 0 ? 1 : r;
      // alert(JSON.stringify(l));
      if (t.flag) pcEgg.startVid(l, t);
      else {
        if (!t.flag && r <= 1) throw new Error("error");
        setTimeout(function () {
          pcEgg.stopVid(l, t);
        }, "1000");
      }
    },
    cqnc: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1) ? i.push(s[u].substr(1, 1)) : i.push(s[u]);
        if (((r = r < 0 ? 1 : r), t.flag))
          cqncVideo.statusFun(o.preDrawIssue, i, r, !0, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            stopanimate(i, r, t);
          }, "1000");
        }
      }
    },
    ssc: function (e, t) {
      if ("100002" == (a = pubmethod.tools.ifObj(e)).result.businessCode)
        throw new Error("error");
      if (0 == a.errorCode && 0 == a.result.businessCode) {
        for (
          var o = (a = a.result.data).lotCode,
            r = pubmethod.tools.cutTime(a.drawTime, a.serverTime),
            s = a.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1) && s[u].length > 1
            ? i.push(s[u].substr(1, 1))
            : i.push(s[u]);
        r = r < 0 ? 1 : r;
        var l = "";
        "0" == a.dragonTiger
          ? (l = "龙")
          : "1" == a.dragonTiger
          ? (l = "虎")
          : "2" == a.dragonTiger && (l = "和");
        var a = {
          preDrawCode: i,
          id: "#numBig",
          counttime: r,
          preDrawIssue: a.preDrawIssue,
          drawTime: a.drawTime.substr(a.drawTime.length - 8, 8),
          sumNum: a.sumNum,
          sumSingleDouble: 0 == a.sumSingleDouble ? "单" : "双",
          sumBigSmall: 0 == a.sumBigSmall ? "大" : "小",
          dragonTiger: l,
        };
        if (t.flag)
          sscAnimateEnd(a, t),
            $("#hlogo")
              .find("img")
              .attr("src", "img/cqssc/logo-" + t.lotCode + ".png");
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            sscAnimateEnd(a, t);
          }, "1000");
        }
        ("10002" != o && "10050" != lotCode) ||
          (new Date("2019-03-29 23:52:00").getTime() - new Date().getTime() <=
            0 &&
            $(".djs").html(
              "<span  style='text-align:center;width:100%;color: #ff0b0b;display:inline-block;font-size:17px;'>停止销售</span>"
            ));
      }
    },
    blockssc: function (e, t) {
      if ((l = pubmethod.tools.ifObj(e))) {
        l.chainCode;
        for (
          var o = pubmethod.tools.cutTime(l.nextDrawTime, l.serverTime),
            r = l.number.split(","),
            s = [],
            i = 0,
            u = r.length;
          i < u;
          i++
        )
          "0" == r[i].substr(0, 1) && r[i].length > 1
            ? s.push(r[i].substr(1, 1))
            : s.push(r[i]);
        o = o < 0 ? 1 : o;
        var n = "";
        "0" == l.dragonTiger
          ? (n = "龙")
          : "1" == l.dragonTiger
          ? (n = "虎")
          : "2" == l.dragonTiger && (n = "和");
        var l = {
          preDrawCode: s,
          id: "#numBig",
          counttime: o,
          preDrawIssue: l.drawNumber,
          drawTime: l.nextDrawTime.substr(l.nextDrawTime.length - 8, 8),
          sumNum: l.numSum,
          sumSingleDouble: 0 == l.singleDoubleSum ? "双" : "单",
          sumBigSmall: 0 == l.bigSmallSum ? "大" : "小",
          dragonTiger: n,
        };
        if (t.flag)
          sscAnimateEnd(l, t),
            $("#hlogo")
              .find("img")
              .attr("src", "img/cqssc/logo-" + t.lotCode + ".png");
        else {
          if (!t.flag && o <= 1) throw new Error("error");
          setTimeout(function () {
            sscAnimateEnd(l, t);
          }, "1000");
        }
      }
    },
    shiyi5: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ((console.log(o), "100002" == o.result.businessCode))
        throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        if (((r = r < 0 ? 1 : r), console.log(i), t.flag))
          $(".nameLogo")
            .find("img")
            .attr("src", "img/logo/11x5_" + t.lotCode + ".png"),
            k3v.startVideo(o, t),
            console.log($(".nameLogo"), t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          console.log(o),
            setTimeout(function () {
              k3v.stopVideo(o, t);
            }, "1000");
        }
      }
    },
    klsf: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        r = r < 0 ? 1 : r;
        var l = o.preDrawIssue,
          a = o.drawIssue,
          d = o.drawTime.split(" ")[1].slice(0, 5);
        if (t.flag)
          $(".video_box").css(
            "background",
            "url(img/logo/" + t.lotCode + ".jpg) 0 0 no-repeat"
          ),
            fun.fillHtml(l, a, d, r, i, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            fun.Trueresult(i), fun.fillHtml(l, a, d, r, void 0, t);
          }, "1000");
        }
      }
    },
    kuai3: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        r = r < 0 ? 1 : r;
        o.drawTime.split(" ")[1].slice(0, 5);
        console.log(o);
        var l = {
          seconds: r,
          preDrawCode: i,
          sumNum: o.sumNum,
          drawTime: o.drawTime,
          drawIssue: o.drawIssue,
          preDrawIssue: o.preDrawIssue,
        };
        if (t.flag)
          $(".nameLogo")
            .find("img")
            .attr("src", "img/logo/" + t.lotCode + ".png"),
            k3v.stopVideo(l, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            k3v.stopVideo(l, t);
          }, "1000");
        }
      }
    },
    fcsd: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        (r = r < 0 ? 1 : r), (o.cutime = r);
        o.drawTime.split(" ")[1];
        if ((console.log(o), (o.preDrawCode = i), t.flag))
          $(".logo").css(
            "background",
            "url(img/logo/" + t.lotCode + ".png) center center no-repeat"
          ),
            fcsdv.startVid(o, t);
        else {
          if (t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            fcsdv.stopVid(o, t);
          }, "1000");
        }
      }
    },
    bjkl8: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
          s = o.preDrawCode.split(","),
          i = [];
        "10073" == o.lotCode
          ? s.push("101")
          : ("10054" != o.lotCode && "10082" != o.lotCode) ||
            (s[s.length - 1] = "101");
        for (var u = 0, n = s.length; u < n; u++)
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        if (
          ((r = r < 0 ? 1 : r),
          (o.cutime = r),
          console.log(o),
          (o.preDrawCode = i),
          t.flag)
        )
          $(".logo").css(
            "background",
            "url(img/logo/" + t.lotCode + ".png) center center no-repeat"
          ),
            syxwV.startVid(o, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            syxwV.stopVid(o, t);
          }, "1000");
        }
      }
    },
    twbg: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        if (
          ((r = r < 0 ? 1 : r),
          (o.cutime = r),
          console.log(o),
          (o.preDrawCode = i),
          t.flag)
        )
          syxwV.startVid(o, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            syxwV.stopVid(o, t);
          }, "1000");
        }
      }
    },
    gxklsf: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        o = o.result.data;
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        if (
          ((r = r < 0 ? 1 : r),
          (o.cutime = r),
          console.log(o),
          (o.numArr = i),
          t.flag)
        )
          gxklsf.startVid(o, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            gxklsf.stopVid(o, t);
          }, "1000");
        }
      }
    },
    jisuft: function (e, t) {
      var o = pubmethod.tools.ifObj(e);
      if ("100002" == o.result.businessCode) throw new Error("error");
      if (0 == o.errorCode && 0 == o.result.businessCode) {
        (o = o.result.data),
          $("#status").css(
            "background-image",
            "../images/logo_" + o.lotCode + ".png"
          ),
          $(".logo")
            .find("img")
            .attr("src", "images/logo_" + o.lotCode + ".png");
        for (
          var r = pubmethod.tools.cutTime(o.drawTime, o.serverTime),
            s = o.preDrawCode.split(","),
            i = [],
            u = 0,
            n = s.length;
          u < n;
          u++
        )
          "0" == s[u].substr(0, 1)
            ? i.push(1 * s[u].substr(1, 1))
            : i.push(1 * s[u]);
        if (
          ((r = r < 0 ? 1 : r),
          (o.cutime = r),
          console.log(o),
          showcurrentresult(o.preDrawCode),
          $("#currentdrawid").text(o.drawCount),
          $("#nextdrawid").text(o.preDrawIssue),
          $("#stat1_1").text(o.sumFS),
          $("#stat1_2").text("0" == o.sumBigSamll ? "大" : "小"),
          $("#stat1_3").text("0" == o.sumSingleDouble ? "单" : "双"),
          $("#stat2_1").text("0" == o.firstDT ? "龙" : "虎"),
          $("#stat2_2").text("0" == o.secondDT ? "龙" : "虎"),
          $("#stat2_3").text("0" == o.thirdDT ? "龙" : "虎"),
          $("#stat2_4").text("0" == o.fourthDT ? "龙" : "虎"),
          $("#stat2_5").text("0" == o.fifthDT ? "龙" : "虎"),
          t.flag)
        )
        startcountdown(r, t);
        else {
          if (!t.flag && r <= 1) throw new Error("error");
          setTimeout(function () {
            finishgame(i.toString());
          }, "1000"),
            setTimeout(function () {
              startcountdown(r - 11, t);
            }, "10000");
        }
      }
    },
    jisuft1: function(resData, t) {
      let data = resData['body'][0] ?? {};
      let dataArray = data['result'].split(",");

      let l = {
        nextIssue: parseInt(data['termId']) + 1,
        drawTime: moment(data['closeTime']).add("1", "minutes").format("YYYY-MM-DD HH:mm:ss"),
        serverTime: moment(data['timestamp']).add(String(Math.floor(resData['timestamp'] / 1000) % 60), "seconds").format("YYYY-MM-DD HH:mm:ss"),
        preDrawTime: data['timestamp'],
      }
      let r = pubmethod.tools.cutTime(l.drawTime, l.serverTime);
      let preDrawCode = dataArray.slice(0, 10).join(",");

      if (((r = r < 0 ? 1 : r) && t.flag)) {
        showcurrentresult(preDrawCode);
        $("#currentdrawid").text(20);
        $("#nextdrawid").text(l.nextIssue);
        $("#stat1_1").text(dataArray[10]);
        $("#stat1_2").text(dataArray[11]);
        $("#stat1_3").text(dataArray[12]);
        $("#stat2_1").text(dataArray[13]);
        $("#stat2_2").text(dataArray[14]);
        $("#stat2_3").text(dataArray[15]);
        $("#stat2_4").text(dataArray[16]);
        $("#stat2_5").text(dataArray[17]);
        $("#hlogo")
          .find("img")
          .attr("src", "images/logo/logo-" + t.lotCode + ".png"),
          $(".statuslogo").css({
            background:
              "url(images/logo/logo-" + t.lotCode + ".png)no-repeat",
          }),
          startcountdown(r, t);
      }
      else {
        if (!t.flag && r <= 1) throw new Error("error");
        setTimeout(function () {
          finishgame(preDrawCode);
        }, "1000"),
          setTimeout(function () {
            startcountdown(r - 11, t);
          }, "10000");
      }
    }
  });
