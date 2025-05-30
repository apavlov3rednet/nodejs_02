class ModelController {
  constructor(model) {
    this.fields = model.fields;
    this.rules = model?.rules || {};
    this.system = model?.system || {};
    this.validator = model?.validator || {};
    this.prepareFields = {};
    this.errors = {};
  }

  #checkType(type, value) {
    switch (type) {
      case "string":
        if (typeof value === "string") return true;
        break;

      case "number":
        if (typeof value === "number") return true;
        break;

      case "list":
        if (value instanceof Array) return true;
        break;

      default:
        return false;
        break;
    }
  }

  #checkImportant(important, value) {
    if (important && value === "") return false;

    return true;
  }

  #checkValidate(value, validator = "") {
    if (validator != "") {
      let reg = new RegExp(validator);
      let result = value.match(reg); //Если match ничего не находит то возвращает null
      return result !== null;
    }

    return true;
  }

  /**
   * Итогом должен вернуться подготовленный массив данных на запись
   * @param {*} data
   */
  prepareDataByModel(data) {
    for (let fieldName in this.fields) {
      let field = this.fields[fieldName];
      let value = data[fieldName];

      if(field.system) continue;

      if (!value) {
        this.errors[fieldName] = `Error 2004: ${fieldName} must be isset`;
        continue;
      }

      const correctType = this.#checkType(field.type, value);
      const correctImportant = this.#checkImportant(field.important, value);
      const correctValidate = this.#checkValidate(value, field.validator);

      if (!correctType) {
        this.errors[fieldName] = "Error 2001: Incorrect type";
        continue;
      }

      if (!correctValidate) {
        this.errors[fieldName] = "Error 2002: Invalid field";
        continue;
      }

      if (!correctImportant) {
        this.errors[fieldName] = "Error 2003: Must be not empty";
        continue;
      }

      this.prepareFields[fieldName] = value;
    }
  }

  success() {
    return Object.keys(this.errors).length === 0;
  }
}

module.exports = ModelController;
