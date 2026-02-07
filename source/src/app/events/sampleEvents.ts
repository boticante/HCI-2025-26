// Football Events
const footballEvents = [
  {
    id: "HAJ-2026-02-07-SLB",
    date: "2026-02-07",
    time: "16:15",
    category: "SuperSport HNL, Round 21",
    title: "HNK Hajduk Split vs Slaven Belupo",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-02-21-RIJ",
    date: "2026-02-21",
    time: "17:45",
    category: "SuperSport HNL, Round 23",
    title: "HNK Hajduk Split vs Rijeka",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-03-07-DIN",
    date: "2026-03-07",
    time: "17:45",
    category: "SuperSport HNL, Round 25",
    title: "HNK Hajduk Split vs Dinamo Zagreb",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-03-14-LOK",
    date: "2026-03-14",
    time: "16:00",
    category: "SuperSport HNL, Round 26",
    title: "HNK Hajduk Split vs Lokomotiva Zagreb",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-04-11-GOR",
    date: "2026-04-11",
    time: "17:00",
    category: "SuperSport HNL, Round 29",
    title: "HNK Hajduk Split vs Gorica",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-04-22-OSI",
    date: "2026-04-22",
    time: "17:00",
    category: "SuperSport HNL, Round 31",
    title: "HNK Hajduk Split vs Osijek",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-05-02-VAR",
    date: "2026-05-02",
    time: "17:00",
    category: "SuperSport HNL, Round 33",
    title: "HNK Hajduk Split vs Varaždin",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "HAJ-2026-05-23-VUK",
    date: "2026-05-23",
    time: "17:00",
    category: "SuperSport HNL, Round 36",
    title: "HNK Hajduk Split vs Vukovar 1991",
    venue: "Stadion Poljud - Split, Croatia",
    sport: "Football",
    price: 40
  },
  {
    id: "DUG-2026-02-14-RUD",
    date: "2026-02-14",
    time: "TBD",
    category: "SuperSport Prva NL, Round 18",
    title: "NK Dugopolje vs NK Rudeš",
    venue: "Stadion Hrvatskih vitezova - Dugopolje, Croatia",
    sport: "Football",
    price: 8
  },
  {
    id: "DUG-2026-02-17-USK",
    date: "2026-02-17",
    time: "14:00",
    category: "Kup NSŽSD, 1/16 Final",
    title: "NK Dugopolje vs NK Uskok Klis",
    venue: "Stadion Hrvatskih vitezova - Dugopolje, Croatia",
    sport: "Football",
    price: 8
  },
  {
    id: "DUG-2026-02-28-OPA",
    date: "2026-02-28",
    time: "12:45",
    category: "SuperSport Prva NL, Round 20",
    title: "NK Dugopolje vs NK Opatija",
    venue: "Stadion Hrvatskih vitezova - Dugopolje, Croatia",
    sport: "Football",
    price: 8
  },
  {
    id: "DUG-2026-03-14-CIB",
    date: "2026-03-14",
    time: "12:45",
    category: "SuperSport Prva NL, Round 22",
    title: "NK Dugopolje vs HNK Cibalia",
    venue: "Stadion Hrvatskih vitezova - Dugopolje, Croatia",
    sport: "Football",
    price: 8
  },
  {
    id: "USK-2026-02-21-HDV",
    date: "2026-02-21",
    time: "14:30",
    category: "SuperSport Druga NL, Round 16",
    title: "NK Uskok Klis vs NK Hrvatski Dragovoljac",
    venue: "Stadion Iza Grada - Klis, Croatia",
    sport: "Football",
    price: 5
  },
  {
    id: "USK-2026-03-07-JAD",
    date: "2026-03-07",
    time: "15:00",
    category: "SuperSport Druga NL, Round 18",
    title: "NK Uskok Klis vs NK Jadran LP",
    venue: "Stadion Iza Grada - Klis, Croatia",
    sport: "Football",
    price: 5
  },
  {
    id: "USK-2026-03-21-RKI",
    date: "2026-03-21",
    time: "15:00",
    category: "SuperSport Druga NL, Round 20",
    title: "NK Uskok Klis vs NK Radnik Križevci",
    venue: "Stadion Iza Grada - Klis, Croatia",
    sport: "Football",
    price: 5
  },
  {
    id: "SOL-2026-03-14-TRN",
    date: "2026-03-14",
    time: "15:00",
    category: "SuperSport Druga NL, Round 19",
    title: "NK Solin vs NK Trnje",
    venue: "Stadion Pokraj Jadra - Solin, Croatia",
    sport: "Football",
    price: 5
  },
  {
    id: "SOL-2026-03-28-MLD",
    date: "2026-03-28",
    time: "15:30",
    category: "SuperSport Druga NL, Round 21",
    title: "NK Solin vs NK Mladost Ždralovi",
    venue: "Stadion Pokraj Jadra - Solin, Croatia",
    sport: "Football",
    price: 5
  }
];

