//Подключаем модуль файловой системы
import fs from "node:fs";
import { ArrayTools } from "./array.js";

//Создаем и экспортируем класс Хранилища
export class Storage {
    #dir = '/storage/';  //private

    constructor(fileDir = '') {
        if (fileDir != "") this.#dir = this.#dir + fileDir + "/"; 
        // /storage/users/
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

        const nameFile = this.#dir + fileName + '.json'; //создаем путь файла
        const content = JSON.stringify(jsonData); // s:{0:'name'}
        return this.#writeToFile(nameFile, content);
    }
    
    //Удаление файла
    deleteFile(fileName) {
        const nameFile = this.#dir + fileName + '.json';
        fs.unlink(nameFile);
    }

    //Чтение из файла
    readFile(fileName) {
        const nameFile = this.#dir + fileName + '.json';
        fs.readFile(nameFile, 'utf8', (err, data) => {
            if(err) {
                console.error('Error: ' + err);
                return false;
            }
            else {
                try {
                    return JSON.parse(data);
                } catch (parseErr) {
                    console.error('Ошибка при разборе JSON данных:', parseErr);
                    return false;
                }
            }
        });
    }

    findFile(fileName) {
        fs.access(
            fileName, 
            fs.constants.F_OK, 
            (err) => !!err
        );
    }

    updateFile(fileName, content) {
        const filePath = this.#dir + fileName + '.json';
        //1. Найти есть ли такой файл
        if(this.findFile(filePath)) {
            //2. Считать содержимое файла
            let oldContent = this.readFile(filePath); //array
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
