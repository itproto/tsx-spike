import { readFileSync } from "fs";
import * as ts from "typescript";
import {
  createSourceFile,
  SyntaxKind,
  ScriptTarget,
  SourceFile,
  forEachChild
} from "typescript";

const fileNames = [__dirname + "/test.ts"]; // process.argv.slice(2);
fileNames.forEach(fileName => {
  // Parse a file
  let sourceFile = createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ScriptTarget.ES2018,
    /*setParentNodes */ true
  );
  console.info(fileName);

  // delint it
  delint(sourceFile);
});

function delint(sourceFile: SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    if (node.kind === SyntaxKind.InterfaceDeclaration) {
      console.dir(JSON.stringify(node));
    }

    forEachChild(node, delintNode);
  }

  /*
  function report(node: ts.Node, message: string) {
    let { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart()
    );
    console.log(
      `${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`
    );
  }*/
}
