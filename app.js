// 應用狀態管理（使用 JavaScript 變數，根據需求數據持久化將使用記憶體變數）
const appState = {
    isAuthenticated: false,
    currentUser: null,
    currentLanguage: 'zh-TW',
    showHiddenProjects: false,
    data: {
        hero: {
            title: "白蠍 WhiteScorpio",
            subtitle: "攝影師 | 創作者 | 旅行者"
        },
        about: {
            p1: "我是白蠍（WhiteScorpio），一位外冷內熱、讀理科卻感性偏多的攝影師與旅行者。個人經歷讓我不太擅長與人交流，需要一段時間熟悉，但內在其實很熱情。對生活沒有太多熱情，可能都投到喜歡的事物上了——特別是攝影。",
            p2: "自學能力良好，大學開始自學攝影與日文。透過鏡頭捕捉世界的美好瞬間，用影像說故事是我的熱情所在。今年開始嘗試做人像與光影攝影，偶爾會到台中與台北的場次中拍照，也嘗試自己做企劃與外拍。偏愛街頭攝影，有時間就會拿著相機在市區內散步拍照。",
            p3: "我專注於旅遊攝影、數位後製與影像編輯，致力於創造具有視覺衝擊力的作品。每一次旅行都是新的靈感來源，每一張照片都承載著獨特的記憶。",
            p4: "較常在Discord上活動，底部有我的個人伺服器連結，歡迎加入！如果有攝影相關事物想聯繫我，可以到我的Instagram中私訊我，或寄信給我，我會盡快回復！"
        },
        basicInfo: {
            location: "台中 台灣",
            birthday: "11月17日",
            occupation: "逢甲大學 材料科學與工程學系 大二生",
            school: "逢甲大學"
        },
        skills: {
            photography: [
                "數位攝影與後製",
                "旅遊攝影",
                "DaVinci Resolve",
                "Adobe Lightroom"
            ],
            tech: [
                "網站開發與設計",
                "社群媒體經營",
                "影片剪輯與製作"
            ],
            language: [
                "中文（母語）",
                "英語（流利）",
                "日語（基礎）"
            ]
        },
        portfolio: [
            { id: 1, title_zh: '漫遊．台中', title_en: 'Wandering Taichung', desc_zh: '台中城市風景與街頭故事', desc_en: 'Urban landscapes and street stories of Taichung', hidden: false, link: '' },
            { id: 2, title_zh: '故事．人像', title_en: 'Stories Through Portraits', desc_zh: '人物攝影與光影故事', desc_en: 'Portrait photography and stories through light', hidden: false, link: '' },
            { id: 3, title_zh: '台灣山林風光', title_en: 'Taiwan Mountain Scenery', desc_zh: '記錄台灣高山的壯麗景色', desc_en: "Recording Taiwan's mountain landscapes", hidden: true, link: '' },
            { id: 4, title_zh: '旅拍．歐洲', title_en: 'Travel Photography Europe', desc_zh: '歐洲古城的街頭攝影作品', desc_en: 'Street photography from European cities', hidden: false, link: '' },
            { id: 5, title_zh: '私人典藏系列', title_en: 'Private Collection', desc_zh: '個人珍藏的特殊攝影作品', desc_en: 'Special photography from personal collection', hidden: true, link: '' }
        ],
        social: {
            discord: { url: "https://discord.gg/F8WScRCN2N", enabled: true },
            instagram: { url: "https://www.instagram.com/wscorpio.photo", enabled: true },
            github: { url: "https://github.com/WScorpio1117", enabled: true },
            email_personal: { address: "wscorpio010052@gmail.com", enabled: true },
            email_photo: { address: "wscorpio.photo@gmail.com", enabled: true }
        },
        profile: {
            avatar_url: "https://i.imgur.com/pz5RaZh.jpeg",
            banner_url: "https://i.imgur.com/rgbF4EP.jpeg",
            copyright: "© wscorpio.photo"
        }
    },
    loginAttempts: {
        count: 0,
        lockoutUntil: null
    }
};

// 預設憑證
const DEFAULT_CREDENTIALS = {
    username: 'WScorpio-homo',
    password: 'WScorpio1117@w@'
};

const SECURITY_SETTINGS = {
    maxFailedAttempts: 3,
    lockoutDurationMinutes: 5
};

// 多語言翻譯
// 管理後台標籤配置
const adminTabs = [
    { id: "content", label_zh: "內容管理", label_en: "Content" },
    { id: "skills", label_zh: "技能管理", label_en: "Skills" },
    { id: "portfolio", label_zh: "作品集管理", label_en: "Portfolio" },
    { id: "social", label_zh: "社群媒體", label_en: "Social Media" },
    { id: "profile", label_zh: "個人檔案", label_en: "Profile" }
];

