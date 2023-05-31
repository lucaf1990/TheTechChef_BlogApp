package com.app.TheTechChefBlog.CSVReader;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CsvReader {
	public List<List<String>> records = new ArrayList<>();
	Scanner scanner;

	public void setScanner(String p) {

		try (Scanner scanner = new Scanner(new File(p));) {
			while (scanner.hasNextLine()) {
				records.add(getRecordFromLine(scanner.nextLine()));
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	private List<String> getRecordFromLine(String line) {
		List<String> values = new ArrayList<String>();
		// List<Comuni_italiani>
		try (Scanner rowScanner = new Scanner(line)) {
			rowScanner.useDelimiter(";");
			while (rowScanner.hasNext()) {
				values.add(rowScanner.next());
			}
		}
		return values;
	}
}
