// Prayer Times & Qibla Utility

export const CITIES = [
  { id: 'makkah', name: 'Makkah Al-Mukarramah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh', qibla: 0, distanceKm: 0 },
  { id: 'madinah', name: 'Madinah Al-Munawwarah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111, timezone: 'Asia/Riyadh', qibla: 175.3, distanceKm: 340 },
  { id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', qibla: 118.8, distanceKm: 4790 },
  { id: 'newyork', name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', qibla: 58.5, distanceKm: 10270 },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai', qibla: 261.2, distanceKm: 1650 },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul', qibla: 151.7, distanceKm: 2420 },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo', qibla: 136.2, distanceKm: 1290 },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo', qibla: 293.4, distanceKm: 9480 },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi', qibla: 268.4, distanceKm: 2790 },
  { id: 'kualalumpur', name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur', qibla: 292.8, distanceKm: 7060 },
  { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, timezone: 'America/Toronto', qibla: 55.1, distanceKm: 10450 },
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney', qibla: 277.5, distanceKm: 13180 },
];

// Helper to calculate Qibla angle from any lat/long
export const calculateQibla = (lat, lng) => {
  const makkahLat = (21.4225 * Math.PI) / 180;
  const makkahLng = (39.8262 * Math.PI) / 180;
  const phiK = makkahLat;
  const lambdaK = makkahLng;
  const phi = (lat * Math.PI) / 180;
  const lambda = (lng * Math.PI) / 180;

  const y = Math.sin(lambdaK - lambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round((qibla + 360) % 360 * 10) / 10;
};

// Generates simulated realistic prayer times based on city and today's date
export const getCityPrayerTimes = (cityId = 'makkah', date = new Date()) => {
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];

  // Base schedule with slight dynamic offset based on day of year & latitude
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const latFactor = (city.lat / 90) * Math.sin((dayOfYear / 365) * 2 * Math.PI) * 25;

  const fajrMin = Math.round(300 + latFactor); // ~ 5:00 AM
  const sunriseMin = fajrMin + 75; // ~ 6:15 AM
  const dhuhrMin = 740; // ~ 12:20 PM
  const asrMin = 955; // ~ 3:55 PM
  const maghribMin = Math.round(1100 - latFactor); // ~ 6:20 PM
  const ishaMin = maghribMin + 80; // ~ 7:40 PM

  const toTimeString = (totalMinutes) => {
    const mins = (totalMinutes % 1440 + 1440) % 1440;
    const hours = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const pad = (n) => String(n).padStart(2, '0');
    return {
      time24: `${pad(hours)}:${pad(m)}`,
      time12: `${displayHours}:${pad(m)} ${period}`,
      rawMinutes: mins,
    };
  };

  const prayers = [
    { id: 'fajr', name: 'Fajr', arabic: 'الفجر', ...toTimeString(fajrMin), icon: 'Sunrise' },
    { id: 'sunrise', name: 'Sunrise', arabic: 'الشروق', ...toTimeString(sunriseMin), icon: 'Sun' },
    { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', ...toTimeString(dhuhrMin), icon: 'SunMedium' },
    { id: 'asr', name: 'Asr', arabic: 'العصر', ...toTimeString(asrMin), icon: 'CloudSun' },
    { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب', ...toTimeString(maghribMin), icon: 'Sunset' },
    { id: 'isha', name: 'Isha', arabic: 'العشاء', ...toTimeString(ishaMin), icon: 'Moon' },
  ];

  return {
    city,
    prayers,
  };
};

// Determines next prayer and countdown
export const getNextPrayerInfo = (prayers) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  // Filter out sunrise for primary prayer obligation if desired, or keep as time marker
  const schedulePrayers = prayers.filter((p) => p.id !== 'sunrise');

  let nextPrayer = null;
  let currentPrayer = schedulePrayers[schedulePrayers.length - 1]; // default to Isha if after Isha
  let diffMinutes = 0;

  for (let i = 0; i < schedulePrayers.length; i++) {
    const p = schedulePrayers[i];
    if (currentMinutes < p.rawMinutes) {
      nextPrayer = p;
      currentPrayer = i === 0 ? schedulePrayers[schedulePrayers.length - 1] : schedulePrayers[i - 1];
      diffMinutes = p.rawMinutes - currentMinutes;
      break;
    }
  }

  if (!nextPrayer) {
    // Next is tomorrow's Fajr
    nextPrayer = schedulePrayers[0];
    diffMinutes = 1440 - currentMinutes + nextPrayer.rawMinutes;
  }

  const hoursLeft = Math.floor(diffMinutes / 60);
  const minutesLeft = Math.floor(diffMinutes % 60);
  const secondsLeft = Math.floor((diffMinutes * 60) % 60);

  const pad = (n) => String(n).padStart(2, '0');

  return {
    currentPrayer,
    nextPrayer,
    countdown: `${pad(hoursLeft)}:${pad(minutesLeft)}:${pad(secondsLeft)}`,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    totalMinutesLeft: diffMinutes,
  };
};

// Daily Ayah & Hadith dataset
export const DAILY_INSPIRATIONS = [
  {
    id: 1,
    arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    transliteration: "Wa aqeemus-salaata wa aatuz-zakaata warka'oo ma'ar-raaki'een",
    translation: "And establish prayer and give zakah and bow with those who bow [in worship and obedience].",
    source: "Surah Al-Baqarah (2:43)",
    topic: "Steadfastness & Community"
  },
  {
    id: 2,
    arabic: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ",
    transliteration: "Innas-salaata tanha 'anil fahshaaa'i wal munkar; wa la zikrullaahi akbar",
    translation: "Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.",
    source: "Surah Al-Ankabut (29:45)",
    topic: "Spiritual Elevation"
  },
  {
    id: 3,
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    transliteration: "Ala bi zikrillahi tatma'innul quloob",
    translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
    source: "Surah Ar-Ra'd (13:28)",
    topic: "Inner Tranquility"
  }
];

export const getHijriDate = () => {
  // Approximate Hijri date representation for 2026/1448
  return {
    day: 28,
    monthName: "Rabi' al-Thani",
    monthArabic: "ربيع الآخر",
    year: 1448,
    fullFormatted: "28 Rabi' al-Thani 1448 AH",
    fullArabic: "٢٨ ربيع الآخر ١٤٤٨ هـ"
  };
};
