import { JsonObject, PromiseValue } from 'type-fest';
import { RuntimeCheckupConfig, RuntimeTaskConfig } from './runtime-types';
import * as t from 'io-ts';

export interface HooksConfig {
  registerTask(taskName: string, task: TaskConstructor): void;
}

export type CheckupConfig = t.TypeOf<typeof RuntimeCheckupConfig>;
export type TaskConfig = t.TypeOf<typeof RuntimeTaskConfig>;
export type ParserName = string;

export interface Parser {
  execute(paths: string[]): JsonObject;
}

export type TaskName = string;

export interface Task {
  run: () => Promise<TaskResult>;
}

export interface TaskConstructor {
  new (args: any): Task;
}

export interface TaskResult {
  toConsole: () => void;
  toJson: () => {};
}

export interface TaskItemData {
  type: string;
  data: string[];
  total: number;
}

export type SearchPatterns = Record<string, string[]>;

export enum CheckupConfigFormat {
  JSON = 'JSON',
  YAML = 'YAML',
  JavaScript = 'JavaScript',
}

export type CheckupConfigLoader = () => Promise<{
  format: CheckupConfigFormat;
  filepath: string;
  config: CheckupConfig;
}>;

export type ConfigMapper = (config: CheckupConfig) => CheckupConfig;

export type CosmiconfigServiceResult = PromiseValue<ReturnType<CheckupConfigLoader>> | null;
