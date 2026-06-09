const nav = document.getElementById('grammarNav');
const app = document.getElementById('grammarApp');
const guide = Array.isArray(window.COURSE_GRAMMAR_GUIDE) ? window.COURSE_GRAMMAR_GUIDE : [];

const gradeFilters = [
  { key: 'all', label: '全部' },
  { key: 'lower', label: '低年级' },
  { key: 'mid', label: '中年级' },
  { key: 'upper', label: '高年级' },
  { key: 'extend', label: '拓展' },
];

const starterMatchers = [
  /名词 noun/,
  /代词 pronoun/,
  /动词 verb/,
  /冠词 article/,
  /一般现在时$/,
  /现在进行时$/,
  /主语 subject/,
  /主谓宾结构/,
];

const gradePracticeLayers = [
  {
    grade: '一年级',
    level: 'lower',
    focus: '听懂并认读最基础的词类和句子用途。',
    targets: ['能分出人/物/动作词', '能听懂 This is ...', '能用 Yes/No 做简单回应'],
    exercises: [
      { title: '圈词类', body: '从 book / run / red 中圈出“东西的名字”和“动作”。' },
      { title: '跟读替换', body: 'This is a book. → This is a pen. → This is a ruler.' },
      { title: '听句判断', body: '听到 Is this a pen? 后，用 Yes. / No. 回答。' },
    ],
  },
  {
    grade: '二年级',
    level: 'lower',
    focus: '把名词、代词、be 动词和简单疑问句连起来。',
    targets: ['会用 I / you / he / she', '会说 It is ...', '会问 What is this?'],
    exercises: [
      { title: '代词替换', body: 'Mike is my friend. → He is my friend. / Su Hai is my friend. → She is my friend.' },
      { title: 'be 动词补空', body: 'It ___ red. / She ___ my sister. / I ___ happy.' },
      { title: '一问一答', body: 'What is this? It is a pencil. 再替换 rubber / schoolbag / book。' },
    ],
  },
  {
    grade: '三年级',
    level: 'mid',
    focus: '重点练句型、祈使句、地点介词、一般现在时。',
    targets: ['会用 Do you have ...?', '会用 Don’t ... / Please ...', '会用 in/on/under/behind/by 描述位置'],
    exercises: [
      { title: '句型替换', body: 'Do you have a banana? → Do you have an apple? → Do you have some grapes?' },
      { title: '规则表达', body: 'Don’t run. / Don’t shout. / Be quiet. / Please sit down.' },
      { title: '看图说位置', body: 'The duck is under the tree. / The flower is by the tree. / The plane is in the tree.' },
    ],
  },
  {
    grade: '四年级',
    level: 'mid',
    focus: '从会说句型过渡到会拆句子结构。',
    targets: ['会找主语、谓语、宾语', '会区分主系表和主谓宾', '会用现在进行时描述正在做的事'],
    exercises: [
      { title: '拆主干', body: 'I like English. 标出 I=主语，like=谓语，English=宾语。' },
      { title: '结构分类', body: 'She is kind. 是主系表；She likes Music. 是主谓宾。' },
      { title: '正在发生', body: 'I am drawing. / He is reading. / They are playing. 替换动作词再说三句。' },
    ],
  },
  {
    grade: '五年级',
    level: 'upper',
    focus: '补过去、将来、复合句和更完整的语法判断。',
    targets: ['会分一般现在/过去/将来', '会认识并列句和复合句', '会初步理解被动语态'],
    exercises: [
      { title: '时态判断', body: 'It was blue before. / I will help you. / She likes Music. 分别说出时态。' },
      { title: '连接成句', body: 'I like apples. You like bananas. → I like apples and you like bananas.' },
      { title: '主动被动对比', body: 'I clean the classroom. 看“谁做”；The room is cleaned. 看“谁被做”。' },
    ],
  },
];

const bookQuickLinks = [
  {
    tag: '一上',
    label: '一年级上册',
    href: 'english-1a.html',
    desc: '先认物品、颜色和最基础的单数问答。',
    queries: ['This is', "What's this", 'What colour', 'Is this'],
  },
  {
    tag: '一下',
    label: '一年级下册',
    href: 'english-1b.html',
    desc: '继续练复数、位置和数量。',
    queries: ['These are', 'What are these', 'Where is', 'How many'],
  },
  {
    tag: '二上',
    label: '二年级上册',
    href: 'english-2a.html',
    desc: '把拥有、能力和礼貌邀请连起来用。',
    queries: ['Do you have', 'Can you', 'Would you like', "Let's"],
  },
  {
    tag: '二下',
    label: '二年级下册',
    href: 'english-2b.html',
    desc: '常见生活问答集中在时间、天气和存在句。',
    queries: ['What time', 'What day', "What's the weather like", 'There is'],
  },
  {
    tag: '三上',
    label: '三年级上册',
    href: '三年级上册英语互动学习.html',
    desc: '开始加入课程、职业和理想表达。',
    queries: ['What subjects', 'What does', 'want to be', 'like + verb-ing'],
  },
  {
    tag: '三下',
    label: '三年级下册',
    href: 'english-learning.html',
    desc: '把请求许可和未来计划练熟。',
    queries: ['Can I', 'May I', 'be going to', 'What are your plans'],
  },
  {
    tag: '四上',
    label: '四年级上册',
    href: '四年级上册英语互动学习.html',
    desc: '主题句型更多，开始加入归属、选择和时间安排。',
    queries: ["It's time", 'Whose', 'Which one', 'What do you wear'],
  },
  {
    tag: '四下',
    label: '四年级下册',
    href: '四年级下册英语互动学习.html',
    desc: '常见话题会和最喜欢、擅长、原因说明连起来。',
    queries: ['What is your favourite', 'be good at', 'same / different', 'Why'],
  },
  {
    tag: '五上',
    label: '五年级上册',
    href: 'english-5a.html',
    desc: '提升到计划表达、原因说明和比较。',
    queries: ['Because', 'bigger', 'biggest', 'A or B'],
  },
  {
    tag: '五下',
    label: '五年级下册',
    href: 'english-5b.html',
    desc: '把感叹、程度和综合句型再收一遍。',
    queries: ['How beautiful', 'It is so', 'There are', 'be going to'],
  },
];

const state = {
  gradeFilter: 'all',
  searchQuery: '',
  practiceItems: [],
  practiceIndex: 0,
  practiceScore: 0,
  practiceInput: '',
  practiceChecked: false,
  practiceWasCorrect: false,
  practiceShowAnswer: false,
  practiceFeedback: '',
  practiceFinished: false,
  practiceScored: false,
};

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeAnswer(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[。．\.!！?？,，:：;；'"]/g, '')
    .replace(/\s+/g, '');
}

function normalizeSearchQuery(value) {
  return clean(value).toLowerCase();
}

function collectHighlightRanges(value, query = state.searchQuery) {
  const source = String(value ?? '');
  const normalizedQuery = normalizeSearchQuery(query);
  if (!source || !normalizedQuery) return [];

  const loweredSource = source.toLowerCase();
  const tokens = [...new Set([
    normalizedQuery,
    ...normalizedQuery.split(' '),
  ].map(token => token.trim()).filter(Boolean))].sort((a, b) => b.length - a.length);

  const ranges = [];
  tokens.forEach(token => {
    let start = loweredSource.indexOf(token);
    while (start !== -1) {
      ranges.push([start, start + token.length]);
      start = loweredSource.indexOf(token, start + token.length);
    }
  });

  if (!ranges.length) return [];

  ranges.sort((left, right) => left[0] - right[0] || left[1] - right[1]);
  const merged = [ranges[0]];

  for (let index = 1; index < ranges.length; index += 1) {
    const current = ranges[index];
    const prev = merged[merged.length - 1];
    if (current[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], current[1]);
      continue;
    }
    merged.push([...current]);
  }

  return merged;
}

