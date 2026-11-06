// Portfolyo verisi. Yeni proje eklemek için PROJECTS listesine bir satır ekle.
// Eklemeyi unutursan: GitHub'daki herkese açık, Pages'i açık yeni repolar sayfada
// "Yeni eklenenler" bölümünde kendiliğinden görünür. Repoya kategori kimliğiyle
// aynı adlı bir topic verirsen (ör. "oyun") doğrudan o kategoriye düşer.
// Gizli repolar portfolyoya girmez.

window.GITHUB_USER = "BlitzHan";

window.CATEGORIES = [
  { id: "ios",       name: "iOS uygulamaları", blurb: "App Store'da yayında" },
  { id: "oyun",      name: "Oyunlar",          blurb: "Tarayıcıda açılıp oynanır" },
  { id: "ogrenme",   name: "Öğrenme",          blurb: "İngilizce kelime ve gramer" },
  { id: "rehber",    name: "Oyun rehberleri",  blurb: "Türkçe, gayriresmî" },
  { id: "spor",      name: "Spor ve veri",     blurb: "Futbol, tahmin, otomatik yayın" },
  { id: "arastirma", name: "Karşılaştırmalar", blurb: "Fiyat, model, lansman" },
];

const GH = (repo) => `https://github.com/BlitzHan/${repo}`;
const PAGE = (repo) => `https://blitzhan.github.io/${repo}/`;

