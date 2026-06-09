const appState = {
  activeUnit: 0,
  quiz: {},
  voiceEnabled: true,
  repeatMode: false,
  speechRate: 0.72,
  englishVoice: null,
  chineseVoice: null,
  playbackToken: 0,
  audioPlayer: new Audio(),
  missingAudio: new Set(),
  useLocalAudio: false, // 默认关闭本地音频，优先使用 TTS
};

const navBar = document.getElementById('navBar');
const app = document.getElementById('app');
const voiceToggle = document.getElementById('voiceToggle');
const repeatToggle = document.getElementById('repeatToggle');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const voiceStatus = document.getElementById('voiceStatus');

function normalizeKey(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

const unitThemeLibrary = {
  greeting: {
    goals: ['会用 Hello / Good morning / Goodbye 打招呼和告别。', '会用 I am ... 介绍自己。', '能和同伴完成见面问候小对话。'],
    qa: [
      { q: 'Good morning, Miss Li.', a: 'Good morning, class.', tip: '先问好，再认真听老师怎么回应。' },
      { q: 'Hello! I am Ben.', a: 'Hi! I am Amy.', tip: '见面时先说 Hello / Hi，再介绍名字。' },
    ],
    reading: {
      title: 'At the school gate',
      lines: [
        { en: 'Hello! I am Ben.', cn: '你好！我是本。' },
        { en: 'Good morning, Miss Li.', cn: '李老师，早上好。' },
        { en: 'This is my new friend.', cn: '这是我的新朋友。' },
        { en: 'Goodbye! See you tomorrow.', cn: '再见！明天见。' },
      ],
      questions: ['Who says good morning?', 'Who is the new friend?', 'What do they say at the end?'],
      support: ['Hello! I am ...', 'Good morning, ...', 'Goodbye! See you.'],
    },
    output: ['先问好，再介绍自己的名字。', '和同伴轮流做 A、B 两个角色。', '最后用 Goodbye 或 See you 结束对话。'],
  },
  names: {
    goals: ['会问别人叫什么名字。', '会用 My name is ... 回答。', '会用 Yes / No 回应确认问题。'],
    qa: [
      { q: 'What is your name?', a: 'My name is Lucy.', tip: '先问名字，再完整回答。' },
      { q: 'Are you a new classmate?', a: 'Yes, I am.', tip: '一般疑问句先用 Yes / No 开头。' },
    ],
    reading: {
      title: 'A new classmate',
      lines: [
        { en: 'A girl comes into the classroom.', cn: '一个女孩走进了教室。' },
        { en: 'What is your name? asks Liu Tao.', cn: '“你叫什么名字？”刘涛问。' },
        { en: 'My name is Anna, says the girl.', cn: '“我叫安娜。”女孩说。' },
        { en: 'Now they are good classmates.', cn: '现在他们是好同学了。' },
      ],
      questions: ['Where does the girl come?', 'Who asks the question?', 'What is the girl\'s name?'],
      support: ['What is your name?', 'My name is ...', 'Are you ...?'],
    },
    output: ['问 1 位同学的名字并认真听回答。', '把自己的名字完整说出来。', '再加一句 Are you ...? 做确认练习。'],
  },
  identity: {
    goals: ['会用 Are you ...? 确认对方身份。', '会用 Yes, I am. / No, I am not. 做完整回答。', '能围绕 twins、sister、brother 说清楚谁是谁。'],
    qa: [
      { q: 'Are you Su Hai?', a: 'No, I am not. I am Su Yang.', tip: '先回答是不是，再说自己是谁。' },
      { q: 'Are you twins?', a: 'Yes, we are.', tip: '问两个人时，回答里要注意用 we are。' },
      { q: 'You are right.', a: 'Thank you.', tip: '别人确认正确时，可以自然回应。' },
    ],
    reading: {
      title: 'The twin sisters',
      lines: [
        { en: 'Mike sees two girls at school.', cn: '迈克在学校里看见两个女孩。' },
        { en: 'He asks, "Are you Su Hai?"', cn: '他问：“你是苏海吗？”' },
        { en: '"No, I am not. I am Su Yang," says the girl.', cn: '那个女孩说：“不，我不是。我是苏阳。”' },
        { en: '"Oh, you are twins. I am right!" says Mike.', cn: '迈克说：“哦，你们是双胞胎。我说对了！”' },
      ],
      questions: ['Who does Mike see at school?', 'Who is Su Yang?', 'What does Mike learn at the end?'],
      support: ['Are you ...?', 'No, I am not.', 'You are right.'],
    },
    output: ['和同伴练习 1 轮“认错人”对话。', '至少说出 1 组身份信息，如 sister / brother / twin。', '最后用 You are right. 或 Sorry. 结束对话。'],
  },
  friends: {
    goals: ['会介绍朋友是谁。', '会说朋友的特点或爱好。', '能围绕“朋友”连续说 3 句话。'],
    qa: [
      { q: 'Who is he?', a: 'He is my friend, Tom.', tip: '介绍男生可以用 He is ...' },
      { q: 'What is your hobby?', a: 'I like drawing.', tip: '介绍爱好时常用 I like ...ing.' },
      { q: 'Can I join you?', a: 'Sure. Let us play together.', tip: '先答应，再邀请一起玩。' },
    ],
    reading: {
      title: 'My good friend',
      lines: [
        { en: 'This is my friend, Amy.', cn: '这是我的朋友艾米。' },
        { en: 'She is kind and helpful.', cn: '她很友好，也乐于助人。' },
        { en: 'We like drawing together.', cn: '我们喜欢一起画画。' },
        { en: 'We are happy at school.', cn: '我们在学校很开心。' },
      ],
      questions: ['Who is Amy?', 'What is Amy like?', 'What do they like doing together?'],
      support: ['This is my friend ...', 'He / She is ...', 'We like ... together.'],
    },
    output: ['介绍 1 位朋友的名字。', '补充 1 个特点或爱好。', '最后说你们会一起做什么。'],
  },
  family: {
    goals: ['会介绍家人身份。', '会听懂 Who is he / she? 这类问题。', '会围绕家庭照片做简单介绍。'],
    qa: [
      { q: 'Who is she?', a: 'She is my mother.', tip: '介绍女性家人时用 She is ...' },
      { q: 'Is he your grandpa?', a: 'Yes, he is.', tip: '确认身份时先听清 he 还是 she。' },
      { q: 'Who is he?', a: 'He is my father.', tip: '介绍男性家人时用 He is ...' },
    ],
    reading: {
      title: 'My family photo',
      lines: [
        { en: 'This is my family photo.', cn: '这是我的全家福。' },
        { en: 'She is my mother and he is my father.', cn: '她是我的妈妈，他是我的爸爸。' },
        { en: 'My grandpa is kind and my grandma is nice.', cn: '我的爷爷很和善，我的奶奶很亲切。' },
        { en: 'I love my family very much.', cn: '我非常爱我的家人。' },
      ],
      questions: ['What is in the picture?', 'Who is kind?', 'Who does the child love?'],
      support: ['This is my ...', 'He / She is ...', 'I love my family.'],
    },
    output: ['拿一张家庭照片，介绍 2 位家人。', '至少说出 1 个家人特点。', '最后说一句 I love my family.'],
  },
  birthday: {
    goals: ['会说生日祝福语。', '会表达想要什么或得到什么礼物。', '能围绕生日场景说 3 句话。'],
    qa: [
      { q: 'Happy Birthday!', a: 'Thank you!', tip: '听到祝福要及时回应 Thank you.' },
      { q: 'Would you like some cake?', a: 'Yes, please.', tip: '礼貌接受时用 Yes, please.' },
      { q: 'How old are you?', a: 'I am eight.', tip: '说年龄时用 I am ...' },
    ],
    reading: {
      title: 'Birthday time',
      lines: [
        { en: 'Today is my birthday.', cn: '今天是我的生日。' },
        { en: 'My friends sing Happy Birthday to me.', cn: '我的朋友们给我唱生日歌。' },
        { en: 'We eat cake and open gifts.', cn: '我们吃蛋糕，还拆礼物。' },
        { en: 'It is a happy day.', cn: '这是快乐的一天。' },
      ],
      questions: ['What day is it today?', 'What do the friends sing?', 'What do they eat?'],
      support: ['Happy Birthday!', 'Thank you!', 'I am ... years old.'],
    },
    output: ['说出一句生日祝福。', '说出生日会上会做的两件事。', '如果是自己的生日，再说想要什么礼物。'],
  },
  helping: {
    goals: ['会主动提出帮助。', '会请求别人帮助自己。', '能说出在学校或家里能帮忙做什么。'],
    qa: [
      { q: 'Can I help you?', a: 'Yes, please. Help me carry the books.', tip: '先主动询问，再具体说明要帮什么。' },
      { q: 'Can you help me?', a: 'Sure.', tip: '听到请求后先简短答应。' },
      { q: 'What can you do?', a: 'I can clean the desks.', tip: 'I can ... 用来表达能做什么。' },
    ],
    reading: {
      title: 'Helping at school',
      lines: [
        { en: 'The classroom is busy this afternoon.', cn: '今天下午教室里很忙。' },
        { en: 'Ben carries the books for the teacher.', cn: '本帮老师搬书。' },
        { en: 'Ann waters the plants and cleans the desks.', cn: '安给植物浇水，还擦了课桌。' },
        { en: 'Helping others makes everyone happy.', cn: '帮助别人让大家都开心。' },
      ],
      questions: ['Who carries the books?', 'What does Ann do?', 'How do they feel?'],
      support: ['Can I help you?', 'Please help me ...', 'I can ...'],
    },
    output: ['说 2 件你能帮忙做的事。', '和同伴练习 Can I help you? / Thank you. 对话。', '如果是在家里，再补 1 件家务。'],
  },
  school: {
    goals: ['会说喜欢的学科。', '会听懂课程安排。', '能围绕学校生活说 3 句话。'],
    qa: [
      { q: 'What subjects do you like?', a: 'I like English and Science.', tip: '回答时可以一次说两个科目。' },
      { q: 'Do you like Maths?', a: 'Yes, I do.', tip: '一般疑问句先 Yes / No，再说完整句。' },
      { q: 'What do you have this afternoon?', a: 'We have Music this afternoon.', tip: '注意 have 表示“有课”。' },
    ],
    reading: {
      title: 'A school day',
      lines: [
        { en: 'We are back at school today.', cn: '今天我们回到学校了。' },
        { en: 'I like English because it is interesting.', cn: '我喜欢英语，因为它很有趣。' },
        { en: 'We have PE on the sports ground.', cn: '我们在操场上体育课。' },
        { en: 'School life is fun.', cn: '学校生活很有趣。' },
      ],
      questions: ['Why does the child like English?', 'Where do they have PE?', 'How is school life?'],
      support: ['I like ...', 'We have ...', 'It is interesting.'],
    },
    output: ['说出你最喜欢的 2 门课。', '补充 1 个喜欢它们的原因。', '最后说今天或下午有什么课。'],
  },
  day: {
    goals: ['会说一天中的主要活动。', '会用 at + 时间表达整点。', '能介绍自己的作息。'],
    qa: [
      { q: 'When do you get up?', a: 'I get up at seven.', tip: '时间前常用 at。' },
      { q: 'What time is it?', a: 'It is seven o\'clock.', tip: '整点表达常用 o\'clock。' },
      { q: 'When do you go to bed?', a: 'I go to bed at nine.', tip: '作息表达要把动作和时间连起来。' },
    ],
    reading: {
      title: 'My day',
      lines: [
        { en: 'I get up at seven every day.', cn: '我每天七点起床。' },
        { en: 'I have breakfast and go to school.', cn: '我吃早餐，然后去上学。' },
        { en: 'I have dinner with my family in the evening.', cn: '晚上我和家人一起吃晚饭。' },
        { en: 'I go to bed early at night.', cn: '夜里我很早睡觉。' },
      ],
      questions: ['When does the child get up?', 'What does the child do in the evening?', 'When does the child go to bed?'],
      support: ['I get up at ...', 'I have ... at ...', 'I go to bed at ...'],
    },
    output: ['按“起床-上学-睡觉”说 3 句话。', '至少说出 2 个具体时间。', '高年级可再补一句 evening 活动。'],
  },
  week: {
    goals: ['会认读星期名称。', '会说某一天做什么。', '能介绍一周中的学习或活动安排。'],
    qa: [
      { q: 'What day is it today?', a: 'It is Wednesday.', tip: '问星期几用 What day ...' },
      { q: 'What do you do on Saturday?', a: 'I play football on Saturday.', tip: '星期前常用 on。' },
      { q: 'Do you go to the cinema on Sunday?', a: 'Yes, I do.', tip: '先听清星期，再回答 Yes / No。' },
    ],
    reading: {
      title: 'My week',
      lines: [
        { en: 'Monday and Tuesday are busy school days.', cn: '星期一和星期二是忙碌的上学日。' },
        { en: 'I play games with my friends on Friday.', cn: '周五我和朋友一起玩游戏。' },
        { en: 'On Saturday, I go to the cinema with my family.', cn: '周六我和家人去看电影。' },
        { en: 'Every day in my week is fun.', cn: '我一周中的每一天都很有趣。' },
      ],
      questions: ['Which days are busy?', 'What does the child do on Friday?', 'Who goes to the cinema on Saturday?'],
      support: ['On Monday, ...', 'On Saturday, ...', 'Every day ...'],
    },
    output: ['说出 2 个星期名称。', '补充这两天各做什么。', '最后说一句 Every day in my week is fun.'],
  },
  sport: {
    goals: ['会用 Can you ...? 询问能力。', '会表达会或不会做某项运动。', '会用鼓励语让同伴尝试。'],
    qa: [
      { q: 'Can you play basketball?', a: 'Yes, I can.', tip: '会做就用 Yes, I can. 回答。' },
      { q: 'Can you swim?', a: 'No, I cannot.', tip: '不会做要完整说 No, I cannot.' },
      { q: 'It is hard.', a: 'Have a go!', tip: '当别人觉得难时，可以鼓励他再试试。' },
    ],
    reading: {
      title: 'At the sports ground',
      lines: [
        { en: 'Mike can play football very well.', cn: '迈克足球踢得很好。' },
        { en: 'Su Yang cannot play table tennis at first.', cn: '苏洋一开始不会打乒乓球。' },
        { en: 'Her friend says, Have a go!', cn: '她的朋友说：“试一试！”' },
        { en: 'Now they can play together.', cn: '现在他们可以一起玩了。' },
      ],
      questions: ['Who can play football well?', 'What cannot Su Yang do at first?', 'What does her friend say?'],
      support: ['Can you ...?', 'Yes, I can.', 'No, I cannot.'],
    },
    output: ['说出 2 项你会或不会的运动。', '练习一次 Can you ...? 问答。', '最后用 Have a go! 鼓励同伴。'],
  },
  body: {
    goals: ['会认读身体部位。', '会描述人的外形特点。', '能比较两个人或两个玩具的不同。'],
    qa: [
      { q: 'What is this?', a: 'It is my arm.', tip: '指着身体部位说 It is my ...' },
      { q: 'Is his robot tall?', a: 'Yes, it is.', tip: '描述玩具或人物特点时可用 tall / short。' },
      { q: 'Are they the same?', a: 'No, they are different.', tip: 'same 和 different 常常放在一起比较。' },
    ],
    reading: {
      title: 'My robot and I',
      lines: [
        { en: 'My robot has big eyes and long arms.', cn: '我的机器人有大眼睛和长手臂。' },
        { en: 'Its legs are short, but it is strong.', cn: '它的腿很短，但它很结实。' },
        { en: 'My doll is small and beautiful.', cn: '我的玩具娃娃小巧又漂亮。' },
        { en: 'They are different, but I like them both.', cn: '它们不一样，但我都喜欢。' },
      ],
      questions: ['What does the robot have?', 'How are its legs?', 'Which toy is small and beautiful?'],
      support: ['It has ...', 'It is ...', 'They are different.'],
    },
    output: ['介绍 2 个身体部位。', '用 big / small / tall / short 描述 1 个玩具。', '最后说它和另一个玩具是 same 还是 different。'],
  },
  weather: {
    goals: ['会说常见天气。', '会根据天气说活动或感受。', '能听懂并回答天气问句。'],
    qa: [
      { q: 'What is the weather like today?', a: 'It is sunny today.', tip: '天气回答常用 It is ...' },
      { q: 'Is it rainy now?', a: 'No, it is windy.', tip: '先听清是哪种天气。' },
      { q: 'Can we fly a kite?', a: 'Yes, it is windy.', tip: '天气和活动可以连起来说。' },
    ],
    reading: {
      title: 'Today\'s weather',
      lines: [
        { en: 'It is cloudy in the morning.', cn: '早上多云。' },
        { en: 'Then it is windy and cool.', cn: '后来刮风了，也很凉快。' },
        { en: 'We can fly a kite in the park.', cn: '我们可以在公园放风筝。' },
        { en: 'The weather is nice for play.', cn: '这样的天气很适合玩耍。' },
      ],
      questions: ['How is the weather in the morning?', 'What can they do in the park?', 'Is the weather nice for play?'],
      support: ['It is ...', 'We can ...', 'The weather is ...'],
    },
    output: ['说出今天的天气。', '补充 1 件这种天气下可以做的事。', '如果能比较，再说和昨天有什么不同。'],
  },
  seasons: {
    goals: ['会认读四季名称。', '会说每个季节的天气和活动。', '能表达自己最喜欢的季节。'],
    qa: [
      { q: 'Which season do you like?', a: 'I like spring best.', tip: '表达最喜欢常用 like ... best.' },
      { q: 'What can you do in summer?', a: 'I can swim in summer.', tip: '季节和活动要连起来说。' },
      { q: 'Is it cold in winter?', a: 'Yes, it is.', tip: '季节问答常结合 cold / hot / warm。' },
    ],
    reading: {
      title: 'Four seasons',
      lines: [
        { en: 'Spring is warm and green.', cn: '春天温暖而且绿意盎然。' },
        { en: 'Summer is hot, and we can swim.', cn: '夏天很热，我们可以游泳。' },
        { en: 'Autumn is cool, and the leaves are nice.', cn: '秋天凉爽，树叶很好看。' },
        { en: 'Winter is cold, but snow is fun.', cn: '冬天很冷，但雪很好玩。' },
      ],
      questions: ['Which season is warm and green?', 'What can we do in summer?', 'How is winter?'],
      support: ['I like ... best.', 'It is ... in ...', 'We can ...'],
    },
    output: ['说出你最喜欢的季节。', '用 2 个词描述它的天气。', '最后说 1 件你在这个季节里会做的事。'],
  },
  clothes: {
    goals: ['会认读常见服装。', '会问服装是谁的。', '能根据天气说穿什么。'],
    qa: [
      { q: 'Whose coat is this?', a: 'It is my coat.', tip: '问“谁的”常用 whose。' },
      { q: 'What do you wear in winter?', a: 'I wear a sweater and a coat.', tip: '季节和衣服要放在一起说。' },
      { q: 'Do you like this dress?', a: 'Yes, I do.', tip: '喜欢或不喜欢先用 Yes / No 回答。' },
    ],
    reading: {
      title: 'Getting dressed',
      lines: [
        { en: 'It is cold today.', cn: '今天天很冷。' },
        { en: 'I wear my sweater, trousers and coat.', cn: '我穿上毛衣、裤子和外套。' },
        { en: 'My sister wears a nice red dress.', cn: '我妹妹穿着一条漂亮的红裙子。' },
        { en: 'We are ready to go out now.', cn: '现在我们准备出门了。' },
      ],
      questions: ['How is the weather today?', 'What does the child wear?', 'What colour is the sister\'s dress?'],
      support: ['I wear ...', 'Whose ... is this?', 'It is my ...'],
    },
    output: ['介绍今天自己穿了什么。', '补充衣服的颜色。', '最后说为什么这样穿。'],
  },
  choices: {
    goals: ['会说自己想选什么。', '会在两个选项中做选择。', '会用 because 说出简单原因。'],
    qa: [
      { q: 'Which one do you want?', a: 'I want the blue one.', tip: '选择时常用 the ... one。' },
      { q: 'Do you need a big bag or a small bag?', a: 'I need a small bag.', tip: '听清两个选项，再选一个回答。' },
      { q: 'Why do you choose it?', a: 'Because it is right for me.', tip: '说原因时用 because 开头。' },
    ],
    reading: {
      title: 'A good choice',
      lines: [
        { en: 'Leo wants a schoolbag.', cn: '利奥想要一个书包。' },
        { en: 'He looks at a big one and a small one.', cn: '他看着一个大的和一个小的。' },
        { en: 'He chooses the small one because it is light.', cn: '他选择了小的那个，因为它更轻。' },
        { en: 'It is the right bag for school.', cn: '这正是适合上学的书包。' },
      ],
      questions: ['What does Leo want?', 'Which bag does he choose?', 'Why does he choose it?'],
      support: ['I want ...', 'I choose ...', 'Because ...'],
    },
    output: ['说出你想选什么。', '在两种选项中做出选择。', '最后用 because 说出原因。'],
  },
  fun: {
    goals: ['会邀请别人一起玩。', '会表达可以一起做什么。', '能围绕聚会或游戏场景说 3 句话。'],
    qa: [
      { q: 'Can I join you?', a: 'Sure.', tip: '当别人想加入时，先简短答应。' },
      { q: 'What can we do at the party?', a: 'We can sing and dance.', tip: '用 We can ... 说活动。' },
      { q: 'Are you ready?', a: 'Yes, I am.', tip: '准备好了吗，用 ready 回答。' },
    ],
    reading: {
      title: 'Party time',
      lines: [
        { en: 'Today we have a class party.', cn: '今天我们有班级聚会。' },
        { en: 'We play games and laugh together.', cn: '我们一起玩游戏，也一起大笑。' },
        { en: 'Some children sing and some children dance.', cn: '有的孩子唱歌，有的孩子跳舞。' },
        { en: 'It is great fun for everyone.', cn: '这对每个人来说都非常有趣。' },
      ],
      questions: ['What do they have today?', 'What do they do together?', 'Is it fun for everyone?'],
      support: ['Let us ...', 'We can ...', 'Can I join you?'],
    },
    output: ['说出聚会上可以做的 2 件事。', '邀请同伴一起参加。', '最后说一句 It is great fun.'],
  },
  restaurant: {
    goals: ['会礼貌点餐。', '会看菜单并说自己想吃什么。', '会在餐厅场景中完成简单对话。'],
    qa: [
      { q: 'What would you like?', a: 'I would like some noodles.', tip: '礼貌点餐常用 I would like ...' },
      { q: 'May I have the menu?', a: 'Sure.', tip: '要菜单时先用 May I have ...?' },
      { q: 'Can we have the bill, please?', a: 'OK.', tip: '用 please 让表达更礼貌。' },
    ],
    reading: {
      title: 'At the restaurant',
      lines: [
        { en: 'Jack and his mum are in a restaurant.', cn: '杰克和妈妈在餐馆里。' },
        { en: 'They look at the menu first.', cn: '他们先看菜单。' },
        { en: 'Jack would like rice and soup.', cn: '杰克想要米饭和汤。' },
        { en: 'After the meal, they ask for the bill.', cn: '吃完饭后，他们要了账单。' },
      ],
      questions: ['Where are Jack and his mum?', 'What would Jack like?', 'What do they ask for after the meal?'],
      support: ['May I have ...?', 'I would like ...', 'Anything else?'],
    },
    output: ['点 1 份主食和 1 种饮品。', '和同伴做服务员和顾客对话。', '最后用 please 要一次 bill。'],
  },
  jobs: {
    goals: ['会询问别人的职业。', '会说父母或自己的职业梦想。', '会围绕职业说 3 句话。'],
    qa: [
      { q: 'What does your father do?', a: 'He is a doctor.', tip: '问职业常用 What does ... do?' },
      { q: 'What does your mother do?', a: 'She is a teacher.', tip: '介绍女性职业时用 She is a ...' },
      { q: 'What do you want to be?', a: 'I want to be a firefighter.', tip: '表达梦想职业常用 want to be。' },
    ],
    reading: {
      title: 'My family jobs',
      lines: [
        { en: 'My father is a driver and my mother is a teacher.', cn: '我的爸爸是司机，妈妈是老师。' },
        { en: 'They work hard every day.', cn: '他们每天都很努力工作。' },
        { en: 'I want to be a doctor in the future.', cn: '将来我想成为一名医生。' },
        { en: 'I want to help many people.', cn: '我想帮助很多人。' },
      ],
      questions: ['What does the father do?', 'What does the mother do?', 'What does the child want to be?'],
      support: ['He is a ...', 'She is a ...', 'I want to be ...'],
    },
    output: ['介绍 1 位家人的职业。', '再说出自己的职业梦想。', '最后补一句你为什么想做这份工作。'],
  },
  chores: {
    goals: ['会说家务名称。', '会表达自己会做哪些家务。', '能围绕家庭分工说几句话。'],
    qa: [
      { q: 'What chores do you do at home?', a: 'I wash the dishes and sweep the floor.', tip: '家务可以一次说两件。' },
      { q: 'Can you clean your room?', a: 'Yes, I can.', tip: '表达会不会做家务也可以用 Can you ...?' },
      { q: 'Who cooks dinner?', a: 'My mum cooks dinner.', tip: '先说谁，再说做什么。' },
    ],
    reading: {
      title: 'Helping at home',
      lines: [
        { en: 'On Saturday, I help my parents at home.', cn: '周六我在家帮爸爸妈妈。' },
        { en: 'I sweep the floor and wash the dishes.', cn: '我扫地，也洗碗。' },
        { en: 'My father cooks and my mother cleans the table.', cn: '我爸爸做饭，我妈妈收拾桌子。' },
        { en: 'We finish the chores together.', cn: '我们一起完成家务。' },
      ],
      questions: ['When does the child help at home?', 'What chores does the child do?', 'Who cooks?'],
      support: ['I can ...', 'I help ...', 'We ... together.'],
    },
    output: ['说出 2 件你会做的家务。', '补充 1 位家人会做什么。', '最后说你们会不会一起完成家务。'],
  },
  plans: {
    goals: ['会表达将来的打算。', '会说假期想去哪里、做什么。', '能围绕暑假计划说 3-4 句话。'],
    qa: [
      { q: 'What are your plans for the summer?', a: 'I am going to visit a museum.', tip: '说计划时可用 be going to。' },
      { q: 'Are you going to the beach?', a: 'Yes, I am.', tip: '先听清地点，再回答。' },
      { q: 'What do you want to do there?', a: 'I want to swim and take photos.', tip: '地点和活动一起说更完整。' },
    ],
    reading: {
      title: 'Summer plans',
      lines: [
        { en: 'Summer holiday is coming soon.', cn: '暑假很快就要到了。' },
        { en: 'I am going to visit my grandparents first.', cn: '我打算先去看望爷爷奶奶。' },
        { en: 'Then I want to go to the beach with my family.', cn: '然后我想和家人去海边。' },
        { en: 'It will be a happy summer.', cn: '这将会是一个快乐的暑假。' },
      ],
      questions: ['What is coming soon?', 'Who is the child going to visit first?', 'Where does the child want to go then?'],
      support: ['I am going to ...', 'I want to ...', 'It will be ...'],
    },
    output: ['说出暑假里的 2 个计划。', '补充你要和谁一起去。', '最后说你觉得这个假期会怎样。'],
  },
  generic: {
    goals: ['会认读本单元核心词。', '会跟读重点句型。', '能围绕本单元主题说 2-3 句话。'],
    qa: [
      { q: 'What do you learn in this unit?', a: 'I learn new words and sentences.', tip: '先说 learn，再说具体内容。' },
      { q: 'Can you say a sentence?', a: 'Yes, I can.', tip: '用完整句回答会更自然。' },
    ],
    reading: {
      title: 'Today\'s English',
      lines: [
        { en: 'Today I learn new words.', cn: '今天我学了新单词。' },
        { en: 'I read the key sentences aloud.', cn: '我大声读重点句。' },
        { en: 'Then I answer a few small questions.', cn: '然后我回答几个小问题。' },
        { en: 'Now I can say more English.', cn: '现在我会说更多英语了。' },
      ],
      questions: ['What does the child learn?', 'What does the child do after reading?', 'What can the child do now?'],
      support: ['I learn ...', 'I can say ...', 'Then I ...'],
    },
    output: ['说出本单元学会的 2 个词。', '用 1 个词说一句完整句。', '最后说还要继续复习什么。'],
  },
};

function inferUnitThemeKey(unit) {
  const text = `${unit.title || ''} ${unit.subtitle || ''} ${(unit.words || []).map(item => item.en).join(' ')}`.toLowerCase();
  if (/hello|good morning|good afternoon|goodbye/.test(text)) return 'greeting';
  if (/name|new classmate/.test(text)) return 'names';
  if (/are you|twin|twins|you are right/.test(text)) return 'identity';
  if (/summer holiday|summer vacation|going to|plans for the summer|museum|beach|camp|visit/.test(text)) return 'plans';
  if (/grandpa|grandma|mother|father|mum|dad|uncle|aunt|family/.test(text)) return 'family';
  if (/birthday|cake|gift|candle/.test(text)) return 'birthday';
  if (/help|carry|clean|share|borrow|lend/.test(text)) return 'helping';
  if (/school subjects|subject|english|maths|science|music|pe|art|it|labour/.test(text)) return 'school';
  if (/my day|get up|breakfast|lunch|dinner|go to bed|o'clock/.test(text)) return 'day';
  if (/my week|monday|tuesday|wednesday|thursday|friday|saturday|sunday/.test(text)) return 'week';
  if (/sport|football|basketball|ping-pong|table tennis|swimming|play basketball/.test(text)) return 'sport';
  if (/body|hair|eye|ear|nose|mouth|arm|leg|robot|doll/.test(text)) return 'body';
  if (/weather|sunny|rainy|cloudy|windy|snowy/.test(text)) return 'weather';
  if (/season|spring|summer|autumn|winter/.test(text)) return 'seasons';
  if (/clothes|sweater|coat|dress|shirt|trousers|gloves|socks/.test(text)) return 'clothes';
  if (/choice|choose|want|need|because|the blue one|right for me/.test(text)) return 'choices';
  if (/fun|game|party|join|laugh|ready/.test(text)) return 'fun';
  if (/restaurant|menu|order|dish|soup|noodles|rice|bill|would like/.test(text)) return 'restaurant';
  if (/job|doctor|nurse|teacher|driver|cook|farmer|worker|police officer|firefighter/.test(text)) return 'jobs';
  if (/chores|dish|floor|broom|wash the dishes|sweep the floor|home/.test(text)) return 'chores';
  if (/friend|kind|helpful|hobby|classmate|this is my friend|we are friends/.test(text)) return 'friends';
  return 'generic';
}

function getUnitThemePack(unit) {
  return unitThemeLibrary[inferUnitThemeKey(unit)] || unitThemeLibrary.generic;
}

function uniqueTextItems(items, limit = Infinity) {
  const seen = new Set();
  const result = [];
  (items || []).forEach(item => {
    const key = normalizeKey(typeof item === 'string' ? item : item?.q || item?.en || item?.text || '');
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });
  return result.slice(0, limit);
}

function buildLearningGoals(unit) {
  const pack = getUnitThemePack(unit);
  const sentence = unit.sentences?.[0]?.en;
  const phrase = unit.phrases?.[0]?.en;
  return uniqueTextItems([
    ...(pack.goals || []),
    sentence ? `会完整说一句：${sentence}` : '',
    phrase ? `会把短语 ${phrase} 放进自己的句子里。` : '',
  ], 3);
}

function buildScenarioQA(unit) {
  const pack = getUnitThemePack(unit);
  const fromDialogue = [];
  (unit.dialogue || []).forEach((line, index, lines) => {
    const next = lines[index + 1];
    if (!line?.text || !next?.text || !/[?？]/.test(line.text)) return;
    fromDialogue.push({
      q: cleanText(line.text),
      a: cleanText(next.text),
      tip: '先听问题，再模仿答句完整回答。',
    });
  });
  return uniqueTextItems([...fromDialogue, ...(pack.qa || [])], 4);
}

function buildMiniReading(unit) {
  const pack = getUnitThemePack(unit);
  const reading = pack.reading || unitThemeLibrary.generic.reading;
  const phraseSupport = (unit.phrases || []).slice(0, 2).map(item => item.en).filter(Boolean);
  return {
    title: reading.title,
    lines: reading.lines || [],
    questions: uniqueTextItems(reading.questions || [], 3),
    support: uniqueTextItems([...(reading.support || []), ...phraseSupport], 5),
  };
}

function buildOutputTasks(unit) {
  const pack = getUnitThemePack(unit);
  return uniqueTextItems(pack.output || unitThemeLibrary.generic.output, 3);
}

function getSpeechLang(text) {
  return /[\u4e00-\u9fff]/.test(text || '') ? 'zh-CN' : 'en-US';
}

function getSpeechRate(text, preferredRate) {
  if (typeof preferredRate === 'number') return preferredRate;
  return getSpeechLang(text) === 'zh-CN'
    ? Math.min(1, appState.speechRate + 0.16)
    : appState.speechRate;
}

function getAudioHash(text) {
  let hash = 0;
  const source = String(text || '');
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 131 + source.charCodeAt(i)) % 2147483647;
  }
  return hash.toString(36);
}

