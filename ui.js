// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let scale = spec.scale || 1;
  parts.log.textContent = "左表 " + (spec.left || []).length + " 项，右表 " + (spec.right || []).length + " 项。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { scale: scale }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.keys.forEach(function (name, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = name;
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, view.totals[spot]) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = String(view.totals[spot]);
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "键 " + view.count + " 个，合计 " + view.grand;
    parts.log.textContent = "只在一侧出现 " + view.only_one + " 个";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "对齐求和";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const upButton = document.createElement("button");
  upButton.textContent = "倍率加一";
  upButton.addEventListener("click", function () {
    scale = scale + 1;
    draw();
  });
  parts.controls.appendChild(upButton);

  const downButton = document.createElement("button");
  downButton.textContent = "倍率减一";
  downButton.addEventListener("click", function () {
    scale = Math.max(1, scale - 1);
    draw();
  });
  parts.controls.appendChild(downButton);

  const label = document.createElement("label");
  label.textContent = "倍率";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(scale);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { scale = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看合计";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { scale: scale }));
    parts.out.textContent = "合计 " + view.grand + "，键 " + view.count + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
