/* Общая логика: вкладки, доступность, озвучка, путь героя */
(function(){
"use strict";

/* Вкладки */
document.addEventListener("click",function(e){
  var tab=e.target.closest(".tab");if(!tab)return;
  var root=tab.closest("main")||document;
  root.querySelectorAll(".tab").forEach(function(t){t.classList.remove("active");t.setAttribute("aria-selected","false");});
  tab.classList.add("active");tab.setAttribute("aria-selected","true");
  root.querySelectorAll(".tabpanel").forEach(function(p){p.hidden=true;p.classList.remove("active");});
  var panel=root.querySelector("#tab-"+tab.dataset.tab);
  if(panel){panel.hidden=false;panel.classList.add("active");}
});

/* Версия для слабовидящих */
var a11yBtn=document.getElementById("a11yToggle");
if(a11yBtn){
  var on=localStorage.getItem("gsu_a11y")==="1";
  applyA11y(on);
  a11yBtn.addEventListener("click",function(){
    on=!on;localStorage.setItem("gsu_a11y",on?"1":"0");applyA11y(on);
  });
}
function applyA11y(on){
  document.body.classList.toggle("a11y",on);
  if(a11yBtn){a11yBtn.setAttribute("aria-pressed",on?"true":"false");
    a11yBtn.textContent=on?"Обычная версия":"Версия для слабовидящих";}
}

/* Озвучка текста (SpeechSynthesis, без сервера) */
document.addEventListener("click",function(e){
  var b=e.target.closest(".speech-btn");if(!b)return;
  var text=b.closest("[data-speech]")?b.closest("[data-speech]").dataset.speech:b.parentElement.textContent.trim();
  if(!("speechSynthesis" in window)){alert("Озвучка не поддерживается этим браузером.");return;}
  if(b.getAttribute("aria-pressed")==="true"){speechSynthesis.cancel();b.setAttribute("aria-pressed","false");return;}
  speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text);u.lang="ru-RU";u.rate=0.95;
  u.onend=function(){b.setAttribute("aria-pressed","false");};
  b.setAttribute("aria-pressed","true");speechSynthesis.speak(u);
});

/* Путь героя: прогресс в localStorage */
window.GSU={
  doneKey:"gsu_done",
  done:(function(){try{return JSON.parse(localStorage.getItem("gsu_done")||"{}");}catch(e){return{};}})(),
  mark:function(id){
    this.done[id]=true;
    try{localStorage.setItem(this.doneKey,JSON.stringify(this.done));}catch(e){}
    renderPath();
  },
  isDone:function(id){return !!this.done[id];}
};
function renderPath(){
  var path=document.querySelector(".hero-path");if(!path)return;
  var steps=path.querySelectorAll(".step");
  steps.forEach(function(s){
    if(GSU.isDone(s.dataset.task))s.classList.add("done");
  });
}
document.addEventListener("DOMContentLoaded",renderPath);
})();
