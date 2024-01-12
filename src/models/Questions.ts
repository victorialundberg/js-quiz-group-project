export interface IQuizQuestion {
  id: number;
  question: string;
  answerOne: string;
  answerTwo: string;
  correctAnswer: string;
  alt: string;
  src: string;
}

export const QuizQuestions: IQuizQuestion[] = [
  {
    id: 1,
    question:
      // eslint-disable-next-line max-len
      'If you stand on a rock and throw a rubber duck 8 meters, and then step down and throw the duck again, how far will it go?',
    answerOne: '12 meters, of course',
    answerTwo: 'Depends on the direction of the wind',
    correctAnswer: '8 meters; you haven´t picked it up yet',
    alt: 'black rubber duck with text saying "system failure" and random numbers displayed vertically',
    src: '../assets/images/system-failure-duck.webp',
  },
  {
    id: 2,
    question:
      'The very first rubber ducks were made in late 1800. What couldn´t they do?',
    answerOne: 'Sink',
    answerTwo: 'Be chewed on',
    correctAnswer: 'Float',
    alt: 'rubber duck sitting by a computer',
    src: '../assets/images/programmer-duck.webp',
  },
  {
    id: 3,
    question:
      // eslint-disable-next-line max-len
      'Lizzy the duck was faster than Bob the duck at swimming. Bob was faster than Lizzy at flying. Lizzy was yellower than Bob. What color is Bob?',
    answerOne: 'Red',
    answerTwo: 'Yellow',
    correctAnswer: 'Orange',
    alt: 'cute rubber duck with big eyes, having a red text in front of it, saying "Ready, set, go!"',
    src: '../assets/images/ready-set-go.webp',
  },
  {
    id: 4,
    question: 'How does a rubber duck spend its weekends?',
    answerOne: 'Ducking responsibilities',
    answerTwo: 'Quacking jokes at a comedy club',
    correctAnswer: 'Taking a relaxing bubble bath',
    alt: 'relaxed rubber duck taking a bubble bath',
    src: '../assets/images/bubble-bath.webp',
  },
  {
    id: 5,
    question: 'Which of the following have rubber ducks been used to measure?',
    answerOne: 'Migratory patterns of deep-sea creatures.',
    answerTwo: 'Geological features and topography.',
    correctAnswer: 'Ocean currents.',
    alt: 'rubber duck in clear water with a group of blurry rubber ducks behind it',
    src: '../assets/images/duckrace.webp',
  },
  {
    id: 6,
    question:
      'What prestigious award did the esteemed rubber duck receive in 2023?',
    answerOne: 'The Nobel Quackson Prize',
    answerTwo: 'The Ducky Distinguished Award',
    correctAnswer: 'The Golden Quacker Prize',
    alt: 'yellow rubber duck with blue eyes, wearing a colorful sombrero',
    src: '../assets/images/sombrero.webp',
  },
  {
    id: 7,
    question: 'How many duck fits in a bathtub',
    answerOne: 'Maybe 20?',
    answerTwo: '500 sounds reasonable',
    correctAnswer: 'As many as you put in',
    alt: 'lots of rubber ducks in a pile',
    src: '../assets/images/rubberduckies.webp',
  },
  {
    id: 8,
    question:
      'What unique feature do many rubber ducks have to ensure safety during playtime?',
    answerOne: 'Anti-slip bottoms for bathtub stability',
    answerTwo: 'Buoyancy control to prevent tipping',
    correctAnswer: 'Non-toxic materials for safe chewing',
    alt: 'rubber duck wearing a red t-shirt that says "Game Over", holding a gamepad',
    src: '../assets/images/game-over.webp',
  },
  {
    id: 9,
    question:
      'What material is commonly used to make traditional yellow rubber ducks?',
    answerOne: 'Latex',
    answerTwo: 'Silicone',
    correctAnswer: 'Vinyl',
    alt: 'an ordinary yellow and happy rubber duck',
    src: '../assets/images/happy-duck.webp',
  },
  {
    id: 10,
    question:
      'To meet international safety standards, rubber ducks often undergo testing for which important quality?',
    answerOne: 'Temperature resistance',
    answerTwo: 'Phthalate-free composition',
    correctAnswer: 'Flotation efficiency',
    alt: 'rubber duck wearing a cap that says "bye bye", holding a napkin and has a teardrop from it´s eye',
    src: '../assets/images/sad-duck-bye.webp',
  },
  {
    id: 11,
    question:
      'Rubber ducks have been featured in various pop culture references, but in which animated movie did a rubber duck play a memorable role? ',
    answerOne: 'Finding Nemo',
    answerTwo: 'The Little Mermaid',
    correctAnswer: 'Toy Story',
    alt: 'four rubber ducks in swimwear, holding surfboards',
    src: '../assets/images/surfer-ducks.webp',
  },
  {
    id: 12,
    question:
      'In 2001, a giant rubber duck designed by Florentijn Hofman became a global sensation. In which city did it make its first public appearance?',
    answerOne: 'Helsinki',
    answerTwo: 'Tokyo',
    correctAnswer: 'Amsterdam',
    alt: 'one superlarge rubber duck',
    src: '../assets/images/large-duckie.webp',
  },
  {
    id: 13,
    question:
      'What term is commonly used to describe the phenomenon of rubber ducks accidentally being released into the ocean, contributing to the study of ocean currents?',
    answerOne: 'Ducky Drift',
    answerTwo: 'Aqua Migration',
    correctAnswer: 'Oceanic Quackflow',
    alt: 'lots of colorful rubber ducks washed up on shore',
    src: '../assets/images/at-the-lake.webp',
  },
  {
    id: 14,
    question:
      'What secret society do rubber ducks belong to, dedicated to maintaining order in the bathtub?',
    answerOne: 'Quackers United',
    answerTwo: 'The Rubber Alliance',
    correctAnswer: 'Illumiquacki',
    alt: 'purple rubber duck with hair and a horn like a unicorn',
    src: '../assets/images/unicorn-rubber-duck.webp',
  },
  {
    id: 15,
    question:
      'In the rubber duck Olympics, which event do they take most seriously to showcase their athletic prowess?',
    answerOne: 'Duckling Diving',
    answerTwo: 'Waddle Marathon',
    correctAnswer: 'Synchronized Quacking',
    alt: 'rubber duck dressed in blue cheerleading outfit holding pom-poms',
    src: '../assets/images/blue-cheer-duck.webp',
  },
  {
    id: 16,
    question:
      'What is the preferred genre of music among rubber ducks, believed to enhance their quacking abilities?',
    answerOne: 'Jazz Ducktette',
    answerTwo: 'Hip-Hop Quackadelic',
    correctAnswer: 'Classical Quackphony',
    alt: 'rubber duck wearing sunglasses, floating in clear water',
    src: '../assets/images/cool-duck.webp',
  },
  {
    id: 17,
    question:
      'Rubber ducks are known for their smooth sailing, but which famous pirate rubber duck led a daring expedition in search of the elusive "Bath-treasure"?',
    answerOne: 'Duckbeard the Plunderer',
    answerTwo: 'Black Beak the Buccaneer',
    correctAnswer: 'Captain Quack Sparrow',
    alt: 'rubber duck in pirate outfit with a hook on the left wing, and holding a sword with the other',
    src: '../assets/images/pirate-duck.webp',
  },
  {
    id: 18,
    question:
      'To promote relaxation, some rubber ducks have taken up mindfulness practices. What is their preferred meditation technique? ',
    answerOne: 'Yoga Duckpose',
    answerTwo: 'Tranquil Waddling',
    correctAnswer: 'Zen Quacktation',
    alt: 'clear pool water with a curious-looking rubber duck in the lower right corner',
    src: '../assets/images/pool-duck.webp',
  },
  {
    id: 19,
    question:
      'What is the optimal number of rubber ducks needed for a world-class quacking symphony? ',
    answerOne: 'Solo Duckist',
    answerTwo: 'Quacktet',
    correctAnswer: 'Duckharmonic Ensemble',
    alt: 'lots of rubber ducks in rows',
    src: '../assets/images/rows-of-ducks.webp',
  },
  {
    id: 20,
    question:
      'During the Rubber Duck Olympics, which event involves ducks navigating a challenging obstacle course in the bathtub?',
    answerOne: 'Aqua Agility Challenge',
    answerTwo: 'Tubstacle Trials',
    correctAnswer: 'Slippery Slide Sprint',
    alt: 'rubber duck dressed in red cheerleading outfit holding pom-poms',
    src: '../assets/images/cheerleader.webp',
  },
  {
    id: 21,
    question:
      'Rubber ducks are rumored to have their own version of a Nobel Prize. What is it called?',
    answerOne: 'The Noble Quackson Laureate',
    answerTwo: 'Duckovation Prize',
    correctAnswer: 'Quackademic Excellence Award',
    alt: 'rubber duck holding a star shaped sign saying congratulations, and three balloons',
    src: '../assets/images/congratulations.webp',
  },
  {
    id: 22,
    question:
      'What is the preferred method of communication among rubber ducks when organizing a synchronized swimming routine?',
    answerOne: 'Waddle Code',
    answerTwo: 'Floatation Chatter',
    correctAnswer: 'Quackmunication',
    alt: 'four rubber ducks floating in a line',
    src: '../assets/images/ducks-in-line.webp',
  },
  {
    id: 23,
    question:
      'Rubber ducks are known for their adventurous spirit. What is their favorite bedtime story genre?',
    answerOne: 'Duckish Fairy Quacks',
    answerTwo: 'Quacktion Adventures',
    correctAnswer: 'Bedtime Quacktales',
    alt: 'an angry-looking rubber duck disguised as batman',
    src: '../assets/images/angry-batman.webp',
  },
  {
    id: 24,
    question:
      'In the rubber duck culinary world, what is considered the ultimate comfort food?',
    answerOne: 'Waddlecakes with Syrup',
    answerTwo: 'Duckling Dumplings',
    correctAnswer: 'Quackaroni and Cheese',
    alt: 'rubber duck wearing chef´s outfit holding a cookbook and a covered plate',
    src: '../assets/images/chef-duck.webp',
  },
  {
    id: 25,
    question:
      'Rubber ducks are known to participate in fashion shows. What is the latest trend in duck attire?',
    answerOne: 'Quack Couture',
    answerTwo: 'Feathery Fashionista',
    correctAnswer: 'Dapper Duck Ensemble',
    alt: 'rubber ducks in wedding attire',
    src: '../assets/images/wedding-ducks.webp',
  },
  {
    id: 26,
    question:
      'What is the secret ingredient in the world-famous rubber duck soup that´s rumored to bring good luck?',
    answerOne: 'Paddle Spice',
    answerTwo: 'Waddle Wonder Herb',
    correctAnswer: 'Quack Essence',
    alt: 'four rubber ducks wearing partyhats and holding gifts',
    src: '../assets/images/party-ducks.webp',
  },
];
