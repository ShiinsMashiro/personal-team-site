const reveals = document.querySelectorAll(".reveal");
const memberCards = document.querySelectorAll(".member-poster");
const gearCards = document.querySelectorAll(".gear-poster");
const memberModal = document.querySelector("#member-modal");
const modalName = document.querySelector("#member-modal-name");
const modalRole = document.querySelector("#member-modal-role");
const modalText = document.querySelector("#member-modal-text");
const modalCloseTargets = document.querySelectorAll("[data-close-modal='true']");
const gearModal = document.querySelector("#gear-modal");
const gearModalName = document.querySelector("#gear-modal-name");
const gearModalRole = document.querySelector("#gear-modal-role");
const gearModalText = document.querySelector("#gear-modal-text");
const gearModalVisual = document.querySelector("#gear-modal-visual");
const gearModalCloseTargets = document.querySelectorAll("[data-close-gear-modal='true']");
const bgmAudio = document.querySelector("#bgm-audio");
const bgmToggle = document.querySelector("#bgm-toggle");
const pageTopBtn = document.querySelector("#page-top-btn");
const langButtons = document.querySelectorAll(".lang-btn");
const interactivePanels = document.querySelectorAll(
  ".showcase-intro, .feature-copy, .product-panel, .spotlight-panel, .gear-card, .member-card, .metric"
);
const pageSections = Array.from(document.querySelectorAll("main > section.reveal"));
const siteHeader = document.querySelector(".site-header");
const sliderGrids = document.querySelectorAll(".slider-grid[data-slider]");
const metaDescription = document.querySelector("#meta-description");
const storySlides = Array.from(document.querySelectorAll("[data-story-slide]"));
const storyPrev = document.querySelector("#story-prev");
const storyNext = document.querySelector("#story-next");
const bgmSources = {
  zh: "./source/audio/bgm.mp3",
  en: "./source/audio/bgm.mp3",
};