const translations = {
    'zh-TW': {
        nav_home: '首頁',
        nav_about: '關於我',
        nav_skills: '專業技能',
        nav_portfolio: '作品集',
        nav_contact: '聯絡方式',
        nav_admin: '管理',
        hero_title: '白蠍 WhiteScorpio',
        hero_subtitle: '攝影師 | 創作者 | 旅行者',
        view_portfolio: '查看作品集',
        contact_me: '聯絡我',
        about_title: '關於我',
        about_p1: '我是白蠍（WhiteScorpio），一位外冷內熱、讀理科卻感性偏多的攝影師與旅行者。個人經歷讓我不太擅長與人交流，需要一段時間熟悉，但內在其實很熱情。對生活沒有太多熱情，可能都投到喜歡的事物上了——特別是攝影。',
        about_p2: '自學能力良好，大學開始自學攝影與日文。透過鏡頭捕捉世界的美好瞬間，用影像說故事是我的熱情所在。今年開始嘗試做人像與光影攝影，偶爾會到台中與台北的場次中拍照，也嘗試自己做企劃與外拍。偏愛街頭攝影，有時間就會拿著相機在市區內散步拍照。',
        about_p3: '我專注於旅遊攝影、數位後製與影像編輯，致力於創造具有視覺衝擊力的作品。每一次旅行都是新的靈感來源，每一張照片都承載著獨特的記憶。',
        about_p4: '較常在Discord上活動，底部有我的個人伺服器連結，歡迎加入！如果有攝影相關事物想聯繫我，可以到我的Instagram中私訊我，或寄信給我，我會盡快回復！',
        skills_title: '專業技能',
        skills_photo_title: '攝影技能',
        skill_photo_1: '數位攝影與後製',
        skill_photo_2: '旅遊攝影',
        skill_photo_3: 'DaVinci Resolve',
        skill_photo_4: 'Adobe Lightroom',
        skills_tech_title: '技術能力',
        skill_tech_1: '網站開發與設計',
        skill_tech_2: '社群媒體經營',
        skill_tech_3: '影片剪輯與製作',
        skills_lang_title: '語言能力',
        skill_lang_1: '中文（母語）',
        skill_lang_2: '英語（流利）',
        skill_lang_3: '日語（基礎）',
        portfolio_title: '作品集',
        show_hidden: '顯示隱藏作品',
        hide_hidden: '隱藏私密作品',
        contact_title: '聯絡方式',
        contact_email: 'Email:',
        contact_instagram: 'Instagram:',
        contact_location: 'Location:',
        contact_location_value: '台中 台灣',
        admin_tab_projects: '專案管理',
        admin_tab_hidden: '隱藏功能',
        admin_projects_title: '專案管理',
        admin_add_project: '新增專案',
        admin_project_name: '專案名稱',
        admin_project_desc: '專案描述',
        admin_add_btn: '新增專案',
        admin_hidden_title: '隱藏功能管理',
        admin_hidden_info: '在此管理作品集中哪些項目在前台是隱藏的。隱藏的作品只有通過認證後才能查看。',
        admin_hide_project: '隱藏專案',
        admin_show_project: '顯示專案',
        admin_edit: '編輯',
        admin_delete: '刪除'
    },
    'en': {
        nav_home: 'Home',
        nav_about: 'About Me',
        nav_skills: 'Skills',
        nav_portfolio: 'Portfolio',
        nav_contact: 'Contact',
        nav_admin: 'Admin',
        hero_title: 'WhiteScorpio',
        hero_subtitle: 'Photographer | Creator | Traveler',
        view_portfolio: 'View Portfolio',
        contact_me: 'Contact Me',
        about_title: 'About Me',
        about_p1: 'I am WhiteScorpio, a photographer and traveler who is cold on the outside but warm inside. Being scientifically-minded, I am surprisingly emotional and sensitive. Personal experiences have made me reserved in social interactions, though I warm up over time. I\'m not particularly passionate about life in general, but I pour my enthusiasm into what I love—especially photography.',
        about_p2: 'With strong self-learning abilities, I started teaching myself photography and Japanese in university. Through the lens, I capture the beautiful moments of the world and tell stories through images. This year, I began exploring portrait and lighting photography, occasionally shooting at events in Taichung and Taipei, and even organizing personal photo shoots. I\'m particularly drawn to street photography and love taking my camera for walks through the city whenever I have the chance.',
        about_p3: 'I focus on travel photography, digital post-processing, and image editing, dedicated to creating visually striking works. Every journey is a source of new inspiration, and every photograph carries a unique memory.',
        about_p4: 'I\'m most active on Discord, and there\'s a link to my personal server at the bottom - feel free to join! If you want to contact me about photography-related matters, you can message me on Instagram or send me an email, and I\'ll reply as soon as possible!',
        skills_title: 'Professional Skills',
        skills_photo_title: 'Photography Skills',
        skill_photo_1: 'Digital Photography & Post-Production',
        skill_photo_2: 'Travel Photography',
        skill_photo_3: 'DaVinci Resolve',
        skill_photo_4: 'Adobe Lightroom',
        skills_tech_title: 'Technical Skills',
        skill_tech_1: 'Web Development & Design',
        skill_tech_2: 'Social Media Management',
        skill_tech_3: 'Video Editing & Production',
        skills_lang_title: 'Language Skills',
        skill_lang_1: 'Chinese (Native)',
        skill_lang_2: 'English (Fluent)',
        skill_lang_3: 'Japanese (Basic)',
        portfolio_title: 'Portfolio',
        show_hidden: 'Show Hidden Works',
        hide_hidden: 'Hide Private Works',
        contact_title: 'Contact',
        contact_email: 'Email:',
        contact_instagram: 'Instagram:',
        contact_location: 'Location:',
        contact_location_value: 'Taichung, Taiwan',
        admin_tab_projects: 'Projects',
        admin_tab_hidden: 'Hidden Features',
        admin_projects_title: 'Project Management',
        admin_add_project: 'Add New Project',
        admin_project_name: 'Project Name',
        admin_project_desc: 'Project Description',
        admin_add_btn: 'Add Project',
        admin_hidden_title: 'Hidden Features Management',
        admin_hidden_info: 'Manage which portfolio items are hidden on the frontend. Hidden works can only be viewed after authentication.',
        admin_hide_project: 'Hide Project',
        admin_show_project: 'Show Project',
        admin_edit: 'Edit',
        admin_delete: 'Delete'
    }
};

// 初始化應用
function init() {
    loadDataFromMemory();
    showFrontend();
    updateLanguage();
    updateFrontendContent();
}