// Basketball Events
const basketballEvents = [
  {
    id: "SPL-2026-02-07-DUB",
    date: "2026-02-07",
    time: "17:00",
    category: "Favbet Premijer liga, Round 20",
    title: "KK Split vs KK Dubrava",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 15
  },
  {
    id: "SPL-2026-02-18-OMI",
    date: "2026-02-18",
    time: "17:00",
    category: "Krešimir Ćosić Cup, 1/4 Final",
    title: "KK Split vs KK Omiš",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 15
  },
  {
    id: "SPL-2026-03-03-ILI",
    date: "2026-03-03",
    time: "17:00",
    category: "AdmiralBet ABA League, Relegation Round 1",
    title: "KK Split vs Perspektiva Ilirija",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 20
  },
  {
    id: "SPL-2026-03-06-DIN",
    date: "2026-03-06",
    time: "15:00",
    category: "Favbet Premijer liga, Round 22",
    title: "KK Split vs KK Dinamo Zagreb",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 15
  },
  {
    id: "SPL-2026-03-18-VIE",
    date: "2026-03-18",
    time: "17:00",
    category: "AdmiralBet ABA League, Relegation Round 4",
    title: "KK Split vs Vienna",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 20
  },
    {
    id: "SPL-2026-03-22-MEG",
    date: "2026-03-22",
    time: "17:00",
    category: "AdmiralBet ABA League,Relegation Round 5",
    title: "KK Split vs Mega Superbet",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 20
  },
    {
    id: "SPL-2026-03-27-ZAD",
    date: "2026-03-27",
    time: "17:00",
    category: "AdmiralBet ABA League, Relegation Round 6",
    title: "KK Split vs KK Zadar",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 20
  },
  {
    id: "SPL-2026-04-24-SPA",
    date: "2026-04-24",
    time: "18:00",
    category: "AdmiralBet ABA League, Relegation Round 10",
    title: "KK Split vs KK Spartak",
    venue: "Mala dvorana Gripe - Split, Croatia",
    sport: "Basketball",
    price: 20
  },
];

