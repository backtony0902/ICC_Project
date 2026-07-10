const questions = [

{

title:"🚨 상황 1",

question:"낚시배가 전복되었습니다.\n승객 8명이 바다에 빠졌습니다.",

answers:[

"경비정 즉시 출동",

"헬기 요청",

"상황 확인"

],

correct:0,

success:"✔ 전원 구조 성공!",

fail:"❌ 골든타임을 놓쳤습니다."

},

{

title:"🌊 상황 2",

question:"기름이 유출되고 있습니다.",

answers:[

"오일펜스 설치",

"대기",

"사진 촬영"

],

correct:0,

success:"환경오염을 최소화했습니다.",

fail:"오염이 확산되었습니다."

},

{

title:"🚢 상황 3",

question:"외국어선이 불법조업 중입니다.",

answers:[

"즉시 단속",

"무시",

"돌아간다"

],

correct:0,

success:"불법조업을 막았습니다.",

fail:"불법조업이 계속되었습니다."

},

{

title:"🔍 상황 4",

question:"실종 신고가 접수되었습니다.",

answers:[

"드론 수색",

"내일 수색",

"기다린다"

],

correct:0,

success:"실종자를 발견했습니다.",

fail:"수색이 늦어졌습니다."

},

{

title:"🌪 상황 5",

question:"태풍이 접근하고 있습니다.",

answers:[

"선박 대피",

"그대로 둔다",

"기상청만 기다린다"

],

correct:0,

success:"인명 피해를 막았습니다.",

fail:"피해가 발생했습니다."

}

];

let current=0;

let score=0;

const title=document.getElementById("title");

const question=document.getElementById("question");

const buttons=document.getElementById("buttons");

const result=document.getElementById("result");

function loadQuestion(){

result.innerHTML="";

title.innerHTML=questions[current].title;

question.innerHTML=

questions[current].question.replace(/\n/g,"<br>");

buttons.innerHTML="";

questions[current].answers.forEach((answer,index)=>{

buttons.innerHTML+=`

<button onclick="checkAnswer(${index})">

${answer}

</button>

`;

});

}

function checkAnswer(index){

buttons.innerHTML="";

if(index===questions[current].correct){

result.innerHTML=

questions[current].success;

score+=10;

}

else{

result.innerHTML=

questions[current].fail;

}

setTimeout(()=>{

current++;

if(current<questions.length){

loadQuestion();

}

else{

location.href="result.html?score="+score;

}

},2000);

}

loadQuestion();