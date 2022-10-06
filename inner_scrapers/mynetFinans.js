const axios = require("axios");
const cheerio = require("cheerio");

const mynetDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://finans.mynet.com/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".post-title").text().split("\n")[1];
				const img = $(".feature-media").find("figure").find("img").attr("src");
				let content = "";
				$(".detail-content-inner")
					.find("p, h2")
					.each(function () {
						console.log($(this));
						content =
							content +
							($(this)["0"].name == "p"
								? "<p>" + $(this).text() + "</p>"
								: "<h2>" + $(this).text() + "</h2>");
					});
				article = { title, img, content };
			})
			.finally(() => {
				resolve(article);
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};
module.exports = mynetDetail;
