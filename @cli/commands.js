import { init } from "run";
import { DICTIONARY } from "./dictionary";
import {
  _clear,
  _dockerBackRebuild,
  _dockerComposeDown,
  _dockerComposeUp,
  _dockerFrontRebuild,
  _getLastUpdates,
  _reloadProxy,
  pipe,
} from "./utils";

const execute = (...fns) => pipe(_clear, ...fns, init)();

export const CURRENT_OPS = {
  1: [DICTIONARY.UPDATE_PROJECT, () => execute(_getLastUpdates)],
  2: [DICTIONARY.RUN_PROJECT, () => execute(_dockerComposeUp)],
  3: [DICTIONARY.STOP_PROJECT, () => execute(_dockerComposeDown)],
  4: [DICTIONARY.REBUILD_FRONTEND, () => execute(_dockerFrontRebuild)],
  5: [DICTIONARY.REBUILD_BACKEND, () => execute(_dockerBackRebuild)],
  6: [DICTIONARY.RELOAD_PROXY, () => execute(_reloadProxy)],
  X: [DICTIONARY.EXIT, () => process.exit()],
};
