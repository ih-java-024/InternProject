package com.intern.project.Service;

import java.awt.Color;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intern.project.Entity.Payment;
import com.intern.project.Entity.RegisterForm;
import com.intern.project.Repository.PaymentRepository;
import com.intern.project.Repository.RegisterFormRepository;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.VerticalPositionMark;

import jakarta.servlet.Registration;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class InvoiceService {

	private final RegisterFormRepository registerRepo;
	private final PaymentRepository paymentRepo;

	private RegisterForm registerDetail;
	private List<Payment> paymentDetails;

	@Autowired
	public InvoiceService(RegisterFormRepository registerRepo, PaymentRepository paymentRepo) {
		this.registerRepo = registerRepo;
		this.paymentRepo = paymentRepo;
	}

	public void init(String paymentId) {
		this.paymentDetails = paymentRepo.findByPaymentId(paymentId);
		if (!paymentDetails.isEmpty()) {
			this.registerDetail = paymentDetails.get(0).getRegisterForm();
		}
	}

	public RegisterForm getRegisterDetail() {
		return registerDetail;
	}

	public List<Payment> getPaymentDetails() {
		return paymentDetails;
	}

	private void writeTableHeader1(PdfPTable table) {
		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(new Color(253, 240, 213));
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(new Color(31, 53, 65));

		cell.setPhrase(new Phrase("Name of the Insured", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Relationship", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Insurance Cover", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Premium", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Duration", font));
		table.addCell(cell);
	}

	private void writeTableData(PdfPTable table) {
		table.addCell(registerDetail.getFirstname());
		table.addCell(paymentDetails.get(0).getRelations());
		table.addCell(paymentDetails.get(0).getInsurancecover());
		table.addCell(String.valueOf(paymentDetails.get(0).getIntrestplan()));
		table.addCell(paymentDetails.get(0).getDuration());
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());
		document.open();

		boolean contentAdded = false;

		try {
			try {
				String imagePath = "C:\\Users\\DELL\\OneDrive\\Pictures\\Camera Roll\\RS img.jpg"; // Ensure
																									// correct
				Image image = Image.getInstance(imagePath);
				image.scalePercent(20.0f, 20.0f);
				document.add(image);
				contentAdded = true;
			} catch (Exception e) {
				System.err.println("Image not found or could not be loaded: " + e.getMessage());
			}

			Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			headerFont.setSize(25);
			headerFont.setColor(new Color(120, 0, 0));
			Paragraph pHeader = new Paragraph("RS Insurance Pvt ltd. \n", headerFont);
			pHeader.setAlignment(Paragraph.ALIGN_CENTER);
			document.add(pHeader);
			contentAdded = true;

			Font fontP = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontP.setSize(18);
			fontP.setColor(new Color(120, 0, 0));
			Chunk glue = new Chunk(new VerticalPositionMark());
			Paragraph pp = new Paragraph("\nCompany Details", fontP);
			pp.add(new Chunk(glue));
			pp.add("Customer Details");
			document.add(pp);
			contentAdded = true;

			Font fontN = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontN.setSize(12);
			fontN.setColor(Color.BLACK);
			Paragraph pN = new Paragraph("Company Name: RS Insurance pvt ltd.");
			pN.add(new Chunk(glue));
			pN.add("CustomerID: " + registerDetail.getUserId());
			document.add(pN);
			contentAdded = true;

			Font fontA = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontA.setSize(12);
			fontA.setColor(Color.BLACK);
			Paragraph pA = new Paragraph("Agency No: 10012");
			pA.add(new Chunk(glue));
			pA.add("Email: " + registerDetail.getEmail());
			document.add(pA);
			contentAdded = true;

			Font fontC = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontC.setSize(12);
			fontC.setColor(Color.BLACK);
			Paragraph pC = new Paragraph("Email: support@rsinsurance.com", fontC);
			pC.add(new Chunk(glue));
			pC.add("Mobile Number: " + registerDetail.getContactNo());
			document.add(pC);
			contentAdded = true;

			Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			font.setSize(22);
			font.setColor(new Color(120, 0, 0));
			Paragraph p = new Paragraph("\nInvoice\n", font);
			p.setAlignment(Paragraph.ALIGN_CENTER);
			document.add(p);
			contentAdded = true;

			PdfPTable table = new PdfPTable(5);
			table.setWidthPercentage(100f);
			table.setWidths(new float[] { 2.0f, 2.0f, 2.0f, 2.0f, 2.0f });
			table.setSpacingBefore(10);

			writeTableHeader1(table);
			writeTableData(table);
			document.add(table);
			contentAdded = true;

			Font fontP1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontP1.setSize(18);
			fontP1.setColor(new Color(120, 0, 0));
			Chunk glue1 = new Chunk(new VerticalPositionMark());
			Paragraph pp1 = new Paragraph("\n", fontP1);
			pp1.add(new Chunk(glue1));
			pp1.add("Best Regards");
			document.add(pp1);
			contentAdded = true;

			Font fontN1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontN1.setSize(12);
			fontN1.setColor(Color.BLACK);
			Paragraph pN1 = new Paragraph("");
			pN1.add(new Chunk(glue1));
			pN1.add("Rs Insurance pvt ltd");
			document.add(pN1);
			contentAdded = true;

			Font fontA1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontA1.setSize(12);
			fontA1.setColor(Color.BLACK);
			Paragraph pA1 = new Paragraph("");
			pA1.add(new Chunk(glue1));
			pA1.add("Madhapur, Hyderabad");
			document.add(pA1);
			contentAdded = true;

			Font fontC1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			fontC1.setSize(12);
			fontC1.setColor(Color.BLACK);
			Paragraph pC1 = new Paragraph("");
			pC1.add(new Chunk(glue1));
			pC1.add("India, 500081\n");
			document.add(pC1);
			contentAdded = true;

			Font footerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			footerFont.setSize(12);
			footerFont.setColor(new Color(120, 0, 0));
			Paragraph fHeader = new Paragraph(
					"\nThank you for choosing RS Insurance. If any queries, feel free to contact us at support@ramanasoft.com or +91 7358735765 \n");
			fHeader.setAlignment(Paragraph.ALIGN_CENTER);
			document.add(fHeader);
			contentAdded = true;

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (!contentAdded) {
				document.add(new Paragraph("No content was added to the document."));
			}
			document.close();
		}
	}
}