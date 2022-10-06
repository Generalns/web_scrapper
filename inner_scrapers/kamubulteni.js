const axios = require("axios");
const cheerio = require("cheerio");

const kamubulteniDetail = link => {
	return new Promise((resolve, reject) => {
		let article = {};
		const url = `https://www.kamubulteni.com/${link}`;
		console.log("URLL", url);
		axios(url)
			.then(response => {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(".title").text().split("Anahtar Kelimeler")[0];
				const img = $(".newspic").find("span").find("img").attr("src");
				let content = "";
				$("#newsbody")
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
module.exports = kamubulteniDetail;
