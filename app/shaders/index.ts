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
  uniform sampler2D uDisplacement;
  uniform sampler2D uTexture;
  uniform float uDistortionAmount;
  varying vec2 vUv;

  const float PI = 3.141592653589793;

  void main() {
    vec4 displacement = texture2D(uDisplacement, vUv);
    float theta = displacement.r * 2.0 * PI;
    vec2 dir = vec2(sin(theta), cos(theta));
    vec2 uv = vUv + dir * displacement.r * uDistortionAmount;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;
