#!/bin/bash

# 批量为组件添加 dark mode 样式

# 公共替换模式
files=(
  "src/components/LanguageSwitcher.tsx"
  "src/components/BackgroundSelector.tsx"
  "src/components/FontSelector.tsx"
  "src/components/ExampleSelector.tsx"
  "src/components/ColorPicker.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    
    # 按钮样式
    sed -i 's/bg-white hover:bg-gray-50 border border-gray-300/bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600/g' "$file"
    sed -i 's/text-gray-700"/text-gray-700 dark:text-gray-200"/g' "$file"
    sed -i 's/text-gray-600"/text-gray-600 dark:text-gray-300"/g' "$file"
    
    # 下拉菜单
    sed -i 's/bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5/bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700/g' "$file"
    
    # 菜单项
    sed -i 's/text-gray-700 hover:bg-gray-50"/text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"/g' "$file"
    sed -i 's/text-gray-500 hover:bg-gray-100/text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/g' "$file"
    
    # 选中状态
    sed -i 's/bg-indigo-50 text-indigo-700/bg-indigo-50 dark:bg-indigo-900\/30 text-indigo-700 dark:text-indigo-400/g' "$file"
    
    # 分隔线
    sed -i 's/border-gray-200"/border-gray-200 dark:border-gray-700"/g' "$file"
    sed -i 's/bg-gray-100/bg-gray-100 dark:bg-gray-700/g' "$file"
    
    # 文字颜色
    sed -i 's/text-gray-900"/text-gray-900 dark:text-gray-100"/g' "$file"
    sed -i 's/text-gray-800"/text-gray-800 dark:text-gray-200"/g' "$file"
    sed -i 's/text-gray-400"/text-gray-400 dark:text-gray-500"/g' "$file"
  fi
done

echo "Dark mode styles updated!"

