export const ValidationRule = {
  REQUIRED: "REQUIRED",
  EMAIL: "EMAIL",
  LENGTH: "LENGTH",
  MATCH: "MATCH",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  getDefaultErrorState = () => {
    const errorState = {}
    for (const [property, ] of Object.entries(this.rules)) {
      errorState[property] = {
        isInvalid: false,
        message: ''
      }
    }
    return errorState;
  }

  validate = (state) => {
    let isValid = true;
    const errors = {}

    for (const [property, ruleSet] of Object.entries(this.rules)) {
      for (let i = 0; i < ruleSet.rules.length; i++) {
        const error = this.validateRule(property, ruleSet.rules[i], state);
        if (error) {
          errors[property] = { isInvalid: true, message: error };
          isValid = false;
          break;
        }
      }

      if (!errors[property]) {
        errors[property] = { isInvalid: false, message: '' };
      }
    }

    return { isValid, errors };
  }

  validateRule = (property, rule, state) => {
    const label = this.rules[property].label;
    const value = state[property];
    let ruleType = rule;
    if (Array.isArray(rule)) {
      ruleType = rule[0]
    }

    switch (ruleType) {
      case ValidationRule.REQUIRED:
        if (value === undefined || value === "") {
          return `${label} is required`;
        }
        break;
      case ValidationRule.EMAIL:
        if (!EMAIL_REGEX.test(value)) {
          return `${label} must be an email address`;
        }
        return;
      case ValidationRule.LENGTH:
        const min = rule[1];
        const max = rule[2];
        if (min && value.length < min) {
          return `${label} must be longer than ${min} characters`;
        }
        if (max && value.length > max) {
          return `${label} must be shorter than ${max} characters`;
        }
        return;
      case ValidationRule.MATCH:
        const matchProperty = rule[1];
        if (value !== state[matchProperty]) {
          return `${label} must match ${this.rules[matchProperty].label}`;
        }
        return;
      default:
        console.warn(`Validation rule not supported: ${ruleType}`);
        return;
    }
  }
}