function getAudioSlug(text) {
  const slug = String(text || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || 'clip';
}

function getLocalAudioPath(text) {
  const base = window.COURSE_AUDIO_BASE || 'audio/grade4/en';
  return `${base}/${getAudioSlug(text)}-${getAudioHash(text)}.mp3`;
}

function isEnglishAudioText(text) {
  return getSpeechLang(text) === 'en-US' && /[a-zA-Z]/.test(text || '');
}

function loadVoices() {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  appState.englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;
  appState.chineseVoice = voices.find(v => v.lang.toLowerCase().startsWith('zh')) || null;
  if (voiceStatus) {
    voiceStatus.textContent = appState.englishVoice ? '语音已就绪' : '系统语音';
  }
}

function stopPlayback() {
  appState.playbackToken++;
  appState.audioPlayer.pause();
  appState.audioPlayer.currentTime = 0;
  appState.audioPlayer.onended = null;
  appState.audioPlayer.onerror = null;
  appState.audioPlayer.src = '';
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function clearSpeaking(target) {
  if (target) {
    target.classList.remove('speaking');
    const sound = target.querySelector('.sound');
    if (sound) sound.textContent = '🔊';
    return;
  }
  document.querySelectorAll('.speaking').forEach(el => {
    el.classList.remove('speaking');
    const sound = el.querySelector('.sound');
    if (sound) sound.textContent = '🔊';
  });
}

function tryPlayLocalAudio(text, options, callback, fallback) {
  if (!appState.useLocalAudio) return false;
  if (!isEnglishAudioText(text)) return false;

  const src = getLocalAudioPath(text);
  if (appState.missingAudio.has(src)) return false;

  let handled = false;
  let timeoutId = null;
  const finish = action => {
    if (handled) return;
    handled = true;
    if (timeoutId) clearTimeout(timeoutId);
    appState.audioPlayer.onended = null;
    appState.audioPlayer.onerror = null;
    action();
  };

  appState.audioPlayer.pause();
  appState.audioPlayer.currentTime = 0;
  appState.audioPlayer.src = src;
  appState.audioPlayer.playbackRate = Math.max(0.5, Math.min(1.18, getSpeechRate(text, options.rate)));
  appState.audioPlayer.onended = () => finish(() => callback && callback());
  appState.audioPlayer.onerror = () => finish(() => {
    appState.missingAudio.add(src);
    fallback();
  });

  timeoutId = setTimeout(() => {
    finish(() => {
      appState.missingAudio.add(src);
      fallback();
    });
  }, 2500);

  const playPromise = appState.audioPlayer.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => finish(() => {
      appState.missingAudio.add(src);
      fallback();
    }));
  }

  return true;
}

