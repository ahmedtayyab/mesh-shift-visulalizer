// MeshGrid component (logic extracted here for modularity)
// The full implementation is in index.html for zero-build deployment.
// In a React build, this component would receive props: { nodes, p, mode, prevNodes }

export function renderMeshGrid(container, nodes, p, mode, prevNodes) {
  const sqrtP = Math.sqrt(p);
  container.style.gridTemplateColumns = `repeat(${sqrtP}, 1fr)`;
  container.innerHTML = '';
  nodes.forEach((val, pos) => {
    const r = Math.floor(pos / sqrtP), c = pos % sqrtP;
    const div = document.createElement('div');
    div.className = 'mesh-node';
    if (prevNodes && prevNodes[pos] !== val) {
      div.classList.add(mode === 'row' ? 'moved-row' : 'moved-col');
    }
    div.innerHTML = `<span class="node-id">${val}</span><span class="node-label">(${r},${c})</span>`;
    container.appendChild(div);
  });
}