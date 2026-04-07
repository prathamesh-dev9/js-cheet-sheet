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
  { id: "quiz", label: "Output Quiz", color: "#f59e0b" },
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

  /* ───── OUTPUT QUIZ SECTION ───── */
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Guess the output: typeof null vs typeof []",
    a: `<div class="code-block">console.<span class="fn">log</span>(<span class="kw">typeof</span> <span class="kw">null</span>);
console.<span class="fn">log</span>(<span class="kw">typeof</span> []);</div>
    <b>Output:</b> <code>object</code>, <code>object</code><br>
    <span class="warn-text">Why:</span> <code>typeof null</code> is a historic JS bug. Arrays are also objects in JS. Use <code>Array.isArray()</code> for arrays.`,
  },

  {
    topic: "quiz",
    category: "modern",
    tags: ["easy"],
    q: "Variable Shadowing: what is printed?",
    a: `<div class="code-block"><span class="kw">let</span> a = <span class="num">10</span>;
{
  <span class="kw">let</span> a = <span class="num">20</span>;
  console.<span class="fn">log</span>(a);
}
console.<span class="fn">log</span>(a);</div>
    <b>Output:</b> <code>20</code>, <code>10</code><br>
    <span class="highlight">Explain:</span> <code>let</code> is block-scoped. The inner <code>a</code> shadows the outer <code>a</code> only inside the block.`,
  },

  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "The classic setTimeout loop trap?",
    a: `<div class="code-block"><span class="kw">for</span> (<span class="kw">var</span> i = <span class="num">0</span>; i &lt; <span class="num">3</span>; i++) {
  <span class="fn">setTimeout</span>(() =&gt; console.<span class="fn">log</span>(i), <span class="num">1</span>);
}</div>
    <b>Output:</b> <code>3</code>, <code>3</code>, <code>3</code><br>
    <span class="warn-text">Why:</span> <code>var</code> is function-scoped. By the time <code>setTimeout</code> runs, the loop has finished and <code>i</code> is 3.
    <br><b>Fix:</b> Use <code>let</code> to create a new binding for each iteration.`,
  },

  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Implicit binding loss: what is 'this'?",
    a: `<div class="code-block"><span class="kw">const</span> obj = {
  name: <span class="str">'Alice'</span>,
  greet() { console.<span class="fn">log</span>(<span class="kw">this</span>.name); }
};
<span class="kw">const</span> sayHi = obj.greet;
<span class="fn">sayHi</span>();</div>
    <b>Output:</b> <code>undefined</code> (or error in strict mode)<br>
    <span class="warn-text">Why:</span> When <code>obj.greet</code> is assigned to <code>sayHi</code>, it loses its connection to <code>obj</code>. It's called as a plain function.`,
  },

  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Promise vs setTimeout: which runs first?",
    a: `<div class="code-block">console.<span class="fn">log</span>(<span class="str">'A'</span>);
<span class="fn">setTimeout</span>(() =&gt; console.<span class="fn">log</span>(<span class="str">'B'</span>), <span class="num">0</span>);
<span class="fn">Promise.resolve</span>().<span class="fn">then</span>(() =&gt; console.<span class="fn">log</span>(<span class="str">'C'</span>));
console.<span class="fn">log</span>(<span class="str">'D'</span>);</div>
    <b>Output:</b> <code>A</code>, <code>D</code>, <code>C</code>, <code>B</code><br>
    <span class="highlight">Why:</span> Sync code first (A, D) -> Microtasks (C) -> Macrotasks (B).`,
  },

  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Complex Event Loop: microtasks inside macrotasks?",
    a: `<div class="code-block"><span class="fn">setTimeout</span>(() =&gt; {
  console.<span class="fn">log</span>(<span class="str">'timeout'</span>);
  <span class="fn">Promise.resolve</span>().<span class="fn">then</span>(() =&gt; console.<span class="fn">log</span>(<span class="str">'promise'</span>));
}, <span class="num">0</span>);

<span class="fn">Promise.resolve</span>().<span class="fn">then</span>(() =&gt; {
  console.<span class="fn">log</span>(<span class="str">'outer-promise'</span>);
});</div>
    <b>Output:</b> <code>outer-promise</code>, <code>timeout</code>, <code>promise</code><br>
    <span class="highlight">Why:</span> 
    1. Outer promise (microtask) runs first.
    2. Timeout (macrotask) runs next.
    3. The promise <i>inside</i> the timeout is a new microtask, so it runs immediately after that specific macrotask completes.`,
  },

  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Async/Await interleaving: check your depth!",
    a: `<div class="code-block"><span class="kw">async function</span> <span class="fn">foo</span>() {
  console.<span class="fn">log</span>(<span class="num">1</span>);
  <span class="kw">await</span> <span class="fn">bar</span>();
  console.<span class="fn">log</span>(<span class="num">2</span>);
}
<span class="kw">async function</span> <span class="fn">bar</span>() {
  console.<span class="fn">log</span>(<span class="num">3</span>);
}
<span class="fn">foo</span>();
console.<span class="fn">log</span>(<span class="num">4</span>);</div>
    <b>Output:</b> <code>1</code>, <code>3</code>, <code>4</code>, <code>2</code><br>
    <span class="warn-text">Why:</span> 1 and 3 are sync. <code>await</code> pauses <code>foo</code> and returns control to the caller. Then 4 runs. Finally, the remainder of <code>foo</code> (2) is queued as a microtask.`,
  },

  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Arrow function 'this' in nested call?",
    a: `<div class="code-block"><span class="kw">const</span> obj = {
  n: <span class="num">42</span>,
  f: <span class="kw">function</span>() {
    <span class="kw">const</span> arrow = () =&gt; console.<span class="fn">log</span>(<span class="kw">this</span>.n);
    <span class="kw">return</span> arrow;
  }
};
<span class="kw">const</span> fn = obj.<span class="fn">f</span>();
<span class="fn">fn</span>();</div>
    <b>Output:</b> <code>42</code><br>
    <span class="highlight">Deep Dive:</span> The arrow function captures <code>this</code> from its parent lexical scope (the regular function <code>f</code>). Since <code>f</code> was called as <code>obj.f()</code>, its <code>this</code> was <code>obj</code>. The arrow function remembers this forever.`,
  },

  /* ───── BATCH 1: FUNDAMENTALS & SCOPING ───── */
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Guess the output: typeof typeof 1",
    a: `<b>Output:</b> <code>"string"</code><br>
    <span class="highlight">Explain:</span> <code>typeof 1</code> returns <code>"number"</code>. Then <code>typeof "number"</code> returns <code>"string"</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Float Precision: 0.1 + 0.2 === 0.3 ?",
    a: `<b>Output:</b> <code>false</code><br>
    <span class="warn-text">Why:</span> Floating point math in JS follows IEEE 754. <code>0.1 + 0.2</code> results in <code>0.30000000000000004</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Equality: NaN === NaN ?",
    a: `<b>Output:</b> <code>false</code><br>
    <span class="info-text">Explain:</span> <code>NaN</code> is the only value in JS that is not equal to itself. Use <code>Number.isNaN()</code> to check.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "The infamous [ ] == ! [ ] ?",
    a: `<b>Output:</b> <code>true</code><br>
    <span class="warn-text">Trap:</span> 
    1. <code>![]</code> is <code>false</code> (empty array is truthy).
    2. <code>[] == false</code>: <code>[]</code> is coerced to empty string <code>""</code>.
    3. <code>"" == false</code>: both coerced to <code>0</code>.
    4. <code>0 == 0</code> -> <code>true</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Coercion: '1' + 2 + 3 vs 1 + 2 + '3' ?",
    a: `<b>Output:</b> <code>"123"</code> and <code>"33"</code><br>
    <span class="highlight">Why:</span> <code>+</code> is left-associative. 
    In the first: <code>('1' + 2)</code> -> <code>"12"</code>, then <code>"12" + 3</code> -> <code>"123"</code>.
    In the second: <code>(1 + 2)</code> -> <code>3</code>, then <code>3 + "3"</code> -> <code>"33"</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Function vs Var Hoisting priority?",
    a: `<div class="code-block"><span class="kw">var</span> foo = <span class="num">1</span>;
