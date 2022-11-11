$(function () {

    // 隨機產生點點
    function constructDot() {
        var num = 0;
        for (i = 0; i < 80; i++) {
            $('.point-area').append('<div class="point-' + i + '"></div>');
            num = Math.round(Math.random())
            if (i > 0 && num > 0) {
                $('.point-' + i).append('<div class="dot"></div>')
            }
        }
    }
    constructDot();

    // 定位點點座標 建立點點物件來管理
    var dot = {};
    const node = document.querySelectorAll('.dot');
    for (i = 0; i < node.length; i++) {
        dot['dot-' + i] = [node[i].getBoundingClientRect().x + 10, node[i].getBoundingClientRect().y + 10];
    }

    // 建立pac-man
    var pacMan = $('.pac-man');

    // pac-man 移動
    var keyEventStatus = true;
    $('body').keydown(function (event) {

        if (!keyEventStatus) {
            return
        }
        // 定位pac-man座標 
        var pacX = pacMan.offset().left + 20;
        var pacY = pacMan.offset().top + 20;

        // 設定上下左右按鍵動作 + 校正座標
        switch (event.key) {
            case 'ArrowUp':
                if (pacMan.css('top').replace("px", "") <= 0) {
                    pacMan.css({ 'top': 300 });
                }
                pacMan.css({ 'transform': 'rotate(' + (-90) + 'deg)' }).animate({ top: "-=20" }, 100);
                pacY -= 20;
                break;
            case 'ArrowDown':
                if (pacMan.css('bottom').replace("px", "") <= 0) {
                    pacMan.css({ 'top': -20 })
                }
                pacMan.css({ 'transform': 'rotate(' + 90 + 'deg)' }).animate({ top: "+=20" }, 100);
                pacY += 20;
                break;
            case 'ArrowLeft':
                if (pacMan.css('left').replace("px", "") <= 0) {
                    pacMan.css({ 'left': 380 })
                }
                pacMan.css({ 'transform': 'rotateY(' + 180 + 'deg)' }).animate({ left: "-=20" }, 100);
                pacX -= 20;
                break;
            case 'ArrowRight':
                if (pacMan.css('right').replace("px", "") <= 0) {
                    pacMan.css({ 'left': -20 })
                }
                pacMan.css({ 'transform': 'rotate(' + 0 + 'deg)' }).animate({ left: "+=20" }, 100);
                pacX += 20;
                break;
        }

        // pac-man吃點點
        for (i = 0; i < node.length; i++) {
            if (Math.abs(pacX - dot['dot-' + i][0]) <= 20 && Math.abs(pacY - dot['dot-' + i][1]) <= 20) {
                node[i].remove();
                eatAllDot();
            }
        }

        // 檢查是否都吃完了
        function eatAllDot() {
            if ($('.dot').length == 0) {
                $('.gameover').html('You ate all dots!')
            } else if ($('.dot').length > 1) {
                $('.gameover').html('You still have ' + $('.dot').length + ' dots to eat.')
            } else {
                $('.gameover').html('You still have ' + $('.dot').length + ' dot to eat.')
            }
        }

        // 限制連續觸發
        keyEventStatus = false;
        setTimeout((function () { keyEventStatus = true; }), 100)
    })

})