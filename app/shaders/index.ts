export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fluidShader = `
  uniform vec2 iResolution;
  uniform vec4 iMouse;
  uniform sampler2D iPreviousFrame;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uFluidDecay;
  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(iPreviousFrame, vUv);
    vec4 color = prev;

    // Mouse adds energy
    if (iMouse.z > 0.5) {
      vec2 mouse = iMouse.xy / iResolution;
      float d = distance(vUv, mouse);
      float influence = exp(-d * uBrushSize);
      color.rgb += vec3(1.0, 0.4, 0.2) * influence * uBrushStrength;
    }

    // Fade
    color *= uFluidDecay;

    gl_FragColor = color;
  }
`;

export const displayShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iPreviousFrame;
  varying vec2 vUv;

  // your palette
  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }

  // original shader logic
  vec3 baseShader(vec2 fragCoord) {
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    float d = -(iTime * 0.3);
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += (iTime * 0.3);
    vec3 col = vec3(
      cos(uv.x * d) * 0.6 + 0.4,
      cos(uv.y * a) * 0.5 + 0.5,
      0.5
    );

    float intensity = (col.r + col.g + col.b) / 3.0;
    return palette(intensity);
  }

  void main() {
    // base shader background
    vec3 base = baseShader(vUv * iResolution);

    // fluid overlay
    vec4 fluid = texture2D(iPreviousFrame, vUv);

    // combine them
    vec3 finalColor = base + fluid.rgb;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
