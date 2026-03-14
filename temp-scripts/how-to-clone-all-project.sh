# Спочатку клонуєш основний проект
git clone https://github.com/TxYtf/smart-house-project-ui

# Переходиш у папку основного проекту (smart-house-project-ui)
cd smart-house-project-ui

# Потім виконуєш git submodule update --init --recursive з кореневої папки проекту
git submodule update --init --recursive
# Це завантажить SmartHouseAPI як submodule всередину папки основного проекту.

# Або можеш зробити це в одну команду:
# git clone --recurse-submodules https://github.com/TxYtf/smart-house-project-ui
