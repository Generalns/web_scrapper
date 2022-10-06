const axios = require("axios");
const cheerio = require("cheerio");

const sozcu = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.sozcu.com.tr/";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".news-item", html).each(function () {
				const title = $(this).find("a").attr("data-title");
				const url = $(this).find("a").attr("href").split("com.tr")[1];
				const img = $(this).find("a").find("img").attr("src");
				articles.push({ title, url, img });
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
module.exports = sozcu;
