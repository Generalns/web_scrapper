const axios = require("axios");
const cheerio = require("cheerio");

const kararDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.karar.com/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".content-title").text();
				const img = $(".article-image")
					.find(".imgc")
					.find("img")
					.attr("data-src");
				console.log(img);
				let content = "";
				$(".text-content")
					.find("p, h3")
					.each(function () {
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
module.exports = kararDetail;