window.PROJECTS = [
  // iOS
  { cat: "ios", name: "Fiyatmatik", date: "2026-04", img: "img/fiyatmatik.jpg", fit: "contain",
    desc: "KDV, indirim ve zam hesaplayan iOS uygulaması.",
    links: [
      { label: "App Store", url: "https://apps.apple.com/tr/app/fiyatmatik/id6762527783", primary: true },
      { label: "Destek", url: "fiyatmatik/" },
      { label: "Gizlilik", url: "fiyatmatik/gizlilik.html" },
    ] },
  { cat: "ios", name: "BlitzFlash", repo: "blitzflash-ios", date: "2026-04", img: "img/blitzflash-ios.jpg", fit: "contain",
    desc: "BBC 800 listesiyle İngilizce kelime öğreten SwiftUI uygulaması.",
    links: [
      { label: "App Store", url: "https://apps.apple.com/tr/app/blitzflash/id6763912751", primary: true },
      { label: "Destek", url: "blitzflash/" },
      { label: "Gizlilik", url: "blitzflash/gizlilik.html" },
      { label: "Kod", url: GH("blitzflash-ios") },
    ] },

  // Oyunlar
  { cat: "oyun", name: "Ahi Ocağı", repo: "ahi-ocagi", date: "2026-10", img: "img/ahi-ocagi.jpg",
    desc: "Osmanlı ve Türk halk masalları temalı demirci idle RPG, Three.js ile." },
  { cat: "oyun", name: "Ayıcık Mahallede", repo: "ayicik-mahallede", date: "2026-10", img: "img/ayicik-mahallede.jpg",
    desc: "4-5 yaş çocuklar için Türkçe 3D ayıcık oyunu." },
  { cat: "oyun", name: "Cepten Cebe", repo: "cepten-cebe", date: "2026-09", img: "img/cepten-cebe.jpg",
    desc: "Telefon al-sat clicker: elden satıştan fabrikaya bir telefon imparatorluğu kur." },
  { cat: "oyun", name: "Anne Ben Müdür Oldum", repo: "anne-ben-mudur-oldum", date: "2026-05", img: "img/anne-ben-mudur-oldum.jpg",
    desc: "AVM'deki bir teknoloji mağazasına müdür oldun. Bir yıl dayanabilecek misin?" },
  { cat: "oyun", name: "BlitzHub", repo: "blitzhub", date: "2026-05", img: "img/blitzhub.jpg",
    desc: "Taş kağıt makas, zar ve çekiliş: arkadaşlarla hızlı çekişme için mini oyunlar." },
  { cat: "oyun", name: "BlitzO!", repo: "BlitzO", date: "2026-04", note: "Sunucu şu an kapalı",
    desc: "Gerçek zamanlı, 2-10 kişilik online kart oyunu. React ve Socket.IO.",
    links: [{ label: "Kod", url: GH("BlitzO") }] },

  // Öğrenme
  { cat: "ogrenme", name: "BlitzPrep", repo: "blitzprep", date: "2026-04", img: "img/blitzprep.jpg",
    desc: "804 kelime, gramer, diyalog senaryoları ve quiz ile İngilizce hazırlık.",
    live: "https://blitzprep.yildirimyigit.com" },
  { cat: "ogrenme", name: "BlitzFlash Web", repo: "BlitzFlash", date: "2025-12", img: "img/blitzflash.jpg",
    desc: "Oyunlaştırılmış kelime kartları: serbest mod, yazarak tahmin, kelime avı.",
    live: "https://blitzflash.yildirimyigit.com/" },

  // Oyun rehberleri
  { cat: "rehber", name: "Aion 2 Chanter", repo: "aion2-chanter-rehber", date: "2026-10", img: "img/aion2-chanter-rehber.jpg",
    desc: "PvE rehberi: skill, stigma, uzmanlık ve makrolar." },
  { cat: "rehber", name: "WoW Forever Hunter", repo: "wow-forever-hunter", date: "2026-10", img: "img/wow-forever-hunter.jpg",
    desc: "Hunter için 1-30 leveling rehberi." },

  // Spor ve veri
  { cat: "spor", name: "Günlük Leşber", repo: "gunluk-lesber", date: "2026-11", img: "img/gunluk-lesber.jpg",
    desc: "Cihat E. Çiçek'in sabah yayınlarından her gün otomatik çıkan 80'ler gazetesi." },
  { cat: "spor", name: "Köşe Vuruşu", repo: "kose-vurusu", date: "2026-10", img: "img/kose-vurusu.jpg",
    desc: "Takımların ve oyuncuların son maçlarına göre maç öncesi olası sonuçlar." },
  { cat: "spor", name: "Şampiyon", repo: "sampiyon", date: "2026-04", img: "img/sampiyon.jpg",
    desc: "Süper Lig şampiyonluk yarışını simüle et: puan ve averaj hesabı." },

  // Karşılaştırmalar
  { cat: "arastirma", name: "Apple Launch Radar", repo: "apple-launch-radar", date: "2026-07", img: "img/apple-launch-radar.jpg",
    desc: "2020'den bugüne Apple lansmanları ve sıradaki çıkış tarihi tahmini." },
  { cat: "arastirma", name: "Apple Watch Karşılaştırma", repo: "apple-watch-karsilastirma", date: "2026-09", img: "img/apple-watch-karsilastirma.jpg",
    desc: "Series 11/12 ve Ultra 3/4 yan yana." },
  { cat: "arastirma", name: "Akakçe Fiyat Takibi", repo: "akakce-fiyat", date: "2026-06", img: "img/akakce-fiyat.jpg",
    desc: "Telefonların piyasa fiyatları; hafıza, renk ve satıcıya göre." },
  { cat: "arastirma", name: "660cc Parça Fiyatları", repo: "moto-parca-karsilastirma", date: "2026-06", img: "img/moto-parca-karsilastirma.jpg",
    desc: "Aprilia RS 660, Triumph Trident 660 ve Honda CBR650R için 13 yedek parça." },
  { cat: "arastirma", name: "AI Model Karşılaştırma", repo: "ai-model-comparison", date: "2026-04", img: "img/ai-model-comparison.jpg",
    desc: "Seçtiğin dil modellerini başarım verileriyle karşılaştıran panel." },
];

// Portfolyoda hiç görünmeyecek herkese açık repolar.
window.HIDDEN_REPOS = [
  "blitzhan.github.io",
  "yenikoy-concept",
  "blitzgold",
  "troy-etiket-pro-web",
];
