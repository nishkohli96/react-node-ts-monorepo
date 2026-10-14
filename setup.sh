#!/bin/bash

# Exit immediately if any command fails (i.e., returns a non-zero exit code).
set -euo pipefail

# Everything below (.nvmrc, the node_modules wipe, pnpm) is relative to the
# repo root, so it must not depend on where the script is called from.
cd "$(dirname "$0")"

PKG_NAME="common"

echo "🏁 Initiating Setup..."
echo "🔍 Checking for global dependencies..."

if [ ! -f ".nvmrc" ]; then
  echo "❌ .nvmrc not found."
  exit 1
fi
REQUIRED_NODE_MAJOR="$(tr -d 'v \n' < .nvmrc | cut -d. -f1)"

# Ensure nvm is loaded
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  echo "🔧 Using Node version from .nvmrc"
  nvm install
  nvm use
elif command -v node >/dev/null 2>&1; then
  SYSTEM_NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$SYSTEM_NODE_MAJOR" != "$REQUIRED_NODE_MAJOR" ]; then
    echo "❌ nvm not found and system Node is $(node -v), but .nvmrc needs v$REQUIRED_NODE_MAJOR."
    exit 1
  fi
  echo "⚠️ nvm not found, using system Node."
else
  echo "❌ Neither nvm nor node is installed."
  exit 1
fi
echo "✅ Node version: $(node -v)"

# The pnpm version lives in package.json ("packageManager"), read it from there
REQUIRED_PNPM_VERSION="$(node -p "require('./package.json').packageManager.split('@')[1]")"

install_pnpm() {
  npm install -g "pnpm@$REQUIRED_PNPM_VERSION" || {
    echo "❌ Could not install pnpm globally (permissions?). Install pnpm@$REQUIRED_PNPM_VERSION yourself and re-run."
    exit 1
  }
}

# Check if pnpm is installed and the version
if command -v pnpm >/dev/null 2>&1; then
  CURRENT_PNPM_VERSION=$(pnpm -v)
  if [ "$(printf '%s\n' "$REQUIRED_PNPM_VERSION" "$CURRENT_PNPM_VERSION" | sort -V | head -n1)" != "$REQUIRED_PNPM_VERSION" ]; then
    echo "⚠️ pnpm version $CURRENT_PNPM_VERSION is older than $REQUIRED_PNPM_VERSION. Upgrading..."
    install_pnpm
  else
    echo "✅ pnpm v$CURRENT_PNPM_VERSION is installed."
  fi
else
  echo "📦 pnpm not found. Installing v$REQUIRED_PNPM_VERSION..."
  install_pnpm
fi

# Clean old dependencies
echo "🧹 Removing old dependencies..."
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Install dependencies and build the local package
echo "Installing Dependencies & Building Package 🛠️"
pnpm install --frozen-lockfile

pnpm --filter "$PKG_NAME" run build

echo "✅ Setup Complete! 🎉🎉🎉"
