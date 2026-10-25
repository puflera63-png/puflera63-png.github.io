/* Наполнение раздела теории в DOM */
window.GSTheory=function(root){
  if(!root)return;
  root.innerHTML=
  '<h2>Волшебная сказка и её устройство</h2><p class="age-tag">Этот раздел написан для сказочников 6–10 лет.</p>'+
  '<p class="lead">Учёный Владимир Яковлевич Пропп прочитал сто русских волшебных сказок и открыл чудо: все они собраны из одних и тех же деталей, как дом из кирпичиков. Эти «кирпичики» он назвал <b>функциями</b>. Функция – это поступок, который двигает сказку вперёд: отлучка, запрет, битва, победа. Порядок функций почти всегда один и тот же, поэтому сказки такие разные и при этом такие похожие, как родные сёстры.</p>'+
  '<p>Здесь, на этой странице, спрятаны <b>все 31 функция</b>, семь сказочных ролей и словарик сказочника. Читай, слушай, а потом проверь себя и беги в Мастерскую – сочинять свою собственную сказку!</p>'+
  '<div class="speech-wrap"><button class="speech-btn" type="button">Слушать страницу</button><span class="speech-hint">нажми – и страница прочитает себя вслух</span></div>'+
  '<figure class="pic"><img src="img/vasnetsov-kovyor.jpg" alt="Виктор Васнецов, ковёр-самолёт: Иван-царевич летит над землёй" loading="lazy"><figcaption><b>Виктор Васнецов, «Ковёр-самолёт» (эскиз, 1880).</b> Сказка начинается с дороги – а дорога начинается с мечты.</figcaption></figure>'+
  '<h3>С чего начинается сказка</h3>'+
  '<p>Сначала сказка знакомит нас с миром: <i>«Жили-были старик со старухой…»</i> Это <b>исходная ситуация</b> – она ещё не приключение, а порог, на котором мы снимаем сапоги и входим в сказку. Потом старшие уходят из дома (<b>отлучка</b>), герою что-то запрещают (<b>запрет</b>), запрет нарушается (<b>нарушение</b>) – и сказка делает первый шаг к беде.</p>'+
  '<p>Пропп заметил важный секрет: функции идут в сказке почти всегда в одном порядке. Сначала дому грозит беда или в доме чего-то не хватает, потом герой отправляется в путь, встречает дарителя, получает волшебное средство, сражается со злодеем – и возвращается домой победителем. Некоторые функции могут пропускаться, некоторые повторяться три раза (как три испытания или три сына), но общий порядок остаётся.</p>'+
  '<h3>Все 31 функция волшебной сказки</h3>'+
  '<p>Не пугайся числа: каждая функция – это короткая остановка на карте сказки. Прочитай их как маршрут, а потом найди их в любимых сказках: «Гуси-лебеди», «Царевна-лягушка», «Марья Моревна».</p>'+
  '<div id="proppCards"></div>'+
  '<figure class="pic"><img src="img/vasnetsov-volk.jpg" alt="Виктор Васнецов, Иван-царевич на Сером Волке" loading="lazy"><figcaption><b>Виктор Васнецов, «Иван-царевич на Сером Волке» (1889).</b> Это функции «Перемещение» и «Преследование»: герой мчится домой, а за ним уже летят погони.</figcaption></figure>'+
  '<h3>Семь действующих лиц</h3>'+
  '<p>По Проппу, в волшебной сказке действуют семь главных ролей. Один персонаж может совмещать две роли, а «царевна» – это не всегда принцесса: это то самое, ради чего герой идёт в дорогу.</p>'+
  '<div id="roleCards"></div>'+
  '<figure class="pic"><img src="img/bilibin-koshchey.jpg" alt="Иван Билибин, Кощей Бессмертный на коне" loading="lazy"><figcaption><b>Иван Билибин, «Кощей Бессмертный» (1901).</b> Кощей – главный вредитель: ради него завязывается вся сказка.</figcaption></figure>'+
  '<h3>Даритель и волшебный дар</h3>'+
  '<p>В середине пути герой встречает самого загадочного героя сказки – <b>дарителя</b>. Это Баба-Яга у избушки, старичок у леса, печка или яблонька. Даритель сначала испытывает героя: попроси ли ты с ним поделиться, будешь ли ты вежлив. А потом вручает волшебное средство: клубочек, который показывает дорогу, коня, меч или шапку-невидимку.</p>'+
  '<figure class="pic"><img src="img/bilibin-vasilisa.jpg" alt="Иван Билибин, Василиса Прекрасная у избы Бабы-яги" loading="lazy"><figcaption><b>Иван Билибин, «Василиса Прекрасная у избы Бабы-яги» (1899).</b> Баба-Яга испытывает Василису: не всякий гость уходит от неё с подарком, но добрый и терпеливый – уходит.</figcaption></figure>'+
  '<h3>Словарик сказочника</h3>'+
  '<dl class="dict"><dt>Функция</dt><dd>поступок героя или злодея, который двигает сказку вперёд.</dd>'+
  '<dt>Вредитель</dt><dd>тот, кто приносит в сказку беду: крадёт, обманывает, губит.</dd>'+
  '<dt>Даритель</dt><dd>тот, кто испытывает героя и дарит волшебное средство.</dd>'+
  '<dt>Помощник</dt><dd>верный спутник героя: Серый Волк, Конёк-Горбунок, клубочек.</dd>'+
  '<dt>Ложный герой</dt><dd>тот, кто присваивает чужую победу. У него ничего не выйдет: победу узнают по метке!</dd>'+
  '<dt>Троичность</dt><dd>любимое волшебное число сказки: три сына, три испытания, три ночи боя.</dd></dl>'+
  '<h3>Проверь себя: викторина</h3><div id="quizBox"></div>'+
  '<h3>Найди функцию в отрывке</h3><p>Прочитай отрывок из народной сказки и выбери, какая функция в нём спряталась.</p><div id="excerptBox"></div>'+
  '<h3>Найди лишнее</h3><p>Три слова из сказки, одно – из другого мира.</p><div id="oddBox"></div>'+
  '<h3>Соедини функцию и пример из сказки</h3><div id="matchBox"></div>'+
  '<p class="final-note">Когда всё получится – тебе откроется <a href="#practicumRoot">Мастерская сказочника</a>: конструктор сюжета, кубики сказителя и твоя собственная книга сказок.</p>';
};