<span class="kw">function</span> <span class="fn">foo</span>() {}
console.<span class="fn">log</span>(<span class="kw">typeof</span> foo);</div>
    <b>Output:</b> <code>number</code><br>
    <span class="warn-text">Why:</span> Both are hoisted, but function declarations take priority. However, the subsequent assignment <code>foo = 1</code> overwrites the function reference.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Hoisting: undeclared vs undefined?",
    a: `<div class="code-block">(<span class="kw">function</span>(){
  <span class="kw">var</span> a = b = <span class="num">3</span>;
})();
console.<span class="fn">log</span>(b);</div>
    <b>Output:</b> <code>3</code><br>
    <span class="danger-text">Trap:</span> <code>b = 3</code> creates a global variable because it's not declared with <code>var/let/const</code>. <code>a</code> is local.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Temporal Dead Zone (TDZ) quirk?",
    a: `<div class="code-block"><span class="kw">let</span> x = <span class="num">1</span>;
{
  console.<span class="fn">log</span>(x);
  <span class="kw">let</span> x = <span class="num">2</span>;
}</div>
    <b>Output:</b> <code>ReferenceError</code><br>
    <span class="warn-text">Why:</span> The inner <code>let x</code> hoists to the top of its block, shadowing the outer <code>x</code>. Accessing it before declaration in that block hits the TDZ.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Array(3) vs [3] output?",
    a: `<b>Output:</b> <code>[empty × 3]</code> and <code>[3]</code><br>
    <span class="info-text">Explain:</span> <code>Array(3)</code> creates a holey array of length 3. <code>[3]</code> creates an array with one element (3).`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "String behavior: '5' - 3 vs '5' + 3 ?",
    a: `<b>Output:</b> <code>2</code> and <code>"53"</code><br>
    <span class="highlight">Why:</span> Minus operator forces numeric conversion. Plus operator triggers string concatenation if any operand is a string.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Math: 3 > 2 > 1 ?",
    a: `<b>Output:</b> <code>false</code><br>
    <span class="warn-text">Chain trap:</span> <code>(3 > 2)</code> -> <code>true</code>. Then <code>true > 1</code> -> coerced to <code>1 > 1</code> -> <code>false</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Object Key Coercion?",
    a: `<div class="code-block"><span class="kw">const</span> a = {}, b = {key: <span class="str">'b'</span>}, c = {key: <span class="str">'c'</span>};
a[b] = <span class="num">123</span>;
a[c] = <span class="num">456</span>;
console.<span class="fn">log</span>(a[b]);</div>
    <b>Output:</b> <code>456</code><br>
    <span class="warn-text">Why:</span> Object keys are strings. Both <code>b</code> and <code>c</code> are coerced to <code>"[object Object]"</code>. The second assignment overwrites the first.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "Is subtraction with arrays possible?",
    a: `<code>[3] - [1]</code><br>
    <b>Output:</b> <code>2</code><br>
    <span class="highlight">Explain:</span> Both arrays are coerced to primitives (strings), then to numbers: <code>"3" - "1"</code> -> <code>2</code>.
    <br><b>Note:</b> <code>[3] + [1]</code> would be <code>"31"</code> (string concat)!`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Deleting variables?",
    a: `<div class="code-block"><span class="kw">var</span> x = <span class="num">1</span>;
