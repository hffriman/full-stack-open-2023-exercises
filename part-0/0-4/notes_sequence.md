```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  
  server->>browser: Status Code 302 (THE REDIRECTION OF THE BROWSER)
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  
  server->>browser: The HTML document
  deactivate server
    
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  
  server->>browser: The CSS file
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  
  server->>browser: The JavaScript file
  deactivate server
  
  note right of browser: The browser activates the JavaScript code that fetches JSON data.
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server

  server->>browser: [{ "content":"Imp","date":"2023-05-17T21:55:27.571Z"}, ... ]
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
  activate server
  server->>browser: The Favicon icon
  deactivate server
  
  ```
