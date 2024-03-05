import { $ } from "bun";

export const pipe =
  (...fns) =>
  (payload) =>
    fns.reduce(
      (value, fn) => (value instanceof Promise ? value.then(fn) : fn(value)),
      payload
    );

export const _clear = async () => await $`clear`;
export const _getLastUpdates = async () => await $`git pull origin`;
export const _dockerComposeUp = async () =>
  await $`docker-compose up --build -d`;
export const _dockerComposeDown = async () =>
  await $`docker-compose down -v --remove-orphans`;
export const _dockerFrontRebuild = async () =>
  await $`docker-compose up --build frontend --force-recreate --no-deps -d`;
export const _dockerBackRebuild = async () =>
  await $`docker-compose up --build backend --force-recreate --no-deps -d`;

export const _reloadProxy = async () =>
  await $`docker exec -it proxy nginx -s reload`;