<span class="kw">delete</span> x;
console.<span class="fn">log</span>(x);</div>
    <b>Output:</b> <code>1</code><br>
    <span class="info-text">Explain:</span> <code>delete</code> only removes properties from objects. It cannot delete variables declared with <code>var/let/const</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "Function Length property?",
    a: `<code>console.log((function(a, b = 1, ...c) {}).length)</code><br>
    <b>Output:</b> <code>1</code><br>
    <span class="highlight">Explain:</span> <code>.length</code> returns the number of <i>expected</i> parameters. Default parameters and rest parameters are excluded.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Array.map(parseInt) trap?",
    a: `<code>['1', '7', '11'].map(parseInt)</code><br>
    <b>Output:</b> <code>[1, NaN, 3]</code><br>
    <span class="danger-text">Trap:</span> <code>map</code> passes 3 args: <code>(value, index, array)</code>. <code>parseInt</code> takes 2: <code>(string, radix)</code>.
    <br><code>parseInt('7', 1)</code> -> <code>NaN</code>
    <br><code>parseInt('11', 2)</code> -> <code>3</code>`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Null vs Undefined in Math?",
    a: `<code>null + 1</code> vs <code>undefined + 1</code><br>
    <b>Output:</b> <code>1</code> and <code>NaN</code><br>
    <span class="info-text">Explain:</span> <code>null</code> coerces to <code>0</code>, while <code>undefined</code> coerces to <code>NaN</code>.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "The binary spread: [...'abc'] ?",
    a: `<b>Output:</b> <code>['a', 'b', 'c']</code><br>
    <span class="highlight">Explain:</span> Strings are iterables. The spread operator iterates over the string and creates an array of its characters.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Comma operator in return?",
    a: `<div class="code-block"><span class="kw">const</span> fn = () =&gt; (<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>);
console.<span class="fn">log</span>(<span class="fn">fn</span>());</div>
    <b>Output:</b> <code>3</code><br>
    <span class="info-text">Explain:</span> The comma operator evaluates each operand from left to right and returns the value of the last operand.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "Strict mode: assigning to read-only?",
    a: `<code>"use strict"; const obj = {}; Object.defineProperty(obj, 'x', {value: 10, writable: false}); obj.x = 20;</code><br>
    <b>Output:</b> <code>TypeError</code><br>
    <span class="danger-text">Why:</span> In non-strict mode, this fails silently. In strict mode, it throws an error.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Infinite recursion detection?",
    a: `<code>const f = function g() { return typeof g; }; f();</code><br>
    <b>Output:</b> <code>"function"</code><br>
    <span class="highlight">Explain:</span> <code>g</code> is a Named Function Expression. Its name is only visible internally.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["easy"],
    q: "Boolean coercion: !!'false' ?",
    a: `<b>Output:</b> <code>true</code><br>
    <span class="info-text">Explain:</span> Any non-empty string is truthy in JS, regardless of its content.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "isNaN vs Number.isNaN?",
    a: `<code>isNaN('hello')</code> vs <code>Number.isNaN('hello')</code><br>
    <b>Output:</b> <code>true</code> and <code>false</code><br>
    <span class="warn-text">Why:</span> <code>isNaN</code> coerces the value to a number first (resulting in NaN). <code>Number.isNaN</code> only returns true if the value <i>is actually</i> the primitive NaN.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "Array holes and forEach?",
    a: `<code>[1, , 3].forEach(x => console.log(x))</code><br>
    <b>Output:</b> <code>1</code>, <code>3</code> (2 is skipped)<br>
    <span class="highlight">Explain:</span> Array methods like <code>forEach</code>, <code>map</code>, etc., skip "empty" slots (holes) in the array.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "The power of 0: 0 == '0' vs 0 == [] ?",
    a: `<b>Output:</b> <code>true</code> and <code>true</code><br>
    <span class="warn-text">Explain:</span> Both involve coercion. <code>[]</code> becomes <code>""</code>, then <code>0</code>. <code>'0'</code> becomes <code>0</code>.`,
  },

  /* ───── BATCH 2: 'THIS' & OBJECTS ───── */
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Context: 'this' in simple function (Strict Mode)?",
    a: `<div class="code-block"><span class="str">"use strict"</span>;
<span class="kw">function</span> <span class="fn">show</span>() { console.<span class="fn">log</span>(<span class="kw">this</span>); }
<span class="fn">show</span>();</div>
    <b>Output:</b> <code>undefined</code><br>
    <span class="warn-text">Note:</span> In non-strict mode, it would be the <code>window</code> (global) object.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Arrow function 'this' in global scope?",
    a: `<div class="code-block"><span class="kw">const</span> obj = {
  fn: () =&gt; console.<span class="fn">log</span>(<span class="kw">this</span>)
};
obj.<span class="fn">fn</span>();</div>
    <b>Output:</b> <code>window</code> (global object)<br>
    <span class="highlight">Why:</span> Arrow functions do not have their own <code>this</code>. They inherit it from the scope where they are defined (in this case, the global scope).`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Can you re-bind a function?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">f</span>() { console.<span class="fn">log</span>(<span class="kw">this</span>.name); }
<span class="kw">const</span> f1 = f.<span class="fn">bind</span>({name: <span class="str">'A'</span>}).<span class="fn">bind</span>({name: <span class="str">'B'</span>});
<span class="fn">f1</span>();</div>
    <b>Output:</b> <code>"A"</code><br>
    <span class="warn-text">Why:</span> A function created by <code>.bind()</code> is permanently bound to the first context provided. Subsequent <code>.bind()</code> calls cannot change it.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "new-ing an arrow function?",
    a: `<code>const Foo = () => {}; const inst = new Foo();</code><br>
    <b>Output:</b> <code>TypeError: Foo is not a constructor</code><br>
    <span class="danger-text">Why:</span> Arrow functions do not have a <code>[[Construct]]</code> internal method and cannot be used with <code>new</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Constructor returning an object?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">Person</span>() {
  <span class="kw">this</span>.name = <span class="str">'Alice'</span>;
  <span class="kw">return</span> { name: <span class="str">'Bob'</span> };
}
<span class="kw">const</span> p = <span class="kw">new</span> <span class="fn">Person</span>();
console.<span class="fn">log</span>(p.name);</div>
    <b>Output:</b> <code>"Bob"</code><br>
    <span class="highlight">Explain:</span> If a constructor returns an object, that object is returned instead of the <code>this</code> instance.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Object.create(null) vs {} ?",
    a: `<div class="code-block"><span class="kw">const</span> a = <span class="fn">Object.create</span>(<span class="kw">null</span>);
<span class="kw">const</span> b = {};
console.<span class="fn">log</span>(a.hasOwnProperty);</div>
    <b>Output:</b> <code>undefined</code><br>
    <span class="warn-text">Why:</span> <code>Object.create(null)</code> creates an object with no prototype at all, so it lacks built-in methods like <code>hasOwnProperty</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "The __proto__ setter trick?",
    a: `<div class="code-block"><span class="kw">const</span> a = {};
<span class="kw">const</span> b = { x: <span class="num">10</span> };
a.__proto__ = b;
console.<span class="fn">log</span>(a.x);</div>
    <b>Output:</b> <code>10</code><br>
    <span class="info-text">Note:</span> While <code>__proto__</code> works, <code>Object.setPrototypeOf()</code> is the modern standard (though still slow).`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "instanceof check with custom prototype?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">A</span>() {}
