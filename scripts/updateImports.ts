import { Project } from 'ts-morph';
// запуск скрипта $ npx ts-node ./scripts/updateImports.ts
const project = new Project({});

// добавляю файлы с расширением
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаю файлы
const files = project.getSourceFiles();

// функция проверки валидности путей для рефакторинга, они должны быть абсолютными и иметь в начале названия моих слоёв. если массив слоёв содержит то с чего начинается путь то функция возвращает тру
function isAbsolute(value: string) {
    const layers = [
        'shared',
        'entities',
        'features',
        'widgets',
        'pages',
        'app',
    ];
    return layers.some((layer) => value.startsWith(layer));
}

// иду циклом по файлам, получаю импорты из каждого файла и сохраняю в переменную. далее иду циклом по полученным импорам и значение каждого сохраняю в переменную
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        // если нода проходит проверку на валидность изменяю её значение
        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
