export type Localized = Record<string, string>;

export type ProjectKind = 'web' | 'mobile' | 'cli';

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
  /** Phone screenshots render narrower, inside a device frame. */
  phone?: boolean;
}

export interface ProjectFeature {
  title: Localized;
  body: Localized;
  images: ProjectImage[];
}

export interface ProjectNote {
  title: Localized;
  body: Localized;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  year: string;
  status: Localized;
  title: Localized;
  /** One line that says what is unusual about the project. Shown first. */
  tagline: Localized;
  description: Localized;
  cover: ProjectImage;
  demoUrl?: string;
  demoNote?: Localized;
  codeUrl?: string;
  tags: string[];
  idea: Localized;
  features: ProjectFeature[];
  engineering: ProjectNote[];
}

export const projects: Project[] = [
  {
    id: 'dawn-radio',
    kind: 'web',
    year: '2026',
    status: { en: 'Live', fr: 'En ligne', 'zh-CN': '已上线' },
    title: { en: 'Dawn Radio', fr: 'Dawn Radio', 'zh-CN': 'Dawn Radio' },
    tagline: {
      en: 'A radio drama that hears you talk back.',
      fr: 'Un feuilleton radio qui vous entend répondre.',
      'zh-CN': '一部能听见你回话的广播剧。',
    },
    description: {
      en: 'A live radio drama for language learners. Characters handle an emergency in French over a walkie-talkie. Hold the talk key to join in, and the story changes.',
      fr: `Un feuilleton radio en direct pour apprendre une langue. Des personnages gèrent une urgence en français sur un talkie-walkie. Maintenez la touche pour parler et l'histoire change.`,
      'zh-CN':
        '为语言学习者打造的实时广播剧。角色们通过对讲机用法语处理一场紧急事件。按住通话键加入对话，故事随之改变。',
    },
    cover: {
      src: '/Images/dawn_radio.jpg',
      width: 1712,
      height: 963,
      alt: {
        en: 'Three views of the Dawn Radio walkie-talkie',
        fr: 'Trois vues du talkie-walkie Dawn Radio',
        'zh-CN': 'Dawn Radio 对讲机的三个界面',
      },
      caption: {
        en: 'Left to right: tap any word to see what it means in that sentence, hold the talk key to speak in French or English, and open the full transcript.',
        fr: `De gauche à droite : touchez un mot pour voir son sens dans la phrase, maintenez la touche pour parler en français ou en anglais, et ouvrez la transcription complète.`,
        'zh-CN': '从左到右：点任意一个词查看它在句中的意思；按住通话键用法语或英语说话；打开完整对话记录。',
      },
    },
    demoUrl: 'https://dawn-radio.pages.dev',
    codeUrl: 'https://github.com/dong0085/dawn_radio',
    tags: ['React 19', 'TypeScript', 'Claude API', 'ElevenLabs', 'Web Audio', 'Cloudflare'],
    idea: {
      en: `Language apps drill you on tidy sentences. Real listening is messy: people talk fast, over static, about something urgent. Dawn Radio puts you on that channel. Claude writes the story as you listen and ElevenLabs voices it. When you speak, the characters answer you and repeat your message back in correct French, the way radio operators confirm a call.`,
      fr: `Les applis de langues font répéter des phrases bien propres. La vraie écoute est plus brouillonne : les gens parlent vite, dans le grésillement, d'une chose urgente. Dawn Radio vous place sur ce canal. Claude écrit l'histoire pendant que vous écoutez, ElevenLabs lui donne une voix. Quand vous parlez, les personnages vous répondent et répètent votre message en français correct, comme le font les opérateurs radio.`,
      'zh-CN':
        '语言类应用总让你操练工整的句子，而真实的听力是杂乱的：人们语速很快、夹着杂音、谈论着紧急的事。Dawn Radio 把你带进这样的频道。Claude 在你收听时实时编写剧情，ElevenLabs 为它配音。你开口说话时，角色会回应你，并像无线电操作员确认呼叫那样，用正确的法语复述你的话。',
    },
    features: [
      {
        title: {
          en: 'Subtitles that follow the voice',
          fr: 'Des sous-titres qui suivent la voix',
          'zh-CN': '跟着声音走的字幕',
        },
        body: {
          en: 'Each word lights up as it is spoken. Beside the radio, a field log tracks people, places, finds, and hazards as the story reveals them.',
          fr: `Chaque mot s'allume quand il est prononcé. À côté de la radio, un journal de terrain suit les personnes, les lieux, les découvertes et les dangers au fil de l'histoire.`,
          'zh-CN':
            '每个词在说出时亮起。对讲机旁的现场日志会随着剧情推进，记录人物、地点、发现和危险。',
        },
        images: [
          {
            src: '/projects/dawn-radio/hero.jpg',
            width: 1400,
            height: 1464,
            alt: {
              en: 'A French line playing on the radio, with the field log open beside it',
              fr: 'Une réplique en français sur la radio, avec le journal de terrain ouvert à côté',
              'zh-CN': '对讲机正在播放一句法语台词，旁边展开着现场日志',
            },
          },
        ],
      },
      {
        title: {
          en: 'Built for phones too',
          fr: 'Pensé aussi pour le téléphone',
          'zh-CN': '手机上同样好用',
        },
        body: {
          en: `The radio scales to fit any screen. On a phone, the field log moves inside the radio's screen. Touch, mouse, and keyboard all work.`,
          fr: `La radio s'adapte à tous les écrans. Sur téléphone, le journal de terrain passe à l'intérieur de l'écran de la radio. Tactile, souris et clavier fonctionnent tous.`,
          'zh-CN':
            '对讲机会按屏幕大小缩放。在手机上，现场日志会移到对讲机屏幕里。触屏、鼠标和键盘都能操作。',
        },
        images: [
          {
            src: '/projects/dawn-radio/mobile.jpg',
            width: 1600,
            height: 1126,
            alt: {
              en: 'Standby, a line playing, and the field log on a phone',
              fr: 'Veille, une réplique en cours et le journal de terrain sur téléphone',
              'zh-CN': '手机上的待机、播放台词和现场日志画面',
            },
          },
        ],
      },
    ],
    engineering: [
      {
        title: {
          en: 'Streaming at every step',
          fr: 'Du streaming à chaque étape',
          'zh-CN': '每一步都在流式传输',
        },
        body: {
          en: `Claude's tokens, each finished line, and the voice audio all stream. A small scanner pulls each line out of half-written JSON, so the first voice starts before the rest is written.`,
          fr: `Les jetons de Claude, chaque réplique terminée et l'audio sont tous diffusés en continu. Un petit analyseur extrait chaque réplique d'un JSON à moitié écrit : la première voix démarre avant que le reste soit écrit.`,
          'zh-CN':
            'Claude 的输出、每一句写好的台词和配音音频全部流式传输。一个小解析器从写到一半的 JSON 里逐句取出台词，所以第一句配音会在其余内容写完前就开始播放。',
        },
      },
      {
        title: {
          en: 'Safe on a public URL',
          fr: 'Sûr sur une URL publique',
          'zh-CN': '公开网址也安全',
        },
        body: {
          en: 'The server only accepts known story IDs, so visitors cannot send their own prompts. What a player says is treated as part of the story, never as instructions. Every route has per-visitor rate limits.',
          fr: `Le serveur n'accepte que des identifiants d'histoire connus : impossible d'envoyer ses propres prompts. Ce que dit le joueur fait partie de l'histoire, jamais des instructions. Chaque route a une limite par visiteur.`,
          'zh-CN':
            '服务器只接受已知的剧情 ID，访客无法发送自己的提示词。玩家说的话只被当作剧情的一部分，绝不会被当作指令。每个接口都按访客限流。',
        },
      },
      {
        title: {
          en: 'It sounds like a real radio',
          fr: 'Le son d’une vraie radio',
          'zh-CN': '听起来像真的对讲机',
        },
        body: {
          en: 'A Web Audio chain adds a band-pass filter, distortion, hiss, and squelch. Each end of the channel has its own background: cave drips, control-room hum, rain.',
          fr: `Une chaîne Web Audio ajoute filtre passe-bande, distorsion, souffle et squelch. Chaque bout du canal a son ambiance : gouttes dans la grotte, ronron de la salle de contrôle, pluie.`,
          'zh-CN':
            '一条 Web Audio 处理链加上了带通滤波、失真、底噪和静噪声。频道两端各有自己的环境音：洞穴滴水、控制室的嗡鸣、雨声。',
        },
      },
    ],
  },
  {
    id: 'ten-minutes-review',
    kind: 'web',
    year: '2026',
    status: { en: 'Live', fr: 'En ligne', 'zh-CN': '已上线' },
    title: {
      en: 'Ten Minutes Review',
      fr: 'Révision en dix minutes',
      'zh-CN': '十分钟复习',
    },
    tagline: {
      en: `Your tutor's notes come back as a quiz every morning.`,
      fr: 'Vos notes de cours reviennent chaque matin sous forme de quiz.',
      'zh-CN': '辅导课的笔记，每天早上变成一份小测验。',
    },
    description: {
      en: 'Turns tutoring notes, typed or photographed, into a fresh daily quiz that fits inside ten minutes. Answers stay on the server until you submit.',
      fr: `Transforme les notes de cours, saisies ou photographiées, en un quiz quotidien de dix minutes. Les réponses restent sur le serveur jusqu'à la soumission.`,
      'zh-CN':
        '把辅导笔记（打字或拍照）变成每天十分钟的新鲜小测验。提交前，答案始终保留在服务器端。',
    },
    cover: {
      src: '/projects/ten-minutes-review/hero.jpg',
      width: 1800,
      height: 1077,
      alt: {
        en: 'Ten Minutes Review landing page: keep every language lesson with a ten-minute quiz',
        fr: `Page d'accueil de Ten Minutes Review : gardez chaque leçon de langue grâce à un quiz de dix minutes`,
        'zh-CN': '十分钟复习首页：用十分钟测验留住每一节语言课',
      },
    },
    demoUrl: 'https://tenminutesreview.study',
    demoNote: {
      en: 'Invite code: dev-invite',
      fr: `Code d'invitation : dev-invite`,
      'zh-CN': '邀请码：dev-invite',
    },
    codeUrl: 'https://github.com/dong0085/ten-minutes-review',
    tags: ['Next.js 16', 'React 19', 'Postgres', 'Drizzle ORM', 'LLM pipeline'],
    idea: {
      en: 'After a lesson with a tutor, the notes go into a notebook and rarely come out again. Ten Minutes Review keeps them working. Paste a recap or snap a photo of handwritten notes, and each morning you get a short quiz built from what you just learned, mixed with light retests of older lessons. There are no streaks to protect. It is made to fit around real life.',
      fr: `Après un cours particulier, les notes finissent dans un cahier et n'en ressortent presque jamais. Ten Minutes Review les fait travailler. Collez un résumé ou photographiez vos notes manuscrites : chaque matin, vous recevez un court quiz tiré de ce que vous venez d'apprendre, avec quelques rappels des leçons passées. Pas de série à protéger. L'outil s'adapte à la vraie vie.`,
      'zh-CN':
        '上完辅导课，笔记往往被收进本子，再也不会翻开。十分钟复习让这些笔记继续发挥作用。粘贴课后总结或拍下手写笔记，每天早上你会收到一份短小的测验，内容来自刚学的知识，并穿插少量旧课复习。没有需要守护的连续打卡，它为真实生活而设计。',
    },
    features: [
      {
        title: {
          en: 'From notes to a question bank',
          fr: 'Des notes à une banque de questions',
          'zh-CN': '从笔记到题库',
        },
        body: {
          en: 'A background worker pulls vocabulary, phrases, grammar, and short reading passages out of each lesson. Fifteen uploads of real tutoring notes became 137 points to review, sorted by type.',
          fr: `Un processus en arrière-plan extrait de chaque leçon le vocabulaire, les expressions, la grammaire et de courts textes. Quinze envois de vraies notes de cours ont donné 137 points à réviser, classés par type.`,
          'zh-CN':
            '后台任务从每节课中提取词汇、短语、语法和短篇阅读。十五次上传的真实辅导笔记，变成了按类型整理好的 137 个复习点。',
        },
        images: [
          {
            src: '/projects/ten-minutes-review/bank.jpg',
            width: 1800,
            height: 1125,
            alt: {
              en: 'The question bank: 137 points, filtered by vocabulary, phrases, grammar, ideas, and comprehension',
              fr: 'La banque de questions : 137 points, filtrés par vocabulaire, expressions, grammaire, idées et compréhension',
              'zh-CN': '题库：137 个知识点，可按词汇、短语、语法、表达和阅读理解筛选',
            },
          },
        ],
      },
      {
        title: {
          en: 'Every answer explained',
          fr: 'Chaque réponse expliquée',
          'zh-CN': '每道题都有解析',
        },
        body: {
          en: 'Answers stay on the server until you submit. Then each one sits next to the right answer, with a short explanation and a link back to the note it came from. Retakes reshuffle the options: this quiz went from 9 to 14 out of 15 over three tries.',
          fr: `Les réponses restent sur le serveur jusqu'à la soumission. Ensuite, chacune s'affiche à côté de la bonne, avec une courte explication et un lien vers la note d'origine. Les options sont remélangées à chaque reprise : ce quiz est passé de 9 à 14 sur 15 en trois essais.`,
          'zh-CN':
            '提交之前，答案始终留在服务器端。提交后，每道题的作答与正确答案并排显示，附上简短解析和回到原始笔记的链接。重做时选项会重新打乱：这份测验三次作答，从 9/15 提高到 14/15。',
        },
        images: [
          {
            src: '/projects/ten-minutes-review/results.jpg',
            width: 1800,
            height: 1125,
            alt: {
              en: 'Quiz results: 14 out of 15 correct, with the lesson notes the quiz was built from',
              fr: 'Résultats : 14 sur 15, avec les notes de cours dont le quiz est tiré',
              'zh-CN': '测验结果：15 题答对 14 题，并列出出题所用的课堂笔记',
            },
          },
          {
            src: '/projects/ten-minutes-review/explanations.jpg',
            width: 1800,
            height: 1125,
            alt: {
              en: 'A wrong answer next to the correct one, with an explanation and a link back to the notes',
              fr: 'Une mauvaise réponse à côté de la bonne, avec une explication et un lien vers les notes',
              'zh-CN': '错误答案与正确答案并排显示，附解析和回到笔记的链接',
            },
          },
        ],
      },
      {
        title: {
          en: 'Made for real learners',
          fr: 'Pensé pour de vrais apprenants',
          'zh-CN': '为真实的学习者而做',
        },
        body: {
          en: 'No streaks to protect. Between terms you can pause daily quizzes, and your notes, history, and on-demand quizzes stay ready for when lessons start again.',
          fr: `Pas de série à protéger. Entre deux sessions, on peut mettre les quiz quotidiens en pause : notes, historique et quiz à la demande restent prêts pour la reprise des cours.`,
          'zh-CN':
            '没有需要守护的连续打卡。学期之间可以暂停每日测验，笔记、历史记录和随时生成的测验都会保留，等课程恢复时继续使用。',
        },
        images: [
          {
            src: '/projects/ten-minutes-review/classroom.jpg',
            width: 1800,
            height: 1125,
            alt: {
              en: 'A classroom with daily quizzes paused, an on-demand quiz, and a longer check-in',
              fr: 'Une classe avec les quiz quotidiens en pause, un quiz à la demande et un bilan plus long',
              'zh-CN': '暂停了每日测验的课堂页面，可随时生成测验或进行更长的阶段检测',
            },
          },
        ],
      },
    ],
    engineering: [
      {
        title: {
          en: 'The web app never waits for the AI',
          fr: `L'appli web n'attend jamais l'IA`,
          'zh-CN': '网页从不等待 AI',
        },
        body: {
          en: 'A request writes a job to Postgres and returns right away. A separate worker claims the job, retries it safely, and records the result.',
          fr: `Une requête écrit une tâche dans Postgres et répond tout de suite. Un worker séparé prend la tâche, la relance sans risque et enregistre le résultat.`,
          'zh-CN':
            '请求只把任务写入 Postgres 就立即返回。独立的 worker 领取任务、安全重试，并记录结果。',
        },
      },
      {
        title: {
          en: 'One adapter per service',
          fr: 'Un adaptateur par service',
          'zh-CN': '每个服务一个适配器',
        },
        body: {
          en: 'The language model, email, and image storage each sit behind one adapter. Local development runs on a mock AI and console email, so it needs no accounts.',
          fr: `Le modèle de langue, l'e-mail et le stockage d'images ont chacun leur adaptateur. En local, une IA factice et des e-mails dans la console : aucun compte requis.`,
          'zh-CN':
            '语言模型、邮件和图片存储各自隐藏在一个适配器后面。本地开发使用模拟 AI 和控制台邮件，不需要任何账号。',
        },
      },
      {
        title: {
          en: 'Notes from any page',
          fr: `Des notes depuis n'importe quelle page`,
          'zh-CN': '从任何网页添加笔记',
        },
        body: {
          en: 'A browser extension, published on Firefox Add-ons, saves selected text as a note. The interface and emails work in English, French, and Chinese.',
          fr: `Une extension de navigateur, publiée sur Firefox Add-ons, enregistre le texte sélectionné comme note. L'interface et les e-mails existent en anglais, français et chinois.`,
          'zh-CN':
            '浏览器扩展已上架 Firefox 附加组件商店，可把选中的文字存为笔记。界面和邮件支持英语、法语和中文。',
        },
      },
    ],
  },
  {
    id: 'plume',
    kind: 'cli',
    year: '2026',
    status: {
      en: 'CLI in use · web and mobile apps in planning',
      fr: 'CLI utilisée · applis web et mobile en préparation',
      'zh-CN': '命令行版可用 · 网页与移动端规划中',
    },
    title: { en: 'Plume', fr: 'Plume', 'zh-CN': 'Plume' },
    tagline: {
      en: 'Learn French by typing out the classics.',
      fr: 'Apprendre le français en recopiant les classiques.',
      'zh-CN': '通过打出法语经典名著来学法语。',
    },
    description: {
      en: 'Type a passage from a classic French novel, see exactly which words and accents you got right, then get a short lesson from Claude about what you just typed.',
      fr: `Tapez un passage d'un grand roman français, voyez précisément les mots et accents réussis, puis recevez de Claude une courte leçon sur ce que vous venez de taper.`,
      'zh-CN':
        '打出一段法国经典小说的原文，清楚看到哪些词和重音符号打对了，然后由 Claude 针对你刚打的内容讲一堂小课。',
    },
    cover: {
      src: '/projects/plume/cover.jpg',
      width: 1712,
      height: 963,
      alt: {
        en: 'Plume in a terminal, checking a typed passage from Les Misérables',
        fr: 'Plume dans un terminal, vérifiant un passage des Misérables',
        'zh-CN': '终端里的 Plume 正在检查一段《悲惨世界》的输入',
      },
      caption: {
        en: 'A real session from Les Misérables. Plume lines up the typing with the original: correct words turn green, and each slip shows what was typed next to the right word.',
        fr: `Une vraie session sur Les Misérables. Plume aligne la saisie avec l'original : les mots justes passent au vert, et chaque faute montre ce qui a été tapé à côté du bon mot.`,
        'zh-CN': '一次真实的《悲惨世界》练习。Plume 把输入和原文逐词对齐：打对的词变绿，打错的词会把输入内容和正确写法并排显示。',
      },
    },
    codeUrl: 'https://github.com/dong0085/plume',
    tags: ['Python', 'Claude API', 'Rich', 'uv', 'Project Gutenberg'],
    idea: {
      en: 'Typing a sentence makes you notice every accent, every silent letter, every unusual tense. Plume builds on that. It picks a random passage from Hugo, Flaubert, Zola, Verne, Proust, and others (public domain, from Project Gutenberg), checks your typing word by word, and has Claude write a lesson about that exact passage, including your own mistakes.',
      fr: `Taper une phrase oblige à remarquer chaque accent, chaque lettre muette, chaque temps rare. Plume part de là. Il choisit un passage au hasard chez Hugo, Flaubert, Zola, Verne, Proust et d'autres (domaine public, via le projet Gutenberg), vérifie votre saisie mot par mot, et Claude écrit une leçon sur ce passage précis, y compris vos propres erreurs.`,
      'zh-CN':
        '亲手打一句话，会让你注意到每个重音符号、每个不发音的字母、每个少见的时态。Plume 正是利用这一点。它从雨果、福楼拜、左拉、凡尔纳、普鲁斯特等作家的作品中（公有领域，来自古腾堡计划）随机挑一段，逐词检查你的输入，再由 Claude 针对这段原文写一堂课，连你的打字错误也一并讲解。',
    },
    features: [
      {
        title: {
          en: 'A lesson about this exact passage',
          fr: 'Une leçon sur ce passage précis',
          'zh-CN': '只讲这一段的小课',
        },
        body: {
          en: `Claude translates the passage, picks the words worth keeping (with false friends flagged), and explains the grammar Hugo uses here, like the passé antérieur in "Quand il eut doublé…".`,
          fr: `Claude traduit le passage, retient les mots utiles (faux amis signalés) et explique la grammaire qu'utilise Hugo, comme le passé antérieur de « Quand il eut doublé… ».`,
          'zh-CN':
            'Claude 翻译这段原文，挑出值得记住的词（并标出“假朋友”），讲解雨果在这里用到的语法，比如 “Quand il eut doublé…” 中的先过去时。',
        },
        images: [
          {
            src: '/projects/plume/lesson.jpg',
            width: 1800,
            height: 1733,
            alt: {
              en: 'The lesson: meaning, words worth keeping, and a grammar spotlight',
              fr: 'La leçon : sens, mots à retenir et point de grammaire',
              'zh-CN': '小课内容：释义、值得记住的词和语法重点',
            },
          },
        ],
      },
      {
        title: {
          en: 'Ask anything after',
          fr: 'Posez vos questions ensuite',
          'zh-CN': '课后随时提问',
        },
        body: {
          en: 'Follow-up questions keep the passage in context. Type /l to hear it read by a French voice. Sessions are saved, so --resume picks one up again.',
          fr: `Les questions de suivi gardent le passage en contexte. Tapez /l pour l'entendre lu par une voix française. Les sessions sont enregistrées : --resume en reprend une.`,
          'zh-CN':
            '追问时会保留这段原文作为上下文。输入 /l 可以听法语语音朗读。练习会自动保存，用 --resume 即可继续。',
        },
        images: [
          {
            src: '/projects/plume/followup.jpg',
            width: 1800,
            height: 1001,
            alt: {
              en: 'A follow-up question about the verb form "eut"',
              fr: 'Une question de suivi sur la forme verbale « eut »',
              'zh-CN': '关于动词形式 “eut” 的追问',
            },
          },
        ],
      },
    ],
    engineering: [
      {
        title: {
          en: 'Accent-aware matching',
          fr: 'Une comparaison qui comprend les accents',
          'zh-CN': '懂重音的比对',
        },
        body: {
          en: 'Words are compared with accents stripped first, so a missing accent counts as an accent slip, not a wrong word. The two texts are aligned, so one skipped word does not throw off the rest.',
          fr: `Les mots sont d'abord comparés sans accents : un accent oublié compte comme une faute d'accent, pas comme un mot faux. Les deux textes sont alignés, donc un mot sauté ne décale pas la suite.`,
          'zh-CN':
            '比对时先去掉重音再匹配，所以漏掉重音只算重音错误，不算错词。两段文字会先对齐，漏打一个词也不会影响后面的判断。',
        },
      },
      {
        title: {
          en: 'One file, no setup',
          fr: 'Un seul fichier, sans installation',
          'zh-CN': '一个文件，无需配置',
        },
        body: {
          en: 'A single Python script with its dependencies declared inline; uv installs them on first run. Lessons come from the Claude API, or from the Claude Code CLI when there is no API key.',
          fr: `Un seul script Python qui déclare ses dépendances ; uv les installe au premier lancement. Les leçons viennent de l'API Claude, ou de la CLI Claude Code sans clé d'API.`,
          'zh-CN':
            '整个工具只是一个 Python 脚本，依赖直接写在文件里，首次运行时由 uv 自动安装。小课来自 Claude API；没有 API 密钥时改用 Claude Code 命令行。',
        },
      },
      {
        title: {
          en: 'Next: web and mobile',
          fr: 'Ensuite : web et mobile',
          'zh-CN': '下一步：网页和移动端',
        },
        body: {
          en: 'Plume is growing into a web app and an iOS and Android app, with the specs written first. The CLI stays as the reference for the text rules.',
          fr: `Plume devient une appli web et une appli iOS et Android, en commençant par les spécifications. La CLI reste la référence pour les règles de texte.`,
          'zh-CN':
            'Plume 正在发展为网页应用和 iOS、Android 应用，先写规格说明再动手。命令行版继续作为文本规则的参考实现。',
        },
      },
    ],
  },
  {
    id: 'recipes',
    kind: 'web',
    year: '2026',
    status: {
      en: 'In daily use',
      fr: 'Utilisé tous les jours',
      'zh-CN': '每天都在用',
    },
    title: {
      en: 'Recipe Archive',
      fr: 'Archive de recettes',
      'zh-CN': '食谱档案',
    },
    tagline: {
      en: 'Plain text files that read like a cookbook on your phone.',
      fr: 'Des fichiers texte qui se lisent comme un livre de cuisine sur téléphone.',
      'zh-CN': '纯文本文件，在手机上读起来像一本食谱书。',
    },
    description: {
      en: 'My personal recipe archive. Each recipe is a Markdown file. A terminal tool finds them, and a tiny Python site shows them on a phone in the kitchen.',
      fr: `Mon archive personnelle de recettes. Chaque recette est un fichier Markdown. Un outil en ligne de commande les retrouve, et un petit site Python les affiche sur le téléphone, en cuisine.`,
      'zh-CN':
        '我的私人食谱档案。每道菜是一个 Markdown 文件。终端工具负责查找，一个小小的 Python 网站把它们显示在厨房里的手机上。',
    },
    cover: {
      src: '/projects/recipes/cover.jpg',
      width: 1712,
      height: 963,
      alt: {
        en: 'Three phone screens of the recipe archive: the list, a recipe, and search in dark mode',
        fr: `Trois écrans de l'archive : la liste, une recette et la recherche en mode sombre`,
        'zh-CN': '食谱档案的三个手机界面：列表、菜谱页和深色模式搜索',
      },
      caption: {
        en: 'The archive, a recipe in progress, and search in dark mode.',
        fr: `L'archive, une recette en cours et la recherche en mode sombre.`,
        'zh-CN': '档案首页、正在做的菜谱，以及深色模式下的搜索。',
      },
    },
    codeUrl: 'https://github.com/dong0085/recipes',
    tags: ['Python', 'Bash', 'Markdown', 'PWA', 'OpenAI Images'],
    idea: {
      en: 'Recipe sites bury the steps under ads and life stories. I wanted my recipes in plain text files I own, readable at the stove with messy hands. The same folder works two ways: from the terminal, and as a website on the home Wi-Fi that a phone can add to its home screen.',
      fr: `Les sites de recettes noient les étapes sous la pub et les anecdotes. Je voulais mes recettes dans des fichiers texte à moi, lisibles devant les fourneaux, les mains sales. Le même dossier sert de deux façons : depuis le terminal, et comme site sur le Wi-Fi de la maison, à ajouter à l'écran d'accueil du téléphone.`,
      'zh-CN':
        '食谱网站总把步骤埋在广告和长篇故事下面。我想把自己的菜谱存成自己掌控的纯文本文件，站在灶台前、手上沾着面粉也能看清。同一个文件夹有两种用法：在终端里查，或者作为家里 Wi-Fi 上的小网站，添加到手机主屏幕。',
    },
    features: [
      {
        title: {
          en: 'An archive, not a feed',
          fr: 'Une archive, pas un fil',
          'zh-CN': '是档案，不是信息流',
        },
        body: {
          en: `Each recipe gets a number and an "added" date taken from git history. Search by dish or ingredient, and sort A–Z or newest first.`,
          fr: `Chaque recette reçoit un numéro et une date d'ajout tirés de l'historique git. Recherche par plat ou ingrédient, tri de A à Z ou par nouveauté.`,
          'zh-CN':
            '每道菜的编号和“添加日期”都取自 git 历史。可以按菜名或食材搜索，按字母或最新排序。',
        },
        images: [
          {
            src: '/projects/recipes/home.jpg',
            width: 780,
            height: 1688,
            phone: true,
            alt: {
              en: 'The archive home page with numbered recipe cards',
              fr: `L'accueil de l'archive avec des recettes numérotées`,
              'zh-CN': '带编号菜谱卡片的档案首页',
            },
          },
        ],
      },
      {
        title: {
          en: 'Cross things off as you cook',
          fr: 'Rayez au fil de la cuisson',
          'zh-CN': '边做边划掉',
        },
        body: {
          en: 'Tap an ingredient or a step to cross it off. The page remembers until you clear it. The A\u00a0A button makes the text bigger, for reading from across the counter.',
          fr: `Touchez un ingrédient ou une étape pour le rayer. La page s'en souvient jusqu'à ce que vous effaciez. Le bouton A\u00a0A agrandit le texte pour lire de l'autre bout du plan de travail.`,
          'zh-CN':
            '点一下食材或步骤就能划掉，页面会一直记住，直到你清除。A\u00a0A 按钮可以放大字体，隔着料理台也能看清。',
        },
        images: [
          {
            src: '/projects/recipes/recipe.jpg',
            width: 780,
            height: 1688,
            phone: true,
            alt: {
              en: 'Lentil soup with finished steps crossed off',
              fr: 'Soupe de lentilles avec les étapes faites rayées',
              'zh-CN': '扁豆汤菜谱，已完成的步骤被划掉',
            },
          },
          {
            src: '/projects/recipes/recipe-dark.jpg',
            width: 780,
            height: 1688,
            phone: true,
            alt: {
              en: 'A recipe page in dark mode',
              fr: 'Une recette en mode sombre',
              'zh-CN': '深色模式下的菜谱页',
            },
          },
        ],
      },
    ],
    engineering: [
      {
        title: {
          en: 'Nothing to install',
          fr: 'Rien à installer',
          'zh-CN': '无需安装任何依赖',
        },
        body: {
          en: 'The site uses only the Python standard library, with its own small Markdown converter. Pages are built from the files on each request, so an edit shows up on refresh.',
          fr: `Le site n'utilise que la bibliothèque standard de Python, avec son propre petit convertisseur Markdown. Les pages sont générées à chaque requête : une modification apparaît au rechargement.`,
          'zh-CN':
            '网站只用 Python 标准库，自带一个小型 Markdown 转换器。每次请求都从文件实时生成页面，改完刷新就能看到。',
        },
      },
      {
        title: {
          en: 'Matching photos',
          fr: 'Des photos assorties',
          'zh-CN': '风格统一的配图',
        },
        body: {
          en: 'Every photo is made with the OpenAI image API from the same art direction, so the whole set looks like one shoot. One command makes photos for any recipe that has none.',
          fr: `Chaque photo est créée avec l'API d'images d'OpenAI selon la même direction artistique : l'ensemble semble issu d'une seule séance. Une commande crée les photos manquantes.`,
          'zh-CN':
            '每张图片都用 OpenAI 图像 API 按同一套美术指导生成，整组看起来像同一次拍摄。一条命令就能为没有配图的菜谱补图。',
        },
      },
      {
        title: {
          en: 'Terminal first',
          fr: `Le terminal d'abord`,
          'zh-CN': '终端优先',
        },
        body: {
          en: '"recipes bread" shows a recipe, and when several match, fzf lets you pick. new, edit, search, serve, and photos cover the rest.',
          fr: `« recipes bread » affiche une recette ; si plusieurs correspondent, fzf permet de choisir. new, edit, search, serve et photos font le reste.`,
          'zh-CN':
            '输入 “recipes bread” 就能显示菜谱，匹配到多个时用 fzf 选择。new、edit、search、serve 和 photos 覆盖其余操作。',
        },
      },
    ],
  },
];

export const webProjects = projects.filter((project) => project.kind === 'web');
export const mobileProjects = projects.filter(
  (project) => project.kind === 'mobile',
);
export const cliProjects = projects.filter((project) => project.kind === 'cli');

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function pick(value: Localized, lang: string) {
  return value[lang] ?? value.en;
}