<span class="kw">const</span> a = <span class="kw">new</span> <span class="fn">A</span>();
A.prototype = {};
console.<span class="fn">log</span>(a <span class="kw">instanceof</span> A);</div>
    <b>Output:</b> <code>false</code><br>
    <span class="danger-text">Why:</span> <code>instanceof</code> checks if <code>A.prototype</code> is in <code>a</code>'s prototype chain. Since we replaced <code>A.prototype</code> with a NEW object, the link is broken.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Object.freeze vs Object.seal ?",
    a: `<b>Freeze:</b> Cannot add, delete, OR change properties.<br>
    <b>Seal:</b> Cannot add or delete, but CAN change existing properties.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Computed property names?",
    a: `<div class="code-block"><span class="kw">const</span> key = <span class="str">'name'</span>;
<span class="kw">const</span> obj = { [key]: <span class="str">'JS'</span> };
console.<span class="fn">log</span>(obj.name);</div>
    <b>Output:</b> <code>"JS"</code><br>
    <span class="highlight">Explain:</span> ES6 allows using expressions in brackets as property keys during object creation.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "for...in and inherited properties?",
    a: `<div class="code-block"><span class="kw">const</span> parent = { a: <span class="num">1</span> };
<span class="kw">const</span> child = <span class="fn">Object.create</span>(parent);
child.b = <span class="num">2</span>;
<span class="kw">for</span> (<span class="kw">let</span> key <span class="kw">in</span> child) { console.<span class="fn">log</span>(key); }</div>
    <b>Output:</b> <code>b</code>, <code>a</code><br>
    <span class="warn-text">Note:</span> <code>for...in</code> iterates over enumerable properties in the entire prototype chain. Use <code>Object.keys()</code> for own properties only.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Object.getPrototypeOf of a primitive?",
    a: `<code>Object.getPrototypeOf('abc') === String.prototype</code><br>
    <b>Output:</b> <code>true</code><br>
    <span class="info-text">Explain:</span> Primitives are temporarily coerced to their object wrappers when accessing properties or calling <code>getPrototypeOf</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["easy"],
    q: "The constructor property?",
    a: `<code>[].constructor === Array</code><br>
    <b>Output:</b> <code>true</code><br>
    <span class="info-text">Explain:</span> Instances inherit a <code>constructor</code> property from their prototype that points back to the class/function.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "in operator vs hasOwnProperty?",
    a: `<code>'toString' in {}</code> vs <code>({}).hasOwnProperty('toString')</code><br>
    <b>Output:</b> <code>true</code> and <code>false</code><br>
    <span class="highlight">Explain:</span> <code>in</code> checks the entire prototype chain, while <code>hasOwnProperty</code> only checks the object itself.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Object.assign mutation?",
    a: `<div class="code-block"><span class="kw">const</span> target = { a: <span class="num">1</span> };
<span class="kw">const</span> source = { b: <span class="num">2</span> };
<span class="fn">Object.assign</span>(target, source);
console.<span class="fn">log</span>(target);</div>
    <b>Output:</b> <code>{a: 1, b: 2}</code><br>
    <span class="warn-text">Note:</span> <code>Object.assign</code> mutates the <i>first</i> argument and also returns it.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "JSON.stringify circular reference?",
    a: `<div class="code-block"><span class="kw">const</span> obj = {};
obj.self = obj;
JSON.<span class="fn">stringify</span>(obj);</div>
    <b>Output:</b> <code>TypeError: Converting circular structure to JSON</code>`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Function in Object as key?",
    a: `<div class="code-block"><span class="kw">const</span> fn = () =&gt; {};
<span class="kw">const</span> obj = { [fn]: <span class="str">'val'</span> };
console.<span class="fn">log</span>(obj[fn]);</div>
    <b>Output:</b> <code>"val"</code><br>
    <span class="highlight">Explain:</span> The function is coerced to its string representation <code>"() => {}"</code> and used as the key.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Shallow copy: Nested modification?",
    a: `<div class="code-block"><span class="kw">const</span> a = { x: { y: <span class="num">1</span> } };
<span class="kw">const</span> b = { ...a };
b.x.y = <span class="num">2</span>;
console.<span class="fn">log</span>(a.x.y);</div>
    <b>Output:</b> <code>2</code><br>
    <span class="warn-text">Why:</span> Spread operator <code>{...a}</code> performs a shallow copy. The nested object <code>x</code> is still a reference shared by both <code>a</code> and <code>b</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Class static method 'this'?",
    a: `<div class="code-block"><span class="kw">class</span> <span class="fn">C</span> {
  <span class="kw">static</span> <span class="fn">m</span>() { console.<span class="fn">log</span>(<span class="kw">this</span> === C); }
}
C.<span class="fn">m</span>();</div>
    <b>Output:</b> <code>true</code><br>
    <span class="highlight">Explain:</span> In a static method, <code>this</code> refers to the class constructor itself, not an instance.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Object property visibility?",
    a: `<code>Object.keys({a: 1})</code> vs <code>Object.getOwnPropertyNames({a: 1})</code><br>
    <b>Output:</b> Normally the same, but <code>getOwnPropertyNames</code> also returns non-enumerable properties.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Adding to basic prototypes?",
    a: `<div class="code-block"><span class="fn">String</span>.prototype.<span class="fn">bold</span> = () =&gt; <span class="str">'*bold*'</span>;
