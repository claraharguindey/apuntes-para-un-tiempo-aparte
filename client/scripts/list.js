const table = document.getElementById("table");

const ids = content.map(({ author }) => author);

const filtered = content
  .filter(({ author }, index) => !ids.includes(author, index + 1))
  .sort(function (a, b) {
    if (a.author < b.author) {
      return -1;
    }

    if (a.author > b.author) {
      return 1;
    }

    return 0;
  });

const displayFullText = (id) => {
  document.getElementById(`${id}Text`).classList.toggle("table-accordion-body");
  document.getElementById(`${id}Row`).classList.toggle("openRow");
  document.getElementById(`${id}button`).innerText =
    document.getElementById(`${id}button`).innerText === "Ver texto completo"
      ? "Cerrar"
      : "Ver texto completo";
};

table.innerHTML = filtered
  .map(
    (item) =>
      `<tbody class="table" id=${item.figure}>
        <tr id="${item.id}Row" class="openRow">
          <td class="table-image-cell">
            <img src='./../assets/media/hands/${
              item.figure
            }.jpeg' alt='hands playing catscraddle' class="table-image">
          </td>
          <td class="table-author">
            <a>${item.author}</a>
          </td>
          <td>${item.title}</td>
          ${
            item.fullText
              ? `<td class="table-button" id="${item.id}button">Ver texto completo</td>`
              : ""
          }
        </tr>
      </tbody>
      ${
        item.fullText
          ? `<tbody class="table-accordion-body" id="${item.id}Text">
          <tr>
            <td colspan="4" class="table-full-text">
              ${item.fullText}
            </td>
          </tr>
        </tbody>`
          : ""
      }`
  )
  .join("");

filtered.map((item) => {
  const buttonCell = document.getElementById(`${item.id}button`);
  if (item.fullText) {
    buttonCell.addEventListener("click", () => displayFullText(item.id));
  }
});
