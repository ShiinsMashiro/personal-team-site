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
const langButtons = document.querySelectorAll(".lang-btn");
const interactivePanels = document.querySelectorAll(
  ".product-panel, .spotlight-panel, .gear-card, .member-card, .metric"
);
const pageSections = Array.from(document.querySelectorAll("main > section.reveal"));
const siteHeader = document.querySelector(".site-header");
const sliderGrids = document.querySelectorAll(".slider-grid[data-slider]");
const metaDescription = document.querySelector("#meta-description");
const bgmSources = {
  zh: "./source/audio/kala-yongyuan-ok.mp3",
  en: "./source/audio/bgm.mp3",
};

let currentLanguage = localStorage.getItem("etu-language") || "en";
let currentMemberKey = null;
let currentGearKey = null;

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
    heroEyebrow: "Explore The Unseen",
    heroTitle: "去那些尚未被语言<br />完全命名的地方。",
    heroText: "冷静进入未知。<br />克制抵达高处。",
    heroButtonPlans: "查看计划",
    heroButtonMembers: "成员档案",
    screenTopline: "Explore The Unseen",
    screenTitle: "命名之外，仍有海拔。",
    screenGrid1: "4 位成员",
    screenGrid2: "4 个目标",
    screenGrid3: "下一次上升",
    storyEyebrow: "团队叙事",
    storyTitle: "四个人。 一套秩序。 向未被看清之地稳定推进。",
    storyText: "判断、配速、补给、协作。",
    plansEyebrow: "未来计划",
    plansTitle: "下一座山，决定当下准备。",
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
    historyTitle: "走过的地方，只为下一次出发作证。",
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
    membersTitle: "四个人。四种能力。一个系统。",
    member1Name: "谢弘毅",
    member1Role: "领队主轴 / 公职气质的秩序建立者",
    member2Name: "陈云哲",
    member2Role: "负重管理 / 装备与状态的双重维护者",
    member3Name: "黄涂健隆",
    member3Role: "影像记录 / 技术与情趣的提炼者",
    member4Name: "姜伟杨",
    member4Role: "补给安全 / 稳定续航的守护者",
    metric1: "已完成路线",
    metric2: "长期成员",
    metric3: "当前计划中的目标方向",
    contactEyebrow: "联系",
    contactTitle: "联系 Explore The Unseen。",
    contactText: "微信、邮箱与电话均为真实联系方式。",
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
    heroEyebrow: "Explore The Unseen",
    heroTitle: "Go where language<br />has not finished naming.",
    heroText: "Enter the unknown calmly.<br />Reach higher with restraint.",
    heroButtonPlans: "View plans",
    heroButtonMembers: "Member files",
    screenTopline: "Explore The Unseen",
    screenTitle: "Beyond the named trail, there is still altitude.",
    screenGrid1: "4 Members",
    screenGrid2: "4 Targets",
    screenGrid3: "Next Ascent",
    storyEyebrow: "About The Team",
    storyTitle: "Four people. One order. A steady push toward what remains unnamed.",
    storyText: "Judgment, pace, supply, coordination.",
    plansEyebrow: "Future Plans",
    plansTitle: "The next mountain shapes the preparation.",
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
    historyTitle: "Past routes are proof for the next departure.",
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
    membersTitle: "Four people. Four capabilities. One system.",
    member1Name: "Xie Hongyi",
    member1Role: "Lead axis / Builder of order",
    member2Name: "Chen Yunzhe",
    member2Role: "Load control / Keeper of gear and condition",
    member3Name: "Huang Tujianlong",
    member3Role: "Image record / Interpreter of technique and tone",
    member4Name: "Jiang Weiyang",
    member4Role: "Supply and safety / Guardian of steady endurance",
    metric1: "Routes completed",
    metric2: "Core members",
    metric3: "Planned objectives",
    contactEyebrow: "Contact",
    contactTitle: "Contact Explore The Unseen.",
    contactText: "WeChat, email, and phone are active contact channels.",
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
  setText("hero-eyebrow", copy.heroEyebrow);
  setText("hero-title", copy.heroTitle, true);
  setText("hero-text", copy.heroText, true);
  setText("hero-button-plans", copy.heroButtonPlans);
  setText("hero-button-members", copy.heroButtonMembers);
  setText("screen-topline", copy.screenTopline);
  setText("screen-title", copy.screenTitle);
  setText("screen-grid-1", copy.screenGrid1);
  setText("screen-grid-2", copy.screenGrid2);
  setText("screen-grid-3", copy.screenGrid3);
  setText("story-eyebrow", copy.storyEyebrow);
  setText("story-title", copy.storyTitle);
  setText("story-text", copy.storyText);
  setText("plans-eyebrow", copy.plansEyebrow);
  setText("plans-title", copy.plansTitle);
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
  setText("history-title", copy.historyTitle);
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
  setText("metric-1", copy.metric1);
  setText("metric-2", copy.metric2);
  setText("metric-3", copy.metric3);
  setText("contact-eyebrow", copy.contactEyebrow);
  setText("contact-title", copy.contactTitle);
  setText("contact-text", copy.contactText);
  setText("contact-wechat", copy.contactWechat);
  setText("member-modal-role-label", copy.memberModalLabel);
  setText("gear-modal-label", copy.gearModalLabel);

  document.querySelectorAll(".page-next-btn").forEach((btn) => {
    btn.setAttribute("aria-label", copy.pageNext);
  });
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

  window.scrollTo({
    top: getCenteredScrollTop(target),
    behavior: "smooth",
  });
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

  const render = () => {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    const gap = parseFloat(window.getComputedStyle(grid).columnGap || window.getComputedStyle(grid).gap || "20");
    const shellWidth = shell.clientWidth;
    const cardWidth = (shellWidth - gap * (visible - 1)) / visible;
    index = Math.min(index, maxIndex);
    grid.style.setProperty("--visible-cards", String(visible));
    grid.style.setProperty("--card-gap", `${gap}px`);
    grid.style.setProperty("--card-width-px", `${cardWidth}px`);
    grid.style.setProperty("--slide-index", String(index));
    prev.disabled = index <= 0;
    next.disabled = index >= maxIndex;
  };

  prev.addEventListener("click", () => {
    index -= 1;
    render();
  });

  next.addEventListener("click", () => {
    index += 1;
    render();
  });

  shell.appendChild(prev);
  shell.appendChild(next);
  render();
  window.addEventListener("resize", render);
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

if (!content[currentLanguage]) {
  currentLanguage = "zh";
}

applyLanguage(currentLanguage);
