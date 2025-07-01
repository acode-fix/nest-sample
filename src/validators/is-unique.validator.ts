import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Injectable } from "@nestjs/common";
//import { InjectDataSource } from "@nestjs/typeorm";
//import { DataSource } from "typeorm";
import {AppDataSource } from "src/config/typeorm.config";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
    
        const [entityClass, column] = args.constraints;
        const repo =  AppDataSource.getRepository(entityClass);
    
        const record = await repo.findOne({ where: { [column]: value } });
        return !record; // 
    }

    defaultMessage(args: ValidationArguments): string {
        const column = args.constraints[1];
        return `${column} (${args.value}) is already in use!`;
    }
}
