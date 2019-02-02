 //提取数据
 var playerArray = JSON.parse(sessionStorage.getItem("player")); //提取牌组
 console.log(playerArray)
 var numble = +sessionStorage.getItem("numble");
 console.log(numble)
 var follow = 0; //提取下标
 var front; //正面
 var other; //底面
 //跳转
 $('.check').eq(0).click(function () {
     if (follow < numble - .5) {
         follow += .5
         console.log(follow)
         if (follow % 1 != 0) {
             other = follow + .5;
             $("#figure").text(other);
             $("#look").text(other);
             $('#first').css("display", "none");
             $('.box').eq(0).css("display", "block");
             $(".idcard").eq(0).text(playerArray[other-1]);
         } else {
             $("#figure").text(follow + 1);
             $("#look").text(follow + 1);
             $('#first').css("display", "block");
             $('.box').eq(0).css("display", "none");
         }
     } else {
         location = "jstask2-2-2.html";
     }
 })

 //返回主页面
 function home() {
     sessionStorage.clear();
     location = "../jstask2-1/jstask2-1-1.html";
 }