let currentLanguage = localStorage.getItem("etu-language") || "en";
let currentMemberKey = null;
let currentGearKey = null;
let currentStorySlide = 2;
const storySlideOrder = [2, 1, 0];
let storyAutoAdvanceTimer = null;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const content = {
  zh: {
    htmlLang: "zh-CN",
    title: "Explore The Unseen | 徒步团队展示",
    description: "Explore The Unseen 的徒步团队展示网站，以冷峻克制的叙事方式呈现成员、征服地点、装备与路线方法。",
    bgmOn: "BGM 开",
    bgmOff: "BGM 关",
    pageNext: "下一页",
    sliderPrev: "上一组",
    sliderNext: "下一组",
    modalClose: "关闭",
    brand: "Explore The Unseen",
    navStory: "团队",
    navPlans: "未来计划",
    navHistory: "过往履历",
    navGear: "装备",
    navMembers: "成员",
    navContact: "联系",
    heroEyebrow:
      '<span class="hero-brand-top">EXPLORE</span><span class="hero-brand-bottom"><span>THE</span><span>UNSEEN</span></span>',
    heroTitle: "去那些尚未被语言完全命名的地方。",
    heroText: "冷静进入未知。<br />克制抵达高处。",
    heroButtonPlans: "查看计划",
    heroButtonMembers: "成员档案",
    screenTopline: "Explore The Unseen",
    screenTitle: "命名之外，<br />仍有海拔。",
    screenGrid1: "7 位成员",
    screenGrid2: "4 个目标",
    screenGrid3: "下一次上升",
    storyEyebrow: "",
    storyTitle: "TEAM",
    storyText: "",
    storyEyebrowMid: "",
    storyTitleMid: "<span class=\"title-accent\">P</span>IONEER",
    storyTextMid: "",
    storyEyebrow2: "",
    storyTitle2: "<span class=\"title-accent\">N</span>EW TEAM",
    storyText2: "",
    plansEyebrow: "未来计划",
    plansTitle: "下一座山，<br />决定当下准备。",
    plan1Name: "秦岭",
    plan1Title: "主计划。",
    plan1Text: "纵深山系，连续判断。",
    plan2Name: "黄山",
    plan2Title: "高密度景观。",
    plan2Text: "复杂起伏，重新配速。",
    plan3Name: "武功山反穿",
    plan3Title: "重写熟悉路线。",
    plan3Text: "反穿节奏，持续推进。",
    plan4Name: "华山",
    plan4Title: "进入险峻地形。",
    plan4Text: "稳定动作，稳定判断。",
    historyEyebrow: "过往履历",
    historyTitle: "走过的地方，<br />只为下一次出发作证。",
    historyText: "它们不是终点，只是方法的记录。",
    history1Title: "金华大盘尖穿越",
    history1Text: "古道、山脊、长距离推进。",
    history2Title: "杭州爱心线",
    history2Text: "城市边缘，连续起伏，考验节奏。",
    history3Title: "长白山",
    history3Text: "高海拔、火山地貌、气候切换。",
    gearEyebrow: "装备系统",
    gearTitle: "装备，是行动系统。",
    gear1Name: "核心装备",
    gear1Title: "基础行动系统。",
    gear1Text: "基础配置。",
    gear2Name: "安全装备",
    gear2Title: "风险冗余系统。",
    gear2Text: "风险冗余。",
    gear3Name: "环境对应",
    gear3Title: "环境适配系统。",
    gear3Text: "环境切换。",
    gear4Name: "补给系统",
    gear4Title: "续航管理系统。",
    gear4Text: "续航系统。",
    membersEyebrow: "成员档案",
    membersTitle: "七个人。七种能力。一个系统。",
    member1Name: "谢弘毅",
    member1Role: "领队主轴 / 公职气质的秩序建立者",
    member2Name: "陈云哲",
    member2Role: "负重管理 / 装备与状态的双重维护者",
    member3Name: "黄涂健隆",
    member3Role: "影像记录 / 技术与情趣的提炼者",
    member4Name: "姜伟杨",
    member4Role: "补给安全 / 稳定续航的守护者",
    member5Name: "徐丹宁",
    member5Role: "伟大的教育家 / 徐校长",
    member6Name: "富贵",
    member6Role: "开疆扩土的先锋 / 最忠诚的卫士",
    member7Name: "李昕怡",
    member7Role: "氛围管家 / 团队活力的调节者",
    metricValue1: "眼里是山，",
    metricValue2: "那就不好走。",
    metricValue3: "眼里是景，",
    metricValue4: "就好走。",
    metric1: "",
    metric2: "",
    metric3: "",
    contactEyebrow: "联系",
    contactTitle: "联系 <span class=\"brand-accent\">Explore The Unseen</span>。",
    contactText: "",
    contactWechat: "微信：htjl17706403360",
    memberModalLabel: "成员档案",
    gearModalLabel: "装备详情",
    memberDetails: {
      xie: {
        name: "谢弘毅",
        role: "领队主轴 / 公职气质的秩序建立者",
        text: "负责判断、节奏与关键决策。",
      },
      chen: {
        name: "陈云哲",
        role: "负重管理 / 装备与状态的双重维护者",
        text: "负责负重、装备与状态管理。",
      },
      huang: {
        name: "黄涂健隆",
        role: "影像记录 / 技术与情趣的提炼者",
        text: "负责影像记录与内容输出。",
      },
      jiang: {
        name: "姜伟杨",
        role: "补给安全 / 稳定续航的守护者",
        text: "负责补给、照应与续航稳定。",
      },
      placeholder1: {
        name: "徐丹宁",
        role: "伟大的教育家 / 徐校长",
        text: "以教育者的判断与定力，为团队提供另一种稳定的秩序感。",
      },
      placeholder2: {
        name: "富贵",
        role: "开疆扩土的先锋 / 最忠诚的卫士",
        text: "承担开路、陪伴与守望的角色，是队伍里最直接也最忠诚的存在。",
      },
      placeholder3: {
        name: "李昕怡",
        role: "氛围管家 / 团队活力的调节者",
        text: "负责沟通、激励与氛围调节，让队伍在行进中保持稳定的情绪与活力。",
      },
    },
    gearDetails: {
      core: {
        name: "核心装备",
        role: "长线徒步基础配置",
        text: "稳定推进的基础配置。",
      },
      safety: {
        name: "安全装备",
        role: "应急与风险冗余",
        text: "为风险和意外预留余量。",
      },
      weather: {
        name: "环境对应装备",
        role: "根据天气和地形切换",
        text: "应对温差、风况与地形切换。",
      },
      supply: {
        name: "补给系统",
        role: "补水、补盐、补能量方案",
        text: "维持体能、补水与后程判断。",
      },
    },
  },
  en: {
    htmlLang: "en",
    title: "Explore The Unseen | Hiking Team",
    description: "A restrained hiking team site for Explore The Unseen, presenting members, completed routes, gear systems, and future ascents.",
    bgmOn: "BGM On",
    bgmOff: "BGM Off",
    pageNext: "Next section",
    sliderPrev: "Previous",
    sliderNext: "Next",
    modalClose: "Close",
    brand: "Explore The Unseen",
    navStory: "Team",
    navPlans: "Plans",
    navHistory: "History",
    navGear: "Gear",
    navMembers: "Members",
    navContact: "Contact",
    heroEyebrow:
      '<span class="hero-brand-top">EXPLORE</span><span class="hero-brand-bottom"><span>THE</span><span>UNSEEN</span></span>',
    heroTitle: "Go where language has not finished naming.",
    heroText: "Enter the unknown calmly.<br />Reach higher with restraint.",
    heroButtonPlans: "View plans",
    heroButtonMembers: "Member files",
    screenTopline: "Explore The Unseen",
    screenTitle: "Beyond the named trail,<br />there is still<br />altitude.",
    screenGrid1: "7 Members",
    screenGrid2: "4 Targets",
    screenGrid3: "Next Ascent",
    storyEyebrow: "",
    storyTitle: "TEAM",
    storyText: "",
    storyEyebrowMid: "",
    storyTitleMid: "<span class=\"title-accent\">P</span>IONEER",
    storyTextMid: "",
    storyEyebrow2: "",
    storyTitle2: "<span class=\"title-accent\">N</span>EW TEAM",
    storyText2: "",
    plansEyebrow: "Future Plans",
    plansTitle: "The next mountain<br />shapes the preparation.",
    plan1Name: "Qinling",
    plan1Title: "Primary objective.",
    plan1Text: "Deep mountain system. Continuous judgment.",
    plan2Name: "Huangshan",
    plan2Title: "Dense visual terrain.",
    plan2Text: "Complex elevation. Reset the pace.",
    plan3Name: "Wugongshan Reverse Traverse",
    plan3Title: "Rewrite a familiar route.",
    plan3Text: "Reverse rhythm. Sustained progress.",
    plan4Name: "Huashan",
    plan4Title: "Enter exposed terrain.",
    plan4Text: "Steady movement. Steady decisions.",
    historyEyebrow: "Completed Routes",
    historyTitle: "Past routes are proof<br />for the next departure.",
    historyText: "Not endpoints. Just records of method.",
    history1Title: "Jinhua Dapanjian Traverse",
    history1Text: "Old trails, ridgelines, long movement.",
    history2Title: "Hangzhou Heart Line",
    history2Text: "Urban edge. Rolling climbs. Rhythm test.",
    history3Title: "Changbai Mountain",
    history3Text: "Altitude, volcanic terrain, weather shift.",
    gearEyebrow: "Gear Setup",
    gearTitle: "Gear is the operating system.",
    gear1Name: "Core Gear",
    gear1Title: "Base movement system.",
    gear1Text: "Core setup.",
    gear2Name: "Safety Gear",
    gear2Title: "Risk redundancy system.",
    gear2Text: "Risk buffer.",
    gear3Name: "Weather Response",
    gear3Title: "Environmental adaptation.",
    gear3Text: "Terrain shift.",
    gear4Name: "Supply System",
    gear4Title: "Endurance management.",
    gear4Text: "Sustainment.",
    membersEyebrow: "Team Members",
    membersTitle: "Seven people. Seven capabilities. One system.",
    member1Name: "Xie Hongyi",
    member1Role: "Lead axis / Builder of order",
    member2Name: "Chen Yunzhe",
    member2Role: "Load control / Keeper of gear and condition",
    member3Name: "Huang Tujianlong",
    member3Role: "Image record / Interpreter of technique and tone",
    member4Name: "Jiang Weiyang",
    member4Role: "Supply and safety / Guardian of steady endurance",
    member5Name: "Xu Danning",
    member5Role: "Great Educator / Principal Xu",
    member6Name: "Fugui",
    member6Role: "Pioneer of expansion / Most loyal guardian",
    member7Name: "Li Xinyi",
    member7Role: "Atmosphere steward / Regulator of team energy",
    metricValue1: "Eyes on the mountain,",
    metricValue2: "and the walk gets hard.",
    metricValue3: "Eyes on the view,",
    metricValue4: "and it goes easier.",
    metric1: "",
    metric2: "",
    metric3: "",
    contactEyebrow: "Contact",
    contactTitle: "Contact <span class=\"brand-accent\">Explore The Unseen</span>.",
    contactText: "",
    contactWechat: "WeChat: htjl17706403360",
    memberModalLabel: "Team Member",
    gearModalLabel: "Gear Details",
    memberDetails: {
      xie: {
        name: "Xie Hongyi",
        role: "Lead axis / Builder of order",
        text: "Leads judgment, pace, and key decisions.",
      },
      chen: {
        name: "Chen Yunzhe",
        role: "Load control / Keeper of gear and condition",
        text: "Handles load, gear, and condition.",
      },
      huang: {
        name: "Huang Tujianlong",
        role: "Image record / Interpreter of technique and tone",
        text: "Handles photography and route record.",
      },
      jiang: {
        name: "Jiang Weiyang",
        role: "Supply and safety / Guardian of steady endurance",
        text: "Handles supply, support, and endurance.",
      },
      placeholder1: {
        name: "Xu Danning",
        role: "Great Educator / Principal Xu",
        text: "Brings the steadiness and clarity of an educator into the team's field rhythm.",
      },
      placeholder2: {
        name: "Fugui",
        role: "Pioneer of expansion / Most loyal guardian",
        text: "Carries the energy of a pathfinder and the instinct of a constant guardian.",
      },
      placeholder3: {
        name: "Li Xinyi",
        role: "Atmosphere steward / Regulator of team energy",
        text: "Handles communication, motivation, and mood, keeping the team steady and alive on the move.",
      },
    },
    gearDetails: {
      core: {
        name: "Core Gear",
        role: "Base setup for long-distance hiking",
        text: "Base setup for steady movement.",
      },
      safety: {
        name: "Safety Gear",
        role: "Emergency and risk redundancy",
        text: "Buffer for risk and disruption.",
      },
      weather: {
        name: "Environmental Response Gear",
        role: "Switch with weather and terrain",
        text: "Built for weather and terrain shifts.",
      },
      supply: {
        name: "Supply System",
        role: "Hydration, salt, and energy plan",
        text: "Built for hydration, fuel, and late-stage control.",
      },
    },
  },
};

