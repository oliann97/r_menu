# r_menu - RedM 上下文菜单系统

<div align="center">
  <img src="https://r2.fivemanage.com/o0SQp9T24AoAbL1nduWW2/r_menu.png" alt="预览" width="500px">
</div>

## 简介

r_menu 是一个专为 RedM 开发的上下文菜单系统，参考了流行的 FiveM qb-menu 设计理念，但专门针对西部风格进行了重新设计。使用 React 和 TypeScript 构建，提供了流畅的用户体验和高度的可定制性。

## 安装

1. 下载或克隆此仓库
2. 将文件夹 `r_menu` 放入您的服务器 `resources` 目录
3. 将 `r_menu` 添加到您的 `server.cfg` 中的资源列表
   ```
   ensure r_menu
   ```

## 使用方法

### 基本用法

```lua
-- 创建菜单项目
local menuItems = {
    {
        header = "菜单标题",
        isMenuHeader = true, -- 标记为标题行
    },
    {
        header = "选项 1",
        txt = "选项描述",
        params = {
            event = "r_menu:client:testOption",
            args = {
                message = "你选择了选项 1"
            }
        }
    },
    {
        header = "禁用选项",
        txt = "这个选项无法点击",
        disabled = true,
        params = {
            event = "r_menu:client:testOption",
            args = {
                message = "这不会被触发，因为选项被禁用了"
            }
        }
    }
}

-- 打开菜单
exports['r_menu']:openMenu(menuItems)
```

### 子菜单示例

```lua
-- 主菜单
local menuItems = {
    {
        header = "主菜单",
        isMenuHeader = true,
    },
    {
        header = "进入子菜单",
        txt = "点击打开子菜单",
        params = {
            event = "r_menu:client:subMenu",
            args = {
                data = "传递的数据"
            }
        }
    }
}

-- 子菜单事件处理
RegisterNetEvent('r_menu:client:subMenu', function(data)
    local subMenuItems = {
        {
            header = "< 返回",
            params = {
                event = "r_menu:client:returnToMain", -- 自定义返回事件
            }
        },
        {
            header = "子菜单选项",
            txt = "这是子菜单选项",
            params = {
                event = "r_menu:client:testOption",
                args = {
                    message = "你选了子菜单选项"
                }
            }
        },
    }
    
    exports['r_menu']:openMenu(subMenuItems)
end)
```

### 菜单项参数

| 参数 | 类型 | 必填 | 描述 |
|----------|--------|---------|------------------------------------------------------|
| header | string | 是 | 菜单项标题 |
| txt | string | 否 | 菜单项描述文本 |
| icon | string | 否 | 菜单项图标 |
| isMenuHeader | boolean | 否 | 是否为菜单标题（不可点击） |
| disabled | boolean | 否 | 是否禁用该选项 |
| hidden | boolean | 否 | 是否隐藏该选项 |
| params | table | 否 | 点击菜单项时触发的事件参数 |

#### params 参数

| 参数 | 类型 | 描述 |
|----------|--------|-------------|
| event | string/function | 事件名称或函数 |
| args | table | 传递给事件的参数 |
| isServer | boolean | 是否触发服务器事件 |
| isCommand | boolean | 是否执行命令 |
| isAction | boolean | 是否执行函数 |

## 导出功能

```lua
-- 打开菜单
exports['r_menu']:openMenu(menuItems)

-- 关闭菜单
exports['r_menu']:closeMenu()
```

## 致敦

该脚本受到 [qb-menu](https://github.com/qbcore-framework/qb-menu) 的启发，感谢 QBCore 团队为 FiveM 社区贡献的优秀脚本。r_menu 遵循了相同的设计理念，同时为 RedM 环境量身定制并添加了新特性。

## 授权

本项目采用 MIT 许可证。