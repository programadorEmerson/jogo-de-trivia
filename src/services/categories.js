const returnCategories = () => [
  { code: '', value: 'Any Category' },
  { code: '9', value: 'General Knowledge' },
  { code: '10', value: 'Entertainment: Books' },
  { code: '11', value: 'Entertainment: Film' },
  { code: '12', value: 'Entertainment: Music' },
  { code: '13', value: 'Entertainment: Musicals & Theatres' },
  { code: '14', value: 'Entertainment: Television' },
  { code: '15', value: 'Entertainment: Video Games' },
  { code: '16', value: 'Entertainment: Board Games' },
  { code: '17', value: 'Science & Nature' },
  { code: '18', value: 'Science: Computers' },
  { code: '19', value: 'Science: Mathematics' },
  { code: '20', value: 'Mythology' },
  { code: '21', value: 'Sports' },
  { code: '22', value: 'Geography' },
  { code: '23', value: 'History' },
  { code: '24', value: 'Politics' },
  { code: '25', value: 'Art' },
  { code: '26', value: 'Celebrities' },
  { code: '27', value: 'Animals' },
  { code: '28', value: 'Vehicles' },
  { code: '29', value: 'Entertainment: Comics' },
  { code: '30', value: 'Science: Gadgets' },
  { code: '31', value: 'Entertainment: Japanese Anime & Manga' },
  { code: '32', value: 'Entertainment: Cartoon & Animations' },
];

const returnDifficulty = () => [
  { code: '', value: 'Any Difficulty' },
  { code: 'easy', value: 'Easy' },
  { code: 'medium', value: 'Medium' },
  { code: 'hard', value: 'Hard' },
];

const returnType = () => [
  { code: '', value: 'Any Type' },
  { code: 'multiple', value: 'Multiple Choice' },
  { code: 'boolean', value: 'True / False' },
];

export { returnCategories, returnDifficulty, returnType };
