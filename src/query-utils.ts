import oldClean from "clean-tagged-string";

function clean(first: TemplateStringsArray, ...rest: any[]) {
  return oldClean(first, ...rest).replace(/\s/g, "");
}

export default clean;
