# r_menu - RedM 上下文菜单系统

<div align="center">
  <img src="https://r2.fivemanage.com/o0SQp9T24AoAbL1nduWW2/r_menu1.1.png" alt="预览" width="500px">
</div>

## 简介

r_menu 是一个专为 RedM 开发的上下文菜单系统，参考了流行的 FiveM qb-menu 设计理念，但专门针对西部风格进行了重新设计。使用 React 和 TypeScript 构建。

## 安装

### 从 Releases 下载

1. 前往此仓库的 [Releases](https://github.com/oliann97/r_menu/releases) 页面
2. 下载最新版本的压缩包
3. 解压文件，将 `r_menu` 文件夹放入您的服务器 `resources` 目录
4. 将 `r_menu` 添加到您的 `server.cfg` 中的资源列表
   ```
   ensure r_menu
   ```

## 使用方法

```lua
-- 创建菜单项目
local menuItems = {
    {
        header = "菜单标题",
        isMenuHeader = true,
    },
    {
        header = "商店",
        txt = "查看可购买的物品",
        icon = "fas fa-store", -- Solid 图标集的 store 图标
        params = {
            event = "r_menu:client:openShop",
            args = {}
        }
    },
    {
        header = "背包",
        txt = "打开你的背包",
        icon = "fas fa-backpack", -- Solid 图标集的 backpack 图标
        params = {
            event = "r_menu:client:openInventory",
            args = {}
        }
    },
    {
        header = "马厩",
        txt = "查看你的马厩",
        icon = "fas fa-horse", -- Solid 图标集的 horse 图标
        params = {
            event = "r_menu:client:openStable",
            args = {}
        }
    },
    {
        header = "宠物",
        txt = "查看你的宠物",
        icon = "fas fa-paw", -- Solid 图标集的 paw 图标
        params = {
            event = "r_menu:client:openPets",
            args = {}
        }
    }
}

-- 打开菜单
exports.r_menu:openMenu(menuItems)
```

### 支持的图标格式

* `fas` - Font Awesome Solid 图标集
* `far` - Font Awesome Regular 图标集
* `fab` - Font Awesome Brands 图标集

例如："fas fa-horse"，"far fa-envelope"，"fab fa-github"

访问 [Font Awesome 图标库](https://fontawesome.com/icons) 查看所有可用的图标。

### 菜单项参数

| 参数 | 类型 | 必填 | 描述 |
|----------|--------|---------|------------------------------------------------------|
| header | string | 是 | 菜单项标题 |
| txt | string | 否 | 菜单项描述文本 |
| icon | string/array | 否 | 菜单项图标，支持 Font Awesome 图标 |
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
exports.r_menu:openMenu(menuItems)

-- 关闭菜单
exports.r_menu:closeMenu()
```

## 致敦

该脚本受到 [qb-menu](https://github.com/qbcore-framework/qb-menu) 的启发，感谢 QBCore 团队为 FiveM 社区贡献的优秀脚本。r_menu 遵循了相同的设计理念，同时为 RedM 环境量身定制并添加了新特性。

## 授权

本项目采用 MIT 许可证。