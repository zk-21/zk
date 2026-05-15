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
    recitePhonics: '跟读背诵与自然拼读',
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
    if (/family|mother|father|grandpa|friend|name|hello/.test(text)) return '能介绍自己、朋友或家人。';
    if (/subject|school|lesson|day|time|week/.test(text)) return '能谈论学校生活、课程或时间。';
    if (/can|sport|basketball|football|table tennis/.test(text)) return '能询问和表达会不会做某事。';
    if (/weather|season|wear|clothes/.test(text)) return '能描述天气、季节或穿着。';
    if (/animal|farm|zoo/.test(text)) return '能介绍动物名称和简单特征。';
    if (/colour|toy|fruit|food/.test(text)) return '能描述颜色、物品、水果或食物。';
    return '能围绕本单元主题进行简单交流。';
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
    return [
      `${task} 试着连续说 2-3 句话。`,
      `必须用到一句：${sentence}`,
      '可以替换自己的姓名、物品、课程、颜色或动作。',
    ];
  }

  function buildStudyPath() {
    return ['听音导入', '单词认读', '句型替换', '对话跟读', '小测验', '错题再练'];
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
          <div class="assist-card">
            <h4>${labels.objectives}</h4>
            <ol>${buildObjectives(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.path}</h4>
            <div class="assist-path">${buildStudyPath().map(item => `<span>${htmlEscape(item)}</span>`).join('')}</div>
          </div>
          ${renderWordLesson(unit, index)}
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
          <div class="assist-card">
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
