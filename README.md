
yarn typeorm migration:create --dataSource src/database/data-source.ts
yarn typeorm migration:generate ./src/migrations/nome-da-migracao -d src/database/data-source.ts
yarn typeorm migration:run --dataSource src/database/data-source.ts