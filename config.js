const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkFqcVZ5dTd1TzJSNjdUbStvc0dHT0h4T1R4dHJTeWtjT3ZpN0pDT0hFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQThzSE5lYW11WTEwZzlQK3N6WHEra1k3ZTNVcERBN0ZoNUpGZnE1YU1nZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTUF5K0llNlRTK2libjNTZlRDcW9nK2hyK2lYR3gvZm9wbkhiTmVOdDMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBbmEwUWdHL0VhZlEwVVV4N3M3eVVQR25NT0taeis0dmd0QTV5dlZxTXpRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGb2YwOHRqNHZjdWQ2QUMySE9VbENFaW9QWUV6clhFNmRwd3czT1IrM2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilp1dk1tV09sQm1MUlZPb0FMN3hNUy85WFR0amlyUFBtTEJ0SE0wbWY5blk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0sxeXRoZGtqd0ZwNUV6c3J2RUtuZzVGL3h2aUVvTERLSmZLc0lJS0syQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU9XdW5idXJhMThWS1ZBZjVhQkxPVDY1RjlBZEVFZEhINFFFUVJHME9Bbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImoyWjJ6d1VOdHVUQzhpbS8rWW11TWJEcUM3UWRsOUxONWpIS0VyRVFZWHdwRTR2ZEFJQkdsMXNSY25LbzlMczNXMHRoalROYU1mbzVSbmxBUU1UemlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJEUC9ZQWNkQnQrYTRnYldCY21VK2JDaWhSNDFHd1NoRXhNa1JHcWkwQmFBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE2MDQ3OTEyMTg5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY4NjI3NDA0NURBN0I5ODVGMzE1MTY3NkZFRTM0RTQxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDExNDEzODd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE2MDQ3OTEyMTg5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI2OEY4QzQwQzMwRjNDMkRGNkYwRkU3RDgwNEQzQTcwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDExNDEzODd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkZFSlM2UVEyIiwibWUiOnsiaWQiOiIxNjA0NzkxMjE4OTo2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTMwNDg2MDM4OTU4MjM1OjZAbGlkIiwibmFtZSI6Ikpvc2VwaCBPbm90b3RhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJN2NqSllFRVB6cW5yNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQTk9ldTZzMmhVN1J4eUJmWUt4Q2NrWnIyOFBkdEdKaEhjWEdJQ2Y0dERBPSIsImFjY291bnRTaWduYXR1cmUiOiJoMWpQYUtnb2M2OUZaNEw4cVloYzBSSDhtVE1EYnJrWmkraDJhWlRBWURUcVphK0VGMUorSHhCSGFJYm44eFNMeUwrWG9iVHRpR2dObjdyeHRXYzNBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZGNQSUJ5Vi81VkluL1lsQmlVRnJqNHpveDB6VUJMTEhUazhJQUt3Nm9sTm1ydFVYaDN2RGNObTJ1d3hSWnhwV1VxSGZBVFA4SlhtWFdXbE5WK1pYZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxNjA0NzkxMjE4OTo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlR6VG5ydXJOb1ZPMGNjZ1gyQ3NRbkpHYTl2RDNiUmlZUjNGeGlBbitMUXcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTE0MTM4NCwibGFzdFByb3BIYXNoIjoiMUs0aEg0IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMdmwifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
