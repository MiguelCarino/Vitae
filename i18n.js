// Vitae i18n — editor chrome only. English strings ARE the keys, so a
// missing entry falls back to English. The resume DOCUMENT (sample data,
// section titles, anything saved into the URL hash) stays untranslated on
// purpose: it is user content, not UI. Locale comes from the fleet
// carino-lang.js (window.CarinoLang.current); this script is deferred and
// placed after it, so CarinoLang exists by DOMContentLoaded. app.js reads
// window.t lazily and re-renders the React chrome on 'carino:langchange'.
// Japanese deliberately says "PC", not コンピューター.

const I18N = {
    es: {
        // Section controls (hover toolbar)
        'Move Up': 'Subir',
        'Move Down': 'Bajar',
        'Full Width': 'Ancho completo',
        'Left Sidebar': 'Columna izquierda',
        'Right Main': 'Columna derecha',
        'Delete Section': 'Eliminar sección',
        'Toggle Line': 'Mostrar/ocultar línea',
        // Top bar controls
        'Size': 'Tamaño',
        'Margin': 'Margen',
        'Print PDF': 'Imprimir PDF',
        // Module sidebar
        'Add': 'Añadir',
        'Head': 'Encabezado',
        'Text': 'Texto',
        'List': 'Lista',
        'Skills': 'Habilidades',
        'Langs': 'Idiomas',
        'Info': 'Contacto',
        'Grid': 'Cuadrícula',
        'Refs': 'Referencias',
        'Disc': 'Aviso',
        // Privacy tooltip (three segments around the <strong>)
        'Privacy & License': 'Privacidad y licencia',
        'Your data is stored ': 'Tus datos se guardan ',
        'locally in the URL hash': 'localmente en el hash de la URL',
        '. It is never sent to any server. You own your data and the generated PDF.': '. Nunca se envían a ningún servidor. Tus datos y el PDF generado son tuyos.',
        // Buttons
        '+ Item': '+ Elemento',
        '+ Language': '+ Idioma',
        'Add Page': 'Añadir página',
        // Editable placeholders
        'Name': 'Nombre',
        'Job Title': 'Puesto',
        'Role': 'Puesto',
        'Date': 'Fecha',
        'Details...': 'Detalles...',
        'Language': 'Idioma',
        'Level': 'Nivel',
        'Project': 'Proyecto',
        'Desc...': 'Descripción...',
    },
    'pt-BR': {
        'Move Up': 'Mover para cima',
        'Move Down': 'Mover para baixo',
        'Full Width': 'Largura total',
        'Left Sidebar': 'Coluna esquerda',
        'Right Main': 'Coluna direita',
        'Delete Section': 'Excluir seção',
        'Toggle Line': 'Mostrar/ocultar linha',
        'Size': 'Tamanho',
        'Margin': 'Margem',
        'Print PDF': 'Imprimir PDF',
        'Add': 'Adicionar',
        'Head': 'Cabeçalho',
        'Text': 'Texto',
        'List': 'Lista',
        'Skills': 'Habilidades',
        'Langs': 'Idiomas',
        'Info': 'Contato',
        'Grid': 'Grade',
        'Refs': 'Referências',
        'Disc': 'Aviso',
        'Privacy & License': 'Privacidade e licença',
        'Your data is stored ': 'Seus dados ficam salvos ',
        'locally in the URL hash': 'localmente no hash da URL',
        '. It is never sent to any server. You own your data and the generated PDF.': '. Eles nunca são enviados a nenhum servidor. Os dados e o PDF gerado são seus.',
        '+ Item': '+ Item',
        '+ Language': '+ Idioma',
        'Add Page': 'Adicionar página',
        'Name': 'Nome',
        'Job Title': 'Cargo',
        'Role': 'Cargo',
        'Date': 'Data',
        'Details...': 'Detalhes...',
        'Language': 'Idioma',
        'Level': 'Nível',
        'Project': 'Projeto',
        'Desc...': 'Descrição...',
    },
    ja: {
        'Move Up': '上へ移動',
        'Move Down': '下へ移動',
        'Full Width': '全幅',
        'Left Sidebar': '左カラム',
        'Right Main': '右カラム',
        'Delete Section': 'セクションを削除',
        'Toggle Line': '区切り線の表示切替',
        'Size': 'サイズ',
        'Margin': '余白',
        'Print PDF': 'PDF印刷',
        'Add': '追加',
        'Head': '見出し',
        'Text': 'テキスト',
        'List': 'リスト',
        'Skills': 'スキル',
        'Langs': '言語',
        'Info': '連絡先',
        'Grid': 'グリッド',
        'Refs': '照会先',
        'Disc': '注記',
        'Privacy & License': 'プライバシーとライセンス',
        'Your data is stored ': 'データは',
        'locally in the URL hash': 'URLハッシュ内にローカル保存',
        '. It is never sent to any server. You own your data and the generated PDF.': 'されます。サーバーに送信されることは一切ありません。データと生成したPDFはあなたのものです。',
        '+ Item': '+ 項目',
        '+ Language': '+ 言語',
        'Add Page': 'ページを追加',
        'Name': '氏名',
        'Job Title': '職種',
        'Role': '役職',
        'Date': '日付',
        'Details...': '詳細...',
        'Language': '言語',
        'Level': 'レベル',
        'Project': 'プロジェクト',
        'Desc...': '説明...',
    },
    ru: {
        'Move Up': 'Вверх',
        'Move Down': 'Вниз',
        'Full Width': 'Во всю ширину',
        'Left Sidebar': 'Левая колонка',
        'Right Main': 'Правая колонка',
        'Delete Section': 'Удалить раздел',
        'Toggle Line': 'Показать/скрыть линию',
        'Size': 'Размер',
        'Margin': 'Поля',
        'Print PDF': 'Печать в PDF',
        'Add': 'Добавить',
        'Head': 'Шапка',
        'Text': 'Текст',
        'List': 'Список',
        'Skills': 'Навыки',
        'Langs': 'Языки',
        'Info': 'Контакты',
        'Grid': 'Сетка',
        'Refs': 'Рекомендации',
        'Disc': 'Примечание',
        'Privacy & License': 'Конфиденциальность и лицензия',
        'Your data is stored ': 'Ваши данные хранятся ',
        'locally in the URL hash': 'локально в хеше URL',
        '. It is never sent to any server. You own your data and the generated PDF.': '. Они никогда не отправляются на сервер. Данные и созданный PDF принадлежат вам.',
        '+ Item': '+ Пункт',
        '+ Language': '+ Язык',
        'Add Page': 'Добавить страницу',
        'Name': 'Имя',
        'Job Title': 'Должность',
        'Role': 'Должность',
        'Date': 'Дата',
        'Details...': 'Подробности...',
        'Language': 'Язык',
        'Level': 'Уровень',
        'Project': 'Проект',
        'Desc...': 'Описание...',
    },
};

function currentFleetLang() {
    return (window.CarinoLang && window.CarinoLang.current) || 'en';
}

function t(key) {
    const dict = I18N[currentFleetLang()];
    return (dict && dict[key]) || key;
}

// Static markup: elements carrying data-i18n use their original English text
// as the key (captured on first pass so locale switches stay reversible).
// Vitae's markup is fully React-rendered, so this is mostly a no-op kept for
// fleet-convention parity.
function applyStaticI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        if (!el.dataset.i18nKey) el.dataset.i18nKey = el.textContent.trim();
        el.textContent = t(el.dataset.i18nKey);
    });
    document.documentElement.lang = currentFleetLang();
}

// app.js executes before this deferred script, so it resolves the helper
// lazily through window.t and re-renders its chrome on the fleet event.
window.t = t;

document.addEventListener('DOMContentLoaded', applyStaticI18n);
window.addEventListener('carino:langchange', applyStaticI18n);
