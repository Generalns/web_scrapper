const axios = require("axios");
const cheerio = require("cheerio");

const mynetFinans = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.mynet.com/amp/finans-haberleri.html";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".cart", html).each(function () {
				const title = $(this).find("a").attr("title");
				const url = $(this).find("a").attr("href").split(".com")[1];
				const img = $(this).find("a").find("amp-img").attr("src");
				if (title && url && img) {
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
module.exports = mynetFinans;
