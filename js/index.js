var myCanvas2 = document.getElementById("canvas2");
myCanvas2.width = 600;
myCanvas2.height = 600;
var context = myCanvas2.getContext("2d");

var platform={
	data:[
        {
            "time": 5000,
            "value":"0.1",
            "color": "#66CCCC",
            "title": "A"
        },{
            "time": 5000,
            "value":"0.2",
            "color": "#0000FF",
            "title": "B"
        },{
            "time": 6000,
            "value":"0.2",
            "color": "#FF33CC",
            "title": "C"
        },{
            "time": 10000,
            "value":"0.1",
            "color": "#663333",
            "title": "D"
        },{
            "time": 5000,
            "value":"0.3",
            "color": "#009966",
            "title": "E"
        },{
            "time": 5000,
            "value":"0.1",
            "color": "#663366",
            "title": "F"
        }
    ],
    totleTime:36000,//总时间
    degArr:[],
    degBegin:[],
	init: function(){
        this.initParm();
	},
    initParm: function(){
        for(var i=0;i<this.data.length;i++){
            this.degArr.push(this.data[i].value*360);
            this.degBegin.push(0);
        }
        this.draw(this.degArr);
    },
	draw: function(degArr){
        var myCanvas2 = document.getElementById("canvas2");
        myCanvas2.width = 300;
        myCanvas2.height = 300;
        var angle = 0.3*Math.PI;
        var context = myCanvas2.getContext("2d");
        context.beginPath()
        context.arc(150,150,100,0,Math.PI*2,false);
        context.closePath()
        context.strokeStyle="#0000ff";
        context.fillStyle = '#ffffff';
        context.fill();
        context.stroke();
        this.start(degArr);
	},
    start:function(degArr){
        for(var i=0;i<degArr.length;i++){
            if(i==0){
                var interval1 = setInterval(function(){
                    if(platform.degBegin[0]>degArr[0]){
                        platform.degBegin[0]=0;
                        clearInterval(interval1);
                    }
                    platform.begindeg(degArr,0);
                },this.data[0].time/degArr[0]);
            }else{
                var waitTime = 0;
                for(var j=0;j<i;j++){
                    waitTime=waitTime+platform.data[j].time;
                }
                var tempi=i;
                (function(i){
                    setTimeout(function(){
                        platform.degBegin[i]=0;
                        var interval2 = setInterval(function(){
                        if(platform.degBegin[i]>degArr[i]){
                            platform.degBegin[i]=0;
                            clearInterval(interval2);
                        }
                        platform.begindeg(degArr,i);
                        },platform.data[i].time/degArr[i]);
                    },waitTime);
                })(i);
            }
       }
    },
    begindeg:function(degArr,index){
        var dushuStart = 0;
        var tempDeg = this.degBegin[index];
        var dushuEnd = Math.PI * (this.degBegin[index] / 180);
        for (var i = 0; i < index; i++) {
            dushuStart = dushuStart + Math.PI * (degArr[i] / 180);
            dushuEnd = dushuEnd + Math.PI * (degArr[i] / 180);
        }
        ;
        for (var i = 0; i < index; i++) {
            tempDeg = tempDeg + degArr[i];
        }
        document.querySelector(".linebox").style.transform = "rotate("
                + tempDeg + "deg)";
        context.beginPath()
        context.sector(150, 150, 100, dushuStart, dushuEnd, false);
        context.fillStyle = this.data[index].color;
        context.fill()
        context.closePath()
        this.degBegin[index] += 1;
    }
}
CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
    // 初始保存
    this.save();
    // 位移到目标点
    this.translate(x, y);
    this.beginPath();
    // 画出圆弧
    this.arc(0,0,radius,sDeg, eDeg);
    // 再次保存以备旋转
    this.save();
    // 旋转至起始角度
    this.rotate(eDeg);
    // 移动到终点，准备连接终点与圆心
    this.moveTo(radius,0);
    // 连接到圆心
    this.lineTo(0,0);
    // 还原
    this.restore();
    // 旋转至起点角度
    this.rotate(sDeg);
    // 从圆心连接到起点
    this.lineTo(radius,0);
    this.closePath();
    // 还原到最初保存的状态
    this.restore();
    return this;
}
platform.init();
