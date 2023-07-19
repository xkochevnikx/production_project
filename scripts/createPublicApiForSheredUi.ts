import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

// ts morph будет проходится по этим файлам
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
// и получаю эти добавленный файлы
const files = project.getSourceFiles();
// методу getDirectory передаю путь и получаю все файлы диреткории shared
const sharedUiDirectory = project.getDirectory(path.resolve(__dirname, '..', 'src', 'shared', 'UI'));
const componentDirs = sharedUiDirectory?.getDirectories();

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

if (componentDirs) {
    componentDirs.forEach((directory) => {
        // ? получаю путь до файла
        const indexFilePath = `${directory.getPath()}/index.ts`;
        // ? смотрю есть ли он
        const indexFile = directory.getSourceFile(indexFilePath);
        // ? если его нет то создаю. первым аргументом задаю путь а вторым надо передать код который будет в этом файле,в нем делаю реэкспорт содержимого из файла, третим аргументом можно передать объект с флагом если хочу перезапмсать файл{ overwrite: true }
        if (!indexFile) {
            const sourceCode = `export * from "./${directory.getBaseName()}"`;
            const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });
            // сохраняю
            file.save();
        }
    });
}
// дальше исправляю пути к index.ts shared компонентов
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithourAlias = value.replace('@/', '');
        const segments = valueWithourAlias.split('/');
        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'UI';
        console.log(valueWithourAlias);

        if (isAbsolute(valueWithourAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithourAlias.split('/').slice(0, 3).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
