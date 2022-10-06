const axios = require("axios");
const cheerio = require("cheerio");

const aydinlik = new Promise((resolve, reject) => {
	const articles = [];
	const url = "https://www.aydinlik.com.tr/";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$(".post-card", html).each(function () {
				const title = $(this).attr("title");
				const url = $(this).attr("href").split("haber/")[1];
				const img = $(this)
					.find("picture")
					.find("img")
					.attr("src")
					?.split("rcman")[1];
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
module.exports = aydinlik;
