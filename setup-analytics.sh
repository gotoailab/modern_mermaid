#!/bin/bash

echo "================================================"
echo "   Google Analytics 配置助手"
echo "================================================"
echo ""
echo "此脚本将帮助你配置 Google Analytics。"
echo ""

# 检查是否已存在 .env.local
if [ -f ".env.local" ]; then
    echo "⚠️  检测到已存在 .env.local 文件"
    read -p "是否覆盖现有文件？(y/N): " overwrite
    if [[ ! $overwrite =~ ^[Yy]$ ]]; then
        echo "❌ 已取消操作"
        exit 0
    fi
fi

# 询问 Measurement ID
echo ""
echo "请输入你的 Google Analytics Measurement ID"
echo "格式示例: G-ABC123XYZ"
read -p "Measurement ID: " measurement_id

# 验证格式
if [[ ! $measurement_id =~ ^G-[A-Z0-9]+$ ]]; then
    echo "❌ 格式错误！Measurement ID 应该以 G- 开头"
    exit 1
fi

# 创建 .env.local 文件
cat > .env.local << ENVEOF
# Google Analytics Configuration
# 此文件由 setup-analytics.sh 生成
# 生成时间: $(date)

VITE_GA_MEASUREMENT_ID=$measurement_id
ENVEOF

echo ""
echo "✅ 配置完成！"
echo ""
echo "📝 已创建 .env.local 文件"
echo "🔑 Measurement ID: $measurement_id"
echo ""
echo "下一步："
echo "1. 重启开发服务器: npm run dev 或 pnpm dev"
echo "2. 打开浏览器控制台，查看是否有初始化日志"
echo "3. 访问 Google Analytics 实时报告验证数据"
echo ""
echo "================================================"
