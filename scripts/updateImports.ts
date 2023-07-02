import { ImportDeclaration, Project } from 'ts-morph';

const project = new Project({});

// добавляю файлы с расширением
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаю файлы
const files = project.getSourceFiles();

// иду циклом по файлам, получаю импорты из каждого файла и сохраняю в переменную. далее иду циклом по полученным импорам и значение каждого сохраняю в переменную
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        console.log(value);
    });
});

project.save();
