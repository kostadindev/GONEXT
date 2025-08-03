

export enum LLMOptions {
  GPT_MINI = 'gpt-4o-mini',
  GEMINI_FLASH = 'gemini-2.0-flash',
  GPT = 'gpt-4o',
}

export const DEFAULT_LLM = LLMOptions.GEMINI_FLASH;

export interface GameOverviewMLResponse {
  response: {
    estimated_win_rate: number;
    recommended_items: string[] | {
      finalBuild: string[];
      buildSequence: { itemName: string; step: number }[];
    };
    game_summary: string;
  }
}

export interface ItemBuild {
  finalBuild: {
    itemId: string;
    itemName: string;
  }[];
  buildSequence: {
    itemId: string;
    itemName: string;
    step: number;
  }[];
}

export interface GameOverviewResponse {
  response: {
    estimated_win_rate: number;
    recommended_items: ItemBuild | {
      itemId: string;
      itemName: string;
    }[];
    game_summary: string;
  }
}