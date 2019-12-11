export const ValidationRule = {
  REQUIRED: "REQUIRED",
  EMAIL: "EMAIL",
  LENGTH: "LENGTH",
  RANGE: "RANGE",
  MATCH: "MATCH",
  JSON: "JSON"
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

    let min, max;
    switch (ruleType) {
      case ValidationRule.REQUIRED:
        if (value === undefined || value === "") {
          return `${label} is required`;
        }
        break;
      case ValidationRule.EMAIL:
        if (value.trim() === '') return;
        if (!EMAIL_REGEX.test(value)) {
          return `${label} must be an email address`;
        }
        return;
      case ValidationRule.LENGTH:
        if (value.trim() === '') return;
        min = rule[1];
        max = rule[2];
        if (min !== undefined && value.length < min) {
          return `${label} must be longer than ${min} characters`;
        }
        if (max !== undefined && value.length > max) {
          return `${label} must be shorter than ${max} characters`;
        }
        return;
      case ValidationRule.RANGE:
        if (value.trim() === '') return;
        min = rule[1];
        max = rule[2];
        if (min !== undefined && Number(value) < min) {
          return `${label} must be greater than ${min}`;
        }
        if (max !== undefined && Number(value) > max) {
          return `${label} must be less than ${max}`;
        }
        return;
      case ValidationRule.MATCH:
        const matchProperty = rule[1];
        if (value !== state[matchProperty]) {
          return `${label} must match ${this.rules[matchProperty].label}`;
        }
        return;
      case ValidationRule.JSON:
        if (value.trim() === '') return;
        try {
          JSON.parse(value);
        } catch (e) {
          return `${label} must be valid JSON`;
        }
        return;
      default:
        console.warn(`Validation rule not supported: ${ruleType}`);
        return;
    }
  }
}
