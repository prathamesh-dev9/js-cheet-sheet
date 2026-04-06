const TOPICS = [
  { id: "ec", label: "Execution Context", color: "#818cf8" },
  { id: "hoist", label: "Hoisting", color: "#fbbf24" },
  { id: "scope", label: "Scope & Closures", color: "#60a5fa" },
  { id: "this", label: "The 'this' Keyword", color: "#f472b6" },
  { id: "proto", label: "Prototype", color: "#6ee7b7" },
  { id: "async", label: "Async & Event Loop", color: "#f87171" },
  { id: "fns", label: "Functions", color: "#818cf8" },
  { id: "callback", label: "Callbacks", color: "#6366f1" },
  { id: "promise", label: "Promises", color: "#f59e0b" },
  { id: "async-await", label: "Async/Await (Deep Dive)", color: "#10b981" },
  { id: "array", label: "Array Methods", color: "#fbbf24" },
  { id: "obj", label: "Objects", color: "#60a5fa" },
  { id: "misc", label: "JS Concepts", color: "#f472b6" },
  { id: "dom", label: "Browser / DOM", color: "#6ee7b7" },
  { id: "mem", label: "Memory & GC", color: "#f472b6" },
  { id: "polyfill", label: "Polyfills", color: "#10b981" },
];