const gearVisuals = {
  core: "linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.46)), url('./source/gears/core.jpg')",
  safety: "linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.46)), url('./source/gears/safety.jpg')",
  weather: "linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.46)), url('./source/gears/weather.jpg')",
  supply: "linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.46)), url('./source/gears/supply.jpeg')",
};

const setText = (id, value, html = false) => {
  const node = document.getElementById(id);
  if (!node || value == null) {
    return;
  }
  if (html) {
    node.innerHTML = value;
  } else {
    node.textContent = value;
  }
};

const syncBgmSource = async (lang) => {
  if (!bgmAudio) {
    return;
  }

  const nextSource = bgmSources[lang] || bgmSources.en;
  if (bgmAudio.dataset.src === nextSource) {
    return;
  }

  const shouldResume = !bgmAudio.paused;
  bgmAudio.pause();
  bgmAudio.src = nextSource;
  bgmAudio.dataset.src = nextSource;
  bgmAudio.load();

  if (shouldResume) {
    try {
      await bgmAudio.play();
    } catch {
      setBgmState(false);
    }
  }
};

const applyLanguage = async (lang) => {
  const copy = content[lang] || content.zh;
  currentLanguage = lang;
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  if (metaDescription) {
    metaDescription.setAttribute("content", copy.description);
  }

  setText("brand-text", copy.brand);
  setText("nav-story", copy.navStory);
  setText("nav-plans", copy.navPlans);
  setText("nav-history", copy.navHistory);
  setText("nav-gear", copy.navGear);
  setText("nav-members", copy.navMembers);
  setText("nav-contact", copy.navContact);
  setText("hero-eyebrow", copy.heroEyebrow, true);
  setText("hero-title", copy.heroTitle, true);
  setText("hero-text", copy.heroText, true);
  setText("hero-button-plans", copy.heroButtonPlans);
  setText("hero-button-members", copy.heroButtonMembers);
  setText("screen-topline", copy.screenTopline);
  setText("screen-title", copy.screenTitle, true);
  setText("screen-grid-1", copy.screenGrid1);
  setText("screen-grid-2", copy.screenGrid2);
  setText("screen-grid-3", copy.screenGrid3);
  setText("story-eyebrow", copy.storyEyebrow);
  setText("story-title", copy.storyTitle, true);
  setText("story-text", copy.storyText);
  setText("story-eyebrow-mid", copy.storyEyebrowMid);
  setText("story-title-mid", copy.storyTitleMid, true);
  setText("story-text-mid", copy.storyTextMid);
  setText("story-eyebrow-2", copy.storyEyebrow2);
  setText("story-title-2", copy.storyTitle2, true);
  setText("story-text-2", copy.storyText2);
  setText("plans-eyebrow", copy.plansEyebrow);
  setText("plans-title", copy.plansTitle, true);
  setText("plan-1-name", copy.plan1Name);
  setText("plan-1-title", copy.plan1Title);
  setText("plan-1-text", copy.plan1Text);
  setText("plan-2-name", copy.plan2Name);
  setText("plan-2-title", copy.plan2Title);
  setText("plan-2-text", copy.plan2Text);
  setText("plan-3-name", copy.plan3Name);
  setText("plan-3-title", copy.plan3Title);
  setText("plan-3-text", copy.plan3Text);
  setText("plan-4-name", copy.plan4Name);
  setText("plan-4-title", copy.plan4Title);
  setText("plan-4-text", copy.plan4Text);
  setText("history-eyebrow", copy.historyEyebrow);
  setText("history-title", copy.historyTitle, true);
  setText("history-text", copy.historyText);
  setText("history-1-title", copy.history1Title);
  setText("history-1-text", copy.history1Text);
  setText("history-2-title", copy.history2Title);
  setText("history-2-text", copy.history2Text);
  setText("history-3-title", copy.history3Title);
  setText("history-3-text", copy.history3Text);
  setText("gear-eyebrow", copy.gearEyebrow);
  setText("gear-title", copy.gearTitle);
  setText("gear-1-name", copy.gear1Name);
  setText("gear-1-title", copy.gear1Title);
  setText("gear-1-text", copy.gear1Text);
  setText("gear-2-name", copy.gear2Name);
  setText("gear-2-title", copy.gear2Title);
  setText("gear-2-text", copy.gear2Text);
  setText("gear-3-name", copy.gear3Name);
  setText("gear-3-title", copy.gear3Title);
  setText("gear-3-text", copy.gear3Text);
  setText("gear-4-name", copy.gear4Name);
  setText("gear-4-title", copy.gear4Title);
  setText("gear-4-text", copy.gear4Text);
  setText("members-eyebrow", copy.membersEyebrow);
  setText("members-title", copy.membersTitle);
  setText("member-1-name", copy.member1Name);
  setText("member-1-role", copy.member1Role);
  setText("member-2-name", copy.member2Name);
  setText("member-2-role", copy.member2Role);
  setText("member-3-name", copy.member3Name);
  setText("member-3-role", copy.member3Role);
  setText("member-4-name", copy.member4Name);
  setText("member-4-role", copy.member4Role);
  setText("member-5-name", copy.member5Name);
  setText("member-5-role", copy.member5Role);
  setText("member-6-name", copy.member6Name);
  setText("member-6-role", copy.member6Role);
  setText("member-7-name", copy.member7Name);
  setText("member-7-role", copy.member7Role);
  setText("metric-value-1", copy.metricValue1);
  setText("metric-value-2", copy.metricValue2);
  setText("metric-value-3", copy.metricValue3);
  setText("metric-value-4", copy.metricValue4);
  setText("metric-1", copy.metric1);
  setText("metric-2", copy.metric2);
  setText("metric-3", copy.metric3);
  setText("contact-eyebrow", copy.contactEyebrow);
  setText("contact-title", copy.contactTitle, true);
  setText("contact-text", copy.contactText);
  setText("contact-wechat", copy.contactWechat);
  setText("member-modal-role-label", copy.memberModalLabel);
  setText("gear-modal-label", copy.gearModalLabel);

  document.querySelectorAll(".page-next-btn").forEach((btn) => {
    btn.setAttribute("aria-label", copy.pageNext);
  });
  if (storyPrev) {
    storyPrev.setAttribute("aria-label", copy.sliderPrev);
  }
  if (storyNext) {
    storyNext.setAttribute("aria-label", copy.sliderNext);
  }
  document.querySelectorAll(".slider-control.prev").forEach((btn) => {
    btn.setAttribute("aria-label", copy.sliderPrev);
  });
  document.querySelectorAll(".slider-control.next").forEach((btn) => {
    btn.setAttribute("aria-label", copy.sliderNext);
  });
  document.querySelectorAll(".member-modal-close, .gear-modal-close").forEach((btn) => {
    btn.setAttribute("aria-label", copy.modalClose);
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  if (currentMemberKey) {
    openMemberModal(currentMemberKey);
  }
  if (currentGearKey) {
    openGearModal(currentGearKey);
  }
  syncBgmSource(lang);
  setBgmState(Boolean(bgmAudio && !bgmAudio.paused));
  localStorage.setItem("etu-language", lang);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((section, index) => {
  section.style.transitionDelay = `${index * 90}ms`;
  observer.observe(section);
});

const openMemberModal = (memberKey) => {
  const details = content[currentLanguage].memberDetails[memberKey];

  if (!details || !memberModal || !modalName || !modalRole || !modalText) {
    return;
  }

  currentMemberKey = memberKey;
  modalName.textContent = details.name;
  modalRole.textContent = details.role;
  modalText.textContent = details.text;
  memberModal.classList.add("is-open");
  memberModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeMemberModal = () => {
  if (!memberModal) {
    return;
  }

  currentMemberKey = null;
  memberModal.classList.remove("is-open");
  memberModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const openGearModal = (gearKey) => {
  const details = content[currentLanguage].gearDetails[gearKey];

  if (!details || !gearModal || !gearModalName || !gearModalRole || !gearModalText || !gearModalVisual) {
    return;
  }

  currentGearKey = gearKey;
  gearModalName.textContent = details.name;
  gearModalRole.textContent = details.role;
  gearModalText.textContent = details.text;
  gearModalVisual.style.backgroundImage = gearVisuals[gearKey];
  gearModal.classList.add("is-open");
  gearModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeGearModal = () => {
  if (!gearModal) {
    return;
  }

  currentGearKey = null;
  gearModal.classList.remove("is-open");
  gearModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

memberCards.forEach((card) => {
  card.addEventListener("click", () => {
    openMemberModal(card.dataset.member);
  });
});

gearCards.forEach((card) => {
  card.addEventListener("click", () => {
    openGearModal(card.dataset.gear);
  });
});

modalCloseTargets.forEach((target) => {
  target.addEventListener("click", closeMemberModal);
});

gearModalCloseTargets.forEach((target) => {
  target.addEventListener("click", closeGearModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMemberModal();
    closeGearModal();
  }
});

const setBgmState = (isOn) => {
  if (!bgmToggle) {
    return;
  }

  const copy = content[currentLanguage] || content.zh;
  bgmToggle.classList.toggle("is-on", isOn);
  bgmToggle.setAttribute("aria-pressed", String(isOn));
  bgmToggle.textContent = isOn ? copy.bgmOn : copy.bgmOff;
};

const tryPlayBgm = async () => {
  if (!bgmAudio) {
    return false;
  }

  try {
    await bgmAudio.play();
    setBgmState(true);
    return true;
  } catch {
    setBgmState(false);
    return false;
  }
};

if (bgmToggle && bgmAudio) {
  bgmAudio.src = bgmSources[currentLanguage] || bgmSources.en;
  bgmAudio.dataset.src = bgmSources[currentLanguage] || bgmSources.en;
  setBgmState(false);

  bgmToggle.addEventListener("click", async () => {
    try {
      if (bgmAudio.paused) {
        await tryPlayBgm();
      } else {
        bgmAudio.pause();
        setBgmState(false);
      }
    } catch {
      setBgmState(false);
    }
  });

  window.addEventListener(
    "load",
    async () => {
      await tryPlayBgm();
    },
    { once: true }
  );

  const unlockBgmOnFirstInteraction = async () => {
    const started = await tryPlayBgm();
    if (started) {
      window.removeEventListener("pointerdown", unlockBgmOnFirstInteraction);
      window.removeEventListener("keydown", unlockBgmOnFirstInteraction);
      window.removeEventListener("wheel", unlockBgmOnFirstInteraction);
      window.removeEventListener("touchstart", unlockBgmOnFirstInteraction);
    }
  };

  window.addEventListener("pointerdown", unlockBgmOnFirstInteraction, { passive: true });
  window.addEventListener("keydown", unlockBgmOnFirstInteraction, { passive: true });
  window.addEventListener("wheel", unlockBgmOnFirstInteraction, { passive: true });
  window.addEventListener("touchstart", unlockBgmOnFirstInteraction, { passive: true });
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang || "zh");
  });
});

const bindPointerGlow = (element, tilt = false) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--mx", `${x}%`);
    element.style.setProperty("--my", `${y}%`);

    if (tilt) {
      const rotateY = ((x - 50) / 50) * 5;
      const rotateX = ((50 - y) / 50) * 4;
      element.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  element.addEventListener("pointerleave", () => {
    element.style.removeProperty("--mx");
    element.style.removeProperty("--my");

    if (tilt) {
      element.style.transform = "";
    }
  });
};

interactivePanels.forEach((panel) => {
  bindPointerGlow(panel, false);
});

const isAnyModalOpen = () => {
  const memberOpen = memberModal && memberModal.classList.contains("is-open");
  const gearOpen = gearModal && gearModal.classList.contains("is-open");
  return memberOpen || gearOpen;
};

const getCenteredScrollTop = (section) => {
  const rect = section.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
  const usableViewport = window.innerHeight - headerHeight;
  const centeredTop =
    absoluteTop - Math.max(0, (usableViewport - section.offsetHeight) / 2) - headerHeight * 0.5;
  const maxTop = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(centeredTop, maxTop));
};

const scrollToSection = (index) => {
  const target = pageSections[index];
  if (!target) {
    return;
  }

  if (index === 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  window.scrollTo({
    top: getCenteredScrollTop(target),
    behavior: "smooth",
  });
};

const updatePageTopButton = () => {
  if (!pageTopBtn) {
    return;
  }

  pageTopBtn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
};

const resetToTopOnEntry = () => {
  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });
  window.setTimeout(() => {
    window.scrollTo(0, 0);
  }, 80);
  window.setTimeout(() => {
    window.scrollTo(0, 0);
  }, 220);
};

const getCurrentSectionIndex = () => {
  const viewportCenter = window.scrollY + window.innerHeight / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  pageSections.forEach((section, index) => {
    const sectionCenter = window.scrollY + section.getBoundingClientRect().top + section.offsetHeight / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

const renderStorySlides = () => {
  if (!storySlides.length) {
    return;
  }

  storySlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentStorySlide);
  });
};

const getStoryOrderIndex = () => {
  const index = storySlideOrder.indexOf(currentStorySlide);
  return index === -1 ? 0 : index;
};

const goToNextStorySlide = () => {
  const nextOrderIndex = (getStoryOrderIndex() + 1) % storySlideOrder.length;
  currentStorySlide = storySlideOrder[nextOrderIndex];
  renderStorySlides();
};

const goToPrevStorySlide = () => {
  const prevOrderIndex = (getStoryOrderIndex() - 1 + storySlideOrder.length) % storySlideOrder.length;
  currentStorySlide = storySlideOrder[prevOrderIndex];
  renderStorySlides();
};

const resetStoryAutoAdvance = () => {
  if (storyAutoAdvanceTimer) {
    window.clearInterval(storyAutoAdvanceTimer);
  }

  if (!storySlides.length) {
    return;
  }

  storyAutoAdvanceTimer = window.setInterval(() => {
    goToNextStorySlide();
  }, 5000);
};

pageSections.forEach((section, index) => {
  if (index >= pageSections.length - 1) {
    return;
  }

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "page-next-btn";
  btn.setAttribute("aria-label", content[currentLanguage].pageNext);
  btn.addEventListener("click", () => {
    scrollToSection(index + 1);
  });
  section.appendChild(btn);
});

if (storyPrev && storyNext && storySlides.length) {
  storyPrev.addEventListener("click", () => {
    goToPrevStorySlide();
    resetStoryAutoAdvance();
  });

  storyNext.addEventListener("click", () => {
    goToNextStorySlide();
    resetStoryAutoAdvance();
  });

  renderStorySlides();
  resetStoryAutoAdvance();
}

if (storySlides.length) {
  const storySlider = document.querySelector("#story-slider");
  let storyTouchStartX = 0;
  let storyTouchEndX = 0;

  if (storySlider) {
    storySlider.addEventListener(
      "touchstart",
      (event) => {
        storyTouchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    storySlider.addEventListener(
      "touchend",
      (event) => {
        storyTouchEndX = event.changedTouches[0].screenX;
        const diff = storyTouchStartX - storyTouchEndX;
        const threshold = 40;

        if (diff > threshold) {
          goToNextStorySlide();
          resetStoryAutoAdvance();
        } else if (diff < -threshold) {
          goToPrevStorySlide();
          resetStoryAutoAdvance();
        }
      },
      { passive: true }
    );
  }
}

sliderGrids.forEach((grid) => {
  const cards = Array.from(grid.children);
  if (cards.length <= 3) {
    return;
  }

  const shell = grid.closest(".slider-shell");
  if (!shell) {
    return;
  }

  let index = 0;
  const isMembersSlider = grid.dataset.slider === "members";
  const isLoopingSlider = true;
  const baseCards = [...cards];
  const cloneCount = isMembersSlider ? Math.min(3, baseCards.length) : 0;

  if (isMembersSlider && cloneCount > 0) {
    const headClones = baseCards.slice(0, cloneCount).map((card) => card.cloneNode(true));
    const tailClones = baseCards.slice(-cloneCount).map((card) => card.cloneNode(true));
    headClones.forEach((clone) => grid.appendChild(clone));
    tailClones.reverse().forEach((clone) => grid.insertBefore(clone, grid.firstChild));
  }

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "slider-control prev";
  prev.setAttribute("aria-label", content[currentLanguage].sliderPrev);
  prev.textContent = "‹";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "slider-control next";
  next.setAttribute("aria-label", content[currentLanguage].sliderNext);
  next.textContent = "›";

  const getVisibleCount = () => (window.innerWidth <= 980 ? 1 : 3);

  const setGridTransition = (enabled) => {
    grid.style.transition = enabled ? "" : "none";
  };

  const render = () => {
    const visible = getVisibleCount();
    const maxIndex = isMembersSlider
      ? Math.max(0, baseCards.length - 1)
      : Math.max(0, baseCards.length - visible);
    const gap = parseFloat(window.getComputedStyle(grid).columnGap || window.getComputedStyle(grid).gap || "20");
    const shellWidth = shell.clientWidth;
    const cardWidth = (shellWidth - gap * (visible - 1)) / visible;
    if (!isMembersSlider) {
      index = Math.min(index, maxIndex);
    }
    const visualIndex = isMembersSlider ? index + cloneCount : index;
    grid.style.setProperty("--visible-cards", String(visible));
    grid.style.setProperty("--card-gap", `${gap}px`);
    grid.style.setProperty("--card-width-px", `${cardWidth}px`);
    grid.style.setProperty("--slide-index", String(visualIndex));
    prev.disabled = !isLoopingSlider && index <= 0;
    next.disabled = !isLoopingSlider && index >= maxIndex;
  };

  prev.addEventListener("click", () => {
    const visible = getVisibleCount();
    const maxIndex = isMembersSlider
      ? Math.max(0, baseCards.length - 1)
      : Math.max(0, baseCards.length - visible);
    if (isLoopingSlider) {
      index = isMembersSlider ? index - 1 : index <= 0 ? maxIndex : index - 1;
    } else {
      index -= 1;
    }
    setGridTransition(true);
    render();
  });

  next.addEventListener("click", () => {
    const visible = getVisibleCount();
    const maxIndex = isMembersSlider
      ? Math.max(0, baseCards.length - 1)
      : Math.max(0, baseCards.length - visible);
    if (isLoopingSlider) {
      index = isMembersSlider ? index + 1 : index >= maxIndex ? 0 : index + 1;
    } else {
      index += 1;
    }
    setGridTransition(true);
    render();
  });

  if (isMembersSlider) {
    grid.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "transform") {
        return;
      }

      const visible = getVisibleCount();
      const maxIndex = Math.max(0, baseCards.length - 1);

      if (index < 0) {
        index = maxIndex;
      } else if (index > maxIndex) {
        index = 0;
      } else {
        return;
      }

      setGridTransition(false);
      render();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setGridTransition(true);
        });
      });
    });
  }

  shell.appendChild(prev);
  shell.appendChild(next);
  setGridTransition(true);
  render();
  window.addEventListener("resize", render);

  // 触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;

  shell.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  shell.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    const visible = getVisibleCount();
    const maxIndex = isMembersSlider
      ? Math.max(0, baseCards.length - 1)
      : Math.max(0, baseCards.length - visible);

    if (diff > threshold) {
      if (isLoopingSlider) {
        index = isMembersSlider ? index + 1 : index >= maxIndex ? 0 : index + 1;
        setGridTransition(true);
        render();
      } else if (index < maxIndex) {
        index += 1;
        render();
      }
    } else if (diff < -threshold) {
      if (isLoopingSlider) {
        index = isMembersSlider ? index - 1 : index <= 0 ? maxIndex : index - 1;
        setGridTransition(true);
        render();
      } else if (index > 0) {
        index -= 1;
        render();
      }
    }
  }, { passive: true });
});

let lastWheelAt = 0;
window.addEventListener(
  "wheel",
  (event) => {
    if (isAnyModalOpen()) {
      return;
    }

    if (Math.abs(event.deltaY) < 18) {
      return;
    }

    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelAt < 700) {
      return;
    }
    lastWheelAt = now;

    const current = getCurrentSectionIndex();
    const direction = event.deltaY > 0 ? 1 : -1;
    const next = Math.max(0, Math.min(pageSections.length - 1, current + direction));
    if (next !== current) {
      scrollToSection(next);
    }
  },
  { passive: false }
);

if (pageTopBtn) {
  pageTopBtn.addEventListener("click", () => {
    if (siteHeader) {
      siteHeader.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("scroll", updatePageTopButton, { passive: true });
updatePageTopButton();

window.addEventListener("DOMContentLoaded", resetToTopOnEntry);
window.addEventListener("load", resetToTopOnEntry);
window.addEventListener("pageshow", resetToTopOnEntry);

if (!content[currentLanguage]) {
  currentLanguage = "zh";
}

applyLanguage(currentLanguage);
