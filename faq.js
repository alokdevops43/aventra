/**
 * ============================================================================
 * AURA SUPPORT & FAQ — INTERACTION ENGINE (faq.js)
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('#faqCategoryTabs .segment-tab');
  const items = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearchInput');
  const clearBtn = document.getElementById('faqClearBtn');
  const searchStatus = document.getElementById('faqSearchStatus');

  let activeCategory = 'all';

  // 1. Accordion Toggle Logic
  items.forEach(item => {
    const toggleBtn = item.querySelector('.faq-item-toggle');
    const body = item.querySelector('.faq-item-body');

    toggleBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other accordions for clean single-view accordion experience
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-item-toggle');
          const otherBody = otherItem.querySelector('.faq-item-body');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = '0px';
      } else {
        item.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });

  // 2. Filter Accordions by Category & Query
  function filterFAQ() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    items.forEach(item => {
      const itemCategory = item.dataset.category;
      const questionText = item.querySelector('.faq-q-text')?.textContent.toLowerCase() || '';
      const answerText = item.querySelector('.faq-answer-inner')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
      const matchesQuery = !query || questionText.includes(query) || answerText.includes(query);

      if (matchesCategory && matchesQuery) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
        // Close if hidden
        item.classList.remove('open');
        const toggleBtn = item.querySelector('.faq-item-toggle');
        const body = item.querySelector('.faq-item-body');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        if (body) body.style.maxHeight = '0px';
      }
    });

    // Update status text
    if (searchStatus) {
      if (query) {
        searchStatus.textContent = `Showing ${visibleCount} matching ${visibleCount === 1 ? 'question' : 'questions'} for "${query}"`;
      } else {
        searchStatus.textContent = '';
      }
    }

    if (clearBtn) {
      clearBtn.style.display = query ? 'block' : 'none';
    }
  }

  // 3. Category Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeCategory = tab.dataset.cat;
      filterFAQ();
    });
  });

  // 4. Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterFAQ();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterFAQ();
      searchInput.focus();
    });
  }

  // Check URL hash for category jumping (e.g. faq.html#warranty)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchingTab = Array.from(tabs).find(t => t.dataset.cat === hash);
    if (matchingTab) {
      matchingTab.click();
    }
  }
});
