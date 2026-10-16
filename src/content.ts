export type Language = 'zh' | 'en';
export type Category = 'medical' | 'bio' | 'vision';

const zh = {
  skip: '跳至主要内容',
  navLabel: '主导航',
  mobileNavLabel: '移动端导航',
  navWork: '开源作品',
  navAbout: '关于我',
  navConnect: '联系',
  heroEyebrow: '你好，世界。这里是 Eric。',
  heroLine1: '让好奇心，',
  heroLine2: '有迹可循。',
  heroDescription: '我是 Eric Ching，也叫 doublechenching。用代码理解图像，在医学影像、计算机视觉与生物图像中探索新的可能。',
  exploreWork: '探索我的作品',
  heroLocation: '保持好奇，持续探索',
  heroFooter: '代码是工具，好奇心是方向。',
  scroll: '向下探索',
  focusLabel: '探索的方向',
  focusMedical: '医学影像',
  focusVision: '计算机视觉',
  focusBio: '生物图像',
  workEyebrow: '把想法写进代码',
  workTitle: '一些探索，一些作品<span class="accent">。</span>',
  allRepos: '全部仓库',
  filterLabel: '筛选项目',
  filterAll: '全部作品',
  filterMedical: '医学影像',
  filterBio: '生物图像',
  filterVision: '计算机视觉',
  workNote: '每个项目，都是一段思考的切片。更多实现细节与使用说明，见各项目仓库。',
  aboutEyebrow: '代码之外',
  aboutQuote: '“行到水穷处，<br />坐看风起时。”',
  aboutText: '我喜欢那些需要耐心观察、也值得动手求解的问题。从超声图像的置信度，到三维肿瘤分割，再到蛋白质图像识别，这些开源项目记录了我用代码理解复杂图像的过程。',
  aboutText2: '这里是我的个人空间，也是一个持续整理的探索档案。愿每一次尝试，都能为下一个问题打开一扇窗。',
  aboutGithub: '在 GitHub 了解更多',
  pinnedLabel: 'GITHUB 置顶',
  pinnedDescription: '蛋白质与复合物结构预测的开源探索',
  connectEyebrow: '下一段探索，从交流开始',
  connectTitle: '有意思的想法，<br />值得一起聊聊<span class="accent">。</span>',
  connectText: '关于代码、图像，或是一个新的可能。欢迎在 GitHub 找到我。',
  connectLink: '来打个招呼',
  footerNote: '以好奇心为起点，以代码为注脚。',
  backTop: '回到顶部',
};

const en: Record<keyof typeof zh, string> = {
  skip: 'Skip to content',
  navLabel: 'Main navigation',
  mobileNavLabel: 'Mobile navigation',
  navWork: 'Selected work',
  navAbout: 'About',
  navConnect: 'Connect',
  heroEyebrow: 'Hello, world. I’m Eric.',
  heroLine1: 'Stay curious.',
  heroLine2: 'Make it real.',
  heroDescription: 'I’m Eric Ching, also known as doublechenching. Exploring what code can reveal through medical imaging, computer vision, and biological images.',
  exploreWork: 'Explore my work',
  heroLocation: 'Always a little curious',
  heroFooter: 'Code is the tool. Curiosity is the compass.',
  scroll: 'Scroll to explore',
  focusLabel: 'AREAS OF EXPLORATION',
  focusMedical: 'Medical imaging',
  focusVision: 'Computer vision',
  focusBio: 'Biological imaging',
  workEyebrow: 'Ideas, translated into code',
  workTitle: 'A few explorations<span class="accent">.</span>',
  allRepos: 'All repositories',
  filterLabel: 'Filter projects',
  filterAll: 'All work',
  filterMedical: 'Medical imaging',
  filterBio: 'Biological imaging',
  filterVision: 'Computer vision',
  workNote: 'Each project is a fragment of an exploration. Find implementation details and documentation in its repository.',
  aboutEyebrow: 'Beyond the code',
  aboutQuote: '“Where the water ends,<br />sit and watch the wind rise.”',
  aboutText: 'I’m drawn to questions that reward careful observation and hands-on exploration. From ultrasound confidence maps to 3D tumor segmentation and protein image classification, these open-source projects trace my attempts to understand complex images with code.',
  aboutText2: 'This is my personal space and an evolving archive of explorations. May every experiment open a window onto the next question.',
  aboutGithub: 'More about me on GitHub',
  pinnedLabel: 'PINNED ON GITHUB',
  pinnedDescription: 'Open-source protein and complex structure prediction',
  connectEyebrow: 'The next exploration starts with a conversation',
  connectTitle: 'Good ideas deserve<br />a conversation<span class="accent">.</span>',
  connectText: 'About code, images, or a new possibility. Find me on GitHub.',
  connectLink: 'Come say hello',
  footerNote: 'Driven by curiosity. Written in code.',
  backTop: 'Back to top',
};

