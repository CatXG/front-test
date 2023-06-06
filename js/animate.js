//缓慢移动动画函数
function animate(obj, target, callback) {

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 计算步长值： 步长公式：(目标值 - 现在的位置) / 10
        var step = (target - obj.offsetLeft) / 10;
        // 避免步长出现小数，对其取整。正值和负值取整不同
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}