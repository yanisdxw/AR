/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var scale = 1;
/*
 * 所有有关组件方法
 * 
 */

var addPage = function(){
    var pages = document.getElementById('fly_view').getElementsByClassName('page');
    var page = document.createElement('div');
    var name = "page"+(pages.length+1);
    page.setAttribute("name",name);
    page.setAttribute("class","page");
    return page;
};

var addNormalPage = function(){
    
};

var addLongPage = function(){
    
};

var addARpage = function(){      
    if(!document.querySelector('a-scene')){
        if(document.querySelector('#Page')){
            document.removeChild(document.querySelector('#Page'));
        }
        else if(document.querySelector('#Longpage')){
            document.removeChild(document.querySelector('#Longpage'));
        }
        var page = addPage();
        page.style.width = 640+'px';
        page.style.height = 480+'px';
        page.style.marginLeft = '0px';
        var scene = document.createElement('a-scene');
        var camera = document.createElement('a-camera');       
        var entity = document.createElement('a-entity');
        var cursor = document.createElement('a-cursor');
        var options = { 
            sourceType:'webcam',
            debugUIEnabled:'false',
            trackingMethod:'best',
            displayHeight:'480',
            displayWidth:'640'
        };             
        //configuration of ascene
        scene.setAttribute('id','ARpage');
        scene.setAttribute('embedded','');         
        scene.setAttribute('arjs', Object.keys(options).reduce((attribute, key) => `${attribute}${key}: ${options[key]}; `, ""));    
        scene.setAttribute('vr-mode-ui',{enabled:false});       
        //configuration of camera          
        entity.setAttribute('id','#rig');
        entity.setAttribute('position',{x:1.6,y:0,z:0});
        entity.setAttribute('rotation',{x:0,y:0,z:0});       
        
        //document.body.appendChild(scene);   
         //configuration of cursor  
        cursor.setAttribute('position',{x:0,y:0,z:-5});
        cursor.setAttribute('visible','true');
        //document.body.insertBefore(scene,document.body.firstChild); 
        document.getElementById('fly_view').appendChild(page);
        page.appendChild(scene);  
        scene.appendChild(entity);  
        entity.appendChild(camera); 
        camera.appendChild(cursor);       
        scene.addEventListener('loaded ',getCoordtoCursor()); 
        submitScene();
    }
    else
        console.error('a-scene exist');
};
   
var addModel = function (){    
    if (!document.querySelector("#drone1")){
        var zone = document.querySelector("a-camera");
        var El = document.createElement('a-entity');
        var Asset = document.createElement('a-asset-item'); 
        //create a assets of sources
        if (!document.querySelector('a-assets')){
            var assets = document.createElement('a-assets');
            document.querySelector('a-scene').appendChild(assets);
        }         
        Asset.setAttribute('id',"drone"); 
        Asset.setAttribute('src',"Modele/busterDrone/busterDrone.gltf");
        document.querySelector('a-assets').appendChild(Asset);
        El.setAttribute('gltf-model', '#drone'); 
        El.setAttribute('id', 'drone1'); 
        El.setAttribute('focus',''); 
        /*
        Asset.setAttribute('id',"coutaux"); 
        Asset.setAttribute('src',"coutaux.dae");
        document.querySelector('a-assets').appendChild(Asset);       
        El.setAttribute('collada-model', '#coutaux'); 
        El.setAttribute('id', 'coutaux'); 
        */
        El.setAttribute('class', '3Dmodel');         
        El.setAttribute('position', {x:0,y:0,z:-5});
        El.setAttribute('rotation', {x:0,y:0,z:0});        
        El.setAttribute('scale', {x:1,y:1,z:1});
        zone.appendChild(El);       
    }
};
     
var addMarker = function(){
    if(document.querySelector('a-scene')){
        var camera = document.querySelector('a-camera');
        var marker = document.createElement('a-marker');
        marker.setAttribute('type','pattern');
        marker.setAttribute('url','pattern-marker.patt');
        camera.appendChild(marker);
    }
    else
        console.log("need ARscene");
};

var add3DText = function(){
    if(document.querySelector('a-scene')){
        var camera = document.querySelector('a-camera');
        var text_3D = document.createElement('a-text');
        text_3D.setAttribute('id','3DText');
        text_3D.setAttribute('value','3DText');
        text_3D.setAttribute('position', {x:0,y:0,z:-6});       
        camera.appendChild(text_3D);
    }
    else
        console.log("need ARscene");    
};

var addSound = function(){
    if(document.querySelector('a-scene')){    
        console.log(this.el);
        var scene = document.querySelector('a-scene');
        var sound = document.createElement('a-sound');
        sound.setAttribute('src','url(sound.mp3)');
        sound.setAttribute('autoplay','true');
        sound.setAttribute('loop','false');
           
        sound.setAttribute('position',{x:0,y:0,z:-10});   
        scene.appendChild(sound);
    }
    else
      console.log("need ARscene");
};

/*所有有关属性方法
 * 
 * 
 * 
 */
var set3DText = function(){
    
};



var addAnimation = function(obj){ 
    return function(){       
        obj.setAttribute('animation-mixer','');
        this.setAttribute('value','desactiver animation');
        this.onclick=delAnimation(obj);
    };
};

var delAnimation = function(obj){
    return function(){
        obj.removeAttribute('animation-mixer');
        this.setAttribute('value','activer animation');
        this.onclick=addAnimation(obj);
    };
};

var setAnimation = function(obj){
    return function(){
        if(!document.querySelector('#workZone')){
            var workZone = document.createElement('div');
            workZone.setAttribute('id','workZone');
            workZone.style.position = 'absolute';
            workZone.style.right = 0;
            workZone.style.top = 0;
            document.body.appendChild(workZone);        
        }
        if(!document.querySelector('#Button_addAnimation')){
            var Button_addAnimation = document.createElement('input');    
            Button_addAnimation.setAttribute('type','button');
            Button_addAnimation.setAttribute('id','Button_addAnimation');
            document.querySelector('#workZone').appendChild(Button_addAnimation);
        }     
        Button_addAnimation.setAttribute('value','activer Animation');       
        Button_addAnimation.onclick = addAnimation(obj);          
        obj.setAttribute('scale', {x:1*scale,y:1,z:1}); 
    };
};
//fucntion for a-frame
AFRAME.registerComponent('focus', {  
    init: function () { 
        //this.el.addEventListener('click', settingAnimation(this));
        this.el.addEventListener('click', setAnimation(this.el));
        this.el.addEventListener('mouseenter', function (){this.setAttribute('scale', {x:1.1*scale,y:1.1,z:1.1});}); 
        this.el.addEventListener('mouseleave', function (){this.setAttribute('scale', {x:1*scale,y:1,z:1});}); 
    }
});       

var submitScene = function(){
    var Elements = document.getElementsByClassName("page");
    var elements = Elements[0].childNodes;
    /*
    //递归遍历
    
    */
   for(var i=elements.length-1; i>=0; i--){
        console.log(elements[i].childNodes);
        console.log(elements[i].parentNode);
        var attrs = elements[i].attributes;
        var output= ""; 
        for(var j=attrs.length-1; j>=0; j--) {
             if(attrs[j].value)
                 output+= attrs[j].name + "->" + attrs[j].value+" ";
             else
                 output+= attrs[j].name+ "/";
         }
        console.log(output);
   }    
}
