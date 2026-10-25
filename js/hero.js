/* Путь героя: прогресс по заданиям (localStorage) */
window.GSProgress=(function(){
  var KEY="gsu_tasks";
  var TASKS=["quiz","excerpt","odd","match","constructor","cubes","reverse","letter","book"];
  function get(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return{};}}
  function set(o){localStorage.setItem(KEY,JSON.stringify(o));}
  return{
    isDone:function(t){return !!get()[t];},
    doneCount:function(){var o=get(),n=0;TASKS.forEach(function(t){if(o[t])n++;});return n;},
    total:function(){return TASKS.length;},
    list:function(){return TASKS;},
    mark:function(t){var o=get();o[t]=true;set(o);renderPath();},
    reset:function(){set({});renderPath();}
  };
})();
function renderPath(){
  var paths=document.querySelectorAll(".hero-path");
  var done=window.GSProgress?GSProgress:window.GSProgress;
  paths.forEach(function(p){
    p.innerHTML="";
    var tasks=window.GSProgress?GSProgress.list():[];
    tasks.forEach(function(t){
      var s=document.createElement("span");
      s.className="step"+((window.GSProgress&&GSProgress.isDone(t))?" done":"");
      var names={quiz:"Т",excerpt:"О",odd:"Л",match:"М",constructor:"К",cubes:"Кб",reverse:"Н",letter:"П",book:"Кн"};
      s.textContent=names[t]||"?";s.title=t;
      p.appendChild(s);
    });
  });
}
document.addEventListener("DOMContentLoaded",renderPath);