console.<span class="fn">log</span>(<span class="str">'hi'</span>.<span class="fn">bold</span>());</div>
    <b>Output:</b> <code>"*bold*"</code><br>
    <span class="danger-text">Warning:</span> Modifying built-in prototypes is generally considered bad practice (monkey-patching).`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Is Object.prototype the end?",
    a: `<code>Object.getPrototypeOf(Object.prototype)</code><br>
    <b>Output:</b> <code>null</code><br>
    <span class="info-text">Explain:</span> <code>Object.prototype</code> is the ultimate end of the prototype chain.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Comparing two empty objects?",
    a: `<code>{} === {}</code><br>
    <b>Output:</b> <code>false</code><br>
    <span class="warn-text">Why:</span> Objects are compared by reference, not by value. Each <code>{}</code> creates a new unique instance in memory.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Array-like to Array?",
    a: `<code>Array.from({length: 2}, (_, i) => i)</code><br>
    <b>Output:</b> <code>[0, 1]</code><br>
    <span class="highlight">Explain:</span> <code>Array.from</code> can create an array from any object with a <code>length</code> property.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "The 'with' statement (Legacy)?",
    a: `<div class="code-block"><span class="kw">const</span> obj = { x: <span class="num">10</span> };
<span class="kw">with</span> (obj) { console.<span class="fn">log</span>(x); }</div>
    <b>Output:</b> <code>10</code><br>
    <span class="danger-text">Avoid:</span> <code>with</code> is deprecated and disallowed in strict mode because it creates ambiguity in the scope chain.`,
  },

  /* ───── BATCH 3: ASYNC & EVENT LOOP ───── */
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Value vs Promise in .then() ?",
    a: `<div class="code-block"><span class="fn">Promise.resolve</span>(<span class="num">1</span>)
  .<span class="fn">then</span>(<span class="fn">Promise.resolve</span>(<span class="num">2</span>))
  .<span class="fn">then</span>(console.log);</div>
    <b>Output:</b> <code>1</code><br>
    <span class="warn-text">Why:</span> <code>.then()</code> expects a function. If you pass a non-function (like another Promise), it is treated as <code>null</code> and the previous value is passed through (identity).`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Async function without await?",
    a: `<code>async function f() { return 1; } console.log(f());</code><br>
    <b>Output:</b> <code>Promise {&lt;fulfilled&gt;: 1}</code><br>
    <span class="info-text">Explain:</span> <code>async</code> fns ALWAYS return a promise, even if you return a primitive.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Promise.race([]) challenge?",
    a: `<code>Promise.race([]).then(console.log);</code><br>
    <b>Output:</b> (No output, hangs forever)<br>
    <span class="danger-text">Why:</span> <code>Promise.race</code> waits for the *first* promise to settle. If the array is empty, it never settles.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "await-ing a non-promise?",
    a: `<code>async function f() { const x = await 10; return x; }</code><br>
    <b>Output:</b> Resolves to <code>10</code><br>
    <span class="info-text">Explain:</span> <code>await</code> automatically wraps non-promise values in <code>Promise.resolve()</code>.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "try/catch with setTimeout?",
    a: `<div class="code-block"><span class="kw">try</span> {
  <span class="fn">setTimeout</span>(() =&gt; { <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="str">'!'</span>); }, <span class="num">100</span>);
} <span class="kw">catch</span> (e) {
  console.<span class="fn">log</span>(<span class="str">'Caught!'</span>);
}</div>
    <b>Output:</b> Uncaught Error (Error not caught)<br>
    <span class="danger-text">Why:</span> By the time the timeout fires, the <code>try/catch</code> block has already finished executing. The error happens in a different task.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Catch block returning a value?",
    a: `<div class="code-block"><span class="fn">Promise.reject</span>(<span class="str">'fail'</span>)
  .<span class="fn">catch</span>(err =&gt; <span class="str">'recovered'</span>)
  .<span class="fn">then</span>(val =&gt; console.<span class="fn">log</span>(val));</div>
    <b>Output:</b> <code>"recovered"</code><br>
    <span class="highlight">Explain:</span> A <code>.catch()</code> block returns a new Promise. If it returns a value, the new Promise is resolved with that value.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Finally block and return values?",
    a: `<div class="code-block"><span class="fn">Promise.resolve</span>(<span class="num">1</span>)
  .<span class="fn">finally</span>(() =&gt; <span class="num">2</span>)
  .<span class="fn">then</span>(val =&gt; console.<span class="fn">log</span>(val));</div>
    <b>Output:</b> <code>1</code><br>
    <span class="warn-text">Why:</span> <code>finally</code> is meant for cleanup and side effects. Its return value is ignored unless it throws or returns a rejected promise.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Promise.all with one primitive?",
    a: `<code>Promise.all([Promise.resolve(1), 2]).then(console.log)</code><br>
    <b>Output:</b> <code>[1, 2]</code><br>
    <span class="info-text">Explain:</span> <code>Promise.all</code> treats non-promises as resolved promises.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "fetch 404 status check?",
    a: `<div class="code-block"><span class="fn">fetch</span>(<span class="str">'/invalid-url'</span>)
  .<span class="fn">then</span>(res =&gt; console.<span class="fn">log</span>(<span class="str">'Success'</span>))
  .<span class="fn">catch</span>(err =&gt; console.<span class="fn">log</span>(<span class="str">'Fail'</span>));</div>
    <b>Output:</b> <code>"Success"</code><br>
    <span class="danger-text">Why:</span> <code>fetch</code> only rejects on network errors. HTTP errors (404, 500) still resolve with <code>ok: false</code>. Check <code>res.ok</code> manually.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Multiple awaits on same promise?",
    a: `<div class="code-block"><span class="kw">const</span> p = <span class="fn">Promise.resolve</span>(<span class="str">'ok'</span>);
<span class="kw">async function</span> <span class="fn">run</span>() {
  console.<span class="fn">log</span>(<span class="kw">await</span> p);
  console.<span class="fn">log</span>(<span class="kw">await</span> p);
}</div>
    <b>Output:</b> <code>"ok"</code>, <code>"ok"</code><br>
    <span class="highlight">Explain:</span> You can <code>await</code> a promise multiple times. It remembers its settled value.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "queueMicrotask vs .then?",
    a: `Both schedule tasks to the Microtask Queue. <code>queueMicrotask</code> is a modern, explicit alternative to <code>Promise.resolve().then()</code>.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Promise.allSettled output snippet?",
    a: `<code>Promise.allSettled([Promise.resolve(1), Promise.reject(2)])</code><br>
    <b>Result:</b> <code>[{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 2}]</code>`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "requestAnimationFrame vs setTimeout?",
    a: `<code>rAF</code> runs before the browser repaints. <code>setTimeout(0)</code> runs as a macrotask whenever the stack is clear. <code>rAF</code> is preferred for animations for smoother results.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "The second arg of .then() ?",
    a: `<div class="code-block">p.<span class="fn">then</span>(onSuccess, onError)</div>
    <span class="warn-text">Trap:</span> <code>onError</code> only catches errors from <code>p</code>, not from <code>onSuccess</code>. <code>.catch()</code> at the end is usually better.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Returning await vs returning Promise?",
    a: `<div class="code-block"><span class="kw">async function</span> <span class="fn">a</span>() { <span class="kw">return await</span> p; }
<span class="kw">async function</span> <span class="fn">b</span>() { <span class="kw">return</span> p; }</div>
    <span class="info-text">Note:</span> They behave identically in most cases. However, <code>await</code>ed return creates an extra microtask tick. Use <code>return p</code> unless you need the stack trace from <code>a</code>.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Promise.any vs Promise.race?",
    a: `<b>Race:</b> settles with the FIRST settled (success or fail).<br>
    <b>Any:</b> settles with the FIRST FULFILLED promise. Rejects only if <i>all</i> fail.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Top-level await Error handling?",
    a: `If a top-level <code>await</code> fails, the entire module fails to load and any dependent modules will not execute. Always wrap top-level <code>await</code> in <code>try/catch</code> if failure is possible.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "AbortController usage?",
    a: `<div class="code-block"><span class="kw">const</span> controller = <span class="kw">new</span> <span class="fn">AbortController</span>();
