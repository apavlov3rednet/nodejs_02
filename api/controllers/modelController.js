class ModelController {
  constructor(model) {
    this.fields = model.fields;
    this.rules = model?.rules || {};
    this.system = model?.system || {};
    this.validator = model?.validator || {};
  }

  #checkType(type, value) {
    switch (type) {
      case "string":
        if (!(value instanceof String))
            return false;
        break;

      case "number":
        if (!(value instanceof Number))
            return false;
        break;

      case "list":
        if (!(value instanceof Array))
            return false;
        break;
      default:
        return false;
        break;
    }
  }

  /**
   * Итогом должен вернуться подготовленный массив данных на запись
   * @param {*} data 
   */
  prepareDataByModel(data) {
    let obRequest = {
      errors: {},
      items: {},
    };

    for (let fieldName in this.fields) {
      let field = this.fields[fieldName];
      let value = data[fieldName];

      if (field.important && value != "") {
        obRequest[fieldName] = value;
      }
    }
  }
}

module.exports = ModelController;
