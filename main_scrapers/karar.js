const axios = require("axios");
const cheerio = require("cheerio");

const karar = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.karar.com/";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".post-item", html).each(function () {
				const title = $(this).find("a").find("span").text();
				const url = $(this).find("a").attr("href");
				const img = $(this)
					.find("a")
					.find(".imgc")
					.find("img")
					.attr("data-src");
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
module.exports = karar;
