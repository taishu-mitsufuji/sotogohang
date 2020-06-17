window.addEventListener('load', function () {

  var target = document.querySelector(".header__title__zone__text");
  const targetPoint = document.querySelector(".header__title__zone");
  // li生成
  function createList(data, className, i, firstClassName = "") {
    let category = document.createElement("a");
    category.classList.add(className);
    if (i === 0) { category.classList.add(firstClassName); }
    category.id = data[i].id
    category.href = `/categories/${data[i].id}`
    category.textContent = data[i].name
    let list = document.createElement("li");
    list.appendChild(category);
    return list
  }
  // ul生成
  function createUl(className) {
    let Area = document.createElement("ul");
    Area.classList.add(className);
    return Area;
  }

  target.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    setTimeout(() => {
      if (document.querySelector(".parentsArea")) { $(".parentsArea").remove(); }
      $.ajax({
        url: '/categories/parents',
        type: 'POST',
        dataType: 'json',
      })
        .done((data) => {
          let categoriesArea = createUl("parentsArea");
          data.forEach((el, i) => {
            categoriesArea.appendChild(createList(data, "aParent", i, "aParentFixArea"));
          });
          targetPoint.appendChild(categoriesArea);
          categoriesArea.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            $(".parentsArea").remove();
          });
          let parentCategories = document.querySelectorAll(".aParent");
          parentCategories.forEach(function (pc) {
            pc.addEventListener('mouseover', (e) => {
              e.stopPropagation();
              setTimeout(() => {
                $.ajax({
                  url: '/categories/children',
                  type: 'POST',
                  data: { id: pc.id },
                  dataType: 'json',
                })
                  .done((dataTwo) => {
                    if (document.querySelector(".childrenArea")) { $(".childrenArea").remove(); }
                    let categoriesChildrenArea = createUl("childrenArea");
                    dataTwo.forEach((el, i) => {
                      categoriesChildrenArea.appendChild(createList(dataTwo, "aChild", i, "aChildFixArea"));
                    });
                    pc.appendChild(categoriesChildrenArea);
                    let Children = document.querySelectorAll(".aChild");
                    Children.forEach(function (cc) {
                      cc.addEventListener('mouseover', (e) => {
                        e.stopPropagation();
                        setTimeout(() => {
                          $.ajax({
                            url: '/categories/children',
                            type: 'POST',
                            data: { id: cc.id },
                            dataType: 'json',
                          })
                            .done((dataThree) => {
                              if (document.querySelector(".groundChildrenArea")) { $(".groundChildrenArea").remove(); }
                              let categoriesGroundChildrenArea = createUl("groundChildrenArea");
                              dataThree.forEach((el, i) => {
                                categoriesGroundChildrenArea.appendChild(createList(dataThree, "aGroundChild", i, "lastCategory"));
                              });
                              cc.appendChild(categoriesGroundChildrenArea);
                              let groundChild = document.querySelectorAll(".aGroundChild");
                              groundChild.forEach(function (gc) {
                                gc.addEventListener('mouseover', (e) => {
                                  e.stopPropagation();
                                });
                              });
                            });
                        }, 250);
                      });
                    });
                  });
              }, 250)
            });
          });
        })
        .fail((data) => {
          alert("error")
        })
    }, 250)
  });
});
