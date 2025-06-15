// 语言切换逻辑
function toggleLanguage() {
    const language = document.getElementById('language').value;
    const englishContent = document.querySelectorAll('.english-content');
    const chineseContent = document.querySelectorAll('.chinese-content');

    englishContent.forEach(el => {
        el.style.display = (language === 'zh') ? 'none' : 'block';
    });

    chineseContent.forEach(el => {
        el.style.display = (language === 'zh') ? 'block' : 'none';
    });
}

// 平滑滚动逻辑（增强版防御性写法）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const selector = this.getAttribute('href');
        if (selector && selector.length > 1) {
            try {
                const target = document.querySelector(selector);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                console.warn(`Invalid selector: ${selector}`, err);
            }
        } else {
            console.warn(`Skipping empty anchor href: ${selector}`);
        }
    });
});

// 动态加载各模块文件（防御性增强）
function loadSection(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const section = document.getElementById(id);
            if (section) {
                section.innerHTML = html;
            }
        })
        .catch(err => {
            console.warn(`Error loading section ${id}:`, err);
        });
}

// 页面加载时动态引入各拆分模块（整理版）
document.addEventListener('DOMContentLoaded', function () {
    loadSection('hero-section', 'hero.html');
    loadSection('features-section', 'features.html');
    loadSection('open-sources-section', 'open-sources.html');
    loadSection('download-section', 'download.html');
    loadSection('footer-section', 'footer.html');
});

