# CLAUDE.md

Read AGENTS.md for project architecture and conventions.

## Claude Code-Specific

- When compacting, preserve the full list of modified files
- Prefer subagents for research tasks over inline exploration

## 瀏覽器自動化規則

- Playwright MCP 導覽（navigate）的目標網址只能是 <https://wenchunlife.blogspot.com/>，不可導覽到其他網站
- 為了讓頁面能正常渲染（字型、jQuery、Blogger widget、文章圖片），`.mcp.json` 的 `--allowed-origins` 額外放行頁面本身依賴的必要資源網域（`fonts.googleapis.com`、`fonts.gstatic.com`、`cdnjs.cloudflare.com`、`ajax.googleapis.com`、`code.jquery.com`、`www.blogger.com`、`blogger.googleusercontent.com`、`apis.google.com`）；新增網域前先確認是頁面渲染必要的資源，不要因為方便就整個放寬
- 不可以使用正式環境的帳號密碼
- 不可以執行會寄信、扣款、通知客戶的流程
- 每個動作後要重新讀一次畫面,不重複用上一輪的編號
- 產出的測試檔不可以出現 e5、e12 這種臨時編號
- 網址走專案的共用設定,不要硬寫在測試檔裡
- 產出後要自己跑一次 npx playwright test,並回報結果
