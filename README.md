# Remixing the Web
### (No Spring Boot Allowed)
*– Nathan Huff*

---

## What is Remix
1) A compiler
2) A server side HTTP handler
3) A server framework
4) A browser framework

--

## A Compiler
Uses esbuild to code split by route and bundles only have client side code

--

## HTTP Handlers and Adapters
Remix uses the Web Fetch API and has adapters for different environments to run on Node servers and non-Node environments like Cloudflare workers

--

## Server Framework
Remix is the VC in MVC, so your routes provide the UI as well as any server work that needs to run before it is sent to the client

--

## Browser Framework
Remix will hydrate the page with the data returned from the server

---

## Why You Should Look at Remix
1) Embrace the server/client model
2) Use Web Standards
3) JavaScript augments the UX
4) Don't over-abstract underlying technologies

--

## Server/Client Model
You can make your server fast, but you can't control the user's network.
We should reduce the amount of data needed to send over the wire

--

## Web Standards
Browsers already understand `Request`, `Response`, `URLSearchParams`, and `URL` why reinvent the wheel?

--

## Progressive Enhancement
Not all features really need JavaScript, but with JavaScript we can enhance the UX intelligently

--

## Don't Over Abstract
_Build Better Websites, Sometimes with Remix_. If you get good at Remix, you will accidentally get good at web development in general.

---

## Getting Started
`npx create-remix@latest`

![NPX create](/sort/NPX%20create.png?raw=true)

---

## Nested Routes and Outlet
```text
app
├── root.jsx
└── routes
    ├── accounts.jsx
    ├── dashboard.jsx
    ├── expenses.jsx
    ├── index.jsx
    ├── reports.jsx
    ├── sales
    │   ├── customers.jsx
    │   ├── deposits.jsx
    │   ├── index.jsx
    │   ├── invoices
    │   │   ├── $invoiceId.jsx
    │   │   └── index.jsx
    │   ├── invoices.jsx
    │   └── subscriptions.jsx
    └── sales.jsx
```

--

![Route-01](/sort/Route-01.png?raw=true)

--

![Route-02](/sort/Route-02.png?raw=true)

--

![Route-03](/sort/Route-03.png?raw=true)

--

![Route-04](/sort/Route-04.png?raw=true)

--

![Route-05](/sort/Route-05.png?raw=true)

---

## Demo App
I've created tags that you can checkout to view the application in various states:
| Tag Name | Overview                                                    |
| -------- | ----------------------------------------------------------- |
| 01       | Initial Setup                                               |
| 02       | Customized Root Route and Some Data Loaders                 |
| 03       | Creating Dynamic Routes and adding Catch Boundaries         |
| 04       | Layout Nesting                                              |
| 05       | Data Mutations and Flat Paths                               |
| 06       | Added a demo path to see how transitions can upgrade the UX |

---

## Questions?
Github Repo:  [huffn/as-i-search](https://github.com/huffn/as-i-search)

Email: [huff@familysearch.org](huff@familysearch.org)
