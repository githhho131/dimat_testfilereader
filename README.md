# dimat_testfilereader
 * ReadFileCustom класс метод readDataFromFile. Устанавливает соединение с файлом чтения   * с помощью fs.ReadStream. Аргументы:  *  *    filePath       строка адреса;  *                     *  *  *    callback       функция вызываемая после завершения операции,  *                   если операция завершилась успешно, происходит   *                   вызов вида callback(fileText), где fileText это  *                   прочитанный из файла текст, если возникла ошибка,  *                   выполняется вызов вида callback(err).  *  * В функции могут возникнуть ошибки следующих типов:  *  *    По указанному адресу файл не значится  *  * Все возвращаемые объекты ошибок имеют поля "remoteIp" и "remotePort".  * После возникновении ошибки, сокеты, которые были открыты функцией, будут закрыты.  *  *   * @param {*} filePath   * @param {*} callback 


new_feature ветка