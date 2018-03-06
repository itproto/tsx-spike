import { loader } from "webpack";

export default function myLoader(
  this: loader.LoaderContext,
  source: string | null
) {
  const filename = this.resourcePath;
  if (source && (filename.endsWith(".ts") || filename.endsWith(".tsx"))) {
    //return instrument(source, filename);
    console.groupCollapsed(filename);
    console.log(source);
    console.groupEnd();
    return source;
  }
  return source;
}