/* Озвучка страницы */
function initSpeech(){
  var btn=document.querySelector('.speech-btn');if(!btn)return;
  if(!('speechSynthesis' in window)){btn.parentElement.remove();return;}
  var reading=false,idx=0,blocks=[];
  function collect(){
    var sec=btn.closest('section')||document;
    blocks=[];
    sec.querySelectorAll('#theoryRoot h2, #theoryRoot h3, #theoryRoot p, #theoryRoot li, #theoryRoot figcaption, #theoryRoot .pcard, #theoryRoot .role-card, #theoryRoot .dict dt, #theoryRoot .dict dd').forEach(function(e){
      if(e.closest('.speech-wrap'))return;
      var t=(e.innerText||'').trim();
      if(t)blocks.push({el:e,text:t});
    });
  }
  function stop(){speechSynthesis.cancel();reading=false;btn.textContent='Слушать страницу';blocks.forEach(function(b){b.el.classList.remove('reading');});}
  btn.addEventListener('click',function(){
    if(reading){stop();return;}
    collect();if(!blocks.length)return;
    reading=true;btn.textContent='Остановить';idx=0;
    speechSynthesis.cancel();
    (function next(){
      if(!reading||idx>=blocks.length){stop();return;}
      var b=blocks[idx++];
      b.el.classList.add('reading');
      if(b.el.scrollIntoView)b.el.scrollIntoView({block:'center',behavior:'smooth'});
      var u=new SpeechSynthesisUtterance(b.text);
      u.lang='ru-RU';u.rate=.95;
      var ru=speechSynthesis.getVoices().filter(function(v){return v.lang&&v.lang.indexOf('ru')===0;})[0];
      if(ru)u.voice=ru;
      u.onend=function(){b.el.classList.remove('reading');next();};
      u.onerror=function(){b.el.classList.remove('reading');next();};
      speechSynthesis.speak(u);
    })();
  });
}
document.addEventListener("DOMContentLoaded",function(){
  var root=document.getElementById("theoryRoot");
  if(root&&window.GSTheory)GSTheory(root);
  var root2=document.getElementById("practicumRoot");
  if(root2&&window.GSPracticum)GSPracticum(root2);
  initSpeech();
});
