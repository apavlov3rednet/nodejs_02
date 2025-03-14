//Подключаем модуль файловой системы
const fs = require('fs').promises;
const ArrayTools = require("./array.js");

//Создаем и экспортируем класс Хранилища
class Storage {
    #dir = '/storage/';  //private

    constructor(fileDir = '') {
        if (fileDir != "") this.#dir = this.#dir + fileDir + "/"; 
        // /storage/users/
    }

    #prepareFilePath(fileName) {
        //current wild directory C:/OSPanel/home/nodejs_02/
        return process.cwd() + this.#dir + fileName + '.json';
    }

    #writeToFile(nameFile, content) {
        fs.writeFile(nameFile, content, err => {
            if(err) {
                console.error('Error: ' + err);
                return false;
            }
            else {
                console.log('Success');
                return true;
            }
        });
    }

    /**
     * Создание файла
     * @param {*} fileName 
     * @param {*} jsonData 
     */
    createFile(fileName, jsonData) { //jsonData = 'name'
        //Отменяем создание если данных нехватает
        if(!fileName || !jsonData) {
            return false;
        }

        const nameFile = this.#prepareFilePath(fileName); //создаем путь файла
        const content = JSON.stringify(jsonData); // s:{0:'name'}
        return this.#writeToFile(nameFile, content);
    }
    
    //Удаление файла
    deleteFile(fileName) {
        const nameFile = this.#prepareFilePath(fileName);
        fs.unlink(nameFile);
    }

    getAllFiles() {
        //искомая директория
        let dir = process.cwd() + this.#dir;
        //результируйщий объект
        let dataResult = {};

        fs.readdir(dir, (err, files) => { //читаем директорию ищем все файлы
            if(err) {
                return console.error(err);
            }
            else {
                files.forEach(async (file, index) => { 
                    //читаем каждый файл и записываем в результирующий объект
                    dataResult[index] = await this.readFile(file);
                });
            }
        });

        return dataResult;
    }

    //Чтение из файла
    async readFile(fileName) {
        const nameFile = this.#prepareFilePath(fileName);
        return await fs.readFile(nameFile, 'utf8');
    }

    findFile(fileName) {
        fs.access(
            fileName, 
            fs.constants.F_OK, 
            (err) => !!err
        );
    }

    async updateFile(fileName, content) {
        const filePath = this.#dir + fileName + '.json';
        //1. Найти есть ли такой файл
        if(this.findFile(filePath)) {
            //2. Считать содержимое файла
            let oldContent = await this.readFile(filePath); //array
            //3. Обновить содержимое файла с обновлением
            let newContent = ArrayTools.array_merge(oldContent, content);
            return this.#writeToFile(filePath, newContent);
        }
        else {
            console.error('Файла не существует');
            return false;
        }
    }
}

module.exports = Storage;