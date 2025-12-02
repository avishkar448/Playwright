const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');

// ----------------------------
// Update Excel Cell Function
// ----------------------------
const writeExcelTest = async (searchTxt, replaceTxt, change, filePath) => {
  const workbook = new ExcelJs.Workbook();

  // IMPORTANT → Add await
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');

  const output = readExcel(worksheet, searchTxt);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceTxt;

  await workbook.xlsx.writeFile(filePath);
};

// ----------------------------
// Read Excel Helper Function
// ----------------------------
const readExcel = (worksheet, searchTxt) => {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchTxt) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });

  return output;
};

// ----------------------------
// Main Playwright Test
// ----------------------------
test("Upload download excel validation", async ({ page }) => {

  const textSearch = "Mango";
  const updateValue = "350";

  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

  // Correct download logic
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const dl = await download;

  // Your Windows path
  const filePath = "D:/Playwright/Playwright-Practice/PlaywrightAutomation/download.xlsx";

  // Update Excel first
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

  // Upload file
  await page.locator("#fileinput").setInputFiles(filePath);

  // Validate updated value
  const desiredRow = page.getByRole("row").filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
