import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Estilos básicos para o PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  section: { marginVertical: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #ddd" },
  cell: { padding: 5, flexGrow: 1, fontSize: 10 },
  tableHeader: { fontSize: 12, fontWeight: "bold", backgroundColor: "#f2f2f2" },
  signatureSection: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
});

const MyDocument = ({ formData }: { formData: any }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Relatório Diário de Obra</Text>

      <View style={styles.section}>
        <Text>Data Início da Obra: {formData.dataInicioObra}</Text>
        <Text>Data Término da Obra: {formData.dataTerminoObra}</Text>
        <Text>Horario DSS: {formDSS.dataInicioDSS}</Text>
        <Text>Teste</Text>
        <Text>Teste</Text>
        <Text>Teste</Text>
        <Text>Teste</Text>
        <Text>Teste</Text>
       </View>

      {/* Tabela Efetivo */}
      <View style={styles.section}>
        <Text style={styles.tableHeader}>Efetivo em Horas</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Função</Text>
          <Text style={styles.cell}>Quantidade</Text>
          <Text style={styles.cell}>Hora Normal</Text>
          <Text style={styles.cell}>Hora Extra 50%</Text>
          <Text style={styles.cell}>Hora Extra 100%</Text>
        </View>
        {formData.efetivo.map((item: any, index: number) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.funcao}</Text>
            <Text style={styles.cell}>{item.quantidade}</Text>
            <Text style={styles.cell}>{item.horaNormal}</Text>
            <Text style={styles.cell}>{item.horaExtra50}</Text>
            <Text style={styles.cell}>{item.horaExtra100}</Text>
          </View>
        ))}
      </View>

      {/* Tabela Equipamentos */}
      <View style={styles.section}>
        <Text style={styles.tableHeader}>Equipamentos</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Nome</Text>
          <Text style={styles.cell}>Quantidade</Text>
          <Text style={styles.cell}>Condição</Text>
          <Text style={styles.cell}>Data de Inspeção</Text>
          <Text style={styles.cell}>Observações</Text>
        </View>
        {formData.equipamentos.map((equip: any, index: number) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{equip.nome}</Text>
            <Text style={styles.cell}>{equip.quantidade}</Text>
            <Text style={styles.cell}>{equip.condicao}</Text>
            <Text style={styles.cell}>{equip.dataInspecao}</Text>
            <Text style={styles.cell}>{equip.observacoes}</Text>
          </View>
        ))}
      </View>

      {/* Seção de Assinaturas */}
      <View style={styles.signatureSection}>
        <Text>Assinatura do Responsável: {formData.assinaturaResponsavel}</Text>
        <Text>Assinatura do Fiscal: {formData.assinaturaFiscal}</Text>
      </View>
    </Page>
  </Document>
);

const DownloadButton = ({ formData }: { formData: any }) => (
  <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="relatorio_diario.pdf">
    {({ loading }) => (loading ? "Gerando PDF..." : "Baixar PDF")}
  </PDFDownloadLink>
);

export default DownloadButton;
