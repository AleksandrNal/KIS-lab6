const { Router } = require("express");
let ParserRSS = require("rss-parser");

const router = Router();

router.get("/getNews", async (req, res) => {
  try {
    console.log("1");
    let parser = new ParserRSS();
    console.log("12");
    var RSS = await parser.parseURL("https://1prime.ru/export/rss2/index.xml");

    console.log("13");
    res.status(201).json(RSS);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
