var vsformat = val => {
  const str = val.replace(/"/gm, '\\"').replace(/\$_(\d)_/gm, "${$1}");
  const temp = str.indexOf("${0}") ? str : str + "\n${0}";
  return temp
    .split("\n")
    .map(a => a.replace(/^\s+$/g, ""))
    .map(a =>
      a.replace(/^[\s]+/gm, x => new Array(x.length / 2 + 1).join("\\t"))
    );
};
