import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatch', async: false })
export class PasswordMatch implements ValidatorConstraintInterface {
  validate(passwordConfirmation: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return passwordConfirmation === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password confirmation does not match password';
  }
}
