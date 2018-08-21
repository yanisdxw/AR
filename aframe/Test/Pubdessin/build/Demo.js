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
    Model = document.getElementsByClassName("model");
    for(i=0;i<=Model.length;i++){
        Model[i].setAttribute('gltf-model', "#drone"); 
        Model[i].setAttribute('scale', {x:1,y:1,z:1}); 
    }
    document.querySelector('a-scene').contentWindow.location.reload(true);
};

var clicked = function(obj){
        console.log('good');
        var parent = obj.parentNode;
        var Asset = document.createElement('a-text');
        Asset.setAttribute('value','chaire');
        Asset.setAttribute('position',{x:0.5,y:1,z:0});
        parent.appendChild(Asset);
        console.log('clicked');
       obj.setAttribute('animation-mixer','');
};

