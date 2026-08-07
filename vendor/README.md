# Third-party code bundled here

Everything this project needs is vendored: it loads no script, style, font, map
or module from anywhere but its own origin — no CDN, no network, no account.
That is the point of the tool, and it makes the licences below *this project's*
responsibility rather than a package manager's.

**Every library here has its licence text in this directory.** Naming a licence
is not the same as shipping it: MIT and BSD both require the permission text
itself to travel with a copy, and most minified bundles drop it. Where a bundle
does carry the full text inline, the row says so and no separate file is needed.

React is vendored rather than loaded from a CDN so the CV renders offline and
from a file:// URL.

## What is here, and under what licence

| File | Package | Licence | Licence text |
| --- | --- | --- | --- |
| `react.production.min.js` | [React](https://react.dev/) | MIT | [`LICENSE-react.txt`](LICENSE-react.txt) — `@license React` banner names MIT and © Facebook, Inc. but omits the permission text |
| `react-dom.production.min.js` | [React DOM](https://react.dev/) | MIT | same file, [`LICENSE-react.txt`](LICENSE-react.txt) |

## The rule

Adding a file to this directory means adding a row here **in the same commit**.
A record kept from the first vendored file is trivial; one reconstructed two
years later is not.
