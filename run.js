import { CURRENT_OPS } from "@cli/commands";
import { MOTD } from "@cli/contstants";
import { DICTIONARY } from "@cli/dictionary";
import { _clear, pipe } from "@cli/utils";

const _alertUnknownCommand = () =>
  process.stdout.write(`🧨 ${DICTIONARY.COMMAND_UNKNOWN}`);

export const init = () =>
  process.stdout.write(`
${MOTD}
${DICTIONARY.AVAILABLE_OPERATIONS}

${Object.entries(CURRENT_OPS)
  .map(([key, [title]]) => `  [${key}] ${title}`)
  .join("\n")}

[${DICTIONARY.YOUR_CHOICE}] > `);

init();

for await (const line of console) {
  const input = line.trim().toUpperCase();

  if (input in CURRENT_OPS) {
    await CURRENT_OPS[input][1]?.();
    continue;
  } else {
    await pipe(_clear, _alertUnknownCommand, init)();
  }
}
