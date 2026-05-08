window.COURSE_GRAMMAR_GUIDE = [
  {
    title: '1 词类和句类',
    icon: '📚',
    desc: '对应目录中的“词类”和“句类”，先建立整体框架。',
    rules: [
      { title: '词类 Parts of Speech', pattern: 'noun / pronoun / verb / adjective ...', cn: '词类是按单词在句子中的作用来分类。', example: 'book is a noun. run is a verb. happy is an adjective.', note: '词类分为实词和虚词。实词能独立担任句子成分；虚词主要起连接、限定或表达语气的作用。' },
      { title: '实词', pattern: 'content words', cn: '能在句子中独立担任某些成分。', example: 'I have a new book.', note: '常见实词：名词、代词、数词、动词、形容词、副词。' },
      { title: '虚词', pattern: 'function words', cn: '通常不独立担任主要成分，但帮助构成句意。', example: 'The book is on the desk.', note: '常见虚词：冠词、介词、连词、感叹词。' },
      { title: '按作用分的句类', pattern: 'statement / question / imperative / exclamation', cn: '按句子用途可分为陈述句、疑问句、祈使句、感叹句。', example: 'I like English. Do you like English? Please sit down. How nice!' },
      { title: '按结构分的句类', pattern: 'simple / compound / complex sentence', cn: '按结构可分为简单句、并列句和复合句。', example: 'I like apples. I like apples and you like bananas.' }
    ]
  },
  {
    title: '2 词类',
    icon: '🔤',
    desc: '参考目录中的名词、代词、数词、动词、感叹词和其他词类。',
    rules: [
      { title: '名词 noun', pattern: 'n.', cn: '表示人、事物、地点或概念的名称。', example: 'student, school, book, China', note: '可分为专有名词和普通名词；也可分为可数名词和不可数名词。' },
      { title: '专有名词', pattern: 'proper noun', cn: '个别的人、地点、机构等专有名称，通常首字母大写。', example: 'China, Mike, Su Hai, Nanjing' },
      { title: '普通名词', pattern: 'common noun', cn: '一类人或事物的普通名称。', example: 'pen, book, classroom, panda' },
      { title: '可数名词', pattern: 'countable noun', cn: '可以计数，有单数和复数形式。', example: 'a book, two books, three desks' },
      { title: '不可数名词', pattern: 'uncountable noun', cn: '通常不能直接用数字计数。', example: 'water, milk, rice, bread' },
      { title: '名词复数：一般加 -s', pattern: 'book → books', cn: '大多数可数名词变复数直接加 -s。', example: 'pen → pens, desk → desks' },
      { title: '名词复数：加 -es', pattern: 'class → classes', cn: '以 s, x, ch, sh 等结尾常加 -es。', example: 'box → boxes, watch → watches' },
      { title: '名词复数：辅音+y', pattern: 'party → parties', cn: '以辅音字母+y结尾，变 y 为 i 再加 -es。', example: 'baby → babies' },
      { title: '名词复数：f / fe', pattern: 'knife → knives', cn: '部分以 f 或 fe 结尾的名词变 f / fe 为 ves。', example: 'leaf → leaves' },
      { title: '不规则复数', pattern: 'child → children', cn: '部分名词复数不按规则变化。', example: 'man → men, sheep → sheep, fish → fish' },
      { title: '名词所有格', pattern: "father's birthday", cn: '表示所属关系。', example: "my mother's bag, Children's Day, my parents' room", note: '一般单数名词加 \'s；以 s 结尾的复数名词通常只加撇号。' },
      { title: '代词 pronoun', pattern: 'pron.', cn: '用来代替名词、形容词或数词。', example: 'I, you, he, she, it, we, they' },
      { title: '人称代词主格', pattern: 'I / you / he / she / it / we / they', cn: '主格通常作主语。', example: 'I like English. She is my friend.' },
      { title: '人称代词宾格', pattern: 'me / you / him / her / it / us / them', cn: '宾格通常作宾语。', example: 'Help me, please. Give it to her.' },
      { title: '形容词性物主代词', pattern: 'my / your / his / her / its / our / their', cn: '放在名词前，表示所属。', example: 'my pen, your ruler, their classroom' },
      { title: '名词性物主代词', pattern: 'mine / yours / his / hers / ours / theirs', cn: '相当于“物主代词 + 名词”。', example: 'This book is mine. That bag is hers.' },
      { title: '反身代词', pattern: 'myself / yourself / himself ...', cn: '表示“某人自己”。', example: 'I can do it myself.' },
      { title: '疑问代词', pattern: 'what / which / who / whose', cn: '用于提出问题。', example: 'What is your name? Which one do you want?' },
      { title: '数词 numeral', pattern: 'cardinal / ordinal number', cn: '表示数量或顺序。', example: 'one, two, three; first, second, third' },
      { title: '基数词', pattern: 'one, two, three', cn: '表示数量多少。', example: 'I have two mangoes.' },
      { title: '序数词', pattern: 'first, second, third', cn: '表示先后顺序，常与 the 连用。', example: 'the first day, the second lesson' },
      { title: '动词 verb', pattern: 'v.', cn: '表示动作或状态。', example: 'run, eat, play, be, like, have' },
      { title: '动词第三人称单数', pattern: 'help → helps', cn: '主语是 he / she / it 或单数名词时，一般现在时动词常变三单。', example: 'He likes carrots. She teaches English.' },
      { title: '动词三单：辅音+y', pattern: 'study → studies', cn: '以辅音字母+y结尾，变 y 为 i 再加 -es。', example: 'try → tries' },
      { title: '动词 -ing：一般加 -ing', pattern: 'go → going', cn: '用于进行时或动名词。', example: 'play → playing, read → reading' },
      { title: '动词 -ing：去 e', pattern: 'write → writing', cn: '以不发音 e 结尾，去 e 加 -ing。', example: 'make → making' },
      { title: '动词 -ing：双写', pattern: 'get → getting', cn: '重读闭音节且末尾只有一个辅音字母时，常双写再加 -ing。', example: 'run → running, swim → swimming' },
      { title: '情态动词', pattern: 'can / would / will / must', cn: '表示能力、请求、愿望、必要等语气。', example: 'I can swim. Would you like a sweet?', note: '情态动词后接动词原形，且不随人称变化加 -s。' },
      { title: '感叹词 interjection', pattern: 'Oh! Wow! Great!', cn: '表达说话时的情绪或口气。', example: 'Wow! How beautiful! Oh no!' },
      { title: '冠词 article', pattern: 'a / an / the', cn: '用在名词前说明所指。', example: 'a pen, an apple, the book' },
      { title: '介词 preposition', pattern: 'in / on / under / behind / at / to', cn: '表示名词、代词与其他词的关系。', example: 'on the desk, under the tree, at seven' },
      { title: '连词 conjunction', pattern: 'and / but / or / because', cn: '连接词、短语或句子。', example: 'I like English and Science.' },
      { title: '形容词 adjective', pattern: 'big / small / cute / beautiful', cn: '表示名词的特征。', example: 'a cute rabbit, a long ruler' },
      { title: '副词 adverb', pattern: 'fast / carefully / now / here', cn: '修饰动词、形容词、副词或全句。', example: 'Run fast. Please sit here.' }
    ]
  },
  {
    title: '3 时态',
    icon: '⏰',
    desc: '时态表示动作发生的时间和状态。小学阶段重点掌握一般现在时，并逐步认识其他时态。',
    rules: [
      { title: '一般时态', pattern: 'simple tense', cn: '表示一般状态、习惯动作或事实。', example: 'I like apples. He likes carrots.' },
      { title: '一般现在时', pattern: 'Subject + am/is/are or verb', cn: '表示现在状态、经常动作、能力或事实。', example: 'I am a student. I like oranges. She likes Music.' },
      { title: '一般现在时否定', pattern: 'do not / does not + verb', cn: '行为动词否定用 do not 或 does not。', example: 'I do not like oranges. He does not like fish.' },
      { title: '一般现在时疑问', pattern: 'Do / Does + subject + verb?', cn: '行为动词一般疑问句用 Do 或 Does 提问。', example: 'Do you like apples? Does he like carrots?' },
      { title: '一般过去时', pattern: 'verb-ed / was / were', cn: '表示过去发生的动作或状态。', example: 'It was blue before.', note: '三四年级先认识 was / were 和少量过去表达。' },
      { title: '一般将来时', pattern: 'will + verb / be going to + verb', cn: '表示将要发生的动作或计划。', example: 'I will help you. I am going to visit a museum.' },
      { title: '进行时态', pattern: 'be + verb-ing', cn: '表示正在进行的动作。', example: 'She is reading. They are playing.' },
      { title: '现在进行时', pattern: 'am / is / are + doing', cn: '表示现在正在进行。', example: 'I am drawing. He is running.' },
      { title: '完成时态', pattern: 'have / has + past participle', cn: '表示动作已经完成并与现在有关。', example: 'I have finished my homework.', note: '当前阶段只作了解。' },
      { title: '完成进行时态', pattern: 'have / has been + doing', cn: '表示动作从过去持续到现在。', example: 'I have been reading.', note: '高级结构，先建立目录概念。' }
    ]
  },
  {
    title: '4 语态',
    icon: '🔁',
    desc: '语态说明主语和动作的关系。',
    rules: [
      { title: '主动语态', pattern: 'active voice', cn: '主语是动作的发出者。', example: 'I clean the classroom. Mum cooks dinner.' },
      { title: '被动语态', pattern: 'be + past participle', cn: '主语是动作的承受者。', example: 'The room is cleaned.', note: '小学中低段以主动语态为主，被动语态先了解。' },
      { title: '被动语态的一般现在时', pattern: 'am / is / are + done', cn: '表示现在或经常发生的被动动作。', example: 'Our classroom is cleaned every day.' },
      { title: '含情态动词的被动语态', pattern: 'modal verb + be + done', cn: '情态动词后接 be done。', example: 'The door must be closed.' }
    ]
  },
  {
    title: '5 语气',
    icon: '💬',
    desc: '语气表示说话人对事情的态度或句子的功能。',
    rules: [
      { title: '陈述语气', pattern: 'statement mood', cn: '说明事实、状态或看法。', example: 'We are friends. It is sunny. I like English.' },
      { title: '祈使语气', pattern: 'imperative mood', cn: '表示请求、命令、劝告或建议。', example: 'Open the door, please. Don\'t run. Let us play together.' },
      { title: '虚拟语气', pattern: 'subjunctive mood', cn: '表示假设、愿望或非真实情况。', example: 'If I were a bird, I could fly.', note: '高级语法，当前只作目录认识。' }
    ]
  },
  {
    title: '6 句子成分',
    icon: '🧩',
    desc: '句子成分说明每一部分在句子里起什么作用。',
    rules: [
      { title: '主语 subject', pattern: 'S', cn: '句子说明的是谁或什么。', example: 'I like English. The plane is big.' },
      { title: '谓语 predicate', pattern: 'V / predicate', cn: '说明主语的动作、状态或特征。', example: 'I play football. She is kind.' },
      { title: '宾语 object', pattern: 'O', cn: '动作涉及的对象，常在及物动词或介词后。', example: 'I have a robot. Put it in the bag.' },
      { title: '定语 attributive', pattern: 'attribute', cn: '修饰、限定名词或代词。', example: 'a new kite, my friend, two books' },
      { title: '状语 adverbial', pattern: 'adverbial', cn: '说明时间、地点、方式、原因等。', example: 'I get up at seven. We play on Sunday.' },
      { title: '补语 complement', pattern: 'complement', cn: '补充说明主语或宾语。', example: 'Keep the room tidy.', note: 'tidy 补充说明 room 的状态。' },
      { title: '表语 predicative', pattern: 'be + predicative', cn: '位于系动词后，说明主语身份、性质或状态。', example: 'She is my mother. It is rainy.' },
      { title: '同位语 appositive', pattern: 'noun, appositive', cn: '对前面的名词再解释或说明。', example: 'This is my friend, Liu Tao.' },
      { title: '独立成分 independent element', pattern: 'hello / oh / thank you', cn: '与句子其他成分没有直接语法关系，但表达称呼、感叹、回应等。', example: 'Hello, Mike. Wow! Thank you, Mum.' }
    ]
  },
  {
    title: '7 句型结构',
    icon: '🏗️',
    desc: '句子按结构可分为简单句、并列句和复合句，也可以认识 It 引导结构。',
    rules: [
      { title: '简单句', pattern: 'one subject + one predicate', cn: '只有一套主要主谓结构。', example: 'I like English. She is my friend.' },
      { title: '主谓结构', pattern: 'S + V', cn: '主语 + 谓语。', example: 'Things change. Birds fly.' },
      { title: '主系表结构', pattern: 'S + link verb + P', cn: '主语 + 系动词 + 表语。', example: 'She is kind. It is sunny.' },
      { title: '主谓宾结构', pattern: 'S + V + O', cn: '主语 + 谓语 + 宾语。', example: 'I like apples. We have Music.' },
      { title: '主谓双宾结构', pattern: 'S + V + IO + DO', cn: '一个间接宾语和一个直接宾语。', example: 'He gave me a book.' },
      { title: '主谓宾补结构', pattern: 'S + V + O + OC', cn: '宾语后有补足语。', example: 'I find the book easy. Keep the room tidy.' },
      { title: 'It 引导结构', pattern: 'It is ...', cn: 'it 可作代词，也可作形式主语或引导结构。', example: 'It is sunny. It is nice to meet you.' },
      { title: '并列句', pattern: 'simple sentence + and / but / or / so + simple sentence', cn: '两个或多个简单句并列连接。', example: 'I like English and he likes Maths.' },
      { title: '复合句', pattern: 'main clause + subordinate clause', cn: '由一个主句和至少一个从句构成。', example: 'I choose this one because it is right for me.' },
      { title: '从句', pattern: 'clause', cn: '从句不能单独成句，需要依附主句。', example: 'I know that he is here.', note: '常见从句包括主语从句、宾语从句、表语从句、定语从句、状语从句等。' }
    ]
  }
];
