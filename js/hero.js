/* Путь героя: прогресс по заданиям (localStorage) */
window.GSProgress=(function(){
  var KEY="gsu_tasks";
  var TASKS=["quiz","excerpt","odd","match","constructor","cubes","pictures","path","role","reverse","letter","book"];
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
  var names={quiz:"Викторина",excerpt:"Найди функцию",odd:"Найди лишнее",match:"Соедини пары",constructor:"Конструктор сказки",cubes:"Кубики сказителя",reverse:"Сказка наоборот",letter:"Письмо из похода",book:"Моя книга сказок"};
  var tasks=window.GSProgress?GSProgress.list():[];
  paths.forEach(function(p){
    p.innerHTML="";
    tasks.forEach(function(t,i){
      var s=document.createElement("span");
      s.className="step"+((window.GSProgress&&GSProgress.isDone(t))?" done":"");
      s.textContent=i+1;s.title=names[t]||t;
      p.appendChild(s);
    });
    if(p.nextElementSibling&&p.nextElementSibling.classList.contains("path-note"))p.nextElementSibling.remove();
    var n=document.createElement("div");n.className="path-note";
    n.textContent="Путь героя: выполнено "+(window.GSProgress?GSProgress.doneCount():0)+" из "+tasks.length+". Наведи на кружок – увидишь задание.";
    p.after(n);
  });
}
document.addEventListener("DOMContentLoaded",renderPath);
