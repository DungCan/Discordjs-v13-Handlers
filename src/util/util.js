const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const nums = require("../assets/json/numbers.json");
module.exports = {
        laysodep: function(num) {
        const pattern = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(pattern, ',');
    },
      sleep: async function(miliseconds) {
        const start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > miliseconds) {
                break;
            }
        }
    },
  formatDate: function (date) {
    return new Intl.DateTimeFormat("vi-VN").format(date);
  },
       formatBytes: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    },
        capitalizeWords: function(string) {
        return string.replace(/(?!^[0-9])(^|[^a-zA-Z\u00C0-\u017F\u0400-\u04FF'])([a-zA-Z\u00C0-\u017F\u0400-\u04FF])/g, function(m) {
            return m.toUpperCase();
        })
    },
    // laysonho: function(n) {
    //     let num = n.toString()
    //     let res = []
    //     for (i = 0; i < num.length; i++) {
    //       res[i] = nums[num[i]]
    //     }
    //     if (res.length = 1) {
    //       return nums["0"] + res.join("")
    //     }
    //     if(res.length == 2) {
    //       return nums
    //     }
    //     return res.join("")
    //   },
      laysonho: function(count,digits){
        let result = "";
        let num = count;
        if(!digits) digits = count.toString().length;
        for(i=0;i<digits;i++){
          let digit = count%10;
          count = Math.trunc(count/10);
          result = nums[digit]+result;
        }
        return result;
      },
      replaceMoney: function(a) {
        let arrcash, cash
        if (a.includes("k")) {
          arrcash = a.split("k")
          arrcash = arrcash.map(e => e = parseInt(e))
          cash = arrcash[0] * 1000 + (arrcash[1] ? arrcash[1] * 100 : 0)
        } else if (a.includes("m")) {
          arrcash = a.split("m")
          arrcash = arrcash.map(e => e = parseInt(e))
          cash = arrcash[0] * 1000000 + (arrcash[1] ? arrcash[1] * 100000 : 0)
        }
        return cash
      }


}
