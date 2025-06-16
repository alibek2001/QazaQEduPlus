#!/bin/bash

# Создаем директорию для данных MongoDB, если она не существует
MONGODB_DATA_DIR="$(pwd)/data/db"
mkdir -p "$MONGODB_DATA_DIR"

# Запуск MongoDB напрямую
echo "Запуск MongoDB..."
if command -v mongod &> /dev/null; then
    # Проверяем, не запущен ли уже MongoDB
    if pgrep mongod > /dev/null; then
        echo "MongoDB уже запущен"
    else
        echo "Запуск MongoDB с использованием локальной директории данных..."
        mongod --dbpath "$MONGODB_DATA_DIR" --logpath "$(pwd)/data/mongodb.log" --fork || echo "Не удалось запустить MongoDB"
    fi
else
    echo "MongoDB не найден. Убедитесь, что MongoDB установлен или используйте MongoDB Atlas."
    echo "Изменяем конфигурацию для использования MongoDB Atlas..."
    # Если MongoDB не установлен, изменяем .env для использования MongoDB Atlas
    if [ -f "server/.env" ]; then
        # Используем MongoDB Atlas вместо локальной базы
        sed -i '' 's|mongodb://localhost:27017/qazaqeduplus|mongodb+srv://demo:demo@cluster0.mongodb.net/qazaqeduplus?retryWrites=true&w=majority|g' server/.env
        echo "Конфигурация обновлена для использования MongoDB Atlas"
    fi
fi

# Запуск сервера в фоновом режиме
echo "Запуск сервера..."
cd "$(pwd)/server" && npm run dev &
SERVER_PID=$!

# Запуск клиента
echo "Запуск клиента..."
cd "$(pwd)" && npm run dev &
CLIENT_PID=$!

# Функция для корректного завершения процессов при выходе
cleanup() {
    echo "Завершение процессов..."
    kill $SERVER_PID
    kill $CLIENT_PID
    exit 0
}

# Перехват сигнала завершения
trap cleanup SIGINT SIGTERM

# Ожидание завершения
echo "Приложение запущено! Нажмите Ctrl+C для завершения."
wait
