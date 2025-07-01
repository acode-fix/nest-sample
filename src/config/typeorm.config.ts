import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';

config();


const configService = new ConfigService()
//console.log('db'+configService.get('DB_HOST')+  'env:'+process.env.DB_USER)
const datasourceoption:DataSourceOptions  & SeederOptions  = {
    type:'mysql',
     host: configService.get('DB_HOST'),
     port : configService.get('DB_PORT'),
     username: configService.get('DB_USER'),
     password:configService.get('DB_PASS'),
     database: configService.get('DB_NAME'),
     synchronize: false,
     entities: ['dist/**/*.entity{.ts,.js}'],
     migrations: ['dist/database/migrations/*.js'],
      seedTableName: "seeders",
      seedTracking: true,
     seeds: ['dist/database/seeds/**/*{.js,.ts}'],
     factories: ['dist/database/factories/**/*{.js,.ts}'],
     logging: true,
     
}

        const AppDataSource =    new DataSource(datasourceoption);

        export  {datasourceoption, AppDataSource}

// const configService = new ConfigService();
// console.log({'db': process.env.DB_HOST})
// //console.log({'torm:': configService.get<string>('DB_USER') })
// const option : DataSourceOptions & SeederOptions   = {
//   type: 'mysql',
//   host: configService.get<string>('DB_HOST'),
//   port: parseInt(configService.get<string>('DB_PORT'), 5432),
//   username: configService.get<string>('DB_USER'),
//   password: configService.get<string>('DB_PASS'),
//   database: configService.get<string>('DB_NAME'),
//   synchronize: false,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/database/migrations/*.js'],
//   // seedTracking: false,
//   seeds: ['dist/database/seeds/**/*{.js,.ts}'],
//   factories: ['dist/database/factories/**/*{.js,.ts}'],

//   //migrationsRun: false,
//   logging: true,
// }; 
// const AppDataSource = new DataSource(option);
// export default AppDataSource;




// AppDataSource.initialize()
//     .then(() => console.log("DataSource Initialized Successfully"))
//     .catch((err) => console.error("DataSource Initialization Failed:", err));



