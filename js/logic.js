(function(){
"use strict";
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}

function renderQuiz(){
  var box=document.getElementById("quizBox");if(!box)return;
  box.innerHTML="";
  var form=el("div");
  GS.QUIZ.forEach(function(q,qi){
    var item=el("div","quiz-q");
    item.innerHTML="<p><b>"+(qi+1)+". "+esc(q[0])+"</b></p>";
    var opts=q.slice(1,4);
    for(var a=opts.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t=opts[a];opts[a]=opts[b];opts[b]=t;}
    opts.forEach(function(opt){
      var lab=el("label","quiz-opt");
      lab.innerHTML="<input type='radio' name='q"+qi+"'> "+esc(opt);
      if(opt===q[1])lab.setAttribute("data-correct","1");
      item.appendChild(lab);
    });
    form.appendChild(item);
  });
  var check=el("button","btn","Проверить ответы");
  var fb=el("div","feedback");
  check.addEventListener("click",function(){
    var score=0,unanswered=0;
    GS.QUIZ.forEach(function(q,qi){
      var item=form.querySelectorAll(".quiz-q")[qi];
      var sel=item.querySelector("input:checked");
      var labels=item.querySelectorAll(".quiz-opt");
      if(!sel){unanswered++;labels.forEach(function(l){l.classList.remove("ok","bad");});return;}
      var chosen=sel.parentNode;
      labels.forEach(function(l){l.classList.remove("ok","bad");});
      if(chosen.getAttribute("data-correct")==="1"){score++;chosen.classList.add("ok");}
      else{chosen.classList.add("bad");}
      labels.forEach(function(l){if(l.getAttribute("data-correct")==="1")l.classList.add("ok");});
    });
    fb.innerHTML="";
    if(unanswered>0){
      fb.appendChild(el("p","warn","Ответь на все вопросы: без ответа осталось "+unanswered+" "+(unanswered===1?"вопрос":"вопроса")+"."));
    }else{
      var word;
      if(score===10)word="Сказочное золотце! Все 10 из 10: грамматика сюжета у тебя в кармане.";
      else if(score>=8)word="Здорово! "+score+" из 10. Ещё пара шагов – и путь героя пройден без промаха.";
      else if(score>=5)word="Неплохо: "+score+" из 10. Перечитай карточки, где ошибся, и попробуй снова.";
      else word="Пока "+score+" из 10 – и это нормально: путь героя длинный. Прочитай функции ещё раз и вернись, сказки не спешат.";
      fb.appendChild(el("p",null,"<b>Результат: "+score+" из 10.</b> "+word));
      var again=el("button","btn","Пройти ещё раз");
      again.type="button";
      again.addEventListener("click",function(){fb.innerHTML="";renderQuiz();});
      fb.appendChild(again);
    }
  });
  box.appendChild(form);box.appendChild(check);box.appendChild(fb);
}
function renderExcerpts(){
  var box=document.getElementById("excerptBox");if(!box)return;
  GS.EXCERPTS.forEach(function(x){
    var c=el("div","quiz-q");
    c.innerHTML="<p class='ex'>"+esc(x[0])+"</p><p><b>"+esc(x[1])+"</b></p>";
    box.appendChild(c);
  });
}

function renderOdd(){
  var box=document.getElementById("oddBox");if(!box)return;
  GS.ODD.forEach(function(o,oi){
    var c=el("div","quiz-q");
    var p=el("p",null,"Найди то, что не функция сказки:");
    c.appendChild(p);
    o.forEach(function(w){
      if(w===o[4])return;
      var b=el("button","btn-ghost small",esc(w));
      b.addEventListener("click",function(){
        c.querySelectorAll("button").forEach(function(x){x.classList.remove("ok","bad");});
        b.classList.add(w===o[0]?"bad":"ok");
        var old=c.querySelector(".odd-note");if(old)old.remove();
        c.appendChild(el("p","odd-note "+(w===o[0]?"bad":"ok"),w===o[0]?"Верно подмечено: это не функция.":w===o[1]?"Почти! Но "+w+" – настоящая функция сказки.":""));
      });
      c.appendChild(b);
    });
    box.appendChild(c);
  });
}

function renderMatch(){
  var box=document.getElementById("matchBox");if(!box)return;
  GS.MATCH.forEach(function(m,mi){
    var c=el("div","quiz-q");
    c.innerHTML="<p><b>"+esc(m[0])+"</b> – <i>"+esc(m[1])+"</i></p>";
    box.appendChild(c);
  });
}

function renderPropp(){
  var box=document.getElementById("proppCards");if(!box)return;
  var wrap=el("div","propp-grid");
  GS.PROPP.forEach(function(f){
    var mm=String(f[0]).match(/^([0-9]+)\.\s*(.*)$/);
    var num=mm?mm[1]:"–", name=mm?mm[2]:f[0];
    var c=el("div","pcard");
    c.innerHTML="<div class='phead'><span class='pnum'>"+num+"</span><b>"+esc(name)+"</b></div><p>"+esc(f[1])+"</p><p class='ex'>"+esc(f[2])+"</p>";
    wrap.appendChild(c);
  });
  box.appendChild(wrap);
}

function renderRoles(){
  var box=document.getElementById("roleCards");if(!box)return;
  var wrap=el("div","role-grid");
  GS.ROLES.forEach(function(r){
    var c=el("div","role-card");
    c.innerHTML="<b>"+esc(r[0])+"</b><p>"+esc(r[1])+"</p><p class='ex'>"+esc(r[2])+"</p>";
    wrap.appendChild(c);
  });
  box.appendChild(wrap);
}

window.GSRender={quiz:renderQuiz,excerpts:renderExcerpts,odd:renderOdd,match:renderMatch,propp:renderPropp,roles:renderRoles};
var R=window.GSRender;
function tryRun(name){try{R[name]();}catch(e){console.error(name, e);}}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){tryRun("propp");tryRun("roles");tryRun("quiz");tryRun("excerpts");tryRun("odd");tryRun("match");});}
else{tryRun("propp");tryRun("roles");tryRun("quiz");tryRun("excerpts");tryRun("odd");tryRun("match");}
})();
