const axios = require("axios");
const cheerio = require("cheerio");

const aydinlikDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.aydinlik.com.tr/haber/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".post-detail-header").find("h1").text();
				const img = $(".post-detail-video-img")
					.find("figure")
					.find("picture")
					.find("img")
					.attr("src");
				let content = "";
				$(".content-text")
					.find("p, h3")
					.each(function () {
						console.log($(this));
						content =
							content +
							($(this)["0"].name == "p"
								? "<p>" + $(this).text() + "</p>"
								: "<h3>" + $(this).text() + "</h3>");
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
module.exports = aydinlikDetail;
