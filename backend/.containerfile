FROM oven/bun:1 as base
WORKDIR /var/www

FROM base AS build
RUN mkdir -p /temp/build
COPY package.json bun.lockb /temp/build/
RUN cd /temp/build && bun install --frozen-lockfile
RUN bun run build

ENV NODE_ENV=production
RUN bun run build

FROM base AS runtime
COPY --from=build /temp/build/node_modules node_modules
COPY --from=build /temp/build/dist .

USER bun
EXPOSE 5702/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]
