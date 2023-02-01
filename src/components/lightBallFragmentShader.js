const fragmentShader = `
varying float vDistance;

void main() {
    vec3 color = vec3(0.34, 0.53, 0.96);

    // Create a strength variable that's bigger the closer to the center of the particle the pixel is
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    // Ensures color is only visible close to the center of the particle
    color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.5);
    color = mix(vec3(0.0), color, strength);
    gl_FragColor = vec4(color, strength);
}`


export default fragmentShader;