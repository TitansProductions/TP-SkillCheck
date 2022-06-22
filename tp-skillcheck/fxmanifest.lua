fx_version 'adamant'
game 'gta5'

author 'Nosmakos'
description 'Titans Productions Skill Check (Standalone)'
version '1.0.0'

ui_page 'html/index.html'

server_scripts {
    'config.lua',
    'locales.lua',
    'server/*.lua',
}


client_scripts {
    'config.lua',
    'locales.lua',
    'client/*.lua',
}

files {
	'html/index.html',
	'html/js/*.js',
	'html/css/*.css',
	'html/font/Prototype.ttf',
    'html/img/*.png',
    'html/img/*.jpg',
}
