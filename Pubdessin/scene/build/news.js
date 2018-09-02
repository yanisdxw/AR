/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var modelList = new Array(
        {src:"#akm",position: {x:0,y:-0.5,z:-3},rotation:{x:0,y:00,z:0} ,scale:{x:0.02,y:0.02,z:0.02},onclick:'clicked()'},
        {src:"#m416",position: {x:1,y:0.5,z:-3},rotation:{x:0,y:270,z:0} ,scale:{x:0.06,y:0.06,z:0.06},onclick:'clicked()'},
        {src:"#m4a1",position: {x:-1,y:0,z:-3},rotation:{x:0,y:90,z:0} ,scale:{x:2.3,y:2.3,z:2.3},onclick:'clicked()'},
        {src:"#scar",position: {x:0,y:-0.5,z:-3},rotation:{x:0,y:180,z:0} ,scale:{x:0.06,y:0.06,z:0.06},onclick:'clicked()'},
        {src:"#aug",position: {x:0,y:0,z:-3},rotation:{x:0,y:90,z:0} ,scale:{x:0.15,y:0.15,z:0.15},onclick:'clicked()'},
        {src:"#ump9",position: {x:-0.5,y:-0.5,z:-3},rotation:{x:0,y:0,z:0} ,scale:{x:0.04,y:0.04,z:0.04},onclick:'clicked()'},
        {src:"#m24",position: {x:0.5,y:0,z:-3},rotation:{x:0,y:-90,z:0} ,scale:{x:0.04,y:0.04,z:0.04},onclick:'clicked()'},
        {src:"#vss",position: {x:0,y:-1,z:-3},rotation:{x:0,y:0,z:0} ,scale:{x:0.002,y:0.002,z:0.002},onclick:'clicked()'}
    );
var infoList = new Array(
        {text_title:"value:AKM",text_type:"value:步枪",text_content:"value:伤害高,后坐力较高,连发时很飘"},
        {text_title:"value:M416",text_type:"value:步枪",text_content:"value:裸枪后坐力大、冲击力小，满配后稳定性高、后坐力小"},
        {text_title:"value:M16A4",text_type:"value:步枪",text_content:"value:射速快，后坐力较低，子弹初速高，下坠较慢"},
        {text_title:"value:SCAR-L",text_type:"value:步枪",text_content:"value:伤害较，射程较近，射击后坐力小"},
        {text_title:"value:AUG",text_type:"value:步枪",text_content:"value:射速高、后坐力小,子弹下坠明显"},
        {text_title:"value:UPM9",text_type:"value:冲锋枪",text_content:"value:射速慢，伤害高"},
        {text_title:"value:M24",text_type:"value:狙击枪",text_content:"value:伤害，性价比最高的拉栓狙，子弹容易获取"},
        {text_title:"value:VSS",text_type:"value:狙击枪",text_content:"value:声音小难被察觉，子弹初速极慢，伤害非常低，射程距离近"}
    );

id=0;
fin = true;
var isPC = function(){    
    if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        init();
    }
    else{
        Source=document.body.firstChild.data;
        document.open();
        document.close();
        document.body.innerHTML=Source;
    };
};

var next = function(){    
    if(id+1>modelList.length-1){
      console.log("it is the last");
    }
    else{
        var Model = document.getElementById('Model');
        var Title = document.getElementById('Title');
        var Type = document.getElementById('Type');
        var Content = document.getElementById('Content');
        id=id+1; 
        Model.setAttribute('gltf-model',modelList[id].src);
        for(i=1;i<=Object.keys(modelList[id]).length-1;i++){
          Model.setAttribute(Object.keys(modelList[id])[i],Object.values(modelList[id])[i]);       
        }
        Title.setAttribute("text",infoList[id].text_title);
        Type.setAttribute("text",infoList[id].text_type);
        Content.setAttribute("text",infoList[id].text_content);
    }
};
var last = function(){
    if(id-1<0){
      console.log("it is the last");
    }
    else{
        var Model = document.getElementById('Model');
        var Title = document.getElementById('Title');
        var Type = document.getElementById('Type');
        var Content = document.getElementById('Content');
        id=id-1; 
        Model.setAttribute('gltf-model',modelList[id].src);
        for(i=1;i<=Object.keys(modelList[id]).length-1;i++){
          Model.setAttribute(Object.keys(modelList[id])[i],Object.values(modelList[id])[i]);       
        }
        Title.setAttribute("text",infoList[id].text_title);
        Type.setAttribute("text",infoList[id].text_type);
        Content.setAttribute("text",infoList[id].text_content);
       
    }
};

var rotate = function(){
    ID=setInterval(function() { 
        var Model = document.getElementById('Model');
        rotation = Model.getAttribute("rotation");
        Model.setAttribute("rotation",{x:rotation.x,y:rotation.y+1,z:rotation.z});},10);
    addEventListener("mouseup",function(){
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
