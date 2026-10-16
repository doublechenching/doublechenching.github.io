const n = (value: number) => value.toFixed(2);

// Decorative mathematical line art, generated locally. These are illustrations,
// not medical scans or model outputs, and are hidden from assistive technology.
export function orbitalArt(): string {
  function project(phi: number, theta: number): [number, number, number] {
    const r = 141 * (1 + 0.13 * Math.cos(3 * theta) * Math.cos(phi) ** 2 + 0.07 * Math.sin(phi * 4 + theta));
    const x = r * Math.cos(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * 1.12;
    const z = r * Math.cos(phi) * Math.sin(theta);
    const ry = y * Math.cos(-0.44) - z * Math.sin(-0.44);
    const rz = y * Math.sin(-0.44) + z * Math.cos(-0.44);
    const rx = x * Math.cos(0.58) + rz * Math.sin(0.58);
    return [225 + rx * Math.cos(-0.3) - ry * Math.sin(-0.3), 228 + rx * Math.sin(-0.3) + ry * Math.cos(-0.3), rz];
  }
  function curve(points: [number, number, number][]): string {
    return points.map((p, i) => `${i ? 'L' : 'M'}${n(p[0])},${n(p[1])}`).join('');
  }
  const curves: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const phi = -1.48 + (i / 30) * 2.96;
    const points = Array.from({ length: 101 }, (_, j) => project(phi, (j / 100) * Math.PI * 2));
    curves.push(`<path d="${curve(points)}" class="orb-latitude" opacity="${i % 3 === 0 ? '.68' : '.32'}"/>`);
  }
  for (let i = 0; i < 34; i++) {
    const points = Array.from({ length: 81 }, (_, j) => project(-Math.PI / 2 + (j / 80) * Math.PI, (i / 34) * Math.PI * 2));
    curves.push(`<path d="${curve(points)}" class="orb-longitude" opacity="${i % 4 === 0 ? '.5' : '.23'}"/>`);
  }
  return `<svg viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="orb-glow"><stop stop-color="#d9ad78" stop-opacity=".23"/><stop offset="1" stop-color="#d9ad78" stop-opacity="0"/></radialGradient></defs><circle cx="225" cy="230" r="220" fill="url(#orb-glow)"/><ellipse cx="225" cy="230" rx="205" ry="74" transform="rotate(-34 225 230)" class="orb-orbit" stroke-dasharray="2 6"/><g class="orb-surface" stroke-width=".7">${curves.join('')}</g><circle cx="388" cy="118" r="5" fill="var(--accent)"/><circle cx="388" cy="118" r="11" stroke="var(--accent)" stroke-opacity=".25"/><path d="M225 27v16m-8-8h16M33 258h15m-7-7v14" stroke="var(--art-line)" stroke-width=".8"/></svg>`;
}

export function projectArt(kind: string): string {
  let shapes = '';
  if (kind === 'brain') {
    const brain = 'M -4 -83 C -16 -104 -50 -85 -56 -63 C -89 -57 -84 -24 -90 -9 C -110 16 -87 49 -69 49 C -72 79 -40 91 -22 81 C -16 99 -5 83 -4 72 Z';
    for (let i = 0; i < 13; i++) {
      const scale = 1 - i * .055;
      shapes += `<g transform="translate(230 120) scale(${scale})" opacity="${.8 - i * .035}"><path d="${brain}"/><path d="${brain}" transform="scale(-1 1)"/></g>`;
    }
    shapes += '<path d="M230 20v202" stroke-dasharray="3 5" opacity=".4"/><ellipse cx="250" cy="139" rx="15" ry="22" fill="var(--visual-highlight)" fill-opacity=".4" stroke="var(--visual-highlight)"/><path d="M270 136h41l20-20h39" stroke="var(--visual-highlight)"/><circle cx="270" cy="136" r="2.5" fill="var(--visual-highlight)"/>';
  } else if (kind === 'ultrasound') {
    for (let i = 0; i < 18; i++) {
      const radius = 48 + i * 8;
      const x = Math.sin(.64) * radius;
      const y = Math.cos(.64) * radius;
      shapes += `<path d="M${n(220 - x)} ${n(y)} A${radius} ${radius} 0 0 0 ${n(220 + x)} ${n(y)}" opacity="${.2 + i * .035}"/>`;
    }
    for (let i = 0; i < 15; i++) {
      const theta = -.64 + i * .0914;
      shapes += `<path d="M${n(220 + Math.sin(theta) * 46)} ${n(Math.cos(theta) * 46)}L${n(220 + Math.sin(theta) * 188)} ${n(Math.cos(theta) * 188)}" opacity=".26"/>`;
    }
    shapes += '<path d="M199 109q25-28 48-8t29 21l-25 42-47-8z" fill="var(--visual-highlight)" fill-opacity=".16" stroke="var(--visual-highlight)" stroke-dasharray="3 3"/>';
  } else if (kind === 'cells') {
    const cells = [[130,85,33],[205,125,40],[280,72,29],[308,155,32],[139,177,25],[226,49,20],[239,199,22]];
    cells.forEach(([x,y,r], i) => {
      shapes += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" transform="rotate(${i * 33} ${x} ${y})" fill="var(--visual-ink)" fill-opacity=".06"/><ellipse cx="${x}" cy="${y}" rx="${r * .72}" ry="${r * .52}" transform="rotate(${i * 33} ${x} ${y})" opacity=".4"/><circle cx="${x + 3}" cy="${y - 2}" r="${r * .22}" fill="var(--visual-highlight)" fill-opacity=".55" stroke="var(--visual-highlight)"/>`;
      for (let j=0;j<9;j++) {
        const theta=j*.7+i;
        shapes+=`<circle cx="${n(x+Math.cos(theta)*r*.48)}" cy="${n(y+Math.sin(theta)*r*.48)}" r="1.5" fill="var(--visual-ink)" stroke="none" opacity=".55"/>`;
      }
    });
  } else if (kind === 'volume') {
    for (let i = 0; i < 8; i++) {
      const x=151+i*11, y=40+i*12;
      shapes += `<path d="M${x} ${y}l92 21v95l-92-21z" fill="var(--visual-ink)" fill-opacity=".025" opacity="${.25+i*.08}"/>`;
    }
    shapes += '<path d="M204 100l42 10v44l-42-10z" fill="var(--visual-highlight)" fill-opacity=".2" stroke="var(--visual-highlight)"/><path d="M151 40l77 84m15-63 77 84m-169-10 77 84" opacity=".4" stroke-dasharray="3 4"/>';
  } else {
    for (let i=0;i<15;i++) {
      const y=20+i*16;
      shapes += `<path d="M40 ${y}Q120 ${y-40} 220 ${y+5}T420 ${y-5}" opacity=".25"/>`;
    }
    [[160,82,22],[254,155,-28],[309,70,42]].forEach(([x,y,angle])=>{
      shapes += `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M0-17L7-8V17H-7V-8z" fill="var(--visual-ink)" fill-opacity=".35"/><rect x="-16" y="-25" width="32" height="50" rx="2" stroke="var(--visual-highlight)" stroke-dasharray="4 3"/><path d="M0 18v23" opacity=".3"/></g>`;
    });
  }
  return `<svg viewBox="0 0 450 240" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="var(--visual-ink)" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${shapes}</g></svg>`;
}
