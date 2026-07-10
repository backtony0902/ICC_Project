const text=

"📻 긴급신고 접수\n\n낚시배 전복 사고 발생\n\n신속한 판단이 생명을 구합니다.";

let i=0;

const typing=

document.getElementById("typing");

function type(){

if(i<text.length){

typing.innerHTML+=

text.charAt(i)
.replace("\n","<br>");

i++;

setTimeout(type,60);

}

else{

document
.getElementById("next")
.style.display="inline-block";

}

}

setTimeout(type,1000);

document
.getElementById("next")
.onclick=function(){

location.href="game.html";

}