declare module 'jspdf-autotable' {
    import { jsPDF } from 'jspdf';
    
    interface UserOptions {
      head?: any[][];
      body?: any[][];
      startY?: number;
      styles?: any;
      headStyles?: any;
      [key: string]: any;
    }
    
    const autoTable: (doc: jsPDF, options: UserOptions) => void;
    export default autoTable;
  }