// Futsal Events
const futsalEvents = [
  {
    id: "TOR-2026-02-20-FDN",
    date: "2026-02-20",
    time: "TBD",
    category: "SuperSport HMNL, Round 12",
    title: "MNK Torcida Biberon vs MNK Futsal Dinamo",
    venue: "SC Gripe – Mala dvorana Gripe, Split, Croatia",
    sport: "Futsal",
    price: 6
  },
  {
    id: "TOR-2026-03-06-CRC",
    date: "2026-03-06",
    time: "TBD",
    category: "SuperSport HMNL, Round 14",
    title: "MNK Torcida Biberon vs MNK Crnica",
    venue: "SC Gripe – Mala dvorana Gripe, Split, Croatia",
    sport: "Futsal",
    price: 6
  },
  {
    id: "TOR-2026-03-21-OSI",
    date: "2026-03-21",
    time: "TBD",
    category: "SuperSport HMNL, Round 16",
    title: "MNK Torcida Biberon vs MNK Osijek Kandit",
    venue: "SC Gripe – Mala dvorana Gripe, Split, Croatia",
    sport: "Futsal",
    price: 6
  },
  {
    id: "TOR-2026-04-17-OLM",
    date: "2026-04-17",
    time: "TBD",
    category: "SuperSport HMNL, Round 18",
    title: "MNK Torcida Biberon vs MNK Olmissum",
    venue: "SC Gripe – Mala dvorana Gripe, Split, Croatia",
    sport: "Futsal",
    price: 6
  }
];

// Volleyball Events
const volleyballEvents = [
  {
    id: "RIB-2026-02-08-KEL",
    date: "2026-02-08",
    time: "17:00",
    category: "SuperSport SuperLiga (F), Round 12",
    title: "ŽOK Ribola Kaštela vs OK Kelteks",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "RIB-2026-02-21-MLA",
    date: "2026-02-21",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 14",
    title: "ŽOK Ribola Kaštela vs HAOK Mladost",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "RIB-2026-03-07-DUB",
    date: "2026-03-07",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 16",
    title: "ŽOK Ribola Kaštela vs ŽOK Dubrovnik",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "RIB-2026-03-21-MAR",
    date: "2026-03-21",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 18",
    title: "ŽOK Ribola Kaštela vs OK Marina Kaštela",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "RIB-2026-02-25-NEB",
    date: "2026-02-25",
    time: "TBD",
    category: "SuperSport Cup - Snježana Ušić (F), 1/2 Final",
    title: "ŽOK Ribola Kaštela vs OK Nebo ",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "MAR-2026-02-14-OSI",
    date: "2026-02-14",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 13",
    title: "OK Marina Kaštela vs ŽOK Osijek",
    venue: "Sportska dvorana Marina - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "MAR-2026-02-28-KEL",
    date: "2026-02-28",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 15",
    title: "OK Marina Kaštela vs OK Kelteks",
    venue: "Sportska dvorana Marina - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "MAR-2026-03-15-DUB",
    date: "2026-03-15",
    time: "TBD",
    category: "SuperSport SuperLiga (F), Round 17",
    title: "OK Marina Kaštela vs ŽOK Dubrovnik",
    venue: "Sportska dvorana Marina - Kaštela, Croatia",
    sport: "Volleyball",
    price: 5
  },
  {
    id: "RIB-2026-02-14-RIE",
    date: "2026-02-14",
    time: "TBD",
    category: "SuperSport SuperLiga (M), Round 13",
    title: "OK Ribola Kaštela vs MOK Rijeka",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 8
  },
  {
    id: "RIB-2026-03-01-CEN",
    date: "2026-03-01",
    time: "TBD",
    category: "SuperSport SuperLiga (M), Round 15",
    title: "OK Ribola Kaštela vs OKM Centrometal",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 8
  },
  {
    id: "RIB-2026-03-15-MUR",
    date: "2026-03-15",
    time: "TBD",
    category: "SuperSport SuperLiga (M), Round 17",
    title: "OK Ribola Kaštela vs MOK Mursa - Osijek",
    venue: "Sportska dvorana Kaštela - Kaštela, Croatia",
    sport: "Volleyball",
    price: 8
  }
];

