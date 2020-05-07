const request = require("superagent");
const cheerio = require("cheerio");
const Notify = require("./notify");
const targets = [
    "1476744365@qq.com",
    "1151517875@qq.com",
    "1490011375@qq.com",
    "364993583@qq.com"
];

let timer = null;

async function run() {
    const res = await request.get("http://yz.njnu.edu.cn/homepage_right.jsp?wid=");
    const text = res.text;
    
    const $ = cheerio.load(text);
    const first_date = $("ul.contentMM li:first-child div.mainDate").text().trim();
    if (first_date !== "2020-03-26") {
        clearInterval(timer);
        const subject = "南京师范大学20考研复试名单已出，请登录网址查看";
        const content = "网址如下：  http://yz.njnu.edu.cn/homepage_show.jsp";
        targets.forEach(target => {
            Notify(target, subject, content);
        });      
    } else {
        console.log("未出")
    }
}

timer = setInterval(() => {
    run();
}, 5000);







