#!/bin/bash

# Instalar las dependencias necesarias
npm install

# Configurar la base de datos PostgreSQL y Sequelize
# Aquí debes reemplazar los valores con los de tu base de datos
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=hoshi
export DATABASE_NAME=notes
export DATABASE_HOST=localhost
export DATABASE_PORT=5001

# Crear la base de datos si no existe
psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME -c "CREATE DATABASE $DATABASE_NAME;"

# Ejecutar las migraciones para crear las tablas en la base de datos
npx sequelize db:migrate

# Llenar la base de datos con datos iniciales (si es necesario)
# npx sequelize db:seed:all

# Ejecutar la aplicación Nest.js en modo desarrollo
npm run start:dev
