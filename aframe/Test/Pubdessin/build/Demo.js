/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var isPC = function(){
    window.location.href = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "https://www.pubdessin.com/guangjiaohui/" :  "http://www.pubdessin.com/notmobile";
};

var more = function(){
    Model = document.getElementsByClassName("model");
    for(i=0;i<=Model.length;i++){
        size = Model[i].getAttribute("scale");
        Model[i].setAttribute('scale', {x:size.x*1.1,y:size.y*1.1,z:size.z*1.1});
    };
};

var less = function(){
    Model = document.getElementsByClassName("model");
    for(i=0;i<=Model.length;i++){
        size = Model[i].getAttribute("scale");
        Model[i].setAttribute('scale', {x:size.x*1/1.1,y:size.y*1/1.1,z:size.z*1/1.1});
    };
};

var next = function(){
    Marker = document.getElementsByClassName("marker");
    for(i=0;i<=Marker.length;i++){  
        Marker[i].removeChild( Marker[i].querySelector("a-entity"));
        var El = document.createElement('a-entity'); 
        El.setAttribute('gltf-model', '#drone'); 
        El.setAttribute('id', 'drone1'); 
        El.setAttribute('onclick','clicked(this)'); 
        El.setAttribute('scale', {x:1,y:1,z:1});
        Marker[i].appendChild(El);
    }
    //document.querySelector('a-scene').contentWindow.location.reload(true);
};

var clicked = function(obj){    
    if(obj.is('clicked')){
       var parent = obj.parentNode;
       parent.removeChild(parent.querySelector('a-text'));
       obj.pause();
       obj.removeState('clicked');
       console.log('unclicked');   
    }
    else{
        var parent = obj.parentNode;
        var Asset = document.createElement('a-text');  
        obj.addState('clicked');
        obj.play();
        Asset.setAttribute('value','广交会 我来了');
        //Asset.setAttribute('color','black');
        Asset.setAttribute('font','Pubdessin/src/text.fnt');
        Asset.setAttribute('fontImage','Pubdessin/src/text.png');
        Asset.setAttribute('position',{x:0.5,y:1,z:0});
        parent.appendChild(Asset);
        obj.setAttribute('animation-mixer','');
        console.log('clicked');     
    } 
};

