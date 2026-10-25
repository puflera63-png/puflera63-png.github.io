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
    c.innerHTML="<p class='ex'>"+esc(x[0])+"</p><p class='odd-q'>Какая это функция?</p>";
    var opts=x[2].slice();
    for(var a=opts.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t2=opts[a];opts[a]=opts[b];opts[b]=t2;}
    opts.forEach(function(o){
      var b=el("button","btn-task",esc(o));
      b.addEventListener("click",function(){
        if(c.querySelector(".quiz-opt.ok"))return;
        c.querySelectorAll(".odd-note").forEach(function(n){n.remove();});
        c.querySelectorAll("button").forEach(function(x2){x2.classList.remove("ok","bad");});
        if(o===x[1]){b.classList.add("ok");c.appendChild(el("p","odd-note ok","Верно! Это "+o+"."));}
        else{b.classList.add("bad");c.appendChild(el("p","odd-note bad","Нет, "+o+" здесь ни при чём. Попробуй другой вариант."));}
      });
      c.appendChild(b);
    });
    box.appendChild(c);
  });
}

function renderOdd(){
  var box=document.getElementById("oddBox");if(!box)return;
  GS.ODD.forEach(function(o){
    var c=el("div","quiz-q");
    c.appendChild(el("p",null,"Найди то, что НЕ функция волшебной сказки:"));
    var words=o.slice(0,4);
    for(var a=words.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t2=words[a];words[a]=words[b];words[b]=t2;}
    words.forEach(function(w){
      var b=el("button","btn-task",esc(w));
      b.addEventListener("click",function(){
        c.querySelectorAll(".odd-note").forEach(function(n){n.remove();});
        c.querySelectorAll("button").forEach(function(x2){x2.classList.remove("ok","bad");});
        if(w===o[4]){b.classList.add("ok");c.appendChild(el("p","odd-note ok","Верно! "+w+" – не функция сказки."));}
        else{b.classList.add("bad");c.appendChild(el("p","odd-note bad","Нет: "+w+" – настоящая функция. Ищи то, чего в сказках не бывает."));}
      });
      c.appendChild(b);
    });
    box.appendChild(c);
  });
}

function renderMatch(){
  var box=document.getElementById("matchBox");if(!box)return;
  var pairs=GS.MATCH.slice();
  var left=el("div","match-col");
  left.appendChild(el("p","match-col-title","Функция"));
  var right=el("div","match-col");
  right.appendChild(el("p","match-col-title","Пример из сказки"));
  var rights=pairs.map(function(p,i){return i;});
  for(var a=rights.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1));var t2=rights[a];rights[a]=rights[b];rights[b]=t2;}
  var picked=null,done=0,note=el("p","odd-note","");
  var fb=el("div","feedback");
  function isDone(){return done===pairs.length;}
  pairs.forEach(function(p,pi){
    var lb=el("button","btn-task match-item",esc(p[0]));
    lb.addEventListener("click",function(){
      if(lb.classList.contains("ok"))return;
      left.querySelectorAll("button").forEach(function(x){x.classList.remove("picked");});
      lb.classList.add("picked");picked=pi;
    });
    left.appendChild(lb);
  });
  rights.forEach(function(ri){
    var p=pairs[ri];
    var rb=el("button","btn-task match-item",esc(p[1]));
    rb.addEventListener("click",function(){
      if(rb.classList.contains("ok")||picked===null)return;
      var lb=left.querySelectorAll("button")[picked];
      if(pairs[picked][1]===p[1]&&p[0]===pairs[picked][0]){
        lb.classList.remove("picked");lb.classList.add("ok");rb.classList.add("ok");
        picked=null;done++;
        note.className="odd-note ok";note.textContent="Пара найдена! Осталось: "+(pairs.length-done)+".";
        if(isDone()){note.textContent="Все пары найдены! Ты настоящий сказовед!";}
      }else{
        rb.classList.add("bad");
        note.className="odd-note bad";note.textContent="Не та пара: попробуй ещё.";
        setTimeout(function(){rb.classList.remove("bad");},700);
      }
    });
    right.appendChild(rb);
  });
  var wrap=el("div","match-wrap");wrap.appendChild(left);wrap.appendChild(right);box.appendChild(wrap);box.appendChild(note);box.appendChild(fb);
}

function renderPropp(){
  var box=document.getElementById("proppCards");if(!box)return;
  GS.PROPP.forEach(function(f){
    var c=el("div","pcard");
    var m=String(f[0]).match(/^([0-9]+)\.\s*(.*)$/);
    var num=m?m[1]:"+",name=m?m[2]:f[0];
    c.innerHTML="<div class='phead'><span class='pnum'>"+num+"</span><b>"+esc(name)+"</b></div><p>"+esc(f[1])+"</p><p class='ex'>"+esc(f[2])+"</p>";
    box.appendChild(c);
  });
}

function renderRoles(){
  var box=document.getElementById("roleCards");if(!box)return;
  GS.ROLES.forEach(function(r){
    var c=el("div","role-card");
    c.innerHTML="<b>"+esc(r[0])+"</b><p>"+esc(r[1])+"</p><p class='ex'>"+esc(r[2])+"</p>";
    box.appendChild(c);
  });
}

window.GSRender={quiz:renderQuiz,excerpts:renderExcerpts,odd:renderOdd,match:renderMatch,propp:renderPropp,roles:renderRoles};
var R=window.GSRender;
function tryRun(name){try{R[name]();}catch(e){console.error(name, e);}}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){tryRun("propp");tryRun("roles");tryRun("quiz");tryRun("excerpts");tryRun("odd");tryRun("match");});}
else{tryRun("propp");tryRun("roles");tryRun("quiz");tryRun("excerpts");tryRun("odd");tryRun("match");}
})();
