(function(){
"use strict";
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function renderQuiz(){
  var box=document.getElementById("quizBox");if(!box)return;
  var form=el("div");
  GS.QUIZ.forEach(function(q,qi){
    var item=el("div","quiz-q");
    item.innerHTML="<p><b>"+(qi+1)+". "+esc(q[0])+"</b></p>";
    q.slice(1,4).forEach(function(opt,oi){
      var l=el("label","quiz-opt");
      l.innerHTML="<input type='radio' name='q"+qi+"' value='"+oi+"'> "+esc(opt);
      item.appendChild(l);
    });
    form.appendChild(item);
  });
  var check=el("button","btn","Проверить ответы");check.type="button";
  var fb=el("div","feedback");
  check.addEventListener("click",function(){
    var score=0,answered=true;
    GS.QUIZ.forEach(function(q,qi){
      var sel=form.querySelector("input[name=q"+qi+"]:checked");
      if(!sel)answered=false;
      var labels=form.querySelectorAll(".quiz-q")[qi].querySelectorAll(".quiz-opt");
      labels.forEach(function(l,li){l.classList.remove("ok","bad");if(li===q[4])l.classList.add("ok");});
      if(sel&&+sel.value===q[4])score++;
    });
    if(!answered){fb.innerHTML="<p class='warn'>Ответь на все вопросы, чтобы увидеть результат.</p>";return;}
    var msg=score===GS.QUIZ.length?"Блестяще! Ты готов сочинять собственную сказку.":score>=6?"Хорошо! Перечитай карточки функций и попробуй ещё раз.":"Пока трудновато – вернись к разделу теории, там все ответы.";
    fb.innerHTML="<p>Результат: <b>"+score+" из "+GS.QUIZ.length+"</b>. "+msg+"</p>";
    if(score>=6&&window.GSProgress)GSProgress.mark("quiz");
  });
  box.appendChild(form);box.appendChild(check);box.appendChild(fb);
}
function renderPropp(){
  var box=document.getElementById("proppCards");if(!box)return;
  var wrap=el("div","propp-grid");
  GS.PROPP.forEach(function(f){
    var m=String(f[0]).match(/^([0-9]+)\.\s*(.*)$/);
    var num=m?m[1]:"0", name=m?m[2]:f[0];
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
function renderExcerpts(){
  var box=document.getElementById("excerptBox");if(!box)return;
  GS.EXCERPTS.forEach(function(x){
    var t=el("div","task");
    t.innerHTML="<p class='excerpt'>"+esc(x[0])+"</p><p>Какая это функция?</p>";
    var sel=el("select");
    x[2].forEach(function(o){var op=el("option");op.textContent=o;sel.appendChild(op);});
    var b=el("button","btn","Ответить");b.type="button";
    var fb=el("div","feedback");
    b.addEventListener("click",function(){
      if(sel.value===x[1]){fb.textContent="Верно! Это функция «"+x[1]+"».";fb.className="feedback ok";
        if(window.GSProgress)GSProgress.mark("excerpt");}
      else{fb.textContent="Не совсем. Подумай ещё: на что похож этот кусок сказки?";fb.className="feedback no";}
    });
    t.appendChild(sel);t.appendChild(b);t.appendChild(fb);
    box.appendChild(t);
  });
}
function renderOdd(){
  var box=document.getElementById("oddBox");if(!box)return;
  GS.ODD.forEach(function(r){
    var t=el("div","task");
    t.innerHTML="<p><b>Найди лишнее:</b></p>";
    var row=el("div","choices");
    r.slice(0,4).forEach(function(o){
      var b=el("button","choice",esc(o));b.type="button";
      b.addEventListener("click",function(){
        if(o===r[4]){b.classList.add("good");if(window.GSProgress)GSProgress.mark("odd");}
        else{b.classList.add("bad");}
      });
      row.appendChild(b);
    });
    t.appendChild(row);box.appendChild(t);
  });
}
function renderMatch(){
  var box=document.getElementById("matchBox");if(!box)return;
  var pairs=GS.MATCH.slice();
  var answers=pairs.map(function(p){return p[1];}).sort(function(){return Math.random()-0.5;});
  var form=el("div");
  pairs.forEach(function(p){
    var row=el("div","task");
    row.innerHTML="<p><b>"+esc(p[0])+"</b> – это...</p>";
    var sel=el("select");
    answers.forEach(function(a){var op=el("option");op.textContent=a;sel.appendChild(op);});
    row.appendChild(sel);form.appendChild(row);
  });
  var b=el("button","btn","Проверить");b.type="button";
  var fb=el("div","feedback");
  b.addEventListener("click",function(){
    var ok=0;
    form.querySelectorAll("select").forEach(function(sel,i){
      sel.classList.toggle("good",sel.value===pairs[i][1]);
      if(sel.value===pairs[i][1])ok++;
    });
    if(ok===pairs.length){fb.textContent="Всё верно!";fb.className="feedback ok";if(window.GSProgress)GSProgress.mark("match");}
    else fb.textContent="Совпало "+ok+" из "+pairs.length+". Попробуй ещё!";
  });
  form.appendChild(b);form.appendChild(fb);box.appendChild(form);
}
document.addEventListener("DOMContentLoaded",function(){
  renderPropp();renderRoles();renderQuiz();renderExcerpts();renderOdd();renderMatch();
});
})();
