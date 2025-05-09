fx_version "cerulean"
description "RedM 上下文菜单系统"
author "oliann97"
version '1.0.0'
lua54 'yes'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
games {
  "gta5",
  "rdr3"
}
client_script "client/menu.lua"
ui_page 'web/build/index.html'
files {
	'web/build/index.html',
	'web/build/**/*',
}
