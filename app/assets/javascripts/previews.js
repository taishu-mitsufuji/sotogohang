$(function () {
  let imagesArea = document.querySelectorAll(".itemBody__main__form__image__box__form__set__field");
  // Methods
  // 画像の追加
  function addImage(idName, en) {
    var reader = new FileReader();
    reader.onload = e => $(`#preview${idName}`).attr('src', e.target.result)
    reader.readAsDataURL(en.target.files[0]);
    $(`#image${idName}`).val("true");
  }
  // 画像の削除
  function removeImage(idNum) {
    $(`#preview${idNum}`).attr("src", "");
    $(`#item_images_attributes_${idNum}_image`).val("");
    $(`#image${idNum}`).val("false");
  }

  // exec
  imagesArea.forEach((image, i) => image.onchange = e => addImage(i, e));
  for (let i = 0; i < 3; i++) { $(`#item_image_delete${i}`).on('click', () => removeImage(i)); }
});

$(function () {
  let imagesArea = document.querySelectorAll(".itemBody__main__form__headerImage__zone__set__label");
  // Methods
  // 画像の追加
  function addImage(idName, en) {
    var reader = new FileReader();
    reader.onload = e => $(`#previeww`).attr('src', e.target.result)
    reader.readAsDataURL(en.target.files[0]);
    $(`#image`).val("true");
  }
  // 画像の削除
  function removeImage(idNum) {
    $(`#preview${idNum}`).attr("src", "");
    $(`#item_images_attributes_${idNum}_image`).val("");
    $(`#image${idNum}`).val("false");
  }

  // exec
  imagesArea.forEach((image, i) => image.onchange = e => addImage(i, e));
  for (let i = 0; i < 3; i++) { $(`#item_image_delete${i}`).on('click', () => removeImage(i)); }
});