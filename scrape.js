//this module returns a promise after scraping the website.

const cheerio = require("cheerio");
const request = require("request");

//notice board scraping
function scrapeNoticeBoard() {
  return new Promise(resolve => {
    request(
      {
        method: "GET",
        url: "http://heritageit.edu.in/"
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          var $ = cheerio.load(res.body);
          var notices = [];
          $("#notice table tbody tr td table tbody ")
            .children("tr")
            .each((i, el) => {
              var title = $(el)
                .find("td span")
                .eq(0)
                .text();
              var a = $(el).find("a");
              var link = $(a).attr("href");
              notices[i] = { title: title, link: link }; //array of objects to store notice data
            });
          resolve(notices); //promise returned
        }
      }
    );
  });
}

//VVIP links
function scrapeVVIP() {
  return new Promise(resolve => {
    request(
      {
        method: "GET",
        url: "http://heritageit.edu.in/"
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          const $ = cheerio.load(res.body);
          vvipLinks = [
            {
              link: $(".invalid8 a").attr("href"),
              desc: $(".invalid8 font").text()
            },
            {
              link: $(".invalid6 a").attr("href"),
              desc: $(".invalid6 span").text()
            },
            {
              link: $(".invalid5 a").attr("href"),
              desc: $(".invalid5 span").text()
            },
            {
              link: $(".invalid2 a").attr("href"),
              desc: $(".invalid2 span").text()
            },
            {
              link: $(".invalid2 a").attr("href"),
              desc: $(".invalid2 span").text()
            },
            {
              link: $(".invalid4 a").attr("href"),
              desc: $(".invalid4 span").text()
            },
            {
              link: $(".invalid7")
                .parent()
                .parent()
                .parent()
                .parent()
                .attr("href"),
              desc: $(".invalid7")
                .next()
                .children("span")
                .text()
            }
          ];

          resolve(vvipLinks);
        }
      }
    );
  });
}

module.exports = {
  scrapeNoticeBoard: scrapeNoticeBoard(),
  scrapeVVIP: scrapeVVIP()
};
