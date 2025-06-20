#!/bin/bash

# Корневая директория проекта
ROOT_DIR="$(pwd)"

# Создаем директорию для данных MongoDB, если она не существует
MONGODB_DATA_DIR="$ROOT_DIR/data/db"
mkdir -p "$MONGODB_DATA_DIR"

# Лог-файл MongoDB
MONGODB_LOG="$ROOT_DIR/data/mongodb.log"

# Порт MongoDB по умолчанию
MONGODB_PORT="27017"

# Пытаемся получить порт из server/.env
if [ -f "server/.env" ]; then
    ENV_PORT=$(grep -Eo 'mongodb://[^:]+:[0-9]+' server/.env | sed 's|.*:||')
    if [ -n "$ENV_PORT" ]; then
        MONGODB_PORT="$ENV_PORT"
    fi
fi

# Запуск MongoDB напрямую
echo "Запуск MongoDB..."
if command -v mongod &> /dev/null; then
    # Проверяем, не запущен ли уже MongoDB
    if pgrep mongod > /dev/null; then
        echo "MongoDB уже запущен"
    else
        echo "Запуск MongoDB с использованием локальной директории данных $MONGODB_DATA_DIR на порту $MONGODB_PORT..."
        mongod --dbpath "$MONGODB_DATA_DIR" --port "$MONGODB_PORT" --logpath "$MONGODB_LOG" --fork
        if pgrep mongod > /dev/null; then
            echo "MongoDB успешно запущен. Порт: $MONGODB_PORT, директория данных: $MONGODB_DATA_DIR"
        else
            echo "Не удалось запустить MongoDB. Проверьте лог $MONGODB_LOG"
        fi
    fi
else
    echo "MongoDB не найден. Убедитесь, что MongoDB установлен или используйте MongoDB Atlas."
    echo "Изменяем конфигурацию для использования MongoDB Atlas..."
    # Если MongoDB не установлен, изменяем .env для использования MongoDB Atlas
    if [ -f "server/.env" ]; then
        # Используем MongoDB Atlas вместо локальной базы
        # Определяем ОС и применяем корректный вариант sed:
        #   macOS  -> sed -i ''
        #   Linux  -> sed -i
        case "$(uname)" in
            Darwin)
                sed -i '' 's|mongodb://localhost:27017/qazaqeduplus|mongodb+srv://demo:demo@cluster0.mongodb.net/qazaqeduplus?retryWrites=true&w=majority|g' server/.env
                ;;
            *)
                sed -i 's|mongodb://localhost:27017/qazaqeduplus|mongodb+srv://demo:demo@cluster0.mongodb.net/qazaqeduplus?retryWrites=true&w=majority|g' server/.env
                ;;
        esac
        echo "Конфигурация обновлена для использования MongoDB Atlas"
    fi
fi

# Запуск сервера в фоновом режиме
echo "Запуск сервера..."
cd "$ROOT_DIR/server" && npm run dev &
SERVER_PID=$!

# Возвращаемся в корневую директорию
cd "$ROOT_DIR"

# Запуск клиента
echo "Запуск клиента..."
npm run dev &
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
