window.addEventListener("DOMContentLoaded", () => {
  // 使用例:
  var befores = getClassNamesContainingString("bf:");
  console.log(befores);
  outputStyles(befores);
});

function getClassNamesContainingString(searchString) {
  var elements = document.querySelectorAll('[class*="' + searchString + '"]');
  var classNames = [];

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var elementClassNames = element.className.split(" ");
    classNames.push([element]);

    for (var j = 0; j < elementClassNames.length; j++) {
      var className = elementClassNames[j];

      if (className.indexOf(searchString) !== -1) {
        classNames[i].push(className);
      }
    }
  }

  return classNames;
}

function outputStyles(elements) {
  elements.forEach((element) => {
    const target = element[0];
    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.display = "none";
    document.appendChild(hiddenDiv);
    for (let i = 1; i < element.length; i++) {
      const classes = element[i];
      let className = classes.split("bf:")[1];
      console.log(className);
    }
    console.log("---");
  });
}
