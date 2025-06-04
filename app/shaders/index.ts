export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;
export const fluidShader = `
  uniform vec2 iResolution;
  uniform vec4 iMouse; // .xy = pos, .w = velocity
  uniform sampler2D iPreviousFrame;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uFluidDecay;
  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(iPreviousFrame, vUv);
    float field = prev.r; // store scalar in red channel

    // neighbor diffusion (smooths out)
    vec2 texel = 5.0 / iResolution;
    float n = texture2D(iPreviousFrame, vUv + vec2(0.0, texel.y)).r;
    float s = texture2D(iPreviousFrame, vUv - vec2(0.0, texel.y)).r;
    float e = texture2D(iPreviousFrame, vUv + vec2(texel.x, 0.0)).r;
    float w = texture2D(iPreviousFrame, vUv - vec2(texel.x, 0.0)).r;
    float avg = (n + s + e + w) * 0.25;
    field = mix(field, avg, 0.15);

    // mouse adds a smooth circular bump
    vec2 mouse = iMouse.xy / iResolution;
    float d = distance(vUv, mouse);
    float influence = exp(-pow(d * uBrushSize, 10.0));
    field += influence * uBrushStrength * max(iMouse.w * 0.1, 0.1);

    // slow decay
    field *= uFluidDecay;

    gl_FragColor = vec4(field, 4.0, 4.0, 4.0);
  }
`;
export const displayShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iFluid;
  uniform float uDistortionAmount;
  varying vec2 vUv;

  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }

  vec3 baseShader(vec2 fragCoord) {
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    float d = -(iTime * 0.3);
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += (iTime * 0.5);
    vec3 col = vec3(
      cos(uv.x * d) * 0.6 + 0.4,
      cos(uv.y * a) * 0.5 + 0.5,
      0.5
    );

    float intensity = (col.r + col.g + col.b) / 3.0;
    return palette(intensity);
  }

  void main() {
    // sample scalar bump
    float bump = texture2D(iFluid, vUv).r;

    // displace UVs radially based on bump
    vec2 dir = normalize(vUv - 0.1);
    vec2 distortedUV = vUv + dir * bump * uDistortionAmount;

    vec3 base = baseShader(distortedUV * iResolution);
    gl_FragColor = vec4(base, 20.0);
  }
`;
