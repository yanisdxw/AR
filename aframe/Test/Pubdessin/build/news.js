/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

var init = function(){
    
};