import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  text: { marginBottom: 5 },
});

const RelatorioPDF: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Relatório</Text>
        <Text style={styles.text}>Este é o conteúdo do relatório.</Text>
        {/* Adicionar mais textos e componentes conforme necessário */}
      </View>
    </Page>
  </Document>
);

const GeneratePDFButton: React.FC = () => (
  <PDFDownloadLink
    document={<RelatorioPDF />}
    fileName="relatorio.pdf"
    style={{ textDecoration: 'none', padding: '10px', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '5px' }}
  >
    {({ loading }) => (loading ? 'Gerando PDF...' : 'Gerar PDF')}
  </PDFDownloadLink>
);

export default GeneratePDFButton;