function renderHighlightedText(value, query = state.searchQuery) {
  const source = String(value ?? '');
  const ranges = collectHighlightRanges(source, query);
  if (!ranges.length) return htmlEscape(source);

  let cursor = 0;
  let output = '';

  ranges.forEach(([start, end]) => {
    if (cursor < start) output += htmlEscape(source.slice(cursor, start));
    output += `<mark class="grammar-highlight">${htmlEscape(source.slice(start, end))}</mark>`;
    cursor = end;
  });

  if (cursor < source.length) output += htmlEscape(source.slice(cursor));
  return output;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getKidHelper(rule) {
  const title = rule.title || '';
  const helpers = [
    [/名词 noun/, {
      tip: '人和东西都有名，book、Mike 都是名。',
      parts: [{ text: 'This', role: '主语' }, { text: 'is', role: 'be动词' }, { text: 'my book', role: '名词短语' }],
      practice: { q: 'book、run、happy 里面哪个是名词？', a: 'book' },
    }],
    [/代词 pronoun/, {
      tip: '名字太长我来替，I、you、he、she、it。',
      parts: [{ text: 'She', role: '代词' }, { text: 'is', role: 'be动词' }, { text: 'my friend', role: '表语' }],
      practice: { q: 'She is my mother. 里面哪个词代替“妈妈”？', a: 'She' },
    }],
    [/动词 verb/, {
      tip: '动作状态都靠它，run、like、is 都是它。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '动词' }, { text: 'apples', role: '宾语' }],
      practice: { q: 'I like apples. 里面哪个是动词？', a: 'like' },
    }],
    [/形容词 adjective/, {
      tip: '形容词像画笔，给人和物添样子。',
      parts: [{ text: 'a', role: '冠词' }, { text: 'cute', role: '形容词' }, { text: 'rabbit', role: '名词' }],
      practice: { q: 'a cute rabbit 里面哪个词说明兔子可爱？', a: 'cute' },
    }],
    [/副词 adverb/, {
      tip: '副词常常修动作，告诉怎么、何时、在哪里。',
      parts: [{ text: 'Run', role: '动词' }, { text: 'fast', role: '副词' }],
      practice: { q: 'Run fast. 里面哪个词说明“跑得怎样”？', a: 'fast' },
    }],
    [/一般现在时$/, {
      tip: '经常发生用现在，he、she、it 后动词变。',
      parts: [{ text: 'She', role: '主语' }, { text: 'likes', role: '三单动词' }, { text: 'Music', role: '宾语' }],
      practice: { q: 'He ___ carrots. 填 like 还是 likes？', a: 'likes' },
    }],
    [/现在进行时/, {
      tip: '正在做，用进行，be 加动词 ing。',
      parts: [{ text: 'I', role: '主语' }, { text: 'am', role: 'be动词' }, { text: 'drawing', role: '动词-ing' }],
      practice: { q: 'I am read 还是 I am reading？', a: 'I am reading' },
    }],
    [/主动语态/, {
      tip: '谁来做，谁在前，主动语态最常见。',
      parts: [{ text: 'I', role: '动作发出者' }, { text: 'clean', role: '动作' }, { text: 'the classroom', role: '动作对象' }],
      practice: { q: 'I clean the classroom. 谁在打扫？', a: 'I' },
    }],
    [/被动语态$/, {
      tip: '谁被做，谁在前，be done 放后面。',
      parts: [{ text: 'The room', role: '动作承受者' }, { text: 'is cleaned', role: '被动结构' }],
      practice: { q: 'The room is cleaned. 房间是做动作还是承受动作？', a: '承受动作' },
    }],
    [/祈使语气/, {
      tip: '动词开头提要求，Please 礼貌，Don’t 禁止。',
      parts: [{ text: 'Please', role: '礼貌词' }, { text: 'sit down', role: '要求' }],
      practice: { q: 'Don’t run. 是让你跑还是不要跑？', a: '不要跑' },
    }],
    [/主语 subject/, {
      tip: '句子说谁谁主语，通常站在最前面。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'English', role: '宾语' }],
      practice: { q: 'I like English. 主语是谁？', a: 'I' },
    }],
    [/谓语 predicate/, {
      tip: '主语做啥看谓语，动作状态它说明。',
      parts: [{ text: 'She', role: '主语' }, { text: 'is kind', role: '谓语部分' }],
      practice: { q: 'I play football. 谓语动作是哪个词？', a: 'play' },
    }],
    [/宾语 object/, {
      tip: '动作落到谁身上，谁就是宾语。',
      parts: [{ text: 'I', role: '主语' }, { text: 'have', role: '谓语' }, { text: 'a robot', role: '宾语' }],
      practice: { q: 'I have a robot. 我有什么？', a: 'a robot' },
    }],
    [/表语 predicative/, {
      tip: 'be 后说明主语样，身份状态叫表语。',
      parts: [{ text: 'It', role: '主语' }, { text: 'is', role: 'be动词' }, { text: 'rainy', role: '表语' }],
      practice: { q: 'It is rainy. rainy 说明谁？', a: 'It' },
    }],
    [/简单句/, {
      tip: '一个主干一个意，简单句子最清楚。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'English', role: '宾语' }],
      practice: { q: 'I like English. 有几个主要意思？', a: '一个' },
    }],
    [/主谓宾结构/, {
      tip: '谁做啥做什么，主谓宾三步走。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'apples', role: '宾语' }],
      practice: { q: 'We have Music. 宾语是什么？', a: 'Music' },
    }],
    [/It 引导结构/, {
      tip: '天气时间常用 It，小小 It 站前面。',
      parts: [{ text: 'It', role: '形式主语' }, { text: 'is', role: 'be动词' }, { text: 'sunny', role: '表语' }],
      practice: { q: 'It is sunny. 这句话在说什么？', a: '天气' },
    }],
    [/并列句/, {
      tip: '两个句子手拉手，and、but、or 来牵头。',
      parts: [{ text: 'I like English', role: '句子1' }, { text: 'and', role: '连词' }, { text: 'he likes Maths', role: '句子2' }],
      practice: { q: 'I like apples and you like bananas. 连接词是什么？', a: 'and' },
    }],
    [/复合句/, {
      tip: '主句带着小从句，because 常来说原因。',
      parts: [{ text: 'I choose this one', role: '主句' }, { text: 'because', role: '连接词' }, { text: 'it is right for me', role: '原因从句' }],
      practice: { q: 'because 后面通常说明什么？', a: '原因' },
    }],
  ];

  const match = helpers.find(([pattern]) => pattern.test(title));
  return match ? match[1] : {};
}

function inferRuleLevel(group, rule) {
  const text = `${group.title} ${group.desc || ''} ${rule.title || ''} ${rule.pattern || ''} ${rule.cn || ''} ${rule.note || ''}`.toLowerCase();

  if (/完成进行|虚拟语气/.test(text)) return 'extend';
  if (/完成时|被动语态|一般过去时|一般将来时|双宾|宾补|同位语|独立成分|并列句|复合句|从句|反身代词|名词性物主代词|be going to|want to be|what does .* do|future plans|plans|比较级|最高级|more beautiful|most beautiful|bigger|biggest/.test(text)) return 'upper';
  if (/名词复数|所有格|介词|连词|形容词|副词|一般现在时|现在进行时|数词|主语|谓语|宾语|表语|定语|状语|主谓宾|简单句|疑问代词|情态动词|句类|祈使语气|there is|there are|would you like|can i|may i|where is|where are|what colour|what time|what day|what subjects|like \+ verb-ing|最喜欢|favourite|whose|which one|same|different|be good at|it's time|it’s time|wear|because|how \+ adjective|it is so|it\'s so/.test(text)) return 'mid';
  return 'lower';
}

function levelLabel(level) {
  const map = {
    lower: '低年级打底',
    mid: '中年级巩固',
    upper: '高年级提升',
    extend: '拓展了解',
  };
  return map[level] || '全部';
}

function gradeLabel(level) {
  const map = {
    lower: '建议 1-2 年级先学',
    mid: '建议 3-4 年级重点学',
    upper: '建议 5 年级重点学',
    extend: '建议学有余力再看',
  };
  return map[level] || '适合全部年级';
}

function starterReason(ruleTitle) {
  const title = ruleTitle || '';
  if (/名词 noun/.test(title)) return '先把“人、物、地点的名字”认清，后面句子才不乱。';
  if (/代词 pronoun/.test(title)) return '学会用 I / you / he / she 替换名字，句子更短更顺口。';
  if (/动词 verb/.test(title)) return '句子有没有动作，全靠动词撑起来。';
  if (/冠词 article/.test(title)) return 'a / an / the 很常见，先分清再读句子更稳。';
  if (/一般现在时/.test(title)) return '日常表达、习惯动作最常用这个时态。';
  if (/现在进行时/.test(title)) return '正在做什么，是孩子口语输出里很高频的结构。';
  if (/主语 subject/.test(title)) return '先找“谁”，句子结构立刻清楚一半。';
  if (/主谓宾结构/.test(title)) return '学会“谁做什么”，才能自己造句。';
  return '这是孩子最常遇到、最值得先掌握的规则。';
}

function buildWrongTip(rule) {
  const text = `${rule.title || ''} ${rule.pattern || ''}`.toLowerCase();
  if (/名词复数/.test(text)) return '先看词尾，再决定加 -s、-es，还是变 y 为 i 再加 -es。';
  if (/所有格/.test(text)) return '单数名词常加 \'s；复数已经有 s 时，通常只加撇号。';
  if (/一般现在时/.test(text)) return 'he、she、it 后别忘了动词三单；疑问和否定句里动词又要回原形。';
  if (/现在进行时|进行时态/.test(text)) return '进行时一定要有 be，再加动词 ing；少一个都不完整。';
  if (/一般过去时/.test(text)) return '看到 before、yesterday 这类过去时间词，要提醒自己想过去式。';
  if (/一般将来时/.test(text)) return 'will 和 be going to 后面都接动词原形，不要再变形。';
  if (/what's this\/that|询问单数物品|介绍单数人或物|确认单数/.test(text)) return 'this / that 问和答的都是单数，回答常用 it，不要混成 they。';
  if (/what are these\/those|询问复数物品|介绍复数人或物|确认复数/.test(text)) return 'these / those 指复数，be 动词常用 are，回答也常用 they。';
  if (/where is|where are|询问位置/.test(text)) return 'where 问的是“在哪里”，回答里别只说物品名，通常要加 in / on / under / behind / by。';
  if (/there is|there are/.test(text)) return 'There be 后面最近的名词是单数用 is，复数用 are。';
  if (/what colour/.test(text)) return 'What colour 是问颜色，不是问是什么东西；回答常说 It is blue. 这类颜色句。';
  if (/what time|what day/.test(text)) return 'What time 问几点，What day 问星期几；两个句型长得像，最容易混。';
  if (/what is your favourite|最喜欢/.test(text)) return 'favourite 是“最喜欢的”，回答时别只蹦一个单词，尽量说完整句。';
  if (/it's time for|it’s time for|it's time to|it’s time to|到时间了/.test(text)) return 'for 后更常接名词，to 后更常接动词原形，这两个结构不要对调。';
  if (/we have/.test(text)) return '课程里的 have 常表示“上……课”，不是“拥有”的意思。';
  if (/be good at/.test(text)) return 'good at 后面常接名词或动词 ing，不直接接动词原形。';
  if (/wear|穿着/.test(text)) return 'wear 表示“穿着某衣物”，别和 put on 这种“穿上动作”混掉。';
  if (/whose|归属/.test(text)) return 'Whose 是问“谁的”，不是单纯问“谁”；回答常用 my father\'s / mine 这类形式。';
  if (/which one|选择/.test(text)) return 'Which one 常用于几个明确选项里选一个，不是开放提问。';
  if (/same|different/.test(text)) return 'same 前常有 the，different 常后接复数名词或 from。';
  if (/宾格/.test(text)) return '动词或介词后常用 me、him、her、them，不用 I、he、she、they。';
  if (/形容词性物主代词/.test(text)) return 'my、your、his 后面要跟名词，不能单独放。';
  if (/名词性物主代词/.test(text)) return 'mine、yours、hers 后面不要再接名词。';
  if (/介词/.test(text)) return '地点表达最容易混：in 里面，on 上面，under 下面，behind 后面。';
  if (/冠词/.test(text)) return 'a 用在辅音音素前，an 用在元音音素前，the 常表示“特指这个”。';
  if (/被动语态/.test(text)) return '被动语态一定要看见 be + done，少了 be 或 done 都不对。';
  if (/祈使/.test(text)) return '祈使句常省主语，通常用动词原形直接开头。';
  if (/would you like/.test(text)) return 'Would you like 问“想不想要”，不是长期喜好；别和 Do you like 混在一起。';
  if (/do you have|表达拥有/.test(text)) return 'Do you have ...? 回答还用 do / don\'t，不直接重复 have。';
  if (/can you|表达能力/.test(text)) return 'can 后面接动词原形，回答里也要用 can / can\'t。';
  if (/can i|may i/.test(text)) return 'Can I / May I 是“我可不可以”，主语是 I，不是 you。';
  if (/like \+ verb-ing/.test(text)) return '说爱好时 like 后常接 doing，不要直接写成 like play。';
  if (/what does .* do|询问职业/.test(text)) return 'What does ... do? 是问职业，不是在问“正在做什么”。';
  if (/want to \+ verb|be going to \+ verb/.test(text)) return 'want to 和 be going to 后面都接动词原形，不要再加 -ing。';
  if (/why \.\.\.\? because|because/.test(text)) return 'Why 用来提问原因，Because 用来回答原因；不要把 because 单独拿去发问。';
  if (/比较级/.test(text)) return '比较级多半用于两者比较，后面常跟 than；别和最高级混。';
  if (/最高级/.test(text)) return '最高级常表示三个以上里“最……”，前面经常有 the。';
  if (/how \+ adjective|感叹句/.test(text)) return 'How + 形容词 是感叹，不是在问“怎么样”；语气上要读出来。';
  if (/it is so|it\'s so/.test(text)) return 'so 是加强程度，不是单独成句；后面一般接形容词。';
  if (/a or b|\sor\s/.test(text)) return 'or 表示二选一；如果是两个都要，才用 and。';
  return '先看结构，再对照例句说一遍，别只记中文意思。';
}

function buildCompareTip(rule) {
  const text = `${rule.title || ''} ${rule.pattern || ''}`.toLowerCase();
  if (/一般现在时/.test(text)) return '一般现在时说“经常、习惯、事实”；现在进行时说“正在发生”。';
  if (/现在进行时/.test(text)) return '看到 am / is / are + doing，多半就是进行时；不是单纯动词原形。';
  if (/一般过去时/.test(text)) return '过去时说“已经发生过”，将来时说“还没发生”。';
  if (/一般将来时/.test(text)) return 'will / be going to 说将来；不要和 was / were 混在一起。';
  if (/what's this\/that|what are these\/those/.test(text)) return 'What\'s this/that 问单数；What are these/those 问复数。先看 is 还是 are。';
  if (/this is|that is|these are|those are/.test(text)) return 'This/That 搭配 is；These/Those 搭配 are。单复数要一起变。';
  if (/is this|are these/.test(text)) return 'Is this ...? 问单数；Are these ...? 问复数。回答时 it 和 they 也要跟着变。';
  if (/what time|what day/.test(text)) return 'What time 回答钟点；What day 回答 Monday、Friday 这种星期词。';
  if (/would you like/.test(text)) return 'Do you like 问喜好；Would you like 问现在想不想要。';
  if (/can i|may i/.test(text)) return 'Can you ...? 是问“你会不会”；Can I ...? / May I ...? 是问“我可不可以”。';
  if (/want to \+ verb|be going to \+ verb/.test(text)) return 'want to 更像愿望；be going to 更像已经有安排的计划。';
  if (/what is your favourite|最喜欢/.test(text)) return 'favourite 更像“最喜欢哪一个”；like 则可以是一般性的“喜欢”。';
  if (/it's time for|it’s time for|it's time to|it’s time to/.test(text)) return 'It\'s time for class 说“到上课时间了”；It\'s time to read 说“到去读书的时候了”。';
  if (/whose|which one/.test(text)) return 'Whose 问归属；Which one 问从几个选项里选哪一个。';
  if (/same|different/.test(text)) return 'same 说“相同”；different 说“不同”，常用来做对比。';
  if (/why \.\.\.\? because|because/.test(text)) return 'Why 负责提问；Because 负责解释原因。';
  if (/比较级/.test(text)) return 'bigger、smaller 这类比较级，常用来比两个；biggest、smallest 这类最高级，常用于三个以上。';
  if (/最高级/.test(text)) return '比较级常和 than 搭配；最高级前面常带 the。';
  if (/how \+ adjective/.test(text)) return 'How beautiful! 是感叹；What colour is it? 才是提问。';
  if (/it is so|it\'s so/.test(text)) return 'How beautiful! 偏感叹；It is so beautiful. 更像完整陈述。';
  if (/冠词/.test(text)) return 'a / an 多数是“一个”；the 更像“这个、那个我们都知道的”。';
  if (/形容词性物主代词/.test(text) || /名词性物主代词/.test(text)) return 'my pen 可以说；mine pen 不可以，因为 mine 已经等于 my pen。';
  if (/主动语态/.test(text) || /被动语态/.test(text)) return '主动看“谁做”；被动看“谁被做”。先找动作发出者或承受者。';
  if (/并列句/.test(text)) return '并列句是两个完整句子手拉手；复合句则是主句带着从句。';
  if (/主谓宾结构/.test(text)) return '主系表说“是什么/怎么样”，主谓宾说“做什么”。';
  return '';
}

function hasActiveSearch() {
  return Boolean(clean(state.searchQuery));
}

function matchesSearch(meta, query = normalizeSearchQuery(state.searchQuery)) {
  if (!query) return true;
  const haystack = normalizeSearchQuery([
    meta.group.title,
    meta.group.desc || '',
    meta.rule.title || '',
    meta.rule.pattern || '',
    meta.rule.cn || '',
    meta.rule.example || '',
    meta.rule.note || '',
    meta.rule.tip || '',
  ].join(' '));

  return haystack.includes(query) || query.split(' ').every(token => haystack.includes(token));
}

function buildMeta(group, rule, groupIndex, ruleIndex) {
  const helper = getKidHelper(rule);
  const practice = rule.practice || helper.practice || null;
  const parts = rule.parts || helper.parts || null;
  const level = inferRuleLevel(group, rule);
  return {
    group,
    rule,
    groupIndex,
    ruleIndex,
    id: `card-${groupIndex}-${ruleIndex}`,
    helper,
    practice,
    parts,
    level,
    levelText: levelLabel(level),
    gradeText: gradeLabel(level),
    starter: starterMatchers.some(pattern => pattern.test(rule.title || '')),
    wrongTip: buildWrongTip(rule),
    compareTip: buildCompareTip(rule),
  };
}

function getVisibleGroups(filter = state.gradeFilter) {
  return guide.map((group, groupIndex) => {
    const visibleRules = (group.rules || [])
      .map((rule, ruleIndex) => buildMeta(group, rule, groupIndex, ruleIndex))
      .filter(meta => (filter === 'all' || meta.level === filter) && matchesSearch(meta));

    return {
      ...group,
      groupIndex,
      visibleRules,
    };
  }).filter(group => group.visibleRules.length);
}

function getAllVisibleRules(filter = state.gradeFilter) {
  return getVisibleGroups(filter).flatMap(group => group.visibleRules);
}

function getStarterRules() {
  const allRules = getAllVisibleRules('all');
  const selected = [];
  const seen = new Set();

  starterMatchers.forEach(pattern => {
    const match = allRules.find(item => pattern.test(item.rule.title || ''));
    if (!match || seen.has(match.id)) return;
    seen.add(match.id);
    selected.push(match);
  });

  allRules.forEach(item => {
    if (selected.length >= 8 || seen.has(item.id)) return;
    if (item.level === 'extend') return;
    seen.add(item.id);
    selected.push(item);
  });

  return selected.slice(0, 8);
}

function getPracticePool(filter = state.gradeFilter) {
  return getAllVisibleRules(filter).filter(item => item.practice);
}

function currentPracticeItem() {
  return state.practiceItems[state.practiceIndex] || null;
}

function resetPractice(filter = state.gradeFilter) {
  state.practiceItems = shuffleArray(getPracticePool(filter));
  state.practiceIndex = 0;
  state.practiceScore = 0;
  state.practiceInput = '';
  state.practiceChecked = false;
  state.practiceWasCorrect = false;
  state.practiceShowAnswer = false;
  state.practiceFeedback = '';
  state.practiceFinished = false;
  state.practiceScored = false;
}

function scrollToElement(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const panelBody = element.closest('.panel-body');
  if (panelBody && !panelBody.classList.contains('open')) {
    const panelHead = panelBody.previousElementSibling;
    if (panelHead?.classList.contains('panel-head')) {
      setPanelOpen(panelHead, true);
    }
  }
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  element.classList.remove('grammar-spotlight');
  void element.offsetWidth;
  element.classList.add('grammar-spotlight');
  window.setTimeout(() => element.classList.remove('grammar-spotlight'), 1600);
}

function renderCounts() {
  const counts = {
    lower: getPracticePool('lower').length,
    mid: getPracticePool('mid').length,
    upper: getPracticePool('upper').length,
    extend: getPracticePool('extend').length,
  };

  return `
    <div class="grammar-count-row">
      <span class="grammar-count-pill">低年级 ${counts.lower}</span>
      <span class="grammar-count-pill">中年级 ${counts.mid}</span>
      <span class="grammar-count-pill">高年级 ${counts.upper}</span>
      <span class="grammar-count-pill">拓展 ${counts.extend}</span>
    </div>`;
}

function renderFilterBar() {
  return `
    <div class="grammar-filter-bar" role="group" aria-label="按年级筛选">
      ${gradeFilters.map(item => `
        <button class="grammar-filter-btn${state.gradeFilter === item.key ? ' active' : ''}" type="button" data-grade-filter="${item.key}">
          ${htmlEscape(item.label)}
        </button>`).join('')}
    </div>`;
}

function renderLookupBar() {
  const visibleCount = getAllVisibleRules(state.gradeFilter).length;
  return `
    <div class="grammar-search-bar">
      <input
        class="grammar-search-input"
        type="search"
        data-grammar-search
        value="${htmlEscape(state.searchQuery)}"
        placeholder="输入句型、语法词或中文，如 there be / 一般过去时 / 颜色"
        aria-label="按关键词搜索语法"
      >
      ${hasActiveSearch() ? '<button class="grammar-search-clear" type="button" data-grammar-search-clear>清空</button>' : ''}
    </div>
    <div class="grammar-search-tip">
      ${hasActiveSearch()
        ? `当前关键词：${htmlEscape(state.searchQuery)}，匹配 ${visibleCount} 条规则。`
        : '可搜规则名、中文说明、英文句型和例句。'}
    </div>`;
}

function renderSearchState(visibleCount) {
  if (!hasActiveSearch()) return '';
  if (visibleCount > 0) {
    return `
      <section class="grammar-summary-card grammar-search-summary">
        <div class="grammar-block-head">
          <div>
            <h3>搜索结果</h3>
            <p>已按关键词“${htmlEscape(state.searchQuery)}”筛出 ${visibleCount} 条规则，下方目录和卡片已同步收窄。</p>
          </div>
          <span class="grammar-block-badge">关键词</span>
        </div>
      </section>`;
  }

  return `
    <section class="grammar-summary-card grammar-search-summary">
      <div class="grammar-block-head">
        <div>
          <h3>没找到匹配内容</h3>
          <p>换个中文词、英文句型或结构词试试，比如 There be、What colour、一般过去时、比较级。</p>
        </div>
        <span class="grammar-block-badge">0 条</span>
      </div>
    </section>`;
}

function renderBookQuickIndex() {
  return `
    <section class="grammar-summary-card grammar-book-index">
      <div class="grammar-block-head">
        <div>
          <h3>按册速查</h3>
          <p>先回对应课本页，也可以直接点本册高频句型，把当前页面筛到相关规则。</p>
        </div>
        <span class="grammar-block-badge">${bookQuickLinks.length} 册入口</span>
      </div>
      <div class="grammar-book-grid">
        ${bookQuickLinks.map(book => `
          <article class="grammar-book-card">
            <div class="grammar-book-top">
              <div>
                <div class="grammar-book-labels">
                  <span class="grammar-book-tag">${htmlEscape(book.tag)}</span>
                  <h4>${htmlEscape(book.label)}</h4>
                </div>
                <p>${htmlEscape(book.desc)}</p>
              </div>
              <a class="grammar-book-link" href="${htmlEscape(book.href)}">打开课本</a>
            </div>
            <div class="grammar-book-queries">
              ${book.queries.map(query => `
                <button class="grammar-book-chip" type="button" data-quick-query="${htmlEscape(query)}">
                  ${renderHighlightedText(query)}
                </button>`).join('')}
            </div>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderStarterPath() {
  const items = getStarterRules();
  if (!items.length) return '';
  return `
    <section class="grammar-starter-card">
      <div class="grammar-block-head">
        <div>
          <h3>先学这些</h3>
          <p>按“词类 → 常用时态 → 句子主干”走，孩子更容易从会认到会用。</p>
        </div>
        <span class="grammar-block-badge">入门路径</span>
      </div>
      <div class="starter-path-grid">
        ${items.map((item, index) => `
          <article class="starter-step" data-scroll-rule="${htmlEscape(item.id)}">
            <div class="starter-step-top">
              <span class="starter-step-order">${index + 1}</span>
              <span class="grammar-level-badge is-${item.level}">${htmlEscape(item.levelText)}</span>
            </div>
            <h4>${htmlEscape(item.rule.title)}</h4>
            <p>${htmlEscape(starterReason(item.rule.title))}</p>
            <div class="starter-step-example">${htmlEscape(item.rule.example || item.rule.pattern || '')}</div>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderStudyPlan() {
  const plan = [
    { day: '第 1 天', title: '先分清词类', body: '名词、代词、动词、冠词。先能说出“这个词是什么”。' },
    { day: '第 2 天', title: '补足常见修饰词', body: '形容词、副词、介词、连词。重点看它们在句子里放哪。' },
    { day: '第 3 天', title: '拿下一般现在时', body: '练 he / she / it 三单变化，再做 5 题问答。' },
    { day: '第 4 天', title: '拿下现在进行时', body: '盯住 be + doing，读句子时把 am / is / are 一起读出来。' },
    { day: '第 5 天', title: '认识过去和将来', body: '先会分“已经发生”和“还没发生”，不追求一次学全。' },
    { day: '第 6 天', title: '拆句子主干', body: '找主语、谓语、宾语，学会看“谁做什么”。' },
    { day: '第 7 天', title: '综合复习', body: '回到页面内练习，把错题和易错提醒再过一遍。' },
  ];

  return `
    <section class="grammar-summary-card grammar-study-plan" id="grammarStudyPlan">
      <div class="grammar-block-head">
        <div>
          <h3>一周学习计划</h3>
          <p>每天只抓一个重点，学完就回到页面内练习巩固，不靠死背整页规则。</p>
        </div>
        <span class="grammar-block-badge">7 天</span>
      </div>
      <div class="study-plan-grid">
        ${plan.map(item => `
          <article class="study-plan-card">
            <span class="study-plan-day">${htmlEscape(item.day)}</span>
            <h4>${htmlEscape(item.title)}</h4>
            <p>${htmlEscape(item.body)}</p>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderGradePracticeLayers() {
  return `
    <section class="grammar-summary-card grammar-grade-practice" id="grammarGradePractice">
      <div class="grammar-block-head">
        <div>
          <h3>按年级分层练习</h3>
          <p>每个年级只抓当前最该练的语法动作，从认读、替换、问答逐步过渡到拆句和时态判断。</p>
        </div>
        <span class="grammar-block-badge">1-5 年级</span>
      </div>
      <div class="grade-practice-grid">
        ${gradePracticeLayers.map(layer => `
          <article class="grade-practice-card">
            <div class="grade-practice-top">
              <h4>${htmlEscape(layer.grade)}</h4>
              <span class="grammar-level-badge is-${htmlEscape(layer.level)}">${htmlEscape(levelLabel(layer.level))}</span>
            </div>
            <p>${htmlEscape(layer.focus)}</p>
            <div class="grade-practice-targets">
              ${layer.targets.map(target => `<span>${htmlEscape(target)}</span>`).join('')}
            </div>
            <div class="grade-practice-exercises">
              ${layer.exercises.map(exercise => `
                <div class="grade-practice-exercise">
                  <b>${htmlEscape(exercise.title)}</b>
                  <span>${htmlEscape(exercise.body)}</span>
                </div>`).join('')}
            </div>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderPracticeBoard() {
  const total = state.practiceItems.length;
  const item = currentPracticeItem();

  if (!total) {
    return `
      <section class="grammar-practice-board" id="grammarPracticeBoard">
        <div class="grammar-block-head">
          <div>
            <h3>页面内练习</h3>
            <p>当前筛选下暂时没有可练题目，切换一个年级层级再试。</p>
          </div>
          <span class="grammar-block-badge">0 题</span>
        </div>
        <div class="practice-result">先切换筛选，或直接点“全部”开始练习。</div>
      </section>`;
  }

  if (state.practiceFinished) {
    const percentage = Math.round((state.practiceScore / total) * 100);
    let message = '继续把错题对应的规则卡再看一遍。';
    if (percentage >= 90) message = '已经能熟练区分大部分规则，可以进入高年级或拓展内容。';
    else if (percentage >= 70) message = '基础已经比较稳，接下来重点补易错点。';

    return `
      <section class="grammar-practice-board" id="grammarPracticeBoard">
        <div class="grammar-block-head">
          <div>
            <h3>页面内练习</h3>
            <p>随机抽取当前筛选下的规则小题，边练边回看对应规则。</p>
          </div>
          <span class="grammar-block-badge">${total} 题完成</span>
        </div>
        <div class="practice-board-top">
          <div>
            <div class="practice-stage">练习结束</div>
            <div class="practice-subtext">得分 ${state.practiceScore} / ${total}，正确率 ${percentage}%</div>
          </div>
          <div class="practice-score">当前筛选：${htmlEscape(gradeFilters.find(itemValue => itemValue.key === state.gradeFilter)?.label || '全部')}</div>
        </div>
        <div class="practice-result is-finished">${htmlEscape(message)}</div>
        <div class="practice-actions">
          <button type="button" data-practice-action="restart">重新练一轮</button>
          <button type="button" data-practice-action="show-plan">去看学习计划</button>
        </div>
      </section>`;
  }

  return `
    <section class="grammar-practice-board" id="grammarPracticeBoard">
      <div class="grammar-block-head">
        <div>
          <h3>页面内练习</h3>
          <p>不再用弹窗，直接在页面里答题、看答案、跳回对应规则复习。</p>
        </div>
        <span class="grammar-block-badge">${total} 题池</span>
      </div>
      <div class="practice-board-top">
        <div>
          <div class="practice-stage">第 ${state.practiceIndex + 1} / ${total} 题</div>
          <div class="practice-subtext">答对 ${state.practiceScore} 题后再进入下一层级更稳。</div>
        </div>
        <div class="practice-score">当前得分 ${state.practiceScore}</div>
      </div>
      <div class="practice-board-question">${htmlEscape(item.practice.q)}</div>
      <div class="practice-subtext">所属：${htmlEscape(item.group.title)} / ${htmlEscape(item.rule.title)}</div>
      <div class="practice-helper-list">
        <span class="practice-helper-chip">${htmlEscape(item.levelText)}</span>
        <span class="practice-helper-chip">${htmlEscape(item.gradeText)}</span>
        <span class="practice-helper-chip">${htmlEscape(item.rule.pattern || '规则结构')}</span>
      </div>
      <div class="practice-input-row">
        <input type="text" data-practice-input value="${htmlEscape(state.practiceInput)}" placeholder="在这里输入答案">
        <button type="button" data-practice-action="check">检查答案</button>
      </div>
      <div class="practice-actions">
        <button type="button" data-practice-action="show-answer">显示答案</button>
        <button type="button" data-practice-action="go-rule" data-rule-anchor="${htmlEscape(item.id)}">查看对应规则</button>
        <button type="button" data-practice-action="next">下一题</button>
        <button type="button" data-practice-action="restart">重新开始</button>
      </div>
      <div class="practice-result${state.practiceChecked ? (state.practiceWasCorrect ? ' is-correct' : ' is-wrong') : ''}">
        ${state.practiceFeedback
          ? htmlEscape(state.practiceFeedback)
          : htmlEscape(item.wrongTip || '先自己作答，再看答案和易错提醒。')}
        ${state.practiceShowAnswer ? `<div class="practice-answer">答案：${htmlEscape(item.practice.a)}</div>` : ''}
      </div>
    </section>`;
}

function renderRuleCard(item, index) {
  const { rule, helper, practice, parts, wrongTip, compareTip } = item;
  return `
    <article class="grammar-guide-card grammar-rule-card" id="${htmlEscape(item.id)}">
      <div class="grammar-rule-tags">
        <span class="rule-number">${index}</span>
        <span class="grammar-level-badge is-${item.level}">${htmlEscape(item.levelText)}</span>
        <span class="grammar-grade-chip">${htmlEscape(item.gradeText)}</span>
        ${item.starter ? '<span class="grammar-start-badge">先学</span>' : ''}
      </div>
      <div class="grammar-guide-title">${htmlEscape(rule.title)}</div>
      ${(rule.tip || helper.tip) ? `<div class="memory-tip">
        <span class="tip-icon">🎯</span>
        <span>${htmlEscape(rule.tip || helper.tip)}</span>
      </div>` : ''}
      <div class="grammar-guide-pattern">
        <span class="pattern-label">结构：</span>
        ${htmlEscape(rule.pattern || '')}
      </div>
      <div class="grammar-guide-cn">
        <span class="cn-label">说明：</span>
        ${htmlEscape(rule.cn || '')}
      </div>
      <div class="grammar-guide-example">
        <span class="example-label">例句：</span>
        ${htmlEscape(rule.example || '')}
      </div>
      ${parts ? `<div class="sentence-parts">
        <span class="parts-label">句子成分：</span>
        ${parts.map(part => `
          <span class="part-chip" title="${htmlEscape(part.role)}">
            <b>${htmlEscape(part.text)}</b>
            <small>${htmlEscape(part.role)}</small>
          </span>`).join('')}
      </div>` : ''}
      <div class="grammar-focus">
        <b>易错提醒</b>
        <span>${htmlEscape(wrongTip)}</span>
      </div>
      ${compareTip ? `<div class="grammar-focus is-contrast">
        <b>对比记忆</b>
        <span>${htmlEscape(compareTip)}</span>
      </div>` : ''}
      ${practice ? `<div class="mini-practice" id="practice-${htmlEscape(item.id)}">
        <div class="practice-q">
          <span class="practice-icon">❓</span>
          ${htmlEscape(practice.q)}
        </div>
        <button class="practice-reveal-btn" type="button" data-reveal-answer="${htmlEscape(item.id)}">显示答案</button>
        <div class="practice-a hidden" id="answer-${htmlEscape(item.id)}">
          <span class="answer-icon">✅</span>
          答案：${htmlEscape(practice.a)}
        </div>
      </div>` : ''}
      ${rule.note ? `<div class="grammar-guide-note">
        <span class="note-icon">💡</span>
        ${htmlEscape(rule.note)}
      </div>` : ''}
    </article>`;
}

function renderPanel(group, visibleIndex) {
  const isOpen = visibleIndex === 0;
  return `
    <section class="panel grammar-section" id="grammar-${group.groupIndex}">
      <button class="panel-head ${isOpen ? 'open' : ''}" type="button">
        <span>${group.icon || '📝'}</span>
        <span>${htmlEscape(group.title)}</span>
        <span class="rule-count">${group.visibleRules.length} 条</span>
        <span class="arrow">▼</span>
      </button>
      <div class="panel-body ${isOpen ? 'open' : ''}">
        <p class="hint-line">${htmlEscape(group.desc || '')}</p>
        <div class="grammar-guide-list">
          ${group.visibleRules.map((item, ruleIndex) => renderRuleCard(item, `${visibleIndex + 1}.${ruleIndex + 1}`)).join('')}
        </div>
      </div>
    </section>`;
}

function renderOverview() {
  const currentFilterLabel = gradeFilters.find(item => item.key === state.gradeFilter)?.label || '全部';
  const visibleRules = getAllVisibleRules(state.gradeFilter);
  const searchMode = hasActiveSearch();

  return `
    <section class="grammar-overview">
      <div class="grammar-summary-grid">
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>学习总览</h3>
              <p>当前看到 ${visibleRules.length} 条规则，既有语法术语，也有课内高频句型。先走入门路径，再按年级筛选，最后做页面内练习。</p>
            </div>
            <span class="grammar-block-badge">${htmlEscape(currentFilterLabel)}</span>
          </div>
          ${renderCounts()}
        </section>
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>按年级找内容</h3>
              <p>低年级先打底，中年级补句型和时态，高年级再碰复杂结构。</p>
            </div>
            <span class="grammar-block-badge">筛选</span>
          </div>
          ${renderFilterBar()}
        </section>
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>按关键词查</h3>
              <p>直接搜中文、英文句型或结构词，页面会只保留匹配内容。</p>
            </div>
            <span class="grammar-block-badge">搜索</span>
          </div>
          ${renderLookupBar()}
        </section>
      </div>
      ${renderSearchState(visibleRules.length)}
      ${searchMode ? '' : renderStarterPath()}
      ${searchMode ? '' : renderGradePracticeLayers()}
      ${searchMode ? '' : renderPracticeBoard()}
      ${searchMode ? '' : renderStudyPlan()}
    </section>`;
}

function renderRuleCardHighlighted(item, index) {
  const { rule, helper, practice, parts, wrongTip, compareTip } = item;
  return `
    <article class="grammar-guide-card grammar-rule-card" id="${htmlEscape(item.id)}">
      <div class="grammar-rule-tags">
        <span class="rule-number">${index}</span>
        <span class="grammar-level-badge is-${item.level}">${htmlEscape(item.levelText)}</span>
        <span class="grammar-grade-chip">${htmlEscape(item.gradeText)}</span>
        ${item.starter ? '<span class="grammar-start-badge">先学</span>' : ''}
      </div>
      <div class="grammar-guide-title">${renderHighlightedText(rule.title)}</div>
      ${(rule.tip || helper.tip) ? `<div class="memory-tip">
        <span class="tip-icon">Tip</span>
        <span>${renderHighlightedText(rule.tip || helper.tip)}</span>
      </div>` : ''}
      <div class="grammar-guide-pattern">
        <span class="pattern-label">结构：</span>
        ${renderHighlightedText(rule.pattern || '')}
      </div>
      <div class="grammar-guide-cn">
        <span class="cn-label">说明：</span>
        ${renderHighlightedText(rule.cn || '')}
      </div>
      <div class="grammar-guide-example">
        <span class="example-label">例句：</span>
        ${renderHighlightedText(rule.example || '')}
      </div>
      ${parts ? `<div class="sentence-parts">
        <span class="parts-label">句子成分：</span>
        ${parts.map(part => `
          <span class="part-chip" title="${htmlEscape(part.role)}">
            <b>${htmlEscape(part.text)}</b>
            <small>${htmlEscape(part.role)}</small>
          </span>`).join('')}
      </div>` : ''}
      <div class="grammar-focus">
        <b>易错提醒</b>
        <span>${htmlEscape(wrongTip)}</span>
      </div>
      ${compareTip ? `<div class="grammar-focus is-contrast">
        <b>对比记忆</b>
        <span>${htmlEscape(compareTip)}</span>
      </div>` : ''}
      ${practice ? `<div class="mini-practice" id="practice-${htmlEscape(item.id)}">
        <div class="practice-q">
          <span class="practice-icon">Q</span>
          ${htmlEscape(practice.q)}
        </div>
        <button class="practice-reveal-btn" type="button" data-reveal-answer="${htmlEscape(item.id)}">显示答案</button>
        <div class="practice-a hidden" id="answer-${htmlEscape(item.id)}">
          <span class="answer-icon">A</span>
          答案：${htmlEscape(practice.a)}
        </div>
      </div>` : ''}
      ${rule.note ? `<div class="grammar-guide-note">
        <span class="note-icon">Note</span>
        ${renderHighlightedText(rule.note)}
      </div>` : ''}
    </article>`;
}

function renderPanelHighlighted(group, visibleIndex) {
  const isOpen = visibleIndex === 0;
  return `
    <section class="panel grammar-section" id="grammar-${group.groupIndex}">
      <button class="panel-head ${isOpen ? 'open' : ''}" type="button">
        <span>${group.icon || '•'}</span>
        <span>${renderHighlightedText(group.title)}</span>
        <span class="rule-count">${group.visibleRules.length} 条</span>
        <span class="arrow">▼</span>
      </button>
      <div class="panel-body ${isOpen ? 'open' : ''}">
        <p class="hint-line">${renderHighlightedText(group.desc || '')}</p>
        <div class="grammar-guide-list">
          ${group.visibleRules.map((item, ruleIndex) => renderRuleCardHighlighted(item, `${visibleIndex + 1}.${ruleIndex + 1}`)).join('')}
        </div>
      </div>
    </section>`;
}

function renderOverviewEnhanced() {
  const currentFilterLabel = gradeFilters.find(item => item.key === state.gradeFilter)?.label || '全部';
  const visibleRules = getAllVisibleRules(state.gradeFilter);
  const searchMode = hasActiveSearch();

  return `
    <section class="grammar-overview">
      <div class="grammar-summary-grid">
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>学习总览</h3>
              <p>当前看到 ${visibleRules.length} 条规则，既有语法术语，也有课内高频句型。先走入门路径，再按年级筛选，最后做页面内练习。</p>
            </div>
            <span class="grammar-block-badge">${htmlEscape(currentFilterLabel)}</span>
          </div>
          ${renderCounts()}
        </section>
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>按年级找内容</h3>
              <p>低年级先打底，中年级补句型和时态，高年级再碰复杂结构。</p>
            </div>
            <span class="grammar-block-badge">筛选</span>
          </div>
          ${renderFilterBar()}
        </section>
        <section class="grammar-summary-card">
          <div class="grammar-block-head">
            <div>
              <h3>按关键词查</h3>
              <p>直接搜中文、英文句型或结构词，页面会只保留匹配内容。</p>
            </div>
            <span class="grammar-block-badge">搜索</span>
          </div>
          ${renderLookupBar()}
        </section>
      </div>
      ${renderSearchState(visibleRules.length)}
      ${renderBookQuickIndex()}
      ${searchMode ? '' : renderStarterPath()}
      ${searchMode ? '' : renderGradePracticeLayers()}
      ${searchMode ? '' : renderPracticeBoard()}
      ${searchMode ? '' : renderStudyPlan()}
    </section>`;
}

function focusSearchInput() {
  const input = document.querySelector('[data-grammar-search]');
  if (!input) return;
  input.focus();
  const end = input.value.length;
  input.setSelectionRange(end, end);
}

function setPanelOpen(head, shouldOpen) {
  const body = head.nextElementSibling;
  if (!body) return;

  head.classList.toggle('open', shouldOpen);
  if (shouldOpen) {
    body.classList.add('open');
    body.style.height = '0px';
    requestAnimationFrame(() => {
      body.style.height = `${body.scrollHeight}px`;
    });
    body.addEventListener('transitionend', function done(event) {
      if (event.propertyName !== 'height') return;
      body.removeEventListener('transitionend', done);
      if (body.classList.contains('open')) body.style.height = 'auto';
    });
    return;
  }

  body.style.height = `${body.scrollHeight}px`;
  requestAnimationFrame(() => {
    body.classList.remove('open');
    body.style.height = '0px';
  });
}

function revealAnswer(cardId) {
  const answerEl = document.getElementById(`answer-${cardId}`);
  const button = document.querySelector(`[data-reveal-answer="${cardId}"]`);
  if (answerEl) answerEl.classList.remove('hidden');
  if (button) button.style.display = 'none';
}

function refreshPracticeBoard() {
  const board = document.getElementById('grammarPracticeBoard');
  if (!board) return;
  board.outerHTML = renderPracticeBoard();
}

function renderApp() {
  const visibleGroups = getVisibleGroups(state.gradeFilter);
  nav.innerHTML = visibleGroups.map((group, index) => `
    <a class="nav-btn ${index === 0 ? 'active' : ''}" href="#grammar-${group.groupIndex}" style="--unit-color:#6f42c1">${renderHighlightedText(group.title)}</a>
  `).join('');

  app.innerHTML = `
    <section class="unit active" style="--unit-color:#6f42c1">
      <div class="unit-title">
        <h2>英语语法专题学习</h2>
        <p>${guide.length} 大类 · ${guide.reduce((sum, group) => sum + (group.rules || []).length, 0)} 条规则与高频句型 · 支持按年级筛选、关键词搜索与页面内练习</p>
      </div>
      ${renderOverviewEnhanced()}
      ${visibleGroups.map(renderPanelHighlighted).join('')}
    </section>`;
}

function checkPracticeAnswer() {
  const item = currentPracticeItem();
  if (!item || state.practiceFinished) return;

  const ok = normalizeAnswer(state.practiceInput) === normalizeAnswer(item.practice.a);
  state.practiceChecked = true;
  state.practiceWasCorrect = ok;
  state.practiceFeedback = ok
    ? '答对了。继续下一题，或者点“查看对应规则”再巩固一遍。'
    : item.wrongTip;
  if (ok && !state.practiceScored) state.practiceScore += 1;
  state.practiceScored = true;
  refreshPracticeBoard();
}

function nextPractice() {
  if (!state.practiceItems.length) return;
  if (state.practiceIndex >= state.practiceItems.length - 1) {
    state.practiceFinished = true;
    refreshPracticeBoard();
    return;
  }

  state.practiceIndex += 1;
  state.practiceInput = '';
  state.practiceChecked = false;
  state.practiceWasCorrect = false;
  state.practiceShowAnswer = false;
  state.practiceFeedback = '';
  state.practiceScored = false;
  refreshPracticeBoard();
}

function startRandomPractice() {
  resetPractice(state.gradeFilter);
  renderApp();
  scrollToElement('grammarPracticeBoard');
}

function generateStudyPlan() {
  scrollToElement('grammarStudyPlan');
}

document.addEventListener('click', event => {
  const head = event.target.closest('.panel-head');
  if (head) {
    setPanelOpen(head, !head.classList.contains('open'));
    return;
  }

  const navLink = event.target.closest('#grammarNav a');
  if (navLink) {
    document.querySelectorAll('#grammarNav a').forEach(link => link.classList.toggle('active', link === navLink));
    const target = document.querySelector(navLink.getAttribute('href'));
    const targetHead = target?.querySelector('.panel-head');
    if (targetHead && !targetHead.classList.contains('open')) setPanelOpen(targetHead, true);
    return;
  }

  const filterButton = event.target.closest('[data-grade-filter]');
  if (filterButton) {
    state.gradeFilter = filterButton.dataset.gradeFilter || 'all';
    resetPractice(state.gradeFilter);
    renderApp();
    return;
  }

  const searchClearButton = event.target.closest('[data-grammar-search-clear]');
  if (searchClearButton) {
    state.searchQuery = '';
    renderApp();
    focusSearchInput();
    return;
  }

  const quickQueryButton = event.target.closest('[data-quick-query]');
  if (quickQueryButton) {
    state.searchQuery = quickQueryButton.dataset.quickQuery || '';
    renderApp();
    focusSearchInput();
    return;
  }

  const revealButton = event.target.closest('[data-reveal-answer]');
  if (revealButton) {
    revealAnswer(revealButton.dataset.revealAnswer);
    return;
  }

  const starterCard = event.target.closest('[data-scroll-rule]');
  if (starterCard) {
    scrollToElement(starterCard.dataset.scrollRule);
    return;
  }

  const practiceButton = event.target.closest('[data-practice-action]');
  if (!practiceButton) return;
  const action = practiceButton.dataset.practiceAction;
  if (action === 'check') {
    checkPracticeAnswer();
    return;
  }
  if (action === 'show-answer') {
    const item = currentPracticeItem();
    if (!item) return;
    state.practiceShowAnswer = true;
    state.practiceFeedback = state.practiceFeedback || item.compareTip || item.wrongTip;
    refreshPracticeBoard();
    return;
  }
  if (action === 'next') {
    nextPractice();
    return;
  }
  if (action === 'restart') {
    startRandomPractice();
    return;
  }
  if (action === 'show-plan') {
    generateStudyPlan();
    return;
  }
  if (action === 'go-rule') {
    const anchor = practiceButton.dataset.ruleAnchor;
    if (anchor) scrollToElement(anchor);
  }
});

document.addEventListener('input', event => {
  if (event.target.matches('[data-grammar-search]')) {
    const nextValue = event.target.value;
    const selectionStart = event.target.selectionStart ?? nextValue.length;
    const selectionEnd = event.target.selectionEnd ?? nextValue.length;
    state.searchQuery = nextValue;
    renderApp();
    const nextInput = document.querySelector('[data-grammar-search]');
    if (nextInput) {
      const nextPosStart = Math.min(selectionStart, nextInput.value.length);
      const nextPosEnd = Math.min(selectionEnd, nextInput.value.length);
      nextInput.focus();
      nextInput.setSelectionRange(nextPosStart, nextPosEnd);
    }
    return;
  }

  if (!event.target.matches('[data-practice-input]')) return;
  state.practiceInput = event.target.value;
});

document.addEventListener('keydown', event => {
  if (!event.target.matches('[data-practice-input]')) return;
  if (event.key !== 'Enter') return;
  event.preventDefault();
  checkPracticeAnswer();
});

resetPractice('all');
renderApp();

window.revealAnswer = revealAnswer;
window.startRandomPractice = startRandomPractice;
window.generateStudyPlan = generateStudyPlan;
