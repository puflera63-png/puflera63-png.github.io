/* Мастерская сказочника */
window.GSPracticum=function(root){
  if(!root)return;
  var html=
  '<h2>Мастерская сказочника</h2>'+
  '<p class="lead">Теперь ты знаешь устройство сказки. Пора сочинять свою! Начни с конструктора: собери сюжетную карту, а потом разверни её в настоящую сказку.</p>'+
  '<h3>Конструктор сказки</h3><div id="constructorBox" class="constructor"></div>'+
  '<h3>Кубики сказителя</h3><p>Брось кубы и сочини начало сказки устно.</p><div id="cubesBox"></div>'+
  '<h3>Сказка наоборот</h3><div id="reverseBox" class="task"></div>'+
  '<h3>Письмо из похода</h3><div id="letterBox" class="task"></div>'+
  '<h3>Моя книга</h3><div id="bookBox" class="task"></div>';
  root.innerHTML=html;
  buildConstructor();buildCubes();buildReverse();buildLetter();buildBook();
};

var KS=[
 ["Беда! Чего-то не хватает","Кто или что попало в беду? Чего не хватает твоему герою или его дому?"],
 ["Герой решает помочь","Почему именно твой герой соглашается помочь? Он смелый, любопытный или просто добрый?"],
 ["Дорога начинается","Куда идёт герой? Что он берёт с собой? Кто машет ему вслед?"],
 ["Испытание дарителя","Кого встречает герой в пути? Какое задание или вопрос - испытание?"],
 ["Волшебный дар","Что дарят герою и зачем это пригодится?"],
 ["Битва и победа","С кем сражается герой? Как волшебный дар помогает победить?"],
 ["Дорога домой и узнавание","Как герой возвращается? Кто и по какой метке узнаёт его?"],
 ["Счастливый финал","Что изменилось в доме? Чем заканчивается сказка?"]
];
function buildConstructor(){
  var box=document.getElementById("constructorBox");if(!box)return;
  KS.forEach(function(k,i){
    var s=document.createElement("div");s.className="step";
    s.innerHTML="<div class='num'>"+(i+1)+"</div><div style='flex:1'><b>"+k[0]+"</b><p class='ex'>"+k[1]+"</p><textarea rows='2' placeholder='Напиши здесь...'></textarea></div>";
    box.appendChild(s);
  });
  var btn=document.createElement("button");btn.className="btn";btn.type="button";btn.textContent="Собрать мою сюжетную карту";
  var out=document.createElement("div");out.className="feedback";
  btn.addEventListener("click",function(){
    var lines=box.querySelectorAll("textarea"),res=[],empty=0;
    lines.forEach(function(t,i){var v=t.value.trim();if(!v){empty++;v="(пока пусто)";}res.push((i+1)+". "+KS[i][0]+": "+v);});
    out.innerHTML="<b>Твоя сюжетная карта!</b><br>Заполнено шагов: "+(8-empty)+" из 8.<pre style='white-space:pre-wrap'>"+res.join("\n")+"</pre>";
    if(window.GSProgress)GSProgress.mark("constructor");
  });
  box.appendChild(btn);box.appendChild(out);
}
function buildCubes(){
  var box=document.getElementById("cubesBox");if(!box)return;
  var FACES={
    geroi:["смелая девочка","младший сын","добрый солдат","хитрая лиса","крестьянский сын","сиротка"],
    mesto:["дремучий лес","подводное царство","высокая гора","город на реке","зимняя деревня","остров в море"],
    chudo:["говорящий конь","самобранка","клубочек-проводник","волшебное перо","живая вода","сапоги-скороходы"]
  };
  var row=document.createElement("div");row.className="cubes";
  var labels=[["Кто?","geroi"],["Где?","mesto"],["Что волшебное?","chudo"]];
  labels.forEach(function(lb){
    var c=document.createElement("div");c.className="cube";c.textContent=lb[0];c.dataset.k=lb[1];
    c.addEventListener("click",function(){
      var arr=FACES[c.dataset.k];
      c.textContent=arr[Math.floor(Math.random()*arr.length)];
    });
    row.appendChild(c);
  });
  var hint=document.createElement("p");hint.className="ex";hint.textContent="Нажми на каждый куб - и сочини, как эти три вещи встретились в одной истории.";
  box.appendChild(row);box.appendChild(hint);
}
document.addEventListener("DOMContentLoaded",function(){
  var root=document.getElementById("practicumRoot");
  if(root&&window.GSPracticum)GSPracticum(root);
});

function buildReverse(){
  var box=document.getElementById("reverseBox");if(!box)return;
  box.innerHTML="<p>Представь, что герои устали быть собой. Выбери героя - и придумай одно событие сказки наоборот.</p>";
  var heroes=["добрый молодец","Баба-яга","снежная королева","золотая рыбка"];
  var row=document.createElement("div");row.className="choices";
  heroes.forEach(function(h){
    var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=h;
    b.addEventListener("click",function(){
      var t=document.createElement("textarea");t.rows=3;t.placeholder="Что делает "+h+", если всё наоборот?";
      box.appendChild(t);
      if(window.GSProgress)GSProgress.mark("reverse");
    });
    row.appendChild(b);
  });
  box.appendChild(row);
}
function buildLetter(){
  var box=document.getElementById("letterBox");if(!box)return;
  box.innerHTML="<p>Герой вернулся домой. Напиши его письмо родным: о самом трудном испытании и о друге, которого он встретил в пути.</p>"+
  "<textarea rows='5' placeholder='Дорогие мама и папа!...'></textarea>";
  var b=document.createElement("button");b.className="btn";b.type="button";b.textContent="Отправить письмо";
  b.addEventListener("click",function(){
    if(window.GSProgress)GSProgress.mark("letter");
    b.textContent="Письмо сохранено на твоём устройстве";
  });
  box.appendChild(b);
}
function buildBook(){
  var box=document.getElementById("bookBox");if(!box)return;
  box.innerHTML="<p>Самое главное: напиши свою волшебную сказку по всем шагам конструктора. Не забудь: у сказки должны быть зачин, три испытания и счастливый финал.</p>"+
  "<textarea rows='10' placeholder='Жили-были...'></textarea>";
  var b=document.createElement("button");b.className="btn";b.type="button";b.textContent="Моя сказка готова!";
  b.addEventListener("click",function(){
    if(window.GSProgress)GSProgress.mark("book");
    b.textContent="Так держать! Покажи сказку учителю или родителям";
  });
  box.appendChild(b);
}
