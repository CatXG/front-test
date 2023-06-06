window.addEventListener('load',function(){
    sendRequestmonth();
    sendRequestweek()
})

//获取后台月份数据接口
function sendRequestmonth(){
    var baseUrl = 'https://edu.telking.com/api/?type='
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            var obj = JSON.parse(xhttp.responseText)
            if(obj.code == 200){
                var xaxis = obj.data.xAxis;
                var series = obj.data.series;
                initLine(xaxis,series)
            }else{
                alert("获取接口数据失败!")
            }
        }
    }
    xhttp.open('GET',baseUrl+'month',true)
    xhttp.send()
}

function initLine(xaxis,series){
    var myChart = echarts.init(document.getElementById('midbody'));
    var option = {
        title: {
          text: '曲线图数据展示',
          x:'center'
        },
        xAxis: {
          data: xaxis
        },
        yAxis: {},
        series: [
          {
            type: 'line',
            data: series,
            smooth: true,
            label:{
                show: true,
                position: 'top',
                textStyle: {
                    fontSize: 10
                }
            },
            areaStyle:{
                color: '#aaccf3',
                opacity: 0.5
            }
          }
        ]
      };
    myChart.setOption(option)
}

//获取后台周数据接口
function sendRequestweek(){
    var baseUrl = 'https://edu.telking.com/api/?type='
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            var obj = JSON.parse(xhttp.responseText)
            if(obj.code == 200){
                var xaxis = obj.data.xAxis;
                var series = obj.data.series;
                initWeekEchart(xaxis,series);
            }else{
                alert("获取接口数据失败!")
            }
        }
    }
    xhttp.open('GET',baseUrl+'week',true)
    xhttp.send()
}

function initWeekEchart(xaxis,series){
    var myChartpie = echarts.init(document.getElementById('midfpie'));
    var myChartbar = echarts.init(document.getElementById('midfbar'));

    var data = changedata_pie(xaxis,series);

    //设置图表基础信息
    var optionpie = {
        title: {
            text: '饼图数据展示',
            x:'center'
          },
        series: [
          {
            type: 'pie',
            data: data,
          }
        ]
      };
    var optionbar = {
        title: {
            text: '柱状图数据展示',
            x:'center'
          },
        xAxis: {
            data: xaxis
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      };

    myChartpie.setOption(optionpie);
    myChartbar.setOption(optionbar);
}

//将数据转成饼图适形式
function changedata_pie(xaxis,series){
    var data = [];
    if(xaxis.length == series.length){
        for (let i = 0; i < series.length; i++) {
            let temp = {value:series[i],name:xaxis[i]}
            data.push(temp);
        }
    }
    return data;
}