<span class="fn">fetch</span>(url, { signal: controller.signal });
controller.<span class="fn">abort</span>(); <span class="cm">// cancels the request immediately</span></div>`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Double Promise wrapping?",
    a: `<code>Promise.resolve(Promise.resolve(1))</code><br>
    <b>Output:</b> Resolves to <code>1</code><br>
    <span class="info-text">Explain:</span> Promises are automatically "flattened". Resolving a promise with another promise results in the outer promise adopting the state of the inner one.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Promise.resolve vs new Promise((res) => res())?",
    a: `<code>Promise.resolve()</code> is slightly faster/more optimized by engines than creating a new constructor instance manually.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Execution order: sync, micro, macrotask?",
    a: `<div class="code-block"><span class="fn">setTimeout</span>(() =&gt; console.<span class="fn">log</span>(<span class="str">'A'</span>), <span class="num">0</span>);
<span class="fn">Promise.resolve</span>().<span class="fn">then</span>(() =&gt; console.<span class="fn">log</span>(<span class="str">'B'</span>));
console.<span class="fn">log</span>(<span class="str">'C'</span>);</div>
    <b>Output:</b> <code>C</code>, <code>B</code>, <code>A</code>`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "The hidden thenable?",
    a: `<div class="code-block"><span class="kw">const</span> p = { then: (res) =&gt; <span class="fn">res</span>(<span class="str">'done'</span>) };
<span class="kw">await</span> p;</div>
    <span class="highlight">Explain:</span> <code>await</code> and <code>Promise.resolve</code> will treat any object with a <code>.then()</code> method as a promise (a "thenable").`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Error object serialization?",
    a: `<code>JSON.stringify(new Error('!'))</code><br>
    <b>Output:</b> <code>"{}"</code><br>
    <span class="warn-text">Why:</span> <code>Error</code> properties like <code>message</code> and <code>stack</code> are non-enumerable.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["medium"],
    q: "Infinite Microtasks loop?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">loop</span>() {
  <span class="fn">Promise.resolve</span>().<span class="fn">then</span>(loop);
}</div>
    <span class="danger-text">Warning:</span> This will freeze the UI and hang the process. Macrotasks (setTimeout) would allow rendering, but microtasks (promises) starve the main thread.`,
  },
  {
    topic: "quiz",
    category: "async-event",
    tags: ["hard"],
    q: "Promise chain reuse?",
    a: `<div class="code-block"><span class="kw">const</span> p = <span class="fn">Promise.resolve</span>(<span class="num">1</span>);
p.<span class="fn">then</span>(v =&gt; v + <span class="num">1</span>);
p.<span class="fn">then</span>(v =&gt; console.<span class="fn">log</span>(v));</div>
    <b>Output:</b> <code>1</code><br>
    <span class="warn-text">Why:</span> <code>p.then()</code> returns a NEW promise. The original <code>p</code> remains resolved with <code>1</code>.`,
  },

  /* ───── BATCH 4: CLOSURES & MODERN JS ───── */
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Closure state persistence?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">init</span>() {
  <span class="kw">let</span> c = <span class="num">0</span>;
  <span class="kw">return</span> () =&gt; console.<span class="fn">log</span>(++c);
}
<span class="kw">const</span> a = <span class="fn">init</span>(), b = <span class="fn">init</span>();
<span class="fn">a</span>(); <span class="fn">a</span>(); <span class="fn">b</span>();</div>
    <b>Output:</b> <code>1</code>, <code>2</code>, <code>1</code><br>
    <span class="info-text">Explain:</span> Each call to <code>init()</code> creates a new independent lexical environment (scope). <code>a</code> and <code>b</code> have their own <code>c</code>.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Currying: add(1)(2)(3) implementation?",
    a: `<div class="code-block"><span class="kw">const</span> add = a =&gt; b =&gt; c =&gt; a + b + c;
console.<span class="fn">log</span>(<span class="fn">add</span>(<span class="num">1</span>)(<span class="num">2</span>)(<span class="num">3</span>));</div>
    <b>Output:</b> <code>6</code>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Infinite Currying: add(1)(2)(3)...() ?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">add</span>(a) {
  <span class="kw">return function</span>(b) {
    <span class="kw">if</span> (b) <span class="kw">return</span> <span class="fn">add</span>(a + b);
    <span class="kw">return</span> a;
  }
}</div>
    <span class="highlight">Note:</span> Works by returning the function recursively until it's called with no arguments.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "arguments in Arrow functions?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">outer</span>() {
  <span class="kw">const</span> inner = () =&gt; console.<span class="fn">log</span>(arguments[<span class="num">0</span>]);
  <span class="fn">inner</span>();
}
<span class="fn">outer</span>(<span class="num">1</span>);</div>
    <b>Output:</b> <code>1</code><br>
    <span class="warn-text">Why:</span> Arrow functions don't have their own <code>arguments</code> object; they inherit it from the nearest regular function scope.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Proxy property interception?",
    a: `<div class="code-block"><span class="kw">const</span> p = <span class="kw">new</span> <span class="fn">Proxy</span>({}, {
  get: (target, prop) =&gt; <span class="str">'intercepted'</span>
});
console.<span class="fn">log</span>(p.any);</div>
    <b>Output:</b> <code>"intercepted"</code>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Optional chaining with functions?",
    a: `<code>const obj = {}; console.log(obj.fn?.());</code><br>
    <b>Output:</b> <code>undefined</code><br>
    <span class="info-text">Explain:</span> <code>?.()</code> checks if the property before it exists and is a function before calling it.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Nullish Coalescing with zero?",
    a: `<code>0 ?? 10</code> vs <code>0 || 10</code><br>
    <b>Output:</b> <code>0</code> and <code>10</code><br>
    <span class="warn-text">Why:</span> <code>??</code> only triggers for <code>null/undefined</code>. <code>||</code> triggers for any falsy value (including <code>0</code>).`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Logical OR assignment (||=) ?",
    a: `<div class="code-block"><span class="kw">let</span> a = <span class="num">0</span>; a ||= <span class="num">10</span>;</div>
    <b>Output:</b> <code>a</code> is now <code>10</code><br>
    <span class="info-text">Explain:</span> <code>a ||= b</code> is equivalent to <code>a || (a = b)</code>. It assigns only if <code>a</code> is falsy.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "BigInt and Numbers mix?",
    a: `<code>1n + 1</code><br>
    <b>Output:</b> <code>TypeError: Cannot mix BigInt and other types</code><br>
    <span class="danger-text">Fix:</span> Use <code>1n + BigInt(1)</code> or <code>Number(1n) + 1</code>.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "The Symbol uniqueness?",
    a: `<code>Symbol('a') === Symbol('a')</code><br>
    <b>Output:</b> <code>false</code><br>
    <span class="highlight">Explain:</span> Every call to <code>Symbol()</code> returns a unique symbol, even with the same description.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Generator yield and next() values?",
    a: `<div class="code-block"><span class="kw">function</span>* <span class="fn">gen</span>() {
  <span class="kw">const</span> x = <span class="kw">yield</span> <span class="str">'a'</span>;
  console.<span class="fn">log</span>(x);
}
<span class="kw">const</span> g = <span class="fn">gen</span>();
g.<span class="fn">next</span>();
g.<span class="fn">next</span>(<span class="str">'b'</span>);</div>
    <b>Output:</b> <code>"b"</code><br>
    <span class="info-text">Explain:</span> The value passed to the <i>second</i> <code>next()</code> becomes the result of the <i>first</i> <code>yield</code> expression.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "new.target in functions?",
    a: `<div class="code-block"><span class="kw">function</span> <span class="fn">F</span>() { console.<span class="fn">log</span>(<span class="kw">new</span>.target); }
