function DatePickerStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .wrapper { position: relative; display: inline-block; font-family: sans-serif; }
        input { width: 150px; padding: 4px; }
        .icon { cursor: pointer; margin-left: -24px; }
        .popup { position: absolute; top: 28px; left: 0; background: white; border: 1px solid #ccc; padding: 8px; z-index: 100; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .nav { text-align: center; margin-bottom: 8px; font-weight: bold; }
        .nav span { cursor: pointer; padding: 0 4px; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        button { padding: 4px; cursor: pointer; }
        table { border-collapse: collapse; width: 100%; }
        th, td { text-align: center; padding: 4px; }
        th { background: #f0f0f0; }
        td { cursor: pointer; }
        td.empty { background: #f9f9f9; cursor: default; }
    `;
    return style;
}