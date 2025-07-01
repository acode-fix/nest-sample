import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1746010038135 implements MigrationInterface {
    name = 'InitSchema1746010038135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_46b668c49a6c4154d4643d875a5\``);
        await queryRunner.query(`ALTER TABLE \`options\` CHANGE \`questionId\` \`questionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_35d54f06d12ea78d4842aed6b6d\``);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`qxn_img\` \`qxn_img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`quizId\` \`quizId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`quizes\` CHANGE \`info\` \`info\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`options\` ADD CONSTRAINT \`FK_46b668c49a6c4154d4643d875a5\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_35d54f06d12ea78d4842aed6b6d\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_35d54f06d12ea78d4842aed6b6d\``);
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_46b668c49a6c4154d4643d875a5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`quizes\` CHANGE \`info\` \`info\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`quizId\` \`quizId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`qxn_img\` \`qxn_img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_35d54f06d12ea78d4842aed6b6d\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`options\` CHANGE \`questionId\` \`questionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`options\` ADD CONSTRAINT \`FK_46b668c49a6c4154d4643d875a5\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
