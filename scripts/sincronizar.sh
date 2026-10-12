#!/usr/bin/env bash
set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
ORIGEM="${1:-$RAIZ/..}"

rsync -a --delete \
  --exclude='.git' --exclude='target' --exclude='.idea' --exclude='.env' --exclude='DOCS' \
  "$ORIGEM/TEDUND1BESNOTT1GR5_BACK/" "$RAIZ/back/"

rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='.angular' --exclude='dist' --exclude='.vscode' \
  "$ORIGEM/TEDUND1BESNOTT1GR5_FRONT/" "$RAIZ/front/"

echo "Código do back e do front copiado para $RAIZ"