function playWithSpeech(text, options, callback) {
  if (!window.speechSynthesis) {
    if (callback) callback();
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  const lang = getSpeechLang(text);
  utter.lang = lang;
  utter.rate = getSpeechRate(text, options.rate);
  utter.pitch = typeof options.pitch === 'number' ? options.pitch : 1;
  utter.volume = 1;
  utter.voice = lang === 'zh-CN' ? appState.chineseVoice : appState.englishVoice;
  utter.onerror = () => callback && callback();
  utter.onend = () => callback && callback();
  window.speechSynthesis.speak(utter);
}

function speak(text, options = {}, callback) {
  if (!appState.voiceEnabled || !text) {
    if (callback) callback();
    return;
  }

  const fallback = () => playWithSpeech(text, options, callback);
  if (!tryPlayLocalAudio(text, options, callback, fallback)) {
    fallback();
  }
}

function speakSequence(items, callback) {
  const queue = (items || []).filter(item => item && item.text);
  if (!queue.length) {
    if (callback) callback();
    return;
  }

  stopPlayback();
  const token = appState.playbackToken;
  const playNext = index => {
    if (token !== appState.playbackToken) return;
    if (index >= queue.length) {
      if (callback) callback();
      return;
    }

    const item = queue[index];
    speak(item.text, { rate: item.rate }, () => {
      if (token !== appState.playbackToken) return;
      const delay = item.pauseAfterMs || 0;
      if (delay) {
        setTimeout(() => playNext(index + 1), delay);
      } else {
        playNext(index + 1);
      }
    });
  };
  playNext(0);
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

function renderPanel(icon, title, bodyHtml, open = false) {
  return `
    <section class="panel">
      <button class="panel-head ${open ? 'open' : ''}" type="button">
        <span>${icon}</span><span>${title}</span><span class="arrow">▼</span>
      </button>
      <div class="panel-body ${open ? 'open' : ''}">
        ${bodyHtml}
      </div>
    </section>`;
}

function renderWordCard(item) {
  return `
    <div class="word-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en)}" aria-label="听一听 ${htmlEscape(item.en)}" title="听一听">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="emoji">${item.emoji || '📘'}</div>
      <div class="en">${htmlEscape(item.en)}</div>
      <div class="ipa">${htmlEscape(item.ipa || '')}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderSentenceCard(item) {
  return `
    <div class="sentence-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en)}" aria-label="听一听 ${htmlEscape(item.en)}" title="听一听">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="en">${htmlEscape(item.en)}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderDialogueLine(item) {
  return `
    <div class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.text)}" aria-label="听一听 ${htmlEscape(item.text)}" title="听一听">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="speaker">${htmlEscape(item.speaker)}</div>
      <div class="en">${htmlEscape(item.text)}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderLearningTips(tips) {
  const cards = [
    { icon: '🔤', title: '发音规则', key: 'phonics' },
    { icon: '📝', title: '语法口诀', key: 'grammar' },
    { icon: '💡', title: '背诵技巧', key: 'memory' },
    { icon: '🌍', title: '文化小贴士', key: 'culture' },
  ].filter(c => tips[c.key]).map(c => `
    <div class="tip-card">
      <div class="tip-card-header">
        <span class="tip-card-icon">${c.icon}</span>
        <span class="tip-card-title">${htmlEscape(c.title)}</span>
      </div>
      <div class="tip-card-body">${tips[c.key]}</div>
    </div>`).join('');
  return cards ? `<div class="tips-grid">${cards}</div>` : '';
}

function renderGoalCards(goals) {
  const icons = ['🎯', '🗣️', '⭐'];
  return `
    <p class="hint-line">先知道本单元要学会什么，再开始听读和练习。</p>
    <div class="tips-grid">${goals.map((goal, index) => `
      <div class="tip-card">
        <div class="tip-card-header">
          <span class="tip-card-icon">${icons[index] || '📌'}</span>
          <span class="tip-card-title">目标 ${index + 1}</span>
        </div>
        <div class="tip-card-body">${htmlEscape(goal)}</div>
      </div>`).join('')}</div>`;
}

function renderScenarioPanel(unit) {
  const items = buildScenarioQA(unit);
  if (!items.length) return '';
  return `
    <p class="hint-line">先听问句，再用完整答句回应，还可以替换成自己的信息。</p>
    <div class="dialogue-box">${items.map(item => `
      <div class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.q)}" aria-label="听一听 ${htmlEscape(item.q)}" title="听一听">
        <span class="sound" aria-hidden="true">🔊</span>
        <div class="speaker">❓ Question</div>
        <div class="en">${htmlEscape(item.q)}</div>
        <div class="cn">${htmlEscape(item.tip || '先听问题，再自己尝试回答。')}</div>
      </div>
      <div class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.a)}" aria-label="听一听 ${htmlEscape(item.a)}" title="听一听">
        <span class="sound" aria-hidden="true">🔊</span>
        <div class="speaker">✅ Answer</div>
        <div class="en">${htmlEscape(item.a)}</div>
        <div class="cn">${htmlEscape(item.tip || '听完答句，再模仿说一遍。')}</div>
      </div>`).join('')}</div>`;
}

function renderMiniReadingPanel(unit) {
  const reading = buildMiniReading(unit);
  return `
    <p class="hint-line">先逐句听读，再看中文复述，最后回答下面的问题。</p>
    <div class="grammar-guide-card">
      <div class="grammar-guide-title">${htmlEscape(reading.title)}</div>
      <div class="grammar-guide-cn">围绕本单元主题设计的微阅读，适合孩子先读、再说、再复述。</div>
    </div>
    <div class="sentence-list">${reading.lines.map(renderSentenceCard).join('')}</div>
    <div class="tips-grid">
      <div class="tip-card">
        <div class="tip-card-header">
          <span class="tip-card-icon">❓</span>
          <span class="tip-card-title">读后想一想</span>
        </div>
        <div class="tip-card-body">${reading.questions.map(item => `<span class="tip-rule">${htmlEscape(item)}</span>`).join('')}</div>
      </div>
      <div class="tip-card">
        <div class="tip-card-header">
          <span class="tip-card-icon">🧩</span>
          <span class="tip-card-title">复述支架</span>
        </div>
        <div class="tip-card-body">${reading.support.map(item => `<span class="tip-rule"><strong>${htmlEscape(item)}</strong></span>`).join('')}</div>
      </div>
    </div>`;
}

function renderOutputPanel(unit) {
  const tasks = buildOutputTasks(unit);
  const icons = ['🎤', '🪄', '🚀'];
  return `
    <p class="hint-line">学完词句后要开口说，把知识真正用出来。</p>
    <div class="tips-grid">${tasks.map((task, index) => `
      <div class="tip-card">
        <div class="tip-card-header">
          <span class="tip-card-icon">${icons[index] || '📌'}</span>
          <span class="tip-card-title">输出任务 ${index + 1}</span>
        </div>
        <div class="tip-card-body">${htmlEscape(task)}</div>
      </div>`).join('')}</div>`;
}

function renderUnit(unit, index) {
  const goals = buildLearningGoals(unit);
  const words = `
    <p class="hint-line">点击卡片听发音并显示中文。</p>
    <div class="card-grid">${unit.words.map(renderWordCard).join('')}</div>`;

  const sentences = `
    <p class="hint-line">重点句型用于预习和复习。</p>
    <div class="sentence-list">${unit.sentences.map(renderSentenceCard).join('')}</div>`;

  const dialogue = `
    <p class="hint-line">原创练习对话，围绕本单元主题设计。</p>
    <div class="dialogue-box">${unit.dialogue.map(renderDialogueLine).join('')}</div>`;

  const phrases = `
    <p class="hint-line">常用短语和搭配。</p>
    <div class="card-grid">${(unit.phrases || []).map(renderWordCard).join('')}</div>`;

  const grammar = `
    <p class="hint-line">点击听句型发音。</p>
    <div class="grammar-list">${(unit.grammar || []).map(item => `
      <div class="grammar-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en || item)}" aria-label="听一听 ${htmlEscape(item.en || item)}" title="听一听">
        <span class="sound" aria-hidden="true">🔊</span>
        <div class="en">${htmlEscape(item.en || item)}</div>
        <div class="cn">${htmlEscape(item.cn || '')}</div>
      </div>`).join('')}</div>`;

  const tipsData = (window.COURSE_TIPS || {})[unit.id];
  const tipsHtml = tipsData ? renderLearningTips(tipsData) : '';

  return `
    <section class="unit ${index === 0 ? 'active' : ''}" style="--unit-color:${unit.color}" data-unit="${unit.id}">
      <div class="unit-title">
        <h2>${htmlEscape(unit.title)} ${htmlEscape(unit.subtitle)}</h2>
        <p>学习目标 → 核心词汇 → 重点短语 → 重点句型 → 情景问答 → 微阅读与复述 → 主题对话 → 语法提示 → 学习加油站 → 输出任务 → 小测验</p>
      </div>
      ${renderPanel('🎯', '学习目标', renderGoalCards(goals), true)}
      ${renderPanel('📦', '核心词汇', words, true)}
      ${unit.phrases?.length ? renderPanel('📌', '重点短语', phrases) : ''}
      ${renderPanel('💬', '重点句型', sentences)}
      ${renderPanel('🗣️', '情景问答', renderScenarioPanel(unit))}
      ${renderPanel('📖', '微阅读与复述', renderMiniReadingPanel(unit))}
      ${renderPanel('🎭', '主题对话', dialogue)}
      ${unit.grammar?.length ? renderPanel('📑', '语法提示', grammar) : ''}
      ${tipsHtml ? renderPanel('🎯', '学习加油站', tipsHtml) : ''}
      ${renderPanel('🚀', '输出任务', renderOutputPanel(unit))}
      ${renderPanel('🧠', '小测验', renderQuiz(unit), false)}
    </section>`;
}

function renderGrammarGuide() {
  const guide = window.COURSE_GRAMMAR_GUIDE || [];
  if (!guide.length) return '';

  const body = guide.map((group, groupIndex) => {
    const rules = (group.rules || []).map(rule => {
      const speakText = rule.speak || rule.pattern || rule.title || rule.example || '';
      return `
        <div class="grammar-guide-card" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}" title="听一听">
          <span class="sound" aria-hidden="true">🔊</span>
          <div class="grammar-guide-title">${htmlEscape(rule.title)}</div>
          <div class="grammar-guide-pattern">${htmlEscape(rule.pattern || '')}</div>
          <div class="grammar-guide-cn">${htmlEscape(rule.cn || '')}</div>
          <div class="grammar-guide-example">${htmlEscape(rule.example || '')}</div>
          ${rule.note ? `<div class="grammar-guide-note">${htmlEscape(rule.note)}</div>` : ''}
        </div>`;
    }).join('');

    return renderPanel(group.icon || '📝', group.title || `语法 ${groupIndex + 1}`, `
      <p class="hint-line">${htmlEscape(group.desc || '点击卡片听例句发音。')}</p>
      <div class="grammar-guide-list">${rules}</div>
    `, groupIndex === 0);
  }).join('');

  return `
    <section class="unit grammar-guide-page" style="--unit-color:#6f42c1" data-unit="grammar-guide">
      <div class="unit-title">
        <h2>语法总览</h2>
        <p>按功能归纳重点句型、用法和例句</p>
      </div>
      ${body}
    </section>`;
}

function renderQuiz(unit) {
  appState.quiz[unit.id] = { current: 0, score: 0 };
  return `
    <div class="quiz" id="quiz-${unit.id}">
      <div class="quiz-progress" id="progress-${unit.id}"></div>
      <div id="question-${unit.id}"></div>
      <div class="quiz-done" id="done-${unit.id}">
        <div class="done-emoji">🎉</div>
        <h3>测验完成</h3>
        <p class="quiz-result" id="result-${unit.id}"></p>
        <button class="restart-btn" type="button" data-restart="${unit.id}">再做一次</button>
      </div>
    </div>`;
}

function showQuizQuestion(unitId) {
  const unit = window.COURSE_UNITS.find(item => item.id === unitId);
  const state = appState.quiz[unitId];
  const questionBox = document.getElementById(`question-${unitId}`);
  const progress = document.getElementById(`progress-${unitId}`);
  const done = document.getElementById(`done-${unitId}`);

  if (state.current >= unit.quiz.length) {
    questionBox.style.display = 'none';
    progress.style.display = 'none';
    done.style.display = 'block';
    const pct = Math.round((state.score / unit.quiz.length) * 100);
    document.getElementById(`result-${unitId}`).textContent = `答对 ${state.score} / ${unit.quiz.length} 题 (${pct}%)`;
    return;
  }

  const q = unit.quiz[state.current];
  progress.style.display = 'block';
  progress.textContent = `第 ${state.current + 1} / ${unit.quiz.length} 题 | 答对: ${state.score}`;
  questionBox.style.display = 'block';
  questionBox.innerHTML = `
    <div class="quiz-question">
      ${q.emoji ? `<div class="big">${q.emoji}</div>` : ''}
      <h3>${htmlEscape(q.q)}</h3>
    </div>
    <div class="quiz-options">
      ${q.options.map(opt => `<div class="quiz-option" role="button" tabindex="0" data-unit="${unitId}" data-answer="${htmlEscape(q.answer)}">${htmlEscape(opt)}</div>`).join('')}
    </div>
    <button class="quiz-next" type="button" data-next="${unitId}">下一题</button>`;
}

function switchUnit(index) {
  appState.activeUnit = index;
  document.querySelectorAll('.nav-btn').forEach((btn, i) => btn.classList.toggle('active', i === index));
  document.querySelectorAll('.unit').forEach((unit, i) => unit.classList.toggle('active', i === index));
  stopPlayback();
  clearSpeaking();
  const activeBtn = document.querySelectorAll('.nav-btn')[index];
  navBar.scrollTo({ left: Math.max(0, activeBtn.offsetLeft - 12), behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSpeakCard(card) {
  const text = card.dataset.speak;
  card.classList.toggle('revealed');
  clearSpeaking();
  card.classList.add('speaking');
  const sound = card.querySelector('.sound');
  if (sound) sound.textContent = '⏸';
  const playback = [{ text, rate: Math.max(0.45, appState.speechRate - 0.08), pauseAfterMs: appState.repeatMode ? 450 : 0 }];
  if (appState.repeatMode) {
    playback.push({ text, rate: Math.max(0.4, appState.speechRate - 0.18) });
  }
  speakSequence(playback, () => clearSpeaking(card));
}

function checkAnswer(option) {
  const unitId = option.dataset.unit;
  const correct = option.dataset.answer;
  const selected = option.textContent;
  document.querySelectorAll(`#question-${unitId} .quiz-option`).forEach(opt => {
    opt.classList.add('disabled');
    if (opt.textContent === correct) opt.classList.add('correct');
    if (opt === option && selected !== correct) opt.classList.add('wrong');
  });
  if (selected === correct) {
    appState.quiz[unitId].score++;
    speak(correct);
  }
  document.querySelector(`#question-${unitId} .quiz-next`).style.display = 'block';
}

