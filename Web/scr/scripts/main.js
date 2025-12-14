document.addEventListener('DOMContentLoaded', function () {
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const range = document.querySelector('.cal-range');
  const rangeText = document.querySelector('.calorie-mock .range');
  const filters = Array.from(document.querySelectorAll('input[name="filter"]'));

  // copy data-kind from thumb to its h3 so CSS can use attr(data-kind)
  thumbs.forEach(t => {
    const kind = t.dataset.kind;
    const h3 = t.querySelector('.info h3');
    if (h3 && kind) h3.dataset.kind = kind;
  });

  function applyFilters() {
    const activeFilter = document.querySelector('input[name="filter"]:checked');
    const activeClass = activeFilter && activeFilter.id !== 'filter-all' ? activeFilter.id.replace('filter-','') : null;
    const threshold = Number(range.value || 0);

    thumbs.forEach(t => {
      const cal = Number(t.dataset.calories) || 0;
      const byCategory = !activeClass || t.classList.contains(activeClass);
      const byCalories = cal <= threshold;
      if (byCategory && byCalories) {
        t.style.display = '';
      } else {
        t.style.display = 'none';
      }
    });
  }

  // update range label and reapply
  function onRange() {
    const v = Number(range.value);
    if (rangeText) rangeText.textContent = `Від 0 до ${v} кКал`;
    applyFilters();
  }

  range.addEventListener('input', onRange);
  filters.forEach(f => f.addEventListener('change', applyFilters));

  // initial render
  onRange();
});
