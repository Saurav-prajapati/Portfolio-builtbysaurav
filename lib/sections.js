import { desc } from "framer-motion/client";

// lib/sections.js
export const sections = [
    {
        id: "advance-variant-filter",
        slug: "advance-variant-filter",
        title: "Advanced Variant Filter",
        platform: "shopify",
        category: "Filter",
        language: "liquid",
        ext: ".liquid",
        description:
            "Advanced variant filtering for Shopify products with customizable options and seamless integration.",
        tags: ["Shopify", "Liquid", "Filter", "Product"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 230,
        demoUrl: "",
        seoKeywords: ["shopify variant filter", "custom product filter liquid"],
        code: `{%- liquid
  if section.blocks.size > 0
    assign section_onboarding = false
  else
    assign section_onboarding = true
  endif

  assign size_opt_name = section.settings.size_option_name
  if size_opt_name == blank
    assign size_opt_name = 'Size'
  endif

  assign color_opt_name = section.settings.color_option_name
  if color_opt_name == blank
    assign color_opt_name = 'Color'
  endif
-%}

{% style %}
  .dynamic-section-{{ section.id }}{
    --pt-m: {{ section.settings.padding_top_mobile }}px;
    --pt-d: {{ section.settings.padding_top_desktop }}px;
    --pb-m: {{ section.settings.padding_bottom_mobile }}px;
    --pb-d: {{ section.settings.padding_bottom_desktop }}px;
    padding-top: var(--pt-d);
    padding-bottom: var(--pb-d);
    background: {{ section.settings.background_color }};
  }
  @media (max-width:749px){
    .dynamic-section-{{ section.id }}{ 
      padding-top:var(--pt-m); 
      padding-bottom:var(--pb-m); 
    }
  }

  .vf-group{
    margin:14px 0; 
  }
  .vf-label{ 
    display:block; 
    margin-bottom:6px; 
    font-weight:600; 
    color:#64748b; 
  }

  /* Custom dropdown (combobox) */
  .vf-select{ 
    position:relative;
    max-width:420px; 
  }
  .vf-trigger{
    width:100%; 
    text-align:left; 
    padding:10px 12px; 
    border:1px solid #cbd5e1; 
    background:#fff; 
    border-radius:8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .vf-trigger[aria-expanded="true"]{ 
    border-color:#d049d04a; 
    /* box-shadow:0 0 0 2px rgba(14,165,233,.15);  */
  }
  .vf-trigger:disabled{ 
    opacity:.55; cursor:not-allowed; 
  }

  .vf-menu{
    position:absolute; 
    left:0; 
    right:0; 
    z-index:30; 
    margin-top:6px; 
    background:#fff; 
    border:1px solid #cbd5e1; 
    border-radius:8px;
    list-style:none; 
    padding:6px; 
    display:none; 
    max-height:260px; 
    overflow:auto;
  }
  .vf-select.is-open .vf-menu{ 
    display:block; 
  }
  .vf-option > button{
    display:block; 
    width:100%; 
    text-align:left; 
    padding:8px 10px; 
    border-radius:6px; 
    border:none; 
    background:transparent; 
    cursor:pointer;
    font-size: 14px;
  }
  .vf-option > button:hover{ 
    background:#d049d03b; 
  }
  .vf-option.is-selected > button{ 
    background: linear-gradient(135deg,#dc54dc,#830081);
    color: #fff;
  }
  .vf-empty{ 
    color:#94a3b8; 
    font-style:italic; 
    padding:8px 10px; 
  }
  .drop_arrow {
    position: absolute;
    right: 12px;
    top: 10px;
    display: flex;
    transition: 0.5s;
  }
  .vf-select.is-open .drop_arrow {
    transform: rotate(180deg);
  }
  .vf-select.is-disabled .drop_arrow {
    opacity: .55;
    cursor: not-allowed;
  }
{% endstyle %}

{%- comment -%}
Build per-collection payload (detected option names, sizes, size↔color pairs)
{%- endcomment -%}
{%- assign payload = '' -%}
{%- for block in section.blocks -%}
  {%- if block.settings.collection != blank -%}
    {%- assign c = collections[block.settings.collection] -%}

    {%- assign detected_size_name = '' -%}
    {%- assign detected_color_name = '' -%}

    {%- for p in c.products -%}
      {%- for opt in p.options -%}
        {%- if detected_size_name == '' and opt == size_opt_name -%}{%- assign detected_size_name = opt -%}{%- endif -%}
        {%- if detected_color_name == '' and opt == color_opt_name -%}{%- assign detected_color_name = opt -%}{%- endif -%}
      {%- endfor -%}
    {%- endfor -%}

    {%- if detected_color_name == '' -%}
      {%- for p in c.products -%}
        {%- for opt in p.options -%}
          {%- if opt == 'Color' or opt == 'Colour' -%}{%- assign detected_color_name = opt -%}{%- endif -%}
        {%- endfor -%}
      {%- endfor -%}
    {%- endif -%}

    {%- if detected_size_name == '' and detected_color_name != '' -%}
      {%- for p in c.products -%}
        {%- if p.options.size == 2 -%}
          {%- for opt in p.options -%}
            {%- if opt != detected_color_name -%}{%- assign detected_size_name = opt -%}{%- endif -%}
          {%- endfor -%}
        {%- endif -%}
      {%- endfor -%}
    {%- endif -%}

    {%- assign size_name_for_url = detected_size_name -%}
    {%- if size_name_for_url == '' -%}{%- assign size_name_for_url = size_opt_name -%}{%- endif -%}
    {%- assign color_name_for_url = detected_color_name -%}
    {%- if color_name_for_url == '' -%}{%- assign color_name_for_url = color_opt_name -%}{%- endif -%}

    {%- assign size_vals_raw = '||' -%}
    {%- assign pairs_json = '' -%}

    {%- for p in c.products -%}
      {%- assign idx_s = 0 -%}{%- assign idx_c = 0 -%}
      {%- if p.options.size > 0 and p.options[0] == size_name_for_url -%}{%- assign idx_s = 1 -%}{%- endif -%}
      {%- if p.options.size > 1 and p.options[1] == size_name_for_url -%}{%- assign idx_s = 2 -%}{%- endif -%}
      {%- if p.options.size > 2 and p.options[2] == size_name_for_url -%}{%- assign idx_s = 3 -%}{%- endif -%}

      {%- if p.options.size > 0 and p.options[0] == color_name_for_url -%}{%- assign idx_c = 1 -%}{%- endif -%}
      {%- if p.options.size > 1 and p.options[1] == color_name_for_url -%}{%- assign idx_c = 2 -%}{%- endif -%}
      {%- if p.options.size > 2 and p.options[2] == color_name_for_url -%}{%- assign idx_c = 3 -%}{%- endif -%}

      {%- if idx_c == 0 and p.options.size == 2 and idx_s > 0 -%}
        {%- if idx_s == 1 -%}{%- assign idx_c = 2 -%}{%- endif -%}
        {%- if idx_s == 2 -%}{%- assign idx_c = 1 -%}{%- endif -%}
      {%- endif -%}

      {%- for v in p.variants -%}
        {%- assign s_val = '' -%}{%- assign c_val = '' -%}
        {%- if idx_s == 1 -%}{%- assign s_val = v.option1 -%}{%- endif -%}
        {%- if idx_s == 2 -%}{%- assign s_val = v.option2 -%}{%- endif -%}
        {%- if idx_s == 3 -%}{%- assign s_val = v.option3 -%}{%- endif -%}

        {%- if idx_c == 1 -%}{%- assign c_val = v.option1 -%}{%- endif -%}
        {%- if idx_c == 2 -%}{%- assign c_val = v.option2 -%}{%- endif -%}
        {%- if idx_c == 3 -%}{%- assign c_val = v.option3 -%}{%- endif -%}

        {%- if s_val != blank -%}
          {%- capture s_token -%}||{{ s_val }}||{%- endcapture -%}
          {%- unless size_vals_raw contains s_token -%}
            {%- assign size_vals_raw = size_vals_raw | append: s_val | append: '||' -%}
          {%- endunless -%}
        {%- endif -%}

        {%- if s_val != blank and c_val != blank -%}
          {%- capture one_pair -%}{ "size": {{ s_val | json }}, "color": {{ c_val | json }} }{%- endcapture -%}
          {%- if pairs_json != '' -%}
            {%- assign pairs_json = pairs_json | append: ',' | append: one_pair -%}
          {%- else -%}
            {%- assign pairs_json = one_pair -%}
          {%- endif -%}
        {%- endif -%}
      {%- endfor -%}
    {%- endfor -%}

    {%- assign size_arr = size_vals_raw | split: '||' -%}
    {%- capture sizes_json -%}[{%- assign first = true -%}{%- for v in size_arr -%}{%- unless v == '' -%}{%- if first -%}{%- assign first = false -%}{%- else -%},{%- endif -%}{{ v | json }}{%- endunless -%}{%- endfor -%}]{%- endcapture -%}

    {%- assign title_value = block.settings.title | default: c.title -%}
    {%- capture one_collection -%}
      {
        "url": {{ c.url | json }},
        "title": {{ title_value | json }},
        "sizeOptionName": {{ size_name_for_url | json }},
        "colorOptionName": {{ color_name_for_url | json }},
        "sizes": {{ sizes_json }},
        "pairs": [{{ pairs_json }}]
      }
    {%- endcapture -%}

    {%- if payload != '' -%}
      {%- assign payload = payload | append: ',' | append: one_collection -%}
    {%- else -%}
      {%- assign payload = one_collection -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}

<section data-section-id="{{ section.id }}" class="banner-section dynamic-section-{{ section.id }}">
  <div class="container">
    <div class="custom-advanced_filter-container">
      <div class="custom-advanced_filter-content">
        <h2>{{ section.settings.heading }} <span class="highlight-text">{{ section.settings.hightlight_heading }}</span></h2>
        <div class="subhead">{{ section.settings.content }}</div>
      </div>

      <div class="custom-advanced_filter-box filter-form-{{ section.id }}">
        <!-- Collection dropdown -->
        <div class="vf-group">
          <span class="vf-label">{{ section.settings.collection_label | default: 'Select collection' }}</span>
          <div class="vf-select" id="vf-coll-{{ section.id }}" role="combobox" aria-expanded="false" aria-haspopup="listbox">
            <button class="vf-trigger" type="button" aria-expanded="false">Frame Type…</button>
            <ul class="vf-menu" role="listbox">
              {%- if section.blocks.size == 0 -%}
                <li class="vf-empty">No collections configured</li>
              {%- else -%}
                {%- for block in section.blocks -%}
                  {%- if block.settings.collection != blank -%}
                    {%- assign c = collections[block.settings.collection] -%}
                    {%- assign title_value = block.settings.title | default: c.title -%}
                    <li class="vf-option" data-url="{{ c.url }}" role="option" aria-selected="false">
                      <button type="button">{{ title_value }}</button>
                    </li>
                  {%- endif -%}
                {%- endfor -%}
              {%- endif -%}
            </ul>
            <span class="drop_arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Size dropdown -->
        <div class="vf-group">
          <span class="vf-label">{{ size_opt_name }}</span>
          <div class="vf-select is-disabled" id="vf-size-{{ section.id }}" role="combobox" aria-expanded="false" aria-haspopup="listbox">
            <button class="vf-trigger" type="button" aria-expanded="false" disabled>Select Size…</button>
            <ul class="vf-menu" role="listbox"></ul>
            <span class="drop_arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Color dropdown -->
        <div class="vf-group">
          <span class="vf-label">{{ color_opt_name }}</span>
          <div class="vf-select is-disabled" id="vf-color-{{ section.id }}" role="combobox" aria-expanded="false" aria-haspopup="listbox">
            <button class="vf-trigger" type="button" aria-expanded="false" disabled>Select Colour…</button>
            <ul class="vf-menu" role="listbox"></ul>
            <span class="drop_arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            </span>
          </div>
        </div>

        <div class="vf-group">
          <button type="button" class="gradient1 btn filter-submit">{{ section.settings.button | default: 'Search' }}</button>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
(function(){
  var DATA = { collections: [{{ payload }}] };

  function uniq(arr){ var out=[]; (arr||[]).forEach(function(v){ if(v && out.indexOf(v)===-1) out.push(v); }); return out; }
  function normalize(u){ return (u || '').replace(/\/+$/,''); }
  function findCollectionByUrl(url){
    var t = normalize(url);
    return (DATA.collections||[]).find(function(c){ return normalize(c.url) === t; }) || null;
  }

  // Basic dropdown controller
  function makeDropdown(root){
    var trigger = root.querySelector('.vf-trigger');
    var menu = root.querySelector('.vf-menu');
    var value = '';

    function close(){ root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); root.setAttribute('aria-expanded','false'); }
    function open(){ if(trigger.disabled) return; root.classList.add('is-open'); trigger.setAttribute('aria-expanded','true'); root.setAttribute('aria-expanded','true'); }
    function clearSelected(){
      menu.querySelectorAll('.vf-option').forEach(function(li){ li.classList.remove('is-selected'); li.setAttribute('aria-selected','false'); });
    }
    function setLabel(text){ trigger.textContent = text || 'Choose…'; }
    function setDisabled(disabled){
      if(disabled){ root.classList.add('is-disabled'); trigger.disabled = true; close(); }
      else{ root.classList.remove('is-disabled'); trigger.disabled = false; }
    }
    function setOptions(values){
      menu.innerHTML = '';
      if(!values || !values.length){
        var li=document.createElement('li'); li.className='vf-empty'; li.textContent='No options'; menu.appendChild(li);
        value = ''; setLabel('Choose…'); return;
      }
      values.forEach(function(val){
        var li=document.createElement('li'); li.className='vf-option'; li.dataset.value = val.value || val;
        if(val.url) li.dataset.url = val.url;
        li.setAttribute('role','option'); li.setAttribute('aria-selected','false');
        var b=document.createElement('button'); b.type='button'; b.textContent = val.label || val;
        b.addEventListener('click', function(){
          if(trigger.disabled) return;
          clearSelected(); li.classList.add('is-selected'); li.setAttribute('aria-selected','true');
          value = li.dataset.value || ''; setLabel(b.textContent); close();
          root.dispatchEvent(new CustomEvent('change', { detail: { value: value, url: li.dataset.url || '' } }));
        });
        li.appendChild(b); menu.appendChild(li);
      });
      value = ''; setLabel('Choose…');
    }
    trigger.addEventListener('click', function(){ root.classList.contains('is-open') ? close() : open(); });
    document.addEventListener('click', function(e){ if(!root.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

    return {
      setDisabled: setDisabled,
      setOptions: setOptions,
      getValue: function(){ return value; },
      setValue: function(v){
        var li = Array.prototype.find.call(menu.querySelectorAll('.vf-option'), function(n){ return (n.dataset.value||'') === v; });
        clearSelected();
        if(li){
          li.classList.add('is-selected'); li.setAttribute('aria-selected','true');
          value = v; setLabel(li.textContent.trim());
        } else { value=''; setLabel('Choose…'); }
      }
    };
  }

  var form = document.querySelector(".filter-form-{{ section.id }}");
  if(!form) return;

  // Build dropdown instances
  var ddColl = makeDropdown(document.getElementById("vf-coll-{{ section.id }}"));
  var ddSize = makeDropdown(document.getElementById("vf-size-{{ section.id }}"));
  var ddColor = makeDropdown(document.getElementById("vf-color-{{ section.id }}"));

  // Initialize collection options from HTML list
  (function hydrateCollections(){
    var htmlLis = document.querySelectorAll("#vf-coll-{{ section.id }} .vf-menu .vf-option");
    var opts = [];
    htmlLis.forEach(function(li){
      opts.push({ label: li.textContent.trim(), value: li.getAttribute('data-url'), url: li.getAttribute('data-url') });
    });
    ddColl.setOptions(opts);
    ddSize.setOptions([]); ddSize.setDisabled(true);
    ddColor.setOptions([]); ddColor.setDisabled(true);
  })();

  var state = { entry:null };

  // When collection changes: load sizes, disable colors
  document.getElementById("vf-coll-{{ section.id }}").addEventListener('change', function(ev){
    var url = (ev.detail && ev.detail.url) || ev.detail.value || '';
    var entry = findCollectionByUrl(url);
    state.entry = entry || null;

    ddSize.setOptions([]); ddSize.setDisabled(true);
    ddColor.setOptions([]); ddColor.setDisabled(true);

    if(!entry) return;

    var sizes = uniq(entry.sizes || []);
    ddSize.setOptions(sizes.map(function(s){ return { label:s, value:s }; }));
    ddSize.setDisabled(!(sizes && sizes.length));
  });

  // When size changes: load allowed colors
  document.getElementById("vf-size-{{ section.id }}").addEventListener('change', function(ev){
    ddColor.setOptions([]); ddColor.setDisabled(true);
    if(!state.entry) return;

    var chosen = (ev.detail && ev.detail.value) || '';
    if(!chosen) return;

    var allowed = [];
    (state.entry.pairs || []).forEach(function(p){ if(p && p.size === chosen && p.color) allowed.push(p.color); });
    allowed = uniq(allowed);
    ddColor.setOptions(allowed.map(function(c){ return { label:c, value:c }; }));
    ddColor.setDisabled(!allowed.length);
  });

  function buildUrl(){
    var base = (state.entry && state.entry.url) || (ddColl.getValue() || "/collections/all");
    var params = [];
    var sizeName = state.entry ? state.entry.sizeOptionName : "{{ size_opt_name }}";
    var colorName = state.entry ? state.entry.colorOptionName : "{{ color_opt_name }}";
    var sVal = ddSize.getValue();
    var cVal = ddColor.getValue();
    if (sVal) params.push("filter.v.option." + encodeURIComponent((sizeName||'').toLowerCase().trim()) + "=" + encodeURIComponent(sVal));
    if (cVal) params.push("filter.v.option." + encodeURIComponent((colorName||'').toLowerCase().trim()) + "=" + encodeURIComponent(cVal));
    return base + (params.length ? (base.indexOf("?")>-1?"&":"?") + params.join("&") : "");
  }

  var go = form.querySelector(".filter-submit");
  if (go){ go.addEventListener('click', function(){ window.open(buildUrl()); }); }
})();
</script>

{% schema %}
{
  "name": "Variant Filter Dependent",
  "settings": [
    { 
      "id": "background_color", 
      "type": "color", 
      "label": "Background Color" },
    { 
      "type": "inline_richtext", 
      "id": "heading", 
      "label": "Heading", 
      "default": "Heading" 
    },
    { 
      "type": "inline_richtext", 
      "id": "hightlight_heading", 
      "label": "Hightlight Heading", 
      "default": "Hightlight Heading" 
    },
    { 
      "type": "richtext", 
      "id": "content", 
      "default": "<p>Write your content here....</p>", 
      "label": "Content" 
    },
    { 
      "type": "text", 
      "id": "collection_label", 
      "label": "Collection label", 
      "default": "Select collection" 
    },
    { 
      "type": "text", 
      "id": "size_option_name", 
      "label": "Size option name (must match product option)", 
      "default": "Size" 
    },
    { 
      "type": "text", 
      "id": "color_option_name", 
      "label": "Color option name (must match product option)", 
      "default": "Color" 
    },
    { 
      "type": "text", 
      "id": "button", 
      "label": "Button label", 
      "default": "Search" 
    },
    { 
      "id": "padding_top_mobile", 
      "type": "range", 
      "label": "Top padding (mobile)", 
      "min": 0, 
      "max": 60, 
      "step": 10, 
      "unit": "px", 
      "default": 20 
    },
    { 
      "id": "padding_top_desktop", 
      "type": "range", 
      "label": "Top padding (desktop)", 
      "min": 0, 
      "max": 60, 
      "step": 10, 
      "unit": "px", 
      "default": 40 
    },
    { 
      "id": "padding_bottom_mobile", 
      "type": "range", 
      "label": "Bottom padding (mobile)", 
      "min": 0, 
      "max": 60, 
      "step": 10, 
      "unit": "px", 
      "default": 20 
    },
    { 
      "id": "padding_bottom_desktop", 
      "type": "range", 
      "label": "Bottom padding (desktop)", 
      "min": 0, 
      "max": 60, 
      "step": 10, 
      "unit": "px", 
      "default": 40
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [
        { "type": "collection", 
          "id": "collection", 
          "label": "Choose collection" 
        },
        { "type": "text", 
          "id": "title", 
          "label": "Custom label (optional)"
        }
      ]
    }
  ],
  "presets": [
    { 
      "name": "Variant Filter Dependent" 
    }
  ]
}
{% endschema %}`
    },
    {
        id: "banner-with-text",
        slug: "banner-with-text",
        title: "Banner with Text",
        platform: "shopify",
        category: "Banner",
        language: "liquid",
        ext: ".liquid",
        description: "A simple banner section with text content",
        tags: ["Shopify", "Liquid", "Banner"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 150,
        demoUrl: "",
        seoKeywords: ["shopify banner section", "custom banner liquid"],
        code: `{% style %}
.bls__page-scrolling-content>*,
.bls__product-text-scrolling>* {
    animation: ticker var(--text-time, 15s) infinite linear;
    flex-shrink: 0;
}

.bls__page-scrolling-content a,
.bls__page-scrolling-content .bls__banner-text-scrolling {
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: var(--heading-color);
    font-weight: var(--text-font-weight);
    font-size: var(--text-font-size);
}

.bls__product-text-scrolling .bls__product-text-scrolling-content {
    background: var(--bg-text-sale-scrolling);
    color: var(--s-text-color);
    font-size: var(--text-font-size);
    font-weight: var(--text-font-weight);
}

.scroll-text-title {
    font-family: var(--heading-font-family);
}

@media (min-width: 992px) {
    .bls__page-scrolling-content .bls__banner-text-scrolling {
        font-size: var(--text-font-size);
    }
}

@media (max-width: 991px) {
    .bls__page-scrolling-content .bls__banner-text-scrolling {
        font-size: 3.6rem;
    }
}

.bls__page-scrolling-content a .scroll-line,
.bls__page-scrolling-content .bls__banner-text-scrolling .scroll-line,
.bls__product-text-scrolling .bls__product-text-scrolling-content .scroll-line {
    margin: 0 var(--text-spacing);
    margin-top: -3px;
}

.bls__page-scrolling-content a .scroll-line svg,
.bls__page-scrolling-content .bls__banner-text-scrolling .scroll-line svg {
    fill: var(--heading-color);
    stroke: var(--heading-color);
}

.bls__page-scrolling-content:hover>* {
    animation-play-state: paused;
}

.bls__banner-text-scrolling .scroll-line {
    display: inline-flex;
    align-items: center;
}

.bls__banner-text-scrolling {
    text-transform: uppercase;
}

.bls__banner-text-scrolling--content {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}

.bls__page-scrolling-content .bls__banner-text-scrolling:nth-child(even) {
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--heading-color);
}

.bls__product-text-scrolling {
    background-color: var(--bg-text-sale-scrolling);
    padding: 0.5rem 0;

}
    .banner-with-text-overplay.banner-position .type-banner * {
    height: 100%;
}

.banner-with-text-overplay.banner-position .bls__banner-text--content {
    display: flex;
    flex-direction: column;
}

.banner-with-text-overplay:not(.text-bellow-mobile) .bls__banner-text--content {
    padding: 1rem;
}

.banner-with-text-overplay.banner-position>div {
    flex: 0 0 auto;
    width: 100%;
}

.bls__banner-text--grid .bls__banner-text--content {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex: 1;
    position: relative;
}

.bls__banner-text--content-inner.content-bg {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

@media (min-width: 768px) {
    .bls__banner-text--content-inner:not(.content-full-with) {
        width: var(--content-width);
    }

    .bls__banner-text--grid>* {
        position: sticky;
        top: 93px;
    }

    .bls__banner-text--content-inner.content-bg {
        padding-left: 3rem;
        padding-right: 3rem;
    }
}

@media (min-width: 1025px) {
    .bls__banner-text--grid>* {
        top: var(--height-header);
    }
}

.content-horizontal-position-left .bls__banner-text--content-inner {
    margin-right: auto;
}

.content-horizontal-position-center .bls__banner-text--content-inner {
    margin-left: auto;
    margin-right: auto;
}

.content-horizontal-position-right .bls__banner-text--content-inner {
    margin-left: auto;
}

.banner-with-text-overplay .bls__banner-text--content-inner {
    position: relative;
    padding: var(--bs-gutter-x);
    z-index: 1;
}

.banner-with-text-overplay:not(.text-bellow-mobile) .bls__banner-text--content.has-bg {
    padding: 5rem 3rem;
}

.bg-overlay--content-inner {
    background: transparent;
}

.bg-text-column {
    background-color: var(--content-bg);
    background-image: var(--content-bg);
}

.bg-overlay--content-inner::before {
    content: '';
    opacity: var(--content-opacity);
    border-radius: 5px;
    inset: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    z-index: -1;
    background-color: var(--content-bg);
    background-image: var(--content-bg);
}

.content-position-center {
    justify-content: center;
}

.content-position-bottom {
    justify-content: flex-end;
}

.content-position-top {
    justify-content: flex-start;
}

.bls__banner-text--img {
    margin-top: var(--img-mt);
    margin-bottom: var(--img-mb);
    max-width: var(--img-max-width);
}

.text-center .bls__banner-text--img {
    margin-left: auto;
    margin-right: auto;
}

.text-right .bls__banner-text--img {
    margin-left: auto;
}

.text-left .bls__banner-text--img {
    margin-right: auto;
}

.bls__banner-text--heading {
    color: var(--heading-color);
    font-size: var(--text-heading-font-size);
    font-weight: var(--text-heading-font-weight, var(--bls__section-heading-weight));
    text-transform: var(--text-heading-transform);
    margin-top: var(--text-heading-mt);
    margin-bottom: var(--text-heading-mb);


}

.bls__banner-text--subheading {
    color: var(--heading-color);
    font-size: var(--text-subheading-font-size);
    font-weight: var(--text-subheading-font-weight, var(--heading-font-weight));
    text-transform: var(--text-subheading-transform);
    margin-top: var(--text-subheading-mt);
    margin-bottom: var(--text-subheading-mb);
}

.bls__banner-text--des {
    margin-top: var(--text-mt);
    margin-bottom: var(--text-mb);
}

.bls__banner-text--button {
    margin-top: var(--b-mt);
    margin-bottom: var(--b-mb);
}

.bls__banner-text--html {
    margin-top: var(--html-mt);
    margin-bottom: var(--html-mb);
}

.bls__banner-text--des p {
    color: rgb(var(--base-color));
    font-size: var(--text-font-size);
    font-weight: var(--text-font-weight, var(--base-font-weight));
    text-transform: var(--text-transform);
}

.bls__banner-text--des a {
    text-decoration: underline;
    text-underline-offset: 5px;
}

.bls__banner-subtext .mb-10 {
    margin-bottom: 1rem;
    line-height: 1;
}

.faq-content {
    margin-top: var(--faq-mt);
    margin-bottom: var(--faq-mb);
}

.faq-content .bls__page-faq-items .bls__page-faq-title {
    color: var(--heading-color);
    font-size: var(--title-faq-font-size);
    font-weight: var(--title-faq-font-weight, var(--heading-font-weight));
    text-transform: var(--title-faq-transform);
    cursor: pointer;
}

.bls__page-faq-items .bls__page-faq-title .open-children-toggle {
    right: -15px;
}

.faq-content .bls__page-faq-items .bls__page-faq-content {
    font-size: var(--text-faq-font-size);
    font-weight: var(--text-faq-font-weight);
    text-transform: var(--text-faq-transform);
}

.bls__banner-text--content.text-center .timer-banner {
    justify-content: center;
}

.bls__banner-text--content.text-right .timer-banner {
    justify-content: flex-end;
}

.timer-banner {
    margin-top: var(--bn-text-mt);
    margin-bottom: var(--bn-text-mb);
    flex-wrap: wrap;
}

.timer-banner .timer-block {
    color: rgb(var(--base-color));
    font-weight: var(--bn-text-font-weight);
    text-transform: var(--bn-text-transform);
    white-space: nowrap;
}

.timer-banner .timer-block__num {
    font-size: clamp(2.4rem, 3.5vw, var(--bn-number-font-size));
    color: rgb(var(--base-color));
}

.timer-banner .timer-block__text {
    font-size: var(--bn-text-font-size);
    text-transform: var(--bn-text-transform);
}

.countdown_design_1 .timer-banner .timer-block:not(:last-child):after {
    content: ':';
    font-size: 2.4rem;
    margin: 0 1rem;
    line-height: 1;
}

.countdown_design_2 .timer-banner {
    border: 1px solid #dedede;
    border-radius: 5px;
    position: relative;
}

.countdown_design_2 .timer-banner::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: 5px;
    backdrop-filter: blur(5px);
    filter: blur(5px);
    z-index: 1;
}

.countdown_design_2 .timer-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: clamp(5.1rem, 12vw, 17.3rem);
    min-height: clamp(5rem, 12vw, 16.3rem);
    padding: 1rem;
    position: relative;
    z-index: 2;
    text-align: center;
}

@media (max-width: 360px) {
    .countdown_design_2 .timer-block {
        padding: 1.5rem 0;
    }
}

.countdown_design_2 .timer-block::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--bn-text-color);
    opacity: 0.1;
}

.countdown_design_2 .timer-block:not(:last-child) {
    border-right: 1px solid #dedede;
}

.countdown_design_2 .timer-block__num {
    line-height: normal;
    vertical-align: middle;
}

.bls__banner-text--grid .countdown_design_2 .timer-banner {
    border: none;
    gap: 5px;

}

.bls__banner-text--grid .countdown_design_2 .timer-block {
    border: 1px solid #dedede;
    border-radius: 5px;
}

.countdown_design_3 .timer-block {
    display: flex;
    flex-direction: column;
}

.countdown_design_3 .timer-block:not(:last-child) {
    margin-right: 7rem;
}

.countdown_design_3 .timer-banner .timer-block__num {
    font-weight: 400;
}

@media (max-width: 475px) {
    .countdown_design_3 .timer-block:not(:last-child) {
        margin-right: 2.5rem;
    }
}

@media (min-width: 1200px) and (max-width: 1400px) {
    .countdown_design_3 .timer-block:not(:last-child) {
        margin-right: 3.5rem;
    }
}

.bls__banner-with-text.has-bg .row>div {
    margin-bottom: 0;
}

.bls__banner-with-text.has-bg .bls__banner-text--media {
    align-self: stretch;
}

.bls__banner-with-text.has-bg .bls__banner-text--media .hover-effect,
.bls__banner-with-text.has-bg .bls__banner-text--media .hover-effect>div,
.bls__banner-with-text.has-bg .bls__banner-text--media .hover-effect .bls__responsive-image {
    height: 100%;
}

.bls__banner-with-text .bls__banner-text--button+.bls__banner-text--button {
    margin-left: 10px;
}

.bls__banner-with-text .bls__banner-text--content.text-center .bls__banner-text--button {
    margin-left: 5px;
    margin-right: 5px;
}

@media (min-width: 768px) {
    .bls__banner-text--media.col-md-60 {
        flex: 0 0 auto;
        width: 60%;
    }
}

@media (max-width: 1023px) {
    .bls__banner-text--heading {
        font-size: clamp(3rem, 3.5vw, var(--text-heading-font-size));
    }
}

@media (max-width: 767px) {

    .banner-with-text-overplay.text-bellow-mobile .bls__banner-text--content,
    .banner-with-text-overplay.text-bellow-mobile .bls__banner-text--media {
        position: relative;

    }
}

@media (min-width: 1200px) {

    .bls__banner-text--media .video-banner.custom-height.height-full,
    .bls__banner-text--media.custom-height.height-full .bls__responsive-image {
        height: 100vh;
    }

    .bls__banner-text--media .video-banner.custom-height,
    .bls__banner-text--media.custom-height .bls__responsive-image {
        height: var(--desktop-height);
    }
}

@media (min-width: 768px) and (max-width: 1199px) {

    .bls__banner-text--media .video-banner.custom-height,
    .bls__banner-text--media.custom-height .bls__responsive-image {
        height: var(--tablet-height);
    }
}

@media (max-width: 767px) {

    .bls__banner-text--media .video-banner.custom-height,
    .bls__banner-text--media.custom-height .bls__responsive-image {
        height: var(--mobile-height);
    }

    .bls__banner-with-text .bls__banner-text--grid .bls__banner-text--content-inner:not(.content-bg) {
        padding-right: calc(var(--bs-gutter-x) * .5);
        padding-left: calc(var(--bs-gutter-x) * .5);
    }
}

@media (max-width: 375px) {
    .content-horizontal-position-center .bls__banner-text--content-inner {
        margin: initial;
    }
}
{% endstyle %}

{%- liquid
  assign st = section.settings
  assign container = st.container
  assign bn_design = st.bn_design
  assign text_bellow_mobile = st.text_bellow_mobile
  assign text_position = st.text_position
  assign text_horizontal_position = st.text_horizontal_position
  assign color_scheme = st.color_scheme
  assign column_gap = st.column_gap
  assign hover_effect = st.hover_effect
  assign img_position = st.img_position
  assign banner_width = st.banner_width
  assign content_width = st.content_width
  assign content_bg_color = st.content_bg_color
  assign background_gradient = st.background_gradient
  assign banner_height = st.banner_height
  assign height_dk = st.height_dk
  assign height_tb = st.height_tb
  assign height_mb = st.height_mb
  assign height_full = st.height_full
  assign bg_opacity = st.bg_opacity
  assign image_mobile = st.image_mobile
  assign banner_type = st.banner_type
  assign link = st.link
  assign video_local = st.video_local
  assign column_gap_tablet = ''
  if column_gap > 30
    assign column_gap_tablet = ' gap-tablet'
  endif
  assign column_gap_mobile = ''
  if column_gap > 15
    assign column_gap_mobile = ' gap-mobile'
  endif

  assign spt_tablet = ''
  if st.padding_top > 50
    assign spt_tablet = ' spt-tablet'
  endif
  assign spt_mobile = ''
  if st.padding_top > 30
    assign spt_mobile = ' spt-mobile'
  endif
  assign spb_tablet = ''
  if st.padding_bottom > 50
    assign spb_tablet = ' spb-tablet'
  endif
  assign spb_mobile = ''
  if st.padding_bottom > 30
    assign spb_mobile = ' spb-mobile'
  endif

  assign reset_spacing = ''
  if st.reset_spacing
    assign reset_spacing = ' remove_spacing'
  endif

  assign has_bg = ''
  if background_color != blank
    assign has_bg = ' has-bg'
  endif

  assign img_position = ''
  if st.img_position == 'left'
    assign img_position = ''
  elsif st.img_position == 'right'
    assign img_position = 'flex-md-row-reverse'
  endif
  assign content_position = ''
  if bn_design == 'text_overlay'
    assign content_position = 'py-15'
  endif

  assign video_url = st.video_url

  assign video_id = ''
  if video_url.type == 'youtube'
    assign video_id = video_url | replace: 'https://www.youtube.com/watch?v=', ''
  elsif video_url.type == 'vimeo'
    assign video_id = video_url | replace: 'https://vimeo.com/', ''
  endif
  assign content_box = st.content_box
  assign container-box = ''
  if content_box == 'content_in_container'
    assign container-box = 'container'
  elsif content_box == 'content_in_container_fluid'
    assign container-box = 'container-fluid'
  else
    assign container-box = 'full-width-content'
  endif
  assign enabled_animations = settings.animations_enabled
-%}
{%- capture style -%}
  {%- if bn_design == 'text_column' -%}
    --bls-gutter-x: {{ column_gap }}px;
  {%- endif -%}
  --section-padding-top: {{ st.padding_top }}px; --section-padding-bottom: {{ st.padding_bottom }}px;
{%- endcapture -%}
<section
  class="color-{{ color_scheme }} gradient bls__section{{ has_bg }}{{ spt_tablet }}{{ spb_tablet }}{{ spt_mobile }}{{ spb_mobile }} bls__banner-with-text {{ reset_spacing }} {% if bn_design == 'text_overlay' %}bls__banner-with-text-overlay  {% if settings.image_style != blank and section.settings.column_gap != 0 and section.settings.container != "full-width" %} bls__banner-with-text-overlay-radius {% endif %}{% endif %}"
  style="{{ style | strip | strip_newlines }}"
>
  <div class="{{ container }} section-full ">
    <div
      style="--bs-gutter-x: {{ column_gap }}px;"
      class="
        {% if text_bellow_mobile != blank %}text-bellow-mobile{% endif %}
        {{ column_gap_tablet }}{{ column_gap_mobile }}
        {%- if bn_design == 'text_column' -%}
          bls__banner-text--grid row row-cols-md-2 align-items-center {{ img_position }}
        {%- else -%}
          banner-with-text-overplay banner-position overflow-hidden relative
        {%- endif -%}
      "
    >
      <div
        class="{% if height_full %}height-full{% endif %} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %} {% if banner_type == 'video' %} type-video {% endif %} {% if banner_type == 'image' %} type-banner {% endif %} bls__banner-text--media {{ banner_width }} {{ banner_height }} {% if bn_design == 'text_overlay' %} {% if banner_height == 'depend-image' %}h-full absolute static-xl inset-0{% else %}static{% endif %} overflow-hidden{% endif %}  {% if bn_design == 'text_column' %} align-self-start {% endif %} "
        {% if height_full == blank %}
          style="--desktop-height:{{ height_dk }}px;--tablet-height:{{ height_tb }}px;--mobile-height:{{ height_mb }}px;"
        {% endif %}
      >
        {%- case banner_type -%}
          {%- when 'video' -%}
            {%- if video_local == blank -%}
              <div class="video-container video-banner {{ banner_height }}  {% if settings.image_style != blank and section.settings.column_gap != 0 and section.settings.container != "full-width" %} column-radius {% endif %}">
                <div class="video-foreground">
                  {%- if video_url.type == 'youtube' -%}
                    <video-youtube data-id="{{ block.id }}">
                      <iframe
                        src="https://www.youtube.com/embed/{{ video_id }}?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist={{ video_id }}"
                        title="video youtube"
                      ></iframe>
                    </video-youtube>
                  {%- elsif video_url.type == 'vimeo' -%}
                    <iframe
                      src="https://player.vimeo.com/video/{{ video_id }}?controls=0background=1&autoplay=1&muted=1&loop=1"
                      frameborder="0"
                      allowfullscreen
                      title="video vimeo"
                    ></iframe>
                  {%- endif -%}
                </div>
              </div>
            {%- else -%}
              <div class="{% if banner_height == 'custom-height' %}local-video{% endif %} video-banner {{ banner_height }}  {% if settings.image_style != blank and section.settings.column_gap != 0 and section.settings.container != "full-width" %} column-radius {% endif %}">
                {{ video_local | video_tag: autoplay: true, loop: true, muted: true, controls: false, playsinline: true }}
              </div>
            {%- endif -%}
          {%- when 'image' -%}
            <a
              class="{% if st.image_behavior == 'fixed' %} animate-fixed-parent{% endif %} hover-effect hover-{{ hover_effect }} {% if settings.image_style != blank and section.settings.column_gap != 0 and section.settings.container != "full-width" %} radius {% endif %} {% if settings.image_style != blank and bn_design == 'text_overlay' and section.settings.container != "full-width" %} radius {% endif %}"
              {% if link == blank %}
                role="link"
                aria-disabled="true"
              {% else %}
                href="{{ link }}"
                aria-label="{{ link }}"
              {% endif %}
              {%- if st.open_link == '_blank' -%}
                target="_blank"
              {%- else -%}
                target="_self"
              {%- endif -%}
            >
              {%- if st.image != blank -%}
                <div class="desktop {% if st.image_behavior != 'none' %} animate--{{ st.image_behavior }}{% endif %} {% if image_mobile != blank %}medium-hide{% endif %}">
                  {% render 'responsive-image', image: st.image | width: "100vw" | image_behavior: st.image_behavior %}
                </div>
              {%- else -%}
                <div class="desktop {% if st.image_behavior != 'none' %} animate--{{ st.image_behavior }}{% endif %} {% if image_mobile != blank %}medium-hide{% endif %}">
                  {%- render 'responsive-image' | image_behavior: st.image_behavior -%}
                </div>
              {%- endif -%}
              {%- if image_mobile != blank -%}
                <div class="mobile {% if st.image_behavior != 'none' %} animate--{{ st.image_behavior }}{% endif %} d-block d-md-none">
                  {% render 'responsive-image', image: st.image_mobile | width: "100vw" | image_behavior: st.image_behavior %}
                </div>
              {%- endif -%}
            </a>
        {%- endcase -%}
      </div>
      {%- if bn_design == 'text_column' -%}<div class="d-flex flex-direction align-self-stretch flex-1">{%- endif -%}
      <div
        class="{% if bn_design == 'text_column' %} {% if settings.image_style != blank and section.settings.column_gap != 0 and section.settings.container != "full-width" %} column-radius {% endif %} bg-text-column{% endif %}{% if bn_design == 'text_overlay' %}{{ container-box }} {{ banner_height }} {% if banner_height == 'depend-image' %}static absolute-xl inset-0{% else %}absolute inset-0{% endif %} {%- if content_bg_color != blank or background_gradient != empty -%} has-bg{% endif %}{% endif %} bls__banner-text--content {{ content_position }} {{ st.text_align }} content-position-{{ text_position }} content-horizontal-position-{{ text_horizontal_position }}"
        {% if bn_design == 'text_column' %}
          style="{%- if content_bg_color != blank or background_gradient != empty -%}{%- if background_gradient != empty -%} --content-bg: {{ background_gradient }}; {% else %} --content-bg: {{ content_bg_color }};{%- endif -%} {%- endif -%}"
        {% endif %}
      >
        <div
          class="bls__banner-text--content-inner {% if bn_design == 'text_overlay' %}bg-overlay--content-inner{% endif %} {% if content_width > 99 %}content-full-with{% endif %} {%- if content_bg_color != blank -%}content-bg{%- endif -%}"
          style="--content-width:{{ content_width }}%;{%- if content_bg_color != blank or background_gradient != empty -%}{%- if background_gradient != empty -%} --content-bg: {{ background_gradient }}; {% else %} --content-bg: {{ content_bg_color }};{%- endif -%}{%- endif -%}--content-opacity:{{ bg_opacity }}%; --bs-gutter-x: {{ column_gap }}px;"
        >
          {%- for block in section.blocks -%}
            {%- liquid
              assign bs = block.settings
              assign heading_fs = bs.heading_fs
              assign heading_color = bs.heading_color
              assign heading_fw = bs.heading_fw
              assign heading_tf = bs.heading_tf
              assign heading_mt = bs.heading_mt
              assign heading_mb = bs.heading_mb
              assign subheading_fs = bs.subheading_fs
              assign subheading_color = bs.subheading_color
              assign subheading_fw = bs.subheading_fw
              assign subheading_tf = bs.subheading_tf
              assign subheading_mt = bs.subheading_mt
              assign subheading_mb = bs.subheading_mb
              assign txt_color = bs.txt_color
              assign txt_fs = bs.txt_fs
              assign txt_fw = bs.txt_fw
              assign txt_tf = bs.txt_tf
              assign txt_mt = bs.txt_mt
              assign txt_mb = bs.txt_mb
              assign img_mt = bs.text_img_mt
              assign img_mb = bs.text_img_mb
              assign button_type = bs.button_type
              assign b_mt = bs.b_mt
              assign b_mb = bs.b_mb

              assign faq_fs = bs.faq_fs
              assign faq_fw = bs.faq_fw
              assign faq_tf = bs.faq_tf
              assign faq_desc_fs = bs.faq_desc_fs
              assign faq_desc_fw = bs.faq_desc_fw
              assign faq_desc_tf = bs.faq_desc_tf
              assign faq_mt = bs.faq_mt
              assign faq_mb = bs.faq_mb
              assign html_mt = bs.html_mt
              assign html_mb = bs.html_mb

              assign countdown_design = bs.countdown_design
              assign bn_end_time = bs.bn_end_time
              assign bn_txt_color = bs.bn_txt_color
              assign bn_txt_fs = bs.bn_txt_fs
              assign number_txt_fs = bs.number_txt_fs
              assign bn_txt_fw = bs.bn_txt_fw
              assign bn_txt_tf = bs.bn_txt_tf
              assign bn_txt_mt = bs.bn_txt_mt
              assign bn_txt_mb = bs.bn_txt_mb
            -%}
            {% case block.type %}
              {%- when 'image_picker' -%}
                <div
                  {{ block.shopify_attributes }}
                  class="bls__banner-text--img {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  style="width: {{ block.settings.icon_width_block }}px; --img-max-width: {{ block.settings.icon_max_width_block }}%; --img-mt: {{ img_mt }}px; --img-mb: {{ img_mb }}px;"
                >
                  {%- if block.settings.image_block != blank -%}
                    {%- render 'responsive-image', image: block.settings.image_block -%}
                  {%- else -%}
                    {%- render 'responsive-image' -%}
                  {%- endif -%}
                </div>
              {%- when 'subheading' -%}
                <div
                  {{ block.shopify_attributes }}
                  class="h4 bls__banner-text--subheading color-{{ block.settings.color_scheme_subheading }} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  style="--text-subheading-font-size: {{ subheading_fs }}px; {% if subheading_fw != 'default' %}--text-subheading-font-weight: {{ subheading_fw }};{% endif %} --text-subheading-color: {{ subheading_color }}; --text-subheading-transform: {{ subheading_tf }}; --text-subheading-mt: {{ subheading_mt }}px; --text-subheading-mb: {{ subheading_mb }}px;"
                >
                  {{ block.settings.sub_title }}
                </div>
              {%- when 'heading' -%}
                <h2
                  {{ block.shopify_attributes }}
                  class="bls__banner-text--heading color-{{ block.settings.color_scheme_heading }} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  style="--text-heading-font-size: {{ heading_fs }}px; {% if heading_fw != 'default' %}--text-heading-font-weight: {{ heading_fw }};{% endif %} --text-heading-color: {{ heading_color }}; --text-heading-transform: {{ heading_tf }}; --text-heading-mt: {{ heading_mt }}px; --text-heading-mb: {{ heading_mb }}px;"
                >
                  {{ block.settings.title }}
                </h2>
              {%- when 'text' -%}
                <div
                  {{ block.shopify_attributes }}
                  class="bls__banner-text--des color-{{ block.settings.color_scheme_txt }} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  style="--text-font-size: {{ txt_fs }}px;{%- if txt_color != blank -%} --text-color: {{ txt_color }};{%- endif -%} {% if txt_fw != 'default' %}--text-font-weight: {{ txt_fw }};{% endif %} --text-transform: {{ txt_tf }}; --text-mt: {{ txt_mt }}px; --text-mb: {{ txt_mb }}px;"
                >
                  {{ block.settings.txt_content }}
                </div>
              {%- when 'buttons' -%}
                {%- if block.settings.btn_content != blank -%}
                  <a
                    {{ block.shopify_attributes }}
                    {% if block.settings.button_link == blank %}
                      role="link"
                      aria-disabled="true"
                      href="{{ link }}"
                    {% else %}
                      href="{{ block.settings.button_link }}"
                    {% endif %}
                    {% if block.settings.button_target == true %}
                      target="_blank"
                    {% else %}
                      target="_self"
                    {% endif %}
                    class="{% if enabled_animations %}scroll-trigger animate--slide-in{% endif %} bls__banner-text--button whitespace-nowrap btn-{{ button_type }} inline-block"
                    style=" --b-mt: {{ b_mt }}px; --b-mb: {{ b_mb }}px;"
                  >
                    {{ block.settings.btn_content | escape }}
                  </a>
                {%- endif -%}
              {%- when 'html' -%}
                {% if block.settings.content_html != blank %}
                  <div
                    {{ block.shopify_attributes }}
                    class="bls__banner-text--html color-{{ block.settings.color_scheme_txt }} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                    style="--html-mt: {{ html_mt }}px; --html-mb: {{ html_mb }}px;"
                  >
                    {{ block.settings.content_html }}
                  </div>
                {% endif %}
              {%- when 'countdown_bn' -%}
                {% if bn_end_time != blank %}
                  <div
                    {{ block.shopify_attributes }}
                    class="{{ countdown_design }} {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %} bls__timer"
                    data-timer="{{ bn_end_time }}"
                  >
                    <div class="d-inline-flex">
                      <div
                        class="timer-display timer-banner flex color-{{ block.settings.color_scheme_bn_txt }}"
                        style="--bn-number-font-size: {{ number_txt_fs }}px;--bn-text-font-size: {{ bn_txt_fs }}px;{%- if bn_txt_color != blank -%} --bn-text-color: {{ bn_txt_color }};{%- endif -%} --bn-text-font-weight: {{ bn_txt_fw }}; --bn-text-transform: {{ bn_txt_tf }}; --bn-text-mt: {{ bn_txt_mt }}px; --bn-text-mb: {{ bn_txt_mb }}px;"
                      >
                        <div class="timer-block">
                          <span class="timer-block__num js-timer-days">00</span>
                          <span class="timer-block__text">{{ 'sections.times_bn.days' | t }}</span>
                        </div>
                        <div class="timer-block">
                          <span class="timer-block__num js-timer-hours">00</span>
                          <span class="timer-block__text">{{ 'sections.times_bn.hour' | t }}</span>
                        </div>
                        <div class="timer-block">
                          <span class="timer-block__num js-timer-minutes">00</span>
                          <span class="timer-block__text">{{ 'sections.times_bn.mins' | t }}</span>
                        </div>
                        <div class="timer-block">
                          <span class="timer-block__num js-timer-seconds">00</span>
                          <span class="timer-block__text">{{ 'sections.times_bn.secs' | t }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                {% endif %}
              {%- when 'faq' -%}
                <div
                  class="faq-content"
                  style="--title-faq-font-size: {{ faq_fs }}px; {% if faq_fw != 'default' %}--title-faq-font-weight: {{ faq_fw }};{% endif %}; --title-faq-transform: {{ faq_tf }};--text-faq-font-size: {{ faq_desc_fs }}px; {% if faq_desc_fw != 'default' %}--text-faq-font-weight: {{ faq_desc_fw }};{% endif %} --text-faq-transform: {{ faq_desc_tf }};--faq-mt: {{ faq_mt }}px; --faq-mb: {{ faq_mb }}px;"
                >
                  <div
                    {{ block.shopify_attributes }}
                    class="bls__page-faq-items bls-toggle relative {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  >
                    {%- if block.settings.faq_title_1 != blank -%}
                      <h4 class="bls__page-faq-title border-bottom py-20 mb-0 relative">
                        {{ block.settings.faq_title_1 }}
                        <span class="open-children-toggle d-block-important"></span>
                      </h4>
                    {%- endif -%}
                    {%- if block.settings.faq_content_1 != blank -%}
                      <div class="bls__page-faq-content overflow-hidden py-20" style="display: none">
                        {{ block.settings.faq_content_1 }}
                      </div>
                    {%- endif -%}
                  </div>
                  <div
                    {{ block.shopify_attributes }}
                    class="bls__page-faq-items bls-toggle relative {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  >
                    {%- if block.settings.faq_title_2 != blank -%}
                      <h4 class="bls__page-faq-title border-bottom py-20 mb-0 relative">
                        {{ block.settings.faq_title_2 }}
                        <span class="open-children-toggle d-block-important"></span>
                      </h4>
                    {%- endif -%}
                    {%- if block.settings.faq_content_2 != blank -%}
                      <div class="bls__page-faq-content overflow-hidden py-20" style="display: none">
                        {{ block.settings.faq_content_2 }}
                      </div>
                    {%- endif -%}
                  </div>

                  <div
                    {{ block.shopify_attributes }}
                    class="bls__page-faq-items bls-toggle relative {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  >
                    {%- if block.settings.faq_title_3 != blank -%}
                      <h4 class="bls__page-faq-title border-bottom py-20 mb-0 relative">
                        {{ block.settings.faq_title_3 }}
                        <span class="open-children-toggle d-block-important"></span>
                      </h4>
                    {%- endif -%}
                    {%- if block.settings.faq_content_3 != blank -%}
                      <div class="bls__page-faq-content overflow-hidden py-20" style="display: none">
                        {{ block.settings.faq_content_3 }}
                      </div>
                    {%- endif -%}
                  </div>

                  <div
                    {{ block.shopify_attributes }}
                    class="bls__page-faq-items bls-toggle relative {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  >
                    {%- if block.settings.faq_title_4 != blank -%}
                      <h4 class="bls__page-faq-title border-bottom py-20 mb-0 relative">
                        {{ block.settings.faq_title_4 }}
                        <span class="open-children-toggle d-block-important"></span>
                      </h4>
                    {%- endif -%}
                    {%- if block.settings.faq_content_4 != blank -%}
                      <div class="bls__page-faq-content overflow-hidden py-20" style="display: none">
                        {{ block.settings.faq_content_4 }}
                      </div>
                    {%- endif -%}
                  </div>

                  <div
                    {{ block.shopify_attributes }}
                    class="bls__page-faq-items bls-toggle relative {% if enabled_animations %}scroll-trigger animate--slide-in{% endif %}"
                  >
                    {%- if block.settings.faq_title_5 != blank -%}
                      <h4 class="bls__page-faq-title border-bottom py-20 mb-0 relative">
                        {{ block.settings.faq_title_5 }}
                        <span class="open-children-toggle d-block-important"></span>
                      </h4>
                    {%- endif -%}
                    {%- if block.settings.faq_content_5 != blank -%}
                      <div class="bls__page-faq-content overflow-hidden py-20" style="display: none">
                        {{ block.settings.faq_content_5 }}
                      </div>
                    {%- endif -%}
                  </div>
                </div>
            {%- endcase -%}
          {%- endfor -%}
        </div>
      </div>
      {%- if bn_design == 'text_column' -%}</div>{%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "t:sections.banner-with-text.name",
  "disabled_on": {
    "groups": ["header", "footer", "custom.overlay"]
  },
  "settings": [
    {
      "type": "header",
      "content": "t:sections.all.header.general"
    },
    {
      "type": "select",
      "id": "container",
      "label": "t:sections.all.layout.label",
      "default": "container",
      "options": [
        {
          "value": "container",
          "label": "t:sections.all.layout.options__1.label"
        },
        {
          "value": "container-fluid",
          "label": "t:sections.all.layout.options__2.label"
        },

        {
          "value": "strecth-width",
          "label": "t:sections.all.layout.options__3.label"
        },
        {
          "value": "full-width",
          "label": "t:sections.all.layout.options__4.label"
        }
      ]
    },
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "t:sections.all.colors.label"
    },
    {
      "type": "header",
      "content": "t:sections.all.header.animation_title"
    },
    {
      "type": "select",
      "id": "image_behavior",
      "options": [
        {
          "value": "none",
          "label": "t:sections.all.image_behavior.options__1.label"
        },
        {
          "value": "ambient",
          "label": "t:sections.all.image_behavior.options__2.label"
        },
        {
          "value": "fixed",
          "label": "t:sections.all.image_behavior.options__4.label"
        },
        {
          "value": "zoom-in",
          "label": "t:sections.all.image_behavior.options__3.label"
        }
      ],
      "default": "none",
      "label": "t:sections.all.image_behavior.label"
    },
    {
      "type": "select",
      "id": "banner_type",
      "label": "t:sections.all.type_banner.label",
      "default": "image",
      "options": [
        {
          "value": "image",
          "label": "t:sections.all.type_banner.type_image"
        },
        {
          "value": "video",
          "label": "t:sections.all.type_banner.type_video"
        }
      ]
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "t:sections.all.upload_image.image_dk",
      "info": "t:sections.banner-with-text.settings.image_dk.info"
    },
    {
      "type": "image_picker",
      "id": "image_mobile",
      "label": "t:sections.all.upload_image.image_mobile",
      "info": "t:sections.banner-with-text.settings.image_mobile.info"
    },
    {
      "id": "video_url",
      "type": "video_url",
      "label": "t:sections.all.video.url_video",
      "accept": ["youtube", "vimeo"],
      "default": "https://www.youtube.com/watch?v=_9VUPq3SxOc"
    },
    {
      "id": "video_local",
      "type": "video",
      "label": "t:sections.all.video.video_local",
      "info": "t:sections.all.video.local_text"
    },
    {
      "type": "url",
      "id": "link",
      "label": "t:sections.all.content_text.banner_link"
    },
    {
      "type": "select",
      "id": "open_link",
      "options": [
        {
          "value": "_self",
          "label": "t:sections.all.content_text.open_link.self.label"
        },
        {
          "value": "_blank",
          "label": "t:sections.all.content_text.open_link.blank.label"
        }
      ],
      "label": "t:sections.all.content_text.open_link.label",
      "default": "_blank"
    },

    {
      "type": "header",
      "content": "t:sections.all.header.content_setting"
    },
    {
      "type": "select",
      "id": "bn_design",
      "label": "t:sections.all.design_image.label",
      "default": "text_column",
      "options": [
        {
          "value": "text_column",
          "label": "t:sections.all.design_image.options__3.label"
        },
        {
          "value": "text_overlay",
          "label": "t:sections.all.design_image.options__1.label"
        }
      ]
    },
    {
      "type": "select",
      "id": "text_align",
      "label": "t:sections.all.horizontal_alignment.text_alignment",
      "default": "text-center",
      "options": [
        {
          "value": "text-left",
          "label": "t:sections.all.horizontal_alignment.options__1.label"
        },
        {
          "value": "text-center",
          "label": "t:sections.all.horizontal_alignment.options__2.label"
        },
        {
          "value": "text-right",
          "label": "t:sections.all.horizontal_alignment.options__3.label"
        }
      ]
    },
    {
      "type": "select",
      "id": "text_horizontal_position",
      "label": "t:sections.all.horizontal_alignment.horizontal_position",
      "default": "left",
      "options": [
        {
          "value": "left",
          "label": "t:sections.all.horizontal_alignment.options__1.label"
        },
        {
          "value": "center",
          "label": "t:sections.all.horizontal_alignment.options__2.label"
        },
        {
          "value": "right",
          "label": "t:sections.all.horizontal_alignment.options__3.label"
        }
      ]
    },
    {
      "type": "select",
      "id": "text_position",
      "label": "t:sections.all.vertical_alignment.vertical_position",
      "default": "center",
      "options": [
        {
          "value": "top",
          "label": "t:sections.all.vertical_alignment.options__1.label"
        },
        {
          "value": "center",
          "label": "t:sections.all.vertical_alignment.options__2.label"
        },
        {
          "value": "bottom",
          "label": "t:sections.all.vertical_alignment.options__3.label"
        }
      ]
    },
    {
      "type": "color",
      "id": "content_bg_color",
      "label": "t:sections.banner-with-text.settings.content_bg_color.label"
    },
    {
      "type": "color_background",
      "id": "background_gradient",
      "label": "t:sections.banner-with-text.settings.background_gradient.label",
      "info": "t:sections.banner-with-text.settings.background_gradient.info"
    },
    {
      "type": "range",
      "id": "content_width",
      "label": "t:sections.all.content_custom_width.content_max_width",
      "min": 30,
      "max": 100,
      "step": 1,
      "unit": "%",
      "default": 100
    },
    {
      "type": "header",
      "content": "t:sections.banner-with-text.settings.header.text_overlay_setting"
    },
    {
      "type": "select",
      "id": "banner_height",
      "label": "t:sections.all.custom_type.title_height",
      "default": "depend-image",
      "options": [
        {
          "value": "depend-image",
          "label": "t:sections.all.custom_type.original.label"
        },
        {
          "value": "custom-height",
          "label": "t:sections.all.custom_type.custom.label"
        }
      ]
    },
    {
      "type": "number",
      "id": "height_dk",
      "label": "t:sections.all.custom_height.height_dk",
      "info": "t:sections.all.custom_height.height_info",
      "default": 800
    },
    {
      "type": "number",
      "id": "height_tb",
      "label": "t:sections.all.custom_height.height_tb",
      "info": "t:sections.all.custom_height.height_info",
      "default": 600
    },
    {
      "type": "number",
      "id": "height_mb",
      "label": "t:sections.all.custom_height.height_mb",
      "info": "t:sections.all.custom_height.height_info",
      "default": 360
    },
    {
      "type": "checkbox",
      "id": "height_full",
      "label": "t:sections.all.custom_height.height_full",
      "default": false,
      "info": "t:sections.all.custom_height.height_info"
    },
    {
      "type": "select",
      "id": "content_box",
      "label": "t:sections.all.content_box.label",
      "default": "content_in_container",
      "options": [
        {
          "label": "t:sections.all.content_box.options__1.label",
          "value": "content_in_container"
        },
        {
          "label": "t:sections.all.content_box.options__2.label",
          "value": "content_in_container_fluid"
        },
        {
          "label": "t:sections.all.content_box.options__3.label",
          "value": "content_in_container_fullwidth"
        }
      ]
    },
    {
      "type": "range",
      "id": "bg_opacity",
      "label": "t:sections.banner-with-text.settings.bg_opacity.label",
      "min": 0,
      "max": 100,
      "step": 1,
      "unit": "%",
      "default": 100
    },
    {
      "type": "checkbox",
      "id": "text_bellow_mobile",
      "label": "t:sections.banner-with-text.settings.text_bellow_mobile.label",
      "default": false
    },
    {
      "type": "header",
      "content": "t:sections.banner-with-text.settings.header.text_beside_setting"
    },
    {
      "type": "select",
      "id": "img_position",
      "label": "t:sections.banner-with-text.settings.img_position.label",
      "info": "t:sections.banner-with-text.settings.img_position.info",
      "options": [
        {
          "value": "left",
          "label": "t:sections.all.horizontal_alignment.options__1.label"
        },
        {
          "value": "right",
          "label": "t:sections.all.horizontal_alignment.options__3.label"
        }
      ]
    },
    {
      "type": "select",
      "id": "banner_width",
      "label": "t:sections.all.width_column.label",
      "default": "col-md-6",
      "options": [
        {
          "value": "col-md-3",
          "label": "25%"
        },
        {
          "value": "col-md-4",
          "label": "33%"
        },
        {
          "value": "col-md-6",
          "label": "50%"
        },
        {
          "value": "col-md-60",
          "label": "60%"
        },
        {
          "value": "col-md-9",
          "label": "75%"
        }
      ]
    },
    {
      "type": "range",
      "min": 0,
      "max": 50,
      "unit": "px",
      "step": 5,
      "default": 30,
      "label": "t:sections.all.padding.column_gap",
      "id": "column_gap"
    },
    {
      "type": "select",
      "id": "hover_effect",
      "label": "t:sections.all.hover_effect.label",
      "default": "zoom",
      "options": [
        {
          "value": "zoom",
          "label": "t:sections.all.hover_effect.options__1.label"
        },
        {
          "value": "fade-in",
          "label": "t:sections.all.hover_effect.options__5.label"
        },
        {
          "value": "none",
          "label": "t:sections.all.hover_effect.options__4.label"
        }
      ]
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "t:sections.all.padding.padding_top",
      "default": 0,
      "min": 0,
      "max": 100,
      "step": 1,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 0,
      "min": 0,
      "max": 100,
      "step": 1,
      "unit": "px"
    },
    {
      "type": "checkbox",
      "id": "reset_spacing",
      "label": "t:sections.all.reset_spacing.label",
      "default": false
    }
  ],
  "blocks": [
    {
      "type": "image_picker",
      "name": "t:sections.banner-with-text.blocks.image_picker.name",
      "settings": [
        {
          "type": "image_picker",
          "id": "image_block",
          "label": "t:sections.all.upload_image.image_dk",
          "info": "t:sections.banner-with-text.blocks.image_picker.settings.image_dk.info"
        },
        {
          "type": "range",
          "id": "icon_width_block",
          "label": "t:sections.all.image_width_px.label",
          "min": 20,
          "max": 500,
          "step": 5,
          "unit": "px",
          "default": 160
        },
        {
          "type": "range",
          "id": "icon_max_width_block",
          "label": "t:sections.banner-with-text.blocks.image_picker.settings.icon_max_width_block.label",
          "min": 10,
          "max": 100,
          "step": 5,
          "unit": "%",
          "default": 25
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "text_img_mt",
          "min": 1,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 1,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "text_img_mb",
          "min": 1,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 25,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "heading",
      "name": "t:sections.all.content_text.heading",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "t:sections.all.content_text.heading",
          "default": "Heading"
        },
        {
          "type": "range",
          "id": "heading_fs",
          "label": "t:sections.all.typography.default_size",
          "min": 20,
          "max": 120,
          "step": 1,
          "unit": "px",
          "default": 40
        },
        {
          "type": "select",
          "id": "heading_fw",
          "label": "t:sections.all.typography.default_weight",
          "default": "default",
          "options": [
            {
              "label": "t:sections.all.default_text.label",
              "value": "default"
            },
            {
              "label": "300",
              "value": "300"
            },
            {
              "label": "400",
              "value": "400"
            },
            {
              "label": "500",
              "value": "500"
            },
            {
              "label": "600",
              "value": "600"
            },
            {
              "label": "700",
              "value": "700"
            },
            {
              "label": "800",
              "value": "800"
            },
            {
              "label": "900",
              "value": "900"
            }
          ]
        },
        {
          "type": "select",
          "id": "heading_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            }
          ]
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "heading_mt",
          "min": 0,
          "max": 40,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "heading_mb",
          "min": 0,
          "max": 40,
          "step": 1,
          "unit": "px",
          "default": 10,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "subheading",
      "name": "t:sections.all.content_text.subheading",
      "settings": [
        {
          "type": "text",
          "id": "sub_title",
          "label": "t:sections.all.content_text.subheading",
          "default": "Subheading"
        },
        {
          "type": "range",
          "id": "subheading_fs",
          "label": "t:sections.all.typography.default_size",
          "min": 10,
          "max": 20,
          "step": 1,
          "unit": "px",
          "default": 14
        },
        {
          "type": "select",
          "id": "subheading_fw",
          "label": "t:sections.all.typography.default_weight",
          "default": "default",
          "options": [
            {
              "label": "t:sections.all.default_text.label",
              "value": "default"
            },
            {
              "label": "300",
              "value": "300"
            },
            {
              "label": "400",
              "value": "400"
            },
            {
              "label": "500",
              "value": "500"
            },
            {
              "label": "600",
              "value": "600"
            },
            {
              "label": "700",
              "value": "700"
            },
            {
              "label": "800",
              "value": "800"
            },
            {
              "label": "900",
              "value": "900"
            }
          ]
        },
        {
          "type": "select",
          "id": "subheading_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            }
          ]
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "subheading_mt",
          "min": 0,
          "max": 60,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "subheading_mb",
          "min": 0,
          "max": 40,
          "step": 1,
          "unit": "px",
          "default": 10,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "text",
      "name": "t:sections.all.content_text.text",
      "settings": [
        {
          "type": "richtext",
          "id": "txt_content",
          "label": "t:sections.all.content_text.text",
          "default": "<p>Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review</p>"
        },
        {
          "type": "range",
          "id": "txt_fs",
          "label": "t:sections.all.typography.default_size",
          "min": 8,
          "max": 30,
          "step": 1,
          "unit": "px",
          "default": 16
        },
        {
          "type": "select",
          "id": "txt_fw",
          "label": "t:sections.all.typography.default_weight",
          "default": "default",
          "options": [
            {
              "label": "t:sections.all.default_text.label",
              "value": "default"
            },
            {
              "label": "300",
              "value": "300"
            },
            {
              "label": "400",
              "value": "400"
            },
            {
              "label": "500",
              "value": "500"
            },
            {
              "label": "600",
              "value": "600"
            }
          ]
        },
        {
          "type": "select",
          "id": "txt_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            },
            {
              "value": "lowercase",
              "label": "t:sections.all.content_text.text_transform.lowercase.label"
            }
          ]
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "txt_mt",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "txt_mb",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 25,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "buttons",
      "name": "t:sections.banner-with-text.blocks.buttons.name",
      "settings": [
        {
          "type": "text",
          "id": "btn_content",
          "label": "t:sections.all.content_text.button_text",
          "default": "Button"
        },
        {
          "type": "select",
          "id": "button_type",
          "label": "t:sections.all.content_text.button_type.label",
          "default": "primary",
          "options": [
            {
              "value": "primary",
              "label": "t:sections.all.content_text.button_type.options__1.label"
            },
            {
              "value": "secondary",
              "label": "t:sections.all.content_text.button_type.options__2.label"
            },
            {
              "value": "link",
              "label": "t:sections.all.content_text.button_type.options__1.label"
            }
          ]
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "t:sections.all.content_text.button_link"
        },
        {
          "type": "checkbox",
          "id": "button_target",
          "label": "t:sections.all.content_text.button_target"
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "b_mt",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "b_mb",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 15,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "countdown_bn",
      "name": "t:sections.banner-with-text.blocks.countdown_bn.name",
      "settings": [
        {
          "type": "select",
          "id": "countdown_design",
          "default": "countdown_design_1",
          "label": "t:sections.all.design_collection.text_design",
          "options": [
            {
              "value": "countdown_design_1",
              "label": "t:sections.all.design_collection.design__1.label"
            },
            {
              "value": "countdown_design_2",
              "label": "t:sections.all.design_collection.design__2.label"
            }
          ]
        },
        {
          "type": "text",
          "id": "bn_end_time",
          "label": "t:sections.banner-with-text.blocks.countdown_bn.settings.bn_end_time.label",
          "default": "12-24-2025",
          "info": "t:sections.banner-with-text.blocks.countdown_bn.settings.bn_end_time.info"
        },
        {
          "type": "range",
          "id": "bn_txt_fs",
          "label": "t:sections.banner-with-text.blocks.countdown_bn.settings.bn_txt_fs.label",
          "min": 8,
          "max": 30,
          "step": 1,
          "unit": "px",
          "default": 18
        },
        {
          "type": "range",
          "id": "number_txt_fs",
          "label": "t:sections.banner-with-text.blocks.countdown_bn.settings.number_txt_fs.label",
          "min": 24,
          "max": 80,
          "step": 1,
          "unit": "px",
          "default": 36
        },
        {
          "type": "range",
          "id": "bn_txt_fw",
          "label": "t:sections.all.typography.default_weight",
          "min": 100,
          "max": 900,
          "step": 100,
          "default": 400
        },
        {
          "type": "select",
          "id": "bn_txt_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            },
            {
              "value": "lowercase",
              "label": "t:sections.all.content_text.text_transform.lowercase.label"
            }
          ]
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "bn_txt_mt",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "bn_txt_mb",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 25,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "html",
      "name": "t:sections.banner-with-text.blocks.html.name",
      "settings": [
        {
          "type": "html",
          "id": "content_html",
          "label": "t:sections.all.header.content",
          "default": "<div class=\"text-center py-10 px-15 border\" style=\"color: #111;\">This is Custom HTML section</div>"
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "html_mt",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "html_mb",
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "px",
          "default": 25,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    },
    {
      "type": "faq",
      "name": "t:sections.banner-with-text.blocks.faq.name",
      "settings": [
        {
          "type": "header",
          "content": "t:sections.banner-with-text.blocks.faq.settings.header.faq__1"
        },
        {
          "type": "text",
          "id": "faq_title_1",
          "label": "t:sections.all.header.title",
          "default": "Frequently Asked Questions?"
        },
        {
          "type": "richtext",
          "id": "faq_content_1",
          "label": "t:sections.all.header.content",
          "default": "<p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>"
        },
        {
          "type": "header",
          "content": "t:sections.banner-with-text.blocks.faq.settings.header.faq__2"
        },
        {
          "type": "text",
          "id": "faq_title_2",
          "label": "t:sections.all.header.title",
          "default": "Frequently Asked Questions?"
        },
        {
          "type": "richtext",
          "id": "faq_content_2",
          "label": "t:sections.all.header.content",
          "default": "<p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>"
        },
        {
          "type": "header",
          "content": "t:sections.banner-with-text.blocks.faq.settings.header.faq__3"
        },
        {
          "type": "text",
          "id": "faq_title_3",
          "label": "t:sections.all.header.title",
          "default": "Frequently Asked Questions?"
        },
        {
          "type": "richtext",
          "id": "faq_content_3",
          "label": "t:sections.all.header.content",
          "default": "<p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>"
        },
        {
          "type": "header",
          "content": "t:sections.banner-with-text.blocks.faq.settings.header.faq__4"
        },
        {
          "type": "text",
          "id": "faq_title_4",
          "label": "t:sections.all.header.title",
          "default": "Frequently Asked Questions?"
        },
        {
          "type": "richtext",
          "id": "faq_content_4",
          "label": "t:sections.all.header.content",
          "default": "<p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>"
        },
        {
          "type": "header",
          "content": "t:sections.banner-with-text.blocks.faq.settings.header.faq__5"
        },
        {
          "type": "text",
          "id": "faq_title_5",
          "label": "t:sections.all.header.title",
          "default": "Frequently Asked Questions?"
        },
        {
          "type": "richtext",
          "id": "faq_content_5",

          "label": "t:sections.all.header.content",
          "default": "<p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>"
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.title_typography"
        },
        {
          "type": "paragraph",
          "content": "t:sections.all.typography.paragraph_title"
        },
        {
          "type": "range",
          "id": "faq_fs",
          "label": "t:sections.all.typography.default_size",
          "min": 10,
          "max": 20,
          "step": 1,
          "unit": "px",
          "default": 14
        },
        {
          "type": "select",
          "id": "faq_fw",
          "label": "t:sections.all.typography.default_weight",
          "default": "default",
          "options": [
            {
              "label": "t:sections.all.default_text.label",
              "value": "default"
            },
            {
              "label": "300",
              "value": "300"
            },
            {
              "label": "400",
              "value": "400"
            },
            {
              "label": "500",
              "value": "500"
            },
            {
              "label": "600",
              "value": "600"
            },
            {
              "label": "700",
              "value": "700"
            },
            {
              "label": "800",
              "value": "800"
            },
            {
              "label": "900",
              "value": "900"
            }
          ]
        },
        {
          "type": "select",
          "id": "faq_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": "t:sections.all.typography.paragraph_content"
        },
        {
          "type": "range",
          "id": "faq_desc_fs",
          "label": "t:sections.all.typography.default_size",
          "min": 10,
          "max": 20,
          "step": 1,
          "unit": "px",
          "default": 14
        },
        {
          "type": "select",
          "id": "faq_desc_fw",
          "label": "t:sections.all.typography.default_weight",
          "default": "default",
          "options": [
            {
              "label": "t:sections.all.default_text.label",
              "value": "default"
            },
            {
              "label": "300",
              "value": "300"
            },
            {
              "label": "400",
              "value": "400"
            },
            {
              "label": "500",
              "value": "500"
            },
            {
              "label": "600",
              "value": "600"
            },
            {
              "label": "700",
              "value": "700"
            },
            {
              "label": "800",
              "value": "800"
            },
            {
              "label": "900",
              "value": "900"
            }
          ]
        },
        {
          "type": "select",
          "id": "faq_desc_tf",
          "label": "t:sections.all.content_text.text_transform.label",
          "options": [
            {
              "value": "unset",
              "label": "t:sections.all.content_text.text_transform.unset.label"
            },
            {
              "value": "capitalize",
              "label": "t:sections.all.content_text.text_transform.capitalize.label"
            },
            {
              "value": "uppercase",
              "label": "t:sections.all.content_text.text_transform.uppercase.label"
            }
          ]
        },
        {
          "type": "header",
          "content": "t:sections.all.typography.spacing"
        },
        {
          "type": "range",
          "id": "faq_mt",
          "min": 0,
          "max": 60,
          "step": 1,
          "unit": "px",
          "default": 0,
          "label": "t:sections.all.padding.padding_top"
        },
        {
          "type": "range",
          "id": "faq_mb",
          "min": 0,
          "max": 60,
          "step": 1,
          "unit": "px",
          "default": 10,
          "label": "t:sections.all.padding.padding_bottom"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "t:sections.banner-with-text.name",
      "blocks": [
        {
          "type": "heading"
        },
        {
          "type": "text"
        },
        {
          "type": "buttons"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "brand-partners",
        slug: "brand-partners",
        title: "Brand Partners",
        category: "Logo Grid",
        platform: "shopify",
        language: "liquid",
        ext: ".liquid",
        description: "Showcase your brand partners in a stylish and engaging way with this section.",
        tags: ["brand", "showcase", "liquid", "showcase"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 120,
        demoUrl: "",
        seoKeywords: ["brand logo", "partners slider", "partners", "liquid", "marketing"],
        code: `{% comment %} Section: Brand Partners – Brands That Choose Us
Fully customizable logo grid with title and description. {% endcomment %}

<style>
  #shopify-section-{{ section.id }} {
    background-color: {{ section.settings.bg_color }};
    padding-top: {{ section.settings.padding_top | times: 0.25 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    #shopify-section-{{ section.id }} {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }

  .brand-partners {
    display: flex;
    align-items: center;
    gap: {{ section.settings.gap_between }}px;
  }

  .brand-partners__content {
    max-width: {{ section.settings.content_max_width }}px;
    flex-shrink: 0;
  }

  .brand-partners__title {
    font-size: {{ section.settings.title_size }}px;
    font-weight: 600;
    color: {{ section.settings.title_color }};
    margin-bottom: 16px;
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }

  .brand-partners__desc {
    font-size: {{ section.settings.desc_size }}px;
    color: {{ section.settings.desc_color }};
  }

  .brand-partners__grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat({{ section.settings.columns_desktop }}, 1fr);
    gap: {{ section.settings.grid_gap }}px;
  }

  .brand-partners__card {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.2s;
  }

  .brand-partners__card img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: grayscale({{ section.settings.grayscale }}%);
    transition: filter 0.2s;
    width: 100%;
  }

  .brand-partners__card:hover img {
    filter: grayscale({{ section.settings.hover_grayscale }}%);
  }

  @media screen and (max-width: 1024px) {
    .brand-partners {
      flex-direction: column;
      {% comment %} text-align: center; {% endcomment %}
      gap: 40px;
    }

    .brand-partners__content {
      max-width: 100%;
    }

    .brand-partners__grid {
      grid-template-columns: repeat({{ section.settings.columns_tablet }}, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .brand-partners__grid {
      grid-template-columns: repeat({{ section.settings.columns_mobile }}, 1fr);
      gap: 8px;
    }
    .brand-partners {
      gap:10px;
    }
  }
</style>

<div class="brand-partners page-width">
  <div class="brand-partners__content">
    {% if section.settings.title != blank %}
      <h2 class="brand-partners__title">{{ section.settings.title }}</h2>
    {% endif %}
    {% if section.settings.description != blank %}
      <p class="brand-partners__desc">{{ section.settings.description }}</p>
    {% endif %}
  </div>

  <div class="brand-partners__grid">
    {% for block in section.blocks %}
      <div class="brand-partners__card" {{ block.shopify_attributes }}>
        {% if block.settings.logo != blank %}
          {% if block.settings.link != blank %}<a href="{{ block.settings.link }}">{% endif %}
            {{ block.settings.logo | image_url: width: 600 | image_tag: alt: block.settings.logo.alt }}
          {% if block.settings.link != blank %}</a>{% endif %}
        {% else %}
          <div class="placeholder-image">{{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}</div>
        {% endif %}
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Brand partners",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Brands That Choose Us"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "We stock a wide range of branded glasses, suitable for all budgets."
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background color",
      "default": "#f2f2f2"
    },
    {
      "type": "color",
      "id": "title_color",
      "label": "Title color",
      "default": "#1f6c67"
    },
    {
      "type": "color",
      "id": "desc_color",
      "label": "Description color",
      "default": "#555555"
    },
    {
      "type": "header",
      "content": "Typography"
    },
    {
      "type": "range",
      "id": "title_size",
      "min": 24,
      "max": 60,
      "step": 2,
      "unit": "px",
      "label": "Title size",
      "default": 40
    },
    {
      "type": "range",
      "id": "desc_size",
      "min": 14,
      "max": 24,
      "step": 1,
      "unit": "px",
      "label": "Description size",
      "default": 16
    },
    {
      "type": "header",
      "content": "Layout"
    },
    {
      "type": "range",
      "id": "content_max_width",
      "min": 200,
      "max": 600,
      "step": 20,
      "unit": "px",
      "label": "Content max width",
      "default": 360
    },
    {
      "type": "range",
      "id": "gap_between",
      "min": 20,
      "max": 120,
      "step": 10,
      "unit": "px",
      "label": "Gap between content and grid",
      "default": 80
    },
    {
      "type": "range",
      "id": "grid_gap",
      "min": 10,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Grid gap",
      "default": 20
    },
    {
      "type": "header",
      "content": "Columns"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 2,
      "max": 8,
      "step": 1,
      "label": "Desktop columns",
      "default": 5
    },
    {
      "type": "range",
      "id": "columns_tablet",
      "min": 2,
      "max": 6,
      "step": 1,
      "label": "Tablet columns",
      "default": 4
    },
    {
      "type": "range",
      "id": "columns_mobile",
      "min": 1,
      "max": 4,
      "step": 1,
      "label": "Mobile columns",
      "default": 2
    },
    {
      "type": "header",
      "content": "Image effects"
    },
    {
      "type": "range",
      "id": "grayscale",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "label": "Grayscale (normal)",
      "default": 20
    },
    {
      "type": "range",
      "id": "hover_grayscale",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "label": "Grayscale (hover)",
      "default": 0
    },
    {
      "type": "header",
      "content": "Section padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 200,
      "step": 4,
      "unit": "px",
      "label": "Padding top",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom",
      "default": 80
    }
  ],
  "blocks": [
    {
      "type": "logo",
      "name": "Brand logo",
      "settings": [
        {
          "type": "image_picker",
          "id": "logo",
          "label": "Logo image"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link (optional)"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Brand partners",
      "settings": {
        "title": "Brands That Choose Us",
        "description": "We stock a wide range of branded glasses, suitable for all budgets.",
        "bg_color": "#f2f2f2",
        "title_color": "#1f6c67",
        "desc_color": "#555555"
      },
      "blocks": [
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" },
        { "type": "logo" }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "breadcrumb-banner",
        slug: "breadcrumb-banner",
        title: "Breadcrumb Banner",
        category: "Breadcrumb",
        platform: "shopify",
        language: "liquid",
        ext: ".liquid",
        description: "A simple and customizable breadcrumb navigation section for Shopify stores, allowing users to easily navigate back to previous pages.",
        tags: ["breadcrumb", "banner", "liquid", "breadcrumb banner"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 105,
        demoUrl: "",
        seoKeywords: ["breadcrumb", "banner", "liquid", "breadcrumb banner"],
        code:`{%- style -%}
  #shopify-section-{{ section.id }} {
    --section-padding-top: {{ section.settings.padding_top }}px;
    --section-padding-bottom: {{ section.settings.padding_bottom }}px;
    --section-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
    --section-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
    --section-bg-image: {% if section.settings.background_image != blank %}url({{ section.settings.background_image | image_url }}){% else %}url('{{ section.settings.background_fallback_image }}'){% endif %};
    --section-bg-color: {{ section.settings.background_color }};
    --text-color: {{ section.settings.text_color }};
    --title-color: {{ section.settings.title_color }};
    --breadcrumb-color: {{ section.settings.breadcrumb_color }};
    --breadcrumb-hover-color: {{ section.settings.breadcrumb_hover_color }};
    --breadcrumb-current-color: {{ section.settings.breadcrumb_current_color }};
    --breadcrumb-sep-color: {{ section.settings.breadcrumb_sep_color }};
    --title-size-desktop: {{ section.settings.title_size_desktop }}px;
    --title-size-tablet: {{ section.settings.title_size_tablet }}px;
    --title-size-mobile: {{ section.settings.title_size_mobile }}px;
    --description-size-desktop: {{ section.settings.description_size_desktop }}px;
    --description-size-mobile: {{ section.settings.description_size_mobile }}px;
    --breadcrumb-size: {{ section.settings.breadcrumb_size }}px;
    --image-width: {{ section.settings.image_width }}px;
  }

  .contact-hero-{{ section.id }} {
    background-color: var(--section-bg-color);
    background-image: var(--section-bg-image);
    background-size: {{ section.settings.background_size }};
    background-position: {{ section.settings.background_position }};
    background-repeat: {{ section.settings.background_repeat }};
    padding: var(--section-padding-top) 0 var(--section-padding-bottom);
    margin: {{ section.settings.section_margin_top }}px 0 {{ section.settings.section_margin_bottom }}px;
  }

  .contact-hero-{{ section.id }} .contact-hero__content {
    display: flex;
    flex-wrap: wrap;
    align-items: {{ section.settings.content_alignment }};
    justify-content: space-between;
    gap: {{ section.settings.content_gap }}px;
  }

  .contact-hero-{{ section.id }} .contact-hero__text {
    flex: 1 1 {{ section.settings.text_min_width }}px;
    text-align: {{ section.settings.text_alignment }};
  }

  .contact-hero-{{ section.id }} .contact-hero__title {
    font-size: var(--title-size-desktop);
    font-weight: {{ section.settings.title_weight }};
    line-height: {{ section.settings.title_line_height }};
    margin: 0 0 {{ section.settings.title_margin_bottom }}px;
    color: var(--title-color);
    text-transform: {{ section.settings.title_transform }};
    letter-spacing: {{ section.settings.title_letter_spacing }}px;
  }

  .contact-hero-{{ section.id }} .contact-hero__description {
    font-size: var(--description-size-desktop);
    color: var(--text-color);
    margin: 0 0 {{ section.settings.description_margin_bottom }}px;
    line-height: {{ section.settings.description_line_height }};
    max-width: {{ section.settings.description_max_width }}px;
    {% if section.settings.text_alignment == 'center' %}
      margin-left: auto;
      margin-right: auto;
    {% endif %}
  }

  .contact-hero-{{ section.id }} .contact-hero__breadcrumbs {
    font-size: var(--breadcrumb-size);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: {{ section.settings.breadcrumb_alignment }};
    gap: {{ section.settings.breadcrumb_gap }}px;
  }

  .contact-hero-{{ section.id }} .breadcrumb__link {
    text-decoration: none;
    color: var(--breadcrumb-color);
    transition: color 0.2s ease;
  }

  .contact-hero-{{ section.id }} .breadcrumb__link:hover {
    color: var(--breadcrumb-hover-color);
    text-decoration: {{ section.settings.breadcrumb_hover_underline }};
  }

  .contact-hero-{{ section.id }} .breadcrumb__separator {
    color: var(--breadcrumb-sep-color);
    margin: 0 {{ section.settings.breadcrumb_sep_margin }}px;
    display: inline-block;
  }

  .contact-hero-{{ section.id }} .breadcrumb__current {
    color: var(--breadcrumb-current-color);
    font-weight: {{ section.settings.breadcrumb_current_weight }};
  }

  .contact-hero-{{ section.id }} .contact-hero__image {
    flex: 0 0 var(--image-width);
    text-align: {{ section.settings.image_alignment }};
  }

  .contact-hero-{{ section.id }} .contact-hero__image img {
    max-width: 100%;
    height: auto;
    border-radius: {{ section.settings.image_border_radius }}px;
    box-shadow: {{ section.settings.image_box_shadow }};
    display: block;
  }

  .contact-hero-{{ section.id }} .contact-hero__image svg {
    width: 100%;
    height: auto;
    border-radius: {{ section.settings.image_border_radius }}px;
  }

  /* Tablet Responsive */
  @media screen and (max-width: 989px) {
    .contact-hero-{{ section.id }} {
      padding: var(--section-padding-top-mobile) 0 var(--section-padding-bottom-mobile);
    }

    .contact-hero-{{ section.id }} .contact-hero__content {
      flex-direction: column-reverse;
      gap: {{ section.settings.content_gap_mobile }}px;
    }

    .contact-hero-{{ section.id }} .contact-hero__text {
      text-align: center;
      flex-basis: auto;
    }

    .contact-hero-{{ section.id }} .contact-hero__title {
      font-size: var(--title-size-tablet);
    }

    .contact-hero-{{ section.id }} .contact-hero__breadcrumbs {
      justify-content: center;
    }

    .contact-hero-{{ section.id }} .contact-hero__image {
      flex-basis: auto;
      width: 100%;
      max-width: {{ section.settings.image_width_tablet }}px;
      margin: 0 auto;
      text-align: center;
    }
  }

  /* Mobile Responsive */
  @media screen and (max-width: 749px) {
    .contact-hero-{{ section.id }} .page-width {
      padding: 0 {{ section.settings.page_padding_mobile }}px;
    }

    .contact-hero-{{ section.id }} .contact-hero__title {
      font-size: var(--title-size-mobile);
    }

    .contact-hero-{{ section.id }} .contact-hero__description {
      font-size: var(--description-size-mobile);
    }

    .contact-hero-{{ section.id }} .contact-hero__image {
      max-width: {{ section.settings.image_width_mobile }}px;
    }

    .contact-hero-{{ section.id }} .breadcrumb__separator {
      margin: 0 {{ section.settings.breadcrumb_sep_margin_mobile }}px;
    }
  }
{%- endstyle -%}

<section class="contact-hero-{{ section.id }}" aria-labelledby="contact-hero-title-{{ section.id }}">
  <div class="page-width">
    <div class="contact-hero__content">
      <div class="contact-hero__text">
        {%- if section.settings.title != blank -%}
          <h1 id="contact-hero-title-{{ section.id }}" class="contact-hero__title">
            {{ section.settings.title | escape }}
          </h1>
        {%- endif -%}

        {%- if section.settings.description != blank -%}
          <div class="contact-hero__description">
            {{ section.settings.description }}
          </div>
        {%- endif -%}

        {%- if section.settings.show_breadcrumbs -%}
          <nav class="contact-hero__breadcrumbs" aria-label="Breadcrumb">
            {%- if section.settings.home_link_text != blank -%}
              <a href="{{ section.settings.home_link_url | default: '/' }}" class="breadcrumb__link">
                {{ section.settings.home_link_text | escape }}
              </a>
              <span class="breadcrumb__separator" aria-hidden="true">{{ section.settings.breadcrumb_separator }}</span>
            {%- endif -%}

            {%- if section.settings.current_page_text != blank -%}
              <span class="breadcrumb__current" aria-current="page">
                {{ section.settings.current_page_text | escape }}
              </span>
            {%- endif -%}
          </nav>
        {%- endif -%}
      </div>

      <div class="contact-hero__image">
        {%- if section.settings.image != blank -%}
          <img 
            src="{{ section.settings.image | image_url: width: 600 }}"
            srcset="
              {{ section.settings.image | image_url: width: 400 }} 400w,
              {{ section.settings.image | image_url: width: 600 }} 600w,
              {{ section.settings.image | image_url: width: 800 }} 800w
            "
            sizes="(min-width: 990px) 400px, (min-width: 750px) 300px, 250px"
            alt="{{ section.settings.image.alt | escape }}"
            loading="lazy"
            width="{{ section.settings.image.width }}"
            height="{{ section.settings.image.height }}"
          >
        {%- endif -%}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Breadcrumb Banner",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "header",
      "content": "Content Settings"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Contacts"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description",
      "default": "<p>Our contact lenses are designed to suit every lifestyle—whether you wear them daily, occasionally, or are still exploring your options.</p>"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "header",
      "content": "Breadcrumb Settings"
    },
    {
      "type": "checkbox",
      "id": "show_breadcrumbs",
      "label": "Show breadcrumbs",
      "default": true
    },
    {
      "type": "text",
      "id": "home_link_text",
      "label": "Home link text",
      "default": "Home"
    },
    {
      "type": "url",
      "id": "home_link_url",
      "label": "Home link URL",
      "default": "/"
    },
    {
      "type": "text",
      "id": "current_page_text",
      "label": "Current page text",
      "default": "Contacts"
    },
    {
      "type": "text",
      "id": "breadcrumb_separator",
      "label": "Breadcrumb separator",
      "default": ">",
      "info": "HTML entities like &gt; can be used"
    },
    {
      "type": "header",
      "content": "Background Settings"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background image"
    },
    {
      "type": "text",
      "id": "background_fallback_image",
      "label": "Fallback background URL",
      "default": "https://placehold.co/1440x266",
      "info": "Used if no image is selected"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#f8f8f8"
    },
    {
      "type": "select",
      "id": "background_size",
      "label": "Background size",
      "options": [
        { "value": "cover", "label": "Cover" },
        { "value": "contain", "label": "Contain" },
        { "value": "auto", "label": "Auto" }
      ],
      "default": "cover"
    },
    {
      "type": "select",
      "id": "background_position",
      "label": "Background position",
      "options": [
        { "value": "center", "label": "Center" },
        { "value": "top", "label": "Top" },
        { "value": "bottom", "label": "Bottom" },
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "background_repeat",
      "label": "Background repeat",
      "options": [
        { "value": "no-repeat", "label": "No repeat" },
        { "value": "repeat", "label": "Repeat" },
        { "value": "repeat-x", "label": "Repeat horizontally" },
        { "value": "repeat-y", "label": "Repeat vertically" }
      ],
      "default": "no-repeat"
    },
    {
      "type": "header",
      "content": "Layout Settings"
    },
    {
      "type": "range",
      "id": "page_padding_mobile",
      "min": 0,
      "max": 30,
      "step": 5,
      "unit": "px",
      "label": "Page horizontal padding (mobile)",
      "default": 15
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 200,
      "step": 4,
      "unit": "px",
      "label": "Padding top (desktop)",
      "default": 52
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom (desktop)",
      "default": 52
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top (mobile)",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom (mobile)",
      "default": 40
    },
    {
      "type": "range",
      "id": "section_margin_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Section margin top",
      "default": 0
    },
    {
      "type": "range",
      "id": "section_margin_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Section margin bottom",
      "default": 0
    },
    {
      "type": "header",
      "content": "Content Layout"
    },
    {
      "type": "range",
      "id": "text_min_width",
      "min": 300,
      "max": 800,
      "step": 20,
      "unit": "px",
      "label": "Text minimum width",
      "default": 500
    },
    {
      "type": "range",
      "id": "image_width",
      "min": 200,
      "max": 600,
      "step": 10,
      "unit": "px",
      "label": "Image width (desktop)",
      "default": 400
    },
    {
      "type": "range",
      "id": "image_width_tablet",
      "min": 150,
      "max": 500,
      "step": 10,
      "unit": "px",
      "label": "Image width (tablet)",
      "default": 300
    },
    {
      "type": "range",
      "id": "image_width_mobile",
      "min": 100,
      "max": 400,
      "step": 10,
      "unit": "px",
      "label": "Image width (mobile)",
      "default": 250
    },
    {
      "type": "select",
      "id": "content_alignment",
      "label": "Content vertical alignment",
      "options": [
        { "value": "center", "label": "Center" },
        { "value": "flex-start", "label": "Top" },
        { "value": "flex-end", "label": "Bottom" }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "Text alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left"
    },
    {
      "type": "select",
      "id": "image_alignment",
      "label": "Image alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "right"
    },
    {
      "type": "range",
      "id": "content_gap",
      "min": 10,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Gap between text and image (desktop)",
      "default": 20
    },
    {
      "type": "range",
      "id": "content_gap_mobile",
      "min": 10,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Gap between text and image (mobile)",
      "default": 30
    },
    {
      "type": "header",
      "content": "Typography - Title"
    },
    {
      "type": "range",
      "id": "title_size_desktop",
      "min": 24,
      "max": 72,
      "step": 2,
      "unit": "px",
      "label": "Title size (desktop)",
      "default": 48
    },
    {
      "type": "range",
      "id": "title_size_tablet",
      "min": 20,
      "max": 60,
      "step": 2,
      "unit": "px",
      "label": "Title size (tablet)",
      "default": 40
    },
    {
      "type": "range",
      "id": "title_size_mobile",
      "min": 18,
      "max": 48,
      "step": 2,
      "unit": "px",
      "label": "Title size (mobile)",
      "default": 32
    },
    {
      "type": "select",
      "id": "title_weight",
      "label": "Title font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" },
        { "value": "800", "label": "Extra Bold" }
      ],
      "default": "700"
    },
    {
      "type": "range",
      "id": "title_line_height",
      "min": 1,
      "max": 1.8,
      "step": 0.1,
      "label": "Title line height",
      "default": 1.2
    },
    {
      "type": "range",
      "id": "title_letter_spacing",
      "min": -1,
      "max": 5,
      "step": 0.5,
      "unit": "px",
      "label": "Title letter spacing",
      "default": 0
    },
    {
      "type": "select",
      "id": "title_transform",
      "label": "Title text transform",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "uppercase", "label": "Uppercase" },
        { "value": "lowercase", "label": "Lowercase" },
        { "value": "capitalize", "label": "Capitalize" }
      ],
      "default": "none"
    },
    {
      "type": "range",
      "id": "title_margin_bottom",
      "min": 0,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Title bottom margin",
      "default": 20
    },
    {
      "type": "header",
      "content": "Typography - Description"
    },
    {
      "type": "range",
      "id": "description_size_desktop",
      "min": 14,
      "max": 30,
      "step": 1,
      "unit": "px",
      "label": "Description size (desktop)",
      "default": 18
    },
    {
      "type": "range",
      "id": "description_size_mobile",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "label": "Description size (mobile)",
      "default": 16
    },
    {
      "type": "range",
      "id": "description_line_height",
      "min": 1.2,
      "max": 2,
      "step": 0.1,
      "label": "Description line height",
      "default": 1.6
    },
    {
      "type": "range",
      "id": "description_max_width",
      "min": 300,
      "max": 800,
      "step": 20,
      "unit": "px",
      "label": "Description max width",
      "default": 600
    },
    {
      "type": "range",
      "id": "description_margin_bottom",
      "min": 0,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Description bottom margin",
      "default": 20
    },
    {
      "type": "header",
      "content": "Breadcrumb Styling"
    },
    {
      "type": "range",
      "id": "breadcrumb_size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Breadcrumb font size",
      "default": 14
    },
    {
      "type": "select",
      "id": "breadcrumb_alignment",
      "label": "Breadcrumb alignment",
      "options": [
        { "value": "flex-start", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "flex-end", "label": "Right" }
      ],
      "default": "flex-start"
    },
    {
      "type": "range",
      "id": "breadcrumb_gap",
      "min": 0,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Breadcrumb gap between items",
      "default": 5
    },
    {
      "type": "range",
      "id": "breadcrumb_sep_margin",
      "min": 0,
      "max": 15,
      "step": 1,
      "unit": "px",
      "label": "Separator horizontal margin (desktop)",
      "default": 5
    },
    {
      "type": "range",
      "id": "breadcrumb_sep_margin_mobile",
      "min": 0,
      "max": 15,
      "step": 1,
      "unit": "px",
      "label": "Separator horizontal margin (mobile)",
      "default": 3
    },
    {
      "type": "select",
      "id": "breadcrumb_current_weight",
      "label": "Current page font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "600"
    },
    {
      "type": "select",
      "id": "breadcrumb_hover_underline",
      "label": "Hover underline style",
      "options": [
        { "value": "underline", "label": "Underline" },
        { "value": "none", "label": "No underline" }
      ],
      "default": "underline"
    },
    {
      "type": "header",
      "content": "Image Styling"
    },
    {
      "type": "range",
      "id": "image_border_radius",
      "min": 0,
      "max": 50,
      "step": 2,
      "unit": "px",
      "label": "Image border radius",
      "default": 8
    },
    {
      "type": "text",
      "id": "image_box_shadow",
      "label": "Image box shadow",
      "default": "none",
      "info": "CSS box-shadow value (e.g., 0 4px 10px rgba(0,0,0,0.1))"
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "title_color",
      "label": "Title color",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Description color",
      "default": "#333333"
    },
    {
      "type": "color",
      "id": "breadcrumb_color",
      "label": "Breadcrumb link color",
      "default": "#007070"
    },
    {
      "type": "color",
      "id": "breadcrumb_hover_color",
      "label": "Breadcrumb hover color",
      "default": "#004d4d"
    },
    {
      "type": "color",
      "id": "breadcrumb_current_color",
      "label": "Breadcrumb current color",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "breadcrumb_sep_color",
      "label": "Breadcrumb separator color",
      "default": "#555555"
    }
  ],
  "presets": [
    {
      "name": "Breadcrumb Banner",
      "settings": {
        "title": "Page Title",
        "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
        "home_link_text": "Home",
        "current_page_text": "Page Title"
      }
    }
  ]
}
{% endschema %}`
    },
    {
        id: "breadcrumbs",
        slug: "breadcrumbs",
        title: "Breadcrumbs",
        platform: "shopify",
        category: "Breadcrumb",
        language: "liquid",
        ext: ".liquid",
        description: "A simple and customizable breadcrumb navigation section for Shopify stores, allowing users to easily navigate back to previous pages.",
        tags: ["breadcrumb", "liquid", "breadcrumbs"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["breadcrumb", "liquid", "breadcrumbs"],
        code: `<style>
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
  .section-{{ section.id }}{
    background: {{ section.settings.bg_color }};
  }
  .breadcrumb-wrapper {
    font-size: 14px;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
  .breadcrumb-link_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .breadcrumb-link {
    text-decoration: none;
    color: hsl(140 10% 45%);
  }

  .breadcrumb-separator {
    margin: 0 8px;
    color: hsl(140 10% 45%);
  }

  .breadcrumb-text {
    color: #212c24;
  }

</style>

{% assign separator = section.settings.separator %}
{% assign show_home_icon = section.settings.show_home_icon %}
{% assign show_current_page = section.settings.show_current_page %}

<section class="section-{{ section.id }} section-{{ section.id }}-padding">
  <nav class="page-width breadcrumb-wrapper" aria-label="Breadcrumb">
    <ul class="breadcrumb-list" role="list">
        <li class="breadcrumb-item">
            <a href="{{ routes.root_url }}" class="breadcrumb-link {% if show_home_icon %}breadcrumb-link_icon{% endif %}">
                {% if show_home_icon %}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z" fill="currentColor"/>
                </svg>
                {% endif %}
                {{ 'home' }}
            </a>
        </li>

        {% if template.name == 'collection' %}
        <li class="breadcrumb-separator">{{ separator }}</li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-text">{{ collection.title }}</span>
        </li>
        {% elsif template.name == 'product' %}
        {% if product.collections.size > 0 %}
            <li class="breadcrumb-separator">{{ separator }}</li>
            <li class="breadcrumb-item">
            <a href="{{ product.collections.first.url }}" class="breadcrumb-link">
                {{ product.collections.first.title }}
            </a>
            </li>
        {% endif %}
        <li class="breadcrumb-separator">{{ separator }}</li>
        {% if show_current_page %}
            <li class="breadcrumb-item">
            <span class="breadcrumb-text">{{ product.title }}</span>
            </li>
        {% endif %}
        {% elsif template.name == 'page' %}
        <li class="breadcrumb-separator">{{ separator }}</li>
        {% if show_current_page %}
            <li class="breadcrumb-item">
            <span class="breadcrumb-text">{{ page.title }}</span>
            </li>
        {% endif %}
        {% endif %}
    </ul>
  </nav>
</section>


{% schema %}
{
  "name": "Breadcrumbs",
  "tag": "section",
  "class": "section-breadcrumbs",
  "settings": [
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#fff"
    },
    {
      "type": "checkbox",
      "id": "show_home_icon",
      "label": "Show home icon",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_current_page",
      "label": "Show current page title",
      "default": true
    },
    {
      "type": "text",
      "id": "separator",
      "label": "Breadcrumb separator",
      "default": "›"
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 36
    }
  ],
  "presets": [
    {
      "name": "Breadcrumbs",
      "category": "Navigation"
    }
  ]
}
{% endschema %}`
    },
    {
        id: "card-product",
        slug: "card-product",
        title: "Product Card",
        platform: "shopify",
        category: "Product Card",
        language: "liquid",
        ext: ".liquid",
        description: "Showcase your products in a stylish and engaging way with this section.",
        tags: ["product", "liquid", "product card"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["product", "liquid", "product card"],
        code: `{% comment %}
  Renders a product card - Modified version for Marley's Sweets
  Includes custom design while maintaining Shopify functionality
{% endcomment %}
{%- unless skip_styles -%}
  {{ 'component-rating.css' | asset_url | stylesheet_tag }}
  {{ 'component-volume-pricing.css' | asset_url | stylesheet_tag }}
  {{ 'component-price.css' | asset_url | stylesheet_tag }}
  {{ 'quick-order-list.css' | asset_url | stylesheet_tag }}
  {{ 'quantity-popover.css' | asset_url | stylesheet_tag }}
{%- endunless -%}


{%- if card_product and card_product != empty -%}
  {%- liquid
    assign ratio = 1
    if card_product.featured_media and media_aspect_ratio == 'portrait'
      assign ratio = 0.8
    elsif card_product.featured_media and media_aspect_ratio == 'adapt'
      assign ratio = card_product.featured_media.aspect_ratio
    endif
    if ratio == 0 or ratio == null
      assign ratio = 1
    endif
  -%}
  
  <div class="card-wrapper product-card-wrapper underline-links-hover card-product-custom">
    <div
      class="
        card card--{{ settings.card_style }}
        {% if card_product.featured_media %} card--media{% else %} card--text{% endif %}
        {% if settings.card_style == 'card' %} color-{{ settings.card_color_scheme }} gradient{% endif %}
        {% if image_shape and image_shape != 'default' %} card--shape{% endif %}
        {% if extend_height %} card--extend-height{% endif %}
        {% if card_product.featured_media == nil and settings.card_style == 'card' %} ratio{% endif %}
        {% if horizontal_class %} card--horizontal{% endif %}
      "
      style="--ratio-percent: {{ 1 | divided_by: ratio | times: 100 }}%;"
    >
      <div
        class="card__inner {% if settings.card_style == 'standard' %}color-{{ settings.card_color_scheme }} gradient{% endif %}{% if card_product.featured_media or settings.card_style == 'standard' %} ratio{% endif %}"
        style="--ratio-percent: {{ 1 | divided_by: ratio | times: 100 }}%;"
      >
        {%- if card_product.featured_media -%}
          <div class="card__media{% if image_shape and image_shape != 'default' %} shape--{{ image_shape }} color-{{ settings.card_color_scheme }} gradient{% endif %}">
            <div class="media media--transparent media--hover-effect">
              <img
                srcset="
                  {%- if card_product.featured_media.width >= 165 -%}{{ card_product.featured_media | image_url: width: 165 }} 165w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 360 -%}{{ card_product.featured_media | image_url: width: 360 }} 360w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 533 -%}{{ card_product.featured_media | image_url: width: 533 }} 533w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 720 -%}{{ card_product.featured_media | image_url: width: 720 }} 720w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 940 -%}{{ card_product.featured_media | image_url: width: 940 }} 940w,{%- endif -%}
                  {%- if card_product.featured_media.width >= 1066 -%}{{ card_product.featured_media | image_url: width: 1066 }} 1066w,{%- endif -%}
                  {{ card_product.featured_media | image_url }} {{ card_product.featured_media.width }}w
                "
                src="{{ card_product.featured_media | image_url: width: 533 }}"
                sizes="(min-width: {{ settings.page_width }}px) {{ settings.page_width | minus: 130 | divided_by: 4 }}px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                alt="{{ card_product.featured_media.alt | escape }}"
                class="motion-reduce"
                {% unless lazy_load == false %}
                  loading="lazy"
                {% endunless %}
                width="{{ card_product.featured_media.width }}"
                height="{{ card_product.featured_media.height }}"
              >

              {%- if card_product.media[1] != null and show_secondary_image -%}
                <img
                  srcset="
                    {%- if card_product.media[1].width >= 165 -%}{{ card_product.media[1] | image_url: width: 165 }} 165w,{%- endif -%}
                    {%- if card_product.media[1].width >= 360 -%}{{ card_product.media[1] | image_url: width: 360 }} 360w,{%- endif -%}
                    {%- if card_product.media[1].width >= 533 -%}{{ card_product.media[1] | image_url: width: 533 }} 533w,{%- endif -%}
                    {%- if card_product.media[1].width >= 720 -%}{{ card_product.media[1] | image_url: width: 720 }} 720w,{%- endif -%}
                    {%- if card_product.media[1].width >= 940 -%}{{ card_product.media[1] | image_url: width: 940 }} 940w,{%- endif -%}
                    {%- if card_product.media[1].width >= 1066 -%}{{ card_product.media[1] | image_url: width: 1066 }} 1066w,{%- endif -%}
                    {{ card_product.media[1] | image_url }} {{ card_product.media[1].width }}w
                  "
                  src="{{ card_product.media[1] | image_url: width: 533 }}"
                  sizes="(min-width: {{ settings.page_width }}px) {{ settings.page_width | minus: 130 | divided_by: 4 }}px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                  alt="{{ card_product.media[1].alt | escape }}"
                  class="motion-reduce"
                  loading="lazy"
                  width="{{ card_product.media[1].width }}"
                  height="{{ card_product.media[1].height }}"
                >
              {%- endif -%}
            </div>
          </div>
        {%- endif -%}
        <div class="card__content">
          <div class="card__information">
            <h3
              class="card__heading"
              {% if card_product.featured_media == null and settings.card_style == 'standard' %}
                id="title-{{ section_id }}-{{ card_product.id }}"
              {% endif %}
            >
              <a
                href="{{ card_product.url }}"
                id="StandardCardNoMediaLink-{{ section_id }}-{{ card_product.id }}"
                class="full-unstyled-link"
                aria-labelledby="StandardCardNoMediaLink-{{ section_id }}-{{ card_product.id }} NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
              >
                {{ card_product.title | escape }}
              </a>
            </h3>
          </div>
          <div class="card__badge {{ settings.badge_position }}">
            {%- if card_product.available == false -%}
              <span
                id="NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
                class="badge badge--bottom-left color-{{ settings.sold_out_badge_color_scheme }}"
              >
                {{- 'products.product.sold_out' | t -}}
              </span>
            {%- elsif card_product.compare_at_price > card_product.price and card_product.available -%}
              <span
                id="NoMediaStandardBadge-{{ section_id }}-{{ card_product.id }}"
                class="badge badge--bottom-left color-{{ settings.sale_badge_color_scheme }}"
              >
                {{- 'products.product.on_sale' | t -}}
              </span>
            {%- endif -%}
          </div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <!-- Custom Vendor Name -->
          {%- if show_vendor -%}
            <div class="vendor">{{ card_product.vendor }}</div>
          {%- endif -%}
          
          <h3
            class="card__heading product-title{% if card_product.featured_media or settings.card_style == 'standard' %} h5{% endif %}"
            {% if card_product.featured_media or settings.card_style == 'card' %}
              id="title-{{ section_id }}-{{ card_product.id }}"
            {% endif %}
          >
            <a
              href="{{ card_product.url }}"
              id="CardLink-{{ section_id }}-{{ card_product.id }}"
              class="full-unstyled-link"
              aria-labelledby="CardLink-{{ section_id }}-{{ card_product.id }} Badge-{{ section_id }}-{{ card_product.id }}"
            >
              {{ card_product.title | escape }}
            </a>
          </h3>
          <div class="card-information">
            {% comment %} {%- if show_vendor -%}
              <span class="visually-hidden">{{ 'accessibility.vendor' | t }}</span>
              <div class="caption-with-letter-spacing light">{{ card_product.vendor }}</div>
            {%- endif -%} {% endcomment %}

            <span class="caption-large light">{{ block.settings.description | escape }}</span>

            {%- if show_rating and card_product.metafields.reviews.rating.value != blank -%}
              {% liquid
                assign rating_decimal = 0
                assign decimal = card_product.metafields.reviews.rating.value.rating | modulo: 1
                if decimal >= 0.3 and decimal <= 0.7
                  assign rating_decimal = 0.5
                elsif decimal > 0.7
                  assign rating_decimal = 1
                endif
              %}
              <div
                class="rating"
                role="img"
                aria-label="{{ 'accessibility.star_reviews_info' | t: rating_value: card_product.metafields.reviews.rating.value, rating_max: card_product.metafields.reviews.rating.value.scale_max }}"
              >
                <span
                  aria-hidden="true"
                  class="rating-star"
                  style="--rating: {{ card_product.metafields.reviews.rating.value.rating | floor }}; --rating-max: {{ card_product.metafields.reviews.rating.value.scale_max }}; --rating-decimal: {{ rating_decimal }};"
                ></span>
              </div>
              <p class="rating-text caption">
                <span aria-hidden="true">
                  {{- card_product.metafields.reviews.rating.value }} /
                  {{ card_product.metafields.reviews.rating.value.scale_max -}}
                </span>
              </p>
              <p class="rating-count caption">
                <span aria-hidden="true">({{ card_product.metafields.reviews.rating_count }})</span>
                <span class="visually-hidden">
                  {{- card_product.metafields.reviews.rating_count }}
                  {{ 'accessibility.total_reviews' | t -}}
                </span>
              </p>
            {%- endif -%}

            <!-- Custom Price Display -->
            <div class="price">
              {% render 'price', product: card_product, price_class: '', show_compare_at_price: true %}
              {% comment %} {%- if card_product.price_varies == false -%}
                <span class="price-note">(ex. VAT)</span>
              {%- endif -%} {% endcomment %}
            </div>

            <!-- Stock Information -->
            {%- assign variant = card_product.selected_or_first_available_variant -%}
            {%- assign stock_quantity = variant.inventory_quantity -%}

            <div class="stock-info-wrapper">
              {%- if stock_quantity <= 0 -%}
                <div class="stock-info out-of-stock">
                  <span class="stock-dot"></span>
                  Out of Stock
                </div>

              {%- elsif stock_quantity < 4 -%}
                <div class="stock-info low-stock">
                  <span class="stock-dot"></span>
                  Low Stock
                </div>

              {%- else -%}
                <div class="stock-info in-stock">
                  <span class="stock-dot"></span>
                  {{ stock_quantity }} In Stock
                </div>
              {%- endif -%}
            </div>


            {%- if card_product.quantity_price_breaks_configured? -%}
              <!-- Volume pricing logic remains the same -->
              {% if card_product.variants_count == 1 and quick_add == 'bulk' %}
                {% liquid
                  assign quantity_rule = card_product.selected_or_first_available_variant.quantity_rule
                  assign has_qty_rules = false
                  if quantity_rule.increment > 1 or quantity_rule.min > 1 or quantity_rule.max != null
                    assign has_qty_rules = true
                  endif
                %}
                <quantity-popover>
                  <button class="card__information-volume-pricing-note card__information-volume-pricing-note--button card__information-volume-pricing-note--button-{{ settings.card_text_alignment }} quantity-popover__info-button--icon-only button button button--tertiary medium-hide small-hide">
                    <span class="caption">{{ 'products.product.volume_pricing.note' | t }}</span>
                  </button>
                  <button class="card__information-volume-pricing-note card__information-volume-pricing-note--button card__information-volume-pricing-note--button-{{ settings.card_text_alignment }} quantity-popover__info-button--icon-with-label button button--tertiary large-up-hide">
                    <span class="caption">{{ 'products.product.volume_pricing.note' | t }}</span>
                  </button>
                </quantity-popover>
              {% else %}
                <div class="card__information-volume-pricing-note">
                  <span class="caption">{{ 'products.product.volume_pricing.note' | t }}</span>
                </div>
              {% endif %}
            {%- endif -%}
          </div>
        </div>
        
        {% assign product_form_id = 'quick-add-' | append: section_id | append: card_product.id %}
        
        {% if quick_add == 'standard' %}
          <div class="quick-add no-js-hidden">
            {%- liquid
              assign qty_rules = false
              if card_product.selected_or_first_available_variant.quantity_rule.min > 1 or card_product.selected_or_first_available_variant.quantity_rule.max != null or card_product.selected_or_first_available_variant.quantity_rule.increment > 1
                assign qty_rules = true
              endif
            -%}
            
            {%- if card_product.variants_count > 1 or qty_rules -%}
              <!-- Multiple variants - use modal opener -->
              <modal-opener data-modal="#QuickAdd-{{ card_product.id }}">
                <button
                  id="{{ product_form_id }}-submit"
                  type="submit"
                  name="add"
                  class="quick-add__submit button button--full-width button--secondary custom-add-to-cart"
                  aria-haspopup="dialog"
                  aria-labelledby="{{ product_form_id }}-submit title-{{ section_id }}-{{ card_product.id }}"
                  data-product-url="{{ card_product.url }}"
                >
                  {{ 'products.product.choose_options' | t }}
                  {%- if horizontal_quick_add -%}
                    <span class="icon-wrap">
                      {{- 'icon-arrow.svg' | inline_asset_content -}}
                    </span>
                  {%- endif -%}
                  {%- render 'loading-spinner' -%}
                </button>
              </modal-opener>
              <quick-add-modal id="QuickAdd-{{ card_product.id }}" class="quick-add-modal">
                <div
                  role="dialog"
                  aria-label="{{ 'products.product.choose_product_options' | t: product_name: card_product.title | escape }}"
                  aria-modal="true"
                  class="quick-add-modal__content global-settings-popup"
                  tabindex="-1"
                >
                  <button
                    id="ModalClose-{{ card_product.id }}"
                    type="button"
                    class="quick-add-modal__toggle"
                    aria-label="{{ 'accessibility.close' | t }}"
                  >
                    {{- 'icon-close.svg' | inline_asset_content -}}
                  </button>
                  <div id="QuickAddInfo-{{ card_product.id }}" class="quick-add-modal__content-info"></div>
                </div>
              </quick-add-modal>
              
            {%- else -%}
              <!-- Single variant - direct add to cart with custom quantity -->
              <product-form data-section-id="{{ section.id }}">
                {%- form 'product',
                  card_product,
                  id: product_form_id,
                  class: 'form',
                  novalidate: 'novalidate',
                  data-type: 'add-to-cart-form'
                -%}
                  <input
                    type="hidden"
                    name="id"
                    value="{{ card_product.selected_or_first_available_variant.id }}"
                    class="product-variant-id"
                    {% if card_product.selected_or_first_available_variant.available == false %}
                      disabled
                    {% endif %}
                  >
                  
                  <!-- Hidden quantity input for Shopify -->
                  <input type="hidden" name="quantity" value="1" class="quantity-hidden">
                  
                  <div class="custom-quick-add-form">
                    <!-- Custom Quantity Selector -->
                    <div class="custom-quantity-selector">
                      <button type="button" class="custom-quantity-btn minus">-</button>
                      <input 
                        type="number" 
                        name="visible_quantity" 
                        value="1" 
                        min="1" 
                        class="custom-quantity-input" 
                        readonly
                      >
                      <button type="button" class="custom-quantity-btn plus">+</button>
                    </div>
                    
                    <button
                      id="{{ product_form_id }}-submit"
                      type="submit"
                      name="add"
                      class="quick-add__submit button button--full-width button--secondary custom-add-to-cart"
                      aria-labelledby="{{ product_form_id }}-submit title-{{ section_id }}-{{ card_product.id }}"
                      aria-live="polite"
                      data-sold-out-message="true"
                      {% if card_product.selected_or_first_available_variant.available == false %}
                        disabled
                      {% endif %}
                    >
                      <span>
                        {%- if card_product.selected_or_first_available_variant.available -%}
                          {{ 'products.product.add_to_cart' | t }}
                        {%- else -%}
                          {{ 'products.product.sold_out' | t }}
                        {%- endif -%}
                      </span>
                      <span class="sold-out-message hidden">
                        {{ 'products.product.sold_out' | t }}
                      </span>
                      {%- if horizontal_quick_add -%}
                        <span class="icon-wrap">
                          {{- 'icon-plus.svg' | inline_asset_content -}}
                        </span>
                      {%- endif -%}
                      {%- render 'loading-spinner' -%}
                    </button>
                  </div>
                {%- endform -%}
              </product-form>
            {%- endif -%}
          </div>
        {% endif %}
        
        <div class="card__badge {{ settings.badge_position }}">
          {%- if card_product.available == false -%}
            <span
              id="Badge-{{ section_id }}-{{ card_product.id }}"
              class="badge badge--bottom-left color-{{ settings.sold_out_badge_color_scheme }}"
            >
              {{- 'products.product.sold_out' | t -}}
            </span>
          {%- elsif card_product.compare_at_price > card_product.price and card_product.available -%}
            <span
              id="Badge-{{ section_id }}-{{ card_product.id }}"
              class="badge badge--bottom-left color-{{ settings.sale_badge_color_scheme }}"
            >
              {{- 'products.product.on_sale' | t -}}
            </span>
          {%- endif -%}
        </div>
      </div>
    </div>
  </div>

{% comment %} <script>
(function() {
  let quantitySelectorsInitialized = false;
  
  // Expose the function to global scope
  window.initializeQuantitySelectors = function() {
    console.log('Initializing quantity selectors...');
    
    document.querySelectorAll('.custom-quantity-selector').forEach(function(selector) {
      if (selector.hasAttribute('data-initialized')) {
        console.log('Skipping already initialized selector');
        return;
      }
      
      const minusBtn = selector.querySelector('.minus');
      const plusBtn = selector.querySelector('.plus');
      const input = selector.querySelector('.custom-quantity-input');
      const form = selector.closest('form');
      const hiddenInput = form ? form.querySelector('.quantity-hidden') : null;
      
      if (minusBtn && plusBtn && input) {
        console.log('Found uninitialized quantity selector, setting up...');
        
        // Clone buttons to remove existing listeners
        const newMinus = minusBtn.cloneNode(true);
        const newPlus = plusBtn.cloneNode(true);
        minusBtn.parentNode.replaceChild(newMinus, minusBtn);
        plusBtn.parentNode.replaceChild(newPlus, plusBtn);
        
        // Get fresh references
        const updatedMinus = selector.querySelector('.minus');
        const updatedPlus = selector.querySelector('.plus');
        const updatedInput = selector.querySelector('.custom-quantity-input');
        
        const updateQuantity = function(value) {
          if (value < 1) value = 1;
          updatedInput.value = value;
          if (hiddenInput) {
            hiddenInput.value = value;
          }
          console.log('Quantity updated to:', value);
        };
        
        updatedMinus.addEventListener('click', function() {
          let value = parseInt(updatedInput.value);
          updateQuantity(value - 1);
        });
        
        updatedPlus.addEventListener('click', function() {
          let value = parseInt(updatedInput.value);
          updateQuantity(value + 1);
        });
        
        // Mark as initialized
        selector.setAttribute('data-initialized', 'true');
        console.log('Quantity selector initialized');
      }
    });
    
    quantitySelectorsInitialized = true;
  };
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.initializeQuantitySelectors();
      setupMutationObserver();
    });
  } else {
    window.initializeQuantitySelectors();
    setupMutationObserver();
  }
  
  // Shopify section events
  document.addEventListener('shopify:section:load', function(event) {
    console.log('Shopify section loaded, reinitializing quantity selectors');
    setTimeout(window.initializeQuantitySelectors, 100);
  });
  
  document.addEventListener('shopify:section:unload', function() {
    // Reset initialization for reloaded sections
    quantitySelectorsInitialized = false;
  });
})();
</script> {% endcomment %}

{%- else -%}
  <!-- Placeholder card (same as original) -->
  {%- liquid
    assign ratio = 1
    assign placeholder = true
    if media_aspect_ratio == 'portrait'
      assign ratio = 0.8
    endif
  -%}
  <div class="card-wrapper product-card-wrapper underline-links-hover card-product-custom">
    <div
      class="
        card card--{{ settings.card_style }}
        {% if extend_height %} card--extend-height{% endif %}
        {% if image_shape and image_shape != 'default' %} card--shape{% endif %}
        {% if settings.card_style == 'card' %} color-{{ settings.card_color_scheme }} gradient{% endif %}
      "
      style="--ratio-percent: {{ 1 | divided_by: ratio | times: 100 }}%;"
    >
      <div
        class="card__inner{% if settings.card_style == 'standard' %} color-{{ settings.card_color_scheme }} gradient{% endif %} ratio"
      >
        <div
          class="card__media {% if image_shape and image_shape != 'default' %} shape--{{ image_shape }} color-{{ settings.card_color_scheme }} gradient{% endif %}"
        >
          <div
            class="media media--transparent"
          >
            {%- if placeholder_image -%}
              {{ placeholder_image | placeholder_svg_tag: 'placeholder-svg' }}
            {%- else -%}
              {{ 'product-apparel-2' | placeholder_svg_tag: 'placeholder-svg' }}
            {% endif %}
          </div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          {%- if show_vendor -%}
            <div class="vendor">{{ 'products.product.vendor' | t }}</div>
          {%- endif -%}
          
          <h3 class="card__heading card__heading--placeholder product-title{% if settings.card_style == 'standard' %} h5{% endif %}">
            <a role="link" aria-disabled="true" class="full-unstyled-link">
              {{ 'onboarding.product_title' | t }}
            </a>
          </h3>
          
          <div class="price">
            {% render 'price', placeholder: placeholder, show_compare_at_price: true %}
            <span class="price-note">(ex. VAT)</span>
          </div>
          
          <div class="stock-info">
            <span class="stock-dot"></span>
            2 In Stock
          </div>
          
          <div class="custom-quick-add-form">
            <div class="custom-quantity-selector">
              <button type="button" class="custom-quantity-btn minus" disabled>-</button>
              <input type="number" value="1" min="1" class="custom-quantity-input" readonly disabled>
              <button type="button" class="custom-quantity-btn plus" disabled>+</button>
            </div>
            <button class="quick-add__submit button button--full-width button--secondary custom-add-to-cart" disabled>
              <span>{{ 'products.product.add_to_cart' | t }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{%- endif -%}`
    },
    {
        id: "collection-grid",
        slug: "collection-grid",
        title: "Collection Grid",
        platform: "shopify",
        category: "Collection",
        language: "liquid",
        ext: ".liquid",
        description: "Display a grid of collections with customizable layout and styling options.",
        tags: ["collection", "liquid", "grid"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["collection", "liquid", "grid"],
        code: `<style>
  .section-{{ section.id }}{
    background: {{ section.settings.bg_color }};
  }
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
 
  /* Grid layout (default) */
  .collection-grid {
    display: grid;
    grid-template-columns: repeat({{ section.settings.columns_desktop }}, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 989px) {
    .collection-grid {
      grid-template-columns: repeat({{ section.settings.columns_tablet }}, 1fr);
    }
  }
  
  @media (max-width: 749px) {
    .collection-grid {
      grid-template-columns: repeat({{ section.settings.columns_mobile }}, 1fr);
    }
  }
    
  .collection-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    aspect-ratio: 1/1;
  }
  
  .collection-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .collection-item:hover .collection-image {
    transform: scale(1.05);
  }
  
  .collection-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgb(0 0 0), transparent);
    padding: 40px 2px 15px 15px;
    color: white;
  }
  
  .collection-name {
    margin: 0;
    font-size: 1.5rem;
  }
  .collection-product_cont {
    font-size: 13px;
  }
</style>

<section class="section-{{ section.id }} section-{{ section.id }}-padding" id="{{ section.settings.section_id }}">
  <div class="page-width collection-section">
    <div class="section_content-box {% if section.settings.content_align == 'left' %}left{% elsif section.settings.content_align == 'center' %}center{% else %}right{% endif %}">
      <h2 class="{{ section.settings.heading_size }}">{{ section.settings.heading }}</h2>
      <div class="section-description">{{ section.settings.description }}</div>
    </div>
    
    {% if section.settings.enable_slider %}
      <div class="collection-slider-{{ section.id }} swiper">
        <div class="swiper-wrapper">
          {% if section.settings.show_all_collections %}
            {% for collection in collections %}
              {% assign count = collection.all_products_count %}
              {% assign display_count = count %}
              
              {% if count >= 2000 %}
                {% assign display_count = '2000+' %}
              {% elsif count >= 1900 %}
                {% assign display_count = '1900+' %}
              {% elsif count >= 1800 %}
                {% assign display_count = '1800+' %}
              {% elsif count >= 1700 %}
                {% assign display_count = '1700+' %}
              {% elsif count >= 1600 %}
                {% assign display_count = '1600+' %}
              {% elsif count >= 1500 %}
                {% assign display_count = '1500+' %}
              {% elsif count >= 1400 %}
                {% assign display_count = '1400+' %}
              {% elsif count >= 1300 %}
                {% assign display_count = '1300+' %}
              {% elsif count >= 1200 %}
                {% assign display_count = '1200+' %}
              {% elsif count >= 1100 %}
                {% assign display_count = '1100+' %}
              {% elsif count >= 1000 %}
                {% assign display_count = '1000+' %}
              {% elsif count >= 900 %}
                {% assign display_count = '900+' %}
              {% elsif count >= 800 %}
                {% assign display_count = '800+' %}
              {% elsif count >= 700 %}
                {% assign display_count = '700+' %}
              {% elsif count >= 600 %}
                {% assign display_count = '600+' %}
              {% elsif count >= 500 %}
                {% assign display_count = '500+' %}
              {% elsif count >= 450 %}
                {% assign display_count = '450+' %}
              {% elsif count >= 400 %}
                {% assign display_count = '400+' %}
              {% elsif count >= 350 %}
                {% assign display_count = '350+' %}
              {% elsif count >= 300 %}
                {% assign display_count = '300+' %}
              {% elsif count >= 250 %}
                {% assign display_count = '250+' %}
              {% elsif count >= 200 %}
                {% assign display_count = '200+' %}
              {% elsif count >= 150 %}
                {% assign display_count = '150+' %}
              {% elsif count >= 100 %}
                {% assign display_count = '100+' %}
              {% elsif count >= 50 %}
                {% assign display_count = '50+' %}
              {% else %}
                {% assign display_count = count %}
              {% endif %}
              
              <div class="swiper-slide">
                <div class="collection-item">
                  <a href="{{ collection.url }}">
                    {% if collection.featured_image != blank %}
                      <img 
                        src="{{ collection.featured_image | image_url: width: 600 }}" 
                        alt="{{ collection.title | escape }}" 
                        class="collection-image"
                        loading="lazy"
                        width="600"
                        height="600"
                      >
                    {% endif %}
                    <div class="collection-overlay">
                      <p class="collection-name">{{ collection.title }}</p>
                      <span class="collection-product_cont">{{ display_count }} Frames</span>
                    </div>
                  </a>
                </div>
              </div>
            {% endfor %}
          {% else %}
            {% for block in section.blocks %}
              {% assign collection = collections[block.settings.collection] %}
              {% assign title = block.settings.title %}
              {% assign image = block.settings.image | default: collection.featured_image %}

              {% assign count = collection.all_products_count %}
              {% assign display_count = count %}

              {% if count >= 2000 %}
                {% assign display_count = '2000+' %}
              {% elsif count >= 1900 %}
                {% assign display_count = '1900+' %}
              {% elsif count >= 1800 %}
                {% assign display_count = '1800+' %}
              {% elsif count >= 1700 %}
                {% assign display_count = '1700+' %}
              {% elsif count >= 1600 %}
                {% assign display_count = '1600+' %}
              {% elsif count >= 1500 %}
                {% assign display_count = '1500+' %}
              {% elsif count >= 1400 %}
                {% assign display_count = '1400+' %}
              {% elsif count >= 1300 %}
                {% assign display_count = '1300+' %}
              {% elsif count >= 1200 %}
                {% assign display_count = '1200+' %}
              {% elsif count >= 1100 %}
                {% assign display_count = '1100+' %}
              {% elsif count >= 1000 %}
                {% assign display_count = '1000+' %}
              {% elsif count >= 900 %}
                {% assign display_count = '900+' %}
              {% elsif count >= 800 %}
                {% assign display_count = '800+' %}
              {% elsif count >= 700 %}
                {% assign display_count = '700+' %}
              {% elsif count >= 600 %}
                {% assign display_count = '600+' %}
              {% elsif count >= 500 %}
                {% assign display_count = '500+' %}
              {% elsif count >= 450 %}
                {% assign display_count = '450+' %}
              {% elsif count >= 400 %}
                {% assign display_count = '400+' %}
              {% elsif count >= 350 %}
                {% assign display_count = '350+' %}
              {% elsif count >= 300 %}
                {% assign display_count = '300+' %}
              {% elsif count >= 250 %}
                {% assign display_count = '250+' %}
              {% elsif count >= 200 %}
                {% assign display_count = '200+' %}
              {% elsif count >= 150 %}
                {% assign display_count = '150+' %}
              {% elsif count >= 100 %}
                {% assign display_count = '100+' %}
              {% elsif count >= 50 %}
                {% assign display_count = '50+' %}
              {% else %}
                {% assign display_count = count %}
              {% endif %}
              
              <div class="swiper-slide" {{ block.shopify_attributes }}>
                <div class="collection-item">
                  <a href="{{ collection.url }}">
                    {% if image != blank %}
                      <img 
                        src="{{ image | image_url: width: 600 }}" 
                        alt="{{ title | escape }}" 
                        class="collection-image"
                        loading="lazy"
                        width="600"
                        height="600"
                      >
                    {% endif %}
                    <div class="collection-overlay">
                      {% if title == blank %}
                        <p class="collection-name">{{ collection.title }}</p>
                        <span class="collection-product_cont">{{ display_count }} Frames</span>
                      {% else %}
                        <p class="collection-name">{{ title }}</p>
                        <span class="collection-product_cont">{{ display_count }} Frames</span>
                      {% endif %}
                    </div>
                  </a>
                </div>
              </div>
            {% endfor %}
          {% endif %}
        </div>
        

        {% if section.settings.show_pagination %}
          <!-- Pagination (dots) -->
          <div class="whistlestop-swiper-pagination collection-slider_pagination"></div>
        {% endif %}

        {% if section.settings.show_arrows %}
          <!-- Navigation buttons -->
          <div class="whistlestop-swiper-button whistlestop-swiper-button-next collection-slider_button-next">
            {{ 'icon-right-arrow.svg' | inline_asset_content }}
          </div>
          <div class="whistlestop-swiper-button whistlestop-swiper-button-prev collection-slider_button-prev">
            {{ 'icon-right-arrow.svg' | inline_asset_content }}
          </div>
        {% endif %}

      </div>
    {% else %}
      <div class="collection-grid">
        {% if section.settings.show_all_collections %}
          {% for collection in collections %}
            {% assign count = collection.all_products_count %}
            {% assign display_count = count %}
            
            {% if count >= 2000 %}
              {% assign display_count = '2000+' %}
            {% elsif count >= 1900 %}
              {% assign display_count = '1900+' %}
            {% elsif count >= 1800 %}
              {% assign display_count = '1800+' %}
            {% elsif count >= 1700 %}
              {% assign display_count = '1700+' %}
            {% elsif count >= 1600 %}
              {% assign display_count = '1600+' %}
            {% elsif count >= 1500 %}
              {% assign display_count = '1500+' %}
            {% elsif count >= 1400 %}
              {% assign display_count = '1400+' %}
            {% elsif count >= 1300 %}
              {% assign display_count = '1300+' %}
            {% elsif count >= 1200 %}
              {% assign display_count = '1200+' %}
            {% elsif count >= 1100 %}
              {% assign display_count = '1100+' %}
            {% elsif count >= 1000 %}
              {% assign display_count = '1000+' %}
            {% elsif count >= 900 %}
              {% assign display_count = '900+' %}
            {% elsif count >= 800 %}
              {% assign display_count = '800+' %}
            {% elsif count >= 700 %}
              {% assign display_count = '700+' %}
            {% elsif count >= 600 %}
              {% assign display_count = '600+' %}
            {% elsif count >= 500 %}
              {% assign display_count = '500+' %}
            {% elsif count >= 450 %}
              {% assign display_count = '450+' %}
            {% elsif count >= 400 %}
              {% assign display_count = '400+' %}
            {% elsif count >= 350 %}
              {% assign display_count = '350+' %}
            {% elsif count >= 300 %}
              {% assign display_count = '300+' %}
            {% elsif count >= 250 %}
              {% assign display_count = '250+' %}
            {% elsif count >= 200 %}
              {% assign display_count = '200+' %}
            {% elsif count >= 150 %}
              {% assign display_count = '150+' %}
            {% elsif count >= 100 %}
              {% assign display_count = '100+' %}
            {% elsif count >= 50 %}
              {% assign display_count = '50+' %}
            {% else %}
              {% assign display_count = count %}
            {% endif %}
            
            <div class="collection-item">
              <a href="{{ collection.url }}">
                {% if collection.featured_image != blank %}
                  <img 
                    src="{{ collection.featured_image | image_url: width: 600 }}" 
                    alt="{{ collection.title | escape }}" 
                    class="collection-image"
                    loading="lazy"
                    width="600"
                    height="600"
                  >
                {% endif %}
                <div class="collection-overlay">
                  <p class="collection-name">{{ collection.title }}</p>
                  <span class="collection-product_cont">{{ display_count }} Frames</span>
                </div>
              </a>
            </div>
          {% endfor %}
        {% else %}
          {% for block in section.blocks %}
            {% assign collection = collections[block.settings.collection] %}
            {% assign title = block.settings.title %}
            {% assign image = block.settings.image | default: collection.featured_image %}

            {% assign count = collection.all_products_count %}
            {% assign display_count = count %}

            {% if count >= 2000 %}
              {% assign display_count = '2000+' %}
            {% elsif count >= 1900 %}
              {% assign display_count = '1900+' %}
            {% elsif count >= 1800 %}
              {% assign display_count = '1800+' %}
            {% elsif count >= 1700 %}
              {% assign display_count = '1700+' %}
            {% elsif count >= 1600 %}
              {% assign display_count = '1600+' %}
            {% elsif count >= 1500 %}
              {% assign display_count = '1500+' %}
            {% elsif count >= 1400 %}
              {% assign display_count = '1400+' %}
            {% elsif count >= 1300 %}
              {% assign display_count = '1300+' %}
            {% elsif count >= 1200 %}
              {% assign display_count = '1200+' %}
            {% elsif count >= 1100 %}
              {% assign display_count = '1100+' %}
            {% elsif count >= 1000 %}
              {% assign display_count = '1000+' %}
            {% elsif count >= 900 %}
              {% assign display_count = '900+' %}
            {% elsif count >= 800 %}
              {% assign display_count = '800+' %}
            {% elsif count >= 700 %}
              {% assign display_count = '700+' %}
            {% elsif count >= 600 %}
              {% assign display_count = '600+' %}
            {% elsif count >= 500 %}
              {% assign display_count = '500+' %}
            {% elsif count >= 450 %}
              {% assign display_count = '450+' %}
            {% elsif count >= 400 %}
              {% assign display_count = '400+' %}
            {% elsif count >= 350 %}
              {% assign display_count = '350+' %}
            {% elsif count >= 300 %}
              {% assign display_count = '300+' %}
            {% elsif count >= 250 %}
              {% assign display_count = '250+' %}
            {% elsif count >= 200 %}
              {% assign display_count = '200+' %}
            {% elsif count >= 150 %}
              {% assign display_count = '150+' %}
            {% elsif count >= 100 %}
              {% assign display_count = '100+' %}
            {% elsif count >= 50 %}
              {% assign display_count = '50+' %}
            {% else %}
              {% assign display_count = count %}
            {% endif %}
            
            <div class="collection-item" {{ block.shopify_attributes }}>
              <a href="{{ collection.url }}">
                {% if image != blank %}
                  <img 
                    src="{{ image | image_url: width: 600 }}" 
                    alt="{{ title | escape }}" 
                    class="collection-image"
                    loading="lazy"
                    width="600"
                    height="600"
                  >
                {% endif %}
                <div class="collection-overlay">
                  {% if title == blank %}
                    <p class="collection-name">{{ collection.title }}</p>
                    <span class="collection-product_cont">{{ display_count }} Frames</span>
                  {% else %}
                    <p class="collection-name">{{ title }}</p>
                    <span class="collection-product_cont">{{ display_count }} Frames</span>
                  {% endif %}
                </div>
              </a>
            </div>
          {% endfor %}
        {% endif %}
      </div>
    {% endif %}
    
    {% if section.settings.button_label != blank %}
      <div class="whistlestopprints-theme-btn">
        <a href="{{ section.settings.button_link }}">{{ section.settings.button_label }}</a>
        {{ 'icon-right-arrow.svg' | inline_asset_content }}
      </div>
    {% endif %}
  </div>
</section>

{% if section.settings.enable_slider %}
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      var swiper = new Swiper('.collection-slider-{{ section.id }}', {
        slidesPerView: {{ section.settings.slides_per_view_desktop }},
        spaceBetween: 24,
        loop: {{ section.settings.loop }},
        {% if section.settings.autoplay %}
          autoplay: {
            delay: {{ section.settings.autoplay_delay }},
            disableOnInteraction: false,
          },
        {% endif %}
        {% if section.settings.show_pagination %}
          pagination: {
            el: '.collection-slider_pagination',
            clickable: true,
          },
        {% endif %}
        {% if section.settings.show_arrows %}
          navigation: {
            nextEl: '.collection-slider_button-next',
            prevEl: '.collection-slider_button-prev',
          },
        {% endif %}
        breakpoints: {
          320: {
            slidesPerView: {{ section.settings.slides_per_view_mobile }}.5,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: {{ section.settings.slides_per_view_tablet }}.5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: {{ section.settings.slides_per_view_desktop }}.5,
            spaceBetween: 24,
          }
        }
      });
    });
  </script>
{% endif %}

{% schema %}
{
  "name": "Collection Grid",
  "settings": [
    {
      "type": "text",
      "id": "section_id",
      "label": "Add Custom Section ID",
      "default": "section-name"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#fff"
    },
    {
      "type": "text",
      "id": "heading",
      "default": "Shop by collection",
      "label": "Heading"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        {
          "value": "h2",
          "label": "t:sections.all.heading_size.options__1.label"
        },
        {
          "value": "h1",
          "label": "t:sections.all.heading_size.options__2.label"
        },
        {
          "value": "h0",
          "label": "t:sections.all.heading_size.options__3.label"
        },
        {
          "value": "hxl",
          "label": "t:sections.all.heading_size.options__4.label"
        },
        {
          "value": "hxxl",
          "label": "t:sections.all.heading_size.options__5.label"
        }
      ],
      "default": "h1",
      "label": "t:sections.all.heading_size.label"
    },
    {
      "type": "richtext",
      "id": "description",
      "default": "<p>Explore prints from Britain's most beloved destinations</p>",
      "label": "Description"
    },
    {
      "type": "select",
      "id": "content_align",
      "options": [
        {
          "label": "left",
          "value": "left"
        },
        {
          "label": "center",
          "value": "center"
        },
        {
          "label": "right",
          "value": "right",
        }
      ],
      "default": "left",
      "label": "Content Alignment"
    },
    {
      "type": "checkbox",
      "id": "show_all_collections",
      "label": "Show All Collections",
      "default": false,
      "info": "When enabled, all collections will be displayed automatically"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4,
      "label": "Columns on desktop"
    },
    {
      "type": "range",
      "id": "columns_tablet",
      "min": 1,
      "max": 3,
      "step": 1,
      "default": 2,
      "label": "Columns on tablet"
    },
    {
      "type": "range",
      "id": "columns_mobile",
      "min": 1,
      "max": 3,
      "step": 1,
      "default": 1,
      "label": "Columns on mobile"
    },
    {
      "type": "text",
      "id": "button_label",
      "default": "View All collections",
      "label": "Button label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    },
    {
      "type": "header",
      "content": "Slider Settings"
    },
    {
      "type": "checkbox",
      "id": "enable_slider",
      "label": "Enable Slider",
      "default": false
    },
    {
      "type": "range",
      "id": "slides_per_view_desktop",
      "min": 1,
      "max": 6,
      "step": 1,
      "default": 4,
      "label": "Slides per view (Desktop)"
    },
    {
      "type": "range",
      "id": "slides_per_view_tablet",
      "min": 1,
      "max": 4,
      "step": 1,
      "default": 2,
      "label": "Slides per view (Tablet)"
    },
    {
      "type": "range",
      "id": "slides_per_view_mobile",
      "min": 1,
      "max": 3,
      "step": 1,
      "default": 1,
      "label": "Slides per view (Mobile)"
    },
    {
      "type": "checkbox",
      "id": "show_arrows",
      "label": "Show Navigation Arrows",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_pagination",
      "label": "Show Pagination Dots",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "autoplay",
      "label": "Autoplay",
      "default": false
    },
    {
      "type": "range",
      "id": "autoplay_delay",
      "min": 1000,
      "max": 8000,
      "step": 500,
      "default": 3000,
      "label": "Autoplay Delay (ms)"
    },
    {
      "type": "checkbox",
      "id": "loop",
      "label": "Loop Slides",
      "default": true
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 36
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        },
        {
          "type": "text",
          "id": "title",
          "label": "collection name",
          "default": "Yorkshire"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "Custom image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collection Grid",
      "blocks": [
        {
          "type": "collection",
          "settings": {
            "title": "Collection Name"
          }
        },
        {
          "type": "collection",
          "settings": {
            "title": "Collection Name"
          }
        },
        {
          "type": "collection",
          "settings": {
            "title": "Collection Name"
          }
        },
        {
          "type": "collection",
          "settings": {
            "title": "Collection Name"
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "collection-slider-with-tabs",
        slug: "collection-slider-with-tabs",
        title: "Collection Slider with Tabs",
        platform: "shopify",
        category: "Collection",
        language: "liquid",
        ext: ".liquid",
        description: "Display a collection slider with tab navigation for different collections, allowing users to switch between collections easily.",
        tags: ["collection", "liquid", "slider", "tabs"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 230,
        demoUrl: "",
        seoKeywords: ["collection", "liquid", "slider", "tabs"],
        code: `<section
  id="CollectionSlider-{{ section.id }}"
  class="collection-slider-section is-loading"
  style="
    --collection-slider-bg: {{ section.settings.background_color }};
    --collection-slider-text: {{ section.settings.text_color }};
    --collection-slider-accent: {{ section.settings.accent_color }};
    --collection-slider-card-radius: {{ section.settings.card_radius }}px;
    --collection-slider-padding-top: {{ section.settings.padding_top }}px;
    --collection-slider-padding-bottom: {{ section.settings.padding_bottom }}px;
  "
>
  <div class="page-width">
    {% if section.settings.heading != blank or section.settings.subheading != blank %}
      <div class="collection-slider-header">
        <div class="collection-slider-heading-wrap">
          {% if section.settings.eyebrow != blank %}
            <div class="collection-slider-eyebrow">
              {{ section.settings.eyebrow }}
            </div>
          {% endif %}

          {% if section.settings.heading != blank %}
            <h2 class="collection-slider-heading">
              {{ section.settings.heading }}
            </h2>
          {% endif %}

          {% if section.settings.subheading != blank %}
            <div class="collection-slider-subheading">
              {{ section.settings.subheading }}
            </div>
          {% endif %}
        </div>

        {% if section.settings.show_view_all and section.settings.view_all_url != blank %}
          <a
            href="{{ section.settings.view_all_url }}"
            class="collection-slider-view-all"
          >
            {{ section.settings.view_all_text }}
            <span aria-hidden="true">→</span>
          </a>
        {% endif %}
      </div>
    {% endif %}

    {% if section.settings.show_tabs %}
      {% assign unique_tabs = '' %}
      {% assign tab_list = '' %}
      
      {% for block in section.blocks %}
        {% assign collection = block.settings.collection %}
        {% if collection != blank and block.settings.tab_label != blank %}
          {% assign tab_label = block.settings.tab_label | strip %}
          {% unless tab_list contains tab_label %}
            {% assign tab_list = tab_list | append: tab_label | append: '|' %}
            {% assign unique_tabs = unique_tabs | append: tab_label | append: '|' %}
          {% endunless %}
        {% endif %}
      {% endfor %}
      
      {% assign unique_tabs_array = unique_tabs | split: '|' %}
      
      {% if unique_tabs_array.size > 0 %}
        <div class="collection-tabs-wrapper">
          <div class="collection-tabs" role="tablist">
            <button 
              class="collection-tab active" 
              data-tab="all" 
              role="tab" 
              aria-selected="true"
              aria-controls="tabpanel-all"
              id="tab-all"
            >
              {{ section.settings.all_tab_label }}
            </button>
            
            {% for tab in unique_tabs_array %}
              {% if tab != blank %}
                <button 
                  class="collection-tab" 
                  data-tab="{{ tab | handleize }}" 
                  role="tab" 
                  aria-selected="false"
                  aria-controls="tabpanel-{{ tab | handleize }}"
                  id="tab-{{ tab | handleize }}"
                >
                  {{ tab }}
                </button>
              {% endif %}
            {% endfor %}
          </div>
        </div>
      {% endif %}
    {% endif %}

    <div class="collection-slider-wrapper">
      <div
        class="swiper collection-swiper-{{ section.id }}"
        data-section-id="{{ section.id }}"
      >
        <div class="swiper-wrapper">
          {% for block in section.blocks %}
            {% assign collection = block.settings.collection %}
            {% if collection != blank %}
              {% assign collection_image = collection.image %}
              {% if collection_image == blank and collection.products.first.featured_image != blank %}
                {% assign collection_image = collection.products.first.featured_image %}
              {% endif %}
              
              {% assign tab_value = 'all' %}
              {% if block.settings.tab_label != blank %}
                {% assign tab_value = block.settings.tab_label | handleize %}
              {% endif %}

              <div
                class="swiper-slide collection-slide"
                data-tab="{{ tab_value }}"
                data-tab-label="{{ block.settings.tab_label }}"
                {{ block.shopify_attributes }}
              >
                <a
                  href="{{ collection.url }}"
                  class="collection-card"
                  aria-label="Shop {{ collection.title | escape }}"
                >
                  <div class="collection-card-image">
                    {% if collection_image != blank %}
                      {{
                        collection_image
                        | image_url: width: 1200
                        | image_tag:
                          loading: 'lazy',
                          widths: '375, 550, 750, 900, 1200',
                          sizes: '(min-width: 1200px) 25vw, (min-width: 750px) 33vw, 80vw',
                          class: 'collection-card-img',
                          alt: collection_image.alt | default: collection.title | escape
                      }}
                    {% else %}
                      <div class="collection-card-placeholder">
                        {{ 'collection-1' | placeholder_svg_tag: 'placeholder-svg' }}
                      </div>
                    {% endif %}

                    {% if section.settings.show_overlay %}
                      <div class="collection-card-overlay"></div>
                    {% endif %}

                    {% if section.settings.show_collection_count %}
                      <div class="collection-card-count">
                        {{ collection.products_count }}
                        {% if collection.products_count == 1 %}
                          Product
                        {% else %}
                          Products
                        {% endif %}
                      </div>
                    {% endif %}

                    {% if block.settings.tab_label != blank and section.settings.show_tab_badge %}
                      <div class="collection-card-badge">
                        {{ block.settings.tab_label }}
                      </div>
                    {% endif %}
                  </div>

                  <div class="collection-card-content">
                    <div class="collection-card-title-wrap">
                      <h3 class="collection-card-title">
                        {{ collection.title }}
                      </h3>
                      {% if section.settings.show_arrow %}
                        <span
                          class="collection-card-arrow"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      {% endif %}
                    </div>

                    {% if section.settings.show_shop_text %}
                      <span class="collection-card-link">
                        {{ section.settings.shop_text }}
                      </span>
                    {% endif %}
                  </div>
                </a>
              </div>
            {% endif %}
          {% endfor %}
        </div>

        {% if section.settings.show_navigation %}
          <button
            class="collection-slider-button collection-slider-button-prev"
            type="button"
            aria-label="Previous collection"
          >
            <span aria-hidden="true">
                <svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M65.3 14.7L34.7 50l30.6 35.3-2.6 2.6L29.4 50l33.3-37.9 2.6 2.6z" class="arrow"></path></svg>
            </span>
          </button>
          <button
            class="collection-slider-button collection-slider-button-next"
            type="button"
            aria-label="Next collection"
          >
            <span aria-hidden="true">
                <svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M65.3 14.7L34.7 50l30.6 35.3-2.6 2.6L29.4 50l33.3-37.9 2.6 2.6z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>
            </span>
          </button>
        {% endif %}

        {% if section.settings.show_pagination %}
          <div class="collection-slider-pagination"></div>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================
     BASE SECTION
  ========================================= */
  #CollectionSlider-{{ section.id }} {
    background: var(--collection-slider-bg);
    color: var(--collection-slider-text);
    padding-top: var(--collection-slider-padding-top);
    padding-bottom: var(--collection-slider-padding-bottom);
    overflow: hidden;
    transition: opacity 0.4s ease;
  }

  /* =========================================
     SKELETON LOADING STATE
  ========================================= */
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-img,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-placeholder,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-title,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-count,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-arrow,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-link {
    opacity: 0;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-image {
    background: #e8e8e8;
    position: relative;
    overflow: hidden;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-content {
    opacity: 0.2;
    background: #f0f0f0;
    border-radius: 4px;
    min-height: 60px;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-title-wrap,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-link {
    visibility: hidden;
  }

  /* =========================================
     HEADER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 30px;
    margin-bottom: 35px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-heading-wrap {
    max-width: 750px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-eyebrow {
    margin-bottom: 10px;
    color: var(--collection-slider-accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.15em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-heading {
    margin: 0;
    color: var(--collection-slider-text);
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.05;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-subheading {
    max-width: 620px;
    margin-top: 14px;
    color: var(--collection-slider-text);
    font-size: 18px;
    line-height: 1.6;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-view-all {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: var(--collection-slider-text);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: gap 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-view-all:hover {
    gap: 16px;
  }

  /* =========================================
     TABS - Unique tabs only
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-tabs-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
  }

  #CollectionSlider-{{ section.id }} .collection-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 6px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.04);
  }

  #CollectionSlider-{{ section.id }} .collection-tab {
    padding: 10px 28px;
    border: none;
    border-radius: 50px;
    background: transparent;
    color: var(--collection-slider-text);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    letter-spacing: 0.02em;
    opacity: 0.6;
  }

  #CollectionSlider-{{ section.id }} .collection-tab:hover {
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.04);
  }

  #CollectionSlider-{{ section.id }} .collection-tab.active {
    background: var(--collection-slider-accent);
    color: var(--collection-slider-bg);
    opacity: 1;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  #CollectionSlider-{{ section.id }} .collection-tab.active:hover {
    background: var(--collection-slider-accent);
    opacity: 0.9;
  }

  /* =========================================
     SWIPER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-swiper-{{ section.id }} {
    overflow: visible;
  }

  #CollectionSlider-{{ section.id }} .swiper-wrapper {
    align-items: stretch;
  }

  #CollectionSlider-{{ section.id }} .collection-slide {
    height: auto;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slide.hidden-slide {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
    display: none !important;
  }

  .collection-slider-wrapper {
    overflow: hidden;
  }

  /* =========================================
     CARD
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--collection-slider-card-radius);
    color: inherit;
    text-decoration: none;
  }

  #CollectionSlider-{{ section.id }} .collection-card-image {
    position: relative;
    width: 100%;
    aspect-ratio: {{ section.settings.image_ratio }};
    overflow: hidden;
    background: #f2f2f2;
  }

  #CollectionSlider-{{ section.id }} .collection-card-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.4s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-card:hover .collection-card-img {
    transform: scale(1.03);
  }

  /* =========================================
     OVERLAY
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 45%,
      rgba(0,0,0,0.42) 100%
    );
    pointer-events: none;
  }

  /* =========================================
     PRODUCT COUNT
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-count {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    padding: 5px 10px;
    border: 1px solid rgb(94 94 94 / 25%);
    border-radius: 100px;
    background: rgb(255 255 255 / 74%);
    backdrop-filter: blur(12px);
    color: #000000;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  /* =========================================
     TAB BADGE
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 2;
    padding: 5px 14px;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* =========================================
     CARD CONTENT
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding: 18px 2px 0;
  }

  #CollectionSlider-{{ section.id }} .collection-card-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }

  #CollectionSlider-{{ section.id }} .collection-card-title {
    margin: 0;
    color: var(--collection-slider-text);
    font-size: {{ section.settings.title_size }}px;
    font-weight: 600;
    line-height: 1.25;
    /* Title ellipsis after 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  #CollectionSlider-{{ section.id }} .collection-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border: 1px solid currentColor;
    border-radius: 50%;
    opacity: 0.6;
    font-size: 16px;
    rotate: -30deg;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-card:hover .collection-card-arrow {
    opacity: 1;
  }

  #CollectionSlider-{{ section.id }} .collection-card-link {
    color: var(--collection-slider-accent);
    font-size: 13px;
    font-weight: 600;
  }

  /* =========================================
     PLACEHOLDER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-placeholder {
    width: 100%;
    height: 100%;
  }

  #CollectionSlider-{{ section.id }} .collection-card-placeholder svg {
    width: 100%;
    height: 100%;
  }

  /* =========================================
     NAVIGATION
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-button {
    position: absolute;
    top: 36%;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    color: #111;
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      opacity 0.25s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button svg{
    height: 40%;
    left: 30%;
    top: 30%;
    width: 40%;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button:hover {
    background: #fff;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button-prev {
    left: 0;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button-next {
    right: 0;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  /* =========================================
     PAGINATION
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-pagination {
    position: relative;
    bottom: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 30px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-pagination .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    margin: 0 !important;
    border-radius: 50%;
    background: var(--collection-slider-text);
    opacity: 0.25;
    transition:
      width 0.3s ease,
      opacity 0.3s ease,
      border-radius 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-pagination .swiper-pagination-bullet-active {
    width: 26px;
    border-radius: 10px;
    background: var(--collection-slider-accent);
    opacity: 1;
  }

  /* =========================================
     TABLET
  ========================================= */
  @media screen and (max-width: 989px) {
    #CollectionSlider-{{ section.id }} .collection-slider-header {
      margin-bottom: 28px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-button {
      width: 42px;
      height: 42px;
    }

    #CollectionSlider-{{ section.id }} .collection-tabs-wrapper {
      margin-bottom: 28px;
    }

    #CollectionSlider-{{ section.id }} .collection-tab {
      padding: 8px 20px;
      font-size: 13px;
    }
  }

  /* =========================================
     MOBILE
  ========================================= */
  @media screen and (max-width: 749px) {
    #CollectionSlider-{{ section.id }} {
      padding-top: calc(var(--collection-slider-padding-top) * 0.7);
      padding-bottom: calc(var(--collection-slider-padding-bottom) * 0.7);
    }

    #CollectionSlider-{{ section.id }} .collection-slider-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 22px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-heading {
      font-size: 34px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-subheading {
      margin-top: 10px;
      font-size: 14px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-view-all {
      font-size: 13px;
    }

    #CollectionSlider-{{ section.id }} .collection-card-content {
      padding-top: 14px;
    }

    #CollectionSlider-{{ section.id }} .collection-card-title {
      font-size: 17px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-button {
      display: none;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-pagination {
      margin-top: 22px;
    }

    #CollectionSlider-{{ section.id }} .collection-tabs-wrapper {
      margin-bottom: 22px;
      overflow-x: auto;
      padding: 4px 0;
      scrollbar-width: none;
    }

    #CollectionSlider-{{ section.id }} .collection-tabs-wrapper::-webkit-scrollbar {
      display: none;
    }

    #CollectionSlider-{{ section.id }} .collection-tabs {
      flex-wrap: nowrap;
      border-radius: 30px;
      padding: 4px;
      gap: 4px;
    }

    #CollectionSlider-{{ section.id }} .collection-tab {
      padding: 8px 16px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  /* =========================================
     REDUCED MOTION
  ========================================= */
  @media (prefers-reduced-motion: reduce) {
    #CollectionSlider-{{ section.id }} .collection-card-img,
    #CollectionSlider-{{ section.id }} .collection-card-arrow,
    #CollectionSlider-{{ section.id }}.is-loading .collection-card-image::after {
      animation: none !important;
      transition: none !important;
    }
  }
</style>

<script>
  (function() {
    const sectionId = '{{ section.id }}';
    let currentTab = 'all';
    let swiperInstance = null;

    function initCollectionSlider() {
      const section = document.getElementById('CollectionSlider-' + sectionId);
      if (!section) return;

      const slider = section.querySelector('.collection-swiper-' + sectionId);
      if (!slider) return;

      // Destroy existing Swiper instance
      if (slider.swiper) {
        slider.swiper.destroy(true, true);
      }

      const slidesCount = slider.querySelectorAll('.swiper-slide').length;
      if (slidesCount === 0) return;

      const prevButton = section.querySelector('.collection-slider-button-prev');
      const nextButton = section.querySelector('.collection-slider-button-next');
      const pagination = section.querySelector('.collection-slider-pagination');

      const swiperOptions = {
        slidesPerView: {{ section.settings.mobile_slides }},
        spaceBetween: {{ section.settings.mobile_gap }},
        speed: {{ section.settings.transition_speed }},
        grabCursor: true,
        watchOverflow: true,
        loop: {{ section.settings.enable_loop }},
        autoplay: {% if section.settings.enable_autoplay %}{
            delay: {{ section.settings.autoplay_delay }},
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }{% else %}false{% endif %},
        breakpoints: {
          750: {
            slidesPerView: {{ section.settings.tablet_slides }},
            spaceBetween: {{ section.settings.tablet_gap }}
          },
          990: {
            slidesPerView: {{ section.settings.desktop_slides }},
            spaceBetween: {{ section.settings.desktop_gap }}
          }
        }
      };

      {% if section.settings.show_navigation %}
        swiperOptions.navigation = {
          prevEl: prevButton,
          nextEl: nextButton
        };
      {% endif %}

      {% if section.settings.show_pagination %}
        swiperOptions.pagination = {
          el: pagination,
          clickable: true
        };
      {% endif %}

      swiperInstance = new Swiper(slider, swiperOptions);

      // Remove skeleton loading state after images load
      function removeSkeleton() {
        if (section.classList.contains('is-loading')) {
          section.classList.remove('is-loading');
        }
      }

      // Wait for all images inside the section to load
      const images = section.querySelectorAll('img');
      let loaded = 0;
      const total = images.length;

      if (total === 0) {
        removeSkeleton();
      } else {
        function onImageLoad() {
          loaded++;
          if (loaded === total) {
            removeSkeleton();
          }
        }
        images.forEach(img => {
          if (img.complete) {
            onImageLoad();
          } else {
            img.addEventListener('load', onImageLoad);
            img.addEventListener('error', onImageLoad);
          }
        });
        setTimeout(removeSkeleton, 5000);
      }
    }

    function filterCollections(tabId) {
      const section = document.getElementById('CollectionSlider-' + sectionId);
      if (!section) return;

      const slides = section.querySelectorAll('.collection-slide');
      const tabs = section.querySelectorAll('.collection-tab');
      let hasVisibleSlides = false;

      // Update active tab
      tabs.forEach(tab => {
        if (tab.dataset.tab === tabId) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });

      currentTab = tabId;

      // Filter slides
      slides.forEach((slide) => {
        const slideTab = slide.dataset.tab || 'all';
        const shouldShow = tabId === 'all' || slideTab === tabId;

        if (shouldShow) {
          slide.classList.remove('hidden-slide');
          slide.style.display = '';
          hasVisibleSlides = true;
        } else {
          slide.classList.add('hidden-slide');
          slide.style.display = 'none';
        }
      });

      // Update Swiper after filtering
      if (swiperInstance) {
        swiperInstance.update();
        // If using loop, update loop too
        if (swiperInstance.params.loop) {
          swiperInstance.loopDestroy();
          swiperInstance.loopCreate();
          swiperInstance.update();
        }
        // Reset to first slide
        swiperInstance.slideTo(0);
      }

      // Show/hide navigation based on visible slides
      const navButtons = section.querySelectorAll('.collection-slider-button');
      if (navButtons.length > 0) {
        navButtons.forEach(btn => {
          if (hasVisibleSlides && slides.length > 1) {
            btn.style.display = 'flex';
          } else {
            btn.style.display = 'none';
          }
        });
      }

      // Show/hide pagination based on visible slides
      const pagination = section.querySelector('.collection-slider-pagination');
      if (pagination) {
        if (hasVisibleSlides && slides.length > 1) {
          pagination.style.display = 'flex';
        } else {
          pagination.style.display = 'none';
        }
      }
    }

    function initTabs() {
      const section = document.getElementById('CollectionSlider-' + sectionId);
      if (!section) return;

      const tabs = section.querySelectorAll('.collection-tab');

      tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
          const tabId = this.dataset.tab;
          filterCollections(tabId);
        });

        // Keyboard accessibility
        tab.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const tabId = this.dataset.tab;
            filterCollections(tabId);
          }
        });
      });

      // Apply initial filter (show all)
      filterCollections('all');
    }

    function waitForSwiper() {
      if (typeof Swiper !== 'undefined') {
        initCollectionSlider();
        initTabs();
      } else {
        setTimeout(waitForSwiper, 100);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForSwiper);
    } else {
      waitForSwiper();
    }

    // Shopify Theme Editor events
    document.addEventListener('shopify:section:load', function(event) {
      if (event.detail.sectionId === sectionId) {
        setTimeout(function() {
          initCollectionSlider();
          initTabs();
        }, 100);
      }
    });

    document.addEventListener('shopify:section:unload', function(event) {
      if (event.detail.sectionId !== sectionId) return;
      const section = document.getElementById('CollectionSlider-' + sectionId);
      const slider = section?.querySelector('.collection-swiper-' + sectionId);
      if (slider?.swiper) {
        slider.swiper.destroy(true, true);
      }
    });

    document.addEventListener('shopify:block:select', function(event) {
      if (
        event.detail.sectionId === sectionId &&
        event.target.closest('#CollectionSlider-' + sectionId)
      ) {
        const slider = document.querySelector('.collection-swiper-' + sectionId);
        if (slider?.swiper) {
          const slide = event.target.closest('.swiper-slide');
          if (slide) {
            const allSlides = slider.querySelectorAll('.swiper-slide:not(.hidden-slide)');
            const index = Array.from(allSlides).indexOf(slide);
            if (index >= 0) {
              slider.swiper.slideTo(index);
            }
          }
        }
      }
    });
  })();
</script>

{% schema %}
{
  "name": "Collection Slider",
  "tag": "section",
  "class": "section-collection-slider",
  "settings": [
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow",
      "default": "Explore"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Shop by Collection"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "default": "Discover our carefully curated collections."
    },
    {
      "type": "checkbox",
      "id": "show_view_all",
      "label": "Show view all link",
      "default": true
    },
    {
      "type": "text",
      "id": "view_all_text",
      "label": "View all text",
      "default": "View all collections"
    },
    {
      "type": "url",
      "id": "view_all_url",
      "label": "View all URL"
    },
    {
      "type": "header",
      "content": "Tabs"
    },
    {
      "type": "checkbox",
      "id": "show_tabs",
      "label": "Show tabs",
      "default": false,
      "info": "Enable tab filtering for collections"
    },
    {
      "type": "text",
      "id": "all_tab_label",
      "label": "All tab label",
      "default": "All"
    },
    {
      "type": "checkbox",
      "id": "show_tab_badge",
      "label": "Show tab badge on cards",
      "default": true,
      "info": "Display the tab label as a badge on each collection card"
    },
    {
      "type": "header",
      "content": "Collections"
    },
    {
      "type": "paragraph",
      "content": "Add collection blocks below and select a Shopify collection for each card. Multiple collections with the same Tab Label will be grouped under one tab."
    },
    {
      "type": "header",
      "content": "Slider"
    },
    {
      "type": "range",
      "id": "desktop_slides",
      "label": "Desktop slides",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4
    },
    {
      "type": "range",
      "id": "tablet_slides",
      "label": "Tablet slides",
      "min": 1,
      "max": 4,
      "step": 0.5,
      "default": 2.5
    },
    {
      "type": "range",
      "id": "mobile_slides",
      "label": "Mobile slides",
      "min": 1,
      "max": 2,
      "step": 0.1,
      "default": 1
    },
    {
      "type": "range",
      "id": "desktop_gap",
      "label": "Desktop gap",
      "min": 8,
      "max": 50,
      "step": 2,
      "unit": "px",
      "default": 24
    },
    {
      "type": "range",
      "id": "tablet_gap",
      "label": "Tablet gap",
      "min": 8,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 18
    },
    {
      "type": "range",
      "id": "mobile_gap",
      "label": "Mobile gap",
      "min": 8,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 14
    },
    {
      "type": "range",
      "id": "transition_speed",
      "label": "Transition speed",
      "min": 300,
      "max": 1200,
      "step": 50,
      "unit": "ms",
      "default": 700
    },
    {
      "type": "checkbox",
      "id": "enable_loop",
      "label": "Enable infinite loop",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_autoplay",
      "label": "Enable autoplay",
      "default": false
    },
    {
      "type": "range",
      "id": "autoplay_delay",
      "label": "Autoplay delay",
      "min": 2000,
      "max": 9000,
      "step": 500,
      "unit": "ms",
      "default": 5000
    },
    {
      "type": "header",
      "content": "Navigation"
    },
    {
      "type": "checkbox",
      "id": "show_navigation",
      "label": "Show navigation arrows",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_pagination",
      "label": "Show pagination",
      "default": true
    },
    {
      "type": "header",
      "content": "Card"
    },
    {
      "type": "select",
      "id": "image_ratio",
      "label": "Image ratio",
      "options": [
        { "value": "1/1", "label": "Square" },
        { "value": "4/5", "label": "Portrait" },
        { "value": "3/4", "label": "Tall portrait" },
        { "value": "4/3", "label": "Landscape" },
        { "value": "16/9", "label": "Wide" }
      ],
      "default": "4/5"
    },
    {
      "type": "range",
      "id": "title_size",
      "label": "Title size",
      "min": 14,
      "max": 30,
      "step": 1,
      "unit": "px",
      "default": 20
    },
    {
      "type": "range",
      "id": "card_radius",
      "label": "Card radius",
      "min": 0,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 0
    },
    {
      "type": "checkbox",
      "id": "show_collection_count",
      "label": "Show product count",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_shop_text",
      "label": "Show shop text",
      "default": false
    },
    {
      "type": "text",
      "id": "shop_text",
      "label": "Shop text",
      "default": "Shop collection"
    },
    {
      "type": "checkbox",
      "id": "show_arrow",
      "label": "Show arrow",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_overlay",
      "label": "Show image overlay",
      "default": false
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background",
      "default": "#FFFFFF"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent",
      "default": "#111111"
    },
    {
      "type": "header",
      "content": "Layout"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Top spacing",
      "min": 0,
      "max": 150,
      "step": 5,
      "unit": "px",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Bottom spacing",
      "min": 0,
      "max": 150,
      "step": 5,
      "unit": "px",
      "default": 80
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        },
        {
          "type": "text",
          "id": "tab_label",
          "label": "Tab Label",
          "default": "",
          "info": "Add a label to group this collection under a specific tab. All collections with the same label will appear under one tab. Leave empty to show only under 'All'."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collection Slider with Tabs",
      "settings": {
        "show_tabs": true,
        "all_tab_label": "All",
        "show_tab_badge": true
      },
      "blocks": [
        {
          "type": "collection",
          "settings": {
            "tab_label": "Clothes"
          }
        },
        {
          "type": "collection",
          "settings": {
            "tab_label": "Clothes"
          }
        },
        {
          "type": "collection",
          "settings": {
            "tab_label": "Furniture"
          }
        },
        {
          "type": "collection",
          "settings": {
            "tab_label": "Furniture"
          }
        },
        {
          "type": "collection",
          "settings": {
            "tab_label": "Accessories"
          }
        },
        {
          "type": "collection",
          "settings": {
            "tab_label": "Accessories"
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "collection-slider",
        slug: "collection-slider",
        title: "Collection Slider",
        platform: "shopify",
        category: "Collection",
        language: "liquid",
        ext: ".liquid",
        description: "A responsive collection slider section for Shopify, allowing you to showcase multiple collections in a carousel format. Features include optional tabs for filtering collections, customizable slide counts and gaps for different screen sizes, autoplay, navigation arrows, pagination, and various styling options for the cards.",
        tags: ["collection", "liquid", "slider", "carousel", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["collection", "liquid", "slider", "carousel", "shopify"],
        code: `<section
  id="CollectionSlider-{{ section.id }}"
  class="collection-slider-section is-loading"
  style="
    --collection-slider-bg: {{ section.settings.background_color }};
    --collection-slider-text: {{ section.settings.text_color }};
    --collection-slider-accent: {{ section.settings.accent_color }};
    --collection-slider-card-radius: {{ section.settings.card_radius }}px;
    --collection-slider-padding-top: {{ section.settings.padding_top }}px;
    --collection-slider-padding-bottom: {{ section.settings.padding_bottom }}px;
  "
>
  <div class="page-width">
    {% if section.settings.heading != blank or section.settings.subheading != blank %}
      <div class="collection-slider-header">
        <div class="collection-slider-heading-wrap">
          {% if section.settings.eyebrow != blank %}
            <div class="collection-slider-eyebrow">
              {{ section.settings.eyebrow }}
            </div>
          {% endif %}

          {% if section.settings.heading != blank %}
            <h2 class="collection-slider-heading">
              {{ section.settings.heading }}
            </h2>
          {% endif %}

          {% if section.settings.subheading != blank %}
            <div class="collection-slider-subheading">
              {{ section.settings.subheading }}
            </div>
          {% endif %}
        </div>

        {% if section.settings.show_view_all and section.settings.view_all_url != blank %}
          <a
            href="{{ section.settings.view_all_url }}"
            class="collection-slider-view-all"
          >
            {{ section.settings.view_all_text }}
            <span aria-hidden="true">→</span>
          </a>
        {% endif %}
      </div>
    {% endif %}

    <div class="collection-slider-wrapper">
      <div
        class="swiper collection-swiper-{{ section.id }}"
        data-section-id="{{ section.id }}"
      >
        <div class="swiper-wrapper">
          {% for block in section.blocks %}
            {% assign collection = block.settings.collection %}
            {% if collection != blank %}
              {% assign collection_image = collection.image %}
              {% if collection_image == blank and collection.products.first.featured_image != blank %}
                {% assign collection_image = collection.products.first.featured_image %}
              {% endif %}

              <div
                class="swiper-slide collection-slide"
                {{ block.shopify_attributes }}
              >
                <a
                  href="{{ collection.url }}"
                  class="collection-card"
                  aria-label="Shop {{ collection.title | escape }}"
                >
                  <div class="collection-card-image">
                    {% if collection_image != blank %}
                      {{
                        collection_image
                        | image_url: width: 1200
                        | image_tag:
                          loading: 'lazy',
                          widths: '375, 550, 750, 900, 1200',
                          sizes: '(min-width: 1200px) 25vw, (min-width: 750px) 33vw, 80vw',
                          class: 'collection-card-img',
                          alt: collection_image.alt | default: collection.title | escape
                      }}
                    {% else %}
                      <div class="collection-card-placeholder">
                        {{ 'collection-1' | placeholder_svg_tag: 'placeholder-svg' }}
                      </div>
                    {% endif %}

                    {% if section.settings.show_overlay %}
                      <div class="collection-card-overlay"></div>
                    {% endif %}

                    {% if section.settings.show_collection_count %}
                      <div class="collection-card-count">
                        {{ collection.products_count }}
                        {% if collection.products_count == 1 %}
                          Product
                        {% else %}
                          Products
                        {% endif %}
                      </div>
                    {% endif %}
                  </div>

                  <div class="collection-card-content">
                    <div class="collection-card-title-wrap">
                      <h3 class="collection-card-title">
                        {{ collection.title }}
                      </h3>
                      {% if section.settings.show_arrow %}
                        <span
                          class="collection-card-arrow"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      {% endif %}
                    </div>

                    {% if section.settings.show_shop_text %}
                      <span class="collection-card-link">
                        {{ section.settings.shop_text }}
                      </span>
                    {% endif %}
                  </div>
                </a>
              </div>
            {% endif %}
          {% endfor %}
        </div>

        {% if section.settings.show_navigation %}
          <button
            class="collection-slider-button collection-slider-button-prev"
            type="button"
            aria-label="Previous collection"
          >
            <span aria-hidden="true">
                <svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M65.3 14.7L34.7 50l30.6 35.3-2.6 2.6L29.4 50l33.3-37.9 2.6 2.6z" class="arrow"></path></svg>
            </span>
          </button>
          <button
            class="collection-slider-button collection-slider-button-next"
            type="button"
            aria-label="Next collection"
          >
            <span aria-hidden="true">
                <svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M65.3 14.7L34.7 50l30.6 35.3-2.6 2.6L29.4 50l33.3-37.9 2.6 2.6z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>
            </span>
          </button>
        {% endif %}

        {% if section.settings.show_pagination %}
          <div class="collection-slider-pagination"></div>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================
     BASE SECTION
  ========================================= */
  #CollectionSlider-{{ section.id }} {
    background: var(--collection-slider-bg);
    color: var(--collection-slider-text);
    padding-top: var(--collection-slider-padding-top);
    padding-bottom: var(--collection-slider-padding-bottom);
    overflow: hidden;
    transition: opacity 0.4s ease;
  }

  /* =========================================
     SKELETON LOADING STATE
  ========================================= */
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-img,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-placeholder,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-title,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-count,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-arrow,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-link {
    opacity: 0;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-image {
    background: #e8e8e8;
    position: relative;
    overflow: hidden;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-content {
    opacity: 0.2;
    background: #f0f0f0;
    border-radius: 4px;
    min-height: 60px;
  }

  #CollectionSlider-{{ section.id }}.is-loading .collection-card-title-wrap,
  #CollectionSlider-{{ section.id }}.is-loading .collection-card-link {
    visibility: hidden;
  }

  /* =========================================
     HEADER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-header {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 30px;
    margin-bottom: 35px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-heading-wrap {
    max-width: 750px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-eyebrow {
    margin-bottom: 10px;
    color: var(--collection-slider-accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.15em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-heading {
    margin: 0;
    color: var(--collection-slider-text);
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.05;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-subheading {
    max-width: 620px;
    margin-top: 14px;
    color: var(--collection-slider-text);
    font-size: 18px;
    line-height: 1.6;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-view-all {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: var(--collection-slider-text);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: gap 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-view-all:hover {
    gap: 16px;
  }

  /* =========================================
     SWIPER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-swiper-{{ section.id }} {
    overflow: visible;
  }

  #CollectionSlider-{{ section.id }} .swiper-wrapper {
    align-items: stretch;
  }

  #CollectionSlider-{{ section.id }} .collection-slide {
    height: auto;
  }

  .collection-slider-wrapper {
    overflow: hidden;
  }

  /* =========================================
     CARD
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--collection-slider-card-radius);
    color: inherit;
    text-decoration: none;
  }

  #CollectionSlider-{{ section.id }} .collection-card-image {
    position: relative;
    width: 100%;
    aspect-ratio: {{ section.settings.image_ratio }};
    overflow: hidden;
    background: #f2f2f2;
  }

  #CollectionSlider-{{ section.id }} .collection-card-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.4s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-card:hover .collection-card-img {
    transform: scale(1.03);
  }

  /* =========================================
     OVERLAY
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0) 45%,
      rgba(0,0,0,0.42) 100%
    );
    pointer-events: none;
  }

  /* =========================================
     PRODUCT COUNT
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-count {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    padding: 5px 10px;
    border: 1px solid rgb(94 94 94 / 25%);
    border-radius: 100px;
    background: rgb(255 255 255 / 74%);
    backdrop-filter: blur(12px);
    color: #000000;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  /* =========================================
     CARD CONTENT
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding: 18px 2px 0;
  }

  #CollectionSlider-{{ section.id }} .collection-card-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }

  #CollectionSlider-{{ section.id }} .collection-card-title {
    margin: 0;
    color: var(--collection-slider-text);
    font-size: {{ section.settings.title_size }}px;
    font-weight: 600;
    line-height: 1.25;
    /* Title ellipsis after 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  #CollectionSlider-{{ section.id }} .collection-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border: 1px solid currentColor;
    border-radius: 50%;
    opacity: 0.6;
    font-size: 16px;
    rotate: -30deg;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-card:hover .collection-card-arrow {
    opacity: 1;
  }

  #CollectionSlider-{{ section.id }} .collection-card-link {
    color: var(--collection-slider-accent);
    font-size: 13px;
    font-weight: 600;
  }

  /* =========================================
     PLACEHOLDER
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-card-placeholder {
    width: 100%;
    height: 100%;
  }

  #CollectionSlider-{{ section.id }} .collection-card-placeholder svg {
    width: 100%;
    height: 100%;
  }

  /* =========================================
     NAVIGATION
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-button {
    position: absolute;
    top: 36%;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    color: #111;
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      opacity 0.25s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button svg{
    height: 40%;
    left: 30%;
    top: 30%;
    width: 40%;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button:hover {
    background: #fff;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button-prev {
    left: 0;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button-next {
    right: 0;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-button.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  /* =========================================
     PAGINATION
  ========================================= */
  #CollectionSlider-{{ section.id }} .collection-slider-pagination {
    position: relative;
    bottom: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 30px;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-pagination .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    margin: 0 !important;
    border-radius: 50%;
    background: var(--collection-slider-text);
    opacity: 0.25;
    transition:
      width 0.3s ease,
      opacity 0.3s ease,
      border-radius 0.3s ease;
  }

  #CollectionSlider-{{ section.id }} .collection-slider-pagination .swiper-pagination-bullet-active {
    width: 26px;
    border-radius: 10px;
    background: var(--collection-slider-accent);
    opacity: 1;
  }

  /* =========================================
     TABLET
  ========================================= */
  @media screen and (max-width: 989px) {
    #CollectionSlider-{{ section.id }} .collection-slider-header {
      margin-bottom: 28px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-button {
      width: 42px;
      height: 42px;
    }
  }

  /* =========================================
     MOBILE
  ========================================= */
  @media screen and (max-width: 749px) {
    #CollectionSlider-{{ section.id }} {
      padding-top: calc(var(--collection-slider-padding-top) * 0.7);
      padding-bottom: calc(var(--collection-slider-padding-bottom) * 0.7);
    }

    #CollectionSlider-{{ section.id }} .collection-slider-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 22px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-heading {
      font-size: 34px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-subheading {
      margin-top: 10px;
      font-size: 14px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-view-all {
      font-size: 13px;
    }

    #CollectionSlider-{{ section.id }} .collection-card-content {
      padding-top: 14px;
    }

    #CollectionSlider-{{ section.id }} .collection-card-title {
      font-size: 17px;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-button {
      display: none;
    }

    #CollectionSlider-{{ section.id }} .collection-slider-pagination {
      margin-top: 22px;
    }
  }

  /* =========================================
     REDUCED MOTION
  ========================================= */
  @media (prefers-reduced-motion: reduce) {
    #CollectionSlider-{{ section.id }} .collection-card-img,
    #CollectionSlider-{{ section.id }} .collection-card-arrow,
    #CollectionSlider-{{ section.id }}.is-loading .collection-card-image::after {
      animation: none !important;
      transition: none !important;
    }
  }
</style>

<script>
  (function() {
    const sectionId = '{{ section.id }}';

    function initCollectionSlider() {
      const section = document.getElementById('CollectionSlider-' + sectionId);
      if (!section) return;

      const slider = section.querySelector('.collection-swiper-' + sectionId);
      if (!slider) return;

      // Destroy existing Swiper instance
      if (slider.swiper) {
        slider.swiper.destroy(true, true);
      }

      const slidesCount = slider.querySelectorAll('.swiper-slide').length;
      if (slidesCount === 0) return;

      const prevButton = section.querySelector('.collection-slider-button-prev');
      const nextButton = section.querySelector('.collection-slider-button-next');
      const pagination = section.querySelector('.collection-slider-pagination');

      const swiperOptions = {
        slidesPerView: {{ section.settings.mobile_slides }},
        spaceBetween: {{ section.settings.mobile_gap }},
        speed: {{ section.settings.transition_speed }},
        grabCursor: true,
        watchOverflow: true,
        loop: {{ section.settings.enable_loop }},
        autoplay: {% if section.settings.enable_autoplay %}{
            delay: {{ section.settings.autoplay_delay }},
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }{% else %}false{% endif %},
        breakpoints: {
          750: {
            slidesPerView: {{ section.settings.tablet_slides }},
            spaceBetween: {{ section.settings.tablet_gap }}
          },
          990: {
            slidesPerView: {{ section.settings.desktop_slides }},
            spaceBetween: {{ section.settings.desktop_gap }}
          }
        }
      };

      {% if section.settings.show_navigation %}
        swiperOptions.navigation = {
          prevEl: prevButton,
          nextEl: nextButton
        };
      {% endif %}

      {% if section.settings.show_pagination %}
        swiperOptions.pagination = {
          el: pagination,
          clickable: true
        };
      {% endif %}

      new Swiper(slider, swiperOptions);

      // Remove skeleton loading state after images load
      function removeSkeleton() {
        if (section.classList.contains('is-loading')) {
          section.classList.remove('is-loading');
        }
      }

      // Wait for all images inside the section to load
      const images = section.querySelectorAll('img');
      let loaded = 0;
      const total = images.length;

      if (total === 0) {
        removeSkeleton();
      } else {
        function onImageLoad() {
          loaded++;
          if (loaded === total) {
            removeSkeleton();
          }
        }
        images.forEach(img => {
          if (img.complete) {
            onImageLoad();
          } else {
            img.addEventListener('load', onImageLoad);
            img.addEventListener('error', onImageLoad); // fallback
          }
        });
        // Fallback: remove skeleton after 5 seconds anyway
        setTimeout(removeSkeleton, 5000);
      }
    }

    function waitForSwiper() {
      if (typeof Swiper !== 'undefined') {
        initCollectionSlider();
      } else {
        setTimeout(waitForSwiper, 100);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForSwiper);
    } else {
      waitForSwiper();
    }

    // Shopify Theme Editor events
    document.addEventListener('shopify:section:load', function(event) {
      if (event.detail.sectionId === sectionId) {
        setTimeout(initCollectionSlider, 100);
      }
    });

    document.addEventListener('shopify:section:unload', function(event) {
      if (event.detail.sectionId !== sectionId) return;
      const section = document.getElementById('CollectionSlider-' + sectionId);
      const slider = section?.querySelector('.collection-swiper-' + sectionId);
      if (slider?.swiper) {
        slider.swiper.destroy(true, true);
      }
    });

    document.addEventListener('shopify:block:select', function(event) {
      if (
        event.detail.sectionId === sectionId &&
        event.target.closest('#CollectionSlider-' + sectionId)
      ) {
        const slider = document.querySelector('.collection-swiper-' + sectionId);
        if (slider?.swiper) {
          const slide = event.target.closest('.swiper-slide');
          if (slide) {
            const index = Array.from(slider.querySelectorAll('.swiper-slide')).indexOf(slide);
            if (index >= 0) {
              slider.swiper.slideTo(index);
            }
          }
        }
      }
    });
  })();
</script>

{% schema %}
{
  "name": "Collection Slider",
  "tag": "section",
  "class": "section-collection-slider",
  "settings": [
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow",
      "default": "Explore"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Shop by Collection"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "default": "Discover our carefully curated collections."
    },
    {
      "type": "checkbox",
      "id": "show_view_all",
      "label": "Show view all link",
      "default": true
    },
    {
      "type": "text",
      "id": "view_all_text",
      "label": "View all text",
      "default": "View all collections"
    },
    {
      "type": "url",
      "id": "view_all_url",
      "label": "View all URL"
    },
    {
      "type": "header",
      "content": "Collections"
    },
    {
      "type": "paragraph",
      "content": "Add collection blocks below and select a Shopify collection for each card."
    },
    {
      "type": "header",
      "content": "Slider"
    },
    {
      "type": "range",
      "id": "desktop_slides",
      "label": "Desktop slides",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4
    },
    {
      "type": "range",
      "id": "tablet_slides",
      "label": "Tablet slides",
      "min": 1,
      "max": 4,
      "step": 0.5,
      "default": 2.5
    },
    {
      "type": "range",
      "id": "mobile_slides",
      "label": "Mobile slides",
      "min": 1,
      "max": 2,
      "step": 0.1,
      "default": 1
    },
    {
      "type": "range",
      "id": "desktop_gap",
      "label": "Desktop gap",
      "min": 8,
      "max": 50,
      "step": 2,
      "unit": "px",
      "default": 24
    },
    {
      "type": "range",
      "id": "tablet_gap",
      "label": "Tablet gap",
      "min": 8,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 18
    },
    {
      "type": "range",
      "id": "mobile_gap",
      "label": "Mobile gap",
      "min": 8,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 14
    },
    {
      "type": "range",
      "id": "transition_speed",
      "label": "Transition speed",
      "min": 300,
      "max": 1200,
      "step": 50,
      "unit": "ms",
      "default": 700
    },
    {
      "type": "checkbox",
      "id": "enable_loop",
      "label": "Enable infinite loop",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_autoplay",
      "label": "Enable autoplay",
      "default": false
    },
    {
      "type": "range",
      "id": "autoplay_delay",
      "label": "Autoplay delay",
      "min": 2000,
      "max": 9000,
      "step": 500,
      "unit": "ms",
      "default": 5000
    },
    {
      "type": "header",
      "content": "Navigation"
    },
    {
      "type": "checkbox",
      "id": "show_navigation",
      "label": "Show navigation arrows",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_pagination",
      "label": "Show pagination",
      "default": true
    },
    {
      "type": "header",
      "content": "Card"
    },
    {
      "type": "select",
      "id": "image_ratio",
      "label": "Image ratio",
      "options": [
        { "value": "1/1", "label": "Square" },
        { "value": "4/5", "label": "Portrait" },
        { "value": "3/4", "label": "Tall portrait" },
        { "value": "4/3", "label": "Landscape" },
        { "value": "16/9", "label": "Wide" }
      ],
      "default": "4/5"
    },
    {
      "type": "range",
      "id": "title_size",
      "label": "Title size",
      "min": 14,
      "max": 30,
      "step": 1,
      "unit": "px",
      "default": 20
    },
    {
      "type": "range",
      "id": "card_radius",
      "label": "Card radius",
      "min": 0,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 0
    },
    {
      "type": "checkbox",
      "id": "show_collection_count",
      "label": "Show product count",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_shop_text",
      "label": "Show shop text",
      "default": false
    },
    {
      "type": "text",
      "id": "shop_text",
      "label": "Shop text",
      "default": "Shop collection"
    },
    {
      "type": "checkbox",
      "id": "show_arrow",
      "label": "Show arrow",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_overlay",
      "label": "Show image overlay",
      "default": false
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background",
      "default": "#FFFFFF"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent",
      "default": "#111111"
    },
    {
      "type": "header",
      "content": "Layout"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Top spacing",
      "min": 0,
      "max": 150,
      "step": 5,
      "unit": "px",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Bottom spacing",
      "min": 0,
      "max": 150,
      "step": 5,
      "unit": "px",
      "default": 80
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collection Slider",
      "blocks": [
        { "type": "collection" },
        { "type": "collection" },
        { "type": "collection" },
        { "type": "collection" },
        { "type": "collection" },
        { "type": "collection" }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "contact-info-cards",
        slug: "contact-info-cards",
        title: "Contact Info Cards",
        platform: "shopify",
        category: "Contact",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that displays contact information in a card format. Each card can include an icon, title, and description, making it easy for customers to find important contact details. The section is fully customizable, allowing you to add multiple cards and adjust their layout and styling.",
        tags: ["contact", "liquid", "contact-cards", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["contact", "liquid", "contact-cards", "shopify"],
        code: `{%- style -%}
  #shopify-section-{{ section.id }} {
    --section-padding-top: {{ section.settings.padding_top }}px;
    --section-padding-bottom: {{ section.settings.padding_bottom }}px;
    --section-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
    --section-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
    --section-margin-top: {{ section.settings.section_margin_top }}px;
    --section-margin-bottom: {{ section.settings.section_margin_bottom }}px;
    --section-bg-color: {{ section.settings.section_bg_color }};
    --cards-gap: {{ section.settings.cards_gap }}px;
    --card-bg: {{ section.settings.card_bg_color }};
    --card-radius: {{ section.settings.card_border_radius }}px;
    --card-padding: {{ section.settings.card_padding }}px;
    --heading-color: {{ section.settings.heading_color }};
    --heading-size: {{ section.settings.heading_size }}px;
    --text-color: {{ section.settings.text_color }};
    --list-item-size: {{ section.settings.list_item_size }}px;
    --icon-size: {{ section.settings.icon_size }}px;
    --icon-border-width: {{ section.settings.icon_border_width }}px;
    --icon-border-color: {{ section.settings.icon_border_color }};
    --image-max-width: {{ section.settings.image_max_width }}px;
    /* Form specific */
    --form-input-border: {{ section.settings.form_input_border }};
    --form-input-border-radius: {{ section.settings.form_input_border_radius }}px;
    --form-button-bg: {{ section.settings.form_button_bg }};
    --form-button-text: {{ section.settings.form_button_text }};
    --form-button-hover: {{ section.settings.form_button_hover }};
  }

  .info-cards-{{ section.id }} {
    background-color: var(--section-bg-color);
    padding: var(--section-padding-top) 0 var(--section-padding-bottom);
    margin: var(--section-margin-top) 0 var(--section-margin-bottom);
  }

  .info-cards-{{ section.id }} .info-cards__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--cards-gap);
  }

  /* Card styles */
  .info-cards-{{ section.id }} .info-cards__card {
    background: var(--card-bg);
    border-radius: var(--card-radius);
    padding: var(--card-padding);
    position: relative;
    overflow: hidden;
    min-height: {{ section.settings.card_min_height }}px;
    display: flex;
    flex-direction: column;
  }

  /* Card headings */
  .info-cards-{{ section.id }} .info-cards__heading {
    font-size: var(--heading-size);
    font-weight: {{ section.settings.heading_weight }};
    color: var(--heading-color);
    margin: 0 0 {{ section.settings.heading_margin_bottom }}px;
    text-decoration: {{ section.settings.heading_decoration }};
    text-underline-offset: {{ section.settings.heading_underline_offset }}px;
    line-height: 1.2;
  }
  .info-cards__heading.info-cards_contact-heading {
    margin-top: 15px;
  }
  /* Opening hours list */
  .info-cards-{{ section.id }} .info-cards__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .info-cards-{{ section.id }} .info-cards__list-item {
    font-size: var(--list-item-size);
    line-height: {{ section.settings.list_item_line_height }};
    margin-bottom: {{ section.settings.list_item_margin_bottom }}px;
    color: var(--text-color);
  }

  .info-cards-{{ section.id }} .info-cards__list-item span {
    font-weight: {{ section.settings.list_item_bold_weight }};
  }

  /* Contact description (left card) */
  .info-cards-{{ section.id }} .info-cards__description {
    font-size: var(--list-item-size);
    color: var(--text-color);
    margin: 0 0 {{ section.settings.description_margin_bottom }}px;
    line-height: 1.5;
  }

  /* Contact items (left card) */
  .info-cards-{{ section.id }} .info-cards__contact-item {
    display: flex;
    align-items: center;
    margin-bottom: {{ section.settings.contact_item_margin_bottom }}px;
  }

  .info-cards-{{ section.id }} .info-cards__contact-icon {
    width: var(--icon-size);
    height: var(--icon-size);
    border: var(--icon-border-width) solid var(--icon-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: {{ section.settings.icon_margin_right }}px;
    border-radius: {{ section.settings.icon_border_radius }}px;
    flex-shrink: 0;
    font-size: {{ section.settings.icon_font_size }}px;
  }

  .info-cards-{{ section.id }} .info-cards__contact-icon svg {
    width: {{ section.settings.icon_svg_size }}px;
    height: {{ section.settings.icon_svg_size }}px;
  }

  .info-cards-{{ section.id }} .info-cards__contact-text {
    font-size: var(--list-item-size);
    color: var(--text-color);
    line-height: 1.4;
  }

  /* Floating images */
  .info-cards-{{ section.id }} .info-cards__image {
    position: absolute;
    bottom: {{ section.settings.image_bottom_offset }}px;
    right: {{ section.settings.image_right_offset }}px;
    max-width: var(--image-max-width);
    pointer-events: none;
    z-index: 1;
  }

  .info-cards-{{ section.id }} .info-cards__image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Contact form styles */
  .info-cards-{{ section.id }} .contact-form__heading {
    font-size: var(--heading-size);
    font-weight: {{ section.settings.heading_weight }};
    color: var(--heading-color);
    margin: 0 0 {{ section.settings.heading_margin_bottom }}px;
    text-decoration: {{ section.settings.heading_decoration }};
    text-underline-offset: {{ section.settings.heading_underline_offset }}px;
    line-height: 1.2;
  }

  .info-cards-{{ section.id }} .contact-form__description {
    font-size: var(--list-item-size);
    color: var(--text-color);
    margin-bottom: {{ section.settings.description_margin_bottom }}px;
  }

  .info-cards-{{ section.id }} .contact-form {
    margin-bottom: 30px;
  }

  .info-cards-{{ section.id }} .custom-field {
    margin-bottom: 20px;
  }

  .info-cards-{{ section.id }} .custom-field__input {
    background: #fff;
    border: var(--form-input-border);
    border-radius: var(--form-input-border-radius);
    padding: 12px 15px;
    width: 100%;
    font-size: var(--list-item-size);
    color: var(--text-color);
    transition: border-color 0.2s;
    font-family: inherit;
  }

  .info-cards-{{ section.id }} .custom-field__input:focus {
    outline: none;
    border-color: var(--heading-color);
  }

  .info-cards-{{ section.id }} textarea.custom-field__input {
    min-height: 100px;
    resize: vertical;
  }

  .info-cards-{{ section.id }} .contact-form__button {
    background: var(--form-button-bg);
    color: var(--form-button-text);
    border: none;
    border-radius: var(--form-input-border-radius);
    padding: 12px 30px;
    font-size: var(--list-item-size);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin-top: 10px;
  }

  .info-cards-{{ section.id }} .contact-form__button:hover {
    background: var(--form-button-hover);
  }

  .info-cards-{{ section.id }} .form__message {
    font-size: var(--list-item-size);
    margin-bottom: 15px;
    padding: 10px;
    border-radius: var(--form-input-border-radius);
  }

  .info-cards-{{ section.id }} .form__message--success {
    background: rgba(0, 128, 0, 0.1);
    color: green;
  }

  .info-cards-{{ section.id }} .form__message--error {
    background: rgba(255, 0, 0, 0.1);
    color: red;
  }

  /* Responsive */
  @media screen and (max-width: 989px) {
    .info-cards-{{ section.id }} .info-cards__container {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .info-cards-{{ section.id }} .info-cards__image {
      position: relative;
      bottom: auto;
      right: auto;
      margin-top: 20px;
      align-self: flex-end;
      display: none;
    }
  }

  @media screen and (max-width: 749px) {
    .info-cards-{{ section.id }} .info-cards__card {
      padding: {{ section.settings.card_padding_mobile }}px;
      min-height: auto;
    }

    .info-cards-{{ section.id }} .info-cards__heading {
      font-size: {{ section.settings.heading_size_mobile }}px;
    }

    .info-cards-{{ section.id }} .info-cards__list-item,
    .info-cards-{{ section.id }} .info-cards__description,
    .info-cards-{{ section.id }} .info-cards__contact-text,
    .info-cards-{{ section.id }} .custom-field__input,
    .info-cards-{{ section.id }} .contact-form__button {
      font-size: {{ section.settings.list_item_size_mobile }}px;
    }

    .info-cards-{{ section.id }} .info-cards__contact-icon {
      width: calc(var(--icon-size) * 0.8);
      height: calc(var(--icon-size) * 0.8);
    }
  }
{%- endstyle -%}

<section class="info-cards-{{ section.id }}" aria-labelledby="info-cards-heading-{{ section.id }}">
  <div class="page-width">
    <div class="info-cards__container">
      <!-- Left Card: Opening Hours + Contact Info -->
      <div class="info-cards__card">
        {%- if section.settings.opening_heading != blank -%}
          <h2 class="info-cards__heading">{{ section.settings.opening_heading }}</h2>
        {%- endif -%}
        <ul class="info-cards__list">
          {%- for block in section.blocks -%}
            {%- if block.type == 'opening_hour' -%}
              <li class="info-cards__list-item">
                <span>{{ block.settings.day }}:</span> {{ block.settings.hours }}
              </li>
            {%- endif -%}
          {%- endfor -%}
        </ul>
        {%- if section.settings.opening_image != blank -%}
          <div class="info-cards__image">
            <img
              src="{{ section.settings.opening_image | image_url: width: 300 }}"
              srcset="
                {{ section.settings.opening_image | image_url: width: 150 }} 150w,
                {{ section.settings.opening_image | image_url: width: 300 }} 300w
              "
              sizes="150px"
              alt="{{ section.settings.opening_image.alt | escape }}"
              loading="lazy"
              height="auto"
              width="auto"
            >
          </div>
        {%- endif -%}
        {%- if section.settings.contact_heading != blank -%}
          <h2 class="info-cards__heading info-cards_contact-heading">{{ section.settings.contact_heading }}</h2>
        {%- endif -%}
        {%- if section.settings.contact_description != blank -%}
          <div class="info-cards__description">{{ section.settings.contact_description }}</div>
        {%- endif -%}
        <ul class="info-cards__list">
          {%- for block in section.blocks -%}
            {%- if block.type == 'contact_item' -%}
              <li class="info-cards__contact-item">
                <div class="info-cards__contact-icon">
                  {%- if block.settings.icon_svg != blank -%}
                    {{ block.settings.icon_svg }}
                  {%- else -%}
                    {{ block.settings.icon_text }}
                  {%- endif -%}
                </div>
                <div class="info-cards__contact-text">{{ block.settings.info }}</div>
              </li>
            {%- endif -%}
          {%- endfor -%}
        </ul>
      </div>

      <!-- Right Card: Contact Form (Dawn style) -->
      <div class="info-cards__card">
        {%- if section.settings.form_heading != blank -%}
          <h2 class="contact-form__heading">{{ section.settings.form_heading }}</h2>
        {%- endif -%}
        {%- if section.settings.form_description != blank -%}
          <div class="contact-form__description">{{ section.settings.form_description }}</div>
        {%- endif -%}

        <div class="contact-form">
          {%- form 'contact', id: 'ContactForm', class: 'contact-form__wrapper' -%}
            {%- if form.posted_successfully? -%}
              <div class="form__message form__message--success" tabindex="-1" autofocus>
                {{ 'templates.contact.form.post_success' | t }}
              </div>
            {%- endif -%}

            {%- if form.errors -%}
              <div class="form__message form__message--error">
                <h3 class="form__message-heading">{{ 'templates.contact.form.error_heading' | t }}</h3>
                <ul>
                  {%- for field in form.errors -%}
                    <li>
                      {%- if field == 'form' -%}
                        {{ form.errors.messages[field] }}
                      {%- else -%}
                        <a href="#ContactForm-{{ field }}" class="link">
                          {{ form.errors.translated_fields[field] | capitalize }}
                          {{ form.errors.messages[field] }}
                        </a>
                      {%- endif -%}
                    </li>
                  {%- endfor -%}
                </ul>
              </div>
            {%- endif -%}

            <div class="custom-field">
              <input
                type="text"
                id="ContactForm-name"
                class="custom-field__input"
                name="contact[name]"
                value="{% if form.name %}{{ form.name }}{% elsif customer %}{{ customer.name }}{% endif %}"
                placeholder="{{ 'Enter Your Name' }}"
                required
              >
              <label class="field__label visually-hidden" for="ContactForm-name">{{ 'Enter Your Name' }}</label>
            </div>

            <div class="custom-field">
              <input
                type="tel"
                id="ContactForm-phone"
                class="custom-field__input"
                autocomplete="tel"
                name="contact[{{ 'templates.contact.form.phone' | t }}]"
                pattern="[0-9\-]*"
                value="{% if form.phone %}{{ form.phone }}{% elsif customer %}{{ customer.phone }}{% endif %}"
                placeholder="{{ 'templates.contact.form.phone' | t }}"
              >
              <label class="field__label visually-hidden" for="ContactForm-phone">{{ 'templates.contact.form.phone' | t }}</label>
            </div>

            <div class="custom-field">
              <input
                type="email"
                id="ContactForm-email"
                class="custom-field__input"
                name="contact[email]"
                value="{% if form.email %}{{ form.email }}{% elsif customer %}{{ customer.email }}{% endif %}"
                placeholder="{{ 'Enter Your Email' }}"
                spellcheck="false"
                autocomplete="email"
                required
              >
              <label class="field__label visually-hidden" for="ContactForm-email">{{ 'Enter Your Email' }}</label>
            </div>

            <div class="custom-field">
              <textarea
                id="ContactForm-body"
                class="custom-field__input"
                name="contact[message]"
                placeholder="{{ 'Message' }}"
                rows="5"
                required
              >{% if form.body %}{{ form.body }}{% endif %}</textarea>
              <label class="field__label visually-hidden" for="ContactForm-body">{{ 'Message' }}</label>
            </div>

            <button type="submit" class="contact-form__button">
              {{ section.settings.submit_button_label | default: 'Send message' }}
            </button>
          {%- endform -%}
        </div>

        {%- if section.settings.form_image != blank -%}
          <div class="info-cards__image">
            <img
              src="{{ section.settings.form_image | image_url: width: 300 }}"
              srcset="
                {{ section.settings.form_image | image_url: width: 150 }} 150w,
                {{ section.settings.form_image | image_url: width: 300 }} 300w
              "
              sizes="150px"
              alt="{{ section.settings.form_image.alt | escape }}"
              loading="lazy"
              width="auto"
              height="auto"
            >
          </div>
        {%- endif -%}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Info Cards",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "header",
      "content": "Layout & Spacing"
    },
    {
      "type": "color",
      "id": "section_bg_color",
      "label": "Section background color",
      "default": "#f4f4f4"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section padding top (desktop)",
      "default": 60
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section padding bottom (desktop)",
      "default": 60
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "px",
      "label": "Section padding top (mobile)",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "px",
      "label": "Section padding bottom (mobile)",
      "default": 40
    },
    {
      "type": "range",
      "id": "section_margin_top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section margin top",
      "default": 0
    },
    {
      "type": "range",
      "id": "section_margin_bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section margin bottom",
      "default": 0
    },
    {
      "type": "header",
      "content": "Card Settings"
    },
    {
      "type": "color",
      "id": "card_bg_color",
      "label": "Card background color",
      "default": "#c8d9d9"
    },
    {
      "type": "range",
      "id": "card_border_radius",
      "min": 0,
      "max": 40,
      "step": 2,
      "unit": "px",
      "label": "Card border radius",
      "default": 20
    },
    {
      "type": "range",
      "id": "card_padding",
      "min": 15,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Card inner padding (desktop)",
      "default": 40
    },
    {
      "type": "range",
      "id": "card_padding_mobile",
      "min": 15,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Card inner padding (mobile)",
      "default": 25
    },
    {
      "type": "range",
      "id": "card_min_height",
      "min": 200,
      "max": 500,
      "step": 10,
      "unit": "px",
      "label": "Card minimum height",
      "default": 320
    },
    {
      "type": "range",
      "id": "cards_gap",
      "min": 10,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Gap between cards",
      "default": 25
    },
    {
      "type": "header",
      "content": "Typography - Headings"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading color",
      "default": "#0c5c5c"
    },
    {
      "type": "range",
      "id": "heading_size",
      "min": 20,
      "max": 40,
      "step": 1,
      "unit": "px",
      "label": "Heading size (desktop)",
      "default": 28
    },
    {
      "type": "range",
      "id": "heading_size_mobile",
      "min": 18,
      "max": 32,
      "step": 1,
      "unit": "px",
      "label": "Heading size (mobile)",
      "default": 22
    },
    {
      "type": "select",
      "id": "heading_weight",
      "label": "Heading font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "600"
    },
    {
      "type": "select",
      "id": "heading_decoration",
      "label": "Heading decoration",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "underline", "label": "Underline" }
      ],
      "default": "underline"
    },
    {
      "type": "range",
      "id": "heading_underline_offset",
      "min": 0,
      "max": 10,
      "step": 1,
      "unit": "px",
      "label": "Underline offset",
      "default": 5
    },
    {
      "type": "range",
      "id": "heading_margin_bottom",
      "min": 0,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Heading bottom margin",
      "default": 20
    },
    {
      "type": "header",
      "content": "Typography - Lists & Text"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#333333"
    },
    {
      "type": "range",
      "id": "list_item_size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Text size (desktop)",
      "default": 16
    },
    {
      "type": "range",
      "id": "list_item_size_mobile",
      "min": 12,
      "max": 18,
      "step": 1,
      "unit": "px",
      "label": "Text size (mobile)",
      "default": 14
    },
    {
      "type": "range",
      "id": "list_item_line_height",
      "min": 1.2,
      "max": 2.0,
      "step": 0.1,
      "label": "Line height",
      "default": 2.0
    },
    {
      "type": "range",
      "id": "list_item_margin_bottom",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "label": "List item margin bottom",
      "default": 0
    },
    {
      "type": "select",
      "id": "list_item_bold_weight",
      "label": "Bold text weight (days)",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "600"
    },
    {
      "type": "range",
      "id": "description_margin_bottom",
      "min": 0,
      "max": 30,
      "step": 5,
      "unit": "px",
      "label": "Description bottom margin (left card & form)",
      "default": 20
    },
    {
      "type": "range",
      "id": "contact_item_margin_bottom",
      "min": 6,
      "max": 30,
      "step": 2,
      "unit": "px",
      "label": "Contact item margin bottom",
      "default": 18
    },
    {
      "type": "header",
      "content": "Icon Settings"
    },
    {
      "type": "range",
      "id": "icon_size",
      "min": 30,
      "max": 70,
      "step": 2,
      "unit": "px",
      "label": "Icon container size",
      "default": 50
    },
    {
      "type": "range",
      "id": "icon_border_width",
      "min": 1,
      "max": 5,
      "step": 1,
      "unit": "px",
      "label": "Icon border width",
      "default": 2
    },
    {
      "type": "color",
      "id": "icon_border_color",
      "label": "Icon border color",
      "default": "#1da8a3"
    },
    {
      "type": "range",
      "id": "icon_border_radius",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "label": "Icon border radius",
      "default": 6
    },
    {
      "type": "range",
      "id": "icon_margin_right",
      "min": 5,
      "max": 25,
      "step": 2,
      "unit": "px",
      "label": "Icon right margin",
      "default": 15
    },
    {
      "type": "range",
      "id": "icon_font_size",
      "min": 16,
      "max": 32,
      "step": 2,
      "unit": "px",
      "label": "Icon emoji/font size",
      "default": 24
    },
    {
      "type": "range",
      "id": "icon_svg_size",
      "min": 16,
      "max": 60,
      "step": 2,
      "unit": "px",
      "label": "Icon SVG size",
      "default": 24
    },
    {
      "type": "header",
      "content": "Floating Images"
    },
    {
      "type": "range",
      "id": "image_max_width",
      "min": 80,
      "max": 250,
      "step": 5,
      "unit": "px",
      "label": "Image max width",
      "default": 180
    },
    {
      "type": "range",
      "id": "image_bottom_offset",
      "min": 0,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Image bottom offset",
      "default": 0
    },
    {
      "type": "range",
      "id": "image_right_offset",
      "min": 0,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Image right offset",
      "default": 20
    },
    {
      "type": "header",
      "content": "Left Card Content"
    },
    {
      "type": "text",
      "id": "opening_heading",
      "label": "Opening heading",
      "default": "Opening Times"
    },
    {
      "type": "image_picker",
      "id": "opening_image",
      "label": "Opening card image",
      "info": "Optional decorative image"
    },
    {
      "type": "text",
      "id": "contact_heading",
      "label": "Contact heading",
      "default": "Get in Touch"
    },
    {
      "type": "text",
      "id": "contact_description",
      "label": "Contact description",
      "default": "Reach us directly via phone, email, or visit our practice."
    },
    {
      "type": "header",
      "content": "Right Card: Contact Form"
    },
    {
      "type": "text",
      "id": "form_heading",
      "label": "Form heading",
      "default": "Send us a message"
    },
    {
      "type": "text",
      "id": "form_description",
      "label": "Form description",
      "default": "We'll get back to you as soon as possible."
    },
    {
      "type": "text",
      "id": "submit_button_label",
      "label": "Submit button text",
      "default": "Send message"
    },
    {
      "type": "image_picker",
      "id": "form_image",
      "label": "Form card image",
      "info": "Optional decorative image (floating bottom-right)"
    },
    {
      "type": "header",
      "content": "Form Input Styling"
    },
    {
      "type": "text",
      "id": "form_input_border",
      "label": "Input border (CSS value)",
      "default": "1px solid #ccc",
      "info": "e.g., 1px solid #ccc"
    },
    {
      "type": "range",
      "id": "form_input_border_radius",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "label": "Input border radius",
      "default": 6
    },
    {
      "type": "color",
      "id": "form_button_bg",
      "label": "Button background",
      "default": "#0c5c5c"
    },
    {
      "type": "color",
      "id": "form_button_text",
      "label": "Button text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "form_button_hover",
      "label": "Button hover background",
      "default": "#1da8a3"
    }
  ],
  "blocks": [
    {
      "type": "opening_hour",
      "name": "Opening hour",
      "limit": 10,
      "settings": [
        {
          "type": "text",
          "id": "day",
          "label": "Day",
          "default": "Monday"
        },
        {
          "type": "text",
          "id": "hours",
          "label": "Hours",
          "default": "9:30am – 5:30pm"
        }
      ]
    },
    {
      "type": "contact_item",
      "name": "Contact item",
      "limit": 10,
      "settings": [
        {
          "type": "text",
          "id": "icon_text",
          "label": "Icon (emoji or text)",
          "default": "📞",
          "info": "Used if no SVG is provided"
        },
        {
          "type": "html",
          "id": "icon_svg",
          "label": "Icon SVG code",
          "info": "Optional: Paste SVG code to replace emoji"
        },
        {
          "type": "text",
          "id": "info",
          "label": "Information",
          "default": "01952 502 970"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Info Cards",
      "blocks": [
        {
          "type": "opening_hour",
          "settings": { "day": "Monday", "hours": "9:30am – 5:30pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Tuesday", "hours": "9:30am – 5:30pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Wednesday", "hours": "9:30am – 5:30pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Thursday", "hours": "9:30am – 5:30pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Friday", "hours": "9:30am – 5:30pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Saturday", "hours": "9:00am – 4:00pm" }
        },
        {
          "type": "opening_hour",
          "settings": { "day": "Sunday", "hours": "Closed" }
        },
        {
          "type": "contact_item",
          "settings": { "icon_text": "📞", "info": "01952 502 970" }
        },
        {
          "type": "contact_item",
          "settings": { "icon_text": "📍", "info": "Unit 8 Birchfield Way Lawley Telford, Shropshire TF3 5BZ" }
        },
        {
          "type": "contact_item",
          "settings": { "icon_text": "✉️", "info": "support@hdeyesopticians.co.uk" }
        }
      ]
    }
  ],
  "enabled_on": {
    "templates": ["index", "page", "collection", "product"]
  }
}
{% endschema %}`
    },
    {
        id: "announcement-bar",
        slug: "announcement-bar",
        title: "Announcement Bar",
        platform: "shopify",
        category: "Announcement Bar",
        language: "liquid",
        ext: ".liquid",
        description: "A simple announcement bar section for Shopify stores, allowing you to display important messages or promotions at the top of your website.",
        tags: ["announcement", "liquid", "promotions", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 130,
        demoUrl: "",
        seoKeywords: ["announcement", "liquid", "promotions", "shopify"],
        code: `{% style %}
  .announcement-bar {
    background-color: {{ section.settings.bg_color }};
    color: {{ section.settings.text_color }};
  }

  .announcement-bar .page-width{
    width: 100%;
  }

  .announcement-bar__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 10px 0;
  }

  .announcement-bar__left,
  .announcement-bar__right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .announcement-bar__item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }
  .announcement-bar__item .announcement-bar__icon {
    display: flex;
  }
  .announcement-bar__item a {
    color: inherit;
    text-decoration: none;
  }

  .announcement-bar__social a {
    color: #ffffff;
    transition: opacity 0.2s ease;
    text-decoration: none;
    height: 30px;
    width: 30px;
    background: #025A5E;
    border-radius: 50px;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .announcement-bar__icon svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 749px) {
    .announcement-bar__inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
{% endstyle %}

<div class="announcement-bar">
  <div class="page-width">
    <div class="announcement-bar__inner">

      <!-- LEFT SIDE -->
      <div class="announcement-bar__left">
        {% for block in section.blocks %}
          {% if block.type == 'contact' %}
            <div class="announcement-bar__item" {{ block.shopify_attributes }}>
              
              {% if block.settings.icon != blank %}
                <span class="announcement-bar__icon">
                  {{ block.settings.icon }}
                </span>
              {% endif %}

              {% if block.settings.link != blank %}
                <a href="{{ block.settings.link }}">
                  {{ block.settings.text }}
                </a>
              {% else %}
                <span>{{ block.settings.text }}</span>
              {% endif %}
            </div>
          {% endif %}
        {% endfor %}
      </div>

      <!-- RIGHT SIDE -->
      <div class="announcement-bar__right">
        {% for block in section.blocks %}
          {% if block.type == 'social' %}
            <div class="announcement-bar__social" {{ block.shopify_attributes }}>
              <a href="{{ block.settings.link }}" target="_blank">
                {{ block.settings.icon }}
              </a>
            </div>
          {% endif %}
        {% endfor %}
      </div>

    </div>
  </div>
</div>

{% schema %}
{
  "name": "Custom Announcement Bar",
  "enabled_on": {
    "groups": ["header"]
  },
  "settings": [
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#ffffff"
    }
  ],
  "blocks": [
    {
      "type": "contact",
      "name": "Contact Item",
      "settings": [
        {
          "type": "html",
          "id": "icon",
          "label": "Icon (SVG)"
        },
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "01952 502 970"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link"
        }
      ]
    },
    {
      "type": "social",
      "name": "Social Icon",
      "settings": [
        {
          "type": "html",
          "id": "icon",
          "label": "Icon (SVG)"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Social Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Custom Announcement Bar",
      "blocks": [
        {
          "type": "contact"
        },
        {
          "type": "contact"
        },
        {
          "type": "social"
        },
        {
          "type": "social"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "custom-banner-with-image",
        slug: "custom-banner-with-image",
        title: "Custom Banner with Image",
        platform: "shopify",
        category: "Banner",
        language: "liquid",
        ext: ".liquid",
        description: "A customizable banner section for Shopify stores that allows you to display a banner with an image, heading, subheading, and a call-to-action button. Perfect for promotions or highlighting important information.",
        tags: ["banner", "liquid", "image", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 50,
        demoUrl: "",
        seoKeywords: ["banner", "liquid", "image", "shopify"],
        code: `{% comment %} Section: Custom Banner with Image
For Dawn theme – full width background, content inside page-width, left text + right image.
Blocks: heading (repeatable) for title + line, single description, button, and media image.
Settings: background image, overlay, colors, button style. {% endcomment %}

<section class="custom-banner-with-image" id="section-{{ section.id }}" style="background-image: url('{{ section.settings.background_image | image_url: width: 2000 }}');">
  <div class="page-width">
    <div class="banner-grid">
      <div class="banner-content">
        {% for block in section.blocks %}
          {% case block.type %}
            {% when 'heading' %}
              <div class="heading-group" {{ block.shopify_attributes }}>
                <h2 class="heading-title">{{ block.settings.title | escape }}</h2>
                <div class="heading-line"></div>
              </div>
            {% when 'description' %}
              <div class="banner-description" {{ block.shopify_attributes }}>
                {{ block.settings.description }}
              </div>
            {% when 'button' %}
              <div class="banner-button-wrapper" {{ block.shopify_attributes }}>
                <a href="{{ block.settings.button_link | default: '#' }}" class="banner-button">
                  {{ block.settings.button_text | default: 'Book An Appointment Online →' }}
                </a>
              </div>
          {% endcase %}
        {% endfor %}
      </div>
      <div class="banner-media">
        {% if section.settings.image != blank %}
          {{ section.settings.image | image_url: width: 800 | image_tag: alt: section.settings.image.alt, class: 'banner-image' }}
        {% else %}
          <div class="placeholder-image">{{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}</div>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<style>
  #section-{{ section.id }} {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;
    color: {{ section.settings.text_color }};
  }

  #section-{{ section.id }} .page-width {
    position: relative;
    z-index: 2;
  }

  .banner-grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    flex-wrap: wrap;
  }

  .banner-content {
    flex: 1 1 400px;
    max-width: 580px;
  }

  .heading-group {
    margin-bottom: 8px;
  }

  .heading-title {
    font-size: 40px;
    font-weight: 600;
    line-height: 1.2;
    color: inherit;
    margin: 0;
  }

  .heading-line {
    background: {{ section.settings.line_color }};
    height: 1px;
    width: 100%;
    margin: 12px 0;
    display: block !important;
  }

  .banner-description {
    font-size: 16px;
    line-height: 1.7;
    margin: 30px 0 30px;
    max-width: 460px;
  }

  .banner-button-wrapper {
    margin-top: 20px;
  }

  .banner-button {
    display: inline-block;
    padding: 14px 32px;
    background: {{ section.settings.button_bg }};
    color: {{ section.settings.button_text }};
    text-decoration: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    transition: background 0.2s;
    border: none;
  }

  .banner-button:hover {
    background: {{ section.settings.button_hover_bg }};
    color: {{ section.settings.button_text }};
  }

  .banner-media {
    flex: 1 1 400px;
    max-width: 460px;
  }

  .banner-image,
  .placeholder-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .placeholder-image svg {
    width: 100%;
    height: auto;
    background: #f2f2f2;
  }

  @media screen and (max-width: 749px) {
    .banner-grid {
      flex-direction: column;
      gap: 40px;
    }

    .banner-content,
    .banner-media {
      max-width: 100%;
    }

    .heading-title {
      font-size: 32px;
    }
  }
</style>

{% schema %}
{
  "name": "Custom banner with image",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background image"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Main image"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "line_color",
      "label": "Heading line color",
      "default": "rgba(255,255,255,0.4)"
    },
    {
      "type": "header",
      "content": "Button settings (applies to first button block)"
    },
    {
      "type": "color",
      "id": "button_bg",
      "label": "Button background",
      "default": "#2bb7b0"
    },
    {
      "type": "color",
      "id": "button_hover_bg",
      "label": "Button hover background",
      "default": "#1e9e97"
    },
    {
      "type": "color",
      "id": "button_text",
      "label": "Button text color",
      "default": "#ffffff"
    },
    {
      "type": "header",
      "content": "Section padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom",
      "default": 80
    }
  ],
  "blocks": [
    {
      "type": "heading",
      "name": "Heading with line",
      "limit": 5,
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Heading text",
          "default": "Eye I Definition"
        }
      ]
    },
    {
      "type": "description",
      "name": "Description",
      "limit": 1,
      "settings": [
        {
          "type": "textarea",
          "id": "description",
          "label": "Description text",
          "default": "HD Eyes delivers expert eyecare, stylish frames, and trusted local service — making vision care simple and personal."
        }
      ]
    },
    {
      "type": "button",
      "name": "Button",
      "limit": 1,
      "settings": [
        {
          "type": "text",
          "id": "button_text",
          "label": "Button label",
          "default": "Book An Appointment Online →"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Custom banner with image",
      "blocks": [
        {
          "type": "heading",
          "settings": {
            "title": "Eye I Definition"
          }
        },
        {
          "type": "heading",
          "settings": {
            "title": "One glance - the world"
          }
        },
        {
          "type": "heading",
          "settings": {
            "title": "Becomes crystal clear"
          }
        },
        {
          "type": "description"
        },
        {
          "type": "button"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "footer",
        slug: "footer",
        title: "Footer",
        platform: "shopify",
        category: "Footer",
        language: "liquid",
        ext: ".liquid",
        description: "A customizable footer section for Shopify stores, allowing you to display important links, contact information, and social media icons at the bottom of your website.",
        tags: ["footer", "liquid", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 95,
        demoUrl: "",
        seoKeywords: ["footer", "liquid", "shopify"],
        code: `{% comment %}
  Custom Footer – Generic design with placeholder content
  - Logo image in first column
  - Social icons in bottom bar
  - Custom copyright text
  - Separate bottom background color
{% endcomment %}

<style>
.footer-custom {
  background: {{ section.settings.background_color }};
  color: {{ section.settings.text_color }};
  padding: 60px 0 0; /* bottom padding handled by bottom row */
}

.footer-custom__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 50px;
  margin-bottom: 40px;
}

.footer-custom__title {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 24px;
  letter-spacing: 0.5px;
  color: {{ section.settings.heading_color }};
}

.footer-custom__about-logo {
  max-width: 150px;
  height: auto;
  margin-bottom: 20px;
  display: block;
}

.footer-custom__about-text {
  font-size: 16px;
  {% comment %} line-height: 1.6; {% endcomment %}
  color: {{ section.settings.text_color }};
}

.footer-custom__about-text p {
  color: {{ section.settings.text_color }};
  margin: 0;
}

.footer-custom__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-custom__links li {
  margin-bottom: 4px;
}

.footer-custom__links a {
  color: {{ section.settings.text_color }};
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s ease;
}

.footer-custom__links a:hover {
  color: {{ section.settings.heading_color }};
  text-decoration: underline;
}

.footer-custom__address {
  font-size: 14px;
  line-height: 1.6;
  color: {{ section.settings.text_color }};
  font-weight: 300;
}

.footer-custom__address p {
  margin: 0 0 8px 0;
  color: {{ section.settings.text_color }};
}

.footer-custom__contact {
  margin-top: 15px;
}

.footer-custom__phone {
  font-size: 14px;
  color: {{ section.settings.text_color }};
  margin-bottom: 8px;
}

.footer-custom__email {
  font-size: 14px;
  color: {{ section.settings.text_color }};
}

.footer-custom__email a, .footer-custom__phone a {
  color: {{ section.settings.text_color }};
  text-decoration: none;
}

.footer-custom__email a:hover, .footer-custom__phone a:hover {
  color: {{ section.settings.heading_color }};
  text-decoration: underline;
}

/* Bottom row */
.footer-custom__bottom {
  background: {{ section.settings.bottom_bg_color }};
  padding: 5px 0;
  margin-top: 40px;
}

.footer-custom__bottom .page-width {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-custom__copyright {
  font-size: 16px;
  color: {{ section.settings.text_color }};
  font-weight: 300;
}

/* Social Icons in bottom row */
.footer-custom__social-icons {
  display: flex;
  gap: 6px;
}

.footer-custom__social-icon {
  color: {{ section.settings.text_color }};
  transition: opacity 0.2s ease;
  text-decoration: none;
  height: 30px;
  width: 30px;
  background: #025A5E;
  border-radius: 50px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-custom__social-icon:hover {
  opacity: 1;
}

/* Payment Icons (commented out as per request) */
/* 
.footer-custom__payment-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.footer-custom__payment-icon {
  height: 18px;
  width: auto;
}
*/

/* Responsive Design */
@media screen and (max-width: 1024px) {
  .footer-custom__grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media screen and (max-width: 768px) {
  .footer-custom {
    padding: 40px 0 0;
  }
  
  .footer-custom__grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-custom__bottom .page-width {
    flex-direction: column;
    text-align: center;
  }
}
</style>

<footer class="footer-custom">
  <div class="footer-custom__container page-width">
    <div class="footer-custom__grid">
      {%- for block in section.blocks -%}
        {%- case block.type -%}
          {%- when 'logo_about' -%}
            <div class="footer-custom__about" {{ block.shopify_attributes }}>
              {%- if block.settings.logo != blank -%}
                {{ block.settings.logo | image_url: width: 400 | image_tag: class: 'footer-custom__about-logo', alt: block.settings.logo.alt }}
              {%- endif -%}
              <div class="footer-custom__about-text">
                {{ block.settings.about_text }}
              </div>
            </div>

          {%- when '@app' -%}
            {% render block %}

          {%- when 'menu' -%}
            <div class="footer-custom__links-column" {{ block.shopify_attributes }}>
              {%- if block.settings.menu_title != blank -%}
                <h3 class="footer-custom__title">{{ block.settings.menu_title }}</h3>
              {%- endif -%}
              {%- if block.settings.menu != blank -%}
                <ul class="footer-custom__links">
                  {%- for link in block.settings.menu.links -%}
                    <li>
                      <a href="{{ link.url }}" class="footer-custom__link">
                        <span class="footer-menu_list-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 17 16" fill="none"><g clip-path="url(#clip0_19_811)"><path d="M7.7063 8.70586C8.09692 8.31523 8.09692 7.68086 7.7063 7.29023L2.7063 2.29023C2.31567 1.89961 1.6813 1.89961 1.29067 2.29023C0.900049 2.68086 0.900049 3.31524 1.29067 3.70586L5.58442 7.99961L1.2938 12.2934C0.903173 12.684 0.903173 13.3184 1.2938 13.709C1.68442 14.0996 2.3188 14.0996 2.70942 13.709L7.70942 8.70898L7.7063 8.70586Z" fill="white"></path></g><g clip-path="url(#clip1_19_811)"><path d="M16.7063 8.70586C17.0969 8.31523 17.0969 7.68086 16.7063 7.29023L11.7063 2.29023C11.3157 1.89961 10.6813 1.89961 10.2907 2.29023C9.90005 2.68086 9.90005 3.31524 10.2907 3.70586L14.5844 7.99961L10.2938 12.2934C9.90317 12.684 9.90317 13.3184 10.2938 13.709C10.6844 14.0996 11.3188 14.0996 11.7094 13.709L16.7094 8.70898L16.7063 8.70586Z" fill="white"></path></g><defs><clipPath id="clip0_19_811"><rect width="8" height="16" fill="white" transform="matrix(-1 0 0 -1 8 16)"></rect></clipPath><clipPath id="clip1_19_811"><rect width="8" height="16" fill="white" transform="matrix(-1 0 0 -1 17 16)"></rect></clipPath></defs></svg>						
                        </span>
                        <span>{{ link.title }}</span>
                      </a>
                    </li>
                  {%- endfor -%}
                </ul>
              {%- endif -%}
            </div>

          {%- when 'address' -%}
            <div class="footer-custom__address-column" {{ block.shopify_attributes }}>
              {%- if block.settings.address_title != blank -%}
                <h3 class="footer-custom__title">{{ block.settings.address_title }}</h3>
              {%- endif -%}
              <div class="footer-custom__address">
                {{ block.settings.address | newline_to_br }}
              </div>
              <div class="footer-custom__contact">
                {%- if block.settings.phone != blank -%}
                  <div class="footer-custom__phone">
                    <a href="tel:{{ block.settings.phone }}">{{ block.settings.phone }}</a>
                  </div>
                {%- endif -%}
                {%- if block.settings.email != blank -%}
                  <div class="footer-custom__email">
                    <a href="mailto:{{ block.settings.email }}">{{ block.settings.email }}</a>
                  </div>
                {%- endif -%}
              </div>
            </div>

        {%- endcase -%}
      {%- endfor -%}
    </div>
  </div>
  
  <!-- Bottom Bar with Copyright and Social Icons -->
  <div class="footer-custom__bottom">
    <div class="page-width">
      <div class="footer-custom__copyright">
        {% if section.settings.copyright_text != blank %}
          {{ section.settings.copyright_text }}
        {% else %}
          &copy; {{ "now" | date: "%Y" }} {{ shop.name }}. All rights reserved.
        {% endif %}
      </div>
      
      {%- if section.settings.show_social_icons -%}
        <div class="footer-custom__social-icons">
          {%- if section.settings.social_facebook_link != blank -%}
            <a href="{{ section.settings.social_facebook_link }}" class="footer-custom__social-icon" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 32 32"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"/></svg>
            </a>
          {%- endif -%}
          {%- if section.settings.social_instagram_link != blank -%}
            <a href="{{ section.settings.social_instagram_link }}" class="footer-custom__social-icon" target="_blank">
              <svg width="20" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="15.5" y="9" width="2" height="2" rx="1" transform="rotate(-90 15.5 9)" fill="currentColor"/>
                <rect x="16" y="8.5" width="1" height="1" rx="0.5" transform="rotate(-90 16 8.5)" stroke="currentColor" stroke-linecap="round"/>
            </svg>
            </a>
          {%- endif -%}
          {%- if section.settings.social_twitter_link != blank -%}
            <a href="{{ section.settings.social_twitter_link }}" class="footer-custom__social-icon" target="_blank">
              Twitter
            </a>
          {%- endif -%}
          {%- if section.settings.social_tiktok_link != blank -%}
            <a href="{{ section.settings.social_tiktok_link }}" class="footer-custom__social-icon" target="_blank">
              TikTok
            </a>
          {%- endif -%}
        </div>
      {%- endif -%}
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Custom footer",
  "tag": "footer",
  "class": "section-footer-custom",
  "limit": 1,
  "settings": [
    {
      "type": "header",
      "content": "Color Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Main background color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#333333"
    },
    {
      "type": "color",
      "id": "bottom_bg_color",
      "label": "Bottom bar background color",
      "default": "#f5f5f5"
    },
    {
      "type": "header",
      "content": "Copyright"
    },
    {
      "type": "text",
      "id": "copyright_text",
      "label": "Custom copyright text",
      "info": "Leave blank to show default copyright with store name and year."
    },
    {
      "type": "header",
      "content": "Social Media"
    },
    {
      "type": "checkbox",
      "id": "show_social_icons",
      "label": "Show social media icons",
      "default": true
    },
    {
      "type": "url",
      "id": "social_facebook_link",
      "label": "Facebook link"
    },
    {
      "type": "url",
      "id": "social_instagram_link",
      "label": "Instagram link"
    },
    {
      "type": "url",
      "id": "social_twitter_link",
      "label": "Twitter link"
    },
    {
      "type": "url",
      "id": "social_tiktok_link",
      "label": "TikTok link"
    }
  ],
  "blocks": [
    {
      "type": "@app"
    },
    {
      "type": "logo_about",
      "name": "Logo + About",
      "limit": 1,
      "settings": [
        {
          "type": "image_picker",
          "id": "logo",
          "label": "Logo image"
        },
        {
          "type": "richtext",
          "id": "about_text",
          "label": "About text",
          "default": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>"
        }
      ]
    },
    {
      "type": "menu",
      "name": "Menu Links",
      "settings": [
        {
          "type": "text",
          "id": "menu_title",
          "label": "Menu title",
          "default": "LOREM IPSUM"
        },
        {
          "type": "link_list",
          "id": "menu",
          "label": "Menu",
          "default": "footer"
        }
      ]
    },
    {
      "type": "address",
      "name": "Address Section",
      "settings": [
        {
          "type": "text",
          "id": "address_title",
          "label": "Address title",
          "default": "LOREM IPSUM"
        },
        {
          "type": "textarea",
          "id": "address",
          "label": "Address",
          "default": "123 Lorem Ipsum St.\nIpsum City, IC 12345"
        },
        {
          "type": "text",
          "id": "phone",
          "label": "Phone",
          "default": "+1 (555) 123-4567"
        },
        {
          "type": "text",
          "id": "email",
          "label": "Email",
          "default": "lorem@ipsum.com"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Custom footer",
      "settings": {
        "background_color": "#ffffff",
        "heading_color": "#000000",
        "text_color": "#333333",
        "bottom_bg_color": "#f5f5f5"
      },
      "blocks": [
        {
          "type": "logo_about",
          "settings": {
            "about_text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>"
          }
        },
        {
          "type": "menu",
          "settings": {
            "menu_title": "LOREM IPSUM",
            "menu": "footer"
          }
        },
        {
          "type": "menu",
          "settings": {
            "menu_title": "DOLOR SIT",
            "menu": "footer"
          }
        },
        {
          "type": "address",
          "settings": {
            "address_title": "LOREM IPSUM",
            "address": "123 Lorem Ipsum St.\nIpsum City, IC 12345",
            "phone": "+1 (555) 123-4567",
            "email": "lorem@ipsum.com"
          }
        }
      ]
    }
  ],
  "enabled_on": {
    "groups": ["footer"]
  }
}
{% endschema %}`
    },
    {
        id: "custom-services-card",
        slug: "custom-services-card",
        title: "Custom Services Card",
        platform: "shopify",
        category: "Service",
        language: "liquid",
        ext: ".liquid",
        description: "A customizable services card section for Shopify stores that allows you to display a list of services with icons, titles, and descriptions. Ideal for showcasing the services your business offers in a visually appealing way.",
        tags: ["service", "liquid", "services", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["service", "liquid", "services", "shopify"],
        code: `
<style>
  /* ----- SERVICES SECTION ----- */
  .services-section {
    background: #eaf1f1;
    padding: 80px 0;
  }

  .services-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .services-layout {
    display: grid;
    grid-template-columns: 1fr 420px 1fr;
    gap: 40px;
    align-items: center;
  }

  .service-card {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
  }

  .service-card:last-child {
    margin-bottom: 0;
  }

  .service-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .service-icon img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  .service-content h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1e1e1e;
  }

  .service-content p {
    font-size: 14px;
    color: #555;
    margin-bottom: 6px;
    line-height: 1.5;
  }

  .service-content a {
    font-size: 14px;
    font-weight: 500;
    color: #1e1e1e;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
    display: inline-block;
  }

  .service-content a:hover {
    border-bottom-color: #1e1e1e;
  }

  .services-image img {
    width: 100%;
    border-radius: 20px;
    display: block;
  }

  @media (max-width: 992px) {
    .services-layout {
      grid-template-columns: 1fr 300px 1fr;
      gap: 30px;
    }
  }
</style>
{%- style -%}
  .services-section-{{ section.id }} {
    background: {{ section.settings.background_color }};
    padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;
  }

  .services-section-{{ section.id }} .services-header h2 {
    font-size: {{ section.settings.heading_size }}px;
    font-weight: {{ section.settings.heading_weight }};
    color: {{ section.settings.heading_color }};
    margin-bottom: 8px;
  }

  .services-section-{{ section.id }} .services-header p {
    font-size: {{ section.settings.text_size }}px;
    color: {{ section.settings.text_color }};
  }

  .services-section-{{ section.id }} .service-content h3 {
    font-size: {{ section.settings.card_title_size }}px;
    color: {{ section.settings.card_title_color }};
  }

  .services-section-{{ section.id }} .service-content p {
    font-size: {{ section.settings.card_text_size }}px;
    color: {{ section.settings.card_text_color }};
  }

  .services-section-{{ section.id }} .service-content a {
    font-size: {{ section.settings.card_text_size }}px;
    color: {{ section.settings.link_color }};
  }

  .services-section-{{ section.id }} .service-content a:hover {
    border-bottom-color: {{ section.settings.link_hover_color }};
  }

  @media (max-width: 768px) {
    .services-section-{{ section.id }} {
      padding: 60px 0;
    }
    
    .services-section-{{ section.id }} .services-layout {
      grid-template-columns: 1fr !important;
      gap: 30px;
    }
    
    .services-section-{{ section.id }} .services-image {
      order: -1;
      max-width: 400px;
      margin: 0 auto;
    }
  }
{%- endstyle -%}

<section class="services-section services-section-{{ section.id }}">
  <div class="page-width">
    <div class="services-header">
      <h2>{{ section.settings.heading | default: 'Our Services' }}</h2>
      <p>{{ section.settings.subheading | default: 'From eye tests to stylish frames – Everything you need in one place' }}</p>
    </div>
    
    <div class="services-layout">
      <!-- LEFT COLUMN -->
      <div class="services-col left-services">
        {% for block in section.blocks %}
          {% if block.type == 'left' %}
            <div class="service-card">
              <div class="service-icon">
                {% if block.settings.icon != blank %}
                  <img src="{{ block.settings.icon | img_url: '60x60' }}" alt="{{ block.settings.title | escape }}" loading="lazy" width="60" height="60">
                {% else %}
                  <img src="https://hdeyes.stagingwebsite.uk/wp-content/uploads/2026/03/Group-351.png" alt="" width="60" height="60" loading="lazy">
                {% endif %}
              </div>
              <div class="service-content">
                <h3>{{ block.settings.title | default: 'Service Title' }}</h3>
                <p>{{ block.settings.description | default: 'Service description goes here' }}</p>
                <a href="{{ block.settings.link_url | default: '#' }}" {% if block.settings.open_new_tab %}target="_blank" rel="noopener"{% endif %}>
                  {{ block.settings.link_text | default: 'View More' }} →
                </a>
              </div>
            </div>
          {% endif %}
        {% endfor %}
      </div>

      <!-- CENTER IMAGE -->
      <div class="services-image">
        {% if section.settings.center_image != blank %}
          <img src="{{ section.settings.center_image | img_url: 'master' }}" alt="{{ section.settings.image_alt | escape }}" loading="lazy" width="auto" height="auto">
        {% else %}
          <img src="https://hdeyes.stagingwebsite.uk/wp-content/uploads/2026/03/Group-1171275750.png" alt="Services" loading="lazy" width="auto" height="auto">
        {% endif %}
      </div>

      <!-- RIGHT COLUMN -->
      <div class="services-col right-services">
        {% for block in section.blocks %}
          {% if block.type == 'right' %}
            <div class="service-card">
              <div class="service-icon">
                {% if block.settings.icon != blank %}
                  <img src="{{ block.settings.icon | img_url: '60x60' }}" alt="{{ block.settings.title | escape }}" loading="lazy" width="60" height="60">
                {% else %}
                  <img src="https://hdeyes.stagingwebsite.uk/wp-content/uploads/2026/03/Group-352-2.png" alt="" width="60" height="60" loading="lazy">
                {% endif %}
              </div>
              <div class="service-content">
                <h3>{{ block.settings.title | default: 'Service Title' }}</h3>
                <p>{{ block.settings.description | default: 'Service description goes here' }}</p>
                <a href="{{ block.settings.link_url | default: '#' }}" {% if block.settings.open_new_tab %}target="_blank" rel="noopener"{% endif %}>
                  {{ block.settings.link_text | default: 'View More' }} →
                </a>
              </div>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Services with Image",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "header",
      "content": "Section Header"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Our Services"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "default": "From eye tests to stylish frames – Everything you need in one place"
    },
    {
      "type": "header",
      "content": "Center Image"
    },
    {
      "type": "image_picker",
      "id": "center_image",
      "label": "Center Image"
    },
    {
      "type": "text",
      "id": "image_alt",
      "label": "Image Alt Text",
      "default": "Services illustration"
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#eaf1f1"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading Color",
      "default": "#1e1e1e"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Subheading Color",
      "default": "#555555"
    },
    {
      "type": "color",
      "id": "card_title_color",
      "label": "Card Title Color",
      "default": "#1e1e1e"
    },
    {
      "type": "color",
      "id": "card_text_color",
      "label": "Card Text Color",
      "default": "#555555"
    },
    {
      "type": "color",
      "id": "link_color",
      "label": "Link Color",
      "default": "#1e1e1e"
    },
    {
      "type": "color",
      "id": "link_hover_color",
      "label": "Link Hover Color",
      "default": "#1e1e1e"
    },
    {
      "type": "header",
      "content": "Typography"
    },
    {
      "type": "range",
      "id": "heading_size",
      "label": "Heading Size",
      "min": 24,
      "max": 60,
      "step": 2,
      "default": 40,
      "unit": "px"
    },
    {
      "type": "select",
      "id": "heading_weight",
      "label": "Heading Font Weight",
      "options": [
        { "value": "400", "label": "Normal" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "600"
    },
    {
      "type": "range",
      "id": "text_size",
      "label": "Subheading Size",
      "min": 12,
      "max": 24,
      "step": 1,
      "default": 16,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "card_title_size",
      "label": "Card Title Size",
      "min": 14,
      "max": 32,
      "step": 1,
      "default": 20,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "card_text_size",
      "label": "Card Text Size",
      "min": 12,
      "max": 20,
      "step": 1,
      "default": 14,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Padding Top",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Padding Bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 80,
      "unit": "px"
    }
  ],
  "blocks": [
    {
      "type": "left",
      "name": "Left Column Service",
      "limit": 6,
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Icon",
          "info": "Recommended size: 60x60px"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Offers"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Oooh we like a cheeky offer or two.."
        },
        {
          "type": "text",
          "id": "link_text",
          "label": "Link Text",
          "default": "View More"
        },
        {
          "type": "url",
          "id": "link_url",
          "label": "Link URL"
        },
        {
          "type": "checkbox",
          "id": "open_new_tab",
          "label": "Open in new tab",
          "default": false
        }
      ]
    },
    {
      "type": "right",
      "name": "Right Column Service",
      "limit": 6,
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Icon",
          "info": "Recommended size: 60x60px"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Contacts"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "The other version of you"
        },
        {
          "type": "text",
          "id": "link_text",
          "label": "Link Text",
          "default": "View More"
        },
        {
          "type": "url",
          "id": "link_url",
          "label": "Link URL"
        },
        {
          "type": "checkbox",
          "id": "open_new_tab",
          "label": "Open in new tab",
          "default": false
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Services with Center Image",
      "category": "Custom",
      "blocks": [
        {
          "type": "left",
          "settings": {
            "title": "Offers",
            "description": "Oooh we like a cheeky offer or two.."
          }
        },
        {
          "type": "left",
          "settings": {
            "title": "Frames",
            "description": "Quirky, outrageous, subtle or sophisticated… we have a look for you!"
          }
        },
        {
          "type": "left",
          "settings": {
            "title": "Eye Tests",
            "description": "Don't compromise your peepers"
          }
        },
        {
          "type": "right",
          "settings": {
            "title": "Contacts",
            "description": "The other version of you"
          }
        },
        {
          "type": "right",
          "settings": {
            "title": "Zeiss i. Scription",
            "description": "Your eye's unique fingerprint"
          }
        },
        {
          "type": "right",
          "settings": {
            "title": "Vision at Work",
            "description": "Keep your staff safe"
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "explore-collection",
        slug: "explore-collection",
        title: "Explore Collection",
        platform: "shopify",
        category: "Collection",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that allows you to showcase a collection of products in an engaging and visually appealing way. Perfect for highlighting featured products, new arrivals, or seasonal collections.",
        tags: ["collection", "liquid", "products", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["collection", "liquid", "products", "shopify"],
        code: `{% comment %}
  Explore Collections Section
  Created for Shopify Dawn theme
{% endcomment %}
<style>
    .explore-collections {
      padding: 80px 0;
    }
    .explore-collections__grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    .explore-collections__left {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .explore-collections__right {
      position: relative;
    }
    .collection-card {
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      text-decoration: none;
      color: #fff;
    }
    .collection-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 16px;
      transition: transform 0.4s ease;
    }
    .collection-card:hover img {
      transform: scale(1.05);
    }
    .collection-card__info {
      position: absolute;
      bottom: 1.5rem;
      left: 1.5rem;
      font-size: 1.3rem;
      font-weight: 600;
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    .collection-card__info h3{
        font-size: 22px;
        margin-bottom: 0px;
    }
    .explore-collections__right .subheading {
      
    }
    .explore-collections__right .heading {
      position: relative;
    }
    .explore-collections__right .heading .highlight::after {
      content: "";
      position: absolute;
      bottom: -0.4rem;
      left: 0;
      width: 140px;
      height: 3px;
      background: #ffb200;
      border-radius: 3px;
    }

    .collection-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .collection-list__link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e5e5;
      transition: color 0.2s ease;
    }
    .collection-list__link:hover {
      color: #ffb200;
    }
    .collection-list__link .arrow {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .collection-preview {
      position: absolute;
      width: 180px;
      height: 220px;
      border-radius: 12px;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      background: #f8f8f8;
      z-index: 10;
    }
    .collection-preview.active {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    .collection-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 900px) {
      .explore-collections__grid {
        grid-template-columns: 1fr;
      }
      .explore-collections__left {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .explore-collections__left {
        grid-template-columns: 1fr;
      }
    }
  </style>
{%- liquid
  assign st = section.settings
  assign container = st.container
-%}

<section class="explore-collections section-{{ section.id }}">
  <div class="explore-collections__inner {{ container }}">
    <div class="explore-collections__grid">

      <!-- Left side: Collection cards -->
      <div class="explore-collections__left">
        {% for block in section.blocks %}
          {% if block.type == 'featured_col' %}
            {% assign collection = collections[block.settings.collection] %}
            {% if collection %}
              <a href="{{ collection.url }}" class="collection-card">
                {% if block.settings.image != blank %}
                  <div class="collection-card__image">
                    <img
                      src="{{ block.settings.image | image_url: width: 600 }}"
                      alt="{{ collection.title }}"
                      loading="lazy"
                    >
                  </div>
                {% elsif collection.image %}
                  <div class="collection-card__image">
                    <img
                      src="{{ collection.image | image_url: width: 600 }}"
                      alt="{{ collection.title }}"
                      loading="lazy"
                    >
                  </div>
                {% endif %}
                <div class="collection-card__info">
                  <h3>{{ collection.title }}</h3>
                  {% comment %} <span>{{ collection.all_products_count }}</span> {% endcomment %}
                </div>
              </a>
            {% endif %}
          {% endif %}
        {% endfor %}
      </div>

      <!-- Right side: Explore list -->
      <div class="explore-collections__right">
        {% if section.settings.subheading != blank %}
          <p class="subheading">{{ section.settings.subheading }}</p>
        {% endif %}
        {% if section.settings.heading != blank %}
          <h2 class="heading">
            {{ section.settings.heading }}
            <span class="highlight"></span>
          </h2>
        {% endif %}

        <ul class="collection-list">
          {% for block in section.blocks %}
            {% if block.type == 'list_item' %}
              {% assign collection = collections[block.settings.collection] %}
              {% if collection %}
                <li class="collection-list__item" data-image="{{ block.settings.image | image_url: width: 400 }}">
                  <a href="{{ collection.url }}" class="collection-list__link">
                    <span>{{ collection.title }}</span>
                    {% comment %} <span class="count">{{ collection.all_products_count }}</span> {% endcomment %}
                    <span class="arrow">→</span>
                  </a>
                </li>
              {% endif %}
            {% endif %}
          {% endfor %}
        </ul>

        <!-- Floating image preview -->
        <div class="collection-preview">
          <img src="" alt="" loading="lazy">
        </div>
      </div>

    </div>
  </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const rightSide = document.querySelector('.explore-collections__right');
  const items = document.querySelectorAll('.collection-list__item');
  const previewBox = document.querySelector('.collection-preview');
  const previewImg = previewBox.querySelector('img');

  let active = false;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.dataset.image;
      if (img) {
        previewImg.src = img;
        previewBox.classList.add('active');
        active = true;
      }
    });

    item.addEventListener('mousemove', e => {
      if (!active) return;
      const rect = rightSide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Move image near cursor but not directly under it
      previewBox.style.left = (x + 20) + "px";
      previewBox.style.top = (y - 60) + "px";
    });

    item.addEventListener('mouseleave', () => {
      previewBox.classList.remove('active');
      active = false;
    });
  });
});
</script>

{% schema %}
{
  "name": "Explore Collections",
  "settings": [
    {
      "type": "header",
      "content": "t:sections.all.header.general"
    },
    {
      "type": "select",
      "id": "container",
      "label": "t:sections.all.layout.label",
      "default": "container",
      "options": [
        { "value": "container", "label": "t:sections.all.layout.options__1.label" },
        { "value": "container-fluid", "label": "t:sections.all.layout.options__2.label" },
        { "value": "strecth-width", "label": "t:sections.all.layout.options__3.label" },
        { "value": "full-width", "label": "t:sections.all.layout.options__4.label" }
      ]
    },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Self Care Product" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Explore Collections" }
  ],
  "blocks": [
    {
      "type": "featured_col",
      "name": "Left side collection",
      "settings": [
        { "type": "collection", "id": "collection", "label": "Select Collection" },
        { "type": "image_picker", "id": "image", "label": "Custom Image (optional)" }
      ]
    },
    {
      "type": "list_item",
      "name": "Right side collection",
      "settings": [
        { "type": "collection", "id": "collection", "label": "Select Collection" },
        { "type": "image_picker", "id": "image", "label": "Hover Image (optional)" }
      ]
    }
  ],
  "presets": [
    { "name": "Explore Collections", "category": "Collections" }
  ]
}
{% endschema %}`
    },
    {
        id: "frequently-bought-sets",
        slug: "frequently-bought-sets",
        title: "Frequently Bought Sets",
        platform: "shopify",
        category: "Product",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that displays frequently bought product sets, allowing customers to view and purchase related products together. Ideal for increasing average order value by showcasing complementary items.",
        tags: ["product", "liquid", "frequently bought", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 530,
        demoUrl: "",
        seoKeywords: ["frequently bought", "liquid", "shopify"],
        code: `{%- liquid
  assign selected_products = block.settings.products

  if selected_products == blank and product.metafields.custom.frequently_bought_sets != blank
    assign selected_products = product.metafields.custom.frequently_bought_sets.value
  endif
-%}

{%- if selected_products != blank -%}
  {% style %}
    .fbs {
      margin-top: 2rem;
    }

    .fbs__header {
      margin-bottom: 1rem;
    }

    .fbs__title {
      margin: 0;
      font-size: 1.8rem;
      line-height: 1.2;
    }

    .fbs__grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
    }

    @media screen and (max-width: 989px) {
      .fbs__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media screen and (max-width: 749px) {
      .fbs__grid {
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
    }

    .fbs__card {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 18px;
      padding: 3rem 1rem 1rem;
      background: #fff;
      cursor: pointer;
      transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    }

    .fbs__card.is-selected {
      border-color: rgba(0, 0, 0, 0.35);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }

    .fbs__check {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      width: 14px !important;
      height: 14px !important;
      margin: 0 !important;
      accent-color: currentColor;
    }

    .fbs__tick {
      display: none;
    }

    .fbs__media {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      overflow: hidden;
      background: #f6f6f6;
      margin-bottom: 0.75rem;
    }

    .fbs__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 2 / 2;
    }

    .fbs__info {
      text-align: center;
    }

    .fbs__name {
      font-size: 0.85rem;
      line-height: 1.3;
      margin: 0 0 0.35rem;
      font-weight: 500;
    }

    .fbs__pricing {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .fbs__price {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .fbs__compare {
      color: #888;
      font-size: 0.8rem;
    }

    .fbs__free-badge {
      color: #fff;
      background: #c00;
      font-size: 0.7rem;
      padding: 0.2em 0.5em;
      border-radius: 4px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .fbs__message {
      margin: 1rem 0 0;
      font-size: 0.95rem;
      color: #000;
      background: #f8f8f8;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      text-align: center;
    }
  {% endstyle %}
  <script>
    (() => {
      const wrapper = document.querySelector('[data-fbs-wrapper]');
      if (!wrapper) return;

      const section = wrapper.closest('section');
      const productForm =
        section?.querySelector('product-form form') || section?.querySelector('form[action*="/cart/add"]');

      if (!productForm) return;

      const submitButton =
        productForm.querySelector('[type="submit"]') || productForm.querySelector('button[name="add"]');

      const messageEl = wrapper.querySelector('[data-fbs-message]');
      const checkboxes = Array.from(wrapper.querySelectorAll('[data-fbs-checkbox]'));
      const minRequired = parseInt(wrapper.dataset.minSelected || '2', 10);
      const root = window.Shopify?.routes?.root || '/';

      function setMessage(message = '') {
        if (!messageEl) return;
        if (!message) {
          messageEl.hidden = true;
          messageEl.innerHTML = '';
          return;
        }
        messageEl.hidden = false;
        messageEl.innerHTML = message;
      }

      function updateUI() {
        const selected = checkboxes.filter((box) => box.checked);
        const selectedCount = selected.length;

        checkboxes.forEach((box) => {
          const card = box.closest('.fbs__card');
          if (card) card.classList.toggle('is-selected', box.checked);
        });

        // Pehle minRequired selected = FREE badge, baaki = price show
        let freeCount = 0;
        checkboxes.forEach((box) => {
          const card = box.closest('.fbs__card');
          const freeBadge = card?.querySelector('[data-fbs-free-badge]');
          const priceEl = card?.querySelector('.fbs__price');
          if (!freeBadge || !priceEl) return;

          if (box.checked && freeCount < minRequired) {
            freeBadge.hidden = false;
            priceEl.style.display = 'none';
            freeCount++;
          } else {
            freeBadge.hidden = true;
            priceEl.style.display = '';
          }
        });

        if (selectedCount === 0) {
        setMessage(
            'Select <strong>' + minRequired + '</strong> products to get them <strong>FREE</strong>.'
        );
        } else if (selectedCount < minRequired) {
        setMessage(
            'Select <strong>' + (minRequired - selectedCount) + '</strong> more product(s) to get them free.'
        );
        }
      }

      checkboxes.forEach((box) => box.addEventListener('change', updateUI));
      updateUI();

      productForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();

          const selected = checkboxes.filter((box) => box.checked);

          if (selected.length < minRequired) {
            setMessage(
                'Please select at least <strong>' + minRequired + '</strong> products before adding to cart.'
            );
            return;
        }

          const mainVariantInput = productForm.querySelector('[name="id"]');
          const mainVariantId = mainVariantInput?.value;

          if (!mainVariantId) {
            setMessage('Main product variant not found.');
            return;
          }

          if (submitButton) {
            submitButton.setAttribute('aria-disabled', 'true');
            submitButton.classList.add('loading');
          }

          const items = [
            {
              id: Number(mainVariantId),
              quantity: 1,
            },
          ];

          selected.forEach((box, index) => {
            const isFree = index < minRequired;
            const variantId = isFree
              ? Number(box.dataset.freeVariantId || box.dataset.variantId)
              : Number(box.dataset.variantId);

            items.push({
              id: variantId,
              quantity: 1,
              properties: {
                _fbs_group: wrapper.dataset.sectionId || '',
                _fbs_rank: String(index + 1),
                _fbs_free: isFree ? 'Yes' : 'No',
              },
            });
          });

          const sections = [];
          const cartDrawerItems = document.querySelector('cart-drawer-items');
          const cartNotification = document.querySelector('cart-notification');

          if (cartDrawerItems && typeof cartDrawerItems.getSectionsToRender === 'function') {
            try {
              cartDrawerItems.getSectionsToRender().forEach((sec) => sections.push(sec.section));
            } catch (e) {
              console.warn('FBS: getSectionsToRender error', e);
            }
          }

          if (cartNotification) {
            sections.push('cart-notification-product');
          }

          const payload = { items };
          const uniqueSections = [...new Set(sections)];

          if (uniqueSections.length) {
            payload.sections = uniqueSections;
            payload.sections_url = window.location.pathname;
          }

          try {
            const response = await fetch(root + 'cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              credentials: 'same-origin',
              body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.description || data.message || 'Unable to add items to cart.');
            }

            const cartDrawer = document.querySelector('cart-drawer');

            try {
              if (cartNotification && typeof cartNotification.renderContents === 'function' && data.sections) {
                cartNotification.renderContents(data);
                if (typeof cartNotification.open === 'function') cartNotification.open();
              } else if (cartDrawer && typeof cartDrawer.renderContents === 'function' && data.sections) {
                cartDrawer.renderContents(data);
                if (typeof cartDrawer.open === 'function') cartDrawer.open();
              } else {
                window.location.href = root + '/cart';
              }
            } catch (renderError) {
              console.warn('FBS: cart render error', renderError);
              window.location.href = root + '/cart';
            }
          } catch (error) {
            setMessage(error.message || 'Something went wrong.');
          } finally {
            if (submitButton) {
              submitButton.classList.remove('loading');
              submitButton.removeAttribute('aria-disabled');
            }
          }
        },
        true
      );
    })();
  </script>

  <div
    class="fbs"
    data-fbs-wrapper
    data-section-id="{{ section_id }}"
    data-min-selected="{{ block.settings.minimum_required | default: 2 }}"
    {{ block.shopify_attributes }}
  >
    <div class="fbs__header">
      <h3 class="fbs__title">
        {{ block.settings.heading | escape }}
      </h3>
    </div>

    <div class="fbs__grid" role="list">
      {%- for item in selected_products limit: 4 -%}
        {%- assign variant = item.selected_or_first_available_variant -%}
        {%- assign price = variant.price -%}
        {%- assign compare_price = variant.compare_at_price -%}
        {%- assign free_variant = item.variants | where: 'title', 'Free' | first -%}

        <label class="fbs__card" role="listitem">
          <input
            class="fbs__check"
            type="checkbox"
            data-fbs-checkbox
            data-product-title="{{ item.title | escape }}"
            data-product-id="{{ item.id }}"
            data-variant-id="{{ variant.id }}"
            data-free-variant-id="{{ free_variant.id | default: variant.id }}"
            data-price="{{ price }}"
            data-compare-price="{{ compare_price }}"
            data-index="{{ forloop.index0 }}"
          >

          <span class="fbs__tick" aria-hidden="true"></span>

          <span class="fbs__media">
            {%- if item.featured_image != blank -%}
              {{
                item.featured_image
                | image_url: width: 600
                | image_tag:
                  loading: 'lazy',
                  widths: '200, 300, 400, 600',
                  sizes: '(min-width: 990px) 25vw, (min-width: 750px) 50vw, 100vw',
                  class: 'fbs__image',
                  alt: item.title
              }}
            {%- else -%}
              {{ 'product-1' | placeholder_svg_tag: 'fbs__image fbs__placeholder' }}
            {%- endif -%}
          </span>

          <div class="fbs__info">
            <p class="fbs__name">{{ item.title }}</p>
            <div class="fbs__pricing">
              <span class="fbs__price">{{ price | money }}</span>
              {%- if compare_price > price -%}
                <s class="fbs__compare">{{ compare_price | money }}</s>
              {%- endif -%}
              <span class="fbs__free-badge" data-fbs-free-badge hidden>FREE</span>
            </div>
          </div>
        </label>
      {%- endfor -%}
    </div>

    <p class="fbs__message" data-fbs-message>
      Select <strong>{{ block.settings.minimum_required | default: 2 }}</strong> products to get them
      <strong>FREE</strong>
    </p>
  </div>
{%- endif -%}`
    },
    {
        id: "advanced-image-with-info-blocks",
        slug: "advanced-image-with-info-blocks",
        title: "Advanced Image with Info Blocks",
        platform: "shopify",
        category: "Image With Info Blocks",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that allows you to display an advanced image alongside multiple information blocks. Ideal for showcasing products, features, or services with detailed descriptions and visuals.",
        tags: ["image", "info", "blocks", "liquid", "shopify", "advanced"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 143,
        demoUrl: "",
        seoKeywords: ["image", "info", "blocks", "liquid", "shopify", "advanced"],
        code: `{% comment %} Section: Advanced Image with Info Blocks – Image with two info blocks
Fully customizable: left image, right title, description, and two info blocks (social, video). {% endcomment %}

<style>
  #shopify-section-{{ section.id }} {
    background-color: {{ section.settings.bg_color }};
    {% if section.settings.bg_image != blank %}
      background-image: url('{{ section.settings.bg_image | image_url }}');
      background-size: cover;
      background-position: center;
    {% endif %}
    padding: 0;
  }

  .hd-more-section {
    color: {{ section.settings.text_color }};
  }

  {% comment %} .hd-more-section .page-width {
    padding: 0 24px;
  } {% endcomment %}

  .hd-more-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 0;
  }

  .hd-more-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .hd-more-content {
    padding: {{ section.settings.content_padding }}px {{ section.settings.content_padding_horizontal }}px;
  }

  .hd-more-title {
    font-size: {{ section.settings.title_size }}px;
    font-weight: 600;
    margin-bottom: 16px;
    color: {{ section.settings.title_color }};
  }

  .hd-more-text {
    font-size: {{ section.settings.desc_size }}px;
    color: {{ section.settings.desc_color }};
    margin-bottom: 40px;
    max-width: 500px;
  }

  .hd-info-item {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 20px;
  }

  .hd-info-item:last-child {
    margin-bottom: 0;
  }

  .hd-info-icon {
    flex-shrink: 0;
    width: {{ section.settings.icon_size }}px;
  }

  .hd-info-icon svg,
  .hd-info-icon img {
    width: 100%;
    height: auto;
    display: block;
  }

  .hd-info-content h3 {
    font-size: {{ section.settings.info_title_size }}px;
    font-weight: 600;
    margin-bottom: 6px;
    text-decoration: underline;
    text-underline-offset: 4px;
    color: {{ section.settings.info_title_color }};
  }

  .hd-info-content p {
    font-size: {{ section.settings.info_text_size }}px;
    color: {{ section.settings.info_text_color }};
    line-height: 1.6;
  }

  .hd-info-content a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .hd-info-content a:hover {
    border-bottom-color: currentColor;
  }

  @media screen and (max-width: 1024px) {
    .hd-more-wrapper {
      grid-template-columns: 1fr;
    }

    .hd-more-image img {
      max-height: 400px;
      object-fit: cover;
      width: 100%;
    }

    .hd-more-content {
      padding: 50px 30px;
    }
  }

  @media screen and (max-width: 768px) {
    .hd-more-content {
      padding: 40px 20px;
    }

    .hd-info-item {
      gap: 16px;
    }
  }
</style>

<section class="hd-more-section" id="shopify-section-{{ section.id }}">
  <div class="">
    <div class="hd-more-wrapper">
      <div class="hd-more-image">
        {% if section.settings.image != blank %}
          {{ section.settings.image | image_url: width: 1000 | image_tag: alt: section.settings.image.alt }}
        {% else %}
          <div class="placeholder-image">{{ 'image' | placeholder_svg_tag: 'placeholder-svg' }}</div>
        {% endif %}
      </div>
      <div class="hd-more-content">
        {% if section.settings.title != blank %}
          <h2 class="hd-more-title">{{ section.settings.title }}</h2>
        {% endif %}
        {% if section.settings.description != blank %}
          <p class="hd-more-text">{{ section.settings.description }}</p>
        {% endif %}

        {% for block in section.blocks %}
          <div class="hd-info-item" {{ block.shopify_attributes }}>
            <div class="hd-info-icon">
              {% if block.settings.icon != blank %}
                {{ block.settings.icon | image_url: width: 100 | image_tag: alt: block.settings.icon.alt }}
              {% elsif block.settings.icon_svg != blank %}
                {{ block.settings.icon_svg }}
              {% else %}
                {% if block.type == 'social' %}
                  <!-- Default social icon (Instagram-like) -->
                  <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.1685 11.8997C41.1685 12.7038 41.9733 13.5079 43.0983 13.5079C44.7057 13.5079 45.1882 12.8646 45.1882 11.8997C45.1882 11.7389 45.1882 11.7389 45.1882 11.5788C45.0281 11.0963 44.5449 10.7747 44.0639 10.4531C43.9023 10.4531 43.5814 10.2922 43.2605 10.2922C42.1334 10.293 41.1685 10.9355 41.1685 11.8997Z" fill="white"/>
                    <path d="M44.5462 6.59271C44.384 5.62781 43.7414 4.82373 42.938 4.82373C42.1332 4.82373 41.6508 5.62781 41.813 6.59271C41.9753 7.55761 42.6164 8.3617 43.4205 8.3617C44.0638 8.3617 44.7063 7.55761 44.5462 6.59271Z" fill="white"/>
                    <path d="M37.3095 18.654L40.0434 15.9201C41.6508 17.2067 43.5828 18.0107 45.6727 18.0107C50.6572 18.0107 54.6784 13.9896 54.6784 9.00501C54.6769 4.0197 50.6572 0 45.6719 0C40.6881 0 36.6662 4.02042 36.6662 9.00573C36.6662 11.2572 37.4696 13.1862 38.7568 14.6343L36.0222 17.3689C36.5047 17.8506 36.9871 18.3338 37.3095 18.654ZM47.1193 6.11031H48.8875V4.34205H49.5308V6.11103H51.3005V6.7543H49.5308V8.524H48.8875V6.75358H47.1193V6.11031ZM43.0989 9.16583C43.0989 9.00501 43.0989 8.8442 43.2611 8.68338C43.0989 8.68338 43.0989 8.68338 42.9402 8.68338C41.653 8.68338 40.6881 7.71848 40.6881 6.59276C40.6881 5.46705 41.9739 4.50215 43.2611 4.50215H46.1544L45.5111 4.9846H44.5462C45.1895 5.14613 45.5111 5.95021 45.5111 6.75358C45.5111 7.39685 45.1895 7.8793 44.7063 8.36175C44.2239 8.68338 44.063 8.8442 44.063 9.16583C44.063 9.48746 44.5462 9.96991 44.8671 10.1307C45.6705 10.6132 45.832 11.2564 45.832 12.0605C45.832 13.1855 44.8671 14.1511 42.938 14.1511C41.3306 14.1511 39.8825 13.5079 39.8825 12.3822C39.8825 11.2564 41.1683 10.2915 42.7765 10.2915C42.9381 10.2915 43.0974 10.2915 43.259 10.2915C43.259 9.80981 43.0989 9.48818 43.0989 9.16583Z" fill="white"/>
                    <path d="M45.672 36.9877C43.5821 36.9877 41.4915 37.7911 40.0427 39.0783L37.3096 36.3438C36.9872 36.8262 36.5048 37.1464 36.1838 37.468L38.9184 40.2026C37.6319 41.8094 36.8278 43.7413 36.8278 45.8319C36.8278 50.8165 40.8497 54.8377 45.8343 54.8377C50.8181 54.8377 54.8407 50.8165 54.8407 45.8319C54.677 40.8466 50.6573 36.9877 45.672 36.9877ZM43.099 50.0139H41.33V44.3846H43.099V50.0139ZM42.2949 43.5819C41.6516 43.5819 41.1699 43.0988 41.1699 42.6156C41.1699 42.1331 41.6523 41.6507 42.2949 41.6507C42.9374 41.6507 43.4199 42.1331 43.4199 42.6156C43.259 43.2596 42.9381 43.5819 42.2949 43.5819ZM50.3357 50.0139H48.2451V47.1199C48.2451 46.3165 47.9242 45.8334 47.2795 45.8334C46.797 45.8334 46.4761 46.155 46.3146 46.4766C46.3146 46.6396 46.3146 46.799 46.3146 46.9598V50.016H44.3848C44.3848 50.016 44.3848 44.8699 44.3848 44.3867H46.3146V45.1908C46.4761 44.8699 47.1194 44.2259 48.0843 44.2259C49.3701 44.2259 50.3357 45.0293 50.3357 46.799V50.0139Z" fill="white"/>
                    <path d="M17.3682 36.3452L14.6343 39.0798C13.0261 37.7926 11.0963 36.9892 9.00573 36.9892C4.02041 36.9892 0 41.0111 0 45.9942C0 50.9795 4.02041 55.0007 9.00573 55.0007C13.9903 55.0007 18.0115 50.9795 18.0115 45.9942C18.0115 43.9036 17.2074 41.8137 15.9208 40.3656L18.6547 37.631C18.1723 37.1479 17.6898 36.6647 17.3682 36.3452ZM12.866 44.5461C12.866 47.28 10.7754 50.3348 7.07665 50.3348C5.95165 50.3348 4.82522 50.0132 4.02113 49.3685C4.18195 49.3685 4.34277 49.3685 4.50358 49.3685C5.46848 49.3685 6.27256 49.0476 7.07665 48.5651C6.27256 48.5651 5.46848 47.9219 5.14685 47.1171C5.30767 47.1171 5.46776 47.1171 5.46776 47.1171C5.6293 47.1171 5.7894 47.1171 5.95093 47.1171C4.98531 46.9548 4.34277 46.1522 4.34277 45.1873C4.6644 45.3488 4.98603 45.5082 5.30767 45.5082C4.82522 45.1873 4.34277 44.5433 4.34277 43.9C4.34277 43.5798 4.50358 43.2567 4.6644 42.9351C5.6293 44.2224 7.07593 45.0257 8.84491 45.0257C8.84491 44.8635 8.84491 44.7048 8.84491 44.5433C8.84491 43.4176 9.81053 42.4527 10.9355 42.4527C11.5788 42.4527 12.0612 42.7736 12.3836 43.0959C12.866 42.9344 13.3485 42.7743 13.6701 42.6135C13.5086 43.0959 13.187 43.4168 12.7045 43.7378C13.187 43.7378 13.5086 43.5762 13.8302 43.4168C13.5086 43.8993 13.187 44.2202 12.8653 44.3817C12.866 44.3846 12.866 44.3846 12.866 44.5461Z" fill="white"/>
                    <path d="M9.00573 18.0115C11.0963 18.0115 13.1862 17.2075 14.6343 15.9209L17.3682 18.6548C17.6898 18.1724 18.1723 17.8514 18.4939 17.5298L15.7593 14.7959C17.0458 13.1878 17.8499 11.258 17.8499 9.16735C17.8499 4.18204 13.8295 0.161621 8.84419 0.161621C3.8596 0.161621 0 4.18204 0 9.16735C0 13.9904 4.02041 18.0115 9.00573 18.0115ZM6.91511 7.55775H7.88001V6.59285C7.88001 5.30632 8.36246 4.50223 9.97063 4.50223H11.2572V6.1104H10.4531C9.80981 6.1104 9.80981 6.27122 9.80981 6.75367V7.55775H11.2572L11.0963 9.16591H9.64756V13.6688H7.71776V9.16591H6.75358V7.55775H6.91511Z" fill="white"/>
                    <path d="M35.5412 32.0018C35.3789 31.6816 35.058 31.5187 34.8979 31.5187C33.4505 31.0362 32.1647 30.716 30.7174 30.2328C30.5566 30.2328 30.2349 29.9119 30.2349 29.2679C30.2349 28.9456 30.2349 28.7848 29.914 28.7848C29.7518 28.7848 29.914 28.7848 29.7518 28.624C29.5917 27.9807 29.5917 27.6583 29.5917 27.4982C29.5917 27.3381 29.7518 27.3367 29.7518 27.1766C30.2349 26.5333 30.395 25.5692 30.395 25.2468C30.395 25.2468 30.5566 25.2468 30.5566 25.0853C30.7174 24.7636 30.7174 24.7636 30.7174 24.2805C30.8796 23.9603 30.8796 23.4778 30.5566 23.4778C30.395 23.6386 30.395 23.4778 30.395 23.1562V21.2264C30.395 20.5831 29.9119 20.1014 29.5917 19.9406C29.1078 19.6182 28.9484 19.4574 28.7869 19.4574C28.6253 19.2966 28.6253 19.1358 28.7869 18.975C28.9477 18.8149 29.1078 18.8149 29.1078 18.6533C29.1078 18.6533 29.1078 18.6533 28.9462 18.6533C28.7847 18.6533 27.8212 18.8156 27.3388 18.975C26.5347 19.1358 25.7306 19.4574 25.0866 19.9406C24.6042 20.2615 24.2826 20.7439 24.2826 21.3886C24.2826 21.7088 24.2826 22.6745 24.2826 23.3184C24.2826 23.4807 24.2826 23.6401 24.1217 23.4807C23.6393 23.4807 23.9609 24.124 23.9609 24.2833C23.9609 24.605 24.1217 24.7665 24.2818 25.0881C24.2818 25.2497 24.4434 25.2497 24.4434 25.2497C24.6042 25.7321 24.765 26.697 25.0866 27.1795C25.0866 27.1795 25.2482 27.341 25.2482 27.5011C25.2482 27.8227 25.2482 28.3052 25.0866 28.6268C25.0866 28.6268 25.0866 28.7884 24.9258 28.7884C24.6042 28.7884 24.6042 28.9492 24.6042 29.2708C24.6042 29.7533 24.2826 30.2364 24.1217 30.2364C23.3177 30.5566 20.9061 31.3614 20.1013 31.5222C19.6189 31.6845 19.4581 31.8439 19.2972 32.0047L18.4932 33.9345C21.7088 33.9345 23.3177 35.8643 26.6948 36.5076H28.303C31.6801 36.0251 34.0917 33.9345 36.3438 33.9345L35.5412 32.0018Z" fill="white"/>
                  </svg>
                {% elsif block.type == 'video' %}
                  <!-- Default video icon (play button) -->
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="22" stroke="white" stroke-width="1.5" />
                    <polygon points="18,15 34,23 18,31" fill="white" />
                  </svg>
                {% endif %}
              {% endif %}
            </div>
            <div class="hd-info-content">
              {% if block.settings.heading != blank %}
                <h3>{{ block.settings.heading }}</h3>
              {% endif %}
              {% if block.settings.text != blank %}
                <p>
                  {% if block.settings.link != blank %}<a href="{{ block.settings.link }}">{% endif %}
                  {{ block.settings.text }}
                  {% if block.settings.link != blank %}</a>{% endif %}
                </p>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Advanced Image with Info Blocks",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "header",
      "content": "Background"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background color",
      "default": "#2f2f2f"
    },
    {
      "type": "image_picker",
      "id": "bg_image",
      "label": "Background image (optional)"
    },
    {
      "type": "header",
      "content": "Left Image"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image",
      "info": "Recommended size: 800x600px"
    },
    {
      "type": "header",
      "content": "Right Content"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "More from HD Eyes"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "type": "header",
      "content": "Colors – Right Side"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "General text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "title_color",
      "label": "Title color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "desc_color",
      "label": "Description color",
      "default": "#dddddd"
    },
    {
      "type": "color",
      "id": "info_title_color",
      "label": "Info item heading color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "info_text_color",
      "label": "Info item text color",
      "default": "#cccccc"
    },
    {
      "type": "header",
      "content": "Typography"
    },
    {
      "type": "range",
      "id": "title_size",
      "min": 24,
      "max": 60,
      "step": 2,
      "unit": "px",
      "label": "Title size",
      "default": 40
    },
    {
      "type": "range",
      "id": "desc_size",
      "min": 14,
      "max": 24,
      "step": 1,
      "unit": "px",
      "label": "Description size",
      "default": 16
    },
    {
      "type": "range",
      "id": "info_title_size",
      "min": 16,
      "max": 30,
      "step": 1,
      "unit": "px",
      "label": "Info item heading size",
      "default": 20
    },
    {
      "type": "range",
      "id": "info_text_size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Info item text size",
      "default": 15
    },
    {
      "type": "range",
      "id": "icon_size",
      "min": 30,
      "max": 80,
      "step": 5,
      "unit": "px",
      "label": "Icon size",
      "default": 50
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "content_padding",
      "min": 20,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Content padding (top/bottom)",
      "default": 70
    },
    {
      "type": "range",
      "id": "content_padding_horizontal",
      "min": 20,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Content padding (left/right)",
      "default": 60
    }
  ],
  "blocks": [
    {
      "type": "social",
      "name": "Social block",
      "limit": 1,
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Custom icon (optional)"
        },
        {
          "type": "html",
          "id": "icon_svg",
          "label": "Icon SVG code (optional)"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Let’s Get Social"
        },
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "Like and share our social media pages for the latest offers and news."
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link (optional)"
        }
      ]
    },
    {
      "type": "video",
      "name": "Video block",
      "limit": 1,
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Custom icon (optional)"
        },
        {
          "type": "html",
          "id": "icon_svg",
          "label": "Icon SVG code (optional)"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Independents vs Big Chains"
        },
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "Watch our video on choosing between independents and big chain opticians"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link (optional)"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Advanced Image with Info Blocks",
      "settings": {
        "bg_color": "#2f2f2f",
        "title": "Lorem Ipsum",
        "description": "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "text_color": "#ffffff",
        "title_color": "#ffffff",
        "desc_color": "#dddddd",
        "info_title_color": "#ffffff",
        "info_text_color": "#cccccc"
      },
      "blocks": [
        {
          "type": "social"
        },
        {
          "type": "video"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "hero-banner-with-products",
        slug: "hero-banner-with-products",
        title: "Hero Banner with Products",
        platform: "shopify",
        category: "Hero Banner",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that features a hero banner with a selection of products. This section allows you to showcase your products prominently on your store's homepage, complete with images, titles, and pricing information.",
        tags: ["hero", "liquid", "products", "banner", "shopify", "Dawn Theme"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 1260,
        demoUrl: "",
        seoKeywords: ["hero", "liquid", "products", "banner", "shopify"],
        code: `{{ 'component-card.css' | asset_url | stylesheet_tag }}
{{ 'component-slider.css' | asset_url | stylesheet_tag }}
{{ 'banner-product-slider.css' | asset_url | stylesheet_tag }}

{%- style -%}
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
      padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
    }

    @media screen and (min-width: 750px) {
      .section-{{ section.id }}-padding {
        padding-top: {{ section.settings.padding_top }}px;
        padding-bottom: {{ section.settings.padding_bottom }}px;
      }
    }
    #HeroBannerProductSlider-{{ section.id }}{
      background-color: {{ section.settings.background_color }};
    }
    .hero-banner-product-slider__image {
      background-image: var(--bg-desktop);
    }
    .hero-banner-product-slider__content {
      max-width: {{ section.settings.text_max_width }}px;
    }
    .hero-banner-product-slider__subheading {
      color: {{ section.settings.accent_color }};
    }
    .hero-banner-product-slider__text {
      max-width: {{ section.settings.description_width }}%;
    }
    .hero-banner-product-slider__pagination .swiper-pagination-bullet-active {
      background: {{ section.settings.accent_color }};
    }
    .hero-banner-product-slider__nav-button:hover {
      background: {{ section.settings.accent_color }};
    }
    .hero-banner-product-slider__product-slider .card {
      background: {{ section.settings.card_background }};
      border-radius: {{ section.settings.card_radius }}px;
      border: {{ section.settings.card_border_width }}px solid {{ section.settings.card_border_color }};
      box-shadow: {{ section.settings.card_shadow }};
    }
    .hero-banner-product-slider__button {
      background-color: {{ section.settings.accent_color }};
      color: {{ section.settings.button_text_color }};
      border-radius: {{ section.settings.button_radius }}px;
      border: {{ section.settings.button_border_width }}px solid {{ section.settings.accent_color }};
    }
    .hero-banner-product-slider__button:hover {
      background-color: {{ section.settings.accent_color_hover }};
      border-color: {{ section.settings.accent_color_hover }};
      color: {{ section.settings.button_text_color }};
    }
    .hero-banner-product-slider {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
  }

  /* Background Images Container */
  .hero-banner-product-slider__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .hero-banner-product-slider__background-slider {
    width: 100%;
    height: 100%;
  }

  .hero-banner-product-slider__slide {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .hero-banner-product-slider__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .hero-banner-product-slider__image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%);
  }

  /* Main Content Container */
  .hero-banner-product-slider__main-container {
    position: relative;
    z-index: 20;
    max-width: var(--page-width);
    margin: 0 auto;
    padding: 0 1.5rem;
    width: 100%;
    height: 100%;
  }

  /* Inner Grid Container */
  .hero-banner-product-slider__grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  /* Left Content Column */
  .hero-banner-product-slider__content-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .hero-banner-product-slider__content {
    color: #fff;
    position: relative;
    z-index: 10;
  }

  .hero-banner-product-slider__subheading {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: calc(var(--font-heading-scale) * 1.2rem);
    margin-bottom: 1rem;
  }

  .hero-banner-product-slider__heading {
    line-height: 1.1;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    color: inherit;
  }

  .hero-banner-product-slider__text {
    margin-bottom: 3rem;
    font-size: 1.6rem;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.2s;
    color: inherit;
  }

  .hero-banner-product-slider__button-wrapper {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.4s;
    display: inline-block;
  }

  .swiper-slide-active .hero-banner-product-slider__heading,
  .swiper-slide-active .hero-banner-product-slider__text,
  .swiper-slide-active .hero-banner-product-slider__button-wrapper {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-banner-product-slider__button {
    display: inline-block;
    padding: 1.2rem 2.8rem;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  /* Pagination */
  .hero-banner-product-slider__pagination-container {
    margin-top: 4rem;
  }

  .hero-banner-product-slider__pagination {
    display: flex;
    gap: 0.8rem;
  }

  .hero-banner-product-slider__pagination .swiper-pagination-bullet {
    width: 1rem;
    height: 1rem;
    background: rgba(255, 255, 255, 0.3);
    opacity: 1;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 50%;
  }

  .hero-banner-product-slider__pagination .swiper-pagination-bullet-active {
    width: 2.5rem;
    border-radius: 0.5rem;
  }

  /* Right Product Slider Column */
  .hero-banner-product-slider__product-column {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .hero-banner-product-slider__product-slider-wrapper {
    width: 100%;
    min-width: 0;
    position: relative;
    overflow: hidden;
  }

  .hero-banner-product-slider__product-slider {
    width: 100%;
  }

  .hero-banner-product-slider__product-slider .swiper-slide {
    height: auto;
  }

  .hero-banner-product-slider__product-slider .card-wrapper {
    height: 100%;
  }

  .hero-banner-product-slider__product-slider .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .hero-banner-product-slider__product-slider .card__inner {
    flex: 1;
  }

  /* Product Slider Navigation */
  .hero-banner-product-slider-btn__controls {
    position: absolute;
    transform: translate(0%, -50%);
    top: 50%;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    width: 100%;
    right: 0px;
  }

  .hero-banner-product-slider__nav-button {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    border: none;
  }

  .hero-banner-product-slider__nav-button.next-btn {
    right: 0%;
  }

  .hero-banner-product-slider__nav-button.prev-btn {
    rotate: 180deg;
    left: 0%;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .hero-banner-product-slider__image {
      background-image: var(--bg-mobile) !important;
    }
  }

  @media (max-width: 1024px) {
    .hero-banner-product-slider {
      height: auto;
      min-height: auto;
      padding: 10rem 0 6rem;
    }

    .hero-banner-product-slider__grid-container {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 3rem;
    }

    .hero-banner-product-slider__content {
      margin: 0 auto;
      align-items: center;
      text-align: center;
      max-width: 90%;
    }

    .hero-banner-product-slider__text {
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-banner-product-slider__pagination-container {
      margin: 4rem auto 2rem;
      display: flex;
      justify-content: center;
    }

    .hero-banner-product-slider__product-slider .card {
      max-width: 30rem;
      margin: 0 auto;
    }

    .hero-banner-product-slider-btn__controls {
      display: none; /* Hide navigation buttons on mobile */
    }
  }

  @media (max-width: 768px) {
    .hero-banner-product-slider {
      padding: 8rem 0 4rem;
    }

    .hero-banner-product-slider__heading {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 480px) {
    .hero-banner-product-slider__heading {
      font-size: 2.8rem;
    }

    .hero-banner-product-slider__subheading {
      font-size: 1rem;
    }

    .hero-banner-product-slider__text {
      font-size: 1.4rem;
    }

    .hero-banner-product-slider__nav-button {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
{%- endstyle -%}

<section
  class="hero-banner-product-slider section-{{ section.id }}-padding"
  id="HeroBannerProductSlider-{{ section.id }}"
>
  <!-- Background Images Container -->
  <div class="hero-banner-product-slider__background">
    <div class="swiper hero-banner-product-slider__background-slider">
      <div class="swiper-wrapper">
        {% for block in section.blocks %}
          {% if block.type == 'slide' %}
            <div class="swiper-slide hero-banner-product-slider__slide">
              <div
                class="hero-banner-product-slider__image"
                style="
                  --bg-desktop: url('{{ block.settings.background_image_desktop | img_url: '2000x' }}');
                  --bg-mobile: url('{{ block.settings.background_image_mobile | default: block.settings.background_image_desktop | img_url: '1000x' }}');
                "
              ></div>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>

  <!-- Main Content Container -->
  <div class="hero-banner-product-slider__main-container">
    <div class="hero-banner-product-slider__grid-container">
      <!-- Left Column: Content & Pagination -->
      <div class="hero-banner-product-slider__content-column">
        <div class="hero-banner-product-slider__content">
          {% for block in section.blocks %}
            {% if block.type == 'slide' %}
              <div class="hero-banner-slide-content" data-slide-index="{{ forloop.index0 }}">
                <p class="hero-banner-product-slider__subheading">{{ block.settings.subtitle }}</p>
                <h1 class="hero-banner-product-slider__heading">{{ block.settings.title }}</h1>
                <p class="hero-banner-product-slider__text">{{ block.settings.description }}</p>
                <div class="hero-banner-product-slider__button-wrapper">
                  <a href="{{ block.settings.button_link }}" class="hero-banner-product-slider__button">
                    {{ block.settings.button_text }}
                  </a>
                </div>
              </div>
            {% endif %}
          {% endfor %}
        </div>

        <!-- Pagination -->
        <div class="hero-banner-product-slider__pagination-container">
          <div class="hero-banner-product-slider__pagination"></div>
        </div>
      </div>

      <!-- Right Column: Product Slider -->
      <div class="hero-banner-product-slider__product-column">
        <div class="hero-banner-product-slider__product-slider-wrapper">
          <div class="swiper hero-banner-product-slider__product-slider">
            <div class="swiper-wrapper">
              {% for block in section.blocks %}
                {% if block.type == 'product_slide' %}
                  <div class="swiper-slide">
                    {% if block.settings.product != blank %}
                      {% assign product = block.settings.product %}
                      {% render 'card-product',
                        card_product: product,
                        media_aspect_ratio: 'square',
                        show_secondary_image: false,
                        show_vendor: false,
                        show_rating: false,
                        show_quick_add: true,
                        section_id: section.id
                      %}
                    {% else %}
                      <div class="card-wrapper">
                        <div class="card">
                          <div class="card__inner">
                            <div class="card__media">
                              {{ 'product-1' | placeholder_svg_tag: 'placeholder-svg' }}
                            </div>
                            <div class="card__content">
                              <h3 class="card__heading">{{ block.settings.product_title }}</h3>
                              <div class="card-information">
                                <div class="price">
                                  <div class="price__container">
                                    <div class="price-item price-item--regular">
                                      {{ block.settings.product_price }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {% endif %}
                  </div>
                {% endif %}
              {% endfor %}
            </div>

            <!-- Product Slider Navigation -->
            <div class="hero-banner-product-slider-btn__controls">
              <button
                class="hero-banner-product-slider__nav-button prev-btn"
                aria-label="{{ 'general.slider.previous_slide' | t }}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.92546 0.237956C6.69464 0.00714337 6.32042 0.00714327 6.08961 0.237955C5.8588 0.468767 5.8588 0.842988 6.08961 1.0738L9.01507 3.99926L6.08961 6.92471C5.8588 7.15552 5.8588 7.52974 6.08961 7.76055C6.32042 7.99137 6.69464 7.99137 6.92545 7.76055L10.2688 4.41718C10.4996 4.18636 10.4996 3.81214 10.2688 3.58133L6.92546 0.237956ZM1.91039 0.237955C1.67958 0.00714327 1.30536 0.00714337 1.07454 0.237956C0.843732 0.468768 0.843733 0.842988 1.07454 1.0738L4 3.99925L1.07454 6.92471C0.843732 7.15552 0.843733 7.52974 1.07455 7.76055C1.30536 7.99137 1.67958 7.99137 1.91039 7.76055L5.25377 4.41718C5.48458 4.18637 5.48458 3.81214 5.25377 3.58133L1.91039 0.237955Z" fill="currentColor"/>
                </svg>
              </button>
              <button
                class="hero-banner-product-slider__nav-button next-btn"
                aria-label="{{ 'general.slider.next_slide' | t }}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.92546 0.237956C6.69464 0.00714337 6.32042 0.00714327 6.08961 0.237955C5.8588 0.468767 5.8588 0.842988 6.08961 1.0738L9.01507 3.99926L6.08961 6.92471C5.8588 7.15552 5.8588 7.52974 6.08961 7.76055C6.32042 7.99137 6.69464 7.99137 6.92545 7.76055L10.2688 4.41718C10.4996 4.18636 10.4996 3.81214 10.2688 3.58133L6.92546 0.237956ZM1.91039 0.237955C1.67958 0.00714327 1.30536 0.00714337 1.07454 0.237956C0.843732 0.468768 0.843733 0.842988 1.07454 1.0738L4 3.99925L1.07454 6.92471C0.843732 7.15552 0.843733 7.52974 1.07455 7.76055C1.30536 7.99137 1.67958 7.99137 1.91039 7.76055L5.25377 4.41718C5.48458 4.18637 5.48458 3.81214 5.25377 3.58133L1.91039 0.237955Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const sectionId = '{{ section.id }}';
    const heroSection = document.querySelector('#HeroBannerProductSlider-' + sectionId);

    if (!heroSection) return;

    // Initialize Background Slider
    const bgSwiper = new Swiper(heroSection.querySelector(".hero-banner-product-slider__background-slider"), {
      loop: {{ section.settings.loop_slides }},
      effect: "fade",
      fadeEffect: { crossFade: true },
      allowTouchMove: {{ section.settings.enable_touch }},
      speed: {{ section.settings.animation_speed }},
      autoplay: {{ section.settings.autoplay }} ? {
        delay: {{ section.settings.autoplay_delay }},
        disableOnInteraction: false,
      } : false,
    });

    // Initialize Product Slider
    const productSwiper = new Swiper(
      heroSection.querySelector(".hero-banner-product-slider__product-slider"),
      {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 600,
        grabCursor: true,

        navigation: {
          nextEl: heroSection.querySelector(".next-btn"),
          prevEl: heroSection.querySelector(".prev-btn"),
        },

        pagination: {
          el: heroSection.querySelector(".hero-banner-product-slider__pagination"),
          clickable: true,
        },

        breakpoints: {
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: {{ section.settings.desktop_columns }},
            spaceBetween: 30,
          },
        },
      }
    );

    // Get all content slides
    const contentSlides = heroSection.querySelectorAll('.hero-banner-slide-content');

    // Function to show content for active slide
    function showActiveContent(index) {
      contentSlides.forEach((slide, i) => {
        if (i === index) {
          slide.style.display = 'block';
          // Trigger animations
          setTimeout(() => {
            const heading = slide.querySelector('.hero-banner-product-slider__heading');
            const text = slide.querySelector('.hero-banner-product-slider__text');
            const buttonWrapper = slide.querySelector('.hero-banner-product-slider__button-wrapper');

            if (heading) {
              heading.style.opacity = '1';
              heading.style.transform = 'translateY(0)';
            }
            if (text) {
              text.style.opacity = '1';
              text.style.transform = 'translateY(0)';
            }
            if (buttonWrapper) {
              buttonWrapper.style.opacity = '1';
              buttonWrapper.style.transform = 'translateY(0)';
            }
          }, 50);
        } else {
          slide.style.display = 'none';
          // Reset animations
          const heading = slide.querySelector('.hero-banner-product-slider__heading');
          const text = slide.querySelector('.hero-banner-product-slider__text');
          const buttonWrapper = slide.querySelector('.hero-banner-product-slider__button-wrapper');

          if (heading) {
            heading.style.opacity = '0';
            heading.style.transform = 'translateY(30px)';
          }
          if (text) {
            text.style.opacity = '0';
            text.style.transform = 'translateY(30px)';
          }
          if (buttonWrapper) {
            buttonWrapper.style.opacity = '0';
            buttonWrapper.style.transform = 'translateY(30px)';
          }
        }
      });
    }

    // Initialize content visibility
    showActiveContent(0);

    // Sync Sliders
    productSwiper.on('slideChange', function () {
      const activeIndex = productSwiper.activeIndex;
      bgSwiper.slideToLoop(activeIndex);
      showActiveContent(activeIndex);
    });

    // Also sync when clicking pagination
    heroSection.querySelector('.hero-banner-product-slider__pagination').addEventListener('click', function(e) {
      if (e.target.classList.contains('swiper-pagination-bullet')) {
        const index = Array.from(this.children).indexOf(e.target);
        productSwiper.slideTo(index);
        showActiveContent(index);
      }
    });

    // Pause autoplay on hover
    if ({{ section.settings.pause_on_hover }}) {
      heroSection.addEventListener('mouseenter', function() {
        bgSwiper.autoplay.stop();
      });

      heroSection.addEventListener('mouseleave', function() {
        bgSwiper.autoplay.start();
      });
    }
  });
</script>

{% schema %}
{
  "name": "Hero banner with products",
  "class": "section",
  "settings": [
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#0b0b0b"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent color",
      "default": "#00A9A5"
    },
    {
      "type": "color",
      "id": "accent_color_hover",
      "label": "Accent color (hover)",
      "default": "#008f8c"
    },
    {
      "type": "range",
      "id": "text_max_width",
      "label": "Text max width",
      "min": 300,
      "max": 1000,
      "step": 50,
      "default": 550,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "description_width",
      "label": "Description width",
      "min": 50,
      "max": 100,
      "step": 5,
      "default": 100,
      "unit": "%"
    },
    {
      "type": "range",
      "id": "desktop_columns",
      "label": "Desktop columns",
      "min": 1,
      "max": 4,
      "step": 1,
      "default": 2
    },
    {
      "type": "color",
      "id": "card_background",
      "label": "Card background",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "card_border_color",
      "label": "Card border color",
      "default": "transparent"
    },
    {
      "type": "range",
      "id": "card_border_width",
      "label": "Card border width",
      "min": 0,
      "max": 5,
      "step": 1,
      "default": 0,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "card_radius",
      "label": "Card border radius",
      "min": 0,
      "max": 30,
      "step": 1,
      "default": 4,
      "unit": "px"
    },
    {
      "type": "text",
      "id": "card_shadow",
      "label": "Card shadow",
      "default": "0 4px 20px rgba(0,0,0,0.08)"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Button text color",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "button_radius",
      "label": "Button border radius",
      "min": 0,
      "max": 50,
      "step": 1,
      "default": 0,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "button_border_width",
      "label": "Button border width",
      "min": 0,
      "max": 5,
      "step": 1,
      "default": 0,
      "unit": "px"
    },
    {
      "type": "checkbox",
      "id": "loop_slides",
      "label": "Loop slides",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "enable_touch",
      "label": "Enable touch navigation",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "autoplay",
      "label": "Autoplay slides",
      "default": false
    },
    {
      "type": "range",
      "id": "autoplay_delay",
      "label": "Autoplay delay",
      "min": 1000,
      "max": 8000,
      "step": 500,
      "default": 5000,
      "unit": "ms"
    },
    {
      "type": "checkbox",
      "id": "pause_on_hover",
      "label": "Pause autoplay on hover",
      "default": true
    },
    {
      "type": "range",
      "id": "animation_speed",
      "label": "Slide animation speed",
      "min": 300,
      "max": 2000,
      "step": 100,
      "default": 800,
      "unit": "ms"
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_top",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 52
    }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Background slide",
      "settings": [
        {
          "type": "image_picker",
          "id": "background_image_desktop",
          "label": "Background image (desktop)"
        },
        {
          "type": "image_picker",
          "id": "background_image_mobile",
          "label": "Background image (mobile)"
        },
        {
          "type": "text",
          "id": "subtitle",
          "label": "Subtitle",
          "default": "New Arrival"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Smart Cooling Innovation"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Experience advanced cooling technology with the new 3-Star Inverter Fridge. Keeps your food fresh for longer with energy efficiency."
        },
        {
          "type": "text",
          "id": "button_text",
          "label": "Button text",
          "default": "Shop Fridge"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button link"
        }
      ]
    },
    {
      "type": "product_slide",
      "name": "Product slide",
      "settings": [
        {
          "type": "product",
          "id": "product",
          "label": "Product"
        },
        {
          "type": "text",
          "id": "product_title",
          "label": "Product title (fallback)",
          "info": "Used if no product is selected"
        },
        {
          "type": "text",
          "id": "product_price",
          "label": "Product price (fallback)",
          "info": "Used if no product is selected"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero banner with products",
      "category": "Home",
      "blocks": [
        {
          "type": "slide",
          "settings": {
            "subtitle": "New Arrival",
            "title": "Smart Cooling Innovation",
            "description": "Experience advanced cooling technology with the new 3-Star Inverter Fridge. Keeps your food fresh for longer with energy efficiency.",
            "button_text": "Shop Fridge"
          }
        },
        {
          "type": "slide",
          "settings": {
            "subtitle": "Networking",
            "title": "High Speed Connectivity",
            "description": "Upgrade your home network with the 24 Port Gigabit Switch. Seamless streaming, gaming, and automation for the entire smart home.",
            "button_text": "View Details"
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "hero-banner",
        slug: "hero-banner",
        title: "Hero Banner",
        platform: "shopify",
        category: "Banner",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that displays a hero banner with customizable text, images, and call-to-action buttons. This section is ideal for highlighting promotions, new products, or important announcements on your store's homepage.",
        tags: ["hero", "liquid", "products", "banner", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["hero", "liquid", "products", "banner", "shopify"],
        code: `{%- style -%}
  #shopify-section-{{ section.id }} {
    --section-padding-top: {{ section.settings.padding_top }}px;
    --section-padding-bottom: {{ section.settings.padding_bottom }}px;
    --section-bg-color: {{ section.settings.background_color }};
    --text-color: {{ section.settings.text_color }};
    --button-bg: {{ section.settings.button_bg_color }};
    --button-text: {{ section.settings.button_text_color }};
    --button-hover-bg: {{ section.settings.button_hover_bg }};
    --button-hover-text: {{ section.settings.button_hover_text }};
    --button-radius: {{ section.settings.button_radius }}px;
    --label-bg: {{ section.settings.label_bg_color }};
    --label-text: {{ section.settings.label_text_color }};
    --heading-size-desktop: {{ section.settings.heading_size_desktop }}px;
    --heading-size-tablet: {{ section.settings.heading_size_tablet }}px;
    --heading-size-mobile: {{ section.settings.heading_size_mobile }}px;
    --gap-desktop: {{ section.settings.gap_desktop }}px;
    --gap-tablet: {{ section.settings.gap_tablet }}px;
    --gap-mobile: {{ section.settings.gap_mobile }}px;
  }

  .hd-hero-{{ section.id }} {
    background: var(--section-bg-color);
    padding: var(--section-padding-top) 0 var(--section-padding-bottom);
  }

  .hd-hero-{{ section.id }} .hd-hero__container {
    display: grid;
    grid-template-columns: {{ section.settings.left_column_width }}fr {{ section.settings.right_column_width }}fr;
    gap: var(--gap-desktop);
    align-items: center;
  }

  /* Left Text Styles */
  .hd-hero-{{ section.id }} .hd-hero__text h1 {
    font-size: var(--heading-size-desktop);
    line-height: {{ section.settings.heading_line_height }};
    color: var(--text-color);
    font-weight: {{ section.settings.heading_weight }};
    margin: 0;
    {% if section.settings.heading_uppercase %}text-transform: uppercase;{% endif %}
  }

  /* Right Images Grid */
  .hd-hero-{{ section.id }} .hd-hero__images {
    display: grid;
    grid-template-columns: {{ section.settings.main_image_width }}fr {{ section.settings.side_images_width }}fr;
    gap: {{ section.settings.image_gap }}px;
  }

  /* Main Image */
  .hd-hero-{{ section.id }} .hd-hero__main {
    position: relative;
    height: {{ section.settings.main_image_height }}px;
  }

  .hd-hero-{{ section.id }} .hd-hero__main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: {{ section.settings.image_border_radius }}px;
  }

  /* Main Image Button */
  .hd-hero-{{ section.id }} .hd-hero__button {
    position: absolute;
    bottom: {{ section.settings.button_bottom_offset }}px;
    left: {{ section.settings.button_left_offset }}px;
    background: var(--button-bg);
    color: var(--button-text);
    padding: {{ section.settings.button_padding_vertical }}px {{ section.settings.button_padding_horizontal }}px;
    text-decoration: none;
    border-radius: var(--button-radius);
    font-size: {{ section.settings.button_size }}px;
    font-weight: {{ section.settings.button_weight }};
    transition: all 0.3s ease;
    display: inline-block;
    z-index: 2;
  }

  .hd-hero-{{ section.id }} .hd-hero__button:hover {
    background: var(--button-hover-bg);
    color: var(--button-hover-text);
    transform: translateY(-2px);
  }

  /* Side Images Container */
  .hd-hero-{{ section.id }} .hd-hero__side {
    display: flex;
    flex-direction: column;
    gap: {{ section.settings.image_gap }}px;
    height: 100%;
  }

  .hd-hero-{{ section.id }} .hd-hero__side-item {
    position: relative;
    height: {{ section.settings.side_image_height }}px;
  }

  .hd-hero-{{ section.id }} .hd-hero__side-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: {{ section.settings.image_border_radius }}px;
  }

  /* Vertical Label */
  .hd-hero-{{ section.id }} .hd-hero__vertical-label {
    position: absolute;
    bottom: {{ section.settings.label_bottom_offset }}px;
    left: {{ section.settings.label_left_offset }}px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    background: var(--label-bg);
    color: var(--label-text);
    padding: {{ section.settings.label_padding_vertical }}px {{ section.settings.label_padding_horizontal }}px;
    font-size: {{ section.settings.label_size }}px;
    letter-spacing: {{ section.settings.label_letter_spacing }}px;
    font-weight: {{ section.settings.label_weight }};
    text-transform: {{ section.settings.label_transform }};
    white-space: nowrap;
    z-index: 2;
  }

  /* Tablet Responsive */
  @media screen and (max-width: 989px) {
    .hd-hero-{{ section.id }} .hd-hero__container {
      grid-template-columns: 1fr;
      gap: var(--gap-tablet);
    }

    .hd-hero-{{ section.id }} .hd-hero__text {
      text-align: center;
    }

    .hd-hero-{{ section.id }} .hd-hero__text h1 {
      font-size: var(--heading-size-tablet);
    }

    .hd-hero-{{ section.id }} .hd-hero__images {
      grid-template-columns: 1fr;
      gap: {{ section.settings.image_gap_tablet }}px;
    }

    .hd-hero-{{ section.id }} .hd-hero__side {
      flex-direction: row;
    }

    .hd-hero-{{ section.id }} .hd-hero__side-item {
      height: {{ section.settings.side_image_height_tablet }}px;
      width: 50%;
    }

    .hd-hero-{{ section.id }} .hd-hero__main {
      height: {{ section.settings.main_image_height_tablet }}px;
    }
  }

  /* Mobile Responsive */
  @media screen and (max-width: 749px) {
    .hd-hero-{{ section.id }} {
      padding: {{ section.settings.padding_top_mobile }}px 0 {{ section.settings.padding_bottom_mobile }}px;
    }

    .hd-hero-{{ section.id }} .hd-hero__text h1 {
      font-size: var(--heading-size-mobile);
    }

    .hd-hero-{{ section.id }} .hd-hero__main {
      height: {{ section.settings.main_image_height_mobile }}px;
    }

    .hd-hero-{{ section.id }} .hd-hero__button {
      font-size: {{ section.settings.button_size_mobile }}px;
      padding: {{ section.settings.button_padding_vertical_mobile }}px {{ section.settings.button_padding_horizontal_mobile }}px;
      bottom: {{ section.settings.button_bottom_offset_mobile }}px;
      left: {{ section.settings.button_left_offset_mobile }}px;
    }

    .hd-hero-{{ section.id }} .hd-hero__side {
      flex-direction: column;
    }

    .hd-hero-{{ section.id }} .hd-hero__side-item {
      height: {{ section.settings.side_image_height_mobile }}px;
      width: 100%;
    }

    .hd-hero-{{ section.id }} .hd-hero__vertical-label {
      font-size: {{ section.settings.label_size_mobile }}px;
      padding: {{ section.settings.label_padding_vertical_mobile }}px {{ section.settings.label_padding_horizontal_mobile }}px;
      bottom: {{ section.settings.label_bottom_offset_mobile }}px;
      left: {{ section.settings.label_left_offset_mobile }}px;
    }
  }
{%- endstyle -%}

<section class="hd-hero-{{ section.id }}" aria-labelledby="hero-heading-{{ section.id }}">
  <div class="page-width">
    <div class="hd-hero__container">
      <!-- Left Text Content -->
      <div class="hd-hero__text">
        {%- if section.settings.heading != blank -%}
          <h1 id="hero-heading-{{ section.id }}">
            {{ section.settings.heading }}
          </h1>
        {%- else -%}
          <h1 id="hero-heading-{{ section.id }}">
            Inspire.<br />
            Innovate.<br />
            Indulge.
          </h1>
        {%- endif -%}
      </div>

      <!-- Right Images -->
      <div class="hd-hero__images">
        <!-- Main Image Block -->
        {%- for block in section.blocks -%}
          {%- if block.type == 'main_image' -%}
            <div class="hd-hero__main" {{ block.shopify_attributes }}>
              {%- if block.settings.image != blank -%}
                <img 
                  src="{{ block.settings.image | image_url: width: 800 }}"
                  srcset="
                    {{ block.settings.image | image_url: width: 550 }} 550w,
                    {{ block.settings.image | image_url: width: 720 }} 720w,
                    {{ block.settings.image | image_url: width: 800 }} 800w
                  "
                  sizes="(min-width: 990px) 50vw, 100vw"
                  alt="{{ block.settings.image.alt | escape }}"
                  loading="lazy"
                  width="{{ block.settings.image.width }}"
                  height="{{ block.settings.image.height }}"
                >
              {%- else -%}
                {{ 'hero-apparel-1' | placeholder_svg_tag: 'placeholder-svg' }}
              {%- endif -%}

              {%- if block.settings.button_label != blank and block.settings.button_link != blank -%}
                <a href="{{ block.settings.button_link }}" 
                   class="hd-hero__button"
                   {% if block.settings.open_new_tab %}target="_blank" rel="noopener noreferrer"{% endif %}>
                  {{ block.settings.button_label }}
                  {%- if block.settings.show_arrow -%}
                    <span class="hd-hero__button-arrow"> →</span>
                  {%- endif -%}
                </a>
              {%- endif -%}
            </div>
          {%- endif -%}
        {%- endfor -%}

        <!-- Side Images Block -->
        <div class="hd-hero__side">
          {%- for block in section.blocks -%}
            {%- if block.type == 'side_image' -%}
              <div class="hd-hero__side-item" {{ block.shopify_attributes }}>
                {%- if block.settings.image != blank -%}
                  <img 
                    src="{{ block.settings.image | image_url: width: 400 }}"
                    srcset="
                      {{ block.settings.image | image_url: width: 350 }} 350w,
                      {{ block.settings.image | image_url: width: 400 }} 400w
                    "
                    sizes="(min-width: 990px) 25vw, 50vw"
                    alt="{{ block.settings.image.alt | escape }}"
                    loading="lazy"
                    width="{{ block.settings.image.width }}"
                    height="{{ block.settings.image.height }}"
                  >
                {%- else -%}
                  {{ 'hero-apparel-2' | placeholder_svg_tag: 'placeholder-svg' }}
                {%- endif -%}

                {%- if block.settings.label != blank -%}
                  <span class="hd-hero__vertical-label">{{ block.settings.label | escape }}</span>
                {%- endif -%}
              </div>
            {%- endif -%}
          {%- endfor -%}
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Banner",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "header",
      "content": "Layout Settings"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 200,
      "step": 4,
      "unit": "px",
      "label": "Padding top (desktop)",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom (desktop)",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top (mobile)",
      "default": 60
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom (mobile)",
      "default": 60
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#f3f3f3"
    },
    {
      "type": "header",
      "content": "Grid Settings"
    },
    {
      "type": "range",
      "id": "left_column_width",
      "min": 1,
      "max": 3,
      "step": 0.5,
      "label": "Left column width (text)",
      "default": 1,
      "info": "Fractions (e.g., 1 = 1fr, 2 = 2fr)"
    },
    {
      "type": "range",
      "id": "right_column_width",
      "min": 1,
      "max": 4,
      "step": 0.5,
      "label": "Right column width (images)",
      "default": 2,
      "info": "Fractions (e.g., 2 = 2fr)"
    },
    {
      "type": "range",
      "id": "gap_desktop",
      "min": 10,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Gap between columns (desktop)",
      "default": 50
    },
    {
      "type": "range",
      "id": "gap_tablet",
      "min": 10,
      "max": 60,
      "step": 5,
      "unit": "px",
      "label": "Gap between columns (tablet)",
      "default": 40
    },
    {
      "type": "range",
      "id": "gap_mobile",
      "min": 10,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Gap between columns (mobile)",
      "default": 30
    },
    {
      "type": "header",
      "content": "Heading Settings"
    },
    {
      "type": "textarea",
      "id": "heading",
      "label": "Heading text",
      "default": "Inspire.\nInnovate.\nIndulge.",
      "info": "Use <br> for line breaks"
    },
    {
      "type": "range",
      "id": "heading_size_desktop",
      "min": 30,
      "max": 100,
      "step": 2,
      "unit": "px",
      "label": "Heading size (desktop)",
      "default": 70
    },
    {
      "type": "range",
      "id": "heading_size_tablet",
      "min": 24,
      "max": 70,
      "step": 2,
      "unit": "px",
      "label": "Heading size (tablet)",
      "default": 48
    },
    {
      "type": "range",
      "id": "heading_size_mobile",
      "min": 20,
      "max": 50,
      "step": 2,
      "unit": "px",
      "label": "Heading size (mobile)",
      "default": 34
    },
    {
      "type": "select",
      "id": "heading_weight",
      "label": "Heading font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "600"
    },
    {
      "type": "range",
      "id": "heading_line_height",
      "min": 1,
      "max": 1.8,
      "step": 0.1,
      "label": "Heading line height",
      "default": 1.1
    },
    {
      "type": "checkbox",
      "id": "heading_uppercase",
      "label": "Uppercase heading",
      "default": false
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#0c5a57"
    },
    {
      "type": "header",
      "content": "Image Grid Settings"
    },
    {
      "type": "range",
      "id": "main_image_width",
      "min": 1,
      "max": 3,
      "step": 0.5,
      "label": "Main image width",
      "default": 2,
      "info": "Fractions (e.g., 2 = 2fr)"
    },
    {
      "type": "range",
      "id": "side_images_width",
      "min": 0.5,
      "max": 2,
      "step": 0.5,
      "label": "Side images width",
      "default": 1,
      "info": "Fractions (e.g., 1 = 1fr)"
    },
    {
      "type": "range",
      "id": "image_gap",
      "min": 5,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Gap between images (desktop)",
      "default": 20
    },
    {
      "type": "range",
      "id": "image_gap_tablet",
      "min": 5,
      "max": 30,
      "step": 5,
      "unit": "px",
      "label": "Gap between images (tablet)",
      "default": 20
    },
    {
      "type": "range",
      "id": "image_border_radius",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "label": "Image border radius",
      "default": 0
    },
    {
      "type": "header",
      "content": "Image Heights"
    },
    {
      "type": "range",
      "id": "main_image_height",
      "min": 300,
      "max": 800,
      "step": 10,
      "unit": "px",
      "label": "Main image height (desktop)",
      "default": 500
    },
    {
      "type": "range",
      "id": "main_image_height_tablet",
      "min": 250,
      "max": 600,
      "step": 10,
      "unit": "px",
      "label": "Main image height (tablet)",
      "default": 400
    },
    {
      "type": "range",
      "id": "main_image_height_mobile",
      "min": 200,
      "max": 500,
      "step": 10,
      "unit": "px",
      "label": "Main image height (mobile)",
      "default": 350
    },
    {
      "type": "range",
      "id": "side_image_height",
      "min": 200,
      "max": 600,
      "step": 10,
      "unit": "px",
      "label": "Side image height (desktop)",
      "default": 240
    },
    {
      "type": "range",
      "id": "side_image_height_tablet",
      "min": 150,
      "max": 400,
      "step": 10,
      "unit": "px",
      "label": "Side image height (tablet)",
      "default": 220
    },
    {
      "type": "range",
      "id": "side_image_height_mobile",
      "min": 150,
      "max": 350,
      "step": 10,
      "unit": "px",
      "label": "Side image height (mobile)",
      "default": 200
    },
    {
      "type": "header",
      "content": "Button Settings"
    },
    {
      "type": "color",
      "id": "button_bg_color",
      "label": "Button background",
      "default": "#0c5a57"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Button text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "button_hover_bg",
      "label": "Button hover background",
      "default": "#094542"
    },
    {
      "type": "color",
      "id": "button_hover_text",
      "label": "Button hover text",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "button_radius",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "label": "Button border radius",
      "default": 6
    },
    {
      "type": "range",
      "id": "button_size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Button font size (desktop)",
      "default": 14
    },
    {
      "type": "range",
      "id": "button_size_mobile",
      "min": 11,
      "max": 18,
      "step": 1,
      "unit": "px",
      "label": "Button font size (mobile)",
      "default": 13
    },
    {
      "type": "select",
      "id": "button_weight",
      "label": "Button font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "500"
    },
    {
      "type": "range",
      "id": "button_padding_vertical",
      "min": 6,
      "max": 30,
      "step": 2,
      "unit": "px",
      "label": "Button vertical padding (desktop)",
      "default": 12
    },
    {
      "type": "range",
      "id": "button_padding_horizontal",
      "min": 10,
      "max": 40,
      "step": 2,
      "unit": "px",
      "label": "Button horizontal padding (desktop)",
      "default": 18
    },
    {
      "type": "range",
      "id": "button_padding_vertical_mobile",
      "min": 6,
      "max": 20,
      "step": 2,
      "unit": "px",
      "label": "Button vertical padding (mobile)",
      "default": 10
    },
    {
      "type": "range",
      "id": "button_padding_horizontal_mobile",
      "min": 8,
      "max": 30,
      "step": 2,
      "unit": "px",
      "label": "Button horizontal padding (mobile)",
      "default": 14
    },
    {
      "type": "range",
      "id": "button_bottom_offset",
      "min": 5,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Button bottom offset (desktop)",
      "default": 20
    },
    {
      "type": "range",
      "id": "button_left_offset",
      "min": 5,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Button left offset (desktop)",
      "default": 20
    },
    {
      "type": "range",
      "id": "button_bottom_offset_mobile",
      "min": 5,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Button bottom offset (mobile)",
      "default": 15
    },
    {
      "type": "range",
      "id": "button_left_offset_mobile",
      "min": 5,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Button left offset (mobile)",
      "default": 15
    },
    {
      "type": "header",
      "content": "Vertical Label Settings"
    },
    {
      "type": "color",
      "id": "label_bg_color",
      "label": "Label background",
      "default": "#0c5a57"
    },
    {
      "type": "color",
      "id": "label_text_color",
      "label": "Label text color",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "label_size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "label": "Label font size (desktop)",
      "default": 14
    },
    {
      "type": "range",
      "id": "label_size_mobile",
      "min": 10,
      "max": 18,
      "step": 1,
      "unit": "px",
      "label": "Label font size (mobile)",
      "default": 12
    },
    {
      "type": "select",
      "id": "label_weight",
      "label": "Label font weight",
      "options": [
        { "value": "400", "label": "Regular" },
        { "value": "500", "label": "Medium" },
        { "value": "600", "label": "Semi Bold" },
        { "value": "700", "label": "Bold" }
      ],
      "default": "500"
    },
    {
      "type": "range",
      "id": "label_letter_spacing",
      "min": 0,
      "max": 3,
      "step": 0.5,
      "unit": "px",
      "label": "Label letter spacing",
      "default": 1
    },
    {
      "type": "select",
      "id": "label_transform",
      "label": "Label text transform",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "uppercase", "label": "Uppercase" },
        { "value": "lowercase", "label": "Lowercase" },
        { "value": "capitalize", "label": "Capitalize" }
      ],
      "default": "uppercase"
    },
    {
      "type": "range",
      "id": "label_padding_vertical",
      "min": 4,
      "max": 20,
      "step": 2,
      "unit": "px",
      "label": "Label vertical padding",
      "default": 10
    },
    {
      "type": "range",
      "id": "label_padding_horizontal",
      "min": 2,
      "max": 15,
      "step": 1,
      "unit": "px",
      "label": "Label horizontal padding",
      "default": 6
    },
    {
      "type": "range",
      "id": "label_padding_vertical_mobile",
      "min": 4,
      "max": 16,
      "step": 2,
      "unit": "px",
      "label": "Label vertical padding (mobile)",
      "default": 8
    },
    {
      "type": "range",
      "id": "label_padding_horizontal_mobile",
      "min": 2,
      "max": 12,
      "step": 1,
      "unit": "px",
      "label": "Label horizontal padding (mobile)",
      "default": 5
    },
    {
      "type": "range",
      "id": "label_bottom_offset",
      "min": 5,
      "max": 50,
      "step": 5,
      "unit": "px",
      "label": "Label bottom offset (desktop)",
      "default": 20
    },
    {
      "type": "range",
      "id": "label_left_offset",
      "min": 0,
      "max": 30,
      "step": 5,
      "unit": "px",
      "label": "Label left offset (desktop)",
      "default": 0
    },
    {
      "type": "range",
      "id": "label_bottom_offset_mobile",
      "min": 5,
      "max": 40,
      "step": 5,
      "unit": "px",
      "label": "Label bottom offset (mobile)",
      "default": 15
    },
    {
      "type": "range",
      "id": "label_left_offset_mobile",
      "min": 0,
      "max": 25,
      "step": 5,
      "unit": "px",
      "label": "Label left offset (mobile)",
      "default": 0
    }
  ],
  "blocks": [
    {
      "type": "main_image",
      "name": "Main Image",
      "limit": 1,
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "text",
          "id": "button_label",
          "label": "Button label",
          "default": "Shop Our collection"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button link"
        },
        {
          "type": "checkbox",
          "id": "show_arrow",
          "label": "Show arrow in button",
          "default": true
        },
        {
          "type": "checkbox",
          "id": "open_new_tab",
          "label": "Open in new tab",
          "default": false
        }
      ]
    },
    {
      "type": "side_image",
      "name": "Side Image",
      "limit": 2,
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "text",
          "id": "label",
          "label": "Vertical label",
          "default": "Glasses"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero Banner",
      "blocks": [
        {
          "type": "main_image",
          "settings": {
            "button_label": "Shop Our collection",
            "show_arrow": true
          }
        },
        {
          "type": "side_image",
          "settings": {
            "label": "Glasses"
          }
        },
        {
          "type": "side_image",
          "settings": {
            "label": "Accessories"
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "hero-with-info",
        slug: "hero-with-info",
        title: "Hero with Info",
        platform: "shopify",
        category: "Hero Banner",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that displays a hero banner with an additional information block. This section is perfect for showcasing key features, benefits, or promotional content alongside your main hero image.",
        tags: ["hero", "liquid", "info", "banner", "shopify"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 550,
        demoUrl: "",
        seoKeywords: ["hero", "liquid", "info", "banner", "shopify"],
        code: `{%- style -%}
  #shopify-section-{{ section.id }} {
    --section-padding-top: {{ section.settings.padding_top }}px;
    --section-padding-bottom: {{ section.settings.padding_bottom }}px;
    --section-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
    --section-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
  }

  .hero-info-{{ section.id }} {
    position: relative;
    {% if section.settings.background_image != blank %}
      background-image: url('{{ section.settings.background_image | image_url: width: 2000 }}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    {% else %}
      background-color: #1a1a1a;
    {% endif %}
    height: 100%;
    display: flex;
    align-items: flex-start;
    color: #ffffff;
    padding: var(--section-padding-top) 0 var(--section-padding-bottom);
    margin: {{ section.settings.section_margin_top }}px 0 {{ section.settings.section_margin_bottom }}px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
  }

  /* Background overlay */
  {% if section.settings.show_overlay %}
  .hero-info-{{ section.id }}::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: #000000;
    opacity: {{ section.settings.overlay_opacity | divided_by: 100.0 }};
    z-index: 0;
    pointer-events: none;
  }
  {% endif %}

  .hero-info-{{ section.id }} .page-width {
    position: relative;
    z-index: 2;
  }

  .hero-info-{{ section.id }} .hero-info__container {
    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }

  /* Content */
  .hero-info-{{ section.id }} .hero-info__content {
    position: relative;
    z-index: 2;
    max-width: 100%;
    text-align: left;
    padding-left: 270px;
  }

  .hero-info-{{ section.id }} .hero-info__subtitle {
    font-size: 22px;
    margin-bottom: 10px;
    color: #fff;
    text-transform: none;
  }

  .hero-info-{{ section.id }} .hero-info__title {
    font-size: 52px;
    margin: 0 0 20px;
    color: #ffffff;
  }

  .hero-info-{{ section.id }} .hero-info__title span {
    color: #00a6a6;
  }

  .hero-info-{{ section.id }} .hero-info__button {
    background: #1da8a3;
    padding: 6px 20px;
    border: 1px solid white;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    margin-top: 40px;
    color: #fff;
    text-decoration: none;
  }

  .hero-info-{{ section.id }} .hero-info__button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #00a6a6;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transition: all .3s ease;
  }

  .hero-info-{{ section.id }} .hero-info__image img {
    width: 100%;
    height: auto;
  }

  /* Bottom Info Bar */
  .hero-info-{{ section.id }} .hero-info__bar {
    position: relative;
    bottom: 0;
    left: 0;
    background: transparent;
    border-top: 5px solid #00a6a6;
    border-right: 1px solid #00a6a6;
    border-radius: 0px 60px 0px 0px;
    gap: 20px;
    max-width: 750px;
    width: 100%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .hero-info__divider {
    display: block !important;
    height: 70px;
    border: 1px #ffffff;
    border-style: dashed;
  }

  .hero-info-{{ section.id }} .hero-info__item {
    max-width: 300px;
    color: #ffffff;
  }

  .hero-info-{{ section.id }} .hero-info__item-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 15px;
  }

  .hero-info-{{ section.id }} .hero-info__item-icon svg {
    width: 20px;
    height: 20px;
  }

  .hero-info-{{ section.id }} .hero-info__item-icon h4 {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    font-family: 'Poppins';
  }

  .hero-info-{{ section.id }} .hero-info__item-content p {
    font-size: 14px;
    margin: 0;
  }

  /* Laptop Responsive */
  @media screen and (max-width: 1200px) {
    .hero-info-{{ section.id }} .hero-info__content{
      padding-left: 20px;
    }
    .hero-info-{{ section.id }}{
      padding-top: 70px !important;
    }
  }
  /* Tablet Responsive */
  @media screen and (max-width: 989px) {
    .hero-info-{{ section.id }} .hero-info__title {
      font-size: 36px;
    }
    .hero-info-{{ section.id }} .hero-info__bar {
      width: 80%;
    }
  }

  /* Mobile Responsive */
  @media screen and (max-width: 749px) {
    .hero-info-{{ section.id }} .hero-info__button{
      margin-top: 10px;
    }
    .hero-info-{{ section.id }} {
      height: 100%;
      padding: var(--section-padding-top-mobile) 0 var(--section-padding-bottom-mobile) !important;
    }

    .hero-info-{{ section.id }} .hero-info__title {
      font-size: 30px;
    }
    .hero-info-{{ section.id }} .hero-info__container {
      grid-template-columns: 1fr;
    }

    .hero-info-{{ section.id }} .hero-info__content {
      /* text-align: center; */
      padding-left: 0;
    }

    .hero-info-{{ section.id }} .hero-info__bar {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
      width: 95%;
      padding: 20px;
      height: 220px;
    }
    .hero-info__divider{
      display: none !important;
    }

    .hero-info-{{ section.id }} .hero-info__item-icon h4 {
      justify-content: center;
    }
    .hero-info-{{ section.id }} .hero-info__subtitle {
      font-size: 16px;
    }
  }
{%- endstyle -%}

<section class="hero-info-{{ section.id }}" aria-labelledby="hero-title-{{ section.id }}">
  <div class="page-width">
    <div class="hero-info__container">
      <!-- Content -->
      <div class="hero-info__content">
        {%- if section.settings.subtitle != blank -%}
          <div class="hero-info__subtitle">
            {{ section.settings.subtitle }}
          </div>
        {%- endif -%}

        {%- if section.settings.title != blank -%}
          <h1 id="hero-title-{{ section.id }}" class="hero-info__title">
            {{ section.settings.title }}
            {%- if section.settings.highlighted_text != blank -%}
              <span>{{ section.settings.highlighted_text }}</span>
            {%- endif -%}
          </h1>
        {%- endif -%}

        {%- if section.settings.button_label != blank and section.settings.button_link != blank -%}
          <a href="{{ section.settings.button_link }}" 
             class="hero-info__button"
             {% if section.settings.open_new_tab %}target="_blank" rel="noopener noreferrer"{% endif %}>
            {{ section.settings.button_label }}
            {%- if section.settings.show_button_icon -%}
              <span class="hero-info__button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            {%- endif -%}
          </a>
        {%- endif -%}
      </div>

      <!-- Floating Image -->
      {%- if section.settings.show_image and section.settings.image != blank -%}
        <div class="hero-info__image">
          <img 
            src="{{ section.settings.image | image_url: width: 600 }}"
            srcset="
              {{ section.settings.image | image_url: width: 400 }} 400w,
              {{ section.settings.image | image_url: width: 600 }} 600w,
              {{ section.settings.image | image_url: width: 800 }} 800w
            "
            sizes="(min-width: 990px) 605px, (min-width: 750px) 400px, 300px"
            alt="{{ section.settings.image.alt | escape | default: 'Hero product image' }}"
            loading="lazy"
            width="{{ section.settings.image.width }}"
            height="{{ section.settings.image.height }}"
          >
        </div>
      {%- endif -%}
    </div>
  </div>

  <!-- Bottom Info Bar -->
  {%- if section.blocks.size > 0 -%}
    <div class="hero-info__bar">
      {%- for block in section.blocks -%}
        {%- if block.type == 'info_item' -%}
          <div class="hero-info__item" {{ block.shopify_attributes }}>
            {%- if block.settings.icon_svg != blank -%}
              <div class="hero-info__item-icon">
                {{ block.settings.icon_svg }}
                <h4>
                  {%- if block.settings.title != blank -%}
                    {{ block.settings.title }}
                  {%- endif -%}
                </h4>
              </div>
            {%- endif -%}
            <div class="hero-info__item-content">
              {%- if block.settings.text != blank -%}
                <p>{{ block.settings.text }}</p>
              {%- endif -%}
            </div>
          </div>
          {%- if forloop.index == 1 -%}
            <div class="hero-info__divider"></div>
          {%- endif -%}
        {%- endif -%}
      {%- endfor -%}
    </div>
  {%- endif -%}
</section>

{% schema %}
{
  "name": "Hero with Info Bar",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "header",
      "content": "Background"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background image"
    },
    {
      "type": "checkbox",
      "id": "show_overlay",
      "label": "Show overlay",
      "default": false
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "label": "Overlay opacity",
      "default": 30
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "subtitle",
      "label": "Subtitle",
      "default": "Focused on Eye Health"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "See the World Clearly with"
    },
    {
      "type": "text",
      "id": "highlighted_text",
      "label": "Highlighted text",
      "default": "HD EYES"
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label",
      "default": "Explore New Arrivals"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    },
    {
      "type": "checkbox",
      "id": "open_new_tab",
      "label": "Open link in new tab",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_button_icon",
      "label": "Show button icon",
      "default": true
    },
    {
      "type": "header",
      "content": "Image"
    },
    {
      "type": "checkbox",
      "id": "show_image",
      "label": "Show image",
      "default": true
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Padding top (desktop)",
      "default": 0
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Padding bottom (desktop)",
      "default": 0
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "px",
      "label": "Padding top (mobile)",
      "default": 0
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "px",
      "label": "Padding bottom (mobile)",
      "default": 0
    },
    {
      "type": "range",
      "id": "section_margin_top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section margin top",
      "default": 0
    },
    {
      "type": "range",
      "id": "section_margin_bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Section margin bottom",
      "default": 0
    }
  ],
  "blocks": [
    {
      "type": "info_item",
      "name": "Info Item",
      "limit": 3,
      "settings": [
        {
          "type": "html",
          "id": "icon_svg",
          "label": "Icon SVG",
          "default": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.125 20.25C11.4546 20.25 12.7712 19.9881 13.9997 19.4793C15.2281 18.9705 16.3443 18.2246 17.2845 17.2845C18.2246 16.3443 18.9705 15.2281 19.4793 13.9997C19.9881 12.7712 20.25 11.4546 20.25 10.125C20.25 8.79537 19.9881 7.47875 19.4793 6.25033C18.9705 5.02191 18.2246 3.90574 17.2845 2.96554C16.3443 2.02535 15.2281 1.27955 13.9997 0.77072C12.7712 0.261891 11.4546 -1.98131e-08 10.125 0C7.43968 4.00143e-08 4.86435 1.06674 2.96554 2.96554C1.06674 4.86435 0 7.43968 0 10.125C0 12.8103 1.06674 15.3856 2.96554 17.2845C4.86435 19.1833 7.43968 20.25 10.125 20.25ZM9.864 14.22L15.489 7.47L13.761 6.03L8.9235 11.8339L6.42037 9.32963L4.82963 10.9204L8.20463 14.2954L9.07538 15.1661L9.864 14.22Z\" fill=\"#1DA8A3\"/></svg>"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Opening Hours"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "Text",
          "default": "Monday–Friday: 9:30 Am–5:30 Pm\nSaturday: 9 Am–4 Pm | Sunday: Closed"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero with Info Bar",
      "blocks": [
        {
          "type": "info_item",
          "settings": {
            "title": "Opening Hours",
            "text": "Monday–Friday: 9:30 Am–5:30 Pm\nSaturday: 9 Am–4 Pm | Sunday: Closed"
          }
        },
        {
          "type": "info_item",
          "settings": {
            "title": "Email Us",
            "text": "support@example.com"
          }
        }
      ]
    }
  ],
  "enabled_on": {
    "templates": ["index", "page", "collection", "product"]
  }
}
{% endschema %}`
    },
    {
        id: "icon-with-text",
        slug: "icon-with-text",
        title: "Icon with Text",
        platform: "shopify",
        category: "Content",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that displays an icon alongside text. This section is ideal for highlighting features, services, or key information with a visual representation.",
        tags: ["icon", "text", "liquid", "shopify", "content"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 315,
        demoUrl: "",
        seoKeywords: ["icon", "text", "liquid", "shopify", "content"],
        code: `<style>
  .icon-with-text-section-{{ section.id }} {
    padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;
    background-color: {{ section.settings.background_color }};
  }
  
  .icon-with-text-container {
    display: grid;
    grid-template-columns: repeat({{ section.settings.columns_desktop }}, 1fr);
    gap: {{ section.settings.column_gap }}px;
  }
  
  .icon-with-text-box {
    background: {{ section.settings.card_bg_color }};
    border: 1px solid {{ section.settings.card_border_color }};
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .icon-with-text-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px -10px hsl(174 72% 45% / .3);
    background: {{ section.settings.card_hover_bg_color }};
    border-color: {{ section.settings.card_hover_border_color }};
  }
  
  .icon-with-text-icon {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, hsl(174 72% 45%), hsl(174 82% 55%));
    padding: 12px;
    border-radius: 50px;
  }
  
  .icon-with-text-icon svg {
    width: 100%;
    height: 100%;
    stroke: {{ section.settings.icon_color }};
    transition: all 0.3s ease;
  }
  .icon-with-text-box:hover .icon-with-text-icon svg {
    stroke: {{ section.settings.icon_hover_color }};
    transform: scale(1.1);
  }
  
  .icon-with-text-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: {{ section.settings.title_color }};
  }
  
  .icon-with-text-box:hover .icon-with-text-title {
    color: {{ section.settings.title_hover_color }};
  }
  
  .icon-with-text-description {
    font-size: 14px;
    line-height: 1.5;
    color: {{ section.settings.text_color }};
  }
  
  .icon-with-text-box:hover .icon-with-text-description {
    color: {{ section.settings.text_hover_color }};
  }
  
  @media screen and (max-width: 989px) {
    .icon-with-text-container {
      grid-template-columns: repeat({{ section.settings.columns_tablet }}, 1fr);
    }
  }
  
  @media screen and (max-width: 749px) {
    .icon-with-text-container {
      grid-template-columns: repeat({{ section.settings.columns_mobile }}, 1fr);
    }
    
    .icon-with-text-section-{{ section.id }} {
      padding: {{ section.settings.padding_top_mobile }}px 0 {{ section.settings.padding_bottom_mobile }}px;
    }
  }
</style>

<section class="icon-with-text-section-{{ section.id }} color-{{ section.settings.color_scheme }}">
  <div class="page-width">
    <div class="section_content-box testimonial-header {% if section.settings.content_align == 'left' %}left{% elsif section.settings.content_align == 'center' %}center{% else %}right{% endif %}">
      <h2 class="title inline-richtext {{ section.settings.heading_size }}">{{ section.settings.heading }}</h2>
      <div class="section-description subtitle">{{ section.settings.description }}</div>
      <div class="testimonial-rating-bar">
        {% if section.settings.show_stars %}
          <span class="testimonial-stars">
            {% for i in (1..5) %}
              <span class="star">
                <!-- star svg -->
              </span>
            {% endfor %}
          </span>
        {% endif %}
        <span class="testimonial-star-text">{{ section.settings.star_text }}</span>
      </div>
    </div>
    <div class="icon-with-text-container">
      {% for block in section.blocks %}
        <div class="icon-with-text-box" {{ block.shopify_attributes }}>
          <div class="icon-with-text-icon">
            {{ block.settings.svg_code }}
          </div>
          <h3 class="icon-with-text-title">{{ block.settings.title }}</h3>
          <p class="icon-with-text-description">{{ block.settings.description }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Icon with text",
  "class": "section",
  "max_blocks": 8,
  "settings": [
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#ffffff"
    },
    {
      "type": "inline_richtext",
      "id": "heading",
      "label": "Section Heading",
      "default": "Why Choose Sports Frames Europe?"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        {
          "value": "h2",
          "label": "t:sections.all.heading_size.options__1.label"
        },
        {
          "value": "h1",
          "label": "t:sections.all.heading_size.options__2.label"
        },
        {
          "value": "h0",
          "label": "t:sections.all.heading_size.options__3.label"
        },
        {
          "value": "hxl",
          "label": "t:sections.all.heading_size.options__4.label"
        },
        {
          "value": "hxxl",
          "label": "t:sections.all.heading_size.options__5.label"
        }
      ],
      "default": "h1",
      "label": "t:sections.all.heading_size.label"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description",
      "default": "<p>Professional quality, innovative design, exceptional service.</p>"
    },
    {
      "type": "select",
      "id": "content_align",
      "options": [
        {
          "label": "left",
          "value": "left"
        },
        {
          "label": "center",
          "value": "center"
        },
        {
          "label": "right",
          "value": "right",
        }
      ],
      "default": "left",
      "label": "Content Alignment"
    },
    {
      "type": "header",
      "content": "Columns Settings"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 1,
      "max": 6,
      "step": 1,
      "label": "Columns on Desktop",
      "default": 4
    },
    {
      "type": "range",
      "id": "columns_tablet",
      "min": 1,
      "max": 4,
      "step": 1,
      "label": "Columns on Tablet",
      "default": 2
    },
    {
      "type": "range",
      "id": "columns_mobile",
      "min": 1,
      "max": 3,
      "step": 1,
      "label": "Columns on Mobile",
      "default": 1
    },
    {
      "type": "range",
      "id": "column_gap",
      "min": 0,
      "max": 50,
      "step": 2,
      "unit": "px",
      "label": "Column Gap",
      "default": 24
    },
    {
      "type": "color",
      "id": "card_bg_color",
      "label": "Card background color",
      "default": "#f8f8f8"
    },
    {
      "type": "color",
      "id": "card_border_color",
      "label": "Card border color",
      "default": "#e6e6e6"
    },
    {
      "type": "color",
      "id": "card_hover_bg_color",
      "label": "Card hover background",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "card_hover_border_color",
      "label": "Card hover border color",
      "default": "#d4d4d4"
    },
    {
      "type": "color",
      "id": "icon_color",
      "label": "Icon color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "icon_hover_color",
      "label": "Icon hover color",
      "default": "#3a3a3a"
    },
    {
      "type": "color",
      "id": "title_color",
      "label": "Title color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "title_hover_color",
      "label": "Title hover color",
      "default": "#3a3a3a"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#3a3a3a"
    },
    {
      "type": "color",
      "id": "text_hover_color",
      "label": "Text hover color",
      "default": "#000000"
    },
    {
      "type": "header",
      "content": "Desktop Padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Top padding",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Bottom padding",
      "default": 36
    },
    {
      "type": "header",
      "content": "Mobile Padding"
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Top padding (mobile)",
      "default": 24
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Bottom padding (mobile)",
      "default": 24
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature",
      "settings": [
        {
          "type": "textarea",
          "id": "svg_code",
          "label": "SVG Code",
          "info": "Paste your SVG code here. It will be scaled to 60x60px."
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Feature Title"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Feature description goes here."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Icon with text",
      "blocks": [
        {
          "type": "feature",
          "settings": {
            "svg_code": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M21.66 10.37l-1.15-1.15a1 1 0 00-1.41 0l-1.38 1.38-1.38-1.38a1 1 0 00-1.41 0l-1.15 1.15a1 1 0 000 1.41l1.38 1.38-1.38 1.38a1 1 0 000 1.41l1.15 1.15a1 1 0 001.41 0l1.38-1.38 1.38 1.38a1 1 0 001.41 0l1.15-1.15a1 1 0 000-1.41l-1.38-1.38 1.38-1.38a1 1 0 000-1.41zM14.5 5.5l-2.5 5-2.5-5h5zM5 19h14v2H5v-2zM3 5h2v10H3V5zm4 0h2v10H7V5z'/></svg>",
            "title": "Patented Design",
            "description": "No pins or clips - displays shirts without fabric damage."
          }
        },
        {
          "type": "feature",
          "settings": {
            "svg_code": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-8 8-2-2z'/></svg>",
            "title": "Easy Assembly",
            "description": "Simple home assembly with clear instructions included."
          }
        },
        {
          "type": "feature",
          "settings": {
            "svg_code": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'/></svg>",
            "title": "Next Day Delivery",
            "description": "Order by 1PM for next day delivery across UK & Europe."
          }
        },
        {
          "type": "feature",
          "settings": {
            "svg_code": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z'/></svg>",
            "title": "Professional Quality",
            "description": "Museum-grade materials at affordable prices."
          }
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "image-slider-with-audio",
        slug: "image-slider-with-audio",
        title: "Image Slider with Audio",
        platform: "shopify",
        category: "Image Slider",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that features an image slider with audio playback capabilities. This section allows you to showcase multiple images in a carousel format while providing an audio experience for your visitors.",
        tags: ["image slider", "audio", "liquid", "shopify", "carousel"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 1513,
        demoUrl: "",
        seoKeywords: ["image slider", "audio", "liquid", "shopify", "carousel"],
        code: `{% style %}
.audio-slider-{{ section.id }} {
  padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
  padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  margin-top: {{ section.settings.margin_top | times: 0.75 | round: 0 }}px;
  margin-bottom: {{ section.settings.margin_bottom | times: 0.75 | round: 0 }}px;
}

@media screen and (min-width: 750px) {
  .audio-slider-{{ section.id }} {
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
  }
}

.audio-slider-container-{{ section.id }} {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;
}

.audio-slider-main-media-{{ section.id }} {
  flex: 1;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.audio-slider-main-media-{{ section.id }} video {
  width: 100%;
  display: block;
  border-radius: 12px;
  height: 800px;
  object-fit: cover;
}

.audio-slider-content-{{ section.id }} {
  flex: 1.5;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.audio-slider-heading-{{ section.id }} {
  width: 100%;
  margin-bottom: 25px;
}

.audio-slider-heading-{{ section.id }} h2 {
  font-size: 32px;
  color: #820024;
  margin-bottom: 10px;
  line-height: 1.2;
}

.audio-slider-heading-{{ section.id }} p {
  font-size: 18px;
  color: #666;
  line-height: 1.5;
}

.audio-slider-slider-container-{{ section.id }} {
  width: 100%;
  position: relative;
}

.audio-slider-swiper-{{ section.id }} {
  width: 100%;
  padding: 10px 5px;
}

.audio-slider-swiper-wrapper-{{ section.id }} {
  display: flex;
  width: 100%;
}

.audio-slider-swiper-slide-{{ section.id }} {
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 500px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.audio-slider-slide-image-{{ section.id }} {
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
}

.audio-slider-swiper-slide-{{ section.id }} img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.audio-slider-audio-container-{{ section.id }} {
  background: #f1f3f4;
  padding: 10px;
  display: flex;
  margin-top: 10px;
  border-radius: 10px;
  /* Prevent Swiper from capturing events */
  pointer-events: auto !important;
}

.audio-slider-audio-player-{{ section.id }} {
  width: 100%;
  height: 40px;
  /* Ensure audio controls are clickable */
  pointer-events: auto !important;
}

/* Force all children of audio player to have pointer events */
.audio-slider-audio-player-{{ section.id }} * {
  pointer-events: auto !important;
}

.audio-slider-swiper-nav-{{ section.id }} {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 25px;
}

.audio-slider-swiper-button-{{ section.id }} {
  color: #ffffff;
  background: #7a001f;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 10;
  border: none;
}

.audio-slider-swiper-button-{{ section.id }}.swiper-button-disabled{
  opacity: 0.6;
  cursor: not-allowed;
}

.audio-slider-swiper-button-{{ section.id }} svg {
  width: 10px;
  height: 10px;
}

.placeholder-video-{{ section.id }} {
  background: #f5f5f5;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #666;
  font-size: 16px;
}

.placeholder-slide-{{ section.id }} {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #666;
  font-size: 14px;
  height: 100%;
}

@media screen and (max-width: 749px) {
  .audio-slider-container-{{ section.id }} {
    gap: 10px;
  }
  
  .audio-slider-main-media-{{ section.id }},
  .audio-slider-content-{{ section.id }} {
    min-width: 150px;
  }
  .audio-slider-main-media-{{ section.id }} video{
    height: 400px;
  }
  
  .audio-slider-heading-{{ section.id }} h2 {
    font-size: 24px;
  }
  
  .audio-slider-heading-{{ section.id }} p {
    font-size: 16px;
  }
  
  .audio-slider-swiper-slide-{{ section.id }} {
    height: 350px;
  }
  
  .audio-slider-swiper-nav-{{ section.id }} {
    margin-top: 20px;
  }
}

@media screen and (max-width: 480px) {
  .audio-slider-heading-{{ section.id }} h2 {
    font-size: 17px;
    margin-bottom: 0px;
  }
  
  .audio-slider-heading-{{ section.id }} p {
    font-size: 14px;
  }
  .audio-slider-heading-{{ section.id }}{
    margin-bottom: 8px;
  }
  
  .audio-slider-swiper-slide-{{ section.id }} {
    height: 300px;
  }
  
  .audio-slider-swiper-button-{{ section.id }} {
    width: 35px;
    height: 35px;
  }
  
  .placeholder-video-{{ section.id }} {
    height: 250px;
    font-size: 14px;
  }
}
{% endstyle %}

{% assign has_image = false %}

{% for block in section.blocks %}
  {% if block.settings.image != blank %}
    {% assign has_image = true %}
    {% break %}
  {% endif %}
{% endfor %}

{% if has_image or section.settings.main_video != blank %}
  <section class="audio-slider-{{ section.id }}">
    <div class="container audio-slider-container-{{ section.id }}">
      <!-- Left main video -->
      <div class="audio-slider-main-media-{{ section.id }}">
        {% if section.settings.main_video != blank %}
          {{ section.settings.main_video | video_tag: autoplay: true, loop: true, muted: true, controls: true, class: 'audio-slider-video-element' }}
        {% endif %}
      </div>

      <!-- Right content with heading and slider -->
      <div class="audio-slider-content-{{ section.id }}">
        {% if section.settings.heading != blank or section.settings.subheading != blank %}
          <div class="audio-slider-heading-{{ section.id }}">
            {% if section.settings.heading != blank %}
              <h2>{{ section.settings.heading }}</h2>
            {% endif %}
            {% if section.settings.subheading != blank %}
              <p>{{ section.settings.subheading }}</p>
            {% endif %}
          </div>
        {% endif %}
        
        <div class="audio-slider-slider-container-{{ section.id }}">
          <div class="audio-slider-swiper-{{ section.id }} swiper">
            <div class="audio-slider-swiper-wrapper-{{ section.id }} swiper-wrapper">
              {% for block in section.blocks %}
                {% if block.settings.image != blank or block.settings.audio != blank %}
                  <div class="audio-slider-swiper-slide-{{ section.id }} swiper-slide">
                    {% if block.settings.image != blank %}
                      <div class="audio-slider-slide-image-{{ section.id }}">
                        <img src="{{ block.settings.image | img_url: '500x' }}" alt="{{ block.settings.image.alt | escape }}" loading="lazy">
                      </div>
                    {% endif %}
                    
                    {% if block.settings.audio != blank %}
                      <div class="audio-slider-audio-container-{{ section.id }}">
                        <audio class="audio-slider-audio-player-{{ section.id }}" controls onclick="event.stopPropagation()">
                          <source src="{{ block.settings.audio }}" type="audio/mpeg">
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    {% endif %}
                  </div>
                {% endif %}
              {% endfor %}
            </div>
          </div>
          
          <!-- Navigation -->
          <div class="audio-slider-swiper-nav-{{ section.id }}">
            <button class="audio-slider-swiper-button-{{ section.id }} audio-slider-swiper-prev-{{ section.id }}">
              <svg viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2L2 8L8 14" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="audio-slider-swiper-button-{{ section.id }} audio-slider-swiper-next-{{ section.id }}">
              <svg viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L8 8L2 14" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
{% endif %}

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Initialize Swiper with proper configuration to prevent audio interference
  const swiper = new Swiper(".audio-slider-swiper-{{ section.id }}", {
    slidesPerView: 2,
    spaceBetween: 15,
    centeredSlides: false,
    loop: false,
    // Prevent Swiper from interfering with audio controls
    simulateTouch: true,
    allowTouchMove: true,
    shortSwipes: true,
    longSwipes: true,
    followFinger: true,
    threshold: 5,
    touchAngle: 45,
    grabCursor: true,
    navigation: {
      nextEl: ".audio-slider-swiper-next-{{ section.id }}",
      prevEl: ".audio-slider-swiper-prev-{{ section.id }}",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 12
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      990: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    },
    on: {
      init: function() {
        // Add event listeners after Swiper is initialized
        setupAudioControls();
      }
    }
  });
  
  function setupAudioControls() {
    // Get all audio elements
    const audios = document.querySelectorAll('.audio-slider-audio-player-{{ section.id }}');
    
    // Add event listeners to prevent Swiper from capturing audio control clicks
    audios.forEach(audio => {
      // Prevent all events from bubbling up to Swiper
      const events = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'touchmove', 'pointerdown', 'pointerup'];
      
      events.forEach(eventType => {
        audio.addEventListener(eventType, function(e) {
          e.stopPropagation();
          e.preventDefault();
        }, true); // Use capture phase to catch events early
        
        // Also prevent on the audio container
        const container = audio.closest('.audio-slider-audio-container-{{ section.id }}');
        if (container) {
          container.addEventListener(eventType, function(e) {
            if (e.target === audio || audio.contains(e.target)) {
              e.stopPropagation();
              e.preventDefault();
            }
          }, true);
        }
      });
      
      // Audio play management - only one audio at a time
      audio.addEventListener('play', function(e) {
        e.stopPropagation();
        
        // Pause all other audios
        audios.forEach(otherAudio => {
          if (otherAudio !== audio && !otherAudio.paused) {
            otherAudio.pause();
          }
        });
      });
    });
    
    // Additional protection: disable Swiper dragging on audio containers
    const audioContainers = document.querySelectorAll('.audio-slider-audio-container-{{ section.id }}');
    audioContainers.forEach(container => {
      container.style.pointerEvents = 'auto';
      
      // Make Swiper ignore these elements for dragging
      if (swiper.params) {
        if (!swiper.params.noSwipingClass) {
          swiper.params.noSwipingClass = 'audio-slider-audio-container-{{ section.id }}';
        }
      }
    });
  }
  
  // Update swiper on window resize
  window.addEventListener('resize', function() {
    swiper.update();
  });
});
</script>

{% schema %}
{
  "name": "Audio Slider",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Take a Tour to Our Warehouse"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Explore our facilities through our video and image collection"
    },
    {
      "type": "video",
      "id": "main_video",
      "label": "Main Video",
      "info": "Select or upload a video"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Padding Top",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Padding Bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 40
    },
    {
      "type": "range",
      "id": "margin_top",
      "label": "Margin Top",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 0
    },
    {
      "type": "range",
      "id": "margin_bottom",
      "label": "Margin Bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 0
    }
  ],
  "blocks": [
    {
      "type": "image",
      "name": "Image Slide",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "url",
          "id": "audio",
          "label": "Audio File",
          "info": "Upload an audio file and paste the URL here"
        }
      ]
    }
  ],
  "max_blocks": 10,
  "presets": [
    {
      "name": "Audio Slider",
      "category": "Custom",
      "blocks": [
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "image-slider-with-video",
        slug: "image-slider-with-video",
        title: "Image Slider with Video",
        platform: "shopify",
        category: "Image Slider",
        language: "liquid",
        ext: ".liquid",
        description: "A Shopify section that features an image slider with video playback capabilities. This section allows you to showcase multiple images in a carousel format while providing a video experience for your visitors.",
        tags: ["image", "video", "slider", "liquid", "shopify", "carousel"],
        previewImage: "/sections/shopify-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["image", "video", "slider", "liquid", "shopify", "carousel"],
        code: `{% style %}
.section-{{ section.id }}-spacing {
  padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
  padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  margin-top: {{ section.settings.margin_top | times: 0.75 | round: 0 }}px;
  margin-bottom: {{ section.settings.margin_bottom | times: 0.75 | round: 0 }}px;
}

@media screen and (min-width: 750px) {
  .section-{{ section.id }}-spacing {
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
    margin-top: {{ section.settings.margin_top }}px;
    margin-bottom: {{ section.settings.margin_bottom }}px;
  }
}

.warehouse-section-{{ section.id }} {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
}

.warehouse-section-{{ section.id }} .main-media {
  flex: 1 1 20%;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 650px;
}

.warehouse-section-{{ section.id }} .main-media video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.warehouse-section-{{ section.id }} .right_side_image--slider {
  flex: 1 1 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.warehouse-section-{{ section.id }} .slider-container {
  width: 100%;
}

.warehouse-section-{{ section.id }} .swiper {
  width: 100%;
  padding: 10px 0;
}

.warehouse-section-{{ section.id }} .swiper-slide {
  border-radius: 12px;
  overflow: hidden;
  opacity: 1;
  /* transform: scale(0.95); */
  transition: all 0.3s ease;
  cursor: pointer;
  height: auto;
}

/* .warehouse-section-{{ section.id }} .swiper-slide-active {
  opacity: 1;
  transform: scale(1);
} */

.warehouse-section-{{ section.id }} .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.warehouse-section-{{ section.id }} .swiper-button-next,
.warehouse-section-{{ section.id }} .swiper-button-prev {
  color: #ffffff;
  background: #7a001f;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.warehouse-section-{{ section.id }} .swiper-button-next svg,
.warehouse-section-{{ section.id }} .swiper-button-prev svg{
  width: 10px;
}
.warehouse_slider-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}
.warehouse-section-{{ section.id }} .swiper-button-next:after,
.warehouse-section-{{ section.id }} .swiper-button-prev:after {
  font-size: 20px;
  font-weight: bold;
}

/* .warehouse-section-{{ section.id }} .media-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
} */

.warehouse-section-{{ section.id }} .section-heading {
  /* text-align: center; */
  width: 100%;
  margin-bottom: 5px;
}

.warehouse-section-{{ section.id }} .section-heading h2 {
  font-size: 32px;
  color: #820024;
  margin-bottom: 10px;
}

.warehouse-section-{{ section.id }} .section-heading p {
  font-size: 18px;
  color: #666;
}

/* .warehouse-section-{{ section.id }} .video-controls {
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.warehouse-section-{{ section.id }} .video-control-btn {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.warehouse-section-{{ section.id }} .video-control-btn:hover {
  background: rgba(130, 0, 36, 0.9);
}

.warehouse-section-{{ section.id }} .muted-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.warehouse-section-{{ section.id }} .main-media:hover .muted-overlay {
  opacity: 1;
} */

@media screen and (max-width: 749px) {
  .warehouse-section-{{ section.id }} {
    flex-direction: column;
  }
  
  .warehouse-section-{{ section.id }} .main-media,
  .warehouse-section-{{ section.id }} .right_side_image--slider {
    flex: 1 1 100%;
  }
  
  .warehouse-section-{{ section.id }} .section-heading h2 {
    font-size: 24px;
  }
  
  .warehouse-section-{{ section.id }} .section-heading p {
    font-size: 16px;
  }
  
  .warehouse-section-{{ section.id }} .swiper-slide {
    height: 200px;
  }
}
{% endstyle %}

<section class="section-{{ section.id }}-spacing">
  <div class="container">
    <div class="warehouse-section-{{ section.id }}">      
      <!-- Left main video -->
      <div class="main-media">
        {% if section.settings.main_video != blank %}
          {{ section.settings.main_video | video_tag: autoplay: true, loop: true, muted: true, controls: true, class: 'main-video-element' }}
          {% comment %} <div class="media-indicator">MAIN VIDEO</div>
          <div class="muted-overlay">Click play to enable sound</div>
          <div class="video-controls">
            <button class="video-control-btn play-btn">Play</button>
            <button class="video-control-btn pause-btn">Pause</button>
          </div> {% endcomment %}
        {% else %}
          <div style="background: #f5f5f5; height: 400px; display: flex; align-items: center; justify-content: center; border-radius: 12px;">
            <p>Upload a main video in the section settings</p>
          </div>
        {% endif %}
      </div>

      <!-- Right image slider with heading above -->
      <div class="right_side_image--slider">
        {% if section.settings.heading != blank or section.settings.subheading != blank %}
          <div class="section-heading">
            {% if section.settings.heading != blank %}
              <h2>{{ section.settings.heading }}</h2>
            {% endif %}
            {% if section.settings.subheading != blank %}
              <p>{{ section.settings.subheading }}</p>
            {% endif %}
          </div>
        {% endif %}
        
        <div class="slider-container">
          <div class="swiper warehouse-swiper">
            <div class="swiper-wrapper">
              {% for block in section.blocks %}
                {% if block.settings.image != blank %}
                  <div class="swiper-slide">
                    <img src="{{ block.settings.image | img_url: '500x' }}" alt="{{ block.settings.image.alt | escape }}" loading="lazy">
                    {% comment %} <div class="media-indicator">IMAGE {{ forloop.index }}</div> {% endcomment %}
                  </div>
                {% else %}
                  <div class="swiper-slide" style="background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
                    <p>Image {{ forloop.index }}</p>
                  </div>
                {% endif %}
              {% endfor %}
            </div>
            
            <!-- Navigation -->
            <div class="warehouse_slider-buttons">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Initialize Swiper
  const swiper = new Swiper(".warehouse-swiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    centeredSlides: false,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      990: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
  
  // Handle main video controls
  {% comment %} const mainVideo = document.querySelector(".main-video-element");
  const playBtn = document.querySelector(".play-btn");
  const pauseBtn = document.querySelector(".pause-btn");
  
  if (mainVideo && playBtn && pauseBtn) {
    // Initially mute the video
    mainVideo.muted = true;
    
    playBtn.addEventListener('click', function() {
      mainVideo.play();
      // Unmute when user interacts
      mainVideo.muted = false;
    });
    
    pauseBtn.addEventListener('click', function() {
      mainVideo.pause();
    });
    
    // Allow user to click video to play/pause
    mainVideo.addEventListener('click', function() {
      if (mainVideo.paused) {
        mainVideo.play();
        mainVideo.muted = false;
      } else {
        mainVideo.pause();
      }
    });
  } {% endcomment %}
});
</script>

{% schema %}
{
  "name": "Warehouse Tour",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Take a Tour to Our Warehouse"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Explore our facilities through our video and image collection"
    },
    {
      "type": "video",
      "id": "main_video",
      "label": "Main Video",
      "info": "Select or upload a video"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Padding Top",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Padding Bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 40
    },
    {
      "type": "range",
      "id": "margin_top",
      "label": "Margin Top",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 0
    },
    {
      "type": "range",
      "id": "margin_bottom",
      "label": "Margin Bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 0
    }
  ],
  "blocks": [
    {
      "type": "image",
      "name": "Image Slide",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        }
      ]
    }
  ],
  "max_blocks": 10,
  "presets": [
    {
      "name": "Warehouse Tour",
      "category": "Custom",
      "blocks": [
        {
          "type": "image"
        },
        {
          "type": "image"
        },
        {
          "type": "image"
        }
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        id: "show-product-cards-animation-on-scroll",
        slug: "show-product-cards-animation-on-scroll",
        title: "Show Product Cards Animation on Scroll",
        platform: "HTML",
        category: "Product Cards",
        language: "HTML, CSS, JS, GSAP",
        ext: ".html",
        description: "A set of product cards that utilize GSAP (GreenSock Animation Platform) for smooth animations and transitions. These cards can be used to showcase products in an engaging way, with hover effects and animated entrances.",
        tags: ["product", "cards", "gsap", "animation", "HTML", "CSS", "JS", "scroll", "interactive"],
        previewImage: "/sections/html-sections.webp",
        downloads: 220,
        demoUrl: "",
        seoKeywords: ["product", "cards", "gsap", "animation", "HTML", "CSS", "JS", "scroll", "interactive"],
        code: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Card Using GSAP</title>
    <link rel="stylesheet" href="https://use.typekit.net/nyc6jda.css">
    <style>
        :root {
            --bg: #ffffff;
            --panel-bg: #1a1721;
            --card-bg: #f7f7f9;
            --muted: #9a9a9a;
        }

        body {
            margin: 0;
            font-family: termina, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
            background-color: #f6f6f6;
        }

        .spacer {
            height: 80vh;
            background: linear-gradient(#fff, #f6f6f6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #666;
        }

        /* Section */
        .pin-reveal {
            background: var(--panel-bg);
            color: #fff;
            position: relative;
            padding: 120px 20px;
            overflow: hidden;
        }

        /* Giant translucent heading that sits over cards */
        .pin-reveal__title {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            font-weight: 900;
            font-size: clamp(48px, 12vw, 200px);
            text-align: center;
            letter-spacing: 6px;
            color: rgba(255, 255, 255, 0.12);
            mix-blend-mode: normal;
            z-index: 5;
            white-space: nowrap;
            opacity: 0;
        }

        .pin-reveal__inner {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            min-height: 60vh;
            padding-top: 80px;
            padding-bottom: 120px;
            perspective: 1200px;
        }

        /* Cards row centered horizontally */
        .cards-row {
            display: flex;
            gap: clamp(16px, 4vw, 36px);
            align-items: end;
            width: 100%;
            justify-content: center;
        }

        .product-card {
            width: clamp(160px, 19vw, 220px);
            background: linear-gradient(180deg, #fff 0%, #f5f6f8 100%);
            border-radius: 18px;
            padding: 14px;
            box-shadow: 0 10px 30px rgba(10, 10, 20, 0.12);
            transform-origin: 50% 70%;
            will-change: transform, opacity;
            opacity: 0;
            transform: translateY(80px) rotateX(18deg) scale(0.96);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .product-card__media {
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(10, 10, 20, 0.06);
        }

        .product-card__media img {
            width: 100%;
            height: 230px;
            object-fit: cover;
            display: block;
        }

        .product-card__title {
            font-size: 14px;
            color: #222;
            margin: 12px 0 6px;
            text-align: center;
            font-weight: 600;
        }

        .product-card__price {
            font-size: 13px;
            color: var(--muted);
        }

        /* small screens — stack fewer cards and smaller */
        @media (max-width:900px) {
            .pin-reveal__inner {
                min-height: 50vh;
                padding-bottom: 80px
            }

            .product-card__media img {
                height: 160px
            }
        }

        @media (max-width:560px) {
            .cards-row {
                gap: 12px
            }

            .product-card {
                width: 40vw
            }

            .pin-reveal__title {
                font-size: clamp(40px, 18vw, 100px)
            }
        }
    </style>
</head>

<body>
    <div class="spacer">
        <h2>Scroll down to see the Maya-style product reveal</h2>
    </div>

    <section class="pin-reveal" id="pinReveal">
        <div class="pin-reveal__title" id="pinTitle">TRENDING PRODUCTS</div>

        <div class="pin-reveal__inner">
            <div class="cards-row">
                <!-- Product cards -->
                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1556856425-366d6618905d?auto=format&fit=crop&w=600&q=80"
                            alt="Full Sleeve Round Neck T-shirt">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 396,500.00</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?auto=format&fit=crop&w=600&q=80"
                            alt="Loose T-shirt">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 315,400.00</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1609166214994-502d326bafee?auto=format&fit=crop&w=600&q=80"
                            alt="Polyester Women Gym Suit">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 405,500.00</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?auto=format&fit=crop&w=600&q=80"
                            alt="Sleeveless Crop Top">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 603,800.00</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?auto=format&fit=crop&w=600&q=80"
                            alt="Racer Back Sports top">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 135,200.00</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?auto=format&fit=crop&w=600&q=80"
                            alt="Skirt and 3 pcs set">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 495,000.00</div>
                </div>
            </div>
        </div>
    </section>

    <div class="spacer">
        <h2>Continue scrolling</h2>
    </div>

    <!-- GSAP -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <script>
        gsap.registerPlugin(ScrollTrigger);

        // Select elements
        const section = document.querySelector("#pinReveal");
        const cards = gsap.utils.toArray(".product-card");
        const title = document.querySelector("#pinTitle");

        // Build a timeline that runs as the user scrolls while section is pinned.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=160%",
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
                markers: false // Set to true for debugging
            }
        });

        // 1) Fade in the big title
        tl.fromTo(title, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);

        // 2) Cards: reveal from center with stagger
        tl.to(cards, {
            duration: 1.4,
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            ease: "power2.out",
            stagger: {
                each: 0.16,
                from: "center"
            }
        }, 0.15);

        // 3) Add subtle parallax/tilt effect on scroll
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=160%",
            scrub: true,
            onUpdate: self => {
                const p = self.progress;
                // Apply subtle rotation Y based on card index and progress
                cards.forEach((c, i) => {
                    // Center-based offset
                    const centerIndex = (cards.length - 1) / 2;
                    const offset = i - centerIndex;
                    // Small tilt: cards on left tilt -6..0..6 deg as progress goes from 0..1
                    const tilt = offset * 6 * (p - 0.5) * 0.6;
                    c.style.transform = 'translateY(' + ((1 - p) * 60) + 'px) rotateX(' + (18 - p * 18) + 'deg) rotateY(' + tilt + 'deg) scale(' + (0.96 + p * 0.04) + ')';
                });
            }
        });

        // Initial setup
        ScrollTrigger.addEventListener("refreshInit", () => {
            cards.forEach(c => {
                c.style.willChange = "transform, opacity";
            });
        });
    </script>
</body>

</html>`
    },
    {
        id: "reveal-product-card-on-scroll",
        slug: "reveal-product-card-on-scroll",
        title: "Reveal Product Card On Scroll",
        platform: "html",
        category: "Product Cards",
        language: "HTML, CSS, JS, GSAP",
        ext: ".html",
        description: "Reveal a stylish product card with a smooth scroll-triggered animation that brings product details into view.",
        tags: ["product", "cards", "gsap", "animation", "HTML", "CSS", "JS", "scroll", "interactive"],
        previewImage: "/sections/html-sections.webp",
        downloads: 360,
        demoUrl: "",
        seoKeywords: ["product", "cards", "gsap", "animation", "HTML", "CSS", "JS", "scroll", "interactive"],
        code: `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Maya-style Split Heading Reveal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap" rel="stylesheet">
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <style>
        :root {
            --bg: #fff;
            --muted: #9a9a9a;
        }

        body {
            margin: 0;
            font-family: "Platypi", serif;
            background: #f6f6f6;
        }

        .spacer {
            height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 20px;
        }

        /* Section */
        .pin-reveal {
            position: relative;
            overflow: hidden;
            padding: 50px 20px;
            background: #fff;
        }

        /* both title halves - Desktop/Tablet */
        .pin-reveal__title {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            font-weight: 900;
            font-size: 80px;
            letter-spacing: 6px;
            color: rgba(0, 0, 0, 0.12);
            z-index: 1;
            pointer-events: none;
            white-space: nowrap;
            will-change: opacity, transform;
            display: flex;
            justify-content: center;
            width: 100%;
            font-family: "Nosifer", sans-serif;
        }

        .title-left,
        .title-right {
            display: inline-block;
            transition: transform 0.3s ease;
            color: #000000;
            font-weight: 500;
        }

        .title-left {
            margin-right: 20px;
        }

        .title-right {
            margin-left: 20px;
        }

        /* Mobile title */
        .mobile-title {
            display: none;
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #000;
            font-family: "Nosifer", sans-serif;
        }

        /* Cards row */
        .pin-reveal__inner {
            position: relative;
            z-index: 2;
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1200px;
        }

        /* Regular cards grid for desktop with <=6 products */
        .cards-row {
            display: flex;
            gap: 15px;
            align-items: end;
            justify-content: center;
            width: 100%;
            flex-wrap: nowrap;
        }

        /* Swiper container */
        .swiper {
            width: 100%;
            padding: 20px 0;
            display: none;
            /* Hidden by default */
        }

        .swiper-wrapper {
            align-items: end;
        }

        /* Cards */
        .product-card {
            width: 100%;
            max-width: 280px;
            border-radius: 18px;
            background: #fff;
            padding: 12px;
            box-shadow: 0 12px 30px rgba(10, 10, 20, 0.08);
            transform-origin: center center;
            opacity: 0;
            transform: scale(0.68);
            filter: blur(6px);
            transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
        }

        /* Simple card style for mobile and static desktop */
        .product-card.simple {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
        }

        .product-card__media {
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
        }

        .product-card__media img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
        }

        .product-card__title {
            font-size: 14px;
            color: #222;
            font-weight: 600;
            margin: 10px 0 6px;
            text-align: center;
        }

        .product-card__price {
            font-size: 13px;
            color: var(--muted);
            text-align: center;
        }

        .product-card_button {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #000000;
            min-width: 140px;
            height: 35px;
            margin-top: 20px;
            border: 1px solid #000000;
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
            transition: 0.8s all;
        }

        .product-card_button:hover {
            background: #fff;
            color: #000000;
        }

        /* Swiper navigation */
        .swiper-button-next,
        .swiper-button-prev {
            color: #000;
            background: rgba(255, 255, 255, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
            font-size: 18px;
        }

        /* Swiper pagination */
        .swiper-pagination-bullet {
            background: #000;
            opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
            background: #000;
            opacity: 1;
        }

        /* Mobile and Tablet styles */
        @media (max-width: 1024px) {
            .pin-reveal__title {
                display: none;
            }

            .mobile-title {
                display: block;
            }

            .pin-reveal__inner {
                perspective: none;
            }

            .cards-row {
                display: none !important;
                /* Hide regular grid on tablet/mobile */
            }

            .swiper {
                display: block !important;
                /* Show swiper on tablet/mobile */
            }

            /* Hide animation elements on mobile/tablet */
            .pin-reveal__title .title-left,
            .pin-reveal__title .title-right {
                transform: none !important;
                opacity: 1 !important;
            }

            /* Swiper adjustments for mobile */
            .swiper {
                padding: 10px 0 40px;
            }

            .swiper-button-next,
            .swiper-button-prev {
                display: none;
            }
        }

        /* Desktop styles */
        @media (min-width: 1025px) {
            .mobile-title {
                display: none;
            }

            .swiper-button-next,
            .swiper-button-prev {
                display: flex;
            }

            /* When slider is active on desktop (more than 6 products) */
            .pin-reveal.has-slider .cards-row {
                display: none;
            }

            .pin-reveal.has-slider .swiper {
                display: block;
            }
        }

        @media (max-width:900px) {
            .product-card__media img {
                height: 160px
            }

            .pin-reveal__title {
                font-size: clamp(40px, 16vw, 110px)
            }
        }
    </style>
</head>

<body>

    <div class="spacer">Scroll down to reveal</div>

    <section class="pin-reveal" id="pinReveal">
        <!-- Desktop/Tablet Title -->
        <div class="pin-reveal__title" id="pinTitle">
            <span class="title-left">TRENDING</span>
            <span class="title-right">PRODUCTS</span>
        </div>

        <!-- Mobile Title -->
        <div class="mobile-title">TRENDING PRODUCTS</div>

        <div class="pin-reveal__inner">
            <!-- Regular Cards Grid (for desktop with <=6 products) -->
            <div class="cards-row" id="cardsRow">
                <!-- Product Cards - Add/remove as needed -->
                <!-- When you have 6 or fewer products, desktop will show grid -->
                <!-- When you have more than 6 products, desktop will show slider -->

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1556856425-366d6618905d?auto=format&fit=crop&w=600&q=80"
                            alt="Full Sleeve Round T-shirt">
                    </div>
                    <div class="product-card__title">Full Sleeve Round T-shirt</div>
                    <div class="product-card__price">Rs. 396,500.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?auto=format&fit=crop&w=600&q=80"
                            alt="Loose T-shirt">
                    </div>
                    <div class="product-card__title">Loose T-shirt</div>
                    <div class="product-card__price">Rs. 315,400.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1609166214994-502d326bafee?auto=format&fit=crop&w=600&q=80"
                            alt="Polyester Women Gym Suit">
                    </div>
                    <div class="product-card__title">Polyester Women Gym Suit</div>
                    <div class="product-card__price">Rs. 405,500.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?auto=format&fit=crop&w=600&q=80"
                            alt="Sleeveless Crop Top">
                    </div>
                    <div class="product-card__title">Sleeveless Crop Top</div>
                    <div class="product-card__price">Rs. 603,800.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?auto=format&fit=crop&w=600&q=80"
                            alt="Racer Back Sports top">
                    </div>
                    <div class="product-card__title">Racer Back Sports top</div>
                    <div class="product-card__price">Rs. 135,200.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?auto=format&fit=crop&w=600&q=80"
                            alt="Skirt set">
                    </div>
                    <div class="product-card__title">Skirt set</div>
                    <div class="product-card__price">Rs. 495,000.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <!-- Add more products here if needed (more than 6 will trigger slider on desktop) -->
                
                <!-- <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80" alt="Casual Summer Dress">
                    </div>
                    <div class="product-card__title">Casual Summer Dress</div>
                    <div class="product-card__price">Rs. 299,000.00</div>
                    <div class="product-card_button">View Product</div>
                </div>

                <div class="product-card">
                    <div class="product-card__media">
                        <img src="https://images.unsplash.com/photo-1556856425-366d6618905d?auto=format&fit=crop&w=600&q=80" alt="Denim Jacket">
                    </div>
                    <div class="product-card__title">Denim Jacket</div>
                    <div class="product-card__price">Rs. 450,000.00</div>
                    <div class="product-card_button">View Product</div>
                </div> -->
               
            </div>

            <!-- Swiper Slider (for mobile/tablet and desktop with >6 products) -->
            <div class="swiper">
                <div class="swiper-wrapper" id="swiperWrapper">
                    <!-- Product cards will be duplicated here by JavaScript -->
                </div>

                <!-- Navigation buttons -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>

                <!-- Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>

    <div class="spacer">After reveal</div>

    <!-- GSAP -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const section = document.querySelector("#pinReveal");
            const cardsRow = document.querySelector("#cardsRow");
            const swiperWrapper = document.querySelector("#swiperWrapper");
            const isMobile = window.innerWidth <= 1024; // Tablet and mobile

            // Get all product cards from HTML
            const productCards = Array.from(cardsRow.querySelectorAll('.product-card'));
            const hasManyProducts = productCards.length > 6;
            const shouldUseSlider = isMobile || hasManyProducts;

            // Duplicate product cards to swiper wrapper
            productCards.forEach(card => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = card.outerHTML;
                swiperWrapper.appendChild(slide);
            });

            // Add class if slider should be used on desktop
            if (shouldUseSlider && !isMobile) {
                section.classList.add('has-slider');
            }

            // Initialize Swiper for tablet/mobile or desktop with many products
            let swiper = null;
            let animatedCards = [];

            if (shouldUseSlider) {
                swiper = new Swiper('.swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                    centeredSlides: false,
                    loop: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        // Mobile (<= 768px) - 1 product
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                            centeredSlides: true
                        },
                        // Tablet (769px - 1024px) - 3 products
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                            centeredSlides: false
                        },
                        // Desktop with slider (>1024px and >6 products)
                        1025: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                            centeredSlides: false
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                            centeredSlides: false
                        }
                    }
                });

                // Get cards from swiper for animation
                animatedCards = Array.from(document.querySelectorAll('.swiper-slide .product-card'));
            } else {
                // Use regular cards for animation
                animatedCards = productCards;
            }

            // Only apply animations on desktop/tablet
            if (!isMobile) {
                gsap.registerPlugin(ScrollTrigger);

                const leftText = document.querySelector(".title-left");
                const rightText = document.querySelector(".title-right");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 40%",
                        end: "bottom 20%",
                        scrub: 0.9,
                        pin: true,
                        anticipatePin: 1,
                    }
                });

                // Move headings apart and fade them out
                tl.to(leftText, {
                    x: "-60%",
                    autoAlpha: 0,
                    ease: "power2.out"
                }, 0);

                tl.to(rightText, {
                    x: "60%",
                    autoAlpha: 0,
                    ease: "power2.out"
                }, 0);

                // Cards zoom in smoothly
                tl.to(animatedCards, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.4,
                    ease: "power3.out",
                    stagger: { each: 0.14, from: "center" }
                }, 0.1);

                // Subtle parallax-like depth
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "bottom 20%",
                    scrub: true,
                    onUpdate: st => {
                        const p = st.progress;
                        animatedCards.forEach((c, i) => {
                            const centerIndex = (animatedCards.length - 1) / 2;
                            const offset = Math.abs(i - centerIndex);
                            const extraScale = 1 + (0.02 * (1 - offset / (animatedCards.length / 2)) * p);
                            c.style.transform = 'scale(' + extraScale + ')';
                        });
                    }
                });
            } else {
                // On mobile/tablet, ensure all cards are visible immediately
                const mobileCards = document.querySelectorAll('.product-card');
                mobileCards.forEach(card => {
                    card.classList.add('simple');
                });
            }

            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                    if (swiper) {
                        swiper.update();
                    }
                    // You might want to reload the page for major layout changes
                    // or implement more sophisticated resize handling
                }, 250);
            });
        });
    </script>
</body>

</html>`
    }
];

// Unique platform / category lists for filters
export const sectionPlatforms = [
    "All",
    ...Array.from(new Set(sections.map((s) => s.platform))),
];

export const sectionCategories = [
    "All",
    ...Array.from(new Set(sections.map((s) => s.category))),
];