const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU52d1RNWWh0Vmg1Mm1MT3NSeElBcGNFNGF5cXVIbHhua3Bablo3RTFVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUNDWnFyMGpzYllYVFBhOFJuSDFzTlgrVDFzc3NzUXRCRWdJZW9ha1F3OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTWRXV2tZQTBGb1NGU1lYWlBLcXNuYTRIWkEzK1FSYWRYaHc2Wmhyem5rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3aDUxKzMrNDBid2RGZlRjZkVSRGhtYWlqaFl2R0ovbkZ2bEhGYlM3N3pZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1FTm9neHZoUmpaUFFHWjRxektkM1p3MExFRFhIS293Q2wzNjZZR0ZQbHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdMNXJlVzl3cnNtT3FwdkdMWGxnRFBraVgyU2RySmEzYkJwbWlBRXhlMUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU9wOGlVUUdzOUE0aVFvdDdHM1VwTGEvODcxbkNEdWRXRU16bUhnaXJraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU90czIvZW9mSlJLVWZiMEh5SHVabDRyL3BoUmNldUNJTkk3c2hWTFlpaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imhia0F2dG9WYUNiaWp4ZnBPc21ycCtpdFFOSll5d0c4ejI3VWtUYWYyN1J4TlB1d0lBR1Z2ZGE4c3o1bWFkYkFRTzQ5ZmJIRjR0WFRLSHhRRm9HaWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJ2Z2xLZDRlZXFCanIrekt0QlI0L0FnenRMSjFHUGpxbWVXL2FYSkYxMEFzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXTUpNdmR4U1RBeUx3NVZJaG9lZmJRIiwicGhvbmVJZCI6IjM1NDUzMmY0LTIwY2MtNGFiNi05MTcwLTM3OTMzYjMwNWRjNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWUG1tZzBtM3piUUdtYUorb3dYVXA4aVVrNDg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2NST2lwVEdHNzdjbXRxY0lPT0cxM1M3ZXdRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc5SEZCOVBMIiwibWUiOnsiaWQiOiIyNTQ3MTA3NzI2NjY6NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJJYnJhaGltIEFkYW1zIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMcmIvYTBIRUxySWpiVUdHQWdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRTy9vTFh5T2EweWNhVWZnd3ZwOWNacmdlSlJqdC8wU203WUFYY1d6VFNjPSIsImFjY291bnRTaWduYXR1cmUiOiJxRlhmMS8zRWlYalNjQkdZVGFZR1B5TkE3Um9IWDVyLzZrOFJsNnRFSUIzTFdWcG8zdWdGbzNlK1Vnb0ZLMmZ3Qk5JeGhjNmZyVFp2bk84ek5ETmNEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZmczTmhpQ2YvZDFIU2xEV2FQTHdCWmZ4UTB5QkNDalhRNlpnNENBU1N6TGpQWFNxZjJTaUU0R0JleEE0YkRCRjg4SlRpbDhXYWdrQkdvU05HcTM0Z0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTA3NzI2NjY6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVRHY2QzE4am10TW5HbEg0TUw2ZlhHYTRIaVVZN2Y5RXB1MkFGM0ZzMDBuIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTg0MDczfQ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "slizy_glitz",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

