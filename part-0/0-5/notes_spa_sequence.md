```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server

  server->>browser: The HTML document
  deactivate server
    
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  
  server->>browser: The CSS file
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server->>browser: The JavaScript file
  deactivate server
  
  note right of browser: The browser activates the JavaScript code that fetches JSON data.
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server->>browser: [{ "content":"bom","date":"2023-05-17T23:33:00.303Z" }, ... ]
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
  activate server
  server->>browser: The Favicon icon
  deactivate server
  
  ```