export const translations = { zh, en };
export type TranslationKey = keyof typeof zh;

export interface Project {
  repo: string;
  category: Category;
  language: string;
  tech: string[];
  title: Record<Language, string>;
  description: Record<Language, string>;
  art: 'brain' | 'ultrasound' | 'cells' | 'ships' | 'volume' | 'xray';
  year: number;
  featured?: boolean;
}

// Content comes from the owner's public repositories. Dates describe the project
// archive, not current employment, activity, or a claim of recent publication.
export const projects: Project[] = [
  {
    repo: 'brats_segmentation-pytorch',
    category: 'medical',
    language: 'Python',
    tech: ['PyTorch', '3D U-Net', 'VAE'],
    title: { zh: '让复杂结构，变得清晰。', en: 'Making complex structures legible.' },
    description: {
      zh: '基于 3D U-Net 与 VAE 的脑肿瘤分割，复现 BraTS 2018 冠军方案。在三维医学图像中，寻找更精确的边界。',
      en: 'Brain tumor segmentation with 3D U-Net and VAE, reproducing the BraTS 2018 winning approach. Finding more precise boundaries in volumetric medical images.',
    },
    art: 'brain',
    year: 2019,
    featured: true,
  },
  {
    repo: 'UltrasondConfienceMap',
    category: 'medical',
    language: 'C++',
    tech: ['Ultrasound', 'Confidence Map'],
    title: { zh: '看见图像中的不确定性', en: 'Seeing uncertainty in an image' },
    description: {
      zh: '为超声图像构建置信度图，评估图像质量，减少声影区域的病灶假阳性。',
      en: 'Confidence maps for ultrasound image quality, helping reduce false-positive findings in acoustic shadow regions.',
    },
    art: 'ultrasound',
    year: 2019,
  },
  {
    repo: 'hpi',
    category: 'bio',
    language: 'Jupyter Notebook',
    tech: ['Protein Atlas', 'Classification'],
    title: { zh: '从细胞图像，认识蛋白质', en: 'A closer look at protein images' },
    description: {
      zh: 'Human Protein Atlas 图像识别探索，以计算机视觉寻找细胞图像中的蛋白质分布模式。',
      en: 'Image classification explorations with the Human Protein Atlas, looking for patterns of protein distribution in cellular images.',
    },
    art: 'cells',
    year: 2019,
  },
  {
    repo: 'ABUS-Inception-Unet',
    category: 'medical',
    language: 'Python',
    tech: ['3D Inception', 'U-Net'],
    title: { zh: '走进超声的三维世界', en: 'Ultrasound, in three dimensions' },
    description: {
      zh: '面向自动乳腺超声图像的 3D Inception U-Net，探索三维图像的分割方法。',
      en: 'A 3D Inception U-Net for automated breast ultrasound images, exploring volumetric image segmentation.',
    },
    art: 'volume',
    year: 2018,
  },
  {
    repo: 'ship_detection',
    category: 'vision',
    language: 'Jupyter Notebook',
    tech: ['Kaggle', 'Image Segmentation'],
    title: { zh: '从更高的视角，发现目标', en: 'Finding a signal from above' },
    description: {
      zh: 'Airbus Ship Detection 挑战中的图像分割实践，从卫星影像中识别海面上的船只。',
      en: 'Image segmentation for the Airbus Ship Detection challenge, identifying ships in satellite imagery.',
    },
    art: 'ships',
    year: 2018,
  },
];
