var all; //玩家人数
var numble;
var player; //存储玩家数组
var killers; //杀手人数
var kill; //存储杀手人数
var people; //平民人数
var life; //存储平民人数
//设置杀人投票页面的数据
var copying=0;
var copy;
sessionStorage.setItem('copy', copying);
var chooseplayers = []; //建立杀手杀人数组
var choosingplayers;
sessionStorage.setItem("chosingplayers", JSON.stringify(chooseplayers));
var choseplayer = []; //建立投票死的玩家数组
var chosedplayers;
sessionStorage.setItem("chosedplayers", JSON.stringify(choseplayer));
var zeo = JSON.parse(sessionStorage.getItem("chosingplayers"));
console.log(zeo)
var day = 0;
var date;
sessionStorage.setItem('date', day)
var kil = 0; //被杀死的杀手数
var kils;
sessionStorage.setItem('kils', kil);
$('#gamers').on('input', function () {
    var playgame = document.getElementById('gamers');
    all = playgame.value;

    //判断杀手和平民人数
    if (all >= 4 && all <= 18) {
        killers = Math.floor(all / 3);
        $('#killer').text(killers);
        people = all - killers;
        $('#person').text(people);
    } else {
        $('#killer').text('');
        $('#person').text('');
    }
    console.log(all)
})
$('.deal').eq(0).click(function () {
    //默认值
    if (all == undefined) {
        killers = 2;
        people = 6;
        all = 8;
    }
    //弹出框提示
    if (all < 4 || all > 18) {
        window.alert("请输入人数4-18人之间");
    } else {
        //建立卡牌
        var killer = [];
        var citizen = [];
        for (var i = 0; i < killers; i++) {
            killer[i] = '杀手';
        }
        // console.log(killer)
        for (var l = 0; l < people; l++) {
            citizen[l] = '平民';
        }
        var allplayers = killer.concat(citizen);
        //洗牌
        for (var i = allplayers.length; i > 0; i--) {
            var j = Math.floor(Math.random() * (i));
            var temp = allplayers[i - 1];
            allplayers[i - 1] = allplayers[j];
            allplayers[j] = temp;
        }
        // console.log(allplayers)
        // console.log(all)
        //保存数据
        sessionStorage.setItem("numble", Number(all));
        sessionStorage.setItem("kill", killers);
        sessionStorage.setItem("life", people);
        sessionStorage.setItem("player", JSON.stringify(allplayers));
        location = "../jstask2-2/jstask2-2-1.html";
    }
})