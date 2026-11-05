/*
 * Quilt of slowly swirling, faintly teal-tinted waves behind the page.
 * A fragment shader renders at low resolution and is upscaled by the browser.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("swirl-bg");
  if (!canvas) return;
  // The footer include sits inside an animated (stacking-context) element, so re-parent to body.
  document.body.insertBefore(canvas, document.body.firstChild);

  var gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) { canvas.remove(); return; }

  var RENDER_SCALE = 0.3;   // fraction of CSS pixels actually rendered
  var CELL_PX = 150;        // size of one swirl in the quilt, CSS pixels
  var STRENGTH = 0.12;      // peak brightness added (0..1)
  var BASE_SPEED = 0.22;    // phase radians per second at rest
  var MAX_BOOST = 3.0;      // extra speed multiplier at full mouse speed
  var INTRO_BOOST = 4.0;    // load-time flourish that eases out
  var FRAME_MS = 1000 / 30;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var vert = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
  var frag = [
    "precision mediump float;",
    "uniform float uPhase; uniform float uPulse; uniform float uFade;",
    "uniform float uCell; uniform float uStrength; uniform vec3 uBase;",
    "float hash(vec2 c){ return fract(sin(dot(c, vec2(127.1, 311.7))) * 43758.5453); }",
    "void main(){",
    "  vec2 p = gl_FragCoord.xy / uCell;",
    "  vec2 cell = floor(p);",
    "  float sum = 0.0, wsum = 0.0;",
    "  for (int j = -1; j <= 1; j++) {",
    "    for (int i = -1; i <= 1; i++) {",
    "      vec2 c = cell + vec2(float(i), float(j));",
    "      float h = hash(c), h2 = hash(c + 17.3);",
    "      vec2 jit = (vec2(hash(c + 3.1), hash(c + 9.7)) - 0.5) * 0.6;",
    "      vec2 d = p - (c + 0.5 + jit);",
    "      float r = length(d), a = atan(d.y, d.x);",
    "      float w = exp(-r * r * 3.2);",
    "      float spin = h > 0.5 ? 1.0 : -1.0;",
    "      float arms = 2.0 + floor(h2 * 3.0);",
    "      float wave = sin(r * 11.0 - uPhase * (0.8 + h) + spin * arms * a + h2 * 6.2831 + (h2 - 0.5) * uPhase * 2.4);",
    "      float kind = hash(c + 41.9);",
    "      float ang = h2 * 6.2831 + (h - 0.5) * uPhase * 0.5;",
    "      vec2 ax = vec2(cos(ang), sin(ang));",
    "      vec2 pr = vec2(-ax.y, ax.x);",
    "      float along = dot(d, ax), across = dot(d, pr);",
    "      float burst = 1.0;",
    "      if (kind > 0.42 && kind <= 0.60) {",
    "        // momentum burst: a wave packet shoots along a random axis",
    "        float travel = fract(uPulse * (0.18 + h * 0.2) + h2) * 2.4 - 1.2;",
    "        w = exp(-across * across * 6.0 - (along - travel) * (along - travel) * 5.0);",
    "        wave = sin(along * 16.0 - uPhase * 3.0);",
    "      } else if (kind > 0.60 && kind <= 0.72) {",
    "        // saddle: hyperbolic standing flow that slowly rotates",
    "        wave = sin(along * across * 26.0 + uPhase * (0.6 + h));",
    "      } else if (kind > 0.72 && kind <= 0.86) {",
    "        // pulsar: pure concentric ripples with no arms",
    "        wave = sin(r * 16.0 - uPhase * (1.6 + h2 * 1.5));",
    "      } else if (kind > 0.86) {",
    "        // lattice: two crossing plane waves make a moving moire grid",
    "        wave = sin(along * 12.0 + uPhase * 0.9) * sin(across * 12.0 - uPhase * 0.7);",
    "      }",
    "      float on = 0.2 + 0.8 * smoothstep(-0.4, 0.8, sin(uPulse * (0.5 + h2 * 0.6) + h * 6.2831));",
    "      sum += w * on * wave;",
    "      wsum += w;",
    "    }",
    "  }",
    "  float v = 0.5 + 0.5 * (sum / wsum);",
    "  vec3 tint = vec3(0.55, 1.0, 0.92);",
    "  float dither = (hash(gl_FragCoord.xy + uPhase) - 0.5) / 255.0;",
    "  gl_FragColor = vec4(uBase + tint * v * uStrength * uFade + dither, 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  var vs = compile(gl.VERTEX_SHADER, vert), fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) { canvas.remove(); return; }
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var u = {};
  ["uPhase", "uPulse", "uFade", "uCell", "uStrength", "uBase"].forEach(function (n) {
    u[n] = gl.getUniformLocation(prog, n);
  });

  var bg = (getComputedStyle(document.documentElement).backgroundColor.match(/[\d.]+/g) || [37, 42, 52]).slice(0, 3);
  gl.uniform3f(u.uBase, bg[0] / 255, bg[1] / 255, bg[2] / 255);
  gl.uniform1f(u.uStrength, STRENGTH);

  var phase = 0, pulse = 0, fadeV = 0;

  function draw() {
    gl.uniform1f(u.uPhase, phase);
    gl.uniform1f(u.uPulse, pulse);
    gl.uniform1f(u.uFade, fadeV);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function resize() {
    var w = Math.max(2, Math.round(window.innerWidth * RENDER_SCALE));
    var h = Math.max(2, Math.round(window.innerHeight * RENDER_SCALE));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform1f(u.uCell, CELL_PX * RENDER_SCALE);
    draw();
  }
  window.addEventListener("resize", resize);

  if (reducedMotion) {
    phase = 2; pulse = 1; fadeV = 1;
    resize();
    return;
  }
  resize();

  // Pointer speed (px/ms), smoothed, drives a temporary speed-up.
  var lastX = null, lastY = 0, lastT = 0, pointerSpeed = 0;
  window.addEventListener("pointermove", function (e) {
    var now = performance.now();
    if (lastX !== null) {
      var v = Math.hypot(e.clientX - lastX, e.clientY - lastY) / Math.max(1, now - lastT);
      pointerSpeed = Math.max(pointerSpeed, Math.min(v, 3));
    }
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  }, { passive: true });

  var start = performance.now(), prev = start, last = 0, boost = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (now - last < FRAME_MS) return;
    last = now;

    var dt = Math.min(0.1, (now - prev) / 1000);
    prev = now;
    var t = (now - start) / 1000;

    pointerSpeed *= Math.exp(-dt * 1.2);
    var target = Math.min(1, pointerSpeed / 1.5) * MAX_BOOST;
    boost += (target - boost) * Math.min(1, dt * 3);

    var intro = INTRO_BOOST * Math.exp(-t / 2.5);
    phase += dt * BASE_SPEED * (1 + boost + intro);
    pulse += dt * 0.35 * (1 + boost * 0.5);

    var f = Math.min(1, t / 2.5);
    fadeV = f * f * (3 - 2 * f);
    draw();
  }
  requestAnimationFrame(frame);
})();
