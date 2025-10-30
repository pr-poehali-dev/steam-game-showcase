import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  description: string;
  plot: string;
  rating: number;
  reviews: number;
  genre: string[];
  imageColor: string;
  emoji: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Counter-Strike 2',
    description: 'Легендарный тактический шутер нового поколения',
    plot: 'CS2 - это эволюция классического шутера. Террористы против спецназа в напряженных раундах, где каждое решение имеет значение. Новый движок Source 2 приносит реалистичную физику, динамическое освещение и невероятную детализацию карт. Выбирайте своё оружие, планируйте тактику с командой и побеждайте в самых жестких сражениях. Каждая карта - это уникальное поле битвы с множеством тактических возможностей. Стреляйте точно, думайте быстро, действуйте как единое целое!',
    rating: 4.8,
    reviews: 1250000,
    genre: ['Шутер', 'Тактика', 'Мультиплеер'],
    imageColor: 'from-orange-500 via-red-500 to-yellow-500',
    emoji: '🔫'
  },
  {
    id: 2,
    title: 'Dota 2',
    description: 'Легендарная MOBA с глубокой стратегией',
    plot: 'Две команды из пяти героев сражаются за контроль над картой в эпической битве за Ancient. Более 120 уникальных героев, каждый со своими способностями и стилем игры. Стратегия, командная работа и невероятные комбо-атаки решают исход каждого матча. Фармите золото, покупайте артефакты, прокачивайте скиллы и уничтожайте вражескую базу! Каждая игра уникальна - бесконечное разнообразие тактик и стратегий. От новичка до про-игрока - путь легенды!',
    rating: 4.7,
    reviews: 980000,
    genre: ['MOBA', 'Стратегия', 'Командная'],
    imageColor: 'from-blue-600 via-cyan-500 to-teal-400',
    emoji: '⚔️'
  },
  {
    id: 3,
    title: 'Elden Ring',
    description: 'Эпическая RPG от создателей Dark Souls',
    plot: 'Lands Between - мир, разрушенный после уничтожения Elden Ring. Вы - Tarnished, изгнанник, вернувшийся чтобы стать Elden Lord. Исследуйте огромный открытый мир полный опасностей и секретов. Сражайтесь с боссами размером с небоскреб, каждый из которых требует своей стратегии. Создавайте свой уникальный стиль игры из сотен видов оружия, заклинаний и боевых искусств. Мир FromSoftware и Джорджа Мартина ждёт вас - станьте легендой!',
    rating: 4.9,
    reviews: 750000,
    genre: ['RPG', 'Souls-like', 'Открытый мир'],
    imageColor: 'from-amber-600 via-yellow-500 to-orange-400',
    emoji: '🗡️'
  },
  {
    id: 4,
    title: 'Baldur\'s Gate 3',
    description: 'Лучшая RPG по D&D 5-й редакции',
    plot: 'Mind Flayers похитили вас и имплантировали личинку иллитидов в ваш мозг. У вас есть дни до превращения в монстра. Соберите команду уникальных спутников - каждый со своей историей и мотивацией. Исследуйте Forgotten Realms, делайте выборы которые изменят судьбу всего мира. Каждое решение имеет последствия - от романов до судьбы целых рас. Сражайтесь в пошаговых битвах с тактической глубиной настольного D&D. Станете ли вы героем или злодеем? Выбор за вами!',
    rating: 4.9,
    reviews: 680000,
    genre: ['RPG', 'Пошаговая', 'Сюжетная'],
    imageColor: 'from-purple-600 via-pink-500 to-fuchsia-500',
    emoji: '🎲'
  },
  {
    id: 5,
    title: 'Cyberpunk 2077',
    description: 'Футуристическая RPG в открытом мире',
    plot: 'Night City, 2077 - город мечты и кошмаров. Вы - V, наёмник-киберпанк в поисках уникального имплантата - ключа к бессмертию. Но в вашей голове появляется цифровой призрак легендарного рокера Джонни Сильверхенда. Две личности в одном теле борются за контроль. Модифицируйте своё тело кибер-имплантатами, взламывайте системы врагов, стреляйте из футуристического оружия или используйте дипломатию. Каждый район Night City живёт своей жизнью. Станьте легендой киберпанка!',
    rating: 4.5,
    reviews: 920000,
    genre: ['RPG', 'Экшен', 'Киберпанк'],
    imageColor: 'from-cyan-400 via-blue-500 to-purple-600',
    emoji: '🤖'
  },
  {
    id: 6,
    title: 'Hogwarts Legacy',
    description: 'Магия и приключения в мире Гарри Поттера',
    plot: 'Хогвартс, 1890-е годы - золотой век волшебства. Вы - студент с уникальной способностью использовать древнюю магию, которая может изменить судьбу магического мира. Посещайте уроки зелий, трансфигурации, защиты от тёмных искусств. Исследуйте Запретный лес полный магических существ, летайте на метлах на скорости света, раскройте заговор гоблинов и тёмных магов. Соберите свою команду друзей, выберите факультет и напишите свою собственную историю в мире Гарри Поттера!',
    rating: 4.6,
    reviews: 550000,
    genre: ['RPG', 'Экшен', 'Магия'],
    imageColor: 'from-indigo-500 via-purple-500 to-violet-600',
    emoji: '🪄'
  }
];

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [explodingGame, setExplodingGame] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id: string; x: number; y: number; tx: number; ty: number }[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleGameClick = (game: Game, event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    setExplodingGame(game.id);
    
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: `${game.id}-${i}`,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      tx: (Math.random() - 0.5) * 600,
      ty: (Math.random() - 0.5) * 600
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setExplodingGame(null);
      setSelectedGame(game);
      setParticles([]);
    }, 800);
  };

  const handleClose = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-yellow-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 ninja-scroll" />
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 20%, rgba(0,0,0,0.2) 21%, rgba(0,0,0,0.2) 24%, transparent 25%), radial-gradient(circle at 80% 80%, transparent 20%, rgba(0,0,0,0.2) 21%, rgba(0,0,0,0.2) 24%, transparent 25%)',
          backgroundSize: '100px 100px'
        }}
      />
      
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 flex items-center justify-center transition-all comic-border shadow-2xl transform hover:scale-110 hover:rotate-12"
        title={isMusicPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={32} className="text-white" />
      </button>

      <div className="relative z-10">
        <header className="py-8 px-6 border-b-8 border-black bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-7xl font-heading text-white text-stroke mb-3 transform -rotate-2 hover:rotate-0 transition-transform">
              ⚡ STEAM TOP GAMES ⚡
            </h1>
            <p className="text-2xl font-anime text-yellow-300 text-stroke-thin transform rotate-1">
              Самые ЭПИЧНЫЕ игры планеты! 🔥
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {games.map((game, index) => (
              <Card
                key={game.id}
                onClick={(e) => handleGameClick(game, e)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-2 ${
                  explodingGame === game.id ? 'animate-float' : ''
                } animate-fade-in comic-border bg-white`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
                     style={{ 
                       backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)',
                       mixBlendMode: 'multiply'
                     }} 
                />
                
                <div className="relative p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-7xl drop-shadow-2xl transform group-hover:scale-125 transition-transform">
                      {game.emoji}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400 px-4 py-2 rounded-full comic-border transform -rotate-3">
                      <Icon name="Star" size={20} className="text-orange-600 fill-orange-600" />
                      <span className="font-bold text-2xl text-black">{game.rating}</span>
                    </div>
                  </div>

                  <div className="bg-white/95 p-4 rounded-lg comic-border transform -rotate-1 group-hover:rotate-0 transition-transform">
                    <h3 className="text-3xl font-heading text-black mb-2 group-hover:text-orange-600 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-gray-800 text-base font-bold leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {game.genre.map((g) => (
                      <Badge 
                        key={g} 
                        className="bg-black text-white font-bold text-sm px-4 py-2 border-4 border-white transform rotate-1 hover:-rotate-1 transition-transform"
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-base font-bold text-white bg-black/50 px-4 py-2 rounded-lg">
                    <Icon name="Users" size={18} />
                    <span>{(game.reviews / 1000).toFixed(0)}K отзывов</span>
                  </div>
                </div>

                {explodingGame === game.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 animate-explode pointer-events-none" />
                )}
              </Card>
            ))}
          </div>
        </main>
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 animate-particle pointer-events-none z-50 border-2 border-black"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: particle.x,
            top: particle.y,
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`
          } as React.CSSProperties}
        />
      ))}

      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden animate-scale-in shadow-2xl comic-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-64 bg-gradient-to-br ${selectedGame.imageColor} relative flex items-center justify-center border-b-8 border-black`}>
              <div className="absolute inset-0 opacity-20 ninja-scroll" />
              <div className="text-9xl drop-shadow-2xl relative z-10 animate-pulse-glow">
                {selectedGame.emoji}
              </div>
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors comic-border transform hover:rotate-90 transition-transform"
              >
                <Icon name="X" size={32} className="text-white font-bold" />
              </button>
            </div>

            <div className="p-10 space-y-8 bg-gradient-to-br from-orange-50 to-yellow-50">
              <div>
                <h2 className="text-6xl font-heading text-black mb-4 text-stroke-thin">
                  {selectedGame.title}
                </h2>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={28}
                        className={`${
                          i < Math.floor(selectedGame.rating)
                            ? 'text-orange-500 fill-orange-500'
                            : 'text-gray-300 fill-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-bold text-3xl text-black">
                      {selectedGame.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-black font-bold text-xl bg-yellow-200 px-5 py-2 rounded-full comic-border">
                    <Icon name="Users" size={24} />
                    <span>{(selectedGame.reviews / 1000).toFixed(0)}K отзывов</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedGame.genre.map((g) => (
                  <Badge 
                    key={g} 
                    className="text-xl px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold comic-border transform -rotate-1 hover:rotate-1 transition-transform"
                  >
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4 bg-white p-8 rounded-2xl comic-border">
                <h3 className="text-3xl font-anime text-black flex items-center gap-3 text-stroke-thin">
                  <Icon name="BookOpen" size={32} className="text-orange-500" />
                  📖 СЮЖЕТ
                </h3>
                <p className="text-black leading-relaxed text-xl font-bold">
                  {selectedGame.plot}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <button className="px-8 py-5 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl font-bold text-xl hover:from-green-500 hover:to-green-700 transition-all flex items-center justify-center gap-3 comic-border transform hover:scale-105 hover:-rotate-2">
                  <Icon name="ShoppingCart" size={28} />
                  Купить в Steam
                </button>
                <button className="px-8 py-5 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-2xl font-bold text-xl hover:from-pink-500 hover:to-red-600 transition-all flex items-center justify-center gap-3 comic-border transform hover:scale-105 hover:rotate-2">
                  <Icon name="Heart" size={28} />
                  В избранное
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;