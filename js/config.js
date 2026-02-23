const CONFIG = {
  SUPABASE_URL: "https://bhepikgfebkwhwewyipj.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_Q4ws8sczKglY14Ci6fZWHA_AzgDjOxc",
  QUIZ: {
    TOTAL_QUESTIONS: 15,
    QUESTIONS_PER_TOPIC: 5,
    TIME_LIMIT_MINUTES: 20,
    PASSING_SCORE: 0.6,
    RANDOMIZE_OPTIONS: true,
    RANDOMIZE_QUESTIONS: true,
  },
  GAME: {
    TIME_LIMIT_MINUTES: 30,
    TOTAL_LEVELS: 6,
    LIVES_PER_LEVEL: 3,
    PASSING_THRESHOLD: 0.7,
  },
  SCORING: {
    QUIZ_WEIGHT: 0.4,
    GAME_WEIGHT: 0.6,
  }
};
