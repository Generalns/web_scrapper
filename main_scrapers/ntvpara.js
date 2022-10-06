const axios = require("axios");
const cheerio = require("cheerio");

const ntvPara = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.ntv.com.tr/ntvpara";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".card", html).each(function () {
				const title = $(this).find("a").attr("title");
				const url = $(this).find("a").attr("href");
				const img = $(this).find("a").find("img").attr("data-src");
				if (url.split("/")[1] != "galeri") {
					articles.push({ title, url, img });
				}
			});
		})
		.finally(() => {
			resolve(articles);
		})
		.catch(err => {
			console.log(err);
			reject(err);
		});
});
module.exports = ntvPara;
