import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  const typescriptResolvers = {
    extensions: [".tsx", ".ts", ".js"],
  };
  return typescriptResolvers;
}
