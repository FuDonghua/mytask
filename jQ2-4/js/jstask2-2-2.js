//提取数据
var playerArray = JSON.parse(sessionStorage.getItem("player")); //提取牌组
console.log(playerArray)
//加载数据
$(function() {
    //克隆
    for (let i = 0; i < playerArray.length - 1; i++) {
        $(".item").eq(0).clone(true).appendTo(".container").eq(0);
    }
    //修改玩家名字
    for (let i = 0; i < playerArray.length; i++) {
        if (playerArray[i] == "杀手") {
            $(".name").eq(i).text("杀手");
        }
        $(".figure").eq(i).text(i + 1 + "号");
    }

    //显示已死亡颜色不同
    var chooseplayer = JSON.parse(sessionStorage.getItem("chosingplayers")); //提取杀手杀人数组
    console.log(chooseplayer)
    var choseplayer = JSON.parse(sessionStorage.getItem("chosedplayers")); //提取投票死的玩家数组
    var killed = chooseplayer.concat(choseplayer);
    for (let k = 0; k < killed.length; k++) {
        $('.name').eq(killed[k]).css('background-color','#1A99B7');
    }
    var step = sessionStorage.getItem("steps");
    console.log(step)
})
//返回选人页面
function back() {
    sessionStorage.clear();
    location = "../jstask2-1/jstask2-1-2.html";
}
//返回主页面
function home() {
    sessionStorage.clear();
    location = "../jstask2-1/jstask2-1-1.html";
}