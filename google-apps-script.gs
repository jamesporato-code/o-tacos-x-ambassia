function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Heure", "Prenom", "Nom", "Email", "Ambassadeur", "Code", "Offre"]);
    sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#E13333").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }

  var data = JSON.parse(e.postData.contents);
  var date = new Date(data.date);

  sheet.appendRow([
    Utilities.formatDate(date, "Europe/Paris", "dd/MM/yyyy"),
    Utilities.formatDate(date, "Europe/Paris", "HH:mm:ss"),
    data.prenom,
    data.nom,
    data.email,
    data.ambassadeur,
    data.code,
    data.offre
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput("Le backend fonctionne.").setMimeType(ContentService.MimeType.TEXT);
}
