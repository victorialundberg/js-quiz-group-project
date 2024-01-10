export interface IQuizQuestion {
  id: number;
  question: string;
  answerOne: string;
  answerTwo: string;
  correctAnswer: string;
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
  },
  {
    id: 2,
    question:
      'The very first rubber ducks were made in late 1800. What couldn´t they do?',
    answerOne: 'Sink',
    answerTwo: 'Be chewed on',
    correctAnswer: 'Float',
  },
  {
    id: 3,
    question:
      // eslint-disable-next-line max-len
      'Lizzy the duck was faster than Bob the duck at swimming. Bob was faster than Lizzy at flying. Lizzy was yellower than Bob. What color is Bob?',
    answerOne: 'Yellow',
    answerTwo: 'Orange',
    correctAnswer: 'Red',
  },
  {
    id: 4,
    question: 'How does a rubber duck spend its weekends?',
    answerOne: 'Ducking responsibilities',
    answerTwo: 'Quacking jokes at a comedy club',
    correctAnswer: 'Taking a relaxing bubble bath',
  },
  {
    id: 5,
    question: 'Which of the following have rubber ducks been used to measure?',
    answerOne:
      'Rubber ducks have been employed to study the migratory patterns of deep-sea creatures.',
    answerTwo:
      'Rubber ducks have been utilized to map underwater geological features and topography.',
    correctAnswer: 'Rubber ducks have been used to measure ocean currents.',
  },
  {
    id: 6,
    question:
      'What prestigious award did the esteemed rubber duck receive in 2023 for its outstanding contributions to bath-time entertainment and quacking innovation?',
    answerOne: 'The Nobel Quackson Prize',
    answerTwo: 'The Ducky Distinguished Award',
    correctAnswer: 'The Golden Quacker Prize',
  },
  {
    id: 7,
    question: 'How many duck fits in a bathtub',
    answerOne: 'Maybe 20?',
    answerTwo: '500 sounds reasonable',
    correctAnswer: 'As many as you put in',
  },
  {
    id: 8,
    question:
      'What unique feature do many rubber ducks have to ensure safety during playtime?',
    answerOne: 'Anti-slip bottoms for bathtub stability',
    answerTwo: 'Buoyancy control to prevent tipping',
    correctAnswer: 'Non-toxic materials for safe chewing',
  },
  {
    id: 9,
    question:
      'What material is commonly used to make traditional yellow rubber ducks, ensuring their iconic appearance?',
    answerOne: 'Latex',
    answerTwo: 'Silicone',
    correctAnswer: 'Vinyl',
  },
  {
    id: 10,
    question:
      'To meet international safety standards, rubber ducks often undergo testing for which important quality?',
    answerOne: 'Temperature resistance',
    answerTwo: 'Phthalate-free composition',
    correctAnswer: 'Flotation efficiency',
  },
  {
    id: 11,
    question:
      'Rubber ducks have been featured in various pop culture references, but in which animated movie did a rubber duck play a memorable role? ',
    answerOne: 'Finding Nemo',
    answerTwo: 'The Little Mermaid',
    correctAnswer: 'Toy Story',
  },
  {
    id: 12,
    question:
      'In 2001, a giant rubber duck designed by Florentijn Hofman became a global sensation. In which city did it make its first public appearance?',
    answerOne: 'Helsinki',
    answerTwo: 'Tokyo',
    correctAnswer: 'Amsterdam',
  },
  {
    id: 13,
    question:
      'What term is commonly used to describe the phenomenon of rubber ducks accidentally being released into the ocean, contributing to the study of ocean currents?',
    answerOne: 'Ducky Drift',
    answerTwo: 'Aqua Migration',
    correctAnswer: 'Oceanic Quackflow',
  },
  {
    id: 14,
    question:
      'What secret society do rubber ducks belong to, dedicated to maintaining order in the bathtub?',
    answerOne: 'Quackers United',
    answerTwo: 'The Rubber Alliance',
    correctAnswer: 'Illumiquacki',
  },
  {
    id: 15,
    question:
      'In the rubber duck Olympics, which event do they take most seriously to showcase their athletic prowess?',
    answerOne: 'Duckling Diving',
    answerTwo: 'Waddle Marathon',
    correctAnswer: 'Synchronized Quacking',
  },
  {
    id: 16,
    question:
      'What is the preferred genre of music among rubber ducks, believed to enhance their quacking abilities?',
    answerOne: 'Jazz Ducktette',
    answerTwo: 'Hip-Hop Quackadelic',
    correctAnswer: 'Classical Quackphony',
  },
  {
    id: 17,
    question:
      'Rubber ducks are known for their smooth sailing, but which famous pirate rubber duck led a daring expedition in search of the elusive "Bath-treasure"?',
    answerOne: 'Duckbeard the Plunderer',
    answerTwo: 'Black Beak the Buccaneer',
    correctAnswer: 'Captain Quack Sparrow',
  },
  {
    id: 18,
    question:
      'To promote relaxation, some rubber ducks have taken up mindfulness practices. What is their preferred meditation technique? ',
    answerOne: 'Yoga Duckpose',
    answerTwo: 'Tranquil Waddling',
    correctAnswer: 'Zen Quacktation',
  },
  {
    id: 19,
    question:
      'What is the optimal number of rubber ducks needed for a world-class quacking symphony? ',
    answerOne: 'Solo Duckist',
    answerTwo: 'Quacktet',
    correctAnswer: 'Duckharmonic Ensemble',
  },
  {
    id: 20,
    question:
      'During the Rubber Duck Olympics, which event involves ducks navigating a challenging obstacle course in the bathtub?',
    answerOne: 'Aqua Agility Challenge',
    answerTwo: 'Tubstacle Trials',
    correctAnswer: 'Slippery Slide Sprint',
  },
  {
    id: 21,
    question:
      'Rubber ducks are rumored to have their own version of a Nobel Prize. What is it called?',
    answerOne: 'The Noble Quackson Laureate',
    answerTwo: 'Duckovation Prize',
    correctAnswer: 'Quackademic Excellence Award',
  },
  {
    id: 22,
    question:
      'What is the preferred method of communication among rubber ducks when organizing a synchronized swimming routine?',
    answerOne: 'Waddle Code',
    answerTwo: 'Floatation Chatter',
    correctAnswer: 'Quackmunication',
  },
  {
    id: 23,
    question:
      'Rubber ducks are known for their adventurous spirit. What is their favorite bedtime story genre?',
    answerOne: 'Duckish Fairy Quacks',
    answerTwo: 'Quacktion Adventures',
    correctAnswer: 'Bedtime Quacktales',
  },
  {
    id: 24,
    question:
      'In the rubber duck culinary world, what is considered the ultimate comfort food?',
    answerOne: 'Waddlecakes with Syrup',
    answerTwo: 'Duckling Dumplings',
    correctAnswer: 'Quackaroni and Cheese',
  },
  {
    id: 25,
    question:
      'Rubber ducks are known to participate in fashion shows. What is the latest trend in duck attire?',
    answerOne: 'Quack Couture',
    answerTwo: 'Feathery Fashionista',
    correctAnswer: 'Dapper Duck Ensemble',
  },
  {
    id: 26,
    question:
      'What is the secret ingredient in the world-famous rubber duck soup that´s rumored to bring good luck?',
    answerOne: 'Paddle Spice',
    answerTwo: 'Waddle Wonder Herb',
    correctAnswer: 'Quack Essence',
  },
];
