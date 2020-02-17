'use strict';
(function () {
  // Значения фильтров
  var filterData = {};
  var filterType = window.util.getSelector('#housing-type');
  filterType.addEventListener('change', function () {
    filterData.type = filterType.value;
    window.data.updatePins();
  });
  window.filter = {
    filterData: filterData
  }
})();