// 從記憶體載入數據（未來可擴展持久化）
function loadDataFromMemory() {
    // 當前使用記憶體變數，不使用 localStorage
    // 未來可以通過 API 或其他方式持久化
}

// 保存數據（記憶體變數）
function saveData() {
    // 當前數據已經在 appState.data 中
    // 未來可以添加持久化逻輯
    showNotification('保存成功！', 'success');
}

// 顯示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
        color: var(--color-white);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-md);
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 視圖切換函數
function showLoginView() {
    document.getElementById('loginView').classList.remove('hidden');
    document.getElementById('frontendView').classList.add('hidden');
    document.getElementById('adminView').classList.add('hidden');
    
    // 清空表單
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').classList.add('hidden');
    
    // 檢查是否被鎖定
    checkLockoutStatus();
}

function showFrontend() {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('frontendView').classList.remove('hidden');
    document.getElementById('adminView').classList.add('hidden');
    renderPublicProjects();
    
    // 更新隱藏按鈕顯示
    const hasHiddenProjects = appState.projects.some(p => p.isHidden);
    if (hasHiddenProjects && appState.isAuthenticated) {
        document.getElementById('showHiddenBtn').classList.remove('hidden');
    } else {
        document.getElementById('showHiddenBtn').classList.add('hidden');
    }
}

function showAdminPanel() {
    if (!appState.isAuthenticated) {
        showLoginView();
        return;
    }
    
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('frontendView').classList.add('hidden');
    document.getElementById('adminView').classList.remove('hidden');
    renderAdminTabs();
    switchAdminTab('content');
    updateLanguage();
}

// 渲染後台分頁
function renderAdminTabs() {
    const tabsContainer = document.getElementById('adminTabs');
    const lang = appState.currentLanguage;
    
    tabsContainer.innerHTML = adminTabs.map((tab, index) => 
        `<button class="tab-button ${index === 0 ? 'active' : ''}" onclick="switchAdminTab('${tab.id}')">${lang === 'zh-TW' ? tab.label_zh : tab.label_en}</button>`
    ).join('');
}

// 切換後台分頁
function switchAdminTab(tabId) {
    // 移除所有 active
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // 添加 active 到當前分頁
    const currentBtn = Array.from(document.querySelectorAll('.tab-button')).find(btn => 
        btn.textContent === (appState.currentLanguage === 'zh-TW' ? adminTabs.find(t => t.id === tabId).label_zh : adminTabs.find(t => t.id === tabId).label_en)
    );
    if (currentBtn) currentBtn.classList.add('active');
    
    // 渲染內容
    renderAdminTabContent(tabId);
}

// 渲染分頁內容
function renderAdminTabContent(tabId) {
    const container = document.getElementById('adminTabContents');
    const lang = appState.currentLanguage;
    
    switch(tabId) {
        case 'content':
            container.innerHTML = renderContentTab();
            break;
        case 'skills':
            container.innerHTML = renderSkillsTab();
            break;
        case 'portfolio':
            container.innerHTML = renderPortfolioTab();
            break;
        case 'social':
            container.innerHTML = renderSocialTab();
            break;
        case 'profile':
            container.innerHTML = renderProfileTab();
            break;
    }
}

// 技能管理分頁
function renderSkillsTab() {
    const data = appState.data;
    // 技能分類（轉換成 array，支持動態區塊）
    let skillCategories = Object.keys(data.skills).map((catKey, catIdx) => {
        let skillsArr = data.skills[catKey];
        if (!Array.isArray(skillsArr)) return '';
        let catName = catKey;
        let title = catName;
        if (catName === 'photography') title = appState.currentLanguage === 'zh-TW' ? '攝影技能' : 'Photography';
        else if (catName === 'tech') title = appState.currentLanguage === 'zh-TW' ? '技術能力' : 'Tech';
        else if (catName === 'language') title = appState.currentLanguage === 'zh-TW' ? '語言能力' : 'Language';
        
        return `<div class="skill-category" style="margin-bottom: 24px;">
            <div style="display:flex;align-items:center;gap:8px;">
                <input type="text" class="form-control" value="${title}" style="font-size:16px;width:220px;" onchange="renameSkillCategory('${catKey}', this.value)">
                <button class="btn btn-danger btn-small" onclick="deleteSkillCategory('${catKey}')">${appState.currentLanguage==='zh-TW'?'刪除區塊':'Remove Section'}</button>
            </div>
            <ul id="skillList_${catKey}" style="margin-top:8px;">
                ${skillsArr.map((sk, idx) => `<li style="display:flex;gap:8px;align-items:center;"><span style="flex:1;">${sk}</span>
                    <button class="btn btn-primary btn-small" type="button" onclick="editSkill('${catKey}',${idx})">${appState.currentLanguage==='zh-TW'?'編輯':'Edit'}</button>
                    <button class="btn btn-danger btn-small" type="button" onclick="deleteSkill('${catKey}',${idx})">${appState.currentLanguage==='zh-TW'?'刪除':'Delete'}</button>
                </li>`).join('')}
            </ul>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
                <input id="addSkillInput_${catKey}" type="text" class="form-control" placeholder="${appState.currentLanguage==='zh-TW'?'新增技能':'Add Skill'}">
                <button class="btn btn-success" type="button" onclick="addSkill('${catKey}')">${appState.currentLanguage==='zh-TW'?'新增':'Add'}</button>
            </div>
        </div>`;
    }).join('');
    return `<div style="max-width: 900px;">
        <h2>${appState.currentLanguage === 'zh-TW' ? '技能管理' : 'Skills Management'}</h2>
        <button class="btn btn-success" type="button" style="margin-bottom:16px;" onclick="addSkillCategory()">${appState.currentLanguage==='zh-TW'?'新增技能區塊':'Add Skills Section'}</button>
        <div>
            ${skillCategories}
        </div>
    </div>`;
}

