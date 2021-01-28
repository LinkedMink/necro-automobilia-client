import { LogService } from "../Shared/LogService";

const logger = LogService.get("Validator");

export const ValidationRule = {
  REQUIRED: "REQUIRED",
  EMAIL: "EMAIL",
  LENGTH: "LENGTH",
  RANGE: "RANGE",
  COMPARE: "COMPARE",
  JSON: "JSON",
  FUNCTION: "FUNCTION",
};

export const Comparison = {
  GREATER: 0,
  GREATER_OR_EQUAL: 1,
  EQUAL: 2,
  LESS_OR_EQUAL: 3,
  LESS: 4,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  getDefaultErrorState = () => {
    const errorState = {};
    for (const [property] of Object.entries(this.rules)) {
      errorState[property] = {
        isInvalid: false,
        message: "",
      };
    }
    return errorState;
  };

  validate = state => {
    let isValid = true;
    const errors = {};

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
        errors[property] = { isInvalid: false, message: "" };
      }
    }

    return { isValid, errors };
  };

  validateRule = (property, rule, state) => {
    const label = this.rules[property].label;
    const value = state[property];
    let ruleType = rule;
    if (Array.isArray(rule)) {
      ruleType = rule[0];
    }

    let min, max;
    switch (ruleType) {
      case ValidationRule.REQUIRED:
        if (value === undefined || value === null || value === "") {
          return `${label} is required`;
        }
        return;
      case ValidationRule.EMAIL:
        if (typeof value !== "string" || value.trim() === "") return;
        if (!EMAIL_REGEX.test(value)) {
          return `${label} must be an email address`;
        }
        return;
      case ValidationRule.LENGTH:
        if (typeof value !== "string" || value.trim() === "") return;
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
        if (typeof value !== "string" || value.trim() === "") return;
        min = rule[1];
        max = rule[2];
        if (min !== undefined && Number(value) < min) {
          return `${label} must be greater than ${min}`;
        }
        if (max !== undefined && Number(value) > max) {
          return `${label} must be less than ${max}`;
        }
        return;
      case ValidationRule.COMPARE:
        const compareProperty = rule[1];
        const order = rule[2] ? rule[2] : Comparison.EQUAL;
        const compareTo = state[compareProperty];

        if (value !== compareTo) {
          if (order === Comparison.EQUAL) {
            return `${label} must match ${this.rules[compareProperty].label}`;
          } else if (
            order === Comparison.GREATER_OR_EQUAL &&
            value < compareTo
          ) {
            return `${label} must be greater than or equal ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.LESS_OR_EQUAL && value > compareTo) {
            return `${label} must be less than or equal ${this.rules[compareProperty].label}`;
          }
        } else {
          if (order === Comparison.GREATER && value <= compareTo) {
            return `${label} must be greater than ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.LESS && value >= compareTo) {
            return `${label} must be less than ${this.rules[compareProperty].label}`;
          }
        }
        return;
      case ValidationRule.JSON:
        if (value.trim() === "") return;
        try {
          JSON.parse(value);
        } catch (e) {
          return `${label} must be valid JSON`;
        }
        return;
      case ValidationRule.FUNCTION:
        const validateFunction = rule[1];
        return validateFunction();
      default:
        logger.warn(`Validation rule not supported: ${ruleType}`);
        return;
    }
  };
}
