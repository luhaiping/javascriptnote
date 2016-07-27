var Slider={
    isScrolling:false,   /*初始化动画是否进行中*/
    newClass : function(obj){
        obj = obj || {};
        if(this.isScrolling == false){
            this.init.prototype = Slider;
            this.isScrolling = true;
        }
        return new this.init(obj);  /*实例化一个对象*/
    },
    init : function(ele){
        this.slide = ele.slide;    /*最外层的div*/
        this.slideBox = ele.slideBox;  /*需要移动位置的Div*/
        this.sMain = ele.sMain;     /*4个滑动图片--nodeList */
        this.sItem = ele.sItem;  /* li */
        this.item = ele.item;   /*当前的索引*/
        this.winWidth = window.innerWidth;
        this.slideBox.style.width = this.winWidth*this.sMain.length+"px";
        for(var i=0;i<this.sMain.length;i++){
            this.sMain[i].style.width =  this.winWidth+"px";
        }
        this.bindTouch();  /*绑定触摸事件*/
    },
    bindTouch : function(){
        var _this = this;
        var startPos = null;
        this.slide.addEventListener('touchstart',function(e){
            _this.isScrolling = true;
            var startTouch = e.changedTouches[0];
            startPos = {
                x : startTouch.pageX,
                y : startTouch.pageY,
                time : +new Date()
            }
        },false)

        this.slide.addEventListener('touchmove',function(e){
            if(!_this.isScrolling){
                return;
            }
            e.preventDefault();
            var moveTouch = e.changedTouches[0];
            var movePos = {
                x : moveTouch.pageX - startPos.x,
                y : moveTouch.pageY - startPos.y
            }

            _this.isScrolling = Math.abs(movePos.x) > Math.abs(movePos.y);
            if(_this.isScrolling){
                var moveOffset = movePos.x-_this.item*_this.winWidth;
                _this.slideBox.style.webkitTransform = "translate3d("+moveOffset+"px,0,0)";
                _this.slideBox.style.webkitTransition="all .6s ease-out";
            }


        },false)
        this.slide.addEventListener('touchend',function(e){
            if(!_this.isScrolling){
                return ;
            }
            var duration = +new Date() - startPos.time;
            var endTouch = e.changedTouches[0];
            var endPos = {
                x : endTouch.pageX - startPos.x,
                y : endTouch.pageY - startPos.y
            }

            if(duration>100){  /*间隔事件*/
                if(Math.abs(endPos.x)>10 ){  /*两次滑动的距离>10*/
                    if(endPos.x>0){
                        if(_this.item == 0){
                            _this.isScrolling = false;
                            _this.objAnimation();/*回弹到第一张*/
                        }else{
                            _this.prevPage(); /*往左*/
                        }

                    }else if(endPos.x<0){
                        if(_this.item ==_this.sMain.length-1){
                            _this.isScrolling = false;
                            _this.objAnimation(); /*回调到最后一张*/
                        }else{
                            _this.nextPage();  /*往右*/
                        }

                    }else{
                        _this.isScrolling = false;
                    }
                }
            }


        },false)
    },
    nextPage : function(){
        if(this.item==this.sMain.length-1){
            return;
        }
        this.item++;
        this.objAnimation(this.item); /*处理动画*/
        this.curItem(this.item); /*显示当前索引值*/
    },
    prevPage : function(){
        if(this.item == 0){
            return;
        }
        this.item--;
        this.objAnimation();
        this.curItem();
    },
    curItem : function(){
        for(var i= 0 ; i<this.sItem.length; i++){
            this.sItem[i].className = "";
        }
        this.sItem[this.item].className = "cur";
    },
    objAnimation : function(){
        var setEq = -(this.item*this.winWidth) + "px";
        this.slideBox.style.webkitTransition = "all .6s ease-out";
        this.slideBox.style.webkitTransform = "translate3d("+setEq+",0,0)";/*用3D变形来开启GPU加速*/
    }
};

var obj={
    slide : document.querySelector(".slide"),
    slideBox: document.querySelector('.slide-box'),
    sMain : document.querySelectorAll('.sMain'),
    sItem : document.querySelector('.slide-item').getElementsByTagName('li'),
    item : 0
}

Slider.newClass(obj);



