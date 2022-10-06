const axios = require("axios");
const cheerio = require("cheerio");

const ntvparaDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.ntv.com.tr/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".category-detail-title").text();
				const img = $(".card-img-wrapper").find("img").attr("data-src");
				let content = "";
				$(".category-detail-content-inner")
					.find("p")
					.each(function () {
						console.log($(this));
						content =
							content +
							($(this)["0"].name == "strong"
								? "<strong>" + $(this).text() + "</strong>"
								: "<p>" + $(this).text() + "</p>");
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
module.exports = ntvparaDetail;
