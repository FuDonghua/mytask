var wrap = document.getElementsByClassName("box");
        console.log(wrap);

        function colors() { //选取的rgb颜色
            var rgb
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var rgb = "rgb(" + r + "," + g + "," + b + ")"
            return rgb;
        }

        function begin() { //随机数
            //for循环去除重复
            for (; a == b || b == c || c == a;) {
                var a = Math.floor(Math.random() * 9);
                var b = Math.floor(Math.random() * 9);
                var c = Math.floor(Math.random() * 9);
            }
            console.log(a, b, c)
            //判断三个盒子背景颜色是否重复，并给随机的三个盒子赋值上随机背景颜色
            for (; one == two || two == three || three == one;) {
                var one = wrap[a].style.backgroundColor = colors();
                var two = wrap[b].style.backgroundColor = colors();
                var three = wrap[c].style.backgroundColor = colors();
            }
            console.log(one, two, three)
        }
        
        //按下按钮开始
        var time;
        function go() {
            time = setInterval(function () {
                for (var i = 0; i < wrap.length; i++) {
                    wrap[i].style.backgroundColor = "orange"; //每次获取随机颜色后恢复默认颜色
                }
                begin() //调用赋值随机背景颜色的随机盒子
            }, 1000)
            document.getElementById("start").disabled = true; //禁用开始按钮
        }
        //设置重置
        function end() {
            for (var l = 0; l < wrap.length; l++) {
                wrap[l].style.backgroundColor = "orange"; //恢复默认颜色
            }
            clearInterval(time); //去除延时
            document.getElementById("start").disabled = false; //启用开始按钮
        }