window.addSkillCategory = function() {
    let newCatName = prompt(appState.currentLanguage==='zh-TW'?'請輸入新技能區塊名稱':'Section name?');
    if (!newCatName || !newCatName.trim()) return;
    let catKey = 'custom'+Date.now();
    appState.data.skills[catKey] = [];
    renderAdminTabContent('skills');
}
window.renameSkillCategory = function(catKey, val) {
    // 直接記錄在 key->顯示名稱字典
    // 頁面:後台顯示名稱即用val（後台，不影響前台原有映射）
    // 可保存在 appState.data.skillCategoryNames
    if (!appState.data.skillCategoryNames) appState.data.skillCategoryNames = {};
    appState.data.skillCategoryNames[catKey] = val;
}
window.deleteSkillCategory = function(catKey) {
    if (Object.keys(appState.data.skills).length === 1) {
        showNotification(appState.currentLanguage==='zh-TW'?'至少要保留一個技能區塊':'At least one section required','error'); return;
    }
    if (!confirm(appState.currentLanguage==='zh-TW'?'刪除此技能區塊及所有技能？':'Delete section and all skills?')) return;
    delete appState.data.skills[catKey];
    if (appState.data.skillCategoryNames) delete appState.data.skillCategoryNames[catKey];
    renderAdminTabContent('skills');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'刪除成功！':'Section deleted!','success');
}

window.editSkill = function(cat, idx) {
    const val = prompt(appState.currentLanguage==='zh-TW'?'編輯技能名稱':'Edit skill name', appState.data.skills[cat][idx]);
    if (val && val.trim()) {
        appState.data.skills[cat][idx] = val.trim();
        renderAdminTabContent('skills');
        updateFrontendContent();
        showNotification(appState.currentLanguage==='zh-TW'?'保存成功！':'Saved!', 'success');
    }
}
window.deleteSkill = function(cat, idx) {
    if (confirm(appState.currentLanguage==='zh-TW'?'確定要刪除此技能？':'Delete this skill?')) {
        appState.data.skills[cat].splice(idx, 1);
        renderAdminTabContent('skills');
        updateFrontendContent();
        showNotification(appState.currentLanguage==='zh-TW'?'刪除成功！':'Deleted!', 'success');
    }
}
window.addSkill = function(cat) {
    const input = document.getElementById('addSkillInput_'+cat);
    const val = input.value;
    if (!val || !val.trim()) {
        showNotification(appState.currentLanguage==='zh-TW'?'技能名稱不可為空':'Required!', 'error'); return;
    }
    appState.data.skills[cat].push(val.trim());
    renderAdminTabContent('skills');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'新增成功！':'Added!', 'success');
}

// 內容管理分頁
function renderContentTab() {
    const data = appState.data;
    // 動態關於我段落
    let aboutParagraphs = Object.keys(data.about).map((key, idx) => {
        return `<div class="form-group" style="display:flex;align-items:flex-start;gap:8px;">
            <label class="form-label" style="min-width:120px;">${appState.currentLanguage === 'zh-TW' ? `關於我 - 段落 ${idx + 1}` : `About - Paragraph ${idx + 1}`}</label>
            <textarea class="form-control" id="aboutP${idx}" rows="3" style="flex:1;">${data.about[key]}</textarea>
            <button class="btn btn-danger" type="button" style="margin-left:6px;" onclick="deleteAboutParagraph(${idx})">${appState.currentLanguage==='zh-TW'?'刪除':'Delete'}</button>
        </div>`;
    }).join('');
    return `
        <div style="max-width: 800px;">
            <h2>${appState.currentLanguage === 'zh-TW' ? '內容管理' : 'Content Management'}</h2>
            <div class="form-group">
                <label class="form-label">${appState.currentLanguage === 'zh-TW' ? '首頁標題' : 'Hero Title'}</label>
                <input type="text" class="form-control" id="heroTitle" value="${data.hero.title}">
            </div>
            <div class="form-group">
                <label class="form-label">${appState.currentLanguage === 'zh-TW' ? '首頁副標題' : 'Hero Subtitle'}</label>
                <input type="text" class="form-control" id="heroSubtitle" value="${data.hero.subtitle}">
            </div>
            <div id="aboutParagraphs">
                <h3 style="margin-bottom:12px;">${appState.currentLanguage === 'zh-TW' ? '關於我段落管理' : 'About Me Paragraphs'}</h3>
                ${aboutParagraphs}
            </div>
            <div style="margin-bottom:16px;">
                <button class="btn btn-success" onclick="addAboutParagraph()">${appState.currentLanguage === 'zh-TW' ? '新增段落' : 'Add Paragraph'}</button>
            </div>
            <button class="btn btn-primary" onclick="saveContentTab()">${appState.currentLanguage === 'zh-TW' ? '保存更改' : 'Save Changes'}</button>
            <button class="btn btn-secondary" onclick="updateFrontendContent()">${appState.currentLanguage === 'zh-TW' ? '預覽' : 'Preview'}</button>
        </div>
    `;
}

