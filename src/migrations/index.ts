import * as migration_20260519_064404 from './20260519_064404';
import * as migration_20260622_012619_cases_result_fields from './20260622_012619_cases_result_fields';
import * as migration_20260715_021550_remove_search_plugin from './20260715_021550_remove_search_plugin';

export const migrations = [
  {
    up: migration_20260519_064404.up,
    down: migration_20260519_064404.down,
    name: '20260519_064404',
  },
  {
    up: migration_20260622_012619_cases_result_fields.up,
    down: migration_20260622_012619_cases_result_fields.down,
    name: '20260622_012619_cases_result_fields',
  },
  {
    up: migration_20260715_021550_remove_search_plugin.up,
    down: migration_20260715_021550_remove_search_plugin.down,
    name: '20260715_021550_remove_search_plugin'
  },
];
