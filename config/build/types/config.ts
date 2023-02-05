export type BuildMode = "production" | "development";

export interface IBuildPath {
  entry: string;
  build: string;
  html: string;
}

export interface IBuildOptions {
  mode: BuildMode;
  paths: IBuildPath;
  isDev: boolean;
  port: number;
}

export interface IBuildEnv {
  mode: BuildMode;
  port: number;
}
