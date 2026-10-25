/* Мастерская сказочника */
window.GSPracticum=function(root){
  if(!root)return;
  var html=
  '<h2>Мастерская сказочника</h2>'+
  '<p class="lead">Теперь ты знаешь устройство сказки. Пора сочинять свою! Начни с конструктора, поиграй в кубики и узнай картины великих художников.</p>'+
  '<h3>🧩 Конструктор сказки</h3><p class="ex">Главное задание мастерской: собери сюжетную карту из восьми шагов.</p><div id="constructorBox" class="work-card"></div>'+
  '<h3>🎲 Кубики сказителя</h3><p>Брось кубы и сочини начало сказки устно.</p><div id="cubesBox" class="work-card"></div>'+
  '<h3>🖼 Узнай картину</h3><p class="ex">Бонус: посмотри на картины великих художников и угадай, что происходит в сказке.</p><div id="pictureBox" class="work-card"></div>'+
  '<h3>🛤 Собери путь героя</h3><p class="ex">Бонус: расставь шаги пути по порядку, кликая их один за другим.</p><div id="pathBox" class="work-card"></div>'+
  '<h3>🔮 Кто ты в сказке?</h3><p class="ex">Бонус: ответь на четыре вопроса и узнай свою сказочную роль.</p><div id="roleBox" class="work-card"></div>'+
  '<h3>↩️ Сказка наоборот</h3><div id="reverseBox" class="work-card"></div>'+
  '<h3>✉️ Письмо из похода</h3><div id="letterBox" class="work-card"></div>'+
  '<h3>📖 Моя книга</h3><div id="bookBox" class="work-card"></div>';
  root.innerHTML=html;
  buildConstructor();buildCubes();buildPictures();buildPath();buildRole();buildReverse();buildLetter();buildBook();
};

