const PORT = 8000;
const express = require("express");

const app = express();

const hurriyet = require("./main_scrapers/hurriyet");
const kamubulteni = require("./main_scrapers/kamubulteni");
const mynetFinans = require("./main_scrapers/mynetfinans");
const ntvPara = require("./main_scrapers/ntvpara");
const sozcu = require("./main_scrapers/sozcu");
const aydinlik = require("./main_scrapers/aydinlik");
const karar = require("./main_scrapers/karar");
const aydinlikDetail = require("./inner_scrapers/aydinlik");
const hurriyetDetail = require("./inner_scrapers/hurriyet");
const kamubulteniDetail = require("./inner_scrapers/kamubulteni");
const kararDetail = require("./inner_scrapers/karar");
const mynetDetail = require("./inner_scrapers/mynetFinans");
const ntvparaDetail = require("./inner_scrapers/ntvpara");
const sozcuDetail = require("./inner_scrapers/sozcu");

app.use("/hurriyet/:category/:news", (req, res) => {
	const category = req.params.category;
	const news = req.params.news;
	const link = category + "/" + news;
	hurriyetDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/hurriyet", (req, res) => {
	hurriyet.then(data => {
		res.send(data);
	});
});

app.use("/kamubulteni/:category/:news", (req, res) => {
	const category = req.params.category;
	const news = req.params.news;
	const link = category + "/" + news;
	kamubulteniDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/kamubulteni", (req, res) => {
	kamubulteni.then(data => {
		res.send(data);
	});
});
app.use("/mynet-finans/:type/:category/:detail/:news/:id", (req, res) => {
	const type = req.params.type;
	const category = req.params.category;
	const detail = req.params.detail;
	const news = req.params.news;
	const id = req.params.id;
	const link = type + "/" + category + "/" + detail + "/" + news + "/" + id;
	mynetDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/mynet-finans", (req, res) => {
	mynetFinans.then(data => {
		res.send(data);
	});
});
app.use("/ntv-para/:category/:news", (req, res) => {
	const category = req.params.category;
	const news = req.params.news;
	const link = category + "/" + news;
	ntvparaDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/ntv-para", (req, res) => {
	ntvPara.then(data => {
		res.send(data);
	});
});
app.use("/sozcu/:type/:category/:detail/", (req, res) => {
	const type = req.params.type;
	const category = req.params.category;
	const detail = req.params.detail;
	const id = req.params.id;
	const utm_source = req.query.utm_source;
	const utm_medium = req.query.utm_medium;
	const utm_campaign = req.query.utm_campaign;

	const link = type + "/" + category + "/" + detail;
	sozcuDetail(link, utm_source, utm_medium, utm_campaign).then(data => {
		res.send(data);
	});
});
app.get("/sozcu", (req, res) => {
	sozcu.then(data => {
		res.send(data);
	});
});
app.get("/aydinlik/:link", (req, res) => {
	const link = req.params.link;
	console.log(req.params.link);
	aydinlikDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/aydinlik", (req, res) => {
	console.log(req.params);

	aydinlik.then(data => {
		res.send(data);
	});
});
app.use("/karar/:category/:news", (req, res) => {
	const category = req.params.category;
	const news = req.params.news;
	const link = category + "/" + news;
	kararDetail(link).then(data => {
		res.send(data);
	});
});
app.get("/karar", (req, res) => {
	karar.then(data => {
		res.send(data);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
