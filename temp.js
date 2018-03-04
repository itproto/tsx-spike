const _ = (name, val = _) => {
  return { [name]: val };
};
const content = { content: _ };
const id = _("id");

const jsonQuery = {
  comment: {
    _: { id: 2 },
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

var a = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      h: 4
    }
  },
  z: 5
};

const isNode = obj => obj && typeof obj === "object";
const bfs = (obj, method) => {
  const q = [];
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

const dfs = (obj, method, dep = 0) => {
  const entries = Object.entries(obj);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, val] = entries[i];
    const hasNext = i < len - 1;
    const branch = isNode(val);
    if (branch && method.start) {
      method.start(key, val, dep);
    }

    method.cur(key, val, dep, branch, hasNext);
    if (branch) {
      dfs(val, method, dep + 1);
    }

    if (branch && method.end) {
      method.end(key, val, dep, hasNext);
    }
  }
};

const log = console.log.bind(console);
const pad = dep => " ".repeat(dep);
dfs(jsonQuery, {
  end: (key, val, dep, hasNext) => log(`${pad(dep)}}${hasNext ? "," : ""}`),
  cur: (key, val, dep, isNode, hasNext) => {
    let tag = isNode ? `${key}{` : key;
    tag = hasNext && !isNode ? `${tag},` : tag;
    log(`${pad(dep)}${tag}`);
  }
});
