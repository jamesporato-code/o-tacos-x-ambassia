// ==================================================================
//  GOOGLE APPS SCRIPT — Backend du mini-site O'Tacos x Ambassia
//
//  Ce script reçoit les inscriptions et les enregistre dans
//  un Google Sheet. À déployer en tant que "Web app".
//
//  SETUP :
//  1. Ouvre Google Sheets → crée un nouveau fichier "O'Tacos Ambassia — Inscriptions"
//  2. Va dans Extensions → Apps Script
//  3. Colle tout ce code (remplace le contenu par défaut)
//  4. Clique sur "Déployer" → "Nouveau déploiement"
//  5. Type = "Application Web"
//  6. Exécuter en tant que = "Moi"
//  7. Accès = "Tout le monde"
//  8. Clique "Déployer" → Copie l'URL
//  9. Colle cette URL dans index.html à la place de VOTRE_URL_GOOGLE_APPS_SCRIPT
// ==================================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Inscriptions');

    // Crée la feuille + en-têtes si elle n'existe pas
    if (!sheet) {
      sheet = ss.getActiveSheet();
      sheet.setName('Inscriptions');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date', 'Heure', 'Prénom', 'Nom', 'Email',
        'Ambassadeur', 'Code', 'Offre'
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E13333');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);

      // Largeurs de colonnes
      sheet.setColumnWidth(1, 110);  // Date
      sheet.setColumnWidth(2, 90);   // Heure
      sheet.setColumnWidth(3, 140);  // Prénom
      sheet.setColumnWidth(4, 140);  // Nom
      sheet.setColumnWidth(5, 280);  // Email
      sheet.setColumnWidth(6, 140);  // Ambassadeur
      sheet.setColumnWidth(7, 100);  // Code
      sheet.setColumnWidth(8, 240);  // Offre
    }

    var data = JSON.parse(e.postData.contents);
    var date = new Date(data.date);

    sheet.appendRow([
      Utilities.formatDate(date, 'Europe/Paris', 'dd/MM/yyyy'),
      Utilities.formatDate(date, 'Europe/Paris', 'HH:mm:ss'),
      data.prenom || '',
      data.nom || '',
      data.email || '',
      data.ambassadeur || '',
      data.code || '',
      data.offre || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Nécessaire pour que le script accepte aussi les requêtes GET (test)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Le backend O\'Tacos x Ambassia fonctionne.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
