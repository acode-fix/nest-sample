
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const  USERNAME_MESSAGE =  'username can be empty';
const PASSWORD_RULE_MESSSAGE = 'Password must atleast 1 capital case, 1 small case, 1 number,  1 special charaters';

export const REGEX = {
  PASSWORD_RULE
};

export const MESSAGES = {
  PASSWORD_RULE_MESSSAGE, USERNAME_MESSAGE
};