const DATA = [
  {
    topic: "ec",
    tags: ["core"],
    q: "What is an Execution Context?",
    a: `Container where JS code is evaluated & executed. Has <b>2 parts</b>:
    <br /> &bull; <span class="highlight">Memory (Variable Env)</span> — stores vars/fns as key:value pairs
    <br /> &bull; <span class="highlight">Code (Thread of Execution)</span> — runs one line at a time
    <br /> Types: <b>Global EC</b> (on page load) <br /> &bull; <b>Function EC</b> (per function call)`,
  },

  {
    topic: "ec",
    tags: ["core"],
    q: "2 phases of Execution Context creation?",
    a: `<b>Phase 1 — Memory Creation:</b>
    <br /> &bull; <code>var</code> → set to <code>undefined</code>
    <br /> &bull; Functions → stored fully (whole body)
    <br /> <b>Phase 2 — Code Execution:</b>
    <br /> &bull; Runs line by line, vars get actual values
    <br /> &bull; This 2-phase process is the root cause of <span class="warn-text">Hoisting</span>`,
  },

  {
    topic: "ec",
    tags: ["core"],
    q: "JS is synchronous single-threaded — what does it mean?",
    a: `&bull; <span class="highlight">Single-threaded</span>: only 1 command at a time
    <br /> &bull; <span class="highlight">Synchronous</span>: commands run in a fixed, specific order
    <br /> &bull; Managed by the <b>Call Stack</b> — GEC at bottom, function ECs pushed/popped on top`,
  },

  {
    topic: "hoist",
    tags: ["core", "gotcha"],
    q: "What is Hoisting?",
    a: `Memory is allocated for vars & fns <b>before code runs</b>.
    <br /> &bull; <code>var</code> → hoisted, initialized as <code>undefined</code>
    <br /> &bull; <code>function foo(){}</code> → hoisted <span class="highlight">fully</span>, callable anywhere
    <br /> &bull; <code>let</code> / <code>const</code> → hoisted but in <span class="warn-text">TDZ</span> — accessing throws <code>ReferenceError</code>
    <br /> &bull; <code>const foo = function(){}</code> → only <code>foo hoisted as <code>undefined</code>`,
  },

  {
    topic: "hoist",
    tags: ["gotcha"],
    q: "What is the Temporal Dead Zone (TDZ)?",
    a: `Gap between <code>let</code>/<code>const</code> being <b>hoisted</b> and being <b>initialized</b>.<br>
    Accessing in this zone → <span class="danger-text">ReferenceError</span><br>
    <b>Fix:</b> always declare variables at the top of their scope.`,
  },

  {
    topic: "hoist",
    tags: ["gotcha"],
    q: "Function declaration vs expression — hoisting difference?",
    a: `<div class="code-block"><span class="cm">// Declaration — FULLY hoisted</span>
<span class="fn">foo</span>(); <span class="cm">// works!</span>
<span class="kw">function</span> <span class="fn">foo</span>() {}

<span class="cm">// Expression — only var hoisted as undefined</span>
<span class="fn">bar</span>(); <span class="cm">// TypeError: bar is not a function</span>
<span class="kw">var</span> bar = <span class="kw">function</span>() {};</div>`,
  },

  {
    topic: "scope",
    tags: ["core"],
    q: "What is Scope Chain?",
    a: `JS looks for a var in <b>current scope → outer scope → … → global</b>. Stops when found.<br>
    If not found anywhere → <span class="danger-text">ReferenceError</span><br>
    <span class="highlight">Lexical scope</span>: scope is determined at write-time, not runtime`,
  },

  {
    topic: "scope",
    tags: ["core", "gotcha"],
    q: "var vs let vs const — key differences?",
    html: `<table class="cmp-table">
      <tr><th>Feature</th><th>var</th><th>let</th><th>const</th></tr>
      <tr><td>Scope</td><td>function</td><td>block</td><td>block</td></tr>
      <tr><td>Hoisting</td><td>undefined</td><td>TDZ</td><td>TDZ</td></tr>
      <tr><td>Re-assign</td><td>yes</td><td>yes</td><td>no</td></tr>
      <tr><td>Re-declare</td><td>yes</td><td>no</td><td>no</td></tr>
      <tr><td>Window prop</td><td>yes</td><td>no</td><td>no</td></tr>
    </table>
    <div style="margin-top:8px;font-size:12px;color:#9ca3af"><span class="warn-text">Note:</span> <code>const</code> object properties CAN be mutated. <code>const</code> prevents reassignment only.</div>`,
  },

  {
    topic: "scope",
    tags: ["core"],
    q: "What is a Closure?",
    a: `A function that <span class="highlight">remembers its outer scope</span> even after the outer function has returned.<br>
    Every JS function creates a closure over its lexical environment.<br>
    <b>Use cases:</b> data privacy, currying, memoization, event handlers, module pattern`,
  },

  {
    topic: "scope",
    tags: ["gotcha"],
    q: "Classic closure bug in loops?",
    a: `<div class="code-block">
<span class="cm">// Bug — all print 3</span>
<span class="kw">for</span>(<span class="kw">var</span> i=<span class="num">0</span>; i&lt;<span class="num">3</span>; i++) {
  setTimeout(()=&gt;console.log(i), <span class="num">100</span>);
}

<span class="cm">// Fix 1: use let (block-scoped per iteration)</span>
<span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>; i&lt;<span class="num">3</span>; i++) {
  setTimeout(()=&gt;console.log(i), <span class="num">100</span>);
}

<span class="cm">// Fix 2: IIFE to capture value</span>
<span class="kw">for</span>(<span class="kw">var</span> i=<span class="num">0</span>; i&lt;<span class="num">3</span>; i++) {
  ((j)=&gt;setTimeout(()=&gt;console.log(j),<span class="num">100</span>))(i);
}
</div>`,
  },

  {
    topic: "scope",
    tags: ["core"],
    q: "Closure-based counter — data privacy example?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">makeCounter</span>() {
  <span class="kw">let</span> count = <span class="num">0</span>;  <span class="cm">// private!</span>
  <span class="kw">return</span> {
    inc: () =&gt; ++count,
    get: () =&gt; count,
  };
}
<span class="kw">const</span> c = <span class="fn">makeCounter</span>();
c.<span class="fn">inc</span>(); <span class="cm">// 1</span>
c.count; <span class="cm">// undefined — no access</span></div>`,
  },

  {
    topic: "scope",
    tags: ["core"],
    q: "The Module Pattern (Encapsulation)?",
    a: `Legacy but critical pattern for data privacy before ES modules.<br>
    Uses an <b>IIFE</b> to return an object that exposes public methods while keeping state private.
    <div class="code-block"><span class="kw">const</span> MyModule = (<span class="kw">function</span>() {
  <span class="kw">let</span> _privateVar = <span class="num">0</span>;
  <span class="kw">return</span> {
    increment() {
      _privateVar++;
    },
    getData() {
      <span class="kw">return</span> _privateVar;
    }
  };
})();</div>`,
  },

  {
    topic: "scope",
    tags: ["gotcha"],
    q: "Closure Memory Leak (Context Sharing)?",
    a: `In some engines (like V8), if two closures are created in the same parent scope, they <b>share the same context object</b>.<br>
    <span class="warn-text">Trap:</span> If one closure is kept but the other (holding a large object) is not, the large object <b>cannot be GC'd</b> because the context is still reachable.
    <div class="code-block"><span class="kw">function</span> <span class="fn">leak</span>() {
  <span class="kw">let</span> giant = <span class="kw">new</span> <span class="fn">Array</span>(<span class="num">1000000</span>);
  <span class="kw">return</span> <span class="kw">function</span>() {
    <span class="cm">/* uses nothing but shares context with giant */</span>
  };
} <span class="cm">// giant is stuck as long as returned fn exists!</span></div>`,
  },

  {
    topic: "this",
    tags: ["core"],
    q: "The 4 Rules of 'this' Binding (Precedence)?",
    a: `JS determines <code>this</code> by these rules in order of priority:
    <div class="code-block"><span class="num">1</span>. <b>new Binding</b>: new instance is created.
<span class="num">2</span>. <b>Explicit Binding</b>: <code>call</code>, <code>apply</code>, <code>bind</code>.
<span class="num">3</span>. <b>Implicit Binding</b>: Object before the dot (<code>obj.fn()</code>).
<span class="num">4</span>. <b>Default Binding</b>: global (window) or <code>undefined</code> (strict).</div>`,
  },

  {
    topic: "this",
    tags: ["core"],
    q: "Implicit vs Explicit Binding examples?",
    a: `<div class="code-block"><span class="cm">// Implicit: 'this' is person</span>
<span class="kw">const</span> person = {
  name: <span class="str">'Alice'</span>,
  greet() { console.log(<span class="kw">this</span>.name); }
};
person.greet(); 

<span class="cm">// Explicit: 'this' is forced to forcedContext</span>
<span class="kw">const</span> forcedContext = { name: <span class="str">'Bob'</span> };
person.greet.call(forcedContext);</div>`,
  },

  {
    topic: "this",
    tags: ["gotcha"],
    q: "Lost Context (The Callback Trap)?",
    a: `When a method is passed as a callback, it is detached from its object, and <code>this</code> reverts to the default (global/undefined).
    <div class="code-block"><span class="kw">const</span> user = {
  name: <span class="str">'Dev'</span>,
  sayHi() { console.log(<span class="kw">this</span>.name); }
};

setTimeout(user.sayHi, <span class="num">1000</span>); <span class="cm">// undefined!</span></div>
    <b>Why:</b> <code>setTimeout</code> calls the fn as <code>fn()</code>, not <code>user.fn()</code>.`,
  },

  {
    topic: "this",
    tags: ["core"],
    q: "How to fix lost context?",
    a: `Three main ways to preserve the <code>this</code> reference:
    <div class="code-block"><span class="cm">// 1. Arrow function wrapper</span>
setTimeout(() =&gt; user.sayHi(), <span class="num">1000</span>);

<span class="cm">// 2. .bind()</span>
setTimeout(user.sayHi.bind(user), <span class="num">1000</span>);

<span class="cm">// 3. Arrow function as method (class fields)</span>
sayHi = () =&gt; { console.log(<span class="kw">this</span>.name); }</div>`,
  },

  {
    topic: "this",
    tags: ["core"],
    q: "call() vs apply() vs bind() ?",
    a: `All 3 explicitly set <code>this</code>:
    <br /> &bull; <code>fn.call(obj, a, b)</code> — invokes <span class="highlight">immediately</span>, args comma-separated.
    <br /> &bull; <code>fn.apply(obj, [a, b])</code> — invokes <span class="highlight">immediately</span>, args as array.
    <br /> &bull; <code>fn.bind(obj)</code> — returns <span class="warn-text">new function</span>, can be invoked later.
    <b>Memory trick:</b> <b>A</b>pply = <b>A</b>rray.`,
  },

  {
    topic: "this",
    tags: ["gotcha"],
    q: "Arrow function 'this' vs Regular function?",
    a: `Regular functions have **Dynamic Binding** (this depends on the call site).<br>
    Arrow functions have **Lexical Binding** (this is inherited from where they are defined).<br>
    <div class="code-block"><span class="kw">const</span> obj = {
  name: <span class="str">'JS'</span>,
  regular: <span class="kw">function</span>() {
    <span class="kw">return</span> <span class="kw">this</span>.name;
  }, <span class="cm">// 'JS'</span>
  arrow: () =&gt; <span class="kw">this</span>.name <span class="cm">// undefined! (outer this = window)</span>
};</div>`,
  },

  {
    topic: "this",
    tags: ["core", "gotcha"],
    q: "Tricky 'this' Quiz — what is the output?",
    a: `<div class="code-block"><span class="kw">var</span> name = <span class="str">'Global'</span>;
<span class="kw">const</span> obj = {
  name: <span class="str">'Local'</span>,
  sayName() {
    console.log(<span class="kw">this</span>.name);
  }
};

<span class="kw">const</span> fn = obj.sayName;
obj.sayName(); <span class="cm">// 1?</span>
fn();          <span class="cm">// 2?</span></div>
    <b>Answers:</b> 1. 'Local' (implicit), 2. 'Global' (lost context/default binding).`,
  },

  {
    topic: "this",
    tags: ["gotcha"],
    q: "Arrow function 'this' gotcha?",
    a: `Arrow fns have <span class="warn-text">no own</span> <code>this</code>. They inherit from where they are defined.<br>
    <div class="code-block"><span class="kw">const</span> obj = {
  name: <span class="str">'JS'</span>,
  regular: <span class="kw">function</span>() {
    <span class="kw">return</span> <span class="kw">this</span>.name;
  }, <span class="cm">// 'JS'</span>
  arrow: () =&gt; <span class="kw">this</span>.name <span class="cm">// undefined! (outer this = window)</span>
};</div>
    <b>Rule:</b> don't use arrow fns as object methods if you need <code>this</code>`,
  },

  {
    topic: "proto",
    tags: ["core"],
    q: "What is the Prototype Chain?",
    a: `Every object has <code>[[Prototype]]</code> linking to another object.<br>
    Property lookup walks up the chain until <code>Object.prototype</code> (its proto is <code>null</code>).<br>
    <code>hasOwnProperty()</code> checks only the object, not the chain.`,
  },

  {
    topic: "proto",
    tags: ["core"],
    q: "What does the 'new' keyword do?",
    a: `<div class="code-block"><span class="cm">// new Constructor() does 4 things:</span>
<span class="num">1</span>. Creates empty object: {}
<span class="num">2</span>. Sets __proto__ = Constructor.prototype
<span class="num">3</span>. Calls constructor with <span class="kw">this</span> = new object
<span class="num">4</span>. Returns the object (unless constructor returns object)</div>`,
  },

  {
    topic: "proto",
    tags: ["core"],
    q: "Class syntax vs Prototype — what's the relation?",
    a: `Classes are <span class="highlight">syntactic sugar</span> over prototypes.
    <br /> &bull; Methods in class → added to <code>ClassName.prototype</code>
    <br /> &bull; <code>extends</code> sets: <code>Child.prototype.__proto__ === Parent.prototype</code>
    <br /> &bull; <code>super()</code> calls the parent constructor
    <b>JS is prototype-based, not class-based under the hood</b>`,
  },

  {
    topic: "async",
    tags: ["core"],
    q: "Browser Event Loop: Step-by-Step Cycle?",
    a: `<div class="code-block"><span class="cm">// The 4-stage cycle:</span>
<span class="num">1</span>. <b>Clear Call Stack</b>: Execute ALL synchronous code.
<span class="num">2</span>. <b>Drain Microtask Queue</b>: Process ALL pending 
   promises/queueMicrotask (even if new ones are added!)
<span class="num">3</span>. <b>Render Lifecycle</b>: Browser evaluates layout, 
   style, and paint (runs <code>requestAnimationFrame</code>).
<span class="num">4</span>. <b>Run ONE Macrotask</b>: Pick the oldest task 
   from Callback Queue (setTimeout, events).</div>`,
  },

  {
    topic: "async",
    tags: ["core"],
    q: "Microtask vs Macrotask?",
    a: `&bull; <span class="highlight">Microtasks</span>: Promises (.then/.catch/finally), <code>queueMicrotask</code>, <code>MutationObserver</code>.
    <br /> &bull; <span class="highlight">Macrotasks</span>: <code>setTimeout</code>, <code>setInterval</code>, I/O, UI rendering events.
    <br /> &bull; <span class="warn-text">Key priority:</span> ALL pending microtasks are drained before ONE macrotask is executed.`,
  },

  {
    topic: "async",
    tags: ["gotcha"],
    q: "Microtask Starvation?",
    a: `If a microtask recursively adds more microtasks, the engine <b>never reaches the macrotask or rendering</b>.
    <br /> &bull; <span class="danger-text">Result:</span> Use for complex heavy recursion can freeze the UI completely.
    <br /> &bull; Macrotasks (like <code>setTimeout</code>) only run ONE per loop, allowing the renderer to "breathe".`,
  },

  {
    topic: "async",
    tags: ["gotcha"],
    q: "Microtask vs Macrotask execution order?",
    a: `<div class="code-block">console.log(<span class="str">'1'</span>); <span class="cm">// sync</span>
setTimeout(()=&gt;console.log(<span class="str">'2'</span>), <span class="num">0</span>); <span class="cm">// macrotask</span>
Promise.resolve().then(()=&gt;console.log(<span class="str">'3'</span>)); <span class="cm">// microtask</span>
console.log(<span class="str">'4'</span>); <span class="cm">// sync</span>

<span class="cm">// Output: 1 → 4 → 3 → 2</span></div>
    <span class="warn-text">Key rule:</span> <code>Promise.then</code> ALWAYS runs before <code>setTimeout(fn, 0)</code>`,
  },

  {
    topic: "async",
    tags: ["core", "gotcha"],
    q: "Tricky Execution Quiz — what is the output?",
    a: `<div class="code-block">console.<span class="fn">log</span>(<span class="str">'1'</span>);
<span class="fn">setTimeout</span>(()=&gt;console.<span class="fn">log</span>(<span class="str">'2'</span>), <span class="num">0</span>);
<span class="fn">Promise.resolve</span>().<span class="fn">then</span>(()=&gt;console.<span class="fn">log</span>(<span class="str">'3'</span>));
<span class="fn">queueMicrotask</span>(()=&gt;console.<span class="fn">log</span>(<span class="str">'4'</span>));
<span class="fn">requestAnimationFrame</span>(()=&gt;console.<span class="fn">log</span>(<span class="str">'5'</span>));
console.<span class="fn">log</span>(<span class="str">'6'</span>);

<span class="cm">// Answer: 1 → 6 → 3 → 4 → 5 → 2</span></div>
    <span class="info-text">Explain:</span> 1,6 are sync → 3,4 are microtasks → 5 is rAF (before render) → 2 is macrotask.`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "What is a Promise? (Definition)",
    a: `
    &bull; The <b>Promise</b> object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    <br /> &bull; <span class="highlight">Placeholder</span> for a value that will be available in the future.
    <br /> &bull; <span class="highlight">Immutable object</span> representing eventual completion/failure.
    <br /> &bull; Provides a <b>trustworthy</b> way to handle asynchronicity without inversion of control.`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "How Promises solve Inversion of Control?",
    a: `Instead of passing a callback to a 3rd party API, that API <b>returns a Promise object</b>.<br>
    We now attach our callback to <i>this</i> object. Control stays with us!<br>
    <b>Trust:</b> The promise handles execution (exactly once, even if called before/after).`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "3 States of a Promise?",
    a: `1. <span class="highlight">Pending</span> &mdash; initial state, not yet fulfilled or rejected.<br>
    2. <span class="highlight">Fulfilled</span> &mdash; operation completed successfully.<br>
    3. <span class="highlight">Rejected</span> &mdash; operation failed.<br>
    Once <b>settled</b> (fulfilled/rejected), a promise is <span class="warn-text">Immutable</span>.`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "Creating a Promise (Constructor)?",
    a: `<div class="code-block"><span class="kw">const</span> cart = [<span class="str">'shoes'</span>, <span class="str">'pants'</span>];
<span class="kw">const</span> pr = <span class="kw">new</span> <span class="fn">Promise</span>((resolve, reject) =&gt; {
  <span class="kw">if</span> (!validateCart(cart)) {
    <span class="fn">reject</span>(<span class="kw">new</span> <span class="fn">Error</span>(<span class="str">'Invalid Cart'</span>));
  }
  <span class="fn">resolve</span>(<span class="str">'OrderCreated'</span>);
});</div>`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "Promise Chaining (Solving Callback Hell)?",
    a: `Every <code>.then()</code> returns a <b>new Promise</b>, allowing flat, readable chains.<br>
    <div class="code-block"><span class="fn">createOrder</span>(cart)
  .<span class="fn">then</span>(orderId =&gt; <span class="fn">proceedToPayment</span>(orderId))
  .<span class="fn">then</span>(status =&gt; <span class="fn">showSummary</span>(status))
  .<span class="fn">catch</span>(err =&gt; console.<span class="fn">log</span>(err));</div>`,
  },

  {
    topic: "promise",
    tags: ["core", "gotcha"],
    q: "Error Handling (The Catch Block)?",
    a: `&bull; <code>.catch()</code> handles errors in the <b>entire chain above it</b>.
    <br /> &bull; You can place it anywhere! If placed in the middle, it only catches errors <i>above</i> and passes the result <i>down</i>.
    <br /> &bull; Always return something from <code>.then()</code> to keep the chain alive.`,
  },

  {
    topic: "promise",
    tags: ["core"],
    q: "Promise APIs & key methods?",
    a: `&bull; <code>Promise.all([])</code> — waits for all, <span class="danger-text">fails fast</span> on rejection
    <br /> &bull; <code>Promise.allSettled([])</code> — waits for all, <span class="highlight">never rejects</span>
    <br /> &bull; <code>Promise.race([])</code> — resolves/rejects with first settled
    <br /> &bull; <code>Promise.any([])</code> — resolves with first fulfilled`,
  },

  {
    topic: "promise",
    tags: ["core", "gotcha"],
    q: "async/await — quick overview?",
    a: `
    &bull; Syntactic sugar over Promises that makes code look synchronous.
    <br /> &bull; <b>Rule 1:</b> <code>async</code> fns always return Promises.
    <br /> &bull; <b>Rule 2:</b> <code>await</code> only works inside <code>async</code> fns.
    <br /> &bull; <span class="highlight">See 'Async/Await (Deep Dive)' section for high-level details on call-stack suspension.</span>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "First Class Functions & Higher Order Functions?",
    a: `<b>First class</b>: functions are values — assign to vars, pass as args, return from fns.<br>
    <b>Higher Order Fn (HOF)</b>: takes fn as arg OR returns a fn.<br>
    Examples: <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>setTimeout</code>, <code>addEventListener</code>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "Pure function?",
    a: `&bull; Same input → always same output
    <br /> &bull; No side effects (no mutation of external state, no console.log, no API calls)
    <br /> &bull; Easier to test, cache, and reason about
    <b>Examples:</b> <code>Math.max()</code>, <code>Array.map()</code>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "What is Currying?",
    a: `Transform <code>fn(a,b)</code> into <code>fn(a)(b)</code> — sequence of single-arg functions.<br>
    Enables <b>partial application</b> — create specialized functions from general ones.
    <div class="code-block"><span class="kw">const</span> add = a =&gt; b =&gt; a + b;
<span class="kw">const</span> add5 = <span class="fn">add</span>(<span class="num">5</span>);
<span class="fn">add5</span>(<span class="num">3</span>); <span class="cm">// 8</span></div>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "IIFE — what and why?",
    a: `<b>Immediately Invoked Function Expression</b><br>
    <div class="code-block">(<span class="kw">function</span>() {
  <span class="cm">/* runs immediately */</span>
})();

(<span class="kw">()=&gt;</span> {
  <span class="cm">/* arrow IIFE */</span>
})();</div>
    <b>Why:</b> creates own scope, avoids polluting global, runs once on load`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "Parameters vs Arguments?",
    a: `&bull; <b>Parameters</b>: variables listed in the function <span class="highlight">definition</span>.
    <br /> &bull; <b>Arguments</b>: actual values <span class="highlight">passed</span> to the function when calling it.
    <div class="code-block"><span class="kw">function</span> <span class="fn">sum</span>(a, b) {
  <span class="cm">/* a, b are params */</span>
}
<span class="fn">sum</span>(<span class="num">10</span>, <span class="num">20</span>); <span class="cm">/* 10, 20 are args */</span></div>`,
  },

  {
    topic: "callback",
    tags: ["core"],
    q: "What is a Callback function?",
    a: `A function passed as an <b>argument</b> to another function, to be "called back" at a later time.<br>
    Essential for asynchronous programming (event listeners, timers, promises).<br>
    <div class="code-block">button.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () =&gt; {
  console.<span class="fn">log</span>(<span class="str">'Clicked!'</span>); <span class="cm">// this is a callback</span>
});</div>`,
  },

  {
    topic: "callback",
    tags: ["core"],
    q: "Advantages of Callback Functions?",
    a: `&bull; <span class="highlight">Powers Asynchronicity</span> — allow JS (single-threaded) to handle non-blocking tasks.
    <br /> &bull; <span class="highlight">Deferred Execution</span> — control exactly when a piece of code should run (after events/timers).
    <br /> &bull; <span class="highlight">Modular/Functional Design</span> — lets us pass generic logic that others can specialize.`,
  },

  {
    topic: "callback",
    tags: ["gotcha", "core"],
    q: "What is Callback Hell (Pyramid of Doom)?",
    a: `When asynchronous operations are nested inside each other, creating a structure that grows <b>horizontally</b>.
    <br /> &bull; <span class="danger-text">Hard to Read</span>: logic is buried deep in nesting.
    <br /> &bull; <span class="danger-text">Hard to Maintain</span>: tiny changes require restructuring everything.
    <div class="code-block"><span class="fn">api.createOrder</span>(cart, () =&gt; {
  <span class="fn">api.proceedToPayment</span>(() =&gt; {
    <span class="fn">api.showOrderSummary</span>(() =&gt; {
       <span class="cm">// Pyramid of Doom!</span>
    });
  });
});</div>`,
  },

  {
    topic: "callback",
    tags: ["gotcha"],
    q: "What is Inversion of Control (IoC)?",
    a: `<span class="warn-text">The biggest disadvantage:</span> You lose control over your code execution.
    <br /> When we pass a callback to an external API, we are <b>trusting</b> that API to call it.
    <b>Trust issues:</b>
    <br /> &bull; Maybe it <span class="danger-text">never</span> calls it.
    <br /> &bull; Maybe it calls it <span class="danger-text">twice</span> (e.g., charging a customer twice).
    <br /> &bull; Maybe it calls it at the <b>wrong time</b>.
    Promises solve this by giving control <i>back</i> to us.`,
  },

  {
    topic: "callback",
    tags: ["core"],
    q: "Synchronous vs Asynchronous Callbacks?",
    a: `Not all callbacks are async! Some run <span class="highlight">immediately</span> (blocking).
    <br /> &bull; <b>Synchronous:</b> <code>[].map()</code>, <code>[].filter()</code>, <code>[].forEach()</code>.
    <br /> &bull; <b>Asynchronous:</b> <code>setTimeout</code>, <code>fetch</code>, <code>addEventListener</code>.`,
  },

  {
    topic: "fns",
    tags: ["gotcha"],
    q: "What is Shadowing?",
    a: `When a variable declared in an inner scope has the <b>same name</b> as a variable in an outer scope.<br>
    The inner variable "shadows" the outer one, making it inaccessible in that scope.<br>
    <div class="code-block"><span class="kw">let</span> x = <span class="num">10</span>;
<span class="kw">function</span> <span class="fn">foo</span>() {
  <span class="kw">let</span> x = <span class="num">20</span>; <span class="cm">// shadows outer x</span>
  console.<span class="fn">log</span>(x); <span class="cm">// 20</span>
}</div>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "Named Function Expression (NFE)?",
    a: `A function expression that has a name, useful for recursion and debugging.<br>
    The name is <b>only accessible</b> inside the function's own scope.<br>
    <div class="code-block"><span class="kw">const</span> factorial = <span class="kw">function</span> <span class="fn">compute</span>(n) {
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> <span class="num">1</span>;
  <span class="kw">return</span> n * <span class="fn">compute</span>(n - <span class="num">1</span>); <span class="cm">// compute works here</span>
};
<span class="fn">compute</span>(<span class="num">5</span>); <span class="cm">// ReferenceError outside</span></div>`,
  },

  {
    topic: "fns",
    tags: ["gotcha"],
    q: "Anonymous functions — pros & cons?",
    a: `Functions without a name (e.g., arrow fns, regular fns used as values).<br>
    &bull; <span class="highlight">Pros</span>: concise, good for one-off callbacks.<br>
    &bull; <span class="warn-text">Cons</span>: harder to debug (shows as "anonymous" in stack traces), cannot use for recursion easily.`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "Function Declaration vs Function Expression?",
    a: `&bull; <b>Declaration</b>: <code>function foo() {}</code> — <span class="highlight">hoisted fully</span>, can be called before definition.<br>
    &bull; <b>Expression</b>: <code>const foo = function() {}</code> — <span class="warn-text">not hoisted</span> (only the variable is), throws error if called before.`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "What is the 'arguments' object?",
    a: `An <b>array-like</b> object available inside non-arrow functions that contains all arguments passed to it.<br>
    <div class="code-block"><span class="kw">function</span> <span class="fn">showArgs</span>() {
  console.<span class="fn">log</span>(arguments[<span class="num">0</span>]); <span class="cm">// access by index</span>
}</div>
    <span class="warn-text">Note:</span> Arrow functions <b>do not</b> have their own <code>arguments</code> object!`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "Rest Parameters (...)?",
    a: `Modern way to handle multiple arguments as a <b>real array</b>. Must be the <span class="highlight">last parameter</span>.<br>
    <div class="code-block"><span class="kw">function</span> <span class="fn">sum</span>(...numbers) {
  <span class="kw">return</span> numbers.<span class="fn">reduce</span>((a, b) =&gt; a + b);
}</div>`,
  },

  {
    topic: "fns",
    tags: ["core"],
    q: "What does function.length represent?",
    a: `Returns the number of <b>expected parameters</b> (excluding rest parameters and parameters with default values).<br>
    <div class="code-block"><span class="kw">function</span> <span class="fn">foo</span>(a, b = <span class="num">1</span>, ...c) {}
console.<span class="fn">log</span>(foo.length); <span class="cm">// 1 (only 'a' is required)</span></div>`,
  },

  {
    topic: "array",
    tags: ["core"],
    q: "map() vs filter() vs reduce()?",
    a: `<div class="code-block">[<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>].<span class="fn">map</span>(x =&gt; x*<span class="num">2</span>)         <span class="cm">// [2,4,6] — transforms, same length</span>
[<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>].<span class="fn">filter</span>(x =&gt; x &gt; <span class="num">1</span>)    <span class="cm">// [2,3]  — keeps truthy, shorter</span>
[<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>].<span class="fn">reduce</span>((a,c)=&gt;a+c, <span class="num">0</span>) <span class="cm">// 6     — accumulates to 1 value</span></div>
    None mutate the original array.`,
  },

  {
    topic: "array",
    tags: ["gotcha"],
    q: "Mutating vs Non-mutating array methods?",
    html: `<table class="cmp-table">
      <tr><th>Mutating (changes original)</th><th>Non-mutating (returns new)</th></tr>
      <tr><td><code>push, pop, shift, unshift</code></td><td><code>map, filter, reduce</code></td></tr>
      <tr><td><code>splice, sort, reverse</code></td><td><code>slice, concat, flat</code></td></tr>
      <tr><td><code>fill, copyWithin</code></td><td><code>find, findIndex, every, some</code></td></tr>
    </table>
    <div style="margin-top:8px;font-size:12px;color:#9ca3af"><span class="warn-text">Gotcha:</span> <code>sort()</code> mutates in place AND coerces to string by default. Always pass a comparator: <code>.sort((a,b) => a-b)</code></div>`,
  },

  {
    topic: "array",
    tags: ["core"],
    q: "find vs findIndex vs indexOf?",
    a: `&bull; <code>find(fn)</code> → returns <b>element</b> where fn is truthy, or <code>undefined</code><br>
    &bull; <code>findIndex(fn)</code> → returns <b>index</b>, or <code>-1</code><br>
    &bull; <code>indexOf(val)</code> → finds by <b>strict equality</b>, returns index or <code>-1</code><br>
    &bull; <code>includes(val)</code> → returns boolean`,
  },

  {
    topic: "obj",
    tags: ["gotcha"],
    q: "Shallow copy vs Deep copy?",
    a: `<b>Shallow</b>: copies top-level only, nested objects are references.<br>
    <code>Object.assign({}, obj)</code> or <code>{...obj}</code> — both shallow<br><br>
    <b>Deep copy options:</b><br>
    &bull; <code>JSON.parse(JSON.stringify(obj))</code> — loses functions/dates/undefined<br>
    &bull; <code>structuredClone(obj)</code> — modern, handles most types<br>
    &bull; <code>_.cloneDeep(obj)</code> — lodash`,
  },

  {
    topic: "obj",
    tags: ["core"],
    q: "Optional chaining & Nullish coalescing?",
    a: `<div class="code-block">obj?.a?.b?.c <span class="cm">// undefined instead of TypeError</span>
arr?.[<span class="num">0</span>]     <span class="cm">// safe index access</span>
fn?.()       <span class="cm">// safe fn call</span>

val ?? <span class="str">'default'</span> <span class="cm">// default only if null/undefined</span>
val || <span class="str">'default'</span> <span class="cm">// default if falsy (0, '', false too!)</span></div>
    <span class="warn-text">Key diff:</span> <code>??</code> is safer than <code>||</code> for numbers/booleans`,
  },

  {
    topic: "obj",
    tags: ["core"],
    q: "Destructuring tricks?",
    a: `<div class="code-block"><span class="cm">// Rename + default</span>
<span class="kw">const</span> {name: alias = <span class="str">'anon'</span>, age = <span class="num">0</span>} = obj;

<span class="cm">// Nested</span>
<span class="kw">const</span> {a: {b}} = {a: {b: <span class="num">42</span>}};

<span class="cm">// Fn params with defaults</span>
<span class="kw">function</span> <span class="fn">fn</span>({name=<span class="str">'x'</span>, age=<span class="num">0</span>}={}) {}

<span class="cm">// Array destructuring + skip</span>
<span class="kw">const</span> [first,,third] = [<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>];</div>`,
  },

  {
    topic: "misc",
    tags: ["gotcha"],
    q: "== vs === and type coercion traps?",
    a: `<div class="code-block"><span class="num">0</span> == <span class="kw">false</span>          <span class="cm">// true  (coercion)</span>
<span class="num">0</span> === <span class="kw">false</span>         <span class="cm">// false</span>
<span class="str">''</span> == <span class="kw">false</span>         <span class="cm">// true</span>
<span class="kw">null</span> == <span class="kw">undefined</span>   <span class="cm">// true</span>
<span class="kw">null</span> === <span class="kw">undefined</span>  <span class="cm">// false</span>
<span class="kw">NaN</span> == <span class="kw">NaN</span>          <span class="cm">// false! (NaN !== anything)</span></div>
    <span class="highlight">Always use ===</span>`,
  },

  {
    topic: "misc",
    tags: ["gotcha"],
    q: "Truthy & Falsy values?",
    a: `<b>Falsy</b> (6 values): <code>false</code> <code>0</code> <code>-0</code> <code>0n</code> <code>""</code> <code>null</code> <code>undefined</code> <code>NaN</code><br>
    <b>Truthy</b>: everything else — including <code>[]</code> <code>{}</code> <code>"0"</code> <code>"false"</code><br>
    <span class="warn-text">Trap:</span> <code>Boolean([])</code> → <code>true</code> but <code>[] == false</code> → <code>true</code> (coercion)`,
  },

  {
    topic: "misc",
    tags: ["gotcha"],
    q: "typeof gotchas?",
    a: `<div class="code-block"><span class="kw">typeof</span> <span class="kw">null</span>        <span class="cm">// 'object'  (historic bug!)</span>
<span class="kw">typeof</span> []          <span class="cm">// 'object'  (use Array.isArray())</span>
<span class="kw">typeof</span> <span class="kw">function</span>(){} <span class="cm">// 'function'</span>
<span class="kw">typeof</span> <span class="kw">NaN</span>         <span class="cm">// 'number'  (!)</span>
<span class="kw">typeof</span> undeclaredVar <span class="cm">// 'undefined' (no error)</span></div>`,
  },

  {
    topic: "misc",
    tags: ["core"],
    q: "Debounce vs Throttle (Concepts)?",
    a: `<b>Debounce</b>: waits N ms after <b>last call</b>. Resets timer on each call.
    <br /> &bull; Use for: Search input, window resize (wait for user to stop).
    <br /><b>Throttle</b>: allows max once per N ms regardless of calls.
    <br /> &bull; Use for: Scroll handler, mousemove (regular intervals).`,
  },

  {
    topic: "misc",
    tags: ["core"],
    q: "Debounce Implementation?",
    a: `Ensures function runs only after a period of inactivity.
    <div class="code-block"><span class="kw">function</span> <span class="fn">debounce</span>(fn, delay) {
  <span class="kw">let</span> timer;
  <span class="kw">return</span> <span class="kw">function</span>(...args) {
    <span class="fn">clearTimeout</span>(timer);
    timer = <span class="fn">setTimeout</span>(() =&gt; {
      fn.<span class="fn">apply</span>(<span class="kw">this</span>, args);
    }, delay);
  };
}</div>`,
  },

  {
    topic: "misc",
    tags: ["core"],
    q: "Throttle Implementation?",
    a: `Ensures function runs at most once in a specified time interval.
    <div class="code-block"><span class="kw">function</span> <span class="fn">throttle</span>(fn, limit) {
  <span class="kw">let</span> flag = <span class="kw">true</span>;
  <span class="kw">return</span> <span class="kw">function</span>(...args) {
    <span class="kw">if</span> (flag) {
      fn.<span class="fn">apply</span>(<span class="kw">this</span>, args);
      flag = <span class="kw">false</span>;
      <span class="fn">setTimeout</span>(() =&gt; {
        flag = <span class="kw">true</span>;
      }, limit);
    }
  };
}</div>`,
  },

  {
    topic: "misc",
    tags: ["core"],
    q: "Memoization?",
    a: `Cache fn results keyed by arguments. Return cached value on repeat calls.<br>
    Trades <b>memory for speed</b>. Good for pure functions with expensive computation.
    <div class="code-block"><span class="kw">function</span> <span class="fn">memoize</span>(fn) {
  <span class="kw">const</span> cache = <span class="kw">new</span> Map();
  <span class="kw">return</span> (...args) =&gt; {
    <span class="kw">const</span> key = JSON.<span class="fn">stringify</span>(args);
    <span class="kw">if</span>(cache.<span class="fn">has</span>(key)) <span class="kw">return</span> cache.<span class="fn">get</span>(key);
    <span class="kw">const</span> result = fn(...args);
    cache.<span class="fn">set</span>(key, result);
    <span class="kw">return</span> result;
  };
}</div>`,
  },

  {
    topic: "dom",
    tags: ["core"],
    q: "Event bubbling vs capturing?",
    a: `<b>Bubbling</b> (default): event travels child → parent → root.<br>
    <b>Capturing</b>: root → parent → child. Enable with: <code>addEventListener(e, fn, true)</code><br>
    <code>e.stopPropagation()</code> — stops bubbling<br>
    <code>e.preventDefault()</code> — prevents default browser action (not same as stopPropagation)`,
  },

  {
    topic: "dom",
    tags: ["core"],
    q: "Event Delegation?",
    a: `Attach <b>one listener to parent</b> instead of many on children. Works because events bubble.<br>
    Use <code>event.target</code> to identify which child was clicked.<br>
    <b>Benefits:</b> better performance, handles dynamically added elements automatically.
    <div class="code-block">ul.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, (e) =&gt; {
  <span class="kw">if</span> (e.target.matches(<span class="str">'li'</span>)) {
    <span class="cm">// handle li click</span>
  }
});</div>`,
  },

  {
    topic: "dom",
    tags: ["core"],
    q: "localStorage vs sessionStorage vs Cookie?",
    html: `<table class="cmp-table">
      <tr><th></th><th>localStorage</th><th>sessionStorage</th><th>Cookie</th></tr>
      <tr><td>Persistence</td><td>Until cleared</td><td>Tab close</td><td>Expiry date</td></tr>
      <tr><td>Size</td><td>~5MB</td><td>~5MB</td><td>~4KB</td></tr>
      <tr><td>Server access</td><td>No</td><td>No</td><td>Yes (HTTP header)</td></tr>
      <tr><td>Cross-tab</td><td>Yes</td><td>No</td><td>Yes</td></tr>
    </table>`,
  },

  {
    topic: "mem",
    tags: ["core"],
    q: "How does Garbage Collection work (Mark-and-Sweep)?",
    a: `JS uses a <b>reachable</b> algorithm (not just reference counting).<br>
    &bull; <span class="highlight">Mark</span>: Starts from roots (Global, Stack) and "marks" every reachable object.<br>
    &bull; <span class="highlight">Sweep</span>: Memory not marked is reclaimed.<br>
    Modern engines use <b>Generational Collection</b> (Minor GC for young objects, Major GC for old).`,
  },

  {
    topic: "mem",
    tags: ["gotcha"],
    q: "4 Common Memory Leaks in JS?",
    a: `&bull; <b>Accidental Globals</b>: <code>x = 100</code> without let/const.<br>
    &bull; <b>Forgotten Timers/Callbacks</b>: <code>setInterval</code> running after component unmount.<br>
    &bull; <b>Out-of-DOM references</b>: Keeping a ref to a removed <code>&lt;button&gt;</code> in a variable.<br>
    &bull; <b>Closures</b>: Keeping references to large objects in inner functions accidentally.`,
  },

  {
    topic: "mem",
    tags: ["core"],
    q: "WeakMap and WeakSet — why use them?",
    a: `They hold <b>weak references</b> to objects.<br>
    &bull; If an object is <i>only</i> held as a key in a <code>WeakMap</code>, it <span class="highlight">can be garbage collected</span>.<br>
    &bull; Useful for metadata/caching without preventing GC (e.g., tracking private data of DOM nodes).`,
  },
  {
    topic: "mem",
    tags: ["core"],
    q: "How to find memory leaks? (DevTools)",
    a: `Interviewers often ask "How would you detect a leak?":<br>
    &bull; <b>Performance Monitor</b>: Real-time view of JS Heap size. Look for "sawtooth" patterns.<br>
    &bull; <b>Heap Snapshot</b>: Compare two snapshots to see which objects were created but not collected.<br>
    &bull; <b>Allocation Instrumentation</b>: Record precisely which part of the code is allocating memory over time.<br>
    &bull; <b>Allocation Sampling</b>: Low-overhead way to see which functions are responsible for the most memory usage.`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "What is a Polyfill?",
    a: `A piece of code used to provide modern functionality on older browsers that do not natively support it.<br>
    <b>Why?</b> To ensure cross-browser compatibility and allow developers to use modern APIs without worrying about older environments.`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Array.prototype.map?",
    a: `Creates a new array by applying a callback to each element.
    <div class="code-block"><span class="fn">Array</span>.prototype.<span class="fn">myMap</span> = <span class="kw">function</span>(cb) {
  <span class="kw">let</span> temp = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = 0; i &lt; <span class="kw">this</span>.length; i++) {
    temp.<span class="fn">push</span>(<span class="fn">cb</span>(<span class="kw">this</span>[i], i, <span class="kw">this</span>));
  }
  <span class="kw">return</span> temp;
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Array.prototype.filter?",
    a: `Creates a new array with elements that pass the test in the callback.
    <div class="code-block"><span class="fn">Array</span>.prototype.<span class="fn">myFilter</span> = <span class="kw">function</span>(cb) {
  <span class="kw">let</span> temp = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = 0; i &lt; <span class="kw">this</span>.length; i++) {
    <span class="kw">if</span> (<span class="fn">cb</span>(<span class="kw">this</span>[i], i, <span class="kw">this</span>)) temp.<span class="fn">push</span>(<span class="kw">this</span>[i]);
  }
  <span class="kw">return</span> temp;
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Array.prototype.reduce?",
    a: `Executes a reducer function on each element, resulting in a single output value.
    <div class="code-block"><span class="fn">Array</span>.prototype.<span class="fn">myReduce</span> = <span class="kw">function</span>(cb, initialValue) {
  <span class="kw">let</span> accumulator = initialValue;
  <span class="kw">for</span> (<span class="kw">let</span> i = 0; i &lt; <span class="kw">this</span>.length; i++) {
    accumulator = accumulator !== <span class="kw">undefined</span> 
      ? <span class="fn">cb</span>(accumulator, <span class="kw">this</span>[i], i, <span class="kw">this</span>) 
      : <span class="kw">this</span>[i];
  }
  <span class="kw">return</span> accumulator;
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Function.prototype.bind?",
    a: `Returns a new function with a fixed <code>this</code> context and initial arguments.
    <div class="code-block"><span class="fn">Function</span>.prototype.<span class="fn">myBind</span> = <span class="kw">function</span>(context, ...args) {
  <span class="kw">let</span> obj = <span class="kw">this</span>;
  <span class="kw">return</span> <span class="kw">function</span>(...nextArgs) {
    obj.<span class="fn">apply</span>(context, [...args, ...nextArgs]);
  };
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Function.prototype.call?",
    a: `Invokes the function with a given <code>this</code> value and arguments provided individually.
    <div class="code-block"><span class="fn">Function</span>.prototype.<span class="fn">myCall</span> = <span class="kw">function</span>(context = window, ...args) {
  <span class="kw">const</span> fnSymbol = <span class="fn">Symbol</span>();
  context[fnSymbol] = <span class="kw">this</span>;
  <span class="kw">const</span> result = context[<span class="fn">fnSymbol</span>](...args);
  <span class="kw">delete</span> context[fnSymbol];
  <span class="kw">return</span> result;
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Promise.all?",
    a: `Takes an array of promises and returns a single promise that resolves when all input promises resolve.
    <div class="code-block"><span class="kw">const</span> <span class="fn">myPromiseAll</span> = (promises) =&gt; {
  <span class="kw">return</span> <span class="kw">new</span> <span class="fn">Promise</span>((resolve, reject) =&gt; {
    <span class="kw">let</span> results = [], completed = 0;
    promises.<span class="fn">forEach</span>((p, i) =&gt; {
      <span class="fn">Promise</span>.<span class="fn">resolve</span>(p).<span class="fn">then</span>(val =&gt; {
        results[i] = val;
        completed++;
        <span class="kw">if</span> (completed === promises.length) <span class="fn">resolve</span>(results);
      }, reject);
    });
  });
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Promise.race?",
    a: `Returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects.
    <div class="code-block"><span class="kw">const</span> <span class="fn">myPromiseRace</span> = (promises) =&gt; {
  <span class="kw">return</span> <span class="kw">new</span> <span class="fn">Promise</span>((resolve, reject) =&gt; {
    promises.<span class="fn">forEach</span>(p =&gt; {
      <span class="fn">Promise</span>.<span class="fn">resolve</span>(p).<span class="fn">then</span>(resolve, reject);
    });
  });
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Array.prototype.flat?",
    a: `Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    <div class="code-block"><span class="fn">Array</span>.prototype.<span class="fn">myFlat</span> = <span class="kw">function</span>(depth = 1) {
  <span class="kw">let</span> res = [];
  <span class="kw">this</span>.<span class="fn">forEach</span>(el =&gt; {
    <span class="kw">if</span> (Array.<span class="fn">isArray</span>(el) &amp;&amp; depth &gt; 0) {
      res.<span class="fn">push</span>(...el.<span class="fn">myFlat</span>(depth - 1));
    } <span class="kw">else</span> {
      res.<span class="fn">push</span>(el);
    }
  });
  <span class="kw">return</span> res;
};</div>`,
  },

  {
    topic: "polyfill",
    tags: ["core"],
    q: "Polyfill for Object.create?",
    a: `Creates a new object, using an existing object as the prototype of the newly created object.
    <div class="code-block"><span class="kw">function</span> <span class="fn">myObjectCreate</span>(proto) {
  <span class="kw">function</span> <span class="fn">F</span>() {}
  F.prototype = proto;
  <span class="kw">return</span> <span class="kw">new</span> <span class="fn">F</span>();
}</div>`,
  },

  {
    topic: "async-await",
    tags: ["core"],
    q: "What is an async function?",
    a: `
    &bull; <span class="highlight">Always returns a Promise</span>. 
    <br /> &bull; If you return a value (like "Hello"), it wraps it in a Promise automatically.
    <br /> &bull; If you return a Promise already, it returns that Promise as is.
    <div class="code-block"><span class="kw">async function</span> <span class="fn">getData</span>() { 
  <span class="kw">return</span> <span class="str">"Namaste"</span>; 
} 
<span class="kw">const</span> data = <span class="fn">getData</span>(); 
console.<span class="fn">log</span>(data); <span class="cm">// Promise {&lt;fulfilled&gt;: "Namaste"}</span></div>`,
  },

  {
    topic: "async-await",
    tags: ["core"],
    q: "What is 'await' and how does it work?",
    a: `
    &bull; It is a keyword used <span class="warn-text">only inside</span> an async function.
    <br /> &bull; It <b>pauses</b> the execution of the async function until the Promise is settled (resolved/rejected).
    <br /> &bull; To the user, it looks like synchronous code, but it's actually non-blocking for the main thread.
    <div class="code-block"><span class="kw">const</span> val = <span class="kw">await</span> pr; <span class="cm">// JS engine waits for pr to resolve</span></div>`,
  },

  {
    topic: "async-await",
    tags: ["core", "gotcha"],
    q: "Async/Await vs Promise.then() ?",
    a: `
    &bull; <b>Readability</b>: Async/await avoids "Promise Chaining" and "Callback Hell" style nesting.
    <br /> &bull; <b>Wait behavior</b>: In <code>.then()</code>, JS doesn't wait; it moves to the next line. In <code>await</code>, execution <b>actually suspends</b> at that line.
    <div class="code-block"><span class="cm">// Promise.then: fn continues immediately</span>
<span class="kw">function</span> <span class="fn">handle</span>() {
  pr.<span class="fn">then</span>(res =&gt; console.<span class="fn">log</span>(res));
  console.<span class="fn">log</span>(<span class="str">"Runs first!"</span>);
}</div>`,
  },

  {
    topic: "async-await",
    tags: ["core"],
    q: "Execution suspension: Behind the Scenes?",
    a: `
    &bull; When JS hits <code>await</code>, the function is <span class="highlight">suspended</span> and <b>popped off</b> the Call Stack.
    <br /> &bull; The JS Engine doesn't block; it continues other tasks.
    <br /> &bull; Once the Promise resolves, the function is <b>pushed back</b> to the Call Stack to continue from where it left off.
    <br /> &bull; This "suspense" is why we don't need <code>.then()</code> callbacks anymore.`,
  },

  {
    topic: "async-await",
    tags: ["core", "gotcha"],
    q: "Sequential vs Parallel Await (Performance)?",
    a: `
    <div class="code-block"><span class="cm">// Sequential: Takes 10s (5s + 5s)</span>
<span class="kw">async function</span> <span class="fn">seq</span>() {
  <span class="kw">await</span> <span class="fn">fetchData1</span>(); <span class="cm">// 5s</span>
  <span class="kw">await</span> <span class="fn">fetchData2</span>(); <span class="cm">// 5s</span>
}

<span class="cm">// Parallel: Takes 5s</span>
<span class="kw">async function</span> <span class="fn">parallel</span>() {
  <span class="kw">const</span> [p1, p2] = <span class="kw">await</span> Promise.<span class="fn">all</span>([<span class="fn">fetchData1</span>(), <span class="fn">fetchData2</span>()]);
}</div>`,
  },

  {
    topic: "async-await",
    tags: ["core"],
    q: "Real-world fetch example with try/catch?",
    a: `
    <div class="code-block"><span class="kw">async function</span> <span class="fn">handleFetch</span>() {
  <span class="kw">try</span> {
    <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(API_URL);
    <span class="kw">const</span> json = <span class="kw">await</span> res.<span class="fn">json</span>();
    console.<span class="fn">log</span>(json);
  } <span class="kw">catch</span> (err) {
    console.<span class="fn">error</span>(<span class="str">"Fetch Failed"</span>, err);
  }
}</div>
    <span class="info-text">Akshay's Tip:</span> You can also use <code>handleFetch().catch(err => ...)</code> if you don't like nesting <code>try/catch</code> blocks.`,
  },

  {
    topic: "async-await",
    tags: ["gotcha"],
    q: "Why await in forEach doesn't work?",
    a: `<code>forEach</code> is a regular function; it doesn't wait for the callback's Promise.
    <br /> &bull; <span class="danger-text">Result:</span> All iterations fire simultaneously without waiting.
    <br /> &bull; <b>Fix:</b> Use a <code>for...of</code> loop or <code>Promise.all()</code>.
    <div class="code-block"><span class="cm">// Incorrect</span>
arr.<span class="fn">forEach</span>(<span class="kw">async</span> (id) =&gt; <span class="kw">await</span> <span class="fn">dbCall</span>(id));

<span class="cm">// Correct</span>
<span class="kw">for</span> (<span class="kw">const</span> id <span class="kw">of</span> arr) {
  <span class="kw">await</span> <span class="fn">dbCall</span>(id);
}</div>`,
  },
];

let activeTopic = "all";

function buildTags() {
  const row = document.getElementById("tags-row");
  if (!row) return; // Guard for script execution timing
  const all = [{ id: "all", label: "All" }, ...TOPICS];
  row.innerHTML = all
    .map((t) => {
      const cls = activeTopic === t.id ? `tag-btn active-${t.id}` : "tag-btn";
      return `<button class="${cls}" onclick="setTopic('${t.id}')">${t.label}</button>`;
    })
    .join("");
}

function buildSidebar() {
  const sb = document.getElementById("sidebar");
  if (!sb) return;
  sb.innerHTML = TOPICS.map((t) => {
    const count = DATA.filter((d) => d.topic === t.id).length;
    const cls =
      activeTopic === t.id || activeTopic === "all"
        ? ""
        : activeTopic !== t.id
          ? " style='opacity:0.7'"
          : "";
    return `<div class="sidebar-item${activeTopic === t.id ? " active" : ""}" onclick="setTopic('${t.id}')"${cls}>
      <span class="sidebar-dot" style="background:${t.color}"></span>
      <span>${t.label}</span>
      <span style="margin-left:auto;font-family:var(--font-mono);font-size:10px;color:var(--muted)">${count}</span>
    </div>`;
  }).join("");
}

function buildMain() {
  const query =
    document.getElementById("search")?.value.trim().toLowerCase() || "";
  const main = document.getElementById("main");
  if (!main) return;
  let totalCards = 0;

  const topicsToShow =
    activeTopic === "all" ? TOPICS : TOPICS.filter((t) => t.id === activeTopic);

  let html = "";
  topicsToShow.forEach((t) => {
    let items = DATA.filter((d) => d.topic === t.id);
    if (query) {
      items = items.filter(
        (d) =>
          d.q.toLowerCase().includes(query) ||
          (d.a || "").toLowerCase().includes(query) ||
          (d.html || "").toLowerCase().includes(query),
      );
    }
    if (!items.length) return;
    totalCards += items.length;
    html += `<div class="section" id="sec-${t.id}">
      <div class="section-header">
        <span class="section-dot" style="background:${t.color}"></span>
        <span class="section-title">${t.label}</span>
        <span class="section-count">${items.length} cards</span>
      </div>
      <div class="cards-grid">`;
    items.forEach((item) => {
      const tagsHtml = item.tags
        .map((tag) => {
          const desc =
            tag === "core"
              ? "Fundamental concept"
              : tag === "gotcha"
                ? "Tricky behavior / Common pitfall"
                : "";
          return `<span class="pill pill-${tag}" data-tooltip="${desc}">${tag}</span>`;
        })
        .join("");
      const body = item.html || `<div class="card-a">${item.a}</div>`;
      html += `<div class="card">
        <div class="card-q">${item.q}</div>
        <div class="card-tags">${tagsHtml}</div>
        ${item.html ? `<div class="card-a">${item.html}</div>` : `<div class="card-a">${item.a}</div>`}
      </div>`;
    });
    html += `</div></div>`;
  });

  if (!html) {
    html = `<div class="no-results">No results for "${query}"</div>`;
  }

  main.innerHTML = html;
  const resultCount = document.getElementById("result-count");
  if (resultCount) {
    resultCount.textContent = `${totalCards} cards`;
  }
}

function setTopic(id) {
  activeTopic = id;
  buildTags();
  buildSidebar();
  buildMain();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", buildMain);
  }

  buildTags();
  buildSidebar();
  buildMain();
});
