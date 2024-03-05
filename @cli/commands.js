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

export const CURRENT_OPS = {
  1: [DICTIONARY.UPDATE_PROJECT, () => pipe(_clear, _getLastUpdates, init)()],
  2: [DICTIONARY.RUN_PROJECT, () => pipe(_clear, _dockerComposeUp, init)()],
  3: [DICTIONARY.STOP_PROJECT, () => pipe(_clear, _dockerComposeDown, init)()],
  4: [
    DICTIONARY.REBUILD_FRONTEND,
    () => pipe(_clear, _dockerFrontRebuild, init)(),
  ],
  5: [
    DICTIONARY.REBUILD_BACKEND,
    () => pipe(_clear, _dockerBackRebuild, init)(),
  ],
  6: [DICTIONARY.RELOAD_PROXY, () => pipe(_clear, _reloadProxy, init)()],
  X: [DICTIONARY.EXIT, () => process.exit()],
};
