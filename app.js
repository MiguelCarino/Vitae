const {
  useState,
  useEffect,
  useRef
} = React;

// i18n: resolve the fleet translator lazily — this script executes before the
// deferred i18n.js, so window.t may not exist yet; fall back to the English
// literal (which is also the dictionary key).
const tr = key => typeof window.t === 'function' ? window.t(key) : key;

// --- ICONS ---
const Icons = {
  Trash: () => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  MoveUp: () => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "18 15 12 9 6 15"
  })),
  MoveDown: () => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })),
  LayoutFull: () => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    fill: "currentColor",
    viewBox: "0 0 16 12"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "12",
    rx: "1",
    fillOpacity: "0.3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "12",
    height: "8",
    rx: "0.5"
  })),
  LayoutLeft: () => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    fill: "currentColor",
    viewBox: "0 0 16 12"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "12",
    rx: "1",
    fillOpacity: "0.3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "4",
    height: "8",
    rx: "0.5"
  })),
  LayoutRight: () => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    fill: "currentColor",
    viewBox: "0 0 16 12"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "12",
    rx: "1",
    fillOpacity: "0.3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "2",
    width: "7",
    height: "8",
    rx: "0.5"
  })),
  // Modules
  ModHeader: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16M4 12h8m-8 6h8"
  })),
  ModText: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16M4 12h16M4 18h10"
  })),
  ModList: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  ModTags: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "7",
    x2: "7.01",
    y2: "7"
  })),
  ModContact: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  ModGrid: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  })),
  ModRefs: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  // NEW LANGS ICON
  ModLang: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
  })),
  ModDisclaimer: () => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })),
  InfoOutline: () => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8h.01"
  })),
  // Socials
  Pin: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  Phone: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  })),
  Mail: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22,6 12,13 2,6"
  })),
  Link: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  })),
  GitHub: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
  })),
  Linkedin: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "9",
    width: "4",
    height: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "4",
    cy: "4",
    r: "2"
  })),
  Info: () => /*#__PURE__*/React.createElement("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  }))
};
const CONTACT_ICONS = [{
  id: 'pin',
  icon: Icons.Pin
}, {
  id: 'phone',
  icon: Icons.Phone
}, {
  id: 'mail',
  icon: Icons.Mail
}, {
  id: 'link',
  icon: Icons.Link
}, {
  id: 'git',
  icon: Icons.GitHub
}, {
  id: 'in',
  icon: Icons.Linkedin
}];
const ACCENT_COLORS = ['#0ea5e9', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#db2777', '#e11d48', '#d97706', '#059669', '#0d9488', '#0891b2', '#334155'];

// --- COMPONENTS ---

const Editable = ({
  value,
  onChange,
  placeholder,
  className,
  multiline
}) => {
  const handleBlur = e => {
    let html = e.target.innerHTML;
    // ROBUST URL REGEX - Detects carino.systems, software.carino.systems etc.
    // It looks for sequences of word.tld where TLD is 2+ chars.
    const urlRegex = /((https?:\/\/)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{2,5})?(?:[\/?#][^\s<]*)?)(?![^<]*>|[^<>]*<\/a>)/gi;
    if (html.match(urlRegex)) {
      html = html.replace(urlRegex, match => {
        let href = match;
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
          href = 'http://' + href;
        }
        const display = match.replace(/^(https?:\/\/)?(www\.)?/, '');
        return `<a href="${href}" target="_blank">${display}</a>`;
      });
    }
    onChange(html);
  };
  return React.createElement(multiline ? 'div' : 'span', {
    className: `editable ${className}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    placeholder: placeholder,
    onBlur: handleBlur,
    dangerouslySetInnerHTML: {
      __html: value
    }
  });
};
const SectionControl = ({
  onDelete,
  onMove,
  currentCol,
  onColChange
}) => /*#__PURE__*/React.createElement("div", {
  className: "absolute -top-7 right-0 flex items-center opacity-0 group-hover:opacity-100 transition duration-150 z-20 no-print"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex ui-panel text-white rounded shadow-lg overflow-hidden border text-xs"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex border-r ui-border"
}, /*#__PURE__*/React.createElement("button", {
  onClick: () => onMove(-1),
  className: "p-1.5 ui-hover",
  title: tr("Move Up")
}, /*#__PURE__*/React.createElement(Icons.MoveUp, null)), /*#__PURE__*/React.createElement("button", {
  onClick: () => onMove(1),
  className: "p-1.5 ui-hover",
  title: tr("Move Down")
}, /*#__PURE__*/React.createElement(Icons.MoveDown, null))), /*#__PURE__*/React.createElement("div", {
  className: "flex border-r ui-border"
}, /*#__PURE__*/React.createElement("button", {
  onClick: () => onColChange('col-full'),
  className: `p-1.5 ui-hover ${currentCol === 'col-full' ? 'ui-accent' : 'opacity-70'}`,
  title: tr("Full Width")
}, /*#__PURE__*/React.createElement(Icons.LayoutFull, null)), /*#__PURE__*/React.createElement("button", {
  onClick: () => onColChange('col-left'),
  className: `p-1.5 ui-hover ${currentCol === 'col-left' ? 'ui-accent' : 'opacity-70'}`,
  title: tr("Left Sidebar")
}, /*#__PURE__*/React.createElement(Icons.LayoutLeft, null)), /*#__PURE__*/React.createElement("button", {
  onClick: () => onColChange('col-right'),
  className: `p-1.5 ui-hover ${currentCol === 'col-right' ? 'ui-accent' : 'opacity-70'}`,
  title: tr("Right Main")
}, /*#__PURE__*/React.createElement(Icons.LayoutRight, null))), /*#__PURE__*/React.createElement("button", {
  onClick: onDelete,
  className: "p-1.5 hover:bg-red-600 hover:text-white text-red-300",
  title: tr("Delete Section")
}, /*#__PURE__*/React.createElement(Icons.Trash, null))), /*#__PURE__*/React.createElement("div", {
  className: "menu-bridge"
}));

// Portals its children into the shared Carino navbar's right cluster,
// so the resume controls live in the SAME bar (no second navbar). Waits
// for #carinoNav to be injected (carino-navbar.js is deferred).
function CarinoActions({
  children
}) {
  const [host, setHost] = useState(null);
  useEffect(() => {
    let raf,
      cancelled = false;
    (function attach() {
      if (cancelled) return;
      const right = document.querySelector('#carinoNav .cn-right');
      if (right) {
        let box = right.querySelector('#resumeActions');
        if (!box) {
          box = document.createElement('div');
          box.id = 'resumeActions';
          box.className = 'cn-actions';
          right.insertBefore(box, right.querySelector('.social-row'));
        }
        setHost(box);
      } else {
        raf = requestAnimationFrame(attach);
      }
    })();
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return host ? ReactDOM.createPortal(children, host) : null;
}
function App() {
  const [pages, setPages] = useState([{
    id: 1,
    sections: []
  }]);
  const [config, setConfig] = useState({
    font: 'IBM Plex Sans',
    accent: '#0ea5e9',
    size: 13.5,
    margin: 20,
    paperSize: 'a4',
    darkModeResume: false
  });
  const [activePage, setActivePage] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const saveTimeoutRef = useRef(null);
  // i18n: re-render the chrome once the deferred i18n.js has loaded and on
  // every fleet language switch. Document data is never touched.
  const [, setLangTick] = useState(0);
  useEffect(() => {
    const bump = () => setLangTick(n => n + 1);
    window.addEventListener('carino:langchange', bump);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bump);
    } else {
      bump();
    }
    return () => {
      window.removeEventListener('carino:langchange', bump);
      document.removeEventListener('DOMContentLoaded', bump);
    };
  }, []);
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@media print { @page { size: ${config.paperSize}; margin: 0; } }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [config.paperSize]);
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const saved = JSON.parse(decodeURIComponent(escape(window.atob(hash))));
        if (saved.pages) setPages(saved.pages);
        if (saved.config) setConfig(saved.config);
      } catch (e) {}
    } else {
      setPages([{
        id: 1,
        sections: [{
          id: 'h1',
          type: 'header',
          col: 'col-full',
          data: {
            name: "Ethan Miller",
            title: "Senior IT Systems Engineer",
            border: true
          }
        }, {
          id: 'c1',
          type: 'contact',
          col: 'col-full',
          items: [{
            icon: 'pin',
            text: "Seattle, USA"
          }, {
            icon: 'phone',
            text: "+1 206 555 0142"
          }, {
            icon: 'mail',
            text: "ethan.miller@example.com"
          }, {
            icon: 'in',
            text: "linkedin.com/in/ethanmiller-tech"
          }, {
            icon: 'link',
            text: "ethanmiller.dev"
          }]
        }, {
          id: 'exp',
          type: 'list',
          title: "PROFESSIONAL EXPERIENCE",
          col: 'col-left',
          items: [{
            title: "Northbridge Cloud Services",
            subtitle: "Senior Infrastructure Engineer | March 2022 - Present",
            desc: "Design and maintain hybrid cloud infrastructure for enterprise clients. Lead automation initiatives using Infrastructure as Code and container platforms. Improved system uptime and reduced deployment times through CI/CD pipelines and proactive monitoring.\nnorthbridgecloud.example.com"
          }, {
            title: "BluePeak Technologies",
            subtitle: "Systems Administrator | July 2018 - February 2022",
            desc: "Managed Windows and Linux servers across multiple sites. Implemented backup and disaster recovery strategies. Standardized system configurations and reduced licensing costs by adopting open-source solutions.\nbluepeaktech.example.com"
          }, {
            title: "Rivergate IT Consulting",
            subtitle: "IT Support Specialist | June 2015 – June 2018",
            desc: "Provided Tier 2/3 support for business clients, including network setup, endpoint management, and server maintenance. Assisted in small business infrastructure design and security hardening.\nrivergateit.example.com"
          }]
        }, {
          id: 'tech1',
          type: 'list',
          title: "TECHNICAL SKILLS",
          col: 'col-right',
          items: [{
            title: "Operating Systems",
            subtitle: "",
            desc: "Linux, Windows Server, macOS."
          }, {
            title: "Programming",
            subtitle: "",
            desc: "Python, Go, Bash, JavaScript."
          }, {
            title: "Cloud Platforms",
            subtitle: "",
            desc: "AWS, Azure, Google Cloud."
          }, {
            title: "Containers",
            subtitle: "",
            desc: "Docker, Kubernetes."
          }, {
            title: "Automation",
            subtitle: "",
            desc: "Terraform, Ansible."
          }, {
            title: "Networking",
            subtitle: "",
            desc: "TCP/IP, VLANs, VPNs, firewalls."
          }, {
            title: "Monitoring",
            subtitle: "",
            desc: "Prometheus, Grafana, Zabbix."
          }, {
            title: "Databases",
            subtitle: "",
            desc: "PostgreSQL, MySQL, MongoDB."
          }, {
            title: "CI/CD",
            subtitle: "",
            desc: "GitHub Actions, GitLab CI."
          }, {
            title: "Virtualization",
            subtitle: "",
            desc: "VMware, Proxmox."
          }, {
            title: "Security",
            subtitle: "",
            desc: "System hardening, IAM, encrypted backups."
          }, {
            title: "Methodologies",
            subtitle: "",
            desc: "ITIL, Agile/Scrum."
          }]
        }, {
          id: 'edu',
          type: 'list',
          title: "EDUCATION",
          col: 'col-left',
          items: [{
            title: "University of Washington",
            subtitle: "2011 - 2015",
            desc: "BSc in Information Technology"
          }]
        }, {
          id: 'lang',
          type: 'languages',
          title: "LANGUAGES",
          col: 'col-right',
          items: [{
            title: "English",
            subtitle: "Native"
          }, {
            title: "German",
            subtitle: "B2"
          }]
        }, {
          id: 'disc',
          type: 'disclaimer',
          col: 'col-full',
          content: "Sample résumé generated with fictional data for layout testing."
        }]
      }]);
    }
  }, []);
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      const payload = {
        pages,
        config
      };
      const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      window.history.replaceState(null, null, '#' + encoded);
    }, 1000);
    return () => clearTimeout(saveTimeoutRef.current);
  }, [pages, config]);
  const deletePage = id => {
    if (pages.length === 1) return;
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (activePage >= newPages.length) setActivePage(newPages.length - 1);
  };
  const addSection = type => {
    const defaults = {
      header: {
        data: {
          name: "Name",
          title: "Title",
          border: true
        }
      },
      text: {
        content: "Content..."
      },
      list: {
        items: [{
          title: "Title",
          subtitle: "Date",
          desc: "Description"
        }]
      },
      languages: {
        items: [{
          title: "Language",
          subtitle: "Level"
        }]
      },
      tags: {
        items: ["Skill"]
      },
      grid: {
        items: [{
          title: "Project",
          desc: "Details"
        }]
      },
      contact: {
        items: [{
          icon: 'mail',
          text: "email@example.com"
        }]
      },
      references: {
        items: [{
          name: "Ref Name",
          role: "Role / Company",
          contact: "Contact Info"
        }]
      },
      disclaimer: {
        content: "Disclaimer text here..."
      }
    };
    const newSec = {
      id: Date.now(),
      type,
      title: type === 'contact' || type === 'disclaimer' || type === 'header' ? '' : "Título",
      col: 'col-full',
      ...defaults[type]
    };
    const newPages = [...pages];
    newPages[activePage].sections.push(newSec);
    setPages(newPages);
  };
  const updateSection = (pIdx, sIdx, field, val) => {
    const newPages = [...pages];
    newPages[pIdx].sections[sIdx][field] = val;
    setPages(newPages);
  };
  const moveSection = (pIdx, sIdx, dir) => {
    const newPages = [...pages];
    const sections = newPages[pIdx].sections;
    const target = sIdx + dir;
    if (target >= 0 && target < sections.length) {
      [sections[sIdx], sections[target]] = [sections[target], sections[sIdx]];
      setPages(newPages);
    }
  };
  const getIcon = id => {
    const item = CONTACT_ICONS.find(i => i.id === id);
    return item ? /*#__PURE__*/React.createElement(item.icon, null) : null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col flex-1 min-h-0"
  }, /*#__PURE__*/React.createElement(CarinoActions, null, /*#__PURE__*/React.createElement("select", {
    value: config.paperSize,
    onChange: e => setConfig({
      ...config,
      paperSize: e.target.value
    }),
    className: "ui-input ui-sec text-xs p-1.5 rounded border font-mono uppercase"
  }, /*#__PURE__*/React.createElement("option", {
    value: "a4"
  }, "A4"), /*#__PURE__*/React.createElement("option", {
    value: "letter"
  }, "Letter"), /*#__PURE__*/React.createElement("option", {
    value: "legal"
  }, "Legal")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 border-l ui-border pl-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-grid w-32"
  }, ACCENT_COLORS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setConfig({
      ...config,
      accent: c
    }),
    className: `color-btn ${config.accent === c ? 'active' : ''}`,
    style: {
      background: c
    }
  }))), /*#__PURE__*/React.createElement("label", {
    className: "flex flex-col text-[9px] uppercase font-bold ui-muted group"
  }, tr("Size"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: config.size,
    onChange: e => setConfig({
      ...config,
      size: e.target.value
    }),
    className: "w-12 ui-input text-white rounded px-1 border mt-1"
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex flex-col text-[9px] uppercase font-bold ui-muted group"
  }, tr("Margin"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "10",
    max: "60",
    value: config.margin,
    onChange: e => setConfig({
      ...config,
      margin: e.target.value
    }),
    className: "w-16 ui-range h-1.5 rounded-lg appearance-none cursor-pointer mt-1"
  }))), /*#__PURE__*/React.createElement("select", {
    value: config.font,
    onChange: e => setConfig({
      ...config,
      font: e.target.value
    }),
    className: "ui-input text-xs text-white p-2 rounded font-bold border"
  }, /*#__PURE__*/React.createElement("option", {
    value: "IBM Plex Sans"
  }, "IBM Plex"), /*#__PURE__*/React.createElement("option", {
    value: "Red Hat Display"
  }, "Red Hat"), /*#__PURE__*/React.createElement("option", {
    value: "Inter"
  }, "Inter"), /*#__PURE__*/React.createElement("option", {
    value: "Roboto"
  }, "Roboto")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfig({
      ...config,
      darkModeResume: !config.darkModeResume
    }),
    className: "ui-sec hover:text-white px-2"
  }, config.darkModeResume ? '☀' : '☾'), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    className: "btn-primary px-3 py-1.5 rounded text-xs font-bold shadow-lg"
  }, tr("Print PDF"))), /*#__PURE__*/React.createElement("div", {
    className: "fixed right-0 top-[60px] bottom-0 w-16 ui-panel border-l z-40 flex flex-col items-center py-4 gap-4 no-print overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] font-bold ui-muted uppercase tracking-widest mb-1"
  }, tr("Add")), [{
    id: 'header',
    label: 'Head',
    icon: Icons.ModHeader
  }, {
    id: 'text',
    label: 'Text',
    icon: Icons.ModText
  }, {
    id: 'list',
    label: 'List',
    icon: Icons.ModList
  }, {
    id: 'tags',
    label: 'Skills',
    icon: Icons.ModTags
  }, {
    id: 'languages',
    label: 'Langs',
    icon: Icons.ModLang
  }, {
    id: 'contact',
    label: 'Info',
    icon: Icons.ModContact
  }, {
    id: 'grid',
    label: 'Grid',
    icon: Icons.ModGrid
  }, {
    id: 'references',
    label: 'Refs',
    icon: Icons.ModRefs
  }, {
    id: 'disclaimer',
    label: 'Disc',
    icon: Icons.ModDisclaimer
  }].map(tool => /*#__PURE__*/React.createElement("button", {
    key: tool.id,
    onClick: () => addSection(tool.id),
    className: "group w-10 h-10 shrink-0 rounded ui-tool flex items-center justify-center transition shadow-sm border relative",
    title: tr(tool.label)
  }, /*#__PURE__*/React.createElement(tool.icon, null))), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto mb-4 group relative cursor-pointer",
    onClick: () => setShowInfo(!showInfo)
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-8 h-8 rounded-full ui-tool flex items-center justify-center transition ${showInfo ? 'active' : ''}`
  }, /*#__PURE__*/React.createElement(Icons.InfoOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: `sidebar-tooltip ${showInfo ? 'active' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold mb-1 ui-accent"
  }, tr("Privacy & License")), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, tr("Your data is stored "), /*#__PURE__*/React.createElement("strong", null, tr("locally in the URL hash")), tr(". It is never sent to any server. You own your data and the generated PDF.")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 text-xs pt-2 border-t ui-border"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com",
    target: "_blank",
    className: "text-white ui-link"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "https://linkedin.com",
    target: "_blank",
    className: "text-white ui-link"
  }, "LinkedIn"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-h-0 pt-8 pb-20 pr-16 flex flex-col items-center gap-8 overflow-y-auto print:p-0 print:m-0 print:overflow-visible print:bg-white",
    style: {
      '--accent': config.accent,
      fontFamily: config.font,
      fontSize: `${config.size}px`,
      '--page-margin': `${config.margin}px`,
      '--module-gap': '0px',
      '--item-gap': '0px'
    }
  }, pages.map((page, pIdx) => /*#__PURE__*/React.createElement("div", {
    key: page.id,
    className: "relative group/page",
    onClick: () => setActivePage(pIdx)
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute -left-4 top-0 h-full w-1 transition-colors ${activePage === pIdx ? 'bg-accent' : 'bg-transparent'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: `page-container size-${config.paperSize} transition-colors duration-300 ${config.darkModeResume ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      deletePage(page.id);
    },
    className: "page-delete-btn absolute top-2 right-2 p-2 bg-red-100 text-red-500 rounded hover:bg-red-500 hover:text-white opacity-0 group-hover/page:opacity-100 transition z-50"
  }, /*#__PURE__*/React.createElement(Icons.Trash, null)), /*#__PURE__*/React.createElement("div", {
    className: "resume-grid"
  }, page.sections.map((sec, sIdx) => /*#__PURE__*/React.createElement("div", {
    key: sec.id,
    className: `relative group section-item section-${sec.type} ${sec.col}`
  }, /*#__PURE__*/React.createElement(SectionControl, {
    onDelete: () => {
      const np = [...pages];
      np[pIdx].sections.splice(sIdx, 1);
      setPages(np);
    },
    onMove: dir => moveSection(pIdx, sIdx, dir),
    currentCol: sec.col,
    onColChange: c => updateSection(pIdx, sIdx, 'col', c)
  }), sec.type === 'header' && /*#__PURE__*/React.createElement("div", {
    className: "dynamic-mb opacity-90 pb-2 relative group/header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-[2.5em] font-black leading-tight tracking-tight",
    style: {
      color: config.accent
    }
  }, /*#__PURE__*/React.createElement(Editable, {
    value: sec.data.name,
    onChange: v => updateSection(pIdx, sIdx, 'data', {
      ...sec.data,
      name: v
    }),
    placeholder: tr("Name")
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[1.2em] opacity-75 font-medium mt-1 flex-1"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: sec.data.title,
    onChange: v => updateSection(pIdx, sIdx, 'data', {
      ...sec.data,
      title: v
    }),
    placeholder: tr("Job Title")
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'data', {
      ...sec.data,
      border: !sec.data.border
    }),
    className: "no-print opacity-0 group-hover/header:opacity-100 text-[10px] bg-slate-200 px-1 rounded text-slate-500 hover:text-black",
    title: tr("Toggle Line")
  }, "=")), sec.data.border !== false && /*#__PURE__*/React.createElement("hr", {
    className: "mt-2 border-t-2",
    style: {
      borderColor: config.accent
    }
  })), sec.type === 'contact' && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap text-[0.9em] opacity-80 items-center gap-x-6 gap-y-1"
  }, sec.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center group/icon relative inline-flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-wrapper opacity-70 hover:opacity-100 cursor-pointer no-print mr-2 flex-shrink-0",
    style: {
      color: config.accent
    },
    onClick: () => {
      const icons = CONTACT_ICONS.map(c => c.id);
      const next = icons[(icons.indexOf(item.icon) + 1) % icons.length];
      const ni = [...sec.items];
      ni[i].icon = next;
      updateSection(pIdx, sIdx, 'items', ni);
    }
  }, getIcon(item.icon)), /*#__PURE__*/React.createElement("span", {
    className: "icon-wrapper print:block hidden mr-2 flex-shrink-0",
    style: {
      color: config.accent
    }
  }, getIcon(item.icon)), /*#__PURE__*/React.createElement(Editable, {
    value: item.text,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].text = v;
      updateSection(pIdx, sIdx, 'items', ni);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ni = [...sec.items];
      ni.splice(i, 1);
      updateSection(pIdx, sIdx, 'items', ni);
    },
    className: "no-print text-red-400 opacity-0 group-hover/icon:opacity-100 text-[10px] ml-1"
  }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'items', [...sec.items, {
      icon: 'mail',
      text: 'Info'
    }]),
    className: "no-print opacity-30 hover:opacity-100 font-bold"
  }, "+")), sec.type === 'disclaimer' && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 items-start text-[0.8em] opacity-70 italic border-t pt-2 mt-2",
    style: {
      borderColor: config.darkModeResume ? '#334155' : '#f1f5f9'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-0.5",
    style: {
      color: config.accent
    }
  }, /*#__PURE__*/React.createElement(Icons.Info, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 leading-snug"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: sec.content,
    onChange: v => updateSection(pIdx, sIdx, 'content', v),
    multiline: true
  }))), sec.title !== undefined && sec.title !== '' && /*#__PURE__*/React.createElement("h3", {
    className: "text-[0.9em] font-bold uppercase tracking-widest dynamic-mb flex items-center gap-2",
    style: {
      color: config.accent
    }
  }, /*#__PURE__*/React.createElement(Editable, {
    value: sec.title,
    onChange: v => updateSection(pIdx, sIdx, 'title', v)
  })), sec.type === 'text' && /*#__PURE__*/React.createElement("div", {
    className: "opacity-90 leading-relaxed whitespace-pre-wrap text-[0.95em]"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: sec.content,
    onChange: v => updateSection(pIdx, sIdx, 'content', v),
    multiline: true
  })), sec.type === 'list' && /*#__PURE__*/React.createElement("div", {
    className: "dynamic-gap flex flex-col"
  }, sec.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "group/item relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-baseline mb-0.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-[1em]"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: item.title,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].title = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Role")
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-[0.85em] opacity-60 font-mono"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: item.subtitle,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].subtitle = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Date")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-[0.9em] opacity-80 leading-relaxed"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: item.desc,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].desc = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    multiline: true,
    placeholder: tr("Details...")
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ni = [...sec.items];
      ni.splice(i, 1);
      updateSection(pIdx, sIdx, 'items', ni);
    },
    className: "absolute -left-6 top-0 text-red-300 opacity-0 group-hover/item:opacity-100 no-print"
  }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'items', [...sec.items, {
      title: 'New',
      subtitle: 'Date',
      desc: 'Desc'
    }]),
    className: "text-[10px] font-bold opacity-30 hover:opacity-100 uppercase mt-1 no-print self-start"
  }, tr("+ Item"))), sec.type === 'languages' && /*#__PURE__*/React.createElement("div", {
    className: "dynamic-gap flex flex-col"
  }, sec.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "group/item relative flex justify-between items-center border-b border-slate-100 pb-1",
    style: {
      borderColor: config.darkModeResume ? '#1e293b' : '#f1f5f9'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-[1em]"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: item.title,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].title = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Language")
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-[0.85em] opacity-70 italic"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: item.subtitle,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].subtitle = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Level")
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ni = [...sec.items];
      ni.splice(i, 1);
      updateSection(pIdx, sIdx, 'items', ni);
    },
    className: "absolute -left-6 top-1 text-red-300 opacity-0 group-hover/item:opacity-100 no-print"
  }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'items', [...sec.items, {
      title: 'New',
      subtitle: 'Level'
    }]),
    className: "text-[10px] font-bold opacity-30 hover:opacity-100 uppercase mt-1 no-print self-start"
  }, tr("+ Language"))), sec.type === 'tags' && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap tag-container text-[0.85em]"
  }, sec.items.map((tag, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `px-2 py-1 rounded font-medium group/tag relative ${config.darkModeResume ? 'bg-slate-800' : 'bg-slate-100'}`
  }, /*#__PURE__*/React.createElement(Editable, {
    value: tag,
    onChange: v => {
      const ni = [...sec.items];
      ni[i] = v;
      updateSection(pIdx, sIdx, 'items', ni);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ni = [...sec.items];
      ni.splice(i, 1);
      updateSection(pIdx, sIdx, 'items', ni);
    },
    className: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] opacity-0 group-hover/tag:opacity-100 no-print"
  }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'items', [...sec.items, "New"]),
    className: "px-2 py-1 rounded border border-dashed opacity-50 hover:opacity-100 no-print"
  }, "+")), sec.type === 'grid' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, sec.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `p-3 rounded border group/item relative ${config.darkModeResume ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-[0.9em] mb-1",
    style: {
      color: config.accent
    }
  }, "                                                                    ", /*#__PURE__*/React.createElement(Editable, {
    value: item.title,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].title = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Project")
  }), "                                                                "), "                                                                ", /*#__PURE__*/React.createElement("div", {
    className: "text-[0.8em] opacity-70 leading-relaxed"
  }, "                                                                    ", /*#__PURE__*/React.createElement(Editable, {
    value: item.desc,
    onChange: v => {
      const ni = [...sec.items];
      ni[i].desc = v;
      updateSection(pIdx, sIdx, 'items', ni);
    },
    placeholder: tr("Desc..."),
    multiline: true
  }), "                                                                "), "                                                                ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const ni = [...sec.items];
      ni.splice(i, 1);
      updateSection(pIdx, sIdx, 'items', ni);
    },
    className: "absolute top-1 right-1 text-red-300 opacity-0 group-hover/item:opacity-100 no-print text-xs"
  }, "\xD7"), "                                                            ")), "                                                        ", /*#__PURE__*/React.createElement("button", {
    onClick: () => updateSection(pIdx, sIdx, 'items', [...sec.items, {
      title: 'New',
      desc: 'Desc'
    }]),
    className: "flex items-center justify-center border-2 border-dashed rounded opacity-30 hover:opacity-100 min-h-[50px] no-print text-xs font-bold"
  }, "+"), "                                                    "), "                                                                                            ")), "                                    "), "                                "), "                            ")), "                        ", /*#__PURE__*/React.createElement("button", {
    onClick: () => setPages([...pages, {
      id: Date.now(),
      sections: []
    }]),
    className: "no-print mt-4 px-6 py-3 rounded border-2 border-dashed ui-dashed font-bold"
  }, tr("Add Page")), "                    "), "                ");
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));