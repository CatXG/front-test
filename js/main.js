//事件触发函数
    // 点击导航栏方法
function clinav(num){
    //利用DOM获取对应ID
    let navslider = document.getElementById("slider")
    let newlen = 100*(num-1) 
    navslider.style.left = newlen + 'px'
    navslider.classList.add("navboxclick")
}

//网页加载成功执行函数
window.addEventListener('load',function(){
    monav(); 
    makelicircle();
})

 //鼠标在导航栏移动，滑块移动
 function monav(){
    //获取导航元素
    let slipernav = document.querySelector("#thenav")
    let sliperAll = document.querySelectorAll("#thenav>li")

    //获取下方滑块元素
    let navbox = document.getElementById("navbox")

    //给所有导航栏项加index属性
    for(let i=0; i < sliperAll.length; i++){
        sliperAll[i].setAttribute("data-index",i)
    }
    //利用DOM获取对应ID
    slipernav.addEventListener('mouseover',function(e){
        let newlen = e.target.dataset.index * 100 
        navbox.style.left = newlen + 'px'
    })
}

//自动加载对应轮播图下方指示点, 并且添加相应触发事件
function makelicircle(){
    let mtleftbox = document.querySelector(".midtop .mtleft")
    // 轮播图盒子宽度, 即ul左移的步长单位
    var boxwidth = mtleftbox.offsetWidth;
    let boxbtn_l = document.querySelector(".boxleft");
    let boxbtn_r = document.querySelector(".boxright");
    let ul = document.querySelector(".midtop .mtleft .swiperimg");
    let ol = document.querySelector(".midtop .mtleft .circle");

    // 以轮播图图片个数为限制, 生成对应的下方点
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement("li");
        //给li标签添加标识属性
        li.setAttribute('index',i);
        ol.appendChild(li); //给ol标签中插入li

        // 给每个生成的li圆点绑定点击事件
        li.addEventListener('click',function(){
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';                
            }
            this.className = 'selected'; //给当前的li增加选中样式
            //下面是点击圆点跳转图片事件
            // 获取对应li的标识,确定点击第几张图
            var index = this.getAttribute("index");
            // 点击下方圆点时,同步左右箭头切换标识
            num = index;
            circle = index;
            //缓慢动画,ul标识往左移所以步长为负值
            animate(ul,-index * boxwidth)
            
        })
    }
    ol.children[0].className = "selected"

    //轮播图左右按钮切换功能
     //克隆轮播图第一张图片放在最后一张
     let firstSwiperimg = ul.children[0].cloneNode(true);
     ul.appendChild(firstSwiperimg);
 
     //右按钮切换图片
     let num = 0;    //标记轮播图
     let circle = 0;  //标记下方圆点
 
     boxbtn_r.addEventListener('click',function(){
         // 实现无缝滚动,到最后一张(和轮播图第一种一样)时, 更改left值和num值
         if(num == ul.children.length - 1){
             ul.style.left = 0;
             num = 0;
         }
         num++;
         animate(ul,-num * boxwidth)
 
         //点击右侧按钮切换图片后,下方圆点也随之切换
         circle++;
         //当照片到最后一张克隆图时,进行判断
         circle = circle == ol.children.length ? 0 : circle

         Swiper_CircleSwitch(ol,circle)
 
     })

     boxbtn_l.addEventListener('click',function(){
        // 实现无缝滚动,到最后一张(和轮播图第一种一样)时, 更改left值和num值
        if(num == 0){
            num = ul.children.length - 1;
            ul.style.left = num * boxwidth + 'px';
        }
        num--;
        animate(ul,-num * boxwidth)

        //点击右侧按钮切换图片后,下方圆点也随之切换
        circle--;
        //当照片到最后一张克隆图时,进行判断
        
        circle = circle < 0 ? ol.children.length - 1 : 0

        //调用函数
        Swiper_CircleSwitch(ol,circle);

    })
    //自动播放定时器
    var timer = setInterval(function(){
        boxbtn_r.click();
    },2000)
    //鼠标经过轮播图停止自动播放
    mtleftbox.addEventListener('mouseenter',function(){
        // 清空定时器
        clearInterval(timer)
        timer = null  
    })

    mtleftbox.addEventListener('mouseleave',function(){
        // 鼠标离开轮播图重新创建定时器
        timer = setInterval(function(){
            boxbtn_r.click();
        },2000)
    })

}
//切换轮播图下方圆点样式
function Swiper_CircleSwitch(ol,circle){
    for (let n = 0; n< ol.children.length; n++) {
        ol.children[n].className = '';
    }
    ol.children[circle].className = "selected";
}

