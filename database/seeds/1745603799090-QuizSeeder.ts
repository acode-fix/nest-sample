import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import {  Quiz }  from  'src/entities/quiz.entity';
import { Question } from 'src/entities/question.entity';
import { faker } from '@faker-js/faker';

export class QuizSeeder1745603799090 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {




        const   QuizRepo = dataSource.getRepository(Quiz);
            const Questionrepo = dataSource.getRepository(Question);
            await QuizRepo.insert([
                { title: 'JavaScript Basics', description: 'Basic JavaScript Quiz' , isActive: true },
                { title: 'Advanced TypeScript', description: 'In-depth TypeScript Quiz' , isActive: true },
                { title: 'NestJS Fundamentals', description: 'Quiz on NestJS Core Concepts'  , isActive: true},
              ]);
        
             let  Quiz2 = await QuizRepo.find()
             console.log('Quiz2 data'+ Quiz2)
        
             for (const quiz of Quiz2) {
                   for (let i = 0; i < 3; i++) {
        
                    await  Questionrepo.insert([
                      { question: faker.lorem.sentence(), quiz: quiz,qxn_img:null }
                    
                    ]);
                  
                   }
                 }
        
              
        
              console.log('seeder successfully!')





    }
}
