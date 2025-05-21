import { GameType, FeaturedGame, LoginCode } from '../types';

import {
  
  gtaImage,
  gtaDetailImage,
  gtaheroImage,
  gtaScreenshot1,
  gtaScreenshot2,
  gtaScreenshot3,
  gtaScreenshot4,

  
  rdr2Image,
  rdr2DetailImage,
  rdr2HeroImage,
  rdr2Screenshot1,
  rdr2Screenshot2,
  rdr2Screenshot3,
  rdr2Screenshot4,

  bmywImage,
  bmywDetailImage,
  bmywHeroImage,
  bmywScreenshot1,
  bmywScreenshot2,
  bmywScreenshot3,
  bmywScreenshot4,

  fifa2025Image,
  fifa2025DetailImage,
  fifa2025HeroImage,
  fifa2025Screenshot1,
  fifa2025Screenshot2,
  fifa2025Screenshot3,
  fifa2025Screenshot4,

  godragnarokImage,
  godragnarokDetailImage,
  godragnarokHeroImage,
  godragnarokScreenshot1,
  godragnarokScreenshot2,
  godragnarokScreenshot3,
  godragnarokScreenshot4,

  hplegacyImage,
  hplegacyDetailImage,
  hplegacyHeroImage,
  hplegacyScreenshot1,
  hplegacyScreenshot2,
  hplegacyScreenshot3,
  hplegacyScreenshot4,

} from './gameImages';

