

export enum LLMOptions {
  GPT_MINI = 'gpt-4o-mini',
  GEMINI_FLASH = 'gemini-1.5-flash',
  GPT = 'gpt-4o',
}

export const DEFAULT_LLM = LLMOptions.GEMINI_FLASH;

export interface GameOverviewMLResponse {
  response: {
    estimated_win_rate: number;
    recommended_items: string[];
    game_summary: string;
  }
}

export interface GameOverviewResponse {
  response: {
    estimated_win_rate: number;
    recommended_items: {
      itemId: string;
      itemName: string;
    }[];
    game_summary: string;
  }
}