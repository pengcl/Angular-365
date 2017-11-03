var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.setHeader('cache-control', 'no-cache');
    res.render('index', {
        title: 'Hello',
        apiList: [
            {
                "pid": "032",
                "name": "경향신문",
                "img": "http://l0.51fanli.net/shop/logo68/08fc6938f52cb96f.png?1472795531",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "005",
                "name": "국민일보",
                "img": "http://l0.51fanli.net/shop/logo68/4c9481e4c8073e85.png?1489391739",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            },
            {
                "pid": "032",
                "name": "경향신문",
                "img": "http://l0.51fanli.net/shop/logo68/08fc6938f52cb96f.png?1472795531",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "005",
                "name": "국민일보",
                "img": "http://l0.51fanli.net/shop/logo68/4c9481e4c8073e85.png?1489391739",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            },
            {
                "pid": "032",
                "name": "경향신문",
                "img": "http://l0.51fanli.net/shop/logo68/08fc6938f52cb96f.png?1472795531",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "005",
                "name": "국민일보",
                "img": "http://l0.51fanli.net/shop/logo68/4c9481e4c8073e85.png?1489391739",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            },
            {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            },
            {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            },
            {
                "pid": "079",
                "name": "노컷뉴스",
                "img": "http://l1.51fanli.net/shop/logo68/e151abacba7dbde0.png?1488856235",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }, {
                "pid": "327",
                "name": "뉴데일리",
                "img": "http://l2.51fanli.net/shop/logo68/eaf77a97fc38f342.png?1489041418",
                "cate": "ct2",
                "amigo": "N",
                "viewer": "Y",
                "today": "N",
                "local": null
            }
        ],
        castList: [
            {
                "pid": "001",
                "name": "COCKTAIL 品味个性设计",
                "img": "//d.vpimg1.com/upcb/2017/08/21/9/PC750x460_upkj.jpg",
                "cate": "ct2",
                "return": "62",
                "viewer": "Y",
                "sold": "6788",
                "local": null
            }, {
                "pid": "002",
                "name": "SCOTCH & SODA荷兰创意潮服",
                "img": "//c.vpimg1.com/upcb/2017/07/06/91/pc750x460_pyyo.jpg",
                "cate": "ct2",
                "return": "53",
                "viewer": "Y",
                "sold": "5377",
                "local": null
            }, {
                "pid": "003",
                "name": "ANTEPRIMA 米兰创新针织设计女装",
                "img": "//d.vpimg1.com/upcb/2017/08/17/42/pc570x350_wbox.jpg",
                "cate": "ct2",
                "return": "48",
                "viewer": "Y",
                "sold": "5679",
                "local": null
            },
            {
                "pid": "004",
                "name": "Pratesi意式珠宝级手工包袋",
                "img": "//c.vpimg1.com/upcb/2017/08/18/119/750x460_pevb.jpg",
                "cate": "ct2",
                "return": "46",
                "viewer": "Y",
                "sold": "5483",
                "local": null
            }, {
                "pid": "005",
                "name": "立秋出游正当时",
                "img": "//c.vpimg1.com/upcb/2017/08/04/166/750x460PC_diyl.jpg",
                "cate": "ct2",
                "return": "40",
                "viewer": "Y",
                "sold": "7088",
                "local": null
            }, {
                "pid": "006",
                "name": "JUST CAVALLI腕表首饰 新生代意大利风情",
                "img": "//c.vpimg1.com/upcb/2017/08/16/75/PC750x460_zphl.jpg",
                "cate": "ct2",
                "return": "37",
                "viewer": "Y",
                "sold": "3264",
                "local": null
            }, {
                "pid": "007",
                "name": "MK & Oakley & Vogue太阳眼镜尽现都会风",
                "img": "//d.vpimg1.com/upcb/2017/07/26/126/PC750x460_rfwh.jpg",
                "cate": "ct2",
                "return": "32",
                "viewer": "Y",
                "sold": "7652",
                "local": null
            },
            {
                "pid": "008",
                "name": "Scervino Street&Ermanno Ermanno Scervino包袋华丽来袭",
                "img": "//c.vpimg1.com/upcb/2017/08/21/181/pc750x460_kbdt.jpg",
                "cate": "ct2",
                "return": "29",
                "viewer": "Y",
                "sold": "3597",
                "local": null
            }, {
                "pid": "009",
                "name": "Pierre Cardin法国时尚品位腕表",
                "img": "//c.vpimg1.com/upcb/2017/08/16/16/PC750x460_rvlt.jpg",
                "cate": "ct2",
                "return": "26",
                "viewer": "Y",
                "sold": "3264",
                "local": null
            }, {
                "pid": "010",
                "name": "PRADA墨镜 武装时尚心机",
                "img": "//d.vpimg1.com/upcb/2017/08/16/191/pc750x460_hoiw.jpg",
                "cate": "ct2",
                "return": "25",
                "viewer": "Y",
                "sold": "7845",
                "local": null
            }, {
                "pid": "011",
                "name": "GCDS米兰的街头时尚 2017新品",
                "img": "//d.vpimg1.com/upcb/2017/08/03/119/750x460pc_qkha.jpg",
                "cate": "ct2",
                "return": "23",
                "viewer": "Y",
                "sold": "3468",
                "local": null
            },
            {
                "pid": "012",
                "name": "FURLA腕表品牌折扣店",
                "img": "//c.vpimg1.com/upcb/2017/08/08/42/750x460PC_cfoe.jpg",
                "cate": "ct2",
                "return": "21",
                "viewer": "Y",
                "sold": "2646",
                "local": null
            }, {
                "pid": "013",
                "name": "Trussardi意大利奢华家族女装",
                "img": "//d.vpimg1.com/upcb/2017/08/21/68/pc570x350_vwaq.jpg",
                "cate": "ct2",
                "return": "19",
                "viewer": "Y",
                "sold": "6584",
                "local": null
            },
            {
                "pid": "014",
                "name": "ATELIER SWAROVSKI奢华别致饰品17春夏新品",
                "img": "//c.vpimg1.com/upcb/2017/08/10/15/ATELIERSWAROVSKIPC750x460_dlun.jpg",
                "cate": "ct2",
                "return": "18",
                "viewer": "Y",
                "sold": "7856",
                "local": null
            }, {
                "pid": "015",
                "name": "Burberry太阳眼镜 迷人英伦气息",
                "img": "//c.vpimg1.com/upcb/2017/08/16/183/750x460570x350_sokf.jpg",
                "cate": "ct2",
                "return": "16",
                "viewer": "Y",
                "sold": "2348",
                "local": null
            },
            {
                "pid": "016",
                "name": "Vogue太阳眼镜摩登新绎",
                "img": "//d.vpimg1.com/upcb/2017/08/16/54/750x460_kemq.jpg",
                "cate": "ct2",
                "return": "17",
                "viewer": "Y",
                "sold": "3648",
                "local": null
            }
        ],
        secondHands: {
            luxuries: [
                {
                    "pid": "001",
                    "name": "TRUSSARDI腕表深受皇室家族钟爱",
                    "img": "//c.vpimg1.com/upcb/2017/08/16/121/pc_570x350_olje.jpg",
                    "cate": "ct2",
                    "new": "98",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "70"
                },
                {
                    "pid": "002",
                    "name": "Cavalli Class奢华入门款 包袋皮带精选",
                    "img": "//c.vpimg1.com/upcb/2017/08/17/129/750460PC_nxvn.jpg",
                    "cate": "ct2",
                    "new": "88",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "68"
                },
                {
                    "pid": "003",
                    "name": "Chiara Ferragni最强博主 换新特惠",
                    "img": "//c.vpimg1.com/upcb/2017/08/17/137/PC750x460_ibrv.jpg",
                    "cate": "ct2",
                    "new": "95",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "80"
                }
            ],
            women: [
                {
                    "pid": "001",
                    "name": "Hogan男女都会主义时尚哲学",
                    "img": "//d.vpimg1.com/upcb/2017/08/17/102/PC750x460_svpr.jpg",
                    "cate": "ct2",
                    "new": "92",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "63"
                },
                {
                    "pid": "002",
                    "name": "LA PERLA意大利顶级奢品内衣专场",
                    "img": "//c.vpimg1.com/upcb/2017/08/17/153/pc750x460px_oani.jpg",
                    "cate": "ct2",
                    "new": "85",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "37"
                },
                {
                    "pid": "003",
                    "name": "L'Atelier Caesars巴黎趣玩设计包袋",
                    "img": "//d.vpimg1.com/upcb/2017/08/17/24/pc750X460_chso.jpg",
                    "cate": "ct2",
                    "new": "88",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "50"
                }
            ],
            men: [
                {
                    "pid": "001",
                    "name": "Armani太阳眼镜 时尚界大明星",
                    "img": "//d.vpimg1.com/upcb/2017/08/16/1/PC750x460_olnx.jpg",
                    "cate": "ct2",
                    "new": "68",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "50"
                },
                {
                    "pid": "002",
                    "name": "意大利PIQUADRO公文包典范",
                    "img": "//d.vpimg1.com/upcb/2017/08/14/160/PC750x460_lsmq.jpg",
                    "cate": "ct2",
                    "new": "88",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "39"
                },
                {
                    "pid": "003",
                    "name": "VERSACE&Ferragamo腕表 先锋个性品质精湛",
                    "img": "//d.vpimg1.com/upcb/2017/08/10/13/VERSACE1750x460.jpg",
                    "cate": "ct2",
                    "new": "100",
                    "viewer": "Y",
                    "sold": "3648",
                    "off": "19"
                }
            ]
        }
    });
});

module.exports = router;