export const games: GameType[] = [
  {
    id: '1',
    title: 'Grand Theft Auto V',
    description: 'Experience the critically acclaimed open-world game set in Los Santos. This premium account includes the full game and all online features.',
    imageUrl: gtaImage,
    detailImageUrl: gtaDetailImage,
    heroImageUrl: gtaheroImage,
    price: 499,
    originalPrice: 999,
    discount: 50,
    genre: 'Action',
    platform: 'Steam',
    publisher: 'Rockstar Games',
    developer: 'Rockstar North',
    releaseYear: 2013,
    players: 'Single-player, Multiplayer',
    isNew: false,
    screenshots: [
     gtaScreenshot1,
     gtaScreenshot2,
     gtaScreenshot3,
     gtaScreenshot4
  ],
    loginCodes: [
      {
        id: '1a',
        username: 'gta5_premium_1',
        password: 'gtav2023!',
        isSold: false
      },
      {
        id: '1b',
        username: 'gta5_premium_2',
        password: 'losantos123',
        isSold: false
      }
    ]
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    description: 'Step into the American frontier with this epic tale of honor and loyalty. Premium account includes the complete game and online access.',
    imageUrl: rdr2Image,
    heroImageUrl: rdr2HeroImage,
    detailImageUrl: rdr2DetailImage,
    price: 799,
    originalPrice: 1299,
    discount: 40,
    genre: 'Action',
    platform: 'Steam',
    publisher: 'Rockstar Games',
    developer: 'Rockstar Studios',
    releaseYear: 2019,
    players: 'Single-player, Multiplayer',
    isNew: false,
    screenshots: [
    rdr2Screenshot1,
    rdr2Screenshot2,
    rdr2Screenshot3,
    rdr2Screenshot4
  ],
    loginCodes: [
      {
        id: '2a',
        username: 'rdr2_premium_1',
        password: 'arthur2023!',
        isSold: false
      }
    ]
  },
  {
    id: '3',
    title: 'Black Myth: Wukong',
    description: 'Embark on an epic journey in a war-ravaged world. This premium account includes the base game and all expansions.',
    imageUrl:  bmywImage,
    heroImageUrl: bmywHeroImage,
    detailImageUrl: bmywDetailImage,
    price: 299,
    originalPrice: 599,
    discount: 50,
    genre: 'Adventure',
    platform: 'Steam',
    publisher: 'CD Projekt',
    developer: 'CD Projekt Red',
    releaseYear: 2015,
    players: 'Single-player',
    isNew: false,
    screenshots: [
    bmywScreenshot1,
    bmywScreenshot2,
    bmywScreenshot3,
    bmywScreenshot4
  ],
    loginCodes: [
      {
        id: '3a',
        username: 'witcher3_premium_1',
        password: 'geralt2023!',
        isSold: false
      }
    ]
  },
  {
    id: '4',
    title: 'EA SPORTS FC™ 25',
    description: 'Experience the beautiful game with the latest FIFA installment. Premium account with all features unlocked.',
    imageUrl: fifa2025Image,
    detailImageUrl: fifa2025DetailImage,
    heroImageUrl: fifa2025HeroImage,
    screenshots: [
      fifa2025Screenshot1,
      fifa2025Screenshot2,
      fifa2025Screenshot3,
      fifa2025Screenshot4
    ],
    price: 999,
    originalPrice: 1499,
    discount: 33,
    genre: 'Sports',
    platform: 'Steam',
    publisher: 'Electronic Arts',
    developer: 'EA Sports',
    releaseYear: 2025,
    players: 'Single-player, Multiplayer',
    isNew: true,
    loginCodes: [
      {
        id: '4a',
        username: 'fifa24_premium_1',
        password: 'fifa2024!',
        isSold: false
      }
    ]
  },
  {
    id: '5',
    title: 'God of War Ragnarök',
    description: 'Join Kratos and Atreus on a mythic journey through the realms. This premium account includes the full game and all expansions.',
    imageUrl: godragnarokImage,
    detailImageUrl: godragnarokDetailImage,
    heroImageUrl: godragnarokHeroImage,
    screenshots: [
      godragnarokScreenshot1,
      godragnarokScreenshot2,
      godragnarokScreenshot3,
      godragnarokScreenshot4
    ],
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    genre: 'Adventure',
    platform: 'Steam',
    publisher: 'Sony Interactive Entertainment',
    isNew: false,
    loginCodes: [
      {
        id: '5a',
        username: 'minecraft_premium_1',
        password: 'craft2023!',
        isSold: false
      }
    ]
  },
  {
    id: '6',
    title: 'Hogwarts Legacy',
    description: 'Step into the wizarding world and explore Hogwarts like never before. This premium account includes the full game and all expansions.',
    imageUrl: hplegacyImage,
    detailImageUrl: hplegacyDetailImage,
    heroImageUrl: hplegacyHeroImage,
    screenshots: [
      hplegacyScreenshot1,
      hplegacyScreenshot2,
      hplegacyScreenshot3,
      hplegacyScreenshot4
    ],
    price: 899,
    originalPrice: 1399,
    discount: 36,
    genre: 'Adventure',
    platform: 'Steam',
    publisher: 'Warner Bros. Interactive Entertainment',
    developer: 'Avalanche Software',
    releaseYear: 2023,
    players: 'Single-player',
    isNew: false,
    loginCodes: [
      {
        id: '6a',
        username: 'hogwarts_premium_1',
        password: 'hogwarts2023!',
        isSold: false
      }
    ]
  }
];

export const getRandomLoginCode = (gameId: string): LoginCode | null => {
  const game = games.find(g => g.id === gameId);
  if (!game) return null;
  
  const availableCodes = game.loginCodes.filter(code => !code.isSold);
  if (availableCodes.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableCodes.length);
  return availableCodes[randomIndex];
};

export const markLoginCodeAsSold = (gameId: string, codeId: string): void => {
  const game = games.find(g => g.id === gameId);
  if (!game) return;
  
  const loginCode = game.loginCodes.find(code => code.id === codeId);
  if (loginCode) {
    loginCode.isSold = true;
  }
};

export const featuredGames: FeaturedGame[] = [
  {
    ...games[0],
    badge: 'Most Popular',
    description: 'Experience the critically acclaimed open-world game that has redefined the action-adventure genre. This premium Steam account includes the full game and all online features.',
  },
  {
    ...games[1],
    badge: 'Best Seller',
    description: 'Embark on an epic journey through the American frontier in this masterpiece from Rockstar Games. Includes both single-player and online modes.',
  },
  {
    ...games[2],
    badge: 'Editor\'s Choice',
    description: 'Hunt monsters, craft potions, and explore a vast open world in this award-winning RPG. Complete edition with all expansions included.',
  }
];