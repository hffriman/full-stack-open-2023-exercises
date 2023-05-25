```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server->>browser: Status Code 201 (Object successfully created)
  note right of browser: The browser will NOT redirect because this is a single-page app
  note right of browser: The content is updated automatically on the client side
  deactivate server
  
  ```
