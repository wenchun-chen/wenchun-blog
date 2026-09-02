# Spec: Post Series Navigation

## Purpose

目前部落格共有 3 篇文章：第一篇是開站文（2026/08/19），第二篇是非洲遊記系列的第 1 篇（2025/07/13），第三篇是非洲遊記系列的第 2 篇（2025/07/14）。

點進第三篇文章時，Blogger 內建的 post-pager 是依「發文時間」排序全站文章，導致「下一篇」指向的是第 2 篇（2025/07/13），「上一篇」卻指向開站文（2026/08/19）——這並非讀者在閱讀系列文時期望的順序。

本規格定義：當文章帶有可辨識的系列標籤時，佈景主題改以「系列內的故事順序（依標題中的 Day N 天數排序）」提供專屬的上一篇/下一篇導覽，取代原本依發文時間排序、對系列文不適用的預設 post-pager。

## Requirements

### Requirement: Series-Scoped Previous/Next Navigation

在文章詳細頁面，當目前文章帶有可辨識的系列標籤時，佈景主題 MUST 顯示一個系列導覽區塊，顯示該系列內「上一篇」與「下一篇」文章的連結，依照文章標題中解析出的天數排序，而非依賴全站依發文時間排序的預設 post-pager。

#### Scenario: Post in the Middle of a Series

- **WHEN** 讀者檢視一篇帶有可辨識系列標籤（例如 `Tanzania`）的文章，且該系列同時存在天數較小與較大的文章
- **THEN** 系列導覽區塊顯示「上一篇」連結指向天數次小的文章，以及「下一篇」連結指向天數次大的文章，各自以該篇文章標題標示

#### Scenario: Post Is the First Entry in the Series

- **WHEN** 讀者檢視該系列中天數最小的文章
- **THEN** 系列導覽區塊不顯示「上一篇」連結（以空白佔位取代），並顯示「下一篇」連結指向天數次大的文章

#### Scenario: Post Is the Last Entry in the Series

- **WHEN** 讀者檢視該系列中天數最大的文章
- **THEN** 系列導覽區塊顯示「上一篇」連結指向天數次小的文章，且不顯示「下一篇」連結

### Requirement: Default Post Pager Suppressed When Series Navigation Is Shown

當目前文章成功顯示系列導覽區塊時，佈景主題 MUST 將全站預設的 post-pager 隱藏，使讀者只看到系列專屬的連結。

#### Scenario: Series Post with Default Pager Markup Present

- **WHEN** 一篇文章帶有可辨識的系列標籤，且系列導覽區塊成功顯示上一篇/下一篇連結
- **THEN** 預設的 post-pager（依發文時間排序的上一篇/下一篇）不會顯示在頁面上

#### Scenario: Non-Series Post

- **WHEN** 文章未帶有可辨識的系列標籤
- **THEN** 不顯示系列導覽區塊，且預設 post-pager 維持此變更前的行為

### Requirement: Graceful Degradation on Lookup Failure

若無法判定目前文章的系列資料（系列 feed 請求失敗，或在已取得的系列項目中找不到目前文章的網址），佈景主題 MUST 隱藏系列導覽區塊，而非顯示不完整或錯誤的區塊。

#### Scenario: Feed Request Fails

- **WHEN** 對系列 feed 的請求失敗或發生錯誤
- **THEN** 系列導覽區塊被隱藏，且不顯示任何上一篇/下一篇連結

#### Scenario: Current Post Not Found in Fetched Series Feed

- **WHEN** 系列 feed 成功取得，但其中不包含符合目前文章網址的項目
- **THEN** 系列導覽區塊被隱藏，且不顯示任何上一篇/下一篇連結
