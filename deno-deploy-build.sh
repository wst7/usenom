#!/usr/bin/env bash
set -e  # 遇到错误立即退出

# 1. 安装依赖
# pnpm install

# 2. 构建所有 @usenom 包
pnpm --filter=@usenom/* build

# 3. 部署逻辑（根据实际需求添加）
cp -R apps/web/.next ./