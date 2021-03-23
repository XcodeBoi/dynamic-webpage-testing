
// this is an apps script thing for google sheets that interacts with my website

function cool() {
  SpreadsheetApp.getActiveSheet().appendRow([UrlFetchApp.fetch('https://skolwebapp.herokuapp.com/api/v2', {headers: {"usertype": "bot"}}).getAllHeaders().number])
}