//提取数据
var playerArray = JSON.parse(sessionStorage.getItem("player")); //提取牌组
console.log(playerArray)
var days = +sessionStorage.getItem('days');
console.log(days)
var kilslife = +sessionStorage.getItem('kilslife'); //提取杀手剩余人数
var lifslife = +sessionStorage.getItem('lifslife'); //提取平民剩余人数
var chooseplayers = JSON.parse(sessionStorage.getItem("chosingplayers")); //被杀手杀死的玩家数组
var choseplayer = JSON.parse(sessionStorage.getItem("chosedplayers")); //被投票死的玩家数组
//自运行事件
$(function () {
    if (kilslife == 0 || kilslife == lifslife) {
        if (kilslife == 0) {
            $('#victory').text('平民胜利');
        } else {
            $('#victory').text('杀手胜利');
        }
    }
    $('#all').text(kilslife + lifslife);
    $('#killer').text(kilslife);
    $('#people').text(lifslife);
    for (let i = 0; i < days; i++) {
        if (i > 0) {
            //克隆
            $(".date").eq(0).clone(true).appendTo("main");
        }
        //显示天数
        $('.dayy').eq(i).text(i + 1);
        if (chooseplayers[i] != undefined) {
            $('.killnight').eq(i).text(chooseplayers[i] + 1 + '号被杀死，真实身份为' + playerArray[chooseplayers[
                i]]);
        } else {
            $('.killnight').eq(i).text('');
        }
        if (choseplayer[i] != undefined) {
            $('.voteday').eq(i).text(choseplayer[i] + 1 + '号被投死，真实身份为' + playerArray[choseplayer[i]]);
        } else {
            $('.voteday').eq(i).text('');
        }
    }
})
//返回主页面
function home() {
    sessionStorage.clear();
    location = "../jstask2-1/jstask2-1-1.html";
}