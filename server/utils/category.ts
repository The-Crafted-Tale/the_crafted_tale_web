/**
 * The DB seed data uses display-style categories ('Ready Made', 'Semi Custom', 'Custom')
 * while the frontend type system uses snake_case ('ready_made', 'semi_custom', 'custom').
 * These helpers bridge the two.
 */

const DISPLAY_TO_SNAKE: Record<string, string> = {
  'ready made': 'ready_made',
  'semi custom': 'semi_custom',
  custom: 'custom',
  ready_made: 'ready_made',
  semi_custom: 'semi_custom',
}

export function normalizeCategory(dbCategory: string): string {
  return DISPLAY_TO_SNAKE[dbCategory.toLowerCase()] ?? dbCategory
}

const SNAKE_TO_DB_VALUES: Record<string, string[]> = {
  ready_made: ['ready_made', 'Ready Made'],
  semi_custom: ['semi_custom', 'Semi Custom'],
  custom: ['custom', 'Custom'],
}

export function categoryDbValues(frontendCategory: string): string[] {
  return SNAKE_TO_DB_VALUES[frontendCategory] ?? [frontendCategory]
}
