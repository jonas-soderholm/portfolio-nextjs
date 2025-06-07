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
    float field = 0.0;

    if (iMouse.w > 0.1) {
      vec4 prev = texture2D(iPreviousFrame, vUv);
      field = prev.r;

      // neighbor diffusion
      vec2 texel = 5.0 / iResolution;
      float n = texture2D(iPreviousFrame, vUv + vec2(0.0, texel.y)).r;
      float s = texture2D(iPreviousFrame, vUv - vec2(0.0, texel.y)).r;
      float e = texture2D(iPreviousFrame, vUv + vec2(texel.x, 0.0)).r;
      float w = texture2D(iPreviousFrame, vUv - vec2(texel.x, 0.0)).r;
      float avg = (n + s + e + w) * 0.25;
      field = mix(field, avg, 0.15);

      // add ripple — larger uBrushSize = bigger radius
      vec2 mouse = iMouse.xy / iResolution;
      float d = distance(vUv, mouse);
      float influence = exp(-pow(d / uBrushSize, 2.0));
      float strength = max(iMouse.w * 0.1, 0.1);

      field += influence * uBrushStrength * strength;
      field *= uFluidDecay;
    }

    gl_FragColor = vec4(field, 0.0, 0.0, 1.0);
  }
`;

export const displayShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iFluid;
  uniform float uDistortionAmount;
  varying vec2 vUv;

  #define TAU 6.28318530718
  #define MAX_ITER 33

  void main() {
    // apply ripple distortion from iFluid
    float bump = texture2D(iFluid, vUv).r;
    vec2 dir = normalize(vUv - vec2(0.5));
    vec2 distortedUV = vUv + dir * bump * uDistortionAmount;

    // fractal background
    float time = iTime * 0.1 + 23.0; // slowed down
    vec2 uv = distortedUV * iResolution;

    vec2 p = mod(uv * TAU / iResolution.y, TAU) - 250.0;
    vec2 i = p;
    vec3 c = vec3(0.0);
    float inten = 0.005;

    for (int n = 0; n < MAX_ITER; n++) {
      float t = (time + 0.08) * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(0.011, 0.021) +
          vec2(cos(t - i.x) + sin(t + i.y),
               sin(t - i.y) + cos(t + i.x));
      c.x += 1.5 / length(vec2(
        p.x / (sin(i.x + t) / inten),
        p.y / (cos(i.y + t) / inten)
      ));
    }

    i = p;
    for (int n = 0; n < MAX_ITER; n++) {
      float t = (time + 0.04) * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y),
                   sin(t - i.y) + cos(t + i.x));
      c.y += 1.5 / length(vec2(
        p.x / (sin(i.x + t) / inten),
        p.y / (cos(i.y + t) / inten)
      ));
    }

    i = p;
    for (int n = 0; n < MAX_ITER; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y),
                   sin(t - i.y) + cos(t + i.x));
      c.z += 1.5 / length(vec2(
        p.x / (sin(i.x + t) / inten),
        p.y / (cos(i.y + t) / inten)
      ));
    }

    c /= float(MAX_ITER);
    c.x = 1.17 - pow(c.x, 1.4);
    c.y = 1.17 - pow(c.y, 1.4);
    c.z = 1.17 - pow(c.z, 1.4);

    vec3 colour = vec3(
      pow(abs(c.x), 8.0),
      pow(abs(c.y), 8.0),
      pow(abs(c.z), 8.0)
    );

    gl_FragColor = vec4(colour * 0.99, 1.0); // darker
  }
`;