function restartQuiz(unitId) {
  appState.quiz[unitId] = { current: 0, score: 0 };
  document.getElementById(`done-${unitId}`).style.display = 'none';
  showQuizQuestion(unitId);
}

function initCourse() {
  document.title = window.COURSE_TITLE || document.title;
  document.getElementById('courseTitle').textContent = window.COURSE_TITLE;
  document.getElementById('courseSubTitle').textContent = window.COURSE_SUBTITLE || '译林版英语互动学习';

  const hasGrammarGuide = false;
  navBar.innerHTML = window.COURSE_UNITS.map((unit, index) => `
    <button class="nav-btn ${index === 0 ? 'active' : ''}" type="button" style="--unit-color:${unit.color}" data-index="${index}">
      ${htmlEscape(unit.title)}
    </button>`).join('') + (hasGrammarGuide ? `
    <button class="nav-btn" type="button" style="--unit-color:#6f42c1" data-index="${window.COURSE_UNITS.length}">
      语法总览
    </button>` : '');

  app.innerHTML = window.COURSE_UNITS.map(renderUnit).join('');
  window.COURSE_UNITS.forEach(unit => showQuizQuestion(unit.id));

  if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  } else if (voiceStatus) {
    voiceStatus.textContent = '当前浏览器不支持语音';
  }
}

