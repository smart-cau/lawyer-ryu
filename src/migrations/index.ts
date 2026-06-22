import * as migration_20260519_064404 from './20260519_064404';
import * as migration_20260622_012619_cases_result_fields from './20260622_012619_cases_result_fields';

export const migrations = [
  {
    up: migration_20260519_064404.up,
    down: migration_20260519_064404.down,
    name: '20260519_064404',
  },
  {
    up: migration_20260622_012619_cases_result_fields.up,
    down: migration_20260622_012619_cases_result_fields.down,
    name: '20260622_012619_cases_result_fields'
  },
];
