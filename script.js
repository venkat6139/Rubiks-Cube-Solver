class RubiksCube {
      constructor() {
        this.faces = {
          U: Array(9).fill('w'),
          D: Array(9).fill('y'),
          F: Array(9).fill('r'),
          B: Array(9).fill('o'),
          L: Array(9).fill('g'),
          R: Array(9).fill('b'),
        };
      }

      getStateString() {
        return [
          this.faces.U.join(''),
          this.faces.R.join(''),
          this.faces.F.join(''),
          this.faces.D.join(''),
          this.faces.L.join(''),
          this.faces.B.join(''),
        ].join('');
      }

      rotateFace(face, clockwise = true) {
        const f = this.faces[face];
        const newFace = f.slice();
        const idx = clockwise
          ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
          : [2, 5, 8, 1, 4, 7, 0, 3, 6];
        for (let i = 0; i < 9; i++) newFace[i] = f[idx[i]];
        this.faces[face] = newFace;

        const adjacent = {
          U: [['B', 2], ['R', 2], ['F', 2], ['L', 2]],
          D: [['F', 6], ['R', 6], ['B', 6], ['L', 6]],
          F: [['U', 6], ['R', 0, true], ['D', 2], ['L', 8, true]],
          B: [['U', 2], ['L', 0, true], ['D', 6], ['R', 8, true]],
          L: [['U', 0], ['F', 0], ['D', 0], ['B', 8, true]],
          R: [['U', 8], ['B', 0, true], ['D', 8], ['F', 8]],
        };

        const adj = adjacent[face];
        const strips = adj.map(([f, i, rev]) =>
          this.getStrip(f, i, rev)
        );

        const rotatedStrips = clockwise ? [3, 0, 1, 2] : [1, 2, 3, 0];

        for (let i = 0; i < 4; i++) {
          const [f, idx, rev] = adj[i];
          this.setStrip(f, idx, strips[rotatedStrips[i]], rev);
        }
      }

      getStrip(face, index, reverse = false) {
        const f = this.faces[face];
        let strip = [];
        if (index === 0) strip = [f[0], f[3], f[6]];
        else if (index === 2) strip = [f[2], f[5], f[8]];
        else if (index === 6) strip = [f[6], f[7], f[8]];
        else if (index === 8) strip = [f[0], f[1], f[2]];
        return reverse ? strip.reverse() : strip;
      }

      setStrip(face, index, values, reverse = false) {
        if (reverse) values = [...values].reverse();
        const f = this.faces[face];
        if (index === 0) [f[0], f[3], f[6]] = values;
        else if (index === 2) [f[2], f[5], f[8]] = values;
        else if (index === 6) [f[6], f[7], f[8]] = values;
        else if (index === 8) [f[0], f[1], f[2]] = values;
      }
    }

    class CubeSolver {
      constructor(cube) {
        this.cube = cube;
        this.moveHistory = [];
      }

      applyMove(face, clockwise = true) {
        this.moveHistory.push({ face, clockwise });
        this.cube.rotateFace(face, clockwise);
        displayCube(this.cube, `Move: ${face} ${clockwise ? '' : `'`}`);
      }

      scramble(steps = 10) {
        const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
        for (let i = 0; i < steps; i++) {
          const face = faces[Math.floor(Math.random() * 6)];
          const clockwise = Math.random() > 0.5;
          this.applyMove(face, clockwise);
        }
      }

      solve() {
        const reverseMoves = [...this.moveHistory].reverse();
        reverseMoves.forEach(({ face, clockwise }) => {
          this.cube.rotateFace(face, !clockwise);
          displayCube(this.cube, `Undo: ${face} ${!clockwise ? '' : `'`}`);
        });
        this.moveHistory = [];
      }
    }

    function displayCube(cube, title = '') {
      const svg = getCubeSvg(cube.getStateString());
      const container = document.getElementById('output');
      const stepDiv = document.createElement('div');
      stepDiv.innerHTML = `<h3>${title}</h3>${svg}<hr/>`;
      container.appendChild(stepDiv);
    }

    function run() {
      document.getElementById('output').innerHTML = '';
      const cube = new RubiksCube();
      const solver = new CubeSolver(cube);
      displayCube(cube, 'Initial Cube');
      solver.scramble(10);
      solver.solve();
    }

    //Mock getCubeSvg()
    function getCubeSvg(cubeStr) {
      const colors = {
        r: '#d00',
        g: '#0d0',
        b: '#00d',
        y: '#ff0',
        o: '#f80',
        w: '#fff'
      };
      const faces = cubeStr.match(/.{1,9}/g);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "300");
      svg.setAttribute("height", "200");

      const facePositions = {
        U: [100, 0], R: [200, 100], F: [100, 100],
        D: [100, 200], L: [0, 100], B: [300, 100]
      };

      ['U', 'R', 'F', 'D', 'L', 'B'].forEach((face, i) => {
        const [ox, oy] = facePositions[face];
        for (let j = 0; j < 9; j++) {
          const x = ox + (j % 3) * 20;
          const y = oy + Math.floor(j / 3) * 20;
          const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          rect.setAttribute("x", x);
          rect.setAttribute("y", y);
          rect.setAttribute("width", 20);
          rect.setAttribute("height", 20);
          rect.setAttribute("stroke", "#000");
          rect.setAttribute("fill", colors[faces[i][j]]);
          svg.appendChild(rect);
        }
      });
      return svg.outerHTML;
    }