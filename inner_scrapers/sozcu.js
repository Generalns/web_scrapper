const axios = require("axios");
const cheerio = require("cheerio");

const sozcuDetail = (link, utm_source, utm_medium, utm_campaign) => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.sozcu.com.tr/${link}`;
		console.log("URLL", url);
		axios
			.get(url, {
				params: {
					utm_campaign: utm_campaign,
					utm_medium: utm_medium,
					utm_source: utm_source,
				},
			})
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $("h1").text();
				const img = $(".main-img").find(".img-holder").find("img").attr("src");
				let content = "";
				$("article")
					.find("p")
					.each(function () {
						content = content + "<p>" + $(this).text() + "</p>";
					});
				article = { title, img, content };
			})
			.finally(() => {
				resolve(article);
			})
			.catch(err => {
				console.log(err);
				reject("ERR", err);
			});
	});
};
module.exports = sozcuDetail;
