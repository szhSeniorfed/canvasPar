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
        this.initTable(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg);
    },
    //页面初始化的时候，渲染表格数据
    initTable: function(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg){
        var classListColor = ['aColor','bColor','cColor','dColor','eColor','fColor'];
        var deg = [aDeg,bDeg,cDeg,dDeg,eDeg,fDeg];
        var data = this.data;
        var item1 = document.querySelector("#tab1 table");
        var item2 = document.querySelector("#tab2 table");
        var alltime = document.querySelectorAll(".topPar .rightBox .allTime");
        var strTemp1="";
        var strTemp2="";
        for (var i =0 ;i<data.length;i++) {
            strTemp1+='<tr><td class='+classListColor[i]+'>'+data[i].title+'</td><td>'+data[i].value*100+'%</td><td>'+data[i].time/1000+'</td>'
        };
        for (var i =0 ;i<data.length;i++) {
            strTemp2+='<tr><td class='+classListColor[i]+'>'+data[i].title+'</td><td id=timePA'+i+'>'+data[i].time/1000+'</td><td id=timePS'+i+'>'+0+'</td>'
        };
        item1.innerHTML=strTemp1;
        alltime.innerHTML = this.totleTime/1000;
        item2.innerHTML=strTemp2;

        // var waitTime =0
        // for (var i =0 ;i<data.length;i++) {
        //     var itemAllId = "timePA"+i;
        //     var itemShengId = "timePS"+i;
        //     var itemAll = document.getElementById(itemAllId);//总时间
        //     var itemSheng = document.getElementById(itemShengId);//剩余时间
        //     var dataTimeTempAll = this.data[i].time/1000;
        //     setTimeout(function(){
        //         platform.changeTime(itemAll,itemSheng,dataTimeTempAll);
        //     },waitTime);
        //     waitTime = waitTime+this.data[i].time;
        // }
        this.changeTime(document.getElementById("timePA0"),document.getElementById("timePS0"),data[0].time/1000);
        setTimeout(function(){
            platform.changeTime(document.getElementById("timePA1"),document.getElementById("timePS1"),data[1].time/1000);
        },data[0].time);
        setTimeout(function(){
            platform.changeTime(document.getElementById("timePA2"),document.getElementById("timePS2"),data[2].time/1000);
        },data[0].time+data[1].time);
        setTimeout(function(){
            platform.changeTime(document.getElementById("timePA3"),document.getElementById("timePS3"),data[3].time/1000);
        },data[0].time+data[1].time+data[2].time);
        setTimeout(function(){
            platform.changeTime(document.getElementById("timePA4"),document.getElementById("timePS4"),data[4].time/1000);
        },data[0].time+data[1].time+data[2].time+data[3].time);
        setTimeout(function(){
            platform.changeTime(document.getElementById("timePA5"),document.getElementById("timePS5"),data[5].time/1000);
        },data[0].time+data[1].time+data[2].time+data[3].time+data[4].time);
    },
    changeTime: function(itemAll,itemSheng,dataTimeTempAll){
        //从第一个开始，每个的总时间慢慢减少，剩余时间慢慢增加
            
        var dataTimeSheng = 0;

        var timer = setInterval(function(){
            if (!dataTimeTempAll) {
                clearInterval(timer);
                return false;
            }
            dataTimeTempAll=dataTimeTempAll-1;
            dataTimeSheng=dataTimeSheng+1;
            itemAll.innerHTML = dataTimeTempAll;
            itemSheng.innerHTML = dataTimeSheng;
        },1000);
    },
	draw: function(aDeg,bDeg,cDeg,dDeg,eDeg,fDeg){
		var myCanvas1 = document.getElementById("canvas1");
		myCanvas1.width = 300;
        myCanvas1.height = 300;
		var angle = 0.3*Math.PI;
		var ctx = myCanvas1.getContext("2d");

		var tempAngle = 0;
        for(var i=0;i<this.data.length;i++){
            // 开始绘制新状态的扇形
            ctx.beginPath();
            ctx.moveTo(150, 150);
            ctx.fillStyle = this.data[i].color;
            var angle = this.data[i].value*360;
            var startAngle = tempAngle*Math.PI/180; 
            var endAngle = (tempAngle + angle)*Math.PI/180;
            ctx.arc(150, 150, 100, startAngle, endAngle);
            ctx.fill();
            tempAngle+=angle;
        }

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
       // platform.aBegin(aDeg);
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