// 新增段落
window.addAboutParagraph = function() {
    let emptyCount = Object.keys(appState.data.about).filter(key => !appState.data.about[key] || !appState.data.about[key].trim()).length;
    if (emptyCount > 0) {
        showNotification(appState.currentLanguage==='zh-TW'?'有空段落未填寫':'Please fill the empty paragraph!', 'warning');
        return;
    }
    // key 為 pN
    let nextIdx = Object.keys(appState.data.about).length + 1;
    appState.data.about['p'+nextIdx] = '';
    renderAdminTabContent('content');
}
window.deleteAboutParagraph = function(idx) {
    if (Object.keys(appState.data.about).length === 1) {
        showNotification(appState.currentLanguage==='zh-TW'?'至少要有一段':'At least one paragraph required', 'error');
        return;
    }
    if (confirm(appState.currentLanguage==='zh-TW'?'確定刪除此段落？':'Delete this paragraph?')) {
        let keys = Object.keys(appState.data.about);
        let key = keys[idx];
        delete appState.data.about[key];
        // 重新排序 key：p1,p2,p3...
        let abouts = Object.values(appState.data.about);
        appState.data.about = {};
        abouts.forEach((para, i) => {
            appState.data.about['p'+(i+1)] = para;
        });
        renderAdminTabContent('content');
        updateFrontendContent();
        showNotification(appState.currentLanguage==='zh-TW'?'刪除成功！':'Deleted!', 'success');
    }
}