var KS=[
 ["Беда! Чего-то не хватает","Кто или что попало в беду? Чего не хватает твоему герою или его дому?"],
 ["Герой решает помочь","Почему именно твой герой соглашается помочь? Он смелый, любопытный или просто добрый?"],
 ["Дорога начинается","Куда идёт герой? Что он берёт с собой? Кто машет ему вслед?"],
 ["Испытание дарителя","Кого встречает герой в пути? Какое задание или вопрос – испытание?"],
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
  var hint=document.createElement("p");hint.className="ex";hint.textContent="Нажми на каждый куб – и сочини, как эти три вещи встретились в одной истории.";
  box.appendChild(row);box.appendChild(hint);
}
function buildPictures(){
  var box=document.getElementById("pictureBox");if(!box)return;
  var QS=[
    ["img/bilibin-koshchey.jpg","Кощей Бессмертный (И. Билибин, 1901)","Кто этот грозный герой в сказке по Проппу?","Вредитель","Даритель","Сказитель",0,"Это вредититель: он похищает и мешает герою, а в конце с ним происходит битва."],
    ["img/vasnetsov-volk.jpg","Иван-царевич на Сером Волке (В. Васнецов, 1889)","Что делает Серый волк для Ивана-царевича?","Мешает","Помогает в дороге","Охраняет дом",1,"Волк – помощник и волшебное средство: он переносит героя через огромные расстояния."],
    ["img/bilibin-vasilisa.jpg","Василиса Прекрасная у избы Бабы-яги (И. Билибин, 1899)","Какая функция у встречи с Бабой-ягой?","Испытание дарителя","Свадьба","Возвращение",0,"Баба-яга здесь – даритель: она испытывает Василису и дарит волшебную помощь."],
    ["img/vasnetsov-kovyor.jpg","Ковёр-самолёт (В. Васнецов, эскиз)","Ковёр-самолёт – это…","Наказание","Волшебное средство","Вредительство",1,"Волшебное средство: дар помогает герою победить и вернуться домой."]
  ];
  var i=0,score=0,out=document.createElement("div");out.className="feedback";
  function render(){
    var q=QS[i];if(!q){out.innerHTML="<b>Игра пройдена!</b> Правильных ответов: "+score+" из "+QS.length+". Покажи результат учителю!";if(window.GSProgress)GSProgress.mark("pictures");return;}
    box.innerHTML="<div class='pic-wrap'><img src='"+q[0]+"' alt='"+q[1]+"' class='pic'><p class='img-cap'>"+q[1]+"</p></div><p>"+q[2]+"</p>";
    var row=document.createElement("div");row.className="choices";
    [q[3],q[4],q[5]].forEach(function(opt,oi){
      var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=opt;
      b.addEventListener("click",function(){
        if(oi===q[6]){score++;out.innerHTML="<span class='ok'>Верно!</span> "+q[7];}
        else{out.innerHTML="<span class='bad'>Почти!</span> "+q[7];}
        i++;setTimeout(render,1400);
      });
      row.appendChild(b);
    });
    box.appendChild(row);box.appendChild(out);
  }
  render();
}
function buildPath(){
  var box=document.getElementById("pathBox");if(!box)return;
  var RIGHT=["Отлучка","Запрет","Нарушение запрета","Встреча дарителя","Битва с вредителем","Возвращение и финал"];
  var order=RIGHT.slice().sort(function(){return Math.random()-0.5;});
  var done=0,out=document.createElement("div");out.className="feedback";
  box.innerHTML="<p>Вспомни начало волшебной сказки: с чего всё начинается и чем заканчивается?</p>";
  var row=document.createElement("div");row.className="path-chips";
  order.forEach(function(name){
    var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=name;
    b.addEventListener("click",function(){
      if(name===RIGHT[done]){b.classList.add("ok");b.disabled=true;done++;
        if(done===RIGHT.length){out.innerHTML="<b>Путь собран!</b> Именно так устроено начало любой волшебной сказки.";if(window.GSProgress)GSProgress.mark("path");}
        else{out.innerHTML="Шаг "+done+" из "+RIGHT.length+". Дальше!";}
      } else {out.innerHTML="Не торопись: подумай, что бывает раньше.";}
    });
    row.appendChild(b);
  });
  box.appendChild(row);box.appendChild(out);
}
function buildRole(){
  var box=document.getElementById("roleBox");if(!box)return;
  var QS=[
    ["Друг загрустил. Что ты сделаешь?","Обниму и выслушаю","Придумаю план помощи","Расскажу утешительную историю"],
    ["В игре нужно победить. Ты…","Играю честно до конца","Ищу слабое место соперника","Придумываю новые правила для всех"],
    ["Тебе подарили волшебный предмет. Ты…","Спрячу и сберегу","Поделюсь с друзьями","Отправлюсь в путешествие"],
    ["Что лучше в сказке?","Счастливый дом","Верные друзья","Дорога и приключения"]
  ];
  var SCORES=[["Герой","Ты не боишься трудной дороги и доводишь дело до конца. Герои сказок – твои родные души!"],["Даритель","Ты щедр и мудр: умеешь вовремя поддержать. Без тебя ни один герой не дошёл бы до финала!"],["Сказитель","Ты хранишь истории и умеешь их рассказывать. Древние сказители были бы тобой горды!"]];
  var i=0,cnt=[0,0,0],out=document.createElement("div");out.className="feedback";
  function render(){
    var q=QS[i];if(!q){
      var best=cnt.indexOf(Math.max.apply(null,cnt));
      out.innerHTML="<b>Твоя роль: "+SCORES[best][0]+".</b> "+SCORES[best][1];
      if(window.GSProgress)GSProgress.mark("role");return;
    }
    box.innerHTML="<p>"+(i+1)+". "+q[0]+"</p>";
    var row=document.createElement("div");row.className="choices";
    [q[1],q[2],q[3]].forEach(function(opt,oi){
      var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=opt;
      b.addEventListener("click",function(){cnt[oi]++;i++;render();});
      row.appendChild(b);
    });
    box.appendChild(row);box.appendChild(out);
  }
  render();
}
function buildReverse(){
  var box=document.getElementById("reverseBox");if(!box)return;
  box.innerHTML="<p>Представь, что герои устали быть собой. Выбери героя – и придумай одно событие сказки наоборот.</p>";
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
document.addEventListener("DOMContentLoaded",function(){
  var root=document.getElementById("practicumRoot");
  if(root&&window.GSPracticum)GSPracticum(root);
});
