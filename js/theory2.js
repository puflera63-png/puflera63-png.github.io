/* Наполнение раздела теории в DOM */
window.GSTheory=function(root){
  if(!root)return;
  root.innerHTML=
  '<h2>Волшебная сказка и её устройство</h2>'+
  '<p class="lead">Учёный Владимир Яковлевич Пропп прочитал сто русских волшебных сказок и заметил чудо: все они собраны из одних и тех же деталей - как дом из кирпичиков. Эти «кирпичики» он назвал <b>функциями</b>. Здесь ты найдёшь все 31 функцию, семь сказочных ролей и карту сказки. Потом проверь себя - и вперёд, в Мастерскую!</p>'+
  '<div class="speech-wrap"><button class="speech-btn" type="button">Слушать</button></div>'+
  '<h3>31 функция волшебной сказки</h3><div id="proppCards"></div>'+
  '<h3>Семь действующих лиц</h3><p>По Проппу, в волшебной сказке действуют семь главных ролей. Один персонаж может совмещать две роли, а «царевна» - это не всегда принцесса: это то самое, ради чего герой идёт в дорогу.</p><div id="roleCards"></div>'+
  '<h3>Проверь себя: викторина</h3><div id="quizBox"></div>'+
  '<h3>Найди функцию в отрывке</h3><p>Прочитай отрывок из народной сказки и выбери, какая функция в нём спряталась.</p><div id="excerptBox"></div>'+
  '<h3>Найди лишнее</h3><p>Три слова из сказки, одно - из другого мира.</p><div id="oddBox"></div>'+
  '<h3>Соедини сказку и персонажа</h3><div id="matchBox"></div>';
};

document.addEventListener("DOMContentLoaded",function(){
  var root=document.getElementById("theoryRoot");
  if(root&&window.GSTheory)GSTheory(root);
  var root2=document.getElementById("practicumRoot");
  if(root2&&window.GSPracticum)GSPracticum(root2);
  /* озвучка */
  document.querySelectorAll(".speech-btn").forEach(function(b){
    b.addEventListener("click",function(){
      if(!("speechSynthesis" in window))return;
      var rootEl=b.closest("section")||document;
      var text=rootEl.innerText.slice(0,1200);
      var u=new SpeechSynthesisUtterance(text);u.lang="ru-RU";u.rate=.95;
      speechSynthesis.cancel();speechSynthesis.speak(u);
      b.textContent="Читаю...";
      u.onend=function(){b.textContent="Слушать";};
    });
  });
});
