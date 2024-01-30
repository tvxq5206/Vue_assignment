
export default {
  props: ['pages', 'getData'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled: !pages.has_pre}">
      <a class="page-link" href="#" aria-label="Previous" @click="getData(pages.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active: pages === pages.current_page}" v-for="pages in pages.total_pages" :key="pages + 123">
      <a class="page-link" href="#" @click="getData(pages)">{{ pages }}</a>
    </li>
    <li class="page-item" :class="{disabled: !pages.has_next}">
      <a class="page-link" href="#" aria-label="Next" @click="getData(pages.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
}