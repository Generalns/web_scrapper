const axios = require("axios");
const cheerio = require("cheerio");

const kamubulteni = new Promise((resolve, reject) => {
	const articles = [];
	const url = "http://www.kamubulteni.com/m/";

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			$("a", html).each(function () {
				const title = $(this).attr("title");
				const url = $(this).attr("href").split(".com/")[1];
				const img = $(this).find("img").attr("src");
				if (title && url && img && !img.includes(".gif")) {
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
module.exports = kamubulteni;
