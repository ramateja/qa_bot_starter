import Papa from 'papaparse';
import type { Question } from '@/data/mockData';

interface CSVQuestion {
  Question: string;
  'Option A': string;
  'Option B': string;
  'Option C': string;
  'Option D': string;
  'Correct Answer': string;
  Explanation: string;
  Source: string;
  Topic: string;
}

export async function loadQuestionsFromCSV(csvUrl: string): Promise<Question[]> {
  try {
    // Fetch CSV content
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    const csvContent = await response.text();
    
    // Parse CSV
    const { data, errors } = Papa.parse<CSVQuestion>(csvContent, {
      header: true,
      skipEmptyLines: true
    });

    if (errors.length > 0) {
      console.error('CSV parsing errors:', errors);
      throw new Error('Failed to parse CSV file');
    }

  // Map CSV format to Question format
  return data.map((row, index) => {
    // Convert letter answer (A, B, C, D) to number (0, 1, 2, 3)
    const answerMap: { [key: string]: number } = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctAnswer = answerMap[row['Correct Answer']] || 0;

    return {
      id: index + 1,
      question: row.Question,
      options: [row['Option A'], row['Option B'], row['Option C'], row['Option D']],
      correctAnswer,
      explanation: row.Explanation,
      category: row.Topic,
      difficulty: 'medium' // Default to medium since CSV doesn't have difficulty
    };
  });
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
}
