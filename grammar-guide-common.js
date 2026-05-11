window.COURSE_GRAMMAR_GUIDE = [
  {
    title: '1 词类和句类',
    icon: '📚',
    desc: '对应目录中的“词类”和“句类”，先建立整体框架。',
    rules: [
      { title: '词类 Parts of Speech', pattern: 'noun / pronoun / verb / adjective ...', cn: '词类是按单词在句子中的作用来分类。', example: 'book is a noun. run is a verb. happy is an adjective.', note: '词类分为实词和虚词。实词能独立担任句子成分；虚词主要起连接、限定或表达语气的作用。', tip: '词类好比零件，句子好比机器。', practice: { q: 'book、run、happy 哪个是名词？', a: 'book' } },
      { title: '实词', pattern: 'content words', cn: '能在句子中独立担任某些成分。', example: 'I have a new book.', note: '常见实词：名词、代词、数词、动词、形容词、副词。', tip: '实词有意义，能当主角。', practice: { q: 'I、book、run 都是实词吗？', a: '是的' } },
      { title: '虚词', pattern: 'function words', cn: '通常不独立担任主要成分，但帮助构成句意。', example: 'The book is on the desk.', note: '常见虚词：冠词、介词、连词、感叹词。', tip: '虚词像胶水，连接句子各部分。', practice: { q: 'the、on 是实词还是虚词？', a: '虚词' } },
      { title: '按作用分的句类', pattern: 'statement / question / imperative / exclamation', cn: '按句子用途可分为陈述句、疑问句、祈使句、感叹句。', example: 'I like English. Do you like English? Please sit down. How nice!', tip: '陈述说事实，疑问提问题，祈使提要求，感叹表情绪。', practice: { q: 'How nice! 是什么句类？', a: '感叹句' } },
      { title: '按结构分的句类', pattern: 'simple / compound / complex sentence', cn: '按结构可分为简单句、并列句和复合句。', example: 'I like apples. I like apples and you like bananas.', tip: '简单句一个意思，并列句两个意思手拉手，复合句主句带从句。', practice: { q: 'I like apples and you like bananas. 是什么句类？', a: '并列句' } }
    ]
  },
  {
    title: '2 词类',
    icon: '🔤',
    desc: '参考目录中的名词、代词、数词、动词、感叹词和其他词类。',
    rules: [
      { title: '名词 noun', pattern: 'n.', cn: '表示人、事物、地点或概念的名称。', example: 'student, school, book, China', note: '可分为专有名词和普通名词；也可分为可数名词和不可数名词。', tip: '人和东西都有名，book、Mike都是名。', practice: { q: 'book、run、happy 哪个是名词？', a: 'book' } },
      { title: '专有名词', pattern: 'proper noun', cn: '个别的人、地点、机构等专有名称，通常首字母大写。', example: 'China, Mike, Su Hai, Nanjing', tip: '专有名词首字母大写，独一无二是特点。', practice: { q: 'China 和 china 哪个是专有名词？', a: 'China' } },
      { title: '普通名词', pattern: 'common noun', cn: '一类人或事物的普通名称。', example: 'pen, book, classroom, panda', tip: '普通名词很常见，指的是一类事物。', practice: { q: 'pencil 是专有还是普通名词？', a: '普通名词' } },
      { title: '可数名词', pattern: 'countable noun', cn: '可以计数，有单数和复数形式。', example: 'a book, two books, three desks', tip: '可数名词能数数，a/an 放单数前。', practice: { q: 'book 是可数名词吗？', a: '是的' } },
      { title: '不可数名词', pattern: 'uncountable noun', cn: '通常不能直接用数字计数。', example: 'water, milk, rice, bread', tip: '不可数名词很特殊，不能直接用 a/an。', practice: { q: 'water 能说 a water 吗？', a: '不能' } },
      { title: '名词复数：一般加 -s', pattern: 'book → books', cn: '大多数可数名词变复数直接加 -s。', example: 'pen → pens, desk → desks', tip: '多数名词很简单，词尾直接加 -s。', practice: { q: 'desk 的复数是什么？', a: 'desks' } },
      { title: '名词复数：加 -es', pattern: 'class → classes', cn: '以 s, x, ch, sh 等结尾常加 -es。', example: 'box → boxes, watch → watches', tip: 's/x/ch/sh 结尾词，复数要加 -es。', practice: { q: 'box 的复数是什么？', a: 'boxes' } },
      { title: '名词复数：辅音+y', pattern: 'party → parties', cn: '以辅音字母+y结尾，变 y 为 i 再加 -es。', example: 'baby → babies', tip: '辅音加 y 要注意，y 变 i 加 -es。', practice: { q: 'baby 的复数是什么？', a: 'babies' } },
      { title: '名词复数：f / fe', pattern: 'knife → knives', cn: '部分以 f 或 fe 结尾的名词变 f / fe 为 ves。', example: 'leaf → leaves', tip: 'f/fe 结尾变复数，f 变 ves 要记住。', practice: { q: 'leaf 的复数是什么？', a: 'leaves' } },
      { title: '不规则复数', pattern: 'child → children', cn: '部分名词复数不按规则变化。', example: 'man → men, sheep → sheep, fish → fish', tip: '不规则复数要牢记，特殊情况特殊记。', practice: { q: 'man 的复数是什么？', a: 'men' } },
      { title: '名词所有格', pattern: "father's birthday", cn: '表示所属关系。', example: "my mother's bag, Children's Day, my parents' room", note: '一般单数名词加 \'s；以 s 结尾的复数名词通常只加撇号。', tip: '名词所有格很简单，\'s 表示“的”。', practice: { q: '妈妈的包怎么说？', a: "mother's bag" } },
      { title: '代词 pronoun', pattern: 'pron.', cn: '用来代替名词、形容词或数词。', example: 'I, you, he, she, it, we, they', tip: '名字太长我来替，I、you、he、she、it。', practice: { q: 'She is my mother. 哪个词代替妈妈？', a: 'She' } },
      { title: '人称代词主格', pattern: 'I / you / he / she / it / we / they', cn: '主格通常作主语。', example: 'I like English. She is my friend.', tip: '主格站前面，动作我来做。', practice: { q: '___ like English. 填 I 还是 me？', a: 'I' } },
      { title: '人称代词宾格', pattern: 'me / you / him / her / it / us / them', cn: '宾格通常作宾语。', example: 'Help me, please. Give it to her.', tip: '宾格放后面，动作对着我。', practice: { q: 'Help ___! 填 I 还是 me？', a: 'me' } },
      { title: '形容词性物主代词', pattern: 'my / your / his / her / its / our / their', cn: '放在名词前，表示所属。', example: 'my pen, your ruler, their classroom', tip: '形容词性物主代词，后面一定要跟名词。', practice: { q: '___ pen 填 I 还是 my？', a: 'my' } },
      { title: '名词性物主代词', pattern: 'mine / yours / his / hers / ours / theirs', cn: '相当于“物主代词 + 名词”。', example: 'This book is mine. That bag is hers.', tip: '名词性物主代词，后面不再跟名词。', practice: { q: 'This book is ___. 填 my 还是 mine？', a: 'mine' } },
      { title: '反身代词', pattern: 'myself / yourself / himself ...', cn: '表示“某人自己”。', example: 'I can do it myself.', tip: '反身代词很特别，动作回到自己身上。', practice: { q: 'I can do it ___. 填 me 还是 myself？', a: 'myself' } },
      { title: '疑问代词', pattern: 'what / which / who / whose', cn: '用于提出问题。', example: 'What is your name? Which one do you want?', tip: '疑问代词来提问，what 什么 which 哪个。', practice: { q: '___ is your name? 填 What 还是 Who？', a: 'What' } },
      { title: '数词 numeral', pattern: 'cardinal / ordinal number', cn: '表示数量或顺序。', example: 'one, two, three; first, second, third', tip: '基数词表数量，序数词表顺序。', practice: { q: 'one、two、three 是基数词还是序数词？', a: '基数词' } },
      { title: '基数词', pattern: 'one, two, three', cn: '表示数量多少。', example: 'I have two mangoes.', tip: '基数词很简单，就是一二三。', practice: { q: '我有两个芒果怎么说？', a: 'I have two mangoes.' } },
      { title: '序数词', pattern: 'first, second, third', cn: '表示先后顺序，常与 the 连用。', example: 'the first day, the second lesson', tip: '序数词表顺序，前面通常加 the。', practice: { q: '第一天怎么说？', a: 'the first day' } },
      { title: '动词 verb', pattern: 'v.', cn: '表示动作或状态。', example: 'run, eat, play, be, like, have', tip: '动作状态都靠它，run、like、is 都是它。', practice: { q: 'I like apples. 哪个是动词？', a: 'like' } },
      { title: '动词第三人称单数', pattern: 'help → helps', cn: '主语是 he / she / it 或单数名词时，一般现在时动词常变三单。', example: 'He likes carrots. She teaches English.', tip: 'he/she/it 作主语，动词要变三单。', practice: { q: 'He ___ carrots. 填 like 还是 likes？', a: 'likes' } },
      { title: '动词三单：辅音+y', pattern: 'study → studies', cn: '以辅音字母+y结尾，变 y 为 i 再加 -es。', example: 'try → tries', tip: '辅音加 y 变三单，y 变 i 加 -es。', practice: { q: 'She ___ English. 填 study 还是 studies？', a: 'studies' } },
      { title: '动词 -ing：一般加 -ing', pattern: 'go → going', cn: '用于进行时或动名词。', example: 'play → playing, read → reading', tip: '动词 ing 很容易，多数直接加 -ing。', practice: { q: 'play 的 -ing 形式是什么？', a: 'playing' } },
      { title: '动词 -ing：去 e', pattern: 'write → writing', cn: '以不发音 e 结尾，去 e 加 -ing。', example: 'make → making', tip: '不发音 e 结尾词，去 e 再加 -ing。', practice: { q: 'make 的 -ing 形式是什么？', a: 'making' } },
      { title: '动词 -ing：双写', pattern: 'get → getting', cn: '重读闭音节且末尾只有一个辅音字母时，常双写再加 -ing。', example: 'run → running, swim → swimming', tip: '重读闭音节词，末尾辅音要双写。', practice: { q: 'run 的 -ing 形式是什么？', a: 'running' } },
      { title: '情态动词', pattern: 'can / would / will / must', cn: '表示能力、请求、愿望、必要等语气。', example: 'I can swim. Would you like a sweet?', note: '情态动词后接动词原形，且不随人称变化加 -s。', tip: '情态动词很特殊，后面动词用原形。', practice: { q: 'I can ___ swim. 需要加 to 吗？', a: '不需要' } },
      { title: '感叹词 interjection', pattern: 'Oh! Wow! Great!', cn: '表达说话时的情绪或口气。', example: 'Wow! How beautiful! Oh no!', tip: '感叹词表情绪，单独使用很常见。', practice: { q: 'Wow! 是什么词类？', a: '感叹词' } },
      { title: '冠词 article', pattern: 'a / an / the', cn: '用在名词前说明所指。', example: 'a pen, an apple, the book', tip: 'a/an 表泛指，the 表特指。', practice: { q: '___ apple 填 a 还是 an？', a: 'an' } },
      { title: '介词 preposition', pattern: 'in / on / under / behind / at / to', cn: '表示名词、代词与其他词的关系。', example: 'on the desk, under the tree, at seven', tip: '介词像桥梁，连接名词和其他词。', practice: { q: '书在桌子上用 on 还是 in？', a: 'on' } },
      { title: '连词 conjunction', pattern: 'and / but / or / because', cn: '连接词、短语或句子。', example: 'I like English and Science.', tip: '连词来连接，and 表并列，but 表转折。', practice: { q: '我喜欢英语___科学。填 and 还是 but？', a: 'and' } },
      { title: '形容词 adjective', pattern: 'big / small / cute / beautiful', cn: '表示名词的特征。', example: 'a cute rabbit, a long ruler', tip: '形容词像画笔，给人和物添样子。', practice: { q: 'a cute rabbit 哪个词说明兔子可爱？', a: 'cute' } },
      { title: '副词 adverb', pattern: 'fast / carefully / now / here', cn: '修饰动词、形容词、副词或全句。', example: 'Run fast. Please sit here.', tip: '副词常常修动作，告诉怎么、何时、在哪里。', practice: { q: 'Run fast. 哪个词说明跑得怎样？', a: 'fast' } }
    ]
  },
  {
    title: '3 时态',
    icon: '⏰',
    desc: '时态表示动作发生的时间和状态。小学阶段重点掌握一般现在时，并逐步认识其他时态。',
    rules: [
      { title: '一般时态', pattern: 'simple tense', cn: '表示一般状态、习惯动作或事实。', example: 'I like apples. He likes carrots.', tip: '一般时态表常态，习惯动作和事实。', practice: { q: 'I like apples. 是什么时态？', a: '一般现在时' } },
      { title: '一般现在时', pattern: 'Subject + am/is/are or verb', cn: '表示现在状态、经常动作、能力或事实。', example: 'I am a student. I like oranges. She likes Music.', tip: '经常发生用现在，he/she/it 后动词变。', practice: { q: 'She ___ Music. 填 like 还是 likes？', a: 'likes' } },
      { title: '一般现在时否定', pattern: 'do not / does not + verb', cn: '行为动词否定用 do not 或 does not。', example: 'I do not like oranges. He does not like fish.', tip: '一般现在否定句，do/does not 加动词。', practice: { q: 'He ___ like fish. 填 do not 还是 does not？', a: 'does not' } },
      { title: '一般现在时疑问', pattern: 'Do / Does + subject + verb?', cn: '行为动词一般疑问句用 Do 或 Does 提问。', example: 'Do you like apples? Does he like carrots?', tip: '一般现在疑问句，Do/Does 放在主语前。', practice: { q: '___ you like apples? 填 Do 还是 Does？', a: 'Do' } },
      { title: '一般过去时', pattern: 'verb-ed / was / were', cn: '表示过去发生的动作或状态。', example: 'It was blue before.', note: '三四年级先认识 was / were 和少量过去表达。', tip: '过去时态表曾经，动词要变过去式。', practice: { q: 'It ___ blue before. 填 is 还是 was？', a: 'was' } },
      { title: '一般将来时', pattern: 'will + verb / be going to + verb', cn: '表示将要发生的动作或计划。', example: 'I will help you. I am going to visit a museum.', tip: '将来时态表未来，will 或 be going to。', practice: { q: 'I ___ help you. 填 will 还是 was？', a: 'will' } },
      { title: '进行时态', pattern: 'be + verb-ing', cn: '表示正在进行的动作。', example: 'She is reading. They are playing.', tip: '进行时态表正在，be 加动词 ing。', practice: { q: 'She ___ reading. 填 is 还是 are？', a: 'is' } },
      { title: '现在进行时', pattern: 'am / is / are + doing', cn: '表示现在正在进行。', example: 'I am drawing. He is running.', tip: '正在做，用进行，be 加动词 ing。', practice: { q: 'I am read 还是 I am reading？', a: 'I am reading' } },
      { title: '完成时态', pattern: 'have / has + past participle', cn: '表示动作已经完成并与现在有关。', example: 'I have finished my homework.', note: '当前阶段只作了解。', tip: '完成时态表完成，have/has 加过去分词。', practice: { q: 'I have ___ my homework. 填 finish 还是 finished？', a: 'finished' } },
      { title: '完成进行时态', pattern: 'have / has been + doing', cn: '表示动作从过去持续到现在。', example: 'I have been reading.', note: '高级结构，先建立目录概念。', tip: '完成进行表持续，从过去一直到现在。', practice: { q: 'I have been ___ 后面接什么？', a: 'doing' } }
    ]
  },
  {
    title: '4 语态',
    icon: '🔁',
    desc: '语态说明主语和动作的关系。',
    rules: [
      { title: '主动语态', pattern: 'active voice', cn: '主语是动作的发出者。', example: 'I clean the classroom. Mum cooks dinner.', tip: '谁来做，谁在前，主动语态最常见。', practice: { q: 'I clean the classroom. 谁在打扫？', a: 'I' } },
      { title: '被动语态', pattern: 'be + past participle', cn: '主语是动作的承受者。', example: 'The room is cleaned.', note: '小学中低段以主动语态为主，被动语态先了解。', tip: '谁被做，谁在前，be done 放后面。', practice: { q: 'The room is cleaned. 房间是做动作还是承受动作？', a: '承受动作' } },
      { title: '被动语态的一般现在时', pattern: 'am / is / are + done', cn: '表示现在或经常发生的被动动作。', example: 'Our classroom is cleaned every day.', tip: '被动语态一般时，am/is/are 加 done。', practice: { q: 'Our classroom ___ cleaned every day. 填 is 还是 are？', a: 'is' } },
      { title: '含情态动词的被动语态', pattern: 'modal verb + be + done', cn: '情态动词后接 be done。', example: 'The door must be closed.', tip: '情态动词加被动，be done 不能漏。', practice: { q: 'The door must ___ closed. 填 be 还是 is？', a: 'be' } }
    ]
  },
  {
    title: '5 语气',
    icon: '💬',
    desc: '语气表示说话人对事情的态度或句子的功能。',
    rules: [
      { title: '陈述语气', pattern: 'statement mood', cn: '说明事实、状态或看法。', example: 'We are friends. It is sunny. I like English.', tip: '陈述语气说事实，平铺直叙最常见。', practice: { q: 'I like English. 是什么语气？', a: '陈述语气' } },
      { title: '祈使语气', pattern: 'imperative mood', cn: '表示请求、命令、劝告或建议。', example: 'Open the door, please. Don\'t run. Let us play together.', tip: '动词开头提要求，Please 礼貌，Don\'t 禁止。', practice: { q: 'Don\'t run. 是让你跑还是不要跑？', a: '不要跑' } },
      { title: '虚拟语气', pattern: 'subjunctive mood', cn: '表示假设、愿望或非真实情况。', example: 'If I were a bird, I could fly.', note: '高级语法，当前只作目录认识。', tip: '虚拟语气表假设，想象世界很奇妙。', practice: { q: 'If I were a bird. 是真实的吗？', a: '不是' } }
    ]
  },
  {
    title: '6 句子成分',
    icon: '🧩',
    desc: '句子成分说明每一部分在句子里起什么作用。',
    rules: [
      { title: '主语 subject', pattern: 'S', cn: '句子说明的是谁或什么。', example: 'I like English. The plane is big.', tip: '句子说谁谁主语，通常站在最前面。', practice: { q: 'I like English. 主语是谁？', a: 'I' } },
      { title: '谓语 predicate', pattern: 'V / predicate', cn: '说明主语的动作、状态或特征。', example: 'I play football. She is kind.', tip: '主语做啥看谓语，动作状态它说明。', practice: { q: 'I play football. 谓语动作是哪个词？', a: 'play' } },
      { title: '宾语 object', pattern: 'O', cn: '动作涉及的对象，常在及物动词或介词后。', example: 'I have a robot. Put it in the bag.', tip: '动作落到谁身上，谁就是宾语。', practice: { q: 'I have a robot. 我有什么？', a: 'a robot' } },
      { title: '定语 attributive', pattern: 'attribute', cn: '修饰、限定名词或代词。', example: 'a new kite, my friend, two books', tip: '定语好比形容词，修饰名词和代词。', practice: { q: 'a new kite 哪个是定语？', a: 'new' } },
      { title: '状语 adverbial', pattern: 'adverbial', cn: '说明时间、地点、方式、原因等。', example: 'I get up at seven. We play on Sunday.', tip: '状语说明怎么样，时间地点和方式。', practice: { q: 'I get up at seven. at seven 是什么成分？', a: '状语' } },
      { title: '补语 complement', pattern: 'complement', cn: '补充说明主语或宾语。', example: 'Keep the room tidy.', note: 'tidy 补充说明 room 的状态。', tip: '补语补充说明，让意思更完整。', practice: { q: 'Keep the room tidy. tidy 补充说明什么？', a: 'room' } },
      { title: '表语 predicative', pattern: 'be + predicative', cn: '位于系动词后，说明主语身份、性质或状态。', example: 'She is my mother. It is rainy.', tip: 'be 后说明主语样，身份状态叫表语。', practice: { q: 'It is rainy. rainy 说明谁？', a: 'It' } },
      { title: '同位语 appositive', pattern: 'noun, appositive', cn: '对前面的名词再解释或说明。', example: 'This is my friend, Liu Tao.', tip: '同位语作补充，解释前面的名词。', practice: { q: 'This is my friend, Liu Tao. Liu Tao 是什么成分？', a: '同位语' } },
      { title: '独立成分 independent element', pattern: 'hello / oh / thank you', cn: '与句子其他成分没有直接语法关系，但表达称呼、感叹、回应等。', example: 'Hello, Mike. Wow! Thank you, Mum.', tip: '独立成分很自由，称呼感叹不用愁。', practice: { q: 'Hello, Mike. Hello 是什么成分？', a: '独立成分' } }
    ]
  },
  {
    title: '7 句型结构',
    icon: '🏗️',
    desc: '句子按结构可分为简单句、并列句和复合句，也可以认识 It 引导结构。',
    rules: [
      { title: '简单句', pattern: 'one subject + one predicate', cn: '只有一套主要主谓结构。', example: 'I like English. She is my friend.', tip: '一个主干一个意，简单句子最清楚。', practice: { q: 'I like English. 有几个主要意思？', a: '一个' } },
      { title: '主谓结构', pattern: 'S + V', cn: '主语 + 谓语。', example: 'Things change. Birds fly.', tip: '主谓结构最简单，主语动作紧相连。', practice: { q: 'Birds fly. 是什么结构？', a: '主谓结构' } },
      { title: '主系表结构', pattern: 'S + link verb + P', cn: '主语 + 系动词 + 表语。', example: 'She is kind. It is sunny.', tip: '主系表结构，be 动词是桥梁。', practice: { q: 'She is kind. 是什么结构？', a: '主系表结构' } },
      { title: '主谓宾结构', pattern: 'S + V + O', cn: '主语 + 谓语 + 宾语。', example: 'I like apples. We have Music.', tip: '谁做啥做什么，主谓宾三步走。', practice: { q: 'We have Music. 宾语是什么？', a: 'Music' } },
      { title: '主谓双宾结构', pattern: 'S + V + IO + DO', cn: '一个间接宾语和一个直接宾语。', example: 'He gave me a book.', tip: '双宾结构有两个宾语，一个间接一个直接。', practice: { q: 'He gave me a book. 间接宾语是谁？', a: 'me' } },
      { title: '主谓宾补结构', pattern: 'S + V + O + OC', cn: '宾语后有补足语。', example: 'I find the book easy. Keep the room tidy.', tip: '宾语后面加补足，说明宾语怎么样。', practice: { q: 'Keep the room tidy. tidy 是什么？', a: '宾语补足语' } },
      { title: 'It 引导结构', pattern: 'It is ...', cn: 'it 可作代词，也可作形式主语或引导结构。', example: 'It is sunny. It is nice to meet you.', tip: '天气时间常用 It，小小 It 站前面。', practice: { q: 'It is sunny. 这句话在说什么？', a: '天气' } },
      { title: '并列句', pattern: 'simple sentence + and / but / or / so + simple sentence', cn: '两个或多个简单句并列连接。', example: 'I like English and he likes Maths.', tip: '两个句子手拉手，and、but、or 来牵头。', practice: { q: 'I like apples and you like bananas. 连接词是什么？', a: 'and' } },
      { title: '复合句', pattern: 'main clause + subordinate clause', cn: '由一个主句和至少一个从句构成。', example: 'I choose this one because it is right for me.', tip: '主句带着小从句，because 常来说原因。', practice: { q: 'because 后面通常说明什么？', a: '原因' } },
      { title: '从句', pattern: 'clause', cn: '从句不能单独成句，需要依附主句。', example: 'I know that he is here.', note: '常见从句包括主语从句、宾语从句、表语从句、定语从句、状语从句等。', tip: '从句像个小宝宝，需要主句来照顾。', practice: { q: '从句能单独成句吗？', a: '不能' } }
    ]
  }
];
