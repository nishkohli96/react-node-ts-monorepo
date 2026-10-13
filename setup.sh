#!/bin/sh
# One-time project setup. Run from anywhere: sh setup.sh
set -e

cd "$(dirname "$0")"

# pnpm runs the workspace, ncu keeps dependencies up to date
command -v pnpm >/dev/null 2>&1 || npm i -g pnpm
command -v ncu >/dev/null 2>&1 || npm i -g npm-check-updates

pnpm install
pnpm build
