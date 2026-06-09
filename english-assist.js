(function () {
  const labels = {
    title: '原创辅助学习',
    note: '教材原文保留。本区为原创辅助学习内容，用来帮助孩子预习、跟读、复习和输出。',
    objectives: '学习目标',
    wordLevels: '词汇分层',
    substitution: '句型替换练习',
    roleplay: '角色扮演',
    listening: '听力练习',
    phonics: '自然拼读',
    classroom: '课堂用语',
    output: '口语输出任务',
    path: '单元复习路径',
    lightGrammar: '句型小规律',
    extraQuiz: '拓展小测',
    review: '阶段复习',
    source: '资料说明',
    gradeFocus: '本年级学习重点',
    memory: '记忆窍门',
    challenge: '进阶任务',
    themePhrases: '主题短语包',
    scenarioQA: '情景问答',
    miniReading: '微阅读与复述',
    recitePhonics: '跟读背诵与自然拼读',
    progress: '学习进度',
    dictation: '听写拼写',
    recommendation: '测后建议',
    mistakes: '错题复习',
    must: '必会词',
    read: '认读词',
    extra: '拓展词',
    speak: '点读',
    clear: '清空错题',
    noMistakes: '还没有错题。小测答错后会自动收集到这里。',
  };

  const htmlEscape = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();

  const normalizeLessonKey = value => clean(value).toLowerCase();

  function getUnits() {
    if (Array.isArray(window.COURSE_UNITS)) return window.COURSE_UNITS;
    if (Array.isArray(window.unitsData)) return window.unitsData;
    return [];
  }

  function unitKey(unit, index) {
    return unit.id || `unit-${index + 1}`;
  }

  function inferGrade() {
    const text = `${document.title || ''} ${location.pathname || ''} ${window.COURSE_TITLE || ''}`;
    if (/一年级|english-1/i.test(text)) return 1;
    if (/二年级|english-2/i.test(text)) return 2;
    if (/三年级|grade3|english-learning/i.test(text)) return 3;
    if (/四年级|grade4/i.test(text)) return 4;
    if (/五年级|english-5/i.test(text)) return 5;
    return 3;
  }

  function isGrade3BPage() {
    const text = `${document.title || ''} ${location.pathname || ''}`;
    return /三年级下册|english-learning(?:-fixed)?\.html/i.test(text);
  }

  function getWords(unit) {
    return (unit.words || []).filter(item => item && item.en);
  }

  function getLessonVocabulary(unit) {
    const seen = new Set();
    return [...(unit.words || []), ...(unit.phrases || [])]
      .filter(item => item && item.en)
      .map(item => ({
        ...item,
        kind: (unit.phrases || []).includes(item) ? '短语' : '词汇',
      }))
      .filter(item => {
        const key = normalizeLessonKey(item.en);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function getSentences(unit) {
    return (unit.sentences || []).filter(item => item && item.en);
  }

  function getDialogues(unit) {
    return (unit.dialogue || unit.story || []).filter(item => item && item.text);
  }

  function setSpeakButtonPlaying(button, isPlaying) {
    if (!button) return;
    button.classList.toggle('is-playing', isPlaying);
    button.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    const label = button.querySelector('.assist-speak-label');
    if (label) {
      if (!label.dataset.defaultLabel) label.dataset.defaultLabel = label.textContent || labels.speak;
      label.textContent = isPlaying ? '播放中' : label.dataset.defaultLabel;
    }
  }

  function clearSpeakButtons(exceptButton) {
    document.querySelectorAll('.assist-speak.is-playing').forEach(button => {
      if (button !== exceptButton) setSpeakButtonPlaying(button, false);
    });
  }

  function speak(text, button, options = {}) {
    if (!text) return;
    clearSpeakButtons(button);
    setSpeakButtonPlaying(button, true);
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setSpeakButtonPlaying(button, false);
    };
    if (typeof window.speak === 'function') {
      const fallbackTimer = window.setTimeout(finish, Math.max(1200, String(text).length * 110));
      window.speak(text, options, () => {
        window.clearTimeout(fallbackTimer);
        finish();
      });
      return;
    }
    if (!window.speechSynthesis) {
      finish();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = /[\u4e00-\u9fff]/.test(text) ? 'zh-CN' : 'en-US';
    utter.rate = typeof options.rate === 'number' ? options.rate : (utter.lang === 'zh-CN' ? 0.9 : 0.76);
    utter.onend = finish;
    utter.onerror = finish;
    window.speechSynthesis.speak(utter);
  }

  function inferTask(unit) {
    const text = `${unit.title || ''} ${unit.subtitle || ''}`.toLowerCase();
    if (/are you|twin|twins|you are right/.test(text)) return '能确认人物身份，并做完整的肯定或否定回答。';
    if (/school things|schoolbag|pencil case|pen|pencil|ruler|rubber/.test(text)) return '能介绍学习用品，并按要求说出摆放或整理动作。';
    if (/our classroom|classroom|window|blackboard|desk|chair|sweep|floor|put away/.test(text)) return '能介绍教室里的物品，并说出整理教室时要做的事。';
    if (/rule|rules|library|shout|talk|sit down|late|don'?t/.test(text)) return '能说出课堂或图书馆规则，并提醒别人遵守。';
    if (/where is|under|behind|by the|after class|outside/.test(text)) return '能描述物品或小动物的位置，并围绕课后活动做简单表达。';
    if (/birthday|cake|gift|card|wish/.test(text)) return '能围绕生日祝福、礼物和感谢进行表达。';
    if (/hobbies|interests/.test(text)) return '能表达自己的爱好，并说出愿意和同伴一起做什么。';
    if (/season|spring|summer|autumn|winter/.test(text)) return '能介绍季节、天气和适合的活动。';
    if (/family|mother|father|grandpa|friend|name|hello/.test(text)) return '能介绍自己、朋友或家人。';
    if (/subject|school|lesson|day|time|week/.test(text)) return '能谈论学校生活、课程或时间。';
    if (/can|sport|basketball|football|table tennis/.test(text)) return '能询问和表达会不会做某事。';
    if (/weather|season|wear|clothes/.test(text)) return '能描述天气、季节或穿着。';
    if (/animal|farm|zoo/.test(text)) return '能介绍动物名称和简单特征。';
    if (/colour|toy|fruit|food/.test(text)) return '能描述颜色、物品、水果或食物。';
    if (/travel|vacation|summer|museum/.test(text)) return '能介绍旅行安排、出行方式或假期计划。';
    if (/future|plan|goal|job|career/.test(text)) return '能说出自己的计划、梦想或职业想法。';
    if (/health|fitness|exercise|healthy/.test(text)) return '能表达健康习惯和运动安排。';
    if (/technology|internet|computer|science|discovery/.test(text)) return '能介绍科技工具、实验或新发现。';
    if (/environment|global|climate|pollution|recycle/.test(text)) return '能表达环保做法和全球问题。';
    if (/culture|tradition|festival|story|literature/.test(text)) return '能围绕故事、文化或传统进行简单表达。';
    return '能围绕本单元主题进行简单交流。';
  }

  const themeLibrary = {
    greeting: {
      phrases: [
        { en: 'say hello', cn: '打招呼', emoji: '👋' },
        { en: 'good morning', cn: '早上好', emoji: '🌅' },
        { en: 'my name is ...', cn: '我的名字是……', emoji: '🪪' },
        { en: 'nice to meet you', cn: '很高兴见到你', emoji: '😊' },
        { en: 'say goodbye', cn: '说再见', emoji: '👋' },
      ],
      qa: [
        { q: 'What is your name?', a: 'My name is Lily.', tip: '第一次见面先问姓名，再完整回答。' },
        { q: 'How are you?', a: 'I am fine, thank you.', tip: '问候后顺着回答近况。' },
        { q: 'Good morning, Miss Li.', a: 'Good morning, boys and girls.', tip: '早上见老师时用 Good morning。' },
      ],
      reading: {
        title: '在校门口打招呼',
        lines: [
          { en: 'Hello! I am Ben.', cn: '你好！我是本。' },
          { en: 'Good morning, Miss Li.', cn: '李老师，早上好。' },
          { en: 'My name is Amy.', cn: '我的名字是艾米。' },
          { en: 'Goodbye! See you tomorrow.', cn: '再见！明天见。' },
        ],
        questions: ['Who says good morning?', 'What is the girl\'s name?', 'What do they say at the end?'],
        support: ['Hello! I am ...', 'My name is ...', 'Goodbye! See you.'],
      },
      output: ['和 1 位家人做见面问候。', '先说 Hello / Good morning，再介绍自己的名字。', '最后用 Goodbye 或 See you 结束对话。'],
    },
    numbers: {
      phrases: [
        { en: 'count to ten', cn: '数到十', emoji: '🔢' },
        { en: 'how many', cn: '多少', emoji: '❓' },
        { en: 'show me five', cn: '给我看五', emoji: '🖐️' },
        { en: 'three books', cn: '三本书', emoji: '📚' },
      ],
      qa: [
        { q: 'How many crayons do you have?', a: 'I have six crayons.', tip: '先回答数字，再说名词。' },
        { q: 'Can you count from one to ten?', a: 'Yes. One, two, three ... ten.', tip: '边点边数更容易记住。' },
        { q: 'Show me seven.', a: 'Here is seven.', tip: '一边做动作一边说数字。' },
      ],
      reading: {
        title: '数一数玩具',
        lines: [
          { en: 'I have two balls.', cn: '我有两个球。' },
          { en: 'Tom has three cars.', cn: '汤姆有三辆小汽车。' },
          { en: 'We can see four kites.', cn: '我们能看到四只风筝。' },
          { en: 'How many toys are there? There are nine.', cn: '有多少玩具？有九个。' },
        ],
        questions: ['How many balls are there?', 'Who has three cars?', 'How many toys are there in all?'],
        support: ['I have ...', 'There are ...', 'How many ...?'],
      },
      output: ['拿 5 个小物品边指边数。', '用 I have ... 说 2 句自己的数字句。', '和家人轮流提问 How many ...?'],
    },
    colors: {
      phrases: [
        { en: 'red ball', cn: '红球', emoji: '🔴' },
        { en: 'blue kite', cn: '蓝风筝', emoji: '🔵' },
        { en: 'what colour', cn: '什么颜色', emoji: '🌈' },
        { en: 'I like green', cn: '我喜欢绿色', emoji: '🟢' },
      ],
      qa: [
        { q: 'What colour is your bag?', a: 'It is blue.', tip: '回答颜色时可直接用 It is ...' },
        { q: 'Do you like yellow?', a: 'Yes, I do. Yellow is bright.', tip: '先回答 Yes / No，再补一句理由。' },
        { q: 'What colour do you want?', a: 'I want red, please.', tip: '把颜色和想要的东西连起来说。' },
      ],
      reading: {
        title: '画彩虹',
        lines: [
          { en: 'I draw a rainbow.', cn: '我画了一道彩虹。' },
          { en: 'The kite is red and yellow.', cn: '风筝是红黄相间的。' },
          { en: 'My bag is blue.', cn: '我的书包是蓝色的。' },
          { en: 'I like green best.', cn: '我最喜欢绿色。' },
        ],
        questions: ['What does the child draw?', 'What colour is the bag?', 'Which colour does the child like best?'],
        support: ['It is ...', 'I like ...', 'What colour is ...?'],
      },
      output: ['找 3 个身边物品，用 It is ... 说颜色。', '说一句自己最喜欢的颜色和原因。', '用两种颜色描述一件物品。'],
    },
    animals: {
      phrases: [
        { en: 'at the zoo', cn: '在动物园', emoji: '🦁' },
        { en: 'a cute rabbit', cn: '一只可爱的兔子', emoji: '🐰' },
        { en: 'can swim', cn: '会游泳', emoji: '🐟' },
        { en: 'look at the bird', cn: '看那只鸟', emoji: '🐦' },
      ],
      qa: [
        { q: 'What animal do you like?', a: 'I like pandas.', tip: '说出喜欢的动物，再补一句原因。' },
        { q: 'Can the fish swim?', a: 'Yes, it can.', tip: '会不会做某事可以用 can 回答。' },
        { q: 'What is this?', a: 'It is a monkey.', tip: '先判断是什么动物，再完整回答。' },
      ],
      reading: {
        title: '在动物园',
        lines: [
          { en: 'We are at the zoo today.', cn: '今天我们在动物园。' },
          { en: 'The monkey is funny.', cn: '猴子很有趣。' },
          { en: 'The bird can fly high.', cn: '鸟会飞得很高。' },
          { en: 'I like the little rabbit best.', cn: '我最喜欢小兔子。' },
        ],
        questions: ['Where are they today?', 'Which animal can fly high?', 'What animal does the child like best?'],
        support: ['It is a ...', 'It can ...', 'I like ... best.'],
      },
      output: ['选 1 种动物说名字、外形和本领。', '把 at the zoo 作为开头说 3 句话。', '和同伴做“你猜是什么动物”的问答。'],
    },
    family: {
      phrases: [
        { en: 'family photo', cn: '家庭照片', emoji: '📷' },
        { en: 'my grandpa', cn: '我的爷爷', emoji: '👴' },
        { en: 'this is my mum', cn: '这是我的妈妈', emoji: '👩' },
        { en: 'love my family', cn: '爱我的家人', emoji: '❤️' },
      ],
      qa: [
        { q: 'Who is he?', a: 'He is my father.', tip: '介绍男性家人时用 He is ...' },
        { q: 'Who is she?', a: 'She is my grandma.', tip: '介绍女性家人时用 She is ...' },
        { q: 'Is he your brother?', a: 'Yes, he is.', tip: '一般疑问句先用 Yes / No 回答。' },
      ],
      reading: {
        title: '我的全家福',
        lines: [
          { en: 'This is my family photo.', cn: '这是我的全家福。' },
          { en: 'My father is tall and kind.', cn: '我的爸爸又高又和善。' },
          { en: 'My mother can cook nice food.', cn: '我的妈妈会做美味的食物。' },
          { en: 'I love my family very much.', cn: '我非常爱我的家人。' },
        ],
        questions: ['What is in the picture?', 'Who is tall and kind?', 'Who can cook nice food?'],
        support: ['This is my ...', 'He / She is ...', 'I love my family.'],
      },
      output: ['拿一张家庭照片做 30 秒介绍。', '至少介绍 2 位家人。', '最后说一句 I love my family.'],
    },
    school: {
      phrases: [
        { en: 'go to school', cn: '去上学', emoji: '🏫' },
        { en: 'in the classroom', cn: '在教室里', emoji: '🪑' },
        { en: 'have English', cn: '上英语课', emoji: '📘' },
        { en: 'after school', cn: '放学后', emoji: '⏰' },
      ],
      qa: [
        { q: 'What subjects do you like?', a: 'I like English and PE.', tip: '回答科目时可一次说两个。' },
        { q: 'What time do you go to school?', a: 'I go to school at seven.', tip: '时间前常用 at。' },
        { q: 'Where is your classroom?', a: 'It is on the second floor.', tip: '地点回答可用 in / on / at。' },
      ],
      reading: {
        title: '我的学校一天',
        lines: [
          { en: 'I go to school at seven thirty.', cn: '我七点半去上学。' },
          { en: 'We have Chinese and Maths in the morning.', cn: '我们上午上语文和数学。' },
          { en: 'I read in the library after lunch.', cn: '午饭后我在图书馆阅读。' },
          { en: 'After school, I play with my friends.', cn: '放学后我和朋友一起玩。' },
        ],
        questions: ['When does the child go to school?', 'What do they have in the morning?', 'Where does the child read after lunch?'],
        support: ['I go to school at ...', 'We have ...', 'After school, I ...'],
      },
      output: ['按“上学时间-课程-放学后”活动说 3 句。', '用 at / in / after school 各说 1 句。', '如果是高年级，再补一句自己最喜欢的课程。'],
    },
    body: {
      phrases: [
        { en: 'touch your nose', cn: '摸摸你的鼻子', emoji: '👃' },
        { en: 'clap your hands', cn: '拍拍手', emoji: '👏' },
        { en: 'wash your face', cn: '洗脸', emoji: '🫧' },
        { en: 'strong legs', cn: '强壮的腿', emoji: '🦵' },
      ],
      qa: [
        { q: 'What is this?', a: 'It is my hand.', tip: '指着身体部位说 It is my ...' },
        { q: 'How many eyes do you have?', a: 'I have two eyes.', tip: '身体部位数量可以直接回答。' },
        { q: 'Can you touch your head?', a: 'Yes, I can.', tip: '边做动作边回答更牢。' },
      ],
      reading: {
        title: '做早操',
        lines: [
          { en: 'Touch your head and shoulders.', cn: '摸摸你的头和肩膀。' },
          { en: 'Clap your hands three times.', cn: '拍三下手。' },
          { en: 'Stamp your feet and jump high.', cn: '跺跺脚，再跳高。' },
          { en: 'Our bodies are strong and healthy.', cn: '我们的身体强壮又健康。' },
        ],
        questions: ['What do you touch first?', 'How many times do you clap?', 'How are the bodies?'],
        support: ['This is my ...', 'I have ...', 'I can touch ...'],
      },
      output: ['边做动作边说 3 个身体部位。', '用 I have ... 说 2 句。', '高年级可补一句身体部位的特点。'],
    },
    food: {
      phrases: [
        { en: 'healthy breakfast', cn: '健康早餐', emoji: '🥣' },
        { en: 'drink milk', cn: '喝牛奶', emoji: '🥛' },
        { en: 'eat fruit', cn: '吃水果', emoji: '🍎' },
        { en: 'would like', cn: '想要', emoji: '🍽️' },
      ],
      qa: [
        { q: 'What do you like to eat?', a: 'I like noodles and eggs.', tip: '把喜欢吃的食物连起来说。' },
        { q: 'Would you like some milk?', a: 'Yes, please.', tip: '礼貌回答常用 Yes, please. / No, thanks.' },
        { q: 'Is fruit healthy?', a: 'Yes, it is.', tip: '健康饮食主题要多说 healthy。' },
      ],
      reading: {
        title: '我的早餐',
        lines: [
          { en: 'I have bread and milk for breakfast.', cn: '我早餐吃面包喝牛奶。' },
          { en: 'My sister likes eggs and fruit.', cn: '我姐姐喜欢鸡蛋和水果。' },
          { en: 'We drink water after PE class.', cn: '体育课后我们喝水。' },
          { en: 'Healthy food helps us grow.', cn: '健康食物帮助我们成长。' },
        ],
        questions: ['What does the child have for breakfast?', 'What does the sister like?', 'What helps us grow?'],
        support: ['I like ...', 'I have ... for breakfast.', 'Would you like ...?'],
      },
      output: ['介绍一次自己的早餐。', '至少说出 2 种健康食物。', '高年级补一句为什么它健康。'],
    },
    clothes: {
      phrases: [
        { en: 'put on your coat', cn: '穿上外套', emoji: '🧥' },
        { en: 'a blue T-shirt', cn: '一件蓝色 T 恤', emoji: '👕' },
        { en: 'whose shoes', cn: '谁的鞋', emoji: '👟' },
        { en: 'wear warm clothes', cn: '穿暖和的衣服', emoji: '🧣' },
      ],
      qa: [
        { q: 'What are you wearing?', a: 'I am wearing a red coat.', tip: '先说颜色，再说衣物。' },
        { q: 'Whose hat is this?', a: 'It is my hat.', tip: '物主关系要说清楚。' },
        { q: 'What do you wear in winter?', a: 'I wear a sweater and a coat.', tip: '季节和衣服可以连起来说。' },
      ],
      reading: {
        title: '出门前穿衣服',
        lines: [
          { en: 'It is cold today.', cn: '今天天冷。' },
          { en: 'I put on my sweater and coat.', cn: '我穿上毛衣和外套。' },
          { en: 'My little sister wears a pink dress.', cn: '我的妹妹穿着粉色连衣裙。' },
          { en: 'We are ready to go out now.', cn: '我们现在准备出门了。' },
        ],
        questions: ['How is the weather today?', 'What does the child put on?', 'What colour is the sister\'s dress?'],
        support: ['I wear ...', 'It is my ...', 'What are you wearing?'],
      },
      output: ['介绍今天自己穿了什么。', '用颜色 + 衣物说 2 句。', '高年级可补一句穿这套衣服的原因。'],
    },
    toys: {
      phrases: [
        { en: 'toy car', cn: '玩具汽车', emoji: '🚗' },
        { en: 'teddy bear', cn: '泰迪熊', emoji: '🧸' },
        { en: 'fly a kite', cn: '放风筝', emoji: '🪁' },
        { en: 'play with blocks', cn: '玩积木', emoji: '🧱' },
      ],
      qa: [
        { q: 'What toy do you like?', a: 'I like toy planes.', tip: '玩具主题可以直接说 favourite toy。' },
        { q: 'Can you fly a kite?', a: 'Yes, I can.', tip: '玩具和动作经常一起出现。' },
        { q: 'Whose teddy bear is this?', a: 'It is my teddy bear.', tip: '加入物主代词让表达更完整。' },
      ],
      reading: {
        title: '玩具时间',
        lines: [
          { en: 'I have a toy car and a robot.', cn: '我有一辆玩具汽车和一个机器人。' },
          { en: 'My brother likes his teddy bear best.', cn: '我弟弟最喜欢他的泰迪熊。' },
          { en: 'We fly a kite in the park.', cn: '我们在公园放风筝。' },
          { en: 'Playing together is great fun.', cn: '一起玩很有趣。' },
        ],
        questions: ['What toys does the child have?', 'Who likes the teddy bear best?', 'Where do they fly a kite?'],
        support: ['I have ...', 'I like ... best.', 'We play with ...'],
      },
      output: ['介绍 1 个自己最喜欢的玩具。', '说出它的颜色或样子。', '再说你会怎样玩它。'],
    },
    weather: {
      phrases: [
        { en: 'sunny day', cn: '晴天', emoji: '☀️' },
        { en: 'rainy weather', cn: '雨天', emoji: '🌧️' },
        { en: 'in spring', cn: '在春天', emoji: '🌸' },
        { en: 'take an umbrella', cn: '带一把伞', emoji: '☂️' },
      ],
      qa: [
        { q: 'What is the weather like today?', a: 'It is sunny and warm.', tip: '天气可以连说两个特点。' },
        { q: 'Which season do you like?', a: 'I like autumn best.', tip: '季节表达常和 favourite / best 连用。' },
        { q: 'What do you do on rainy days?', a: 'I read books at home.', tip: '天气和活动可以连起来说。' },
      ],
      reading: {
        title: '四季和天气',
        lines: [
          { en: 'Spring is warm and green.', cn: '春天温暖又绿色盎然。' },
          { en: 'Summer is hot and sunny.', cn: '夏天炎热又晴朗。' },
          { en: 'In autumn, we can fly kites.', cn: '秋天我们可以放风筝。' },
          { en: 'In winter, I wear warm clothes.', cn: '冬天我穿暖和的衣服。' },
        ],
        questions: ['How is spring?', 'What can we do in autumn?', 'What do you wear in winter?'],
        support: ['It is ...', 'I like ... best.', 'In ..., I ...'],
      },
      output: ['介绍今天的天气。', '说一个自己喜欢的季节和活动。', '高年级补一句穿什么或带什么。'],
    },
    actions: {
      phrases: [
        { en: 'play football', cn: '踢足球', emoji: '⚽' },
        { en: 'ride a bike', cn: '骑自行车', emoji: '🚲' },
        { en: 'clean the room', cn: '打扫房间', emoji: '🧹' },
        { en: 'jump high', cn: '跳得高', emoji: '⛹️' },
      ],
      qa: [
        { q: 'What can you do?', a: 'I can dance and sing.', tip: '会做什么要把 can 放在动词前。' },
        { q: 'What do you do after school?', a: 'I play football after school.', tip: '活动最好带上时间或地点。' },
        { q: 'Do you help at home?', a: 'Yes. I clean my room.', tip: '家务动作也属于日常活动。' },
      ],
      reading: {
        title: '忙碌的下午',
        lines: [
          { en: 'I run on the playground after school.', cn: '放学后我在操场跑步。' },
          { en: 'My sister can dance very well.', cn: '我姐姐跳舞跳得很好。' },
          { en: 'At home, I clean the table and water the flowers.', cn: '在家里，我擦桌子、给花浇水。' },
          { en: 'Being active makes me happy.', cn: '积极活动让我开心。' },
        ],
        questions: ['Where does the child run?', 'What can the sister do?', 'What does the child do at home?'],
        support: ['I can ...', 'I like to ...', 'After school, I ...'],
      },
      output: ['连续说出 3 个自己会做或常做的动作。', '至少用 1 个 after school / at home。', '高年级再补一句你最喜欢哪项活动。'],
    },
    home: {
      phrases: [
        { en: 'in the bedroom', cn: '在卧室里', emoji: '🛏️' },
        { en: 'on the sofa', cn: '在沙发上', emoji: '🛋️' },
        { en: 'open the door', cn: '打开门', emoji: '🚪' },
        { en: 'tidy the room', cn: '整理房间', emoji: '🧺' },
      ],
      qa: [
        { q: 'Where is your book?', a: 'It is on the desk.', tip: '位置题先找介词。' },
        { q: 'What is in your bedroom?', a: 'There is a bed and a lamp.', tip: '房间里有什么可用 There is / are。' },
        { q: 'Do you help at home?', a: 'Yes. I tidy my room.', tip: '家的主题也可以连到家务。' },
      ],
      reading: {
        title: '我的房间',
        lines: [
          { en: 'This is my bedroom.', cn: '这是我的卧室。' },
          { en: 'My books are on the table.', cn: '我的书在桌子上。' },
          { en: 'There is a lamp by my bed.', cn: '我的床边有一盏灯。' },
          { en: 'I keep my room clean every day.', cn: '我每天保持房间整洁。' },
        ],
        questions: ['What room is it?', 'Where are the books?', 'What is by the bed?'],
        support: ['There is ...', 'It is on / in / under ...', 'This is my ...'],
      },
      output: ['介绍自己的一个房间。', '至少说出 2 个家具或物品的位置。', '最后说一句自己会怎样保持整洁。'],
    },
    shopping: {
      phrases: [
        { en: 'buy a toy', cn: '买一个玩具', emoji: '🛍️' },
        { en: 'choose this one', cn: '选这个', emoji: '☝️' },
        { en: 'would like some juice', cn: '想来点果汁', emoji: '🧃' },
        { en: 'here you are', cn: '给你', emoji: '🤲' },
      ],
      qa: [
        { q: 'What would you like?', a: 'I would like some bread.', tip: '礼貌表达时多用 would like。' },
        { q: 'Which one do you choose?', a: 'I choose the blue one.', tip: '做选择时要说清楚是哪一个。' },
        { q: 'Can I have this toy?', a: 'Yes, here you are.', tip: '购物场景常出现 Can I have ...?。' },
      ],
      reading: {
        title: '在商店里',
        lines: [
          { en: 'I am in a toy shop with my mum.', cn: '我和妈妈在玩具店。' },
          { en: 'I would like a small robot.', cn: '我想要一个小机器人。' },
          { en: 'My mum says, "Choose one, please."', cn: '妈妈说：“请选一个。”' },
          { en: 'I choose the blue robot and say thank you.', cn: '我选了蓝色机器人并说谢谢。' },
        ],
        questions: ['Where are they?', 'What would the child like?', 'Which robot does the child choose?'],
        support: ['I would like ...', 'Can I have ...?', 'I choose ...'],
      },
      output: ['和家人做一次“买东西”角色扮演。', '必须说出 I would like ... / I choose ...。', '最后补一句 thank you。'],
    },
    travel: {
      phrases: [
        { en: 'go by train', cn: '坐火车去', emoji: '🚆' },
        { en: 'visit the museum', cn: '参观博物馆', emoji: '🏛️' },
        { en: 'summer vacation', cn: '暑假', emoji: '🏖️' },
        { en: 'take photos', cn: '拍照', emoji: '📸' },
      ],
      qa: [
        { q: 'Where do you want to go?', a: 'I want to go to Beijing.', tip: '旅行表达常用 want to go to ...' },
        { q: 'How do you travel there?', a: 'I go there by train.', tip: '交通方式前常用 by。' },
        { q: 'What are your holiday plans?', a: 'I am going to visit a museum.', tip: '假期计划可用 be going to。' },
      ],
      reading: {
        title: '我的假期计划',
        lines: [
          { en: 'This summer, my family is going to Hangzhou.', cn: '这个夏天，我家要去杭州。' },
          { en: 'We go there by train.', cn: '我们坐火车去那里。' },
          { en: 'We want to visit the West Lake and take photos.', cn: '我们想游览西湖并拍照。' },
          { en: 'It will be a great vacation.', cn: '这会是一次很棒的假期。' },
        ],
        questions: ['Where is the family going?', 'How do they go there?', 'What do they want to visit?'],
        support: ['I want to go to ...', 'I go there by ...', 'I am going to ...'],
      },
      output: ['说出一个想去的地方。', '说明怎么去、去做什么。', '高年级再补一句为什么想去。'],
    },
    social: {
      phrases: [
        { en: 'good friends', cn: '好朋友', emoji: '🤝' },
        { en: 'help each other', cn: '互相帮助', emoji: '🫶' },
        { en: 'play together', cn: '一起玩', emoji: '🎉' },
        { en: 'happy birthday', cn: '生日快乐', emoji: '🎂' },
      ],
      qa: [
        { q: 'Who is your good friend?', a: 'Amy is my good friend.', tip: '朋友主题可以先说人，再说关系。' },
        { q: 'Can you help me?', a: 'Yes. Let me help you.', tip: '请求帮助后要学会回应。' },
        { q: 'What do you do at a birthday party?', a: 'We sing and share a cake.', tip: '聚会主题适合用 and 连动作。' },
      ],
      reading: {
        title: '和朋友一起',
        lines: [
          { en: 'Amy and I are good friends.', cn: '艾米和我是好朋友。' },
          { en: 'We study together at school.', cn: '我们在学校一起学习。' },
          { en: 'When she needs help, I help her.', cn: '当她需要帮助时，我帮助她。' },
          { en: 'Good friends share and care.', cn: '好朋友会分享，也会关心彼此。' },
        ],
        questions: ['Who are good friends?', 'Where do they study together?', 'What does the child do when Amy needs help?'],
        support: ['We are ...', 'Let me help you.', 'We ... together.'],
      },
      output: ['介绍一位朋友或一次聚会。', '至少说 1 句互相帮助的内容。', '如果是生日主题，再补一句祝福。'],
    },
    health: {
      phrases: [
        { en: 'do exercise', cn: '做运动', emoji: '🏃' },
        { en: 'drink more water', cn: '多喝水', emoji: '💧' },
        { en: 'go to bed early', cn: '早睡', emoji: '🌙' },
        { en: 'keep healthy', cn: '保持健康', emoji: '💪' },
      ],
      qa: [
        { q: 'How do you keep healthy?', a: 'I do exercise and eat fruit.', tip: '健康主题要把动作和食物一起说。' },
        { q: 'What do you do every day?', a: 'I walk to school and drink water.', tip: 'daily habit 适合用一般现在时。' },
        { q: 'Do you go to bed early?', a: 'Yes, I do.', tip: '好习惯可以用 Yes, I do. 来确认。' },
      ],
      reading: {
        title: '健康的一天',
        lines: [
          { en: 'I get up early every morning.', cn: '我每天早上早起。' },
          { en: 'I do exercise in the park.', cn: '我在公园做运动。' },
          { en: 'I eat vegetables and drink water.', cn: '我吃蔬菜并喝水。' },
          { en: 'These habits help me stay healthy.', cn: '这些习惯帮助我保持健康。' },
        ],
        questions: ['When does the child get up?', 'Where does the child do exercise?', 'What helps the child stay healthy?'],
        support: ['I do ... every day.', 'I eat / drink ...', 'It is healthy to ...'],
      },
      output: ['介绍 2-3 个自己的健康习惯。', '至少用 1 个 every day。', '高年级补一句还想改进什么习惯。'],
    },
    jobs: {
      phrases: [
        { en: 'be a doctor', cn: '成为医生', emoji: '🩺' },
        { en: 'help people', cn: '帮助人们', emoji: '🧑‍⚕️' },
        { en: 'work at school', cn: '在学校工作', emoji: '🏫' },
        { en: 'dream job', cn: '梦想职业', emoji: '✨' },
      ],
      qa: [
        { q: 'What does your mother do?', a: 'She is a teacher.', tip: '职业表达先问 does ... do。' },
        { q: 'What do you want to be?', a: 'I want to be a doctor.', tip: '用 want to be 说自己的梦想。' },
        { q: 'Why do you like this job?', a: 'Because I can help people.', tip: '职业主题很适合加 because。' },
      ],
      reading: {
        title: '我的梦想职业',
        lines: [
          { en: 'My father is a bus driver.', cn: '我爸爸是一名公交车司机。' },
          { en: 'He works hard every day.', cn: '他每天工作都很努力。' },
          { en: 'I want to be a doctor in the future.', cn: '我将来想成为一名医生。' },
          { en: 'I want to help many people.', cn: '我想帮助很多人。' },
        ],
        questions: ['What is the father\'s job?', 'How does he work?', 'What does the child want to be?'],
        support: ['He / She is a ...', 'I want to be ...', 'Because I can ...'],
      },
      output: ['介绍 1 位家人的职业。', '再说自己的梦想职业。', '高年级补一句选择这个职业的原因。'],
    },
    plans: {
      phrases: [
        { en: 'future plan', cn: '未来计划', emoji: '📅' },
        { en: 'next weekend', cn: '下周末', emoji: '🗓️' },
        { en: 'be going to', cn: '打算', emoji: '➡️' },
        { en: 'set a goal', cn: '设定目标', emoji: '🎯' },
      ],
      qa: [
        { q: 'What are you going to do this weekend?', a: 'I am going to read and draw.', tip: '计划主题常用 be going to。' },
        { q: 'What is your goal?', a: 'My goal is to speak English every day.', tip: '目标可以直接放在 My goal is ... 后面。' },
        { q: 'When will you start?', a: 'I will start tomorrow.', tip: 'will 也能表达未来打算。' },
      ],
      reading: {
        title: '我的小计划',
        lines: [
          { en: 'I have a plan for next week.', cn: '我为下周做了一个计划。' },
          { en: 'I am going to read English for ten minutes every day.', cn: '我打算每天读 10 分钟英语。' },
          { en: 'On Saturday, I will visit my grandparents.', cn: '周六我会去看望祖父母。' },
          { en: 'Small plans can help me grow.', cn: '小计划能帮助我成长。' },
        ],
        questions: ['What does the child have?', 'How long will the child read English every day?', 'Who will the child visit on Saturday?'],
        support: ['I am going to ...', 'I will ...', 'My goal is ...'],
      },
      output: ['说一个本周或暑假的计划。', '至少用 1 次 be going to 或 will。', '最后补一句自己的目标。'],
    },
    technology: {
      phrases: [
        { en: 'use the computer', cn: '使用电脑', emoji: '💻' },
        { en: 'search online', cn: '上网搜索', emoji: '🔎' },
        { en: 'make a robot', cn: '做一个机器人', emoji: '🤖' },
        { en: 'science experiment', cn: '科学实验', emoji: '🧪' },
      ],
      qa: [
        { q: 'What can you do on the computer?', a: 'I can draw and learn English.', tip: '科技工具最好和用途连起来说。' },
        { q: 'What did you discover?', a: 'I discovered a new way to make a paper plane.', tip: '科学主题可以说发现了什么。' },
        { q: 'Do you use the internet for study?', a: 'Yes, I do.', tip: 'internet 主题常和 study / learn 连用。' },
      ],
      reading: {
        title: '小小科学家',
        lines: [
          { en: 'Our class does a science experiment today.', cn: '我们班今天做了一个科学实验。' },
          { en: 'We use a computer to watch the steps.', cn: '我们用电脑看步骤。' },
          { en: 'Then we make a small robot with blocks.', cn: '然后我们用积木做了一个小机器人。' },
          { en: 'Science is fun and full of surprises.', cn: '科学有趣又充满惊喜。' },
        ],
        questions: ['What does the class do today?', 'What do they use to watch the steps?', 'What do they make?'],
        support: ['We use ... to ...', 'I can ... with ...', 'Science is ...'],
      },
      output: ['介绍一种自己会用的科技工具。', '说它能帮你做什么。', '高年级补一句你做过的科学小实验。'],
    },
    environment: {
      phrases: [
        { en: 'save water', cn: '节约用水', emoji: '💧' },
        { en: 'recycle paper', cn: '回收纸张', emoji: '♻️' },
        { en: 'plant trees', cn: '种树', emoji: '🌳' },
        { en: 'protect the earth', cn: '保护地球', emoji: '🌍' },
      ],
      qa: [
        { q: 'How can we protect the earth?', a: 'We can plant trees and save water.', tip: '环保主题很适合用 We can ...' },
        { q: 'Do you recycle bottles?', a: 'Yes, I do.', tip: '把具体环保动作说出来更真实。' },
        { q: 'Why is clean water important?', a: 'Because all people need it.', tip: '可以用 because 解释原因。' },
      ],
      reading: {
        title: '一起爱护地球',
        lines: [
          { en: 'Our earth is our home.', cn: '地球是我们的家。' },
          { en: 'We should save water and turn off the lights.', cn: '我们应该节水并关灯。' },
          { en: 'At school, we recycle paper and bottles.', cn: '在学校，我们回收纸张和瓶子。' },
          { en: 'Small actions can make a big difference.', cn: '小行动也能带来大改变。' },
        ],
        questions: ['What is our home?', 'What should we save?', 'What do they recycle at school?'],
        support: ['We should ...', 'We can ...', 'It is important to ...'],
      },
      output: ['说出 2-3 个环保做法。', '至少用 1 个 should 或 can。', '高年级补一句自己最想坚持的环保习惯。'],
    },
    culture: {
      phrases: [
        { en: 'traditional food', cn: '传统食物', emoji: '🥟' },
        { en: 'festival show', cn: '节日表演', emoji: '🎊' },
        { en: 'welcome guests', cn: '欢迎客人', emoji: '🤗' },
        { en: 'cultural story', cn: '文化故事', emoji: '🏮' },
      ],
      qa: [
        { q: 'What festival do you like?', a: 'I like the Spring Festival.', tip: '文化主题可以先说节日名称。' },
        { q: 'What food do people eat then?', a: 'They eat dumplings.', tip: '文化和食物常常连在一起。' },
        { q: 'How do you welcome guests?', a: 'I say hello and share food.', tip: '描述文化行为时多用动作。' },
      ],
      reading: {
        title: '节日里的家',
        lines: [
          { en: 'My family gets together at the festival.', cn: '节日时我们全家团聚。' },
          { en: 'We cook traditional food and tell stories.', cn: '我们做传统食物并讲故事。' },
          { en: 'The children sing and dance happily.', cn: '孩子们高兴地唱歌跳舞。' },
          { en: 'The festival is warm and full of love.', cn: '节日温暖又充满爱。' },
        ],
        questions: ['What does the family do at the festival?', 'What do they cook?', 'How is the festival?'],
        support: ['We ... at the festival.', 'People eat ...', 'It is ... and ...'],
      },
      output: ['介绍一个自己熟悉的节日或传统。', '至少说 1 个食物或活动。', '高年级补一句你喜欢它的原因。'],
    },
    stories: {
      phrases: [
        { en: 'read a story', cn: '读故事', emoji: '📖' },
        { en: 'favourite character', cn: '最喜欢的人物', emoji: '🧙' },
        { en: 'tell the ending', cn: '讲结尾', emoji: '🔚' },
        { en: 'from the book', cn: '来自书里', emoji: '📚' },
      ],
      qa: [
        { q: 'What story do you like?', a: 'I like stories about animals.', tip: '故事主题可以先说种类。' },
        { q: 'Who is your favourite character?', a: 'My favourite character is Alice.', tip: '人物表达用 My favourite character is ...' },
        { q: 'Can you tell the ending?', a: 'Yes. The children go home happily.', tip: '结尾复述适合用简单句。' },
      ],
      reading: {
        title: '睡前故事',
        lines: [
          { en: 'I read a story before bed every night.', cn: '我每晚睡前读一个故事。' },
          { en: 'The story is about a brave little girl.', cn: '这个故事讲的是一个勇敢的小女孩。' },
          { en: 'She helps her friends and finds a treasure.', cn: '她帮助朋友，还找到了宝藏。' },
          { en: 'I want to read the story again tomorrow.', cn: '我明天还想再读一遍这个故事。' },
        ],
        questions: ['When does the child read a story?', 'Who is the story about?', 'What does the girl find?'],
        support: ['The story is about ...', 'My favourite character is ...', 'At the end, ...'],
      },
      output: ['介绍一本读过的故事书。', '说出人物和发生的一件事。', '高年级补一句你喜欢这个故事的原因。'],
    },
    generic: {
      phrases: [
        { en: 'listen and repeat', cn: '听并跟读', emoji: '🔊' },
        { en: 'say a sentence', cn: '说一句话', emoji: '💬' },
        { en: 'work with a partner', cn: '和同伴练习', emoji: '👫' },
        { en: 'check again', cn: '再检查一次', emoji: '✅' },
      ],
      qa: [
        { q: 'What do you learn in this unit?', a: 'I learn new words and sentences.', tip: '先说 learn，再说内容。' },
        { q: 'Can you say a sentence with a new word?', a: 'Yes, I can.', tip: '把单词放进句子里才算会用。' },
        { q: 'What will you review today?', a: 'I will review the key words first.', tip: '复习时先词后句更稳。' },
      ],
      reading: {
        title: '今天的学习',
        lines: [
          { en: 'Today I learn new words.', cn: '今天我学了新单词。' },
          { en: 'I read the sentences aloud.', cn: '我大声读句子。' },
          { en: 'Then I do a small quiz.', cn: '然后我做了一个小测验。' },
          { en: 'I am happy because I can say more English.', cn: '我很开心，因为我会说更多英语了。' },
        ],
        questions: ['What does the child learn today?', 'What does the child do after reading?', 'Why is the child happy?'],
        support: ['I learn ...', 'I can say ...', 'Then I ...'],
      },
      output: ['说出本单元学会的 3 个词或短语。', '用其中 1 个词说一句完整句。', '最后说出接下来还要复习什么。'],
    },
  };

  Object.assign(themeLibrary, {
    identity: {
      phrases: [
        { en: 'are you ...?', cn: '你是……吗？', emoji: '❓' },
        { en: 'I am not', cn: '我不是', emoji: '🙅' },
        { en: 'twin sisters', cn: '双胞胎姐妹', emoji: '👭' },
        { en: 'you are right', cn: '你说对了', emoji: '✅' },
      ],
      qa: [
        { q: 'Are you Su Hai?', a: 'No, I am not. I am Su Yang.', tip: '先回答是不是，再补充自己是谁。' },
        { q: 'Are you twins?', a: 'Yes, we are.', tip: '问两个人时，回答里常用 we are。' },
        { q: 'You are right.', a: 'Thank you.', tip: '别人确认正确时，可以自然回应。' },
      ],
      reading: {
        title: '认错人了',
        lines: [
          { en: 'Mike sees two girls at school.', cn: '迈克在学校里看见两个女孩。' },
          { en: 'He asks, "Are you Su Hai?"', cn: '他问：“你是苏海吗？”' },
          { en: '"No, I am not. I am Su Yang," says the girl.', cn: '那个女孩说：“不，我不是。我是苏阳。”' },
          { en: 'Mike smiles and says, "Oh, you are twins!"', cn: '迈克笑着说：“哦，你们是双胞胎！”' },
        ],
        questions: ['Who does Mike see at school?', 'Who is the girl?', 'What does Mike know at the end?'],
        support: ['Are you ...?', 'No, I am not.', 'You are right.'],
      },
      output: ['和同伴练习 1 轮“认错人”对话。', '至少说出 1 组身份信息，如 sister / brother / twin。', '最后用 Sorry. 或 You are right. 结束对话。'],
    },
    schoolThings: {
      phrases: [
        { en: 'pencil case', cn: '铅笔盒', emoji: '✏️' },
        { en: 'schoolbag', cn: '书包', emoji: '🎒' },
        { en: 'long ruler', cn: '长尺子', emoji: '📏' },
        { en: 'put it in', cn: '把它放进去', emoji: '📥' },
      ],
      qa: [
        { q: 'What is that?', a: 'That is a pencil case.', tip: '先说 That is ...，再说具体物品。' },
        { q: 'Where is your pen?', a: 'It is in my schoolbag.', tip: '学习用品主题里可以顺带练 in。' },
        { q: 'Put your ruler in the pencil case.', a: 'OK.', tip: '听到指令后，先做动作再回应。' },
      ],
      reading: {
        title: 'In my schoolbag',
        lines: [
          { en: 'I open my schoolbag after class.', cn: '下课后我打开书包。' },
          { en: 'There is a pencil case, a pen and a long ruler in it.', cn: '里面有一个铅笔盒、一支钢笔和一把长尺子。' },
          { en: 'I put my pencil in the pencil case.', cn: '我把铅笔放进铅笔盒。' },
          { en: 'Now my school things are tidy.', cn: '现在我的学习用品很整齐。' },
        ],
        questions: ['What is in the schoolbag?', 'What does the child put in the pencil case?', 'Are the school things tidy now?'],
        support: ['That is ...', 'It is in ...', 'Put ... in ...'],
      },
      output: ['拿自己的书包介绍 3 样学习用品。', '至少用 1 次 in 说物品位置。', '最后说一句自己是怎样整理书包的。'],
    },
    classroom: {
      phrases: [
        { en: 'close the window', cn: '关窗户', emoji: '🪟' },
        { en: 'sweep the floor', cn: '扫地', emoji: '🧹' },
        { en: 'put away things', cn: '收好东西', emoji: '📚' },
        { en: 'clean desk', cn: '擦桌子', emoji: '🪑' },
      ],
      qa: [
        { q: 'Where is the blackboard?', a: 'It is in the classroom.', tip: '先说地点，再补具体教室物品。' },
        { q: 'What do we do after class?', a: 'We put away our things.', tip: '教室主题适合用 we 来说集体动作。' },
        { q: 'Is the floor dirty?', a: 'Yes. Let us sweep the floor.', tip: '先判断，再说要做什么。' },
      ],
      reading: {
        title: 'Cleaning our classroom',
        lines: [
          { en: 'Our classroom is bright and clean in the morning.', cn: '早上我们的教室明亮又整洁。' },
          { en: 'After class, we close the window and put away our things.', cn: '下课后，我们关上窗户，收好东西。' },
          { en: 'Ben sweeps the floor and Amy cleans the desks.', cn: '本负责扫地，艾米负责擦桌子。' },
          { en: 'We like our tidy classroom.', cn: '我们喜欢整洁的教室。' },
        ],
        questions: ['How is the classroom in the morning?', 'What do the children do after class?', 'Who sweeps the floor?'],
        support: ['It is in the classroom.', 'Let us ...', 'We ... after class.'],
      },
      output: ['介绍教室里 2 样物品。', '说出 2 件整理教室时会做的事。', '最后说一句你希望教室是什么样子。'],
    },
    positions: {
      phrases: [
        { en: 'under the tree', cn: '在树下面', emoji: '🌳' },
        { en: 'behind the tree', cn: '在树后面', emoji: '🌲' },
        { en: 'by the flower', cn: '在花旁边', emoji: '🌸' },
        { en: 'have fun after class', cn: '课后玩得开心', emoji: '🎈' },
      ],
      qa: [
        { q: 'Where is the duck?', a: 'It is under the tree.', tip: '先回答位置，再说具体地点。' },
        { q: 'Where is the flower?', a: 'It is behind the tree.', tip: '方位表达要先想清楚参照物。' },
        { q: 'What do you do after class?', a: 'We play outside and have fun.', tip: '可以把课后活动和地点连起来说。' },
      ],
      reading: {
        title: 'After-class fun',
        lines: [
          { en: 'The children play outside after class.', cn: '孩子们下课后在外面玩。' },
          { en: 'A duck is under the tree.', cn: '一只鸭子在树下面。' },
          { en: 'A flower is behind the tree, and a plane is by the bench.', cn: '一朵花在树后面，一架玩具飞机在长椅旁边。' },
          { en: 'They look, find and have fun together.', cn: '他们一起观察、寻找，玩得很开心。' },
        ],
        questions: ['When do the children play?', 'Where is the duck?', 'What is by the bench?'],
        support: ['It is under ...', 'It is behind ...', 'We have fun ...'],
      },
      output: ['用 under / behind / by 各说 1 句位置句。', '补充 1 句课后会做的活动。', '最后把两个位置句连成 1 段小表达。'],
    },
    rules: {
      phrases: [
        { en: 'be quiet', cn: '保持安静', emoji: '🤫' },
        { en: "don't run", cn: '不要跑', emoji: '🏃' },
        { en: 'sit down', cn: '坐下', emoji: '🪑' },
        { en: "don't be late", cn: '不要迟到', emoji: '⏰' },
      ],
      qa: [
        { q: 'What should we do in the library?', a: 'We should be quiet.', tip: '规则主题先说 should 或直接说规则内容。' },
        { q: 'Can we run in the library?', a: 'No. Don’t run.', tip: '先回答不可以，再说规则。' },
        { q: 'Are you late today?', a: 'No, I am not.', tip: '规则也可以和日常表现联系起来。' },
      ],
      reading: {
        title: 'Library rules',
        lines: [
          { en: 'We go to the library after lunch.', cn: '午饭后我们去图书馆。' },
          { en: 'There is a sign: "Be quiet. Don’t shout."', cn: '那里有一块牌子：“保持安静，不要喊叫。”' },
          { en: 'We sit down and read our books.', cn: '我们坐下来读书。' },
          { en: 'Following rules makes the library nice.', cn: '遵守规则会让图书馆更好。' },
        ],
        questions: ['Where do the children go?', 'What does the sign say?', 'What do the children do there?'],
        support: ['Be quiet.', "Don't ...", 'Sit down, please.'],
      },
      output: ['说出 2 条你记住的规则。', '至少用 1 次 Don’t ... 或 Be ...。', '最后补一句为什么要遵守规则。'],
    },
    birthday: {
      phrases: [
        { en: 'happy birthday', cn: '生日快乐', emoji: '🎂' },
        { en: 'birthday cake', cn: '生日蛋糕', emoji: '🍰' },
        { en: 'this gift is for you', cn: '这个礼物是给你的', emoji: '🎁' },
        { en: 'make a wish', cn: '许个愿', emoji: '✨' },
      ],
      qa: [
        { q: 'What do you say on a birthday?', a: 'Happy Birthday!', tip: '生日主题先学会祝福语。' },
        { q: 'This card is for you.', a: 'Thank you!', tip: '收到礼物要及时回应感谢。' },
        { q: 'What do you do before eating the cake?', a: 'I make a wish.', tip: '把生日活动顺序说出来。' },
      ],
      reading: {
        title: 'A birthday party',
        lines: [
          { en: 'Today is Anna’s birthday.', cn: '今天是安娜的生日。' },
          { en: 'Her friends sing Happy Birthday to her.', cn: '她的朋友们给她唱生日歌。' },
          { en: 'Mum brings a cake and Dad gives her a card.', cn: '妈妈端来蛋糕，爸爸送给她一张卡片。' },
          { en: 'Anna makes a wish and says thank you.', cn: '安娜许了愿，并说谢谢。' },
        ],
        questions: ['Whose birthday is it?', 'What do the friends sing?', 'What does Anna do at the end?'],
        support: ['Happy Birthday!', 'This ... is for you.', 'Thank you!'],
      },
      output: ['说出 1 句生日祝福。', '补充 1 件生日会上会做的事。', '最后用 for you 或 thank you 说一句完整的话。'],
    },
    seasons: {
      phrases: [
        { en: 'in spring', cn: '在春天', emoji: '🌱' },
        { en: 'hot summer', cn: '炎热的夏天', emoji: '🌞' },
        { en: 'cool autumn', cn: '凉爽的秋天', emoji: '🍂' },
        { en: 'cold winter', cn: '寒冷的冬天', emoji: '⛄' },
      ],
      qa: [
        { q: 'Which season do you like best?', a: 'I like spring best.', tip: '季节主题常用 like ... best。' },
        { q: 'What can you do in summer?', a: 'I can swim in summer.', tip: '把季节和活动连起来说。' },
        { q: 'Is winter cold?', a: 'Yes, it is.', tip: '先判断天气，再说感受。' },
      ],
      reading: {
        title: 'Four seasons',
        lines: [
          { en: 'Spring is warm and green.', cn: '春天温暖，绿意盎然。' },
          { en: 'Summer is hot, and we can swim.', cn: '夏天很热，我们可以游泳。' },
          { en: 'Autumn is cool, and the leaves are beautiful.', cn: '秋天凉爽，树叶很漂亮。' },
          { en: 'Winter is cold, but snow is fun.', cn: '冬天很冷，但是雪很好玩。' },
        ],
        questions: ['How is spring?', 'What can we do in summer?', 'Is winter fun?'],
        support: ['I like ... best.', 'It is ... in ...', 'We can ...'],
      },
      output: ['说出你最喜欢的季节。', '用 2 个词描述它的天气。', '最后说 1 件你在这个季节会做的事。'],
    },
    hobbies: {
      phrases: [
        { en: 'like drawing', cn: '喜欢画画', emoji: '🎨' },
        { en: 'read stories', cn: '读故事', emoji: '📖' },
        { en: 'play after school', cn: '放学后玩', emoji: '⚽' },
        { en: 'do it together', cn: '一起做', emoji: '🤝' },
      ],
      qa: [
        { q: 'What are your hobbies?', a: 'I like drawing and reading.', tip: '爱好主题可以一次说两个。' },
        { q: 'Do you like dancing?', a: 'Yes, I do.', tip: '先 Yes / No，再补自己的爱好。' },
        { q: 'What do you do after school?', a: 'I read stories after school.', tip: '把爱好和时间连起来表达。' },
      ],
      reading: {
        title: 'My hobbies',
        lines: [
          { en: 'I have many hobbies after school.', cn: '放学后我有很多爱好。' },
          { en: 'I like drawing pictures and reading stories.', cn: '我喜欢画画，也喜欢读故事。' },
          { en: 'On Saturday, I play ball games with my friends.', cn: '星期六，我和朋友一起玩球类游戏。' },
          { en: 'Hobbies make my week interesting.', cn: '爱好让我的一周变得有趣。' },
        ],
        questions: ['When does the child do these hobbies?', 'What does the child like doing?', 'Who plays ball games together?'],
        support: ['I like ...', 'After school, I ...', 'Let us ... together.'],
      },
      output: ['介绍自己的 2 个爱好。', '至少用 1 次 after school 或 on Saturday。', '最后邀请同伴和你一起做其中 1 项活动。'],
    },
  });

  function inferThemeKey(unit) {
    const text = `${unit.title || ''} ${unit.subtitle || ''} ${(unit.words || []).map(item => item.en).join(' ')}`.toLowerCase();
    if (/hello|name|good morning|greeting/.test(text)) return 'greeting';
    if (/number|one|two|three|four|five|six|seven|eight|nine|ten/.test(text)) return 'numbers';
    if (/colour|color|red|blue|green|yellow|orange|pink|purple/.test(text)) return 'colors';
    if (/animal|zoo|farm|cat|dog|rabbit|bear|monkey|elephant|bird|fish/.test(text)) return 'animals';
    if (/are you|twin|twins|you are right/.test(text)) return 'identity';
    if (/birthday|cake|gift|card|wish/.test(text)) return 'birthday';
    if (/family|mother|father|grandpa|grandma|mum|dad|sister|brother/.test(text)) return 'family';
    if (/school things|schoolbag|pencil case|pen|pencil|ruler|rubber/.test(text)) return 'schoolThings';
    if (/our classroom|classroom|window|blackboard|desk|chair|sweep|floor|put away/.test(text)) return 'classroom';
    if (/rule|rules|library|shout|talk|sit down|late|don'?t/.test(text)) return 'rules';
    if (/where is|under|behind|by the|after class|outside/.test(text)) return 'positions';
    if (/school|classroom|subject|lesson|day|week|daily life|my day|my week|new school|going to school/.test(text)) return 'school';
    if (/body|head|hand|arm|leg|eye|face|mouth|nose/.test(text)) return 'body';
    if (/food|fruit|healthy eating|eat|bread|milk|rice|noodle|egg|juice|breakfast|eating out/.test(text)) return 'food';
    if (/clothes|shirt|coat|dress|shoe|sock|wear|sweater|hat/.test(text)) return 'clothes';
    if (/toy|kite|teddy|doll|robot|car|blocks/.test(text)) return 'toys';
    if (/season|spring|summer|autumn|winter/.test(text)) return 'seasons';
    if (/weather|season|spring|summer|autumn|winter|sunny|rainy|windy|cloudy/.test(text)) return 'weather';
    if (/hobbies|interests/.test(text)) return 'hobbies';
    if (/action|sport|hobb|fitness|exercise|football|basketball|run|jump|swim|dance|sing|chores|clean/.test(text)) return 'actions';
    if (/home|bedroom|kitchen|bathroom|living room|sofa|lamp|table/.test(text)) return 'home';
    if (/shopping|choice|choose|shop|market|buy/.test(text)) return 'shopping';
    if (/travel|vacation|museum|trip|summer holiday|summer vacation/.test(text)) return 'travel';
    if (/friend|birthday|party|helping others|we are friends|fun together/.test(text)) return 'social';
    if (/health|healthy|fitness/.test(text)) return 'health';
    if (/job|doctor|teacher|driver|profession|career/.test(text)) return 'jobs';
    if (/future|plan|goal/.test(text)) return 'plans';
    if (/technology|internet|computer|robot|science|discovery|invention/.test(text)) return 'technology';
    if (/environment|global|climate|pollution|recycle|earth/.test(text)) return 'environment';
    if (/culture|tradition|festival|custom/.test(text)) return 'culture';
    if (/story|literature|novel|book/.test(text)) return 'stories';
    return 'generic';
  }

  function getThemeContent(unit) {
    return themeLibrary[inferThemeKey(unit)] || themeLibrary.generic;
  }

  function mergeThemeItems(baseItems, extraItems, limit = 8) {
    const merged = [];
    const seen = new Set();
    [...(baseItems || []), ...(extraItems || [])].forEach(item => {
      if (!item || !item.en) return;
      const key = normalizeLessonKey(item.en);
      if (!key || seen.has(key)) return;
      seen.add(key);
      merged.push(item);
    });
    return merged.slice(0, limit);
  }

  function buildObjectives(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    const grade = inferGrade();
    return [
      `会听、会读 ${Math.min(words.length, 8)} 个左右核心词。`,
      sentences[0] ? `会说核心句型：${sentences[0].en}` : '会说本单元核心句型。',
      grade <= 2 ? '能听懂、跟读并看图说出关键词。' : inferTask(unit),
    ];
  }

  function splitWords(unit) {
    const words = getWords(unit);
    return {
      must: words.slice(0, 6),
      read: words.slice(6, 10),
      extra: words.slice(10, 14),
    };
  }

  function buildSubstitutions(unit) {
    const sentence = getSentences(unit)[0];
    const words = getWords(unit).filter(word => /^[A-Za-z][A-Za-z -]*$/.test(word.en)).slice(0, 3);
    if (!sentence || !words.length) return [];

    const base = sentence.en.includes('...')
      ? sentence.en
      : sentence.en.replace(/\b([A-Za-z]+)\b(?=[.?!]?)/, '...');

    return words.map(word => ({
      en: base.includes('...') ? base.replace('...', word.en) : `${sentence.en} ${word.en}`,
      cn: `替换词：${word.cn || word.en}`,
    }));
  }

  function buildListening(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    const items = [];
    if (words[0]) items.push({ title: '听音选词', text: words[0].en, tip: `听到的是哪个词？${words.slice(0, 4).map(word => word.en).join(' / ')}` });
    if (sentences[0]) items.push({ title: '听句跟读', text: sentences[0].en, tip: '听句子，跟读一遍，再说出中文意思。' });
    if (sentences[1]) items.push({ title: '听问选答', text: sentences[1].en, tip: '听句子，判断它是问句还是答句。' });
    return items;
  }

  function buildRoleplay(unit) {
    const lines = getDialogues(unit);
    if (lines.length) {
      return lines.slice(0, 4).map((line, index) => ({
        role: line.speaker || (index % 2 ? 'B' : 'A'),
        en: line.text,
        cn: line.cn || '',
      }));
    }
    return getSentences(unit).slice(0, 2).map((line, index) => ({
      role: index % 2 ? 'B' : 'A',
      en: line.en,
      cn: line.cn || '',
    }));
  }

  function buildPhonics(unit) {
    const word = getWords(unit).find(item => /^[A-Za-z]/.test(item.en));
    if (!word) return ['先听单词，再模仿开头音和结尾音。'];
    const letters = word.en.toLowerCase().replace(/[^a-z]/g, '');
    if (!letters) return ['先听单词，再模仿开头音和结尾音。'];
    const head = letters.slice(0, Math.min(2, letters.length));
    const tail = letters.length > 2 ? letters.slice(-2) : letters.slice(-1);
    return [
      `听 ${word.en}，找一找开头 ${head} 的发音。`,
      `再听一遍，注意结尾 ${tail} 是否轻读。`,
      '跟读时先慢后快，声音要清楚。',
    ];
  }

  function buildOutputTask(unit) {
    const task = inferTask(unit);
    const sentence = getSentences(unit)[0]?.en || 'I can say something about this unit.';
    const themeOutput = (getThemeContent(unit).output || []).slice(0, 2);
    return [
      ...themeOutput,
      `${task} 试着连续说 2-3 句话。`,
      `必须用到一句：${sentence}`,
      inferGrade() >= 4 ? '尽量加上 and、because、then 等连接词。' : '可以替换自己的姓名、物品、课程、颜色或动作。',
    ].slice(0, 4);
  }

  function buildStudyPath() {
    return ['听音导入', '单词认读', '单词听写', '句型替换', '对话跟读', '小测验', '错题再练', '口头输出'];
  }

  function buildLightGrammar(unit) {
    const sentences = getSentences(unit).map(item => item.en);
    const joined = sentences.join(' ').toLowerCase();
    const rules = [];
    if (/this is/.test(joined)) rules.push({ pattern: 'This is ...', tip: '介绍近处的人或物，意思是“这是……”。', example: sentences.find(s => /this is/i.test(s)) || 'This is my friend.' });
    if (/these are/.test(joined)) rules.push({ pattern: 'These are ...', tip: '介绍多个近处的人或物，意思是“这些是……”。', example: sentences.find(s => /these are/i.test(s)) || 'These are apples.' });
    if (/what('| i)?s|what is/.test(joined)) rules.push({ pattern: 'What is ...?', tip: '询问“是什么”，回答时用 It is ... 或 This is ...。', example: sentences.find(s => /what('| i)?s|what is/i.test(s)) || 'What is this?' });
    if (/\bare\b|\bis\b/.test(joined) && /\?/.test(joined)) rules.push({ pattern: 'Are/Is ...?', tip: '一般疑问句，回答常用 Yes 或 No。', example: sentences.find(s => /\?/.test(s)) || 'Are you Su Hai?' });
    if (/\bi like\b/.test(joined)) rules.push({ pattern: 'I like ...', tip: '表达喜欢，后面可以接食物、颜色、运动或动物。', example: sentences.find(s => /i like/i.test(s)) || 'I like apples.' });
    if (/\bcan\b/.test(joined)) rules.push({ pattern: 'Can you ...?', tip: '询问会不会做某事，回答 Yes, I can. / No, I cannot.', example: sentences.find(s => /can/i.test(s)) || 'Can you swim?' });
    if (/let('|’)?s/.test(joined)) rules.push({ pattern: "Let's ...", tip: '邀请别人一起做某事，后面接动词原形。', example: sentences.find(s => /let('|’)?s/i.test(s)) || "Let's play." });
    if (/\bdon'?t\b/.test(joined)) rules.push({ pattern: "Don't ...", tip: '表示“不要……”，常用于规则和提醒。', example: sentences.find(s => /don'?t/i.test(s)) || "Don't run." });
    if (/\bwhere\b/.test(joined)) rules.push({ pattern: 'Where is/are ...?', tip: '询问位置，回答可以用 in、on、under、behind。', example: sentences.find(s => /where/i.test(s)) || 'Where is my bag?' });
    if (/what colour|color/.test(joined)) rules.push({ pattern: 'What colour is ...?', tip: '询问颜色，回答 It is red/blue/...。', example: sentences.find(s => /what colour|color/i.test(s)) || 'What colour is it?' });
    if (rules.length) return rules.slice(0, 3);
    return [{ pattern: '主语 + 动词/表述', tip: '先找到“谁”，再说“做什么/是什么”，句子就清楚了。', example: sentences[0] || 'I can say it.' }];
  }

  function buildExtraQuiz(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    const items = [];
    if (words[0]) items.push({ q: `听一听，选出单词：${words.slice(0, 4).map(word => word.en).join(' / ')}`, speak: words[0].en, a: words[0].en });
    if (words[1]) items.push({ q: `${words[1].cn || words[1].en} 的英文是什么？`, speak: words[1].en, a: words[1].en });
    if (sentences[0]) items.push({ q: `这句话可以怎么替换关键词？${sentences[0].en}`, speak: sentences[0].en, a: '换姓名、物品、课程、颜色或动作，再完整说一遍。' });
    if (sentences[1]) items.push({ q: `听句子，判断它是问句还是答句。`, speak: sentences[1].en, a: /\?/.test(sentences[1].en) ? '问句' : '答句/陈述句' });
    return items;
  }

  function buildReview(unit, index) {
    if (index % 2 === 0) return [];
    const units = getUnits();
    const pair = [units[index - 1], unit].filter(Boolean);
    const words = pair.flatMap(item => getWords(item).slice(0, 4));
    const sentences = pair.flatMap(item => getSentences(item).slice(0, 2));
    return [
      `复习范围：${pair.map(item => `${item.title} ${item.subtitle || ''}`.trim()).join(' + ')}`,
      `混合词汇：${words.map(word => word.en).join(' / ')}`,
      sentences[0] ? `混合句型：${sentences.map(item => item.en).join(' | ')}` : '混合句型：用两个单元的重点句各说一句。',
      '输出任务：任选两个单元主题，连续说 4 句话。',
    ];
  }

  function buildGradeFocus(unit) {
    const grade = inferGrade();
    const words = getWords(unit);
    const sentence = getSentences(unit)[0]?.en || 'I can say it.';
    if (grade === 1) {
      return [
        '先听后说，不要求一次记住拼写。',
        `用手指点读 3 个词：${words.slice(0, 3).map(word => word.en).join(' / ') || '本单元核心词'}`,
        '能用一个词或一句短句回答就算完成。',
      ];
    }
    if (grade === 2) {
      return [
        '从“单词”过渡到“短句”，每次说完整一句。',
        `用句型说 2 个新句子：${sentence}`,
        '能听懂问句，并用 Yes/No 或一个短语回答。',
      ];
    }
    if (grade === 3) {
      return [
        '重点练“听懂问题”和“完整回答”。',
        '每个核心句型至少替换 2 次关键词。',
        '开始关注大小写、句号和问号。',
      ];
    }
    if (grade === 4) {
      return [
        '重点练“按主题连续表达”，不要只背孤立单词。',
        '每个单元整理 3 个高频搭配或短语。',
        '能听问句选答句，并能自己改编一段小对话。',
      ];
    }
    return [
      '重点从“会说句子”升级到“会组织一小段话”。',
      '每个单元积累 2 个连接词或时间/地点表达。',
      '能读懂短段落，并用 4-5 句话完成表达任务。',
    ];
  }

  function buildThemePhrases(unit) {
    const theme = getThemeContent(unit);
    const lessonPhrases = (unit.phrases || []).filter(item => item && item.en);
    return mergeThemeItems(lessonPhrases, theme.phrases || [], 6).map(item => ({
      ...item,
      emoji: item.emoji || '🗂️',
      memoryTip: /\s/.test(clean(item.en)) ? buildPhraseMemoryTip(item) : buildWordMemoryTip(item),
    }));
  }

  function buildScenarioQA(unit) {
    const theme = getThemeContent(unit);
    const lessonItems = [];
    const dialogues = getDialogues(unit);
    const sentences = getSentences(unit);

    dialogues.forEach((line, lineIndex) => {
      const question = clean(line.text);
      const answer = clean(dialogues[lineIndex + 1]?.text || '');
      if (!question || !answer || !/[?？]/.test(question)) return;
      lessonItems.push({
        q: question,
        a: answer,
        tip: '先听清问题里的关键词，再用完整短句回答。',
      });
    });

    if (!lessonItems.length && /[?？]/.test(sentences[0]?.en || '') && sentences[1]?.en) {
      lessonItems.push({
        q: sentences[0].en,
        a: sentences[1].en,
        tip: '先判断是问句，再模仿答句完整回答。',
      });
    }

    const merged = [];
    const seen = new Set();
    [...lessonItems, ...(theme.qa || [])].forEach(item => {
      if (!item || !item.q || !item.a) return;
      const key = normalizeLessonKey(item.q);
      if (!key || seen.has(key)) return;
      seen.add(key);
      merged.push(item);
    });
    return merged.slice(0, 4);
  }

  function buildMiniReading(unit) {
    const theme = getThemeContent(unit);
    const reading = theme.reading || themeLibrary.generic.reading;
    const lines = [...(reading.lines || [])];
    const keySentence = getSentences(unit)[0];
    if (keySentence && !lines.some(item => normalizeLessonKey(item.en) === normalizeLessonKey(keySentence.en))) {
      lines.push({
        en: keySentence.en,
        cn: keySentence.cn || '这是本单元的核心句。',
        isKey: true,
      });
    }

    const support = [];
    const seenSupport = new Set();
    [...(reading.support || []), ...buildThemePhrases(unit).slice(0, 3).map(item => item.en)].forEach(item => {
      const text = clean(item);
      const key = normalizeLessonKey(text);
      if (!text || !key || seenSupport.has(key)) return;
      seenSupport.add(key);
      support.push(text);
    });

    return {
      title: reading.title || `${clean(unit.title || '本单元')}微阅读`,
      lines: lines.slice(0, 5),
      questions: (reading.questions || []).slice(0, 3),
      support: support.slice(0, 5),
      output: (theme.output || []).slice(0, 3),
    };
  }

  function renderThemePhrasesCard(unit) {
    const items = buildThemePhrases(unit);
    if (!items.length) return '';
    return `
      <div class="assist-card assist-theme-phrases">
        <h4>${labels.themePhrases}</h4>
        <p class="assist-card-note">把零散单词连成可以直接开口说的短语，再跟读、替换、复用。</p>
        <div class="assist-phrase-list">
          ${items.map(item => `
            <div class="assist-phrase-item">
              <div class="assist-phrase-top">
                <div class="assist-phrase-main">
                  <span class="assist-phrase-emoji" aria-hidden="true">${htmlEscape(item.emoji || '🗂️')}</span>
                  <div>
                    <b>${htmlEscape(item.en)}</b>
                    <small>${htmlEscape(item.cn || '')}</small>
                  </div>
                </div>
                ${speakButton(item.en)}
              </div>
              ${item.memoryTip ? `<div class="assist-phrase-tip">${htmlEscape(item.memoryTip)}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>`;
  }

  function renderScenarioQACard(unit) {
    const items = buildScenarioQA(unit);
    if (!items.length) return '';
    return `
      <div class="assist-card assist-scenario-card">
        <h4>${labels.scenarioQA}</h4>
        <p class="assist-card-note">先听问题，再说答案，最后把名字、物品或地点换成自己的内容。</p>
        <div class="assist-scenario-list">
          ${items.map(item => `
            <div class="assist-scenario-item">
              <div class="assist-scenario-row">
                <span class="assist-scenario-mark">Q</span>
                <div class="assist-scenario-text">
                  <b>${htmlEscape(item.q)}</b>
                  <small>先听清问句，再自己试着答。</small>
                </div>
                ${speakButton(item.q)}
              </div>
              <div class="assist-scenario-row is-answer">
                <span class="assist-scenario-mark">A</span>
                <div class="assist-scenario-text">
                  <b>${htmlEscape(item.a)}</b>
                  ${item.tip ? `<small>${htmlEscape(item.tip)}</small>` : ''}
                </div>
                ${speakButton(item.a)}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function renderMiniReadingCard(unit) {
    const reading = buildMiniReading(unit);
    if (!reading.lines.length) return '';
    return `
      <div class="assist-card assist-mini-reading">
        <h4>${labels.miniReading}</h4>
        <div class="assist-reading-head">
          <b>${htmlEscape(reading.title)}</b>
          <span>先听读，再看中文复述，最后试着脱稿说 2-3 句。</span>
        </div>
        <div class="assist-reading-lines">
          ${reading.lines.map((line, lineIndex) => `
            <div class="assist-reading-line${line.isKey ? ' is-key-line' : ''}">
              <span class="assist-reading-index">${lineIndex + 1}</span>
              <div class="assist-reading-text">
                <b>${htmlEscape(line.en)}</b>
                <small>${htmlEscape(line.cn || '')}${line.isKey ? ' · 本单元核心句' : ''}</small>
              </div>
              ${speakButton(line.en)}
            </div>`).join('')}
        </div>
        <div class="assist-reading-bottom">
          <div class="assist-reading-block">
            <h5>读后想一想</h5>
            <div class="assist-reading-chip-list">
              ${reading.questions.map(item => `<span class="assist-question-chip">${htmlEscape(item)}</span>`).join('')}
            </div>
          </div>
          <div class="assist-reading-block">
            <h5>复述支架</h5>
            <div class="assist-chip-list">
              ${reading.support.map(item => `
                <button class="assist-chip" type="button" data-assist-speak="${htmlEscape(item)}">
                  ${htmlEscape(item)}
                </button>`).join('')}
            </div>
          </div>
        </div>
        <div class="assist-reading-block assist-reading-output">
          <h5>跟着输出</h5>
          <ol>${reading.output.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
        </div>
      </div>`;
  }

  function chunkMeaning(chunk) {
    const meanings = {
      a: '一个',
      an: '一个',
      all: '全部',
      animal: '动物',
      apple: '苹果',
      art: '美术',
      afternoon: '下午',
      after: '之后',
      bag: '包',
      ball: '球',
      basket: '篮子',
      be: '是',
      black: '黑色',
      board: '板',
      book: '书',
      box: '盒子',
      boy: '男孩',
      bear: '熊',
      bed: '床',
      bedroom: '卧室',
      bread: '面包',
      breakfast: '早餐',
      butter: '黄油',
      can: '能',
      car: '汽车',
      card: '卡片',
      cat: '猫',
      chair: '椅子',
      chicken: '鸡',
      class: '班级/课',
      classroom: '教室',
      clean: '打扫',
      colour: '颜色',
      cow: '奶牛',
      day: '天',
      desk: '课桌',
      dog: '狗',
      door: '门',
      duck: '鸭子',
      down: '向下',
      eat: '吃',
      English: '英语',
      farm: '农场',
      fish: '鱼',
      floor: '地板',
      flower: '花',
      foot: '脚',
      football: '足球',
      fruit: '水果',
      garden: '花园',
      girl: '女孩',
      glass: '玻璃',
      glasses: '眼镜',
      good: '好的',
      go: '去',
      grape: '葡萄',
      green: '绿色',
      home: '家',
      IT: '信息技术',
      lesson: '课',
      library: '图书馆',
      look: '看',
      long: '长的',
      living: '生活/居住',
      mail: '信件',
      mango: '芒果',
      Maths: '数学',
      milk: '牛奶',
      morning: '早晨',
      music: '音乐',
      noon: '中午',
      noodles: '面条',
      out: '出去',
      orange: '橙子/橙色',
      panda: '熊猫',
      PE: '体育',
      pen: '钢笔',
      pencil: '铅笔',
      pineapple: '菠萝',
      plane: '飞机',
      playground: '操场',
      play: '玩',
      rabbit: '兔子',
      red: '红色',
      rice: '米饭',
      room: '房间',
      ruler: '尺子',
      school: '学校',
      schoolbag: '书包',
      science: '科学',
      sheep: '羊',
      sit: '坐',
      sport: '运动',
      subject: '学科',
      sun: '太阳',
      tiger: '老虎',
      teddy: '泰迪',
      tree: '树',
      TV: '电视',
      tv: '电视',
      up: '向上',
      window: '窗户',
      yellow: '黄色',
      zoo: '动物园',
      at: '在/向',
      by: '在……旁边；乘坐；通过',
      to: '到',
      from: '从',
      in: '在里面',
      on: '在上面',
      under: '在下面',
      behind: '在后面',
      cloud: '云',
      rain: '雨',
      snow: '雪',
      wind: '风',
      shirt: '衬衫',
      shoes: '鞋子',
      socks: '袜子',
      hat: '帽子',
      coat: '外套',
      table: '桌子',
      sofa: '沙发',
      lamp: '灯',
    };
    return meanings[chunk] || meanings[chunk.toLowerCase()] || '';
  }

  function buildWordMemoryTip(word) {
    const en = clean(word.en);
    if (!en) return '';
    const cn = clean(word.cn);
    const lower = en.toLowerCase();
    const yAdjectiveRoots = {
      sunny: ['sun', '太阳'],
      rainy: ['rain', '雨'],
      cloudy: ['cloud', '云'],
      windy: ['wind', '风'],
      snowy: ['snow', '雪'],
    };
    if (yAdjectiveRoots[lower]) {
      const [root, meaning] = yAdjectiveRoots[lower];
      return `${en} = ${root}（${meaning}）+ y（有……的）；合起来记“${cn || `${meaning}多的`}”。`;
    }
    const actionMemory = {
      hello: '挥挥手说 hello，把“打招呼”的动作和声音一起记。',
      hi: '见到朋友轻轻挥手说 hi，记住这是更随意的“嗨”。',
      goodbye: '挥手离开时说 goodbye，把“再见”的场景记住。',
      morning: '早上起床看太阳，说 morning，把“早晨”放进画面。',
      afternoon: '午饭后到傍晚前说 afternoon，把“下午”放进一天的时间线。',
      name: '指着自己介绍名字：My name is ...，用自我介绍记 name。',
      by: '想象站在树旁边说 by the tree；也可以记 by bus（乘公交）和 by listening（通过听）。',
      one: '伸出 1 根手指说 one。',
      two: '伸出 2 根手指说 two。',
      three: '伸出 3 根手指说 three。',
      four: '伸出 4 根手指说 four。',
      five: '伸出一只手 5 根手指说 five。',
      six: '先 5 根手指再加 1 根，说 six。',
      seven: '先 5 根手指再加 2 根，说 seven。',
      eight: '先 5 根手指再加 3 根，说 eight。',
      nine: '先 5 根手指再加 4 根，说 nine。',
      ten: '两只手全部伸出，说 ten。',
      red: '找一个红色物品，说 red，把颜色和实物绑在一起。',
      yellow: '找一个黄色物品，说 yellow，把颜色和实物绑在一起。',
      blue: '找一个蓝色物品，说 blue，把颜色和实物绑在一起。',
      green: '找一个绿色物品，说 green，把颜色和实物绑在一起。',
      orange: '拿橙子或找橙色物品，说 orange，记“橙子/橙色”。',
      purple: '找紫色物品，说 purple，把颜色和实物绑在一起。',
      pink: '找粉色物品，说 pink，把颜色和实物绑在一起。',
      black: '指黑色物品说 black，把颜色和实物绑在一起。',
      white: '指白色物品说 white，把颜色和实物绑在一起。',
      colour: '看一盒彩笔或彩虹，说 colour，记“颜色”。',
      cat: '学猫叫或做猫爪动作，说 cat。',
      dog: '学小狗汪汪叫，说 dog。',
      bird: '做小鸟扇翅膀动作，说 bird。',
      fish: '做鱼游泳动作，说 fish。',
      rabbit: '做兔耳朵动作，说 rabbit。',
      bear: '张开双臂做大熊动作，说 bear。',
      monkey: '做猴子挠头动作，说 monkey。',
      elephant: '用手臂做长鼻子动作，说 elephant。',
      father: '看家庭照片指爸爸，说 father。',
      mother: '看家庭照片指妈妈，说 mother。',
      brother: '看家庭照片指兄弟，说 brother。',
      sister: '看家庭照片指姐妹，说 sister。',
      family: '看全家福说 family，把一家人放进画面。',
      dad: '指爸爸或照片说 dad，这是口语里的“爸爸”。',
      mum: '指妈妈或照片说 mum，这是口语里的“妈妈”。',
      grandpa: '指爷爷/外公照片说 grandpa。',
      grandma: '指奶奶/外婆照片说 grandma。',
      school: '想象走进学校大门，说 school。',
      classroom: 'class（班级/课）+ room（房间）；上课的房间就是 classroom。',
      desk: '拍拍课桌说 desk。',
      chair: '坐到椅子上说 chair。',
      book: '拿起一本书说 book。',
      pencil: '拿铅笔写一写，说 pencil。',
      ruler: '用尺子量一量，说 ruler。',
      teacher: '指老师或想象老师上课，说 teacher。',
      student: '指自己或同学，说 student。',
      head: '摸摸头，说 head，把动作和“头”绑在一起。',
      face: '双手框住脸，说 face，把动作和“脸”绑在一起。',
      eye: '指一指眼睛，说 eye，把动作和“眼睛”绑在一起。',
      eyes: '指一指双眼，说 eyes，把动作和“眼睛”绑在一起。',
      nose: '点一点鼻子，说 nose，把动作和“鼻子”绑在一起。',
      mouth: '指一指嘴巴，说 mouth，把动作和“嘴巴”绑在一起。',
      ear: '摸摸耳朵，说 ear，把动作和“耳朵”绑在一起。',
      ears: '摸摸两只耳朵，说 ears，把动作和“耳朵”绑在一起。',
      hand: '伸出手，说 hand，把动作和“手”绑在一起。',
      hands: '伸出双手，说 hands，把动作和“手”绑在一起。',
      arm: '抬起胳膊，说 arm，把动作和“胳膊”绑在一起。',
      leg: '拍拍腿，说 leg，把动作和“腿”绑在一起。',
      foot: '跺跺脚，说 foot，把动作和“脚”绑在一起。',
      ball: '拍一拍球或做投球动作，说 ball，把动作和“球”绑在一起。',
      football: '做踢球动作，说 football，把 foot（脚）和 ball（球）连起来记。',
      basketball: '做投篮动作，说 basketball，把 basket（篮子）和 ball（球）连起来记。',
      car: '手扶方向盘做开车动作，说 car，把动作和“汽车”绑在一起。',
      doll: '做抱娃娃的动作，说 doll，把动作和“娃娃”绑在一起。',
      train: '手臂做火车前进动作，说 train。',
      plane: '张开双臂做飞机飞行动作，说 plane。',
      bike: '做骑自行车动作，说 bike。',
      kite: '做放风筝动作，说 kite。',
      toy: '拿一个玩具说 toy，记“玩具”。',
      rice: '看米饭图片或饭碗，说 rice。',
      noodles: '想象用筷子夹面条，说 noodles。',
      bread: '拿面包或看面包图片，说 bread。',
      milk: '做喝牛奶动作，说 milk。',
      egg: '想象敲鸡蛋，说 egg。',
      apple: '拿苹果或看苹果图片，说 apple。',
      banana: '做剥香蕉动作，说 banana。',
      water: '做喝水动作，说 water。',
      juice: '拿果汁盒或做喝果汁动作，说 juice。',
      shirt: '指衬衫或上衣，说 shirt。',
      't-shirt': '看 T 恤上的 T 形，说 T-shirt。',
      skirt: '指裙子或转一圈，说 skirt。',
      dress: '指连衣裙图片，说 dress。',
      pants: '指裤子或拍拍裤腿，说 pants。',
      shoes: '指鞋子或做穿鞋动作，说 shoes。',
      socks: '指袜子或做穿袜子动作，说 socks。',
      hat: '做戴帽子动作，说 hat。',
      coat: '做穿外套动作，说 coat。',
      sweater: '做穿毛衣动作，说 sweater。',
      hot: '扇扇风说 hot，记“热”。',
      cold: '抱住胳膊发抖，说 cold，记“冷”。',
      warm: '双手搓一搓说 warm，记“温暖”。',
      weather: '看窗外天气，说 weather。',
      today: '指日历上的今天，说 today。',
      run: '做跑步动作，说 run。',
      jump: '跳一下说 jump。',
      walk: '走两步说 walk。',
      swim: '做游泳动作，说 swim。',
      dance: '做跳舞动作，说 dance。',
      sing: '做唱歌动作，说 sing。',
      read: '拿书读一读，说 read。',
      write: '拿笔写一写，说 write。',
      draw: '做画画动作，说 draw。',
      play: '做玩耍动作，说 play。',
      blackboard: 'black（黑色）+ board（板）；教室里的黑色板就是 blackboard。',
      window: '指窗户说 window。',
      door: '指门说 door。',
      eraser: '拿橡皮擦一擦，说 eraser。',
      friend: '指好朋友说 friend。',
      happy: '笑一笑说 happy。',
      sad: '做难过表情说 sad。',
      tall: '手举高说 tall。',
      short: '手放低说 short。',
      big: '双手张大说 big。',
      small: '双手缩小说 small。',
      new: '指新东西说 new。',
      old: '指旧东西说 old。',
      nice: '竖大拇指说 nice。',
      home: '想象回到家，说 home。',
      bedroom: 'bed（床）+ room（房间）；有床的房间就是 bedroom。',
      kitchen: '想象做饭的地方，说 kitchen。',
      bathroom: 'bath（洗澡）+ room（房间）；洗澡的房间就是 bathroom。',
      table: '指桌子说 table。',
      sofa: '坐在沙发上说 sofa。',
      tv: '指电视说 TV。',
      bed: '指床说 bed。',
      lamp: '打开灯说 lamp。',
    };
    if (actionMemory[lower]) {
      return `${en}：${actionMemory[lower]}`;
    }
    const chunks = splitWordChunks(en).filter(Boolean);
    const compoundChunks = chunks
      .filter(chunk => chunk.toLowerCase() !== en.toLowerCase())
      .map(chunk => ({ chunk, meaning: chunkMeaning(chunk) }));

    if (compoundChunks.length >= 2 && compoundChunks.every(item => item.meaning)) {
      const meaningfulChunks = compoundChunks.map(item => `${item.chunk}（${item.meaning}）`);
      return `${en} = ${meaningfulChunks.join(' + ')}；把几个熟词合成一幅中文画面，再记“${cn || en}”。`;
    }

    return '';
  }

  function buildPhraseMemoryTip(item) {
    const en = clean(item.en);
    if (!en || !/\s/.test(en)) return '';
    const cn = clean(item.cn);
    const chunks = en.split(/\s+/).filter(Boolean);
    const explained = chunks.map(chunk => {
      const meaning = chunkMeaning(chunk);
      return meaning ? `${chunk}（${meaning}）` : chunk;
    });
    const hasMeaning = explained.some((part, index) => part !== chunks[index]);
    if (!hasMeaning) return '';
    return `${en} = ${explained.join(' + ')}；顺着中文小故事记：${cn || explained.join(' + ')}。`;
  }

  function buildMemoryDrill(unit) {
    const phrases = (unit.phrases || []).filter(item => item && item.en).slice(0, 3);
    const words = getWords(unit).slice(0, 4);
    const sentence = getSentences(unit)[0]?.en || '';
    const phraseTips = phrases.map(buildPhraseMemoryTip).filter(Boolean);
    const wordTips = words.map(buildWordMemoryTip).filter(Boolean);
    const tips = [...phraseTips, ...wordTips];
    tips.push(words.length ? `遮住中文，看英文说意思：${words.map(word => word.en).join(' / ')}` : '遮住中文，看英文说意思。');
    tips.push(sentence ? `把句子分成 2-3 段读：${sentence}` : '把长句分成 2-3 段读，再连起来说。');
    return tips;
  }

  function buildChallenge(unit) {
    const grade = inferGrade();
    const words = getWords(unit).slice(0, 4);
    const sentence = getSentences(unit)[0]?.en || 'I can say it.';
    if (grade <= 2) {
      return [
        '听老师或家长读一个词，指出对应卡片。',
        `任选一个词，用动作或表情演出来：${words.map(word => word.en).join(' / ') || '本单元词汇'}`,
      ];
    }
    if (grade <= 4) {
      return [
        `用这个句型改编 3 句话：${sentence}`,
        '和家长/同学完成 A-B-A-B 四轮对话。',
        '听一遍对话后，说出你听到的 3 个关键词。',
      ];
    }
    return [
      `用至少 4 个词写 4 句话：${words.map(word => word.en).join(' / ') || '本单元核心词'}`,
      '读完对话后，用中文说出大意，再用英文复述 2 句。',
      '把本单元主题和自己的生活联系起来，说一段 30 秒口语。',
    ];
  }

  function splitWordChunks(word) {
    const raw = String(word || '').trim();
    if (!raw) return [];
    if (raw.includes(' ')) return raw.split(/\s+/);
    if (raw.includes('-')) return raw.split('-');
    const lower = raw.toLowerCase();
    const known = {
      pen: ['p', 'en'],
      pencil: ['pen', 'cil'],
      ruler: ['ru', 'ler'],
      rubber: ['rub', 'ber'],
      desk: ['d', 'esk'],
      chair: ['ch', 'air'],
      floor: ['fl', 'oor'],
      school: ['sch', 'ool'],
      close: ['cl', 'ose'],
      clean: ['cl', 'ean'],
      sweep: ['sw', 'eep'],
      keep: ['k', 'eep'],
      dirty: ['dir', 'ty'],
      guess: ['g', 'uess'],
      again: ['a', 'gain'],
      long: ['l', 'ong'],
      thing: ['th', 'ing'],
      schoolbag: ['school', 'bag'],
      'pencil case': ['pencil', 'case'],
      classroom: ['class', 'room'],
      blackboard: ['black', 'board'],
      breakfast: ['break', 'fast'],
      football: ['foot', 'ball'],
      basketball: ['bas', 'ket', 'ball'],
      pineapple: ['pine', 'apple'],
      morning: ['morn', 'ing'],
      afternoon: ['after', 'noon'],
      behind: ['be', 'hind'],
      under: ['un', 'der'],
      colour: ['col', 'our'],
      yellow: ['yel', 'low'],
      animal: ['an', 'i', 'mal'],
      rabbit: ['rab', 'bit'],
      chicken: ['chick', 'en'],
      window: ['win', 'dow'],
    };
    if (known[lower]) return known[lower];
    if (/^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/i.test(raw)) {
      return [raw[0], raw.slice(1)];
    }
    const parts = raw.match(/[^aeiou]*[aeiou]+(?:[^aeiou]{0,2}(?=[^aeiou]*[aeiou]|$))?/gi);
    return parts && parts.length > 1 ? parts : [raw];
  }

  function segmentSentence(sentence) {
    const words = clean(sentence).split(' ').filter(Boolean);
    if (words.length <= 4) return [sentence];
    const chunks = [];
    for (let i = 0; i < words.length; i += 3) {
      chunks.push(words.slice(i, i + 3).join(' '));
    }
    return chunks;
  }

  function maskSentence(sentence) {
    const words = clean(sentence).split(' ');
    return words.map((word, index) => {
      if (index % 2 === 1 && /[A-Za-z]/.test(word)) return '____';
      return word;
    }).join(' ');
  }

  function buildGrade3BRecitePhonics(unit) {
    if (!isGrade3BPage()) return null;
    const words = getWords(unit).slice(0, 6);
    const sentences = getSentences(unit).slice(0, 4);
    const dialogue = buildRoleplay(unit).slice(0, 4);
    return {
      wordChunks: words.map(word => ({
        en: word.en,
        cn: word.cn || '',
        chunks: splitWordChunks(word.en),
      })),
      sentenceChunks: sentences.map(item => ({
        en: item.en,
        cn: item.cn || '',
        chunks: segmentSentence(item.en),
        masked: maskSentence(item.en),
      })),
      cnRecall: sentences.slice(0, 3).map(item => ({
        cn: item.cn || '看中文，说英文。',
        en: item.en,
      })),
      roleRecite: dialogue,
      steps: ['听一遍', '慢速跟读', '分段读', '遮词背诵', '只看中文说英文', '角色背诵', '第二天再复习'],
    };
  }

  function maskWord(word, level = 1) {
    const source = String(word || '').trim();
    if (!source) return '';
    if (source.includes(' ')) {
      return source.split(/\s+/).map(part => maskWord(part, level)).join(' ');
    }
    if (level >= 2) return source.replace(/[A-Za-z]/g, '_');
    return source.split('').map((char, index) => {
      if (!/[A-Za-z]/.test(char)) return char;
      return index === 0 || index === source.length - 1 ? char : '_';
    }).join(' ');
  }

  function buildTeacherHint(word) {
    const en = String(word?.en || '').trim();
    const lower = en.toLowerCase();
    const chunks = splitWordChunks(en);
    const hints = [];
    if (/(.)\1/.test(lower.replace(/\s+/g, ''))) {
      const doubleLetter = lower.replace(/\s+/g, '').match(/(.)\1/)?.[1];
      if (doubleLetter) hints.push(`注意双写 ${doubleLetter}${doubleLetter}`);
    }
    if (chunks.length > 1) hints.push(`教师提示：按词块读 ${chunks.join(' + ')}`);
    if (word?.phonetic) hints.push(`读音：${word.phonetic}`);
    if (!hints.length) hints.push('教师提示：先听音，再看首尾字母回忆。');
    return hints.slice(0, 2).join('；');
  }

  function buildDictationHint(expected, actual) {
    const want = clean(expected).toLowerCase();
    const got = clean(actual).toLowerCase();
    if (!got) return '先听一遍，再试着写出来。';
    if (got === want) return '写对了，继续保持。';
    if (got.replace(/\s+/g, '') === want.replace(/\s+/g, '')) return '字母对了，注意单词之间要空格。';
    if (Math.abs(got.length - want.length) >= 2) return got.length < want.length ? '少写了字母，按词块再补一遍。' : '多写了字母，读一遍后再精简。';
    for (let i = 0; i < Math.max(want.length, got.length); i++) {
      if (want[i] !== got[i]) {
        const need = want[i] ? `这里应该是 ${want[i]}` : '这里不需要再写字母';
        const has = got[i] ? `，你写成了 ${got[i]}` : '，你漏写了';
        return `${need}${has}。`;
      }
    }
    return '顺序有点乱，按词块再写一次。';
  }

  function readWordLesson(unitKeyValue) {
    try {
      return JSON.parse(localStorage.getItem(`english-word-lesson:${location.pathname}:${unitKeyValue}`) || '{}');
    } catch {
      return {};
    }
  }

  function writeWordLesson(unitKeyValue, data) {
    localStorage.setItem(`english-word-lesson:${location.pathname}:${unitKeyValue}`, JSON.stringify(data));
  }

  function unitStorageKey(prefix, unitKeyValue) {
    const page = location.pathname.split('/').pop() || 'english';
    return `english-assist-${prefix}:${page}:${unitKeyValue}`;
  }

  function readUnitStorage(prefix, unitKeyValue, fallback) {
    try {
      return JSON.parse(localStorage.getItem(unitStorageKey(prefix, unitKeyValue)) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function writeUnitStorage(prefix, unitKeyValue, data) {
    localStorage.setItem(unitStorageKey(prefix, unitKeyValue), JSON.stringify(data));
  }

  function readQuizResult(unitKeyValue) {
    return readUnitStorage('quiz', unitKeyValue, null);
  }

  function writeQuizResult(unitKeyValue, data) {
    writeUnitStorage('quiz', unitKeyValue, data);
  }

  function readDictationProgress(unitKeyValue) {
    return readUnitStorage('dictation', unitKeyValue, {
      mastered: [],
      mistakes: [],
      lastRound: null,
      total: 0,
    });
  }

  function writeDictationProgress(unitKeyValue, data) {
    writeUnitStorage('dictation', unitKeyValue, data);
  }

  function getUnitByKey(unitKeyValue) {
    return getUnits().find((unit, index) => unitKey(unit, index) === unitKeyValue) || null;
  }

  function getDictationItems(unit) {
    return getLessonVocabulary(unit).map(item => ({
      ...item,
      key: normalizeLessonKey(item.en),
    }));
  }

  function countWordMastery(unitKeyValue, level = 1) {
    const unit = getUnitByKey(unitKeyValue);
    if (!unit) return 0;
    const progress = readWordLesson(unitKeyValue);
    return getDictationItems(unit).filter(item => Number(progress[item.en] || 0) >= level).length;
  }

  function setWordLessonMasteryByKey(unitKeyValue, word, level) {
    const progress = readWordLesson(unitKeyValue);
    progress[word] = Math.max(Number(progress[word] || 0), level);
    writeWordLesson(unitKeyValue, progress);
  }

  const dictationSessions = {};

  function createDictationSession(unitKeyValue, retryMode = false) {
    const unit = getUnitByKey(unitKeyValue);
    const items = getDictationItems(unit || {});
    const progress = readDictationProgress(unitKeyValue);
    const mistakeKeys = Array.isArray(progress.mistakes) ? progress.mistakes : [];
    const canRetry = retryMode && mistakeKeys.length > 0;
    const queue = (canRetry
      ? items.filter(item => mistakeKeys.includes(item.key))
      : items)
      .map(item => item.key);

    dictationSessions[unitKeyValue] = {
      queue,
      pointer: 0,
      correct: 0,
      retryMode: canRetry && queue.length > 0,
      lastFeedback: queue.length ? '先点“听发音”，再把英文拼写写出来。' : '本单元暂时没有可听写的词汇。',
      lastResult: null,
      lastInput: '',
      showAnswer: false,
      attempted: false,
      itemScored: false,
      completed: false,
    };
    return dictationSessions[unitKeyValue];
  }

  function getDictationSession(unitKeyValue) {
    return dictationSessions[unitKeyValue] || createDictationSession(unitKeyValue, false);
  }

  function finishDictationSession(unitKeyValue, session, items) {
    if (session.completed) return;
    session.completed = true;
    const progress = readDictationProgress(unitKeyValue);
    progress.total = items.length;
    progress.lastRound = {
      correct: session.correct,
      total: session.queue.length,
      pct: session.queue.length ? Math.round((session.correct / session.queue.length) * 100) : 0,
      retryMode: session.retryMode,
      at: Date.now(),
    };
    writeDictationProgress(unitKeyValue, progress);
  }

  function findAssistElement(attr, unitKeyValue) {
    if (window.CSS && CSS.escape) {
      return document.querySelector(`[${attr}="${CSS.escape(unitKeyValue)}"]`);
    }
    return Array.from(document.querySelectorAll(`[${attr}]`)).find(el => el.getAttribute(attr) === unitKeyValue) || null;
  }

  function uniqueList(items) {
    return Array.from(new Set((items || []).filter(Boolean)));
  }

  function formatPct(count, total) {
    if (!total) return 100;
    return Math.round((count / total) * 100);
  }

  function buildProgressSummary(unitKeyValue) {
    const unit = getUnitByKey(unitKeyValue);
    const items = getDictationItems(unit || {});
    const total = items.length;
    const readCount = countWordMastery(unitKeyValue, 2);
    const writeCount = countWordMastery(unitKeyValue, 4);
    const dictation = readDictationProgress(unitKeyValue);
    const mastered = uniqueList(dictation.mastered);
    const mistakes = uniqueList(dictation.mistakes);
    const mistakeLogCount = readMistakes(unitKeyValue).length;
    const quiz = readQuizResult(unitKeyValue);
    const quizDone = Boolean(quiz && Number(quiz.total) > 0);
    const quizPct = quizDone ? Number(quiz.pct || 0) : 0;
    const mistakeCount = Math.max(mistakes.length, mistakeLogCount);

    const steps = [
      {
        name: '单词认读',
        count: readCount,
        total,
        pct: formatPct(readCount, total),
        done: total > 0 && readCount >= total,
        tip: total > 0
          ? (readCount >= total ? '核心词和短语都过了一遍。' : `还差 ${Math.max(total - readCount, 0)} 个词需要再认读。`)
          : '本单元暂无词汇数据。',
      },
      {
        name: '听写拼写',
        count: mastered.length,
        total,
        pct: formatPct(mastered.length, total),
        done: total > 0 && mastered.length >= total,
        tip: total > 0
          ? (mastered.length >= total ? '本单元词汇都完成过听写。' : `已写对 ${mastered.length} 个，还可以继续补 ${Math.max(total - mastered.length, 0)} 个。`)
          : '先补充可听写词汇。',
      },
      {
        name: '单元小测',
        count: quizDone ? Number(quiz.score || 0) : 0,
        total: quizDone ? Number(quiz.total || 0) : 1,
        pct: quizPct,
        done: quizDone && quizPct >= 85,
        tip: quizDone
          ? `最近一次小测 ${quizPct}%${quizPct >= 85 ? '，可以开始口头输出。' : '，建议先回头补弱项。'}`
          : '还没有完成小测，做完后会给出更具体建议。',
      },
    ];

    const overall = Math.round(steps.reduce((sum, step) => sum + step.pct, 0) / steps.length);
    let nextStep = '继续完成本单元的学习闭环。';
    if (readCount < Math.max(3, Math.ceil(total * 0.6))) {
      nextStep = '先把单词带背课过一遍，再开始听写。';
    } else if (mastered.length < Math.max(2, Math.ceil(total * 0.4))) {
      nextStep = '建议马上做一轮听写，把会读的词升级成会写。';
    } else if (!quizDone) {
      nextStep = '词汇基础已经有了，下一步去完成单元小测。';
    } else if (quizPct < 85) {
      nextStep = '根据测后建议回头补错词，再把小测做到 85% 以上。';
    } else {
      nextStep = '可以做口头输出任务，然后进入下一单元。';
    }

    return {
      total,
      readCount,
      writeCount,
      dictationMastered: mastered.length,
      mistakeCount,
      quiz,
      quizDone,
      quizPct,
      overall,
      nextStep,
      lastRound: dictation.lastRound || null,
      steps,
    };
  }

  function renderProgressCardContent(unitKeyValue) {
    const summary = buildProgressSummary(unitKeyValue);
    const tags = [
      `会读 ${summary.readCount}/${summary.total || 0}`,
      `会写 ${summary.writeCount}/${summary.total || 0}`,
      summary.mistakeCount ? `待复习 ${summary.mistakeCount} 项` : '当前无待复习项',
      summary.quizDone ? `小测 ${summary.quizPct}%` : '小测待完成',
    ];
    if (summary.lastRound && Number(summary.lastRound.total) > 0) {
      tags.push(`最近听写 ${summary.lastRound.correct}/${summary.lastRound.total}`);
    }

    return `
      <div class="assist-progress-top">
        <div>
          <h4>${labels.progress}</h4>
          <p>${htmlEscape(summary.nextStep)}</p>
        </div>
        <span class="assist-progress-score">${summary.overall}%</span>
      </div>
      <div class="assist-progress-bar" aria-hidden="true"><span style="width:${summary.overall}%"></span></div>
      <div class="assist-progress-list">
        ${summary.steps.map(step => `
          <div class="assist-progress-item${step.done ? ' is-done' : ''}">
            <div class="assist-progress-row">
              <b>${htmlEscape(step.name)}</b>
              <span>${step.name === '单元小测' && !summary.quizDone ? '未完成' : `${step.count}/${step.total}`}</span>
            </div>
            <div class="assist-progress-mini" aria-hidden="true"><span style="width:${step.pct}%"></span></div>
            <small>${htmlEscape(step.tip)}</small>
          </div>`).join('')}
      </div>
      <div class="assist-progress-tags">
        ${tags.map(tag => `<span>${htmlEscape(tag)}</span>`).join('')}
      </div>`;
  }

  function renderProgressCard(unit, index) {
    const key = unitKey(unit, index);
    return `
      <div class="assist-card assist-progress-card" data-progress-card="${htmlEscape(key)}">
        ${renderProgressCardContent(key)}
      </div>`;
  }

  function buildRecommendation(unitKeyValue) {
    const summary = buildProgressSummary(unitKeyValue);
    const actions = [];
    let tone = 'start';
    let badge = '开始闭环';
    let intro = '先把核心词、听写和小测串起来，这个单元才算真正学会。';
    let items = [
      '先完成一轮单词带背课，至少把核心词都认读一遍。',
      '开始本单元听写拼写，写错的词会自动留下来重练。',
      '完成小测后，再根据结果定向复习。',
    ];

    if (!summary.quizDone) {
      tone = 'warm';
      badge = '先做小测';
      intro = summary.dictationMastered >= Math.max(2, Math.ceil(summary.total * 0.3))
        ? '词汇已经有基础了，建议先做小测看看薄弱点。'
        : '小测前先补一轮听写，做题会更稳。';
      items = [
        `先把单词认读提升到 ${Math.max(6, Math.ceil(summary.total * 0.6))} 个左右。`,
        `至少听写写对 ${Math.max(3, Math.ceil(summary.total * 0.4))} 个词，再进入小测。`,
        '做完小测后，优先处理错题区和错词重练。',
      ];
      actions.push(summary.readCount < Math.max(3, Math.ceil(summary.total * 0.6)) ? 'word' : 'dictation', 'quiz');
    } else if (summary.quizPct < 60) {
      tone = 'low';
      badge = '先补基础';
      intro = '小测分数偏低，说明词汇和句型还不够稳，先回头补基础。';
      items = [
        '回到单词带背课，把星级低的词重新听、读、遮挡回忆。',
        '立刻做一轮错词听写，直到错词明显减少。',
        '重新做小测，目标先达到 80%。',
      ];
      actions.push('word', summary.mistakeCount ? 'dictation-retry' : 'dictation', 'quiz');
    } else if (summary.quizPct < 85) {
      tone = 'mid';
      badge = '继续提分';
      intro = '已经有基础，但还需要把易错词和易错句再压一遍。';
      items = [
        '先看错题复习区，找出总是选错的词和句型。',
        '做一轮听写，重点练错词和会读不会写的词。',
        '重新做小测，目标提到 90% 左右。',
      ];
      actions.push('mistakes', summary.mistakeCount ? 'dictation-retry' : 'dictation', 'quiz');
    } else {
      tone = 'high';
      badge = '可以输出';
      intro = '本单元基础已经比较稳，接下来重点是“会用出来”。';
      items = [
        '完成口语输出任务，连续说 3-4 句话。',
        '把对话再跟读一遍，尝试自己换词改编。',
        '如果连续两次小测都在 90% 以上，就进入下一单元。',
      ];
      actions.push('output', 'quiz');
    }

    return {
      tone,
      badge,
      intro,
      items,
      actions: uniqueList(actions),
    };
  }

  function renderRecommendationAction(action, unitKeyValue) {
    const actionMap = {
      word: '<button type="button" data-assist-scroll="word">回到单词课</button>',
      dictation: '<button type="button" data-dictation-action="restart">开始听写</button>',
      'dictation-retry': '<button type="button" data-dictation-action="retry">错词重练</button>',
      quiz: '<button type="button" data-assist-restart-quiz>再做小测</button>',
      mistakes: '<button type="button" data-assist-scroll="mistakes">查看错题</button>',
      output: '<button type="button" data-assist-scroll="output">去做输出任务</button>',
    };
    return actionMap[action] || '';
  }

  function renderRecommendationCardContent(unitKeyValue) {
    const recommendation = buildRecommendation(unitKeyValue);
    return `
      <div class="assist-recommend-top">
        <div>
          <h4>${labels.recommendation}</h4>
          <p>${htmlEscape(recommendation.intro)}</p>
        </div>
        <span class="assist-recommend-badge">${htmlEscape(recommendation.badge)}</span>
      </div>
      <ol>${recommendation.items.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
      <div class="assist-action-row" data-recommendation-actions="${htmlEscape(unitKeyValue)}" data-unit-target="${htmlEscape(unitKeyValue)}">
        ${recommendation.actions.map(action => renderRecommendationAction(action, unitKeyValue)).join('')}
      </div>`;
  }

  function renderRecommendationCard(unit, index) {
    const key = unitKey(unit, index);
    const recommendation = buildRecommendation(key);
    return `
      <div class="assist-card assist-recommend-card assist-recommend-${htmlEscape(recommendation.tone)}" data-recommendation-card="${htmlEscape(key)}">
        ${renderRecommendationCardContent(key)}
      </div>`;
  }

  function getDictationSnapshot(unitKeyValue) {
    const unit = getUnitByKey(unitKeyValue);
    const items = getDictationItems(unit || {});
    const progress = readDictationProgress(unitKeyValue);
    const session = getDictationSession(unitKeyValue);
    const currentKey = session.queue[session.pointer] || '';
    const current = items.find(item => item.key === currentKey) || null;
    return {
      items,
      progress,
      session,
      current,
      mastered: uniqueList(progress.mastered),
      mistakes: uniqueList(progress.mistakes),
    };
  }

  function findDictationItem(items, keyValue) {
    return items.find(item => item.key === keyValue) || null;
  }

  function renderDictationMistakeTags(items, mistakes) {
    if (!mistakes.length) return '<span class="assist-muted">当前没有待重练错词。</span>';
    return mistakes.slice(0, 8).map(keyValue => {
      const item = findDictationItem(items, keyValue);
      const label = item ? `${item.en} ${item.cn ? `· ${item.cn}` : ''}` : keyValue;
      return `<span>${htmlEscape(label)}</span>`;
    }).join('');
  }

  function renderDictationCardContent(unitKeyValue) {
    const snapshot = getDictationSnapshot(unitKeyValue);
    const { items, progress, session, current, mastered, mistakes } = snapshot;
    const summary = buildProgressSummary(unitKeyValue);
    const round = progress.lastRound;
    const stepText = session.retryMode ? '错词重练' : '整单元听写';
    const progressText = session.completed
      ? `${stepText}已完成`
      : `第 ${Math.min(session.pointer + 1, Math.max(session.queue.length, 1))} / ${Math.max(session.queue.length, 1)} 题`;
    const answerText = session.showAnswer && current ? current.en : '';
    const feedbackClass = session.lastResult === true
      ? ' is-correct'
      : session.lastResult === false
        ? ' is-wrong'
        : '';

    return `
      <div class="dictation-top">
        <div>
          <h4>${labels.dictation}</h4>
          <p>先听发音，再根据中文写英文；写错会给提示，并自动进入错词重练。</p>
        </div>
        <div class="dictation-badges">
          <span>${htmlEscape(stepText)}</span>
          <span>已写对 ${mastered.length}/${items.length || 0}</span>
        </div>
      </div>
      <div class="dictation-layout">
        <div class="dictation-panel">
          <div class="dictation-progress">${htmlEscape(progressText)}</div>
          ${current ? `
            <div class="dictation-emoji">${htmlEscape(current.emoji || '📝')}</div>
            <div class="dictation-prompt">${htmlEscape(current.cn || '听发音，写英文')}</div>
            <div class="dictation-mask">${htmlEscape(session.showAnswer ? current.en : maskWord(current.en, 1))}</div>
            <div class="dictation-answer${session.showAnswer ? ' is-visible' : ''}">${answerText ? `答案：${htmlEscape(answerText)}` : '点“显示答案”后再核对拼写。'}</div>
            <div class="dictation-teacher-hint">${htmlEscape(buildTeacherHint(current))}</div>
            <div class="dictation-input-row">
              <input
                type="text"
                data-dictation-input
                autocomplete="off"
                placeholder="听完后写英文"
                value="${htmlEscape(session.lastInput || '')}">
              <button type="button" data-dictation-action="check">检查</button>
            </div>
            <div class="dictation-actions">
              <button class="assist-speak" type="button" data-dictation-action="listen">
                <span class="assist-speak-icon" aria-hidden="true">🔊</span>
                <span class="assist-speak-label">听发音</span>
              </button>
              <button type="button" data-dictation-action="slow">慢速再听</button>
              <button type="button" data-dictation-action="show">${session.showAnswer ? '盖住答案' : '显示答案'}</button>
              <button type="button" data-dictation-action="next">下一题</button>
            </div>
            <div class="dictation-feedback${feedbackClass}" data-dictation-feedback>${htmlEscape(session.lastFeedback || '先点“听发音”，再把英文拼写写出来。')}</div>`
            : `
            <div class="dictation-finished">本轮听写完成。可以重新开始，或直接做错词重练。</div>
            <div class="dictation-feedback${feedbackClass}" data-dictation-feedback>${htmlEscape(session.lastFeedback || '本轮结束，继续巩固本单元。')}</div>`}
        </div>
        <div class="dictation-side">
          <div class="dictation-side-card">
            <h5>本轮目标</h5>
            <ol>
              <li>先听清，再按词块拼写。</li>
              <li>写错时先看提示，不急着直接看答案。</li>
              <li>听写后再去做小测，效果更稳。</li>
            </ol>
          </div>
          <div class="dictation-side-card">
            <h5>学习记录</h5>
            <div class="dictation-stats">
              <span>会读：${summary.readCount}/${items.length || 0}</span>
              <span>会写：${summary.writeCount}/${items.length || 0}</span>
              <span>错词：${mistakes.length}</span>
              ${round && Number(round.total) > 0 ? `<span>最近一轮：${round.correct}/${round.total} (${round.pct}%)</span>` : '<span>最近一轮：还没有记录</span>'}
            </div>
          </div>
          <div class="dictation-side-card">
            <h5>待重练错词</h5>
            <div class="dictation-tags">${renderDictationMistakeTags(items, mistakes)}</div>
          </div>
          <div class="assist-action-row" data-unit-target="${htmlEscape(unitKeyValue)}">
            <button type="button" data-dictation-action="restart">重新开始</button>
            <button type="button" data-dictation-action="retry">错词重练</button>
            <button type="button" data-assist-restart-quiz>去做小测</button>
          </div>
        </div>
      </div>`;
  }

  function renderDictationCard(unit, index) {
    const key = unitKey(unit, index);
    return `
      <div class="assist-card assist-dictation-card" data-dictation-card="${htmlEscape(key)}" data-unit-target="${htmlEscape(key)}">
        ${renderDictationCardContent(key)}
      </div>`;
  }

  function refreshProgressCard(unitKeyValue) {
    const card = findAssistElement('data-progress-card', unitKeyValue);
    if (card) card.innerHTML = renderProgressCardContent(unitKeyValue);
  }

  function refreshRecommendationCard(unitKeyValue) {
    const card = findAssistElement('data-recommendation-card', unitKeyValue);
    if (!card) return;
    const recommendation = buildRecommendation(unitKeyValue);
    card.className = `assist-card assist-recommend-card assist-recommend-${recommendation.tone}`;
    card.setAttribute('data-recommendation-card', unitKeyValue);
    card.innerHTML = renderRecommendationCardContent(unitKeyValue);
  }

  function refreshDictationCard(unitKeyValue) {
    const card = findAssistElement('data-dictation-card', unitKeyValue);
    if (card) card.innerHTML = renderDictationCardContent(unitKeyValue);
  }

  function refreshAssistSummary(unitKeyValue) {
    refreshProgressCard(unitKeyValue);
    refreshRecommendationCard(unitKeyValue);
  }

  function refreshAssistUnit(unitKeyValue) {
    refreshAssistSummary(unitKeyValue);
    refreshDictationCard(unitKeyValue);
    const wordCard = findAssistElement('data-word-lesson', unitKeyValue);
    if (wordCard) refreshWordLessonStars(wordCard);
  }

  function restartDictation(unitKeyValue, retryMode = false) {
    const session = createDictationSession(unitKeyValue, retryMode);
    session.lastFeedback = retryMode
      ? (session.retryMode
        ? '已切换到错词重练。先听发音，再把词写准确。'
        : '当前还没有待重练错词，已切回整单元听写。')
      : '已开始新一轮听写。先听发音，再把英文写出来。';
    refreshAssistUnit(unitKeyValue);
  }

  function finalizeDictationSkip(unitKeyValue, current) {
    if (!current) return;
    const progress = readDictationProgress(unitKeyValue);
    progress.total = getDictationItems(getUnitByKey(unitKeyValue) || {}).length;
    progress.mistakes = uniqueList([...(progress.mistakes || []), current.key]);
    writeDictationProgress(unitKeyValue, progress);
    recordMistake(unitKeyValue, `听写：${current.cn || current.en}`, '未作答', current.en);
  }

  function moveToNextDictationItem(unitKeyValue) {
    const snapshot = getDictationSnapshot(unitKeyValue);
    const { session, items, current } = snapshot;
    if (!session.queue.length) {
      session.lastFeedback = '本单元暂时没有可听写的词汇。';
      refreshAssistUnit(unitKeyValue);
      return;
    }
    if (!session.attempted && !session.showAnswer) {
      session.lastFeedback = '先试着写一写，或者点“显示答案”后再进入下一题。';
      refreshDictationCard(unitKeyValue);
      return;
    }
    if (!session.itemScored && current) {
      finalizeDictationSkip(unitKeyValue, current);
    }

    session.pointer += 1;
    session.lastInput = '';
    session.lastResult = null;
    session.showAnswer = false;
    session.attempted = false;
    session.itemScored = false;

    if (session.pointer >= session.queue.length) {
      finishDictationSession(unitKeyValue, session, items);
      const pct = session.queue.length ? Math.round((session.correct / session.queue.length) * 100) : 0;
      session.lastFeedback = `本轮听写完成，正确率 ${pct}%。建议马上去做一遍小测。`;
    } else {
      session.lastFeedback = session.retryMode
        ? '继续错词重练。先听发音，再把词写准确。'
        : '下一题开始。先听发音，再把英文写出来。';
    }
    refreshAssistUnit(unitKeyValue);
  }

  function toggleDictationAnswer(unitKeyValue) {
    const session = getDictationSession(unitKeyValue);
    session.showAnswer = !session.showAnswer;
    session.lastFeedback = session.showAnswer
      ? '先看答案，再盖住重写一遍。'
      : '把答案盖住，再自己写一次。';
    refreshDictationCard(unitKeyValue);
  }

  function playDictationPrompt(unitKeyValue, button, slow = false) {
    const { current } = getDictationSnapshot(unitKeyValue);
    if (!current) return;
    speak(current.en, button, { rate: slow ? 0.56 : 0.72 });
  }

  function checkDictationAnswer(unitKeyValue, answer) {
    const snapshot = getDictationSnapshot(unitKeyValue);
    const { session, current, items } = snapshot;
    if (!current) return false;

    const actual = clean(answer);
    const expected = clean(current.en);
    const ok = actual.toLowerCase() === expected.toLowerCase();
    const progress = readDictationProgress(unitKeyValue);
    const mastered = new Set(progress.mastered || []);
    const mistakes = new Set(progress.mistakes || []);

    session.lastInput = actual;
    session.attempted = true;
    session.lastResult = ok;
    progress.total = items.length;

    if (ok) {
      if (!session.itemScored) {
        session.correct += 1;
        session.itemScored = true;
      }
      mastered.add(current.key);
      mistakes.delete(current.key);
      setWordLessonMasteryByKey(unitKeyValue, current.en, 4);
      session.lastFeedback = '写对了。点“下一题”继续，或者再读一遍加深记忆。';
      session.showAnswer = false;
    } else {
      mistakes.add(current.key);
      recordMistake(unitKeyValue, `听写：${current.cn || current.en}`, actual || '空白', current.en);
      session.lastFeedback = buildDictationHint(current.en, actual);
      session.showAnswer = false;
    }

    progress.mastered = Array.from(mastered);
    progress.mistakes = Array.from(mistakes);
    writeDictationProgress(unitKeyValue, progress);
    refreshAssistUnit(unitKeyValue);
    return ok;
  }

  function handleDictationAction(target) {
    const card = target.closest('[data-dictation-card]');
    if (!card) return false;
    const unitKeyValue = card.dataset.dictationCard;
    const session = getDictationSession(unitKeyValue);
    const input = card.querySelector('[data-dictation-input]');
    if (input) session.lastInput = input.value;

    const action = target.dataset.dictationAction;
    if (action === 'listen') {
      playDictationPrompt(unitKeyValue, target, false);
      return true;
    }
    if (action === 'slow') {
      playDictationPrompt(unitKeyValue, target, true);
      return true;
    }
    if (action === 'show') {
      toggleDictationAnswer(unitKeyValue);
      return true;
    }
    if (action === 'check') {
      checkDictationAnswer(unitKeyValue, input ? input.value : session.lastInput);
      return true;
    }
    if (action === 'next') {
      moveToNextDictationItem(unitKeyValue);
      return true;
    }
    if (action === 'restart') {
      restartDictation(unitKeyValue, false);
      return true;
    }
    if (action === 'retry') {
      restartDictation(unitKeyValue, true);
      return true;
    }
    return false;
  }

  function spotlightCard(element) {
    const card = element?.closest('.assist-card') || element;
    if (!card) return;
    card.classList.remove('is-spotlight');
    void card.offsetWidth;
    card.classList.add('is-spotlight');
    window.setTimeout(() => card.classList.remove('is-spotlight'), 1600);
  }

  function scrollToAssistCard(unitKeyValue, targetName) {
    const targetMap = {
      word: findAssistElement('data-word-lesson', unitKeyValue),
      dictation: findAssistElement('data-dictation-card', unitKeyValue),
      output: findAssistElement('data-assist-output', unitKeyValue),
      mistakes: findAssistElement('data-assist-mistakes', unitKeyValue),
    };
    const target = targetMap[targetName];
    const scrollTarget = target?.closest('.assist-card') || target;
    if (!scrollTarget) return;
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    spotlightCard(scrollTarget);
  }

  function renderWordLesson(unit, index) {
    const key = unitKey(unit, index);
    const words = getLessonVocabulary(unit);
    if (!words.length) return '';
    const wordCount = words.filter(item => item.kind !== '短语').length;
    const phraseCount = words.length - wordCount;

    return `
      <div class="assist-card word-lesson-card" data-word-lesson="${htmlEscape(key)}">
        <div class="word-lesson-top">
          <div>
            <h4>单词带背课</h4>
            <p>完整重点词汇 ${wordCount} 个${phraseCount ? `，重点短语 ${phraseCount} 个` : ''}：先听，再拆词拼读，最后遮挡默写。</p>
            <p class="word-lesson-stars-note">星级：听过 → 会读 → 会拼 → 会写 → 会用</p>
          </div>
          <span class="word-lesson-count">0 / ${words.length}</span>
        </div>
        <div class="word-lesson-stage" data-word-stage>听音建义</div>
        <div class="word-lesson-main">
          <div class="word-lesson-emoji" data-word-emoji>${htmlEscape(words[0].emoji || '🔤')}</div>
          <div class="word-lesson-cn" data-word-cn>${htmlEscape(words[0].cn || '')}</div>
          <div class="word-lesson-word is-hidden" data-word-en>${htmlEscape(words[0].en)}</div>
          <div class="word-lesson-phonetic" data-word-phonetic>${htmlEscape(words[0].phonetic || '')}</div>
          <div class="word-lesson-chunks" data-word-chunks></div>
          <div class="word-lesson-mask" data-word-mask></div>
          <div class="word-lesson-hint" data-word-hint></div>
        </div>
        <div class="word-lesson-actions" data-word-actions>
          <button class="assist-speak word-lesson-speak" type="button" data-word-action="listen">
            <span class="assist-speak-icon" aria-hidden="true">🔊</span>
            <span class="assist-speak-label">听一听</span>
          </button>
          <button type="button" data-word-action="show">看词认读</button>
          <button type="button" data-word-action="phonics">拆词拼读</button>
          <button type="button" data-word-action="mask">遮挡回忆</button>
        </div>
        <div class="word-lesson-write is-locked" data-word-write>
          <label>默写检测</label>
          <div class="word-lesson-input-row">
            <input type="text" data-word-input autocomplete="off" placeholder="听完后写英文">
            <button type="button" data-word-action="check">检查</button>
          </div>
          <div class="word-lesson-feedback" data-word-feedback></div>
        </div>
        <div class="word-lesson-nav">
          <button type="button" data-word-action="prev">上一个</button>
          <button type="button" data-word-action="known">我会写了</button>
          <button type="button" data-word-action="next">下一个</button>
        </div>
        <div class="word-lesson-list" data-word-list>
          ${words.map((word, wordIndex) => `
            <button type="button" data-word-select="${wordIndex}" data-word-en-value="${htmlEscape(word.en)}" data-word-cn-value="${htmlEscape(word.cn || '')}" data-word-emoji-value="${htmlEscape(word.emoji || '🔤')}" data-word-phonetic-value="${htmlEscape(word.phonetic || '')}" data-word-example-value="${htmlEscape(word.example || word.tip || '')}" data-word-hint-value="${htmlEscape(buildTeacherHint(word))}">
              <b>${htmlEscape(word.en)}</b>
              <small><em>${htmlEscape(word.kind || '词汇')}</em>${htmlEscape(word.cn || '')}</small>
              <span data-word-stars>☆☆☆☆☆</span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  function speakButton(text) {
    return `<button class="assist-speak" type="button" data-assist-speak="${htmlEscape(text)}" aria-label="点读 ${htmlEscape(text)}" aria-pressed="false">
      <span class="assist-speak-icon" aria-hidden="true">🔊</span>
      <span class="assist-speak-label">${labels.speak}</span>
    </button>`;
  }

  function renderWordLevel(title, words) {
    const content = words.length ? words.map(word => `
      <button class="assist-chip" type="button" data-assist-speak="${htmlEscape(word.en)}">
        ${htmlEscape(word.en)}<small>${htmlEscape(word.cn || '')}</small>
      </button>`).join('') : '<span class="assist-muted">本单元先复习课内核心词。</span>';

    return `
      <div class="assist-level">
        <div class="assist-level-title">${title}</div>
        <div class="assist-chip-list">${content}</div>
      </div>`;
  }

  function renderGrade3BRecitePhonics(data) {
    if (!data) return '';
    return `
      <div class="assist-card assist-reciting">
        <h4>${labels.recitePhonics}</h4>
        <div class="recite-section">
          <h5>单词拆块拼读</h5>
          <div class="recite-word-list">
            ${data.wordChunks.map(item => `
              <button class="recite-word" type="button" data-assist-speak="${htmlEscape(item.en)}">
                <b>${htmlEscape(item.en)}</b>
                <span>${item.chunks.map(chunk => `<em>${htmlEscape(chunk)}</em>`).join('')}</span>
                <small>${htmlEscape(item.cn)}</small>
              </button>`).join('')}
          </div>
        </div>
        <div class="recite-section">
          <h5>句子分段跟读</h5>
          ${data.sentenceChunks.map(item => `
            <div class="recite-sentence">
              <div class="recite-chunks">${item.chunks.map(chunk => `<span>${htmlEscape(chunk)}</span>`).join('')}</div>
              ${speakButton(item.en)}
              <small>${htmlEscape(item.cn)}</small>
            </div>`).join('')}
        </div>
        <div class="recite-section">
          <h5>遮词背诵</h5>
          ${data.sentenceChunks.map(item => `
            <details class="recite-mask">
              <summary>${htmlEscape(item.masked)}</summary>
              <div>${htmlEscape(item.en)} ${speakButton(item.en)}</div>
            </details>`).join('')}
        </div>
        <div class="recite-section">
          <h5>只看中文说英文</h5>
          ${data.cnRecall.map(item => `
            <details class="recite-cn">
              <summary>${htmlEscape(item.cn)}</summary>
              <div>${htmlEscape(item.en)} ${speakButton(item.en)}</div>
            </details>`).join('')}
        </div>
        <div class="recite-section">
          <h5>角色背诵</h5>
          <div class="recite-roles">
            ${data.roleRecite.map(item => `
              <details>
                <summary>${htmlEscape(item.role)}：${htmlEscape(item.cn || '点击查看英文')}</summary>
                <div>${htmlEscape(item.en)} ${speakButton(item.en)}</div>
              </details>`).join('')}
          </div>
        </div>
        <div class="recite-steps">${data.steps.map(step => `<span>${htmlEscape(step)}</span>`).join('')}</div>
      </div>`;
  }

  function renderAssist(unit, index) {
    const key = unitKey(unit, index);
    const words = splitWords(unit);
    const substitutions = buildSubstitutions(unit);
    const roleplay = buildRoleplay(unit);
    const listening = buildListening(unit);
    const lightGrammar = buildLightGrammar(unit);
    const extraQuiz = buildExtraQuiz(unit);
    const review = buildReview(unit, index);
    const gradeFocus = buildGradeFocus(unit);
    const memory = buildMemoryDrill(unit);
    const challenge = buildChallenge(unit);
    const recitePhonics = buildGrade3BRecitePhonics(unit);

    return `
      <section class="assist-box" data-assist-unit="${htmlEscape(key)}">
        <div class="assist-head">
          <div>
            <h3>${labels.title}</h3>
            <p>${labels.note}</p>
          </div>
          <span class="assist-badge">Original</span>
        </div>
        <div class="assist-source">${labels.source}：教材原文区域保持不变；本区为原创辅助练习，用于巩固词汇、句型、听说和复习。</div>
        <div class="assist-grid">
          ${renderProgressCard(unit, index)}
          ${renderRecommendationCard(unit, index)}
          <div class="assist-card">
            <h4>${labels.objectives}</h4>
            <ol>${buildObjectives(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.path}</h4>
            <div class="assist-path">${buildStudyPath().map(item => `<span>${htmlEscape(item)}</span>`).join('')}</div>
          </div>
          ${renderWordLesson(unit, index)}
          ${renderDictationCard(unit, index)}
          ${renderThemePhrasesCard(unit)}
          ${renderScenarioQACard(unit)}
          ${renderMiniReadingCard(unit)}
          <div class="assist-card assist-grade-focus">
            <h4>${labels.gradeFocus}</h4>
            <ol>${gradeFocus.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.wordLevels}</h4>
            ${renderWordLevel(labels.must, words.must)}
            ${renderWordLevel(labels.read, words.read)}
            ${renderWordLevel(labels.extra, words.extra)}
          </div>
          <div class="assist-card">
            <h4>${labels.substitution}</h4>
            <div class="assist-lines">
              ${substitutions.map(item => `
                <div class="assist-line">
                  <span>${htmlEscape(item.en)}</span>
                  ${speakButton(item.en)}
                  <small>${htmlEscape(item.cn)}</small>
                </div>`).join('') || '<p class="assist-muted">用课文核心句型替换姓名、物品或动作再说一遍。</p>'}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.roleplay}</h4>
            <div class="assist-roleplay">
              ${roleplay.map(item => `
                <div class="assist-role-line">
                  <b>${htmlEscape(item.role)}</b>
                  <span>${htmlEscape(item.en)}</span>
                  ${speakButton(item.en)}
                  ${item.cn ? `<small>${htmlEscape(item.cn)}</small>` : ''}
                </div>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.listening}</h4>
            <div class="assist-listening">
              ${listening.map(item => `
                <button type="button" data-assist-speak="${htmlEscape(item.text)}">
                  <b>${htmlEscape(item.title)}</b>
                  <span>${htmlEscape(item.tip)}</span>
                </button>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.phonics}</h4>
            <ul class="assist-list">${buildPhonics(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ul>
          </div>
          ${renderGrade3BRecitePhonics(recitePhonics)}
          <div class="assist-card">
            <h4>${labels.lightGrammar}</h4>
            <div class="assist-grammar">
              ${lightGrammar.map(item => `
                <div class="assist-grammar-rule">
                  <b>${htmlEscape(item.pattern)}</b>
                  <span>${htmlEscape(item.tip)}</span>
                  <button class="assist-speak" type="button" data-assist-speak="${htmlEscape(item.example)}">例句点读</button>
                  <small>${htmlEscape(item.example)}</small>
                </div>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.classroom}</h4>
            <div class="assist-lines">
              ${['Listen and repeat.', 'Try again.', 'Good job.'].map(item => `
                <div class="assist-line">
                  <span>${item}</span>
                  ${speakButton(item)}
                </div>`).join('')}
            </div>
          </div>
          <div class="assist-card" data-assist-output="${htmlEscape(key)}">
            <h4>${labels.output}</h4>
            <ol>${buildOutputTask(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.memory}</h4>
            <div class="assist-memory">
              ${memory.map(item => `<div class="assist-memory-tip">${htmlEscape(item)}</div>`).join('')}
            </div>
          </div>
          <div class="assist-card assist-challenge">
            <h4>${labels.challenge}</h4>
            <ol>${challenge.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.extraQuiz}</h4>
            <div class="assist-extra-quiz">
              ${extraQuiz.map(item => `
                <details>
                  <summary>${htmlEscape(item.q)} ${item.speak ? speakButton(item.speak) : ''}</summary>
                  <div>答案：${htmlEscape(item.a)}</div>
                </details>`).join('')}
            </div>
          </div>
          ${review.length ? `
            <div class="assist-card assist-review">
              <h4>${labels.review}</h4>
              <ol>${review.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
            </div>` : ''}
          <div class="assist-card assist-mistakes">
            <h4>${labels.mistakes}</h4>
            <div class="assist-mistake-list" data-assist-mistakes="${htmlEscape(key)}">${labels.noMistakes}</div>
            <button class="assist-clear" type="button" data-assist-clear="${htmlEscape(key)}">${labels.clear}</button>
          </div>
        </div>
      </section>`;
  }

  function findUnitElement(unit, index) {
    const key = unitKey(unit, index);
    if (window.CSS && CSS.escape) {
      const byData = document.querySelector(`.unit[data-unit="${CSS.escape(key)}"]`);
      if (byData) return byData;
    }
    return document.getElementById(key)
      || document.querySelectorAll('.unit-section')[index]
      || document.querySelectorAll('.unit')[index];
  }

  function storageKey(unitKeyValue) {
    const page = location.pathname.split('/').pop() || 'english';
    return `english-assist-mistakes:${page}:${unitKeyValue}`;
  }

  function readMistakes(unitKeyValue) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(unitKeyValue)) || '[]');
    } catch {
      return [];
    }
  }

  function writeMistakes(unitKeyValue, items) {
    localStorage.setItem(storageKey(unitKeyValue), JSON.stringify(items.slice(-20)));
  }

  function refreshMistakes(onlyKey) {
    document.querySelectorAll('[data-assist-mistakes]').forEach(box => {
      const key = box.dataset.assistMistakes;
      if (onlyKey && key !== onlyKey) return;
      const items = readMistakes(key);
      if (!items.length) {
        box.textContent = labels.noMistakes;
        return;
      }
      box.innerHTML = items.slice(-5).reverse().map(item => `
        <div class="assist-mistake">
          <div>${htmlEscape(item.question)}</div>
          <small>你的答案：${htmlEscape(item.selected)}；正确答案：${htmlEscape(item.correct)}</small>
        </div>`).join('');
    });
  }

  function recordMistake(unitKeyValue, question, selected, correct) {
    if (!unitKeyValue || !question || !correct || selected === correct) return;
    const items = readMistakes(unitKeyValue);
    items.push({ question, selected, correct, time: Date.now() });
    writeMistakes(unitKeyValue, items);
    refreshMistakes(unitKeyValue);
    refreshAssistSummary(unitKeyValue);
  }

  function optionUnitKey(option) {
    if (option.dataset.unit) return option.dataset.unit;
    const section = option.closest('.unit, .unit-section');
    return section ? (section.dataset.unit || section.id || '') : '';
  }

  function optionQuestion(option) {
    const area = option.closest('[id^="question-"], [id^="qarea-"], .quiz-container, .quiz');
    return clean(area?.querySelector('h3, .quiz-question, .question-text')?.textContent || '');
  }

  function optionCorrect(option) {
    if (option.dataset.answer) return clean(option.dataset.answer);
    const area = option.closest('.quiz-options, [id^="qarea-"], .quiz-container');
    return clean(area?.querySelector('.quiz-option.correct')?.textContent || '');
  }

  function getWordLessonButtons(card) {
    return Array.from(card.querySelectorAll('[data-word-select]'));
  }

  function getActiveWordButton(card) {
    const buttons = getWordLessonButtons(card);
    const active = buttons.find(button => button.classList.contains('active'));
    return active || buttons[0] || null;
  }

  function getWordLessonIndex(card) {
    const buttons = getWordLessonButtons(card);
    const active = getActiveWordButton(card);
    return Math.max(0, buttons.indexOf(active));
  }

  function updateWordLessonCard(card, index = 0) {
    const buttons = getWordLessonButtons(card);
    if (!buttons.length) return;
    const nextIndex = Math.max(0, Math.min(index, buttons.length - 1));
    const button = buttons[nextIndex];
    const key = card.dataset.wordLesson;
    const progress = readWordLesson(key);

    buttons.forEach((item, itemIndex) => {
      const isActive = itemIndex === nextIndex;
      item.classList.toggle('active', isActive);
      const stars = Math.max(0, Math.min(5, Number(progress[item.dataset.wordEnValue] || 0)));
      const starEl = item.querySelector('[data-word-stars]');
      if (starEl) starEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    });

    const en = button.dataset.wordEnValue || '';
    const cn = button.dataset.wordCnValue || '';
    const emoji = button.dataset.wordEmojiValue || '🔤';
    const phonetic = button.dataset.wordPhoneticValue || '';
    const chunks = splitWordChunks(en);

    card.querySelector('[data-word-emoji]').textContent = emoji;
    card.querySelector('[data-word-cn]').textContent = cn;
    card.querySelector('[data-word-en]').textContent = en;
    card.querySelector('[data-word-en]').classList.add('is-hidden');
    card.querySelector('[data-word-phonetic]').textContent = phonetic;
    card.querySelector('[data-word-chunks]').innerHTML = chunks.map(chunk => `<span>${htmlEscape(chunk)}</span>`).join('');
    card.querySelector('[data-word-chunks]').classList.remove('is-visible');
    card.querySelector('[data-word-mask]').textContent = maskWord(en, 1);
    card.querySelector('[data-word-mask]').classList.remove('is-visible', 'is-full');
    card.querySelector('[data-word-hint]').textContent = button.dataset.wordHintValue || buildTeacherHint({ en, phonetic });
    card.querySelector('[data-word-hint]').classList.remove('is-visible');
    card.querySelector('[data-word-stage]').textContent = '听音建义';
    card.querySelector('[data-word-input]').value = '';
    card.querySelector('[data-word-feedback]').textContent = '';
    card.querySelector('.word-lesson-count').textContent = `${nextIndex + 1} / ${buttons.length}`;
    setWordLessonStage(card, 'listen');
  }

  function setWordLessonStage(card, stage) {
    const stageText = {
      listen: '听音建义',
      show: '看词认读',
      phonics: '自然拼读拆词',
      mask: '遮挡回忆',
      write: '默写检测',
    };
    const wordEl = card.querySelector('[data-word-en]');
    const chunksEl = card.querySelector('[data-word-chunks]');
    const maskEl = card.querySelector('[data-word-mask]');
    const hintEl = card.querySelector('[data-word-hint]');
    const writeEl = card.querySelector('[data-word-write]');

    card.dataset.wordStage = stage;
    card.querySelector('[data-word-stage]').textContent = stageText[stage] || stageText.listen;
    card.querySelectorAll('[data-word-action]').forEach(button => {
      button.classList.toggle('is-current', button.dataset.wordAction === stage);
    });

    wordEl.classList.toggle('is-hidden', stage === 'listen' || stage === 'mask');
    chunksEl.classList.toggle('is-visible', stage === 'phonics');
    maskEl.classList.toggle('is-visible', stage === 'mask');
    hintEl.classList.toggle('is-visible', stage === 'show' || stage === 'phonics' || stage === 'mask' || stage === 'write');
    writeEl.classList.toggle('is-locked', stage !== 'mask' && stage !== 'write');
  }

  function refreshWordLessonStars(card) {
    const key = card.dataset.wordLesson;
    const progress = readWordLesson(key);
    getWordLessonButtons(card).forEach(item => {
      const stars = Math.max(0, Math.min(5, Number(progress[item.dataset.wordEnValue] || 0)));
      const starEl = item.querySelector('[data-word-stars]');
      if (starEl) starEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    });
  }

  function setWordLessonMastery(card, word, level) {
    const key = card.dataset.wordLesson;
    const progress = readWordLesson(key);
    progress[word] = Math.max(Number(progress[word] || 0), level);
    writeWordLesson(key, progress);
    refreshWordLessonStars(card);
    refreshAssistSummary(key);
    refreshDictationCard(key);
  }

  function recordWordLessonMistake(card, expected, selected) {
    const key = card.dataset.wordLesson;
    const items = readMistakes(key);
    items.push({
      question: `默写单词：${expected}`,
      selected: selected || '空白',
      correct: expected,
      type: '默写错',
      time: Date.now(),
    });
    writeMistakes(key, items);
    refreshMistakes(key);
    refreshAssistSummary(key);
  }

  function handleWordLessonAction(target) {
    const card = target.closest('[data-word-lesson]');
    if (!card) return false;

    const buttons = getWordLessonButtons(card);
    const currentIndex = getWordLessonIndex(card);
    const active = getActiveWordButton(card);
    if (!active) return true;
    const word = active.dataset.wordEnValue || '';
    const action = target.dataset.wordAction;

    if (target.dataset.wordSelect) {
      updateWordLessonCard(card, Number(target.dataset.wordSelect));
      return true;
    }

    if (action === 'listen') {
      setWordLessonStage(card, 'listen');
      speak(word, target, { rate: 0.68 });
      setWordLessonMastery(card, word, 1);
      return true;
    }

    if (action === 'show') {
      setWordLessonStage(card, 'show');
      speak(word, card.querySelector('.word-lesson-speak'), { rate: 0.76 });
      setWordLessonMastery(card, word, 2);
      return true;
    }

    if (action === 'phonics') {
      setWordLessonStage(card, 'phonics');
      speak(word, card.querySelector('.word-lesson-speak'), { rate: 0.55 });
      setWordLessonMastery(card, word, 3);
      return true;
    }

    if (action === 'mask') {
      const mask = card.querySelector('[data-word-mask]');
      const wasMaskStage = card.dataset.wordStage === 'mask';
      mask.classList.toggle('is-full', wasMaskStage ? !mask.classList.contains('is-full') : false);
      mask.textContent = mask.classList.contains('is-full') ? maskWord(word, 2) : maskWord(word, 1);
      setWordLessonStage(card, 'mask');
      setWordLessonMastery(card, word, 3);
      return true;
    }

    if (action === 'check') {
      setWordLessonStage(card, 'write');
      const input = card.querySelector('[data-word-input]');
      const answer = clean(input.value);
      const ok = answer.toLowerCase() === clean(word).toLowerCase();
      const feedback = card.querySelector('[data-word-feedback]');
      feedback.classList.toggle('is-correct', ok);
      feedback.classList.toggle('is-wrong', !ok);
      feedback.textContent = ok ? '写对了。现在试着放进句子里说一遍。' : buildDictationHint(word, answer);
      if (ok) {
        setWordLessonMastery(card, word, 4);
      } else {
        recordWordLessonMistake(card, word, answer);
      }
      return true;
    }

    if (action === 'known') {
      setWordLessonMastery(card, word, 5);
      updateWordLessonCard(card, Math.min(currentIndex + 1, buttons.length - 1));
      return true;
    }

    if (action === 'next') {
      updateWordLessonCard(card, Math.min(currentIndex + 1, buttons.length - 1));
      return true;
    }

    if (action === 'prev') {
      updateWordLessonCard(card, Math.max(currentIndex - 1, 0));
      return true;
    }

    return true;
  }

  function initWordLessons() {
    document.querySelectorAll('[data-word-lesson]').forEach(card => updateWordLessonCard(card, 0));
  }

  function attachEvents() {
    document.addEventListener('click', event => {
      const wordLessonTarget = event.target.closest('[data-word-action], [data-word-select]');
      if (wordLessonTarget && handleWordLessonAction(wordLessonTarget)) {
        return;
      }

      const dictationTarget = event.target.closest('[data-dictation-action]');
      if (dictationTarget && handleDictationAction(dictationTarget)) {
        return;
      }

      const speakTarget = event.target.closest('[data-assist-speak]');
      if (speakTarget) {
        speak(speakTarget.dataset.assistSpeak || speakTarget.textContent, speakTarget);
        return;
      }

      const clearTarget = event.target.closest('[data-assist-clear]');
      if (clearTarget) {
        const key = clearTarget.dataset.assistClear;
        writeMistakes(key, []);
        refreshMistakes(key);
        refreshAssistSummary(key);
        spotlightCard(clearTarget);
        return;
      }

      const scrollTarget = event.target.closest('[data-assist-scroll]');
      if (scrollTarget) {
        const unitKeyValue = scrollTarget.closest('[data-unit-target]')?.dataset.unitTarget;
        if (unitKeyValue) scrollToAssistCard(unitKeyValue, scrollTarget.dataset.assistScroll);
        return;
      }

      const restartQuizTarget = event.target.closest('[data-assist-restart-quiz]');
      if (restartQuizTarget) {
        const unitKeyValue = restartQuizTarget.closest('[data-unit-target]')?.dataset.unitTarget;
        if (unitKeyValue && typeof window.restartQuiz === 'function') {
          window.restartQuiz(unitKeyValue);
          const quizBox = document.getElementById(`quiz-${unitKeyValue}`);
          if (quizBox) quizBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const option = event.target.closest('.quiz-option');
      if (option) {
        setTimeout(() => {
          const selected = clean(option.textContent);
          const correct = optionCorrect(option);
          recordMistake(optionUnitKey(option), optionQuestion(option), selected, correct);
        }, 0);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      const input = event.target.closest('[data-dictation-input]');
      if (!input) return;
      event.preventDefault();
      const card = input.closest('[data-dictation-card]');
      const checkButton = card?.querySelector('[data-dictation-action="check"]');
      if (checkButton) handleDictationAction(checkButton);
    });

    window.addEventListener('shared-learning:quiz-finished', event => {
      const detail = event.detail || {};
      if (!detail.unitId) return;
      writeQuizResult(detail.unitId, detail);
      refreshAssistSummary(detail.unitId);
    });

    window.addEventListener('shared-learning:quiz-restarted', event => {
      const detail = event.detail || {};
      if (!detail.unitId) return;
      writeQuizResult(detail.unitId, null);
      refreshAssistSummary(detail.unitId);
    });
  }

  function insertAssistBlocks() {
    const units = getUnits();
    if (!units.length || document.querySelector('.assist-box')) return;
    units.forEach((unit, index) => {
      const target = findUnitElement(unit, index);
      if (!target) return;
      const title = target.querySelector('.unit-title');
      if (title) {
        title.insertAdjacentHTML('afterend', renderAssist(unit, index));
      } else {
        target.insertAdjacentHTML('afterbegin', renderAssist(unit, index));
      }
    });
    refreshMistakes();
    initWordLessons();
  }

  function init() {
    insertAssistBlocks();
    attachEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();