// 作品集管理分頁
function renderPortfolioTab() {
    const data = appState.data;
    const lang = appState.currentLanguage;
    return `
        <div style="max-width: 900px;">
            <h2>${lang === 'zh-TW' ? '作品集管理' : 'Portfolio Management'}</h2>
            <div id="portfolioList">
                ${data.portfolio.map((p, idx) => `
                    <div class="project-card" style="margin-bottom: 16px;">
                        <h3>${lang === 'zh-TW' ? p.title_zh : p.title_en} ${p.hidden ? '<span style="color:var(--color-warning);">[Hidden]</span>' : ''}</h3>
                        <p>${lang === 'zh-TW' ? p.desc_zh : p.desc_en}</p>
                        <div class="project-actions">
                            <button class="btn btn-secondary btn-small" onclick="editPortfolio(${idx})">${lang === 'zh-TW' ? '編輯' : 'Edit'}</button>
                            <button class="btn btn-${p.hidden ? 'primary' : 'secondary'} btn-small" onclick="togglePortfolioHidden(${idx})">${p.hidden ? (lang === 'zh-TW' ? '顯示' : 'Show') : (lang === 'zh-TW' ? '隱藏' : 'Hide')}</button>
                            <button class="btn btn-danger btn-small" onclick="deletePortfolio(${idx})">${lang === 'zh-TW' ? '刪除' : 'Delete'}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <h3>${lang === 'zh-TW' ? '新增作品' : 'Add New Portfolio'}</h3>
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '中文標題' : 'Title (Chinese)'}</label>
                <input type="text" class="form-control" id="newPortfolioTitleZH">
            </div>
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '英文標題' : 'Title (English)'}</label>
                <input type="text" class="form-control" id="newPortfolioTitleEN">
            </div>
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '中文描述' : 'Description (Chinese)'}</label>
                <input type="text" class="form-control" id="newPortfolioDescZH">
            </div>
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '英文描述' : 'Description (English)'}</label>
                <input type="text" class="form-control" id="newPortfolioDescEN">
            </div>
            <button class="btn btn-primary" onclick="addPortfolio()">${lang === 'zh-TW' ? '新增作品' : 'Add Portfolio'}</button>
        </div>
    `;
}

window.editPortfolio = function(idx) {
    const p = appState.data.portfolio[idx];
    const titleZH = prompt(appState.currentLanguage==='zh-TW'?'中文標題':'Title (Chinese)', p.title_zh);
    if (!titleZH) return;
    const titleEN = prompt(appState.currentLanguage==='zh-TW'?'英文標題':'Title (English)', p.title_en);
    if (!titleEN) return;
    const descZH = prompt(appState.currentLanguage==='zh-TW'?'中文描述':'Description (Chinese)', p.desc_zh);
    if (!descZH) return;
    const descEN = prompt(appState.currentLanguage==='zh-TW'?'英文描述':'Description (English)', p.desc_en);
    if (!descEN) return;
    
    p.title_zh = titleZH;
    p.title_en = titleEN;
    p.desc_zh = descZH;
    p.desc_en = descEN;
    
    renderAdminTabContent('portfolio');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'保存成功！':'Saved!', 'success');
}

window.togglePortfolioHidden = function(idx) {
    appState.data.portfolio[idx].hidden = !appState.data.portfolio[idx].hidden;
    renderAdminTabContent('portfolio');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'更新成功！':'Updated!', 'success');
}

window.deletePortfolio = function(idx) {
    if (confirm(appState.currentLanguage==='zh-TW'?'確定刪除此作品？':'Delete this portfolio?')) {
        appState.data.portfolio.splice(idx, 1);
        renderAdminTabContent('portfolio');
        updateFrontendContent();
        showNotification(appState.currentLanguage==='zh-TW'?'刪除成功！':'Deleted!', 'success');
    }
}

window.addPortfolio = function() {
    const titleZH = document.getElementById('newPortfolioTitleZH').value;
    const titleEN = document.getElementById('newPortfolioTitleEN').value;
    const descZH = document.getElementById('newPortfolioDescZH').value;
    const descEN = document.getElementById('newPortfolioDescEN').value;
    
    if (!titleZH || !titleEN || !descZH || !descEN) {
        showNotification(appState.currentLanguage==='zh-TW'?'請填寫所有欄位':'Fill all fields!', 'error');
        return;
    }
    
    appState.data.portfolio.push({
        id: Date.now(),
        title_zh: titleZH,
        title_en: titleEN,
        desc_zh: descZH,
        desc_en: descEN,
        hidden: false,
        link: ''
    });
    
    renderAdminTabContent('portfolio');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'新增成功！':'Added!', 'success');
}

// 社群媒體管理分頁
function renderSocialTab() {
    const socialArr = [];
    for (let key in appState.data.social) {
        let item = appState.data.social[key];
        if (item.address) {
            socialArr.push({
                key,
                type: 'email',
                value: item.address,
                enabled: item.enabled
            });
        } else {
            socialArr.push({
                key,
                type: 'url',
                value: item.url,
                enabled: item.enabled
            });
        }
    }
    return `
    <div style="max-width: 800px;">
        <h2>${appState.currentLanguage === 'zh-TW' ? '社群媒體管理' : 'Social Media Management'}</h2>
        <div id="socialLinksList">
            ${socialArr.map((s, idx) => `
                <div class="form-group" style="display:flex;align-items:center;gap:8px;">
                    <input type="text" class="form-control" style="width:120px;" value="${s.key}" onchange="editSocialKey(${idx},this.value)">
                    <input type="text" class="form-control" style="flex:1;" value="${s.value}" onchange="editSocialValue(${idx},this.value)">
                    <label style="margin-bottom:0;margin-left:8px;"><input type="checkbox" ${s.enabled?'checked':''} onchange="toggleSocialEnabled(${idx})">${appState.currentLanguage==='zh-TW'?'啟用':'Enabled'}</label>
                    <span style="color:#aaa; margin:0 8px 0 0;">${s.type === 'email' ? 'Email' : 'URL'}</span>
                    <button class="btn btn-danger btn-small" onclick="deleteSocial(${idx})">${appState.currentLanguage === 'zh-TW' ? '刪除' : 'Delete'}</button>
                </div>
            `).join('')}
        </div>
        <div style="margin:16px 0; display:flex;gap:8px;">
            <input id="newSocialKey" type="text" class="form-control" style="width:120px;" placeholder="平台或信箱">
            <input id="newSocialValue" type="text" class="form-control" style="flex:1;" placeholder="URL 或 Email">
            <select id="newSocialType" class="form-control" style="width:90px;">
                <option value="url">URL</option>
                <option value="email">Email</option>
            </select>
            <button class="btn btn-success" onclick="addSocialLink()">${appState.currentLanguage === 'zh-TW' ? '新增連結' : 'Add Link'}</button>
        </div>
    </div>`;
}
window.editSocialKey = function(idx, val) {
    let arr = socialListRaw();
    arr[idx].key = val;
    writeSocialRaw(arr);
    renderAdminTabContent('social');
    updateFrontendContent();
}
window.editSocialValue = function(idx, val) {
    let arr = socialListRaw();
    if (arr[idx].type === 'email') arr[idx].value = val;
    else arr[idx].value = val;
    writeSocialRaw(arr);
    renderAdminTabContent('social');
    updateFrontendContent();
}
window.toggleSocialEnabled = function(idx) {
    let arr = socialListRaw();
    arr[idx].enabled = !arr[idx].enabled;
    writeSocialRaw(arr);
    renderAdminTabContent('social');
    updateFrontendContent();
}
window.deleteSocial = function(idx) {
    let arr = socialListRaw();
    arr.splice(idx, 1);
    writeSocialRaw(arr);
    renderAdminTabContent('social');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'刪除成功！':'Deleted!', 'success');
}
window.addSocialLink = function() {
    let key = document.getElementById('newSocialKey').value.trim();
    let value = document.getElementById('newSocialValue').value.trim();
    let type = document.getElementById('newSocialType').value;
    if (!key || !value) {
        showNotification(appState.currentLanguage==='zh-TW'?'請填寫全部欄位':'Please fill all fields!', 'error');
        return;
    }
    let arr = socialListRaw();
    arr.push({ key, type, value, enabled: true });
    writeSocialRaw(arr);
    renderAdminTabContent('social');
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'新增成功！':'Added!', 'success');
}
function socialListRaw() {
    // 將 object 轉成 array
    let arr = [];
    for (let key in appState.data.social) {
        let item = appState.data.social[key];
        if (item.address) arr.push({ key, type: 'email', value: item.address, enabled: item.enabled });
        else arr.push({ key, type: 'url', value: item.url, enabled: item.enabled });
    }
    return arr;
}
function writeSocialRaw(arr) {
    // 將 array 寫回 object
    let result = {};
    arr.forEach(s => {
        if (s.type === 'email') result[s.key] = { address: s.value, enabled: s.enabled };
        else result[s.key] = { url: s.value, enabled: s.enabled };
    });
    appState.data.social = result;
}

// 個人檔案管理分頁
function renderProfileTab() {
    const data = appState.data.profile;
    const lang = appState.currentLanguage;
    return `
        <div style="max-width: 800px;">
            <h2>${lang === 'zh-TW' ? '個人檔案管理' : 'Profile Management'}</h2>
            
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '個人頭像 URL' : 'Avatar URL'}</label>
                <input type="text" class="form-control" id="avatarURL" value="${data.avatar_url}">
                <img src="${data.avatar_url}" style="width: 120px; height: 120px; border-radius: 50%; margin-top: 12px; object-fit: cover;" alt="Avatar">
            </div>
            
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '關於我橫幅 URL' : 'Banner URL'}</label>
                <input type="text" class="form-control" id="bannerURL" value="${data.banner_url}">
                <img src="${data.banner_url}" style="width: 100%; max-width: 400px; border-radius: 8px; margin-top: 12px; object-fit: cover;" alt="Banner">
            </div>
            
            <div class="form-group">
                <label class="form-label">${lang === 'zh-TW' ? '版權標示' : 'Copyright'}</label>
                <input type="text" class="form-control" id="copyright" value="${data.copyright}">
            </div>
            
            <button class="btn btn-primary" onclick="saveProfileTab()">${lang === 'zh-TW' ? '保存更改' : 'Save Changes'}</button>
        </div>
    `;
}

window.saveProfileTab = function() {
    appState.data.profile.avatar_url = document.getElementById('avatarURL').value;
    appState.data.profile.banner_url = document.getElementById('bannerURL').value;
    appState.data.profile.copyright = document.getElementById('copyright').value;
    
    updateFrontendContent();
    showNotification(appState.currentLanguage==='zh-TW'?'保存成功！':'Saved!', 'success');
}

// 保存內容分頁
function saveContentTab() {
    appState.data.hero.title = document.getElementById('heroTitle').value;
    appState.data.hero.subtitle = document.getElementById('heroSubtitle').value;
    // 多段落
    let newAbout = {};
    let count = Object.keys(appState.data.about).length;
    for (let i = 0; i < count; i++) {
        newAbout['p'+(i+1)] = document.getElementById('aboutP'+i).value;
    }
    appState.data.about = newAbout;
    updateFrontendContent();
    showNotification(appState.currentLanguage === 'zh-TW' ? '保存成功！' : 'Saved successfully!', 'success');
}

function showAdminLogin() {
    showLoginView();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 檢查鎖定狀態
function checkLockoutStatus() {
    const lockoutInfo = document.getElementById('lockoutInfo');
    const loginButton = document.querySelector('#loginForm button[type="submit"]');
    
    if (appState.loginAttempts.lockoutUntil && new Date() < new Date(appState.loginAttempts.lockoutUntil)) {
        const remainingTime = Math.ceil((new Date(appState.loginAttempts.lockoutUntil) - new Date()) / 1000 / 60);
        lockoutInfo.innerHTML = `
            <p><strong>⚠️ 帳號已被鎖定</strong></p>
            <p>剩餘鎖定時間：${remainingTime} 分鐘</p>
            <p>登入失敗次數過多，請稍後再試</p>
        `;
        lockoutInfo.classList.remove('hidden');
        loginButton.disabled = true;
        loginButton.style.opacity = '0.5';
        loginButton.style.cursor = 'not-allowed';
        
        // 設置定時器自動解鎖
        setTimeout(() => {
            appState.loginAttempts.count = 0;
            appState.loginAttempts.lockoutUntil = null;
            lockoutInfo.classList.add('hidden');
            loginButton.disabled = false;
            loginButton.style.opacity = '1';
            loginButton.style.cursor = 'pointer';
        }, remainingTime * 60 * 1000);
        
        return true;
    }
    
    lockoutInfo.classList.add('hidden');
    loginButton.disabled = false;
    loginButton.style.opacity = '1';
    loginButton.style.cursor = 'pointer';
    return false;
}

// 登入表單處理
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 檢查鎖定狀態
    if (checkLockoutStatus()) {
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // 驗證憑證
    if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
        // 登入成功
        appState.isAuthenticated = true;
        appState.currentUser = username;
        appState.loginAttempts.count = 0;
        appState.loginAttempts.lockoutUntil = null;
        
        errorDiv.classList.add('hidden');
        showAdminPanel();
        
        // 更新前台的隱藏按鈕顯示狀態
        const hasHiddenProjects = appState.projects.some(p => p.isHidden);
        if (hasHiddenProjects) {
            document.getElementById('showHiddenBtn').classList.remove('hidden');
        }
    } else {
        // 登入失敗
        appState.loginAttempts.count++;
        
        if (appState.loginAttempts.count >= SECURITY_SETTINGS.maxFailedAttempts) {
            // 鎖定帳號
            const lockoutTime = new Date();
            lockoutTime.setMinutes(lockoutTime.getMinutes() + SECURITY_SETTINGS.lockoutDurationMinutes);
            appState.loginAttempts.lockoutUntil = lockoutTime.toISOString();
            
            errorDiv.textContent = `登入失敗次數過多！帳號已被鎖定 ${SECURITY_SETTINGS.lockoutDurationMinutes} 分鐘`;
            errorDiv.classList.remove('hidden');
            checkLockoutStatus();
        } else {
            const remainingAttempts = SECURITY_SETTINGS.maxFailedAttempts - appState.loginAttempts.count;
            errorDiv.textContent = `帳號或密碼錯誤！剩餘嘗試次數：${remainingAttempts}`;
            errorDiv.classList.remove('hidden');
        }
    }
});

// 登出功能
function logout() {
    appState.isAuthenticated = false;
    appState.currentUser = null;
    appState.showHiddenProjects = false;
    showFrontend();
}

// 更新前台內容
function updateFrontendContent() {
    const lang = appState.currentLanguage;
    const data = appState.data;
    
    // 更新頭像與橫幅
    document.getElementById('frontendAvatar').src = data.profile.avatar_url;
    document.getElementById('frontendBanner').src = data.profile.banner_url;
    
    // 更新英雄區
    document.querySelector('.hero-title').textContent = data.hero.title;
    document.querySelector('.hero-subtitle').textContent = data.hero.subtitle;
    
    // 更新關於我
    // 清空所有段落後重新加入
    const aboutTextDiv = document.querySelector('.about-text');
    if (aboutTextDiv) {
        // 移除所有 p
        Array.from(aboutTextDiv.querySelectorAll('p')).forEach(p=>p.remove());
        // 重新依序添加段落
        Object.values(data.about).forEach((ptext, i) => {
            let pElem = document.createElement('p');
            pElem.textContent = ptext;
            aboutTextDiv.appendChild(pElem);
        });
        // 保持社群連結在最下方
        let socialDiv = aboutTextDiv.querySelector('.social-links');
        if (socialDiv) aboutTextDiv.appendChild(socialDiv);
    }
    
    // 更新技能
    updateSkillsDisplay();
    
    // 更新作品集
    renderPublicProjects();
    
    // 更新社群連結
    updateSocialLinks();
}

// 更新技能顯示
function updateSkillsDisplay() {
    const skills = appState.data.skills;
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;
    // 清空原內容
    grid.innerHTML = '';
    Object.keys(skills).forEach((catKey, idx) => {
        const catName = appState.data.skillCategoryNames && appState.data.skillCategoryNames[catKey]
            ? appState.data.skillCategoryNames[catKey]
            : catKey === 'photography' ? (appState.currentLanguage==='zh-TW'?'攝影技能':'Photography')
            : catKey === 'tech' ? (appState.currentLanguage==='zh-TW'?'技術能力':'Tech')
            : catKey === 'language' ? (appState.currentLanguage==='zh-TW'?'語言能力':'Language')
            : catKey;
        const ul = `<ul class="skill-list">${skills[catKey].map(skill => `<li>${skill}</li>`).join('')}</ul>`;
        grid.innerHTML += `<div class="skill-category">
            <h3>${catName}</h3>
            ${ul}
        </div>`;
    });
}

// 更新社群連結
function updateSocialLinks() {
    const socialLinksDiv = document.querySelector('.social-links');
    if (socialLinksDiv) {
        // 清空
        socialLinksDiv.innerHTML = '';
        // 支持多平台和郵箱
        Object.keys(appState.data.social).forEach(key => {
            let item = appState.data.social[key];
            if ((item.url && item.enabled)) {
                socialLinksDiv.innerHTML += `<a href="${item.url}" target="_blank" class="social-link">${key}</a>`;
            } else if ((item.address && item.enabled)) {
                socialLinksDiv.innerHTML += `<a href="mailto:${item.address}" target="_blank" class="social-link">${key}</a>`;
            }
        });
    }
}

// 渲染公開作品
function renderPublicProjects() {
    const grid = document.getElementById('publicProjectsGrid');
    const lang = appState.currentLanguage;
    grid.innerHTML = '';
    
    const visibleProjects = appState.showHiddenProjects 
        ? appState.data.portfolio 
        : appState.data.portfolio.filter(p => !p.hidden);
    
    if (visibleProjects.length === 0) {
        grid.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; width: 100%;">目前沒有作品</p>';
        return;
    }
    
    visibleProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const title = lang === 'zh-TW' ? project.title_zh : project.title_en;
        const desc = lang === 'zh-TW' ? project.desc_zh : project.desc_en;
        const hiddenBadge = project.hidden ? '<span style="display: inline-block; padding: 4px 8px; background: var(--color-warning); color: var(--color-white); border-radius: 4px; font-size: 10px; margin-left: 8px;">隱藏</span>' : '';
        card.innerHTML = `
            <h3>${title}${hiddenBadge}</h3>
            <p>${desc}</p>
        `;
        grid.appendChild(card);
    });
}



// 切換顯示隱藏作品
function toggleHiddenProjects() {
    appState.showHiddenProjects = !appState.showHiddenProjects;
    const btn = document.getElementById('showHiddenBtn');
    btn.textContent = appState.showHiddenProjects 
        ? translations[appState.currentLanguage].hide_hidden 
        : translations[appState.currentLanguage].show_hidden;
    renderPublicProjects();
}

function showPortfolio() {
    showFrontend();
}

// 語言切換功能
function switchLanguage(lang) {
    appState.currentLanguage = lang;
    updateLanguage();
    
    // 更新語言按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateLanguage() {
    const lang = appState.currentLanguage;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // 如果在後台，重新渲染分頁
    if (!document.getElementById('adminView').classList.contains('hidden')) {
        renderAdminTabs();
        const activeTab = Array.from(document.querySelectorAll('.tab-button')).find(btn => btn.classList.contains('active'));
        if (activeTab) {
            const tabId = adminTabs.find(t => (lang === 'zh-TW' ? t.label_zh : t.label_en) === activeTab.textContent)?.id || 'content';
            renderAdminTabContent(tabId);
        }
    }
}



// 數據備份功能
// 下載備份
window.addEventListener('DOMContentLoaded',()=>{
    const btn = document.getElementById('downloadBackupBtn');
    if (btn) {
        btn.onclick = function() {
            // 將數據轉 JSON 下載
            const dataStr = JSON.stringify(appState.data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'portfolio_backup.json';
            document.body.appendChild(link);
            link.click();
            setTimeout(()=>{ document.body.removeChild(link);URL.revokeObjectURL(url); }, 500);
        };
    }
    // 上傳備份恢復
    const uploadInput = document.getElementById('uploadBackupInput');
    if (uploadInput) {
        uploadInput.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const data = JSON.parse(evt.target.result);
                    if (typeof data === 'object') {
                        appState.data = data;
                        // 必要時校驗格式
                        renderAdminTabContent('content');
                        renderAdminTabContent('skills');
                        renderAdminTabContent('portfolio');
                        renderAdminTabContent('social');
                        renderAdminTabContent('profile');
                        updateFrontendContent();
                        showNotification(appState.currentLanguage==='zh-TW'?'備份恢復完成！':'Restore successful!','success');
                    }
                } catch {
                    showNotification(appState.currentLanguage==='zh-TW'?'備份檔案格式錯誤':'Invalid backup format','error');
                }
            };
            reader.readAsText(file);
        };
    }
});
// 啟動應用
init();