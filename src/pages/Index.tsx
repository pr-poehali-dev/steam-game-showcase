import { useState } from 'react';
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
    plot: 'CS2 - это эволюция классического шутера. Террористы против спецназа в напряженных раундах, где каждое решение имеет значение. Новый движок Source 2 приносит реалистичную физику, динамическое освещение и невероятную детализацию карт.',
    rating: 4.8,
    reviews: 1250000,
    genre: ['Шутер', 'Тактика', 'Мультиплеер'],
    imageColor: 'from-orange-500 to-red-600',
    emoji: '🔫'
  },
  {
    id: 2,
    title: 'Dota 2',
    description: 'Легендарная MOBA с глубокой стратегией',
    plot: 'Две команды из пяти героев сражаются за контроль над картой. Более 120 уникальных героев, каждый со своими способностями. Уничтожьте вражеский Ancient, используя стратегию, командную работу и невероятные комбо-атаки.',
    rating: 4.7,
    reviews: 980000,
    genre: ['MOBA', 'Стратегия', 'Командная'],
    imageColor: 'from-blue-500 to-cyan-600',
    emoji: '⚔️'
  },
  {
    id: 3,
    title: 'Elden Ring',
    description: 'Эпическая RPG от создателей Dark Souls',
    plot: 'Lands Between - мир, разрушенный после уничтожения Elden Ring. Вы - Tarnished, изгнанник, вернувшийся чтобы стать Elden Lord. Исследуйте огромный открытый мир, сражайтесь с боссами размером с небоскреб, создавайте свой стиль игры из сотен оружий и заклинаний.',
    rating: 4.9,
    reviews: 750000,
    genre: ['RPG', 'Souls-like', 'Открытый мир'],
    imageColor: 'from-amber-600 to-yellow-500',
    emoji: '🗡️'
  },
  {
    id: 4,
    title: 'Baldur\'s Gate 3',
    description: 'Лучшая RPG по D&D 5-й редакции',
    plot: 'Mind Flayers похитили вас и имплантировали личинку в ваш мозг. У вас есть дни до превращения в монстра. Соберите команду уникальных спутников, исследуйте Forgotten Realms, делайте выборы которые изменят судьбу мира. Каждое решение имеет последствия.',
    rating: 4.9,
    reviews: 680000,
    genre: ['RPG', 'Пошаговая', 'Сюжетная'],
    imageColor: 'from-purple-600 to-pink-600',
    emoji: '🎲'
  },
  {
    id: 5,
    title: 'Cyberpunk 2077',
    description: 'Футуристическая RPG в открытом мире',
    plot: 'Night City, 2077. Вы - V, наёмник-киберпанк в поисках уникального имплантата - ключа к бессмертию. Но в вашей голове появляется цифровой призрак легендарного рокера Джонни Сильверхенда. Модифицируйте тело, взламывайте системы, стреляйте или используйте дипломатию.',
    rating: 4.5,
    reviews: 920000,
    genre: ['RPG', 'Экшен', 'Киберпанк'],
    imageColor: 'from-cyan-400 to-blue-600',
    emoji: '🤖'
  },
  {
    id: 6,
    title: 'Hogwarts Legacy',
    description: 'Магия и приключения в мире Гарри Поттера',
    plot: 'Хогвартс, 1890-е годы. Вы - студент с уникальной способностью использовать древнюю магию. Посещайте уроки зелий, трансфигурации, защиты от тёмных искусств. Исследуйте Запретный лес, летайте на метлах, раскройте заговор гоблинов и тёмных магов.',
    rating: 4.6,
    reviews: 550000,
    genre: ['RPG', 'Экшен', 'Магия'],
    imageColor: 'from-indigo-500 to-purple-700',
    emoji: '🪄'
  }
];

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [explodingGame, setExplodingGame] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id: string; x: number; y: number; tx: number; ty: number }[]>([]);

  const handleGameClick = (game: Game, event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    setExplodingGame(game.id);
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: `${game.id}-${i}`,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      tx: (Math.random() - 0.5) * 400,
      ty: (Math.random() - 0.5) * 400
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
      
      <div className="relative z-10">
        <header className="py-8 px-6 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
              Steam Top Games
            </h1>
            <p className="text-muted-foreground text-lg">Самые популярные игры на платформе</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <Card
                key={game.id}
                onClick={(e) => handleGameClick(game, e)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
                  explodingGame === game.id ? 'animate-float' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.imageColor} opacity-20 group-hover:opacity-30 transition-opacity`} />
                
                <div className="relative p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-6xl">{game.emoji}</div>
                    <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                      <Icon name="Star" size={16} className="text-primary fill-primary" />
                      <span className="font-heading font-bold text-primary">{game.rating}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {game.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="bg-card/50 hover:bg-primary/20">
                        {g}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/50">
                    <Icon name="Users" size={16} />
                    <span>{(game.reviews / 1000).toFixed(0)}K отзывов</span>
                  </div>
                </div>

                {explodingGame === game.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent animate-explode pointer-events-none" />
                )}
              </Card>
            ))}
          </div>
        </main>
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-3 h-3 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-particle pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`
          } as React.CSSProperties}
        />
      ))}

      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="max-w-4xl w-full bg-card border border-border/50 rounded-2xl overflow-hidden animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-48 bg-gradient-to-br ${selectedGame.imageColor} relative flex items-center justify-center`}>
              <div className="text-9xl">{selectedGame.emoji}</div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={24} className="text-foreground" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                  {selectedGame.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        className={`${
                          i < Math.floor(selectedGame.rating)
                            ? 'text-primary fill-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-heading font-bold text-xl text-foreground">
                      {selectedGame.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Users" size={18} />
                    <span>{(selectedGame.reviews / 1000).toFixed(0)}K отзывов</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedGame.genre.map((g) => (
                  <Badge key={g} variant="outline" className="text-base px-4 py-1 border-primary/50 text-primary">
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                  Сюжет
                </h3>
                <p className="text-foreground leading-relaxed text-base">
                  {selectedGame.plot}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-heading font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Icon name="ShoppingCart" size={20} />
                  Купить в Steam
                </button>
                <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-heading font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                  <Icon name="Heart" size={20} />
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
