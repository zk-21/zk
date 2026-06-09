window.COURSE_TITLE = '四年级上册英语 · 译林版互动学习';
window.COURSE_SUBTITLE = '按2024版目录整理 · 原创练习内容 · 音频目录 audio/grade4a/en';
window.COURSE_AUDIO_BASE = 'audio/grade4a/en';


const u = (id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz) => ({
  id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz
});

window.COURSE_UNITS = [
  u('u1', 'Unit 1', 'School subjects 学校课程', '#2f80ed',
    [
      { en: 'subject', cn: '学科，科目', emoji: '📚', ipa: '/ˈsʌbdʒɪkt/' },
      { en: 'Chinese', cn: '语文(课)；中国的', emoji: '🀄', ipa: '/ˌtʃaɪˈniːz/' },
      { en: 'English', cn: '英语(课)；英语的', emoji: '🔤', ipa: '/ˈɪŋɡlɪʃ/' },
      { en: 'Maths', cn: '数学(课)', emoji: '➗', ipa: '/mæθs/' },
      { en: 'PE', cn: '体育(课)', emoji: '🏃', ipa: '/ˌpiː ˈiː/' },
      { en: 'Art', cn: '美术(课)', emoji: '🎨', ipa: '/ɑːt/' },
      { en: 'Science', cn: '科学(课)', emoji: '🔬', ipa: '/ˈsaɪəns/' },
      { en: 'IT', cn: '信息科技(课)', emoji: '💻', ipa: '/ˌaɪ ˈtiː/' },
      { en: 'Music', cn: '音乐(课)', emoji: '🎵', ipa: '/ˈmjuːzɪk/' },
      { en: 'Labour', cn: '劳动(课)', emoji: '🛠️', ipa: '/ˈleɪbə(r)/' },
      { en: 'best', cn: '最，最高程度地', emoji: '⭐', ipa: '/best/' },
      { en: 'also', cn: '也', emoji: '✅', ipa: '/ˈɔːlsəʊ/' },
      { en: 'It\'s time for ...', cn: '是……的时候了', emoji: '⏰', ipa: '/ɪts taɪm fɔː/' },
      { en: 'Welcome back to ...', cn: '欢迎回到……', emoji: '🏫', ipa: '/ˈwelkəm bæk tuː/' },
      { en: 'be good at', cn: '擅长', emoji: '🎯', ipa: '/bi ɡʊd æt/' },
      { en: 'interesting', cn: '有趣的，有吸引力的', emoji: '😄', ipa: '/ˈɪntrəstɪŋ/' },
      { en: 'learn about', cn: '学习', emoji: '📖', ipa: '/lɜːn əˈbaʊt/' },
      { en: 'culture', cn: '文化，文明', emoji: '🌍', ipa: '/ˈkʌltʃə(r)/' },
      { en: 'read', cn: '阅读', emoji: '📚', ipa: '/riːd/' },
      { en: 'story', cn: '故事', emoji: '📖', ipa: '/ˈstɔːri/' },
      { en: 'all', cn: '全部，都', emoji: '💯', ipa: '/ɔːl/' },
      { en: 'sports ground', cn: '操场，运动场', emoji: '🏟️', ipa: '/spɔːts ɡraʊnd/' }
    ],
    [
      { en: 'What subjects do you like?', cn: '你喜欢什么学科？' },
      { en: 'I like English and Science.', cn: '我喜欢英语和科学。' },
      { en: 'Do you like Maths?', cn: '你喜欢数学吗？' },
      { en: 'We have Music this afternoon.', cn: '今天下午我们有音乐课。' },
      { en: 'Welcome back to school.', cn: '欢迎回到学校。' },
      { en: 'It\'s time for class.', cn: '上课时间到了。' },
      { en: 'I\'m good at Art.', cn: '我擅长美术。' }
    ],
    [
      { speaker: '👧 Yang Ling', text: 'Welcome back to school, class!', cn: '同学们，欢迎回到学校！' },
      { speaker: '👦 Mike', text: 'Nice to see you, Miss Li.', cn: '李老师，很高兴见到您。' },
      { speaker: '👧 Yang Ling', text: 'What subjects do you like, Mike?', cn: '迈克，你喜欢什么学科？' },
      { speaker: '👦 Mike', text: 'I like PE. It\'s fun.', cn: '我喜欢体育。它很有趣。' }
    ],
    [
      { en: 'school subjects', cn: '学校课程', emoji: '📚' },
      { en: 'this afternoon', cn: '今天下午', emoji: '🌤️' },
      { en: 'be good at', cn: '擅长', emoji: '🎯' },
      { en: 'sports ground', cn: '操场', emoji: '🏟️' }
    ],
    [
      { en: 'What subjects do you like?', cn: '询问喜欢的学科' },
      { en: 'I like ...', cn: '表达喜欢' },
      { en: 'Do you like ...?', cn: '一般疑问句' },
      { en: 'It\'s time for ...', cn: '是……的时候了' }
    ],
    [
      { emoji: '➗', q: 'Maths 是什么意思？', answer: '数学(课)', options: ['音乐', '数学', '科学', '美术'] },
      { q: '"What subjects do you like?" 意思是？', answer: '你喜欢什么学科？', options: ['你有什么课？', '你喜欢什么学科？', '你喜欢学校吗？', '你会什么科目？'] },
      { emoji: '🎯', q: 'be good at 是什么意思？', answer: '擅长', options: ['喜欢', '擅长', '讨厌', '学习'] }
    ],
  ),
  u('u2', 'Unit 2', 'My day 我的一天', '#17a673',
    [
      { en: 'day', cn: '一天，一日', emoji: '🌞', ipa: '/deɪ/' },
      { en: 'get up', cn: '起床', emoji: '⏰', ipa: '/ɡet ʌp/' },
      { en: 'wash', cn: '洗', emoji: '🚿', ipa: '/wɒʃ/' },
      { en: 'face', cn: '脸，面孔', emoji: '😊', ipa: '/feɪs/' },
      { en: 'have lessons', cn: '上课', emoji: '📝', ipa: '/hæv ˈlesnz/' },
      { en: 'have', cn: '吃，喝', emoji: '🍽️', ipa: '/hæv/' },
      { en: 'dinner', cn: '正餐(常指晚餐)', emoji: '🍽️', ipa: '/ˈdɪnə(r)/' },
      { en: 'breakfast', cn: '早餐，早饭', emoji: '🥣', ipa: '/ˈbrekfəst/' },
      { en: 'lunch', cn: '午餐，午饭', emoji: '🍱', ipa: '/lʌntʃ/' },
      { en: 'go to bed', cn: '上床睡觉', emoji: '🛏️', ipa: '/ɡəʊ tə bed/' },
      { en: "o'clock", cn: '(表示整点)……点钟', emoji: '🕐', ipa: '/əˈklɒk/' },
      { en: 'early', cn: '早的，早', emoji: '🌅', ipa: '/ˈɜːli/' },
      { en: 'thirty', cn: '三十', emoji: '3️⃣', ipa: '/ˈθɜːti/' },
      { en: 'first', cn: '首先，第一', emoji: '🥇', ipa: '/fɜːst/' },
      { en: 'hurry up', cn: '快点', emoji: '⏰', ipa: '/ˈhʌri ʌp/' },
      { en: 'What time is it?', cn: '几点了？', emoji: '🕐', ipa: '/wɒt taɪm ɪz ɪt/' },
      { en: "I'm coming!", cn: '我来了！', emoji: '🏃', ipa: '/aɪm ˈkʌmɪŋ/' },
      { en: 'twenty', cn: '二十', emoji: '2️⃣', ipa: '/ˈtwenti/' },
      { en: 'Come on!', cn: '赶快！加把劲！', emoji: '💪', ipa: '/kʌm ɒn/' },
      { en: 'class', cn: '课，上课', emoji: '📚', ipa: '/klɑːs/' },
      { en: 'eleven', cn: '十一', emoji: '1️⃣', ipa: '/ɪˈlevn/' },
      { en: 'sport', cn: '体育运动', emoji: '⚽', ipa: '/spɔːt/' },
      { en: 'fifteen', cn: '十五', emoji: '5️⃣', ipa: '/ˌfɪfˈtiːn/' },
      { en: 'bed', cn: '床', emoji: '🛏️', ipa: '/bed/' },
      { en: 'Good night!', cn: '晚安！', emoji: '🌙', ipa: '/ɡʊd naɪt/' },
      { en: 'It\'s time to ...', cn: '到了……的时间了', emoji: '⏰', ipa: '/ɪts taɪm tuː/' }
    ],
    [
      { en: 'When do you get up?', cn: '你什么时候起床？' },
      { en: 'I get up at seven.', cn: '我七点起床。' },
      { en: 'I have lunch at twelve.', cn: '我十二点吃午餐。' },
      { en: 'It\'s time to go to bed.', cn: '该睡觉了。' },
      { en: 'Hurry up!', cn: '快点！' },
      { en: 'Good night, Mum.', cn: '妈妈，晚安。' },
      { en: 'What time is it now?', cn: '现在几点了？' }
    ],
    [
      { speaker: '👦 Liu Tao', text: 'What time is it, Mum?', cn: '妈妈，现在几点了？' },
      { speaker: '👩 Mum', text: 'It\'s seven o\'clock. Hurry up!', cn: '七点了。快点！' },
      { speaker: '👦 Liu Tao', text: 'I\'m coming!', cn: '我来了！' },
      { speaker: '👩 Mum', text: 'Have breakfast first.', cn: '先吃早餐。' }
    ],
    [
      { en: 'get up', cn: '起床', emoji: '⏰' },
      { en: 'have breakfast', cn: '吃早餐', emoji: '🥣' },
      { en: 'go to bed', cn: '上床睡觉', emoji: '🛏️' },
      { en: 'hurry up', cn: '快点', emoji: '⏰' }
    ],
    [
      { en: 'When do you ...?', cn: '询问时间' },
      { en: 'I ... at ...', cn: '表达几点做某事' },
      { en: 'It\'s time to ...', cn: '到了……的时间了' },
      { en: 'at + 时刻', cn: '在几点钟' }
    ],
    [
      { emoji: '🥣', q: 'breakfast 是什么意思？', answer: '早餐', options: ['午餐', '晚餐', '早餐', '点心'] },
      { q: '"I get up at seven." 意思是？', answer: '我七点起床。', options: ['我七点睡觉。', '我七点起床。', '我七点上课。', '我七点吃饭。'] },
      { emoji: '🕐', q: '"o\'clock" 是什么意思？', answer: '(表示整点)……点钟', options: ['早上', '下午', '(表示整点)……点钟', '晚上'] }
    ],
  ),
  u('u3', 'Unit 3', 'My week 我的一周', '#f59f00',
    [
      { en: 'week', cn: '周，星期', emoji: '📆', ipa: '/wiːk/' },
      { en: 'Monday', cn: '星期一', emoji: '1️⃣', ipa: '/ˈmʌndeɪ/' },
      { en: 'Tuesday', cn: '星期二', emoji: '2️⃣', ipa: '/ˈtjuːzdeɪ/' },
      { en: 'Wednesday', cn: '星期三', emoji: '3️⃣', ipa: '/ˈwenzdeɪ/' },
      { en: 'Thursday', cn: '星期四', emoji: '4️⃣', ipa: '/ˈθɜːzdeɪ/' },
      { en: 'Friday', cn: '星期五', emoji: '5️⃣', ipa: '/ˈfraɪdeɪ/' },
      { en: 'Saturday', cn: '星期六', emoji: '6️⃣', ipa: '/ˈsætədeɪ/' },
      { en: 'Sunday', cn: '星期天', emoji: '7️⃣', ipa: '/ˈsʌndeɪ/' },
      { en: 'when', cn: '什么时候', emoji: '🕐', ipa: '/wen/' },
      { en: 'every', cn: '每一个，每个', emoji: '🔄', ipa: '/ˈevri/' },
      { en: 'up', cn: '起床', emoji: '⬆️', ipa: '/ʌp/' },
      { en: 'early', cn: '提早，提前', emoji: '⏰', ipa: '/ˈɜːli/' },
      { en: 'today', cn: '在今天', emoji: '📅', ipa: '/təˈdeɪ/' },
      { en: 'What day is it today?', cn: '今天星期几？', emoji: '📆', ipa: '/wɒt deɪ ɪz ɪt təˈdeɪ/' },
      { en: 'after school', cn: '放学后', emoji: '🏫', ipa: '/ˈɑːftə skuːl/' },
      { en: 'cinema', cn: '电影院', emoji: '🎬', ipa: '/ˈsɪnəmə/' }
    ],
    [
      { en: 'What day is it today?', cn: '今天星期几？' },
      { en: 'It is Wednesday.', cn: '今天星期三。' },
      { en: 'What do you do on Saturday?', cn: '你星期六做什么？' },
      { en: 'I play football on Sunday.', cn: '我星期日踢足球。' },
      { en: 'We go to the cinema after school.', cn: '我们放学后去看电影。' },
      { en: 'Every day is fun.', cn: '每天都很有趣。' },
      { en: 'Get up early!', cn: '早点起床！' }
    ],
    [
      { speaker: '👦 Wang Bing', text: 'What day is it today?', cn: '今天星期几？' },
      { speaker: '👧 Helen', text: 'It is Friday.', cn: '今天星期五。' },
      { speaker: '👦 Wang Bing', text: 'Great! We have a football match.', cn: '太好了！我们有足球比赛。' },
      { speaker: '👧 Helen', text: 'Let\'s go after school.', cn: '放学后我们一起去吧。' }
    ],
    [
      { en: 'on Monday', cn: '在星期一', emoji: '📆' },
      { en: 'after school', cn: '放学后', emoji: '🏫' },
      { en: 'go to the cinema', cn: '去看电影', emoji: '🎬' },
      { en: 'every day', cn: '每一天', emoji: '🔄' }
    ],
    [
      { en: 'What day is it today?', cn: '询问星期几' },
      { en: 'on + 星期', cn: '星期前用 on' },
      { en: 'What do you do on ...?', cn: '询问某天做什么' },
      { en: 'every + day', cn: '每一天' }
    ],
    [
      { emoji: '📆', q: 'week 是什么意思？', answer: '周，星期', options: ['天', '月', '周，星期', '年'] },
      { q: '"What day is it today?" 意思是？', answer: '今天星期几？', options: ['今天几号？', '今天星期几？', '今天好吗？', '今天有课吗？'] },
      { emoji: '🎬', q: 'cinema 是什么意思？', answer: '电影院', options: ['图书馆', '电影院', '公园', '商场'] }
    ],
  ),
  u('u4', 'Unit 4', 'I like sport 我喜欢运动', '#9b59b6',
    [
      { en: 'play', cn: '打(球)，踢(球)', emoji: '⚽', ipa: '/pleɪ/' },
      { en: 'football', cn: '足球运动；足球', emoji: '⚽', ipa: '/ˈfʊtbɔːl/' },
      { en: 'ping-pong', cn: '乒乓球运动', emoji: '🏓', ipa: '/ˌpɪŋ ˈpɒŋ/' },
      { en: 'basketball', cn: '篮球运动；篮球', emoji: '🏀', ipa: '/ˈbɑːskɪtbɔːl/' },
      { en: 'great', cn: '非常的', emoji: '👍', ipa: '/ɡreɪt/' },
      { en: 'so', cn: '(表示程度)这么，那么', emoji: '😲', ipa: '/səʊ/' },
      { en: 'well', cn: '好', emoji: '✅', ipa: '/wel/' },
      { en: 'Have a go!', cn: '试一试！', emoji: '💪', ipa: '/hæv ə ɡəʊ/' },
      { en: 'hard', cn: '难做的，不易的', emoji: '🧩', ipa: '/hɑːd/' },
      { en: "It's OK.", cn: '没关系。', emoji: '👌', ipa: '/ɪts əʊˈkeɪ/' },
      { en: 'try', cn: '试', emoji: '💪', ipa: '/traɪ/' },
      { en: 'Well played!', cn: '好球！', emoji: '⚽', ipa: '/wel pleɪd/' },
      { en: 'dancing', cn: '跳舞，舞蹈', emoji: '💃', ipa: '/ˈdɑːnsɪŋ/' },
      { en: 'lesson', cn: '一节课，一课时', emoji: '📚', ipa: '/ˈlesn/' },
      { en: 'walk', cn: '牵着(动物)走，遛', emoji: '🐕', ipa: '/wɔːk/' },
      { en: 'dog', cn: '狗', emoji: '🐕', ipa: '/dɒɡ/' },
      { en: 'tomorrow', cn: '明天，在明天', emoji: '🌞', ipa: '/təˈmɒrəʊ/' },
      { en: 'free', cn: '空闲的', emoji: '😌', ipa: '/friː/' },
      { en: 'See you tomorrow!', cn: '明天见！', emoji: '👋', ipa: '/siː juː təˈmɒrəʊ/' },
      { en: 'swimming', cn: '游泳；游泳运动', emoji: '🏊', ipa: '/ˈswɪmɪŋ/' }
    ],
    [
      { en: 'Can you play basketball?', cn: '你会打篮球吗？' },
      { en: 'Yes, I can.', cn: '是的，我会。' },
      { en: 'No, I cannot.', cn: '不，我不会。' },
      { en: 'Have a try.', cn: '试一试。' },
      { en: 'Let us play together.', cn: '让我们一起玩吧。' },
      { en: 'Well played!', cn: '好球！' },
      { en: 'See you tomorrow!', cn: '明天见！' }
    ],
    [
      { speaker: '👦 Mike', text: 'Can you play table tennis?', cn: '你会打乒乓球吗？' },
      { speaker: '👧 Su Yang', text: 'No, I cannot. It is hard.', cn: '不，我不会。它很难。' },
      { speaker: '👦 Mike', text: 'Have a go!', cn: '试一试！' },
      { speaker: '👧 Su Yang', text: 'Great! I can play now.', cn: '太棒了！我现在会打了。' }
    ],
    [
      { en: 'play football', cn: '踢足球', emoji: '⚽' },
      { en: 'play basketball', cn: '打篮球', emoji: '🏀' },
      { en: 'have a go', cn: '试一试', emoji: '💪' },
      { en: 'free time', cn: '空闲时间', emoji: '😌' }
    ],
    [
      { en: 'Can you ...?', cn: '询问能力' },
      { en: 'Yes, I can.', cn: '肯定回答' },
      { en: 'No, I cannot.', cn: '否定回答' },
      { en: 'Have a go!', cn: '鼓励尝试' }
    ],
    [
      { emoji: '🏓', q: 'ping-pong 是什么意思？', answer: '乒乓球运动', options: ['篮球', '足球', '乒乓球', '网球'] },
      { q: '"Have a go!" 意思是？', answer: '试一试！', options: ['再见。', '试一试！', '看一看。', '坐下。'] },
      { emoji: '💪', q: '"Can you swim?" 应该怎样肯定回答？', answer: 'Yes, I can.', options: ['Yes, I do.', 'Yes, I can.', 'No, I do not.', 'I like it.'] }
    ],
  ),
  u('u5', 'Unit 5', 'My body 我的身体', '#e05252',
    [
      { en: 'different', cn: '不同的，有区别的', emoji: '🔄', ipa: '/ˈdɪfrənt/' },
      { en: 'same', cn: '相同的，同一的', emoji: '🔷', ipa: '/seɪm/' },
      { en: 'hair', cn: '头发', emoji: '👱', ipa: '/heə(r)/' },
      { en: 'eye', cn: '眼睛', emoji: '👀', ipa: '/aɪ/' },
      { en: 'ear', cn: '耳朵', emoji: '👂', ipa: '/ɪə(r)/' },
      { en: 'nose', cn: '鼻子', emoji: '👃', ipa: '/nəʊz/' },
      { en: 'mouth', cn: '嘴，口', emoji: '👄', ipa: '/maʊθ/' },
      { en: 'arm', cn: '手臂', emoji: '💪', ipa: '/ɑːm/' },
      { en: 'leg', cn: '腿', emoji: '🦵', ipa: '/leɡ/' },
      { en: 'robot', cn: '机器人', emoji: '🤖', ipa: '/ˈrəʊbɒt/' },
      { en: 'doll', cn: '玩具娃娃', emoji: '🧸', ipa: '/dɒl/' },
      { en: 'his', cn: '他的', emoji: '👦', ipa: '/hɪz/' },
      { en: 'tall', cn: '高的', emoji: '📏', ipa: '/tɔːl/' },
      { en: 'short', cn: '短的', emoji: '📏', ipa: '/ʃɔːt/' },
      { en: 'her', cn: '她的', emoji: '👧', ipa: '/hɜː/' },
      { en: 'small', cn: '小的', emoji: '🔹', ipa: '/smɔːl/' },
      { en: 'bring', cn: '带来', emoji: '📦', ipa: '/brɪŋ/' },
      { en: 'lots of', cn: '大量，许多', emoji: '📦', ipa: '/lɒts ɒv/' },
      { en: 'show', cn: '表演，演出', emoji: '🎭', ipa: '/ʃəʊ/' },
      { en: 'beautiful', cn: '美丽的', emoji: '💖', ipa: '/ˈbjuːtɪfl/' }
    ],
    [
      { en: 'We look different but we are good friends.', cn: '我们看起来不同，但我们是好朋友。' },
      { en: 'He has short hair.', cn: '他有短发。' },
      { en: 'Her eyes are big.', cn: '她的眼睛很大。' },
      { en: 'This is my robot.', cn: '这是我的机器人。' },
      { en: 'I have a beautiful doll.', cn: '我有一个漂亮的洋娃娃。' },
      { en: 'Bring your toys.', cn: '带上你的玩具。' },
      { en: 'Show me your doll.', cn: '给我看看你的洋娃娃。' }
    ],
    [
      { speaker: '👧 Helen', text: 'Look at my doll.', cn: '看我的洋娃娃。' },
      { speaker: '👦 Mike', text: 'It\'s beautiful!', cn: '真漂亮！' },
      { speaker: '👧 Helen', text: 'Her hair is long.', cn: '她的头发很长。' },
      { speaker: '👦 Mike', text: 'My robot is tall.', cn: '我的机器人很高。' }
    ],
    [
      { en: 'look different', cn: '看起来不同', emoji: '🔄' },
      { en: 'short hair', cn: '短发', emoji: '👱' },
      { en: 'lots of toys', cn: '许多玩具', emoji: '🧸' },
      { en: 'beautiful doll', cn: '漂亮的洋娃娃', emoji: '💖' }
    ],
    [
      { en: 'He has ...', cn: '他有……' },
      { en: 'Her ... is ...', cn: '她的……是……' },
      { en: 'We look ...', cn: '我们看起来……' },
      { en: 'different / same', cn: '不同的 / 相同的' }
    ],
    [
      { emoji: '🤖', q: 'robot 是什么意思？', answer: '机器人', options: ['风筝', '机器人', '玩偶', '小汽车'] },
      { q: '"He has short hair." 意思是？', answer: '他有短发。', options: ['他喜欢短发。', '他有短发。', '他是短发。', '他剪短发。'] },
      { emoji: '👀', q: 'eye 是什么意思？', answer: '眼睛', options: ['耳朵', '鼻子', '眼睛', '嘴巴'] }
    ],
  ),
  u('u6', 'Unit 6', 'Weather 天气', '#1488cc',
    [
      { en: 'weather', cn: '天气，气象', emoji: '🌦️', ipa: '/ˈweðə(r)/' },
      { en: 'cloudy', cn: '多云的，阴天的', emoji: '☁️', ipa: '/ˈklaʊdi/' },
      { en: 'sunny', cn: '晴朗的', emoji: '☀️', ipa: '/ˈsʌni/' },
      { en: 'cool', cn: '凉的，凉爽的', emoji: '🍃', ipa: '/kuːl/' },
      { en: 'rainy', cn: '阴雨的，多雨的', emoji: '🌧️', ipa: '/ˈreɪni/' },
      { en: 'hot', cn: '温度高的，热的', emoji: '🥵', ipa: '/hɒt/' },
      { en: 'windy', cn: '多风的，风大的', emoji: '💨', ipa: '/ˈwɪndi/' },
      { en: 'warm', cn: '温暖的，暖和的', emoji: '🌤️', ipa: '/wɔːm/' },
      { en: 'save ... for a rainy day', cn: '未雨绸缪', emoji: '☔', ipa: '/seɪv fɔːr ə ˈreɪni deɪ/' },
      { en: 'money', cn: '钱', emoji: '💰', ipa: '/ˈmʌni/' },
      { en: "What's the weather like today?", cn: '今天天气怎么样？', emoji: '🌦️', ipa: '/wɒts ðə ˈweðə laɪk təˈdeɪ/' },
      { en: 'park', cn: '公园', emoji: '🏞️', ipa: '/pɑːk/' },
      { en: 'meet', cn: '(与……)会面，集合', emoji: '🤝', ipa: '/miːt/' },
      { en: 'fly a kite', cn: '放风筝', emoji: '🪁', ipa: '/flaɪ ə kaɪt/' },
      { en: "It's raining.", cn: '下雨了。', emoji: '🌧️', ipa: '/ɪts ˈreɪnɪŋ/' },
      { en: 'worry', cn: '担心，担忧', emoji: '😟', ipa: '/ˈwʌri/' },
      { en: 'umbrella', cn: '伞，雨伞', emoji: '☂️', ipa: '/ʌmˈbrelə/' },
      { en: 'there', cn: '到那里，在那里', emoji: '📍', ipa: '/ðeə(r)/' }
    ],
    [
      { en: 'What\'s the weather like today?', cn: '今天天气怎么样？' },
      { en: 'It is sunny and warm.', cn: '天气晴朗又温暖。' },
      { en: 'It is rainy. Take an umbrella.', cn: '下雨了。带一把伞。' },
      { en: 'Can we fly a kite?', cn: '我们能放风筝吗？' },
      { en: 'It is windy today.', cn: '今天有风。' },
      { en: 'Don\'t worry.', cn: '别担心。' },
      { en: 'Let\'s meet at the park.', cn: '我们在公园见面吧。' }
    ],
    [
      { speaker: '👦 Wang Bing', text: 'What\'s the weather like today?', cn: '今天天气怎么样？' },
      { speaker: '👧 Su Hai', text: 'It is windy and cool.', cn: '今天有风并且凉爽。' },
      { speaker: '👦 Wang Bing', text: 'Can we fly a kite?', cn: '我们能放风筝吗？' },
      { speaker: '👧 Su Hai', text: 'Yes. Let\'s go to the park.', cn: '可以。我们去公园吧。' }
    ],
    [
      { en: 'sunny day', cn: '晴天', emoji: '☀️' },
      { en: 'rainy weather', cn: '雨天', emoji: '🌧️' },
      { en: 'take an umbrella', cn: '带伞', emoji: '☂️' },
      { en: 'fly a kite', cn: '放风筝', emoji: '🪁' }
    ],
    [
      { en: 'What\'s the weather like?', cn: '询问天气' },
      { en: 'It is sunny.', cn: '描述天气' },
      { en: 'Can we ...?', cn: '提出请求或建议' },
      { en: 'Don\'t worry.', cn: '安慰表达' }
    ],
    [
      { emoji: '🌧️', q: 'rainy 是什么意思？', answer: '下雨的', options: ['晴朗的', '下雨的', '多云的', '温暖的'] },
      { q: '"What\'s the weather like today?" 意思是？', answer: '今天天气怎么样？', options: ['今天星期几？', '今天天气怎么样？', '今天几点？', '今天上什么课？'] },
      { emoji: '☂️', q: 'umbrella 是什么意思？', answer: '伞', options: ['帽子', '外套', '伞', '鞋子'] }
    ],
  ),
  u('u7', 'Unit 7', 'Seasons 季节', '#2f9e44',
    [
      { en: 'season', cn: '季节', emoji: '🌈', ipa: '/ˈsiːzn/' },
      { en: 'spring', cn: '春天，春季', emoji: '🌱', ipa: '/sprɪŋ/' },
      { en: 'go boating', cn: '去划船', emoji: '🚣', ipa: '/ɡəʊ ˈbəʊtɪŋ/' },
      { en: 'winter', cn: '冬天，冬季', emoji: '⛄', ipa: '/ˈwɪntə(r)/' },
      { en: 'go skating', cn: '去溜冰，去滑冰', emoji: '⛸️', ipa: '/ɡəʊ ˈskeɪtɪŋ/' },
      { en: 'summer', cn: '夏天，夏季', emoji: '🏖️', ipa: '/ˈsʌmə(r)/' },
      { en: 'ice cream', cn: '冰激凌', emoji: '🍦', ipa: '/ˌaɪs ˈkriːm/' },
      { en: 'go swimming', cn: '去游泳', emoji: '🏊', ipa: '/ɡəʊ ˈswɪmɪŋ/' },
      { en: 'autumn', cn: '秋天，秋季', emoji: '🍂', ipa: '/ˈɔːtəm/' },
      { en: 'go climbing', cn: '去爬山', emoji: '🧗', ipa: '/ɡəʊ ˈklaɪmɪŋ/' },
      { en: 'new', cn: '新的', emoji: '✨', ipa: '/njuː/' },
      { en: 'cold', cn: '寒冷的，冷的', emoji: '🥶', ipa: '/kəʊld/' },
      { en: 'bird', cn: '鸟', emoji: '🐦', ipa: '/bɜːd/' },
      { en: 'back', cn: '回原处', emoji: '🔙', ipa: '/bæk/' },
      { en: 'year', cn: '年', emoji: '📅', ipa: '/jɪə(r)/' },
      { en: 'in', cn: '在(某段时间)内', emoji: '📅', ipa: '/ɪn/' },
      { en: 'plant', cn: '栽种，种植', emoji: '🌱', ipa: '/plɑːnt/' },
      { en: 'pick', cn: '采，摘', emoji: '🍎', ipa: '/pɪk/' },
      { en: 'snow', cn: '雪，积雪', emoji: '❄️', ipa: '/snəʊ/' }
    ],
    [
      { en: 'What is your favourite season?', cn: '你最喜欢什么季节？' },
      { en: 'I like spring. It is warm.', cn: '我喜欢春天。它很温暖。' },
      { en: 'We can swim in summer.', cn: '我们可以在夏天游泳。' },
      { en: 'Leaves are yellow in autumn.', cn: '秋天树叶是黄色的。' },
      { en: 'We make snowmen in winter.', cn: '我们在冬天堆雪人。' },
      { en: 'Let\'s go boating in spring.', cn: '春天我们去划船吧。' },
      { en: 'I like eating ice cream in summer.', cn: '我喜欢在夏天吃冰淇淋。' }
    ],
    [
      { speaker: '👧 Helen', text: 'What is your favourite season?', cn: '你最喜欢什么季节？' },
      { speaker: '👦 Tim', text: 'I like winter. I can go skating.', cn: '我喜欢冬天。我能去滑冰。' },
      { speaker: '👧 Helen', text: 'I like spring. Flowers are beautiful.', cn: '我喜欢春天。花很漂亮。' },
      { speaker: '👦 Tim', text: 'Every season is fun.', cn: '每个季节都很有趣。' }
    ],
    [
      { en: 'favourite season', cn: '最喜欢的季节', emoji: '⭐' },
      { en: 'go skating', cn: '去滑冰', emoji: '⛸️' },
      { en: 'eat ice cream', cn: '吃冰淇淋', emoji: '🍦' },
      { en: 'beautiful flowers', cn: '美丽的花', emoji: '🌸' }
    ],
    [
      { en: 'What is your favourite ...?', cn: '询问最喜欢的事物' },
      { en: 'I like ... because ...', cn: '说明喜爱原因' },
      { en: 'We can ... in ...', cn: '表达某季节能做什么' },
      { en: 'in + 季节', cn: '在某个季节' }
    ],
    [
      { emoji: '🍂', q: 'autumn 是什么意思？', answer: '秋天', options: ['春天', '夏天', '秋天', '冬天'] },
      { q: '"What is your favourite season?" 意思是？', answer: '你最喜欢什么季节？', options: ['你喜欢天气吗？', '你最喜欢什么季节？', '今天什么季节？', '你会游泳吗？'] },
      { emoji: '⛸️', q: 'go skating 是什么意思？', answer: '去滑冰', options: ['去游泳', '去滑冰', '去爬山', '去划船'] }
    ],
  ),
  u('u8', 'Unit 8', 'Clothes 服装', '#7950f2',
    [
      { en: 'wear', cn: '穿，戴', emoji: '👕', ipa: '/weə(r)/' },
      { en: 'cap', cn: '(尤指有帽舌的)便帽', emoji: '🧢', ipa: '/kæp/' },
      { en: 'coat', cn: '外套，外衣', emoji: '🧥', ipa: '/kəʊt/' },
      { en: 'skirt', cn: '半身裙', emoji: '👗', ipa: '/skɜːt/' },
      { en: 'trousers', cn: '裤子', emoji: '👖', ipa: '/ˈtraʊzəz/' },
      { en: 'dress', cn: '连衣裙', emoji: '👗', ipa: '/dres/' },
      { en: 'shirt', cn: '(男式)衬衫', emoji: '👔', ipa: '/ʃɜːt/' },
      { en: 'whose', cn: '谁的', emoji: '❓', ipa: '/huːz/' },
      { en: 'shorts', cn: '短裤', emoji: '🩳', ipa: '/ʃɔːts/' },
      { en: 'look', cn: '看来好像，显得', emoji: '👀', ipa: '/lʊk/' },
      { en: 'in', cn: '穿着，戴着', emoji: '👕', ipa: '/ɪn/' },
      { en: 'sunglasses', cn: '太阳镜，墨镜', emoji: '🕶️', ipa: '/ˈsʌnɡlɑːsɪz/' },
      { en: 'why', cn: '为什么', emoji: '❓', ipa: '/waɪ/' },
      { en: 'because', cn: '因为', emoji: '📖', ipa: '/bɪˈkɒz/' },
      { en: 'bright', cn: '聪明的；明亮的', emoji: '💡', ipa: '/braɪt/' },
      { en: 'clothes', cn: '衣服', emoji: '👕', ipa: '/kləʊðz/' }
    ],
    [
      { en: 'What do you wear in winter?', cn: '你冬天穿什么？' },
      { en: 'I wear a coat and a scarf.', cn: '我穿外套，戴围巾。' },
      { en: 'What colour is your shirt?', cn: '你的衬衫是什么颜色？' },
      { en: 'Whose dress is this?', cn: '这是谁的连衣裙？' },
      { en: 'Why do you wear sunglasses?', cn: '你为什么戴太阳镜？' },
      { en: 'Because it\'s sunny.', cn: '因为天气晴朗。' },
      { en: 'You look bright in this shirt.', cn: '你穿这件衬衫看起来很精神。' }
    ],
    [
      { speaker: '👩 Mum', text: 'It is cold today. Wear your coat.', cn: '今天很冷。穿上你的外套。' },
      { speaker: '👧 Anna', text: 'OK. Where is my scarf?', cn: '好的。我的围巾在哪里？' },
      { speaker: '👩 Mum', text: 'It is on the chair.', cn: '它在椅子上。' },
      { speaker: '👧 Anna', text: 'Thank you. I\'m warm now.', cn: '谢谢。我现在暖和了。' }
    ],
    [
      { en: 'wear a coat', cn: '穿外套', emoji: '🧥' },
      { en: 'a red dress', cn: '一条红色连衣裙', emoji: '👗' },
      { en: 'in winter', cn: '在冬天', emoji: '❄️' },
      { en: 'bright clothes', cn: '鲜艳的衣服', emoji: '👕' }
    ],
    [
      { en: 'What do you wear ...?', cn: '询问穿着' },
      { en: 'Whose ... is this?', cn: '询问物品归属' },
      { en: 'Why ...? Because ...', cn: '询问原因和回答' },
      { en: 'look + 形容词', cn: '看起来……' }
    ],
    [
      { emoji: '🧥', q: 'coat 是什么意思？', answer: '外套', options: ['鞋子', '外套', '帽子', '裤子'] },
      { q: '"Why do you wear sunglasses?" 的回答应该用什么？', answer: 'Because', options: ['Yes', 'No', 'Because', 'And'] },
      { emoji: '👖', q: 'trousers 是什么意思？', answer: '裤子', options: ['衬衫', '连衣裙', '裤子', '鞋子'] }
    ],
  )
];

