/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
modelList = new Array(
        {src:"#akm",position: {x:0,y:0,z:-3},rotation:{x:0,y:00,z:0} ,scale:{x:0.005,y:0.005,z:0.005},onclick:'clicked()'},
        {src:"#m416",position: {x:0.5,y:0,z:-3},rotation:{x:0,y:270,z:0} ,scale:{x:0.015,y:0.015,z:0.015},onclick:'clicked()'},
        {src:"#m4a1",position: {x:0,y:0,z:-3},rotation:{x:0,y:90,z:0} ,scale:{x:0.575,y:0.575,z:0.575},onclick:'clicked()'},
        {src:"#scar",position: {x:0,y:0,z:-3},rotation:{x:0,y:180,z:0} ,scale:{x:0.015,y:0.015,z:0.015},onclick:'clicked()'},
        {src:"#qbz",position: {x:0,y:0,z:-3},rotation:{x:0,y:90,z:0} ,scale:{x:0.0375,y:0.0375,z:0.0375},onclick:'clicked()'},
        {src:"#ump9",position: {x:0,y:0,z:-3},rotation:{x:0,y:0,z:0} ,scale:{x:0.01,y:0.01,z:0.01},onclick:'clicked()'},
        /**
        {src:"#m24",position: {x:0.5,y:0,z:-3},rotation:{x:0,y:-90,z:0} ,scale:{x:0.04,y:0.04,z:0.04},onclick:'clicked()'},
        {src:"#vss",position: {x:0,y:-1,z:-3},rotation:{x:0,y:0,z:0} ,scale:{x:0.002,y:0.002,z:0.002},onclick:'clicked()'}
        **/
               
    );
infoList = new Array(
        {text_title:"AKM",text_type:"步枪",text_content:"伤害高,后坐力较高,连发时很飘"},
        {text_title:"M416",text_type:"步枪",text_content:"裸枪后坐力大、冲击力小，满配后稳定性高、后坐力小"},
        {text_title:"M16A4",text_type:"步枪",text_content:"射速快，后坐力较低，子弹初速高，下坠较慢"},
        {text_title:"SCAR-L",text_type:"步枪",text_content:"伤害较，射程较近，射击后坐力小"},
        {text_title:"QBZ",text_type:"步枪",text_content:"射速稍慢、后坐力小"},
        {text_title:"UPM9",text_type:"冲锋枪",text_content:"射速慢，伤害高"}
        /**
        {text_title:"M24",text_type:"狙击枪",text_content:"伤害，性价比最高的拉栓狙，子弹容易获取"},
        {text_title:"VSS",text_type:"狙击枪",text_content:"声音小难被察觉，子弹初速极慢，伤害非常低，射程距离近"}
        **/
    );
videoList = new Array(
    "#video_akm","#video_m416","#video_m4a1","#video_scar","#video_qbz","#video_ump9");
    
id=0;
fin = true;
terminal="";
funct="";
etat_rotate=false;

var isPC = function(){    
    if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        terminal="mobile";
    }
    else{
        terminal="pc";
    }
    protection();
    
};


var protection = function(){
/**
    if(terminal==="pc"){
        Source=document.body.firstChild.data;
        document.open();
        document.close();
        document.body.innerHTML=Source;
    };
**/
};

var next = function(){    
    if(id+1>modelList.length-1){
     alert("it is the first");
    }
    else{
        var Model = document.getElementById('Model');
        var Title = document.getElementById('Title');
        var Type = document.getElementById('Type');
        var Content = document.getElementById('Content');
        var Video = document.querySelector("a-video");
        id=id+1; 
        Model.setAttribute('gltf-model',modelList[id].src);
        for(i=1;i<=Object.keys(modelList[id]).length-1;i++){
          Model.setAttribute(Object.keys(modelList[id])[i],Object.values(modelList[id])[i]);       
        }
        Title.innerHTML=infoList[id].text_title;
        Type.innerHTML=infoList[id].text_type;
        Content.innerHTML=infoList[id].text_content;
        Video.setAttribute("src",videoList[id]);
        /**S
        Title.setAttribute("text",infoList[id].text_title);
        Type.setAttribute("text",infoList[id].text_type);
        Content.setAttribute("text",infoList[id].text_content);
        **/
    }
};
var last = function(){
    if(id-1<0){
      alert("it is the last");
    }
    else{
        var Model = document.getElementById('Model');
        var Title = document.getElementById('Title');
        var Type = document.getElementById('Type');
        var Content = document.getElementById('Content');
        var Video = document.getElementById("video");
        id=id-1; 
        Model.setAttribute('gltf-model',modelList[id].src);
        for(i=1;i<=Object.keys(modelList[id]).length-1;i++){
          Model.setAttribute(Object.keys(modelList[id])[i],Object.values(modelList[id])[i]);       
        }
        Title.innerHTML=infoList[id].text_title;
        Type.innerHTML=infoList[id].text_type;
        Content.innerHTML=infoList[id].text_content;
        Video.setAttribute("src",videoList[id]);
        /**
        Title.setAttribute("text",infoList[id].text_title);
        Type.setAttribute("text",infoList[id].text_type);
        Content.setAttribute("text",infoList[id].text_content);
       **/
    }
};
var auto_rotate = function(){
    etat_rotate=!etat_rotate;
    if(terminal==="mobile")
        funct =  "touchend";
    else
        funct =  "mouseup";
    if(etat_rotate){
        ID=setInterval(function() { 
            var Model = document.getElementById('Model');
            rotation = Model.getAttribute("rotation");
            Model.setAttribute("rotation",{x:rotation.x,y:rotation.y+1,z:rotation.z});},10);
    }
    else
        clearInterval(ID);    
};

var rotate = function(){
    if(terminal==="mobile")
        funct =  "touchend";
    else
        funct =  "mouseup";
    
    ID=setInterval(function() { 
        var Model = document.getElementById('Model');
        rotation = Model.getAttribute("rotation");
        Model.setAttribute("rotation",{x:rotation.x,y:rotation.y+1,z:rotation.z});},10);
        addEventListener(funct,function(){
        clearInterval(ID);
    });
};

var enlarge = function(){
    var Model = document.getElementById('Model');
    size = Model.getAttribute("scale");
    Model.setAttribute('scale', {x:size.x*1.1,y:size.y*1.1,z:size.z*1.1});
};

var reduce = function(){
    var Model = document.getElementById('Model');
    size = Model.getAttribute("scale");
    Model.setAttribute('scale', {x:size.x/1.1,y:size.y/1.1,z:size.z/1.1});
};

var action = function(){
    zoom_video();
};

var zoom_video = function(){
    var Video = document.getElementById("video");
    var Camera = document.getElementByI
    if(terminal==="mobile")
        funct =  "touchend";
    else
        funct =  "mouseup";
    
    
    pos_video = Video.getAtrriute("position");
};