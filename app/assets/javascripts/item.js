window.addEventListener('load', function () {
  const selectArea = document.querySelector(".itemBody__main__form__category__field");
  const parents = document.querySelector("#parentsArea");

  // methods
  function addSelector(data, id = "") {
    let select = document.createElement("select");
    let noOption = document.createElement("option");
    noOption.setAttribute("value", "");
    noOption.appendChild(document.createTextNode("選択してください"));
    select.appendChild(noOption);
    data.forEach(el => {
      let option = document.createElement("option");
      option.setAttribute("value", el.id);
      option.appendChild(document.createTextNode(el.name));
      select.appendChild(option);
    });
    select.id = `item_category_child${id}`
    if (select.id === 'item_category_child__children') {
      select.name = 'post[category_id]'
    }
    selectArea.appendChild(select);
  }

  parents.onchange = function () {
    if (selectArea.childElementCount === 2) {
      selectArea.removeChild(selectArea.lastChild);
    } else if (selectArea.childElementCount === 3) {
      selectArea.removeChild(selectArea.lastChild);
      selectArea.removeChild(selectArea.lastChild);
    }
    $.ajax({
      url: '/categories/children',
      type: 'POST',
      data: { 'id': parents.value },
      dataType: 'json',
    })
      .done((data) => {
        addSelector(data);
        let children = document.querySelector("#item_category_child");
        children.onchange = function () {
          if (selectArea.childElementCount === 3) {
            selectArea.removeChild(selectArea.lastChild);
          }
          $.ajax({
            url: '/categories/children',
            type: 'POST',
            data: { 'id': children.value },
            dataType: 'json',
          })
            .done((dataTwo) => {
              addSelector(dataTwo, "__children");
            })
        }
      })
  }
})






// $(function () {
//   function buildHTML(result) {
//     var html =
//       `<option value= ${result.id}>${result.name}</option>`
//     return html
//   }
//   $("#parent").on("change", function () {
//     // console.log(ggggg)
//     var int = document.getElementById("parent").value
//     $.ajax({
//       url: "/categories",
//       type: 'GET',
//       dataType: 'json',
//       data: { id: int }
//     })
//       .done(function (categories) {
//         var insertHTML = `<select name="child" id="child">
//                         <option value=0>---</option>`;
//         $.each(categories, function (i, category) {
//           insertHTML += buildHTML(category)
//         });
//         insertHTML += `</select>`
//         $('.items__child').append(insertHTML);
//       })
//       .fail(function () {
//       });
//   });
//   $("#child").on("change", function () {
//     var intParent = document.getElementById("parent").value
//     var intChild = document.getElementById("child").value
//     var int = intParent + '/' + intChild
//     $.ajax({
//       url: "/categories",
//       type: 'GET',
//       dataType: 'json',
//       data: { id: int }
//     })
//       .done(function () {
//         var insertHTML = `<select name="item[category_id]" id="item_category_id">
//                         <option value=0>---</option>`;
//         $.each(categories, function (i, category) {
//           insertHTML += buildHTML(category)
//         });
//         insertHTML += `</select>`
//       })
//       .fail(function () {
//       });
//   });
// })