<span class="kw">new</span> <span class="fn">F</span>(); <span class="fn">F</span>();</div>
    <b>Output:</b> <code>F</code> and <code>undefined</code><br>
    <span class="highlight">Explain:</span> <code>new.target</code> allows you to detect if a function was called with the <code>new</code> keyword.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Private class fields (#)?",
    a: `<div class="code-block"><span class="kw">class</span> <span class="fn">C</span> { #p = <span class="num">1</span>; getP() { <span class="kw">return this</span>.#p; } }
<span class="kw">const</span> i = <span class="kw">new</span> <span class="fn">C</span>();
console.<span class="fn">log</span>(i.#p);</div>
    <b>Output:</b> <code>SyntaxError</code><br>
    <span class="warn-text">Why:</span> Private fields are truly private and cannot be accessed from outside the class body, not even with a dynamic key.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "WeakMap and GC behavior?",
    a: `<span class="info-text">Conceptual:</span> If an object is used as a key in a <code>WeakMap</code> and there are no other references to it, it can be garbage collected. This is impossible with a regular <code>Map</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["hard"],
    q: "Tricky 'this' & Constructor context?",
    a: `<div class="code-block"><span class="kw">var</span> a = <span class="num">200</span>;
console.<span class="fn">log</span>(<span class="str">"2"</span>, <span class="kw">this</span>.a);
<span class="kw">function</span> <span class="fn">abc</span>() {
  console.<span class="fn">log</span>(<span class="str">"3"</span>, <span class="kw">this</span>.a);
  <span class="kw">var</span> a = <span class="num">20</span>;
  console.<span class="fn">log</span>(<span class="str">"4"</span>, <span class="kw">this</span>.a);
}
<span class="kw">new</span> <span class="fn">abc</span>();
console.<span class="fn">log</span>(<span class="str">"5"</span>, <span class="kw">this</span>.a);</div>
    <b>Output:</b> <code>2 200</code>, <code>3 undefined</code>, <code>4 undefined</code>, <code>5 200</code><br>
    <span class="warn-text">Explain:</span> 
    1. <code>var a</code> is attached to <code>window</code> (this).
    2. <code>new abc()</code> creates <code>this</code> as a new object instance. <code>this.a</code> is not defined on the instance yet.
    3. The local variable <code>var a = 20</code> inside <code>abc</code> is hoisted but NOT attached to <code>this</code>.`,
  },
  {
    topic: "quiz",
    category: "this-objects",
    tags: ["medium"],
    q: "Inner function 'this' context?",
    a: `<div class="code-block"><span class="kw">var</span> a = <span class="num">10</span>;
<span class="kw">var</span> obj = {
  a: <span class="num">20</span>,
  b: <span class="kw">function</span>() {
    console.<span class="fn">log</span>(<span class="kw">this</span>.a);
    <span class="kw">function</span> <span class="fn">c</span>() {
      console.<span class="fn">log</span>(<span class="kw">this</span>.a);
    }
    <span class="fn">c</span>();
  }
}
obj.<span class="fn">b</span>();</div>
    <b>Output:</b> <code>20</code>, <code>10</code><br>
    <span class="danger-text">Why:</span> <code>obj.b()</code> uses implicit binding for <code>this</code> (points to <code>obj</code>). However, the plain function call <code>c()</code> defaults <code>this</code> to the global object (window).`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["medium"],
    q: "Global Var vs Global Let?",
    a: `<div class="code-block"><span class="kw">var</span> a = <span class="num">1</span>;
<span class="kw">let</span> b = <span class="num">2</span>;
console.<span class="fn">log</span>(<span class="kw">this</span>.a);
console.<span class="fn">log</span>(<span class="kw">this</span>.b);</div>
    <b>Output:</b> <code>1</code>, <code>undefined</code><br>
    <span class="info-text">Explain:</span> Variables declared with <code>var</code> at the top level become properties of the global object. <code>let</code> and <code>const</code> do not.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "The Symbol.iterator protocol?",
    a: `<div class="code-block"><span class="kw">const</span> obj = {
  *[Symbol.iterator]() { <span class="kw">yield</span> <span class="num">1</span>; <span class="kw">yield</span> <span class="num">2</span>; }
};
console.<span class="fn">log</span>([...obj]);</div>
    <b>Output:</b> <code>[1, 2]</code>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "String.at(-1) vs string[string.length-1] ?",
    a: `<code>at(-1)</code> is a modern, cleaner way to access the last character of a string or array. It supports negative indexing.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Function composition (Pipe) concept?",
    a: `<div class="code-block"><span class="kw">const</span> pipe = (...fns) =&gt; x =&gt; fns.<span class="fn">reduce</span>((v, f) =&gt; <span class="fn">f</span>(v), x);</div>
    <span class="info-text">Explain:</span> Passes the result of one function as the input to the next.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Rest parameters must be last?",
    a: `<code>function f(...a, b) {}</code><br>
    <b>Output:</b> <code>SyntaxError: Rest parameter must be last</code>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Object.entries of a string?",
    a: `<code>Object.entries('hi')</code><br>
    <b>Output:</b> <code>[['0', 'h'], ['1', 'i']]</code><br>
    <span class="info-text">Explain:</span> Strings are coerced to object wrappers where indices are enumerable properties.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Symbol.toStringTag custom behavior?",
    a: `<div class="code-block"><span class="kw">const</span> o = { [Symbol.toStringTag]: <span class="str">'MyObj'</span> };
console.<span class="fn">log</span>(o.<span class="fn">toString</span>());</div>
    <b>Output:</b> <code>"[object MyObj]"</code>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "for await...of usage?",
    a: `<div class="code-block"><span class="kw">async function</span> <span class="fn">f</span>() {
  <span class="kw">for await</span> (<span class="kw">const</span> x <span class="kw">of</span> asyncIterable) { ... }
}</div>`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "NaN property on Window?",
    a: `<code>isNaN === window.isNaN</code> vs <code>Number.isNaN === window.Number.isNaN</code><br>
    <b>Output:</b> <code>true</code> and <code>true</code><br>
    <code>isNaN</code> is a global function, <code>Number.isNaN</code> is a static method of <code>Number</code>.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["hard"],
    q: "Implicit return of an object from arrow function?",
    a: `<code>const f = () => { x: 1 }; console.log(f());</code><br>
    <b>Output:</b> <code>undefined</code><br>
    <span class="danger-text">Trap:</span> The braces are interpreted as a function block, not an object literal. Use <code>() => ({ x: 1 })</code>.`,
  },
  {
    topic: "quiz",
    category: "modern",
    tags: ["medium"],
    q: "Deleting a property inherited from prototype?",
    a: `<div class="code-block"><span class="kw">const</span> p = { x: <span class="num">1</span> };
<span class="kw">const</span> c = <span class="fn">Object.create</span>(p);
<span class="kw">delete</span> c.x;
console.<span class="fn">log</span>(c.x);</div>
    <b>Output:</b> <code>1</code><br>
    <span class="warn-text">Why:</span> <code>delete</code> only works on own properties. <code>c.x</code> is still accessible via the prototype chain.`,
  },
  {
    topic: "quiz",
    category: "fundamentals",
    tags: ["hard"],
    q: "Array constructor with one string arg?",
    a: `<code>new Array('3')</code> vs <code>new Array(3)</code><br>
    <b>Output:</b> <code>['3']</code> vs <code>[empty × 3]</code>`,
  },
];

