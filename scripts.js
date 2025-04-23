/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"13SfQs63Ie2dSRbr","label":"code","bookmarks":[{"id":"0oqlnM6TsEmd1b2B","label":"codecademy","url":"https://www.codecademy.com/learn/introduction-to-javascript"},{"id":"STc8sjJUw7Dm7VsK","label":"codedex","url":"https://www.codedex.io/"}]},{"id":"5hd6zAfnmsyYQYT9","label":"etc","bookmarks":[{"id":"5UEOJxQdQKn3Jhug","label":"wallpaper","url":"https://www.codecademy.com/learn/introduction-to-javascript"},{"id":"TZ3RsZXvVV7WJHp6","label":"fonts","url":"https://fonts.google.com/"},{"id":"ZbXNnSVkwi7n5ujq","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"}]},{"id":"O5PlI62xCMwJo3nP","label":"media","bookmarks":[{"id":"uFvwU0HiRCP6fGUn","label":"anime","url":"https://www.crunchyroll.com/"},{"id":"rytxvj4ZdvJusNej","label":"youtube","url":"http://www.youtube.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