document.addEventListener('click', event => {
  const nav = event.target.closest('.nav-btn');
  if (nav) {
    switchUnit(Number(nav.dataset.index));
    return;
  }

  const panelHead = event.target.closest('.panel-head');
  if (panelHead) {
    setPanelOpen(panelHead, !panelHead.classList.contains('open'));
    return;
  }

  const speakCard = event.target.closest('[data-speak]');
  if (speakCard) {
    handleSpeakCard(speakCard);
    return;
  }

  const option = event.target.closest('.quiz-option');
  if (option && !option.classList.contains('disabled')) {
    checkAnswer(option);
    return;
  }

  const next = event.target.closest('[data-next]');
  if (next) {
    const unitId = next.dataset.next;
    appState.quiz[unitId].current++;
    showQuizQuestion(unitId);
    return;
  }

  const restart = event.target.closest('[data-restart]');
  if (restart) {
    restartQuiz(restart.dataset.restart);
  }
});

document.addEventListener('keydown', event => {
  if ((event.key !== 'Enter' && event.key !== ' ') || event.defaultPrevented) return;
  const target = event.target.closest('[role="button"]');
  if (!target) return;
  event.preventDefault();
  target.click();
});

voiceToggle.addEventListener('click', () => {
  appState.voiceEnabled = !appState.voiceEnabled;
  voiceToggle.classList.toggle('active', appState.voiceEnabled);
  voiceToggle.textContent = appState.voiceEnabled ? '🔊 自动发音' : '🔇 发音已关';
  if (!appState.voiceEnabled) {
    stopPlayback();
    clearSpeaking();
  }
});

repeatToggle.addEventListener('click', () => {
  appState.repeatMode = !appState.repeatMode;
  repeatToggle.classList.toggle('active', appState.repeatMode);
  repeatToggle.textContent = appState.repeatMode ? '🔄 跟读模式开' : '🔄 跟读模式';
});

speedSlider.addEventListener('input', () => {
  appState.speechRate = Number(speedSlider.value);
  speedVal.textContent = appState.speechRate.toFixed(1);
});

initCourse();