let activeTopic = "all";
let activeQuizTab = "all";

const QUIZ_CHUNKS = [
  { id: "all", label: "All" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "this-objects", label: "This & Objects" },
  { id: "async-event", label: "Async & Event Loop" },
  { id: "modern", label: "Modern JS" },
];

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

    let subTagsHtml = "";
    if (t.id === "quiz") {
      subTagsHtml = `<div class="quiz-tabs">
        ${QUIZ_CHUNKS.map(
          (st) => `<button class="quiz-tab${activeQuizTab === st.id ? " active" : ""}" 
          onclick="setQuizTab('${st.id}')">${st.label}</button>`,
        ).join("")}
      </div>`;

      // Filter by sub-tab
      if (activeQuizTab !== "all") {
        items = items.filter((item) => item.category === activeQuizTab);
      }
    }

    html += `<div class="section" id="sec-${t.id}">
      <div class="section-header">
        <span class="section-dot" style="background:${t.color}"></span>
        <span class="section-title">${t.label}</span>
        <span class="section-count">${items.length} cards</span>
      </div>
      ${subTagsHtml}
      <div class="cards-grid">`;
    items.forEach((item) => {
      const tagsHtml = item.tags
        .map((tag) => {
          const desc =
            tag === "core"
              ? "Fundamental concept"
              : tag === "gotcha"
                ? "Tricky behavior / Common pitfall"
                : tag === "easy"
                  ? "Interview Essentials — Basics you must know."
                  : tag === "medium"
                    ? "Deep Dive — Understanding internal mechanics."
                    : tag === "hard"
                      ? "Senior Level — Edge cases and architectural nuances."
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
  activeQuizTab = "all"; // Reset quiz tab when switching topics
  buildTags();
  buildSidebar();
  buildMain();
}

function setQuizTab(id) {
  activeQuizTab = id;
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