window.COURSE_GRAMMAR_GUIDE = [
  {
    title: '课程与喜好',
    icon: '📚',
    desc: '围绕 school subjects 和 like 的表达。',
    rules: [
      { title: '询问喜欢的课程', pattern: 'What subjects do you like?', cn: '你喜欢什么课程？', example: 'What subjects do you like? I like English and Science.' },
      { title: '表达喜欢', pattern: 'I like ...', cn: '我喜欢……', example: 'I like Music.' },
      { title: '一般疑问句', pattern: 'Do you like ...?', cn: '你喜欢……吗？', example: 'Do you like Maths? Yes, I do.' },
      { title: '课程安排', pattern: 'We have ...', cn: '我们有……课。', example: 'We have PE this afternoon.' },
      { title: '擅长某事', pattern: 'be good at', cn: '擅长……', example: 'I\'m good at Art.' }
    ]
  },
  {
    title: '时间表达',
    icon: '⏰',
    desc: '描述一天中的作息和几点做某事。',
    rules: [
      { title: '询问时间', pattern: 'When do you ...?', cn: '你什么时候……？', example: 'When do you get up?' },
      { title: '几点做某事', pattern: 'I ... at ...', cn: '我在……点做……', example: 'I get up at seven.' },
      { title: '一天中的时间段', pattern: 'in the morning / afternoon / evening', cn: '在早晨 / 下午 / 晚上', example: 'I do my homework in the evening.' },
      { title: '三餐表达', pattern: 'have breakfast / lunch / dinner', cn: '吃早饭 / 午饭 / 晚饭', example: 'I have lunch at twelve.' },
      { title: '到时间了', pattern: 'It\'s time for ... / It\'s time to ...', cn: '是……的时候了', example: 'It\'s time for class.' }
    ]
  },
  {
    title: '星期与日程',
    icon: '📆',
    desc: '询问星期几和某天做什么。',
    rules: [
      { title: '询问星期', pattern: 'What day is it today?', cn: '今天星期几？', example: 'What day is it today? It is Friday.' },
      { title: '星期前用 on', pattern: 'on Monday', cn: '在星期一。', example: 'We have a club on Friday.' },
      { title: '询问某天活动', pattern: 'What do you do on ...?', cn: '你在……做什么？', example: 'What do you do on Saturday?' },
      { title: '每一天', pattern: 'every day', cn: '每一天。', example: 'I read books every day.' },
      { title: '放学后', pattern: 'after school', cn: '放学后。', example: 'We play football after school.' }
    ]
  },
  {
    title: '能力 can',
    icon: '💪',
    desc: '询问和表达会不会做某项运动或活动。',
    rules: [
      { title: '询问能力', pattern: 'Can you ...?', cn: '你会……吗？', example: 'Can you play basketball?' },
      { title: '肯定回答', pattern: 'Yes, I can.', cn: '是的，我会。', example: 'Can you swim? Yes, I can.' },
      { title: '否定回答', pattern: 'No, I cannot.', cn: '不，我不会。', example: 'Can you skate? No, I cannot.' },
      { title: '鼓励尝试', pattern: 'Have a go! / Have a try.', cn: '试一试。', example: 'It is difficult. Have a go!' },
      { title: '赞美', pattern: 'Well played!', cn: '好球！', example: 'Well played! You are great.' }
    ]
  },
  {
    title: '身体与外貌',
    icon: '👤',
    desc: '描述身体部位和外貌特征。',
    rules: [
      { title: '身体部位', pattern: 'hair / eye / ear / nose / mouth', cn: '头发/眼睛/耳朵/鼻子/嘴巴', example: 'Her eyes are big.' },
      { title: '所有格', pattern: 'His / Her', cn: '他的 / 她的', example: 'His hair is short.' },
      { title: '外貌描述', pattern: 'tall / short / small', cn: '高的 / 矮的 / 小的', example: 'My doll is small.' },
      { title: '相同与不同', pattern: 'same / different', cn: '相同的 / 不同的', example: 'We look different.' }
    ]
  },
  {
    title: '天气表达',
    icon: '🌦️',
    desc: '询问和描述天气情况。',
    rules: [
      { title: '询问天气', pattern: 'What\'s the weather like?', cn: '天气怎么样？', example: 'What\'s the weather like today?' },
      { title: '描述天气', pattern: 'It is sunny / rainy / windy.', cn: '天气晴朗/下雨/有风。', example: 'It is sunny and warm.' },
      { title: '天气形容词', pattern: 'sunny / cloudy / rainy / windy / hot / cold / warm / cool', cn: '晴朗的/多云的/下雨的/有风的/热的/冷的/温暖的/凉爽的', example: 'It is hot in summer.' },
      { title: '建议', pattern: 'Take an umbrella.', cn: '带一把伞。', example: 'It is rainy. Take an umbrella.' }
    ]
  },
  {
    title: '季节与活动',
    icon: '🌈',
    desc: '谈论季节和各季节的活动。',
    rules: [
      { title: '询问最喜欢的季节', pattern: 'What is your favourite season?', cn: '你最喜欢什么季节？', example: 'What is your favourite season? I like spring.' },
      { title: '季节名称', pattern: 'spring / summer / autumn / winter', cn: '春天/夏天/秋天/冬天', example: 'Winter is cold.' },
      { title: '季节活动', pattern: 'go boating / swimming / skating / climbing', cn: '去划船/游泳/滑冰/爬山', example: 'We go swimming in summer.' },
      { title: '在某个季节', pattern: 'in spring', cn: '在春天。', example: 'Flowers bloom in spring.' }
    ]
  },
  {
    title: '服装表达',
    icon: '👕',
    desc: '谈论穿着和服装。',
    rules: [
      { title: '询问穿着', pattern: 'What do you wear?', cn: '你穿什么？', example: 'What do you wear in winter?' },
      { title: '穿衣服', pattern: 'wear a coat', cn: '穿外套', example: 'I wear a coat in winter.' },
      { title: '询问归属', pattern: 'Whose dress is this?', cn: '这是谁的连衣裙？', example: 'Whose shirt is this?' },
      { title: '原因表达', pattern: 'Why ...? Because ...', cn: '为什么……？因为……', example: 'Why do you wear sunglasses? Because it\'s sunny.' }
    ]
  }
];

