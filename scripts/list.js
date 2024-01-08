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

table.innerHTML = filtered
  .map(
    (item) =>
      `<tr ><td class="table-image-cell"><img src='./../assets/media/hands/${item.figure}.jpeg' alt='hands playing catscraddle' class="table-image"></td><td class="table-author"><a id=${item.id}>${item.author}</a></td> <td>${item.title}</td></tr>`
  )
  .join("");
