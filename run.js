import { $ } from "bun";
const pipe =
  (...fns) =>
  (payload) =>
    fns.reduce(
      (value, fn) => (value instanceof Promise ? value.then(fn) : fn(value)),
      payload
    );

const _alertUnknownCommand = () =>
  process.stdout.write("🧨 Неизвестная команда");
const _clear = async () => await $`clear`;
const _getCurrentInfo = async () => await $`git status`;
const _lsThis = async () => await $`ls -la .`;

var currentOps = {
  1: [
    "Получить текущую информацию о репозитории",
    () => pipe(_clear, _getCurrentInfo, init)(),
  ],
  2: [
    "Получить список содержимого репозитория",
    () => pipe(_clear, _lsThis, init)(),
  ],
  X: ["Выход", () => process.exit()],
};

const init = () =>
  process.stdout.write(
    `

В настоящий момент доступны следующие операции:

${Object.entries(currentOps)
  .map(([key, value]) => `${key}) ${value[0]}`)
  .join("\n")}

[Ваш выбор] > `
  );

init();

for await (const line of console) {
  const input = line.trim().toUpperCase();
  if (input in currentOps) {
    await currentOps[input][1]?.();
    continue;
  } else {
    await pipe(_clear, _alertUnknownCommand, init)();
  }
}