window.COURSE_TIPS = {
  u1: {
    phonics: '<span class="tip-rule">字母组合 <strong>ch</strong> 在 Chinese 中发 /tʃ/ 音</span><span class="tip-example">Chinese /ˌtʃaɪˈniːz/</span><span class="tip-rule">字母组合 <strong>sc</strong> 在 Science 中发 /saɪ/ 音</span><span class="tip-rule">字母组合 <strong>su</strong> 在 subject 中发 /sʌ/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I like ... best.</strong> 表达最喜欢</span><span class="tip-rule"><strong>What subject do you like?</strong> 询问科目</span><span class="tip-rule"><strong>It\'s time for ...</strong> 是该……的时候了</span><span class="tip-rule"><strong>be good at</strong> 擅长</span>',
    memory: '制作一张<strong>课程表</strong>，用英语标注每天的课程名称。每天看看课程表说 <strong>It\'s time for ...</strong>，养成习惯。',
    culture: '英国小学通常有 <strong>Assembly（晨会）</strong>，全校一起唱歌、听故事。他们的科目还包括 <strong>RE（宗教教育）</strong>。'
  },
  u2: {
    phonics: '<span class="tip-rule">字母组合 <strong>ay</strong> 在 day 中发 /eɪ/ 双元音</span><span class="tip-example">day /deɪ/, play /pleɪ/</span><span class="tip-rule">字母组合 <strong>ea</strong> 在 breakfast 中发 /e/ 短音</span><span class="tip-rule">字母组合 <strong>oo</strong> 在 school 中发 /uː/ 长音</span>',
    grammar: '<span class="tip-rule"><strong>What time is it?</strong> 询问时间</span><span class="tip-rule"><strong>It\'s ... o\'clock.</strong> 整点表达</span><span class="tip-rule"><strong>I ... at ...</strong> 在某个时间做某事</span>',
    memory: '画一个<strong>时钟</strong>，标注英语时间表达。每天早晨用英语说 <strong>I get up at seven o\'clock.</strong> 描述自己的作息。',
    culture: '英国小学生一般 <strong>8:30-9:00</strong> 到校，下午 <strong>3:00-3:30</strong> 放学。放学后有很多 club（俱乐部）活动。'
  },
  u3: {
    phonics: '<span class="tip-rule">字母组合 <strong>ee</strong> 在 week 中发 /iː/ 长音</span><span class="tip-example">week /wiːk/</span><span class="tip-rule">字母组合 <strong>ur</strong> 在 Thursday 中发 /ɜː/ 音</span><span class="tip-rule">字母组合 <strong>or</strong> 在 Saturday 中发 /ɔː/ 音</span>',
    grammar: '<span class="tip-rule"><strong>What day is it today?</strong> 今天星期几？</span><span class="tip-rule"><strong>It\'s Monday / Tuesday / ...</strong></span><span class="tip-rule"><strong>on Monday</strong> 在周一（用介词 on）</span>',
    memory: '星期首字母必须<strong>大写</strong>！编口诀：<strong>Monday 忙，Tuesday 他，Wednesday 像座山（W像山），Thursday 渴（thirsty），Friday 飞（fly）</strong>。',
    culture: '英语国家把 <strong>Sunday（周日）</strong> 当作一周的第一天。Saturday 和 Sunday 合称 <strong>weekend（周末）</strong>。'
  },
  u4: {
    phonics: '<span class="tip-rule">字母组合 <strong>sp</strong> 在 sport 中发 /sp/ 音</span><span class="tip-example">sport /spɔːt/</span><span class="tip-rule">字母组合 <strong>sk</strong> 在 skate 中发 /sk/ 音</span><span class="tip-rule">字母组合 <strong>oo</strong> 在 football 中发 /ʊ/ 短音</span>',
    grammar: '<span class="tip-rule"><strong>I like ...</strong> 表达喜好</span><span class="tip-rule"><strong>Can you ...?</strong> 询问能力</span><span class="tip-rule"><strong>Let\'s ...</strong> 提议一起做</span><span class="tip-rule"><strong>Have a go!</strong> 鼓励尝试</span>',
    memory: '边做运动动作边说英语：<strong>I can play football!</strong> 看体育比赛时用英语描述运动名称。做运动海报，配上英语标签。',
    culture: '<strong>Football（足球）</strong>是英国最受欢迎的运动。<strong>Cricket（板球）</strong>也是英国传统运动，在中国不太常见哦！'
  },
  u5: {
    phonics: '<span class="tip-rule">字母组合 <strong>ey</strong> 在 eye 中发 /aɪ/ 音</span><span class="tip-example">eye /aɪ/</span><span class="tip-rule">字母组合 <strong>ou</strong> 在 mouth 中发 /aʊ/ 音</span><span class="tip-rule">字母组合 <strong>ea</strong> 在 ear 中发 /ɪə/ 音</span>',
    grammar: '<span class="tip-rule"><strong>This is my / his / her ...</strong> 介绍身体部位</span><span class="tip-rule"><strong>My ... is / are ...</strong> 描述身体特征</span><span class="tip-rule"><strong>His / Her ... is / are ...</strong></span>',
    memory: '玩 <strong>"Head, Shoulders, Knees and Toes"</strong> 歌曲，边唱边指身体部位。画一个卡通人物，用英语标注每个身体部位名称。',
    culture: '英语儿歌 <strong>"Head, Shoulders, Knees and Toes"</strong> 是小朋友学身体部位的经典歌曲，全世界英语课堂都在唱！'
  },
  u6: {
    phonics: '<span class="tip-rule">字母组合 <strong>ea</strong> 在 weather 中发 /e/ 音</span><span class="tip-example">weather /ˈweðə/</span><span class="tip-rule">字母组合 <strong>nn</strong> 在 sunny 中发 /n/ 音</span><span class="tip-rule">字母 <strong>w</strong> 在 wind 中发 /w/ 音</span>',
    grammar: '<span class="tip-rule"><strong>What\'s the weather like?</strong> 天气怎么样？</span><span class="tip-rule"><strong>It\'s sunny / rainy / windy / cloudy.</strong></span><span class="tip-rule"><strong>Take an umbrella.</strong> 带把伞</span>',
    memory: '每天早上看窗外，用英语描述天气：<strong>It\'s sunny today!</strong> 画天气日记，每天画一个天气图标并写上英语句子。',
    culture: '英国人以<strong>谈论天气</strong>出名！因为英国天气变化很快，一天可能经历四季。所以英国人出门常带 <strong>umbrella（雨伞）</strong>。'
  },
  u7: {
    phonics: '<span class="tip-rule">字母组合 <strong>ing</strong> 在 spring 中发 /ɪŋ/ 鼻音</span><span class="tip-example">spring /sprɪŋ/</span><span class="tip-rule">字母组合 <strong>mm</strong> 在 summer 中发 /m/ 音</span><span class="tip-rule">字母组合 <strong>au</strong> 在 autumn 中发 /ɔː/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I like ...</strong> 表达最喜欢的季节</span><span class="tip-rule"><strong>We go ... in ...</strong> 在某季做某事</span><span class="tip-rule"><strong>in spring / summer / autumn / winter</strong></span>',
    memory: '画<strong>四季图</strong>：把纸分成四格，每格画一个季节和活动，写上英语句子。用 <strong>go + 动词ing</strong> 记住户外活动：go swimming, go skating。',
    culture: '英国四季分明：<strong>spring</strong> 花开，<strong>summer</strong> 日照长，<strong>autumn</strong> 落叶，<strong>winter</strong> 有时下雪。圣诞节在 winter！'
  },
  u8: {
    phonics: '<span class="tip-rule">字母组合 <strong>ea</strong> 在 sweater 中发 /e/ 音</span><span class="tip-example">sweater /ˈswetə/</span><span class="tip-rule">字母组合 <strong>wh</strong> 在 whose 中发 /h/ 音</span><span class="tip-rule">字母组合 <strong>gl</strong> 在 sunglasses 中发 /ɡl/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I wear ...</strong> 我穿……</span><span class="tip-rule"><strong>Whose ... is this?</strong> 这是谁的？</span><span class="tip-rule"><strong>Why ...? Because ...</strong> 问答原因</span>',
    memory: '打开衣柜，用英语说出每件衣服名称。玩"服装店"游戏：一人当店员，一人当顾客，练习 <strong>I wear ...</strong> 和 <strong>Whose ...?</strong>',
    culture: '英国学校很多有 <strong>school uniform（校服）</strong>，通常包括白衬衫、深色裤子和校徽领带。学生每天必须穿校服上学。'
  }
};
