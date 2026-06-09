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
  },
  {
    title: '8 课内高频句型',
    icon: '🗣️',
    desc: '把课本里最常用的提问、介绍、确认、位置和天气句型单独整理，复习时可以直接开口练。',
    rules: [
      { title: '询问单数物品', pattern: 'What\'s this/that?', cn: '询问近处或远处的单数人、物是什么。', example: 'What\'s that? It\'s a pencil case.', note: 'this 指近处，that 指远处；回答常用 It is ... / It\'s ...。', tip: 'this 近，that 远，看到一个东西先问 what is。', parts: [{ text: 'What', role: '疑问词' }, { text: 'is', role: 'be动词' }, { text: 'this/that', role: '指示代词' }], practice: { q: 'What\'s this? 常问单数还是复数？', a: '单数' } },
      { title: '询问复数物品', pattern: 'What are these/those?', cn: '询问近处或远处的复数人、物是什么。', example: 'What are those? They are sheep.', note: 'these 指近处这些，those 指远处那些；回答常用 They are ... / They\'re ...。', tip: 'these 近、those 远，两边问的都是复数。', parts: [{ text: 'What', role: '疑问词' }, { text: 'are', role: 'be动词' }, { text: 'these/those', role: '指示代词复数' }], practice: { q: 'What are these? 回答里 be 动词常用什么？', a: 'are' } },
      { title: '介绍单数人或物', pattern: 'This is ... / That is ...', cn: '介绍一个人或一件东西。', example: 'This is my pen. That is your ruler.', note: '介绍单数时用 is，不换成 are。', tip: '介绍一个，就用 This is / That is。', parts: [{ text: 'This/That', role: '主语' }, { text: 'is', role: 'be动词' }, { text: 'my pen', role: '表语' }], practice: { q: '介绍一支钢笔，说 This is a pen. 还是 These are a pen.？', a: 'This is a pen.' } },
      { title: '介绍复数人或物', pattern: 'These are ... / Those are ...', cn: '介绍多个人或多件东西。', example: 'These are books. Those are ducks.', note: '复数时主语和 be 动词都要变成复数。', tip: '介绍多个，用 These are / Those are。', parts: [{ text: 'These/Those', role: '主语复数' }, { text: 'are', role: 'be动词' }, { text: 'books', role: '表语' }], practice: { q: '介绍这些书，开头用 These are 还是 This is？', a: 'These are' } },
      { title: '确认单数', pattern: 'Is this/that ...?', cn: '确认一个人或一件东西是不是某物。', example: 'Is this a cow? Yes, it is.', note: '回答常用 it，不用 they。', tip: '一个东西，用 Is 来确认。', parts: [{ text: 'Is', role: 'be动词提前' }, { text: 'this/that', role: '主语' }, { text: 'a cow', role: '表语' }], practice: { q: 'Is this a cow? 肯定回答常用 it 还是 they？', a: 'it' } },
      { title: '确认复数', pattern: 'Are these/those ...?', cn: '确认这些或那些人、物是不是某类东西。', example: 'Are those chickens? No, they aren\'t.', note: '回答常用 they，不用 it。', tip: '多个东西，用 Are 来确认。', parts: [{ text: 'Are', role: 'be动词提前' }, { text: 'these/those', role: '主语复数' }, { text: 'carrots', role: '表语' }], practice: { q: 'Are those ducks? 肯定回答常用 they 还是 it？', a: 'they' } },
      { title: '询问位置', pattern: 'Where is ...? / Where are ...?', cn: '询问人或物在哪里。', example: 'Where is the duck? It is behind the tree.', note: '回答位置常用 in / on / under / behind / by。', tip: '问位置用 where，回答常带介词。', parts: [{ text: 'Where', role: '疑问词' }, { text: 'is', role: 'be动词' }, { text: 'the duck', role: '主语' }], practice: { q: 'Where is the duck? 可以用 behind the tree 回答吗？', a: '可以' } },
      { title: 'There be 句型', pattern: 'There is ... / There are ...', cn: '表示某地有某人或某物。', example: 'There is a library in our school. There are many books in it.', note: '看 there be 后面最近的名词决定用 is 还是 are。', tip: '说某地“有”，常用 There be。', parts: [{ text: 'There', role: '引导词' }, { text: 'is/are', role: 'be动词' }, { text: 'a book / books', role: '真正主语' }], practice: { q: 'There ___ a book on the desk. 填 is 还是 are？', a: 'is' } },
      { title: '询问颜色', pattern: 'What colour is ...?', cn: '询问某个东西是什么颜色。', example: 'What colour is that? It is blue.', note: '回答时常直接说颜色，也可以说 It is + 颜色。', tip: '问颜色要带 colour，不是单说 what。', parts: [{ text: 'What colour', role: '疑问短语' }, { text: 'is', role: 'be动词' }, { text: 'the balloon', role: '主语' }], practice: { q: 'What colour is the balloon? 回答里先说颜色还是位置？', a: '颜色' } },
      { title: '询问时间与星期', pattern: 'What time is it? / What day is it today?', cn: '询问几点了，或今天星期几。', example: 'What time is it? It is seven. What day is it today? It is Friday.', note: 'time 问几点，day 问星期几；两者不要混。', tip: 'time 看钟表，day 看星期。', practice: { q: 'What day is it today? 是问几点还是星期几？', a: '星期几' } },
      { title: '询问天气', pattern: 'What\'s the weather like?', cn: '询问天气情况。', example: 'What\'s the weather like today? It is sunny and warm.', note: '回答天气常用 It is ...，后面接 sunny / rainy / windy 等词。', tip: '天气用 It is，说今天冷暖晴雨。', parts: [{ text: 'What\'s', role: 'What is' }, { text: 'the weather', role: '主语' }, { text: 'like', role: '询问状态' }], practice: { q: 'What\'s the weather like today? 回答常用 It is ... 还是 I am ...？', a: 'It is' } },
      { title: 'How many 句型', pattern: 'How many ... are there?', cn: '询问有多少个可数的人或物。', example: 'How many books are there on the desk?', note: 'how many 后面接可数名词复数。', tip: '问多少，how many 后面名词要复数。', practice: { q: 'How many apple 还是 How many apples？', a: 'How many apples' } }
    ]
  },
  {
    title: '9 功能表达与计划',
    icon: '🤝',
    desc: '把喜好、拥有、能力、请求、职业和计划这些高频表达放在一起，方便和课文口语对照复习。',
    rules: [
      { title: '表达喜好', pattern: 'I like ... / Do you like ...?', cn: '表达自己喜欢什么，或询问别人喜不喜欢。', example: 'I like grapes. Do you like bananas?', note: '回答 Do you like ...? 常用 Yes, I do. / No, I don\'t。', tip: '说喜欢用 like，先说自己，再去问别人。', parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'grapes', role: '宾语' }], practice: { q: 'Do you like bananas? 肯定回答是 Yes, I do. 还是 Yes, I like.？', a: 'Yes, I do.' } },
      { title: 'like + doing', pattern: 'like + verb-ing', cn: '表示喜欢做某事，常用于说爱好和习惯。', example: 'I like reading. She likes swimming.', note: '说爱好时，like 后常接动词 ing 形式。', tip: '爱好常跟 doing，不直接跟动词原形。', parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'reading', role: '动名词' }], practice: { q: 'I like play football. 还是 I like playing football.？', a: 'I like playing football.' } },
      { title: '表达拥有', pattern: 'I have ... / Do you have ...?', cn: '表达自己有某物，或询问别人有没有。', example: 'I have a mango. Do you have a banana?', note: '回答 Do you have ...? 时，仍用 do / don\'t 来回答。', tip: '说“有”用 have，提问先借 do。', parts: [{ text: 'Do', role: '助动词' }, { text: 'you', role: '主语' }, { text: 'have', role: '动词原形' }, { text: 'a banana', role: '宾语' }], practice: { q: 'Do you have a ruler? 否定回答怎么开头？', a: 'No, I don\'t.' } },
      { title: '表达能力', pattern: 'Can you ...?', cn: '询问别人会不会做某事。', example: 'Can you swim? Yes, I can.', note: 'can 后面接动词原形。', tip: '会不会，用 can 问；回答里也要把 can 带上。', parts: [{ text: 'Can', role: '情态动词' }, { text: 'you', role: '主语' }, { text: 'swim', role: '动词原形' }], practice: { q: 'Can you swim? 回答要用 can 还是 do？', a: 'can' } },
      { title: '礼貌请求', pattern: 'Can I ...? / May I ...?', cn: '请求允许自己去做某事，或请求拿到某物。', example: 'Can I join you? May I have the menu?', note: '想得到允许时常用 Can I / May I。', tip: '我可不可以，用 Can I / May I。', parts: [{ text: 'Can/May', role: '请求许可' }, { text: 'I', role: '主语' }, { text: 'join', role: '动词原形' }], practice: { q: '想加入游戏，用 Can you join? 还是 Can I join?？', a: 'Can I join?' } },
      { title: '礼貌邀请与提供', pattern: 'Would you like ...?', cn: '礼貌地邀请别人要不要某物，或要不要一起做某事。', example: 'Would you like a sweet?', note: '这是“想不想要”的意思，不是长期喜好。', tip: 'Would you like 更礼貌，常用在邀请和提供。', parts: [{ text: 'Would', role: '语气更委婉' }, { text: 'you', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'a sweet', role: '宾语' }], practice: { q: 'Would you like a sweet? 这是问能力、喜好，还是想不想要？', a: '想不想要' } },
      { title: '提出建议与要求', pattern: 'Let\'s ... / Please ... / Don\'t ...', cn: '表示一起做、礼貌请求或禁止某事。', example: 'Let\'s clean the classroom. Please sit down. Don\'t run.', note: '祈使句常省主语，直接用动词原形开头。', tip: 'Let\'s 一起做，Please 更礼貌，Don\'t 表禁止。', practice: { q: '表示一起去动物园，开头用 Let\'s 还是 Don\'t？', a: 'Let\'s' } },
      { title: '询问课程喜好', pattern: 'What subjects do you like?', cn: '询问别人喜欢什么课程。', example: 'What subjects do you like? I like English and Science.', note: 'subjects 常用复数，因为通常不止一门课。', tip: '问课程喜好，先说 What subjects do you like?。', practice: { q: 'What subjects do you like? 回答常用 I like ... 还是 I am ...？', a: 'I like ...' } },
      { title: '询问职业', pattern: 'What does ... do?', cn: '询问某人是做什么工作的。', example: 'What does your father do? He is a doctor.', note: '回答常用 He / She is a ...。', tip: '问职业，does 带头；回答常说 is a ...。', parts: [{ text: 'What', role: '疑问词' }, { text: 'does', role: '助动词' }, { text: 'your father', role: '主语' }, { text: 'do', role: '动词原形' }], practice: { q: 'What does your mother do? 是问职业还是问她正在做什么？', a: '职业' } },
      { title: '表达理想职业', pattern: 'I want to be a ...', cn: '表达自己将来想成为什么。', example: 'I want to be a scientist.', note: 'be 后面接职业、身份或状态名词。', tip: '理想职业常用 want to be。', parts: [{ text: 'I', role: '主语' }, { text: 'want to be', role: '愿望表达' }, { text: 'a scientist', role: '理想身份' }], practice: { q: 'I want to be a teacher. 里面 be 后面接职业还是动作？', a: '职业' } },
      { title: 'want to + do', pattern: 'want to + verb', cn: '表示想要去做某事。', example: 'I want to visit the zoo.', note: 'want to 后接动词原形。', tip: 'want to 后面别加 ing，直接放动词原形。', parts: [{ text: 'want to', role: '想要' }, { text: 'visit', role: '动词原形' }, { text: 'the zoo', role: '宾语' }], practice: { q: 'I want to visit the zoo. want to 后面接 visit 还是 visiting？', a: 'visit' } },
      { title: 'be going to + do', pattern: 'be going to + verb', cn: '表示计划、打算去做某事。', example: 'We are going to have a picnic.', note: 'be 要随主语变化，后面的动词用原形。', tip: '已经打算好的计划，常用 be going to。', parts: [{ text: 'We', role: '主语' }, { text: 'are going to', role: '计划表达' }, { text: 'have', role: '动词原形' }, { text: 'a picnic', role: '宾语' }], practice: { q: 'We are going to play. play 前面要不要再加 to？', a: '不要' } },
      { title: '常见递接表达', pattern: 'Here you are. / What about you?', cn: '递东西给别人时，或把话题转回给别人时常用。', example: 'Here you are. Thank you. I like grapes. What about you?', note: 'Here you are 常在递东西时说；What about you 常在对话中继续追问对方。', tip: '递给别人说 Here you are，回问别人说 What about you。', practice: { q: '把苹果递给别人时说什么？', a: 'Here you are.' } },
      { title: '询问未来计划', pattern: 'What are your plans ...?', cn: '询问别人未来某段时间的计划安排。', example: 'What are your plans for the summer?', note: '回答常接 be going to ... 或 I will ...。', tip: '问计划用 plans，回答常说准备做什么。', practice: { q: 'What are your plans for the summer? 这是问计划还是问颜色？', a: '计划' } }
    ]
  },
  {
    title: '10 主题补充句型',
    icon: '🧭',
    desc: '把课程、时间、季节、穿着、归属和选择这些常见场景句型单独补齐，方便按主题复习。',
    rules: [
      { title: '询问最喜欢的事物', pattern: 'What is your favourite ...?', cn: '询问别人最喜欢的人、物、季节、颜色等。', example: 'What is your favourite season? My favourite season is spring.', note: '回答时常用 My favourite ... is ... 或 I like ... best。', tip: '最喜欢常用 favourite，回答别漏掉 is。', practice: { q: 'What is your favourite season? 是问喜好还是问位置？', a: '喜好' } },
      { title: '到时间了', pattern: 'It\'s time for ... / It\'s time to ...', cn: '表示到了该做某事的时候。', example: 'It\'s time for class. It\'s time to go home.', note: 'for 后面常接名词；to 后面常接动词原形。', tip: 'for 接事情名词，to 接动作原形。', parts: [{ text: 'It\'s time', role: '固定结构' }, { text: 'for class', role: 'for + 名词' }, { text: 'to go home', role: 'to + 动词原形' }], practice: { q: 'It\'s time ___ bed. 填 for 还是 to？', a: 'for' } },
      { title: '询问课程安排', pattern: 'We have ...', cn: '表示某天或某节课有某门课程。', example: 'We have PE this afternoon.', note: 'have 在这里表示“上……课”，不是“拥有”的意思。', tip: '课程安排里的 have，常译成“有……课”。', practice: { q: 'We have Music on Friday. 这里 have 是“拥有”还是“上课安排”？', a: '上课安排' } },
      { title: '擅长某事', pattern: 'be good at ...', cn: '表示在某方面做得好、擅长某事。', example: 'I am good at Art. She is good at singing.', note: 'at 后面常接名词或动词 ing 形式。', tip: 'good at 后面别直接接动词原形。', practice: { q: 'He is good at swim. 还是 He is good at swimming.？', a: 'He is good at swimming.' } },
      { title: '询问穿着', pattern: 'What do you wear ...?', cn: '询问在某种天气或季节穿什么。', example: 'What do you wear in winter? I wear a coat and gloves.', note: 'wear 后接衣物名称，问的时候常搭配 in winter / on rainy days。', tip: '问穿什么常用 wear，不是 put。', practice: { q: 'What do you wear in winter? 回答里适合说 wear 还是 like？', a: 'wear' } },
      { title: '询问归属', pattern: 'Whose ... is this?', cn: '询问某个东西是谁的。', example: 'Whose shirt is this? It is my father\'s.', note: '回答常用 It is ...\'s 或 It is mine / his / hers。', tip: '问“谁的”用 whose，不是 who。', practice: { q: 'Whose cap is this? 是问“谁”还是问“谁的”？', a: '谁的' } },
      { title: '询问选择', pattern: 'Which one do you want?', cn: '在几个选项中询问别人想要哪一个。', example: 'Which one do you want? I want the blue one.', note: 'which one 常用于有明确选项时，不是开放式提问。', tip: '有几个选项时用 which one，更像“选哪个”。', practice: { q: 'Which one do you want? 回答时常说 the blue one 还是 blue？', a: 'the blue one' } },
      { title: '相同与不同', pattern: 'same / different', cn: '表示相同或不同。', example: 'We have the same hobby. Our bags are different.', note: 'same 前常带 the；different 后面常接名词复数或 from。', tip: 'same 前面常有 the，different 常用来做比较。', practice: { q: 'We have ___ same hobby. 填 the 还是 a？', a: 'the' } }
    ]
  },
  {
    title: '11 程度、比较与原因',
    icon: '📈',
    desc: '把比较级、最高级、感叹、原因说明这些更容易在四五年级混淆的规则集中整理。',
    rules: [
      { title: 'Why ...? Because ...', pattern: 'Why ...? Because ...', cn: '询问原因并作出解释。', example: 'Why do you wear sunglasses? Because it is sunny.', note: 'Why 开头提问；回答常用 Because 开头。', tip: '问原因说 why，答原因说 because。', parts: [{ text: 'Why', role: '疑问词' }, { text: 'do you wear sunglasses', role: '问题主体' }, { text: 'Because it is sunny', role: '原因回答' }], practice: { q: 'Why are you happy? 回答时常用 Because 还是 Where？', a: 'Because' } },
      { title: '形容词比较级', pattern: 'bigger / smaller / happier / more beautiful', cn: '表示两者之间进行比较。', example: 'This bag is bigger than that one.', note: '多数短词加 -er；较长的词前加 more；比较对象前常用 than。', tip: '两者比较看比较级，常常后面跟 than。', practice: { q: 'big 的比较级是 bigger 还是 biggest？', a: 'bigger' } },
      { title: '形容词最高级', pattern: 'biggest / smallest / happiest / most beautiful', cn: '表示三个或三个以上中最……。', example: 'This is the biggest animal in the zoo.', note: '最高级前常用 the；多数短词加 -est，较长的词前加 most。', tip: '三者以上比最高，前面常带 the。', practice: { q: 'the tallest 是比较两个人还是三个以上中最高？', a: '三个以上中最高' } },
      { title: 'How + 形容词!', pattern: 'How + adjective!', cn: '表示强烈感叹。', example: 'How beautiful! How cute!', note: '这是感叹句，后面强调的是“多么……”。', tip: 'How 后面接形容词，感叹感觉更强。', practice: { q: 'How beautiful! 这是陈述句还是感叹句？', a: '感叹句' } },
      { title: 'It is so + 形容词', pattern: 'It is so + adjective.', cn: '表示“它太……了”或“它很……”。', example: 'It is so big. It is so cute.', note: 'so 用来加强形容词程度。', tip: '想强调程度时，so 很常用。', practice: { q: 'It is so big. 这里 so 是加强程度还是表示时间？', a: '加强程度' } },
      { title: 'A or B', pattern: 'A or B', cn: '在两个选项中进行选择。', example: 'Do you need a big bag or a small bag?', note: 'or 表示“或者”；常用于让对方二选一。', tip: '有两个选择时，用 or 把它们连起来。', practice: { q: 'big bag ___ small bag. 填 and 还是 or？', a: 'or' } }
    ]
  }
];
