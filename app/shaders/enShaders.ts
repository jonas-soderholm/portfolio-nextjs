export const enVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const enFragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform bool u_enable;
varying vec2 v_uv;

void main() {
  vec4 tex = texture2D(u_texture, v_uv);

  vec2 aspect = vec2(u_aspect, 1.0);
  float radius = 0.19;
  float dist = distance(u_mouse * aspect, v_uv * aspect);
  float d = 1.0 - smoothstep(radius, radius + 0.005, dist);

  if (u_enable) {
    tex.a = mix(tex.a, 0.0, d);
  }

  gl_FragColor = tex;
}
`;