// Handball Events
const handballEvents = [
  {
    id: "TRO-2026-02-14-SES",
    date: "2026-02-14",
    time: "TBD",
    category: "Paket24 Premijer liga – Liga za prvaka, Round 1",
    title: "RK Trogir vs RK Sesvete",
    venue: "Sportska dvorana Vinko Kandija - Trogir, Croatia",
    sport: "Handball",
    price: 10
  },
  {
    id: "TRO-2026-02-28-ZAG",
    date: "2026-02-28",
    time: "TBD",
    category: "Paket24 Premijer liga – Liga za prvaka, Round 3",
    title: "RK Trogir vs RK Zagreb",
    venue: "Sportska dvorana Vinko Kandija - Trogir, Croatia",
    sport: "Handball",
    price: 10
  },
  {
    id: "TRO-2026-03-14-DUG",
    date: "2026-03-14",
    time: "TBD",
    category: "Paket24 Premijer liga – Liga za prvaka, Round 5",
    title: "RK Trogir vs RK Dugo Selo",
    venue: "Sportska dvorana Vinko Kandija - Trogir, Croatia",
    sport: "Handball",
    price: 10
  },
  {
    id: "TRO-2026-04-11-NEX",
    date: "2026-04-11",
    time: "TBD",
    category: "Paket24 Premijer liga – Liga za prvaka, Round 7",
    title: "RK Trogir vs RK Nexe",
    venue: "Sportska dvorana Vinko Kandija - Trogir, Croatia",
    sport: "Handball",
    price: 10
  },
  {
    id: "TRO-2026-04-25-GOR",
    date: "2026-04-25",
    time: "TBD",
    category: "Paket24 Premijer liga – Liga za prvaka, Round 9",
    title: "RK Trogir vs RK Gorica",
    venue: "Sportska dvorana Vinko Kandija - Trogir, Croatia",
    sport: "Handball",
    price: 10
  }
];

// Water Polo Events
const waterPoloEvents = [
  {
    id: "JAD-2026-02-11-REC",
    date: "2026-02-11",
    time: "20:00",
    category: "LEN Champions League, Round 6",
    title: "VK Jadran Split vs Pro Recco Waterpolo",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 12
  },
  {
    id: "JAD-2026-02-21-MLA",
    date: "2026-02-21",
    time: "18:00",
    category: "Prvenstvo Hrvatske, Round 8",
    title: "VK Jadran Split vs HAVK Mladost Zagreb",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 10
  },
  {
    id: "JAD-2026-03-07-MED",
    date: "2026-03-07",
    time: "18:00",
    category: "Prvenstvo Hrvatske, Round 10",
    title: "VK Jadran Split vs VK Medveščak Zagreb",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 10
  },
  {
    id: "MOR-2026-02-07-ZAD",
    date: "2026-02-07",
    time: "20:30",
    category: "Prvenstvo Hrvatske, Round 6",
    title: "VK Mornar Split vs VK Zadar 1952",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 10
  },
  {
    id: "MOR-2026-02-20-DEZ",
    date: "2026-02-20",
    time: "20:30",
    category: "LEN European Aquatics Conference Cup, Round 1",
    title: "VK Mornar Split vs ZV De Zaan",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 12
  },
  {
    id: "MOR-2026-02-22-RAP",
    date: "2026-02-22",
    time: "12:15",
    category: "LEN European Aquatics Conference Cup, Round 3",
    title: "VK Mornar Split vs CS Rapid București",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 12
  },
  {
    id: "MOR-2026-02-28-POK",
    date: "2026-02-28",
    time: "18:00",
    category: "Prvenstvo Hrvatske, Round 9",
    title: "VK Mornar Split vs OVK POŠK Split",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 10
  },
  {
    id: "MOR-2026-03-14-PRI",
    date: "2026-03-14",
    time: "19:45",
    category: "Prvenstvo Hrvatske, Round 11",
    title: "VK Mornar Split vs VK Primorje EB",
    venue: "Bazeni Poljud - Split, Croatia",
    sport: "Water polo",
    price: 10
  }
];

// Combine all events
export const sampleEvents = [
  ...footballEvents,
  ...basketballEvents,
  ...futsalEvents,
  ...volleyballEvents,
  ...handballEvents,
  ...waterPoloEvents
];