const axios = require("axios");
const cheerio = require("cheerio");

const hurriyetDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.hurriyet.com.tr/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".news-detail-title").text();
				const img = $(".news-media").find("img").attr("src");
				let content = "";
				$(".news-content")
					.find("p, strong")
					.each(function () {
						console.log($(this));
						content =
							content +
							($(this)["0"].name == "p"
								? "<p>" + $(this).text() + "</p>"
								: $(this).text() != "Haberin Devamı"
								? "<strong>" + $(this).text() + "</strong>"
								: "");
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
module.exports = hurriyetDetail;
