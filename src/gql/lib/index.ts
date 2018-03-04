// @ts-nocheck
/* tslint:disable */

const _ = name => {
  return { [name]: _ };
};
const $_ = "_q_";

type QComp<T> = (filters: T) => string;
const toTemplateString = (template: string) => {
  // Replace ${expressions} (etc) with ${map.expressions}.

  var sanitized = template
    .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match) {
      return `\$\{map.${match.trim()}\}`;
    })
    // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
    .replace(/(\$\{(?!map\.)[^}]+\})/g, "");

  return Function("map", `return \`${sanitized}\``);
};

const isNode = obj => obj && typeof obj === "object";
/*
const bfs = (obj, method) => {
  const q: any[] = [];
  let next = obj;
  while (next) {
    if (isNode) {
      for (const [key, val] of Object.entries(next)) {
        q.push([key, val]);
      }
    }
    const entry = q.shift();
    if (!entry) {
      return;
    }
    const [key, val] = entry;
    method(key, val);
    next = val;
  }
};
*/

const dfs = (
  obj,
  method,
  testSkip = undefined,
  dep = 0,
  parentKey = undefined
) => {
  const entries = Object.entries(obj);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, val] = entries[i];
    const hasNext = i < len - 1;
    const branch = isNode(val);
    const skip = testSkip !== undefined && testSkip(key);
    if (skip) {
      continue;
    }

    if (branch && method.start) {
      method.start(key, val, dep);
    }

    method.cur(key, val, dep, branch, hasNext);
    if (branch) {
      dfs(val, method, testSkip, dep + 1, key);
    }

    if (branch && method.end) {
      method.end(key, val, dep, hasNext);
    }
  }
};
const capitilize = str => str.charAt(0).toUpperCase() + str.slice(1);
const parseFilterValue = (key, val, parentKey) => {
  return "${" + parentKey + capitilize(key) + "}";
};

function parseFilter(obj, parentKey) {
  const filters = Object.entries(obj).map(
    ([key, val]) => `${key}: ${parseFilterValue(key, val, parentKey)}`
  );
  return `(${filters.join(", ")})`;
}

const parseKey = key => {
  return key.name ? key.name : key;
};
const pad = dep => "    ".repeat(dep);
const toQuery = (queryObj: Object): string => {
  const parts = [];
  dfs(
    queryObj,
    {
      end: (key, val, dep, hasNext) => {
        parts.push(`${pad(dep)}}${hasNext ? "," : ""}`);
      },
      cur: (rawKey, val, dep, isNode, hasNext) => {
        const key = parseKey(rawKey);
        let filter = "";
        if (val.hasOwnProperty($_)) {
          filter = parseFilter(val[$_], key);
        }
        let tag = isNode ? `${key}${filter}{` : key;
        tag = hasNext && !isNode ? `${tag},` : tag;

        parts.push(`${pad(dep)}${tag}`);
      }
    },
    (key, val) => {
      const skip = key === $_;
      return skip;
    },
    1
  );
  const prettyQuery = `{\n${parts.join("\n")}\n}`;
  return prettyQuery;
};

function comp<T>(query: any): QComp<T> {
  return toTemplateString(toQuery(query)) as QComp<T>;
}

import oldClean from "clean-tagged-string";

function clean(first: TemplateStringsArray, ...rest: any[]) {
  return oldClean(first, ...rest).replace(/\s/g, "");
}

/*
const content = { content: _ };
const id = _("id");
const commentsQuery = {
  comment: {
    [$_]: { id: _ },
    ...id,
    ...content,
    user: {
      ...id,
      name: _
    },
    post: {
      title: _,
      user: {
        ...id
      }
    }
  }
};
console.log(comp(commentsQuery)({ commentId: 1 }));
*/
export { comp, _, $_, clean };
