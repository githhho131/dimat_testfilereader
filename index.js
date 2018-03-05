const fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

const assert = require('assert');








/**************************************************************************************************
 * Попытка создания спец класса ошибок
 * https://habrahabr.ru/post/244523/
 * Не ясно как получить stackAsString (строка 27)
 * @param {*} message 
 * @param {*} customProperty 
 */
function MyError(message, customProperty) {
    Error.captureStackTrace(this, this.constructor);
    Error.prepareStackTrace = function(error, stack) {
        error._stackAsArray = stack.map(function(call){
            return {
                // ...
                file : call.getFileName()
            };
        });
        // ...
        //return error + ':\n' + stackAsString;
        return error + ':\n' + stack;
    };
    this.message = message;
    this.customProperty = customProperty;
}



// Для успешного сравнения с помощью ...instanceof Error:
var inherits = require('util').inherits;
inherits(MyError, Error);

Object.defineProperty(MyError.prototype, 'stackAsArray', {
    get : function() {
        // Инициируем вызов prepareStackTrace
        this.stack;
        return this._stackAsArray;
    }
});
/********************************************************************************************** */





function ReadFileCustom(){
    this._file = "";
    this._info = "File reader classss";
}
ReadFileCustom.prototype = new EventEmitter();








/*
 * ReadFileCustom класс метод readDataFromFile. Устанавливает соединение с файлом чтения 
 * с помощью fs.ReadStream. Аргументы:
 *
 *    filePath       строка адреса;
 *                   
 *
 *
 *    callback       функция вызываемая после завершения операции,
 *                   если операция завершилась успешно, происходит 
 *                   вызов вида callback(fileText), где fileText это
 *                   прочитанный из файла текст, если возникла ошибка,
 *                   выполняется вызов вида callback(err).
 *
 * В функции могут возникнуть ошибки следующих типов:
 *
 *    По указанному адресу файл не значится
 *
 * Все возвращаемые объекты ошибок имеют поля "remoteIp" и "remotePort".
 * После возникновении ошибки, сокеты, которые были открыты функцией, будут закрыты.
 *
 * 
 * @param {*} filePath 
 * @param {*} callback 
 */
ReadFileCustom.prototype.readDataFromFile = function(filePath, callback){

    
    
    
    assert.equal(typeof (filePath), 'string', "аргумент 'filePath' должен быть строкового типа");
    assert.equal(typeof (callback), 'function', "аргумент 'callback' должен быть функцией");
    
    
    
    
    /**
     * напоминание: ReadFileCustom наследует от EventEmittera
     */
    if(typeof callback == 'function'){
        this.on('readDataCust', callback); 
    }

    if(fs.existsSync(filePath)){
        var fileData = ''; 
        var readerStream = fs.createReadStream(filePath);
        readerStream.setEncoding('UTF8');
        
        readerStream.on('data', function (chunk) {
            fileData += chunk; 
        });

        
        

        readerStream.on('end', () => {
            this.emit('readDataCust', fileData);
        });
        
        readerStream.on('error', (err) => {
            this.emit('readDataCust', new Error(err));
        }); 
    }
    else{
        //this.emit('readDataCust', new Error('File path spetified do not exist!!'));
        this.emit('readDataCust', new MyError('File path spetified do not exist!!!!!!!!!!', 'ReadFileCustom.prototype.readDataFromFile'));
    }
        
        
};



module.exports.Reader = ReadFileCustom;




















