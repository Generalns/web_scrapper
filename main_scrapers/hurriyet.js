const axios = require("axios");
const cheerio = require("cheerio");

const hurriyet = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.hurriyet.com.tr/";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".box__item", html).each(function () {
				const title = $(this).text();
				const url = $(this).find("a").attr("href");
				const img = $(this).find("a").find("img").attr("data-src");
				if (url.split("/").length == 3) {
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
module.exports = hurriyet;
