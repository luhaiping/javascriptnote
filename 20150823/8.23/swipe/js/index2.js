var swiper = new Swiper('.swiper-container', {
    pagination:false,
    direction: 'vertical'
});
$(document).on('touchmove', function(a) {
    a.preventDefault()
});
$(function(){
    var aImg = $(".aImg");
    slideImg();
    function slideImg(){
        var index = 0;
        var g = 0;
        aImg.on("touchstart",function(args){
                var startPosY = args.originalEvent.changedTouches[0].pageY;
                index = $(this).index();
                $(this).on('touchend.drag', function(a) {
                    var endPosY = a.originalEvent.changedTouches[0].pageY;
                    if (endPosY- startPosY < 0){
                        g = index == aImg.length - 1 ? 0 : index+1 ;
                        aImg.eq(g).css('transform', 'rotateX(-50deg)');
                        aImg.eq(g).show().css('opacity', 0);
                        aImg.eq(index).css('transition', 'all 1s linear');
                        setTimeout(function() {
                            aImg.eq(index).css('transform', 'rotateX(90deg)');
                            aImg.eq(index).css('opacity', 0);
                            aImg.eq(g).css('transition', 'all 1s linear');
                            aImg.eq(g).css('transform', 'rotateX(0deg)');
                            aImg.eq(g).css('opacity', 1)
                        }, 100)
                    } else if (endPosY- startPosY > 0) {
                        g = index == 0 ? aImg.length - 1 : index - 1;
                            aImg.eq(g).css('transform', 'rotateX(90deg)');
                            aImg.eq(g).show().css('opacity', 0);
                            aImg.eq(index).css('transition', 'all 1s linear');
                            setTimeout(function() {
                                aImg.eq(index).css({'transform':'rotateX(-50deg)','opacity': 0});
                                aImg.eq(g).css('transition', 'all 1s linear');
                                aImg.eq(g).css('transform', 'rotateX(0deg)');
                                aImg.eq(g).css('opacity', 1)
                            }, 100)

                    }
                    $(this).off('.drag');
                })

        })

        aImg.on('webkitTransitionEnd', function(a) {

            if (!aImg.is(a.target)) {
                return
            }
            resetFn();
            m.inAn(g);
            m.outAn(index)
        });

        function resetFn() {
            flag = true;
            aImg.css('transition', '');
            aImg.css('transform', '');
            aImg.eq(g).siblings().hide()
        }
    }

    var m = {
        outAn: function(a) {
            var img = aImg.eq(a).find('img');
            img.eq(0).css('transform', 'scale(1.5)');
            img.eq(1).css('transform', 'translate(0,200px)');
            img.eq(1).css('opacity', 0);
            img.eq(2).hide();
            img.eq(2).css('-webkit-animation', '')
        },
        inAn: function(a) {
            var img = aImg.eq(a).find('img');
            img.eq(0).css('transform', 'scale(1)');
            img.eq(0).css('transition', 'all 1s');
            img.eq(1).css('transform', 'translate(0,0)');
            img.eq(1).css('opacity', 1);
            img.eq(1).css('transition', 'all 1s .5s');
            img.eq(1).on('webkitTransitionEnd', function() {
                img.eq(2).show();
                img.eq(2).css('-webkit-animation', 'title 2s infinite')
            });
        }
    };



})

