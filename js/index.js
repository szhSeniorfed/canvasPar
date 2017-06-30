var myCanvas2 = document.getElementById("canvas2");
myCanvas2.width = 600;
myCanvas2.height = 600;
var context = myCanvas2.getContext("2d");

var platform={
	data:[{
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
    }],
    totleTime:36000,//总时间
    aDegBegin:0,
    bDegBegin:0,
    ccDegBegin:0,
    ddDegBegin:0,
    eeDegBegin:0,
    sfDegBegin:0,
	init: function(){
        this.initParm();

	},
    initParm: function(){
        var time = this.totleTime;//毫秒
        //每个加载的时间 毫秒
        var a = this.data[0].time;
        var b = this.data[1].time;;
        var c = this.data[2].time;;
        var d = this.data[3].time;;
        var e = this.data[4].time;;
        var f = this.data[5].time;;
        //所占的百分比
        var Aper = a/time;
        var Bper = b/time;
        var Cper = c/time;
        var Dper = d/time;
        var Eper = e/time;
        var Fper = f/time;
        //每个所占的角度
        var aDeg = 360*Aper;
        var bDeg = 360*Bper;
        var cDeg = 360*Cper;
        var dDeg = 360*Dper;
        var eDeg = 360*Eper;
        var fDeg = 360*Fper;
        this.draw(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg);
    },
	draw: function(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg){
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
        this.start(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg);
	},
    start:function(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg){
        var interval1 = setInterval(function(){
            if(platform.aDegBegin>aDeg){
                clearInterval(interval1);
            }
            platform.aBegin(aDeg);
        },this.data[0].time/aDeg);

        setTimeout(function(){
            var interval2 = setInterval(function(){
                platform.bBegin(aDeg,bDeg);
                if(platform.bDegBegin>bDeg){
                    clearInterval(interval2);
                }
            },platform.data[1].time/bDeg);
        },platform.data[0].time);

        var waitc=this.data[0].time+platform.data[1].time;
        setTimeout(function(){
            var interval3 = setInterval(function(){
                platform.cbegin(aDeg,bDeg,cDeg);
                if(platform.ccDegBegin>cDeg){
                    clearInterval(interval3);
                }
            },platform.data[2].time/cDeg);
        },waitc);

        var waitd=waitc+platform.data[2].time;
        setTimeout(function(){
             var interval4 = setInterval(function(){
                platform.dbegin(aDeg,bDeg,cDeg,dDeg);
                if(platform.ddDegBegin>dDeg){
                    clearInterval(interval4);
                }
            },platform.data[3].time/dDeg);
        },waitd);

        var waite=waitd+platform.data[3].time;
        setTimeout(function(){
            var interval5=setInterval(function(){
                platform.ebegin(aDeg,bDeg,cDeg,dDeg,eDeg);
                if(platform.eeDegBegin>eDeg){
                    clearInterval(interval5);
                }
            },platform.data[4].time/eDeg);
        },waite);
        var waitf=platform.data[4].time+waite;
        setTimeout(function(){
           var interval6 = setInterval(function(){
                platform.fbegin(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg);
                if(this.sfDegBegin>fDeg){
                    clearInterval(interval6);
                }
            },platform.data[5].time/fDeg);
        },waitf);
    },
    aBegin:function(aDeg){
        if(this.aDegBegin>aDeg){
            return false
        }
        context.beginPath()
        context.sector(150,150,100,0,Math.PI*(this.aDegBegin/180),false);
        context.fillStyle = '#66CCCC';
        
        context.closePath()
        context.fill()
        this.aDegBegin+=1;
    },
    bBegin:function(aDeg,bDeg){
        if(this.bDegBegin>bDeg){
            return false;
        }
        context.beginPath()
        context.sector(150,150,100,Math.PI*(aDeg/180),Math.PI*(aDeg/180)+Math.PI*(this.bDegBegin/180),false);
        context.fillStyle = '#0000FF';
        
        context.closePath()
        context.fill()
        this.bDegBegin+=1;
    },
    cbegin:function(aDeg,bDeg,cDeg){
        if(this.ccDegBegin>cDeg){
            return false
        }
        context.beginPath()
        context.sector(150,150,100,Math.PI*(aDeg/180)+Math.PI*(bDeg/180),Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(this.ccDegBegin/180),false);
        context.fillStyle = '#FF33CC';

        context.fill()
        context.closePath()
        this.ccDegBegin+=1
    },
    dbegin:function(aDeg,bDeg,cDeg,dDeg){
        if(this.ddDegBegin>dDeg){
            return false;
        }
        context.beginPath()
        context.sector(150,150,100,Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180),Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180)+Math.PI*(this.ddDegBegin/180),false);
        context.fillStyle = '#663333';
        context.fill()
        context.closePath()
        this.ddDegBegin+=1;
    },
    ebegin:function(aDeg,bDeg,cDeg,dDeg,eDeg){
        if(this.eeDegBegin>eDeg){
            return false
        }
        context.beginPath()
        context.sector(150,150,100,Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180)+Math.PI*(dDeg/180),Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180)+Math.PI*(dDeg/180)+Math.PI*(this.eeDegBegin/180),false);
        context.fillStyle = '#009966';
        context.fill()
        context.closePath()
        this.eeDegBegin+=1;
    },
    fbegin:function(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg){
        if(this.sfDegBegin>fDeg){
            return false
        }
        context.beginPath()
        context.sector(150,150,100,Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180)+Math.PI*(dDeg/180)+Math.PI*(eDeg/180),Math.PI*(aDeg/180)+Math.PI*(bDeg/180)+Math.PI*(cDeg/180)+Math.PI*(dDeg/180)+Math.PI*(eDeg/180)+Math.PI*(this.sfDegBegin/180),false);
        context.fillStyle = '#663366';
        context.fill()
        context.closePath()
        this.sfDegBegin+=1;
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
